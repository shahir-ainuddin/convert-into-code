<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FileSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('files')->insert([
                'file_code' => 'Sample File Code',
                'file_name' => 'Sample File Name',
                'is_active' => false,
                'is_visible' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
