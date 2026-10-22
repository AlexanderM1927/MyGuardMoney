#!/bin/sh
set -eu

mkdir -p storage/app storage/logs storage/framework/cache/data \
    storage/framework/sessions storage/framework/views

if [ "$(id -u)" = '0' ]; then
    chown -R www-data:www-data storage

    # FPM drops worker privileges; Artisan must write files as the same user.
    if [ "${1:-}" != 'php-fpm' ]; then
        exec su-exec www-data docker-php-entrypoint "$@"
    fi
fi

exec docker-php-entrypoint "$@"
