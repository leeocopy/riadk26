const https = require('https');
const fs = require('fs');

const urls = ['https://riad-ka.com/spa/', 'https://riad-ka.com/bien-etre/'];
urls.forEach(url => {
    https.get(url, (res) => {
        if (res.statusCode === 200) {
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
                fs.writeFileSync('extracted_spa.txt', url + '\n' + texts.join('\n'));
                console.log('Found SPA at: ' + url);
            });
        }
    });
});
