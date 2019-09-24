var controller = new ScrollMagic.Controller();

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
      .addTo(controller);
  });
  $(".collections-imgs").each(function(index, el) {
    let thisID = "#" + $(el).attr("id");

    let colImg = new ScrollMagic.Scene({
      triggerElement: thisID
    })
      .on("enter", function() {
        $(thisID).addClass("show");
        $(thisID)
          .parent()
          .siblings(".collections-titles")
          .addClass("fadeIn");
      })
      .addTo(controller);
  });
  $('[id^=video_]').each(function(index, el) {
    let thisID = "#" + $(el).attr("id");
    let videoId = thisID.substring(1).replace('_info', '');

    let video = new ScrollMagic.Scene({
      triggerElement: thisID
    })
    .on("enter", function() {
      loadVideos(videoId);
    })
    .on("leave", function() {
      document.getElementById(videoId).pause();
    })
      .addTo(controller);
  });
});
