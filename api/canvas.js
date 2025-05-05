export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).send('Missing URL');

  try {
    const decodedUrl = Buffer.from(q, 'base64').toString('utf-8');
    const response = await fetch(decodedUrl);
    const contentType = response.headers.get('content-type');

    res.setHeader('Content-Type', contentType || 'text/html');
    const body = await response.text();
    res.status(200).send(body);
  } catch (error) {
    console.error('Error fetching URL:', error.message);
    res.status(500).send('Error fetching the requested URL');
  }
}

