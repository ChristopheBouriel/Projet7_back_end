const connexion = require('../dataBaseAccess');


exports.getAllComments = (req, res, next) => {
    connexion.query(`SELECT * FROM comments WHERE postId = ?`, [req.body.publicationId], (error, result) => {
        if(error) {
            res.status(500).send(error.code)
        }
        res.status(200).send(result);
    })
  };

exports.addComment = (req, res, next) => {
    connexion.query(`INSERT INTO comments (userId, postId, userName, content, date_comment) VALUES (?,?,?,?,?)`, [req.body.userId, req.body.postId, req.body.userName, req.body.content, req.body.date_comment], (error, result)=>{
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
    const content = req.body.content;
    const modified = req.body.modified;
    const date_modif = req.body.date_modif;
    const id = req.body.commentId;
    connexion.query(`UPDATE comments SET content='${content}', modified='${modified}', date_modif='${date_modif}' WHERE id='${id}'`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                 
        }
    })  
};
