" use strict ";
import { categoriesAPI } from "./api/cats.js";
import { photoRenderer } from "./renderers/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { headerRenderer } from "./renderers/header.js";


let urlParams = new URLSearchParams(window.location.search);
let catName = urlParams.get("catName");
// capturamos el parámetro del categoryId que viaja en la url


function main() {

    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());

    let container = document.querySelector("#body");
    categoriesAPI.getPhotosByCategoryName(catName)
        .then(photos => {
            let card = photoRenderer.asCatGallery(photos);
            container.appendChild(card);

        })
        .catch(error => messageRenderer.showErrorMessage(error));
}



document.addEventListener("DOMContentLoaded", main);