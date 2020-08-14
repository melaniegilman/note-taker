// Require data
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { db } = require('./db/db'); // maybe these are duplicates

app.use(express.static(path.join(__dirname, '/public')));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//route to index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})


//route to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
})

// Method to make our server listen. Chain the listen() method onto our server.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// working route to db.json
app.get('/api', (req, res) => {
    console.log(db);
    res.json(db);
});