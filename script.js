// Tools Database
const toolsDatabase = {
    seo: { name: "🔍 SEO Tools", tools: ["Keyword Density Checker", "Meta Tags Generator", "Meta Tag Analyzer", "SEO Score Checker", "Backlink Checker", "Google Index Checker"] },
    pdf: { name: "📄 PDF Tools", tools: ["PDF Merger", "PDF Splitter", "PDF to Image", "PDF to JPG", "PDF to PNG", "PDF to Word", "PDF to Excel", "PDF to Text", "PDF Rotator"] },
    image: { name: "🖼️ Image Tools", tools: ["Image Color Extractor", "Image Converter", "Image Cropper", "Image Resizer", "Image to PDF", "Image Upscaler", "Image Compressor"] },
    finance: { name: "💰 Financial Tools", tools: ["EMI Calculator", "Loan Calculator", "Zakat Calculator", "Currency Converter", "GST Calculator", "Profit & Loss Calculator", "Discount Calculator", "SIP Calculator"] },
    fun: { name: "🎲 Fun Tools", tools: ["Spin The Wheel", "Yes/No Wheel", "Random Name Picker", "Random Number Generator", "Prize Wheel", "Task Spinner", "Random Color Picker", "Decision Roulette"] },
    animals: { name: "🐾 Animal Pregnancy Tools", tools: ["Dog Pregnancy Calculator", "Cat Pregnancy Calculator", "Cow Pregnancy Calculator", "Rabbit Pregnancy Calculator", "Goat Pregnancy Calculator", "Horse Pregnancy Calculator", "Sheep Pregnancy Calculator", "Pig Pregnancy Calculator"] },
    health: { name: "🏃‍♂️ Health Tools", tools: ["BMI Calculator", "BMR Calculator", "Calorie Calculator", "TDEE Calculator", "Water Intake Calculator", "Sleep Calculator"] },
    text: { name: "📝 Text Tools", tools: ["Word Counter", "Line Counter", "Text Case Converter", "Password Generator", "Password Strength Checker", "Character Counter"] },
    color: { name: "🎨 Color Tools", tools: ["Color Palette Generator", "Color Shades Generator", "Color Gradient Maker", "Color Contrast Checker", "Color Name Finder"] },
    developer: { name: "🔐 Developer Tools", tools: ["MD5 Hash Generator", "SHA-256 Hash Generator", "SHA-1 Hash Generator", "Base64 Encoder/Decoder", "URL Encoder/Decoder", "HTML Encoder/Decoder", "QR Code Generator"] },
    popular: { name: "📊 Popular Calculators", tools: ["Unit Converter", "Age Calculator", "Age Difference Calculator", "GPA/CGPA Calculator", "Date Calculator", "YouTube Thumbnail Downloader"] }
};

function getUrl(toolName) {
    return toolName.toLowerCase().replace(/ /g, '-').replace(/[^\w\-]/g, '') + '.html';
}

function renderDashboard() {
    const container = document.getElementById('toolsContainer');
    if (!container) return;
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `<div class="section" data-category="${key}"><h2>${category.name}</h2><div class="tools-grid">${category.tools.map(tool => `<div class="tool-card"><a href="${getUrl(tool)}">${tool}</a></div>`).join('')}</div></div>`;
    }
    container.innerHTML = html;
}

function buildTopDropdown() {
    const menu = document.getElementById('allToolsMenu');
    if (!menu) return;
    let html = '';
    for (const [key, category] of Object.entries(toolsDatabase)) {
        html += `<div class="top-category" data-cat="${key}">${category.name} <span class="arrow">▶</span></div><div class="top-tools" id="topTools_${key}">${category.tools.map(tool => `<a href="${getUrl(tool)}">${tool}</a>`).join('')}</div>`;
    }
    menu.innerHTML = html;
    document.querySelectorAll('.top-category').forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.stopPropagation();
            const catId = cat.getAttribute('data-cat');
            const toolsDiv = document.getElementById(`topTools_${catId}`);
            document.querySelectorAll('.top-category').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.top-tools').forEach(t => t.classList.remove('show'));
            cat.classList.add('active');
            if (toolsDiv) toolsDiv.classList.add('show');
        });
    });
}

function buildInlineDropdowns() {
    for (const [key, category] of Object.entries(toolsDatabase)) {
        const menuDiv = document.getElementById(`inlineMenu_${key}`);
        if (menuDiv) {
            const contentDiv = menuDiv.querySelector('.inline-dropdown-content');
            if (contentDiv) contentDiv.innerHTML = category.tools.map(tool => `<a href="${getUrl(tool)}">${tool}</a>`).join('');
            const btn = document.querySelector(`.cat-dropdown-btn[data-category="${key}"]`);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const menu = btn.closest('.inline-dropdown')?.querySelector('.inline-dropdown-menu');
                    document.querySelectorAll('.inline-dropdown-menu').forEach(m => { if (m !== menu) m.classList.remove('show'); });
                    if (menu) menu.classList.toggle('show');
                });
            }
        }
    }
}

function setupTopDropdown() {
    const dropdown = document.getElementById('allToolsDropdown');
    const btn = document.getElementById('allToolsBtn');
    if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', (e) => { if (dropdown && !dropdown.contains(e.target)) dropdown.classList.remove('open'); });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    buildTopDropdown();
    buildInlineDropdowns();
    setupTopDropdown();
});
