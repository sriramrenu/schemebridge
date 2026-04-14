const axios = require('axios');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';
const SLUGS_TO_TRY = [
    'pmsby',      // PM Suraksha Bima Yojana
    'pm-kisan',   // PM Kisan
    'post-dis',   // Post Matric Scholarship
];

const DETAIL_ENDPOINTS = [
    (slug) => `https://api.myscheme.gov.in/scheme/v2/schemes/${slug}?lang=en`,
    (slug) => `https://api.myscheme.gov.in/scheme/v1/schemes/${slug}?lang=en`,
    (slug) => `https://api.myscheme.gov.in/search/v6/schemes/${slug}?lang=en`,
];

async function probeDetailAPI(slug) {
    for (const makeUrl of DETAIL_ENDPOINTS) {
        const url = makeUrl(slug);
        try {
            const res = await axios.get(url, {
                headers: {
                    'x-api-key': API_KEY,
                    'Origin': 'https://www.myscheme.gov.in',
                    'Referer': 'https://www.myscheme.gov.in',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                },
                timeout: 10000
            });
            const data = res.data;
            console.log(`\n✅ [${url}]`);
            console.log('Status:', data?.statusCode, '| Top keys:', Object.keys(data?.data || data || {}).join(', '));
            const inner = data?.data?.fields || data?.data || {};
            console.log('Inner keys:', Object.keys(inner).slice(0, 30).join(', '));
            return;
        } catch (err) {
            const status = err.response?.status || 'network';
            console.log(`❌ [${url}] => ${status}: ${err.message.slice(0,80)}`);
        }
    }
}

async function main() {
    for (const slug of SLUGS_TO_TRY) {
        await probeDetailAPI(slug);
        await new Promise(r => setTimeout(r, 800));
    }
}

main();
