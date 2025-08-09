<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testCanRegisterNewUser()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'SecurePassword123!'
        ];

        $response = $this->postJson('/api/register', $userData);

                $response->assertStatus(201)
                ->assertJson([
                    'message' => 'Registration successful'
                ])
                ->assertJsonStructure([
                    'message',
                    'user' => [
                        'id',
                        'name',
                        'email'
                    ],
                    'token'
                ]);

        $this->assertDatabaseHas('users', [
            'name' => $userData['name'],
            'email' => $userData['email']
        ]);

        $user = User::where('email', $userData['email'])->first();
        $this->assertTrue(Hash::check($userData['password'], $user->password));
    }

    public function testValidatesRegistrationData()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function testRequiresUniqueEmailForRegistration()
    {
        User::factory()->create(['email' => 'existing@example.com']);

        $userData = [
            'name' => 'John Doe',
            'email' => 'existing@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'SecurePassword123!'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    public function testRequiresPasswordConfirmation()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'DifferentPassword123!'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['password']);
    }

    public function testCanLoginWithValidCredentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        // Act
        $response = $this->postJson('/api/login', $credentials);

        // Assert
        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Login successful'
                ])
                ->assertJsonStructure([
                    'message',
                    'user' => [
                        'id',
                        'name',
                        'email'
                    ],
                    'token'
                ]);

        $responseData = $response->json();
        $this->assertEquals($user->id, $responseData['user']['id']);
        $this->assertNotEmpty($responseData['token']);
    }

    public function testRejectsInvalidLoginCredentials()
    {
        // Arrange
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('correctpassword')
        ]);

        $invalidCredentials = [
            'email' => 'test@example.com',
            'password' => 'wrongpassword'
        ];

        // Act
        $response = $this->postJson('/api/login', $invalidCredentials);

        // Assert
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    public function testValidatesLoginData()
    {
        // Arrange - Test required fields
        $response = $this->postJson('/api/login', []);

        // Act & Assert
        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email', 'password']);
    }

    public function testRevokesExistingTokensOnLogin()
    {
        // Arrange
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        // Create some existing tokens
        $oldToken1 = $user->createToken('old-token-1');
        $oldToken2 = $user->createToken('old-token-2');

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        // Act
        $response = $this->postJson('/api/login', $credentials);

        // Assert
        $response->assertStatus(200);

        // Verify old tokens were revoked
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $oldToken1->accessToken->id
        ]);
        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $oldToken2->accessToken->id
        ]);

        // Verify new token was created
        $responseData = $response->json();
        $this->assertNotEmpty($responseData['token']);
    }

    public function testCanLogoutAuthenticatedUser()
    {
        // Arrange
        $user = User::factory()->create();
        $token = $user->createToken('test-token');

        // Act
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token->plainTextToken
        ])->postJson('/api/logout');

        // Assert
        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Logout successful'
                ]);

        // Verify token was revoked by checking that the token is no longer valid
        // We can't use the exact token ID because Laravel Sanctum manages tokens differently
        $this->assertEquals(0, $user->fresh()->tokens()->count());
    }

    public function testHandlesLogoutWithoutAuthentication()
    {
        // Arrange - No authentication provided

        // Act
        $response = $this->postJson('/api/logout');

        // Assert - Should return 200 with "Already logged out" message
        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Already logged out'
                ]);
    }

    public function testCreatesTokenWithCorrectNameOnRegistration()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'SecurePassword123!'
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(201);

        $user = User::where('email', $userData['email'])->first();
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id,
            'name' => 'auth-token'
        ]);
    }

    public function testCreatesTokenWithCorrectNameOnLogin()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123')
        ]);

        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/login', $credentials);

        $response->assertStatus(200);

        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_type' => User::class,
            'tokenable_id' => $user->id,
            'name' => 'auth-token'
        ]);
    }
}