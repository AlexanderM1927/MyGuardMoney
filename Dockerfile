# syntax=docker/dockerfile:1

# Quasar 1 uses webpack 4 and this project's Node 14 toolchain.
FROM node:14.21.3-alpine AS frontend_assets

WORKDIR /usr/src/front-app

RUN apk add --no-cache git
COPY front/package.json front/package-lock.json ./
RUN ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm ci --no-audit --no-fund
COPY front/ ./

# Build secrets do not invalidate Docker's cache; Jenkins supplies their hash.
ARG FRONTEND_ENV_HASH=local
RUN --mount=type=secret,id=frontend_env,target=/usr/src/front-app/.env,required=true \
    test -n "$FRONTEND_ENV_HASH" && ./node_modules/.bin/quasar build -m pwa

FROM php:7.4.33-fpm-alpine AS php_base

ARG ALPINE_MIRROR=dl-cdn.alpinelinux.org
RUN sed -i "s/dl-cdn.alpinelinux.org/${ALPINE_MIRROR}/g" /etc/apk/repositories \
    && apk add --no-cache \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libzip-dev \
        oniguruma-dev \
        su-exec \
        unzip \
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath exif gd mbstring mysqli opcache pcntl pdo_mysql zip \
    && apk del $PHPIZE_DEPS

WORKDIR /var/www/html

# Composer 2.2 supports the legacy PHP and dependency versions in this project.
FROM php_base AS composer_deps

COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer
COPY back/composer.json back/composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist --no-autoloader
COPY back/ ./
RUN composer dump-autoload --no-dev --no-scripts --optimize \
    && composer check-platform-reqs --no-dev

FROM php_base AS app_runtime

COPY --from=composer_deps /var/www/html/ ./
COPY docker/php/production.ini /usr/local/etc/php/conf.d/99-myguardmoney.ini
COPY docker/php/entrypoint.sh /usr/local/bin/myguardmoney-entrypoint

RUN mkdir -p storage/app storage/logs storage/framework/cache/data \
        storage/framework/sessions storage/framework/views \
    && chown -R www-data:www-data storage \
    && chmod +x /usr/local/bin/myguardmoney-entrypoint

ENTRYPOINT ["myguardmoney-entrypoint"]
CMD ["php-fpm", "-F"]

FROM nginx:1.28-alpine AS web_runtime

WORKDIR /var/www/html

COPY --from=frontend_assets /usr/src/front-app/dist/pwa/ ./public/
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
