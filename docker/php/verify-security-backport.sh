#!/bin/sh
set -eu

test "$(cat /usr/local/share/php-security/php2shell-commit)" = \
    '712e60f9edfd03f0960fc4fc3c2c375f42b90aa2'

# This directive was added by the backport and is absent from stock PHP 7.4.
php -n -r 'exit(ini_get("max_multipart_body_parts") === "-1" ? 0 : 1);'

# The backport uses _exit on OOM; vulnerable PHP executes shutdown handlers.
# Run an isolated CLI process with a small allocation, without serving requests.
oom_status=0
oom_output="$(php -n -d memory_limit=16M -r '
    register_shutdown_function(function () {
        fwrite(STDERR, "UNSAFE_SHUTDOWN_HANDLER\n");
    });
    str_repeat("x", 32 * 1024 * 1024);
' 2>&1)" || oom_status=$?

if [ "$oom_status" -ne 1 ]; then
    printf 'Unexpected OOM exit status: %s\n' "$oom_status" >&2
    exit 1
fi
case "$oom_output" in
    *UNSAFE_SHUTDOWN_HANDLER*)
        printf 'Security check failed: OOM ran a shutdown handler.\n' >&2
        exit 1 ;;
esac
case "$oom_output" in
    *'Allowed memory size'*'exhausted'*) ;;
    *) printf 'Security check failed: expected memory exhaustion.\n' >&2; exit 1 ;;
esac

printf 'PHP2Shell backport verified: CVE-2026-109618 and CVE-2026-109619\n'
