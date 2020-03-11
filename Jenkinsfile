pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh 'ls'
      }
    }

  }
  post {
    always {
      mail(to: 'service@58jb.com', subject: "Failed Pipeline: ${currentBuild.fullDisplayName}", body: "Something is wrong with ${env.BUILD_URL}")
    }

  }
}