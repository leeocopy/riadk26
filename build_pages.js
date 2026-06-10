const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head, header, footer
const headMatch = indexHtml.match(/<!DOCTYPE html>[\s\S]*?<\/header>/);
const footerMatch = indexHtml.match(/<!-- 12\. FOOTER -->[\s\S]*?<\/html>/);

if (!headMatch || !footerMatch) {
    console.error("Failed to extract header or footer");
    process.exit(1);
}

const headAndHeader = headMatch[0];
const footerAndScripts = footerMatch[0];

// Define sections
const pages = {
    'chambres.html': {
        title: 'Nos Chambres & Suites',
        regex: /<!-- 4\. NOS CHAMBRES -->[\s\S]*?<\/section>/
    },
    'prestation.html': {
        title: 'Nos Prestations',
        regex: null // handled below
    },
    'restauration.html': {
        title: 'Restauration',
        regex: /<!-- 6\. RESTAURATION -->[\s\S]*?<\/section>/
    },
    'bien-etre.html': {
        title: 'Bien-être',
        regex: /<!-- 7\. BIEN-ÊTRE -->[\s\S]*?<\/section>/
    },
    'a-propos.html': {
        title: 'À propos',
        regex: /<!-- 4\. LE RIAD — Text only -->[\s\S]*?<\/section>\s*<!-- 5\. WELCOME IMAGE -->[\s\S]*?<\/section>/
    },
    'blog.html': {
        title: 'Blog',
        content: `
    <section class="section-welcome" style="padding-top: 150px; min-height: 60vh;">
        <div class="container">
            <div class="welcome-text-centered">
                <h2>Notre Blog</h2>
                <p>Découvrez nos derniers articles et actualités (à venir).</p>
            </div>
        </div>
    </section>`
    }
};

let newNav = `
            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="chambres.html">Chambres</a></li>
                    <li><a href="prestation.html">Prestation</a></li>
                    <li><a href="restauration.html">Restauration</a></li>
                    <li><a href="bien-etre.html">Bien-être</a></li>
                    <li><a href="a-propos.html">À propos</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </nav>`;

let baseHeader = headAndHeader.replace(/<nav class="main-nav">[\s\S]*?<\/nav>/, newNav);
baseHeader = baseHeader.replace(/href="#" class="rk-btn rk-btn-small"/, 'href="index.html#contact" class="rk-btn rk-btn-small"');

// Fix footer links in the extracted footer
let newFooterLinks = `
                    <ul>
                        <li><a href="chambres.html">Chambres & Suites</a></li>
                        <li><a href="prestation.html">Nos Services</a></li>
                        <li><a href="restauration.html">Restauration</a></li>
                        <li><a href="bien-etre.html">Spa & Bien-être</a></li>
                    </ul>`;
let updatedFooterAndScripts = footerAndScripts.replace(/<ul>\s*<li><a href="chambres\.html">Chambres & Suites<\/a><\/li>\s*<li><a href="#services">Nos Services<\/a><\/li>\s*<li><a href="#restauration">Restauration<\/a><\/li>\s*<li><a href="#bien-etre">Spa & Bien-être<\/a><\/li>\s*<\/ul>/, newFooterLinks);

for (const [filename, info] of Object.entries(pages)) {
    let content = '';
    if (info.content) {
        content = info.content;
    } else if (filename === 'prestation.html') {
        const m1 = indexHtml.match(/(<!-- 5\. NOS SERVICES -->[\s\S]*?<\/section>)/);
        const m2 = indexHtml.match(/(<!-- 8\. ACTIVITÉS — RiadXO Style -->[\s\S]*?<\/section>)/);
        if (m1) content += m1[1] + '\n\n';
        if (m2) content += m2[1];
    } else {
        const m = indexHtml.match(info.regex);
        if (m) {
            content = m[0];
        }
    }
    
    // add padding-top to the first section to avoid overlap with fixed header
    content = content.replace(/<section /, '<section style="padding-top: 150px;" ');
    
    // Adjust title if we want to be fancy, but keeping it simple
    let pageHtml = baseHeader + '\n' + content + '\n' + updatedFooterAndScripts;
    fs.writeFileSync(filename, pageHtml);
    console.log('Created ' + filename);
}

// Update index.html
let newIndex = indexHtml.replace(/<nav class="main-nav">[\s\S]*?<\/nav>/, newNav);
newIndex = newIndex.replace(/href="#" class="rk-btn rk-btn-small"/, 'href="#contact" class="rk-btn rk-btn-small"');
newIndex = newIndex.replace(/<ul>\s*<li><a href="chambres\.html">Chambres & Suites<\/a><\/li>\s*<li><a href="#services">Nos Services<\/a><\/li>\s*<li><a href="#restauration">Restauration<\/a><\/li>\s*<li><a href="#bien-etre">Spa & Bien-être<\/a><\/li>\s*<\/ul>/, newFooterLinks);

fs.writeFileSync('index.html', newIndex);
console.log('Updated index.html');
