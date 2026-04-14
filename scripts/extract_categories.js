const axios = require('axios');
const cheerio = require('cheerio');

async function extractCategories() {
    try {
        const { data } = await axios.get('https://www.myscheme.gov.in/');
        const $ = cheerio.load(data);
        const categories = [];

        $('a[href^="/category/"]').each((i, el) => {
            const name = $(el).text().trim();
            const href = $(el).attr('href');
            if (name && href) {
                categories.push({ name, url: `https://www.myscheme.gov.in${href}` });
            }
        });

        console.log(JSON.stringify(categories, null, 2));
    } catch (error) {
        console.error('Error extracting categories:', error.message);
    }
}

extractCategories();
