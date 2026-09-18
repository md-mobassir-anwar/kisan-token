// File Location: kisan-token/server.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create/connect to a database file named database.db
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Error connecting to database:', err);
    else console.log('Connected to SQLite database!');
});

// 2. Create a "bookings" table if it doesn't exist yet
db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmerName TEXT,
    mobileNumber TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// 3. API route to save booking into database
app.post('/api/book', (req, res) => {
    const { farmerName, mobileNumber } = req.body;

    const query = `INSERT INTO bookings (farmerName, mobileNumber) VALUES (?, ?)`;
    db.run(query, [farmerName, mobileNumber], function(err) {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Failed to save booking.' });
        }
        console.log(`Booking saved! Row ID: ${this.lastID}`);
        res.json({ message: `Token generated! Reference ID: #${this.lastID}` });
    });
});
// File Location: kisan-token/server.js

// API route to retrieve all bookings from the database
app.get('/api/bookings', (req, res) => {
    const query = `SELECT * FROM bookings ORDER BY created_at DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ message: 'Failed to load bookings.' });
        }
        res.json(rows); // Send array of bookings back to frontend
    });
});
// Start backend
// File Location: kisan-token/server.js

// Search a single booking by ID
app.get('/api/bookings/:id', (req, res) => {
    // Remove '#' if the user typed it (e.g., '#2' becomes '2')
    const tokenId = req.params.id.replace('#', ''); 

    db.get(`SELECT * FROM bookings WHERE id = ?`, [tokenId], (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!row) return res.status(404).json({ message: 'Token not found!' });
        
        res.json(row); // Send back the matching farmer's info
    });
});
// Admin Route: View all user bookings
app.get('/api/admin/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.listen(5000, () => console.log('Backend server is RUNNING on port 5000!'));