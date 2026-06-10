const fs = require('fs');

let html = fs.readFileSync('chambres.html', 'utf8');

// SVG icons matching the XO style (clean, monochrome, line-art)
const svgIcons = {
    clim: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3"/></svg>',
    wifi: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>',
    shower: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/><path d="M8 8v2M12 8v2M16 8v2M7 12v2M11 12v2M15 12v2M9 16v2M13 16v2"/></svg>',
    nosmoking: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="15" width="16" height="4" rx="1"/><path d="M20 15v4M22 15v4M18 11c0-2 1-3 1-5s-2-3-4-3M22 11c0-2-1-3-2-5M3 21L21 3"/></svg>',
    safe: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v1M12 15v1M8 12h1M15 12h1"/></svg>',
    patio: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    desk: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
};

// Replace each room's amenities block
// Room 1: Berbère - clim, wifi, shower, nosmoking, safe
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*<span title="Coffre-fort">🔒<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                        <span class="amenity-icon" title="Coffre-fort">${svgIcons.safe}</span>
                    $2`
);

// Room 2: Essaouira - clim, wifi, patio, shower, nosmoking
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Vue sur patio">🌿<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Vue sur patio">${svgIcons.patio}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                    $2`
);

// Room 3: Fès - clim, wifi, desk, shower, safe, nosmoking
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Bureau">🖥️<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Coffre-fort">🔒<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Bureau">${svgIcons.desk}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Coffre-fort">${svgIcons.safe}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                    $2`
);

// Room 4: Marrakech - clim, wifi, patio(jardin), shower, safe, nosmoking  
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Vue sur jardin">🌿<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Coffre-fort">🔒<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Vue sur jardin">${svgIcons.patio}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Coffre-fort">${svgIcons.safe}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                    $2`
);

// Rooms 5,6 (Meknès, Ouarzazate): clim, wifi, shower, safe, nosmoking (same pattern, 2 occurrences)
const pattern5 = /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Coffre-fort">🔒<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*(<\/div>)/g;
html = html.replace(pattern5, `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Coffre-fort">${svgIcons.safe}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                    $2`);

// Room 7: Ourika - clim, wifi, shower, nosmoking (no safe)
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="Salle de bain privée">🚿<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="Salle de bain privée">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                    $2`
);

// Room 8: Volubilis - clim, wifi, shower, safe, nosmoking, bell
html = html.replace(
    /(<div class="room-card-amenities">)\s*<span title="Climatisation">❄️<\/span>\s*<span title="Wifi">📶<\/span>\s*<span title="2 Salles de bain">🚿<\/span>\s*<span title="Coffre-fort">🔒<\/span>\s*<span title="Non-fumeur">🚭<\/span>\s*<span title="Service en chambre">🛎️<\/span>\s*(<\/div>)/,
    `$1
                        <span class="amenity-icon" title="Climatisation">${svgIcons.clim}</span>
                        <span class="amenity-icon" title="Wifi">${svgIcons.wifi}</span>
                        <span class="amenity-icon" title="2 Salles de bain">${svgIcons.shower}</span>
                        <span class="amenity-icon" title="Coffre-fort">${svgIcons.safe}</span>
                        <span class="amenity-icon" title="Non-fumeur">${svgIcons.nosmoking}</span>
                        <span class="amenity-icon" title="Service en chambre">${svgIcons.bell}</span>
                    $2`
);

fs.writeFileSync('chambres.html', html);
console.log('Icons and alignment updated successfully.');
