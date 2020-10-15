const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');


exports.getAllComments = (req, res, next) => {
    connexion.query(`SELECT * FROM comments WHERE postId = ?`, [req.body.publicationId], (error, result) => {
        if(error) {
            res.status(500).send(error.code)
        }
        res.status(200).send(result);
    })
  };

exports.addComment = (req, res, next) => {

    connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          const userId = result[0].userId;
          const postId = xssFilters.inHTMLData(req.body.postId);
          const userName = xssFilters.inHTMLData(req.body.userName);
          const content = xssFilters.inHTMLData(req.body.content);
          const date_comment = xssFilters.inHTMLData(req.body.date_comment);

          connexion.query(`INSERT INTO comments (userId, postId, userName, content, date_comment) VALUES (?,?,?,?,?)`, 
            [userId, postId, userName, content, date_comment], (error, result)=>{
                if(error) {res.status(500).send(error.sqlMessage)}
                else {
                    connexion.query(`UPDATE publications 
                        SET numberComments = numberComments + 1
                        WHERE id = ?`, [req.body.postId],(error, result)=>{
                                                        if(error) {res.status(500).send(error.sqlMessage)}
                                                        else{res.status(201).send({message:"Comment added"})}
                                                        })
                } 
            })
        }
      })
};

exports.deleteComment = (req, res, next) => {
    connexion.query(`DELETE FROM comments WHERE id=?`,[req.body.id], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
            connexion.query(`UPDATE publications 
                SET numberComments = numberComments - 1
                WHERE id = ?`, [req.body.postId], (error, result) => {
                                                if (result) {res.status(200).send({message:"Comment deleted"});}
                                                if (error) {res.status(500).send(error);}
                                                })
        }
    })  
};

exports.modifyComment = (req, res, next) => {
    const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
    const modified = xssFilters.inHTMLData(req.body.modified);
    const date_modif = xssFilters.inHTMLData(req.body.date_modif);
    const id = xssFilters.inHTMLData(req.body.commentId);
    connexion.query(`UPDATE comments SET content="${content}", modified="${modified}", date_modif="${date_modif}" WHERE id="${id}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                 
        }
    })  
};
