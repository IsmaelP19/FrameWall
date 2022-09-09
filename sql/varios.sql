/* Devuelve el número de fotos de cada categoría. Si no tiene fotos, la categoría no aparece en la tabla */
SELECT categories.catName, COUNT(*) FROM categoriesphotos NATURAL JOIN categories GROUP BY categories.catName;


/* Devuelve las categorías asociadas a un $photoId; en este caso, el $photoId es 1 */
SELECT * FROM categoriesphotos NATURAL JOIN categories WHERE photoId = 1;


/* Vista para obtener los nombres de las personas a las que sigue el usuario = $userId */


/* Obtener las fotos de las personas a las que sigo *NO COMPLETADO* */
SELECT userId1, userId2, name FROM followers NATURAL JOIN users NATURAL JOIN photos GROUP BY userId2;

/* Devuelve las fotos del userId = $userId */
SELECT * FROM users NATURAL JOIN photos WHERE userId = 1;

SELECT * FROM Users WHERE userId = 1;

SELECT AVG(VALUE) AS media FROM evaluations WHERE photoId = 18;

/* Obtener el número de fotos del user con userId = $userId */ 
SELECT COUNT(*) FROM users NATURAL JOIN photos WHERE userId=1;

SELECT userId FROM photos WHERE photoId = 15;

/* Devolver las fotos dada su categoría (categoryId = $categoryId) */
SELECT * FROM photos NATURAL JOIN categoriesphotos NATURAL JOIN categories WHERE catName = 'Arquitectura';

/* Devolver los comentarios de una foto a partir de su photoId */

/* MAL
SELECT commentId, photos.photoId, comments.userId, TEXT, commentDate, users.userName, users.profilePhotoLink 
		FROM comments JOIN photos JOIN users ON users.userId = comments.userId WHERE photos.photoId = 11 ORDER BY commentDate DESC;
*/
		
SELECT commentId, comments.photoId, comments.userId, TEXT, commentDate, users.userName, users.profilePhotoLink
		FROM comments NATURAL JOIN users WHERE comments.photoId = 11 ORDER BY commentDate DESC;
		
INSERT INTO evaluations(photoId, userId, value) VALUES
	(11, 10, 3);
	
	
	
/* Devolver el número de seguidores que tengo */
SELECT COUNT(*) FROM followers WHERE followers.userId2 = 1;

/* Devolver el número de personas a las que sigo */
SELECT COUNT(*) FROM followers WHERE followers.userId1 = 1;

/* Devolver el número de fotos que tengo publicadas */
SELECT COUNT(*) FROM photos WHERE photos.userId = 1;

/* Devolver los seguidores que siguen al userId dado en la clasusula where */
SELECT userName, NAME, surnames, mail, profilePhotoLink  FROM followers JOIN users ON followers.userId1 = users.userId WHERE followers.userId2 = 1;




SELECT * FROM categories NATURAL JOIN categoriesphotos NATURAL JOIN photos;

SELECT categoryId FROM categories WHERE catName = 'Arquitectura';

DELETE FROM CategoriesPhotos WHERE categoryPhotoId = 13;

UPDATE photos 
SET userId = 17, title = 'Mona Lisa to chula', description = 'Cuadro de la Mona Lisa to retocao', 
link = 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv', 
visibility = 'Privada' WHERE photoId = 19;


SELECT  GROUP_CONCAT(DISTINCT LOWER(unsuitableWords.word) SEPARATOR '|') FROM unsuitablewords;


INSERT INTO comments(photoId, userId, text, commentDate) VALUES
	(11, 4, 'Puta', DEFAULT);
	
	
SELECT * FROM users NATURAL JOIN publicPhotos WHERE userId = $userId   ORDER BY uploadingDate DESC;