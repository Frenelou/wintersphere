var controller = null;
var scrollMagicWintersphere = {
  prevWidth: 0,
  setup: function() {
    this.resizeToggle();
  },
  desktopOnlyScenes: function() {
    this.scaleDown(), this.parallax(), this.follow(), this.video();
  },
  universalScenes: function() {
    controller = new ScrollMagic.Controller();
    this.fadeTextIn(), this.slideIn();
    if ($(window).width() >= 992) {
      scrollMagicWintersphere.desktopOnlyScenes();
    }
  },
  video: function() {
    $("video").each(function(index, el) {
      let id = $(el).attr("id"),
        video = new ScrollMagic.Scene({
          triggerElement: "#" + id
        })
          .on("enter", function() {
            document.getElementById(id).play();
          })
          .on("leave", function() {
            document.getElementById(id).pause();
          })
          .addTo(controller);
    });
  },
  fadeTextIn: function() {
    $("p, h2, h3, h4").each(function(index, el) {
      let id = `textFade_${index}`;
      $(el).attr("id", id);
      fadeText = new ScrollMagic.Scene({
        triggerElement: "#" + id
      })
        .on("enter", function() {
          $(`#${id}`).addClass("fadeText");
        })
        .addTo(controller);
    });
  },
  resizeToggle: function() {
    $(window).on("load resize", function(event) {
      if (controller === null) {
        scrollMagicWintersphere.universalScenes();
      } else if (
        $(window).width() <= 991 &&
        this.prevWidth >= $(window).width()
      ) {
        controller.destroy();
        controller = null;
        console.log("destroyed");
        scrollMagicWintersphere.universalScenes();
      } else if (
        $(window).width() >= 992 &&
        this.prevWidth <= $(window).width()
      ) {
        scrollMagicWintersphere.desktopOnlyScenes();
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
    $(".parallax").each(function(index, el) {
      let thisID = "#" + $(el).attr("id"),
        parent = $(el).data("parent"),
        pWidth = $(parent).width(),
        elY = $(el).data("y");

      $(el)
        .closest(".parallax_parent")
        .css(
          "max-width",
          $(el)
            .closest(".parallax_parent")
            .width()
        );
      let scroller = new ScrollMagic.Scene({
        triggerElement: parent
      })
        .setTween(thisID, {y: elY, ease: Linear.easeNone})
        .addTo(controller);
    });
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
          .setPin(thisID, {y: "100px", ease: Linear.easeOutBounce})
          .addTo(controller);
    });
  },
  slideIn: function() {
    $(".collections-imgs, .slidable").each(function(index, el) {
      let thisID = "#" + $(el).attr("id"),
        colImg = new ScrollMagic.Scene({
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
  }
};
