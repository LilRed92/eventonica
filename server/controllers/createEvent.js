import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for PUT request for adding an event to events with endpoint '/events'
export const createEvent = async (req, res) => {
    try {
        const newEvent = {
            event_name: req.query.newEventName,
            category: req.query.selectedCategory,
            event_description: req.query.newDescription,
            start_time: req.query.newStart,
            end_time: req.query.newEnd,
            is_favorite: req.query.newFavorite
        }
        const result = await db.query(`INSERT INTO events (event_name, category, event_description, start_time, end_time, is_favorite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [newEvent.event_name, newEvent.category, newEvent.event_description, newEvent.start_time, newEvent.end_time, newEvent.is_favorite]);
        console.log(result.rows[0]);
        res.json(result.rows[0])
    } catch (err) {
        console.error('Error inserting into eventonica DB:', err);
            
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
};