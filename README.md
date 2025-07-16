# 🧠 Gemini Flash API (Express.js)

Sebuah REST API sederhana menggunakan Node.js & Express yang terhubung ke Google Gemini 1.5 Flash. Mendukung input:

- 📝 Teks
- 🖼️ Gambar
- 🎵 Audio
- 📄 Dokumen

## 🔧 Teknologi

- [x] Express.js
- [x] Google Generative AI SDK
- [x] Multer (upload file)
- [x] Dotenv

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/ridhoreynaldo/gemini-flash-api.git
cd gemini-flash-api
npm install

# Buat file .env dari contoh
cp .env.example .env

# Masukkan Gemini API key ke file .env
# GEMINI_API_KEY=your_api_key

# Jalankan server
node index.js
