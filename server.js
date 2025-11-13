require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Fapshi API Configuration
const FAPSHI_BASE_URL = process.env.FAPSHI_BASE_URL || 'https://sandbox.fapshi.com';
const FAPSHI_API_USER = process.env.FAPSHI_API_USER?.trim();
const FAPSHI_API_KEY = process.env.FAPSHI_API_KEY?.trim();

// Determine if we're in live or sandbox mode
const IS_LIVE_MODE = FAPSHI_BASE_URL.includes('live.fapshi.com') || FAPSHI_BASE_URL.includes('api.fapshi.com');

// Validate API credentials
if (!FAPSHI_API_USER || !FAPSHI_API_KEY) {
  console.error('ERROR: FAPSHI_API_USER and FAPSHI_API_KEY must be set in .env file');
  console.error('\nTo get your API keys:');
  console.error('1. Log into https://www.fapshi.com/en');
  console.error('2. Go to Dashboard → Merchants → Services');
  console.error('3. Click "New Service" to create a service');
  console.error('4. Copy your API user and API key');
  console.error('5. Add them to your .env file\n');
  process.exit(1);
}

// Log API configuration (partial for security)
console.log('\n=== Fapshi API Configuration ===');
console.log('Mode:', IS_LIVE_MODE ? '🔴 LIVE (Real Transactions)' : '🟡 SANDBOX (Test Mode)');
console.log('Base URL:', FAPSHI_BASE_URL);
console.log('API User:', FAPSHI_API_USER.substring(0, 8) + '...' + FAPSHI_API_USER.substring(FAPSHI_API_USER.length - 4));
console.log('API Key:', FAPSHI_API_KEY.substring(0, 8) + '...' + FAPSHI_API_KEY.substring(FAPSHI_API_KEY.length - 4));
if (IS_LIVE_MODE) {
  console.log('⚠️  WARNING: You are using LIVE mode. Real money will be charged!');
}
console.log('================================\n');

// Routes

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve checkout page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve withdrawal page
app.get('/withdrawal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'withdrawal.html'));
});

// Serve success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

/**
 * Initiate Payment Endpoint
 * Creates a payment link using Fapshi's initiate-pay endpoint
 */
app.post('/api/initiate-payment', async (req, res) => {
  try {
    const { amount, email, productName, description } = req.body;

    // Validate required fields according to Fapshi API documentation
    // /initiate-pay requires: amount (min 100 XAF) and email
    if (!amount || !email) {
      return res.status(400).json({
        success: false,
        error: 'Amount and email are required'
      });
    }

    // Validate amount (minimum 100 FCFA according to docs, but we use 500 for consistency)
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 100) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be at least 100 FCFA/XAF (minimum required by Fapshi)'
      });
    }
    
    // Warn if amount is below recommended minimum
    if (amountNum < 500) {
      console.warn(`Warning: Amount ${amountNum} XAF is below recommended minimum of 500 XAF`);
    }

    // Validate email format (required for initiate-pay)
    // Accept any valid email format - for sandbox testing, any email works
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address (e.g., test@example.com)'
      });
    }
    
    // Clean email - remove any whitespace
    const cleanEmail = email.trim().toLowerCase();

    // Generate unique external ID for transaction tracking
    const externalId = uuidv4();

    // Prepare payment data for Fapshi API /initiate-pay endpoint
    // According to docs: amount and email are required
    // Optional: redirectUrl, userId, externalId, message
    // Note: phone and medium are NOT parameters for initiate-pay
    // User will select payment method (MTN/Orange) on Fapshi's checkout page
    const paymentData = {
      amount: amountNum,
      email: cleanEmail,
      redirectUrl: `${req.protocol}://${req.get('host')}/success`,
      externalId: externalId
    };

    // Add message/description if provided (optional field)
    if (description) {
      paymentData.message = description;
    } else if (productName) {
      paymentData.message = productName;
    }

    // Log request for debugging (remove sensitive data in production)
    console.log('Sending payment request to Fapshi:', {
      url: `${FAPSHI_BASE_URL}/initiate-pay`,
      data: { ...paymentData, email: cleanEmail.substring(0, 5) + '...' },
      headers: { apiuser: FAPSHI_API_USER.substring(0, 8) + '...' }
    });

    // Make request to Fapshi API
    const response = await axios.post(
      `${FAPSHI_BASE_URL}/initiate-pay`,
      paymentData,
      {
        headers: {
          'apiuser': FAPSHI_API_USER,
          'apikey': FAPSHI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return payment link to frontend
    res.json({
      success: true,
      paymentLink: response.data.link || response.data.paymentLink,
      externalId: externalId,
      transactionId: response.data.transactionId || response.data.id,
      message: 'Payment initiated successfully',
      mode: IS_LIVE_MODE ? 'live' : 'sandbox'
    });

  } catch (error) {
    // Log full error details for debugging
    console.error('=== Fapshi API Error ===');
    console.error('Status:', error.response?.status);
    console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request Data:', JSON.stringify(error.config?.data, null, 2));
    console.error('Error Message:', error.message);
    
    // Check if it's a network error (no response from Fapshi)
    if (!error.response) {
      console.error('Network Error: Could not reach Fapshi API');
      return res.status(503).json({
        success: false,
        error: 'Unable to connect to Fapshi API. Please check your internet connection and API credentials.'
      });
    }
    
    // Extract error message from Fapshi API response
    let errorMessage = 'Failed to initiate payment. Please try again.';
    let errorDetails = null;
    
    if (error.response?.data) {
      // Handle different error response formats from Fapshi
      const responseData = error.response.data;
      
      // Check for various error message fields
      errorMessage = responseData.message || 
                    responseData.error || 
                    responseData.msg ||
                    responseData.detail ||
                    (typeof responseData === 'string' ? responseData : errorMessage);
      
      // Store full error details for debugging
      errorDetails = responseData;
      
      // Fix common Fapshi API error message typos/formatting
      if (errorMessage.toLowerCase().includes('userld') || errorMessage.toLowerCase().includes('user id')) {
        errorMessage = 'Invalid user ID. This may be an API configuration issue. Please check your Fapshi API credentials.';
      }
      
      // Check if it's an authentication error
      if (error.response.status === 401 || errorMessage.toLowerCase().includes('unauthorized')) {
        errorMessage = 'Invalid API credentials. Please check your FAPSHI_API_USER and FAPSHI_API_KEY in .env file.';
      }
    }
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: errorMessage,
      details: errorDetails || (process.env.NODE_ENV === 'development' ? error.message : undefined)
    });
  }
});

/**
 * Initiate Payout Endpoint
 * Sends money to a user's mobile money account
 * Note: Requires a separate disbursement service
 */
app.post('/api/initiate-payout', async (req, res) => {
  try {
    const { amount, phoneNumber, provider } = req.body;

    // Validate required fields
    if (!amount || !phoneNumber || !provider) {
      return res.status(400).json({
        success: false,
        error: 'Amount, phone number, and provider are required'
      });
    }

    // Validate amount (minimum 500 FCFA)
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 500) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be at least 500 FCFA/XAF'
      });
    }

    // Validate provider
    const validProviders = ['MTN', 'Orange'];
    if (!validProviders.includes(provider)) {
      return res.status(400).json({
        success: false,
        error: 'Provider must be either MTN or Orange'
      });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[0-9]{9,12}$/;
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format'
      });
    }

    // Check if disbursement credentials are available
    const DISBURSEMENT_API_USER = process.env.FAPSHI_DISBURSEMENT_API_USER || FAPSHI_API_USER;
    const DISBURSEMENT_API_KEY = process.env.FAPSHI_DISBURSEMENT_API_KEY || FAPSHI_API_KEY;

    // Generate unique external ID for payout tracking
    const externalId = uuidv4();

    // Prepare payout data for Fapshi API
    // According to Fapshi docs, payout endpoint may use different parameter names
    // Common formats: phone/phoneNumber, medium/provider
    const payoutData = {
      amount: amountNum,
      phone: cleanPhone, // Try 'phone' first (common in mobile money APIs)
      phoneNumber: cleanPhone, // Also include phoneNumber as fallback
      medium: provider === 'MTN' ? 'mobile money' : 'orange money', // Use medium format
      provider: provider, // Keep provider as well
      externalId: externalId
    };

    // Log payout request for debugging
    console.log('Sending payout request to Fapshi:', {
      url: `${FAPSHI_BASE_URL}/payout`,
      data: { ...payoutData, phone: cleanPhone.substring(0, 3) + '...' },
      headers: { apiuser: DISBURSEMENT_API_USER.substring(0, 8) + '...' }
    });

    // Make request to Fapshi API
    const response = await axios.post(
      `${FAPSHI_BASE_URL}/payout`,
      payoutData,
      {
        headers: {
          'apiuser': DISBURSEMENT_API_USER,
          'apikey': DISBURSEMENT_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return payout result
    res.json({
      success: true,
      payoutId: response.data.payoutId || response.data.id || response.data.transactionId,
      externalId: externalId,
      status: response.data.status || response.data.state || 'pending',
      message: 'Payout initiated successfully',
      data: response.data // Include full response for debugging
    });

  } catch (error) {
    // Log full error details for debugging
    console.error('=== Fapshi Payout API Error ===');
    console.error('Status:', error.response?.status);
    console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request Data:', JSON.stringify(error.config?.data, null, 2));
    console.error('Error Message:', error.message);
    
    // Extract error message from Fapshi API response
    let errorMessage = 'Failed to initiate payout. Please check if you have a disbursement service enabled.';
    let errorDetails = null;
    
    if (error.response?.data) {
      const responseData = error.response.data;
      
      // Check for various error message fields
      errorMessage = responseData.message || 
                    responseData.error || 
                    responseData.msg ||
                    responseData.detail ||
                    (typeof responseData === 'string' ? responseData : errorMessage);
      
      errorDetails = responseData;
      
      // Provide helpful error messages
      if (error.response.status === 401 || errorMessage.toLowerCase().includes('unauthorized')) {
        errorMessage = 'Invalid API credentials. Please check your disbursement service credentials in .env file.';
      } else if (errorMessage.toLowerCase().includes('disbursement') || errorMessage.toLowerCase().includes('payout')) {
        errorMessage = 'Payout service not enabled. You need to create a separate disbursement service in your Fapshi dashboard.';
      }
    }
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: errorMessage,
      details: errorDetails || (process.env.NODE_ENV === 'development' ? error.message : undefined)
    });
  }
});

/**
 * Webhook Endpoint (Optional)
 * Receives payment status updates from Fapshi
 */
app.post('/api/webhook', (req, res) => {
  try {
    const webhookData = req.body;
    console.log('Webhook received:', JSON.stringify(webhookData, null, 2));
    
    // Here you would typically:
    // 1. Verify the webhook signature (if Fapshi provides one)
    // 2. Update your database with the transaction status
    // 3. Send notifications to users
    
    res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Fapshi Payment Simulator running on http://localhost:${PORT}`);
  console.log(`📝 Using Fapshi API: ${FAPSHI_BASE_URL}`);
  console.log(`🔑 API User: ${FAPSHI_API_USER.substring(0, 8)}...`);
  console.log(`\n✨ Visit http://localhost:${PORT} to start testing\n`);
});

