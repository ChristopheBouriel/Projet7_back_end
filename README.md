1. Création de la base de donnée SQL :

	CREATE DATABASE Groupomania ;

	CREATE TABLE users (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		userId VARCHAR(60) NOT NULL,
		userName VARCHAR(40) NOT NULL,
		userPassword CHAR(60) NOT NULL,
		firstname VARCHAR(40) NOT NULL,
		lastmane VARCHAR(40) NOT NULL,
		service VARCHAR(30) NOT NULL,
		email VARCHAR(40) NOT NULL,
		aboutMe VARCHAR(40) NOT NULL,
		isMod BOOLEAN DEFAULT 0,
		date_logout DATETIME,	
		PRIMARY KEY (id)
	)ENGINE=INNODB DEFAULT CHARSET=utf8;

	CREATE TABLE publications (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		userId VARCHAR(60) NOT NULL,
		date_publication DATETIME NOT NULL,
		title VARCHAR(60) NOT NULL,
		content TEXT NOT NULL,
		numberComments INT DEFAULT 0,
		userName VARCHAR(40) NOT NULL,
		modified BOOLEAN DEFAULT 0,
		date_modif DATETIME,
		moderated BOOLEAN DEFAULT 0,
		viewed BOOLEAN DEFAULT 1,
		PRIMARY KEY (id)
	)ENGINE=INNODB DEFAULT CHARSET=utf8;

	CREATE TABLE comments (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		userId VARCHAR(60) NOT NULL,
		postId INT NOT NULL,
		date_comment DATE,
		content TEXT NOT NULL,
		userName VARCHAR(40) NOT NULL,
		modified BOOLEAN DEFAULT 0,
		date_modif DATETIME,
		moderated BOOLEAN DEFAULT 0,
		PRIMARY KEY (id)
	)ENGINE=INNODB; DEFAULT CHARSET=utf8;


2. Création du fichier .env :

	Ci-dessous les noms de variables utilisées par le back-end :
	DB_USER='votre nom d'utilisateur'
	DB_PASS='votre mot de passe'
	DB_NAME=groupomania
	DB_TOK='votre chaîne de caractères pour le token'

3. Pour démarrer le serveur, une fois dans le dossier Back-end, lancer la commande : node server
