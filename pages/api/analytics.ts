import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Accept POST
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  // Parse and do nothing (simulate analytics sink)
  try {
    // Just parse body to simulate storage
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    // (In real: write to DB or external analytics here)
    await new Promise((r) => setTimeout(r, 90));
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: 'Malformed analytics event' });
  }
}
