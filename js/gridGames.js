import { getGames } from './gameService.js';
import { formatPrice } from './currency.js';
import { addCart } from './shoppingCart.js';

const gridGames = document.getElementById("games-grid");
const paginationContainer = document.getElementById("games-pagination");

let allGames = [];
let currentPage = 1;
const itemsPerPage = 6;

async function loadGames() {
    if (!gridGames) return;
    
    try {
        allGames = await getGames();
        renderGamesPage(currentPage);
        renderPaginationControls();
    } catch (error) {
        console.error("Error al cargar los juegos:", error);
    }
}

function renderGamesPage(page) {
    gridGames.innerHTML = ``;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const gamesToShow = allGames.slice(startIndex, endIndex);

    gamesToShow.forEach((game, index) => {
        const realIndex = startIndex + index + 1;
        const gameCard = document.createElement("article");
        gameCard.classList.add("game-card-horizontal");
        
        const coverImage = game.media?.wide_cover_url || game.media?.cover_url;
        
        gameCard.innerHTML = `
            <div class="card-left">
                <span class="game-rank">${realIndex}</span>
            </div>
            <div class="card-image-wrapper">
                <img src="${coverImage}" alt="Poster de ${game.title}" loading="lazy" />
            </div>
            <div class="card-middle">
                <h3 class="game-title">${game.title}</h3>
                <div class="card-platform-info">
                    <span class="label-platform">${Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}</span>
                    <span class="label-separator">•</span>
                    <span class="region">${game.region}</span>
                    <span class="label-separator">•</span>
                    <span class="label-platform">⭐ ${game.ratings?.user_score} / 10</span>
                </div>
                <div class="card-prices">
                    <span class="game-price">${formatPrice(game.prices.current_price)}</span>
                </div>
            </div>
            <div class="card-right">
                <button class="btn-primary">OBTENER</button>
            </div>
        `;
        
        gameCard.querySelector(".btn-primary").addEventListener("click", (e) => {
            e.preventDefault();
            addCart(game);
        })
        gridGames.appendChild(gameCard);
    });
}

function renderPaginationControls() {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(allGames.length / itemsPerPage);
    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("pagination-btn");
    prevBtn.textContent = "« Anterior";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.classList.add("pagination-btn");
        if (i === currentPage) pageBtn.classList.add("active");
        pageBtn.textContent = String(i);
        pageBtn.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("pagination-btn");
    nextBtn.textContent = "Siguiente »";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextBtn);
}

function changePage(newPage) {
    const totalPages = Math.ceil(allGames.length / itemsPerPage);
    if (newPage < 1 || newPage > totalPages) return;
    
    currentPage = newPage;
    renderGamesPage(currentPage);
    renderPaginationControls();
    
    const section = document.querySelector('.games-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

window.addEventListener('currencyChanged', () => {
    if (allGames.length > 0) {
        renderGamesPage(currentPage);
    }
});

loadGames().catch(error => console.error('Error al cargar juegos:', error));
