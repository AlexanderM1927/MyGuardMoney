# MyGuardMoney

Saving money easier.

Local development uses `compose.yaml` and the Dockerfiles in `front/` and `back/`.
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

Jenkins injects both environment files, builds the production images, runs
`php artisan migrate --force` in a one-off container, then recreates both services
and waits for health checks. A failed build or migration stops deployment before
running services are replaced. Migrations should remain compatible with the
previous application version during this transition.

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
