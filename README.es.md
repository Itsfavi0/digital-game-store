# 🎮 FavGames - Tienda Digital de Videojuegos

> **Idiomas:** [English](README.md) | Español

> Una landing page moderna y de alto rendimiento para la distribución y venta de claves digitales de videojuegos. Desarrollada íntegramente con Vanilla JavaScript, priorizando la velocidad de carga, una arquitectura limpia y una experiencia de usuario (UX) excepcional.

## 🚀 Descripción General

FavGames es una simulación de tienda digital totalmente responsiva diseñada para demostrar conceptos avanzados de UI/UX en frontend sin depender de frameworks pesados como React, Vue o Angular. Mediante el uso de ES Modules, patrones de diseño como Singleton y manipulación directa del DOM, este proyecto logra un pipeline de renderizado casi instantáneo, a la vez que brinda una experiencia de compra premium con elementos interactivos como un carrito reactivo, filtrado dinámico de datos y notificaciones visuales animadas.

**Demostración en Vivo:** [https://digital-game-store-six.vercel.app/]

---

## ✨ Características y Funcionalidades

- **⚡ Renderizado Ultrarrápido:** Implementa el patrón *Data Service Singleton* para consultar el catálogo de `juegos.json` una sola vez, eliminando cuellos de botella en la red y compartiendo la memoria caché entre todos los componentes.
- **💀 Pantallas de Esqueleto (Skeleton Loaders):** Evita saltos de diseño acumulados (CLS) y optimiza la percepción de velocidad mediante siluetas animadas por CSS (*shimmer effect*) que se visualizan instantáneamente mientras se obtienen los datos.
- **🛒 Carrito de Compras Dinámico (Sidebar Lateral):** 
  - Panel deslizable (*off-canvas*) por encima del contenido principal, siguiendo estándares de e-commerce modernos.
  - Agrupación inteligente de productos duplicados mediante identificadores únicos (`id`), gestionando cantidades (`x1`, `x2`, etc.).
  - Controles individuales para incrementar, disminuir o eliminar artículos.
  - Cálculo automático del monto total a pagar.
  - Estado visual amigable cuando el carrito se encuentra vacío.
- **🔄 Soporte Multimoneda en Tiempo Real:** Selector dinámico entre USD ($) y PEN (S/) con recálculo automático del tipo de cambio en todos los precios del catálogo y del carrito simultáneamente.
- **🎛️ Filtrado Algorítmico del Catálogo:** Filtrado instantáneo sin recargar la página mediante botones de acceso rápido ("Más Vendidos", "Novedades", "Descuentos > 70%" y "Menos de $10 USD").
- **🍞 Sistema de Notificaciones Toast (Feedback UI):** Notificaciones flotantes no bloqueantes con estética *glassmorphism* que confirman en pantalla cada acción relevante (añadir al carrito, eliminar producto, marcar favoritos o finalizar compra).
- **📱 Diseño 100% Responsivo:** Enfoque *mobile-first* garantizando adaptación fluida desde pantallas móviles (320px) hasta monitores 4K.

---

## 🛠️ Stack Tecnológico

**Tecnologías Principales:**
- **HTML5:** Marcado semántico optimizado para accesibilidad y SEO.
- **CSS3:** Variables nativas (`:root`), layouts con CSS Grid y Flexbox, animaciones mediante `@keyframes` (*shimmer*, *toasts*, transiciones laterales).
- **Vanilla JavaScript (ES6+):** Código nativo y modular usando ES Modules (`import`/`export`), Promesas (`async`/`await`), manipulación eficiente de arrays y renderizado reactivo del DOM. Sin librerías externas ni jQuery.

**Patrones de Arquitectura:**
- **Patrón Store / Singleton:** Centralizado en `gameService.js` para proveer una única fuente de verdad (*single source of truth*) en la obtención de datos.
- **Estructura Modular Basada en Componentes:** Separación clara de responsabilidades en hojas de estilo y scripts independientes (`heroGame.js`, `shoppingCart.js`, `toast.js`, etc.).

---

## 📂 Estructura del Proyecto

```text
├── assets/                  # Identidad de marca, iconos SVG y fuentes tipográficas
├── css/
│   └── home/                # Hojas de estilo modulares
│       ├── base.css         # Reseteo y variables globales de color/fuentes
│       ├── header.css       # Navegación, barra superior y sidebar del carrito
│       ├── skeleton.css     # Animaciones shimmer de los esqueletos de carga
│       ├── toast.css        # Estilos de las notificaciones flotantes
│       └── responsive.css   # Media queries y adaptabilidad móvil
├── js/                      # Lógica modular en JavaScript Vanilla
│   ├── gameService.js       # Servicio central de datos (Singleton / Caché)
│   ├── shoppingCart.js      # Lógica de estado y renderizado del carrito
│   ├── currency.js          # Conversión de divisas y tasas de cambio
│   ├── toast.js             # Módulo programático de notificaciones
│   └── gridGames.js, heroGame.js, etc.
├── juegos.json              # Base de datos local simulando una API REST
├── index.html               # Punto de entrada principal de la aplicación
└── main.js                  # Inicializador y orquestador de módulos
```

---

## 💻 Instalación y Ejecución Local

Este proyecto no requiere procesos de compilación, empaquetadores como Webpack ni dependencias de `npm`. No obstante, debido a las políticas de CORS de los navegadores al solicitar archivos JSON locales, se recomienda levantarlo mediante un servidor web local:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Itsfavi0/digital-game-store.git
   cd digital-game-store
   ```

2. **Iniciar un Servidor Local**
   - Con **Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - Con **VS Code**:
     Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) y haz clic en **"Go Live"** en la barra inferior.

3. Abre tu navegador e ingresa a `http://localhost:8000`.

---

## 🎨 Decisiones de Diseño

- **Estética Dark Mode Gamer:** Paleta con tonos oscuros de fondo (`#0A0D14`) combinados con acentos en verde neón (`#00FF87`) para generar alto contraste en las llamadas a la acción (CTAs).
- **Tipografías:** 
  - `Geist Variable` para una lectura fluida en textos y descripciones.
  - `Space Grotesk` para títulos modernos y de alto impacto.
  - `JetBrains Mono` para etiquetas técnicas, precios y metadatos.

---

## 🤝 Contribuciones

¡Las contribuciones, sugerencias y reportes de errores son bienvenidos!
Si deseas contribuir, puedes revisar la [página de issues](https://github.com/Itsfavi0/digital-game-store/issues).

## 📝 Licencia

Este proyecto se distribuye bajo la licencia [MIT](https://opensource.org/licenses/MIT).

---
*Creado por [Favio](https://github.com/Itsfavi0)*
