import dotenv from 'dotenv';
import pl from '../db/db-connection.js';
dotenv.config();

// TODO Need to modify getQuery function to a switch statement for (searchInput, filterFavorites, & standard GET query)
function getQuery(searchInput) {
    if(searchInput) {
        const query = {
            text: 'SELECT * FROM public.events WHERE event_name=$1',
            values: [searchInput],
          };
          return query;
    } else {
        return 'SELECT * FROM events';
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