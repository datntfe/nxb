jQuery(function($) {
  jQuery(document).ready(function(){  
    $('#carousel-1').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3.5,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.8,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2.2,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
    $('#carousel-2').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3.5,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.8,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2.2,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  }); 
});