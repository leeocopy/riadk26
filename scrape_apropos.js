const https = require('https');
const fs = require('fs');

https.get('https://riad-ka.com/a-propos/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const bodyMatch = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        let body = bodyMatch ? bodyMatch[1] : data;
        body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        
        const texts = [];
        const regex = /<(h[1-6]|p|div|span|li)[^>]*>([\s\S]*?)<\/\1>/gi;
        let match;
        while ((match = regex.exec(body)) !== null) {
            let innerText = match[2].replace(/<[^>]+>/g, '').trim();
            innerText = innerText.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
            if (innerText.length > 5 && !innerText.includes('window.') && !innerText.includes('{')) {
                texts.push(innerText);
            }
        }
        fs.writeFileSync('extracted_apropos.txt', texts.join('\n'));
        console.log('Done extracting a-propos.');
    });
});
