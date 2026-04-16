# Deployment Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
# No npm install needed for vanilla JS frontend
```

### 3. Create Environment Files

#### Backend (.env)
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crud-app
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```
API_URL=http://localhost:3000/api/tasks
```

## Running the Application

### Development
```bash
# From backend directory
npm run dev
# or
npm start
```

Server runs on: `http://localhost:3000`

### Production
1. Update `.env` files with production values
2. Set `NODE_ENV=production`
3. Update `MONGODB_URI` to production database
4. Update `CORS_ORIGIN` to production domain
5. Run: `npm start`

## MongoDB Setup

See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed MongoDB configuration.

## API Endpoints

- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## .gitignore Files

✓ Root `.gitignore` - protects .env files
✓ Backend `.gitignore` - protects node_modules, .env
✓ Frontend `.gitignore` - protects node_modules, .env

All .env files are protected and won't be committed to Git.

## Troubleshooting

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify MONGODB_URI is correct
- See MONGODB_SETUP.md for detailed help

**CORS Error**
- Update CORS_ORIGIN in backend .env
- Should match frontend domain

**Port Already in Use**
- Change PORT in .env
- Or kill process using port 3000

## Next Steps for Deployment
1. Set up MongoDB Atlas account (for cloud database)
2. Configure environment variables for production
3. Deploy to hosting service (Heroku, Railway, etc.)
4. Update frontend API URL to production backend
