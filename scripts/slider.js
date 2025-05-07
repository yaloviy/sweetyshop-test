$('.responsive').slick({
  dots: true,
  infinite: true,
  arrows : false,
  speed: 300,
  slidesToShow: 3,
  centerPadding: '60px',
  autoplay: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
});
		