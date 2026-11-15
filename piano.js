// Piano Lessons Page - Slot Selection and Booking System

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
    const bookingCloseBtn = bookingModal.querySelector('.modal-close');

    bookingCloseBtn.addEventListener('click', function() {
        bookingModal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.classList.remove('show');
        }
    });

    // Handle booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const form = this;
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
                bookingModal.classList.remove('show');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);
                alert('Oops! There was an error. Please try again or email us directly at cadenzamusictherapy@gmail.com');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
});

function openBookingForm(lessonTime) {
    document.getElementById('selectedLessonDisplay').textContent = lessonTime;
    document.getElementById('selectedDateTime').value = lessonTime;
    document.getElementById('bookingModal').classList.add('show');
}
