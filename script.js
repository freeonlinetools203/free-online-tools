// ========== MEGA MENU DROPDOWN ==========
document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.mega-category');
    
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.stopPropagation();
            
            categories.forEach(cat => {
                if (cat !== this && cat.classList.contains('active')) {
                    cat.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
    });
    
    document.addEventListener('click', function() {
        categories.forEach(category => {
            category.classList.remove('active');
        });
    });
});

// ========== PAGE LOAD ANIMATION ==========
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 10);
});

// ========== BUTTON CLICK ANIMATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.tool-card a, .support-btn, .animated-link, .submit-review');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// ========== STAR RATING FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating span');
    const ratingInput = document.getElementById('ratingValue');
    
    if (stars.length) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingInput.value = value;
                
                stars.forEach(s => {
                    const starValue = parseInt(s.getAttribute('data-value'));
                    if (starValue <= value) {
                        s.textContent = '★';
                        s.classList.add('active');
                    } else {
                        s.textContent = '☆';
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseenter', function() {
                const value = this.getAttribute('data-value');
                stars.forEach(s => {
                    const starValue = parseInt(s.getAttribute('data-value'));
                    if (starValue <= value) {
                        s.style.color = '#f59e0b';
                    } else {
                        s.style.color = '#d1d5db';
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                stars.forEach(s => {
                    s.style.color = '';
                });
            });
        });
    }
    
    // Handle review form submission
    const reviewForm = document.getElementById('userReviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reviewerName').value;
            const message = document.getElementById('reviewMessage').value;
            const rating = document.getElementById('ratingValue').value;
            
            if (name && message) {
                alert('Thank you for your review! It will appear after approval.');
                reviewForm.reset();
                ratingInput.value = '5';
                stars.forEach(s => {
                    const starValue = parseInt(s.getAttribute('data-value'));
                    if (starValue <= 5) {
                        s.textContent = '★';
                        s.classList.add('active');
                    }
                });
            } else {
                alert('Please fill all fields.');
            }
        });
    }
});
