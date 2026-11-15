// Check if EmailJS is available immediately
console.log('⏱️ script.js loading - checking for emailjs globally:', typeof emailjs !== 'undefined');
if (typeof window !== 'undefined') {
    console.log('Window.emailjs available:', typeof window.emailjs !== 'undefined');
}

// Custom notification system
function showNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${isSuccess ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 16px;
        font-family: Arial, sans-serif;
        animation: slideIn 0.3s ease-in-out;
        max-width: 400px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 4 seconds with animation
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Helper function to send email via EmailJS
function sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, closeModalFn) {
    console.log('=== SENDING EMAIL ===');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('Template params:', templateParams);
    
    emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
        .then(function(response) {
            console.log('✅ EMAIL SUCCESS!', response.status, response.text);
            
            // Show success notification
            showNotification('Thank you! We received your inquiry and will contact you soon.', true);
            
            // Reset form
            form.reset();
            if (closeModalFn) {
                closeModalFn();
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.error('❌ EMAIL FAILED!', error);
            
            // Show error notification
            showNotification('Oops! There was an error sending your message. Please try again or email us directly at cadenzamusictherapy@gmail.com', false);
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Initialize EmailJS with retry logic
let emailjsInitialized = false;
let initAttempts = 0;
const maxAttempts = 50; // 5 seconds maximum (50 * 100ms)

function initEmailJS() {
    console.log(`[EmailJS Init Attempt ${initAttempts}/${maxAttempts}] emailjs type: ${typeof emailjs}, initialized: ${emailjsInitialized}`);
    
    if (typeof emailjs !== 'undefined' && !emailjsInitialized) {
        try {
            console.log('🔄 Attempting to initialize EmailJS with public key: _aysIkRUPN3haZ-H-');
            emailjs.init("_aysIkRUPN3haZ-H-");
            emailjsInitialized = true;
            console.log('✅ EmailJS initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize EmailJS:', error);
        }
    } else if (typeof emailjs === 'undefined' && initAttempts < maxAttempts) {
        // Retry in 100ms if not loaded yet
        initAttempts++;
        setTimeout(initEmailJS, 100);
    } else if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS failed to load after 5 seconds and', maxAttempts, 'retries');
    } else if (emailjsInitialized) {
        console.log('✅ EmailJS already initialized');
    }
}

// Start initialization immediately
console.log('🚀 Starting script.js - initializing EmailJS...');
initEmailJS();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('signupModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Exit early if modal doesn't exist
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Open modal and set program
    const signupButtons = document.querySelectorAll('.signup-btn');
    console.log('Found ' + signupButtons.length + ' signup buttons');
    
    signupButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const program = this.getAttribute('data-program');
            console.log('Signup clicked for program: ' + program);
            document.getElementById('modalServiceType').value = program;
            modal.classList.add('show');
            console.log('Modal shown');
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Handle modal form submission
    document.getElementById('modalContactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('📝 Modal form submitted');
        
        const form = this;
        
        // Collect form data
        const templateParams = {
            title: 'New Class Inquiry',
            name: document.getElementById('modalName').value,
            email: document.getElementById('modalEmail').value,
            phone: document.getElementById('modalPhone').value,
            service_type: document.getElementById('modalServiceType').value,
            service_type_display: 'table-row',
            lesson_datetime: '',
            lesson_datetime_display: 'none',
            message: document.getElementById('modalMessage').value
        };
        
        console.log('Form data collected:', templateParams.from_name, templateParams.from_email);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Check if EmailJS is available - wait a bit if it's still loading
        if (typeof emailjs === 'undefined') {
            console.warn('⏳ EmailJS not yet loaded, waiting 500ms...');
            setTimeout(() => {
                if (typeof emailjs === 'undefined') {
                    console.error('❌ EmailJS still not available after waiting');
                    showNotification('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com', false);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                console.log('✅ EmailJS loaded during wait, proceeding with send');
                // If it loaded, send the email
                sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
                    modal.classList.remove('show');
                });
            }, 500);
            return;
        }
        
        console.log('✅ EmailJS ready, sending email immediately');
        // Send email through EmailJS
        sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
            modal.classList.remove('show');
        });
    });

    // Handle bottom contact form submission (keep for people scrolling to it)
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('📝 Bottom contact form submitted');
            
            const form = this;
            
            // Collect form data
            const templateParams = {
                title: 'New Contact Form Inquiry',
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service_type: document.getElementById('serviceType').value,
                service_type_display: 'table-row',
                lesson_datetime: '',
                lesson_datetime_display: 'none',
                message: document.getElementById('message').value
            };
            
            console.log('Form data collected:', templateParams.from_name, templateParams.from_email);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Check if EmailJS is available - wait a bit if it's still loading
            if (typeof emailjs === 'undefined') {
                console.warn('⏳ EmailJS not yet loaded, waiting 500ms...');
                setTimeout(() => {
                    if (typeof emailjs === 'undefined') {
                        console.error('❌ EmailJS still not available after waiting');
                        showNotification('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com', false);
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        return;
                    }
                    console.log('✅ EmailJS loaded during wait, proceeding with send');
                    // If it loaded, send the email
                    sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
                        modal.classList.remove('show');
                    });
                }, 500);
                return;
            }
            
            console.log('✅ EmailJS ready, sending email immediately');
            // Send email through EmailJS
            sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
                modal.classList.remove('show');
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
});
