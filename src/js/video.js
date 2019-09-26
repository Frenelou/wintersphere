var videoObj = {
  prevWidth: 0,
  setup: function() {
    videoObj.createAllVideos();
    $(window).on("resize", function(event) {
      if (this.prevWidth !== $(window).width()) {
        $(".video").remove();
        videoObj.createAllVideos();
      }
      this.prevWidth = $(window).width();
    });
  },
  createAllVideos: function() {
    $(".video_wrapper").each(function(index, el) {
      let id = $(el).data("id"),
        parentID = `#${id}_info`,
        src = $(parentID).data("src"),
        video = $("<video />", {
          id: id,
          type: "video/mp4",
          class: "video",
          width: $(parentID).width(),
          poster: $(parentID).data("poster"),
          autoplay: "",
          muted: "muted",
          loop: true,
          html: `<source src="${src}.mp4" type="video/mp4" /><source src="${src}.ogg" type="video/ogg" /><source src="${src}.webm" type="video/webm" />`
        });

      video.appendTo(parentID).ready(function() {
        $(`#${id}`).fadeIn();
      });
    });
  }
};
