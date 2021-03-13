# About this repo :

This is the back-end for a company's social network app which has been made with Node.js and Express, as part of the final project for my Junior Web Develepper training.  
You'll find the repository of the front-end by following this link :  
https://github.com/ChristopheBouriel/SharePlace-Evolution-UI.git  

You can get more informations about this project and this app in my portfolio :  
https://portfolio-christophe-bouriel.netlify.app  


## The API

In order to have a back-end as safe as I could given my knowledge on the moment, I tried to follow the recommendations of OWASP concerning the points on which the developper can take part. 
I installed packages downloaded from the npm registry, I wrote my own middlewares for user's inputs validation, but I also added verifications on most of the routes depending on the type of the request : for example, in order to be sure that the user wanting to modify or delete a publication, a comment or a profile, is the same one who created it.  
You can find all the instructions for the MySQL database in the file named sample.sql in the root folder.


## The packages for security

The following packages have been used :
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [xss-filters](https://www.npmjs.com/package/xss-filters)
* [helmet](https://www.npmjs.com/package/helmet)


## The whole app

However, I already deployed the whole app on Internet so that you can directly use it :
https://shareplace-evo.netlify.app


# Instructions :

1. Start an instance on a MySQL server and create the database. You can find all the instructions for the MySQL database in the file named sample.sql in the root folder.  


2. Clone this repo :  
`git clone https://github.com/ChristopheBouriel/SharePlace-Evolution-API.git`

2. Enter inside the root folder of the project, create a .env file and copy the following variables :
	DB_USER='your username'  
	DB_PASS='your password'  
	DB_NAME=groupomania  
	DB_TOK='your string for the token'  

3. In your terminal, enter inside the root folder of the project :  
`cd Projet7_back_end`

3. Then type the command bellow :  
`npm install`

4. Wait for everything to be installed, then type :  
`node server`

