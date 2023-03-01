pipeline {
    agent any
    
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vanhngoc/captchaWebsite.git'
            }
        }
        stage('Bnstall') {
            steps {
                bat 'npm install --force'
            }
        }
        stage('Build') {
            steps {
                bat 'mvn package -Pprod -DskipTests=true'
            }
        }
        stage('Build-docker') {
            steps {
                bat 'docker build -t captcha-website:lastest .'
            }
        }

        

        stage('Deploy') {
            steps {
                bat 'docker run -d -p 8090:8090 captcha-website:lastest '
            }
        }


       
    }

}