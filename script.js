// ========== BOTH NAVBAR SUPPORT ==========

// For OLD navbar (dropdown with accordion)
(function() {
    const dropdown = document.getElementById('toolsDropdown');
    const dropBtn = document.getElementById('toolsBtn');
    const dropdownContent = document.getElementById('dropdownContent');
    
    if (dropdown && dropBtn && dropdownContent) {
        function closeDropdown() {
            dropdown.classList.remove('open');
            document.querySelectorAll('.dropdown-category.active').forEach(cat => {
                cat.classList.remove('active');
                const targetId = cat.getAttribute('data-cat');
                if(targetId) {
                    const toolsDiv = document.getElementById(targetId + 'Tools');
                    if(toolsDiv) toolsDiv.classList.remove('show');
                }
            });
        }
        
        function openDropdown() {
            dropdown.classList.add('open');
        }
        
        function toggleDropdown(e) {
            e.stopPropagation();
            if (dropdown.classList.contains('open')) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }
        
        dropBtn.addEventListener('click', toggleDropdown);
        dropdownContent.addEventListener('click', function(e) { e.stopPropagation(); });
        
        document.addEventListener('click', function(event) {
            if (dropdown.classList.contains('open') && !dropdown.contains(event.target)) {
                closeDropdown();
            }
        });
        
        document.querySelectorAll('.dropdown-category').forEach(category => {
            category.addEventListener('click', function(e) {
                e.stopPropagation();
                const catId = this.getAttribute('data-cat');
                if (catId) {
                    const toolsDiv = document.getElementById(catId + 'Tools');
                    if (toolsDiv) {
                        this.classList.toggle('active');
                        toolsDiv.classList.toggle('show');
                    }
                }
            });
        });
        
        dropBtn.style.cursor = 'pointer';
    }
})();

// For NEW two-line navbar
(function() {
    const triggers = document.querySelectorAll('.category-trigger');
    if (triggers.length > 0) {
        function closeAllPanels(exceptTrigger = null) {
            triggers.forEach(trigger => {
                const panel = trigger.querySelector('.category-dropdown-panel');
                if (panel && (!exceptTrigger || trigger !== exceptTrigger)) {
                    panel.classList.remove('open');
                }
            });
        }
        
        triggers.forEach(trigger => {
            const btn = trigger.querySelector('.category-btn');
            const panel = trigger.querySelector('.category-dropdown-panel');
            if (!btn || !panel) return;
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = panel.classList.contains('open');
                closeAllPanels(isOpen ? null : trigger);
                if (!isOpen) {
                    panel.classList.add('open');
                }
            });
            
            panel.addEventListener('click', function(e) { e.stopPropagation(); });
        });
        
        document.addEventListener('click', function(e) {
            let inside = false;
            triggers.forEach(trigger => {
                if (trigger.contains(e.target)) inside = true;
            });
            if (!inside) closeAllPanels(null);
        });
    }
})();

// Lazy load ads
document.addEventListener('DOMContentLoaded', function() {
    const adContainers = document.querySelectorAll('.ad-container');
    if ('IntersectionObserver' in window && adContainers.length) {
        const adObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    adObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        adContainers.forEach(container => adObserver.observe(container));
    }
});
