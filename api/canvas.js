const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const encodedUrl = req.query.q;
  if (!encodedUrl) return res.status(400).send('Missing parameter');

  try {
    const targetUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');

    res.setHeader('Content-Type', contentType || 'text/html');
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send('Failed to load site.');
  }
};
