$("#url").change(function(){
    var url = $(this).val();    
    
    $("#user").html('<img src="'+ url +'" alt="imagen" width=100px height=100px + >')
})
