var showMore = {
  setup: function() {
    showMore.getProducts();
    showMore.modalClose();
    $(".related_products").each(function(index, el) {
      $(this)
        .find("#articles_modal")
        .attr("id", `articles_modal_${index}`);
    });
  },
  currentProduct: "scrapper_ski",
  bg_url: "",
  modalClose: function() {
    $("#show-more-modal").on("hidden.bs.modal", function(e) {
      $("#products, #quickview--box--details, #quickview--box--footer").empty();
      $("#quickview--box--wrapper").hide();
    });
  },
  quickViewBack: function() {
    $(".quickview-back").click(function(event) {
      event.preventDefault();
      if ($("#quickview--box--wrapper").hasClass("findSizeOn")) {
        $("#quickview--box--wrapper").toggleClass("findSizeOn");
      } else {
        $("#quickview--box--wrapper").hide();
      }
      $("#quickview--box--footer").hide();
      return false;
    });
  },
  bindFindYourSize: function() {
    $(".find-your-size").click(function(event) {
      $(".product_detail #articles_modal").hide();
      $("#quickview-sizechart").fadeIn();
      $("#quickview--box--wrapper").addClass("findSizeOn");
    });
  },
  bindMktQuickViewEvents: function() {
    this.bindColorAndSizesButtons();
    this.mktQuickViewThumbs();
    ACC.product.bindAddToCartButtonAnalytics();
    ACC.product.bindColorSizeAnalytics();
    ACC.product.enableAddToCartButton();
    ACC.product.initQuickviewLightbox();
    // ACC.notifystock.bindShopPopup();
    ACC.quickview.bindAddToCartCallback();
  },
  bindAddToCartCallback: function() {
    $("#addToCartButton").on("click touch", function(event) {
      event.preventDefault();
      //   $("#quickview--box--wrapper").removeClass("findSizeOn");
      //   $("#quickview-sizechart").hide();
      //   $(".product_detail #articles_modal").hide();
      // $("#show-more-modal").modal('hide')
    });
  },
  mktQuickViewThumbs: function() {
    $(".MagicZoom__thumbs")
      .addClass("MagicScroll")
      .removeClass("not-ready");
    MagicScroll.start();
    MagicZoom.start();
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
          showMore.ajaxSuccess(result);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
      return false;
    });
  },
  ajaxSuccess: function(data) {
    var $html = $(data);
    $("#quickview--box--details").html(
      $(data)
        .find(".product_detail")
        .html()
    );
    $(".find-your-size")
      .attr("data-toggle", "")
      .attr("data-target", "")
      .unbind();
    showMore.bindFindYourSize();
    $(data)
      .find("[id^=add_to_cart]")
      .appendTo("body");
    $("#quickview-sizechart").html(
      $(data)
        .find("#quickview-sizechart")
        .html()
    );
    $("#quickview--box--footer").html($html.find("#quickview-footer").html());
    $("#quickview--box--wrapper").addClass("findSizeOn");
    showMore.bindMktQuickViewEvents();
    $("#quickview--box--wrapper, #quickview--box--footer").show();
  },
  bindColorAndSizesButtons: function() {
    var ajaxParams = {
      cache: false,
      type: "GET",
      url: "",
      contentType: "text/html; charset=utf-8",
      success: function(result) {
        showMore.ajaxSuccess(result);
      },
      error: function(xhr, textStatus, errorThrown) {
        $("#quickviewErrorModalContent").appendTo("#articles_modal");
      }
    };
    $("#quickview--box--main div.modal--colors a").click(function(event) {
      event.preventDefault();
      var variantCode = $(this)
        .find("img")
        .attr("data-variantcode");
      ajaxParams.url =
        ACC.config.encodedContextPath +
        "/category/" +
        variantCode +
        "/quickView";
      $.ajax(ajaxParams);
      return false;
    });
    $(
      "#quickview--box--main div.product_detail__description__size--sizes a"
    ).click(function(event) {
      var variantCode = $(this).attr("data-variantcode");
      ajaxParams.url =
        ACC.config.encodedContextPath +
        "/category/" +
        variantCode +
        "/quickView";
      $.ajax(ajaxParams);
      return false;
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
    $("a.show-more").on("click touch", function(event) {
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
