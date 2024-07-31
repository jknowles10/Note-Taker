const express = require('express');
const fs = require('fs');
const path = require('path');

const db = require('./db/db.json');

const PORT = 3001; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//GET route for landing page
//app.get('*', (req, res) => {
//res.sendFile(path.join(__dirname, '/public/index.html'));
 //});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
   });


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
   });
//GET request for notes
app.get('/api/notes', (req, res) => res.json(db)
); 

app.post('/api/notes', (req, res) => {
    
// destructuring 
    const { title, text } = req.body;
// });
    if (title && text) {
const newNote = {
    title, 
    text,
    id: Math.floor(Math.random()*100), 
};

db.push(newNote);

 noteString = JSON.stringify(db);

fs.writeFile('./db/db.json', noteString, (err) =>
err
? console.error(err)
: console.log('Note saved!'));

const response = {
    status: 'success', 
    body: newNote,
};

console.log(response);
res.status(201).json(response);
} else {
    res.status(500).json('Error saving Note');

}});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});