// server.js

const express = require('express');
const path = require('path');
const axios = require('axios'); // Added axios
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Proxy endpoint for code execution
app.post('/run-code', async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    const payload = {
        source_code,
        language_id,
        stdin,
    };

    try {
        const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', payload, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Use environment variable
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

