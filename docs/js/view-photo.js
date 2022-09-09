" use strict ";

import { photosAPI } from "./api/photos.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { headerRenderer } from "./renderers/header.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
// capturamos el parámetro del photoId que viaja en la url



function main() {

    let photoContainer = document.querySelector("#body");
    let buttonsContainer = document.querySelector("#btnsContainer");
    let finalDiv = document.querySelector("#evaluation-and-comments");

    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());

    photosAPI.getById(photoId)
        .then(photos => {

            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.insertBefore(photoDetails, finalDiv);

            if (photos[0].visibility == 'Privada') {
                photoContainer.removeChild(finalDiv);
            }

            if (photos[0].userId !== sessionManager.getLoggedId()) {
                photoContainer.removeChild(buttonsContainer);
            }


        })
        .catch(error => {

            messageRenderer.showErrorMessage("No se encuentra la foto especificada");

            photoContainer.removeChild(buttonsContainer);
            photoContainer.removeChild(finalDiv);
            // Esto es para que, si no existe la foto con el photoId = $photoId, entonces eliminamos del html el
            // div donde se encuentran los botones de editar y eliminar, así como la sección de valorar y comentar
            // De igual forma, se muestra durante unas décimas de segundo, pero automáticamente se eliminan del DOM

        });





    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;

    let evalForm = document.getElementById("evaluation-form");
    evalForm.onsubmit = handleEvaluation;

    let commentForm = document.getElementById("post-comment");
    commentForm.onsubmit = handleComment;



}


function handleComment(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedId());

    photosAPI.postCommentByPhotoId(photoId, formData)
        .then(data => {

            window.location.href = "view-photo.html?photoId=" + photoId

        })
        .catch(error => {
            if (sessionManager.getToken() === null) {
                messageRenderer.showErrorMessage("No has iniciado sesión")

            } else {
                messageRenderer.showErrorMessage(error);
            }

        });


}

function handleEvaluation(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedId());

    photosAPI.postEvaluationtByPhotoId(photoId, formData)
        .then(data => window.location.href = "view-photo.html?photoId=" + photoId)
        .catch(error => {
            if (sessionManager.getToken() === null) {
                messageRenderer.showErrorMessage("No has iniciado sesión");

            } else {
                messageRenderer.showErrorMessage("Sólo puedes valorar una vez cada foto.");
            }
        });




}

function handleDelete() {

    photosAPI.delete(photoId)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));

}

function handleEdit(event) {
    window.location.href = "edit-photo.html?photoId=" + photoId;
}


document.addEventListener("DOMContentLoaded", main);