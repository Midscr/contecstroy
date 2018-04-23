(function slider() {
  const sliderFrame = $('.slider__frame');
  const sliderList = $('.slider__list');
  const slides = $('.slider__item');
  const sliderIndicators = $('.slider__indicator');
  let currentIndex = 0;

  $(window).on('resize', function () {
    slides.css('width', sliderFrame.innerWidth() + 'px');
    move(currentIndex);
  });
  $(window).resize();

  $('.slider__next').on('click', (event) => {
    move(currentIndex + 1);
  });

  $('.slider__prev').on('click', (event) => {
    move(currentIndex - 1);
  });

  sliderIndicators.click(function () {
    move(parseInt($(this).attr('data-index')));
  });

  function move(index) {
    $(sliderIndicators[currentIndex]).removeClass('active');
    currentIndex = index;

    if (currentIndex >= slides.length) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = slides.length - 1;

    sliderList.css('left', (-sliderFrame.innerWidth() * currentIndex) + 'px');
    $(sliderIndicators[currentIndex]).addClass('active');
  }
})();