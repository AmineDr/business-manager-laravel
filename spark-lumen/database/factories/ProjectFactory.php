<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(2),
            'amount' => $this->faker->numberBetween(10, 1000) * 100,
            'user_id' => 1,
            'customer_id' => $this->faker->numberBetween(1, 10)
        ];
    }
}
