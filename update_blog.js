const fs = require('fs');

const blogHtml = fs.readFileSync('blog.html', 'utf8');
const articles = JSON.parse(fs.readFileSync('extracted_blog.json', 'utf8'));

let newContent = `
<!-- 8. BLOG SECTION -->
    <section style="padding-top: 150px; padding-bottom: 80px;" class="section-blog">
        <div class="container">
            <div class="section-heading text-center animate-on-scroll">
                <span class="ka-section-label">Journal & Actualités</span>
                <h1 style="font-size: clamp(2.5rem, 5vw, 3.5rem); font-family: 'Marcellus', serif; color: var(--ka-moka-167); margin-bottom: 20px;">Notre Blog</h1>
                <p style="color: var(--ka-grey-text); max-width: 600px; margin: 0 auto;">Découvrez nos derniers articles pour préparer au mieux votre séjour à Marrakech.</p>
            </div>
            
            <div class="blog-grid">
`;

articles.forEach((article, index) => {
    let delay = (index % 3) + 1;
    newContent += `
                <div class="blog-card animate-on-scroll delay-${delay}">
                    <img src="${article.img}" alt="${article.title}">
                    <div class="blog-card-content">
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <a href="#">Lire la suite &rarr;</a>
                    </div>
                </div>
    `;
});

newContent += `
            </div>
        </div>
    </section>
`;

const updatedHtml = blogHtml.replace(/<section style="padding-top: 150px;" class="section-welcome"[^>]*>[\s\S]*?<\/section>/, newContent);
fs.writeFileSync('blog.html', updatedHtml);

let cssFile = fs.readFileSync('css/custom-riadka.css', 'utf8');

const newCss = `
/* =========================================
   BLOG SECTION
========================================= */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 40px;
    margin-top: 60px;
    margin-bottom: 80px;
}
.blog-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #f0f0f0;
}
.blog-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.blog-card img {
    width: 100%;
    height: 240px;
    object-fit: cover;
}
.blog-card-content {
    padding: 30px;
}
.blog-card h3 {
    font-family: 'Marcellus', serif;
    font-size: 1.4rem;
    color: var(--ka-moka-167);
    margin-bottom: 15px;
    line-height: 1.3;
}
.blog-card p {
    font-size: 0.95rem;
    color: var(--ka-grey-text);
    margin-bottom: 25px;
    line-height: 1.6;
}
.blog-card a {
    color: var(--ka-terracotta-493);
    font-weight: 600;
    text-decoration: none;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.2s;
}
.blog-card a:hover {
    color: var(--ka-moka-167);
}
`;

if (!cssFile.includes('.blog-grid')) {
    fs.writeFileSync('css/custom-riadka.css', cssFile + '\n' + newCss);
}

console.log('blog.html and CSS updated successfully.');
