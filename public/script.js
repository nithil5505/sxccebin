// Multilingual interface translations
const translations = {
  en: {
    'characters': 'characters',
    'content-language': 'Content Language:',
    'url-length': 'URL Length:',
    'url-style': 'URL Style:',
    'expires-in': 'Expires in:',
    'password': 'Password (optional):',
    'url-prefix': 'URL Prefix (optional):',
    'create-paste': '🚀 Create Paste',
    'creating': 'Creating...',
    'paste-created': '✅ Paste Created Successfully!',
    'language': 'Language:',
    'copy': '📋 Copy',
    'expires': 'Expires:',
    'create-another': '✨ Create Another Paste'
  },
  hi: {
    'characters': 'अक्षर',
    'content-language': 'सामग्री भाषा:',
    'url-length': 'URL लंबाई:',
    'url-style': 'URL शैली:',
    'expires-in': 'समाप्ति:',
    'password': 'पासवर्ड (वैकल्पिक):',
    'url-prefix': 'URL प्रीफिक्स (वैकल्पिक):',
    'create-paste': '🚀 पेस्ट बनाएं',
    'creating': 'बनाया जा रहा है...',
    'paste-created': '✅ पेस्ट सफलतापूर्वक बनाया गया!',
    'language': 'भाषा:',
    'copy': '📋 कॉपी करें',
    'expires': 'समाप्ति:',
    'create-another': '✨ दूसरा पेस्ट बनाएं'
  },
  ta: {
    'characters': 'எழுத்துகள்',
    'content-language': 'உள்ளடக்க மொழி:',
    'url-length': 'URL நீளம்:',
    'url-style': 'URL பாணி:',
    'expires-in': 'காலாவधி:',
    'password': 'கடவுச்சொல் (விருப்பம்):',
    'url-prefix': 'URL முன்னொட்டு (விருப்பம்):',
    'create-paste': '🚀 பேஸ்ட் உருவாக்கு',
    'creating': 'உருவாக்கப்படுகிறது...',
    'paste-created': '✅ பேஸ்ட் வெற்றிகரமாக உருவாக்கப்பட்டது!',
    'language': 'மொழி:',
    'copy': '📋 நகலெடு',
    'expires': 'காலாவधி:',
    'create-another': '✨ மற்றொரு பேஸ்ட் உருவாக்கு'
  },
  mr: {
    'characters': 'अक्षरे',
    'content-language': 'सामग्री भाषा:',
    'url-length': 'URL लांबी:',
    'url-style': 'URL शैली:',
    'expires-in': 'कालबाह्यता:',
    'password': 'पासवर्ड (पर्यायी):',
    'url-prefix': 'URL उपसर्ग (पर्यायी):',
    'create-paste': '🚀 पेस्ट तयार करा',
    'creating': 'तयार केले जात आहे...',
    'paste-created': '✅ पेस्ट यशस्वीरित्या तयार केले!',
    'language': 'भाषा:',
    'copy': '📋 कॉपी करा',
    'expires': 'कालबाह्यता:',
    'create-another': '✨ दुसरे पेस्ट तयार करा'
  },
  ar: {
    'characters': 'أحرف',
    'content-language': 'لغة المحتوى:',
    'url-length': 'طول الرابط:',
    'url-style': 'نمط الرابط:',
    'expires-in': 'تنتهي في:',
    'password': 'كلمة المرور (اختياري):',
    'url-prefix': 'بادئة الرابط (اختياري):',
    'create-paste': '🚀 إنشاء لصق',
    'creating': 'جارٍ الإنشاء...',
    'paste-created': '✅ تم إنشاء اللصق بنجاح!',
    'language': 'اللغة:',
    'copy': '📋 نسخ',
    'expires': 'تنتهي:',
    'create-another': '✨ إنشاء لصق آخر'
  }
};

function updateTranslations(lang) {
  const t = translations[lang] || translations['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
ECHO is off.
  // Update HTML direction for RTL languages
  if (lang === 'ar' || lang === 'ur' || lang === 'fa' || lang === 'he') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pasteForm');
    const contentTextarea = document.getElementById('content');
    const charCount = document.getElementById('charCount');
    const submitBtn = document.getElementById('submitBtn');
    const result = document.getElementById('result');
    const interfaceLanguage = document.getElementById('interfaceLanguage');
ECHO is off.
    // Language selector functionality
    interfaceLanguage.addEventListener('change', function() {
        updateTranslations(this.value);
    });
ECHO is off.
    // Character counter with multilingual number formatting
    contentTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count.toLocaleString();
ECHO is off.
        // Auto-detect content language
        const text = this.value;
        if (text.length > 10) {
            const detectedLang = detectLanguage(text);
            if (detectedLang) {
                document.getElementById('contentLanguage').value = detectedLang;
            }
        }
    });
ECHO is off.
    // Simple language detection based on character ranges
    function detectLanguage(text) {
        const devanagariRange = /[\u0900-\u097F]/;
        const tamilRange = /[\u0B80-\u0BFF]/;
        const teluguRange = /[\u0C00-\u0C7F]/;
        const bengaliRange = /[\u0980-\u09FF]/;
        const arabicRange = /[\u0600-\u06FF]/;
        const chineseRange = /[\u4e00-\u9fff]/;
        const japaneseRange = /[\u3040-\u309f\u30a0-\u30ff]/;
        const koreanRange = /[\uac00-\ud7af]/;
        const thaiRange = /[\u0E00-\u0E7F]/;
ECHO is off.
        if (devanagariRange.test(text)) return 'hi';
        if (tamilRange.test(text)) return 'ta';
        if (teluguRange.test(text)) return 'te';
        if (bengaliRange.test(text)) return 'bn';
        if (arabicRange.test(text)) return 'ar';
        if (chineseRange.test(text)) return 'zh';
        if (japaneseRange.test(text)) return 'ja';
        if (koreanRange.test(text)) return 'ko';
        if (thaiRange.test(text)) return 'th';
ECHO is off.
        return null;
    }
ECHO is off.
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
ECHO is off.
        const content = contentTextarea.value.trim();
        if (!content) {
            alert('Please enter some content');
            return;
        }
ECHO is off.
        // Show loading state
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
        submitBtn.disabled = true;
ECHO is off.
        try {
            const config = {
                length: parseInt(document.getElementById('urlLength').value),
                style: document.getElementById('urlStyle').value,
                expiration: parseInt(document.getElementById('expiration').value),
                language: document.getElementById('contentLanguage').value,
                password: document.getElementById('password').value,
                prefix: document.getElementById('prefix').value
            };
ECHO is off.
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, config })
            });
ECHO is off.
            const data = await response.json();
ECHO is off.
            if (!response.ok) {
                throw new Error(data.error);
            }
ECHO is off.
            // Show result
            document.getElementById('generatedUrl').value = `${window.location.origin}/${data.url}`;
            document.getElementById('expireDate').textContent = new Date(data.expiresAt).toLocaleString();
            document.getElementById('resultLanguage').textContent = data.language.name;
ECHO is off.
            form.style.display = 'none';
            result.style.display = 'block';
ECHO is off.
        } catch (error) {
            alert(`Error creating paste: ${error.message}`);
        } finally {
            // Reset button state
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
            submitBtn.disabled = false;
        }
    });
ECHO is off.
    // Copy URL functionality
    document.getElementById('copyBtn').addEventListener('click', function() {
        const urlInput = document.getElementById('generatedUrl');
        urlInput.select();
        navigator.clipboard.writeText(urlInput.value);
        this.textContent = '✅ Copied!';
        setTimeout(() => {
            this.textContent = '📋 Copy';
        }, 2000);
    });
ECHO is off.
    // New paste button
    document.getElementById('newPasteBtn').addEventListener('click', function() {
        form.style.display = 'block';
        result.style.display = 'none';
        contentTextarea.value = '';
        charCount.textContent = '0';
        document.getElementById('password').value = '';
        document.getElementById('prefix').value = '';
    });
});
