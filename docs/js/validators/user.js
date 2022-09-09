"use strict";

const userValidator = {

    validateRegister: function(formData) {
        let mensajesError = [];
        let mensajesError2 = [];
        let mensajesError3 = [];
        let mensajesError4 = [];
        let mensajesError5 = [];
        let userName = formData.get("userName");
        let password = formData.get("password");
        let firstName = formData.get("name");
        let surnames = formData.get("surnames");
        let phone = formData.get("phone");
        let mail = formData.get("mail");


        if (userName.length < 3 && password.length < 3) {

            mensajesError.push("El nombre de usuario y la contraseña deben tener más de 3 caracteres. ");
            mensajesError2.push('nombre de usuario');
            mensajesError2.push('contraseña');
        } else if (userName.length < 3) {
            mensajesError.push("El nombre de usuario debe tener más de 3 caracteres. ");
            mensajesError2.push('nombre de usuario');

        } else if (password.length < 3) {
            mensajesError.push("La contraseña debe tener más de 3 caracteres.");
            mensajesError2.push('contraseña');
        }


        if (firstName.length < 3) {
            mensajesError3.push("El nombre debe tener más de 3 caracteres. ");
            mensajesError2.push('nombre');
        }

        if (surnames.length < 3) {
            mensajesError3.push("Los apellidos deben tener más de 3 caracteres. ");
            mensajesError2.push('apellidos');
        }

        if (phone.length == 0) {
            mensajesError2.push('número de teléfono');
        } else {
            var regExpTlf = /^[0-9]{9}$/;
            if (!regExpTlf.test(phone)) {
                mensajesError4.push('El número de teléfono no está bien construido.');
            }
        }

        if (mail.length == 0) {
            mensajesError2.push('correo electrónico');
        } else {
            var regExpMail = /^(.+\@.+\..+)$/;
            if (!regExpMail.test(mail)) {
                mensajesError5.push('El correo electrónico no está bien construido.');
            }
        }

        if (mensajesError2.length == 0) {
            return (mensajesError + "\n" + mensajesError3.join('') + "\n" + mensajesError4.join(', ') + "\n" + mensajesError5.join(', '));

        } else {
            return (mensajesError + "\n" + "Faltan los siguientes datos: " + mensajesError2.join(', ') + "\n" + mensajesError3.join('') + "\n" + mensajesError4.join(', ') + "\n" + mensajesError5.join(', '));
        }
    },

    validateLogin: function(formData) {

        let mensajesError = [];

        let userName = formData.get("userName");
        let password = formData.get("password");

        if (userName.length < 3 && password.length < 3) {

            mensajesError.push("El nombre de usuario y la contraseña deben tener más de 3 caracteres.")

        } else if (userName.length < 3) {
            mensajesError.push("El nombre de usuario debe tener más de 3 caracteres.");


        } else if (password.length < 3) {
            mensajesError.push("La contraseña debe tener más de 3 caracteres.")

        }

        return (mensajesError);

    }




};


export { userValidator };