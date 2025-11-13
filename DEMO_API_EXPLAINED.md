# Fapshi API Integration - Simplified Explanation

## 📚 Perfect for Tutorial Videos

This document explains the key concepts of Fapshi API integration in simple terms.

---

## 🔑 Key Concepts

### 1. **API Authentication**
Every request to Fapshi needs two things:
- **API User** (`apiuser`): Your username
- **API Key** (`apikey`): Your secret key (like a password)

```javascript
headers: {
    'apiuser': 'your_api_user',
    'apikey': 'your_api_key'
}
```

### 2. **Payment Flow (Collection)**

```
Customer → Your Website → Fapshi Payment Page → Customer Pays → Success Page
```

**What happens:**
1. Customer clicks "Buy" on your website
2. Your code calls Fapshi API with amount and email
3. Fapshi returns a payment link
4. Customer is redirected to Fapshi's secure payment page
5. Customer enters phone number and pays
6. Customer is redirected back to your success page

### 3. **Payout Flow (Withdrawal)**

```
Your Website → Fapshi API → Money Sent to Customer's Phone
```

**What happens:**
1. You call Fapshi API with amount, phone number, and provider
2. Fapshi processes the payment
3. Money is sent directly to customer's mobile money account

---

## 📝 Step-by-Step Code Explanation

### **Step 1: Setup**
```javascript
const FAPSHI_API_USER = 'your_api_user';
const FAPSHI_API_KEY = 'your_api_key';
const FAPSHI_BASE_URL = 'https://sandbox.fapshi.com';
```
**What this does:** Stores your API credentials and the Fapshi server address.

---

### **Step 2: Initiate Payment**

```javascript
const paymentData = {
    amount: 5000,                    // How much to charge
    email: 'customer@example.com',   // Customer's email
    redirectUrl: 'https://yoursite.com/success',  // Where to go after payment
    externalId: 'TXN-12345'          // Your unique transaction ID
};
```

**What this does:** Prepares the payment information.

```javascript
const response = await fetch(`${FAPSHI_BASE_URL}/initiate-pay`, {
    method: 'POST',
    headers: {
        'apiuser': FAPSHI_API_USER,
        'apikey': FAPSHI_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
});
```

**What this does:** Sends the payment request to Fapshi.

```javascript
const data = await response.json();
if (data.link) {
    window.location.href = data.link;  // Redirect to payment page
}
```

**What this does:** Gets the payment link and redirects the customer.

---

### **Step 3: Handle Success**

When customer completes payment, they're redirected back to your site:

```javascript
// URL: https://yoursite.com/success?transactionId=123&status=success
const urlParams = new URLSearchParams(window.location.search);
const transactionId = urlParams.get('transactionId');
const status = urlParams.get('status');

if (status === 'success') {
    // Payment successful! Update your database
}
```

---

### **Step 4: Initiate Payout**

```javascript
const payoutData = {
    amount: 10000,
    phone: '677123456',
    provider: 'MTN'  // or 'Orange'
};

const response = await fetch(`${FAPSHI_BASE_URL}/payout`, {
    method: 'POST',
    headers: {
        'apiuser': FAPSHI_API_USER,
        'apikey': FAPSHI_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payoutData)
});
```

**What this does:** Sends money to customer's mobile money account.

---

## 🎯 Key Points to Explain in Your Video

1. **Two Main Endpoints:**
   - `/initiate-pay` - For collecting money from customers
   - `/payout` - For sending money to customers

2. **Required Parameters:**
   - Payment: `amount`, `email`
   - Payout: `amount`, `phone`, `provider`

3. **Authentication:**
   - Always include `apiuser` and `apikey` in headers

4. **Response Handling:**
   - Payment returns a `link` to redirect customer
   - Payout returns `status` and `payoutId`

5. **Error Handling:**
   - Always check for errors in response
   - Handle network errors gracefully

---

## 💡 Common Questions

**Q: What's the minimum amount?**
- Payment: 100 XAF
- Payout: 500 XAF

**Q: Do I need to handle the payment page?**
- No! Fapshi handles the payment page. You just redirect the customer.

**Q: How do I know if payment succeeded?**
- Customer is redirected back with `status=success` in the URL
- You can also set up webhooks for real-time notifications

**Q: Can I test without real money?**
- Yes! Use `https://sandbox.fapshi.com` for testing
- Use `https://live.fapshi.com` for real transactions

---

## 📹 Video Script Suggestions

1. **Start:** "Today I'll show you how to integrate Fapshi payments"
2. **Show:** The simplified code (`DEMO_API_CODE.js`)
3. **Explain:** Each step as you go through it
4. **Demo:** Show it working in the actual application
5. **End:** "That's it! Just 4 simple steps to integrate payments"

