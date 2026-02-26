import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();


function getQuery(searchInput) {
    if(searchInput) {
        const query = {
            text: 'SELECT * FROM events WHERE event_name = $1',
            values: [searchInput],
          };
          return query;
    } else {
        return 'SELECT * FROM events';
    }
}
// Logic for GET request for all events with endpoint '/events'
// && GET request for single queried event with endpoint '/events/:id'
export const getEvents = async (req, res) => {
    const searchInput = req.query.searchInput;
    try {
        const { rows: events } = await db.query(getQuery(searchInput));
        res.json(events);
        res.send(events);
        console.log('GET QUERY OF EVENTS IS WORKING');

    } catch (err) {
        console.error('Error querying eventonica DB:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
}; 