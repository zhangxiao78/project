define(["jquery"], function($) {
     $.fn.extend({
          lunbo:function(obj){
               var goPrev = $("#goPrev"),
		         goNext = $("#goNext");

		     var $imgs = this.find("ul li");

		     var index = 0,
                   len = $imgs.length,
                   flag = false,
                   timer = null;
			// 切换上一张
               goPrev.click(function(){
                    if(!flag){
                         flag = true;
                         $imgs.eq(index).fadeOut();
                         if(--index < 0){
                              index = len-1;
                         }
                         $imgs.eq(index).fadeIn(function(){
                              flag = false;
                              this.index = index;
                         });
                    }
               })
               // 切换下一张
               goNext.click(function(){
                    if(!flag){
                         flag = true;
                         $imgs.eq(index).fadeOut();
                         if(++index >= len){
                              index = 0;
                         }
                         $imgs.eq(index).fadeIn(function(){
                              flag = false;
                              this.index = index;
                         });
                    }
               })
               // 自动轮播
               this.hover(function(){
                    clearInterval(timer);
               },(function autoPlay(){
                    timer = setInterval(function(){
                         goNext.trigger("click");
                    },2500);
                    return autoPlay;
               })());
          }
     })
});