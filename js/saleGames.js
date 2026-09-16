import { getGames } from './gameService.js';
import { formatPrice, getCurrencyCode } from './currency.js';
import { addCart } from './shoppingCart.js';

const saleGames = document.getElementById('sale-games-grid');

async function loadSaleGames() {
    if (!saleGames) return;
    const data = await getGames();
    
    saleGames.innerHTML = ``;

    data.slice(5,9).forEach(game => {
        const flashCard = document.createElement('article');
        flashCard.classList.add('flash-card');
        flashCard.innerHTML = `
            <div class="flash-poster">
                <img src=${game.media?.wide_cover_url} alt="${game.title}"/>
                <div class="flash-badge-platform">${game.publisher}/ ${game.platforms?.[0]}</div>
                <div class="flash-badge-discount">-${game.prices?.discount_percentage}%</div>
            </div>
            <div class="flash-stock-bar">
                <div class="stock-progress" style="width: ${game.stock.percentage}%"></div>
            </div>
            <div class="flash-info">
                <div class="flash-meta">
                    <span class="edition">${game.edition}</span>
                    <span class="keys-left">Quedan ${game.stock.available} clave(s)</span>
                </div>
                <h3 class="flash-game-tittle">${game.title}</h3>
            </div>
            <div class="flash-footer">
                <div class="flash-prices">
                    <span class="old-price">${game.prices?.original_price ? formatPrice(game.prices.original_price) : ''}</span>
                    <span class="new-price"><span class="text-green">${game.prices?.current_price ? formatPrice(game.prices.current_price) : ''}</span> <small>${getCurrencyCode()}</small> </span> 
                </div>
                <button class="btn-buy">🛒 COMPRAR</button>
            </div>
        `;

        flashCard.querySelector(".btn-buy").addEventListener("click", (e) => {
            e.preventDefault();
            addCart(game);
        })
        saleGames.appendChild(flashCard);
    });
}

window.addEventListener('currencyChanged', loadSaleGames);
loadSaleGames().catch(error => console.error("Error al cargar los juegos con descuento:", error));
