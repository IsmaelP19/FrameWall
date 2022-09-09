" use strict ";

import { photosAPI } from "./api/photos.js";
import { messageRenderer } from "./renderers/messages.js";
import { sessionManager } from "./utils/session.js";
import { headerRenderer } from "./renderers/header.js";
import { catRenderer } from "./renderers/categories-rend.js";
import { categoriesAPI } from "./api/cats.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;


function main() {
    // cargo el header
    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());
    let catWarning = document.querySelector("#cat-warning");
    let photoDetailsContainer = document.getElementById("photo-details-container");

    // ahora veo si estoy editando o subiendo una foto
    if (photoId !== null) { // si la estoy editando, cargo sus datos
        loadCurrentPhoto();

        let addCatBtn = document.getElementById("update-cat-btn");
        addCatBtn.onclick = handlePostCategory;

        let attachBtn = document.querySelector("#attach-cat-btn");
        attachBtn.onclick = handleAttachCategory;

        let deleteCatBtn = document.querySelector("#delete-cat-btn");
        deleteCatBtn.onclick = handleDeleteCategory;

        // y elimino el mensaje de las categorías
        photoDetailsContainer.removeChild(catWarning);

    } else { // si estoy subiendo una foto nueva, elimino la sección de categorías

        let categoriesContainer = document.getElementById("categories-container");

        photoDetailsContainer.removeChild(categoriesContainer);

    }

    let form = document.getElementById("form-photo-upload");
    form.onsubmit = handleSubmitPhoto;

}


function handleSubmitPhoto(event) {
    event.preventDefault();
    let formT = event.target;
    let formData = new FormData(formT);

    if (currentPhoto === null) { // si es nulo, entonces estamos subiendo una nueva foto

        //Añadimos el userId actual
        formData.append("userId", sessionManager.getLoggedId());

        photosAPI.create(formData)
            .then(data => window.location.href = "index.html")
            .catch(error => {

                if (error == 'The session token is not valid') {
                    messageRenderer.showErrorMessage("Para subir una foto debe iniciar sesión antes");
                } else {
                    messageRenderer.showErrorMessage(error)
                }
            });

    } else { // en caso contrario, estamos editando una foto existente

        // Debemos lanzar un error por si intentamos editar una foto ajena a nosotros
        // El trigger también está creado igualmente

        if (sessionManager.getLoggedId() !== currentPhoto.userId) {

            messageRenderer.showErrorMessage("No puedes editar una foto que no es tuya");

        } else {

            formData.append("userId", sessionManager.getLoggedId());
            formData.append("uploadingDate", currentPhoto.uploadingDate);

            photosAPI.update(photoId, formData)
                .then(data => {
                    window.location.href = "index.html";
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        }

    }

}


function loadCurrentPhoto() {

    let submitBtn = document.getElementById("submit-btn");
    let urlInput = document.getElementById("image-input");
    let titleInput = document.getElementById("title");
    let descriptionInput = document.getElementById("description");
    let visibilityInput = document.getElementById("visibility");
    let currentImage = document.querySelector(".preview-photo");
    let categoriesSelectPicker = document.querySelector("#categories-selectpicker");
    let catContainer = document.querySelector("#show-categories-attached");
    let deleteSelectPicker = document.querySelector("#delete-attached-categories");


    categoriesAPI.getAvailableCategories(photoId)
        .then(categories => {

            for (let category of categories) {
                let option = catRenderer.asSelectOption(category);

                categoriesSelectPicker.appendChild(option);

                // ahora tenemos que hacer un refresh porque a veces no se actualiza bien
                $(categoriesSelectPicker).selectpicker("refresh");


            }

        })
        .catch(error => messageRenderer.showErrorMessage(error));


    submitBtn.value = "Confirmar cambios";

    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.link;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;

            // para que se actualice el valor seleccionado del selectpicker
            $("#visibility").selectpicker("refresh");


            currentImage.src = currentPhoto.link;
            currentImage.alt = currentPhoto.description;

        })
        .catch(error => messageRenderer.showErrorMessage(error));


    categoriesAPI.getByPhotoId(photoId)
        .then(categories => {
            for (let category of categories) {
                catContainer.appendChild(catRenderer.asDetails(category));

                let option = catRenderer.asSelectOption(category);
                deleteSelectPicker.appendChild(option);

                $(deleteSelectPicker).selectpicker("refresh");

            }

        })



}

function handlePostCategory() {
    let categoryName = document.querySelector("#add-cat-input").value;

    let catSelectPicker = document.querySelector("#categories-selectpicker");

    if (currentPhoto.userId !== sessionManager.getLoggedId()) {
        messageRenderer.showErrorMessage("No puedes editar una foto que no es tuya");

    } else {
        let formData = new FormData;
        formData.append("catName", categoryName);

        categoriesAPI.create(formData)
            .then(data => {

                messageRenderer.showSuccessMessage("Categoría " + categoryName + " añadida a la base de datos exitosamente");



                $("#categories-selectpicker").append('<option id="category-' + categoryName.replace(/\s+/g, '') + '" value="' + categoryName + '">' + categoryName + '</option>');



                $("#categories-selectpicker").selectpicker("refresh");





            })
            .catch(error => {
                messageRenderer.showErrorMessage(error);


            });
    }



}


function handleAttachCategory() {

    let catSelectPicker = document.querySelector("#categories-selectpicker");
    let catContainer = document.querySelector("#show-categories-attached");
    let catContainerDelete = document.querySelector("#delete-attached-categories");

    if (currentPhoto.userId !== sessionManager.getLoggedId()) {
        messageRenderer.showErrorMessage("No puedes editar una foto que no es tuya");

    } else {

        $('#categories-selectpicker > option:selected').each(function() {
            let categoryName = $(this).text();
            categoriesAPI.getIdByName(categoryName)
                .then(categories => {
                    let formData = new FormData;
                    let categoryId = categories[0].categoryId;
                    formData.append("photoId", photoId);
                    formData.append("categoryId", categoryId);
                    categoriesAPI.attach(formData)
                        .then(data => {
                            messageRenderer.showSuccessMessage("Categoría " + categoryName + " añadida a la foto exitosamente");

                            // añadimos la categoría como detalle arriba del select
                            catContainer.appendChild(catRenderer.asDetails(categories[0]));

                            // Eliminamos dicha categoría del select para asociar
                            catSelectPicker.removeChild(document.querySelector("#category-" + categoryName));
                            $(catSelectPicker).selectpicker("refresh");

                            // ahora añadimos la categoría al selectpicker para poder eliminarla y refrescamos dicho select 
                            catContainerDelete.appendChild(catRenderer.asSelectOption(categories[0]));
                            $(catContainerDelete).selectpicker("refresh");
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));


                })
                .catch(error => messageRenderer.showErrorMessage(error));



        });
    }

}

function handleDeleteCategory() {

    if (currentPhoto.userId !== sessionManager.getLoggedId()) {
        messageRenderer.showErrorMessage("No puedes editar una foto que no es tuya");

    } else {
        let catContainer = document.querySelector("#show-categories-attached");
        let catSelectPicker = document.querySelector("#categories-selectpicker");

        $('#delete-attached-categories > option:selected').each(function() {
            let categoryName = $(this).text();
            categoriesAPI.getIdByName(categoryName)
                .then(categories => {

                    let categoryId = categories[0].categoryId;

                    categoriesAPI.getCategoryPhotoId(photoId, categoryId)
                        .then(categoryPhotoId => {
                            categoriesAPI.delete(categoryPhotoId[0].categoryPhotoId)
                                .then(data => { messageRenderer.showSuccessMessage("Categoría " + categoryName + " eliminada de la foto exitosamente") })
                                .catch(error => messageRenderer.showErrorMessage(error));

                            let child = document.getElementById(categoryName);
                            catContainer.removeChild(child);


                            $("#delete-attached-categories > option:selected").remove();
                            $("#delete-attached-categories ").selectpicker("refresh");





                        })
                        .catch(error => messageRenderer.showErrorMessage(error));

                    catSelectPicker.appendChild(catRenderer.asSelectOption(categories[0]));
                    // volvemos a refrescar el selectpicker de categorías disponibles para añadir
                    $("#categories-selectpicker").selectpicker("refresh");

                })
                .catch(error => messageRenderer.showErrorMessage(error));



        });
    }
}


// ----- Actualiza automáticamente la imagen cuando se introduce la url -----
$("#image-input").change(function() {
    var url = $(this).val();

    $("#uploaded-image").html('<img src="' + url + '" alt="imagen" + class="preview-photo" + >')

    if (url == '') {
        $("#uploaded-image").html('<img src="images/Background-color.jpg" alt="imagen" + class="preview-photo" + >')
    }
})


document.addEventListener("DOMContentLoaded", main);