# MongoDB Connection Example

## Local MongoDB Setup
If using MongoDB locally, ensure MongoDB is installed and running:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows (with MongoDB installed)
mongod

# Linux
sudo systemctl start mongod
```

Then set in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/crud-app
```

## MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string from "Connect" button
4. Replace username, password, and cluster details

Set in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/crud-app?retryWrites=true&w=majority
```

## Troubleshooting
- **Connection refused**: Make sure MongoDB is running
- **Authentication failed**: Check username/password in connection string
- **Network error**: Ensure IP is whitelisted in MongoDB Atlas (for cloud)
