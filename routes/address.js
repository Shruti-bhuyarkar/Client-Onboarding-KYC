const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1003',
    port: 5432,
});

// Endpoint to handle data submission to address table
router.post('/address', async (req, res) => {
    try {
        const client = await pool.connect();

        const { residence, house, area, country, state, city, pin, email} = req.body;

        // Perform database operation to insert data into address table
        await client.query(
            'INSERT INTO address (residence_type, house_number, area_location, country, state, city, pincode, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [residence, house, area, country, state, city, pin, email]
        );

        client.release();
        res.json({ status: 'Data submitted to address table successfully' });
    } catch (error) {
        console.error('Error submitting data to address table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;