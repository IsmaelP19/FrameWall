" use strict ";
import { photosAPI } from "./api/photos.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { headerRenderer } from "./renderers/header.js";

function main() {
    let container = document.querySelector(".grid-gallery");

    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());





    photosAPI.getAll()
        .then(photos => {

            for (let photo of photos) {
                let card = photoRenderer.asCard(photo);
                container.appendChild(card);
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));




    showUser();




}


function showUser() {
    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().userName;
        messageRenderer.showSuccessMessage("Bienvenido de nuevo, @" + username);
    } else {
        messageRenderer.showWarningMessage("Todavía no has iniciado sesión. ¿A qué esperas?");
    }
}




document.addEventListener("DOMContentLoaded", main);