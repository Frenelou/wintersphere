var controller = new ScrollMagic.Controller();
var follow1 = null;
var follow2 = null;
var scrollMagicWintersphere = {
  setup: function() {
    this.scaleDown(),
      /* this.productBox(),*/ this.parallax(),
      this.colections(),
      this.video();
    this.resizeToggle();
  },
  resizeToggle: function() {
    $(window).on("load resize", function(event) {
      if ($(window).width() <= 991) {
        follow1.destroy(true);
        follow1 = null;
        follow2.destroy(true);
        follow2 = null;
      } else {
        if (follow1 === null) {
          scrollMagicWintersphere.follow();
        }
      }
    });
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
  parallax: function() {
    let popProduct = new ScrollMagic.Scene({
      triggerElement: "#show--scrapper_ski"
    })
      .setTween("#show--scrapper_ski > div", {y: "50px", ease: Linear.easeNone})
      .addTo(controller);
  },
  follow: function() {
    $(".follow-me").each(function(index, el) {
      let thisID = "#" + $(el).attr("id"),
        parent = "#" + $(el).data("parent"),
        elOffset = $(el).data("offset") || 0,
        elDuration = $(el).data("duration") || 100,
        scroller = new ScrollMagic.Scene({
          triggerElement: parent,
          duration: elDuration,
          offset: elOffset
        })
          .setPin(thisID, {y: "100px", ease: Circ.easeInOut})
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
        offset: -200
      })
        .on("start", function() {
          videoObj.loadVideos(videoId);
        })
        .on("enter", function() {
          videoObj.loadVideos(videoId);
          videoObj.playVideo(videoId);
        })
        .on("leave", function() {
          document.getElementById(videoId).pause();
        })
        .addTo(controller);
    });
  }
};
