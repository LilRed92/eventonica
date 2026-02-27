import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes/routes.js'

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/api', route);

app.get('/', (req, res) => res.json({ message: 'Hello from the server!' }));

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));