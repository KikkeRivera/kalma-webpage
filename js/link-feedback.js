/**
 * Simple touch feedback for map links
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all map links
    const mapLinks = document.querySelectorAll('.map-link');
    
    // Add touch feedback
    mapLinks.forEach(link => {
        // Touch start - add active class
        link.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        // Touch end - remove active class
        link.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        // Touch cancel - remove active class
        link.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Add tracking (optional)
    mapLinks.forEach(link => {
        link.addEventListener('click', function() {
            const locationName = this.closest('.location-item').querySelector('.location-name').textContent;
            console.log(`Map opened for location: ${locationName}`);
            // You could add analytics tracking here if needed
        });
    });
});