// 当前显示的图片
var index=0;
//下一张显示的图片
var nextIndex=0;
// 计时器
var timer;
// 开始自动轮播
autoPlay();
//封装函数  叠化动画
function animationPlay(){
    // eq() 选择器  选取带有指定下标的元素
    // fadeOut() 方法使用淡出效果 来影藏被选中的元素
    // stop()关闭上一次的动画
    // fadeIn() 方法使用淡出效果 来显示被选中的元素
    $(".box img").eq(index).stop().fadeOut(500);
    $(".box img").eq(nextIndex).stop().fadeIn(500);
    //小圆点跟到变化
    // addClass()  向备选的元素添加多个类
    // siblings() 返回被选元素的所有同级元素
    $(".box ul li").eq(nextIndex).addClass("listOne").siblings().removeClass("listOne");
}

//开始轮播动画
function autoPlay(){
    // setInterval(函数，间隔时间)  设置计时器
    timer= setInterval(function(){
        if(nextIndex >= 5 ){
            nextIndex =0;
        }else{
            nextIndex++;
        }
        // 调用叠化动画
    animationPlay();
    // 下一张开始显示  变成当前显示
    index = nextIndex; 
    },1000);
    
}

// 鼠标经过小圆点 
$(".box ul li").mouseover(function(){
    // clearInterval(timer); 清除计时器
    clearInterval(timer);
    //获取鼠标当前获取的下标，赋值给下一张
    nextIndex = $(this).index();
    animationPlay();
    index=nextIndex;
}).mouseleave(function(){
    // 继续自动伦比
    autoPlay();
});

// 下一张
$(".box .rightBtn").click(function(){
    if(nextIndex >=5){
        nextIndex=0;
    }else{
        nextIndex++
    }
    animationPlay();
    index = nextIndex; 
    clearInterval(timer);
    autoPlay();
});

//上一张
$(".box .leftBtn").click(function(){
    if(nextIndex <=0){
        nextIndex=5;
    }else{
        nextIndex--
    }
    animationPlay();
    index = nextIndex; 
    clearInterval(timer);
    autoPlay();
});

