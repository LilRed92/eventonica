import dotenv from 'dotenv';
import pl from '../db/db-connection.js';
dotenv.config();

// Logic for PUT request for selected event with endpoint ':eventId/favorite'
export const toggleFavorite = async (req, res) => {
    const eventId = req.params.id;
    const updateFavorite = {
        is_favorite: req.body.toggleFavorite
    }
    const query = `UPDATE events SET is_favorite=$2 WHERE id=$1 RETURNING *`; 
    const values = [eventId, updateFavorite.is_favorite];
    try {
        const db = await pl.connect();
        const toggled = await db.query(query, values);
        res.json(toggled.rows[0]);
        console.log('PUT QUERY TO TOGGLE AN EVENT IS WORKING');
    } catch(err) {
        console.error('Error toggling eventonica DB:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    } 
};