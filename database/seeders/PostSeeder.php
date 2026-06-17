<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 published posts
        Post::factory()
            ->published()
            ->count(10)
            ->create();

        // Create 5 draft posts
        Post::factory()
            ->draft()
            ->count(5)
            ->create();

        // Create 3 scheduled posts
        Post::factory()
            ->scheduled()
            ->count(3)
            ->create();
    }
}
