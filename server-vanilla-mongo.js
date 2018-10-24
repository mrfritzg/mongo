// Requiring in Mongo connection
const customMongoFuncs = require('./mongo/mongoClient.js');

// Making Express server
const express = require('express');
const app = express();
const PORT = 3000;

// Variables which will be used to store references
let mongoConn;
let pizzaDb;

// Body parser middleware to read body on requests that have a body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res, next) => {
  res.status(200).send('Welcome');
});

app.get('/toppings', (req, res, next) => {
  const query = {}; // Why is this an empty object?
  pizzaDb.collection('toppings').find(query).toArray((err, toppings) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(toppings);
  });
});

app.post('/toppings', (req, res, next) => {
  const document = req.body;
  pizzaDb.collection('toppings').insertOne(document, (err, newTopping)=> {
    if (err) res.status(500).send(err);
    else res.status(201).send(newTopping);
  });
});


// HOMEWORK!!!
// Make 1 route to delete Toppings.
// Make 1 route to edit existing Toppings.
// Make 1 route to get all Eaters.
// Make 1 route to add an Eater.
// Make 1 route to delete Eaters.
// Make 1 route to edit existing Eaters.


// Default 404 if no other routes hit.
app.all('*', (req, res, next) => {
  res.status(404).send('Dunno');
});

customMongoFuncs.makeConnection() // Making connection to Mongo
  .then(conn => {
    mongoConn = conn; // Saving connection to Mongo for reference purposes
    pizzaDb = mongoConn.db('pizza'); // Saving connection to Pizza DB for reference purposes
    return pizzaDb; // Making Pizza database and returning connection to it
  })
  .then(pizzaConn => customMongoFuncs.makeCollection(pizzaConn, 'toppings'))
  .then(pizzaConn => customMongoFuncs.makeCollection(pizzaConn, 'eaters'))
  .then(() => {
    // Starting server after all database functionality is ready
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch(err => console.log(err));
