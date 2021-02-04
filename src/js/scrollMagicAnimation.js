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

    document.querySelector("#contact_fields_email").placeholder = this.scrim[currLang].placeholder;
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
  video: function () {
    $("video").each(function (index, el) {
      let id = $(el).attr("id"),
        video = new ScrollMagic.Scene({
          triggerElement: "#" + id
        })
          .on("enter", function () {
            if ($(`#${id}`).hasClass("paused") && id !== "video_0") {
              document.getElementById(id).play();
              $(`#${id}`).removeClass("paused");
            }
          })
          .on("leave", function () {
            document.getElementById(id).pause();
            $(`#${id}`).addClass("paused");
          })
          .addTo(controller);
    });
  },
  fadeTextIn: function () {
    $("p, h2, h3, h4")
      .not(".nofade")
      .each(function (index, el) {
        let id = `textFade_${index}`;
        $(el).attr("id", id);
        fadeText = new ScrollMagic.Scene({
          triggerElement: "#" + id,
          offset: -200
        })
          .on("start", function () {
            $(`#${id}`).addClass("fadeText");
          })
          .addTo(controller);
      });
  },
  resizeToggle: function () {
    $(window).on("load resize", function (event) {
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
      } else if (this.prevWidth <= $(window).width()) {
        scrollMagicWintersphere.desktopOnlyScenes();
      }
    });
  },
  parallax: () =>
    document.querySelectorAll(".parallax").forEach(el =>
      new ScrollMagic.Scene({ triggerElement: el.dataset.parent })
        .setTween(el.id, { y: el.dataset.y, ease: Linear.easeNone })
        .addTo(controller)
    )
  ,
  follow: () =>
    document.querySelectorAll(".follow-me").forEach(el =>
      new ScrollMagic.Scene({
        triggerElement: el.dataset.parent,
        duration: el.dataset.duration || 100,
        offset: el.dataset.offset || 0
      })
        .setPin(el.id, { y: offset, ease: Linear.easeOutBounce })
        .addTo(controller)
    )
  ,
  slideIn: () =>
    document.querySelectorAll(".collections-imgs, .slidable").forEach(el => {
      new ScrollMagic.Scene({
        triggerElement: el
      })
        .on("enter", () => {
          el.classList.add("slideIn");
          el.parentNode.parentNode.childNodes.forEach(n => n.classList.add('fadeIn'))
        })
        .addTo(controller);
    })

};
