const connexion = require('../dataBaseAccess');


exports.getAllPublications = (req, res, next) => {
    connexion.query(`SELECT * FROM publications`, (err, result) => {
        res.send(result);
    })
  };