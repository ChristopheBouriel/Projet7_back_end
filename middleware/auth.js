const jwt = require('jsonwebtoken');
require('dotenv').config();
const connexion = require('../dataBaseAccess');


module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOK);
  const userId = decodedToken.userId;
  console.log(userId)

  connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {
        console.log(result)
          const userIdCheck = result[0].userId;
          if ( userIdCheck === userId) {
          next()
          } else {
              res.status(400).send({message:"problème d'identification"});
        }
      }
  })
};