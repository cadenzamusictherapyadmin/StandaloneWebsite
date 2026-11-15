// Piano Lessons Page - Calendar and Booking System

// Hardcoded available lesson slots
const AVAILABLE_SLOTS = {
    '2024-11-20': { // Wednesday
        'Piano': ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
        'Guitar': ['4:00 PM', '5:00 PM']
    },
    '2024-11-22': { // Friday
        'Piano': ['10:00 AM', '1:00 PM'],
        'Guitar': ['2:00 PM', '3:30 PM', '5:00 PM']
    },
    '2024-11-25': { // Monday
        'Piano': ['9:00 AM', '11:00 AM', '3:00 PM'],
        'Guitar': ['10:00 AM', '4:00 PM']
    },
    '2024-11-27': { // Wednesday
        'Piano': ['10:00 AM', '2:00 PM', '4:00 PM'],
        'Guitar': ['11:00 AM', '3:00 PM']
    },
    '2024-11-29': { // Friday
        'Piano': ['1:00 PM', '2:30 PM'],
        'Guitar': ['3:00 PM', '4:00 PM', '5:00 PM']
    },
    '2024-12-02': { // Monday
        'Piano': ['10:00 AM', '11:30 AM', '3:00 PM'],
        'Guitar': ['9:00 AM', '2:00 PM', '4:30 PM']
    },
    '2024-12-04': { // Wednesday
        'Piano': ['1:00 PM', '3:00 PM'],
        'Guitar': ['10:00 AM', '11:00 AM', '4:00 PM']
    }
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let selectedLessonType = null;
let selectedTime = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS if available
    if (typeof emailjsInitialized !== 'undefined' || typeof emailjs !== 'undefined') {
        // Already initialized by main script.js
    }

    // Modal elements
    const calendarModal = document.getElementById('calendarModal');
    const bookingModal = document.getElementById('bookingModal');
    const calendarCloseBtn = calendarModal.querySelector('.modal-close');
    const bookingCloseBtn = bookingModal.querySelector('.modal-close');
    const openCalendarBtns = document.querySelectorAll('#openCalendarBtn, #openCalendarBtn2');

    // Open calendar modal
    openCalendarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            calendarModal.classList.add('show');
            renderCalendar();
        });
    });

    // Close modals
    calendarCloseBtn.addEventListener('click', function() {
        calendarModal.classList.remove('show');
    });

    bookingCloseBtn.addEventListener('click', function() {
        bookingModal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === calendarModal) {
            calendarModal.classList.remove('show');
        }
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
            lesson_type: document.getElementById('selectedLessonType').value,
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

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const monthYear = document.getElementById('monthYear');
    const date = new Date(currentYear, currentMonth);
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = prevLastDate - i;
        calendarGrid.appendChild(day);
    }

    // Current month days
    for (let date = 1; date <= lastDate; date++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = date;

        const dateStr = formatDate(new Date(currentYear, currentMonth, date));
        
        if (AVAILABLE_SLOTS[dateStr]) {
            day.classList.add('has-slots');
            day.addEventListener('click', function() {
                selectDate(dateStr, date);
            });
        }

        calendarGrid.appendChild(day);
    }

    // Next month days
    const remainingDays = 42 - (firstDay + lastDate);
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        calendarGrid.appendChild(day);
    }

    renderAvailableSlots(null);
}

function selectDate(dateStr, dayNum) {
    selectedDate = dateStr;
    selectedLessonType = null;
    selectedTime = null;
    renderAvailableSlots(dateStr);
}

function renderAvailableSlots(dateStr) {
    const slotsContainer = document.getElementById('slotsContainer');
    slotsContainer.innerHTML = '';

    if (!dateStr) {
        slotsContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 1rem;">Select a date to see available times</p>';
        return;
    }

    const slots = AVAILABLE_SLOTS[dateStr];
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    // Lesson type selector
    const typeSelect = document.createElement('div');
    typeSelect.className = 'lesson-type-select';
    typeSelect.innerHTML = `
        <label for="lessonTypeSelect">Lesson Type:</label>
        <select id="lessonTypeSelect">
            <option value="">Select...</option>
            <option value="Piano">Piano</option>
            <option value="Guitar">Guitar</option>
        </select>
    `;
    slotsContainer.appendChild(typeSelect);

    const select = typeSelect.querySelector('select');
    select.addEventListener('change', function() {
        selectedLessonType = this.value;
        renderTimeSlots(dateStr, dayName);
    });

    if (selectedLessonType) {
        select.value = selectedLessonType;
    }

    renderTimeSlots(dateStr, dayName);
}

function renderTimeSlots(dateStr, dayName) {
    const slotsContainer = document.getElementById('slotsContainer');
    const timeSlotsDiv = slotsContainer.querySelector('.time-slots') || document.createElement('div');
    timeSlotsDiv.className = 'time-slots';
    timeSlotsDiv.innerHTML = '';

    if (!selectedLessonType) {
        if (!slotsContainer.querySelector('.time-slots')) {
            slotsContainer.appendChild(timeSlotsDiv);
        }
        return;
    }

    const slots = AVAILABLE_SLOTS[dateStr][selectedLessonType] || [];
    
    if (slots.length === 0) {
        timeSlotsDiv.innerHTML = '<p style="color: #999; text-align: center; padding: 1rem;">No available times for this instrument on this date</p>';
    } else {
        slots.forEach(time => {
            const slot = document.createElement('button');
            slot.type = 'button';
            slot.className = 'time-slot';
            slot.textContent = time;
            slot.addEventListener('click', function(e) {
                e.preventDefault();
                selectTimeSlot(dateStr, dayName, selectedLessonType, time);
            });
            timeSlotsDiv.appendChild(slot);
        });
    }

    if (!slotsContainer.querySelector('.time-slots')) {
        slotsContainer.appendChild(timeSlotsDiv);
    }
}

function selectTimeSlot(dateStr, dayName, lessonType, time) {
    selectedTime = time;
    
    // Update booking form
    const dateObj = new Date(dateStr);
    const displayDateTime = `${dayName} at ${time}`;
    document.getElementById('selectedLessonDisplay').textContent = `${lessonType} Lesson - ${displayDateTime}`;
    document.getElementById('selectedLessonType').value = lessonType;
    document.getElementById('selectedDateTime').value = displayDateTime;

    // Show booking modal
    document.getElementById('calendarModal').classList.remove('show');
    document.getElementById('bookingModal').classList.add('show');
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Calendar navigation
document.getElementById('prevMonth').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});
