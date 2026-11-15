// Helper function to send email via EmailJS
function sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, closeModalFn) {
    console.log('=== SENDING EMAIL ===');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('Template params:', templateParams);
    
    emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
        .then(function(response) {
            console.log('✅ EMAIL SUCCESS!', response.status, response.text);
            
            // Show success message
            alert('Thank you! We received your inquiry and will contact you soon to confirm.');
            
            // Reset form
            form.reset();
            if (closeModalFn) {
                closeModalFn();
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.error('❌ EMAIL FAILED!', error);
            
            // Show error message
            alert('Oops! There was an error. Please try again or email us directly at cadenzamusictherapy@gmail.com');
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Piano Lessons Page - Slot Selection and Booking System

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
console.log('🚀 Starting piano.js - initializing EmailJS...');
initEmailJS();

document.addEventListener('DOMContentLoaded', function() {
    // Handle slot button clicks
    const slotButtons = document.querySelectorAll('.slot-button');
    
    slotButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lessonTime = this.getAttribute('data-time');
            openBookingForm(lessonTime);
        });
    });

    // Modal close buttons
    const bookingModal = document.getElementById('bookingModal');
    const questionsModal = document.getElementById('questionsModal');
    const bookingCloseBtn = bookingModal.querySelector('.modal-close');
    const questionsCloseBtn = questionsModal.querySelector('.modal-close');

    bookingCloseBtn.addEventListener('click', function() {
        bookingModal.classList.remove('show');
    });

    questionsCloseBtn.addEventListener('click', function() {
        questionsModal.classList.remove('show');
    });

    // Open questions form button
    const openQuestionsBtn = document.getElementById('openQuestionsForm');
    if (openQuestionsBtn) {
        openQuestionsBtn.addEventListener('click', function() {
            questionsModal.classList.add('show');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.classList.remove('show');
        }
        if (event.target === questionsModal) {
            questionsModal.classList.remove('show');
        }
    });

    // Handle booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitBookingForm();
    });

    // Handle questions form submission
    document.getElementById('questionsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitQuestionsForm();
    });
});

function openBookingForm(lessonTime) {
    document.getElementById('selectedLessonDisplay').textContent = lessonTime;
    document.getElementById('selectedDateTime').value = lessonTime;
    document.getElementById('bookingModal').classList.add('show');
}

function submitBookingForm() {
    console.log('📝 Booking form submitted');
    
    const form = document.getElementById('bookingForm');
    const templateParams = {
        to_email: 'cadenzamusictherapy@gmail.com',
        from_name: document.getElementById('pianoName').value,
        from_email: document.getElementById('pianoEmail').value,
        phone: document.getElementById('pianoPhone').value,
        lesson_type: 'Piano/Guitar Lesson',
        lesson_datetime: document.getElementById('selectedDateTime').value,
        message: document.getElementById('pianoMessage').value,
        inquiry_type: 'Piano/Guitar Lesson Booking'
    };

    console.log('Form data collected:', templateParams.from_name, templateParams.from_email, templateParams.lesson_datetime);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (typeof emailjs === 'undefined') {
        console.warn('⏳ EmailJS not yet loaded, waiting 500ms...');
        setTimeout(() => {
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS still not available after waiting');
                alert('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            console.log('✅ EmailJS loaded during wait, proceeding with send');
            // If it loaded, send the email
            sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
                document.getElementById('bookingModal').classList.remove('show');
            });
        }, 500);
        return;
    }

    console.log('✅ EmailJS ready, sending email immediately');
    sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
        document.getElementById('bookingModal').classList.remove('show');
    });
}

function submitQuestionsForm() {
    console.log('📝 Questions form submitted');
    
    const form = document.getElementById('questionsForm');
    const templateParams = {
        to_email: 'cadenzamusictherapy@gmail.com',
        from_name: document.getElementById('questionsName').value,
        from_email: document.getElementById('questionsEmail').value,
        phone: document.getElementById('questionsPhone').value,
        message: document.getElementById('questionsMessage').value,
        inquiry_type: 'Piano/Guitar Lesson Question'
    };

    console.log('Form data collected:', templateParams.from_name, templateParams.from_email);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (typeof emailjs === 'undefined') {
        console.warn('⏳ EmailJS not yet loaded, waiting 500ms...');
        setTimeout(() => {
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS still not available after waiting');
                alert('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            console.log('✅ EmailJS loaded during wait, proceeding with send');
            // If it loaded, send the email
            sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
                document.getElementById('questionsModal').classList.remove('show');
            });
        }, 500);
        return;
    }

    console.log('✅ EmailJS ready, sending email immediately');
    sendEmailViaEmailJS(templateParams, form, submitBtn, originalText, () => {
        document.getElementById('questionsModal').classList.remove('show');
    });
}
