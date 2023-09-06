pipeline {
    agent any
    environment {
        registry = "642733809371.dkr.ecr.us-east-1.amazonaws.com/my-ecs-repo"
    }
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/dandiggle23/jenkins-ecr-eks-deploy.git'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'aws-credentials', variable: 'AWS_CREDENTIALS')]) {
                        sh 'docker build -t react-app:latest .'
                    }
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'aws-credentials', variable: 'AWS_CREDENTIALS')]) {
                        sh '''
                            aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 642733809371.dkr.ecr.us-east-1.amazonaws.com
                            docker tag react-app:latest 642733809371.dkr.ecr.us-east-1.amazonaws.com/my-ecs-repo:latest
                            docker push 642733809371.dkr.ecr.your-aws-region.amazonaws.com/my-ecs-repo:latest
                        '''
                    }
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
