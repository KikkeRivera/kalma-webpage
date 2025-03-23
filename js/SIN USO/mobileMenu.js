export function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);
        closeMenu.addEventListener('click', closeMobileMenu);
        mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) closeMobileMenu(); });
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    }
}