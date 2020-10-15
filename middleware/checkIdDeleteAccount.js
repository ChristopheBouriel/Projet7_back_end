
const jwt = require('jsonwebtoken');
const connexion = require('../dataBaseAccess');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const userId = decodedToken.userId;

    connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
            const userIdCheck = result[0].userId;
            if ( userIdCheck === userId) {
            next()
            } else {
                res.status(400).send({message:"problème d'identification"});
          }
        }
    })
};