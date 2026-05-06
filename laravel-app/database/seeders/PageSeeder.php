<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('pages')->insert([
                'page_code' => 'Sample Page Code',
                'page_name' => 'Sample Page Name',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
