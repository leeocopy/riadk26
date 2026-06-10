const fs = require('fs');

const localImages = [
    "PHOTOS_RIAD_KA/Terrasse/P4162051.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162067.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162071.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162085.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162132.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162138.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162144.jpg",
    "PHOTOS_RIAD_KA/Terrasse/P4162197.jpg",
    "PHOTOS_RIAD_KA/Pdej/P4162694.jpg"
];

let blogHtml = fs.readFileSync('blog.html', 'utf8');

const regex = /<img src="https:\/\/riad-ka\.com\/wp-content\/uploads\/[^"]+"/gi;

let index = 0;
blogHtml = blogHtml.replace(regex, (match) => {
    const localImg = localImages[index % localImages.length];
    index++;
    return `<img src="${localImg}"`;
});

fs.writeFileSync('blog.html', blogHtml);
console.log('Images replaced successfully.');
