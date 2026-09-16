# 🎮 FavGames - Digital Game Store

> **Languages:** English | [Español](README.es.md)

> A high-performance, modern e-commerce landing page for digital game keys and software distribution. Built entirely with Vanilla JavaScript, focusing on speed, clean architecture, and exceptional user experience (UX).

## 🚀 Overview

FavGames is a fully responsive digital storefront simulation designed to demonstrate advanced frontend UI/UX concepts without relying on heavy frameworks like React, Vue, or Angular. By using ES Modules, Singleton design patterns, and native DOM manipulation, this project achieves a near-instant rendering pipeline while providing a premium shopping experience featuring interactive elements like a reactive cart, dynamic data filtering, and sleek animated notifications.

**Live Demo:** [https://digital-game-store-six.vercel.app/]

---

## ✨ Features

- **⚡ Blazing Fast Rendering:** Implements the *Data Service Singleton* pattern to fetch the `juegos.json` catalog only once, preventing network bottlenecks and sharing caching logic across all UI components.
- **💀 Skeleton Loaders:** Prevents layout shifts (CLS) and enhances perceived performance with CSS-animated skeleton UI that displays immediately during network payload loading.
- **🛒 Dynamic Shopping Cart (Sidebar):** 
  - Off-canvas sidebar design similar to modern retail apps.
  - Groups duplicated items by unique IDs accurately tracking quantities.
  - Dynamic subtotal calculation.
  - "Empty Cart" friendly empty-state illustration.
- **🔄 Multi-Currency Support:** Real-time toggling between USD ($) and PEN (S/) reflecting accurate exchange rates across all rendered products simultaneously.
- **🎛️ Algorithmic Catalog Filtering:** Users can sort the dataset via quick actionable chips ("Bestsellers", "Newest", "> 70% Off", "Under $10") mapped to the product interface in real-time.
- **🍞 Toast Notification System (Feedback UI):** Custom built, non-blocking glass-morphic toast notification component to alert users upon cart interactions or checklist completions.
- **📱 Fully Responsive:** Mobile-first structural approach ensuring cross-device compatibility from 320px to 4K resolutions.

---

## 🛠️ Tech Stack

**Core Technology:**
- **HTML5:** Semantic markups for better accessibility and SEO scaling.
- **CSS3:** Custom variables (CSS Properties), CSS Grid & Flexbox layouts, Keyframe Animations (Shimmer/Toasts).
- **Vanilla JavaScript (ES6+):** Pure JS using ES Modules (`import`/`export`), Promises (`async`/`await`), array manipulation, and dynamic DOM rendering. No jQuery or External UI libraries.

**Architecture Patterns:**
- **Store / Singleton Pattern:** Used in `gameService.js` for a continuous single-source-of-truth data fetching model.
- **Component Based Structure:** Segregating JS and CSS logics per visual block (e.g., `heroGame.js`, `shoppingCart.js`, `toast.js`).

---

## 📂 Folder Structure

```text
├── assets/                  # Brand graphics, UI icons (SVG), and Fonts
├── css/
│   └── home/                # Component scoping CSS files
│       ├── base.css         # Reset & CSS custom variables (palette)
│       ├── header.css / footer.css
│       ├── skeleton.css     # Loading shimmer animations
│       ├── toast.css        # Notifications styling
│       └── responsive.css   # Media Queries
├── js/                      # Modular Vanilla JS 
│   ├── gameService.js       # Central data fetcher (Singleton)
│   ├── shoppingCart.js      # Cart logic & state handling
│   ├── currency.js          # Exchange rates logic
│   ├── toast.js             # Notification programmatic logic
│   └── gridGames.js, heroGame.js, etc.
├── juegos.json              # Mock database acting as a local REST API
├── index.html               # Main application entry point
└── main.js                  # Module bootstrap
```

---

## 💻 Getting Started

This project doesn't require compiling, webpack, or npm installations. However, due to CORS policies fetching local JSON files, you must run it through a local HTTP Server.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Itsfavi0/digital-game-store.git
   cd digital-game-store
   ```

2. **Run a Local Web Server**
   - If you have **Python 3** installed:
     ```bash
     python -m http.server 8000
     ```
   - If you use **VS Code**:
     Install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and click "Go Live" at the bottom right.

3. Open your browser and navigate to `http://localhost:8000`.

---

## 🎨 Design Decisions

- **Dark Mode Native:** FavGames is designed with a dark, gaming-centric aesthetic featuring `#0A0D14` backgrounds accompanied by neon-emerald (`#00FF87`) CTAs for ultra-high conversion contrast.
- **Typography:** 
  - `Geist Variable` for legible body reading.
  - `Space Grotesk` for modern, boxed headers.
  - `JetBrains Mono` for metadata chips and platform specifications.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/Itsfavi0/digital-game-store/issues) if you want to contribute.

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed. 

---
*Created by [Favio](https://github.com/Itsfavi0)*
