/**
 * Free Online Tools - Main JavaScript
 */

// Complete Tools Data
const toolsDatabase = {
    seo: {
        name: "🔍 SEO Tools",
        tools: [
            "Keyword Density Checker", "Meta Tags Generator", "Meta Tag Analyzer",
            "SEO Score Checker", "Backlink Checker", "Google Index Checker"
        ]
    },
    pdf: {
        name: "📄 PDF Tools",
        tools: [
            "PDF Merger", "PDF Splitter", "PDF to Image", "PDF to JPG",
            "PDF to PNG", "PDF to Word", "PDF to Excel", "PDF to Text", "PDF Rotator"
        ]
    },
    image: {
        name: "🖼️ Image Tools",
        tools: [
            "Image Color Extractor", "Image Converter", "Image Cropper",
            "Image Resizer", "Image to PDF", "Image Upscaler", "Image Compressor"
        ]
    },
    finance: {
        name: "💰 Financial Tools",
        tools: [
            "EMI Calculator", "Loan Calculator", "Zakat Calculator",
            "Currency Converter", "GST Calculator", "Profit & Loss Calculator",
            "Discount Calculator", "SIP Calculator"
        ]
    },
    fun: {
        name: "🎲 Fun Tools",
        tools: [
            "Spin The Wheel", "Yes/No Wheel", "Random Name Picker",
            "Random Number Generator", "Prize Wheel", "Task Spinner",
            "Random Color Picker", "Decision Roulette"
        ]
    },
    animals: {
        name: "🐾 Animal Pregnancy Tools",
        tools: [
            "Dog Pregnancy Calculator", "Cat Pregnancy Calculator", "Cow Pregnancy Calculator",
            "Rabbit Pregnancy Calculator", "Goat Pregnancy Calculator", "Horse Pregnancy Calculator",
            "Sheep Pregnancy Calculator", "Pig Pregnancy Calculator"
        ]
    },
    health: {
        name: "🏃‍♂️ Health Tools",
        tools: [
            "BMI Calculator", "BMR Calculator", "Calorie Calculator",
            "TDEE Calculator", "Water Intake Calculator", "Sleep Calculator"
        ]
    },
    text: {
        name: "📝 Text Tools",
        tools: [
            "Word Counter", "Line Counter", "Text Case Converter",
            "Password Generator", "Password Strength Checker", "Character Counter"
        ]
    },
    color: {
        name: "🎨 Color Tools",
        tools: [
            "Color Palette Generator", "Color Shades Generator", "Color Gradient Maker",
            "Color Contrast Checker", "Color Name Finder"
        ]
    },
    developer: {
        name: "🔐 Developer Tools",
        tools: [
            "MD5 Hash Generator", "SHA-256 Hash Generator", "SHA-1 Hash Generator",
            "Base64 Encoder/Decoder", "URL Encoder/Decoder", "HTML Encoder/Decoder",
            "QR Code Generator"
        ]
    },
    popular: {
        name: "📊 Popular Calculators",
        tools: [
            "Unit Converter", "Age Calculator", "Age Difference Calculator",
            "GPA/CGPA Calculator", "Date Calculator", "YouTube Thumbnail Downloader"
        ]
    }
};

// Helper function
function getUrl(toolName) {
    return toolName.toLowerCase().replace(/ /g, '-').replace(/[^\w\-]/g, '') + '.html';
}

// Render dashboard
function renderDashboard() {
    const container = document.getElementById('toolsContainer');
    if (!container) return;
    
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `
            <div class="section" data-category="${key}">
                <h2>${category.name}</h2>
                <div class="tools-grid">
                    ${category.tools.map(tool => `
                        <div class="tool-card">
                            <a href="${getUrl(tool)}">${tool}</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// Filter dashboard
function filterDashboard(categoryId) {
    const sections = document.querySelectorAll('.section');
    if (categoryId === 'all') {
        sections.forEach(section => section.style.display = 'block');
        return;
    }
    sections.forEach(section => {
        section.style.display = section.getAttribute('data-category') === categoryId ? 'block' : 'none';
    });
}

// Build Top Menu Dropdown
function buildTopDropdown() {
    const menu = document.getElementById('allToolsMenu');
    if (!menu) return;
    
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `
            <div class="top-category" data-cat="${key}">
                ${category.name} <span class="arrow">▶</span>
            </div>
            <div class="top-tools" id="topTools_${key}">
                ${category.tools.map(tool => `<a href="${getUrl(tool)}">${tool}</a>`).join('')}
            </div>
        `;
    }
    menu.innerHTML = html;
    
    document.querySelectorAll('.top-category').forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.stopPropagation();
            const catId = cat.getAttribute('data-cat');
            const toolsDiv = document.getElementById(`topTools_${catId}`);
            const isActive = cat.classList.contains('active');
            
            document.querySelectorAll('.top-category').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.top-tools').forEach(t => t.classList.remove('show'));
            
            if (!isActive) {
                cat.classList.add('active');
                if (toolsDiv) toolsDiv.classList.add('show');
            }
        });
    });
}

// Build Inline Dropdowns
function buildInlineDropdowns() {
    for (const [key, category] of Object.entries(toolsDatabase)) {
        const menuDiv = document.getElementById(`inlineMenu_${key}`);
        if (menuDiv) {
            const contentDiv = menuDiv.querySelector('.inline-dropdown-content');
            if (contentDiv) {
                contentDiv.innerHTML = category.tools.map(tool => 
                    `<a href="${getUrl(tool)}">${tool}</a>`
                ).join('');
            }
            
            const btn = document.querySelector(`.cat-dropdown-btn[data-category="${key}"]`);
            if (btn) {
                const parentDropdown = btn.closest('.inline-dropdown');
                const menu = parentDropdown?.querySelector('.inline-dropdown-menu');
                
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.inline-dropdown-menu').forEach(m => {
                        if (m !== menu) m.classList.remove('show');
                    });
                    if (menu) menu.classList.toggle('show');
                });
            }
        }
    }
}

// Close dropdowns on outside click
function setupCloseOnClickOutside() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.inline-dropdown')) {
            document.querySelectorAll('.inline-dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
        const topDropdown = document.getElementById('allToolsDropdown');
        if (topDropdown && !topDropdown.contains(e.target)) {
            topDropdown.classList.remove('open');
        }
    });
}

// Setup category buttons
function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterDashboard(category);
            document.querySelectorAll('.inline-dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        });
    });
}

// Setup top dropdown
function setupTopDropdown() {
    const dropdown = document.getElementById('allToolsDropdown');
    const btn = document.getElementById('allToolsBtn');
    if (!dropdown || !btn) return;
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    buildTopDropdown();
    buildInlineDropdowns();
    setupTopDropdown();
    setupCategoryButtons();
    setupCloseOnClickOutside();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
