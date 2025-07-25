const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());






app.get("/", async (req, res) => {
    console.log('Hellow my sql server');
    res.send("My SQL server is running");
})
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
