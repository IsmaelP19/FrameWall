import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/user.js";

import { sessionManager } from "./utils/session.js";
import { authAPI } from "./api/auth.js";



function main() {


    let loginForm = document.getElementById("myForm");

    loginForm.onsubmit = handleSubmitLogin;
}



function handleSubmitLogin(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);


    let errors = userValidator.validateLogin(formData);
    if (errors.length == 0) {
        sendLogin(formData);
    } else {
        alert(errors);
    }





}

function sendLogin(formData) {
    authAPI.login(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";

        })
        .catch(error => {
            if (error == 'User not found') {
                messageRenderer.showErrorMessage("El usuario que ha introducido aún no tiene cuenta en Frame Wall");

            } else if (error == 'The password is not correct') {
                messageRenderer.showErrorMessage("La contraseña que ha introducido no es correcta");
            }
        });
}


document.addEventListener("DOMContentLoaded", main);