const fs = require('fs');

const aproposHtml = fs.readFileSync('a-propos.html', 'utf8');

const newContent = `
<!-- 9. A PROPOS -->
    <section style="padding-top: 150px; padding-bottom: 80px;" class="section-apropos">
        <div class="container text-center animate-on-scroll">
            <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-family: 'Marcellus', serif; color: var(--ka-moka-167); margin-bottom: 20px;">Riad KA – L’âme de Marrakech</h1>
            <h2 style="font-size: clamp(1.2rem, 2vw, 1.5rem); color: var(--ka-terracotta-493); margin-bottom: 40px; font-weight: normal;">Bienvenue au Riad KA, votre parenthèse unique à Marrakech</h2>
            
            <div style="max-width: 800px; margin: 0 auto; color: var(--ka-grey-text); font-style: italic; line-height: 1.8; font-size: 1.1rem; text-align: justify;">
                <p style="margin-bottom: 20px;">À quelques pas de l'effervescence du centre-ville, Riad KA vous ouvre ses portes pour une expérience hors du commun. Niché dans un quartier paisible de Marrakech, notre riad mêle élégamment tradition marocaine et créativité contemporaine.</p>
                <p>Chaque recoin du Riad KA raconte une histoire. Entre les fresques murales inspirées du street art, les objets artisanaux soigneusement choisis, et l’accueil chaleureux de notre équipe, tout est pensé pour offrir à nos hôtes une immersion authentique, conviviale et créative.</p>
            </div>
        </div>

        <div class="container" style="margin-top: 80px; margin-bottom: 80px;">
            <div class="split-grid">
                <div class="split-image animate-on-scroll">
                    <img src="PHOTOS_RIAD_KA/Riads/P4162784.jpg" alt="Riad KA Architecture" style="width: 100%; height: 500px; object-fit: cover;">
                </div>
                <div class="split-text animate-on-scroll delay-1">
                    <span class="ka-section-label">Nos Valeurs</span>
                    <h2 style="font-family: 'Marcellus', serif; font-size: 2.2rem; color: var(--ka-moka-167); margin-bottom: 20px;">Notre Philosophie</h2>
                    <p style="margin-bottom: 20px; color: var(--ka-grey-text);">Au Riad KA, nous croyons que l’hospitalité va bien au-delà d’un simple hébergement. C’est un art de vivre, une manière d’accueillir avec générosité, attention et sincérité.</p>
                    
                    <ul style="list-style: none; padding: 0; color: var(--ka-grey-text);">
                        <li style="margin-bottom: 15px;"><strong>✨ Authenticité :</strong> Offrir une immersion vraie dans la culture marocaine, à travers les décors, les saveurs et les traditions.</li>
                        <li style="margin-bottom: 15px;"><strong>✨ Créativité :</strong> Créer un lieu inspirant, vivant et artistique, où le design et le street art se mêlent à l’architecture traditionnelle.</li>
                        <li style="margin-bottom: 15px;"><strong>✨ Bienveillance :</strong> Accueillir chaque voyageur comme un invité d’honneur, avec écoute, respect et générosité.</li>
                    </ul>
                    
                    <p style="margin-top: 20px; font-style: italic; color: var(--ka-terracotta-493);">Nous avons à cœur de faire de chaque séjour une parenthèse humaine et sensorielle, où le confort rime avec émotions, découvertes et souvenirs durables.</p>
                </div>
            </div>
        </div>

        <div class="container text-center animate-on-scroll" style="margin-bottom: 50px;">
            <h2 style="font-family: 'Marcellus', serif; font-size: 2rem; color: var(--ka-moka-167); margin-bottom: 20px;">Et si votre voyage commençait ici ?</h2>
            <p style="max-width: 700px; margin: 0 auto 40px; color: var(--ka-grey-text); line-height: 1.8;">Riad KA est bien plus qu’un lieu de séjour : c’est une expérience à part entière, une immersion dans le cœur vibrant de Marrakech, entre tradition et modernité. Que vous veniez pour explorer la médina, vous ressourcer, goûter aux saveurs locales ou simplement vivre un moment hors du temps, notre équipe est là pour faire de votre passage un souvenir inoubliable.</p>
            <a href="index.html#contact" class="rk-btn" style="background-color: var(--ka-terracotta-493); border: none; padding: 15px 40px;">RÉSERVER VOTRE SÉJOUR</a>
        </div>
    </section>
`;

const updatedHtml = aproposHtml.replace(/<!-- 12\. FOOTER -->/, newContent + '\n<!-- 12. FOOTER -->');
// Wait, a-propos.html already has some dummy content maybe? I didn't add dummy content in step 1, I just copied the header and footer. So I'll insert before FOOTER, but maybe remove the dummy <main> or empty sections. Let's see what's in a-propos.html
// Let's do a safe replace

// Read the file and replace everything between <header> and <footer>
const htmlWithHeaderFooter = aproposHtml.replace(/(<\/header>)[\s\S]*?(<footer class="site-footer">)/i, '$1\n' + newContent + '\n$2');

fs.writeFileSync('a-propos.html', htmlWithHeaderFooter);
console.log('a-propos.html updated successfully.');
