// Require data
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
let db = require('./db/db');
const fs = require('fs');
const { json } = require('body-parser');
const uuid = require('uuid/v1');
const { timeStamp } = require('console');

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
    res.json(db);
});

//route to create note in json file
app.post('/api/notes', (req, res) => {
    //add the ID property
    const newNote = req.body
    newNote.id = uuid()
    db.push(req.body);

    fs.writeFile('db/db.json', JSON.stringify(db), function (err, data) {
        if (err) {
            throw err
        } else {
            res.send(data)
        }
    });
});


// should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
    const deletedNote = (req.params.id);

    //filter over the database object and return which item you want to ddelete 
    db = db.filter(function (obj) {
        return obj.id !== deletedNote;
    });

    //we loop over database object and splice out the deleted record 
    for (var i = 0; i < db.length; i++) {
        if (db.indexOf(deletedNote) !== -1) {
            db.splice(i, 1);
        }
    }
    //we write to the database json object our new values
    fs.writeFile('db/db.json', JSON.stringify(db), function (err, data) {
        if (err) {
            throw err
        } else {
            res.send(data)
        }
    });
}
)

// wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


// method to make our server listen. Chain the listen() method onto our server.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
