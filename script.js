// Initialize EmailJS
(function() {
    emailjs.init("_aysIkRUPN3haZ-H-");
})();

// Modal functionality
const modal = document.getElementById('signupModal');
const closeBtn = document.querySelector('.modal-close');

// Open modal and set program
document.querySelectorAll('.signup-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const program = this.getAttribute('data-program');
        document.getElementById('modalServiceType').value = program;
        modal.classList.add('show');
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Handle modal form submission
document.getElementById('modalContactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = this;
    
    // Collect form data
    const templateParams = {
        to_email: 'cadenzamusictherapy@gmail.com',
        from_name: document.getElementById('modalName').value,
        from_email: document.getElementById('modalEmail').value,
        phone: document.getElementById('modalPhone').value,
        service_type: document.getElementById('modalServiceType').value,
        message: document.getElementById('modalMessage').value
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email through EmailJS
    emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert('Thank you! We received your inquiry and will contact you soon.');
            
            // Reset form
            form.reset();
            modal.classList.remove('show');
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

// Handle bottom contact form submission (keep for people scrolling to it)
if (document.getElementById('contactForm')) {
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
        emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
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
}

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
