<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('users')->insert([
                'user_code' => 'Sample User Code',
                'user_name' => 'Sample User Name',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
