
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
router.post('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const { personal_details_id, address_id, phone_id, full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id, minority_info, residence_type, house_number, area_location, country, state, city, pincode, phone, email, country_code, phone_type, phone1_id, phone_number       
        } = req.body;
        console.log(req.body);

        // Perform database operation to insert data into master table
        await client.query(
            'INSERT INTO master_data (personal_details_id, address_id, phone_id, full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id, minority_info, residence_type, house_number, area_location, country, state, city, pincode, phone, email, country_code, phone_type, phone1_id, phone_number  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)',
            [ personal_details_id, address_id, phone_id, full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id, minority_info, residence_type, house_number, area_location, country, state, city, pincode, phone, email, country_code, phone_type, phone1_id, phone_number]
        );

        client.release();
        res.json({ status: 'Data submitted to master table successfully' });
    } catch (error) {
        console.error('Error submitting data to master table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();

        // Perform database operation to retrieve data from master table
        const result = await client.query('SELECT * FROM master_data');

        // Release the client back to the pool
        client.release();

        // Send the fetched data as JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from master table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;