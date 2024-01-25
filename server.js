// server.js
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;
const path = require('path');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1003',
    port: 5432,
};

const dbClient = new Client(dbConfig);

// Connect to the PostgreSQL database
dbClient.connect()
    .then(() => console.log('Connected to the database'))
    .catch(error => console.error('Error connecting to the database:', error));

// Middleware to parse JSON data
app.use(express.json());

// Serve the HTML page at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get countries
app.get('/api/countries', async (req, res) => {
    try {
        const result = await dbClient.query('SELECT DISTINCT country FROM locations');
        const countries = result.rows.map(row => row.country);
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API endpoint to get states based on a country
app.get('/api/states', async (req, res) => {
    const country = req.query.country;

    try {
        const result = await dbClient.query('SELECT DISTINCT state FROM locations WHERE country = $1', [country]);
        const states = result.rows.map(row => row.state);
        res.json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API endpoint to get cities based on a state
app.get('/api/cities', async (req, res) => {
    const state = req.query.state;

    try {
        const result = await dbClient.query('SELECT city FROM locations WHERE state = $1', [state]);
        const cities = result.rows.map(row => row.city);
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Handle form submissions at /submitData
app.post('/submitData', async (req, res) => {
    const { country, state, city, zip } = req.body;

    try {
        // Example: Insert the submitted data into the database
        await dbClient.query('INSERT INTO your_table_name (country, state, city, zip) VALUES ($1, $2, $3, $4)', [country, state, city, zip]);
        res.status(200).send('Form data submitted successfully');
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
