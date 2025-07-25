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
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});





app.get("/", async (req, res) => {
    console.log('Hellow my sql server');
    res.send("My SQL server is running");
})
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
