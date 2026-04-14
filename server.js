const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const DATA_DIR = path.join(__dirname, '../data');
const CSV_FILE = path.join(DATA_DIR, 'water_data.csv');

// Initialize CSV with headers if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, 'timestamp,tds,ntu,voltage\n');
}

// Ensure header exists
const initCsv = () => {
    try {
        const content = fs.readFileSync(CSV_FILE, 'utf8');
        if (!content.trim().startsWith('timestamp,tds,ntu,voltage')) {
            fs.writeFileSync(CSV_FILE, 'timestamp,tds,ntu,voltage\n' + content);
        }
    } catch {
        fs.writeFileSync(CSV_FILE, 'timestamp,tds,ntu,voltage\n');
    }
};
initCsv();

// Parse CSV to get JSON
function readCSV() {
  if (!fs.existsSync(CSV_FILE)) return [];
  const content = fs.readFileSync(CSV_FILE, 'utf8');
  const lines = content.trim().split('\n').filter(line => line.trim() !== '');
  if (lines.length <= 1) return []; // Only header
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (parts.length >= 4) {
      data.push({
        timestamp: parts[0],
        tds: parseFloat(parts[1]),
        ntu: parseFloat(parts[2]),
        voltage: parseFloat(parts[3])
      });
    }
  }
  return data;
}

// 1. POST /api/sensor-data -> Save data into CSV
app.post('/api/sensor-data', (req, res) => {
  const { tds, ntu, voltage, timestamp } = req.body;
  if (tds === undefined || ntu === undefined || voltage === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ts = timestamp || new Date().toISOString();
  const row = `${ts},${tds},${ntu},${voltage}\n`;

  fs.appendFile(CSV_FILE, row, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to write data' });
    }
    res.json({ success: true, message: 'Data saved successfully' });
  });
});

// 2. GET /api/data -> Returns all sensor data
app.get('/api/data', (req, res) => {
  const data = readCSV();
  res.json(data);
});

// 3. GET /api/latest -> Returns latest record
app.get('/api/latest', (req, res) => {
  const data = readCSV();
  if (data.length === 0) return res.json({});
  res.json(data[data.length - 1]);
});

// 4. GET /api/export -> Downloads CSV file
app.get('/api/export', (req, res) => {
  res.download(CSV_FILE, 'water_data.csv');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
