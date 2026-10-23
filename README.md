# MyGuardMoney

Saving money easier.

Local development uses `compose.yaml` and the Dockerfiles in `front/` and `back/`.
The backend build context is the repository root so it can include the shared PHP
security patch in `docker/php/`.
Production uses `docker-compose.prod.yml` and the root `Dockerfile`, adapted from
MyPipeline for this Lumen 7 / Quasar 1 application.

Production runs PHP-FPM (`app`) and Nginx with the compiled PWA (`web`). Nginx serves
frontend history routes and forwards `/v1/` to Lumen. Backend storage persists in
the `myguardmoney_storage-data` Docker volume. The database remains external.

## Production setup

Run Jenkins on the production Docker host with Docker Engine, BuildKit, and Docker
Compose v2.20 or newer. The Jenkins user needs access to the Docker daemon. Host
installations of Node, PHP, Composer, Quasar, and Icon Genie are no longer needed;
the build uses the PWA icons committed in `front/public`.

Keep the existing Jenkins secret file credentials:

- `envmyguardmoney`: backend configuration, copied to `back/.env`.
- `myguardmoney-front`: frontend build configuration, copied to `front/.env`.

In the backend credential, preserve the existing `APP_KEY`, database, and mail
settings, and set `APP_URL=https://myguardmoney.alexanderm.co`. For MySQL running on
the Docker host, use `DB_HOST=host.docker.internal` instead of `localhost` or
`127.0.0.1`; MySQL must accept connections from the Docker network. Containers
always set `APP_ENV=production` and `APP_DEBUG=false`.

Use `QUEUE_CONNECTION=sync`, matching this project's default. Another queue
connection requires a worker and its queue infrastructure. This project's Artisan
schedule is empty, so the stack has no scheduler service. If an existing host cron
calls `/v1/reminders-run`, keep that trigger; it continues through the reverse proxy.

In the frontend credential, set `API_URL=https://myguardmoney.alexanderm.co/v1/`.
Frontend values are compiled into the public PWA and must contain no private
secrets. The file is passed as a BuildKit secret and excluded from the build
context. Jenkins hashes it so configuration changes invalidate the frontend cache.
For manual builds, also set `FRONTEND_ENV_HASH` as shown below.

If Alpine CDN downloads are slow, set `ALPINE_MIRROR` to another official mirror
hostname, such as `dl-4.alpinelinux.org`, in the Jenkins job environment.

## VPS reverse proxy and first deployment

Replace the existing HTTPS server block for `myguardmoney.alexanderm.co` with
[`docker/nginx/vps-myguardmoney.conf`](docker/nginx/vps-myguardmoney.conf). It forwards
the entire site to `http://127.0.0.1:8001`, replacing the old workspace roots and
host PHP-FPM socket. Keep the shared HTTP redirect block for MyPipeline and
MyGuardMoney and the other domains' blocks. Validate before reloading:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

Before deploying, check that port 8001 is free, or owned only by this project's
existing production web container:

```sh
sudo ss -ltnp 'sport = :8001'
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

The development backend also uses port 8001, so it cannot share that host port with
production. To choose another unused port, set `APP_PORT` in the Jenkins job
environment and change the VPS block's `proxy_pass` to match. Only Nginx is
published, bound to loopback; PHP-FPM stays inside the Compose network.

Before switching from the host deployment, back up any existing `back/storage`
files. After building the images and before migrations, import them once from the
existing production workspace into the new volume:

```sh
docker compose -f docker-compose.prod.yml run --rm --no-deps \
  --entrypoint sh -v "$PWD/back/storage:/legacy-storage:ro" app \
  -c 'cp -a /legacy-storage/. storage/ && chown -R www-data:www-data storage'
```

Do not run `docker compose down --volumes` unless you intend to delete persistent
storage.

## Deployment

Jenkins injects both environment files, builds the production images, verifies
the PHP security backport, runs `php artisan migrate --force` in a one-off
container, then recreates both services and waits for health checks. It verifies
the backport again in the running app and checks that `/v1/test` returns
`it works` through Nginx and PHP-FPM. A failed build, image security check, or
migration stops deployment before running services are replaced. Migrations
should remain compatible with the previous application version during this
transition.

For a manual deployment, provide `back/.env` and `front/.env`, then run:

```sh
export COMPOSE_FILE=docker-compose.prod.yml
export FRONTEND_ENV_HASH="$(sha256sum front/.env | cut -d ' ' -f 1)"
docker compose config --quiet
docker compose build --pull app web
docker compose run --rm --no-deps app php artisan migrate --force --no-interaction
docker compose up -d --no-build --force-recreate --wait --wait-timeout 120 app web
docker compose ps
```

After deployment, check `/`, a frontend history route such as `/reminders`, and
`/v1/test` (returns `it works`). The web health check exercises Nginx, PHP-FPM, and
Lumen through `/v1/test`; migrations check database connectivity. `/healthz` checks
Nginx alone. View container logs with
`docker compose -f docker-compose.prod.yml logs --tail=100`; Lumen's file logs remain
in `storage/logs` in the persistent volume.

## PHP2Shell security update (October 2026)

Both PHP Dockerfiles rebuild PHP 7.4.33 with the PHP security team's
[official backport](https://github.com/php/php-src/commit/712e60f9edfd03f0960fc4fc3c2c375f42b90aa2)
for CVE-2026-109618 and CVE-2026-109619, linked from the
[PHP security advisory](https://www.php.net/archive/2026.php).
The patch is committed in `docker/php/patches/`, checked against its SHA-256, and
applied before compiling PHP and this application's extensions. The build fails
if the patch or runtime checks fail. Extension sources retained in the image are
patched too.
The development backend uses the same Alpine PHP 7.4.33 base and Composer 2.2 as
production so both builds share the backport procedure.

The minimal EOL backport terminates a worker immediately on memory exhaustion,
skipping PHP shutdown handlers, and disables session upload progress. Normal
requests retain their configured PHP memory limit. PHP 7.4 remains unsupported;
this fix does not restore general security support.

For an existing Docker production deployment, first get these changed files onto
the VPS through your normal Git/Jenkins workflow. A Jenkins deployment rebuilds
and replaces the patched containers automatically. Alternatively, from the
production checkout with the existing `back/.env` and `front/.env` present, run:

```sh
set -eu
export COMPOSE_FILE=docker-compose.prod.yml
export COMPOSE_PROJECT_NAME=myguardmoney
docker compose config --quiet
# Build first; the currently running app remains available during compilation.
docker compose build --pull app
docker run --rm --network none --entrypoint sh \
  myguardmoney-app:latest /usr/local/bin/php-security-check
# Recreate web too so Nginx resolves the new app container's address.
docker compose up -d --no-build --force-recreate --wait --wait-timeout 120 app web
docker compose exec -T app sh /usr/local/bin/php-security-check
docker compose ps
curl --fail --silent --show-error "http://127.0.0.1:${APP_PORT:-8001}/v1/test"
```

The security check should print `PHP2Shell backport verified` with both CVE IDs,
and the API should return `it works`. No database migration is needed for this
security-only update. The first patched build recompiles PHP, so allow several
minutes; `PHP_BUILD_JOBS` defaults to 2 to limit compiler memory use. For local
development, rebuild and recreate `backend` with `docker compose -f compose.yaml
up -d --build backend`.

`php -v` still reports 7.4.33 after this source backport; use the security check
and the image's `org.myguardmoney.php2shell.commit` label to identify the patched
build. Updating host PHP or merely restarting an old container does not patch the
PHP engine inside the image. If the VPS still serves this site using a host
PHP-FPM socket instead of this Docker stack, update that runtime through its
package vendor and verify coverage for both CVEs before restarting its workers.
