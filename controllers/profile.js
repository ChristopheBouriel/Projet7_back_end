const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');



exports.seeProfile = (req, res, next) => {
  connexion.query(`SELECT userName, firstname, lastname, service, email, aboutMe FROM users WHERE userName = ?`, [req.params.userName], (error, result)=>{
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
        const userInfos = result;
        connexion.query(`SELECT * FROM publications WHERE userName = ?`, [req.params.userName], (error, result)=>{
                                            if(error) {res.status(500).send(error.sqlMessage)}
                                            else{
                                              const response = {userInfos, result} 
                                              res.send(response)}
                                            })
    } 
  })
}

exports.modifyProfile = (req, res, next) => {
    const firstname = xssFilters.inHTMLData(req.body.firstname);
    const lastname = xssFilters.inHTMLData(req.body.lastname);
    const userName = xssFilters.inHTMLData(req.body.userName);
    const service = xssFilters.inHTMLData(req.body.service);
    const email = req.body.email;
    const aboutMe = xssFilters.inHTMLData(req.body.aboutMe);
    connexion.query(`UPDATE users SET firstname='${firstname}', lastname='${lastname}', 
    userName='${userName}', service='${service}', email='${email}', aboutMe='${aboutMe}' 
    WHERE userName='${userName}'`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                    
        }
    })  
}

