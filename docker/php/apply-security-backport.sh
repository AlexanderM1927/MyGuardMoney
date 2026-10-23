#!/bin/sh
set -eu

# Rebuild the official PHP image with the PHP security team's EOL backport.
# Keep the original configure options and patch the retained extension sources too.
test "$(php -r 'echo PHP_VERSION;')" = '7.4.33'
patch_file=/tmp/php2shell.patch
printf '%s  %s\n' \
    5fe57ca6ee96d59b36c6e0ca842843c50884f177bef1e85234cf669b577f5e48 \
    "$patch_file" | sha256sum -c -

apk add --no-cache --virtual .php-security-build-deps \
    $PHPIZE_DEPS argon2-dev coreutils curl-dev gnu-libiconv-dev \
    libsodium-dev libxml2-dev linux-headers oniguruma-dev openssl-dev \
    patch readline-dev sqlite-dev zlib-dev

# Match the official Alpine image's GNU iconv setup for PHP 7.x.
rm -f /usr/include/iconv.h
ln -sf /usr/include/gnu-libiconv/*.h /usr/include/

export CFLAGS="$PHP_CFLAGS" CPPFLAGS="$PHP_CPPFLAGS" LDFLAGS="$PHP_LDFLAGS"
configure_options="$(php-config --configure-options)"
docker-php-source extract
cd /usr/src/php
patch --batch --fuzz=0 -p1 < "$patch_file"

# docker-php-ext-install must use these sources, including the patched Zend headers.
XZ_OPT=-1 tar --exclude=.docker-extracted -cJf /usr/src/php.tar.xz -C /usr/src/php .
rm -f /usr/src/php.tar.xz.asc

# The options come from php-config in the trusted official base image.
eval "./configure $configure_options"
make -j"${PHP_BUILD_JOBS:-2}"
make install
cd /
docker-php-source delete
# Retain libraries used by the rebuilt binaries before removing compiler packages.
run_deps="$(scanelf --needed --nobanner --format '%n#p' --recursive /usr/local \
    | tr ',' '\n' | sort -u \
    | awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }')"
apk add --no-cache $run_deps
apk del .php-security-build-deps
rm -f "$patch_file"

mkdir -p /usr/local/share/php-security
printf '%s\n' 712e60f9edfd03f0960fc4fc3c2c375f42b90aa2 \
    > /usr/local/share/php-security/php2shell-commit
sh /usr/local/bin/php-security-check
php-fpm -t
