//mudanças de fotos da reni... tosca mas ainda funcional
$(document).ready(function () {
  var carrossel = $(".carrossel");
  var imagens = carrossel.find("img");
  var indice = 0;
  setInterval(function () {
    imagens.removeClass("active");
    imagens.eq(indice).addClass("active");
    indice = (indice + 1) % imagens.length;
  }, 4000);
});

// Cores do titulo alternando
setInterval('$(".neon").toggleClass("brilliant");', 800);
setInterval('$(".neon").toggleClass("brillianter");', 400);
