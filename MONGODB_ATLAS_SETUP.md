# MongoDB Atlas Setup for Render Deployment

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" and create a free account
3. Complete email verification

## Step 2: Create a Cluster
1. Click "Create a Deployment"
2. Select **M0 (Free)** tier
3. Select your region (closest to you or us-east-1)
4. Click "Create Deployment"
5. Wait for cluster to be created (2-3 minutes)

## Step 3: Create Database User
1. Go to "Database Access" section
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter:
   - **Username:** `mongouser` (or any name)
   - **Password:** Create a strong password (save it!)
5. Select "Built-in Role: Atlas Admin"
6. Click "Create User"

## Step 4: Configure Network Access
1. Go to "Network Access" section
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add Render IP: 0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Databases"
2. Click "Connect" button on your cluster
3. Select "Drivers"
4. Copy the connection string that looks like:
```
mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

## Step 6: Replace Values in Connection String
```
mongodb+srv://mongouser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crud-app?retryWrites=true&w=majority
```

Replace:
- `mongouser` → your database username
- `YOUR_PASSWORD` → your database password (no special char encoding needed)
- Keep the cluster name (cluster0.xxxxx)
- Change `/myFirstDatabase` → `/crud-app`

## Step 7: Set on Render Dashboard
1. Go to your Render service
2. Click "Environment" tab
3. Add/update variable:
   - **Key:** `MONGODB_URI`
   - **Value:** Your connection string from Step 6
4. Click "Save"

## Step 8: Redeploy
1. Go to your service "Deploys" tab
2. Click "Deploy" to trigger new deployment
3. Check logs for "✓ Connected to MongoDB"

## Troubleshooting

**Error: "URI must include hostname, domain name, and tld"**
- Check your connection string has `@cluster...mongodb.net`
- Ensure password doesn't have invalid characters (use copy-paste from Atlas)

**Error: "authentication failed"**
- Verify username and password match what you set in Step 3
- Check connection string is URL-encoded correctly

**Network Error / Connection Timeout**
- Go to Network Access in Atlas
- Ensure Render IP is whitelisted (0.0.0.0/0 for anywhere)

**Can't create cluster**
- Check your MongoDB Atlas account email is verified
- May need to wait 1-2 minutes for account setup

## Free Tier Limits
- 512 MB storage
- 3 databases max
- Auto-pauses after 15 mins of inactivity
- Good for development/testing!
