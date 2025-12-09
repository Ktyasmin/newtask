// const mysql = require('mysql2');

// // Use environment variables for credentials
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'user-app'
// });

// // Connect to MySQL
// connection.connect((err) => {
//     if (err) {
//         console.error("Error connecting to MySQL:", err.message);
//         return;
//     }
//     console.log("MySQL Connected!");

//     // Auto-create users table
//     const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) NOT NULL
//     )`;
    
//     connection.query(createTableQuery, (err) => {
//         if (err) console.error("Error creating table:", err.message);
//         else console.log("Users table ready");
//     });
// });

// module.exports = connection;


const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'user-app',
    waitForConnections: true,
    connectionLimit: 10, // max simultaneous connections
    queueLimit: 0
});

// Auto-create users table
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
    )
`, (err) => {
    if (err) console.error("Error creating table:", err.message);
    else console.log("Users table ready");
});

module.exports = pool.promise(); // use promise API for async/await
