// Require data
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/db');
const fs = require('fs');
const { json } = require('body-parser');
const uuid = require ('uuid/v1');

// db = [
//     {
//         "title": "Test Title",
//         "text": "Test text",
//         "id": "test_id"
//     }
// ]

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

// working route to db.json
app.get('/api/notes', (req, res) => {
    console.log(db);
    // reach into db
    // return data as json
    res.json(db);
});

app.post('/api/notes', (req, res) => {

    console.log(db);

    //add the ID property
    const newNote = req.body
    newNote.id = uuid()
    console.log(newNote);
    db.push(req.body);
   
    fs.writeFile('db/db.json', JSON.stringify(db), function(err, data){
        if (err) {
            throw err
        } else {
            res.send(data)
        }
    });
});

// Method to make our server listen. Chain the listen() method onto our server.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
