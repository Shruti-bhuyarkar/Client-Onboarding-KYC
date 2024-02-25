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
router.post('/', async (req, res) => {
    try {
        // console.log("hiiii......")
        const client = await pool.connect();

        const { personal_details_id, country_code, phone_type, phone1_id, phone_number } = req.body;
        console.log(req.body)

// Perform database operation to insert data into phone table
const result = await client.query(
    {
        text: 'INSERT INTO phone (personal_details_id, country_code, phone_type, phone1_id, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [personal_details_id, country_code, phone_type, phone1_id, phone_number],
        rowMode: 'array' // Specify rowMode as "array"
    }
);

const insertId = result.rows[0][0];

console.log(result.rows[0][0]);
        
        res.json({ id:insertId,status: 'Data submitted to phone table successfully' });
        client.release();
    } catch (error) {
        console.error('Error submitting data to phone table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM phone');
        const phone = result.rows;
        res.json(phone);
        client.release();
    } catch (error) {
        console.error('Error fetching data from phone table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


router.get('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM phone WHERE personal_details_id = $1', [req.params.id]);
        const phone = result.rows;
        res.json(phone);
        client.release();
    } catch (error) {
        console.error('Error fetching data from phone table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

router.put('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const { id } = req.params; // personal_details_id
        const { personal_details_id, country_code, phone_type, phone1_id, phone_number } = req.body;

        // Perform database operation to update data in the phone table
        const result = await client.query(
            {
                text: 'UPDATE phone SET personal_details_id = $1, country_code = $2, phone_type = $3, phone1_id = $4, phone_number = $5 WHERE personal_details_id = $6 RETURNING *',
                values: [personal_details_id, country_code, phone_type, phone1_id, phone_number, id],
                rowMode: 'array' // Specify rowMode as "array"
            }
        );

        // Release the client back to the pool
        client.release();

        // Send a success message
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;