const fs = require('fs');

const bienEtreHtml = fs.readFileSync('bien-etre.html', 'utf8');

const newContent = `
<!-- 7. BIEN-ÊTRE - RIAD XO STYLE -->
    <section style="padding-top: 150px; padding-bottom: 80px;" class="section-bien-etre-xo">
        
        <!-- Header Text -->
        <div class="container text-center animate-on-scroll">
            <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-family: 'Marcellus', serif; color: var(--ka-moka-167); margin-bottom: 30px;">SPA & BIEN-ÊTRE</h1>
            
            <div style="max-width: 800px; margin: 0 auto; color: var(--ka-grey-text); font-style: italic; line-height: 1.8; font-size: 1.1rem; text-align: center;">
                <p style="margin-bottom: 15px;">Reconnectez-vous à vous-même à Marrakech.<br>
                Pour une expérience de bien-être complète, le Riad KA vous propose des cours de yoga personnalisés, ouverts à tous les niveaux.</p>
                <p>En attendant l’ouverture de notre espace bien-être privé en 2025, le Riad KA s’associe à des spas partenaires de confiance situés à proximité, dans la médina.</p>
            </div>
            
            <div style="margin-top: 40px; margin-bottom: 60px;">
                <a href="#" class="rk-btn" style="background-color: var(--ka-moka-167); color: white; border: none; padding: 15px 40px; font-weight: normal; letter-spacing: 2px;">CARTE DES SOINS</a>
            </div>
        </div>

        <!-- Hero Collage (Similar to XO style but for SPA) -->
        <div class="restaurant-hero animate-on-scroll delay-1" style="background-image: url('PHOTOS_RIAD_KA/Details/P4162590.jpg');">
            <div class="restaurant-hero-overlay">
                <img src="PHOTOS_RIAD_KA/Details/P4162606.jpg" alt="Bien-être Riad KA">
                <img src="PHOTOS_RIAD_KA/Details/P4162609.jpg" alt="Spa Riad KA">
            </div>
        </div>

        <!-- Menu Text Section -->
        <div class="container" style="margin-top: 80px; max-width: 800px; text-align: left;">
            <h2 style="font-family: 'Marcellus', serif; font-size: 1.5rem; color: var(--ka-moka-167); margin-bottom: 40px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">NOS PRESTATIONS BIEN-ÊTRE</h2>
            
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: var(--ka-moka-167); margin-bottom: 5px; font-weight: 600;">COURS DE YOGA AU RIAD</h3>
                <p style="color: var(--ka-grey-text); font-size: 0.95rem; font-style: italic;">Laissez-vous guider par nos instructeurs qualifiés. Les séances intègrent des postures douces, des techniques de respiration et de relaxation. Les cours peuvent être organisés dans le patio, sur la terrasse ou dans un espace calme.</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: var(--ka-moka-167); margin-bottom: 5px; font-weight: 600;">MASSAGES & SOINS</h3>
                <p style="color: var(--ka-grey-text); font-size: 0.95rem; font-style: italic;">Nous organisons pour vous des prestations sur demande : massages relaxants ou énergétiques, soins du corps revitalisants, hammams traditionnels marocains.</p>
            </div>
        </div>

    </section>
`;

// Replace
const updatedHtml = bienEtreHtml.replace(/<!-- 7\. BIEN-ÊTRE -->[\s\S]*?<!-- 12\. FOOTER -->/, newContent + '\n<!-- 12. FOOTER -->');

fs.writeFileSync('bien-etre.html', updatedHtml);
console.log('bien-etre.html updated successfully with XO style.');
