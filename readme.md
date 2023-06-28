# Jenkins to ECR to EKS Project

## Overview

This project aims to automate the deployment of a Dockerized application from Jenkins to Amazon Elastic Container Registry (ECR) and then to an Amazon Elastic Kubernetes Service (EKS) cluster. By leveraging Jenkins as the CI/CD tool, the project ensures a streamlined and repeatable process for building and deploying containerized applications.

## Prerequisites

Before starting the project, ensure you have the following prerequisites in place:

1. Jenkins: Set up and configured Jenkins on a server or a Jenkins-as-a-Service platform. Install necessary plugins, such as AWS Steps and Kubernetes CLI, and configure AWS credentials within Jenkins.

2. Amazon Web Services (AWS) Account: Create an AWS account to provision the required resources, including ECR and EKS.

3. Docker: Install Docker on your Jenkins server to build and push Docker images.

4. ECR Repository: Create an ECR repository in your AWS account to store Docker images.

5. EKS Cluster: Set up an EKS cluster in your AWS account to host and orchestrate the deployment of containers.

6. Kubernetes Manifest: Prepare a Kubernetes manifest file (in YAML format) that defines the desired state of the application deployment in the EKS cluster.

## Jenkins Pipeline Steps

1. **Clone Repository**: Clone the repository containing the application source code using the `git` command.

2. **Build Docker Image**: Use the Docker CLI to build the Docker image of the application. The Dockerfile should be present in the cloned repository.

3. **Push to ECR**: Authenticate with ECR using AWS credentials and push the built Docker image to the ECR repository.

4. **Deploy to EKS**: Authenticate with the EKS cluster, update the kubeconfig file with the cluster details, and apply the Kubernetes manifest file to deploy the application.

## Pipeline Script

Here's an example Jenkins pipeline script that automates the deployment process:

```groovy
pipeline {
    agent any
    
    environment {
        ECR_REPOSITORY = 'your-ecr-repository'
        IMAGE_TAG = 'latest'
        CLUSTER_NAME = 'your-eks-cluster'
        KUBECONFIG_FILE = 'kubeconfig.yaml'
        K8S_MANIFEST_FILE = 'your-kubernetes-manifest.yaml'
        AWS_REGION = 'your-aws-region'
    }
    
    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/your-username/your-app-repo.git'
            }
        }
        
        stage('Build Docker image') {
            steps {
                sh 'docker build -t $ECR_REPOSITORY:$IMAGE_TAG .'
            }
        }
        
        stage('Push to ECR') {
            steps {
                withAWS(region: AWS_REGION, credentials: 'your-aws-credentials') {
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com'
                    sh "docker tag $ECR_REPOSITORY:$IMAGE_TAG <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
                    sh "docker push <your-aws-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
                }
            }
        }
        
        stage('Deploy to EKS') {
            steps {
                withAWS(region: AWS_REGION, credentials: 'your-aws-credentials') {
                    sh "aws eks --region $AWS_REGION update-kubeconfig --name $CLUSTER_NAME --kubeconfig $KUBECONFIG_FILE"
                   
