var stuArr=JSON.parse(localStorage.student);
// console.log(stuArr);

//页面数据
var arr=[];

//第一页
firstPage(stuArr,1,5);


pageTable();



//初始化表格
function pageTable(){
    
    //页数
    contPage(stuArr,5);
    

    //渲染数据
    render(arr);


    //分页
    // page(stuArr);

    
}

//渲染页面数据
function render(arr){
    var tr='';

    $.each(arr,function(index,arr){
        // console.log(arr.name);
        tr+= '<tr>'+
        '<td>'+arr.name+'</td>'+
        '<td>'+arr.age+'</td>'+
        '<td>'+arr.number+'</td>'+
        '<td>'+arr.sex+'</td>'+
        '<td>'+arr.zhuanye+'</td>'+
        '<td>'+arr.bj+'</td>'+
        '<td>'+arr.city+'</td>'+
        '<td><button class="delbt" data-index='+index+'>删除</button>&emsp;<button class="update" data-index='+index+'>修改</button>'+'</tr>';
    });

    $('tbody').html(tr);
}

//获取第一页数据
function firstPage(ar,index,page){
    arr=ar.slice((index-1)*page, index * page);
    $('#first').text(1);
}



//总页数
// console.log($('#cont').text());
function contPage(arr,page){
    $('#cont').text(Math.ceil(arr.length/page));
    var first=$('#first').text();
    var cont=$('#cont').text();
    if(first>cont){
        first=cont;
        $('#first').text(first);
    }
    
}

//下一页
$('#next').on(
    'click',function(){
    var first=$('#first').text();
    var cont=$('#cont').text();
    if(first<cont){
        arr=stuArr.slice(first*5,(Number(first)+1)*5);
        first++;
        
        // console.log(arr);
    }else{
        first=cont;
    }
    $('#first').text(first);
    render(arr);
    
})

//上一页
$('#pre').click(function(){
    var first=$('#first').text();
    var cont=$('#cont').text();
    if(first<=cont && first>1){
        arr=stuArr.slice((first-2)*5,(first-1)*5);
        first--;
    }
    $('#first').text(first);
    render(arr);
})


//删除数据
$('table').on('click','.delbt',function(){

    //stuArr中的下标
    var num=($('#first').text()-1)*5+$(this).data('index');
    // $(this).data('index')
    // console.log(num);
    //删除数据并存入
    stuArr.splice(num,1);
    localStorage.setItem('student',JSON.stringify(stuArr)); 
    // arr.splice($(this).data('index'),1);
    // render(stuArr);
    // render(arr);

    contPage(stuArr,5);

    //页数下标
    var index=$('#first').text();

    arr=stuArr.slice((index-1)*5, index * 5);

    pageTable();
    // console.log(localStorage.xs);
    
})
// 样式
$('.top').css({
    'float':'right',
    'padding-right':'50px'
});
$('#div button').css({
    float:'left',
    'margin-left':'10px',
    border:'1 solid red'
});
$('input').css({
    'outline':'none'
});

//添加学生信息
$('#modal').css({
    width:'100%',
    height:'100%',
    position:'fixed',
    margin:'auto',
    left:'0',
    top:'0',
    bottom:'0',
    right:'0',
    background:'rgb(209, 202, 202',
    opacity:'.4',
    display:'none'
})
$('#xinxi').css({
    width:'300',
    height:'500',
    position:'fixed',
    margin:'auto',
    left:'0',
    top:'0',
    bottom:'0',
    right:'0',
    background:'white',
    zindex: '1',
    display:'none',
    padding:'35'
    
});


//修改  弹出模态框
$('table').on('click','.update',function(){
    $('#xiuGai').css('display','block');
    $('#queRen').css('display','none');
    $('#modal').css('display','block');
    $('#xinxi').css('display','block');

    //stuArr中的下标
    var num=($('#first').text()-1)*5+$(this).data('index');
    //存入数据
    localStorage.setItem('index',num);
    //显示信息
    $('#uname').val(stuArr[num].name);
    $('#age').val(stuArr[num].age);
    $('#id').val(stuArr[num].number);
    // $('#id').css('readonly',readonly);
    //判断性别
    var sex=stuArr[num].sex;
    if(sex=='男'){
        $('[name=sex]:eq(0)').prop('checked',true);
    }else{
        $('[name=sex]:eq(1)').prop('checked',true);
    }
    $('#zhuanye').val(stuArr[num].zhuanye);
    $('#bj').val(stuArr[num].bj);
    $('#city').val(stuArr[num].city);
    
    
});
//确认修改
$('#xinxi').on('click','#xiuGai',function(){
    var name=$('#uname').val();
    name=$.trim(name);
    var age=$('#age').val();
    var id=$('#id').val();
    var sex=$('[name=sex]:checked').next().text();
    var zhuanye=$('#zhuanye').val();
    var bj=$('#bj').val();
    var city=$('#city').val();

    //从存储中获取stuArr的下标数据
    var index=localStorage.getItem('index');
    // console.log(index);

    //修改数据
    stuArr[index].name=name;
    stuArr[index].age=age;
    stuArr[index].number=id;
    stuArr[index].sex=sex;
    stuArr[index].zhuanye=zhuanye;
    stuArr[index].bj=bj;
    stuArr[index].city=city;
    // console.log(name);
    

    //页数下标
    var pageIndex=$('#first').text();
    arr=stuArr.slice((pageIndex-1)*5, pageIndex * 5);
    pageTable();
    

    localStorage.setItem('student',JSON.stringify(stuArr));
    $('#modal').css('display','none');
    $('#xinxi').css('display','none');
});


//添加信息
// var number=0;
$('#addBtn').on('click',function(){
    // console.log(11);
    $('#xiuGai').css('display','none');
    $('#queRen').css('display','block');
    $('#modal').css('display','block');
    $('#xinxi').css('display','block');
    $('#xinxi input').val(' ');
    str=stuArr[stuArr.length-1].number;
    
    str1=stuArr[0].number;

    //判断 取第一个还是最后一个
    var number= str>str1?str:str1;
    $('#id').val(Number(number)+1);

    // console.log(typeof number);
})

//确定添加
$('#queRen').on('click',function(){
    
    $('#modal').css('display','none');
    $('#xinxi').css('display','none');
    //获取数据
    // console.log($('#name').val());
    var name=$('#uname').val();
    name=$.trim(name);
    var age=$('#age').val();
    var number=$('#id').val();//
    
    // console.log(typeof number);
    var sex=$('[name=sex]:checked').next().text();//
    var zhuanye=$('#zhuanye').val();
    var bj=$('#bj').val();
    var city=$('#city').val();

    // console.log($('[name=sex]:checked').next().text());

    //添加数据
    stuArr.unshift({name,age,number,sex,zhuanye,bj,city});
    localStorage.setItem('student',JSON.stringify(stuArr)); 


    //第一页
    firstPage(stuArr,1,5);
    // render(arr);
    pageTable();
    // {name:"伏陈1",age:14,namber:"131",sex:"男",zhunye:"前端",bj:"3",cidy:"巴中",tp:"学生管理系统\微信图片_20200805100056.png"}

});

//取消
$('#quXiao').on('click',function(){
    $('#modal').css('display','none');
    $('#xinxi').css('display','none');
});

//跳转页面
$('#tiaoZhuan').on('click',function(){
    // console.log($('#page').val());

    var first=$('#first').text();
    var cont=$('#cont').text();
    //页数
    var index=$('#page').val();

    //判断
    if(index>0 && index<=cont){
        //跳转并在页面显示
        arr=stuArr.slice((index-1)*5, index * 5);
        render(arr);
        $('#first').text(index);
    }else{
        alert('请输入合理的页数');
    }
    $('#page').val('')
    
});

//首页
$('#firstPage').on('click',function(){
    arr=stuArr.slice(0,5);
    render(arr);
    $('#first').text('1');
});

//尾页
$('#lastPage').on('click',function(){
    //总页数
    var cont=$('#cont').text();
    arr=stuArr.slice((cont-1)*5, cont * 5);
    render(arr);
    $('#first').text(cont);
});


//查询
$('#select').on('click',function(){
    if($('#selectVal').val()==''){
        firstPage(stuArr,1,5);
        pageTable();

    }else{
        //获取输入内容
        // console.log($('#selectVal').val());
        var str=$('#selectVal').val();
        var stu=[];
        //数据查询出来的下标
        // var index;
        // var stuArr=JSON.parse(localStorage.xs);
        // console.log(stuArr);

        for(var i=0;i<stuArr.length;i++){
            if(str==stuArr[i].name){
                stu.push(stuArr[i]);
                // console.log(11);
            }
        }
        // arr.slice(0);
        // console.log(stu);


        render(stu);
        contPage(stu,5);
        $('#selectVal').val('');
    }

});