" use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { sessionManager } from "../utils/session.js";


const headerRenderer = {

    asHeader: function() {
        let html =
            `
            <div>
                <!-- Muestra sólo en las pantallas de móviles y medianas (tablets, por ejemplo) -->
                <div  class="container-flex">
                    <a href="index.html" style="margin: auto;">
                        <img src="images/logo/logo_small_icon_only.png" id="logo-pequenio" class="navbar-brand d-lg-none d-md-none">
                    </a>
                    <button class="navbar-toggler d-lg-none d-md-none" type="button" id="toggler" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Use flexbox utility classes to change how the child elements are justified-->
                    <div class="collapse navbar-collapse justify-content-between" id="navbarToggle">

                        <ul class="navbar-nav">
                            <li class="navbar-item" id="li1">
                                <a class="nav-link" href="trends.html">Tendencias</a>
                            </li>

                            <li class="navbar-item" id="li2">
                                <a class="nav-link" href="categories.html">Categorías</a>
                            </li>
            
                            <!--
                            <li class="navbar-item" id="li5">
                                <a class="nav-link" href="followed-photos.html">Fotos de seguidos</a>
                            </li>
                            -->

                            <li class="navbar-item" id="li3">
                                <a class="nav-link" id="txt-btn3" href="edit-photo.html">Subir imagen</a>
                            </li>
                            <li class="navbar-item" id="li4">
                                <a class="nav-link" id="txt-btn4" href="profile.html?userId=${sessionManager.getLoggedId()}">Mi cuenta</a>
                            </li>

                        </ul>

                    </div>

                </div>


                <!-- Muestra esto sólo en las pantallas grandes (large screens) y mayores -->
                <ul id="lg-ul">
                    <li id="boton1-user">
                        <button class="button-menu1 d-none d-lg-inline d-md-inline" role="link" onclick="location.href='#'">
                            <a href="#" class="text1">Tendencias</a>
                        </button>
                    </li>

                    <li id="boton2">
                        <button class="button-menu1 d-none d-lg-inline d-md-inline" role="link" onclick="location.href='categories.html'">
                            <a href="categories.html" class="text1">Categorías</a>
                        </button>
                    </li>

                    <li id="b">
                        <a href="index.html" id="logo">
                            <img src="images/logo/logo_small.png" class="logo d-none d-lg-inline d-md-inline">
                        </a>
                    </li>

                    <li id="btn3">
                        <button class="button-menu1 d-none d-lg-inline d-md-inline" id="boton3" role="link" onclick="location.href='edit-photo.html'">
                            <a href="edit-photo.html" class="text1" id="text-btn3">Subir imagen</a>
                        </button>
                    </li>

                    <li id="btn4">
                        <button class="button-menu2 d-none d-lg-inline d-md-inline" id="boton4" role="link" onclick="location.href='profile.html?userId=${sessionManager.getLoggedId()}'">
                            <a href="profile.html?userId=${sessionManager.getLoggedId()}" class="text2" id="text-btn4">Mi cuenta</a>
                        </button>
                    </li>


                </ul>


            </div>
            `;


        let bodyHeader = parseHTML(html);

        modifyHeader(bodyHeader);


        return bodyHeader;
    }


}


function modifyHeader(header) {

    // Tendencias --> como no lo hemos implementado, lo hemos ocultado para no poder acceder. Ponemos hidden en vez de display none
    // para que siga teniendo en cuenta el espacio y margen del botón
    let trendsLi = header.querySelector("#boton1-user");
    trendsLi.style.visibility = "hidden";

    let trends = header.querySelector("#li1");
    trends.style.display = "none";

    if (!sessionManager.isLogged()) {

        // Categorias
        let catsLi = header.querySelector("#boton2");
        catsLi.style.visibility = "hidden";

        let cats = header.querySelector("#li2");
        cats.style.display = "none";


        // Subir imagen --> Iniciar sesión
        let text3 = header.querySelector("#text-btn3");
        text3.textContent = "Iniciar sesión";
        text3.href = "login.html";
        let btn3 = header.querySelector("#boton3");
        btn3.setAttribute('onclick', 'location.href = "login.html"');

        let txt3 = header.querySelector("#txt-btn3");
        txt3.textContent = "Iniciar sesión";
        txt3.href = "login.html";


        // Mi cuenta --> Registrarse
        let text4 = header.querySelector("#text-btn4");
        text4.textContent = "Registrarse";
        text4.href = "register.html";
        let btn4 = header.querySelector("#boton4");
        btn4.setAttribute('onclick', 'location.href = "register.html"');

        let txt4 = header.querySelector("#txt-btn4");
        txt4.textContent = "Registrarse";
        txt4.href = "register.html";

    }
}



export { headerRenderer }