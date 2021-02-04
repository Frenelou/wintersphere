var controller = null;
var text, products;
function wintersphereText(e) {
  text = e.text;
  products = e.products;
  scrollMagicWintersphere.localize();
}
var scrollMagicWintersphere = {
  prevWidth: 0,
  setup: function () {
    this.getText();
    this.resizeToggle();
  },
  desktopOnlyScenes: function () {
    if ($(window).width() >= 992) {
      this.parallax();
      this.follow();
      this.video();
    }
  },
  scrim: {
    en: { h2: "Conquer the Elements", placeholder: "Your email Adress" },
    de: { h2: "Besiege die ELEMENTE", placeholder: "E-mail Adresse" },
    fr: { h2: "À la conquête des éléments", placeholder: "Adresse email" },
    it: { h2: "CONQUISTA GLI ELEMENTI", placeholder: "Indirizzi e-mail" },
    cs: { h2: "S živly nejsou žerty", placeholder: "" }
  },
  getText: function () {
    $("#hero_cta h2").text(this.scrim[currLang].h2 || "Conquer the Elements");
    $("#hero_cta h2").fadeIn("slow");

    let o = document.createElement("script");

    o.src = `wintersphere-19-mkt-page-02v04-assets/wintersphere_data_${currLang}.json`;
    document.body.appendChild(o);
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
      fadeText = new ScrollMagic.Scene({
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
        this.prevWidth >= $(window).width()
      ) {
        controller.destroy();
        controller = null;
        scrollMagicWintersphere.universalScenes();
      } else if (this.prevWidth <= $(window).width()) {
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
