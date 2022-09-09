// validación en formulario de inicio de sesión, análoga a la validación
// del formulario de registro

let submitBtnLogin = document.getElementById('submit-btn-login');
let formLogin = document.getElementById('myForm-Login');
submitBtnLogin.addEventListener('click', () => {

    var mensajesError3 = [];

    var inputUsernameLogin = document.getElementById('userName-login');
    var inputPasswordLogin = document.getElementById('userPassword-login');

    if (inputUsernameLogin.value == '') {
        mensajesError3.push('nombre de usuario');
    }

    if (inputPasswordLogin.value == '') {
        mensajesError3.push('contraseña');
    }

    if (mensajesError3.length == 0) {
        alert("Iniciando sesión en FrameWall");
        formLogin.submit();

    } else {
        alert("Faltan los siguientes campos: " + mensajesError3.join(', ') + ".");

    }


});