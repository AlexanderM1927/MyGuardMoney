pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage("Check php version") {
            steps {
               sh 'php --version'
               sh 'composer install'
               sh 'composer --version'
            }
        }
        stage('Frontend prepare') {
            tools {
                nodejs 'node-21.11.1'
            }
            steps {
                dir('./front') {
                    sh 'npm install'
                    sh 'icongenie generate -m pwa -i ./public/logo.png'
                }
            }
        }
        stage('Frontend build') {
            tools {
                nodejs 'soundhub-14.16.1'
            }
            steps {
                dir('./front') {
                    sh 'quasar build -m pwa'
                    sh 'chown -R jenkins:jenkins ./dist/pwa'
                    sh 'rsync -a ./dist/pwa/. /var/lib/jenkins/workspace/myguardmoney/back/public'
                }
            }
        }
    }
}
