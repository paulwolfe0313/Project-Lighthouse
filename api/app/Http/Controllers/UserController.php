<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get the authenticated user's profile
     */
    public function profile(Request $request)
    {
        return response()->json([
            'data' => UserData::from($request->user())
        ]);
    }
}
