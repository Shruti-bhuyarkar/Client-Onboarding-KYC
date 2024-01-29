
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
// Endpoint to handle data submission to master table
router.post('/masterTable', async (req, res) => {
    try {
        const client = await pool.connect();

        const {fullName, gender, dob, maritalStatus, spouse, dependents, children, father, nationality, religion, category, birthplace, adhar, passport, pan, voterid,  residence, house, area, country, state, city, pin, email, countryCode, phonetype,  phoneid, phone         
           
        } = req.body;

        // Perform database operation to insert data into master table
        await client.query(
            'INSERT INTO master_table (full_name, gender, dob, marital_status,spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhar_number, passport_number, voter_id, residence_type, house_number, area_location, country, state, city, pincode, email,country_code, phpne_type, phone1_id, phone ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)',
            [fullName, gender, dob, maritalStatus, spouse, dependents, children, father, nationality, religion, category, birthplace, adhar, passport, pan, voterid,  residence, house, area, country, state, city, pin, email, countryCode, phonetype,  phoneid, phone]
        );

        client.release();
        res.json({ status: 'Data submitted to master table successfully' });
    } catch (error) {
        console.error('Error submitting data to master table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;