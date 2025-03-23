document.addEventListener('DOMContentLoaded', () => {
    /* ======================
       MÓDULO: Slider Hero
    ========================== */
    const SliderModule = (() => {
      // Elementos del slider y de la miniatura
      const slides = document.querySelectorAll('.hero-slider .slide');
      const thumbnails = document.querySelectorAll('.thumbnail-container img');
      const prevArrow = document.querySelector('.arrow-prev');
      const nextArrow = document.querySelector('.arrow-next');
      const slider = document.querySelector('.hero-slider');
      
      let currentSlide = 0;
      let autoSlideInterval;
      const slideDuration = 6000; // 6 segundos
  
      // Actualiza el slide activo y la miniatura
      const updateSlide = index => {
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
  
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
        currentSlide = index;
      };
  
      // Navega entre slides
      const navigateSlide = direction => {
        currentSlide =
          direction === 'prev'
            ? (currentSlide - 1 + slides.length) % slides.length
            : (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
      };
  
      // Inicia el auto slide
      const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => navigateSlide('next'), slideDuration);
      };
  
      // Reinicia el temporizador de auto slide
      const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      };
  
      // Manejo de swipe (tanto en mobile como para touch en general)
      const setupTouchEvents = () => {
        if (!slider) return;
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 30;
  
        slider.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
        });
  
        slider.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          const swipeDistance = touchEndX - touchStartX;
          if (Math.abs(swipeDistance) > swipeThreshold) {
            navigateSlide(swipeDistance > 0 ? 'prev' : 'next');
            resetAutoSlide();
          }
        });
      };
  
      // Agrega navegación por teclado
      const setupKeyboardNav = () => {
        document.addEventListener('keydown', e => {
          if (e.key === 'ArrowLeft') {
            navigateSlide('prev');
            resetAutoSlide();
          } else if (e.key === 'ArrowRight') {
            navigateSlide('next');
            resetAutoSlide();
          }
        });
      };
  
      // Agrega listeners a miniaturas y flechas
      const setupControls = () => {
        thumbnails.forEach(thumb => {
          thumb.addEventListener('click', () => {
            const slideIndex = parseInt(thumb.dataset.slide);
            updateSlide(slideIndex);
            resetAutoSlide();
          });
        });
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
      };
  
      // Evita que clics en el contenido interno del slide (botones, links) propaguen al slider
      const setupSlideContentClicks = () => {
        document.querySelectorAll('.slide-content').forEach(content => {
          content.addEventListener('click', e => {
            if (!e.target.closest('a, button')) {
              e.stopPropagation();
            }
          });
        });
      };
  
      // Inicialización completa del slider
      const init = () => {
        if (slides.length === 0) return;
        updateSlide(0);
        setupControls();
        setupTouchEvents();
        setupKeyboardNav();
        setupSlideContentClicks();
        startAutoSlide();
      };
  
      return { init };
    })();
  
    /* ==========================
       MÓDULO: Menú Móvil
    ============================ */
    const MobileMenuModule = (() => {
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      const mobileMenu = document.getElementById('mobileMenu');
      const closeMenu = document.getElementById('mobileMenuClose');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  
      const init = () => {
        if (!(menuToggle && mobileMenu && closeMenu)) return;
  
        menuToggle.addEventListener('click', () => {
          mobileMenu.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
  
        const closeMobileMenu = () => {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        };
  
        closeMenu.addEventListener('click', closeMobileMenu);
  
        mobileMenu.addEventListener('click', e => {
          if (e.target === mobileMenu) closeMobileMenu();
        });
  
        mobileNavLinks.forEach(link =>
          link.addEventListener('click', closeMobileMenu)
        );
  
        // Ajuste en caso de redimensionar la ventana
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
              closeMobileMenu();
            }
          }, 250);
        });
  
        // Ajusta el offset de scroll para enlaces ancla
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              e.preventDefault();
              const headerHeight = window.innerWidth <= 992 ? 60 : 70;
              const targetPosition =
                targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = targetPosition - headerHeight - 20;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          });
        });
      };
  
      return { init };
    })();
  
    /* ===============================
       MÓDULO: Botones de Catálogo
    ================================ */
    const CatalogModule = (() => {
      // Agrega manejo de clics a los botones de catálogo
      const init = () => {
        document.querySelectorAll('.btn-catalog').forEach(button => {
          button.addEventListener('click', e => {
            e.stopPropagation();
            const href = button.getAttribute('href');
            if (href && (href.endsWith('.pdf') || href.startsWith('http'))) {
              window.open(href, '_blank', 'noopener');
            }
          });
          // Feedback visual en mousedown/mouseup y touch
          button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px)';
          });
          button.addEventListener('mouseup', () => {
            button.style.transform = '';
          });
          button.addEventListener('touchstart', () => {
            button.style.transform = 'translateY(1px)';
          }, { passive: true });
          button.addEventListener('touchend', () => {
            button.style.transform = '';
          }, { passive: true });
        });
      };
  
      // Función opcional para tracking
      const trackCatalogClick = slideName => {
        console.log(`Catalog viewed from: ${slideName}`);
        // Aquí se podría integrar un sistema de analíticas
      };
  
      return { init, trackCatalogClick };
    })();
  
    /* ===============================
       MÓDULO: Newsletter y Popup
    ================================ */
    const NewsletterModule = (() => {
      const newsletterForm = document.querySelector('.newsletter-form');
      const popup = document.getElementById('subscriptionPopup');
      const acceptButton = document.getElementById('acceptButton');
  
      const showPopup = () => {
        if (!popup) return;
        popup.classList.add('show');
        setTimeout(hidePopup, 5000);
      };
  
      const hidePopup = () => {
        if (!popup) return;
        popup.classList.remove('show');
      };
  
      const init = () => {
        if (newsletterForm) {
          newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
              emailInput.value = '';
              showPopup();
              // Aquí se puede enviar el email al servidor
              // sendSubscriptionToServer(email);
            }
          });
        }
        if (acceptButton) {
          acceptButton.addEventListener('click', hidePopup);
        }
      };
  
      // Función de ejemplo para envío a servidor (comentada)
      const sendSubscriptionToServer = email => {
        console.log('Subscribing email:', email);
        // Ejemplo de llamada API:
        // fetch('/api/subscribe', { method: 'POST', ... })
      };
  
      return { init };
    })();
  
    /* ============================
       MÓDULO: Optimización Móvil
    ============================= */
    const MobileOptimizationModule = (() => {
      const init = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          // Lazy load de imágenes
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
  
      return { init };
    })();
  
    /* ====================
       Inicialización
    ======================== */
    if (document.querySelectorAll('.hero-slider .slide').length) {
      SliderModule.init();
    }
    MobileMenuModule.init();
    CatalogModule.init();
    NewsletterModule.init();
    MobileOptimizationModule.init();
  });
  