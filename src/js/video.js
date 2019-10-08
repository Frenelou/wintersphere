var videoActions = {
  setup: function() {
    $("#hero_cta span").css("visibility", "visible");
    this.heroOn();
    this.heroOff();
  },
  heroOn: function() {
    $("#hero_cta span").on("click touch", function() {
      $("#hero_cta").hide();
      document.getElementById("video_0").play();
      $(".videoStop").show();
      $("#video_0").attr("controls", true);
    });
  },
  heroOff: function() {
    $(".videoStop").on("click touch", function() {
      console.log(9999);
      $(this).hide();
      $("#hero_cta").show();
      document.getElementById("video_0").pause();
      document.getElementById("video_0").load();
      $("#video_0").attr("controls", false);
    });
  }
};
