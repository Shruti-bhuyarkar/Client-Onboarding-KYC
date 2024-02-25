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
// router.post('/', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         await client.query('BEGIN');

//         const { id,pd_id,residence, house, area, country, state, city, pin, email} = req.body;
//         console.log(req.body)
//         // Perform database operation to insert data into address table
//         await client.query(
//             'INSERT INTO address (id,personal_details_id,residence_type, house_number, area_location, country, state, city, pincode, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10)',
//             [id,pd_id,residence, house, area, country, state, city, pin, email]
//         );

       
//         res.json({ status: 'Data submitted to address table successfully' });
//         client.release();
//     } catch (error) {
//         console.error('Error submitting data to address table:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.post('/', async (req, res) => {
    let client; // Define client variable outside the try block
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const { pd_id, residence, house, area, country, state, city, pin, email } = req.body;
        console.log(req.body);

        // Perform database operation to insert data into address table
        const query = `
            INSERT INTO address (personal_details_id, residence_type, house_number, area_location, country, state, city, pincode, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        const values = [ pd_id, residence, house, area, country, state, city, pin, email];

        await client.query(query, values);
       
        await client.query('COMMIT');
        res.json({ status: 'Data submitted to address table successfully' });
    } catch (error) {
        console.error('Error submitting data to address table:', error);
        if (client) await client.query('ROLLBACK');
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) client.release();
    }
});



router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM address');
        const address = result.rows;
        res.json(address);
        client.release();
    } catch (error) {
        console.error('Error fetching data from address table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


// get user whose personal_dtails_id is equal to the id
router.get('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const result = await client.query('SELECT * FROM address WHERE personal_details_id = $1', [id]);
        const address = result.rows;
        res.json(address);
        client.release();
    } catch (error) {
        console.error('Error fetching data from address table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const { residence, house, area, country, state, city, pin, email } = req.body;

        // Perform database operation to update data in the address table
        const result = await client.query('UPDATE address SET residence_type = $1, house_number = $2, area_location = $3, country = $4, state = $5, city = $6, pincode = $7, email = $8 WHERE personal_details_id = $9', [residence, house, area, country, state, city, pin, email, id]);

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