# How to Set Up Live API (Real Transactions)

## Step-by-Step Guide to Get Your Live API Keys

### 1. Log into Fapshi Dashboard
- Go to: https://www.fapshi.com/en
- Sign in with your account

### 2. Create a Service
- Navigate to: **Dashboard** → **Merchants** → **Services**
- Click **"New Service"** button
- Fill in the service details:
  - Service Name (e.g., "Sote Beauty Shop")
  - Description
  - Other required fields
- Click **"Create Service"**

### 3. Get Your API Credentials
After creating the service:
- You'll see **"API user"** and **"API key"** displayed
- **IMPORTANT**: Copy these immediately - the API key is shown only once!
- If you lose it, you'll need to generate a new one

### 4. Update Your .env File

Open your `.env` file and update it with your **LIVE** credentials:

```env
# LIVE API Credentials (Real Transactions)
FAPSHI_API_USER=your_live_api_user_here
FAPSHI_API_KEY=your_live_api_key_here

# Change to LIVE URL
FAPSHI_BASE_URL=https://live.fapshi.com

# Your Business ID (optional)
FAPSHI_BUSINESS_ID=LUCUD0

PORT=3000
```

### 5. Restart Your Server

After updating `.env`:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm start
```

### 6. Verify You're in Live Mode

When you start the server, you should see:
```
=== Fapshi API Configuration ===
Mode: 🔴 LIVE (Real Transactions)
Base URL: https://live.fapshi.com
⚠️  WARNING: You are using LIVE mode. Real money will be charged!
```

## Important Notes

### ⚠️ WARNING: Live Mode Uses Real Money!
- **All transactions will charge real money**
- **Minimum amount**: 100 XAF (as per Fapshi API)
- **Recommended minimum**: 500 XAF
- Test thoroughly before going live!

### Switching Back to Sandbox

To switch back to test mode, change your `.env`:

```env
FAPSHI_BASE_URL=https://sandbox.fapshi.com
# Use your sandbox/test API credentials
```

### Troubleshooting

**"No service available" Error:**
- You need to create a service first in the Fapshi dashboard
- Go to Merchants → Services → New Service
- Complete the service creation process

**API Keys Not Showing:**
- Make sure your account is verified
- Check that you've completed the service creation process
- Contact Fapshi support if issues persist

**Can't See API Keys:**
- API keys are shown only once when you create a service
- If you missed them, generate new keys from the service settings
- Keep your keys secure - never share them publicly

## Testing with Real Money

Once you're in live mode:
1. Start with small amounts (500 XAF minimum recommended)
2. Test the full payment flow
3. Verify transactions in your Fapshi dashboard
4. Check your account balance

## Security Reminders

- ✅ Never commit `.env` file to git
- ✅ Never share your API keys
- ✅ Use environment variables only
- ✅ Keep your API keys secure
- ✅ Regenerate keys if compromised

