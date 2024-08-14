document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultElement = document.getElementById('conversion-result');
    
    // Populate currency options
    const fetchCurrencyList = async () => {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const currencies = Object.keys(data.rates);
        
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);s
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });
        
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    };

    // Convert currency
    const convertCurrency = async (amount, fromCurrency, toCurrency) => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        return amount * rate;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (isNaN(amount) || amount <= 0) {
            resultElement.textContent = 'Please enter a valid amount.';
            return;
        }
        
        try {
            const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } catch (error) {
            resultElement.textContent = 'Error converting currency. Please try again.';
        }
    });

    fetchCurrencyList();
});