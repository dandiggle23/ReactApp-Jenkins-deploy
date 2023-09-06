pipeline {
    agent any
    environment {
        registry = "642733809371.dkr.ecr.us-east-1.amazonaws.com/my-ecs-repo"
    }
    stages {
         stage('Checkout external proj') {
             steps {
                 git branch: 'main',
                     credentialsId: '4df8124c-8b30-4e87-87cf-2c0dfd71369c',
                     url: 'https://github.com/dandiggle23/jenkins-ecr-eks-deploy.git'

                 sh "ls -lat"
        }
    }

        stage('Build Docker image') {
            steps {
                script {
                    sh 'docker build -t react-app:latest .'
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh '''
                            aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 642733809371.dkr.ecr.us-east-1.amazonaws.com
                            docker tag react-app:latest 642733809371.dkr.ecr.us-east-1.amazonaws.com/my-ecs-repo:latest
                            docker push 642733809371.dkr.ecr.your-aws-region.amazonaws.com/my-ecs-repo:latest
                        '''
                }
            }
        }

        stage ('Helm Deploy') {
          steps {
            script {
                sh "helm upgrade first --install mychart --namespace helm-deployment --set image.tag=latest"
                }
            }
        }
    }
}
