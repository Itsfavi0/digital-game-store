let toastContainer = null;

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
    }
    return toastContainer;
}

/**
 * Muestra una notificación toast visual elegante.
 * @param {Object} options
 * @param {string} [options.title] - Título del toast (ej. 'Agregado al carrito')
 * @param {string} [options.message] - Mensaje descriptivo (ej. título del juego)
 * @param {string} [options.image] - URL de carátula o imagen
 * @param {string} [options.icon] - Emoji o texto de icono si no hay imagen
 * @param {number} [options.duration=3200] - Tiempo en ms antes de desaparecer
 * @param {'success'|'info'|'warning'} [options.type='success'] - Tipo de toast
 */
export function showToast({
    title = '',
    message = '',
    image = '',
    icon = '',
    duration = 3200,
    type = 'success'
} = {}) {
    const container = getToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let visualHtml = '';
    if (image) {
        visualHtml = `<img src="${image}" alt="${title || message}" class="toast-img" />`;
    } else if (icon) {
        visualHtml = `<span class="toast-icon">${icon}</span>`;
    } else {
        visualHtml = `<span class="toast-icon">✓</span>`;
    }

    toast.innerHTML = `
        ${visualHtml}
        <div class="toast-body">
            ${title ? `<h4 class="toast-title">${title}</h4>` : ''}
            ${message ? `<p class="toast-msg">${message}</p>` : ''}
        </div>
        <button class="toast-close" aria-label="Cerrar">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        dismissToast(toast);
    });

    container.appendChild(toast);

    // Animación de entrada suave
    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    // Auto-cierre
    let timer = setTimeout(() => {
        dismissToast(toast);
    }, duration);

    // Pausar auto-cierre al pasar el ratón por encima
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
        timer = setTimeout(() => dismissToast(toast), 1500);
    });
}

function dismissToast(toast) {
    if (!toast || toast.classList.contains('toast-hiding')) return;
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    
    const handleTransitionEnd = () => {
        toast.removeEventListener('transitionend', handleTransitionEnd);
        toast.remove();
    };
    toast.addEventListener('transitionend', handleTransitionEnd);
}
