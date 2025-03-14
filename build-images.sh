#!/bin/bash

# Build and tag Docker images for production
docker build -t itemconnect/backend:latest ./backend
docker build -t itemconnect/frontend:latest ./frontend

# To push to Docker Hub (uncomment and run after logging in with docker login)
# docker push itemconnect/backend:latest
# docker push itemconnect/frontend:latest

echo "Docker images built successfully"
echo "To push to Docker Hub:"
echo "  1. Run: docker login"
echo "  2. Run: docker push itemconnect/backend:latest"
echo "  3. Run: docker push itemconnect/frontend:latest"