const gridGames = document.getElementById("games-grid");

const loadGames = () => {
    gridGames.innerHTML = ""

    fetch("juegos.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(game => {
                const gameCard = document.createElement("article");
                gameCard.classList.add("game-card");
                gameCard.innerHTML = `
                    <div class="game-poster">
                        <img src="${game.media.cover_url}" alt="Poster de ${game.title}" />
                        </div>
                        <div class="game-info">
                        <h3 class="game-title">${game.title}</h3>
                        <p class="game-description">${game.summary}</p>
                        </div>
                `;
                gridGames.appendChild(gameCard);
            });
        });
};

loadGames();