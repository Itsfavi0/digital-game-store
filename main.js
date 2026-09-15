import './js/heroGame.js';
import './js/featuredGames.js';
import './js/gridGames.js';
import './js/saleGames.js';

/**
 * @typedef {Object} Game
 * @property {number} id
 * @property {string} title
 * @property {string} edition
 * @property {string} developer
 * @property {string} publisher
 * @property {string} release_date
 * @property {string[]} platforms
 * @property {string[]} genres
 * @property {string[]} tags
 * @property {string} summary
 * @property {string} region
 * @property {string} drm
 * @property {string} delivery_type
 * @property {boolean} is_featured
 * @property {boolean} is_on_sale
 * @property {boolean} [is_hero]
 * @property {boolean} [is_star_game]
 * @property {{ cover_url: string, background_url: string, logo_url: string, wide_cover_url: string, trailer_url: string }} media
 * @property {{ critic_score: number, user_score: number }} ratings
 * @property {{ original_price: number, current_price: number, discount_percentage: number, currency: string }} prices
 * @property {{ available: number, total: number, percentage: number, status: string }} stock
 */
