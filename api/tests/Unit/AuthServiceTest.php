<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class AuthServiceTest extends TestCase
{
    use RefreshDatabase;

    protected AuthService $authService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authService = new AuthService();
    }

    public function testCanRegisterANewUser()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'SecurePassword123!'
        ];

        $result = $this->authService->register($userData);

        $this->assertArrayHasKey('user', $result);
        $this->assertArrayHasKey('token', $result);
        $this->assertInstanceOf(User::class, $result['user']);
        $this->assertEquals($userData['name'], $result['user']->name);
        $this->assertEquals($userData['email'], $result['user']->email);
        $this->assertTrue(Hash::check($userData['password'], $result['user']->password));
        $this->assertNotEmpty($result['token']);

        // Verify user was created in database
        $this->assertDatabaseHas('users', [
            'name' => $userData['name'],
            'email' => $userData['email']
        ]);
    }

    public function testCanRevokeAllTokens()
    {
        $user = User::factory()->create();
        $user->createToken('token1');
        $user->createToken('token2');

        $this->authService->revokeAllTokens($user);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id
        ]);
    }

    public function testRegisterUserCreatesAuthenticationToken()
    {
        $userData = [
            'name' => 'Token User',
            'email' => 'token@example.com',
            'password' => 'SecurePassword123!'
        ];

        $result = $this->authService->register($userData);

        $this->assertNotEmpty($result['token']);
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $result['user']->id,
            'name' => 'auth-token'
        ]);
    }

    public function testLoginWithValidCredentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $result = $this->authService->login($credentials);

        $this->assertArrayHasKey('user', $result);
        $this->assertArrayHasKey('token', $result);
        $this->assertInstanceOf(User::class, $result['user']);
        $this->assertEquals($user->id, $result['user']->id);
        $this->assertEquals($user->email, $result['user']->email);
        $this->assertNotEmpty($result['token']);

        // Verify token was created
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id,
            'name' => 'auth-token'
        ]);
    }

    public function testLoginWithInvalidCredentials()
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('correct-password')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'wrong-password'
        ];

        $this->expectException(ValidationException::class);
        $this->expectExceptionMessage('The provided credentials are incorrect.');

        $this->authService->login($credentials);
    }

    public function testLoginWithNonExistentUser()
    {
        $credentials = [
            'email' => 'nonexistent@example.com',
            'password' => 'password123'
        ];

        $this->expectException(ValidationException::class);
        $this->expectExceptionMessage('The provided credentials are incorrect.');

        $this->authService->login($credentials);
    }

    public function testLoginRevokesExistingTokens()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        // Create some existing tokens
        $token1 = $user->createToken('old-token-1');
        $token2 = $user->createToken('old-token-2');

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $result = $this->authService->login($credentials);

        // Old tokens should be revoked
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token1->accessToken->id
        ]);
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token2->accessToken->id
        ]);

        // New token should exist
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id,
            'name' => 'auth-token'
        ]);
    }

    public function testLogoutWithValidToken()
    {
        $user = User::factory()->create();
        $tokenResult = $user->createToken('auth-token');
        $token = $tokenResult->plainTextToken;

        $result = $this->authService->logout($token);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $tokenResult->accessToken->id
        ]);
    }

    public function testLogoutWithInvalidToken()
    {
        $result = $this->authService->logout('invalid-token');

        $this->assertFalse($result);
    }

    public function testLogoutWithNullToken()
    {
        $result = $this->authService->logout(null);

        $this->assertFalse($result);
    }

    public function testLogoutWithExpiredToken()
    {
        $user = User::factory()->create();
        $tokenResult = $user->createToken('auth-token');
        $token = $tokenResult->plainTextToken;

        // Delete the token to simulate an expired/invalid token
        $tokenResult->accessToken->delete();

        $result = $this->authService->logout($token);

        $this->assertFalse($result);
    }
}
