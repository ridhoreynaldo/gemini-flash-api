const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Tes koneksi
app.get('/', (req, res) => {
  res.send('🚀 Gemini Flash API is running!');
});

// Endpoint untuk text prompt
app.post('/generate/text', async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ response: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint untuk file input (image, audio, document)
app.post('/generate/file', upload.single('file'), async (req, res) => {
  try {
    const { prompt } = req.body;
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const fileBuffer = fs.readFileSync(filePath);

    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: fileBuffer.toString('base64'),
        },
      },
    ]);

    const text = result.response.text();
    res.json({ response: text });

    fs.unlinkSync(filePath); // hapus file setelah diproses
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
