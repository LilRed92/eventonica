import express from 'express';
import { getEvents } from '../controllers/getEvents.js';
import { createEvent } from '../controllers/createEvent.js';
import { modifyEvent } from '../controllers/modifyEvent.js';
import { toggleFavorite } from '../controllers/toggleFavorite.js';
import { deleteEvent } from '../controllers/deleteEvent.js';
import { getCategories } from '../controllers/getCategories.js';

const route = express.Router();

route.get('/', (req, res) => {
    res.json({ message: "This is the API ROOT" });
});

// Endpoint for GET request for all events (getAllEvents.js)
route.get('/events', getEvents);

// Endpoint for GET request for specific event (getEvent.js)

// route.get('/events/:id', getEvent);

// Endpoint for POST request to create an event (createEvent.js)
route.post('/events', createEvent);

// Endpoint for PATCH request to modify an event (modifyEvent.js)
route.patch('/events/:id', modifyEvent);

// Endpoint for PUT request to toggle "liked/!liked" on event (toggleFavorite.js)
route.put('/events/:id/favorites', toggleFavorite);

// Endpoint for DELETE request to delete an event (deleteEvent.js)
route.delete('/events/:id', deleteEvent);

// Endpoint for GET request for all categories (getCategories.js)
route.get('/categories', getCategories);

export default route
