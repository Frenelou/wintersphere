var controller = new ScrollMagic.Controller();

var scrollMagicWintersphere = {
  setup: function() {
    this.scaleDown(), this.productBox(), this.colections(), this.video();
  },
  scaleDown: function() {
    $(".scaledown").each(function(index, el) {
      let thisID =
        "#" +
        $(el)
          .closest(".show-more, .img--wrapper")
          .attr("id");

      let scalable = new ScrollMagic.Scene({
        triggerElement: thisID
      })
        .on("enter", function() {
          $(thisID)
            .find(".scaledown")
            .addClass("in");
        })
        .on("leave", function() {
          $(thisID)
            .find(".scaledown")
            .removeClass("in");
        })
        .addTo(controller);
    });
  },
  productBox: function() {
    $(".product_box").each(function(index, el) {
      let thisID = "#" + $(el).attr("id");

      let popProduct = new ScrollMagic.Scene({
        triggerElement: thisID
      })
        .on("enter", function() {
          $(thisID).addClass("show_product");
        })
        .addTo(controller);
    });
  },
  colections: function() {
    $(".collections-imgs").each(function(index, el) {
      let thisID = "#" + $(el).attr("id");

      let colImg = new ScrollMagic.Scene({
        triggerElement: thisID
      })
        .on("enter", function() {
          $(thisID).addClass("slideIn");
          $(thisID)
            .parent()
            .siblings(".collections-titles")
            .addClass("fadeIn");
        })
        .addTo(controller);
    });
  },
  video: function() {
    $("[id^=video_]").each(function(index, el) {
      let thisID = "#" + $(el).attr("id");
      let videoId = thisID.substring(1).replace("_info", "");

      let video = new ScrollMagic.Scene({
        triggerElement: thisID,
        offset:-200
      })
        .on("start", function() {
          videoObj.loadVideos(videoId);
        })
        .on("enter", function() {
          videoObj.playVideo(videoId);
        })
        .on("leave", function() {
          document.getElementById(videoId).pause();
        })
        .addTo(controller);
    });
  }
};
