document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Elements
    const slides = document.querySelectorAll('.hero-slider .slide');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
    
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 6000; // 6 seconds per slide
    
    // Function to initialize the slider
    function initSlider() {
        // Set initial active slide
        updateSlide(0);
        
        // Start auto slider
        startAutoSlide();
        
        // Add click event listeners to thumbnails
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const slideIndex = parseInt(thumb.dataset.slide);
                updateSlide(slideIndex);
                resetAutoSlide();
            });
        });
        
        // Add click event listeners to arrows
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                navigateSlide('prev');
                resetAutoSlide();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                navigateSlide('next');
                resetAutoSlide();
            });
        }
        
        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.hero-slider');
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // Calculate swipe distance
            const swipeDistance = touchEndX - touchStartX;
            
            // Minimum swipe distance to trigger navigation (30px)
            if (Math.abs(swipeDistance) > 30) {
                if (swipeDistance > 0) {
                    // Swipe right - go to previous slide
                    navigateSlide('prev');
                } else {
                    // Swipe left - go to next slide
                    navigateSlide('next');
                }
                resetAutoSlide();
            }
        }
    }
    
    // Function to update the current slide
    function updateSlide(index) {
        // Remove active class from all slides and thumbnails
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to current slide and thumbnail
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Function to navigate to previous/next slide
    function navigateSlide(direction) {
        if (direction === 'prev') {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        } else {
            currentSlide = (currentSlide + 1) % slides.length;
        }
        
        updateSlide(currentSlide);
    }
    
    // Function to start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            navigateSlide('next');
        }, slideDuration);
    }
    
    // Function to reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateSlide('prev');
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            navigateSlide('next');
            resetAutoSlide();
        }
    });

    // Add to existing slider JavaScript
    function setupTouchSlider() {
        const slider = document.querySelector('.hero-slider');
        
        if (!slider) return;
        
        let touchstartX = 0;
        let touchendX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
        
        function handleSwipeGesture() {
            const swipeThreshold = 50; // Minimum distance required for a swipe
            
            if (touchendX < touchstartX - swipeThreshold) {
                // Swipe left, go to next slide
                navigateSlide('next');
                resetAutoSlide();
            }
            
            if (touchendX > touchstartX + swipeThreshold) {
                // Swipe right, go to previous slide
                navigateSlide('prev');
                resetAutoSlide();
            }
        }
    }

    // Call this function in your DOMContentLoaded handler
    setupTouchSlider();
        
    // Initialize slider if slides exist
    if (slides.length > 0) {
        initSlider();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (menuToggle && mobileMenu && closeMenu) {
        // Open menu
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        // Close menu
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close when clicking outside menu container
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Handle scroll offset for mobile
    function adjustScrollOffset() {
        const headerHeight = window.innerWidth <= 992 ? 60 : 70; // Mobile vs desktop header height
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Call function on load
    adjustScrollOffset();
    
    // Also handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate anything needed on resize
            
            // Check if mobile menu should be hidden on wider screens
            if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
});

// Add this to your existing slider JavaScript
function fixCatalogButtons() {
    // Get all catalog buttons
    const catalogButtons = document.querySelectorAll('.btn-catalog');
    
    catalogButtons.forEach(button => {
        // Ensure proper click handling
        button.addEventListener('click', function(e) {
            // Stop the click from being captured by slider navigation
            e.stopPropagation();
            
            // Get the href
            const href = this.getAttribute('href');
            
            // If it's a PDF or external link, open in new tab
            if (href && (href.endsWith('.pdf') || href.startsWith('http'))) {
                window.open(href, '_blank', 'noopener');
            }
        });
        
        // Add visual feedback
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        // Make sure touch events work properly
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(1px)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}




// Function to track catalog clicks (optional)
function trackCatalogClick(slideName) {
    console.log(`Catalog viewed from: ${slideName}`);
    // You could add analytics tracking here if needed
}

// Call this function after slider initialization
document.addEventListener('DOMContentLoaded', function() {
    // After slider is initialized
    fixCatalogButtons();
});

// Add this to your existing slider to prevent navigation when clicking on the button
function setupSlideContentClicks() {
    const slideContents = document.querySelectorAll('.slide-content');
    
    slideContents.forEach(content => {
        content.addEventListener('click', function(e) {
            // Check if click was on or inside a button or link
            if (e.target.closest('a, button')) {
                // Don't do anything, let the link/button handle it
                return;
            }
            
            // Otherwise, prevent the click from triggering slide navigation
            e.stopPropagation();
        });
    });
}

// Call this function as part of slider initialization
setupSlideContentClicks();

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const popup = document.getElementById('subscriptionPopup');
    const acceptButton = document.getElementById('acceptButton');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Clear the input
                emailInput.value = '';
                
                // Show the popup notification
                showPopup();
                
                // Here you would typically send the email to your server
                // Example: sendSubscriptionToServer(email);
            }
        });
    }
    
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            hidePopup();
        });
    }
    
    // Functions to show and hide the popup
    function showPopup() {
        popup.classList.add('show');
        
        // Auto-hide after 5 seconds (optional)
        setTimeout(hidePopup, 5000);
    }
    
    function hidePopup() {
        popup.classList.remove('show');
    }
    
    // Example function for sending to server (would be implemented based on your backend)
    function sendSubscriptionToServer(email) {
        // This would be your API call to register the email
        console.log('Subscribing email:', email);
        
        // Mock API call example:
        // fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email }),
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));
    }
});

// Add to your existing JavaScript
function optimizeForMobile() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Lazy load images that are not in the initial viewport
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
        
        // Reduce animation complexity on mobile
        document.documentElement.classList.add('reduce-motion');
    }
}

// Call on page load
optimizeForMobile();