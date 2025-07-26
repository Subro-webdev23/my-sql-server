const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS,
    database: process.env.DB
});

db.connect((err) => {
    if (err) {
        console.error('DB Connection Failed:', err);
    } else {
        console.log('MySQL Connected!');
    }
});
// Add this POST route below your GET route
app.post("/addUser", (req, res) => {
    const { name, email, role, images, password } = req.body;
    const sql = "INSERT INTO users (name, email, role, images, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, role, images, password], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ error: "Failed to insert user" });
        }
        res.status(200).json({
            message: "User added successfully!",
            insertedId: result.insertId,
        });
    });
});

// GET user by email
app.get('/user', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Found user
        res.status(200).json(results[0]);
    });
});

// All users route
app.get('/users', (req, res) => {
    const sql = 'SELECT id, name, email, role, images, created_at FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});




app.get("/", async (req, res) => {
    console.log('Hellow my sql server');
    res.send("My SQL server is running");
})
// Start server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
