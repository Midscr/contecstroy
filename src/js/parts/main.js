$(document).ready(function() {
  // slider
  // var sliderFrame = $('.slider__frame');
  // var sliderList = $('.slider__list');
  // var slides = $('.slider__item');
  // var sliderIndicators = $('.slider__indicator');
  // var currentIndex = 0;

  // $('.slider__next').on('click', event => {
  //   move(currentIndex + 1);
  // });

  // $('.slider__prev').on('click', event => {
  //   move(currentIndex - 1);
  // });

  // sliderIndicators.click(function() {
  //   move(parseInt($(this).attr('data-index')));
  // });

  // function move(index) {
  //   $(sliderIndicators[currentIndex]).removeClass('active');
  //   currentIndex = index;

  //   if (currentIndex >= slides.length) currentIndex = 0;
  //   else if (currentIndex < 0) currentIndex = slides.length - 1;

  //   sliderList.css('left', -sliderFrame.innerWidth() * currentIndex + 'px');
  //   $(sliderIndicators[currentIndex]).addClass('active');
  // }

  // menu
  var subMenu = $('.headerbottom__subnav');
  var subMenuToggler = $('.indicator.headerbottom__navitems');

  subMenuToggler.on('click', function() {
    if ($window.width() > 768) return;
    $(this)
      .find('.headerbottom__subnav')
      .slideToggle();
  });

  $window = $(window);
  $window.on('resize', function() {
    if ($window.width() < 768) subMenu.slideUp();
    else subMenu.slideDown();
    slides.css('width', sliderFrame.innerWidth() + 'px');
    move(currentIndex);
  });
  $window.resize();
});
