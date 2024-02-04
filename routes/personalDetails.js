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
// Endpoint to handle data submission to personal details table
router.post('/', async (req, res) => {
    try {
        const client = await pool.connect();

        const { fullName, gender, dob, maritalStatus, spouse, dependents, children, father, nationality, religion, category, birthplace, adhar, passport, pan, voterid} = req.body;

        // Perform database operation to insert data into personal details table
        await client.query(
            'INSERT INTO personal_details (full_name, gender, dob, marital_status,spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number,pan_number, voter_id ) VALUES ($1, $2, $3, $4,, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
            [fullName, gender, dob, maritalStatus, spouse, dependents, children, father, nationality, religion, category, birthplace, adhar, passport, pan, voterid ]
        );

        client.release();
        res.json({ status: 'Data submitted to personal details table successfully' });
    } catch (error) {
        console.error('Error submitting data to personal details table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;