# Environment Variables Setup Guide

## Backend (.env)
```
# Server Configuration
NODE_ENV=development
PORT=3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/crud-app

# CORS Settings
CORS_ORIGIN=http://localhost:3000
```

## Frontend (.env) 
```
# API Configuration
API_URL=http://localhost:3000/api/tasks
```

## Production Deployment

### Backend (.env.production)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crud-app?retryWrites=true&w=majority
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.production)
```
API_URL=https://yourdomain.com/api/tasks
```

## Never commit .env files!
- .env files are in .gitignore ✓
- Copy .env.example and rename to .env locally
- Use environment-specific .env files for different deployments
