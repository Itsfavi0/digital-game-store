import { formatPrice } from './currency.js';

const cart = [];

const cartItems = document.getElementById("cart-content");
const cartCounter = document.getElementById("cart-counter");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartSidebarClose = document.getElementById("cart-sidebar-close");
const cartTotalPrice = document.getElementById("cart-total-price");

if (cartToggleBtn && cartSidebar && cartOverlay && cartSidebarClose) {
    cartToggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("show");
    });

    cartSidebarClose.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("show");
    });

    cartOverlay.addEventListener("click", () => {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("show");
    });
}

export function addCart(game) {
    cart.push(game);
    updateCounter();
    renderCart();
}

function updateCounter() {
    if (cartCounter) {
        cartCounter.textContent = cart.length.toString();
    }
}

function renderCart() {
    if (!cartItems) return;
    
    cartItems.innerHTML = "";
    let totalUsd = 0;
    
    cart.forEach((game) => {
        totalUsd += game.prices.current_price || 0;

        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        
        cartItem.innerHTML = `
            <img 
                src="${game.media.cover_url}" alt="${game.title}"
            >
            
            <div class="cart-item-info">
                <h3>${game.title}</h3>
                <p>${game.drm || (Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms) || "Key"}</p>
                <span class="price">${formatPrice(game.prices.current_price)}</span>
            </div>
            
        `;
        cartItems.appendChild(cartItem);
    });

    if (cartTotalPrice) {
        cartTotalPrice.textContent = formatPrice(totalUsd);
    }
}

window.addEventListener('currencyChanged', () => {
    renderCart();
});

// Render inicial para setear total 0 formateados en la moneda por defecto
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
