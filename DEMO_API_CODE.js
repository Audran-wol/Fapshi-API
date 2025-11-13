/**
 * FAPSHI PAYMENT API - SIMPLIFIED DEMO CODE
 * 
 * This is a simplified example showing how to integrate Fapshi payments
 * Perfect for tutorials and learning purposes
 */

// ============================================
// STEP 1: SETUP - Configure API Credentials
// ============================================

const FAPSHI_API_USER = 'your_api_user_here';
const FAPSHI_API_KEY = 'your_api_key_here';
const FAPSHI_BASE_URL = 'https://sandbox.fapshi.com'; // Use 'https://live.fapshi.com' for production

// ============================================
// STEP 2: INITIATE PAYMENT
// ============================================

async function initiatePayment(amount, email, productName) {
    try {
        // Step 2.1: Prepare payment data
        const paymentData = {
            amount: amount,              // Amount in XAF (minimum 100)
            email: email,                // Customer email (required)
            redirectUrl: 'https://yoursite.com/success', // Where to redirect after payment
            externalId: generateUniqueId(), // Your unique transaction ID
            message: productName          // Optional: Product description
        };

        // Step 2.2: Make API request to Fapshi
        const response = await fetch(`${FAPSHI_BASE_URL}/initiate-pay`, {
            method: 'POST',
            headers: {
                'apiuser': FAPSHI_API_USER,
                'apikey': FAPSHI_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        // Step 2.3: Get response
        const data = await response.json();

        // Step 2.4: Handle response
        if (data.link) {
            // Success! Redirect customer to payment page
            window.location.href = data.link;
        } else {
            // Error occurred
            console.error('Payment failed:', data.error);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================
// STEP 3: HANDLE PAYMENT SUCCESS
// ============================================

// When customer returns from Fapshi payment page
// They'll be redirected to your redirectUrl with transaction details

function handlePaymentSuccess() {
    // Get transaction details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('transactionId');
    const status = urlParams.get('status');
    
    if (status === 'success') {
        console.log('Payment successful! Transaction ID:', transactionId);
        // Update your database, send confirmation email, etc.
    }
}

// ============================================
// STEP 4: INITIATE PAYOUT (WITHDRAWAL)
// ============================================

async function initiatePayout(amount, phoneNumber, provider) {
    try {
        // Step 4.1: Prepare payout data
        const payoutData = {
            amount: amount,              // Amount to send (minimum 500 XAF)
            phone: phoneNumber,          // Recipient phone number
            provider: provider,          // 'MTN' or 'Orange'
            externalId: generateUniqueId() // Your unique payout ID
        };

        // Step 4.2: Make API request
        const response = await fetch(`${FAPSHI_BASE_URL}/payout`, {
            method: 'POST',
            headers: {
                'apiuser': FAPSHI_API_USER,
                'apikey': FAPSHI_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payoutData)
        });

        // Step 4.3: Handle response
        const data = await response.json();
        
        if (data.status === 'success') {
            console.log('Payout successful! Payout ID:', data.payoutId);
        } else {
            console.error('Payout failed:', data.error);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateUniqueId() {
    // Generate a unique ID for tracking transactions
    return 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Customer buys a product
initiatePayment(
    5000,                           // Amount: 5000 XAF
    'customer@example.com',         // Customer email
    'Body Wash Collection'          // Product name
);

// Example 2: Send money to customer
initiatePayout(
    10000,                          // Amount: 10000 XAF
    '677123456',                    // Phone number
    'MTN'                           // Provider: MTN or Orange
);

