// Complete Tools Data - Based on working tools from old homepage
const toolsDatabase = {
    seo: {
        name: "🔍 SEO Tools",
        tools: [
            "Keyword Density Checker",
            "Meta Tags Generator",
            "Meta Tag Analyzer"
        ]
    },
    hashtag: {
        name: "📱 Social Media Hashtag Tools",
        tools: [
            "Instagram Hashtag Generator",
            "LinkedIn Hashtag Generator",
            "Facebook Hashtag Generator",
            "Pinterest Hashtag Generator",
            "AI Hashtag Generator",
            "SEO Hashtags Generator"
        ]
    },
    animals: {
        name: "🐾 Animal Pregnancy Tools",
        tools: [
            "Dog Pregnancy Calculator",
            "Cat Pregnancy Calculator",
            "Cow Pregnancy Calculator",
            "Rabbit Pregnancy Calculator",
            "Goat Pregnancy Calculator",
            "Horse Pregnancy Calculator",
            "Sheep Pregnancy Calculator",
            "Pig Pregnancy Calculator"
        ]
    },
    developer: {
        name: "🔐 Developer & Security Tools",
        tools: [
            "MD5 Hash Generator",
            "SHA-256 Hash Generator",
            "SHA-1 Hash Generator",
            "Base64 Encoder/Decoder",
            "URL Encoder/Decoder",
            "HTML Encoder/Decoder"
        ]
    },
    color: {
        name: "🎨 Color Tools",
        tools: [
            "Color Palette Generator",
            "Color Shades Generator",
            "Color Gradient Maker",
            "Color Contrast Checker",
            "Color Name Finder",
            "Random Color Picker"
        ]
    },
    popular: {
        name: "📊 Popular Calculators",
        tools: [
            "Unit Converter",
            "Age Calculator",
            "Age Difference Calculator",
            "Discount Calculator",
            "Profit & Loss Calculator",
            "GPA/CGPA Calculator",
            "GST Calculator",
            "Percentage Calculator",
            "Date Calculator",
            "QR Code Generator",
            "YouTube Thumbnail Downloader",
            "Currency Converter"
        ]
    },
    health: {
        name: "🏃‍♂️ Health & Fitness Tools",
        tools: [
            "BMI Calculator",
            "BMR Calculator",
            "Calorie Calculator",
            "TDEE Calculator"
        ]
    },
    finance: {
        name: "💰 Financial Tools",
        tools: [
            "EMI Calculator",
            "Loan Calculator",
            "Zakat Calculator"
        ]
    },
    text: {
        name: "📝 Text & Writing Tools",
        tools: [
            "Word Counter",
            "Line Counter",
            "Text Case Converter",
            "Password Generator",
            "Password Strength Checker"
        ]
    },
    pdf: {
        name: "📄 PDF Tools",
        tools: [
            "PDF Merger",
            "PDF Splitter",
            "PDF to Image",
            "PDF to JPG",
            "PDF to PNG",
            "PDF to BMP",
            "PDF to WEBP",
            "PDF to TIFF",
            "PDF to Word",
            "PDF to Excel",
            "PDF to Text",
            "PDF Rotator"
        ]
    },
    image: {
        name: "🖼️ Image Tools",
        tools: [
            "Image Color Extractor",
            "Image Converter",
            "Image Cropper",
            "Image Resizer",
            "Image to PDF",
            "Image Upscaler",
            "Image Compressor"
        ]
    },
    fun: {
        name: "🎲 Random & Fun Tools",
        tools: [
            "Spin The Wheel",
            "Yes/No Wheel",
            "Decision Roulette",
            "Random Name Picker",
            "Random Number Generator",
            "Prize Wheel",
            "Task Spinner",
            "Random Color Picker"
        ]
    }
};

// Helper: convert tool name to filename (same as old homepage)
function getUrl(toolName) {
    return toolName.toLowerCase().replace(/ /g, '-').replace(/[^\w\-]/g, '') + '.html';
}

// Render all sections on dashboard
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

// Filter dashboard by category
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

// Build top dropdown menu (All Tools)
function buildTopDropdown() {
    const menu = document.getElementById('allToolsMenu');
    if (!menu) return;
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `
            <div class="dropdown-category" data-cat="${key}">
                ${category.name} <span class="arrow">▶</span>
            </div>
            <div class="dropdown-tools" id="dropdownTools_${key}">
                ${category.tools.map(tool => `<a href="${getUrl(tool)}">${tool}</a>`).join('')}
            </div>
        `;
    }
    menu.innerHTML = html;
    
    document.querySelectorAll('.dropdown-category').forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.stopPropagation();
            const catId = cat.getAttribute('data-cat');
            const toolsDiv = document.getElementById(`dropdownTools_${catId}`);
            const isActive = cat.classList.contains('active');
            document.querySelectorAll('.dropdown-category').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.dropdown-tools').forEach(t => t.classList.remove('show'));
            if (!isActive) {
                cat.classList.add('active');
                if (toolsDiv) toolsDiv.classList.add('show');
            }
        });
    });
}

// Floating dropdown helpers
function showFloatingDropdown(categoryId, categoryName, tools) {
    const dropdown = document.getElementById('floatingDropdown');
    const overlay = document.getElementById('dropdownOverlay') || createOverlay();
    const titleSpan = document.getElementById('dropdownTitle');
    const contentDiv = document.getElementById('floatingDropdownContent');
    if (!dropdown || !contentDiv) return;
    titleSpan.textContent = categoryName;
    contentDiv.innerHTML = tools.map(tool => `
        <a href="${getUrl(tool)}" class="floating-tool-item">🔧 ${tool}</a>
    `).join('');
    dropdown.classList.add('show');
    overlay.classList.add('show');
}

function createOverlay() {
    let overlay = document.getElementById('dropdownOverlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'dropdownOverlay';
    overlay.className = 'dropdown-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
        document.getElementById('floatingDropdown')?.classList.remove('show');
        overlay.classList.remove('show');
    });
    return overlay;
}

function closeFloatingDropdown() {
    const dropdown = document.getElementById('floatingDropdown');
    const overlay = document.getElementById('dropdownOverlay');
    if (dropdown) dropdown.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
}

// Setup category buttons (filter + dropdown icons)
function setupCategoryButtons() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterDashboard(category);
            closeFloatingDropdown();
        });
    });
    document.querySelectorAll('.cat-dropdown-btn').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const categoryId = this.getAttribute('data-category');
            const categoryData = toolsDatabase[categoryId];
            if (categoryData) {
                showFloatingDropdown(categoryId, categoryData.name, categoryData.tools);
            }
        });
    });
}

function setupTopDropdown() {
    const dropdown = document.getElementById('allToolsDropdown');
    const btn = document.getElementById('allToolsBtn');
    if (!dropdown || !btn) return;
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    buildTopDropdown();
    setupTopDropdown();
    setupCategoryButtons();
    if (!document.getElementById('dropdownOverlay')) createOverlay();
    document.querySelector('.close-dropdown')?.addEventListener('click', closeFloatingDropdown);
    filterDashboard('all');
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
