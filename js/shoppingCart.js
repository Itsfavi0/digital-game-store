import { formatPrice } from './currency.js';
import { showToast } from './toast.js';

const cart = [];

const cartItems = document.getElementById("cart-content");
const cartCounter = document.getElementById("cart-counter");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartSidebarClose = document.getElementById("cart-sidebar-close");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartHeaderTotal = document.getElementById("cart-header-total");
const cartCheckoutBtn = document.querySelector(".cart-checkout-btn");

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

if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast({
                title: 'Carrito vacío',
                message: 'Agrega al menos un juego para continuar.',
                icon: '⚠️',
                type: 'warning'
            });
            return;
        }
        showToast({
            title: '¡Compra completada!',
            message: 'Tus claves digitales han sido procesadas con éxito.',
            icon: '🎉',
            type: 'success'
        });
        cart.length = 0;
        updateCounter();
        renderCart();
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove("open");
            cartOverlay.classList.remove("show");
        }
    });
}

export function addCart(game) {
    const existing = cart.find(item => item.game.id === game.id);
    let currentQty = 1;
    if (existing) {
        existing.quantity += 1;
        currentQty = existing.quantity;
    } else {
        cart.push({ game, quantity: 1 });
    }
    updateCounter();
    renderCart();

    // Notificación visual
    showToast({
        title: '¡Agregado al carrito!',
        message: `${game.title} ${currentQty > 1 ? `(x${currentQty})` : ''}`,
        image: game.media?.cover_url || game.media?.wide_cover_url,
        type: 'success'
    });
}

function decreaseCart(id) {
    const index = cart.findIndex(item => item.game.id === id);
    if (index !== -1) {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
            const removedGame = cart[index].game;
            cart.splice(index, 1);
            showToast({
                title: 'Producto eliminado',
                message: removedGame.title,
                icon: '🗑️',
                type: 'info'
            });
        }
        updateCounter();
        renderCart();
    }
}

function removeCart(id) {
    const index = cart.findIndex(item => item.game.id === id);
    if (index !== -1) {
        const removedGame = cart[index].game;
        cart.splice(index, 1);
        updateCounter();
        renderCart();
        showToast({
            title: 'Producto eliminado',
            message: removedGame.title,
            icon: '🗑️',
            type: 'info'
        });
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
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty-message">
                <span class="cart-empty-icon">🛒</span>
                <p>Tu carrito está vacío</p>
                <small>¡Explora nuestras ofertas relámpago!</small>
            </div>
        `;
    }
    
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
            decreaseCart(game.id);
        });

        cartItem.querySelector('.btn-plus').addEventListener('click', () => {
            addCart(game);
        });

        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeCart(game.id);
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
