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

       
    }

}