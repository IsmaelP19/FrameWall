/*
let followBtn = document.getElementById('follow-btn');

followBtn.addEventListener('click', ()=>{
	followBtn.innerText === "Seguir" ? "Dejar de seguir" : "Seguir";

	

	
});*/

$('#follow-btn').click(function () {
	$(this).text(function (_, text) {
	  return text === "Seguir" ? "Dejar de seguir" : "Seguir";
	});
	if ($(this).text() == "Seguir") {
	  $(this).removeClass('unfollow');
	} else if ($(this).text() == "Dejar de seguir") {
	  $(this).addClass('unfollow');
	}
  });