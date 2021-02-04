var showMore = {
  setup: () => {
    showMore.getProducts();
    showMore.modalClose();
  },
  currentProduct: "scrapper_ski",
  bg_url: "",

  modalClose: () => {
    $("#show-more-modal").on("hidden.bs.modal", () =>
      $("#products").empty()
    );
  },

  articleActions: el => {
    el.addEventListener('mouseenter', () => el.classList.add("open").add("active"))
    el.addEventListener('mouseleave', () => el.classList.remove("open").remove("active"))
  },
  changeModalImage: () => {
    $("#show-more-modal--cover").css(
      "background-image",
      `url(${showMore.bg_url})`
    );
  },
  fillModal: () => {
    document.querySelectorAll(`#related_products_box_${showMore.currentProduct} .article`).forEach(
      el => {
        let article = el.cloneNode(true);
        document.querySelector("#products").appendChild(article);
        showMore.articleActions(article);
      }
    );
    $("#show-more-modal").modal("show");
  },
  getProducts: () => {
    $("a.show-more").on("click touch", function (event) {
      event.preventDefault();
      showMore.currentProduct = $(this)
        .attr("id")
        .substr(6);
      showMore.bg_url =
        $(this)
          .find("img")
          .attr("src") ||
        $(this)
          .find("div")
          .css("background-image")
          .replace("url(", "")
          .replace(")", "")
          .replace(/\"/gi, "");
      showMore.changeModalImage();
      showMore.fillModal();
    });
  }
};
