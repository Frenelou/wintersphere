$(window).on("load", function() {
  showMore.setup();
});
var showMore = {
  setup: function() {
    showMore.getProducts();
    showMore.modalClose();
  },
  currentProduct: "scrapper_ski",
  bg_url: "",
  modalClose: function() {
    $("#show-more-modal").on("hidden.bs.modal", function(e) {
      $("#products, #quickview--box--main, #quickview--box--footer").empty();
      $("#quickview--box--wrapper").hide();
    });
  },
  quickViewBack: function() {
    $(".quickview-back").click(function(event) {
      $("#quickview--box--wrapper").hide();
    });
  },
  modalQuickview: function() {
    $(".article__inside a.quickview").click(function(event) {
      event.preventDefault();
      var value = $(this)
        .next(".quick-look")
        .text();

      $.ajax({
        cache: false,
        type: "GET",
        url: ACC.config.encodedContextPath + "/category/" + value,
        contentType: "text/html; charset=utf-8",
        success: function(result) {
          var $html = $(result);
          $("#quickview--box--main").html($html.find(".product_detail").html());
          $("#quickview--box--footer").html(
            $html.find("#quickview-footer").html()
          );
          $("#quickview--box--wrapper").show();
          // $("#quickview--box--wrapper > *").animate({"margin-left": "-=100%"});
          ACC.quickview.bindEvents();
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    });
  },
  articleActions: function() {
    $(".article").hover(
      function() {
        $(this).addClass("open active");
      },
      function() {
        $(this).removeClass("open active");
      }
    );
  },
  changeModalImage: function() {
    $("#show-more-modal--cover").css(
      "background-image",
      `url(${showMore.bg_url})`
    );
  },
  fillModal: function() {
    $(`#related_products_box_${showMore.currentProduct} .article`).each(
      function(index, el) {
        $(el)
          .clone()
          .appendTo("#products");
      }
    );
    $("#show-more-modal").modal("show");
    showMore.articleActions();
    showMore.modalQuickview();
    showMore.quickViewBack();
  },
  getProducts: function() {
    $(".show-more a").on("click", function(event) {
      event.preventDefault();
      showMore.currentProduct = $(this)
        .parent()
        .attr("id")
        .substr(6);
      showMore.bg_url = $(this)
        .next("img")
        .attr("src");
      showMore.changeModalImage();
      showMore.fillModal();
    });
  }
};
