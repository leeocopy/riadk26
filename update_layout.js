const fs = require('fs');

const prestationHtml = fs.readFileSync('prestation.html', 'utf8');

const terrasseImages = [
    "PHOTOS_RIAD_KA/Terrasse/P4162051.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162067.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162071.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162085.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162132.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162138.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162144.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162197.jpg"
];

const services = [
    {
        title: "Organisation d’événements privés",
        desc: "Le Riad KA est l'endroit idéal pour organiser des événements privés sur-mesure (mariage, anniversaire, séminaire). Nous vous offrons un cadre intime, raffiné et authentique, avec une équipe dédiée pour personnaliser chaque aspect de votre événement.",
    },
    {
        title: "Atelier de cuisine traditionnelle",
        desc: "Plongez dans les saveurs du Maroc avec notre atelier de cuisine. Aux côtés de notre chef, apprenez à préparer des plats emblématiques comme le tajine ou le couscous, puis dégustez vos créations sur la terrasse ou dans le patio.",
    },
    {
        title: "Excursions & visites sur mesure",
        desc: "Découvrez Marrakech et ses environs autrement. Que vous souhaitiez explorer les souks animés, admirer les paysages majestueux du désert ou visiter des sites historiques, nous organisons des sorties sur-mesure selon vos envies.",
    },
    {
        title: "Cinéma en plein air & Diffusion d’événements",
        desc: "Profitez d’un moment magique sous les étoiles avec notre expérience de cinéma en plein air, dans le patio du riad. Pour les amateurs de sport, nous diffusons les grands événements dans une ambiance conviviale et chaleureuse.",
    },
    {
        title: "Repas à la demande",
        desc: "Goûtez à la cuisine marocaine sans quitter le riad. Nous proposons des repas sur demande, cuisinés maison à base de produits frais et locaux. Savourez un dîner typique dans un cadre intimiste, à votre rythme.",
    },
    {
        title: "Cours de yoga",
        desc: "Reconnectez-vous à vous-même avec nos séances de yoga, accessibles à tous les niveaux. Dans un espace calme et apaisant, laissez-vous guider par nos instructeurs pour un moment de relaxation profonde.",
    },
    {
        title: "Transferts aéroport privés",
        desc: "Nous vous proposons un service de transport depuis et vers l’aéroport de Marrakech. Ponctuel, confortable et privé, nous vous assurons un transport sécurisé pour démarrer ou clore votre expérience en toute sérénité.",
    },
    {
        title: "Location de voiture",
        desc: "Pour explorer la ville et ses alentours en toute liberté, profitez de notre service de location de voiture. Nous vous aidons à choisir le véhicule adapté à votre séjour pour explorer Marrakech et ses environs.",
    }
];

let newContent = `
<!-- NOS PRESTATIONS -->
    <section style="padding-top: 150px; padding-bottom: 60px;" class="section-activities">
        <div class="container text-center animate-on-scroll">
            <span class="ka-section-label">Prestations & Activités</span>
            <h2 class="text-uppercase" style="margin-bottom: 80px;">Vivez une expérience unique</h2>
        </div>
`;

services.forEach((svc, index) => {
    const isReverse = index % 2 !== 0;
    const gridClass = isReverse ? 'split-grid split-grid--reverse' : 'split-grid';
    const textClass = isReverse ? 'split-text animate-on-scroll' : 'split-text animate-on-scroll delay-1';
    const imgClass = isReverse ? 'split-image animate-on-scroll delay-1' : 'split-image animate-on-scroll';
    const imgUrl = terrasseImages[index];
    
    let sectionHtml = `
        <div class="container" style="margin-bottom: 100px;">
            <div class="${gridClass}">
    `;
    
    if (!isReverse) {
        sectionHtml += `
                <div class="${imgClass}">
                    <img src="${imgUrl}" alt="${svc.title}" style="max-height: 450px; width: 100%; object-fit: cover;">
                </div>
                <div class="${textClass}">
                    <span class="restauration-label">PRESTATION</span>
                    <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 20px;">${svc.title}</h2>
                    <p>${svc.desc}</p>
                </div>
        `;
    } else {
        sectionHtml += `
                <div class="${textClass}">
                    <span class="restauration-label">PRESTATION</span>
                    <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 20px;">${svc.title}</h2>
                    <p>${svc.desc}</p>
                </div>
                <div class="${imgClass}">
                    <img src="${imgUrl}" alt="${svc.title}" style="max-height: 450px; width: 100%; object-fit: cover;">
                </div>
        `;
    }
    
    sectionHtml += `
            </div>
        </div>
    `;
    newContent += sectionHtml;
});

newContent += `</section>`;

// Replace
const updatedHtml = prestationHtml.replace(/<!-- NOS PRESTATIONS -->[\s\S]*?<!-- 12\. FOOTER -->/, newContent + '\n<!-- 12. FOOTER -->');

fs.writeFileSync('prestation.html', updatedHtml);
console.log('prestation.html updated successfully with split grid style.');
