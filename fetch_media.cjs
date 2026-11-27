const https = require('https');

https.get('https://drpraveenchandra.com/media/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const imgMatches = [...data.matchAll(/src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/gi)].map(m => m[1]);
    console.log('All image urls (' + imgMatches.length + '):');
    imgMatches.forEach(url => {
      if (url.includes('upload') || url.includes('media') || url.includes('news') || url.includes('press')) {
        console.log(' - ' + url);
      }
    });

    const textBlocks = [...data.matchAll(/<(?:h2|h3|h4|p)[^>]*>(.*?)<\/(?:h2|h3|h4|p)>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 5);
    console.log('\nText samples near end:');
    console.log(textBlocks.slice(-30).join('\n'));
  });
}).on('error', (err) => console.log('Error:', err.message));
