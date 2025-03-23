export function initMobileOptimization() {
    const optimizeForMobile = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            document.querySelectorAll('img[data-src]').forEach(img => {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            img.src = img.getAttribute('data-src');
                            observer.disconnect();
                        }
                    });
                });
                observer.observe(img);
            });
            document.documentElement.classList.add('reduce-motion');
        }
    };
    optimizeForMobile();
}