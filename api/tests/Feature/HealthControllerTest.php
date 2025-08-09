<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthControllerTest extends TestCase
{
    public function testBasicHealthCheck()
    {
        $response = $this->getJson('/api/health');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'timestamp',
                    'service'
                ])
                ->assertJson([
                    'status' => 'ok',
                    'service' => 'lighthouse-api'
                ]);
    }

    public function testDetailedHealthCheck()
    {
        $response = $this->getJson('/api/health/detailed');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'status',
                    'timestamp',
                    'service',
                    'checks' => [
                        'database' => [
                            'status',
                            'message'
                        ],
                        'cache' => [
                            'status',
                            'message'
                        ]
                    ]
                ])
                ->assertJson([
                    'status' => 'ok',
                    'service' => 'lighthouse-api',
                    'checks' => [
                        'database' => [
                            'status' => 'ok'
                        ],
                        'cache' => [
                            'status' => 'ok'
                        ]
                    ]
                ]);
    }
}
