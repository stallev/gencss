"use strict"

//поведение боковой панели

let filtrsTogggleBtns = document.querySelectorAll('.catalog-sidebar__toggle');
let closeSidebarBtn = document.querySelector('.catalog-sidebar__icon-close-wrap');
let leftCatalogSidebar = document.querySelector('.catalog-sidebar');
let returnSidebarBtn = document.getElementById('return-sidebar');
let catalogSidebarOverlay = document.querySelector('.catalog-sidebar__overlay');
if(filtrsTogggleBtns&&leftCatalogSidebar){
  filtrsTogggleBtns.forEach(
    filtrsTogggleBtn => {
      filtrsTogggleBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(document.documentElement.clientWidth<991){
          document.querySelector('body').classList.toggle('sidebar-active');
          returnSidebarBtn.style.display = 'inline-block';
        }
        /*else{
          leftCatalogSidebar.classList.toggle('closed-left-sidebar');
          returnSidebarBtn.style.display = 'inline-block';
        }*/
      });
    }
  );
  returnSidebarBtn.addEventListener('click', function(){
    leftCatalogSidebar.classList.remove('closed-left-sidebar');
    returnSidebarBtn.style.display = 'none';
  });
  if(document.documentElement.clientWidth<991){
    closeSidebarBtn.addEventListener('click', function(){
      document.querySelector('body').classList.toggle('sidebar-active');
      returnSidebarBtn.style.display = 'inline-block';
    });
  }
}
if(catalogSidebarOverlay){
  catalogSidebarOverlay.addEventListener('click',  function (e) {
    document.querySelector('body').classList.toggle('sidebar-active');
    returnSidebarBtn.style.display = 'inline-block';
  });
}

//скрываем и закрываем списки фильтров
//показываем и скрываем списки и подменю
// let filterItemsControls = document.querySelectorAll('.filter__title.sublist-title');
// if(filterItemsControls){
// 	filterItemsControls.forEach(
// 		element => {
// 			element.addEventListener('click', function(e){
// 				e.preventDefault();
// 				e.target.querySelector('.hidden-items-control')
// 				e.target.querySelector('.hidden-items-control').classList.toggle('open-state');
// 				let sublist = e.target.closest('.sublist-title').nextSibling.nextElementSibling;
// 				sublist.classList.toggle('hidden-items');
// 			})
// 		}
// 	)
// }

//изменяем чекбоксы в фильтре
let chkboxFilterLinks = document.querySelectorAll('.filter__options-list--chkbox .filter__option-link');
if(chkboxFilterLinks){
	chkboxFilterLinks.forEach(
		element => {
			element.addEventListener('click', function(e){
				e.preventDefault();
				e.target.closest('.filter__option-link').classList.toggle('checked-option');
			})
		}
	)
}
//изменяем чекбоксы в карточке товара
let chkboxProductCard = document.querySelectorAll('.product-card__compare');
if(chkboxProductCard){
	chkboxProductCard.forEach(
		element => {
			element.addEventListener('click', function(e){
				e.preventDefault();
				e.target.closest('.product-card__compare').classList.toggle('checked-option');
			})
		}
	)
}
//ползунок для фильтра по цене

let input0 = document.querySelector('.filter__price-control-min');
let input1 = document.querySelector('.filter__price-control-max');
const inputs = [input0, input1];
document.addEventListener('DOMContentLoaded', ()=>{
  let priceFiltr = document.querySelector('.filter__price-filter');
  if(priceFiltr){
    noUiSlider.create(priceFiltr, {
      start: [250, 60000],
      tooltips: false,
      step: 1,
      connect: true,
      padding: 10,
      range: {
          'min': 250,
          'max': 60000
      },
    });
    priceFiltr.noUiSlider.on('update', function (values, handle) {
      inputs[handle].innerHTML = String(Math.round(values[handle]))+'р';
    });


  }
});

//ползунок для фильтра по посадочному диаметру

let input_sitw0 = document.querySelector('.filter__sitt-width-control-min');
let input_sitw1 = document.querySelector('.filter__sitt-width-control-max');
const inputs_sitw = [input_sitw0, input_sitw1];
document.addEventListener('DOMContentLoaded', ()=>{
  let sitt_widthFiltr = document.querySelector('.filter__sitt-width');
  if(sitt_widthFiltr){
    noUiSlider.create(sitt_widthFiltr, {
      start: [32.5, 138.5],
      tooltips: false,
      step: 0.1,
      connect: true,
      padding: 6,
      range: {
          'min': 32.5,
          'max': 138.5
      },
    });
    sitt_widthFiltr.noUiSlider.on('update', function (values, handle) {
      inputs_sitw[handle].innerHTML = String((values[handle]))+"''";
    });
  }
});
//ползунок для фильтра Диаметр расположения отверстий

let input_position0 = document.querySelector('.filter__position-width-control-min');
let input_position1 = document.querySelector('.filter__position-width-control-max');
const inputs_position = [input_position0, input_position1];
document.addEventListener('DOMContentLoaded', ()=>{
  let filter__positionFiltr = document.querySelector('.filter__position');
  if(filter__positionFiltr){
    noUiSlider.create(filter__positionFiltr, {
      start: [-15, 982],
      tooltips: false,
      step: 1,
      connect: true,
      padding: 20,
      range: {
          'min': -15,
          'max': 982
      },
    });
    filter__positionFiltr.noUiSlider.on('update', function (values, handle) {
      inputs_position[handle].innerHTML = String(Math.round(values[handle]))+"мм";
    });
  }
});

//ползунок для фильтра Вылет (ET), мм

let input_ET0 = document.querySelector('.filter__ET-width-control-min');
let input_ET1 = document.querySelector('.filter__ET-width-control-max');
const inputs_ET = [input_ET0, input_ET1];
document.addEventListener('DOMContentLoaded', ()=>{
  let filter__ET = document.querySelector('.filter__ET');
  if(filter__ET){
    noUiSlider.create(filter__ET, {
      start: [-65, 174],
      tooltips: false,
      step: 1,
      connect: true,
      padding: 10,
      range: {
          'min': -65,
          'max': 174
      },
    });
    filter__ET.noUiSlider.on('update', function (values, handle) {
      inputs_ET[handle].innerHTML = String(Math.round(values[handle]))+"мм";
    });
  }
});


//изменяем представление карточек в каталоге с табличного на колоночный вид и обратно
let productList = document.querySelector('.products-list--catalog');
let productListViewControls = document.querySelector('.products-list__controls-change-grid');
if(productList&&productListViewControls){
  let gridViewBtn = document.querySelector('.products-list__controls-to-grid');
  let columnViewBtn = document.querySelector('.products-list__controls-to-column');
  let productCards = productList.querySelectorAll('.product-card');

  if(gridViewBtn){
    gridViewBtn.addEventListener('click', function(e){
      gridViewBtn.classList.add('products-list__controls-to-grid--active');
      columnViewBtn.classList.remove('products-list__controls-to-column--active');
      productList.classList.remove('products-list--catalog-column');
      productList.classList.add('products-list--catalog-grid');
      productCards.forEach(
        card => {
          card.classList.remove('product-card--one-view');
          card.classList.remove('col-lg-12');
          card.classList.add('col-sm-4');
          card.classList.add('col-6');
        }
      );
    });
    columnViewBtn.addEventListener('click', function(e){
      columnViewBtn.classList.add('products-list__controls-to-column--active');
      gridViewBtn.classList.remove('products-list__controls-to-grid--active');
      productList.classList.remove('products-list--catalog-grid');
      productList.classList.add('products-list--catalog-column');
      productCards.forEach(
        card => {
          card.classList.remove('col-sm-4');
          card.classList.remove('col-6');
          card.classList.add('col-lg-12');
          card.classList.add('product-card--one-view');
        }
      );
    });
  }
}

var string = "some text here with some amount of chars lets rteplaece it like a excerpt";
var description = getExcerpt(string,10);

// принимает строку и лимит после скольки знаков искать пробел и обрезать
function getExcerpt( str, limit ){
    var fullText = str;
    var shortText = str;
    shortText = shortText.substr( 0, shortText.lastIndexOf( ' ', limit ) ) + '...';
    var returnString = {
        fullText: fullText,
        shortText: shortText
    };
    return returnString;
}
let excerptsDescr = document.querySelectorAll('.excerpt-descr');
let excerptCatalogCartTitle = document.querySelectorAll('.excerpt-catalog-cart-title');
let blogItemExcerpt = document.querySelectorAll('.blog-item__excerpt');
let excerptAsideCatalogCartTitle = document.querySelectorAll('.aside-cart-title__excerpt');
let excerpt280 = document.querySelectorAll('.excerpt280');
let excerpt380 = document.querySelectorAll('.excerpt380');
if(excerpt380){
  excerpt380.forEach(
    item => {
      if(item.innerHTML.length > 380) item.innerHTML = getExcerpt( item.innerHTML, 380 ).shortText;
    }
  );
}
if(excerpt280){
  excerpt280.forEach(
    item => {
      if(item.innerHTML.length > 280) item.innerHTML = getExcerpt( item.innerHTML, 280 ).shortText;
    }
  );
}
if(excerptsDescr){
  excerptsDescr.forEach(
    item => {
      if(item.innerHTML.length > 180) item.innerHTML = getExcerpt( item.innerHTML, 180 ).shortText;
    }
  );
}
if(excerptCatalogCartTitle){
  excerptCatalogCartTitle.forEach(
    item => {
      if(item.innerHTML.length > 60) item.innerHTML = getExcerpt( item.innerHTML, 60 ).shortText;
    }
  );
}
if(blogItemExcerpt){
  blogItemExcerpt.forEach(
    item => {
      if(item.innerHTML.length > 80) item.innerHTML = getExcerpt( item.innerHTML, 80 ).shortText;
    }
  );
}
if(excerptAsideCatalogCartTitle){
  excerptAsideCatalogCartTitle.forEach(
    item => {
      if(item.innerHTML.length > 60) item.innerHTML = getExcerpt( item.innerHTML, 60 ).shortText;
    }
  );
}


//about counter
// if($('.about__item-counts-value')){
//   $('.about__item-counts-value').countTo();
// }
