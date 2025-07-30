import { kv } from '@vercel/kv';
import crypto from 'crypto';

// World languages configuration
const WORLD_LANGUAGES = {
  // European Languages
  'en': { name: 'English', dir: 'ltr', family: 'indo-european' },
  'es': { name: 'Español', dir: 'ltr', family: 'indo-european' },
  'fr': { name: 'Français', dir: 'ltr', family: 'indo-european' },
  'de': { name: 'Deutsch', dir: 'ltr', family: 'indo-european' },
  'it': { name: 'Italiano', dir: 'ltr', family: 'indo-european' },
  'pt': { name: 'Português', dir: 'ltr', family: 'indo-european' },
  'ru': { name: 'Русский', dir: 'ltr', family: 'indo-european' },
  'pl': { name: 'Polski', dir: 'ltr', family: 'indo-european' },
  'nl': { name: 'Nederlands', dir: 'ltr', family: 'indo-european' },
  'sv': { name: 'Svenska', dir: 'ltr', family: 'indo-european' },
  'no': { name: 'Norsk', dir: 'ltr', family: 'indo-european' },
  'da': { name: 'Dansk', dir: 'ltr', family: 'indo-european' },
  'fi': { name: 'Suomi', dir: 'ltr', family: 'uralic' },
  'el': { name: 'Ελληνικά', dir: 'ltr', family: 'indo-european' },

  // Indian Subcontinent Languages
  'hi': { name: 'हिन्दी', dir: 'ltr', family: 'indo-european' },
  'ta': { name: 'தமிழ்', dir: 'ltr', family: 'dravidian' },
  'te': { name: 'తెలుగు', dir: 'ltr', family: 'dravidian' },
  'mr': { name: 'मराठी', dir: 'ltr', family: 'indo-european' },
  'bn': { name: 'বাংলা', dir: 'ltr', family: 'indo-european' },
  'gu': { name: 'ગુજરાતી', dir: 'ltr', family: 'indo-european' },
  'kn': { name: 'ಕನ್ನಡ', dir: 'ltr', family: 'dravidian' },
  'ml': { name: 'മലയാളം', dir: 'ltr', family: 'dravidian' },
  'pa': { name: 'ਪੰਜਾਬੀ', dir: 'ltr', family: 'indo-european' },
  'or': { name: 'ଓଡ଼ିଆ', dir: 'ltr', family: 'indo-european' },
  'as': { name: 'অসমীয়া', dir: 'ltr', family: 'indo-european' },
  'ur': { name: 'اردو', dir: 'rtl', family: 'indo-european' },
  'ne': { name: 'नेपाली', dir: 'ltr', family: 'indo-european' },
  'si': { name: 'සිංහල', dir: 'ltr', family: 'indo-european' },

  // East Asian Languages
  'zh': { name: '中文', dir: 'ltr', family: 'sino-tibetan' },
  'ja': { name: '日本語', dir: 'ltr', family: 'japonic' },
  'ko': { name: '한국어', dir: 'ltr', family: 'koreanic' },
  'th': { name: 'ไทย', dir: 'ltr', family: 'tai-kadai' },
  'vi': { name: 'Tiếng Việt', dir: 'ltr', family: 'austroasiatic' },
  'my': { name: 'မြန်မာ', dir: 'ltr', family: 'sino-tibetan' },
  'km': { name: 'ខ្មែរ', dir: 'ltr', family: 'austroasiatic' },
  'lo': { name: 'ລາວ', dir: 'ltr', family: 'tai-kadai' },

  // Middle Eastern Languages
  'ar': { name: 'العربية', dir: 'rtl', family: 'afroasiatic' },
  'fa': { name: 'فارسی', dir: 'rtl', family: 'indo-european' },
  'he': { name: 'עברית', dir: 'rtl', family: 'afroasiatic' },
  'tr': { name: 'Türkçe', dir: 'ltr', family: 'turkic' },
  'az': { name: 'Azərbaycan', dir: 'ltr', family: 'turkic' },
  'kk': { name: 'Қазақша', dir: 'ltr', family: 'turkic' },
  'ky': { name: 'Кыргызча', dir: 'ltr', family: 'turkic' },
  'uz': { name: 'O\'zbek', dir: 'ltr', family: 'turkic' },

  // African Languages
  'sw': { name: 'Kiswahili', dir: 'ltr', family: 'niger-congo' },
  'am': { name: 'አማርኛ', dir: 'ltr', family: 'afroasiatic' },
  'ha': { name: 'Hausa', dir: 'ltr', family: 'afroasiatic' },
  'yo': { name: 'Yorùbá', dir: 'ltr', family: 'niger-congo' },
  'ig': { name: 'Igbo', dir: 'ltr', family: 'niger-congo' },
  'zu': { name: 'isiZulu', dir: 'ltr', family: 'niger-congo' },
  'af': { name: 'Afrikaans', dir: 'ltr', family: 'indo-european' },

  // Other Languages
  'id': { name: 'Bahasa Indonesia', dir: 'ltr', family: 'austronesian' },
  'ms': { name: 'Bahasa Melayu', dir: 'ltr', family: 'austronesian' },
  'tl': { name: 'Filipino', dir: 'ltr', family: 'austronesian' },
  'mt': { name: 'Malti', dir: 'ltr', family: 'afroasiatic' },
  'cy': { name: 'Cymraeg', dir: 'ltr', family: 'indo-european' },
  'ga': { name: 'Gaeilge', dir: 'ltr', family: 'indo-european' },
  'eu': { name: 'Euskera', dir: 'ltr', family: 'language-isolate' },
  'ca': { name: 'Català', dir: 'ltr', family: 'indo-european' }
};

// Generate random URL with customization
function generateRandomUrl(length = 6, style = 'mixed') {
  const charSets = {
    mixed: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lowercase: 'abcdefghijklmnopqrstuvwxyz0123456789',
    memorable: 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789',
    pronounceable: generatePronounceableUrl(length)
  };
ECHO is off.
  if (style === 'pronounceable') {
    return charSets.pronounceable;
  }
ECHO is off.
  const chars = charSets[style] || charSets.mixed;
  let result = '';
ECHO is off.
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
ECHO is off.
  return result;
}

function generatePronounceableUrl(length) {
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const vowels = 'aeiou';
  let result = '';
ECHO is off.
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      result += consonants.charAt(Math.floor(Math.random() * consonants.length));
    } else {
      result += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }
  }
ECHO is off.
  return result;
}

async function isUrlUnique(url) {
  try {
    const existing = await kv.get(`paste:${url}`);
    return !existing;
  } catch (error) {
    return true;
  }
}

async function generateUniqueUrl(config) {
  const maxAttempts = 10;
  let length = config.length || 6;
ECHO is off.
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const url = generateRandomUrl(length, config.style);
    const isUnique = await isUrlUnique(url);
ECHO is off.
    if (isUnique) {
      return url;
    }
ECHO is off.
    if (attempt > 5) {
      length++;
    }
  }
ECHO is off.
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 3);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
ECHO is off.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
ECHO is off.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
ECHO is off.
  try {
    const { content, config = {} } = req.body;
ECHO is off.
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required' });
    }
ECHO is off.
    if (content.length > 500000) {
      return res.status(400).json({ error: 'Content too large' });
    }
ECHO is off.
    // Validate language
    const language = config.language || 'en';
    if (!WORLD_LANGUAGES[language]) {
      return res.status(400).json({ error: 'Unsupported language' });
    }
ECHO is off.
    const urlConfig = {
      length: Math.min(Math.max(config.length || 6, 4), 12),
      style: config.style || 'mixed',
      prefix: config.prefix || ''
    };
ECHO is off.
    const shortUrl = await generateUniqueUrl(urlConfig);
    const finalUrl = urlConfig.prefix + shortUrl;
ECHO is off.
    const expirationHours = config.expiration || 24 * 30;
    const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1000);
ECHO is off.
    const paste = {
      content,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      views: 0,
      language: language,
      languageInfo: WORLD_LANGUAGES[language],
      password: config.password ? crypto.createHash('sha256').update(config.password).digest('hex') : null
    };
ECHO is off.
    await kv.set(`paste:${finalUrl}`, JSON.stringify(paste), {
      ex: Math.floor((expiresAt - new Date()) / 1000)
    });
ECHO is off.
    return res.status(201).json({
      success: true,
      url: finalUrl,
      fullUrl: `${req.headers.host}/${finalUrl}`,
      expiresAt: expiresAt.toISOString(),
      language: WORLD_LANGUAGES[language]
    });
ECHO is off.
  } catch (error) {
    console.error('Error creating paste:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
