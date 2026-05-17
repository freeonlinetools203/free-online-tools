// =========================================================================
// CENTRALIZED TOOLS DATABASE (Home page dashboard ke liye)
// =========================================================================
const toolsDatabase = {
    cat_seo: { name: "🔍 SEO Tools", tools: ["Keyword Density Checker", "Meta Tags Generator", "Meta Tag Analyzer"] },
    cat_hashtag: { name: "📱 Social Media Hashtag Tools", tools: ["Instagram Hashtag Generator", "LinkedIn Hashtag Generator", "Facebook Hashtag Generator", "Pinterest Hashtag Generator", "AI Hashtag Generator", "SEO Hashtags Generator"] },
    cat_pregnancy: { name: "🐾 Animal Pregnancy Tools", tools: ["Dog Pregnancy Calculator", "Cat Pregnancy Calculator", "Cow Pregnancy Calculator", "Rabbit Pregnancy Calculator", "Goat Pregnancy Calculator", "Horse Pregnancy Calculator", "Sheep Pregnancy Calculator", "Pig Pregnancy Calculator"] },
    cat_dev: { name: "🔐 Developer & Security Tools", tools: ["MD5 Hash Generator", "SHA-256 Hash Generator", "SHA-1 Hash Generator", "Base64 Encoder/Decoder", "URL Encoder/Decoder", "HTML Encoder/Decoder"] },
    cat_color: { name: "🎨 Color Tools", tools: ["Color Palette Generator", "Color Shades Generator", "Color Gradient Maker", "Color Contrast Checker", "Color Name Finder", "Random Color Picker"] },
    cat1: { name: "📊 Popular Calculators", tools: ["Unit Converter", "Age Calculator", "Age Difference Calculator", "Discount Calculator", "Profit & Loss Calculator", "GPA/CGPA Calculator", "GST Calculator", "Percentage Calculator", "Date Calculator", "QR Code Generator", "YouTube Thumbnail Downloader", "Currency Converter"] },
    cat2: { name: "🏃‍♂️ Health & Fitness", tools: ["BMI Calculator", "BMR Calculator", "Calorie Calculator", "TDEE Calculator"] },
    cat3: { name: "💰 Financial Tools", tools: ["EMI Calculator", "Loan Calculator", "Zakat Calculator"] },
    cat4: { name: "📝 Text & Writing Tools", tools: ["Word Counter", "Line Counter", "Text Case Converter", "Password Generator", "Password Strength Checker"] },
    cat_pdf: { name: "📄 PDF Tools", tools: ["PDF Merger", "PDF Splitter", "PDF to Image", "PDF to JPG", "PDF to PNG", "PDF to BMP", "PDF to WEBP", "PDF to TIFF", "PDF to Word", "PDF to Excel", "PDF to Text", "PDF Rotator"] },
    cat_image: { name: "🖼️ Image Tools", tools: ["Image Color Extractor", "Image Converter", "Image Cropper", "Image Resizer", "Image to PDF", "Image Upscaler", "Image Compressor"] },
    cat7: { name: "🎲 Random & Fun Tools", tools: ["Spin The Wheel", "Random Color Picker", "Yes/No Wheel", "Decision Roulette", "Random Name Picker", "Random Number Generator", "Prize Wheel", "Task Spinner"] }
};

// URL friendly string banane ke liye system
function getUrl(toolName) {
    return toolName.toLowerCase().trim()
        .replace(/ /g, '-')
        .replace(/[^\w\-]/g, '') + '.html';
}

// 1. HOME PAGE CARDS RENDER SYSTEM
function renderDashboard() {
    const container = document.getElementById('toolsContainer');
    if (!container) return; 
    
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `
            <div class="section" data-category="${key}" id="section_${key}">
                <h2>${category.name}</h2>
                <div class="tools-grid">
                    ${category.tools.map(tool => `
                        <div class="tool-card">
                            <a href="${getUrl(tool)}">${tool}</a>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    container.innerHTML = html;
}

// 2. CATEGORIES FILTER BAR GENERATION
function renderCategoriesBar() {
    const barContainer = document.getElementById('categoriesBarContainer');
    if (!barContainer) return;

    let html = `<div class="category-wrapper"><button class="cat-btn active" data-category="all">🌐 All Categories</button></div>`;
    
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `
            <div class="category-wrapper">
                <button class="cat-btn" data-category="${key}">${category.name.split(' ')[1] || category.name} Tools</button>
                <button class="cat-dropdown-btn" data-category="${key}">▶</button>
            </div>`;
    }
    barContainer.innerHTML = html;
    setupCategoryButtonsLogic();
}

// 3. HOME PAGE FILTER ACTION
function filterDashboard(categoryId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (categoryId === 'all') {
            section.style.display = 'block';
        } else {
            section.style.display = section.getAttribute('data-category') === categoryId ? 'block' : 'none';
        }
    });
}

// 4. FOOTER POPULAR LINKS SYSTEM
function populateFooter() {
    const footerCol = document.getElementById('footerPopularTools');
    if (!footerCol) return;
    const popularTools = toolsDatabase.cat1.tools.slice(0, 4);
    
    let html = '<h4>Popular Tools</h4>';
    popularTools.forEach(tool => {
        html += `<a href="${getUrl(tool)}">${tool}</a>`;
    });
    footerCol.innerHTML = html;
}

// =========================================================================
// NAVBAR OPEN/CLOSE LOGIC (Aapke badle hue Navbar ke mutabiq)
// =========================================================================
function setupNavbarLogic() {
    const dropdown = document.getElementById('toolsDropdown');
    const btn = document.getElementById('toolsBtn');
    
    if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
    }

    // Dropdown Categories Accordion inside Navbar
    document.querySelectorAll('.dropdown-category').forEach(cat => {
        cat.addEventListener('click', function(e) {
            e.stopPropagation();
            const catId = this.getAttribute('data-cat');
            if (catId) {
                const toolsDiv = document.getElementById(catId + 'Tools');
                if (toolsDiv) {
                    const isActive = this.classList.contains('active');
                    
                    // Close all other subcategories
                    document.querySelectorAll('.dropdown-category').forEach(c => c.classList.remove('active'));
                    document.querySelectorAll('.category-tools').forEach(t => t.classList.remove('show'));
                    
                    if (!isActive) {
                        this.classList.add('active');
                        toolsDiv.classList.add('show');
                    }
                }
            }
        });
    });

    // Global Click to Close Dropdown
    document.addEventListener('click', (e) => {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            document.querySelectorAll('.dropdown-category').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.category-tools').forEach(t => t.classList.remove('show'));
        }
        if (!e.target.closest('.cat-dropdown-btn') && !e.target.closest('.floating-dropdown')) {
            closeFloatingDropdown();
        }
    });
}

function setupCategoryButtonsLogic() {
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
                const dropdown = document.getElementById('floatingDropdown');
                const overlay = document.getElementById('dropdownOverlay') || createOverlay();
                const titleSpan = document.getElementById('dropdownTitle');
                const contentDiv = document.getElementById('floatingDropdownContent');
                
                titleSpan.textContent = categoryData.name;
                contentDiv.innerHTML = categoryData.tools.map(tool => `<a href="${getUrl(tool)}" class="floating-tool-item">🔧 ${tool}</a>`).join('');
                
                dropdown.classList.add('show');
                overlay.classList.add('show');
            }
        });
    });
}

function createOverlay() {
    let overlay = document.getElementById('dropdownOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'dropdownOverlay';
        overlay.className = 'dropdown-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeFloatingDropdown);
    }
    return overlay;
}

function closeFloatingDropdown() {
    const dropdown = document.getElementById('floatingDropdown');
    const overlay = document.getElementById('dropdownOverlay');
    if (dropdown) dropdown.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
}

// PAGE ONLOAD TRIGGERS
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderCategoriesBar();
    populateFooter();
    createOverlay();

    // FETCH AND LOAD NAVBAR.HTML
    fetch("navbar.html")
        .then(response => {
            if (!response.ok) throw new Error("Navbar network response was not ok");
            return response.text();
        })
        .then(htmlContent => {
            const placeholder = document.getElementById("navbar-placeholder");
            if (placeholder) {
                placeholder.innerHTML = htmlContent;
                setupNavbarLogic(); // Activate navbar buttons after loading html
            }
        })
        .catch(err => console.error("Error loading navbar:", err));
});
