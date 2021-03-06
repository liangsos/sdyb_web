//通用工具类
var tools, tools_panel, tools_panel_all, tools_panel_allYb, tool_dispatch, tool_dispatch_xxtj, tool_result, tools_historyFlood, tools_panel_cgxz, tools_panel_yxyl, tools_panel_clxs, tools_rainReport, tools_panel_swys, tools_panel_sdljs, tools_panel_singleDm;
//当前查询类型  1实况 2预报 3调度 4单元产汇流信息
var searchType = "-1";

var ApiUrlHuaiHe = "panelNew.aspx";
var ApiUrlSiShui = "panelNew.aspx";

//当前查询范围
var searchRange = "-1";
//查询范围分割线，6以下是淮河水系，6以上是沂沭泗水系，使用的接口地址不一样
var RangeDividingLine = 6;
var searchRangeName = "";
//当前查询-开始时间
var searchStime = "";
var selectDays = "3";
//当前查询-结束时间
var searchEtime = "";
//当前查询降雨方案
var searchPlan = "";

var _hisStormId = -1;
//当前查询-开始时间
var _rainPlus = 0;
var _plusType = 0;

//预报菜单 1-预报 2-预警 3-预演 4-预案 默认是预报
let ybMenu = 1

var default_room = 17;
var default_scheduleType = 2;
var onekeyyb = "0";
var onekeydd = "0";
//导出的json数据及类型 add by chl 20200402
var outjson = "";
var outjsonStcd = ""; //单站数据
var outshow_sttp = ""; //单站类型

//是否选择了新安江模式
var is_selectXAJ = false;
//是否选择了洪泽湖以上水系
var isHzh = false;
var isGetForInfoReturn = false;
var isshowTJb = false;
var isshowMainInfo = false;
var isshowybMD = false;
var timerGL = null;
var timerFBS = null;
var grogressPersent = 0;
var isyuyan = false;
var selectModes = null;
var selectModesLastYb = null;
var selectModelsName = null;
let yhddTimer = null
let grogressPersentYhdd = null
var cur_setp = 0;

var last_setp = 0;

var raindaysinfo = null;
var rain_echart = null;


var isFbsParamsOK = false;
var isGetFbsResult = false;

var fbs_stm_auto = null;
var fbs_etm_auto = null;

var stopNum = 0;
var stopID = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
var max_searchRange = 14;
var ybddMapType = 1;
//成果修正标志
var isCgxz = false;

var isgetprogress = false;
var curprogresstype = "";
var treeModel = null;
//是否为预警
var isYj = false;

//是否保存预报方案
var isSaveForPro = false;

//确认要修改的模型
var modifyModel = "";
//降雨模式
var meteor = "";
//是否已经进行过预报计算——用于预警预演预案切回预报
var isAlreadyCal = false;
//是否进行了模型修正入库、
var isModifyAndSave = false

//预报条件设置进行到哪一步
//0表示未进行条件设置，1 时间设置 2预报情景 3 预报模型
var ybCondition = 0;

//选择范围数组
var arrRange = [{
    river: "沂沭泗水系",
    id: "1",
    subRiver: "漳卫南运河",
    stcd: "31000101",
    stnm: "临清",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "2",
    subRiver: "徒骇马颊河",
    stcd: "31103211",
    stnm: "聊城",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "3",
    subRiver: "大汶河",
    stcd: "41500101",
    stnm: "莱芜",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "4",
    subRiver: "潍弥白浪区",
    stcd: "41807100",
    stnm: "峡山水库",
    sttp: "RR",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "5",
    subRiver: "胶莱大沽区",
    stcd: "41810401",
    stnm: "南村",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "6",
    subRiver: "胶东半岛区",
    stcd: "41816401",
    stnm: "团旺",
    sttp: "ZQ",
    show: "s"
},
{
    river: "沂沭泗水系",
    id: "7",
    subRiver: "独流入海区",
    stcd: "41812111",
    stnm: "胶南",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "8",
    subRiver: "上级湖湖西区",
    stcd: "51213801",
    stnm: "鱼台",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "9",
    subRiver: "上级湖湖东区",
    stcd: "51207201",
    stnm: "书院",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "10",
    subRiver: "下级湖湖东区",
    stcd: "51209011",
    stnm: "柴胡店",
    sttp: "ZQ",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "11",
    subRiver: "沂沭河区",
    stcd: "51101101",
    stnm: "临沂",
    sttp: "ZQ",
    show: "s"
},
{
    river: "沂沭泗水系",
    id: "12",
    subRiver: "中运河区",
    stcd: "51204301",
    stnm: "台儿庄闸",
    sttp: "DD",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "13",
    subRiver: "日赣区",
    stcd: "51300100",
    stnm: "日照水库",
    sttp: "RR",
    show: "h"
},
{
    river: "沂沭泗水系",
    id: "14",
    subRiver: "全部",
    stcd: "51101101",
    stnm: "临沂",
    sttp: "ZQ",
    show: "h"
},
];

var arrRange_real_lodingtime = [50, 54, 120, 130, 150, 130, 130, 130, 130, 130];
var arrRange_yb_lodingtime = [510, 510, 510, 510, 510, 450, 450, 450, 450, 450];
var arrRange_dd_lodingtime = [175, 175, 175, 175, 175, 175, 175, 175, 175, 175];
var arrRange_onekey_noclear_lodingtime = [545, 545, 545, 545, 545, 485, 485, 485, 485, 485];
var arrRange_onekey_clear_lodingtime = [750, 750, 750, 750, 750, 860, 860, 860, 860, 860];
var arrRange_fabj_lodingtime = [75, 75, 75, 75, 75, 235, 235, 235, 235, 235];
var arrRange_nynl_lodingtime = [45, 45, 45, 45, 45, 45, 45, 45, 45, 45];
var arrRange_dychxx_lodingtime = [45, 45, 45, 45, 45, 45, 45, 45, 45, 45];
var arrRange_yscz_lodingtime = [250, 250, 250, 250, 250, 250, 250, 250, 250, 250];
var arrRange_ddjg_lodingtime = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30];
$(document).ready(function () {

    document.oncontextmenu = function (ev) {
        return false; //屏蔽右键菜单
    }
    $("#_hid_token").val(getCookie("accessToken"));
    $("#_hid_userid").val(getCookie("userid"));

    tools = new Tools();
    //加载其他异步页面
    tools.ModuleLoad("#content_panel", "panel_ybdd.html", function () {
        // selectModes = getModel();
        //设置默认地图
        setDefaultMap();
    });
    var sessionStime = sessionStorage.getItem('stime');
    var sessionEtime = sessionStorage.getItem('etime');
    if (sessionStime != null) {
        tools.init_datarangepicker(".serach-tm .form-date", "YYYY-MM-DD HH:mm");
        $('#beginTime').data('daterangepicker').setStartDate(sessionStime);
        $('#beginTime').data('daterangepicker').setEndDate(sessionStime);
        $('#endTime').data('daterangepicker').setStartDate(sessionEtime);
        $('#endTime').data('daterangepicker').setEndDate(sessionEtime);
        sessionStorage.clear();
    } else {
        //系统当前日期
        var sysDate = new Date();
        //前一天日期(月初前一天为上月月底)
        var yesterday = getYesterday();
        var year = sysDate.getFullYear();
        var month = sysDate.getMonth() + 1;
        var day = sysDate.getDate();
        var time = year + "-" + month + "-" + day + " " + "08:00";
        tools.init_datarangepicker(".serach-tm .form-date", "YYYY-MM-DD HH:mm");
        $('#beginTime').data('daterangepicker').setStartDate(yesterday);
        $('#beginTime').data('daterangepicker').setEndDate(yesterday);
        $('#endTime').data('daterangepicker').setStartDate(time);
        $('#endTime').data('daterangepicker').setEndDate(time);
    }




    $('#beginTime').data('daterangepicker').setStartDate(getCookie("beginTime") == null ? "2020-08-12 08:00" : getCookie("beginTime"));
    $('#beginTime').data('daterangepicker').setEndDate(getCookie("beginTime") == null ? "2020-08-12 08:00" : getCookie("beginTime"));
    $('#endTime').data('daterangepicker').setStartDate(getCookie("endTime") == null ? "2020-08-14 12:00" : getCookie("endTime"));
    $('#endTime').data('daterangepicker').setEndDate(getCookie("endTime") == null ? "2020-08-14 12:00" : getCookie("endTime"));

    //收缩图例
    $("#icon_bar5").click(function () {

        if ($(this).prev().hasClass("qu_show")) {
            $(this).prev().removeClass("qu_show");
            $(".qy_bar_txt").html(" 弹<br/>出");
        } else {
            $(this).prev().addClass("qu_show");
            $(".qy_bar_txt").html(" 收<br/>起");
        }
        reset_yb_menu_ps(true);
        $(this).prev().animate({
            width: 'toggle'
        }, 288);
        $(this).toggleClass('hover');
    });

    $(".ghtbtn").click(function () {
        if (ybddMapType == 1) {
            if (showGaiHuaPic(searchRange)) {
                ybddMapType = 2;
                $("#icon_mapType").attr("src", "./page_h/img/icon_zzt.png");
            }
        } else {
            if (hideGaiHuaPic(searchRange)) {
                ybddMapType = 1;
                $("#icon_mapType").attr("src", "./page_h/img/icon_ght.png");
            }
        }
    });

    //展示单站预报成果
    $("#btnShowYb_svg").click(function () {

        var s_info = get_station_info($("#popup_svg").attr("data-stcd"));
        hide_popup_svg();
        if (s_info != null && s_info != "") {
            var arr_data = s_info.split("_");
            if (arr_data.length != 6) {
                return;
            }
            var _stnm = arr_data[0];
            var _stcd = arr_data[1];
            var _sttp = arr_data[2];

            tools_panel.show_type = searchType;
            tools_panel.show_all = false;
            tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
            GetTreeMenuData();
            tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
        }
    });
    //展示调度计算
    $("#btnShowDd_svg").click(function () {

        var s_info = get_station_info($("#popup_svg").attr("data-stcd"));
        hide_popup_svg();
        if (s_info != null && s_info != "") {
            var arr_data = s_info.split("_");
            if (arr_data.length != 6) {
                return;
            }
            var _stnm = arr_data[0];
            var _stcd = arr_data[1];
            var _sttp = arr_data[2];
            tool_dispatch.show_type = searchType;
            tool_dispatch.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
            GetTreeMenuData();
            tool_dispatch.panelShow(_stcd, _stnm, _sttp, searchStime, searchEtime);
        }
    });


    //初始化左侧区域列表
    initAreaList();

    //设置进度条宽度为屏幕一半
    $('.progress-bar').css('width', "50%");

    //窗口重绘
    $(window).resize(function () {
        resizeWindow();
    });



});

/**
 *
 * @param {any} isanimate 是否需要动画过渡，窗口刷新是不需要，左侧区域缩进会用到
 */
function reset_yb_menu_ps(isanimate) {

    //如果缩进去
    if (!$(".qy_area").hasClass("qu_show")) {

        //改变竖向预报菜单
        $("#yb_menu_s").animate({
            "left": "0px"
        }, 288);

        //改变横向预报菜单
        var n_width = $(document).width() / 2 - 330;
        if (isanimate == false) {
            $("#yb_menu_left").css({
                "left": "0px"
            });
            $("#yb_menu_center").css({
                "left": n_width + "px"
            });
        } else {
            $("#yb_menu_left").animate({
                "left": "0px"
            }, 288);
            $("#yb_menu_center").animate({
                "left": n_width + "px"
            }, 288);
        }

    } else {
        $("#yb_menu_s").animate({
            "left": "240px"
        }, 288);

        var n_width = $(document).width() / 2 - 330 + 120;
        if (isanimate == false) {
            $("#yb_menu_left").css({
                "left": "240px"
            });
            $("#yb_menu_center").css({
                "left": n_width + "px"
            });
        } else {
            $("#yb_menu_left").animate({
                "left": "240px"
            }, 288);
            $("#yb_menu_center").animate({
                "left": n_width + "px"
            }, 288);
        }


    }
}


/**
 * 预报计算
 * @param {any} isclear
 */
function yubaoproc(isclear) {

    searchType = "2";
    isyuyan = false;
    var btime = $("#beginTime").val() + ":00";
    var etime = $("#endTime").val() + ":00";

    var m_start = moment(btime);
    var m_end = moment(etime);
    if ((m_start.isAfter(m_end)) || m_start.isSame(m_end)) {
        tools.show_message_error("结束时间不能小于等于开始时间,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }

    if (m_start.year() != m_end.year()) {
        tools.show_message_error("起始时间不允许跨年,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }
    var dis_month = m_end.diff(m_start, 'months') // 0
    if (dis_month > 0) {
        tools.show_message_error("起始时间不允许超过1个月,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }
    //  selectModes = getModel();
    if (selectModes == "" || selectModes == null) {
        tools.show_message_error_const("请选择至少一个模型!");
        onekeyyb = "0";
        return;
    }
    var arr_mode = selectModes.split(",");
    if ((arr_mode.length == 1) && (selectModes == "MGE2")) {
        tools.show_message_error_const("使用多模型融合,请选择至少两个基础模型!");
        onekeyyb = "0";
        return;
    }
    if ((arr_mode.length == 2) && (selectModes.indexOf("MGE2") > -1)) {
        tools.show_message_error_const("使用多模型融合,请选择至少两个基础模型!");
        onekeyyb = "0";
        return;
    }


    setCookie("beginTime", btime);
    setCookie("endTime", etime);

    searchStime = btime;
    searchEtime = etime;

    hideRainImageInfo();
    clearSvgAnimate();

    yb_setSteps(4, ybddMapType);
    //判断是否包含分布式模型
    if ($("#inlineCheckbox5").is(":checked")) {
        var fbs_stm = moment(searchStime).format("YYYY-MM-DDTHH:mm");
        var fbs_etm = moment(searchEtime).format("YYYY-MM-DDTHH:mm");
        if ((fbs_stm != "2021-07-05T08:00") || (fbs_etm != "2021-07-08T08:00")) {
            // alert("Asd");
            var objData = {
                START: fbs_stm,
                END: fbs_etm,
                ADCD: "WE",
                AppPath: "D:/HSFXHuaihe352020/skby",
                ComputeNode: "ComputeNode1",
                ModelType: "skby",
                RainScale: $('#dsz').val() == "" ? "0" : $('#dsz').val(),
                isWriteADCD: "true"
            };
            var info = JSON.stringify(objData);
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                url: apiUrl_bky + "PamerSetting/updateComputeUnitPara",
                data: info,
                headers: {
                    "Authorization": "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc"
                },
                success: function (data) {
                    tools.loadinghide(true);
                    if (data == "0") {
                        tools.show_message_error_const("分布式模型参数未设置成功!");
                        return;
                    }
                    var objDataRun = {

                        ComputeNode: "ComputeNode1",

                    };
                    var info = JSON.stringify(objDataRun);
                    $.ajax({
                        type: 'post',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        async: false,
                        url: apiUrl_bky + "PamerSetting/GetAllAPPFinished",
                        data: info,
                        headers: {
                            "Authorization": "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc"

                        },
                        success: function (data) {
                            if (data.flag == 1 && data.status == 'unfinished') {
                                tools.show_message_error_const("分布式模型正在使用中，暂时无法使用!");
                            } else {
                                isFbsParamsOK = true;
                                //启动计算
                                FbsStart();
                            }

                        }

                    });

                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error_const("未查询到分布式模型参数信息!");
                    return;
                }
            });
        }

    }

    if ($("#show_autoFore").is(':checked')) {
        showYBinfo();
    } else {
        //实时预报演算
        var objData = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: selectModes,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: Number(searchPlan),
            range: Number(searchRange),
            startTime: searchStime,
            stcd: "",
            meteorPattern: meteor
            // userId: $("#_hid_userid").val()
        };

        var info = JSON.stringify(objData);
        //  isgetprogress = true;
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_cloud + "api-realsituate/ModelCalculate",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success: function (data) {
                // console.log(data)
                if (data.code == 200) {
                    if (data.data == "当前河系区域已计算，请直接获取成果") {
                        curprogresstype = "";
                        getYBInfo();
                    }
                    else
                        getYBprogress();

                } else {
                    tools.show_message_error_const(data.msg)
                }
                // $("#panelSwAll").hide()
            },
            error: function (errorMsg) {
                // isgetprogress = false;

            }
        })



    }

}

//以前是ModelCalculate 同步函数调用之后的，现在放到进度条信息结束之后调用；
function getYBInfo() {
    //     isgetprogress = false;
    isAlreadyCal = true;
    //图层控制改变
    var modelArr = selectModes.split(',');
    var htmlRadio = "<select id = 'modelSelectMap'>";
    var modelsNameArr = selectModelsName.split(',')
    $.each(modelsNameArr, function (i, item) {
        if (i == 0) { //默认选中第一个模型
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelArr[i] + "'  model_ = '" + item + "'  select>" + item + "</option>"
        } else {
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelArr[i] + "' model_ = '" + item + "' >" + item + "</option>"
        }
    })
    htmlRadio += "</select>"
    $("#modelSelectForMap").html("");
    $("#modelSelectForMap").append(htmlRadio);
    $('#modelSelectMap').fancyspinbox();

    showYBinfo();
}
function showYBinfo() {

    isGetForInfoReturn = false;
    tools.clear_vip();

    //实时预报演算
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: selectModes,
        plan: Number(searchPlan),
        range: Number(searchRange),
        startTime: searchStime,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        stcd: "",
        meteorPattern: meteor
        // userId: $("#_hid_userid").val()
    };

    //右侧切换按钮显示，并且对应按钮状态改变，可用不可用以及默认值
    /* if (!isshowybMD) {
         $("#tl_div").height($("#tl_div").height() + 66);
         $("#icon_bar2").css({
             "margin-top": (Number($('#icon_bar2').css("marginTop").replace('px', '')) + 66 / 2) + "px"
         })

     }
     isshowybMD = true;
     $("#yb_model_changfe").show();*/
    $(".loading-layer").show();
    var info = JSON.stringify(objData);
    selectModesLastYb = selectModes; //记录当前传递的modes，提供给清除缓存使用
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/GetForInfos",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (data) {
            var json = data;
            if (json.code == "0") {
                //  tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                if (onekeyyb == "0") {
                    isGetForInfoReturn = true;
                    //加载图层
                    $(".loading-layer").hide();
                    var _svgid = ybddMapType == 1 ? "SVGDoc" : (ybddMapType == 2 ? "SVGDoc_ght" : "");
                    tools.draw_layer(searchRange, searchType, json, getModelMap(), _svgid, "yubao");

                    if (ybddMapType == 1)
                        getImpInfo(2);

                    //弹出预报统计表
                    var objRange = arrRange.find(function (item) {
                        return item.id == searchRange;
                    });
                    tools_panel_allYb.show_type = searchType;
                    tools_panel_allYb.json_data = json;
                    tools_panel_allYb.show_all = true;
                    // tools_panel_allYb.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                    tools_panel_allYb.panelShow(objRange.stcd, objRange.stnm, searchEtime, objRange.sttp, searchStime);

                    showTZB();
                    showYBMd();
                    showMainInfo();
                    showTckz();

                    //getSummary();
                    initFanganList();
                    cur_setp = 2;
                    // tools.loadinghide(true);

                } else if (onekeyyb == "1") {
                    onekeyyb = "0";
                    onekeydd = "1";
                    $("#btnDispatch").click();
                }

            }
        }
    })

}

function onekeyproc(isclear) {
    onekeyyb = "1";
    yubaoproc(isclear);
}
/**
 * 调度计算详细处理
 */
function funcDispatch(ddname) {

    hideYBMd();
    searchType = "3";
    isyuyan = false;

    var objData = {
        adjust: 1,
        endTime: searchEtime,
        // forecastModel: "MGE2",
        foreDays: Number(selectDays),
        model: getRadioModel(),
        plan: Number(searchPlan),
        range: Number(searchRange),
        schedulePlanName: ddname,
        scheduleType: default_scheduleType,
        startTime: searchStime,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        stcd: "",
        meteorPattern: meteor
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/GetDisPatchInfo",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (json) {
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                //加载图层
                var _svgid = ybddMapType == 1 ? "SVGDoc" : (ybddMapType == 2 ? "SVGDoc_ght" : "");
                tools.draw_layer(searchRange, searchType, json.data, null, _svgid, "diaodu");
                if (ybddMapType == 1)
                    getImpInfo(3);

                //弹出预报方案分析对比报表   暂时注释add by hzx 20190415(4.16演示用 调度后直接展示当前调度方案的统计表)
                //show_report_fxbj();
                //水文站、水库、湖泊调度后统计表
                setTimeout(function () {
                    var objRange = arrRange.find(function (item) {
                        return item.id == searchRange;
                    });
                    tools_panel_all.show_type = searchType;
                    tools_panel_all.show_all = true;
                    tools_panel_all.planId_dd = ddname; // $("#xz_text").val();
                    //  tools_panel_all.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                    GetTreeMenuData();
                    tools_panel_all.panelShow(objRange.stcd, objRange.stnm, searchEtime, objRange.sttp, searchStime);
                    //  tools.loadinghide(false);
                    $("#btnDispatchCompare").show();

                    cur_setp = 4;
                    $("#fangan_list").hide();

                    showTZB();
                    showMainInfo();

                }, 4000);


                //tool_dispatch_xxtj.panelShow("99990001", "蒙洼", "XX", searchStime, searchEtime);
                return;
            }
        }
    });
}


function get_SingleStcd_extremInfo(Stcd) {

    var res;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();

    var func = (Number(searchType) - 1).toString();
    var objData = {
        stcd: Stcd,
        stime: searchStime,
        etime: searchEtime,
        func: func,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: selectDays
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cbh + "get_SingleStcd_extremInfo",
        data: info,

        success: function (data) {
            if (data == null || data == "") {
                tools.show_message_error("获取信息失败!");

            } else
                res = data;
        },
        error: function (errorMsg) {
            tools.show_message_error("获取信息失败!");

        }

    });
    return res;
}
/**
 * 获取单站极致信息
 * @param {any} Stcd 站码
 */
function get_SingleStcd_extremInfo_Multymodel(Stcd) {

    var result = "";
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();

    var func = Number(searchType) - 1;
    var objData = {
        adjust: 1,
        stcd: Stcd,
        stime: searchStime,
        etime: searchEtime,
        func: func,
        model: 1, //这个参数固定死是1
        modelid: getModelMap(),
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: selectDays,
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/getSingleStcdInfo",
        data: info,

        success: function (res) {
            if (res.code != 200)
                tools.show_message_error("获取信息失败!");

            if (res.data.code != "1") {
                tools.show_message_error("获取信息失败!");

            } else
                result = res.data;
        },
        error: function (errorMsg) {
            tools.show_message_error("获取信息失败!");

        }

    });
    return result;
}
//窗体大小自适应
function resizeWindow() {
    reset_yb_menu_ps(false);
    return;
    // // //  $("#SVGDoc").width($(window).width()).height($(window).height() - 110);
    console.log(document.body.clientWidth + "/" + document.body.clientHeight);
    $(".bwizard-steps").css({
        "margin-left": ($(window).width() - $(".bwizard-steps").width() - 20) / 2 + "px"
    })
    $("#fangan_list").height(document.body.clientHeight - $("#index_params").height() + 5);
    //   $("#SVGDoc").width(document.body.clientWidth).height(document.body.clientHeight - 50 > 0 ? document.body.clientHeight - 50:0 );

}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 获取树形菜单数据
 */
function GetTreeMenuData() {
    $(".treeUl").html("");
    var objData = {
        range: searchRange,
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/getStcdInfo",
        data: info,
        success: function (res) {
            if (res.code != 200) {
                tools.show_message_error("获取信息失败!");
                return;
            }
            creatTreeMenu(res.data);
            return;
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");
            return;
        }
    });
}


/**
 * 创建树形菜单
 */
function creatTreeMenu(json) {
    var treeStnm = {
        hd: json.stasnm[0],
        zb: json.stasnm[1],
        sk: json.stasnm[2]
    };
    var treeStcd = {
        hd: json.stasid[0],
        zb: json.stasid[1],
        sk: json.stasid[2]
    };
    var treeSttp = {
        hd: json.stassttpsttp[0],
        zb: json.stassttpsttp[1],
        sk: json.stassttpsttp[2]
    };
    var html_hd = new StringBuffer();
    var html_zb = new StringBuffer();
    var html_sk = new StringBuffer();

    $.each(treeStnm.hd, function (i, item) {
        html_hd += "<li" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.hd[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.hd[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.hd[i] + "</span></a></li>"
    })
    $.each(treeStnm.zb, function (i, item) {
        html_zb += "<li hidden=" + "hidden" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.zb[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.zb[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.zb[i] + "</span></a></li>"
    })
    $.each(treeStnm.sk, function (i, item) {
        html_sk += "<li hidden=" + "hidden" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.sk[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.sk[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.sk[i] + "</span></a></li>"
    })

    $("#hdNode").html("");
    $("#zbNode").html("");
    $("#skNode").html("");
    $("#hdNodeDd").html("");
    $("#zbNodeDd").html("");
    $("#skNodeDd").html("");
    //单元产汇流信息 树形结构
    $("#hdNode_dychxx").html("");
    $("#zbNode_dychxx").html("");
    $("#skNode_dychxx").html("");

    $("#hdNode").append(html_hd.toString());
    $("#zbNode").append(html_zb.toString());
    $("#skNode").append(html_sk.toString());
    $("#hdNodeDd").append(html_hd.toString());
    $("#zbNodeDd").append(html_zb.toString());
    $("#skNodeDd").append(html_sk.toString());
    //单元产汇流信息 树形结构
    $("#hdNode_dychxx").append(html_hd.toString());
    $("#zbNode_dychxx").append(html_zb.toString());
    $("#skNode_dychxx").append(html_sk.toString());
}

/**
 * 树形菜单点击事件
 */
function test(elem) {
    var _stnm = elem.getElementsByTagName("span")[0].innerHTML;
    var _stcd = elem.getElementsByTagName("span")[1].innerHTML;
    var _sttp = elem.getElementsByTagName("span")[2].innerHTML;

    if (searchType == "1") {
        tools_panel.show_type = searchType;
        tools_panel.show_all = false;
        tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
    } else if (searchType == "4") {
        //单元产汇流信息
        get_dychxx_data(searchRange, searchStime, searchEtime, _stcd)
    } else {
        //预报界面
        if (searchType == "2") {
            //单站预报结果展示
            if ($("#panelDd").show()) {
                $("#panelDd").hide();
                $("#panelSw").show();
            }
            tools_panel.show_type = searchType;
            tools_panel.show_all = false;
            tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
        }
        //调度界面
        if (searchType == "3") {
            if (_sttp == "ZQ") {
                //       tools_panel.planId_dd = "1";  //从调度方案对比结果中查找当前调度方案的ID
                //单站预报结果展示
                if ($("#panelDd").show()) {
                    $("#panelDd").hide();
                    $("#panelSw").show();
                }
                tools_panel.show_type = searchType;
                tools_panel.show_all = false;
                tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
            } else {
                if ($("#panelSw").show()) {
                    $("#panelSw").hide();
                    $("#panelDd").show();
                }
                tool_dispatch.show_type = searchType;
                tool_dispatch.panelShow(_stcd, _stnm, _sttp, searchStime, searchEtime);
            }
        }
    }

}

function showGaiHuaPic(_range) {
    if ((searchRange == _range) && (ybddMapType == 2))
        return;

    hideByyzTc();

    //重新加载图层
    var objRange = arrRange.find(function (item) {
        return item.id == _range;
    });
    var map_name = "img/map/map_" + objRange.subRiver + ".svg";
    var Exists = isExitSvgFile(map_name);
    if (Exists) {

        if (objRange.show == "s") {
            $(".yb-pa-s").show();
            $(".yb-pa-h").hide();
        } else {
            $(".yb-pa-s").hide();
            $(".yb-pa-h").show();
        }
        $("#SVGDoc_ght").attr("data", "");
        $("#SVGDoc").hide();
        $("#SVGDoc_ght").show();
        $("#SVGDoc_ght").attr("data", map_name);
        hideRainImageInfo();
        clearModeData();
        searchRange = objRange.id;
        tools.searchRange = searchRange;
        // window.setTimeout(() => {
        //     handle(1);
        // }, 500);
        changeSyBtnBgColor(1);
        yb_setSteps(0, ybddMapType);
        searchType = -1;
        cur_setp = 0;
        last_setp = 0;
        return true;
    } else {
        tools.show_message_error_const(objRange.subRiver + "暂时没有概化图!");
        return false;
    }


}

function hideGaiHuaPic(_range) {

    if ((searchRange == _range) && (ybddMapType == 1))
        return;
    hideByyzTc();

    //重新加载图层
    var objRange = arrRange.find(function (item) {
        return item.id == _range;
    });
    var map_name = "img/map/3d_" + objRange.subRiver + ".svg";
    if (_range == "14")
        var map_name = "img/map/shandong.svg";

    var Exists = isExitSvgFile(map_name);
    if (Exists) {
        $("#SVGDoc").attr("data", map_name);

        $(".yb-pa-s").hide();
        $(".yb-pa-h").show();
        $("#SVGDoc").attr("data", "");
        $("#SVGDoc_ght").hide();
        $("#SVGDoc").show();
        $("#SVGDoc").attr("data", map_name);
        searchRange = objRange.id;
        tools.searchRange = searchRange;

        hideRainImageInfo();
        clearModeData();
        // window.setTimeout(() => {
        //     handle(1);
        // }, 500);
        changeSyBtnBgColor(1);
        yb_setSteps(0, ybddMapType);
        searchType = -1;
        cur_setp = 0;
        last_setp = 0;
        return true;
    } else {
        tools.show_message_error_const(objRange.subRiver + "暂时没有作战图!");
        return false;
    }


}

function clearModeData() {
    clearModelSelect();
}

/*
 *清除svg动画
 * */
function clearSvgAnimate() {

    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.clear_animate();
}

function hideSomeWidnows() {
    $("#yb_condition").hide();
    $("#panelSwAllYb").hide();
    $("#panelSwAll").hide();
    $("#panelSaveDd").hide();
    $("#panel_lhdd").hide();
    $("#panelYjInfo").hide();
    $("#panel_fadb").hide();
    $("#panelDd").hide();
    $("#panel_ddjg").hide();
    $("#panelSw").hide();
    $("#panelSw").hide();

}

function hideSonmeWindowsBeforeHandle() {
    hide_menu_svg();
}

function handle(index) {
    hideSonmeWindowsBeforeHandle();
    last_setp = index;

    //这里实际应该在对应的按钮事件调用成功之后再做状态变化
    /*  if ((index > 1) && (ybddMapType != 1))
          return;*/

    if (index == 1) {
        getShiKuang();
    } else if (index == 2) {
        $(".submenu_ybjs").click();
    } else if (index == 3) {
        clearSvgAnimate();
        yjfun();
    } else if (index == 4)
        getDD();
    else if (index == 5) {

        //原方案对比界面
        $("#panelSkxx").hide();
        $("#panelYjInfo").hide();
        $("#panelYbInfo").hide();
        $("#panelDdInfo").hide();

        searchStime = $("#beginTime").val() + ":00";
        searchEtime = $("#endTime").val() + ":00";
        searchPlan = $("#selectPlan").val();
        get_fadb_data(searchRange, searchPlan, searchStime, searchEtime, $("#_hid_userid").val(), selectDays, 1);
        setStepState(5);
        cur_setp = 5;

        $("#fangan_list").hide();
        console.log("调用预案方法");
    }
    /* else if (index == 3) {
          showQingJing();
     }
     */
    if (index != 3) {
        //  hide_yj_vip_all();

    }




    if ((index != 2) && (index != 4)) {

        hideTZB();
        hideYBMd();
    }
    if ((cur_setp < 2) || (cur_setp > 4)) {
        hideMainInfo();
    }

}

function hideYBMd() {
    return;
    if (isshowybMD) {
        $("#tl_div").height($("#tl_div").height() - 66);
        $("#icon_bar2").css({
            "margin-top": (Number($('#icon_bar2').css("marginTop").replace('px', '')) - 66 / 2) + "px"
        })

    }
    isshowybMD = false;
    $("#yb_model_changfe").hide();
    $("#paneljsyb").hide();
    hideRainInfo();
}



function setStepState(index, initIndex) {

    if ((initIndex != -1) && (index != 5) && (index != 1)) {
        var svg_name = ybddMapType == "1" ? "SVGDoc" : "SVGDoc_ght";
        var svgDocument = document.getElementById(svg_name).getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.initClass();
        //转移 在选择纳雨能力模型时就展示
        // $(".show_nynl").show();
        // $(".show_nynl").parent().show();
    }
    if (index !== 2)
        hideRainImageInfo();
    if ((index != 1) || (ybddMapType != "1")) {
        hideByyzTc();
    }
    if (index == 4) {
        $(".show_forecast").show();
        $(".show_forecast").parent().show();
    }
    clear_hsyj();
}

//隐藏暴雨移植所有图层
function hideByyzTc() {
    yb_ybyz_PanelHide();
    yb_byyzList_hide();
    yb_ybyz_sumbit_PanelHide();
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    svgWnd.hideDrawRect();
    svgWnd.hideByyzSomeRain();
    svgWnd.resetDrawInfo();

    $("#show_byyz").prop("checked", false);
    $(".show_byyz").hide();
    $(".show_byyz").parent().hide();
    $("#show_byyzList").prop("checked", false);
    $(".show_byyzList").hide();
    $(".show_byyz_position").hide();

    //判断产汇流信息是否展示
    let display = $('#show_dychxx').css('display')
    if (display === "none") {
        $(".show_byyz_position").parent().hide();
    } else {
        $('#show_dychxx').css('margin-left', '0px')
    }


}

function getYBprogress() {
    if ($("#icon_bar2").hasClass("hover"))
        $("#icon_bar2").click();


    var objRange = arrRange.find(function (item) {
        return item.id == searchRange;
    });
    var showtype = objRange.show;
    if (ybddMapType == "1")
        showtype = "h";
    $("#tx_progress_content_" + showtype).html("");
    $(".progress-text_" + showtype).html("0%");
    $('.progress-bar_' + showtype).css('width', "0%");
    $("#progress_zhezhao_" + showtype).show();

    grogressPersent = 0;
    clearInterval(timerGL);
    clearInterval(timerFBS);

    setStepState(2);
    isGetForInfoReturn = false;
    isgetprogress = true;
    curprogresstype = showtype;
    timerGL = setInterval(function () {
        getProgress(searchRange, "yb", showtype);
    }, 1000);
}

function getProgressFBS() {
    return;

    var objData = {

        ComputeNode: "ComputeNode1",

    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_bky + "PamerSetting/GetAllAPPFinished",
        data: info,
        headers: {
            "Authorization": "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc"

        },
        success: function (data) {
            tools.loadinghide(true);

            if (data.flag == 1 && data.status == 'unfinished') {
                _html = $("#tx_progress_content").html();
                var new_p = "<p style=\"color:red\"> " + "分布式模型正在计算中..." + "</p>";
                _html = _html.replace("color:red", "");
                _html += new_p;
                $("#tx_progress_content").html(_html);
                $("#tx_progress_content").scrollTop($("#tx_progress_content")[0].scrollHeight);


                var _pw = Number($(".progress-text").html().replace("%", ""));
                if (_pw < 99)
                    $('.progress-bar').css('width', Math.round(_pw + 1, 0) + "%");

            } else { //计算完成
                if (data.flag == 0) {
                    tools.show_message_error("分布式模型计算失败!");;
                } else {
                    isGetFbsResult = true;
                }
                $('.progress-bar').css('width', "100%");
                clearInterval(timerFBS);
                _html = $("#tx_progress_content").html();
                var new_p = "<p style=\"color:red\">正在统计计算结果...</p>";

                _html = _html.replace("color:red", "");
                _html += new_p;
                $("#tx_progress_content").html(_html);
                $("#tx_progress_content").scrollTop($("#tx_progress_content")[0].scrollHeight);

                setTimeout(function () {
                    $("#progress_zhezhao").hide();
                    showYBinfo();
                }, 1000);
            }


        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("未查询到分布式模型参数信息!");
            return;
        }
    });

}

function getProgress(searchRange, type, showtype) {
    $.ajax({
        type: type == "yb" ? 'post' : 'get',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: type == "yb" ? apiUrl_cloud + "api-realsituate/ModelCalculateMsg" : (type == "dd" ? apiUrl_cloud + "api-realsituate/GetJointDispatchMsg" : ""),
        success: function (data) {
            var json = data;
            if (json.code == 200) {
                _html = $("#tx_progress_content_" + showtype).html();



                var new_p = "<p style=\"color:red\"> " + json.data.msg.replace("：", ":<br />") + "</p>";
                if (json.data.msg.indexOf("产汇流模型计算全部完成") > -1)
                    new_p = "<p >产汇流模型计算全部完成!</p><p style=\"color:red\">获取预报成果信息中....</p>";

                if (json.data.msg.indexOf("调度演算全部完成") > -1)
                    new_p = "<p >调度演算全部完成!</p><p style=\"color:red\">获取调度成果信息中....</p>";

                _html = _html.replace("color:red", "");
                _html += new_p;
                $("#tx_progress_content_" + showtype).html(_html);
                $("#tx_progress_content_" + showtype).scrollTop($("#tx_progress_content_" + showtype)[0].scrollHeight);

                var _Plan = $("#selectPlan").val();
                var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
                var svgWnd = svgDocument.svgWnd;
                var cur_stcd = "-1";
                if (json.data.msg.indexOf("用户登陆失败或已过期") > -1) {
                    clearInterval(timerGL);
                }
                else if ((json.data.status == 0) && (isgetprogress == true)) {
                    //  else if (isgetprogress == true) {
                    cur_stcd = tools.getParenthesesStr(json.data.msg);
                    var rndBase = type == "yb" ? (searchRange == 1 ? 10 : (searchRange == 2 ? 5 : (searchRange == 3 ? 4 : (searchRange == 4 ? 20 : (searchRange == 5 ? 1 : 10))))) : (type == "dd" ? 20 : 0);
                    var v_rate = 1;
                    if ( /*(_Plan > 0) &&*/ (type == "yb")) {
                        rndBase = rndBase / 2;
                        v_rate = 0.9;
                    }
                    grogressPersent += parseInt(Math.random() * rndBase);
                    if (grogressPersent >= v_rate * 100)
                        grogressPersent = v_rate * 100 - 1;
                    $('.progress-bar_' + showtype).css('width', Math.round(grogressPersent / v_rate, 0) + "%");

                } else {

                    $('.progress-bar_' + showtype).css('width', "100%");
                    clearInterval(timerGL);
                    if (type == "yb") {
                        getYBInfo();
                    }
                    else if (type == "dd") {
                        getDDInfo();
                    }

                }
                svgWnd.stcd_Active("id_" + cur_stcd);
                return cur_stcd;
            } else {
                clearProgress(showtype);
                tools.show_message_error("获取进度失败！");
            }
        },
        error: function (errorMsg) {
            alert("asd");
            clearInterval(timerGL);
            tools.show_message_error("获取进度失败！");
            return "-9999";
        }
    });
}

/**
 * 清楚进度条
 * @param {进度条显示种类，"h"或者"s"} showtype
 */
function clearProgress(showtype) {

    $('.progress-bar_' + showtype).css('width', "100%");
    if (timerGL != null)
        clearInterval(timerGL);
    if (yhddTimer != null)
        clearInterval(yhddTimer);
    _html = $("#tx_progress_content_" + showtype).html();
    var new_p = "<p style=\"color:red\">正在统计计算结果...</p>";

    _html = _html.replace("color:red", "");
    _html += new_p;
    $("#tx_progress_content_" + showtype).html(_html);
    $("#tx_progress_content_" + showtype).scrollTop($("#tx_progress_content_" + showtype)[0].scrollHeight);

    //setTimeout(function () {
    $("#progress_zhezhao_" + showtype).hide();
    //}, 1000);
}

/**
 * 获取调度进度条
 */
function getDDprogress() {
    if ($("#icon_bar2").hasClass("hover"))
        $("#icon_bar2").click();



    var objRange = arrRange.find(function (item) {
        return item.id == searchRange;
    });
    var showtype = objRange.show;
    if (ybddMapType == "1")
        showtype = "h";
    $("#tx_progress_content_" + showtype).html("");
    $(".progress-text_" + showtype).html("0%");
    $('.progress-bar_' + showtype).css('width', "0%");
    $("#progress_zhezhao_" + showtype).show();


    grogressPersent = 0;
    clearInterval(timerGL);
    setStepState(4);
    isgetprogress = true;
    curprogresstype = showtype;
    timerGL = setInterval(function () {
        getProgress(searchRange, "dd", showtype);
    }, 1000);
}

function getModel() {
    var res = "";
    selectModelsName = null;
    var checkData = treeModel.getChecked('treeModel');
    $.each(checkData, function (index, item) {
        $.each(item.children, function (i, data) {
            if (res == "") {
                res += data.field;
            } else {
                res += ',' + data.field;
            }
            if (selectModelsName == null) {
                selectModelsName = data.title;
            } else {
                selectModelsName += ',' + data.title;
            }
        })
    })
    // alert(checkData)

    return res;
}

function changeModeByWJB(modename) {
    return;
}

$('input[type=radio][name=rd_liuyu]').change(function () {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    svgWnd.show_liuyu(-1);
    svgWnd.show_liuyu($('input[type=radio][name=rd_liuyu]:checked').val());
});

function yjfun() {
    $("#panelYjInfo").hide();
    $("#panelYbInfo").hide();
    $("#panelDdInfo").hide();

    searchType = "2";
    isyuyan = true;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();

    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: getRadioModel(),
        plan: Number(searchPlan),
        range: Number(searchRange),
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        startTime: searchStime,
        stcd: "",
        meteorPattern: meteor
        // userId: $("#_hid_userid").val()
    };

    var info = JSON.stringify(objData);
    setStepState(3);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-realsituate/GetForInfos",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            var _svgid = ybddMapType == 1 ? "SVGDoc" : (ybddMapType == 2 ? "SVGDoc_ght" : "");
            tools.draw_layer(searchRange, searchType, res, getModelMap(), _svgid, "yujin");

            /* if (ybddMapType == 1)
                 getImpInfo(2, -1, undefined);
                 */

            //  setCurActive($('input[type=radio][name=rd_model]:checked').val());
            cur_setp = 3;
            $("#fangan_list").hide();

            showMainInfo();

        }
    })

    objData.model = getRadioModel();
    info = JSON.stringify(objData);
    tool_dispatch.dispatchSuggest_data = null;
    tool_dispatch.dispatchSuggest_model = getRadioModel();
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/GetDispatchSuggest",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (data) {
            var json = data;
            if (json.code != 200) {
                //  tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                tool_dispatch.dispatchSuggest_data = json;
                draw_yj_vip_info();
                var selectModel = getRadioModel();
                getForeWsReport(selectModel);
            }
        }
    })

}

function getImpInfo(type, ismge2, ispos) {
    // return;
    // var url = type == 1 ? "get_Real_ImpstaviewSingleRow" : (type == 2 ? "get_Fore_ImpstaviewSingleRowMultModel" : (type == 3 ? "get_Sche_ImpstaviewSingleRow" : ""));
    // if (url == "")
    //     return;



    // var _objData = {
    //     range: searchRange,
    //     stime: searchStime,
    //     etime: searchEtime,
    //     model: Number($('input[type=radio][name=rd_model]:checked').val()),
    //     plan: searchPlan,
    //     plusType: _plusType,
    //     rainPlus: _rainPlus,
    //     hisStormId: _hisStormId,
    //     day: selectDays
    // };


    // var _info = JSON.stringify(_objData);

    // $.ajax({
    //     type: 'post',
    //     contentType: "application/json; charset=utf-8",
    //     dataType: 'json',
    //     async: true,
    //     headers: {
    //         "Authorization": getCookie("accessToken")
    //     },
    //     url: apiUrl_cbh + url,
    //     data: _info,
    //     success: function (data) {

    //         var json = data;
    //         if (json.code == "0") {
    //             tools.show_message_error(json.msg);

    //         } else {
    //             //加载图层
    //             $("#show_vip").prop("checked", true);
    //             tools.draw_vip(searchRange, searchType, json);


    //         }

    //     },
    //     error: function (errorMsg) {
    //         tools.loadinghide(false);
    //         // tools.show_message_error("获取重要站点实时信息失败!");
    //         return;
    //     }
    // });
    if ((type == 2) && (ismge2 != -1)) {

        objData = {
            adjust: 1,
            autoFore: 0,
            etime: searchEtime,
            plan: searchPlan,
            range: searchRange,
            stime: searchStime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            day: selectDays,
            modelid: getRadioModel(),
            models: selectModes,
            meteorPattern: meteor
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-hwhydroinfo/get_impStcd_forMultyModel",
            data: info,
            success: function (data) {
                if (data.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error("获取信息失败!");
                    return;
                }

                var json = data.data;
                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                } else {
                    tools.draw_ybinfo(json, ispos);
                    return;
                }
                tools.loadinghide(false);



            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取信息失败!");
                return;
            }
        });

    } else if (type == 3) {
        objData = {
            adjust: 1,
            autoFore: 0,
            etime: searchEtime,
            hisStormId: _hisStormId,
            modelid: getRadioModel(),
            plan: searchPlan,
            range: searchRange,
            stime: searchStime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            day: selectDays,
            meteorPattern: meteor
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-hwhydroinfo/get_ScheandFor_ImpstaviewSingleRow",
            data: info,
            success: function (data) {
                if (data == null || data == "") {
                    tools.loadinghide(false);
                    tools.show_message_error("获取信息失败!");
                    return;
                }

                var json = data.data;
                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                } else {
                    tools.draw_ddinfo(json, ispos);
                    return;
                }
                tools.loadinghide(false);



            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取信息失败!");
                return;
            }
        });
    }


}


function showQingJing(_selectData_modelId, _selectData_hisStormId) {
    // GetGcxForecastDbfx_pModeID = _selectData;

    $("#panelSkxx").hide();
    $("#panelYjInfo").hide();
    $("#panelYbInfo").hide();
    $("#panelDdInfo").hide();

    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();
    get_fadb_data(searchRange, searchPlan, searchStime, searchEtime, $("#_hid_userid").val(), selectDays, 2, _selectData_modelId, _selectData_hisStormId);
}

function getRadioModel() {
    // return "API2";
    // var s_select_mode = $('input[type=radio][name=rd_model]:checked').val();
    // var n_mode = s_select_mode == "" ? -1 : Number(s_select_mode);
    // var _mode = n_mode == 1 ? "API6" : (n_mode == 2 ? "API2" : (n_mode == 3 ? "XAJ2" : (n_mode == 4 ? "MGE2" : "API2")));
    // return _mode;
    var s_select_model = $("#modelSelectForMap").find(".selected")[0];
    var select_model = $(s_select_model).attr("value_")
    return select_model;
}

$("#step2").hover(function () {
    // $("#yb_subMenu").show();
}, function () {
    // $("#yb_subMenu").hide();
});
$("#step4").hover(function () {
    //  $("#yy_subMenu").show();
}, function () {
    // $("#yy_subMenu").hide();
}); //
$(".signout").click(function () {
    loginout();
});

function FbsStart() {
    $.each(stopID, function (index, item) {
        var objData = {

            ComputeNode: "ComputeNode1",
            ComputeUnit: item

        };
        var info = JSON.stringify(objData);
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_bky + "PamerSetting/StartApps",
            data: info,
            headers: {
                "Authorization": "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc"

            },
            success: function (res) {

                var data = $.parseJSON(res);

                if (data.flag == 1) { //启动成功

                } else {
                    if (isFbsParamsOK != false)
                        tools.show_message_error_const("启动水文模型失败!");
                    isFbsParamsOK = false;
                }
            },
            error: function (errorMsg) {
                tools.show_message_error_const("启动水文模型失败!");
                return;
            }
        });
    });

}

function showStep(pa) {
    if (pa == "0")
        $("#wizard").hide();
    else {
        $("#wizard").show();
        $(".bwizard-steps").css({
            "margin-left": ($(window).width() - $(".bwizard-steps").width() - 20) / 2 + "px"
        })
    }

}

function initFBS() {
    var objData = {

        token: "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc",
        username: "huaihe2021huaihe@2021",
        datasource: "dataSourcehuaihe"

    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_bky + "Switch/init",
        data: info,

        success: function (res) { },
        error: function (errorMsg) {
            tools.show_message_error_const("更新分布式模型数据源失败!");
            return;
        }
    });
}
/**
 * 调度按钮点击事件
 */
function getDD() {
    if (ybddMapType == 1) {
        if ($("#SVGDoc").is(':hidden')) {
            $("#ybfb_right").hide();
            $("#ybfb_pdf").hide();
            $("#SVGDoc").show();
            $(".foot_tuli").show();
        }
    }

    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    var m_start = moment(searchStime);
    var m_end = moment(searchEtime);
    if ((m_start.isAfter(m_end)) || m_start.isSame(m_end)) {
        tools.show_message_error("结束时间不能小于等于开始时间,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }
    if (m_start.year() != m_end.year()) {
        tools.show_message_error("起始时间不允许跨年,请重新选择起始时间");
        onekeydd = "0";
        return;
    }
    var dis_month = m_end.diff(m_start, 'months') // 0
    if (dis_month > 0) {
        tools.show_message_error("起始时间不允许超过1个月,请重新选择起始时间");
        onekeydd = "0";
        return;
    }
    if (onekeydd == "1") {
        $("#btnSureDd").click();
    } else {
        $("#panelSaveDd").show();
        initDdSelect();
    }

    $("#panelSkxx").hide();
    $("#panelYjInfo").hide();
    $("#panelYbInfo").hide();
    $("#panelDdInfo").hide();
};

function getShiKuang() {
    if (ybddMapType == 1) {
        if ($("#SVGDoc").is(':hidden')) {
            $("#ybfb_right").hide();
            $("#ybfb_pdf").hide();
            $("#SVGDoc").show();
            $(".foot_tuli").show();
        }

    }
    $("#panelYjInfo").hide();
    $("#panelYbInfo").hide();
    $("#panelDdInfo").hide();

    searchType = "1";
    isyuyan = false;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();
    setStepState(1);
    var m_start = moment(searchStime);
    var m_end = moment(searchEtime);

    if ((m_start.isAfter(m_end)) || m_start.isSame(m_end)) {
        tools.show_message_error("结束时间不能小于等于开始时间,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }


    if (m_start.year() != m_end.year()) {
        tools.show_message_error("起始时间不允许跨年,请重新选择起始时间");
        return;
    }
    var dis_month = m_end.diff(m_start, 'months') // 0
    if (dis_month > 0) {
        tools.show_message_error("起始时间不允许超过1个月,请重新选择起始时间");
        return;
    }
    // tools.clear_vip();

    tools.loadingshow("查询实况信息中...", arrRange_real_lodingtime[Number(searchRange) - 1]);


    var objData = {
        endTime: searchEtime,
        plan: "0",
        range: searchRange,
        startTime: searchStime,
        stcd: "",
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/getRealInfos",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            if (data == null || data == "") {
                tools.loadinghide(false);
                tools.show_message_error("获取实况信息失败!");
                return;
            }

            var json = data;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                //加载图层
                yb_setSteps(1, ybddMapType);
                var _svgid = ybddMapType == 1 ? "SVGDoc" : (ybddMapType == 2 ? "SVGDoc_ght" : "");
                tools.draw_layer(searchRange, searchType, json.data, null, _svgid, "shikuang");

                if (ybddMapType == 1) {
                    getImpInfo(1);
                    getRainImage(moment($("#beginTime").val()).format("YYYY-MM-DD 08:00"), moment($("#endTime").val()).format("YYYY-MM-DD 08:00"), 0, -1, true);
                }

            }
            tools.loadinghide(true);
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取实况信息失败!");
            return;
        }
    });

    //生成实况信息表格
    //get_liveInfo(searchRange, searchEtime);
    //获取摘要信息
    //getSummary();

    cur_setp = 1;
    $("#fangan_list").hide();

    if (ybddMapType == "1") {
        $(".show_byyz").show();
        $(".show_byyzList").show();
        $(".show_byyzList").parent().show();
        //判断产汇流信息是否展示
        let display = $('#show_dychxx').css('display')
        if (display !== "none") {
            $('#show_dychxx').css('margin-left', '20px')
        }
    }



}

function reset(flag) {

    mapToAll(flag);
}

function mapToAll(flag) {
    if (flag) {
        $(".main-top").show();
        $(".main-left").show();
    } else {
        $(".main-top").hide();
        $(".main-left").hide();
    }
    initAreaList();
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null) {
        setTimeout(function () {
            svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            resetRealState(svgDocument);
        }, 1000);
    } else
        resetRealState(svgDocument);

}

function resetRealState(svgDocument) {
    if (svgDocument == null)
        return;

    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    var areaName = "全部";
    svgWnd.showFenqu(areaName);
    var rangeInfo = arrRange.find(function (item) {
        return item.subRiver == areaName;
    });
    if (rangeInfo == null)
        searchRange = "14";
    else
        searchRange = rangeInfo.id;

    ybddMapType = 1;
    tools.searchRange = searchRange;
    tools.clear_vip();
    handle(1);
}

/*
 * 预报下各步骤按钮的移出事件，隐藏提示文字(横向)
 */
$('#btn_mxxz,#btn_ybjs,#btn_cgxz,#btn_fbbc,#btn_sjsz,#btn_jysz').mouseout(function (e) {

    //  $("#" + e.target.id + "_text").hide();
    // $("#" + e.target.id + "_text span").css("color", "rgba(5, 116, 255, 1)")
})
$('#btn_mxxz img,#btn_ybjs img,#btn_cgxz img,#btn_fbbc img,#btn_sjsz img,#btn_jysz img').mouseout(function (e) {

    // $("#" + e.target.parentNode.id + "_text").hide();
    //  $("#" + e.target.parentNode.id + "_text span").css("color", "rgba(5, 116, 255, 1)")
})
/*
 * 预报下各步骤按钮的移入事件，显示提示文字(横向)
 */
$('#btn_mxxz,#btn_ybjs,#btn_cgxz,#btn_fbbc,#btn_sjsz,#btn_jysz').mouseover(function (e) {

    // $("#" + e.target.id + "_text span").css("color","#ff0000")
    //  $("#" + e.target.id + "_text").show();

})
$('#btn_mxxz img,#btn_ybjs img,#btn_cgxz img,#btn_fbbc img,#btn_sjsz img,#btn_jysz img').mouseover(function (e) {

    //   $("#" + e.target.parentNode.id + "_text").show();
    //  $("#" + e.target.parentNode.id + "_text span").css("color", "#ff0000")

})
/*
 * 预报下各步骤按钮的移出事件，隐藏提示文字(竖向)
 */
$('#btn_mxxz_shu,#btn_ybjs_shu,#btn_cgxz_shu,#btn_fbbc_shu,#btn_sjsz_shu,#btn_jysz_shu').mouseout(function (e) {

    // $("#" + e.target.id + "_text").hide();
    //  $("#" + e.target.id + "_text span").css("color", "rgba(5, 116, 255, 1)")

})
$('#btn_mxxz_shu img,#btn_ybjs_shu img,#btn_cgxz_shu img,#btn_fbbc_shu img,#btn_sjsz_shu img,#btn_jysz_shu img').mouseout(function (e) {

    //  $("#" + e.target.parentNode.id + "_text").hide();
    //  $("#" + e.target.parentNode.id + "_text span").css("color", "rgba(5, 116, 255, 1)")
})
/*
 * 预报下各步骤按钮的移入事件，显示提示文字(竖向)
 */
$('#btn_mxxz_shu,#btn_ybjs_shu,#btn_cgxz_shu,#btn_fbbc_shu,#btn_sjsz_shu,#btn_jysz_shu').mouseover(function (e) {

    // $("#" + e.target.id + "_text span").css("color", "#ff0000")
    //  $("#" + e.target.id + "_text").show();

})

$('#btn_mxxz_shu img,#btn_ybjs_shu img,#btn_cgxz_shu img,#btn_fbbc_shu img,#btn_sjsz_shu img,#btn_jysz_shu img').mouseover(function (e) {

    //    $("#" + e.target.parentNode.id + "_text").show();
    // $("#" + e.target.parentNode.id + "_text span").css("color", "#ff0000")

})


/*
 * 预报下各步骤按钮的点击事件(横向)
 */

$('#btn_mxxz,#btn_ybjs,#btn_cgxz,#btn_fbbc,#btn_sjsz,#btn_jysz').click(function (e) {
    if (tools_panel.chartGcx) {
        let zr = tools_panel.chartGcx.getZr();
        zr.off('dblclick')
    }
    isCgxz = false;
    $("#btn_swqx-modify").bootstrapSwitch();
    $("#btn_swqx-modify").bootstrapSwitch("state", true)
    //单元产汇流信息
    $("#show_dychxx").hide()
    $("#show_dychxx").parent().hide()
    //显示单元产汇流信息
    let showDychxx = false
    let display = $('#show_byyz_position').css('display')
    let pdisplay = $('#show_byyz_position').parent().css('display')
    if (display === "none" || pdisplay === "none") {
        $("#show_dychxx").css("margin-left", 0)
        $("#show_dychxx").parent().parent().hide()
    }

    if ((e.target.id == "btn_sjsz") || (e.target.parentNode.id == "btn_sjsz")) {
        if (searchRange == "14") {
            layer.confirm('未进行流域选择，是否选择流域？', {
                icon: 3,
                btn: ['是', '否'], //按钮
                yes: function (index) {
                    layer.close(index);
                },
                btn2: function (index) {
                    layer.close(index);
                    yb_shjz_PanelShow();
                }
            });
        } else {
            yb_shjz_PanelShow();
        }
    } else if ((e.target.id == "btn_jysz") || (e.target.parentNode.id == "btn_jysz")) {
        yb_jyjz_PanelShow();
    } else if ((e.target.id == "btn_mxxz") || (e.target.parentNode.id == "btn_mxxz")) {
        yb_mxxz_PanelShow();
    } else if ((e.target.id == "btn_ybjs") || (e.target.parentNode.id == "btn_ybjs")) {
        //添加一键预报——用户没有进行条件选择时，直接点击预报计算弹出一键预报面板  add by chl 2022.6.14
        //初始化菜单
        GetTreeMenuData()
        if (ybCondition == 0) { //没有进行条件设置
            yb_yjyb_PanelShow();
        } else {
            isCgxz = false;
            //判断所选模型是否已经计算过，如果已计算，弹出是否清除计算数据，否则不清楚继续计算
            yb_modelIsCal();
        }
		showDychxx = true
		//显示预报发布
        $(".show_forecast").show();
        $(".show_forecast").parent().show();
    } else if ((e.target.id == "btn_cgxz") || (e.target.parentNode.id == "btn_cgxz")) {
        isCgxz = true;
        showDychxx = true
        $("#btn_ybsw-modify").bootstrapSwitch();
        $("#btn_ybsw-modify").bootstrapSwitch("state", true)
        $("#modifyNote").show();
        $("#btn_ybsw-getRain").show();
        $("#btn_ybsw-save").show();
        $("#btn_ybsw-updaily").show();
        yb_setSteps(5, ybddMapType);

        //当只选一个模型时不跳出基准模型选择窗口，直接所选择的模型设为基准模型
        if (selectModes.split(',').length == 1) {
            modifyModel = selectModes;
        } else {
            modifyPanelShow();
        }
    } else if ((e.target.id == "btn_fbbc") || (e.target.parentNode.id == "btn_fbbc")) {
        showDychxx = true
        $("#btn_ybsw-modify").bootstrapSwitch("destroy");
        $("#btn_ybsw-modify").bootstrapSwitch();
        $("#btn_ybsw-modify").bootstrapSwitch("state", false)
        modelResultSave();
    }
    if(showDychxx){
        $("#show_dychxx").show()
        $("#show_dychxx").parent().show()
        $("#show_dychxx").parent().parent().show()
        if (display === "none" || pdisplay === "none") {
            $("#show_dychxx").css("margin-left", 0)
        } else {
            $("#show_dychxx").css("margin-left", "20px")
        }
    }
})
/*
 * 预报下各步骤按钮的点击事件(竖向)
 */

$('#btn_mxxz_shu,#btn_ybjs_shu,#btn_cgxz_shu,#btn_fbbc_shu,#btn_sjsz_shu,#btn_jysz_shu').click(function (e) {
    if (tools_panel.chartGcx) {
        let zr = tools_panel.chartGcx.getZr();
        zr.off('dblclick')
    }
    isCgxz = false;
    $("#btn_swqx-modify").bootstrapSwitch();
    $("#btn_swqx-modify").bootstrapSwitch("state", true)
    //单元产汇流信息
    $("#show_dychxx").hide()
    $("#show_dychxx").parent().hide()
    //显示单元产汇流信息
    let showDychxx = false
    let display = $('#show_byyz_position').css('display')
    let pdisplay = $('#show_byyz_position').parent().css('display')
    if (display === "none" || pdisplay === "none") {
        $("#show_dychxx").css("margin-left", 0)
        $("#show_dychxx").parent().parent().hide()
    }

    if ((e.target.id == "btn_sjsz_shu") || (e.target.parentNode.id == "btn_sjsz_shu")) {
        isCgxz = false;
        if (searchRange == "14") {
            layer.confirm('未进行流域选择，是否选择流域？', {
                icon: 3,
                btn: ['是', '否'], //按钮
                yes: function (index) {
                    layer.close(index);
                },
                btn2: function (index) {
                    layer.close(index);
                    yb_shjz_PanelShow();
                }
            });
        } else {
            yb_shjz_PanelShow();
        }
    } else if ((e.target.id == "btn_jysz_shu") || (e.target.parentNode.id == "btn_jysz_shu")) {
        yb_jyjz_PanelShow();
    } else if ((e.target.id == "btn_mxxz_shu") || (e.target.parentNode.id == "btn_mxxz_shu")) {
        yb_mxxz_PanelShow();
    } else if ((e.target.id == "btn_ybjs_shu") || (e.target.parentNode.id == "btn_ybjs_shu")) {
        closeModifyBtn();
        //判断所选模型是否已经计算过，如果已计算，弹出是否清除计算数据，否则不清楚继续计算
        yb_modelIsCal();
        //初始化菜单
        GetTreeMenuData()
        showDychxx = true
        // yubaoproc(false);
    } else if ((e.target.id == "btn_cgxz_shu") || (e.target.parentNode.id == "btn_cgxz_shu")) {
        isCgxz = true;
        $("#btn_ybsw-modify").bootstrapSwitch();
        $("#btn_ybsw-modify").bootstrapSwitch("state", true);
        $("#modifyNote").show();
        $("#btn_ybsw-getRain").show();
        $("#btn_ybsw-save").show();
        $("#btn_ybsw-updaily").show();
        yb_setSteps(5, ybddMapType);
        //当只选一个模型时不跳出基准模型选择窗口，直接所选择的模型设为基准模型
        if (selectModes.split(',').length == 1) {
            modifyModel = selectModes;
        } else {
            modifyPanelShow();
        }
        showDychxx = true
    } else if ((e.target.id == "btn_fbbc_shu") || (e.target.parentNode.id == "btn_fbbc_shu")) {
        $("#btn_ybsw-modify").bootstrapSwitch("state", false)
        modelResultSave();
        showDychxx = true
    }
    if(showDychxx){
        $("#show_dychxx").show()
        $("#show_dychxx").parent().show()
        $("#show_dychxx").parent().parent().show()
        if (display === "none" || pdisplay === "none") {
            $("#show_dychxx").css("margin-left", 0)
        } else {
            $("#show_dychxx").css("margin-left", "20px")
        }
    }
})


/*
 系统四大模块点击事件，预报，预警，预演，预案
 */
$('.sy_yb,.sy_yj,.sy_yy,.sy_ya').click(function (e) {
    if ($(this).hasClass("sy_yb")) {
        isYj = false;
        if (ybddMapType == "1") {
            $(".yb-pa-s").hide();
            $(".yb-pa-h").show();
        } else {
            $(".yb-pa-s").show();
            $(".yb-pa-h").hide();
        }
        $("#panelYjInfo").hide();
        $("#panelYbInfo").hide();
        $("#panelDdInfo").hide();
        // yubaoproc(false);
        changeSyBtnBgColor(1);
        //从预警、预演、预案切会预报后，状态改回预报状态
        if (isAlreadyCal) {
            searchType = 2
            showYBinfo();
        }
        ybMenu = 1
        showSwQx()
    } else {
        if (getRadioModel() == undefined) {
            tools.show_message_error_const("未进行预报计算，请进行预报计算！")
            return;
        }
        if (isSaveForPro == false) {
            tools.show_message_error_const("预报方案未保存，请发布保存预报方案！")
            return;
        }
        $(".yb-pa-h").hide();
        $(".yb-pa-s").hide();
        if ($(this).hasClass("sy_yj")) {
            ybMenu = 2
            isYj = true;
            closeModifyBtn()
            closeSLModify()
            handle(3);
            changeSyBtnBgColor(2);
        } else if ($(this).hasClass("sy_yy")) {
            ybMenu = 3
            isYj = false;
            closeModifyBtn()
            closeSLModify()
            handle(4);
            changeSyBtnBgColor(3);
        } else if ($(this).hasClass("sy_ya")) {
            ybMenu = 4
            isYj = false;
            closeModifyBtn()
            closeSLModify()
            handle(5);
            changeSyBtnBgColor(4);

        }
    }
})


/**
 *
 * @param {any} index 四预的索引，2是预报，3是预警，4是预演，5是预案
 */
function changeSyBtnBgColor(index) {
    for (var i = 1; i <= 4; i++) {
        if (i <= index) {
            $(".sy_btn_" + i).removeClass("active").addClass("active");
        } else {
            $(".sy_btn_" + i).removeClass("active");
        }
        // if (i == index)
        //     $(".sy_btn_" + i).removeClass("active").addClass("active");
        // else
        //     $(".sy_btn_" + i).removeClass("active");
    }

}
/*
 * 右侧工具栏点击事件，雨量图，图层控制，图例以及清除缓存
 */
$('#bar_rlt,#bar_tckz,#bar_tl,#bar_clearCache,#bar_yscz,#bar_sdl,#bar_hsyj,#bar_dsyb').click(function (e) {
    var obj = $("#" + e.target.id);

    if (obj.hasClass("bar_active")) {
        obj.removeClass("bar_active");
        if (e.target.id == "bar_rlt") {
            obj.attr("src", "./page_h/img/bar_rlt.png");
            yb_ylt_PanelHide();
        } else if (e.target.id == "bar_tckz") {
            obj.attr("src", "./page_h/img/bar_tckz.png");
            yb_tckz_PanelHide();
        } else if (e.target.id == "bar_tl") {
            obj.attr("src", "./page_h/img/bar_tl.png");
            yb_tl_PanelHide();
        } else if (e.target.id == "bar_clearCache") {
            obj.attr("src", "./page_h/img/bar_clearCache.png");
            yb_clearCache_PanelHide();
        } else if (e.target.id == "bar_yscz") {
            obj.attr("src", "./page_h/img/bar_yscz.png");
        } else if (e.target.id == "bar_sdl") {
            obj.attr("src", "./img/revr.png");
        } else if (e.target.id == "bar_hsyj") {
            obj.attr("src", "./page_h/bar_hsyj.png");
            clear_hsyj();
        } else if (e.target.id == "bar_dsyb") {
            obj.attr("src", "./img/timing.png");
            yb_dsyb_PanelHide()
            // clear_hsyj();
        }
        // else if (e.target.id == "bar_sshsyb") {
        //     obj.attr("src", "./page_h/img/右箭头.png");
        //     // clear_hsyj();
        // }
    } else {
        obj.addClass("bar_active");
        if (e.target.id == "bar_rlt") {
            obj.attr("src", "./page_h/img/bar_rlt_active.png");
            yb_ylt_PanelShow();
        } else if (e.target.id == "bar_tckz") {
            obj.attr("src", "./page_h/img/bar_tckz_active.png");
            yb_tckz_PanelShow();
        } else if (e.target.id == "bar_tl") {
            obj.attr("src", "./page_h/img/bar_tl_active.png");
            yb_tl_PanelShow();
        } else if (e.target.id == "bar_clearCache") {
            obj.attr("src", "./page_h/img/bar_clearCache_active.png");
            yb_clearCache_PanelShow();
        } else if (e.target.id == "bar_yscz") {
            obj.attr("src", "./page_h/img/bar_yscz_active.png");
            yb_yscz();

        } else if (e.target.id == "bar_sdl") {
            obj.attr("src", "./page_h/img/bar_sdl.png");
            sdlyb();

        } else if (e.target.id == "bar_hsyj") {
            obj.attr("src", "./page_h/img/bar_hsyj_active.png");
            yb_hsyj_PanelShow();
        } else if (e.target.id == "bar_dsyb") {
            if (searchRange == 14) {
                tools.show_message_error_const("未进行流域选择,请先选择流域")
                return
            }
            obj.attr("src", "./img/timing-active.png");
            // yb_hsyj_PanelShow();
            yb_dsyb_PanelShow()
            //弹出定时预报设定

        }
        // else if (e.target.id == "bar_sshsyb") {
        //     obj.attr("src", "./page_h/img/左箭头.png");
        //     // yb_hsyj_PanelShow();
        //     //弹出定时预报设定
        //     $(".bar_sshsyb").pageslide({
        //         direction: "left",
        //         modal: true
        //     });
        // }

    }

})
$(".bar_sshsyb_1").pageslide({
    direction: "left",
    modal: true
});

/*
 * 右侧工具栏鼠标移出事件，隐藏提示文字
 */
$('#bar_rlt,#bar_tckz,#bar_tl,#bar_clearCache,#bar_yscz,#bar_sdl,#bar_hsyj,#bar_dsyb,#bar_sshsyb').mouseout(function (e) {

    $("." + e.target.id + "_text").hide();

})
/*
 * 右侧工具栏鼠标移入事件，显示提示文字
 */
$('#bar_rlt,#bar_tckz,#bar_tl,#bar_clearCache,#bar_yscz,#bar_sdl,#bar_hsyj,#bar_dsyb,#bar_sshsyb').mouseover(function (e) {

    $("." + e.target.id + "_text").show();

})
//获取系统前一天日期
function getYesterday() {
    //系统当前日期
    var dd = new Date();
    dd.setDate(dd.getDate() - 1);
    var year = dd.getFullYear();
    var month = dd.getMonth() + 1;
    var day = dd.getDate();
    var time = year + "-" + month + "-" + day + " " + "08:00";
    return time;
}

function getModelMap() {
    var s_select_model = $("#modelSelectForMap").find(".selected")[0];
    var select_model = $(s_select_model).attr("value_")
    return select_model;
}

//预报发布
function modelResultSave() {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: selectModes,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        plan: Number(searchPlan),
        range: Number(searchRange),
        startTime: searchStime,
        stcd: "",
        meteorPattern: meteor
        // userId: $("#_hid_userid").val()
    };
    var info = JSON.stringify(objData);
    tools.loadingshow("预报成果入库中...", 100);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/ModelResultSave",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            if (data.code == 200) {
                // getImpInfo(2);
                isSaveForPro = true;
                if (isModifyAndSave) {
                    foreModifySave()
                }
                $("#btn_ybsw-modify").bootstrapSwitch("state", false)
                yb_setSteps(6, ybddMapType);
                tools.show_message_success("河系预报计算成果入库完成!");
                tools.loadinghide(false);
            } else {
                tools.show_message_error_const(data.message);
                tools.loadinghide(false);
                return;
            }
        },
        error: function (errorMsg) {
            tools.show_message_error_const(data.message);
            tools.loadinghide(false);
            return;
        }
    });
}
/**
 * 方案是否已计算
 */
function yb_modelIsCal() {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        hisStormId: _hisStormId,
        model: selectModes,
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        startTime: searchStime,
        stcd: "",
        meteorPattern: meteor
        // userId: $("#_hid_userid").val()
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-realsituate/ModelIsCal",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                if (res.data == true) { //已计算过,是否需要清除缓存
                    layer.confirm("此方案已计算过，是否需要清除重新计算", {
                        icon: 3,
                        tiem: 0,
                        btn: ["是", "否"],
                        yes: function (index) {
                            layer.close(index);
                            isSaveForPro = false;
                            tools.loadingshow("清除缓存中...", 250);
                            clearCacheFor();
                        },
                        btn2: function () {
                            isSaveForPro = true;
                            yubaoproc(false);
                            yb_setSteps(6, ybddMapType);
                            // yb_setSteps(6, "2")
                        }
                    })

                } else { //未计算过
                    yubaoproc(false);
                }
            } else {
                tools.show_message_error_const(res.message);
                return;
            }
        },
        error: function (errorMsg) {
            tools.show_message_error_const(errorMsg);
            return;
        }
    });
}
/**
 * 清除预报缓存
 */
function clearCacheFor() {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: selectModes,
        plan: Number(searchPlan),
        range: Number(searchRange),
        startTime: searchStime,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        stcd: "",
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/ClearCache",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code != 200) {
                tools.show_message_error(res.message);
                return;
            }
            tools.loadinghide(false);
            tools.show_message_success(res.message);
            searchStime = $("#beginTime").val() + ":00";
            searchEtime = $("#endTime").val() + ":00";
            sessionStorage.setItem("stime", searchStime);
            sessionStorage.setItem("etime", searchEtime);
            yubaoproc(false);
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error(errorMsg);
            return;
        }
    })
}
/**
 * 要素插值
 * */
function yb_yscz() {
    yb_ysczTime_PanelShow();
}
//展示水位曲线修正按钮
function showSwQx() {
    $("#btn_swqx-modify").bootstrapSwitch()
    $("#btn_swqx-modify").bootstrapSwitch("state", true);
    $("#modifyNote1").show();
    $("#btn_swqx-getRain").show();
    $("#btn_swqx-save").show();
}

//关闭水位流量修正功能
function closeSLModify() {
    $("#btn_swqx-modify").bootstrapSwitch("state", false);
    $("#btn_swqx-modify").bootstrapSwitch("destroy");
    $("#btn_swqx-modify").css({
        "display": "none"
    });
    $("#modifyNote1").hide();
    $("#btn_swqx-getRain").css({
        "display": "none"
    });
    $("#btn_swqx-save").css({
        "display": "none"
    });
    $("#zq_all").css({
        "visibility": "hidden"
    });
    $("#li_zqQx").remove()

}

function closeModifyBtn() {
    $("#btn_ybsw-modify").bootstrapSwitch("state", false);
    $("#btn_ybsw-modify").bootstrapSwitch("destroy");
    $("#btn_ybsw-modify").css({
        "display": "none"
    });
    $("#modifyNote").hide();
    $("#btn_ybsw-getRain").css({
        "display": "none"
    });
    $("#btn_ybsw-zoom").css({
        "display": "none"
    });
    $("#btn_ybsw-save").css({
        "display": "none"
    });
    $("#btn_ybsw-updaily").css({
        "display": "none"
    });
}
/**
 * 水动力预报
 */
function sdlyb() {
    if (getRadioModel() == undefined) {
        tools.show_message_error_const("未进行预报计算，请先进行预报计算！");
        $("#bar_sdl").attr("src", "./img/revr.png");
        return;
    }
    tools.loadingshow("水动力学预报计算中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);

    var objData = {
        adjust: 1,
        autoFore: 0,
        day: selectDays,
        etime: searchEtime,
        hisStormId: _hisStormId,
        model: 1,
        modelid: getRadioModel(),
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        stime: searchStime,
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);


    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": $("#_hid_token").val()
        },
        url: apiUrl_cloud + "api-hwhydroinfo/get_hydracal",
        data: info,
        success: function (res) {
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error_const("查询信息失败！");
                return;
            }
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error_const("水动力预报计算失败！" + res.message);
                // $(".report-sdlyb .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panel_sdlyb").show();
                tools.showPanelIndex("panel_sdlyb");
                setParSizeSdljs("panel_sdlyb", default_par_width_report, default_par_height_report, res.data);

                $("#panelSwAllYb").hide();
                $("#show_panel_all").removeAttr("checked");
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}
/**
 * 保存修正模型数据
 */
function foreModifySave() {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: modifyModel,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        plan: Number(searchPlan),
        range: Number(searchRange),
        startTime: searchStime,
        stcd: "",
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/ForeModifySave",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            if (data.code == 200) {
                isModifyAndSave = false
            } else {
                tools.show_message_error_const(data.message);
                tools.loadinghide(false);
                return;
            }
        },
        error: function (errorMsg) {
            tools.show_message_error_const(data.message);
            tools.loadinghide(false);
            return;
        }
    });
}
//设置默认地图(根据用户所在行政区划)
function setDefaultMap() {
    setSelectMap(getCookie("userRange"));
}

function getModelsByRange(checkModelDivId) {
    $.ajax({
        type: 'get',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-hwdatabasic/getModelsByRange",
        data: {
            range: searchRange
        },
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                var dataTree = [];
                var childrenArr = [];
                $.each(res.data, function (index, item) {
                    var checked = false;
                    if (item.model == "APIUH" || item.model == "HBYH" || item.model == "SAC" || item.model == "TANK" ||
                        item.model == "XAJGJ" || item.model == "XAJMK" || item.model == "XC") {
                        checked = true;
                    }
                    var modelArr = {
                        title: "",
                        id: "",
                        field: "",
                        checked: false,
                        children: [],
                        spread: true,
                    };
                    if (item.range == 0) {
                        modelArr.id = item.id;
                        modelArr.title = item.modelName;
                        dataTree.push(modelArr);
                    } else {
                        modelArr.id = item.id;
                        modelArr.field = item.model;
                        modelArr.title = item.modelName;
                        modelArr.checked = checked
                        childrenArr.push(modelArr)
                    }
                })
                $.each(dataTree, function (i, data) {
                    $.each(childrenArr, function (index, item) {
                        if (item.id.split('.')[0] == data.id) {
                            data.children.push(item)
                        }
                    })
                })

                layui.use('tree', function () {
                    treeModel = layui.tree;
                    //渲染
                    var inst = treeModel.render({
                        elem: '#' + checkModelDivId,
                        showCheckbox: true,
                        showLine: false,
                        id: "treeModel",
                        data: dataTree,
                        oncheck: function (obj) {
                            if (obj.data.field == "APIGIUH" || obj.data.field == "NYNL" || obj.data.field == "BFS") {
                                if (obj.checked) {
                                    treeModel.setChecked("treeModel", 1.1);
                                    //当API+地貌单位线、纳雨能力、概率模型勾选时，API无法取消勾选,强绑定
                                    $("input[name='APIUH']").next().addClass('div-not-click');
                                } else {
                                    $("input[name='APIUH']").next().removeClass('div-not-click');
                                }
                            }
                            if (obj.data.field == "APIUH") {
                                if (($("input[name='APIGIUH']").next().hasClass("layui-form-checked") || $("input[name='NYNL']").next().hasClass("layui-form-checked") || $("input[name='BFS']").next().hasClass("layui-form-checked")) && (!$("input[name='APIUH']").next().hasClass('div-not-click'))) {
                                    $("input[name='APIUH']").next().addClass('layui-form-checked')
                                    $("input[name='APIUH']").next().addClass('div-not-click');
                                }
                            }
                        }
                    })
                })
            } else {
                tools.show_message_error_const(res.message);
            }
        },
        error: function (res) {
            tools.show_message_error_const(res.responseJSON.message)
        }
    })
}
/**
 * 实时洪水预报
 */
$(".bar_sshsyb_1").click(function (e) {
    // var obj1 = $(e.target);
    var obj = $("#bar_sshsyb");
    if (obj.hasClass("bar_active")) { //收起
        obj.removeClass("bar_active");
        obj.attr("src", "./page_h/img/left.png");
    } else { //展开
        obj.addClass("bar_active");
        obj.attr("src", "./page_h/img/right.png");
        // if ($("#panel_tckz").show()) {
        //     $("#panel_tckz .icon-close-new").click();
        // }
        // $("#panel_tckz").hide()
        //获取实时洪水预报滚动信息
        getScrolllInfoList();
    }
    // alert("!!!");
})
/**
 * 获取实时洪水预报滚动信息
 */
function getScrolllInfoList() {
    var objData = {
        range: Number(searchRange),
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/real/getScrolllInfoList",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                //解析数据
                let ssybhsDiv = ""
                $.each(res.data, function (index, item) {
                    ssybhsDiv += "<div class = 'group5_sshsyb flex-col' onclick=\"getForInfo(" + "\'" + item.setUpStartTime + "\'" + "," + "\'" + item.forecastStartTime + "\'" + "," + "\'" + item.plan + "\'" + "," +
                        "\'" + item.rainPlus + "\'" + "," + "\'" + item.plusType + "\'" + "," + "\'" + item.model + "\'" + "," + "\'" + item.modelName + "\'" + "," + "\'" + item.foreDays + "\'" + ")\" > "
                    ssybhsDiv += "<div class = 'main11_sshsyb flex-col'><div class = 'main12_sshsyb flex-row'><div class = 'section2_sshsyb flex-col'><div class='main13_sshsyb flex-col'></div>"
                    ssybhsDiv += "<span class = 'word7_sshsyb'>" + Number(index + 1) + "</span></div></div>"
                    ssybhsDiv += "<div class = 'main14_sshsyb flex-row'><span class = 'word8_sshsyb'>方案类型：</span><span class = 'txt2_sshsyb'>" + item.planName + "</span>"
                    ssybhsDiv += "<span class = 'word9_sshsyb'>计算时间：</span><span class = 'info3_sshsyb'>" + item.calcTime + "</span></div>"
                    ssybhsDiv += "<div class = 'main15_sshsyb flex-row'><span class = 'word10_sshsyb'>开始时间：</span><span class = 'word11_sshsyb'>" + item.setUpStartTime + "</span>"
                    ssybhsDiv += "<span class = 'word12_sshsyb'>结束时间：</span><span class = 'word13_sshsyb'>" + item.forecastStartTime + "</span></div>"
                    ssybhsDiv += "<div class = 'main16_sshsyb flex-col'></div></div><span class = 'txt3_sshsyb'>实时滚动</span></div>"
                })
                $("#pageslide #modal").append(ssybhsDiv);
            } else {
                tools.show_message_error_const(res.message);
                tools.loadinghide(false);
                return;
            }
        },
        error: function (errorMsg) {
            tools.show_message_error_const(res.message);
            tools.loadinghide(false);
            return;
        }
    });
}

function getForInfo(btime, etime, plan, rainPlus, plusType, model, modelName, foreDays) {
    // yb_modelIsCal()
    // tools.loadingshow("查询洪水预报信息中...", 100);
    searchStime = btime;
    searchEtime = etime;
    searchPlan = plan;
    _rainPlus = rainPlus;
    _plusType = plusType;
    selectDays = foreDays;
    selectModes = model;
    _hisStormId = -1;
    meteor = "";
    selectModelsName = modelName;
    // selectModelsName = "API模型,新安江模型"
    searchType = "2";
    tools_panel_allYb.show_type = "2";
    //图层控制改变
    var modelArr = selectModes.split(',');
    var htmlRadio = "<select id = 'modelSelectMap'>";
    var modelsNameArr = selectModelsName.split(',')
    $.each(modelsNameArr, function (i, item) {
        if (i == 0) { //默认选中第一个模型
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelArr[i] + "'  model_ = '" + item + "'  select>" + item + "</option>"
        } else {
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelArr[i] + "' model_ = '" + item + "' >" + item + "</option>"
        }
    })
    htmlRadio += "</select>"
    $("#modelSelectForMap").html("");
    $("#modelSelectForMap").append(htmlRadio);
    $('#modelSelectMap').fancyspinbox();
    yb_setSteps(6, ybddMapType);
    showYBinfo();
    $(".bar_sshsyb_1").click();
}



//优化调度接口调度进度信息展示
function yhddProgressShow(yhddName) {

    let showtype = "s"
    if (ybddMapType == "1")
        showtype = "h";
    $("#tx_progress_content_" + showtype).html("");
    $(".progress-text_" + showtype).html("0%");
    $('.progress-bar_' + showtype).css('width', "0%");
    $("#progress_zhezhao_" + showtype).show();

    grogressPersentYhdd = 0;

    clearInterval(yhddTimer);
    setStepState(4);
    yhddTimer = setInterval(function () {
        yhddProgress(showtype, yhddName);
    }, 1000);
}

function yhddProgress(showtype, yhddName) {
    $.ajax({
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-optimized/RsvrOptJointInfo",
        success: function (data) {
            var json = data;
            if (json.code == 200 && json.data.status == 0) {
                _html = $("#tx_progress_content_" + showtype).html();
                // var new_p = "<p style=\"color:red\"> " + json.data.msg.replace("：", ":<br />") + "</p>";
                var new_p = "<p style=\"color:red\"> " + json.data.info.replace("：", ":<br />") + "</p>";
                _html = _html.replace("color:red", "");
                _html += new_p;
                $("#tx_progress_content_" + showtype).html(_html);
                $("#tx_progress_content_" + showtype).scrollTop($("#tx_progress_content_" + showtype)[0].scrollHeight);

                if (json.data.msg && json.data.msg.indexOf("用户登陆失败或已过期") > -1) {
                    clearInterval(yhddTimer);
                } else if (json.data.status == 0) {
                    var rndBase = 10
                    var v_rate = 1;
                    grogressPersentYhdd += parseInt(Math.random() * rndBase);
                    if (grogressPersentYhdd >= v_rate * 100)
                        grogressPersentYhdd = v_rate * 100 - 1;
                    $('.progress-bar_' + showtype).css('width', Math.round(grogressPersentYhdd / v_rate, 0) + "%");
                }
            } else if (json.code == 200 && json.data.status == 1) { //结束查询
                $('.progress-bar_' + showtype).css('width', "100%");
                //  $("#progress_zhezhao_" + showtype).hide();
                clearInterval(yhddTimer);
                //下面操作-调度
                jointDispatch(yhddName);
            } else {
                clearProgress(showtype);
                tools.show_message_error("获取进度失败！");

            }
        },
        error: function (errorMsg) {
            return "-9999";
        }
    });
}
/**
 * 进行正常调度逻辑—— 后续调度的所有接口参数变动： 方案名称改为优化调度的方案名称、 scheduleType改为3
 * @param {*优化调度方案名称} yhddName
 */
function jointDispatch(yhddName) {
    clearSvgAnimate();

    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();


    //  isgetprogress = true;
    var settings = {
        "url": apiUrl_cloud + "api-realsituate/JointDispatch",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": getCookie("accessToken")
        },
        "data": JSON.stringify({
            "adjust": 1,
            "endTime": searchEtime,
            "foreDays": Number(selectDays),
            "model": getRadioModel(),
            "plan": Number(searchPlan),
            "range": Number(searchRange),
            "schedulePlanName": yhddName,
            "rsvrMode": Number($('input[type=radio][name=rd_gzdd_param]:checked').val()),
            "scheduleType": 3,
            "startTime": searchStime,
            "plusType": _plusType,
            "rainPlus": _rainPlus,
            "hisStormId": _hisStormId,
            "stcd": ""
        }),
    };

    $.ajax(settings).done(function (json) {
        if (json.code != 200) {
            //    isgetprogress = false;
            tools.show_message_error("联合调度演算失败！");
            return;
        }
        if (json.data.code == "0") {
            tools.show_message_error("联合调度演算失败！");
            return;
        }
        getDDprogress();


    }).fail(function (_res) {
        //  isgetprogress = false;
        clearInterval(timerGL);
        tools.show_message_error("联合调度演算失败！");
        return;
    });

}