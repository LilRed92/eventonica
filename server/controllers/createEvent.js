import dotenv from 'dotenv';
import db from '../db/db-connection.js';
dotenv.config();

export const createEvent = async (req, res) => {
    const eventsTable = await db.query('SELECT * FROM events');

    
} 