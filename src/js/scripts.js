$(document).ready(function() {
  const video1 = document.getElementById("video_1"),
    video2 = document.getElementById("video_2");

  // *****************************************************************************

  var controller = new ScrollMagic.Controller();

  var scene_video1 = new ScrollMagic.Scene({
    triggerElement: "#video_1"
  })
    .on("enter", function() {
      video1.play();
    })
    .on("leave", function() {
      video1.pause();
    })
    .addTo(controller);

  var scene_video2 = new ScrollMagic.Scene({
    triggerElement: "#video_2"
  })
    .on("enter", function() {
      video2.play();
    })
    .on("leave", function() {
      video2.pause();
    })
    .addTo(controller);
});
