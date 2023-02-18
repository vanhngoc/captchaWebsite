pipeline {
    agent any
    
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vanhngoc/captchaWebsite.git'
            }
        }
        stage('Build') {
            steps {
                bat 'mvn package -Pprod -DskipTests'
            }
        }

       
    }

}