import { formatPrice } from './currency.js';

const cart = [];

const cartItems = document.getElementById("cart-content");
const cartCounter = document.getElementById("cart-counter");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartSidebarClose = document.getElementById("cart-sidebar-close");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartHeaderTotal = document.getElementById("cart-header-total");

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
    const existing = cart.find(item => item.game.title === game.title);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ game, quantity: 1 });
    }
    updateCounter();
    renderCart();

    if (cartSidebar && cartOverlay && !cartSidebar.classList.contains("open")) {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("show");
    }
}

function decreaseCart(title) {
    const index = cart.findIndex(item => item.game.title === title);
    if (index !== -1) {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCounter();
        renderCart();
    }
}

function removeCart(title) {
    const index = cart.findIndex(item => item.game.title === title);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCounter();
        renderCart();
    }
}

function updateCounter() {
    if (cartCounter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems.toString();
    }
}

function renderCart() {
    if (!cartItems) return;
    
    cartItems.innerHTML = "";
    let totalUsd = 0;
    
    cart.forEach((item) => {
        const { game, quantity } = item;
        const itemTotal = (game.prices.current_price || 0) * quantity;
        totalUsd += itemTotal;

        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        
        cartItem.innerHTML = `
            <img src="${game.media.cover_url}" alt="${game.title}">
            <div class="cart-item-info">
                <h3>${game.title}</h3>
                <p>${game.drm || (Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms) || "Key"}</p>
                <div class="cart-item-controls">
                    <button class="qty-btn btn-minus">-</button>
                    <span class="qty-text">x${quantity}</span>
                    <button class="qty-btn btn-plus">+</button>
                </div>
                <span class="price">${formatPrice(itemTotal)}</span>
            </div>
            <button class="cart-item-remove" title="Eliminar">&times;</button>
        `;

        cartItem.querySelector('.btn-minus').addEventListener('click', () => {
            decreaseCart(game.title);
        });

        cartItem.querySelector('.btn-plus').addEventListener('click', () => {
            addCart(game);
        });

        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeCart(game.title);
        });
        
        cartItems.appendChild(cartItem);
    });

    if (cartTotalPrice) {
        cartTotalPrice.textContent = formatPrice(totalUsd);
    }
    if (cartHeaderTotal) {
        cartHeaderTotal.textContent = totalUsd > 0 ? formatPrice(totalUsd) : "";
    }
}

window.addEventListener('currencyChanged', () => {
    renderCart();
});

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
