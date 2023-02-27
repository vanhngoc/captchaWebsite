pipeline {
    agent any
    
    
    stages {
        // stage('Checkout') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/vanhngoc/captchaWebsite.git'
        //     }
        // }
        stage('Bnstall') {
            steps {
                sh 'npm install --force'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn package -Pprod -DskipTests=true'
            }
        }
        // stage('Build-docker') {
        //     steps {
        //         bat 'docker build -t captcha-website:lastest .'
        //     }
        // }

        

        // stage('Deploy') {
        //     steps {
        //         bat 'docker run -d -p 8083:8083 captcha-website:lastest '
        //     }
        // }


       
    }

}