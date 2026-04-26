import dotenv from 'dotenv';
import pl from '../db/db-connection.js';
dotenv.config();

// Logic for GET request for all categories with endpoint '/:categoriesId'

export const getCategories = async (req, res) => {
    try {
        const db = await pl.connect();
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
        console.log('GET QUERY OF CATEGORIES IS WORKING');

    } catch (err) {
        console.error('Error querying categories table:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
}; 