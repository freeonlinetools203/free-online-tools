(function() {
    // DOM elements
    const dropdown = document.getElementById('toolsDropdown');
    const dropBtn = document.getElementById('toolsBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    
    // Ensure all elements exist
    if (!dropdown || !dropBtn || !dropdownContent) {
        console.warn("Dropdown elements missing");
        return;
    }
    
    // Function to close dropdown
    function closeDropdown() {
        dropdown.classList.remove('open');
        // Reset any open category accordions inside
        const allActiveCats = document.querySelectorAll('.dropdown-category.active');
        allActiveCats.forEach(cat => {
            cat.classList.remove('active');
            const targetId = cat.getAttribute('data-cat');
            if(targetId) {
                const toolsDiv = document.getElementById(targetId + 'Tools');
                if(toolsDiv) toolsDiv.classList.remove('show');
            }
        });
    }
    
    // Function to open dropdown
    function openDropdown() {
        dropdown.classList.add('open');
    }
    
    // Toggle function for button click
    function toggleDropdown(e) {
        e.stopPropagation();
        if (dropdown.classList.contains('open')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    // Handle button click
    dropBtn.addEventListener('click', toggleDropdown);
    
    // Prevent clicks inside dropdown-content from closing it
    dropdownContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (dropdown.classList.contains('open')) {
            const isClickInside = dropdown.contains(event.target);
            if (!isClickInside) {
                closeDropdown();
            }
        }
    });
    
    // Accordion functionality for categories
    const categories = document.querySelectorAll('.dropdown-category');
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.stopPropagation();
            const catId = this.getAttribute('data-cat');
            if (catId) {
                const toolsDiv = document.getElementById(catId + 'Tools');
                if (toolsDiv) {
                    this.classList.toggle('active');
                    toolsDiv.classList.toggle('show');
                } else {
                    this.classList.toggle('active');
                    const nextDiv = this.nextElementSibling;
                    if(nextDiv && nextDiv.classList.contains('category-tools')) {
                        nextDiv.classList.toggle('show');
                    }
                }
            } else {
                this.classList.toggle('active');
                const nextDiv = this.nextElementSibling;
                if(nextDiv && nextDiv.classList.contains('category-tools')) {
                    nextDiv.classList.toggle('show');
                }
            }
        });
    });
    
    // Prevent closing when clicking on category links
    const allToolLinks = document.querySelectorAll('.category-tools a');
    allToolLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    dropBtn.style.cursor = 'pointer';
    
    // Keyboard support
    dropBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown(e);
        }
    });
})();

// Lazy load native banner ads for better performance
document.addEventListener('DOMContentLoaded', function() {
    // All ad containers will load naturally via async scripts
    // This ensures page content loads first before heavy ad scripts
    
    // Add scroll-based lazy loading for ads (optional)
    const adContainers = document.querySelectorAll('.ad-container');
    
    if ('IntersectionObserver' in window) {
        const adObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ad already has script tags, they load automatically
                    adObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        adContainers.forEach(container => {
            adObserver.observe(container);
        });
    }
});
