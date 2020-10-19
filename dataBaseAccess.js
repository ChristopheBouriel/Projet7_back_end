const mysql = require('mysql');
require('dotenv').config();

const connexion = mysql.createConnection(
    
    { host: 'localhost',
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS
      
    });

connexion.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données');
});


module.exports = connexion;