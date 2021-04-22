// -------- Validación antes de pulsar siguiente ---------
/*
var inputName = document.getElementById("inputName");
var inputPass = document.getElementById("inputPasswd");
var cond = false;
var errorMessage = document.getElementById("errorMessage");
errorMessage.style.color = 'red';

function nextPage() {
    var boton = document.getElementById("nextBtn");
    var mensajesError = [];


    if(inputName.value === null || inputName.value === '') {
        mensajesError.push('Ingresa tu nombre');
    }

    if(inputPass.value === null || inputPass.value === '') {
        mensajesError.push('Ingresa tu contraseña');
    }

    errorMessage.innerHTML = mensajesError.join(', ');
    if(errorMessage.value===null) {
        cond = true;
    }

    if(cond) {
        boton.addEventListener('animationend', function callback() {
            boton.classList.remove('active');
            boton.classList.add('to-left');
            boton.classList.add('inactive');
        })
    }

}
*/


let form = document.querySelector('.form-register');

form.addEventListener('click', function(e) {
    let element = e.target;
    let isButtonNext = element.classList.contains('step__button--next');
    let isButtonBack = element.classList.contains('step__button--back');

    if (isButtonNext || isButtonBack) {
        let currentStep = document.getElementById('step-' + element.dataset.step);
        let jumpStep = document.getElementById('step-' + element.dataset.to_step);
        currentStep.addEventListener('animationend', function callback() {
            currentStep.classList.remove('active');
            jumpStep.classList.add('active');
            if (isButtonNext) {
                currentStep.classList.add('to-left');
            } else {
                jumpStep.classList.remove('to-left');
            }
            currentStep.removeEventListener('animationend', callback);
        });
        currentStep.classList.add('inactive');
        jumpStep.classList.remove('inactive');
    }
});


// ----- Actualiza automáticamente la imagen cuando se introduce la url -----
$("#url").change(function(){
    var url = $(this).val();    
    
    $("#user").html('<img src="'+ url +'" alt="imagen" width=100px height=100px + >')
})




