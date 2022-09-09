/* Limitación del número de fotos de cada usuario */




DELIMITER //
CREATE OR REPLACE TRIGGER triggerMaxPhotosInsertframewall
AFTER INSERT ON photos
FOR EACH ROW
BEGIN
	DECLARE usId INT;
	DECLARE currentPhotos INT;
	
	SET usId = (SELECT userId FROM photos WHERE photoId = new.photoId);
	SET currentPhotos = (SELECT COUNT(*) FROM users NATURAL JOIN photos WHERE userId=usId);
	/* currentPhotos son las que tenía antes + la que acabo de subir (por ser after) */
	
	IF(currentPhotos > 50) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
			'Un usuario no puede tener más de 50 fotos subidas a la base de datos.';
	END IF;
	
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER triggerMaxPhotosUpdate
AFTER Update ON photos
FOR EACH ROW
BEGIN
	DECLARE usId INT;
	DECLARE currentPhotos INT;
	
	SET usId = (SELECT userId FROM photos WHERE photoId = new.photoId);
	SET currentPhotos = (SELECT COUNT(*) FROM users NATURAL JOIN photos WHERE userId=usId);
	/* currentPhotos son las que tenía antes + la que acabo de subir (por ser after) */
	
	IF(currentPhotos > 50) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
			'Un usuario no puede tener más de 50 fotos subidas a la base de datos.';
	END IF;
	
END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER deletePhotoWithComments
BEFORE DELETE ON photos
FOR EACH ROW
BEGIN 

	DECLARE currentComments INT;
	
	SET currentComments = (SELECT COUNT(*) FROM comments WHERE photoId = old.photoId);
		
	IF(currentComments > 0) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
			'No se puede eliminar una foto que tenga comentarios asociados.';
	END IF;

END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER changeVisibilityOfPhotoWithComments
BEFORE UPDATE ON photos
FOR EACH ROW
BEGIN
	
	DECLARE currentComments INT;
	SET currentComments = (SELECT COUNT(*) FROM comments WHERE photoId = NEW.photoId);
	
	IF(NEW.visibility = 'Privada' AND currentComments > 0 ) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'No puedes poner privada una foto que ya tiene comentarios.';
	END IF;
END //
DELIMITER ;



-- RN-B07: Uso de lenguaje adecuado en los comentarios

DELIMITER //
CREATE OR REPLACE TRIGGER triggerUnsuitableWordsOnComments

    BEFORE INSERT ON Comments FOR EACH ROW 

    BEGIN 

        DECLARE awfulWords VARCHAR(10000);

        SET awfulWords = (SELECT  GROUP_CONCAT(DISTINCT LOWER(word) SEPARATOR '|') FROM unsuitableWords);

        IF(LOWER(NEW.text) REGEXP awfulWords) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
            	'No puedes publicar un comentario con palabras inapropiadas.';

        END IF;

    END //
DELIMITER ;



-- RN-C02: Uso de lenguaje adecuado en título y descripción

DELIMITER //
CREATE OR REPLACE TRIGGER triggerUnsuitableWordsOnTitleAndDescription

    BEFORE INSERT ON Photos FOR EACH ROW 

    BEGIN 

        DECLARE unsuitableWords VARCHAR(10000);

        SET unsuitableWords = (SELECT  GROUP_CONCAT(DISTINCT LOWER(word) SEPARATOR '|') FROM unsuitableWords);

        IF(LOWER(NEW.title) REGEXP unsuitablewords OR LOWER(NEW.description) REGEXP unsuitableWords) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
            	'No puedes publicar una foto con palabras inapropiadas en título y/o descripción.';

        END IF;

    END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER triggerUnsuitableWordsOnTitleAndDescriptionUpdate

    BEFORE UPDATE ON Photos FOR EACH ROW 

    BEGIN 

        DECLARE unsuitableWords VARCHAR(10000);

        SET unsuitableWords = (SELECT  GROUP_CONCAT(DISTINCT LOWER(word) SEPARATOR '|') FROM unsuitableWords);

        IF(LOWER(NEW.title) REGEXP unsuitablewords OR LOWER(NEW.description) REGEXP unsuitableWords) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
            	'No puedes publicar una foto con palabras inapropiadas en título y/o descripción.';

        END IF;

    END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER triggerUniqueCategoryName

	BEFORE INSERT ON categories FOR EACH ROW 
	
	BEGIN 
	
		DECLARE numCats INT;
		
		SET numCats = (SELECT COUNT(*) FROM categories WHERE catName = NEW.catName);
		
		IF(numCats>=1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'La categoría que intentas añadir ya está en la base de datos.';
				
		END IF;	
	
	END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER triggerUniqueMail
	BEFORE INSERT ON users FOR EACH row
	
	BEGIN
	
		DECLARE numMails INT;
		
		SET numMails = (SELECT COUNT(*) FROM users WHERE mail = NEW.mail);
		
		IF(numMails>=1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'El email que ha introducido ya está asociado a una cuenta en FrameWall. ¿Por qué no prueba a iniciar sesión?';
		END IF;
		
	END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER triggerUniqueUserName
	BEFORE INSERT ON users FOR EACH row
	
	BEGIN
	
		DECLARE numUsers INT;
		
		SET numUsers = (SELECT COUNT(*) FROM users WHERE userName = NEW.userName);
		
		IF(numUsers>=1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'El nombre de usuario que ha introducido ya está asociado a una cuenta en FrameWall. ¿Por qué no prueba a iniciar sesión?';
		END IF;
		
	END //
DELIMITER ;



DELIMITER //
CREATE OR REPLACE TRIGGER visibilityCheckPost
	BEFORE INSERT ON photos FOR EACH ROW 
	
	BEGIN 
		
		IF(NEW.visibility NOT IN ('Pública', 'Privada')) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
				'Debes elegir una opción correcta de visibilidad';
		END IF;
	
	END //

DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER visibilityCheckUpdate
	BEFORE UPDATE ON photos FOR EACH ROW 
	
	BEGIN 
		
		IF(NEW.visibility NOT IN ('Pública', 'Privada')) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
				'Debes elegir una opción correcta de visibilidad';
		END IF;
	
	END //

DELIMITER ;

	