# Dockerfile
FROM php:7.4.19-fpm

WORKDIR /usr/src/back-app

COPY . /usr/src/back-app/

# Update and install extensions
RUN apt-get update && apt-get install -y build-essential \
    curl \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libldb-dev \
    libssl-dev \
    zlib1g-dev \
    libonig-dev \
    libzip-dev  \
    unzip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    exif \
    pdo_mysql \
    mbstring \
    mysqli \
    zip

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --1
RUN composer install

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8001", "-t", "public"]
