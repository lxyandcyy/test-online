pipeline { 
    agent any 
    stages { 
        stage('Package') { 
            steps { 
                sh "'mvn' -Dmaven.test.failure.ignore clean package" 
            } 
        } 
        stage('Results') { 
            steps { 
                junit '**/target/surefire-reports/TEST-*.xml' 
            } 
        } 
        stage('Deploy') { 
            steps { 
                echo "pipeline success!" 
                archive 'target/*.jar' 
            } 
        }                    
    } 
    post { 
        always { 
            mail to: 'service@58jb.com', 
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}", 
                body: "Something is wrong with ${env.BUILD_URL}" 
        } 
    } 
}
