var controller = null;
var text, products;
let prevWidth= 0;

var scrollMagicWintersphere = {
  setup: function () {
    $("#hero_cta h2").fadeIn("slow");
    this.resizeToggle();
  },
  desktopOnlyScenes: function () {
    if ($(window).width() >= 992) {
      this.parallax();
      this.follow();
      this.video();
    }
  },
  localize: () => {
    document.querySelectorAll("[data-text]").forEach(el => el.innerHTML = text[$(el).data("text")]);
    document.querySelectorAll("article").forEach(el => {
      let { props, name } = products.find(item => item.id === el.id.replace("product_", ""));
      el.querySelector("h5").innerText = name;
      el.querySelectorAll("li").forEach((li, i) => li.innerHTML = "<span>-</span> " + props[i])
    });
  },
  universalScenes: function () {
    controller = new ScrollMagic.Controller();
    this.fadeTextIn();
    this.slideIn();
    scrollMagicWintersphere.desktopOnlyScenes();
  },
  video: () => {
    document.querySelectorAll("video").forEach((el, i) => {
      new ScrollMagic.Scene({
        triggerElement: el
      })
        .on("enter leave", e => {
          e.type === "enter" && i !== 0 ? el.play() : el.pause();
          el.classList.toggle("paused");
        })
        .addTo(controller);
    });
  },
  fadeTextIn: () =>
    document.querySelectorAll("[data-text], span.fade").forEach(el =>
      new ScrollMagic.Scene({
        triggerElement: el,
        offset: -200
      }).on("start", () => el.classList.add("show"))
        .addTo(controller)
    ),
  resizeToggle: () => {
    $(window).on("load resize", () => {
      if (controller === null) {
        scrollMagicWintersphere.universalScenes();
      } else if (
        $(window).width() <= 991 &&
        prevWidth >= $(window).width()
      ) {
        controller.destroy();
        
        controller = null;
        scrollMagicWintersphere.universalScenes();
      } else if (prevWidth <= $(window).width()) {
        scrollMagicWintersphere.desktopOnlyScenes();
      }
    });
  },
  parallax: () =>
    document.querySelectorAll(".parallax").forEach(el =>
      new ScrollMagic.Scene({ triggerElement: document.querySelector(el.dataset.parent) })
        .setTween(el, { y: el.dataset.y, ease: Linear.easeNone })
        .addTo(controller)
    )
  ,
  follow: () =>
    document.querySelectorAll(".follow-me").forEach(el =>
      new ScrollMagic.Scene({
        triggerElement: document.querySelector(el.dataset.parent),
        duration: el.dataset.duration || 100,
        offset: el.dataset.offset || 0
      })
        .setPin(el, { y: el.dataset.offset, ease: Linear.easeOutBounce })
        .addTo(controller)
    )
  ,
  slideIn: () =>
    document.querySelectorAll(".collections-imgs, .slidable").forEach(el => {
      new ScrollMagic.Scene({
        triggerElement: el
      })
        .on("enter", () => el.classList.add("slideIn"))
        .addTo(controller);
    })

};
