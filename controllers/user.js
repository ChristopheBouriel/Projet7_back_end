//const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../dataBaseAccess');
const { v4: uuidv4} = require('uuid');
//require('dotenv').config();

exports.signup = (req, res, next) => {
    const userId = uuidv4();
    let user;
    bcrypt.hash(req.body.userPassword, 10)
      .then(hash => {
        user = {
            userId: userId,
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
            `INSERT INTO users (userId, userName, userPassword, firstname, lastname, service, email, aboutMe) VALUES(
                ?,?,?,?,?,?,?,?)`, [ user.userId, user.userName, user.userPassword, user.firstname, user.lastname, user.service, user.email, user.aboutMe],
                (error, result) => {
                  if(error) {
                    res.status(500).send(error.sqlMessage)
                  } else {
                    res.status(201).send({message:"Création réussie"})
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
    )   //.catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  connexion.query(`SELECT userName, firstname, lastname, service FROM users ORDER BY userName`, (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {res.status(200).send(result);                                  
    }
  })
};

exports.modifyPassword = (req, res, next) => {
  let password 
  bcrypt.hash(req.body.userPassword, 10)
  .then(hash => {
    password = hash
    const email = req.body.email;
  connexion.query(`UPDATE users SET userPassword='${password}' 
    WHERE email='${email}'`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                    
        }
    })  
    }
    )  
};

exports.modifyUserName = (req, res, next) => {
  const userName = req.body.userName;
  //const email = req.body.email;
  
  connexion.query(`SELECT userId FROM users WHERE email = ?`, [req.body.email], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
      const userId = result[0];

      connexion.query(`UPDATE users SET userName='${userName}' 
        WHERE userId='${userId.userId}'`, (error, result) => {
          if(error) {res.status(500).send(error.sqlMessage)}
          else {
            connexion.query(`UPDATE publications SET userName='${userName}' 
              WHERE userId='${userId.userId}'`, (error, result) => {
            if(error) {res.status(500).send(error.sqlMessage)}
            else {
              connexion.query(`UPDATE comments SET userName='${userName}' 
              WHERE userId='${userId.userId}'`, (error, result) => {
                if (result) {res.status(200).send({message:"Update done"});}
                if (error) {res.status(500).send(error);}
              })
            }
            })
          }
        })
    }
  })  
};

exports.deleteUserAccount = (req, res, next) => {
  connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
      const userId = result[0];
      connexion.query(`DELETE FROM users WHERE userId=?`,[userId.userId], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          connexion.query(`DELETE FROM publications WHERE userId=?`,[userId.userId], (error, result) => {
          if(error) {res.status(500).send(error.sqlMessage)}
          else {
            connexion.query(`UPDATE comments 
                SET userName = 'utilisateur désinscrit'
                WHERE userId = ?`, [userId.userId], (error, result) => {
                  if (result) {res.status(200).send({message:"User deleted"});}
                  if (error) {res.status(500).send(error);}
            })
          }
          })
        }
      })
    }
  })
};

exports.testU = (req, res, next) => {
  let checkIfExists =[];
  connexion.query(`SELECT userName FROM users`, (error, result) => {
    for (i of result) {
      checkIfExists.push(i.userName)
    }
    const ooo = checkIfExists.includes(req.body.userName);
    
    if (ooo === false) {

      if (!req.body.userPassword) {
        this.modifyUserName(req, res);
      } else {
        this.signup(req, res);
      }
    } else {
      res.status(400).send({message:"User already exists"})
    }
  })
};

