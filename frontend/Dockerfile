FROM node:20

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies (will be cached unless package files change)
RUN npm ci

# Don't copy source code - it gets volume mounted in docker-compose
# This allows for hot reloading without rebuilds

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]