$(document).ready(function() {
    $(".slick-slider").each(function() {
      var highestSlide = 0;
      var slider = $(this);
      slider.find(".slick-slide").each(function() {
        if ($(this).height() > highestSlide) {
          highestSlide = $(this).height();
        }
      });
      slider.find(".slick-slide").css("height", highestSlide + "px");
    });
  });