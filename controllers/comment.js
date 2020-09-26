const connexion = require('../dataBaseAccess');


exports.getAllComments = (req, res, next) => {
    connexion.query(`SELECT * FROM comments WHERE postId = ?`, [req.body.publicationId], (err, result) => {
        if(err) {
            res.send(err.code)
        }
        res.send(result);
    })
  };

exports.addComment = (req, res, next) => {
    connexion.query(`INSERT INTO comments (userId, postId, userName, content, date_comment) VALUES (?,?,?,?,?)`, [req.body.userId, req.body.postId, req.body.userName, req.body.content, req.body.date_comment], (error, result)=>{
        if(error) {res.send(error.sqlMessage)}
        else {
            connexion.query(`UPDATE publications 
                SET numberComments = numberComments + 1
                WHERE id = ?`, [req.body.postId],(error, result)=>{
                                                if(error) {res.send(error.sqlMessage)}
                                                else{res.send({message:"Done"})}
                                                })
        } 
    })
};

exports.deleteComment = (req, res, next) => {
    
    connexion.query(`DELETE FROM comments WHERE id=?`,[req.body.id], (error, result) => {
        if(error) {res.send(error.sqlMessage)}
        else {
            connexion.query(`UPDATE publications 
                SET numberComments = numberComments - 1
                WHERE id = ?`, [req.body.postId], (err, result) => {
                                                if (result) {res.send({message:"Done"});}
                                                if (err) {res.send(err);}
                                                })
        }

    })  
};

  
