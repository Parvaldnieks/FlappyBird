<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leaderboard;

class LeaderboardController extends Controller
{
    public function index()
    {
        $scores = Leaderboard::orderByDesc('score')->take(5)->get();
        return view('leaderboard', ['scores' => $scores]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'score' => 'required|integer',
        ]);

        Leaderboard::create($validated);

        return response()->json(['message' => 'Score saved']);
    }
}
