import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// Logic for GET request for all events with endpoint '/events'
export const getEvent = async (req, res) => {
    try {
        const { rows: events } = await db.query('SELECT * FROM events WHERE event_name = ');
        res.json(events);
        res.send(events);
        db.release();
        console.log('GET QUERY OF ALL EVENTS IS WORKING');

    } catch (err) {
        console.error('Error querying eventonica DB:', err);
            
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
}; 