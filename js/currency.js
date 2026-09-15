export const exchangeRate = 3.75;
let currentCurrency = 'dollar';

export function setCurrency(currency) {
    currentCurrency = currency;
    window.dispatchEvent(new Event('currencyChanged'));
}

export function getCurrentCurrency() {
    return currentCurrency;
}

export function formatPrice(priceUsd) {
    if (priceUsd === undefined || priceUsd === null) return '';
    if (currentCurrency === 'pen') {
        return `S/ ${(parseFloat(priceUsd) * exchangeRate).toFixed(2)}`;
    }
    return `$${parseFloat(priceUsd).toFixed(2)}`;
}

export function getCurrencyCode() {
    return currentCurrency === 'pen' ? 'PEN' : 'USD';
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.header-drop-button');
    const dropdownOptions = document.querySelectorAll('[data-currency]');

    if (!dropdownButton || !dropdownOptions) return;

    dropdownOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const currency = option.getAttribute('data-currency');
            
            dropdownOptions.forEach(opt => opt.parentElement.classList.remove('active'));
            option.parentElement.classList.add('active');
            
            if (currency === 'pen') {
                dropdownButton.textContent = 'PEN S/ ▼';
            } else {
                dropdownButton.textContent = 'USD $ ▼';
            }
            
            setCurrency(currency);
        });
    });
});
