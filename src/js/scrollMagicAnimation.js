var controller = null;
var text, products;
function wintersphereText(e) {
  text = e.text;
  products = e.products;
  scrollMagicWintersphere.localize();
}
var scrollMagicWintersphere = {
  prevWidth: 0,
  setup: function() {
    this.getText();
    this.resizeToggle();
  },
  desktopOnlyScenes: function() {
    this.parallax(), this.follow(), this.video();
  },
  scrim: {
    en: {h2: "Conquer the Elements", placeholder: "Your email Adress"},
    de: {h2: "Besiege die ELEMENTE", placeholder: "E-mail Adresse"},
    fr: {h2: "À la conquête des éléments", placeholder: "Adresse email"},
    it: {h2: "CONQUISTA GLI ELEMENTI", placeholder: "Indirizzi e-mail"},
    cs: {h2: "S živly nejsou žerty"}
  },
  getText: function() {
    $("#hero_cta h2").text(this.scrim[currLang].h2 || "Conquer the Elements");
    waitForWebfonts(["brandon-grotesque"], function() {
      $("#hero_cta h2").fadeIn("slow");
    });

    if (this.scrim[currLang].placeholder)
      $("#contact_fields_email").attr(
        "placeholder",
        this.scrim[currLang].placeholder
      );
    let o = document.createElement("script");
    (o.src = `wintersphere-19-mkt-page-02v04-assets/wintersphere_data_${currLang}.json`),
      document.body.appendChild(o);
  },
  localize: function() {
    $("p, h2, h3, h4, h5,label, input, a").each(function(index, el) {
      if ($(el).data("text")) {
        $(el).html(text[$(el).data("text")]);
      }
    });
    $("article").each(function(index, el) {
      let id = $(el)
        .attr("id")
        .replace("product_", "");
      let {props, name} = products.find(function(item) {
        return item.id === id;
      });
      $(el)
        .find("h5")
        .text(name);

      for (var i = 0; i <= 2; i++) {
        $(el)
          .find("li")
          .eq(i)
          .html("<span>-</span> " + props[i]);
      }
    });
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
            if ($(`#${id}`).hasClass("paused") && id !== "video_0") {
              document.getElementById(id).play();
              $(`#${id}`).removeClass("paused");
            }
          })
          .on("leave", function() {
            document.getElementById(id).pause();
            $(`#${id}`).addClass("paused");
          })
          .addTo(controller);
    });
  },
  fadeTextIn: function() {
    $("p, h2, h3, h4")
      .not(".nofade")
      .each(function(index, el) {
        let id = `textFade_${index}`;
        $(el).attr("id", id);
        fadeText = new ScrollMagic.Scene({
          triggerElement: "#" + id,
          offset: -200
        })
          .on("start", function() {
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
      let slidableID = "#" + $(el).attr("id"),
        colImg = new ScrollMagic.Scene({
          triggerElement: slidableID
        })
          .on("enter", function() {
            $(slidableID).addClass("slideIn");
            $(slidableID)
              .parent()
              .siblings(".collections-titles")
              .addClass("fadeIn");
          })
          .addTo(controller);
    });
  }
};
function waitForWebfonts(fonts, callback) {
  var loadedFonts = 0;
  for (var i = 0, l = fonts.length; i < l; ++i) {
    (function(font) {
      var node = document.createElement("span");
      // Characters that vary significantly among different fonts
      node.innerHTML = "giItT1WQy@!-/#";
      // Visible - so we can measure it - but not on the screen
      node.style.position = "absolute";
      node.style.left = "-10000px";
      node.style.top = "-10000px";
      // Large font size makes even subtle changes obvious
      node.style.fontSize = "300px";
      // Reset any font properties
      node.style.fontFamily = "sans-serif";
      node.style.fontVariant = "normal";
      node.style.fontStyle = "normal";
      node.style.fontWeight = "normal";
      node.style.letterSpacing = "0";
      document.body.appendChild(node);

      // Remember width with no applied web font
      var width = node.offsetWidth;

      node.style.fontFamily = font + ", sans-serif";

      var interval;
      function checkFont() {
        // Compare current width with original width
        if (node && node.offsetWidth != width) {
          ++loadedFonts;
          node.parentNode.removeChild(node);
          node = null;
        }

        // If all fonts have been loaded
        if (loadedFonts >= fonts.length) {
          if (interval) {
            clearInterval(interval);
          }
          if (loadedFonts == fonts.length) {
            callback();
            return true;
          }
        }
      }

      if (!checkFont()) {
        interval = setInterval(checkFont, 50);
      }
    })(fonts[i]);
  }
}
