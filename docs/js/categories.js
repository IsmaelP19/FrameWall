" use strict ";
import { categoriesAPI } from "./api/cats.js";
import { catRenderer } from "./renderers/categories-rend.js";
import { messageRenderer } from "./renderers/messages.js";
import { headerRenderer } from "./renderers/header.js";

function main() {
    let container = document.querySelector("#categories-container");

    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());


    categoriesAPI.getAll()
        .then(categories => {

            for (let category of categories) {
                let card = catRenderer.asButton(category);
                container.appendChild(card);
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


document.addEventListener("DOMContentLoaded", main);