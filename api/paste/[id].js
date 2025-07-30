import { kv } from '@vercel/kv';
import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
ECHO is off.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
ECHO is off.
  const { id } = req.query;
ECHO is off.
  if (!id) {
    return res.status(400).json({ error: 'Paste ID is required' });
  }
ECHO is off.
  try {
    const pasteData = await kv.get(`paste:${id}`);
ECHO is off.
    if (!pasteData) {
      return res.status(404).json({ error: 'Paste not found or expired' });
    }
ECHO is off.
    const paste = JSON.parse(pasteData);
ECHO is off.
    if (new Date() > new Date(paste.expiresAt)) {
      await kv.del(`paste:${id}`);
      return res.status(404).json({ error: 'Paste has expired' });
    }
ECHO is off.
    if (paste.password && req.method === 'GET') {
      return res.status(200).json({
        passwordRequired: true,
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
        language: paste.language,
        languageInfo: paste.languageInfo
      });
    }
ECHO is off.
    if (paste.password && req.method === 'POST') {
      const { password } = req.body;
      if (!password) {
        return res.status(401).json({ error: 'Password required' });
      }
ECHO is off.
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (hashedPassword !== paste.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
    }
ECHO is off.
    paste.views++;
    await kv.set(`paste:${id}`, JSON.stringify(paste), {
      ex: Math.floor((new Date(paste.expiresAt) - new Date()) / 1000)
    });
ECHO is off.
    return res.status(200).json({
      content: paste.content,
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
      views: paste.views,
      language: paste.language,
      languageInfo: paste.languageInfo
    });
ECHO is off.
  } catch (error) {
    console.error('Error retrieving paste:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
