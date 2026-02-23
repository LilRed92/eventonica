import express from 'express';

const route = express.Router();

route.get('/', (req, res) => {
    res.json({ message: "This is the API ROOT" });
});

route.get('/events', )

route.get('/events/:id', )

route.post('/events', )

route.put('/events/:id', )

route.put('/events/:id/favorite', )

route.delete('/events/:id', )

route.get('/categories', )