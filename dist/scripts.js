class ShowMore {
  constructor(btn) {
    this.state = {
      btn: btn,
      productsContainer: document.querySelector("#products"),
      modal: document.querySelector("#show-more-modal"),
    }
    this.init();
  }
  init = ({ btn, modal, productsContainer } = this.state) => {
    btn.addEventListener('click', e => this.handleClick(e));
    btn.addEventListener('touch', e => this.handleClick(e));
    $(modal).on("hidden.bs.modal", () => productsContainer.innerHtMl = "");
  }
  handleClick = (event, { btn } = this.state) => {
    event.preventDefault();
    this.setModal(btn);
    this.setProducts(btn.id.substr(6));
    $("#show-more-modal").modal("show");
  }
  setModal = btn => {
    let image = btn.querySelector("img"),
      img = image ? image.src : btn.querySelector("div").style.backgroundImage.match(/"((?:\\.|[^"\\])*)"/);

    this.state.modal.querySelector("#show-more-modal--cover").style.backgroundImage = `url(${img})`
  }
  setProducts = (currentProduct) =>
    document.querySelectorAll(`#related_products_box_${currentProduct} .article`).forEach(
      el => {
        let article = el.cloneNode(true);
        this.state.productsContainer.appendChild(article);
        article.addEventListener('mouseenter', () => article.classList.add("open", "active"));
        article.addEventListener('mouseleave', () => article.classList.remove("open", "active"));
      }
    );
}
const setupShowMoreBtns = () => document.querySelectorAll('a.show-more').forEach(btn => new ShowMore(btn))

var newsletterCTA = {
  visited = document.cookie.match('(^|;)\\s*visited_wintersphere\\s*=\\s*([^;]+)')?.pop() || null,
  setup: () => {
    if (!!visited) this.modalCountdown = setTimeout(this.modalPopUp, 300);
    this.handleModalShow();
    this.checkPolicy();
  },
  handleModalShow: () => {
    $("#newsletter_modal").on("show.bs.modal hidden.bs.modal", e => {
      clearTimeout(this.modalCountdown);
      $("#newsletter-box").detach().appendTo(e.type !== "show.bs.modal" ? "#newsletter_modal_content" : "#newsletter-box--wrapper");
      $.cookie('visited_wintersphere', 'yes', { expires: 1, path: '/' });
    })
  },
  checkPolicy: () => {
    $('#custom_fields_privacy').on('click touch', () =>
      $('#newsletter_form_submit').attr('disabled', function (_, attr) { return !attr })
    )
  },
  modalPopUp: () => $("#newsletter_modal").modal("show"),

  
};


class VideoCTA {
  constructor(selector) {
    this.cta = document.querySelector(`[data-play-video="${selector}"]`);
    this.video = document.querySelector(selector);
    this.init();
  }
  init = () => {
    this.cta.addEventListener("click", () => this.initHeroVideo())
    this.cta.addEventListener("touch", () => this.initHeroVideo())
  }
  initHeroVideo = ({ video, cta } = this) => {
    video.controls = true;
    cta.parentNode.remove();
    video.play()
  }
};

class BackToTopButton {
  constructor(btn) {
    this.state = {
      btn: btn,
      offset: 300, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity: 1200, //duration of the top scrolling animation (in ms)
      scroll_top_duration: 700,
    }
    this.init();
  }
  init = () => {
    this.handleScroll();
    this.handleClick();
  }
  handleScroll = ({ btn, offset, offset_opacity } = this.state) => {
    window.addEventListener('scroll', e => {
      let scrollTop = $(e.target).scrollTop();
      scrollTop > offset
        ? btn.classList.add("cd-is-visible")
        : btn.classList.remove("cd-is-visible", "cd-fade-out");
      if (scrollTop > offset_opacity) btn.classList.add("cd-fade-out");
    });
  }
  handleClick = ({ btn, scroll_top_duration } = this.state) => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      $("body,html").animate({ scrollTop: 0 }, scroll_top_duration);
    });
  }
}
var controller = null;
var text, products;

var scrollMagicWintersphere = {
  prevWidth: 0,
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

document.addEventListener('DOMContentLoaded', () => {
  newsletterCTA.setup();
  scrollMagicWintersphere.setup();
  
  setupShowMoreBtns();
  new VideoCTA("#video_0");
  new BackToTopButton(document.querySelector(".cd-top"));
})
