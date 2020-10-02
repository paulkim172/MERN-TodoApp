const {URI} = require('./credentials.js');
const mongoose = require('mongoose');
const express = require('express');

const {} = require('./mongoose/mongooseCRUD')

const app = express()
const port = 3000

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});

//express 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//mongoose

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!')
});

//current user, list, item, etc.

let currentUser = '';
let currentList = '';
let currentItem = '';