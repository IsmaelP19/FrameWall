//let form = document.querySelector('.form-register');  
//let form = document.getElementById('myForm');
let form = document.querySelector('#myForm');

/* Diferencias entre querySelector y getElementById:
    querySelector devuelve el primer elemento que coincide con la consulta. En este caso, si tuvieramos más elementos cuya clase fuera 'form-register', 
    devolvería solo el primer elemento con dicha clase.
    en cambio, getElementById retorna el priemr elemento con el id especificado; por lo general, es equivalente a hacer querySelector(#id);
*/


// Validación en el formulario antes de pasar al siguiente paso
// Aquí no validamos los inputs del paso 2, pues sólo validamos los del 1 para que no pase al 2 si no están completos los del 1
// Los inputs del paso 2 están validados con el propio submit, que al tener los atributos required, nos aparece directamente
// De todas formas, intentaremos poner los mensajes de error debajo como hemos hecho con los del paso 1

form.addEventListener('click', function(e) {
    let object = e.target;
    let isButtonNext = object.classList.contains('step__button--next'); // boolean

    if (isButtonNext) { // si isButtonNext es true, significa que estamos en el paso 1

        let currentStep = document.getElementById('step-' + object.dataset.step); // paso en el que nos encontramos
        let jumpStep = document.getElementById('step-' + object.dataset.to_step); // paso al que queremos ir

        //var inputUsername = document.getElementById('inputUsername');
        //var inputPasswd = document.getElementById('inputPasswd');
        //var mensajesError = [];

        if (inputUsername.value != '' && inputPasswd.value != '') { // si ambos tienen algún caracter, entonces podemos pasar de página

            currentStep.addEventListener('animationend', function callback() {
                currentStep.classList.remove('active');
                jumpStep.classList.add('active');
                currentStep.classList.add('to-left');
                currentStep.removeEventListener('animationend', callback);
            });
            currentStep.classList.add('inactive');
            jumpStep.classList.remove('inactive');

        }


    } else { // este bloque es para volver hacia atrás, del paso 2 al paso 1, pues si no estamos en el paso 1 estamos en el paso 2

        let currentStep = document.getElementById('step-' + object.dataset.step); // paso en el que nos encontramos
        let jumpStep = document.getElementById('step-' + object.dataset.to_step); // paso al que queremos ir

        currentStep.addEventListener('animationend', function callback() {
            currentStep.classList.remove('active');
            jumpStep.classList.add('active');
            jumpStep.classList.remove('to-left');
            currentStep.removeEventListener('animationend', callback);
        });

        currentStep.classList.add('inactive');
        jumpStep.classList.remove('inactive');

    }

});


// Validación (mensajes de error) a la hora de hacer el submit: vamos a hacer que aparezcan debajo como hacemos en el paso 1
let submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', () => {
    form.submit();
})


// validación en formulario de inicio de sesión

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