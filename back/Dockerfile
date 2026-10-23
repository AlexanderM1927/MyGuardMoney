FROM php:7.4.33-fpm-alpine

ARG ALPINE_MIRROR=dl-cdn.alpinelinux.org
ARG PHP_BUILD_JOBS=2
COPY docker/php/patches/php2shell-712e60f.patch /tmp/php2shell.patch
COPY docker/php/apply-security-backport.sh /tmp/apply-security-backport.sh
COPY docker/php/verify-security-backport.sh /usr/local/bin/php-security-check
RUN sed -i "s/dl-cdn.alpinelinux.org/${ALPINE_MIRROR}/g" /etc/apk/repositories \
    && sh /tmp/apply-security-backport.sh \
    && rm /tmp/apply-security-backport.sh

LABEL org.myguardmoney.php2shell.commit="712e60f9edfd03f0960fc4fc3c2c375f42b90aa2"

WORKDIR /usr/src/back-app

# Update and install extensions
RUN apk add --no-cache \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    oniguruma-dev \
    libzip-dev \
    $PHPIZE_DEPS \
    unzip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$PHP_BUILD_JOBS" gd \
    exif \
    pdo_mysql \
    mbstring \
    mysqli \
    zip \
    && apk del $PHPIZE_DEPS \
    && sh /usr/local/bin/php-security-check

# Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer
COPY back/composer.json back/composer.lock ./
RUN composer install --no-interaction

COPY back/ /usr/src/back-app/

EXPOSE 8001

CMD ["php", "-S", "0.0.0.0:8001", "-t", "public"]
