// Global utility functions

// Check API mode on page load
window.addEventListener('DOMContentLoaded', () => {
    // This will be set by server response, but we can also check URL
    const apiModeEl = document.getElementById('apiMode');
    if (apiModeEl) {
        // Default to showing sandbox mode (will be updated after first API call)
        apiModeEl.textContent = '🟡 Sandbox Mode - Test Environment';
    }
});

/**
 * Show error message
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Hide error message
 */
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Show success message
 */
function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

/**
 * Hide success message
 */
function hideSuccess(elementId) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.style.display = 'none';
    }
}

/**
 * Set loading state for button
 */
function setLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    
    if (button) {
        button.disabled = isLoading;
    }
    
    if (submitText) {
        submitText.style.display = isLoading ? 'none' : 'inline';
    }
    
    if (submitLoader) {
        submitLoader.style.display = isLoading ? 'inline-block' : 'none';
    }
}

// Buy Product Function (called from index.html)
function buyProduct(productName, amount, description) {
    // Store product details in sessionStorage
    sessionStorage.setItem('productName', productName);
    sessionStorage.setItem('amount', amount);
    sessionStorage.setItem('description', description);
    
    // Redirect to checkout page
    window.location.href = '/checkout';
}

// WhatsApp Payment Function (Old Method - For Demo)
function payViaWhatsApp() {
    // Get order details
    const productName = document.getElementById('productName')?.value || sessionStorage.getItem('productName') || 'Product';
    const amount = document.getElementById('amount')?.value || sessionStorage.getItem('amount') || '0';
    const email = document.getElementById('email')?.value || '';
    
    // WhatsApp number (replace with your actual WhatsApp business number)
    const whatsappNumber = '237677123456'; // Format: country code + number (no + or spaces)
    
    // Create message
    const message = `Bonjour! Je souhaite acheter:\n\n` +
                   `Produit: ${productName}\n` +
                   `Montant: ${parseInt(amount).toLocaleString()} XAF\n` +
                   `${email ? `Email: ${email}\n` : ''}\n` +
                   `Comment puis-je procéder au paiement?`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show info message
    alert('Vous allez être redirigé vers WhatsApp.\n\n⚠️ Note: Cette méthode nécessite une communication manuelle et peut prendre du temps.\n\n💡 Pour une expérience plus rapide, utilisez le paiement sécurisé ci-dessus!');
}

// Checkout Page Logic
if (document.getElementById('checkoutForm')) {
    // Populate order summary from sessionStorage
    const productName = sessionStorage.getItem('productName');
    const amount = sessionStorage.getItem('amount');
    const description = sessionStorage.getItem('description');
    
    if (productName && amount) {
        // Populate order summary
        const orderSummary = document.getElementById('orderSummary');
        orderSummary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-item">
                <span>Product:</span>
                <span>${productName}</span>
            </div>
            ${description ? `
            <div class="summary-item">
                <span>Description:</span>
                <span style="color: var(--text-secondary); font-size: 0.875rem;">${description}</span>
            </div>
            ` : ''}
            <div class="summary-item">
                <span>Total:</span>
                <span>${parseInt(amount).toLocaleString()} XAF</span>
            </div>
        `;
        
        // Populate form fields
        document.getElementById('amount').value = amount;
        document.getElementById('productName').value = productName;
        document.getElementById('description').value = description || productName;
    } else {
        // No product selected, redirect to home
        window.location.href = '/';
    }
    
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        hideError('errorMessage');
        hideSuccess('successMessage');
        
        // Get form data
        // According to Fapshi API docs: /initiate-pay requires amount and email
        // User will select payment method (MTN/Orange) on Fapshi's checkout page
        const formData = {
            amount: document.getElementById('amount').value,
            email: document.getElementById('email').value,
            productName: document.getElementById('productName').value,
            description: document.getElementById('description').value,
            paymentMethod: document.getElementById('paymentMethod')?.value || ''
        };
        
        // Save email for success page
        sessionStorage.setItem('lastPaymentEmail', formData.email);
        
        // Validate required fields
        if (!formData.email || !formData.amount) {
            showError('errorMessage', 'Please fill in all required fields');
            return;
        }
        
        // Validate payment method selection (optional but recommended)
        if (document.getElementById('paymentMethod') && !formData.paymentMethod) {
            showError('errorMessage', 'Please select a payment method');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showError('errorMessage', 'Please enter a valid email address');
            return;
        }
        
        // Set loading state
        setLoading('submitBtn', true);
        
        try {
            // Make API call to initiate payment
            const response = await fetch('/api/initiate-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            // Check if response is ok
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `Server error: ${response.status} ${response.statusText}` }));
                showError('errorMessage', errorData.error || `Server error: ${response.status}`);
                setLoading('submitBtn', false);
                return;
            }
            
            const data = await response.json();
            
            if (data.success && data.paymentLink) {
                // Save transaction to localStorage for admin dashboard
                const transaction = {
                    id: data.externalId || data.transactionId || 'TXN-' + Date.now(),
                    date: new Date().toLocaleString(),
                    customerEmail: formData.email,
                    phone: 'N/A', // Will be entered on Fapshi page
                    product: formData.productName || 'Product',
                    amount: parseFloat(formData.amount),
                    status: 'pending'
                };
                
                // Store in localStorage for admin dashboard
                try {
                    const existing = JSON.parse(localStorage.getItem('fakeTransactions') || '[]');
                    existing.unshift(transaction);
                    localStorage.setItem('fakeTransactions', JSON.stringify(existing));
                    sessionStorage.setItem('productName', formData.productName || 'Product');
                    // Store transaction ID for success page
                    sessionStorage.setItem('pendingTransactionId', transaction.id);
                } catch (e) {
                    console.log('Could not save transaction to localStorage');
                }
                
                // Update API mode indicator if provided
                if (data.mode) {
                    const apiModeEl = document.getElementById('apiMode');
                    if (apiModeEl) {
                        if (data.mode === 'live') {
                            apiModeEl.textContent = '🔴 Live Mode - Real Transactions';
                            apiModeEl.style.color = '#e53e3e';
                        } else {
                            apiModeEl.textContent = '🟡 Sandbox Mode - Test Environment';
                        }
                    }
                }
                
                // Redirect to Fapshi payment page
                window.location.href = data.paymentLink;
            } else {
                // Show error with details
                const errorMsg = data.error || data.message || 'Failed to initiate payment';
                console.error('Payment initiation failed:', data);
                showError('errorMessage', errorMsg);
                setLoading('submitBtn', false);
            }
        } catch (error) {
            console.error('Payment request error:', error);
            let errorMsg = 'Network error. Please check your connection and try again.';
            
            // Provide more specific error messages
            if (error.message && error.message.includes('Failed to fetch')) {
                errorMsg = 'Unable to connect to server. Please make sure the server is running on port 3000.';
            } else if (error.message) {
                errorMsg = `Error: ${error.message}`;
            }
            
            showError('errorMessage', errorMsg);
            setLoading('submitBtn', false);
            
            // Scroll to error
            const errorEl = document.getElementById('errorMessage');
            if (errorEl) {
                errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

// Withdrawal Page Logic
if (document.getElementById('withdrawalForm')) {
    document.getElementById('withdrawalForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        hideError('errorMessage');
        hideSuccess('successMessage');
        const payoutResult = document.getElementById('payoutResult');
        if (payoutResult) payoutResult.style.display = 'none';
        
        // Get form data
        const formData = {
            amount: document.getElementById('payoutAmount').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            provider: document.getElementById('provider').value
        };
        
        // Validate
        if (!formData.amount || !formData.phoneNumber || !formData.provider) {
            showError('errorMessage', 'Please fill in all required fields and select a payment provider');
            return;
        }
        
        // Validate amount
        if (parseFloat(formData.amount) < 500) {
            showError('errorMessage', 'Amount must be at least 500 XAF');
            return;
        }
        
        // Validate phone number format
        const cleanPhone = formData.phoneNumber.replace(/\s+/g, '');
        const phoneRegex = /^[0-9]{9,12}$/;
        if (!phoneRegex.test(cleanPhone)) {
            showError('errorMessage', 'Invalid phone number format');
            return;
        }
        
        formData.phoneNumber = cleanPhone;
        
        // Set loading state
        setLoading('submitBtn', true);
        
        try {
            // Make API call to initiate payout
            const response = await fetch('/api/initiate-payout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            // Check if response is ok
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `Server error: ${response.status} ${response.statusText}` }));
                showError('errorMessage', errorData.error || `Server error: ${response.status}`);
                setLoading('submitBtn', false);
                return;
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Save withdrawal to localStorage for admin dashboard
                const withdrawal = {
                    id: data.payoutId || data.externalId || 'PAYOUT-' + Date.now(),
                    date: new Date().toLocaleString(),
                    recipientName: 'User',
                    phone: formData.phoneNumber,
                    provider: formData.provider,
                    amount: parseFloat(formData.amount),
                    status: data.status === 'success' ? 'success' : 'pending'
                };
                
                try {
                    const withdrawals = JSON.parse(localStorage.getItem('fakeWithdrawals') || '[]');
                    withdrawals.unshift(withdrawal);
                    localStorage.setItem('fakeWithdrawals', JSON.stringify(withdrawals));
                } catch (e) {
                    console.log('Could not save withdrawal to localStorage');
                }
                
                // Show success message
                showSuccess('successMessage', 'Payout initiated successfully!');
                
                // Display payout result
                const payoutResult = document.getElementById('payoutResult');
                const resultContent = document.getElementById('resultContent');
                
                if (payoutResult && resultContent) {
                    resultContent.innerHTML = `
                        <div class="detail-row">
                            <strong>Status:</strong> <span style="color: var(--accent-color); font-weight: 600;">${data.status || 'Pending'}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Payout ID:</strong> ${data.payoutId || data.data?.id || withdrawal.id}
                        </div>
                        <div class="detail-row">
                            <strong>External ID:</strong> <code style="font-size: 0.875rem;">${data.externalId || 'N/A'}</code>
                        </div>
                        <div class="detail-row">
                            <strong>Amount:</strong> <span style="color: var(--accent-color); font-weight: 600;">${parseFloat(formData.amount).toLocaleString()} XAF</span>
                        </div>
                        <div class="detail-row">
                            <strong>Recipient:</strong> ${formData.phoneNumber} (${formData.provider})
                        </div>
                        ${data.message ? `<div class="detail-row"><strong>Message:</strong> ${data.message}</div>` : ''}
                        <div class="detail-row" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border-color);">
                            <a href="/admin" class="btn btn-primary" style="text-decoration: none; display: inline-block;">View in Dashboard</a>
                        </div>
                    `;
                    
                    payoutResult.style.display = 'block';
                    
                    // Scroll to result
                    payoutResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Reset form and clear selected payment buttons after a delay
                setTimeout(() => {
                    document.getElementById('withdrawalForm').reset();
                    document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
                    if (document.getElementById('provider')) {
                        document.getElementById('provider').value = '';
                    }
                }, 3000);
            } else {
                // Show error with details if available
                let errorMsg = data.error || 'Failed to initiate payout';
                if (data.details) {
                    console.error('Payout error details:', data.details);
                }
                showError('errorMessage', errorMsg);
                
                // Scroll to error
                const errorEl = document.getElementById('errorMessage');
                if (errorEl) {
                    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            
            setLoading('submitBtn', false);
        } catch (error) {
            console.error('Payout request error:', error);
            let errorMsg = 'Network error. Please check your connection and try again.';
            
            // Try to parse error response if available
            if (error.message.includes('Failed to fetch')) {
                errorMsg = 'Unable to connect to server. Please check your internet connection.';
            } else if (error.message) {
                errorMsg = `Error: ${error.message}`;
            }
            
            showError('errorMessage', errorMsg);
            setLoading('submitBtn', false);
            
            // Scroll to error
            const errorEl = document.getElementById('errorMessage');
            if (errorEl) {
                errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

// Phone number formatting (remove spaces) - for withdrawal page only
if (document.getElementById('phoneNumber')) {
    document.getElementById('phoneNumber').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\s+/g, '');
    });
}


