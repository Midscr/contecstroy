$(document).ready(function(){$(".cert").slick({slidesToShow:3,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3})}),$(document).ready(function(){var e=/^[А-Яа-я]{3,}$/,n=/^[^_]+$/,t=$(".name"),i=$(".number"),o=($(".form__checkbox-custom"),$('input[type="checkbox"]')),s=$(".js-callback");t.on("blur",function(){var n=e.test(t.val());n||t.addClass("bug");return n}),t.on("focus",function(){t.removeClass("bug")}),i.inputmask(),i.on("blur",function(){var e=n.test(i.val());e||i.addClass("bug");return e}),i.on("focus",function(){i.removeClass("bug")}),o.on("click",function(){o.is(":checked")?$(".form__btn").removeAttr("disabled"):$(".form__btn").attr("disabled","disabled")}),s.on("click",function(){vex.dialog.open({showCloseButton:!0,escapeButtonCloses:!0,message:"Пожалуйста, оформите заявку",input:['<div class="vex-input-1">','<input class="name" name="name" type="text" placeholder="Имя" required />','<input class="number" name="phone" type="text" placeholder="Телефон" required />','<button class="vex-dialog-button"type="submit"/>ОФОРМИТЬ ЗАЯВКУ',"</div>",'<div class="vex-input-2">','<textarea class="text" rows="5" placeholder="Опишите задачу (по желанию)"></textarea>',"</div>",'<button class="vex-dialog-button2 "type="submit"/>ОФОРМИТЬ ЗАЯВКУ'].join(""),buttons:[],callback:function(e){e&&$.post("/callback?",{name:e.name,number:e.phone})}}),$(".vex-content .number").inputmask({mask:"+7(999) 999-9999"})})}),$(document).ready(function(){var e=$(".pImg-js"),n=$(".mainpotfolio__fotoList"),t=[];for(let e=0;e<n.children().length;e++){var i=$(n.children()[e]).html();t.splice(e,0,i)}vex.registerPlugin(function(e){return{name:"popupImg",open:function(n){return e.open(n)}}});var o="";t.forEach(function(e){o+=e});var s='<div class="slider-img">'+o+"</div>";e.on("click",function(){var e=t.indexOf($(this)[0].outerHTML);vex.popupImg.open({unsafeContent:s,contentClassName:"imggallery",afterOpen:function(){$(".slider-img").slick({dots:!0,infinite:!0,speed:500,fade:!0,cssEase:"linear"}),$(".slider-img").slick("slickGoTo",e)}})})}),$(document).ready(function(){var e=$(".slider__frame"),n=$(".slider__list"),t=$(".slider__item"),i=$(".slider__indicator"),o=0;function s(s){$(i[o]).removeClass("active"),(o=s)>=t.length?o=0:o<0&&(o=t.length-1),n.css("left",-e.innerWidth()*o+"px"),$(i[o]).addClass("active")}$(".slider__next").on("click",e=>{s(o+1)}),$(".slider__prev").on("click",e=>{s(o-1)}),i.click(function(){s(parseInt($(this).attr("data-index")))});var a=$(".headerbottom__subnav");$(".indicator.headerbottom__navitems").on("click",function(){$window.width()>768||$(this).find(".headerbottom__subnav").slideToggle()}),$window=$(window),$window.on("resize",function(){$window.width()<768?a.slideUp():a.slideDown(),t.css("width",e.innerWidth()+"px"),s(o)}),$window.resize()});