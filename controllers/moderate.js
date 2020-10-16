const connexion = require('../dataBaseAccess');

exports.moderatePublication = (req, res, next) => {
    const id = req.body.postId;
    const moderate = req.body.moderated;
    //userName pour vérification admin
    connexion.query(`UPDATE publications SET moderated="${moderate}" WHERE id="${id}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Publication modérée"})                                 
        }
    })
}

exports.moderateComment = (req, res, next) => {
    const id = req.body.commentId;
    const moderate = req.body.moderated;
    connexion.query(`UPDATE comments SET moderated="${moderate}" WHERE id="${id}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Commentaire modéré"})                                 
        }
    })
}

