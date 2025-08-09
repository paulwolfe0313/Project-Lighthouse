<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testCanGetUserProfile()
    {
        // Arrange
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]);
        $token = $user->createToken('test-token');

        // Act
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token->plainTextToken
        ])->getJson('/api/user');

        // Assert
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'data' => [
                        'id',
                        'name',
                        'email'
                    ]
                ])
                ->assertJson([
                    'data' => [
                        'id' => $user->id,
                        'name' => 'John Doe',
                        'email' => 'john@example.com'
                    ]
                ]);
    }

    public function testProfileRequiresAuthentication()
    {
        // Act - No authentication provided
        $response = $this->getJson('/api/user');

        // Assert - Should return 401 Unauthorized
        $response->assertStatus(401)
                ->assertJson([
                    'message' => 'Unauthenticated.'
                ]);
    }

    public function testProfileWithInvalidToken()
    {
        // Act - Invalid token
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid-token'
        ])->getJson('/api/user');

        // Assert - Should return 401 Unauthorized
        $response->assertStatus(401)
                ->assertJson([
                    'message' => 'Unauthenticated.'
                ]);
    }
}
