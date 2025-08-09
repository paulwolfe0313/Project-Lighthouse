<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user
     */
    public function register(CreateUserRequest $request)
    {
        $validated = $request->validated();

        $result = $this->authService->register($validated);

        return response()->json([
            'message' => 'Registration successful',
            'user' => UserData::from($result['user']),
            'token' => $result['token']
        ], 201);
    }

    /**
     * Login user
     */
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $result = $this->authService->login($validated);

        return response()->json([
            'message' => 'Login successful',
            'user' => UserData::from($result['user']),
            'token' => $result['token']
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        $success = $this->authService->logout($token);

        return response()->json([
            'message' => $success ? 'Logout successful' : 'Already logged out'
        ]);
    }
}