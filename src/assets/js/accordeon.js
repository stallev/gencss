let accordeonList = document.querySelectorAll('.accordeon');

if(accordeonList){
  accordeonList.forEach(
    block => {
      let accordeonTabLinks = block.querySelectorAll('.accordeon__item-nav-link');
      let accordeonItemsContentList = block.querySelectorAll('.accordeon__item-content');
      if(accordeonTabLinks&&accordeonItemsContentList){
        accordeonTabLinks.forEach(
          link => {
            link.addEventListener('click', function(e){
              e.preventDefault();
              accordeonTabLinks.forEach(
                navLink => {
                  navLink.classList.remove('accordeon__item-nav-link--active');
                }
              );
              accordeonItemsContentList.forEach(
                accordeonItemsContent => {
                  accordeonItemsContent.classList.remove('accordeon__item-content--active');
                }
              );
              let activeAccordeonItemID = e.target.getAttribute('data-tab-id');
              e.target.classList.add('accordeon__item-nav-link--active');
              document.getElementById(activeAccordeonItemID).classList.add('accordeon__item-content--active');
            })
          }
        )
      }
    }
  )
}
