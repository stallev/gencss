if($('.product__main-slider')){
  $('.product__main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows:true,
    infinite: true,
    // prevArrow:'<button class="round-btn__prev"></button>',
    // nextArrow:'<button class="round-btn__next"></button>',
    prevArrow: false,
    nextArrow: false,
    asNavFor: '.product__thumb-slider',
    responsive:[
      {
        breakpoint: 769,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dotsClass: 'main-slider-slick-dots',
        }
      }
    ]
  });
}

if($('.product__thumb-slider')){
  $('.product__thumb-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    prevArrow:'<button class="thumb-slider-prev"><i class="far fa-angle-left"></i></button>',
    nextArrow:'<button class="thumb-slider-next"><i class="far fa-angle-right"></i></button>',
    asNavFor: '.product__main-slider',
    focusOnSelect: true,
    centerMode: false,
    //vertical: true,
    responsive:[
      {
        breakpoint: 993,
        settings:{
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          vertical: false,
        }
      },
      {
        breakpoint: 769,
        settings:{
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          vertical: false,
        }
      },
      {
        breakpoint: 577,
        settings:{
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          vertical: false,
        }
      }
    ]
  });
}

//слайдер "Популярные товары"
if($('.products-list__inner--popular-slider')){
  $('.products-list__inner--popular-slider').slick({
    slidesToShow: 4,
    margin: 45,
    slidesToScroll: 1,
    dots: true,
    prevArrow:'<button class="slider-button__prev"><i class="far fa-angle-left"></i></button>',
    nextArrow:'<button class="slider-button__next"><i class="far fa-angle-right"></i></button>',
    infinite: true,
    dotsClass: 'main-slider__slick-dots',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          dots: true,
        }
      },
    ]
  });
}



//большой слайдер в быстром просмотре
if($('.product__main-slider--quickview')){
  $('.product__main-slider--quickview').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows:true,
    infinite: true,
    prevArrow:'<button class="slick-prev"></button>',
    nextArrow:'<button class="slick-next"></button>',
    asNavFor: '.product__thumb-slider--quickview',
    responsive:[
      {
        breakpoint: 769,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dotsClass: 'main-slider-slick-dots',
        }
      }
    ]
  });
}

//малый слайдер в быстром просмотре
if($('.product__thumb-slider--quickview')){
  $('.product__thumb-slider--quickview').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    prevArrow:'<button class="thumb-slider-prev"><i class="far fa-angle-left"></i></button>',
    nextArrow:'<button class="thumb-slider-next"><i class="far fa-angle-right"></i></button>',
    asNavFor: '.product__main-slider--quickview',
    focusOnSelect: true,
    centerMode: false,
    responsive:[
      {
        breakpoint: 993,
        settings:{
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          vertical: false,
        }
      },
      {
        breakpoint: 577,
        settings:{
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          infinite: true,
          vertical: false,
        }
      }
    ]
  });
}



//счетчик товаров
let countBox = document.querySelectorAll('.count-box__input-group');
if(countBox){
  countBox.forEach(
    counter => {
      let minusBtn = counter.querySelector('.count-box__minus');
      let plusBtn = counter.querySelector('.count-box__plus');
      let countField = counter.querySelector('input');
      let countStr = countField.value;
      let countValue = Number(countStr);
      minusBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(countValue > 1){
          countValue--;
          countStr = String(countValue);
          countField.value = countStr;
        }
      });
      plusBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(countValue < 100000){
          countValue++;
          countStr = String(countValue);
          countField.value = countStr;
        }
      });
    }
  )
}

//быстрый просмотр
let quickviewBtns = document.querySelectorAll('.product-card__quick-view');
let quickviewCloseBtn = document.querySelector('.product-quickview__icon-close-wrap');
let productQuickviewOverlay = document.querySelector('.product-quickview__overlay');
if(quickviewBtns){
  quickviewBtns.forEach(
    btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        document.body.classList.add('quickview');
      })
    }
  )
}
if(quickviewCloseBtn){
  quickviewCloseBtn.addEventListener('click', function(){
    document.body.classList.remove('quickview');
  });
}
if(productQuickviewOverlay){
  productQuickviewOverlay.addEventListener('click', function(){
    document.body.classList.remove('quickview');
  });
}

//панель product-info

let productNavTabLinks = document.querySelectorAll('.product__info-nav-link');
let productNavTabs = document.querySelectorAll('.product__info-content-item');

if(productNavTabLinks&&productNavTabs){
	productNavTabLinks.forEach(
		element => {
			element.addEventListener('click', function(e){
				e.preventDefault();
        productNavTabLinks.forEach(
          NavTabLink =>{
            NavTabLink.classList.remove('product__info-nav-link--active');
          }
        );
        productNavTabs.forEach(
          NavTab =>{
            NavTab.classList.remove('product__info-content-item--active');
          }
        );
				let activeNavTabID = e.target.getAttribute('data-tab-id');
        e.target.classList.add('product__info-nav-link--active');
				document.getElementById(activeNavTabID).classList.add('product__info-content-item--active');
			})
		}
	)
}

if($('.product__main-slider-item')){
  $('.product__main-slider-item').each(function(){
    $(this).zoom({
      magnify: .9
    }
    );
  });
}
