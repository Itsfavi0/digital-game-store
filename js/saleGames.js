const featGames = document.querySelectorAll('.sale-games-grid');

async function loadFeatGames() {
    const response = await fetch("juegos.json");
    const data = await response.json();

    data.forEach(game => {
        const flashCard = document.createElement("article");
        flashCard.classList.add("flash-card");
        flashCard.innerHTML = `
            <div class="flash-card">
                <img src=${game.media?.wide_cover_url} alt=${game.title}/>
                <div class="flash-badge-platform">${game.publisher} ${game.platforms[0]}</div>
                <div class="flash-badge-discount">-${game.prices.discount_percentage}%</div>
            </div> 
        `;
        featGames.appendChild(flashCard);
    });
}

loadFeatGames().catch(error => console.error("Error al cargar los juegos con descuento:", error));