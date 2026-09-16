import { getGames } from './gameService.js';
import { formatPrice } from './currency.js';

const featuredContainer = document.getElementById('featured-games-list');

async function loadFeaturedGames() {
  if (!featuredContainer) return;

  const games = await getGames();

  const featuredGames = games.filter(game => game.is_featured).slice(0, 4);

  featuredContainer.innerHTML = '';

  featuredGames.forEach(game => {
    const card = document.createElement('article');
    card.classList.add('game-card');

    const discountHtml = game.prices?.discount_percentage
      ? `<span class="game-discount">-${game.prices.discount_percentage}%</span>`
      : '';

    const priceHtml = game.prices?.current_price
      ? `<span class="game-price">${formatPrice(game.prices.current_price)}</span>`
      : '';

    const platform = game.drm || (Array.isArray(game.platforms) ? game.platforms[0] : 'STEAM');
    const region = (game.region || 'GLOBAL').toUpperCase();

    card.innerHTML = `
      <div class="game-poster">
        <img src="${game.media?.cover_url || game.media?.wide_cover_url}" alt="Poster de ${game.title}" />
      </div>
      <div class="game-info">
        <p class="platform-info">
          <span class="label-platform">${platform.toUpperCase()} KEY</span>
          <span class="label-separator">•</span>
          <span class="region">${region}</span>
        </p>
        <h3 class="game-title">${game.title}</h3>

        <div class="game-price-row">
          ${discountHtml}
          ${priceHtml}
        </div>
      </div>
    `;

    featuredContainer.appendChild(card);
  });
}

window.addEventListener('currencyChanged', loadFeaturedGames);
loadFeaturedGames().catch(error => console.error('Error al cargar juegos destacados:', error));
