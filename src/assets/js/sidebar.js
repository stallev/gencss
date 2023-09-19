"use strict"

//right sidebar


let closeSidebarBtn = document.querySelector('.sidebar__icon-close-wrap');
let rightSidebar = document.querySelector('.sidebar--right');
let displaySidebarBtn = document.querySelector('.sidebar-toggle');
let sidebarOverlay =  document.querySelector('.sidebar__overlay');
if(displaySidebarBtn&&rightSidebar&&closeSidebarBtn){
  displaySidebarBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(document.documentElement.clientWidth<993){
      document.querySelector('body').classList.add('sidebar-active');
    }
  })
  //скрытие сайдбара при клике на пустое место
  if(sidebarOverlay){
    sidebarOverlay.addEventListener('click', function(){
      document.querySelector('body').classList.remove('sidebar-active');
    });
  }
}
if(closeSidebarBtn&&rightSidebar){
  closeSidebarBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(document.documentElement.clientWidth<993){
      document.querySelector('body').classList.remove('sidebar-active');
    }
  })
}

//test AJAX

jQuery(document).ready(function($) {
  $('#filter-form').on('change', 'select', function() {
      var data = {
          'action': 'apply_price_filter',
          'min_price': $('#min_price').val(),
          'max_price': $('#max_price').val(),
          'orderby': $('select.orderby').val(),
          'product_cat': $('select.product_cat').val(),
          'product_tag': $('select.product_tag').val(),
      };
      $.ajax({
          url: ajaxurl,
          data: data,
          type: 'POST',
          beforeSend: function() {
              $('#filter-results').html('<div class="loader">Loading...</div>');
          },
          success: function(data) {
              $('#filter-results').html(data);
          },
          error: function(xhr, status, error) {
              console.log(xhr.responseText);
          }
      });
  });
});
