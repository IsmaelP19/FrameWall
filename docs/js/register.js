import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/user.js";

import { sessionManager } from "./utils/session.js";
import { authAPI } from "./api/auth.js";



function main() {


    let registerForm = document.getElementById("myForm");

    registerForm.onsubmit = handleSubmitRegister;
}



function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;



    let formData = new FormData(form);

    // si no le especificamos foto de perfil, se asociará la foto por defecto
    if (formData.get("profilePhotoLink") == '') {
        formData.set("profilePhotoLink", "https://i.ibb.co/3rkP1Fh/logo-person2.png");
    }

    let errors = userValidator.validateRegister(formData);
    if (errors.length == 3) {
        sendRegister(formData);
    } else {
        alert(errors);
    }




}

function sendRegister(formData) {
    authAPI.register(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";

        })
        .catch(error => {

            if (error == 'There already exists another user with that userName') {
                messageRenderer.showErrorMessage("El nombre de usuario que ha introducido ya está asociado a una cuenta en FrameWall. ¿Por qué no prueba a iniciar sesión?");
            } else {
                messageRenderer.showErrorMessage(error);
            }
        });
}


document.addEventListener("DOMContentLoaded", main);


// ----- Actualiza automáticamente la imagen cuando se introduce la url -----
$("#url").change(function() {
    var url = $(this).val();

    $(".user").html('<img src="' + url + '" alt="imagen" width=100px height=100px + >');

    if (url == '') {
        $(".user").html('<img src="images/logo-person2.png" alt="imagen" + class="preview-photo" + >')
    }
})