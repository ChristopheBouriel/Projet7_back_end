const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');


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

exports.addPublication = (req, res, next) => {

    connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
          else {
          const userId = result[0].userId;
          const title = xssFilters.inHTMLData(req.body.title.replace(/\"/gi,'&µ'));
          const userName = xssFilters.inHTMLData(req.body.userName);
          const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
          const date_publication = xssFilters.inHTMLData(req.body.date_publication);

          connexion.query(`INSERT INTO publications (userId, title, userName, content, date_publication) VALUES (?,?,?,?,?)`, 
            [userId, title, userName, content, date_publication], (error, result)=>{
                if(error) {res.status(500).send(error.sqlMessage)}
                else {res.status(201).send({message:"Publication added"})}          
          })
          }
    })
};

exports.modifyPost = (req, res, next) => {
  //const publication = .replace(/\"/gi,'&µ')
  const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
  const modified = xssFilters.inHTMLData(req.body.modified);
  const date_modif = xssFilters.inHTMLData(req.body.date_modif);
  const id = xssFilters.inHTMLData(req.body.postId);
  const title = xssFilters.inHTMLData(req.body.title.replace(/\"/gi,'&µ'));
  connexion.query(`UPDATE publications SET title="${title}", content="${content}", modified="${modified}", date_modif="${date_modif}" WHERE id="${id}"`, (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {res.status(200).send({message:"Update done"})                                 
      }
  })  
};

exports.deletePost = (req, res, next) => {
  connexion.query(`DELETE FROM publications WHERE id=?`,[req.body.postId], (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {
          connexion.query(`DELETE FROM comments WHERE postId = ?`, [req.body.postId], (error, result) => {
              if (result) {res.status(200).send({message:"Publication deleted"});}
                                              if (error) {res.status(500).send(error);}
                                              })                                           
      }
  })  
};


