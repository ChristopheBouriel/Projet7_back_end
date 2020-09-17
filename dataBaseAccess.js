const mysql = require('mysql');


const connexion = mysql.createConnection(
    { host: 'localhost',
      user: 'root',
      database: 'groupomania',
      password: '4bluETa02#L€n5'
    });

connexion.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données');
});


module.exports = connexion;