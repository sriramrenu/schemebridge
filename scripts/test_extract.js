const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('category_sample.html', 'utf8');
const $ = cheerio.load(html);

const links = [];
$('a[href^="/schemes/"]').each((i, el) => {
    links.push($(el).attr('href'));
});

console.log(JSON.stringify(links, null, 2));
