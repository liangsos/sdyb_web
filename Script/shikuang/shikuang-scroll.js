///////////////
/*右侧列表滚动效果参数说明*/

//定时器
var timer_scrollMove = null;
var timer_scrollMove_2 = null;


//元素
var box = document.getElementById("rainWW");
var l1 = document.getElementById("rainData");
var l2 = document.getElementById("rainData_bk");

var box_2 = document.getElementById("rainWW_2");
var l1_2 = document.getElementById("rainData_2");
var l2_2 = document.getElementById("rainData_2_bk");


/**
 *  初始化雨量数据(右侧两个列表)
 * @param {any} type 类型 "hd","sk"
 * @param {any} data 数据
 */
function initRainData(type, data) {
    var rainStr = ""
    for (var i = 0; i < data.length; i++) {
        var sjx = "";
        var chazhi = data[i].difference;
        var name = data[i].stnm;
        var value = data[i].z;
        var li_class = "yuqing01111";
        if (chazhi == 0) {
            sjx = "triangle-ping ";
        }
        else if (chazhi > 0) {
            sjx = "triangle-up ";
        }
        else {
            sjx = "triangle-down ";
        }
        // forEach遍历大数组 并且内容赋值
        rainStr += `
                    <li class = " `+ li_class + `" >
                         <img src="img/icon_cbz.png" style="width:14px;height:12px;margin-left: 14px;"></img><span class="span01">` + name + `</span>
                        <span class ="span02"> `+ value + ` </span>
                        <span class ="span03 "> ` + chazhi + ` <span class = "` + sjx + `" ></span></span>


                    </li>`;
    }

    if (type == "hd")
        document.querySelector('.rainData').innerHTML = (rainStr == "" ? "<span style='margin-left:65px; color: rgba(255,255,255,0.5)'>暂无超警戒超保证站点 </span>" : rainStr);
    else if (type == "sk")
        document.querySelector('.rainData_2').innerHTML = (rainStr == "" ? "<span style='margin-left:65px; color: rgba(255,255,255,0.5)'>暂无超汛限超设计站点</span>" : rainStr);

    listMove();
}
/**
 * 自动移动列表
 * */
function autoScroll() {
    timer_scrollMove = null;
    if (l1.innerHTML.indexOf("暂无超警戒超保证站点") > -1)
        return;

    if (l1.offsetHeight > box.offsetHeight) {
        l2.innerHTML = l1.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
        timer_scrollMove = setInterval(scrollup, 2000);//数值越大，滚动速度越慢
        box.onmouseover = function () {
            clearInterval(timer_scrollMove)
        }
    }
}

/**
 * 滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，
 * 此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
 * */
function scrollup() {
    if (box.scrollTop >= l1.offsetHeight) {
        //alert("asd");
        box.scrollTop = 0;
    } else {
        $("#rainWW").animate({ scrollTop: (box.scrollTop + 33) + 'px' }, 1000);
        //box.scrollTop+=28;
    }
}


/**
 * 鼠标离开时，滚动继续
 * */
box.onmouseout = function () {
    timer_scrollMove = setInterval(scrollup, 2000);
}

function autoScroll_2() {
    timer_scrollMove_2 = null;
    if (l1_2.innerHTML.indexOf("暂无超汛限超设计站点") > -1)
        return;

    if (l1_2.offsetHeight > box_2.offsetHeight) {
        l2_2.innerHTML = l1_2.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
        timer_scrollMove_2 = setInterval(scrollup_2, 2000);//数值越大，滚动速度越慢
        box_2.onmouseover = function () {
            clearInterval(timer_scrollMove_2)
        }
    }
}
/**
 * 滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，
 * 此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
 * */
function scrollup_2() {
    //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
    if (box_2.scrollTop >= l1_2.offsetHeight) {
        //alert("asd");
        box_2.scrollTop = 0;
    } else {
        $("#rainWW_2").animate({ scrollTop: (box_2.scrollTop + 33) + 'px' }, 1000);
        //box.scrollTop+=28;
    }
}



/**
 * 鼠标离开时，滚动继续
 * */
box_2.onmouseout = function () {
    timer_scrollMove_2 = setInterval(scrollup_2, 2000);
}


//开启移动，两个列表稍微错开一点时间
function listMove() {
    autoScroll();
    setTimeout(function () { autoScroll_2() }, 2000)
}


/**
 * 清除列表移动所有内容
 * */
function listMoveClear() {
    clearInterval(timer_scrollMove)
    clearInterval(timer_scrollMove_2)
    $("#rainWW").animate({ scrollTop: '0px' }, 10);
    $("#rainWW_2").animate({ scrollTop: '0px' }, 10);
    document.querySelector('.rainData').innerHTML = "";
    document.querySelector('.rainData_2').innerHTML = "";
    document.querySelector('.rainData_bk').innerHTML = "";
    document.querySelector('.rainData_2_bk').innerHTML = "";
}