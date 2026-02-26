import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for PUT request for selected event with endpoint ':eventId/favorite'
export const toggleFavorite = async (req, res) => {
    const eventId = req.params.eventId;
    const updateFavorite = {
        is_favorite: req.body.toggleFavorite
    }
    const query = `UPDATE events SET is_favorite=$2 WHERE id=$1 RETURNING *`; 
    const values = [eventId, event_name, category, event_description, start_time, end_time, updateFavorite.is_favorite];
    try {
        const toggled = await db.query(query, values);
        res.send(toggled.rows[0]);
        console.log('PUT QUERY TO TOGGLE AN EVENT IS WORKING');
    } catch(err) {
        console.error('Error toggling eventonica DB:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    } 
};