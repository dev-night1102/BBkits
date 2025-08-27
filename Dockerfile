# ------------------------------
# 1. Build Frontend (Vite)
# ------------------------------
FROM node:18 AS frontend

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source
COPY resources resources
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY public public

# Build frontend with environment variable
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ------------------------------
# 2. Build Laravel Backend
# ------------------------------
FROM php:8.2-cli AS backend

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev libsqlite3-dev pkg-config zip unzip curl git \
 && docker-php-ext-configure pdo_sqlite \
 && docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy backend files
COPY . .

# Copy built frontend
COPY --from=frontend /app/public ./public

# Create SQLite database (if used)
RUN mkdir -p database && touch database/database.sqlite && chown -R www-data:www-data database

# Install PHP dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Ensure Laravel cache/storage folders exist
RUN mkdir -p bootstrap/cache storage/framework/{views,cache,sessions} storage/logs \
 && chmod -R 775 storage bootstrap/cache database \
 && chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 10000

# ------------------------------
# 3. Runtime Commands
# ------------------------------
CMD mkdir -p bootstrap/cache storage/framework/{views,cache,sessions} storage/logs && \
    chmod -R 775 storage bootstrap/cache database && \
    chown -R www-data:www-data storage bootstrap/cache database && \
    php artisan config:clear && \
    php artisan cache:clear && \
    php artisan view:clear || true && \
    php artisan optimize && \
    php artisan migrate --force && \
    php artisan db:seed --force && \
    php artisan receipts:migrate-to-base64 && \
    php artisan serve --host=0.0.0.0 --port=10000
