// File: js/services.js

// Dynamic Service Content Handler
document.addEventListener('DOMContentLoaded', function() {
    // Service data with titles, descriptions, and local image paths
    const serviceData = {
        'default': {
            title: 'Kalma Spa & Massage',
            description: 'Kalma es un centro de masajes y terapias orientales enfocado en el bienestar físico, mental y emocional. Más que un lugar, es un espacio para que te escuches, equilibres tu energía y fortalezcas tu mente. Ofrecemos terapias naturales para mejorar tu calidad de vida, como masajes, reflexoterapia, terapias orientales, estiramientos asistidos, cosmetología y belleza.',
            image: 'img/bienestar.webp'
        },
        'masaje-deportivo': {
            title: 'Masaje Deportivo',
            description: 'Diseñado específicamente para atletas y personas activas, nuestro masaje deportivo ayuda a prevenir lesiones, mejorar el rendimiento y acelerar la recuperación muscular. Utilizamos técnicas especializadas para aliviar la tensión y el dolor muscular.',
            image: 'img/Masajes/Kalma_Masaje_Deportivo.webp'
        },
        'experiencia-aterrar': {
            title: 'Experiencia Aterrar',
            description: 'Una experiencia única que te ayuda a reconectar con la tierra y liberar el estrés acumulado. Combina técnicas de respiración, presión y aromaterapia para calmar el sistema nervioso y promover una sensación de estabilidad y paz interior.',
            image: 'img/Masajes/Kalma_Aterrar_Exp.webp'
        },
        'indian-head': {
            title: 'Indian Head',
            description: 'Basado en la antigua técnica ayurvédica, este masaje se enfoca en la cabeza, cuello y hombros, donde solemos acumular mayor tensión. Ayuda a aliviar dolores de cabeza, mejorar la concentración y reducir el estrés mental y emocional.',
            image: 'img/Masajes/Kalma_Indian_Head.webp'
        },
        'upgrade-30': {
            title: 'Upgrade 30 minutos',
            description: 'Extiende tu sesión de relajación con 30 minutos adicionales para enfocarte en áreas específicas que necesitan mayor atención. Este complemento perfecto te permite personalizar tu experiencia y maximizar los beneficios de tu tratamiento.',
            image: 'https://ext.same-assets.com/930960530/1167302942.webp'
        },
        'masaje-podal': {
            title: 'Masaje Podal',
            description: 'A través de la reflexología, este masaje estimula puntos específicos en los pies que se conectan con diferentes órganos y sistemas del cuerpo. Ayuda a mejorar la circulación, aliviar dolores corporales y promover un bienestar general.',
            image: 'img/Masajes/Kalma_Masaje_Podal.webp'
        },
        'ritual-compartir': {
            title: 'Ritual para Compartir',
            description: 'Una experiencia diseñada para parejas o amigos que desean disfrutar juntos de un momento de relajación. Incluye tratamientos simultáneos en un ambiente íntimo y acogedor, ideal para celebrar ocasiones especiales o simplemente reconectar.',
            image: 'https://ext.same-assets.com/930960530/1167302942.webp'
        }
    };

    // Function to initialize service functionality
    function initializeServices() {
        // Get DOM elements with safety checks
        const serviceTitle = document.getElementById('service-title');
        const serviceDescription = document.getElementById('service-description');
        const serviceImage = document.getElementById('service-image');
        const serviceItems = document.querySelectorAll('.service-item');
        
        // Check if elements exist before proceeding
        if (!serviceTitle || !serviceDescription) {
            console.log('Service elements not found on this page. Skipping initialization.');
            return;
        }
        
        console.log('Service elements found. Initializing service functionality.');

        /// Updated updateServiceContent function with smooth image transition
function updateServiceContent(serviceId) {
    const data = serviceData[serviceId] || serviceData['default'];
    
    // Only proceed if elements exist
    if (serviceTitle && serviceDescription) {
        // Reset animation by removing and adding the element
        serviceTitle.style.animation = 'none';
        serviceDescription.style.animation = 'none';
        
        // Trigger reflow
        void serviceTitle.offsetWidth;
        void serviceDescription.offsetWidth;
        
        // Restore animation
        serviceTitle.style.animation = '';
        serviceDescription.style.animation = '';
        
        // Update content safely
        serviceTitle.textContent = data.title;
        serviceDescription.textContent = data.description;
        
        // Smooth image transition
        if (serviceImage && data.image) {
            // Create a new image element
            const newImage = new Image();
            newImage.src = data.image;
            newImage.alt = data.title;
            
            // Add loading class to container (for transition effect)
            const imageContainer = serviceImage.parentElement;
            if (imageContainer) {
                imageContainer.classList.add('loading');
            }
            
            // When the new image is loaded
            newImage.onload = function() {
                // Apply the new image
                serviceImage.src = data.image;
                serviceImage.alt = data.title;
                
                // Remove loading class after a short delay
                setTimeout(() => {
                    if (imageContainer) {
                        imageContainer.classList.remove('loading');
                    }
                }, 50);
            };
            
            // If image fails to load, still update but with a placeholder
            newImage.onerror = function() {
                serviceImage.src = 'img/placeholder.webp'; // Fallback image
                serviceImage.alt = data.title;
                
                if (imageContainer) {
                    imageContainer.classList.remove('loading');
                }
                console.warn(`Image for ${serviceId} failed to load`);
            };
        }
        
        // Update active state for service items
        serviceItems.forEach(item => {
            if (item.getAttribute('data-service') === serviceId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

        // Add click event listeners to service items
        serviceItems.forEach(item => {
            item.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                console.log(`Service clicked: ${serviceId}`);
                updateServiceContent(serviceId);
            });
            
            // Add keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const serviceId = this.getAttribute('data-service');
                    updateServiceContent(serviceId);
                }
            });
            
            // Add touch feedback
            item.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(148, 99, 75, 0.1)';
            }, { passive: true });
            
            item.addEventListener('touchend', function() {
                this.style.backgroundColor = '';
            }, { passive: true });
        });
        
        // Optional: Reset to default when clicking the section title
        const sectionContainer = document.querySelector('.wellbeing-section');
        if (sectionContainer) {
            sectionContainer.addEventListener('dblclick', function(e) {
                // Only reset if clicking on the section background, not on service items
                if (!e.target.closest('.service-item')) {
                    updateServiceContent('default');
                }
            });
        }
    }
    
    // Call the initialization function
    initializeServices();
});

// Preload images function
function preloadServiceImages() {
    // Collect all image paths
    const imagePaths = Object.values(serviceData).map(service => service.image);
    
    // Create a hidden preload container
    const preloadContainer = document.createElement('div');
    preloadContainer.style.display = 'none';
    document.body.appendChild(preloadContainer);
    
    // Preload each image
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        preloadContainer.appendChild(img);
    });
    
    // Remove the container after a reasonable time
    setTimeout(() => {
        preloadContainer.remove();
    }, 5000);
}

// Call the preload function after initialization
preloadServiceImages();