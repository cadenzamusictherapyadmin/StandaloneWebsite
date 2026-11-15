// Piano Lessons Page - Slot Selection and Booking System

// Initialize EmailJS with retry logic
let emailjsInitialized = false;

function initEmailJS() {
    if (typeof emailjs !== 'undefined' && !emailjsInitialized) {
        try {
            emailjs.init("_aysIkRUPN3haZ-H-");
            emailjsInitialized = true;
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    } else if (typeof emailjs === 'undefined') {
        // Retry in 100ms if not loaded yet
        setTimeout(initEmailJS, 100);
    }
}

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

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (typeof emailjs === 'undefined') {
        alert('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you! We received your lesson inquiry and will contact you soon to confirm.');
            form.reset();
            document.getElementById('bookingModal').classList.remove('show');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! There was an error. Please try again or email us directly at cadenzamusictherapy@gmail.com');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

function submitQuestionsForm() {
    const form = document.getElementById('questionsForm');
    const templateParams = {
        to_email: 'cadenzamusictherapy@gmail.com',
        from_name: document.getElementById('questionsName').value,
        from_email: document.getElementById('questionsEmail').value,
        phone: document.getElementById('questionsPhone').value,
        message: document.getElementById('questionsMessage').value,
        inquiry_type: 'Piano/Guitar Lesson Question'
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    if (typeof emailjs === 'undefined') {
        alert('Error: Email service is not available. Please email us directly at cadenzamusictherapy@gmail.com');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    emailjs.send('service_vu74e6b', 'template_dhn2sef', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you! We received your question and will get back to you soon.');
            form.reset();
            document.getElementById('questionsModal').classList.remove('show');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! There was an error. Please try again or email us directly at cadenzamusictherapy@gmail.com');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}
