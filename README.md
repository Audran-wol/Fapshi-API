# Easy Payment Integration - MTN Mobile Money & Orange Money with Fapshi API

<div align="center">

![Fapshi API](https://img.shields.io/badge/Fapshi-API-blue?style=for-the-badge)
![MTN Mobile Money](https://img.shields.io/badge/MTN-Mobile%20Money-orange?style=for-the-badge)
![Orange Money](https://img.shields.io/badge/Orange-Money-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**🚀 Easily integrate MTN Mobile Money and Orange Money payments into your platform**

**The simplest way to accept mobile money payments (MTN & Orange) in Central Africa**

[Quick Start](#-quick-start) • [Easy Integration](#-easy-integration-guide) • [MTN & Orange Money](#-mtn-mobile-money--orange-money-integration) • [Examples](#-examples) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Easy Integration Guide](#-easy-integration-guide)
- [MTN Mobile Money & Orange Money Integration](#-mtn-mobile-money--orange-money-integration)
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

**Looking for an easy way to integrate payment methods on your platform?** This repository provides the **simplest solution** to integrate **MTN Mobile Money** and **Orange Money** payments into your website or application using the Fapshi API.

### 💡 Why Choose This Integration?

- ✅ **Easiest Payment Integration** - Get MTN and Orange Money payments working in minutes, not days
- ✅ **Simple Setup** - Just a few lines of code to start accepting mobile money payments
- ✅ **MTN Mobile Money Support** - Accept payments via MTN Mobile Money seamlessly
- ✅ **Orange Money Support** - Accept payments via Orange Money effortlessly
- ✅ **Complete Working Example** - Full-stack demo application you can use immediately
- ✅ **Step-by-Step Guide** - Easy-to-follow documentation for beginners and experts
- ✅ **Production-Ready** - Clean, secure, and well-documented code
- ✅ **Test Before Going Live** - Sandbox mode for safe testing

### 🏦 What Payment Methods Are Supported?

**MTN Mobile Money** and **Orange Money** - the two most popular mobile money payment methods in Central Africa. With this integration, you can easily accept payments from customers using either MTN Mobile Money or Orange Money on your platform.

### What is Fapshi?

[Fapshi](https://www.fapshi.com) is a payment gateway that enables businesses in Central Africa to accept mobile money payments (**MTN Mobile Money** and **Orange Money**) and process payouts. This repository provides the **easiest way** to integrate Fapshi's payment API into your platform, allowing you to accept MTN and Orange Money payments with minimal effort.

---

## ✨ Features

### 💳 Easy Payment Integration
- **MTN Mobile Money Integration** - Easily accept MTN Mobile Money payments on your platform
- **Orange Money Integration** - Seamlessly integrate Orange Money payment method
- **Simple API Calls** - Just a few lines of code to integrate payment methods
- **Email-Based Payment** - Customers enter email, select MTN or Orange Money, and pay
- **Automatic Redirect** - Seamless payment flow with automatic redirect to success page
- **Secure Processing** - All payment processing handled securely by Fapshi
- **Transaction Tracking** - Unique transaction IDs for easy tracking

### 📱 Mobile Money Support
- **MTN Mobile Money** - Full support for MTN Mobile Money payments
- **Orange Money** - Complete integration for Orange Money payments
- **Dual Provider Support** - Accept payments from both MTN and Orange Money users
- **Easy Provider Selection** - Customers choose their preferred payment method (MTN or Orange)

### 💸 Payout/Withdrawal
- **Send Money Easily** - Send money to MTN Mobile Money accounts
- **Orange Money Payouts** - Send money to Orange Money accounts
- **Secure Processing** - Safe and secure payout processing
- **Transaction Tracking** - Track all payout transactions

### 🚀 Developer Experience
- **Easy Integration** - Get payment methods working in minutes
- **Sandbox Mode** - Test MTN and Orange Money integration without real money
- **Live Mode** - Production-ready integration for real transactions
- **Complete Documentation** - Step-by-step guides for easy integration
- **Working Example** - Full-stack demo application ready to use
- **Simple Configuration** - Easy setup with environment variables
- **Error Handling** - Clear error messages for easy debugging

---

## 🚀 Easy Integration Guide

**Integrate MTN Mobile Money and Orange Money payments in 3 simple steps:**

1. **Install** - `npm install`
2. **Configure** - Add your Fapshi API credentials to `.env`
3. **Start Accepting Payments** - Use the provided code examples to accept MTN and Orange Money payments

That's it! Your platform can now accept payments via **MTN Mobile Money** and **Orange Money** with minimal code changes.

### Why This Is The Easiest Payment Integration?

- ✅ **No Complex Setup** - Simple API calls, no complicated configurations
- ✅ **MTN Mobile Money Ready** - Built-in support for MTN Mobile Money payments
- ✅ **Orange Money Ready** - Built-in support for Orange Money payments
- ✅ **Copy-Paste Code** - Working examples you can use immediately
- ✅ **Complete Documentation** - Step-by-step guides for easy integration

---

## 💳 MTN Mobile Money & Orange Money Integration

### Accept MTN Mobile Money Payments

Easily integrate **MTN Mobile Money** as a payment method on your platform. Customers can pay using their MTN Mobile Money account with just a few clicks.

### Accept Orange Money Payments

Seamlessly integrate **Orange Money** as a payment method. Customers can pay using their Orange Money account effortlessly.

### How It Works

1. Customer selects a product/service on your platform
2. Customer enters email and chooses payment method (MTN or Orange Money)
3. Customer is redirected to Fapshi's secure payment page
4. Customer enters phone number and completes payment via MTN Mobile Money or Orange Money
5. Customer is redirected back to your success page

**Both MTN Mobile Money and Orange Money payments are handled automatically** - no need to integrate each payment method separately!

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

### Easy Payment Integration - MTN & Orange Money

**Accept MTN Mobile Money and Orange Money payments with just a few lines of code:**

```javascript
// Simple payment initiation
const response = await fetch('/api/initiate-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 5000,
    email: 'customer@example.com',
    productName: 'Product Name'
  })
});

// Customer chooses MTN Mobile Money or Orange Money on Fapshi's page
// Payment is processed automatically!
```

That's all you need! The integration handles both **MTN Mobile Money** and **Orange Money** payments automatically.

### Complete Examples

See `DEMO_API_CODE.js` for complete, simplified code examples for both **MTN Mobile Money** and **Orange Money** payment integration.

---

## 📚 API Reference

### Payment Endpoint

**`POST /api/initiate-payment`** - Accept MTN Mobile Money and Orange Money payments

```json
// Request
{
  "amount": 5000,
  "email": "customer@example.com",
  "productName": "Product Name"
}

// Response - Customer chooses MTN or Orange Money on payment page
{
  "success": true,
  "paymentLink": "https://sandbox.fapshi.com/pay/...",
  "transactionId": "fapshi-transaction-id"
}
```

### Payout Endpoint

**`POST /api/initiate-payout`** - Send money to MTN Mobile Money or Orange Money accounts

```json
// Request
{
  "amount": 10000,
  "phoneNumber": "677123456",
  "provider": "MTN"  // or "Orange"
}
```

See `server.js` for complete API implementation details.

---

## 📖 Examples

- **`DEMO_API_CODE.js`** - Simple code example for MTN Mobile Money and Orange Money integration
- **`public/`** - Complete frontend examples (HTML/JavaScript) for payment integration
- **`server.js`** - Full backend implementation with Express server and API endpoints

---

## 📄 Documentation

- **[DEMO_API_EXPLAINED.md](DEMO_API_EXPLAINED.md)** - Easy-to-understand guide for integrating MTN and Orange Money payments
- **[SETUP_LIVE_API.md](SETUP_LIVE_API.md)** - Switch from sandbox to live mode
- **[DEMO_API_CODE.js](DEMO_API_CODE.js)** - Simple code examples

**Resources:** [Fapshi Docs](https://docs.fapshi.com/en) • [Fapshi Dashboard](https://www.fapshi.com/en)

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
