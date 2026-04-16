# Render Deployment Troubleshooting

## Problem 1: CORS Error (What You're Seeing)

**Error Message:**
```
Access to fetch at 'http://localhost:3000/api/tasks' from origin 'https://curl-03u3.onrender.com' 
has been blocked by CORS policy
```

**Cause:** Frontend was hardcoded to fetch from `http://localhost:3000` but the app is deployed at `https://curl-03u3.onrender.com`

**Solution:** ✅ **FIXED** - Updated frontend to use:
```javascript
const API_URL = window.location.origin + '/api/tasks';
```

This automatically uses the correct domain (localhost in development, your Render URL in production).

---

## Problem 2: MongoDB Connection Error (What You're Seeing)

**Error Message:**
```
MongoAPIError: URI must include hostname, domain name, and tld
```

**Cause:** `MONGODB_URI` environment variable was empty or invalid in Render

**Solutions:**

### Option A: Use MongoDB Atlas (Recommended for Cloud)
1. Follow [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md)
2. Get your connection string
3. Set it in Render dashboard environment variables

### Option B: Use Render's MongoDB Database (Free Tier)
1. In Render dashboard, create a new "Static Site"
2. Wait for Render to add MongoDB support
3. Or use a managed MongoDB service

---

## Quick Fix Checklist

### For Development (localhost)
- [ ] MongoDB running locally: `mongod`
- [ ] `.env` file has: `MONGODB_URI=mongodb://localhost:27017/crud-app`
- [ ] Run: `cd backend && npm start`
- [ ] Visit: `http://localhost:3000`

### For Production (Render)
- [ ] MongoDB Atlas account created
- [ ] Cluster created and user added
- [ ] IP whitelisted in Atlas (0.0.0.0/0)
- [ ] Connection string on Render environment: `MONGODB_URI=mongodb+srv://...`
- [ ] Redeploy Render service
- [ ] Check logs for "✓ Connected to MongoDB"

---

## Verify Everything Works

1. **Check Frontend:**
   - Can you see the Task Manager UI? ✓
   - Does it load without errors? ✓

2. **Check Backend Connection:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try to create a task
   - Should NOT see CORS errors ✓

3. **Check MongoDB Connection:**
   - In Render dashboard, open "Logs"
   - Should see: `✓ Connected to MongoDB`
   - If not, check MongoDB connection string

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| CORS errors | ✅ Fixed in script.js |
| MongoDB auth fails | Check username/password in CONNECTION STRING |
| Network timeout | Whitelist IP: 0.0.0.0/0 in MongoDB Atlas |
| Free tier spindown | Expected - first request takes 15-30 sec |
| Port 3000 in use | Change PORT in .env |
| Dependencies not installed | Run: `npm install` in backend folder |

---

## Need More Help?

1. Check [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md) for detailed MongoDB setup
2. Check [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md) for deployment steps
3. Check [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for Render-specific config
4. Check Render logs for detailed error messages

---

## Files Modified

✅ **frontend/script.js** - Now uses dynamic API URL
✅ **render.yaml** - Fixed MONGODB_URI configuration
✅ **backend/server.js** - Better MongoDB error handling
