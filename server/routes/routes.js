import express from 'express';
import { getAllEvents } from '../controllers/getAllEvents.js';
import { getEvent } from '../controllers/getEvent.js';
import { createEvent } from '../controllers/createEvent.js';
import { modifyEvent } from '../controllers/modifyEvent.js';
import { toggleFavorite } from '../controllers/toggleFavorite.js';
import [ deleteEvent ] from '../controllers/deleteEvent.js';
import { getCategories } from '../controllers/getCategories.js';

const route = express.Router();

route.get('/', (req, res) => {
    res.json({ message: "This is the API ROOT" });
});

route.get('/events', getAllEvents);

route.get('/events/:id', getEvent);

route.post('/events', createEvent);

route.put('/events/:id', modifyEvent);

route.put('/events/:id/favorite', toggleFavorite);

route.delete('/events/:id', deleteEvent);

route.get('/categories', getCategories);

export default route