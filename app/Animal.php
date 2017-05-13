<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
		private static $species = [
			['name' => 'cat', 'isPet' => true],
			['name' => 'dog', 'isPet' => true],
			['name' => 'cow', 'isPet' => false],
			['name' => 'pig', 'isPet' => false],
		];

    public static function getRandom() {
    	$species = self::$species[array_rand(self::$species)];

    	$animal = [];
    	$animal['name'] = static::inRandomOrder()->pluck('name')->first();
    	$animal['description'] = static::inRandomOrder()->pluck('description')->first();
    	$animal['friend'] = static::inRandomOrder()->where('name', '<>', $animal['name'])->pluck('name')->first();
    	$animal['weight'] = rand(1, 15);
    	$animal['age'] = rand(0, 20);
    	$animal['species'] = $species['name'];
    	$animal['isPet'] = $species['isPet'];
    	$animal['imageNumber'] = rand(1, 15);

    	return $animal;
    }
}
