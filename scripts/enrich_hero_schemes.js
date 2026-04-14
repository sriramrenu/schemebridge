const fs = require('fs');
const path = require('path');

const SCHEME_DATA_PATH = path.join(__dirname, '..', 'data', 'schemes.json');
const APP_DATA_PATH = path.join(__dirname, '..', 'app', 'src', 'app', 'data', 'schemes.json');

const enrichedData = {
  "post-dis": {
    "benefits": "1. Maintenance Allowance: Up to ₹1600/month for hostellers and ₹750/month for day scholars.\n2. Disability Allowance: Up to ₹4000/annum.\n3. Reimbursement of compulsory non-refundable fees.\n4. Book Grant: ₹1500 per annum.",
    "eligibility": "1. Student must have more than 40% disability (standard certificate required).\n2. Family income must not exceed ₹2.5 Lakh per annum.\n3. Must be pursuing studies (Class 11 to PhD) from recognized institutions.",
    "exclusion": "Students pursuing distance learning or students already receiving another central/state scholarship.",
    "applicationProcess": "Apply online through the National Scholarship Portal (NSP). Log in, fill the application form, upload documents, and submit for verification by the Institute.",
    "documentsRequired": "1. Disability Certificate.\n2. Income Certificate.\n3. Previous year marksheet.\n4. Fee receipt of current session.\n5. Bank Passbook copy."
  },
  "pmsby": {
    "benefits": "1. Accidental Death: ₹2 Lakh.\n2. Total and Irrecoverable loss of both eyes or loss of use of both hands or feet: ₹2 Lakh.\n3. Total and Irrecoverable loss of sight of one eye or loss of use of one hand or foot: ₹1 Lakh.",
    "eligibility": "1. Individuals aged between 18 to 70 years.\n2. Must have a savings bank account with 'Auto-debit' consent.\n3. Premium is only ₹20 per annum (revised from ₹12).",
    "exclusion": "Suicide or self-inflicted injury. Death due to natural causes (not accidental).",
    "applicationProcess": "Contact your bank where you hold a savings account. Fill the simple PMSBY form and provide auto-debit consent. Can also be done via Net Banking/Mobile Banking.",
    "documentsRequired": "1. Aadhaar Card (primary KYC).\n2. Bank Account Details.\n3. Nomination Details."
  },
  "sui": {
    "benefits": "1. Composite loan between ₹10 lakh and up to ₹100 lakh.\n2. Repayment period of 7 years with a maximum moratorium period of 18 months.\n3. Credit Guarantee Scheme for loans.",
    "eligibility": "1. SC/ST and/or Women entrepreneurs, above 18 years of age.\n2. Loans available for Greenfield projects only.\n3. Borrower should not be in default to any bank/financial institution.",
    "exclusion": "Expansion of existing business (Greenfield only). Existing default history in CIBIL.",
    "applicationProcess": "Apply through Stand-Up India Portal or visit the nearest bank branch (Lead Bank Managers). Fill the application and submit the business project report.",
    "documentsRequired": "1. Identity Proof (Aadhaar/PAN).\n2. Caste Certificate (for SC/ST).\n3. Business Address Proof.\n4. Project Report.\n5. Last 3 years Balance Sheets (if applicable)."
  },
  "pm-kisan": {
    "benefits": "1. Direct benefit transfer of ₹6000 per year in three equal installments of ₹2000.\n2. Funds are transferred directly to the bank accounts of the beneficiaries.",
    "eligibility": "All landholding farmers' families (subject to certain exclusion criteria) who have cultivable landholding in their names.",
    "exclusion": "1. Institutional landholders.\n2. Income Tax payers.\n3. Professionals like Doctors, Engineers, Lawyers.\n4. Retired pensioners with monthly pension above ₹10,000.",
    "applicationProcess": "Registration can be done at Common Service Centres (CSCs) or via the PM-Kisan portal's 'Farmers Corner'. Verification is done by State/UT governments.",
    "documentsRequired": "1. Aadhaar Card (mandatory).\n2. Land Ownership Papers (Khatauni).\n3. Bank Account Details.\n4. Mobile Number."
  }
};

function enrich() {
  if (!fs.existsSync(SCHEME_DATA_PATH)) {
    console.error('schemes.json not found at', SCHEME_DATA_PATH);
    return;
  }

  const data = JSON.parse(fs.readFileSync(SCHEME_DATA_PATH, 'utf8'));
  let count = 0;

  const enrichedSlugs = Object.keys(enrichedData);
  
  const updatedData = data.map(scheme => {
    if (enrichedData[scheme.slug]) {
      count++;
      return { ...scheme, ...enrichedData[scheme.slug] };
    }
    return scheme;
  });

  // If some hero schemes are missing from the list, add them (using a fallback structure)
  // But we'll assume they are there for now based on previous grep/check.

  fs.writeFileSync(SCHEME_DATA_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`Enriched ${count} hero schemes in ${SCHEME_DATA_PATH}`);

  // Also sync to app directory
  const appDir = path.dirname(APP_DATA_PATH);
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }
  fs.writeFileSync(APP_DATA_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`Synced to ${APP_DATA_PATH}`);
}

enrich();
