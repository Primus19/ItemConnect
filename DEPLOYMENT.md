# ItemConnect Deployment Guide

This document provides detailed instructions for deploying the ItemConnect application in both development and production environments.

## Development Deployment

The development setup is designed for local development with hot-reloading capabilities for both frontend and backend.

### Prerequisites

- Docker Engine (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ItemConnect.git
   cd ItemConnect
   ```

2. **Start the development environment**
   ```bash
   docker-compose up
   ```
   This command will:
   - Build the Docker images if they don't exist
   - Create and start the containers for MongoDB, backend, and frontend
   - Mount the source code as volumes for hot-reloading

3. **Accessing the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017 (accessible from your host machine for database tools)

4. **Stopping the environment**
   ```bash
   # Press Ctrl+C if running in foreground, or
   docker-compose down
   ```

5. **Viewing logs**
   ```bash
   # All services
   docker-compose logs

   # Specific service
   docker-compose logs frontend
   docker-compose logs backend
   docker-compose logs mongo
   ```

## Production Deployment

The production setup is optimized for performance, security, and reliability.

### Prerequisites

- Docker Engine (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- A server with at least 1GB RAM and 10GB storage
- Domain name (optional but recommended)

### Steps

1. **Clone the repository on your server**
   ```bash
   git clone https://github.com/yourusername/ItemConnect.git
   cd ItemConnect
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```
   # MongoDB
   MONGO_USERNAME=itemconnect
   MONGO_PASSWORD=your_secure_password_here
   
   # JWT
   JWT_SECRET=your_secure_jwt_secret_here
   
   # Frontend URL
   FRONTEND_URL=https://your-domain.com
   
   # API URL for frontend
   REACT_APP_API_URL=https://your-domain.com/api
   REACT_APP_SOCKET_URL=https://your-domain.com
   ```

3. **Build the Docker images**
   ```bash
   ./build-images.sh
   ```

4. **Start the production environment**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

5. **Accessing the application**
   - If using a domain: https://your-domain.com
   - If using IP directly: http://your-server-ip

6. **Stopping the environment**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

7. **Viewing logs**
   ```bash
   # All services
   docker-compose -f docker-compose.prod.yml logs

   # Specific service
   docker-compose -f docker-compose.prod.yml logs frontend
   docker-compose -f docker-compose.prod.yml logs backend
   docker-compose -f docker-compose.prod.yml logs mongo
   ```

## Setting Up SSL with Let's Encrypt

For production environments, it's recommended to secure your application with SSL.

1. **Install Certbot**
   ```bash
   apt-get update
   apt-get install certbot
   ```

2. **Obtain SSL certificates**
   ```bash
   certbot certonly --standalone -d your-domain.com
   ```

3. **Update the nginx.conf file**
   
   Edit `frontend/nginx.conf` to include SSL configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;

       ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
       
       # Rest of your configuration...
   }
   ```

4. **Update docker-compose.prod.yml**
   
   Add volumes for SSL certificates:
   ```yaml
   frontend:
     # ... existing configuration
     volumes:
       - /etc/letsencrypt:/etc/letsencrypt:ro
   ```

5. **Restart the containers**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Database Backup and Restore

### Backup MongoDB Data

1. **Create a backup script**
   
   Create `backup-mongo.sh`:
   ```bash
   #!/bin/bash
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/path/to/backups"
   
   # Create backup directory if it doesn't exist
   mkdir -p $BACKUP_DIR
   
   # Backup MongoDB
   docker exec -it itemconnect_mongo_1 mongodump --out=/data/db/backup
   
   # Copy backup from container to host
   docker cp itemconnect_mongo_1:/data/db/backup $BACKUP_DIR/mongodb_$TIMESTAMP
   
   # Compress backup
   tar -zcvf $BACKUP_DIR/mongodb_$TIMESTAMP.tar.gz $BACKUP_DIR/mongodb_$TIMESTAMP
   
   # Remove uncompressed backup
   rm -rf $BACKUP_DIR/mongodb_$TIMESTAMP
   
   echo "Backup completed: $BACKUP_DIR/mongodb_$TIMESTAMP.tar.gz"
   ```

2. **Make the script executable**
   ```bash
   chmod +x backup-mongo.sh
   ```

3. **Set up a cron job for automated backups**
   ```bash
   crontab -e
   ```
   
   Add the following line for daily backups at 2 AM:
   ```
   0 2 * * * /path/to/ItemConnect/backup-mongo.sh
   ```

### Restore MongoDB Data

1. **Extract the backup**
   ```bash
   tar -zxvf mongodb_YYYYMMDD_HHMMSS.tar.gz
   ```

2. **Copy the backup to the container**
   ```bash
   docker cp /path/to/extracted/backup itemconnect_mongo_1:/data/db/restore
   ```

3. **Restore the database**
   ```bash
   docker exec -it itemconnect_mongo_1 mongorestore /data/db/restore
   ```

## Updating the Application

### Development Environment

1. **Pull the latest changes**
   ```bash
   git pull
   ```

2. **Restart the containers**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Production Environment

1. **Pull the latest changes**
   ```bash
   git pull
   ```

2. **Rebuild the images**
   ```bash
   ./build-images.sh
   ```

3. **Restart the containers**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Monitoring and Maintenance

### Container Health Checks

Monitor the health of your containers:
```bash
docker ps
docker stats
```

### Logs Management

Logs are configured with rotation to prevent disk space issues:
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

This configuration:
- Limits log files to 10MB each
- Keeps a maximum of 3 log files per container
- Automatically rotates logs when they reach the size limit

### Performance Tuning

For better performance in production:

1. **Increase MongoDB cache size**
   
   Edit `docker-compose.prod.yml`:
   ```yaml
   mongo:
     # ... existing configuration
     command: --wiredTigerCacheSizeGB 1
   ```

2. **Optimize Node.js memory**
   
   Edit `backend/Dockerfile`:
   ```Dockerfile
   CMD ["node", "--max-old-space-size=512", "server.js"]
   ```

## Troubleshooting

### Common Issues

1. **Container fails to start**
   
   Check container logs:
   ```bash
   docker-compose logs [service_name]
   ```

2. **MongoDB connection issues**
   
   Verify MongoDB is running:
   ```bash
   docker ps | grep mongo
   ```
   
   Check MongoDB logs:
   ```bash
   docker-compose logs mongo
   ```

3. **Frontend can't connect to backend**
   
   Verify environment variables:
   ```bash
   docker-compose config
   ```
   
   Check nginx configuration:
   ```bash
   docker exec -it itemconnect_frontend_1 cat /etc/nginx/conf.d/default.conf
   ```

### Getting Support

If you encounter issues not covered in this guide, please:
1. Check the application logs
2. Review the Docker and Docker Compose documentation
3. Contact support at support@itemconnect.example.com
