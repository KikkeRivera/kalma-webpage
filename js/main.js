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
    
    // Initialize slider if slides exist
    if (slides.length > 0) {
        initSlider();
    }
});

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

