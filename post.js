$(document).ready(function() {
    var toggleSound = $("#toggleSound")[0];
    var openSound = $("#openSound")[0];
    var hoverSound = $("#hoverSound")[0];

    let menuToggle = document.querySelector(".menuToggle");
    let menu = document.querySelector(".menu");

    menuToggle.onclick = function () {
      menu.classList.toggle("active");
      toggleSound.currentTime = 0; 
      toggleSound.play();
      if (menu.classList.contains("active")) {
        openSound.currentTime = 0; 
        openSound.play();
      }
    };

    $("a").mouseenter(function() {
      hoverSound.currentTime = 0; 
      hoverSound.play();
    });
  });