var videoObj = {
  prevWidth: 0,
  setup: function() {
    videoObj.createAllVideos();
    $(window).on("resize", function(event) {
      if (prevWidth !== $(window).width()) {
        $(".video").remove();
        videoObj.createAllVideos();
      }
      this.prevWidth = $(window).width();
    });
  },
  loadVideos: function(id) {
    if ($(`#${id}`).length < 1) {
      this.createNewVideo(id);
    }
  },
  playVideo: function(id) {
    $(`#${id}`).fadeIn("slow", function() {
      document.getElementById(`${id}`).play();
    });
  },
  createAllVideos: function() {
    $(".video_wrapper").each(function(index, el) {
      videoObj.createNewVideo($(el).data("id"));
    });
  },
  createNewVideo: function(id) {
    let parentID = `#${id}_info`,
      src = $(parentID).data("src"),
      video = $("<video />", {
        id: id,
        type: "video/mp4",
        class: "video",
        width: $(parentID).width(),
        poster: $(parentID).data("poster"),
        controls: true,
        html: `<source src="${src}.mp4" type="video/mp4" /><source src="${src}.ogg" type="video/ogg" /><source src="${src}.webm" type="video/webm" />`
      });
    video.appendTo(parentID);
  }
};
