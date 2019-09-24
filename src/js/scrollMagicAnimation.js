console.log("Ready to animate");
$(document).ready(function() {
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
  $(".product_box").each(function(index, el) {
    let thisID = "#" + $(el).attr("id");

    let popProduct = new ScrollMagic.Scene({
      triggerElement: thisID
    })
      .on("enter", function() {
        $(thisID).addClass("show");
      })
      .on("leave", function() {
        $(thisID).removeClass("show");
      })
      .addTo(controller);
  });
});
