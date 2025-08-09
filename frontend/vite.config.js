import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on current mode
  const env = loadEnv(mode, __dirname, '')

  // Determine API target based on environment
  const getApiTarget = () => {
    if (mode === 'production') {
      return env.VITE_API_URL || 'https://api.yourdomain.com'
    }
    if (mode === 'staging') {
      return env.VITE_API_URL || 'https://staging-api.yourdomain.com'
    }
    // Development mode - use Docker service name in container, localhost for local dev
    return env.VITE_API_URL || (env.DOCKER_ENV === 'true' ? 'http://api:8000' : 'http://localhost:8000')
  }

  const apiTarget = getApiTarget()

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // Optimize for production
      minify: mode === 'production' ? 'terser' : false,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            icons: ['react-icons'],
          },
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    server: {
      host: true,
      port: parseInt(env.VITE_PORT) || 5173,
      headers: {
        'Cache-Control': 'no-cache',
      },
      proxy: mode === 'development' ? {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: mode === 'production',
          ws: true,
        },
        '/sanctum': {
          target: apiTarget,
          changeOrigin: true,
          secure: mode === 'production',
          ws: true,
        }
      } : undefined
    },
    preview: {
      port: parseInt(env.VITE_PORT) || 5173,
      host: true,
    },
    // Environment variables prefix
    envPrefix: 'VITE_',
    define: {
      // Expose environment info to the app
      __APP_ENV__: JSON.stringify(mode),
    }
  }
})
