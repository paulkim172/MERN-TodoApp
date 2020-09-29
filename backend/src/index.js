const {URI} = require('./credentials.js');
const mongoose = require('mongoose');
const express = require('express');

const app = express()
const port = 3000

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!')
});

