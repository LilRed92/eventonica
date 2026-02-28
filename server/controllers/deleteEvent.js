import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

// TODO Need to modify the following function to create a query for deleteEvent's await db.query
function getDeleteQuery(deleteId) {
    if(searchInput) {
        const query = {
            text: 'SELECT * FROM events WHERE event_name=$1',
            values: [searchInput],
          };
          return query;
    } else {
        return 'SELECT * FROM events';
    }
}

// Logic for DELETE request for selected event with endpoint '/events/:eventId'
export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        await db.query('DELETE FROM events WHERE id=$1', [eventId]);
        console.log('DELETE QUERY TO REMOVE AN EVENT IS WORKING', eventId);
        res.status(200).end();
    } catch (err) {
        console.error('Error deleting events from eventonica DB:', err); 
        return res.status(500).json({ message: 'Internal Server Error', detail: err.message });
    }
};