$(function(){
    var newImg;
    var clientH=$(window).height();
    var clientW=$(window).width();
    var w = '800';//遮罩图片的宽
    var h = '500';//遮罩图片的高
    $(document).ready(function(){
        $(".lightbox-item").bind("click", function(){
            //绑定事件
            $('.bgImg').css('display','block');
            //点击后隐藏遮罩
            newImg = $(this).find('img').attr('src');
            //获取当前的图片
            // console.log(newImg);
            $("body").append('<div class="fillbg"></div>');
            //插入遮罩
            $(".fillbg").addClass("fillbg-active");
            //添加类名
            $('.bgImg').css({'width': w+"px",'height': h+"px",'top':(clientH-h)/2+"px",'left':(clientW-w)/2+"px",'z-index':1101});
            $('.bgImg').attr("src",newImg);
        });

        $(".bgImg").bind("click", function(){
            $(".fill-input").removeClass("fill-input-active");
            setTimeout(function(){
                $(".fillbg-active").removeClass("fillbg-active");
                $(".fillbg").remove();
            },300);
            $('.bgImg').css({'width': '0px','height': '0px'});
            $('.bgImg').attr("src",'');
        });
    });

    
    
});