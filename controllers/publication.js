const connexion = require('../dataBaseAccess');


exports.getAllPublications = (req, res, next) => {
    connexion.query(`SELECT * FROM publications ORDER BY date_publication DESC`, (err, result) => {
        res.send(result);
    })
  };

exports.getOnePublication = (req, res, next) => {
    connexion.query(`SELECT * FROM publications WHERE id = ?`, [req.params.id], (err, result) => {
        res.send(result);
    })
  };