// Demo Page - Flip Card Functionality
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Optional: Allow pressing Escape to flip cards back
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});
