const fs = require('fs');

const restaurationHtml = fs.readFileSync('restauration.html', 'utf8');

const newContent = `
<!-- 6. RESTAURATION - RIAD XO STYLE -->
    <section style="padding-top: 150px; padding-bottom: 80px;" class="section-restaurant-xo">
        
        <!-- Header Text -->
        <div class="container text-center animate-on-scroll">
            <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-family: 'Marcellus', serif; color: var(--ka-moka-167); margin-bottom: 30px;">ROOFTOP Restaurant & Bar</h1>
            
            <div style="max-width: 800px; margin: 0 auto; color: var(--ka-grey-text); font-style: italic; line-height: 1.8; font-size: 1.1rem; text-align: left;">
                <p style="margin-bottom: 15px;">Notre immense rooftop végétalisé a en brayé, est le lieu idéal pour se détendre et boire un verre.<br>
                Notre cuisine est traditionnelle et fait partie de l'expérience, de la découverte et du voyage. Nos produits sont frais, simples et sans issue d'une production biologique.</p>
                <p>Elle se veut conviviale pour un moment de partage, servie au restaurant sur la terrasse ou dans l'une des multiples terrasses privées du riad.</p>
            </div>
            
            <div style="margin-top: 40px; margin-bottom: 60px;">
                <a href="#" class="rk-btn" style="background-color: var(--ka-moka-167); color: white; border: none; padding: 15px 40px; font-weight: normal; letter-spacing: 2px;">CARTE</a>
            </div>
        </div>

        <!-- Hero Collage -->
        <div class="restaurant-hero animate-on-scroll delay-1">
            <div class="restaurant-hero-overlay">
                <img src="PHOTOS_RIAD_KA/Pdej/P4162703.jpg" alt="Restauration Riad KA">
                <img src="PHOTOS_RIAD_KA/Pdej/P4162694.jpg" alt="Plat Riad KA">
            </div>
        </div>

        <!-- Menu Text Section -->
        <div class="container" style="margin-top: 80px; max-width: 800px; text-align: left;">
            <h2 style="font-family: 'Marcellus', serif; font-size: 1.5rem; color: var(--ka-moka-167); margin-bottom: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">UNE RESTAURATION POUR TOUS</h2>
            
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: var(--ka-moka-167); margin-bottom: 5px; font-weight: 600;">PETIT DÉJEUNER 8H - 11H</h3>
                <p style="color: var(--ka-grey-text); font-size: 0.95rem; font-style: italic;">Inclus dans le prix de la chambre. Servi sur les terrasses.</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: var(--ka-moka-167); margin-bottom: 5px; font-weight: 600;">DÎNER DANS NOTRE PATIO 19H30 - 22H30</h3>
                <p style="color: var(--ka-grey-text); font-size: 0.95rem; font-style: italic;">Notre cuisine est une cuisine de famille, conviviale et marocaine.</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: var(--ka-moka-167); margin-bottom: 5px; font-weight: 600;">CANDLE NIGHT DINNER</h3>
                <p style="color: var(--ka-grey-text); font-size: 0.95rem; font-style: italic;">Pour les couples, pour les lunes de miel, nous préparons un dîner privé sur la terrasse avec un apéritif, avec ou sans alcool.</p>
            </div>
        </div>

    </section>
`;

// Replace
const updatedHtml = restaurationHtml.replace(/<!-- 6\. RESTAURATION -->[\s\S]*?<!-- 12\. FOOTER -->/, newContent + '\n<!-- 12. FOOTER -->');

fs.writeFileSync('restauration.html', updatedHtml);

// Add CSS to custom-riadka.css
let cssFile = fs.readFileSync('css/custom-riadka.css', 'utf8');

const newCss = `
/* =========================================
   RESTAURANT XO STYLE
========================================= */
.restaurant-hero {
    position: relative;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    height: 600px;
    background: url('../PHOTOS_RIAD_KA/Terrasse/P4162138.jpg') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}

.restaurant-hero-overlay {
    display: flex;
    gap: 20px;
    z-index: 2;
    padding: 20px;
}

.restaurant-hero-overlay img {
    width: 400px;
    height: 300px;
    object-fit: cover;
    border: 5px solid white;
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
    .restaurant-hero {
        height: 400px;
    }
    .restaurant-hero-overlay {
        flex-direction: column;
    }
    .restaurant-hero-overlay img {
        width: 100%;
        max-width: 300px;
        height: 200px;
    }
}
`;

if (!cssFile.includes('.restaurant-hero')) {
    fs.writeFileSync('css/custom-riadka.css', cssFile + '\n' + newCss);
}

console.log('restauration.html and CSS updated successfully with XO style.');
