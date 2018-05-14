$(document).ready(function() {
  var $popupImg = $('.pImg-js');
  var $blockImg = $('.mainpotfolio__fotoList');
  var imgList = [];
  for (let i = 0; i < $blockImg.children().length; i++) {
    var element = $($blockImg.children()[i]).html();
    imgList.splice(i, 0, element);
  }
  var popupImgPlugin = function(vex) {
    return {
      name: 'popupImg',
      open: function(options) {
        return vex.open(options);
      }
    };
  };
  vex.registerPlugin(popupImgPlugin);
  var imgListHtml = '';
  imgList.forEach(function(item) {
    imgListHtml += item;
  });

  var sliderImg = '<div class="slider-img">' + imgListHtml + '</div>';

  $popupImg.on('click', function() {
    var activeImg = imgList.indexOf($(this)[0].outerHTML);

    vex.popupImg.open({
      unsafeContent: sliderImg,
      contentClassName: 'imggallery',
      afterOpen: function() {
        $('.slider-img').slick({ dots: true, infinite: true, speed: 500, fade: true, cssEase: 'linear' });
        $('.slider-img').slick('slickGoTo', activeImg);
      }
    });
  });
});
