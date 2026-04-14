const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc';
const SEARCH_API = 'https://api.myscheme.gov.in/search/v6/schemes';
const OUTPUT_PATHS = [
    path.join(__dirname, '..', 'data', 'schemes.json')
];
const PAGE_SIZE = 100;

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWithRetry(url, attempts = 3) {
    let lastError = null;
    for (let i = 1; i <= attempts; i++) {
        try {
            return await axios.get(url, {
                headers: {
                    'x-api-key': API_KEY,
                    'Origin': 'https://www.myscheme.gov.in',
                    'Referer': 'https://www.myscheme.gov.in/search',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                },
                timeout: 30000
            });
        } catch (error) {
            lastError = error;
            const status = error.response?.status;
            console.error(`Request failed (${i}/${attempts}) for ${url}${status ? ` [${status}]` : ''}`);
            if (i < attempts) {
                await delay(1000 * i);
            }
        }
    }
    throw lastError;
}

function toSchemeRecord(item) {
    const fields = item?.fields || {};
    const category = Array.isArray(fields.schemeCategory)
        ? fields.schemeCategory.join(', ')
        : (fields.schemeCategory || 'General');
    const level = fields.level || 'Central';
    const summary = fields.briefDescription || '';
    return {
        id: fields.slug || item.id || '',
        title: fields.schemeName || fields.schemeShortTitle || fields.slug || 'Unknown Scheme',
        slug: fields.slug || '',
        summary,
        benefits: summary || 'Check the official myScheme page for detailed benefits.',
        eligibility: 'Refer to the official myScheme page for complete eligibility criteria.',
        exclusion: '',
        applicationProcess: 'Visit the official myScheme portal and open this scheme page to view the latest application process.',
        documentsRequired: 'Refer to the official myScheme page for required documents.',
        category,
        ministry: fields.nodalMinistryName || 'Not specified',
        state: level
    };
}

async function fetchSchemePage(from, size) {
    const q = encodeURIComponent('[]');
    const url = `${SEARCH_API}?lang=en&q=${q}&keyword=&sort=&from=${from}&size=${size}`;
    const { data } = await getWithRetry(url, 3);

    if (data?.statusCode !== 200 || !data?.data) {
        const err = data?.data?.error || data?.errorDescription || 'Unknown API response';
        throw new Error(`Search API failed: ${err}`);
    }

    const payload = data.data;
    const items = Array.isArray(payload?.hits?.items) ? payload.hits.items : [];
    const total = Number(payload?.summary?.total || 0);
    return { items, total };
}

async function fetchAllSchemes() {
    const all = [];
    let from = 0;
    let total = 0;

    while (true) {
        const { items, total: reportedTotal } = await fetchSchemePage(from, PAGE_SIZE);
        if (!total) {
            total = reportedTotal;
            console.log(`Total schemes reported by API: ${total}`);
        }

        if (!items.length) {
            break;
        }

        const mapped = items
            .map(toSchemeRecord)
            .filter((s) => Boolean(s.slug));

        all.push(...mapped);
        from += PAGE_SIZE;
        console.log(`Fetched ${Math.min(from, total)} / ${total}`);
        await delay(150);

        if (from >= total) {
            break;
        }
    }

    const deduped = [];
    const seen = new Set();
    for (const scheme of all) {
        if (seen.has(scheme.slug)) continue;
        seen.add(scheme.slug);
        deduped.push(scheme);
    }
    return deduped;
}

function writeOutputs(schemes) {
    for (const outputPath of OUTPUT_PATHS) {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(outputPath, JSON.stringify(schemes, null, 2), 'utf8');
        console.log(`Wrote ${schemes.length} schemes to ${outputPath}`);
    }
}

async function syncSchemeData() {
    try {
        const schemes = await fetchAllSchemes();
        writeOutputs(schemes);
        console.log(`Successfully synced ${schemes.length} schemes.`);
    } catch (error) {
        console.error('Data sync failed:', error.message);
        process.exitCode = 1;
    }
}

syncSchemeData();
