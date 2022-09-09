" use strict ";
import { parseHTML } from "/js/utils/parseHTML.js";
import { messageRenderer } from "./messages.js";
import { photoRenderer } from "./photos.js";
import { usersAPI } from "../api/users.js";
import { sessionManager } from "../utils/session.js";

const profileRenderer = {
    asMyProfile: function(user) {
        let html =
            `
            <div>
                <div class="container-flex jus wrap-reverse" id="profile-data-container">

                    <div class="datos">
                        <h4><strong>@${user.userName}</strong></h4>
                        <span class="name">${user.name} ${user.surnames}</span>
                        <br>
                        <span class="email"><i>${user.mail}</i></span>

                        <div class="btn-container">


                            <div class="span-container">
                                <span class="detail-btn" id="posts"></span>
                            </div>

                            <div class="span-container">
                                <span class="detail-btn" id="followed"></span>
                            </div>
                            <div class="span-container">
                                <span class="detail-btn" id="followers"></span>
                            </div>

                        </div>

                    </div>

                    <div class="photo-ft-btn">
    

                        <div class="profile-photo-container">

                            <img src="${user.profilePhotoLink}" class="profile-photo">

                        </div>




                    </div>




                </div>

                <hr class="profile-line ">


                <div class="container-flex">
                    <div class="container-flex size-gallery-profile no-padd" id="profile-gallery-container">

                    </div>

                </div>

            </div>

        `;

        let profile = parseHTML(html);
        loadPhotos(profile, user.userId);
        loadPostNumber(profile, user.userId);
        loadFollowersNumber(profile, user.userId);
        loadFollowedNumber(profile, user.userId);

        return profile;
    },

    asProfile: function(photo) {

        let html =
            `
        <div>
            <div class="container-flex jus wrap-reverse">

                <div class="datos">
                    <h4><strong>@${photo.userName}</strong></h4>
                    <span class="name">${photo.name} ${photo.surnames}</span>
                    <br>
                    <span class="email"><i>${photo.mail}</i></span>

                    <div class="btn-container">

                        <div class="span-container">
                            <span class="detail-btn" id="posts"></span>
                        </div>

                        <div class="span-container">
                            <span class="detail-btn" id="followed"></span>
                        </div>
                        <div class="span-container">
                            <span class="detail-btn" id="followers"></span>
                        </div>

                    </div>

                </div>

                <div class="photo-ft-btn">

                    <div class="profile-photo-container">

                        <img src="${photo.profilePhotoLink}" class="profile-photo">

                    </div>

                    <div class="btn-container" id="follow-btn-container">
                        <button class="follow-btn" id="follow-btn">
                        Seguir
                    </button>
                    </div>




                </div>




            </div>

            <hr class="profile-line ">


            <div class="container-flex">
                <div class="container-flex size-gallery-profile no-padd" id="profile-gallery-container">

                </div>

            </div>
        </div>

        `;

        let profile = parseHTML(html);
        loadPhotos(profile, photo.userId);
        loadPostNumber(profile, photo.userId);
        loadFollowersNumber(profile, photo.userId);
        loadFollowedNumber(profile, photo.userId);

        modifyBtn(profile);

        return profile;

    }

};


function modifyBtn(html) {
    let followBtnContainer = html.querySelector("#follow-btn-container");

    if (!sessionManager.isLogged()) {
        followBtnContainer.style.display = "none";
    }

}

function loadPhotos(card, userId) {

    let container = card.querySelector("#profile-gallery-container");

    if (sessionManager.getLoggedId() == userId) { // si visito mi perfil, me salen todas mis fotos (privadas y públicas)

        usersAPI.getPhotosByUser(userId)
            .then(photos => {
                for (let photo of photos) {
                    let ph = photoRenderer.asProfileGallery(photo);
                    container.appendChild(ph);
                }
            })
            .catch(error => messageRenderer.showErrorMessage(error));

    } else {
        usersAPI.getPublicPhotosByUser(userId)
            .then(photos => {
                for (let photo of photos) {
                    let ph = photoRenderer.asProfileGallery(photo);
                    container.appendChild(ph);
                }
            })
            .catch(error => messageRenderer.showErrorMessage(error));

    }

};

function loadPostNumber(card, userId) {

    if (sessionManager.getLoggedId() == userId) {

        usersAPI.getPhotosByUser(userId)
            .then(photos => {
                let photosNumber = photos.length;
                let container = card.querySelector("#posts");

                if (photosNumber == 1) {
                    container.textContent = photosNumber + " publicación";
                } else {
                    container.textContent = photosNumber + " publicaciones";
                }

            });

    } else {

        usersAPI.getPublicPhotosByUser(userId)
            .then(photos => {
                let photosNumber = photos.length;
                let container = card.querySelector("#posts");

                if (photosNumber == 1) {
                    container.textContent = photosNumber + " publicación";
                } else {
                    container.textContent = photosNumber + " publicaciones";
                }

            });
    }




};

function loadFollowersNumber(card, userId) {

    usersAPI.getFollowersByUser(userId)
        .then(users => {
            let usersNumber = users.length;
            let container = card.querySelector("#followers");
            if (usersNumber == 1) {
                container.textContent = usersNumber + " seguidor";
            } else {
                container.textContent = usersNumber + " seguidores";
            }

        });
};

function loadFollowedNumber(card, userId) {

    usersAPI.getFollowedByUser(userId)
        .then(users => {
            let usersNumber = users.length;
            let container = card.querySelector("#followed");
            if (usersNumber == 1) {
                container.textContent = usersNumber + " seguido";
            } else {
                container.textContent = usersNumber + " seguidos";
            }

        });
};




export { profileRenderer };