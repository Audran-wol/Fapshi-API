// Admin Dashboard JavaScript

// Sample transaction data (stored in localStorage for persistence)
function getTransactions() {
    const stored = localStorage.getItem('fakeTransactions');
    return stored ? JSON.parse(stored) : [];
}

function saveTransaction(transaction) {
    const transactions = getTransactions();
    transactions.unshift(transaction); // Add to beginning
    localStorage.setItem('fakeTransactions', JSON.stringify(transactions));
    return transactions;
}

function getWithdrawals() {
    const stored = localStorage.getItem('fakeWithdrawals');
    return stored ? JSON.parse(stored) : [];
}

function saveWithdrawal(withdrawal) {
    const withdrawals = getWithdrawals();
    withdrawals.unshift(withdrawal);
    localStorage.setItem('fakeWithdrawals', JSON.stringify(withdrawals));
    return withdrawals;
}

// Generate sample transactions for demo
function generateSampleTransactions() {
    const sampleTransactions = [
        {
            id: 'TXN-' + Date.now(),
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(),
            customerEmail: 'customer1@example.com',
            phone: '677123456',
            product: 'Body Wash Collection',
            amount: 5000,
            status: 'success'
        },
        {
            id: 'TXN-' + (Date.now() - 1000),
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
            customerEmail: 'customer2@example.com',
            phone: '690123456',
            product: 'Hydrating Serum',
            amount: 15000,
            status: 'success'
        },
        {
            id: 'TXN-' + (Date.now() - 2000),
            date: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleString(),
            customerEmail: 'customer3@example.com',
            phone: '677654321',
            product: 'Daily Moisturizer',
            amount: 500,
            status: 'pending'
        }
    ];
    
    // Only add if no transactions exist
    if (getTransactions().length === 0) {
        sampleTransactions.forEach(txn => saveTransaction(txn));
    }
}

// Load and display transactions
function loadTransactions() {
    generateSampleTransactions();
    const transactions = getTransactions();
    const tbody = document.getElementById('transactionsBody');
    const emptyState = document.getElementById('emptyTransactions');
    
    if (transactions.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        tbody.innerHTML = transactions.map(txn => `
            <tr>
                <td>${txn.date}</td>
                <td><code style="font-size: 0.875rem;">${txn.id}</code></td>
                <td>${txn.customerEmail}</td>
                <td>${txn.phone}</td>
                <td>${txn.product}</td>
                <td><strong>${txn.amount.toLocaleString()} XAF</strong></td>
                <td>
                    <span class="status-badge ${txn.status}">
                        ${txn.status === 'success' ? '✓ Success' : txn.status === 'pending' ? '⏳ Pending' : '✗ Failed'}
                    </span>
                </td>
            </tr>
        `).join('');
    }
    
    updateStats();
}

// Load and display withdrawals
function loadWithdrawals() {
    const withdrawals = getWithdrawals();
    const tbody = document.getElementById('withdrawalsBody');
    const emptyState = document.getElementById('emptyWithdrawals');
    
    if (withdrawals.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        tbody.innerHTML = withdrawals.map(wd => `
            <tr>
                <td>${wd.date}</td>
                <td><code style="font-size: 0.875rem;">${wd.id}</code></td>
                <td>${wd.recipientName || 'User'}</td>
                <td>${wd.phone}</td>
                <td>${wd.provider}</td>
                <td><strong>${wd.amount.toLocaleString()} XAF</strong></td>
                <td>
                    <span class="status-badge ${wd.status}">
                        ${wd.status === 'success' ? '✓ Success' : wd.status === 'pending' ? '⏳ Pending' : '✗ Failed'}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

// Update statistics
function updateStats() {
    const transactions = getTransactions();
    const withdrawals = getWithdrawals();
    
    const successful = transactions.filter(t => t.status === 'success');
    const pending = transactions.filter(t => t.status === 'pending');
    
    const totalReceived = successful.reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawn = withdrawals.filter(w => w.status === 'success').reduce((sum, w) => sum + w.amount, 0);
    const balance = totalReceived - totalWithdrawn;
    
    document.getElementById('totalBalance').textContent = balance.toLocaleString() + ' XAF';
    document.getElementById('totalTransactions').textContent = transactions.length;
    document.getElementById('successfulPayments').textContent = successful.length;
    document.getElementById('pendingPayments').textContent = pending.length;
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
    
    // Load data for the tab
    if (tabName === 'transactions') {
        loadTransactions();
    } else if (tabName === 'withdrawals') {
        loadWithdrawals();
    }
}

// Listen for new transactions from checkout
window.addEventListener('storage', (e) => {
    if (e.key === 'newTransaction') {
        const newTxn = JSON.parse(e.newValue);
        saveTransaction(newTxn);
        loadTransactions();
    }
});

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    loadWithdrawals();
});
