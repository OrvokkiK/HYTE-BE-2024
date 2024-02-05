// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItemById, getItems, postItem, putItem, deleteItem } from './items.mjs';
import { getUsers, getUsersById, postUser, putUser, postLogin } from './users.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/sivusto', express.static(path.join(__dirname, '../public')));


//RESOURCE /item endpoints
// GET http://127.0.0.1:3000/items
app.get('/items', getItems);

//GET ID
app.get('/items/:id', getItemById);

// POST http://127.0.0.1:3000/items/ Itemin lisäys
app.post('/items', postItem);

//PUT
app.put('/items/:id', putItem);

//DELETE
app.delete('/items/:id', deleteItem);

//Users resource
// list users
app.get('/users', getUsers);

//get info of a user
app.get('/users/:id', getUsersById);

// register user
app.post('/users', postUser);

// user login
app.post('/users/login', postLogin);

//update user
app.put('/users/:id', putUser);

// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

