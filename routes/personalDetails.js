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
        console.log(req.body);
        const { full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id  } = req.body;

        // Perform database operation to insert data into personal details table
        // const result = await client.query(
        //     'INSERT INTO personal_details ( full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
        //     [ full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id],
        
        // );


        const result = await client.query(
            {
                text: 'INSERT INTO personal_details (full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
                values: [full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id],
                rowMode: 'array' // Specify rowMode as "array"
            }
        );

        console.log(result.rows[0][0])
        const insertId = result.rows[0][0];
        
        // console.log(result);
        client.release();
        res.json({ id:insertId,status: 'Data submitted to personal details table successfully' });
    } catch (error) {
        console.error('Error submitting data to personal details table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();

        // Perform database operation to retrieve data from master table
        const result = await client.query('SELECT * FROM personal_details');

        // Release the client back to the pool
        client.release();

        // Send the fetched data as JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from master table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const { id } = req.params;

        // Perform database operation to retrieve data from master table
        const result = await client.query('SELECT * FROM personal_details WHERE id = $1', [id]);
        // console.log(result);
        // Release the client back to the pool
        client.release();

        // Send the fetched data as JSON response
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from master table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const { full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id } = req.body;

        // Perform database operation to update data in the personal_details table
        const result = await client.query('UPDATE personal_details SET full_name = $1, gender = $2, dob = $3, marital_status = $4, spouse_name = $5, dependents = $6, children = $7, father_name = $8, nationality = $9, religion = $10, category = $11, place_of_birth = $12, aadhaar_number = $13, passport_number = $14, pan_number = $15, voter_id = $16 WHERE id = $17', [full_name, gender, dob, marital_status, spouse_name, dependents, children, father_name, nationality, religion, category, place_of_birth, aadhaar_number, passport_number, pan_number, voter_id, id]);

        // Release the client back to the pool
        client.release();

        
        res.json({id, status: 'Data updated successfully'});
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;