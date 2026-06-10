const https = require('https');
const fs = require('fs');

https.get('https://riad-ka.com/blog/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // Look for article tags or ast-article-post
        const articles = [];
        const regex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
        let match;
        while ((match = regex.exec(data)) !== null) {
            let articleHtml = match[1];
            
            // Extract title
            let titleMatch = articleHtml.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
            let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
            
            // Extract excerpt / p tags
            let excerptMatch = articleHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
            let excerpt = excerptMatch ? excerptMatch[1].replace(/<[^>]+>/g, '').trim() : '';
            
            // Extract image
            let imgMatch = articleHtml.match(/<img[^>]+src="([^">]+)"/i);
            let img = imgMatch ? imgMatch[1] : '';
            
            if (title) {
                articles.push({ title, excerpt, img });
            }
        }
        
        fs.writeFileSync('extracted_blog.json', JSON.stringify(articles, null, 2));
        console.log('Found ' + articles.length + ' articles.');
    });
});
