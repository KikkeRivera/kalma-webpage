export function initSlideContentClicks() {
    document.querySelectorAll('.slide-content').forEach(content => {
        content.addEventListener('click', (e) => {
            if (!e.target.closest('a, button')) {
                e.stopPropagation();
            }
        });
    });
}