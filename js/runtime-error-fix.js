/**
 * Runtime Error Fix for Kalma Website
 * 
 * This script addresses common runtime errors and reloads the page
 * if the server becomes unavailable.
 */

(function() {
    // Keep track of server status
    let serverErrorDetected = false;
    
    // Function to check server status
    function checkServerStatus() {
        fetch(window.location.href, { 
            method: 'HEAD',
            cache: 'no-store'
        })
        .then(response => {
            if (response.ok && serverErrorDetected) {
                console.log('Server is back online, reloading page...');
                window.location.reload();
            }
        })
        .catch(error => {
            console.warn('Server may be unavailable:', error);
            serverErrorDetected = true;
            
            // Attempt to recover automatically
            setTimeout(checkServerStatus, 5000); // Check again in 5 seconds
        });
    }
    
    // Listen for server errors
    window.addEventListener('error', function(event) {
        if (event.message && 
            (event.message.includes('Pod failure') || 
             event.message.includes('Server is unavailable'))) {
            
            serverErrorDetected = true;
            
            // Add a user-friendly notification
            showErrorMessage('Server connection lost. Attempting to reconnect...');
            
            // Start checking for server
            checkServerStatus();
        }
    });
    
    // Function to show error message
    function showErrorMessage(message) {
        // Check if message already exists
        if (document.getElementById('server-error-message')) {
            return;
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.id = 'server-error-message';
        errorDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 5px;
            font-family: sans-serif;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
        `;
        
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
    
    // Check for DOM errors that might cause the mobile header issues
    function fixDOMErrors() {
        // Make sure header container exists
        const header = document.querySelector('header');
        if (header && !header.querySelector('.header-container')) {
            console.log('Adding missing header container');
            const container = document.createElement('div');
            container.className = 'header-container';
            
            // Move children to container
            while (header.firstChild) {
                container.appendChild(header.firstChild);
            }
            
            header.appendChild(container);
        }
    }
    
    // Run DOM fixes after page load
    window.addEventListener('DOMContentLoaded', fixDOMErrors);
})();