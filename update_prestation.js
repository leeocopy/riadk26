const fs = require('fs');

const prestationHtml = fs.readFileSync('prestation.html', 'utf8');

const newContent = `
<!-- NOS PRESTATIONS -->
    <section style="padding-top: 150px; padding-bottom: 120px;" id="prestations" class="section-activities">
        <div class="container">
            <div class="section-heading text-center animate-on-scroll">
                <span class="ka-section-label">Prestations & Activités</span>
                <h2 class="text-uppercase" style="margin-bottom: 20px;">Vivez une expérience unique</h2>
            </div>
            <div class="activities-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px 50px; text-align: left; max-width: 1200px; margin: 0 auto;">
                
                <div class="activity-item animate-on-scroll delay-1">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Organisation d’événements privés</h3>
                    <p>Le Riad KA est l'endroit idéal pour organiser des événements privés sur-mesure (mariage, anniversaire, séminaire). Nous vous offrons un cadre intime, raffiné et authentique, avec une équipe dédiée pour personnaliser chaque aspect de votre événement.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-2">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Atelier de cuisine traditionnelle</h3>
                    <p>Plongez dans les saveurs du Maroc avec notre atelier de cuisine. Aux côtés de notre chef, apprenez à préparer des plats emblématiques comme le tajine ou le couscous, puis dégustez vos créations sur la terrasse ou dans le patio.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-3">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Excursions & visites sur mesure</h3>
                    <p>Découvrez Marrakech et ses environs autrement. Que vous souhaitiez explorer les souks animés, admirer les paysages majestueux du désert ou visiter des sites historiques, nous organisons des sorties sur-mesure selon vos envies.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-1">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Cinéma en plein air & Diffusion d’événements</h3>
                    <p>Profitez d’un moment magique sous les étoiles avec notre expérience de cinéma en plein air, dans le patio du riad. Pour les amateurs de sport, nous diffusons les grands événements dans une ambiance conviviale et chaleureuse.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-2">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Repas à la demande</h3>
                    <p>Goûtez à la cuisine marocaine sans quitter le riad. Nous proposons des repas sur demande, cuisinés maison à base de produits frais et locaux. Savourez un dîner typique dans un cadre intimiste, à votre rythme.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-3">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Cours de yoga</h3>
                    <p>Reconnectez-vous à vous-même avec nos séances de yoga, accessibles à tous les niveaux. Dans un espace calme et apaisant, laissez-vous guider par nos instructeurs pour un moment de relaxation profonde.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-1">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Transferts aéroport privés</h3>
                    <p>Nous vous proposons un service de transport depuis et vers l’aéroport de Marrakech. Ponctuel, confortable et privé, nous vous assurons un transport sécurisé pour démarrer ou clore votre expérience en toute sérénité.</p>
                </div>

                <div class="activity-item animate-on-scroll delay-2">
                    <h3 style="color: var(--ka-moka-167); margin-bottom: 15px; font-size: 1.4rem;">Location de voiture</h3>
                    <p>Pour explorer la ville et ses alentours en toute liberté, profitez de notre service de location de voiture. Nous vous aidons à choisir le véhicule adapté à votre séjour pour explorer Marrakech et ses environs.</p>
                </div>

            </div>
        </div>
    </section>
`;

const updatedHtml = prestationHtml.replace(/<!-- 5\. NOS SERVICES -->[\s\S]*?<!-- 12\. FOOTER -->/, newContent + '\n<!-- 12. FOOTER -->');

fs.writeFileSync('prestation.html', updatedHtml);
console.log('prestation.html updated successfully.');
