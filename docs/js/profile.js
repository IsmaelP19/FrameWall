" use strict ";

import { usersAPI } from "./api/users.js";
import { messageRenderer } from "./renderers/messages.js";
import { profileRenderer } from "./renderers/profile.js";
import { headerRenderer } from "./renderers/header.js";
import { sessionManager } from "./utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");
// capturamos el parámetro del userId que viaja en la url

function main() {

    let pageHeader = document.querySelector("#page-header");
    pageHeader.appendChild(headerRenderer.asHeader());


    let profileContainer = document.querySelector("#all-profile-container");

    // si el usuario que ha iniciado sesión coincide con el id de la url pasada, muestra el perfil propio
    let currentId = sessionManager.getLoggedId();
    if (currentId == userId) {


        usersAPI.getById(userId)
            .then(users => {
                let profile = profileRenderer.asMyProfile(users[0]);
                profileContainer.appendChild(profile);

            })
            .catch(error => messageRenderer.showErrorMessage(error));

        addLogoutHandler();

    } else { // en caso de no ser mi perfil

        profileContainer.removeChild(document.querySelector("#logout-div"));

        usersAPI.getById(userId)
            .then(users => {
                let profile = profileRenderer.asProfile(users[0]);
                // Ahora, aunque el usuario no tenga ninguna foto SÍ se carga el perfil
                profileContainer.appendChild(profile);


                /* Esto lo usamos para que el botón de seguir cambie de comportamiento al pinchar sobre él */
                $('#follow-btn').click(function() {
                    $(this).text(function(_, text) {
                        return text === "Dejar de seguir" ? "Seguir" : "Dejar de seguir";
                    });
                    if ($(this).text() == "Seguir") {
                        $(this).removeClass('unfollow');
                    } else if ($(this).text() == "Dejar de seguir") {
                        $(this).addClass('unfollow');
                    }
                });

            })
            .catch(error => messageRenderer.showErrorMessage(error));

    }


}

function addLogoutHandler() {
    let logoutBtn = document.getElementById("sign-out-btn");

    logoutBtn.addEventListener("click", function() {
        sessionManager.logout();
        window.location.href = "index.html";
    })
}



document.addEventListener("DOMContentLoaded", main);