import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for GET request for all categories with endpoint '/:categoriesId'

export const getCategories = async (req, res) => {
    try {
        const { rows: categories } = await db.query('SELECT * FROM categories');
        res.json(categories);
        console.log('GET QUERY OF CATEGORIES IS WORKING');

    } catch (err) {
        console.error('Error querying categories table:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
}; 