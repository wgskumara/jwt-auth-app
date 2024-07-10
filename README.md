# CI/CD Pipeline for Node.js Application

This repository contains the configuration for a CI/CD pipeline to deploy a Node.js application using Jenkins, Docker, SonarQube, Aqua Trivy, and Amazon EKS. The pipeline ensures code quality, security scans, and automated deployment to a Kubernetes cluster.

## Architecture

![CI/CD Pipeline Architecture](path/to/your/diagram.png)

## Pipeline Stages

1. **Git Checkout**: Jenkins pulls the latest code from the GitHub repository.
2. **Node.js Environment Setup**: Jenkins sets up the Node.js environment.
3. **Testing**: Runs Node.js tests to ensure code functionality.
4. **Code Quality Check**: SonarQube performs a code quality analysis.
5. **Filesystem Scan**: Aqua Trivy scans the filesystem for vulnerabilities.
6. **Docker Build**: Builds the Docker image for the Node.js application.
7. **Docker Image Scan**: Aqua Trivy scans the Docker image for vulnerabilities.
8. **Push Docker Image**: The Docker image is pushed to the Docker registry.
9. **Deploy to Amazon EKS**: The Docker image is deployed to the Amazon EKS cluster.
