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

// Endpoint to handle data submission to phone table
router.post('/phone', async (req, res) => {
    try {
        const client = await pool.connect();

        const { countryCode, phonetype,  phoneid, phone  } = req.body;

        // Perform database operation to insert data into phone table
        await client.query(
            'INSERT INTO phone (country_code, phpne_type, phone1_id, phone ) VALUES ($1, $2, $3, $4)',
            [countryCode, phonetype,  phoneid, phone ]
        );

        client.release();
        res.json({ status: 'Data submitted to phone table successfully' });
    } catch (error) {
        console.error('Error submitting data to phone table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;