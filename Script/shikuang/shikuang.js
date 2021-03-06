//查询开始时间
var searchStime = null;

//查询结束时间
var searchEtime = null;


//查询开始时间-定时任务
var searchStime_timeWork = null;

//查询结束时间-定时任务
var searchEtime_timeWork = null;

//定时器-定时任务
var timer_timeWork = null;

//查询雨量等级
var searchYldj = null;

//历史情景ID
var _hisStormId = -1;

//雨量放大值
var _rainPlus = 0;

//雨量放大类型
var _plusType = 0;

//查询计划
var searchPlan = "0";

//查询周期
var selectDays = "3";

//查询种类，实况
var searchType = "1";

//查询区域,全省
var searchRange = "14";

//工具类
var tools = new Tools();

//站点配置信息(所有站)
var baseConfigStcdsInfo = null;

//实况数据信息
var data_RealInfos = null;

//等值面信息
var earth_info = null;



$(document).ready(function () {

    //初始化参数
    initParams();


    //加载数据
    reloadPage();

    //窗口重绘
    $(window).resize(function () {
        resizeWindow2();
    });




});

/*
 * 初始化参数部分
 * */
function initParams() {
    initParamsByAbstract();

    // $("#icon_bar,#icon_bar2,#icon_bar3").click();
}

/*
 * 窗体大小自适应
 * */
function resizeWindow2() {

    var w_l = 0 - (cur_ec_first - 1) * $(".echart-group").width() / 5;
    $(".ec_1").css("margin-left", w_l + "px");

    $.each(arr_chart, function (index, item) {
        if (item != null) {
            item.resize();
        }
    });
}

/*
 * 
 * 收缩图例点击事件
 */
$("#icon_bar,#icon_bar2,#icon_bar3").click(function () {
    updateIconBar($(this)[0].id);
});



/**
 * 更新弹窗信息位置
 * */
function updateInfoWindowPosition() {
    if (($("#icon_bar").css("left") == "0px") || ($("#icon_bar2").css("right") == "0px") || ($("#icon_bar3").css("bottom") == "0px")) {

        icon_bar_1_show();
        icon_bar_2_show();
        icon_bar_3_show();
    } else {

        icon_bar_1_hide();
        icon_bar_2_hide();
        icon_bar_3_hide();

    }
}

//左侧显示
function icon_bar_1_show() {

    if ($("#icon_bar").css("left") == "0px")
        $("#icon_bar").prev().animate({ width: 'toggle' }, 200);

    $("#icon_bar").animate({ left: '350px' }, 200);
    $("#icon_bar img").attr("src", "img/icon_bar_left_on.png");
    sengMsgToEarth({
        data: null,
        des: "左显示",
        isDelay: false
    })
}

//左侧隐藏
function icon_bar_1_hide() {
    if ($("#icon_bar").css("left") != "0px")
        $("#icon_bar").prev().animate({ width: 'toggle' }, 200);

    $("#icon_bar").animate({ left: '0px' }, 200);
    $("#icon_bar img").attr("src", "img/icon_bar_left_off.png");
    sengMsgToEarth({
        data: null,
        des: "左隐藏",
        isDelay: false
    })
}


//右侧显示
function icon_bar_2_show() {
    if ($("#icon_bar2").css("right") == "0px")
        $("#icon_bar2").prev().animate({ width: 'toggle' }, 200);

    $("#icon_bar2 img").attr("src", "img/icon_bar_right_on.png");
    $("#icon_bar2").animate({ right: '300px' }, 200);

    //重置右侧超警站点列表定时任务
    resetScrollTimer();
    sengMsgToEarth({
        data: null,
        des: "右显示",
        isDelay: false
    })
}

//右侧隐藏
function icon_bar_2_hide() {
    if ($("#icon_bar2").css("right") != "0px")
        $("#icon_bar2").prev().animate({ width: 'toggle' }, 200);

    $("#icon_bar2").animate({ right: '0px' }, 200);
    $("#icon_bar2 img").attr("src", "img/icon_bar_right_off.png");


    sengMsgToEarth({
        data: null,
        des: "右隐藏",
        isDelay: false
    })
}

//下侧显示
function icon_bar_3_show() {
    $(".center03").animate({ bottom: '25px' }, 200);
    $("#icon_bar3 img").attr("src", "img/icon_bar_down_on.png");
    $("#icon_bar3").animate({ bottom: '175px' }, 200);

    sengMsgToEarth({
        data: null,
        des: "上移",
        isDelay: false
    })
}

//下侧隐藏
function icon_bar_3_hide() {
    $(".center03").animate({ bottom: '-150px' }, 200);
    $("#icon_bar3").animate({ bottom: '0px' }, 200);
    $("#icon_bar3 img").attr("src", "img/icon_bar_down_off.png");

    sengMsgToEarth({
        data: null,
        des: "下移",
        isDelay: false
    })
}
/**
 * 点击收缩图标时更新图标位置
 * @param {any} id 图标id
 */
function updateIconBar(id) {
    if (id == "icon_bar") {
        if ($("#icon_bar").css("left") != "0px") {
            icon_bar_1_hide();
        }
        else {
            icon_bar_1_show();
        }

    }
    else if (id == "icon_bar2") {
        if ($("#icon_bar2").css("right") != "0px") {
            icon_bar_2_hide();
        }
        else {
            icon_bar_2_show();

        }


    }
    else if (id == "icon_bar3") {
        if ($("#icon_bar3").css("bottom") != "0px") {
            icon_bar_3_hide();

        }
        else {
            icon_bar_3_show();

        }
    }


}

/**
 * 显示重要文档
 * @param {文档类型} type 
 */
function showDocList(type) {

    //  showPdf();
    if (type == 3)
        showPdfList();
    else
        getRealWsReport(type);

}
