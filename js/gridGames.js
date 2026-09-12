const gridGames = document.getElementById("games-grid");

async function loadGames() {
    gridGames.innerHTML = ""

    const response = await fetch("juegos.json");
    const data = await response.json();

    data.forEach(game => {
        const gameCard = document.createElement("article");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
                    <div class="game-poster">
                    <img src="${game.media?.cover_url}" alt="Poster de ${game.title}" />
                    </div>
                    <div class="card-platform-info">
                        <span class="label-platform">${game.platforms}</span>
                        <span class="label-separator">•</span>
                        <span class="region">${game.region}</span>
                        <span class="label-separator">•</span>
                        <span class="label-platform">⭐ ${game.ratings?.user_score} / 10</span>
                    </div>
                    <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.summary}</p>
                    <a href="${game.media?.trailer_url}" target="_blank" rel="noopener noreferrer" class="game-trailer-link">
                        ▶ Ver Tráiler
                    </a>
                    </div>
                    <div class="card-footer">
                        <div class="card-prices">
                            <div class="price-numbers">
                            <span class="game-price">$${game.prices.current_price} ${game.prices?.currency}</span>
                            </div>
                        </div>
                        <button class="btn-primary">OBTENER</button>
                    </div>
                `;
        gridGames.appendChild(gameCard);
    });
}

loadGames().catch(error => console.error("Error al cargar los juegos:", error));