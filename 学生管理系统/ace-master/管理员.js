
window.onload = function () {
    // 获取登录时的特殊值
    console.log($('#yhm'));
}
// 获取数据
var sj = JSON.parse(localStorage.sj);
// console.log(sj[0]);

$.each(sj, function (i, v) {
    // 根据老师的班级来判断哪些学生
    if (v.bj == 1) {
        // 添加学生信息
        $('tbody').append('<tr>' +
            '<th>' + v.number + '</th>' +
            '<th>' + v.name + '</th>' +
            '<th>' + v.age + '</th>' +
            '<th>' + v.sex + '</th>' +
            '<th>' + v.zhuanye + '</th>' +
            '<th>' + v.chengji + '</th>' +
            '<th>' + v.city + '</th>' +
            '<th>' + v.dy + '</th>' +
            '<th>' +
            '<button class="xiugai" data-index=' + i + '>修改</button>' +
            '<button class="delete" data-index=' + i + '>删除</button>' +
            '</th>' +
            '</tr>');
    }
});

// console.log($('th'))

// 添加
$('#add').click(function () {
    var newNumber = prompt('请输入编号：'),
        newName = prompt('请输入名字：'),
        newAge = prompt('请输入年龄：'),
        newSex = prompt('请输入性别：'),
        newZhuanYe = prompt('请输入专业：'),
        newChengJi = prompt('请输入成绩：'),
        newChengShi = prompt('请输入城市：'),
        newDangYuan = prompt('是否是党员：');

    $('tbody').append('<tr>' +
        '<th>' + newNumber + '</th>' +
        '<th>' + newName + '</th>' +
        '<th>' + newAge + '</th>' +
        '<th>' + newSex + '</th>' +
        '<th>' + newZhuanYe + '</th>' +
        '<th>' + newChengJi + '</th>' +
        '<th>' + newChengShi + '</th>' +
        '<th>' + newDangYuan + '</th>' +
        '<th>' +
        '<button class="xiugai" data-index=' + i + '>修改</button>' +
        '<button class="delete" data-index=' + i + '>删除</button>' +
        '</th>' +
        '</tr>');
    sj.length = [{
        number: newNumber,
        name: newName,
        age: newAge,
        sex: newSex,
        zhuanye: newZhuanYe,
        chengji: newChengJi,
        city: newChengShi,
    }]
    // 删除数据
    localStorage.removeItem('sj');
    // 添加删除后的数据
    localStorage.setItem('sj', JSON.stringify(sj));
})

// 修改功能
$('th').not($('th:lt(2)')).click(function () {
    // console.log($(this).siblings())
});

// 删除功能
$('.delete').click(function () {
    // 删除单元格
    var index = $(this).data('index');
    sj.splice(index, 1);
    console.log(sj);
    // 删除数据
    localStorage.removeItem('sj');
    // 添加删除后的数据
    localStorage.setItem('sj', JSON.stringify(sj));
});