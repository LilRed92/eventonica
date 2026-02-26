import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for PATCH request for selected event with endpoint '/events/:id'
export const modifyEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const updatedEvent = {
        id: req.query.id,
        event_name: req.query.newEventName,
        category: req.query.selectedCategory,
        event_description: req.query.newDescription,
        start_time: req.query.newStart,
        end_time: req.query.newEnd,
        is_favorite: req.query.newFavorite
    }
    const query = `UPDATE events SET event_name=$1, category=$2, event_description=$3, start_time=$4, end_time=$5, is_favorite=$6 WHERE id =${eventId} RETURNING *`; 
    const values = [updatedEvent.event_name, updatedEvent.category, updatedEvent.event_description, updatedEvent.start_time, updatedEvent.end_time, updatedEvent.is_favorite];
    try {
        const updated = await db.query(query, values);
        res.json(updated.rows[0]);
        res.send(updated.rows[0]);
        db.release();
        console.log('PATCH QUERY TO UPDATE AN EVENT IS WORKING');
    } catch(err) {
        console.error('Error updating eventonica DB:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    } 
};