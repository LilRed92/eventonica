import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

export const getAllEvents = async (req, res) => {
    const allEventsTable = await db.query('SELECT * FROM events');

    res.json(allEventsTable.rows);
    db.release();
    console.log('GET QUERY OF ALL EVENTS IS WORKING');
    
}; 