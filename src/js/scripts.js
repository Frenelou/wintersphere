$(document).ready(function() {
  function loadVideos(id) {
    if ($(`#${id}`).length < 1) {
      createNewVideo(id);
      document.getElementById(`${id}`).play();
    } else {
      document.getElementById(`${id}`).play();
    }
  }
  function createNewVideo(id) {
    var src = $(`#${id}_info`).data("src");
    var video = $("<video />", {
      id: id,
      type: "video/mp4",
      class: "video",
      width: $(`#${id}_info`).width(),
      poster: $(`#${id}_info`).data("poster"),
      controls: true,
      html: `<source src="${src}.mp4" type="video/mp4" /><source src="${src}.ogg" type="video/ogg" /><source src="${src}.webm" type="video/webm" />`
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
  });
  // *****************************************************************************
});
