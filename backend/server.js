const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Admin page
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin - Volontaires français</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
        h1 { color: #333; }
        .api-links { margin-top: 30px; }
        a { display: block; margin: 10px 0; color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>🐰 Volontaires français - Admin Backend</h1>
      <p>Bienvenue sur le backend Express API</p>
      <div class="api-links">
        <h2>Routes disponibles :</h2>
        <a href="/health">✓ Health Check</a>
        <a href="/items/posts">📰 Posts</a>
        <a href="/items/team_members">👥 Team Members</a>
        <a href="/items/faq">❓ FAQ</a>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes - Posts
app.get('/items/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts LIMIT 20');
    res.json({ data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Team members
app.get('/items/team_members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_members LIMIT 20');
    res.json({ data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// FAQ
app.get('/items/faq', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faq LIMIT 20');
    res.json({ data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8055;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API listening on port ${PORT}`);
});
