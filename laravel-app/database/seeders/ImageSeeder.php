<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::table('images')->insert([
                'image_code' => 'Sample Image Code',
                'image_name' => 'Sample Image Name',
                'is_active' => false,
                'is_visible' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
