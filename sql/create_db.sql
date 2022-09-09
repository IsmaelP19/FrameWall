
DROP TABLE if EXISTS CategoriesPhotos;
DROP TABLE if EXISTS UnsuitableWords;
DROP TABLE if EXISTS Categories;
DROP TABLE if EXISTS Comments;
DROP TABLE if EXISTS Evaluations;
DROP TABLE if EXISTS Photos;
DROP TABLE if EXISTS Followers;
DROP TABLE if EXISTS Users;



CREATE TABLE Users (

	userId INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	surnames VARCHAR(60) NOT NULL,
	phone VARCHAR(9) NOT NULL,
	mail VARCHAR(100) UNIQUE NOT NULL UNIQUE,
	userName VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	profilePhotoLink VARCHAR(300) DEFAULT 'https://i.ibb.co/3rkP1Fh/logo-person2.png' NOT NULL,
	
	PRIMARY KEY (userId),
	
	CONSTRAINT invalidMail CHECK ((POSITION('.' IN mail) > POSITION('@' IN mail)) AND POSITION('@' IN mail)>0)

);


CREATE TABLE Followers (
	
	followerId INT NOT NULL AUTO_INCREMENT,
	userId1 INT NOT NULL,
	userId2 INT NOT NULL,
	
	PRIMARY KEY (followerId),
	UNIQUE(userId1, userId2),
	
	CONSTRAINT invalidFollower CHECK (userId1 != userId2)
	/* Un usuario no puede seguirse a sí mismo */

);


CREATE TABLE Photos (
	
	photoId INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	title VARCHAR(40) NOT NULL,
	description VARCHAR(240) NOT NULL,
	link VARCHAR(300) NOT NULL,
	visibility VARCHAR(10) NOT NULL,
	uploadingDate DATETIME DEFAULT CURRENT_TIMESTAMP(),
	
	PRIMARY KEY (photoId),
	
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE	/* si elimino un usuario, elimino todas sus fotos */
	

);


CREATE TABLE Evaluations ( 
	
	evaluationId INT NOT NULL AUTO_INCREMENT,
	photoId INT NOT NULL,
	userId INT NOT NULL,
	evaluationDate DATETIME DEFAULT CURRENT_TIMESTAMP(),
	value INT NOT NULL,
	
	PRIMARY KEY (evaluationId),
	
	CONSTRAINT duplicatedEvaluation UNIQUE (photoId, userId),
	
	
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE ON UPDATE CASCADE,
	/* Si eliminamos una foto se elimina la valoración, y si se actualiza también, pues al actualizar realmente
		se puede cambiar la foto (url) */
	
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE,
	/* Si eliminamos un usuario, eliminamos todas sus valoraciones */
	
	CONSTRAINT invalidValue CHECK (value>=1 AND value<=5)
	
);


CREATE TABLE Comments ( 
	
	commentId INT NOT NULL AUTO_INCREMENT,
	photoId INT NOT NULL,
	userId INT NOT NULL,
	text VARCHAR(140) NOT NULL,
	commentDate DATETIME DEFAULT CURRENT_TIMESTAMP(),
	
	PRIMARY KEY (commentId),
	
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE ON UPDATE CASCADE,
	
	FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE

);



CREATE TABLE Categories (
	
	categoryId INT NOT NULL AUTO_INCREMENT,
	catName VARCHAR(20) NOT NULL UNIQUE,
	
	PRIMARY KEY (categoryId),
	
	CONSTRAINT notValid CHECK (LENGTH(catName)>= 3)

);



CREATE TABLE UnsuitableWords (
	
	unsuitableWordId INT NOT NULL AUTO_INCREMENT,
	word VARCHAR(20) NOT NULL UNIQUE,
	
	PRIMARY KEY (unsuitableWordId)


);


CREATE TABLE CategoriesPhotos (
	
	categoryPhotoId INT NOT NULL AUTO_INCREMENT,
	photoId INT NOT NULL,
	categoryId INT NOT NULL,
	
	PRIMARY KEY (categoryPhotoId),
	
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE,
	FOREIGN KEY (categoryId) REFERENCES Categories (categoryId) ON DELETE CASCADE,
	
	UNIQUE (photoId, categoryId)



);


CREATE OR REPLACE VIEW publicPhotos AS
	SELECT * FROM photos WHERE visibility = 'Pública';
	

