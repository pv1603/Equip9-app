const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');  // Import CORS

const app = express();

// Enable CORS for all domains (or you can specify your frontend URL for security)
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());
// Middleware to parse incoming JSON data
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default password for MySQL in XAMPP
  database: 'equip9_db'
});

// Test MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});//error

// POST API to register a user
app.post('/register', async (req, res) => {
  const { first_name, last_name, mobile_number, password, created_by } = req.body;

  // Validate that all fields are provided
  if (!first_name || !last_name || !mobile_number || !password || !created_by) {
    console.log('Missing fields:', req.body); // Debugging line to log missing fields
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password before saving it
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Debugging line to check the hashed password

    // SQL query to insert the user into the database
    const query = 'CALL insert_user(?, ?, ?, ?, ?)';
    db.execute(query, [first_name, last_name, mobile_number, hashedPassword, created_by], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Error inserting user', error: err.message });
      }
      console.log('User inserted successfully:', result); // Debugging line to check result
      return res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    return res.status(500).json({ message: 'Error hashing password', error: err.message });
  }
});

// POST API for user login
app.post('/login', async (req, res) => {
  const { mobile_number, password } = req.body;

  // Validate that all fields are provided
  if (!mobile_number || !password) {
    console.log('Missing login fields:', req.body); // Debugging line to log missing fields
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL query to fetch the user by mobile number
  const query = 'SELECT * FROM users WHERE mobile_number = ?';
  db.query(query, [mobile_number], async (err, results) => {
    if (err) {
      console.error('MySQL Error:', err);
      return res.status(500).json({ message: 'Database Error', error: err.message });
    }

    if (results.length > 0) {
      const user = results[0]; // Fetch the user record
      const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords

      if (isPasswordValid) {
        // Generate greeting based on time of day
        const greeting =
          new Date().getHours() < 12
            ? 'Good Morning'
            : new Date().getHours() < 18
            ? 'Good Afternoon'
            : 'Good Evening';

        return res.status(200).json({
          message: `${greeting} ${user.first_name} ${user.last_name}`,
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});
