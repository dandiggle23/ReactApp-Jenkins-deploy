pipeline {
    agent any

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
                            aws ecr get-login-password --region your-aws-region | docker login --username AWS --password-stdin 642733809371.dkr.ecr.your-aws-region.amazonaws.com
                            docker tag react-app:latest 642733809371.dkr.ecr.us-east-1.amazonaws.com/react-app:latest
                            docker push 642733809371.dkr.ecr.your-aws-region.amazonaws.com/react-app:latest
                        '''
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'aws-credentials', variable: 'AWS_CREDENTIALS')]) {
                        sh '''
                            aws eks --region us-east-1 update-kubeconfig --name my-eksfar-cluster --kubeconfig kubeconfig.yaml
                            kubectl --kubeconfig kubeconfig.yaml apply -f deployment.yaml
                        '''
                    }
                }
            }
        }
    }
}
