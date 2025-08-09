#!/bin/bash

echo "📦 Starting Project Lighthouse API Setup..."

docker compose up -d --build

echo "⏳ Waiting for Laravel container to start..."
sleep 5

echo "📦 Installing PHP dependencies..."
docker compose exec api composer install

# Only copy .env if it doesn't exist
docker compose exec api bash -c "
  if [ ! -f .env ]; then
    echo '📄 Copying .env.example to .env...'
    cp .env.example .env
  fi
"

# Only generate key if APP_KEY is still empty
docker compose exec api bash -c "
  if ! grep -q 'APP_KEY=base64:' .env; then
    echo '🔐 Generating APP_KEY...'
    php artisan key:generate
  else
    echo '✅ APP_KEY already set, skipping generation'
  fi
"

echo "⚙️ Caching config..."
docker compose exec api php artisan config:clear
docker compose exec api php artisan config:cache

echo "🗃️ Running migrations..."
docker compose exec api php artisan migrate

echo ""
echo "✅ API and DB are ready to use!"
echo "🧪 Next: cd frontend && npm install && npm run dev"
