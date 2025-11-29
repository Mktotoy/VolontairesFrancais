const fs = require('fs');
const path = require('path');

// Read Replit secrets from process.env
const dbConfig = {
  DB_HOST: process.env.PGHOST,
  DB_PORT: process.env.PGPORT,
  DB_DATABASE: process.env.PGDATABASE,
  DB_USER: process.env.PGUSER,
  DB_PASSWORD: process.env.PGPASSWORD,
};

// Check if all DB vars are available
const missing = Object.entries(dbConfig)
  .filter(([, val]) => !val)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

// Export to process.env so Directus can read them
Object.assign(process.env, dbConfig);

console.log(`✓ Database config loaded from Replit secrets`);
console.log(`  Host: ${dbConfig.DB_HOST}`);
console.log(`  Database: ${dbConfig.DB_DATABASE}`);
