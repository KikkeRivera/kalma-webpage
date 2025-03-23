export function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const popup = document.getElementById('subscriptionPopup');
    const acceptButton = document.getElementById('acceptButton');

    const showPopup = () => {
        popup?.classList.add('show');
        setTimeout(hidePopup, 5000);
    };

    const hidePopup = () => {
        popup?.classList.remove('show');
    };

    if (newsletterForm && popup && acceptButton) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput?.value.trim();
            if (email) {
                emailInput.value = '';
                showPopup();
                console.log('Subscribing email:', email);
            }
        });
        acceptButton.addEventListener('click', hidePopup);
    }
}