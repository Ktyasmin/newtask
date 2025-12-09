// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./db');

// const app = express();
// app.use(bodyParser.json());

// // POST API: Add new user
// app.post('/users', (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

//     const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
//     db.query(query, [name, email], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ message: 'User added', userId: result.insertId });
//     });
// });

// // GET API: Fetch all users
// app.get('/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(200).json(results);
//     });
// });

// // Use Railway port or fallback to 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // pool.promise() from above

const app = express();
app.use(bodyParser.json());

// POST API: Add new user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

    try {
        const [result] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ message: 'User added', userId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET API: Fetch all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
