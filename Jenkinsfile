pipeline {
    agent any
    tools {
        maven 'Maven 3.9.0'
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn package -Pprod -DskipTests'
            }
        }

       
    }
}