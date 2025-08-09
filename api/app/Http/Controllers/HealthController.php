<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class HealthController extends Controller
{
    /**
     * Basic health check for Docker
     * Should be fast and lightweight
     */
    public function check()
    {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'service' => 'lighthouse-api'
        ]);
    }

    /**
     * Detailed health check with dependencies
     */
    public function detailed()
    {
        $health = [
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'service' => 'lighthouse-api',
            'checks' => []
        ];

        // Database check
        try {
            DB::connection()->getPdo();
            $health['checks']['database'] = [
                'status' => 'ok',
                'message' => 'Database connection successful'
            ];
        } catch (\Exception $e) {
            $health['status'] = 'error';
            $health['checks']['database'] = [
                'status' => 'error',
                'message' => 'Database connection failed'
            ];
        }

        // Cache check
        try {
            Cache::put('health_check', 'ok', 10);
            $cacheValue = Cache::get('health_check');
            
            if ($cacheValue === 'ok') {
                $health['checks']['cache'] = [
                    'status' => 'ok',
                    'message' => 'Cache working properly'
                ];
            } else {
                throw new \Exception('Cache value mismatch');
            }
        } catch (\Exception $e) {
            $health['status'] = 'error';
            $health['checks']['cache'] = [
                'status' => 'error',
                'message' => 'Cache failed'
            ];
        }

        // Return appropriate HTTP status
        $httpStatus = $health['status'] === 'ok' ? 200 : 503;
        
        return response()->json($health, $httpStatus);
    }
}
