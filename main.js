import './js/gridGames.js';
import './js/saleGames.js';

/**
 * @typedef {Object} Game
 * @property {string} title
 * @property {string} summary
 * @property {string} platforms
 * @property {string} region
 * @property {{ cover_url: string, background_url, logo_url, wide_cover_url, trailer_url: string }} media
 * @property {{ user_score: number }} ratings
 * @property {{ original_price,current_price, discount_percentage: number, currency: string }} prices
 */