pipeline {
    agent any
    
    tools {
       maven params.mavenVersionSetAsParameterInJob
       jdk params.javaVersionSetAsParameter 
       // most of the tools can be controlled this way
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn package -Pprod -DskipTests'
            }
        }

       
    }

}