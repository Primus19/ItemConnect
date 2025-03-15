#!/bin/bash

# Exit on any error
set -e

echo "Building ItemConnect Docker images for production..."

# Build backend image
echo "Building backend image..."
docker build -t itemconnect/backend:latest ./backend

# Build frontend image
echo "Building frontend image..."
docker build -t itemconnect/frontend:latest ./frontend

echo "Docker images built successfully!"
echo ""
echo "To run the application in production mode:"
echo "  docker-compose -f docker-compose.prod.yml up -d"
echo ""
echo "To push images to Docker Hub:"
echo "  1. Run: docker login"
echo "  2. Run: docker push itemconnect/backend:latest"
echo "  3. Run: docker push itemconnect/frontend:latest"
echo ""
echo "To run the application in development mode:"
echo "  docker-compose up -d"
