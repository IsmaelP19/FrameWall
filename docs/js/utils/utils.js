// Función que al pulsar sbre el botón con clase hBack, vuelve a la página anterior 
$("#back-btn").on("click", function(e) {
    e.preventDefault();
    window.history.back();
});

// Pop up para eliminar la foto
jQuery(document).ready(function($) {
    //abrir pop up
    $('.cd-popup-trigger').on('click', function(event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //cerrar pop up
    $('.cd-popup').on('click', function(event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.close-popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //cerrar pop up presionando la tecla 'ESC' (escape)
    $(document).keyup(function(event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });
});