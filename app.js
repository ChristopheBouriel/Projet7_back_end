const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');

const connexion = require('./dataBaseAccess');

//const path = require('path');
const helmet = require('helmet');
//require('dotenv').config();

//const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

app.use(helmet());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use(bodyParser.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/publications', (req, res, next) => {
  connexion.query(`SELECT * FROM publications`, (err, result) => {
    return res.send(result);
  })
});

app.use('/api/auth', userRoutes);

module.exports = app;