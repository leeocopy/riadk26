const fs = require('fs');

let html = fs.readFileSync('chambres.html', 'utf8');

// Wrap amenities + button in a .room-card-bottom div for each room
// Pattern: </div>\n  <a href="#" class="room-card-btn">VOIR</a>
html = html.replace(
    /(<div class="room-card-amenities">[\s\S]*?<\/div>)\s*(<a href="#" class="room-card-btn">VOIR<\/a>)/g,
    '<div class="room-card-bottom">\n                    $1\n                    $2\n                    </div>'
);

fs.writeFileSync('chambres.html', html);
console.log('Amenities and button wrapped in same-line container.');
