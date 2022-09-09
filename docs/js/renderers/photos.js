" use strict ";
import { usersAPI } from "../api/users.js";
import { categoriesAPI } from "../api/cats.js";
import { parseHTML } from "/js/utils/parseHTML.js";
import { catRenderer } from "./categories-rend.js";
import { messageRenderer } from "./messages.js";
import { photosAPI } from "../api/photos.js";
import { commentRenderer } from "./comment-rend.js"
import { sessionManager } from "../utils/session.js";

const photoRenderer = {
    asCard: function(photo) {
        let html = `
                <a class="grid-gallery__item" href="view-photo.html?photoId=${photo.photoId}">
                <img class="grid-gallery__image" src="${photo.link}" id="foto${photo.photoId}" alt="${photo.description}">
                </a>
                `;


        let card = parseHTML(html);
        return card;
    },


    asDetails: function(photo) {
        let html = `    
        <div>
            <div class="container-flex jus">
                <div>
                    <img class="preview-photo" src="${photo.link}" id="preview-photo" alt="${photo.description}">
                </div>

                <div class="photo-details-container">
                    <p>Autor/a:<a href="" class="link-profile user-name"></a> </p>
                    <p>Fecha:<span id="uploadingDate"></span> </p>
                    <p>Título:<span>${photo.title}</span> </p>
                    <p>Descripción:<span>${photo.description}</span></p>
                    <p>Puntuación:<span id="score"></span> </p>
                    <p>Visibilidad:<span>${photo.visibility}</span> </p>
                    <!-- En fotos ajenas, siempre aparecerá como pública -->
                    
                    <p id="category-span" class="less-margin-bottom">Categoría: <span id="emtpy-categories"></span></p>
                    <div class="container-flex jus" id="cat-container">

                    
                    </div>

                </div>

            </div>


            
        </div>
    `;

        let photoDetails = parseHTML(html);
        loadUsernameCard(photoDetails, photo.userId);
        loadUploadingDate(photoDetails, photo.uploadingDate);
        loadAverageScore(photoDetails, photo.photoId)
        loadCategories(photoDetails, photo.photoId);
        loadComments(document, photo.photoId); // document porque el div de comments no está en el renderizador, sino en el html

        return photoDetails;
    },

    asButtons: function() {
        let html =
            `
            <div class="container-flex space-btwn" id="delete-btn">

                <div class="cd-popup" role="alert">
                    <div class="cd-popup-container">
                        <h5>¿De verdad quieres eliminar tu imagen?</h5>
                        <ul class="cd-buttons">
                            <li><a href="#0" id="button-delete">Sí</a></li>
                            <li><a href="#0" class="close-popup">No</a></li>
                        </ul>
                        <a href="#0" class="cd-popup-close img-replace">Close</a>
                    </div>
                </div>

                <button class="button-menu1 size-btn cd-popup-trigger">
                    <a href="#" class="cd-popup-trigger">Eliminar</a>
                </button>

                <button class="button-menu1 size-btn" id="button-edit" onclick="location.href='edit-photo.html'">
                    <a href="edit-photo.html" class="text1">Editar</a>
                </button>


            </div>
            `;

        let buttons = parseHTML(html);
        return buttons;
    },

    asProfileGallery: function(photo) {
        let html =
            `
        <div>
            <a href="view-photo.html?photoId=${photo.photoId}">
                <img class="img-item" src="${photo.link}" id="${photo.photoId}" alt="${photo.description}">
            </a>
        </div>
        `;

        let profileGallery = parseHTML(html);

        return profileGallery;
    },


    asCatGallery: function(array) {
        let html =
            `
            <div>
                <div class="row">
                    <div class="col-1 col-sm-2 col-md-4 col-lg-3 col-xl-3"></div>
                    <div class="col-10 col-sm-8 col-md-6 col-lg-6 col-xl-6">
                        <div class="contenedor">

                            <span class="title" id="cat-title">${array[0].catName}</span>

                        </div>
                    </div>
                    <div class="col-1 col-sm-2 col-md-4 col-lg-3 col-xl-3 "></div>
                </div>


                <!--Fotos de la galería-->
                <div class="row">
                    <div class="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>

                    <div class="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <div class="grid-gallery" id="category-gallery">


                        </div>
                    </div>

                    <div class="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                </div>
            </div>
        `;
        let body = parseHTML(html);
        loadCategoryPhotos(body, array[0].catName);
        return body;
    }


};


function loadUsernameCard(card, userId) {

    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].userName;
            let p = card.querySelector(".user-name");
            p.textContent = "@" + username;
            p.href = "profile.html?userId=" + userId;



        });
}

function loadUploadingDate(card, uploadingDate) {


    let span = card.querySelector("#uploadingDate");
    let date = new Date(uploadingDate);
    span.textContent = date.toLocaleString();

}

function loadAverageScore(card, photoId) {

    photosAPI.getAverageScore(photoId)
        .then(scores => {
            let avgScore = scores[0].media;
            let span = card.querySelector("#score");
            if (avgScore === null) { // de esta forma, si no tiene ninguna valoración, la puntuación será 0
                span.textContent = "-";

            } else {
                span.textContent = avgScore.toFixed(2); //toFixed(N) redondea, tomando N decimales
            }

        })
}

function loadCategories(card, photoId) {
    let catContainer = card.querySelector("#cat-container");
    let span = card.querySelector("#emtpy-categories");

    categoriesAPI.getByPhotoId(photoId)
        .then(categories => {

            if (categories.length === 0) {
                span.textContent = "No hay categorías asociadas a esta foto.";


            } else {

                for (let category of categories) {
                    let cat = catRenderer.asDetails(category);
                    catContainer.appendChild(cat);
                }
            }

        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


function loadComments(card, photoId) {
    let comContainer = card.querySelector("#comments-container");

    photosAPI.getCommentsByPhotoId(photoId)
        .then(comments => {

            if (comments.length === 0) {
                let com = commentRenderer.asEmptyComment();
                comContainer.appendChild(com);
            } else {

                for (let comment of comments) {
                    let com = commentRenderer.asComment(comment);
                    comContainer.appendChild(com);
                }
            }



        })
        .catch(error => messageRenderer.showErrorMessage(error));

}

function loadCategoryPhotos(card, catName) {
    let container = card.querySelector("#category-gallery");

    categoriesAPI.getPhotosByCategoryName(catName)
        .then(photos => {
            for (let photo of photos) {
                let ph = photoRenderer.asCard(photo);
                container.appendChild(ph);
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}



export { photoRenderer };