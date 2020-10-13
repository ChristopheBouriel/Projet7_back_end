const connexion = require('../dataBaseAccess');


exports.getAllPublications = (req, res, next) => {
    connexion.query(`SELECT * FROM publications ORDER BY date_publication DESC`, (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {res.status(200).send(result);                                  
      }
    })
  };

exports.getOnePublication = (req, res, next) => {
    connexion.query(`SELECT * FROM publications WHERE id = ?`, [req.params.id], (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {res.status(200).send(result);                                  
      }
    })
  };