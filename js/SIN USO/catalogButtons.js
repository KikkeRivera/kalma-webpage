export function initCatalogButtons() {
    document.querySelectorAll('.btn-catalog').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const href = button.getAttribute('href');
            if (href && (href.endsWith('.pdf') || href.startsWith('http'))) {
                window.open(href, '_blank', 'noopener');
            }
        });
        ['mousedown', 'touchstart'].forEach(type => button.addEventListener(type, () => button.style.transform = 'translateY(1px)'));
        ['mouseup', 'touchend'].forEach(type => button.addEventListener(type, () => button.style.transform = ''));
    });
}