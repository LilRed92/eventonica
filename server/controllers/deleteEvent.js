import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for PATCH request for selected event with endpoint '/events/:id'
export const deleteEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const updatedEvent = {
        id: req.body.id,
        event_name: req.body.updatedEventName,
        category: req.body.updatedCategory,
        event_description: req.body.updatedDescription,
        start_time: req.body.updatedStart,
        end_time: req.body.updatedEnd,
        is_favorite: req.body.updatedFavorite
    }
    const query = `UPDATE events SET event_name=$2, category=$3, event_description=$4, start_time=$5, end_time=$6, is_favorite=$7 WHERE id=$1 RETURNING *`; 
    const values = [eventId, updatedEvent.event_name, updatedEvent.category, updatedEvent.event_description, updatedEvent.start_time, updatedEvent.end_time, updatedEvent.is_favorite];
    try {
        const updated = await db.query(query, values);
        res.send(updated.rows[0]);
        console.log('PATCH QUERY TO UPDATE AN EVENT IS WORKING');
    } catch(err) {
        console.error('Error updating eventonica DB:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    } 
};