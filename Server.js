const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy route (disguised as /canvas)
app.get('/canvas', async (req, res) => {
  const encodedUrl = req.query.q;
  if (!encodedUrl) return res.status(400).send('Missing parameter');

  try {
    const targetUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');

    res.set('content-type', contentType || 'text/html');
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send('Failed to load site.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nova Canvas running at http://localhost:${PORT}`);
});
