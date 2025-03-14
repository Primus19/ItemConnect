# ItemConnect Deployment Guide

This guide provides instructions for deploying ItemConnect using Docker, Docker Compose, and Kubernetes.

## Preview Link

ItemConnect is now available at: http://10.0.7.0

Test User Credentials:
- Email: john@example.com
- Password: password123

## Deployment Options

### 1. Docker Compose (Development)

For local development or simple deployment:

```bash
# Clone the repository
git clone https://github.com/yourusername/itemconnect.git
cd itemconnect

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 2. Docker Compose (Production)

For production deployment with enhanced security:

```bash
# Clone the repository
git clone https://github.com/yourusername/itemconnect.git
cd itemconnect

# Start all services in production mode
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop all services
docker-compose -f docker-compose.prod.yml down
```

### 3. Docker Images

Use the pre-built Docker images from Docker Hub:

```bash
# Pull the latest images
docker pull itemconnect/backend:latest
docker pull itemconnect/frontend:latest

# Run the backend
docker run -d \
  --name itemconnect-backend \
  -p 5000:5000 \
  -e PORT=5000 \
  -e MONGODB_URI=mongodb://your-mongo-uri \
  -e JWT_SECRET=your-secret-key \
  -e FRONTEND_URL=https://your-frontend-url \
  itemconnect/backend:latest

# Run the frontend
docker run -d \
  --name itemconnect-frontend \
  -p 3000:3000 \
  -e REACT_APP_API_URL=https://your-api-url/api \
  -e REACT_APP_SOCKET_URL=https://your-api-url \
  itemconnect/frontend:latest
```

### 4. Kubernetes Deployment

For scalable, production-grade deployment on Kubernetes:

```bash
# Clone the repository
git clone https://github.com/yourusername/itemconnect.git
cd itemconnect

# Deploy to Kubernetes
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress

# View backend logs
kubectl logs -f deployment/backend
```

## Building Custom Docker Images

If you want to build and push your own Docker images:

```bash
# Navigate to the ItemConnect directory
cd itemconnect

# Run the build script
./build-images.sh

# Login to Docker Hub
docker login

# Push images to Docker Hub
docker push yourusername/itemconnect-backend:latest
docker push yourusername/itemconnect-frontend:latest
```

## Environment Variables

### Backend Environment Variables

- `PORT`: Port for the backend API (default: 5000)
- `NODE_ENV`: Environment mode (development, production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `FRONTEND_URL`: URL of the frontend application

### Frontend Environment Variables

- `REACT_APP_API_URL`: URL of the backend API
- `REACT_APP_SOCKET_URL`: URL for socket.io connections

## SSL/TLS Configuration

For production deployments, it's recommended to set up SSL/TLS:

1. With Docker Compose, you can use a reverse proxy like Nginx or Traefik
2. With Kubernetes, the provided Ingress configuration supports TLS via cert-manager

## Monitoring and Maintenance

- Use Docker logs or Kubernetes logs to monitor the application
- Backup the MongoDB database regularly
- Update the Docker images for security patches

## Support

For additional help:
- Check the [API Documentation](./docs/api.md)
- Review the [Architecture Overview](./docs/architecture.md)