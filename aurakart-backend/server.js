const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(bodyParser.json());

// Initialize users.json if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read user data' });
  }
});

// Save all users (replaces the file)
app.post('/api/users/save', (req, res) => {
  try {
    const users = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true, message: 'Users saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Aurakart Backend running at http://localhost:${PORT}`);
});
