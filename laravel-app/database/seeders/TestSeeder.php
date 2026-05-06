<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('tests')->insert([
                'test_code' => 'Sample Test Code',
                'test_name' => 'Sample Test Name',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
