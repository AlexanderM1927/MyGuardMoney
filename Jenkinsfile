pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }

    environment {
        COMPOSE_FILE = 'docker-compose.prod.yml'
        COMPOSE_PROJECT_NAME = 'myguardmoney'
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Check Docker') {
            steps {
                sh 'docker compose version && docker info > /dev/null'
            }
        }

        stage('Inject environment') {
            steps {
                withCredentials([
                    file(credentialsId: 'envmyguardmoney', variable: 'BACKEND_ENV_FILE'),
                    file(credentialsId: 'myguardmoney-front', variable: 'FRONTEND_ENV_FILE')
                ]) {
                    sh '''
                        set -eu
                        umask 077
                        rm -f back/.env front/.env
                        cp "$BACKEND_ENV_FILE" back/.env
                        cp "$FRONTEND_ENV_FILE" front/.env
                        chmod 600 back/.env front/.env
                    '''
                }
            }
        }

        stage('Build production images') {
            steps {
                sh '''
                    set -eu
                    export FRONTEND_ENV_HASH="$(sha256sum front/.env | cut -d ' ' -f 1)"
                    docker compose config --quiet
                    docker compose build --pull app web
                '''
            }
        }

        stage('Run database migrations') {
            steps {
                sh 'docker compose run --rm --no-deps app php artisan migrate --force --no-interaction'
            }
        }

        stage('Start production services') {
            steps {
                // Recreate web too so Nginx resolves the new PHP-FPM container.
                sh 'docker compose up -d --no-build --force-recreate --wait --wait-timeout 120 app web'
                sh 'docker compose ps'
            }
        }
    }

    post {
        failure {
            sh(script: 'docker compose ps', returnStatus: true)
            sh(script: 'docker compose logs --tail=100 app web', returnStatus: true)
        }
    }
}
