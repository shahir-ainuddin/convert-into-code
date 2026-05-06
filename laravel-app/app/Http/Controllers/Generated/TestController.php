<?php

namespace App\Http\Controllers\Generated;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    private const TABLE = 'tests';

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
            'test_code' => 'nullable|string',
            'test_name' => 'nullable|string',
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
            'test_code' => 'nullable|string',
            'test_name' => 'nullable|string',
        ]);

        DB::table(self::TABLE)
            ->where('id', $id)
            ->update(array_merge($data, [
                'updated_at' => now(),
            ]));

        return response()->json(['id' => $id]);
    }
}
