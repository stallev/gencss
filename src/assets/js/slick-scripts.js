"use strict"

let bg__elements = document.querySelectorAll('.bg-src');
if(bg__elements){
  bg__elements.forEach(element => {
    let bg_img_src = element.getAttribute('data-bg-src');
    element.style.backgroundImage = 'url(' + bg_img_src + ')';
  });
}

//слайдер в шапке на главной странице
if($('.main-slider__list')){
  $('.main-slider__list').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true,
    speed: 1000,
    useTransform: true,
    cssEase: 'ease-out',
    arrows:false,
    infinite: true,
    dotsClass: 'main-slider__slick-dots'
  });
}

//слайдер на главной в сеции скидок


if($('.discounts .discounts__slider')){
  $('.discounts .discounts__slider').slick({
    slidesToShow: 4,
    margin: 45,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    prevArrow:'<button class="slider-button__prev"><i class="far fa-angle-left"></i></button>',
    nextArrow:'<button class="slider-button__next"><i class="far fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          arrows: true,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      }
    ]
  })
  //выравнивание слайдов по высоте
  // .on('setPosition', function (event, slick) {
  //   slick.$slides.css('height', slick.$slideTrack.height() + 'px');
  // })
  ;
}

if($('.selected-products-slider')){
  $('.selected-products-slider').slick({
    slidesToShow: 5,
    margin: 45,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    dotsClass: 'main-slider__slick-dots',
    infinite: true,
    prevArrow:'<button class="simple-angle--prev"><i class="far fa-angle-left"></i></button>',
    nextArrow:'<button class="simple-angle--next"><i class="far fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,          
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          dotsClass: 'main-slider__slick-dots',
        }
      }
    ]
  })
  //выравнивание слайдов по высоте
  // .on('setPosition', function (event, slick) {
  //   slick.$slides.css('height', slick.$slideTrack.height() + 'px');
  // })
  ;
}
