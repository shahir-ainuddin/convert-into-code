<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\TestSeeder;
use Database\Seeders\ImageSeeder;
use Database\Seeders\FileSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PageSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(TestSeeder::class);
        $this->call(ImageSeeder::class);
        $this->call(FileSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(PageSeeder::class);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
