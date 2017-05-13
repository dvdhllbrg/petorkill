<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Animal;

class GamesController extends Controller
{
    public function index() {
    	return view('games.index');
    }
}
