//const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../dataBaseAccess');
//require('dotenv').config();

exports.signup = (req, res, next) => {
    let user;
    bcrypt.hash(req.body.userPassword, 10)
      .then(hash => {
        user = {
            userId: req.body.userId,
            userName: req.body.userName,
            userPassword: hash,
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            service: req.body.service,
            email: req.body.email,
            aboutMe: req.body.aboutMe
        }; 
        console.log(user);
        connexion.query(
            `INSERT INTO users (userName, userPassword, firstname, lastname, service, email, aboutMe) VALUES(
                ?,?,?,?,?,?,?)`, [ user.userName, user.userPassword, user.firstname, user.lastname, user.service, user.email, user.aboutMe],
                (error, result) => {
                  if(error) {
                    res.send(error.sqlMessage)
                  } else {
                    res.send({message:"Insertion réussie"})
                  }
                 
                }
        )
         }).catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    connexion.query(
        `SELECT * FROM users WHERE userName = ?`, [req.body.userName],
        (error, user) => {
        if (!user[0]) {
          return res.status(400).send({ error: 'Utilisateur non trouvé !' });
        };
        console.log(user[0]);
        bcrypt.compare(req.body.userPassword, user[0]['userPassword'])
          .then(valid => {
            if (!valid) {
              return res.status(400).send({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user[0].userId,
              userName: user[0].userName,
              token: jwt.sign(
                { userId: user[0].userId },
                'provisory_token',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
        }  
    )
      //.catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  connexion.query(`SELECT userName, firstname, lastname, service FROM users ORDER BY userName`, (err, result) => {
      res.send(result);
  })
};