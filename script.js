// Initialize EmailJS
(function() {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // You'll need to replace this
})();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = this;
    
    // Collect form data
    const templateParams = {
        to_email: 'cadenzamusictherapy@gmail.com',
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service_type: document.getElementById('serviceType').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email through EmailJS
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert('Thank you! We received your inquiry and will contact you soon.');
            
            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            alert('Oops! There was an error sending your message. Please try again or email us directly at cadenzamusictherapy@gmail.com');
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
