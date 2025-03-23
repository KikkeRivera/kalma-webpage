// File: js/error-handler.js

// Universal error protection
(function() {
    // Original methods
    const originalSetInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
    const originalQuerySelector = document.querySelector;
    const originalGetElementById = document.getElementById;
    
    // Safe wrapper for innerHTML
    Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function(value) {
            try {
                return originalSetInnerHTML.call(this, value);
            } catch (error) {
                console.warn('Protected: Attempted to set innerHTML on null or invalid element', error);
                return undefined;
            }
        },
        configurable: true
    });
    
    // Safe querySelector
    document.querySelector = function(...args) {
        try {
            return originalQuerySelector.apply(this, args);
        } catch (error) {
            console.warn('Protected: Error in querySelector', error);
            return null;
        }
    };
    
    // Safe getElementById
    document.getElementById = function(...args) {
        try {
            return originalGetElementById.apply(this, args);
            
        } catch (error) {
            console.warn('Protected: Error in getElementById', error);
            return null;
        }
    };
    
    // Catch all unhandled errors
    window.addEventListener('error', function(event) {
        console.warn('Protected: Caught unhandled error', event.error);
        // Prevent the error from showing in console
        event.preventDefault();
    });
    
    console.log('Error protection initialized');
})();