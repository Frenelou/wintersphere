$(document).ready(function() {
  function loadVideos(id) {
    if ($(`#${id}`).length < 1 ) {
      createNewVideo(id);
      document.getElementById(`${id}`).play();
    }
    else{document.getElementById(`${id}`).play();}
  }
  function createNewVideo(id) {
    var video = $("<video />", {
      id: id,
      src: $(`#${id}_info`).data("src"),
      type: "video/mp4",
      class:"video",
      width: $(`#${id}_info`).width(),
      controls: true
    });
    video.appendTo(`#${id}_info`);
  }
  var prevWidth = 0;
  $(window).on("resize", function(event) {
    if (prevWidth !== $(window).width()) {
      $(".video").remove();
      $(".video_wrapper").each(function(index, el) {
        createNewVideo($(el).data("id"));
      });
    }
    prevWidth = $(window).width();
    /* Act on the event */
  });
  // *****************************************************************************

  var controller = new ScrollMagic.Controller();

  var scene_video1 = new ScrollMagic.Scene({
    triggerElement: "#video_1_info"
  })
    .on("enter", function() {
      loadVideos("video_1");
    })
    .on("leave", function() {
      document.getElementById("video_1").pause();
    })
    .addTo(controller);
  var scene_video1 = new ScrollMagic.Scene({
    triggerElement: "#video_2_info"
  })
    .on("enter", function() {
      loadVideos("video_2");
    })
    .on("leave", function() {
      document.getElementById("video_2").pause();
    })
    .addTo(controller);
  var scene_video1 = new ScrollMagic.Scene({
    triggerElement: "#video_3_info"
  })
    .on("enter", function() {
      loadVideos("video_3");
    })
    .on("leave", function() {
      document.getElementById("video_3").pause();
    })
    .addTo(controller);
});
