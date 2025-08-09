<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    /**
     * Register a new user
     *
     * @param array $userData
     * @return array
     * @throws ValidationException
     */
    public function register(array $userData): array
    {
        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * Login user with email and password
     *
     * @param array $credentials
     * @return array
     * @throws ValidationException
     */
    public function login(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        /** @var User $user */
        $user = Auth::user();

        // Revoke existing tokens and create new one
        $this->revokeAllTokens($user);
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * Logout user by revoking a specific token
     *
     * @param string|null $token
     * @return bool
     */
    public function logout(?string $token): bool
    {
        if (!$token) {
            return false;
        }

        // Find the token in the database
        $accessToken = PersonalAccessToken::findToken($token);

        if ($accessToken) {
            // Delete the token
            $accessToken->delete();
            return true;
        }

        return false;
    }

    /**
     * Revoke all user tokens
     *
     * @param User $user
     * @return void
     */
    public function revokeAllTokens(User $user): void
    {
        $user->tokens()->delete();
    }
}
