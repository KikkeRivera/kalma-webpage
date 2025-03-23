export function initSlider() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
    const slideDuration = 6000;
    let currentSlide = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    const updateSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
        currentSlide = index;
    };

    const navigateSlide = (direction) => {
        currentSlide = (direction === 'prev')
            ? (currentSlide - 1 + slides.length) % slides.length
            : (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => navigateSlide('next'), slideDuration);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    const handleThumbnailClick = (thumb) => {
        const slideIndex = parseInt(thumb.dataset.slide);
        updateSlide(slideIndex);
        resetAutoSlide();
    };

    const handleArrowClick = (direction) => {
        navigateSlide(direction);
        resetAutoSlide();
    };

    const handleSwipe = () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 30) {
            navigateSlide(swipeDistance > 0 ? 'prev' : 'next');
            resetAutoSlide();
        }
    };

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') handleArrowClick('prev');
        else if (e.key === 'ArrowRight') handleArrowClick('next');
    };

    if (!slides.length) return;
    updateSlide(0);
    startAutoSlide();
    thumbnails.forEach(thumb => thumb.addEventListener('click', () => handleThumbnailClick(thumb)));
    if (prevArrow) prevArrow.addEventListener('click', () => handleArrowClick('prev'));
    if (nextArrow) nextArrow.addEventListener('click', () => handleArrowClick('next'));
    if (slider) {
        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchend', handleTouchEnd);
    }
    document.addEventListener('keydown', handleKeyDown);
}