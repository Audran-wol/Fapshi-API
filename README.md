# Fapshi API - Complete Integration Guide & Documentation

<div align="center">

![Fapshi API](https://img.shields.io/badge/Fapshi-API-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Complete integration guide and working example for Fapshi Payment API**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference) • [Examples](#-examples)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**Fapshi API** is a comprehensive integration guide and working example for integrating Fapshi's payment collection and payout services into your applications. This repository provides:

- ✅ **Complete working example** - Full-stack Node.js application demonstrating Fapshi integration
- ✅ **Step-by-step documentation** - Easy-to-follow guides for beginners and experts
- ✅ **Payment Collection** - Accept payments via MTN Mobile Money and Orange Money
- ✅ **Payout/Withdrawal** - Send money to customers' mobile money accounts
- ✅ **Sandbox & Live modes** - Test safely before going to production
- ✅ **Production-ready code** - Clean, well-documented, and secure

### What is Fapshi?

[Fapshi](https://www.fapshi.com) is a payment gateway that enables businesses in Central Africa to accept mobile money payments (MTN Mobile Money and Orange Money) and process payouts. This repository helps developers integrate Fapshi's API quickly and efficiently.

---

## ✨ Features

### Payment Collection
- 💳 Accept payments via MTN Mobile Money and Orange Money
- 🔒 Secure payment processing handled by Fapshi
- 📧 Email-based payment initiation
- 🔄 Automatic redirect to payment success page
- 📊 Transaction tracking with unique external IDs

### Payout/Withdrawal
- 💸 Send money to mobile money accounts
- 📱 Support for MTN and Orange Money providers
- 🔐 Secure payout processing
- 📈 Transaction status tracking

### Developer Experience
- 🧪 **Sandbox Mode** - Test without real money
- 🚀 **Live Mode** - Production-ready integration
- 📚 **Comprehensive Documentation** - Multiple guides for different skill levels
- 💻 **Working Example** - Full-stack demo application
- 🔧 **Easy Configuration** - Simple environment variable setup
- 🐛 **Error Handling** - Detailed error messages and debugging

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Fapshi Account** - [Sign up](https://www.fapshi.com/en)
- **API Credentials** - Get from your Fapshi dashboard

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Audran-wol/Fapshi-API.git
cd Fapshi-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Fapshi API Credentials (Get from https://www.fapshi.com/en)
FAPSHI_API_USER=your_api_user_here
FAPSHI_API_KEY=your_api_key_here

# API Base URL
# Use sandbox for testing: https://sandbox.fapshi.com
# Use live for production: https://live.fapshi.com
FAPSHI_BASE_URL=https://sandbox.fapshi.com

# Optional: Business ID
FAPSHI_BUSINESS_ID=your_business_id

# Server Port
PORT=3000
```

**How to get your API credentials:**
1. Log into [Fapshi Dashboard](https://www.fapshi.com/en)
2. Navigate to **Dashboard** → **Merchants** → **Services**
3. Click **"New Service"** to create a service
4. Copy your `apiuser` and `apikey` (shown only once!)

### 4. Start the Server

```bash
npm start
```

### 5. Open Your Browser

Visit `http://localhost:3000` to see the demo application in action!

---

## 📥 Installation

### Using npm

```bash
npm install
```

### Using yarn

```bash
yarn install
```

### Dependencies

This project uses the following key dependencies:

- **express** - Web server framework
- **axios** - HTTP client for API requests
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **uuid** - Unique ID generation

See `package.json` for the complete list.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `FAPSHI_API_USER` | ✅ Yes | Your Fapshi API username | `your_api_user` |
| `FAPSHI_API_KEY` | ✅ Yes | Your Fapshi API key | `your_api_key` |
| `FAPSHI_BASE_URL` | ✅ Yes | Fapshi API base URL | `https://sandbox.fapshi.com` |
| `FAPSHI_BUSINESS_ID` | ❌ No | Your business ID | `LUCUD0` |
| `PORT` | ❌ No | Server port (default: 3000) | `3000` |

### Sandbox vs Live Mode

**Sandbox Mode (Testing):**
```env
FAPSHI_BASE_URL=https://sandbox.fapshi.com
```
- Use for testing and development
- No real money transactions
- Test payment flows safely

**Live Mode (Production):**
```env
FAPSHI_BASE_URL=https://live.fapshi.com
```
- Use for real transactions
- Charges real money
- Requires verified Fapshi account

⚠️ **Warning:** Live mode uses real money! Test thoroughly in sandbox first.

---

## 💻 Usage

### Payment Collection Flow

1. **Customer selects a product** on your website
2. **Customer enters email** on checkout page
3. **Your app calls Fapshi API** to initiate payment
4. **Customer is redirected** to Fapshi's secure payment page
5. **Customer enters phone number** and completes payment
6. **Customer is redirected back** to your success page

### Payout/Withdrawal Flow

1. **You initiate a payout** via API call
2. **Fapshi processes the payment**
3. **Money is sent** to recipient's mobile money account
4. **You receive confirmation** with payout ID

### Code Examples

#### Initiate Payment

```javascript
const response = await fetch('/api/initiate-payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 5000,              // Amount in XAF (minimum 100)
    email: 'customer@example.com',
    productName: 'Product Name',
    description: 'Product description'
  })
});

const data = await response.json();
if (data.success) {
  window.location.href = data.paymentLink; // Redirect to payment page
}
```

#### Initiate Payout

```javascript
const response = await fetch('/api/initiate-payout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 10000,             // Amount in XAF (minimum 500)
    phoneNumber: '677123456',  // Phone number without spaces
    provider: 'MTN'            // 'MTN' or 'Orange'
  })
});

const data = await response.json();
if (data.success) {
  console.log('Payout ID:', data.payoutId);
}
```

See `DEMO_API_CODE.js` for a complete simplified example.

---

## 📚 API Reference

### Backend Endpoints

#### `POST /api/initiate-payment`

Initiates a payment with Fapshi.

**Request Body:**
```json
{
  "amount": 5000,
  "email": "customer@example.com",
  "productName": "Product Name",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "success": true,
  "paymentLink": "https://sandbox.fapshi.com/pay/...",
  "externalId": "unique-transaction-id",
  "transactionId": "fapshi-transaction-id",
  "mode": "sandbox"
}
```

#### `POST /api/initiate-payout`

Initiates a payout to a mobile money account.

**Request Body:**
```json
{
  "amount": 10000,
  "phoneNumber": "677123456",
  "provider": "MTN"
}
```

**Response:**
```json
{
  "success": true,
  "payoutId": "payout-id",
  "externalId": "unique-payout-id",
  "status": "pending"
}
```

#### `POST /api/webhook`

Webhook endpoint for receiving payment status updates from Fapshi.

### Fapshi API Endpoints

#### `POST /initiate-pay`

Fapshi's payment initiation endpoint.

**Headers:**
```
apiuser: your_api_user
apikey: your_api_key
Content-Type: application/json
```

**Body:**
```json
{
  "amount": 5000,
  "email": "customer@example.com",
  "redirectUrl": "https://yoursite.com/success",
  "externalId": "unique-id",
  "message": "Product description"
}
```

#### `POST /payout`

Fapshi's payout endpoint (requires disbursement service).

**Headers:**
```
apiuser: your_disbursement_api_user
apikey: your_disbursement_api_key
Content-Type: application/json
```

**Body:**
```json
{
  "amount": 10000,
  "phone": "677123456",
  "provider": "MTN",
  "externalId": "unique-id"
}
```

---

## 📖 Examples

### Complete Payment Example

See `DEMO_API_CODE.js` for a simplified, tutorial-friendly example.

### Frontend Integration

The `public/` directory contains complete HTML/JavaScript examples:
- `index.html` - Product catalog with payment buttons
- `checkout.html` - Checkout page with form validation
- `withdrawal.html` - Payout testing interface
- `app.js` - Frontend JavaScript with API calls

### Backend Integration

See `server.js` for complete backend implementation with:
- Express server setup
- API endpoint handlers
- Error handling
- Request validation
- Response formatting

---

## 📄 Documentation

This repository includes multiple documentation files:

- **[README.md](README.md)** - This file (main documentation)
- **[DEMO_API_EXPLAINED.md](DEMO_API_EXPLAINED.md)** - Simplified explanation for tutorials
- **[SETUP_LIVE_API.md](SETUP_LIVE_API.md)** - Guide for switching to live mode
- **[DEMO_API_CODE.js](DEMO_API_CODE.js)** - Simplified code example

### Additional Resources

- [Fapshi Official Documentation](https://docs.fapshi.com/en)
- [Fapshi API Reference](https://docs.fapshi.com/en/api-reference)
- [Fapshi Dashboard](https://www.fapshi.com/en)

---

## 🔧 Troubleshooting

### Common Issues

#### "No service available" Error

**Solution:**
1. Log into Fapshi dashboard
2. Go to **Merchants** → **Services**
3. Click **"New Service"** to create a service
4. Copy your API credentials

#### Payment Initiation Fails

**Check:**
- ✅ API credentials are correct in `.env` file
- ✅ Using correct base URL (sandbox vs live)
- ✅ Amount is at least 100 XAF
- ✅ Email format is valid
- ✅ Server is running on correct port

#### Payout Fails

**Check:**
- ✅ You have a disbursement service set up
- ✅ Disbursement API credentials are configured
- ✅ Payouts are enabled for your account
- ✅ Phone number format is correct (9-12 digits, no spaces)
- ✅ Amount is at least 500 XAF

#### Server Won't Start

**Check:**
- ✅ All dependencies installed (`npm install`)
- ✅ `.env` file exists with valid credentials
- ✅ Port 3000 is not already in use
- ✅ Node.js version is 14 or higher

### Getting Help

- Check the [Troubleshooting](#-troubleshooting) section above
- Review [Fapshi Documentation](https://docs.fapshi.com/en)
- Open an [Issue](https://github.com/Audran-wol/Fapshi-API/issues) on GitHub
- Contact [Fapshi Support](https://www.fapshi.com/en)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

### Need Help?

- 📖 Check the [Documentation](#-documentation) section
- 🐛 Open an [Issue](https://github.com/Audran-wol/Fapshi-API/issues)
- 📧 Contact [Fapshi Support](https://www.fapshi.com/en)

### Related Links

- [Fapshi Website](https://www.fapshi.com)
- [Fapshi Documentation](https://docs.fapshi.com/en)
- [Fapshi Dashboard](https://www.fapshi.com/en)

---

## 🌟 Star History

If you find this repository helpful, please consider giving it a ⭐ star!

---

<div align="center">

**Made with ❤️ for the Fapshi developer community**

[⬆ Back to Top](#fapshi-api---complete-integration-guide--documentation)

</div>
