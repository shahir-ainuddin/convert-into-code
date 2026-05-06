<?php

namespace App\Http\Controllers\Generated;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FileController extends Controller
{
    private const TABLE = 'files';

    public function index(): JsonResponse
    {
        return response()->json(
            DB::table(self::TABLE)
                ->orderByDesc('id')
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file_code' => 'nullable|string',
            'file_name' => 'nullable|string',
            'is_active' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $id = DB::table(self::TABLE)->insertGetId(array_merge($data, [
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json(['id' => $id], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'file_code' => 'nullable|string',
            'file_name' => 'nullable|string',
            'is_active' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        DB::table(self::TABLE)
            ->where('id', $id)
            ->update(array_merge($data, [
                'updated_at' => now(),
            ]));

        return response()->json(['id' => $id]);
    }
}
