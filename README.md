# 🌍 Multilingual Pastebin - World Language Support

A modern, multilingual pastebin application that supports 50+ world languages including Tamil, Hindi, Marathi, English, Arabic, Chinese, Japanese, and many more.

## ✨ Features

### 🌐 **Comprehensive Language Support**
- **Indian Languages**: Tamil, Hindi, Marathi, Telugu, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu, Nepali, Sinhala
- **European Languages**: English, Spanish, French, German, Italian, Portuguese, Russian, Polish, Dutch, Swedish, Greek
- **East Asian Languages**: Chinese, Japanese, Korean, Thai, Vietnamese, Myanmar
- **Middle Eastern Languages**: Arabic, Persian, Hebrew, Turkish
- **African Languages**: Swahili, Amharic, Hausa, Yoruba, Afrikaans
- **Other Languages**: Indonesian, Malay, Filipino, and more

### 🔗 **Smart URL Generation**
- **Customizable length** (4-12 characters)
- **Multiple styles**: Mixed case, lowercase, memorable, pronounceable
- **Collision detection** for uniqueness
- **Custom prefixes** for branding

### 🛡️ **Security & Privacy**
- **Password protection** for sensitive pastes
- **Automatic expiration** (1 hour to never)
- **Secure hashing** for passwords
- **No tracking** or analytics

### 🎨 **Modern Design**
- **Right-to-left (RTL) support** for Arabic, Hebrew, Urdu, Persian
- **Responsive design** for all devices
- **Beautiful gradients** and modern UI
- **Font optimization** for all supported languages

### 🚀 **Advanced Features**
- **Auto language detection** based on character ranges
- **Syntax highlighting** for code
- **Copy/download** functionality
- **Translation integration** with Google Translate
- **View counter** and paste statistics

## 🛠️ **Technology Stack**

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js Serverless Functions
- **Database**: Vercel KV (Redis)
- **Hosting**: Vercel (Free Tier)
- **Fonts**: Google Noto Fonts (Universal Language Support)

## 📦 **Installation**

### **Automated Setup (Recommended)**
```
# Run the batch script
setup-pastebin.bat
```

### **Manual Setup**
```
# Clone or create project
mkdir multilingual-pastebin
cd multilingual-pastebin

# Install dependencies
npm install

# Login to Vercel
vercel login

# Deploy
vercel
```

## 🌟 **Configuration**

### **Vercel KV Database Setup**
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Storage > Create Database
4. Choose "KV" and create it
5. Environment variables will be automatically added

### **Custom Domain (Optional)**
1. Add your domain in Vercel dashboard
2. Update DNS records
3. SSL certificate will be automatically provisioned

## 🔧 **Usage Examples**

### **API Endpoints**
```
// Create a paste
POST /api/create
{
  "content": "नमस्ते दुनिया! 🌍",
  "config": {
    "language": "hi",
    "length": 6,
    "style": "mixed",
    "expiration": 24,
    "password": "optional"
  }
}

// Get a paste
GET /api/paste/abc123
```

### **Language Detection**
The system automatically detects languages based on Unicode character ranges:
- **Devanagari** (Hindi, Marathi, Nepali): U+0900-U+097F
- **Tamil**: U+0B80-U+0BFF  
- **Telugu**: U+0C00-U+0C7F
- **Arabic**: U+0600-U+06FF
- **Chinese**: U+4E00-U+9FFF
- **And many more...**

## 🎯 **Performance**

- **Fast Loading**: Optimized fonts and assets
- **Global CDN**: Vercel's edge network
- **Caching**: Redis-based storage with TTL
- **Compression**: Automatic asset compression

## 🌍 **Internationalization**

### **RTL Language Support**
- Automatic text direction detection
- Proper alignment for Arabic, Hebrew, Urdu, Persian
- Interface adapts to reading direction

### **Font Loading**
- Google Noto Fonts for universal character support
- Optimized font loading for better performance
- Fallback fonts for unsupported characters

## 📱 **Mobile Support**

- **Responsive design** for all screen sizes
- **Touch-friendly** interface
- **Mobile keyboard** optimization
- **App-like experience** on mobile browsers

## 🔒 **Security Considerations**

- **Input sanitization** to prevent XSS
- **Rate limiting** to prevent spam
- **Secure password hashing** with SHA-256
- **HTTPS enforced** on all connections

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple languages
5. Submit a pull request

## 📄 **License**

MIT License - feel free to use this project for any purpose.

## 🙏 **Acknowledgments**

- **Google Noto Fonts** for universal language support
- **Vercel** for excellent serverless hosting
- **Prism.js** for syntax highlighting
- **Unicode Consortium** for character standards

## 📞 **Support**

If you encounter any issues or have suggestions:
1. Check the language is properly supported
2. Verify your Vercel KV database is set up
3. Test with different browsers
4. Create an issue with detailed information

---

**🎉 Enjoy sharing text in any language around the world! 🌍**
