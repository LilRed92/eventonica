import dotenv from 'dotenv';
import pl from '../db/db-connection.js';
dotenv.config();


function getQuery(searchInput) {
    if(searchInput) {
        const query = {
            text: 'SELECT events.*, categories.category_name, categories.emoji, categories.color FROM events JOIN categories ON events.category = categories.id WHERE event_name=$1',
            values: [searchInput],
          };
          return query;
    } else {
        return 'SELECT events.*, categories.category_name, categories.emoji, categories.color FROM events JOIN categories ON events.category = categories.id';
    }
}
// Logic for GET request for all events with endpoint '/events'
// && GET request for single queried event with endpoint '/events/:eventsId'
export const getEvents = async (req, res) => {
    const searchInput = req.query.searchInput;
    try {
        const db = await pl.connect();
        const result = await db.query(getQuery(searchInput));
        res.json(result.rows);
        console.log('GET QUERY OF EVENTS IS WORKING');

    } catch (err) {
        console.error('Error querying events table:', err);
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
}; 