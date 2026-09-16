import { getGames } from './gameService.js';
import { formatPrice } from './currency.js';
import { addCart } from './shoppingCart.js';

const heroMain = document.getElementById('hero-main');

function formatHeroTitle(title, edition) {
  if (title.includes(':')) {
    const [mainPart, ...rest] = title.split(':');
    return `${mainPart.trim()}:<br><span class="text-green">${rest.join(':').trim()}</span>`;
  }
  if (edition) {
    return `${title}:<br><span class="text-green">${edition}</span>`;
  }
  return title;
}

async function loadHeroMain() {
  if (!heroMain) return;

  const games = await getGames();

  const game = games.find(g => g.is_hero || g.is_star_game) || games[0];
  if (!game) return;

  const editionBadge = game.edition ? `<span class="badge badge-green">${game.edition}</span>` : '';
  const drmBadge = game.drm ? `<span class="badge badge-dark">${game.drm} Key</span>` : '';
  const deliveryBadge = game.delivery_type
    ? `<span class="badge badge-dark">${game.delivery_type === 'Instant Digital Key' ? 'Entrega inmediata' : game.delivery_type}</span>`
    : '';
  const regionBadge = game.region
    ? `<span class="badge badge-dark">${game.region.toLowerCase() === 'global' ? 'Sin Bloqueo Regional' : game.region}</span>`
    : '';

  const tags = (game.tags || game.genres || []).slice(0, 4);
  const tagsHtml = tags.map(tag => `<span class="tag">${tag}</span>`).join('');

  const discountHtml = game.prices?.discount_percentage
    ? `<span class="discount-tag">-${game.prices.discount_percentage}%</span>`
    : '';

  const originalPriceHtml = game.prices?.original_price
    ? `<span class="original-price">${formatPrice(game.prices.original_price)}</span>`
    : '';

  const currentPriceHtml = game.prices?.current_price
    ? `<span class="discounted-price">${formatPrice(game.prices.current_price)}</span>`
    : '';

  const formattedTitle = formatHeroTitle(game.title, game.edition);

  heroMain.innerHTML = `
    <img class="hero-main-image" src="${game.media?.background_url || game.media?.wide_cover_url}" alt="Imagen destacada de ${game.title}" />
    <div class="hero-content">
      <div class="hero-badges">
        ${editionBadge}
        ${drmBadge}
        ${deliveryBadge}
        ${regionBadge}
      </div>
      <div class="hero-game-info">
        <h2 class="hero-title">${formattedTitle}</h2>
        <p class="hero-description">${game.summary}</p>
      </div>

      <div class="hero-tags">
        ${tagsHtml}
      </div>

      <div class="hero-buy-section">
        <div class="price-box">
          ${discountHtml}
          <div class="price-numbers">
            ${originalPriceHtml}
            ${currentPriceHtml}
          </div>
        </div>

        <button class="btn-primary">COMPRAR CLAVE INSTANTÁNEA</button>
        <button class="hero-favorite-icon" aria-label="Agregar a favoritos">
          🤍
        </button>
      </div>
    </div>
  `;

  heroMain.querySelector(".btn-primary").addEventListener("click", (e) => {
    e.preventDefault();
    addCart(game);
  })

  // Interacción para el botón de favoritos
  const favBtn = heroMain.querySelector('.hero-favorite-icon');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      favBtn.textContent = favBtn.textContent.trim() === '🤍' ? '❤️' : '🤍';
    });
  }
}

window.addEventListener('currencyChanged', loadHeroMain);
loadHeroMain().catch(error => console.error('Error al cargar el juego del hero principal:', error));
