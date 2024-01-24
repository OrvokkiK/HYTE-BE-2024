// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItemById, getItems, postItem, putItem } from './items.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/sivusto', express.static(path.join(__dirname, '../public')));


//RESOURCE /item endpoints
// GET http://127.0.0.1:3000/items
app.get('/items', getItems);
//GET ID
// TODO Week 1
app.get('/items/:id', getItemById);

// Itemin lisäys
// POST http://127.0.0.1:3000/items/
app.post('/items', postItem);

//PUT
app.put('/items/:id', putItem);

//DELETE
app.delete('/items/:id');

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
