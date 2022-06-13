//# sourceURL=report_gcx.js
//报表默认宽高
var default_width_report = 1100;
var default_height_report = 530;
var report_chartGcx = null;
var data_arr = null;
var data_name_arr = null;
var obj_minMax_gcx = null;
var MIN_NUM = -99999;
var MAX_NUM = 99999;
var dd_yb_type = 1;
//最小值百分比
var MIN_DEPART = 0.2;
//最大值百分比
var MAX_DEPART = 0.2;
//var GetGcxForecastDbfx_pModeID = null;
//最大化按钮事件
$(".report-gcx .icon-max").click(function () {
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_width_report).height(default_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_width_report / 2 + "px",
            "margin-top": "-" + default_height_report / 2 + "px"
        });

        //动态设置报表高度
        setGXCReportSize($(this).parent().parent().parent().attr("id"), default_width_report, default_height_report);
        $(this).attr("data-type", "");
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setGXCReportSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
    }
});

//报表通用改变大小事件
$(".report-gcx").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 650,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});
function reportBbResize(event, ob) {
    //动态设置报表高度
    setGXCReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}


function initShow() {
    report_chartGcx = null;
    data_arr = null;
    data_name_arr = null;
    obj_minMax_gcx = null;
    // report_chartGcx = echarts.init($("#bj_proLineBody")[0]);
    report_chartGcx = echarts.init(document.getElementById('bj_proLineBody'));
    //  report_chartGcx.clear();

    $("#panel_BJ_Gcx").width(default_width_report).height(default_height_report).css({
        "top": "50%",
        "left": "50%",
        "margin-left": "-" + default_width_report / 2 + "px",
        "margin-top": "-" + default_height_report / 2 + "px"
    });

    //动态设置报表高度
    //setGXCReportSize("panel_BJ_Gcx", default_width_report, default_height_report);
    $(".report-gcx .icon-max").attr("data-type", "");
}
function setGXCReportSize(reportId, width, height) {
    $("#" + reportId).width(width).height(height);
    var _width = width - 20;
    var _height = height - 32 - 33;
    var margin_right = 0;
    var bjTable_height = dd_yb_type == 1 ? 142 : 0;//$("#bjTable").height();

    $("#bj_proLineBody").width(_width - margin_right).height(_height - bjTable_height - 5);
    $("#BJ_Gcxt_ProLine .content-left").css("margin-right", margin_right);
    $("#BJ_Gcxt_ProLine .content-left").css("margin-top", 20);


    if (report_chartGcx != null)
        report_chartGcx.resize();


}

//关闭按钮事件
$(".report-gcx .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
});

//报表通用改变大小事件
$(".report-gcx").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 650,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});
//报表通用可拖拽事件
$(".report-gcx").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-gcx").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
  * 创建图表
  **/
function create_bj_gcx_chart(json, _sttp, _stnm) {
    data_arr = new Array();
    data_name_arr = new Array();
    var _minTime = "";
    var _maxTime = "";

    obj_minMax_gcx = {
        sw: { min: MAX_NUM, max: MIN_NUM },
        ll: { min: MAX_NUM, max: MIN_NUM },
    };
    $.each(json.dataName, function (index, item) {
        if (item != "时间") {
            data_name_arr.push(item);
            var _data = new Array();
            data_arr.push(_data);
        }

    });
    $.each(json.data, function (index, item) {
        for (var i = 0; i < data_name_arr.length; i++) {
            data_arr[i].push({ value: [item[0], item[i + 1]] })
            if (data_name_arr[i].indexOf("水位") > -1) {
                obj_minMax_gcx.sw.min = Math.min(Number(item[i + 1]), obj_minMax_gcx.sw.min);
                obj_minMax_gcx.sw.max = Math.max(Number(item[i + 1]), obj_minMax_gcx.sw.max);
            }
            if (data_name_arr[i].indexOf("流量") > -1) {
                obj_minMax_gcx.ll.min = Math.min(Number(item[i + 1]), obj_minMax_gcx.ll.min);
                obj_minMax_gcx.ll.max = Math.max(Number(item[i + 1]), obj_minMax_gcx.ll.max);
            }
        }
    });
    if (json.data != null && json.data.length > 0) {
        _minTime = json.data[0][0];
        _maxTime = json.data[json.data.length - 1][0];
    }
    var arrSw = get_sw_max_min(obj_minMax_gcx.sw.max, obj_minMax_gcx.sw.min);
    var arrLl = get_ll_max_min(obj_minMax_gcx.ll.max, obj_minMax_gcx.ll.min, _sttp);
    var axis_sw_min = arrSw[1] < 0 ? 0 : arrSw[1];
    var axis_sw_max = arrSw[0];
    var axis_ll_min = arrLl[1] < 0 ? 0 : arrLl[1];
    var axis_ll_max = arrLl[0];

    var intervalX = get_axis_interval_gcx(_minTime, _maxTime);
    //获取时间轴格式化字符串
    var strFormatX = format_axis_label_gcx(_minTime, _maxTime);
    //console.log(_minTime + "/" + _maxTime + "/" + intervalX);



    option = get_option_bj_gcx(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX, _stnm);
    report_chartGcx.setOption(option, true);

};

/**
  * 创建图表-行蓄洪区
  **/
function create_bj_gcx_chart_xxhq(json, _sttp, _stnm){
    data_arr = new Array();
    data_name_arr = new Array();
    var _minTime = "";
    var _maxTime = "";

    obj_minMax_gcx = {
        ll: { min: MAX_NUM, max: MIN_NUM },
    };
    $.each(json.Name, function (index, item) {       
        data_name_arr.push(item);
        var _data = new Array();
        data_arr.push(_data);    
    });

    $.each(json.Value, function (index, item) {
        for (var i = 0; i < item.length; i++) {
            data_arr[index].push({ value: [json.Time[index][i],item[i]] });
            obj_minMax_gcx.ll.min = Math.min(Number(item[i]), obj_minMax_gcx.ll.min);
            obj_minMax_gcx.ll.max = Math.max(Number(item[i]), obj_minMax_gcx.ll.max);
        }
    });
    if (json.Value != null && json.Value.length > 0) {
        _minTime = json.Time[0][0];
        _maxTime = json.Time[json.Time.length - 1][json.Time[0].length - 1];
    }
    var arrLl = get_ll_max_min(obj_minMax_gcx.ll.max, obj_minMax_gcx.ll.min, _sttp);

    var axis_ll_min = arrLl[1] < 0 ? 0 : arrLl[1];
    var axis_ll_max = arrLl[0];
    var intervalX = get_axis_interval_gcx(_minTime, _maxTime);
    //获取时间轴格式化字符串
    var strFormatX = format_axis_label_gcx(_minTime, _maxTime);

    option = get_option_bj_gcx_xxhq(axis_ll_max, axis_ll_min, intervalX, strFormatX, _stnm);
    report_chartGcx.setOption(option, true);
}

/**
  * 获取最大最小值（水位）
  **/
function get_sw_max_min(axis_sw_max_temp, axis_sw_min_temp) {

    var axis_sw_min = MAX_NUM;
    var axis_sw_max = MIN_NUM;

    //获取水位最高 最低
    if (axis_sw_max_temp - axis_sw_min_temp > 0) {
        axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * MIN_DEPART;
        axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * MAX_DEPART;
    } else {
        if (axis_sw_min_temp == MAX_NUM) {
            axis_sw_min = 0;
            axis_sw_max = 1;
        } else {
            axis_sw_min = axis_sw_min_temp - 0.5;
            axis_sw_max = axis_sw_max_temp + 0.5;
        }
    }

    return new Array(axis_sw_max, axis_sw_min);
};
/**
 * 获取最大最小值（流量）
 **/
function get_ll_max_min(axis_ll_max_temp, axis_ll_min_temp, _sttp) {

    var axis_ll_min = MAX_NUM;
    var axis_ll_max = MIN_NUM;

    //获取流量最大 最小
    if (axis_ll_max_temp - axis_ll_min_temp > 0) {
        axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * MIN_DEPART;
        axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * MAX_DEPART;
    } else {
        if (axis_ll_min_temp == MAX_NUM) {
            axis_ll_min = 0;
            axis_ll_max = 1;
        } else {
            axis_ll_min = axis_ll_min_temp > 0 ? axis_ll_min_temp - 0.5 : 0;
            axis_ll_max = axis_ll_max_temp + 0.5;
        }
    }

    //水库最小流量>=0
    if (_sttp == "RR") {
        return new Array(axis_ll_max, axis_ll_min < 0 ? 0 : axis_ll_min);
    } else {
        return new Array(axis_ll_max, axis_ll_min);
    }
};

/**
* 获取过程图option
*/
function get_option_bj_gcx(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX, _stnm) {

    var colorList = ['#B22222', '#8B008B', '#008B8B', '#FF0000', '#90EE90', '#0000FF', '#FF0000', '#9ACD32'];
    //遍历添加legend
    var arr_legend = new Array();
    $.each(data_name_arr, function (index, item) {
        arr_legend.push(item);

    });
    var arr_series = new Array();


    //遍历添加serie
    $.each(data_name_arr, function (index, item) {
        arr_series.push({
            name: item,
            type: 'line',
            yAxisIndex: (item.indexOf("水位") > -1 ? 0 : (item.indexOf("流量") > -1 ? 1 : -1)),
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: colorList[index],
            },
            lineStyle: {
                type: (tools.islaststr(item, "流量") ? "dashed" : "dotted"),
            },
            data: data_arr[index]
        });

    });


    var option = {
        title: {
            text: dd_yb_type==1?_stnm + " 方案过程线对比": _stnm + " 预报情景过程线对比",
            textStyle: {
                fontSize: 16
            },
            left: "center"
        },
        legend: {
            show: true,
            top: 20,
            left: "center",
            itemWidth: 20,
            itemHeight: 8,
            itemGap: 8,
            padding: [8, 100, 8, 80],
            data: arr_legend,

        },
        grid: {
            left: 15,
            top: dd_yb_type==1?45:145,
            right: 5,
            bottom: 5,
            containLabel: true
        },
        xAxis: {
            type: "time",
            axisLine: {
                onZero: false,

            },
            interval: intervalX,
            maxInterval: intervalX,
            minInterval: intervalX,
            axisLabel: {
                color: "#000000",
                formatter: function (value, index) {
                    return moment(value).format(strFormatX);
                }
            },
            splitLine: {
                show: true,
                color: "#DDDDDD"

            }
        },
        yAxis: [{
            type: 'value',
            name: '水位(m)',
            nameGap: 10,
            nameTextStyle: {
                padding: [0, 0, 0, 0]
            },
            position: 'left',
            min: axis_sw_min,
            max: axis_sw_max,
            axisLine: {
                onZero: false,

            },
            axisLabel: {
                formatter: function (value, index) {
                    return tools.format_sw(value);
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#DDDDDD"
                }
            }
        }, {
            type: 'value',
            name: '流量(m³/s)',
            nameGap: 10,
            nameTextStyle: {
                padding: [0, 0, 0, 0]
            },
            position: 'right',
            min: axis_ll_min,
            max: axis_ll_max,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#FF0000"
                }
            },
            axisLabel: {
                formatter: function (value, index) {
                    return tools.format_ll(value);
                }
            },
            splitLine: {
                show: false
            }
        }],
        tooltip: {
            trigger: "axis",
            formatter: function (ob) {
                if (ob != null && ob.length > 0) {

                    return tools.format_tooltip_chart(ob);
                } else {
                    return "";
                }
            }
        },
        series: arr_series,
    };

    //设置legend是否可见
    var selected_item = {};
    for (i = 0; i < arr_legend.length; i++) {
        var key_name = arr_legend[i];
        if ((key_name.indexOf("规则调度") > -1) || (key_name.indexOf("初始状态") > -1)) {
            selected_item[key_name] = true;
        } else {
            selected_item[key_name] = false;
        }
    };
    option.legend.selected = selected_item;
    option = tools.initChartlegendIcon(option);
    return option;
};


/**
* 获取过程图option——行蓄洪区
*/
function get_option_bj_gcx_xxhq(axis_ll_max, axis_ll_min, intervalX, strFormatX, _stnm) {

    var colorList = ['#B22222', '#8B008B', '#008B8B', '#FF0000', '#90EE90', '#0000FF', '#FF0000', '#9ACD32'];
    //遍历添加legend
    var arr_legend = new Array();
    $.each(data_name_arr, function (index, item) {
        arr_legend.push(item);

    });
    var arr_series = new Array();


    //遍历添加serie
    $.each(data_name_arr, function (index, item) {
        arr_series.push({
            name: item,
            type: 'line',
            yAxisIndex: 0,
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: colorList[index],
            },
            lineStyle: {
                type: (tools.islaststr(item, "流量") ? "dashed" : "dotted"),
            },
            data: data_arr[index]
        });

    });


    var option = {
        title: {
            text: _stnm + " 方案过程线对比",
            textStyle: {
                fontSize: 16
            },
            left: "center"
        },
        legend: {
            show: true,
            top: 20,
            left: "center",
            itemWidth: 20,
            itemHeight: 8,
            itemGap: 8,
            padding: [8, 100, 8, 80],
            data: arr_legend,

        },
        grid: {
            left: 15,
            top: 45,
            right: 25,
            bottom: 5,
            containLabel: true
        },
        xAxis: {
            type: "time",
            axisLine: {
                onZero: false,

            },
            interval: intervalX,
            maxInterval: intervalX,
            minInterval: intervalX,
            axisLabel: {
                color: "#000000",
                formatter: function (value, index) {
                    return moment(value).format(strFormatX);
                }
            },
            splitLine: {
                show: true,
                color: "#DDDDDD"

            }
        },
        yAxis: [{
            type: 'value',
            name: '流量(m³/s)',
            nameGap: 10,
            nameTextStyle: {
                padding: [0, 0, 0, 0]
            },
            position: 'left',
            min: axis_ll_min,
            max: axis_ll_max,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#FF0000"
                }
            },
            axisLabel: {
                formatter: function (value, index) {
                    return tools.format_ll(value);
                }
            },
            splitLine: {
                show: true,
                color: "#DDDDDD"

            }
        }],
        tooltip: {
            trigger: "axis",
            formatter: function (ob) {
                if (ob != null && ob.length > 0) {

                    return tools.format_tooltip_chart(ob);
                } else {
                    return "";
                }
            }
        },
        series: arr_series,
    };

    //设置legend是否可见
    var selected_item = {};
    for (i = 0; i < arr_legend.length; i++) {
        var key_name = arr_legend[i];
        if ((key_name.indexOf("规则调度") > -1) || (key_name.indexOf("初始状态") > -1)) {
            selected_item[key_name] = true;
        } else {
            selected_item[key_name] = false;
        }
    };
    option.legend.selected = selected_item;
    option = tools.initChartlegendIcon(option);
    return option;
};

/**
* 过程线图例点击事件(通用)
**/
function add_click_report_chartGcx() {
    report_chartGcx.off("legendselectchanged");
    report_chartGcx.on("legendselectchanged", function (params) {
        if (params.name in params.selected) {
            var state = params.selected[params.name];
            var option = tools.selectchangeChartlegendIcon(report_chartGcx.getOption(), state, params.name);
            report_chartGcx.setOption(option, true);
        }


    });
}
/**
* 获取时间轴最大最小差值
*/
function get_axis_interval_gcx(minTime, maxTime) {
    if (minTime != "" && maxTime != "") {
        //获取echarts实例宽度
        var chartWidth = report_chartGcx.getWidth() - 80;
        var distance = 90;
        if (chartWidth <= 600) {
            distance = 90;
        } else if (chartWidth > 600 && chartWidth <= 1000) {
            distance = 120;
        } else {
            distance = 150;
        }
        if (chartWidth == -80) {
            chartWidth = 1000;
            distance = 120;
        }
        //console.log(chartWidth + "/" + distance);
        var axisLen = parseInt(chartWidth / distance);
        console.log(axisLen);
        return (moment(maxTime).valueOf() - moment(minTime).valueOf()) / axisLen;
    } else {
        return 99999999;
    }
};


/**
 * 格式化时间
 */
function format_axis_label_gcx(minTime, maxTime) {
    var res = "DD日HH时";

    if (minTime != "" && maxTime != "") {
        //10天内显示：日时；1个月内显示：月日；大于一年显示：年月日
        if (moment(maxTime).diff(moment(minTime), "years", true) >= 1) {
            res = "YYYY-MM-DD";
        } else if (moment(maxTime).diff(moment(minTime), "months", true) >= 1) {
            res = "MM月DD日";
        } else {
            res = "DD日HH时";
        }
    }

    return res;
};


/**
 * 显示窗口
 */
function show_report_gcx(t_range, _stcd, _stime, _etime, _userId, _stnm, _sttp, t_day, t_plan, _dd_yb_type) {
    if (_dd_yb_type == undefined)
        _dd_yb_type = 1;


    dd_yb_type = _dd_yb_type;
    if (dd_yb_type == 2)
    {
        $("#span_loading").html("获取获取单站预报情景对比信息中...");
        $(".loading-layer").show();
        $(".gxc-bj-title").html(_stnm + "过程线分析比较");

        var searchStime = $("#beginTime").val() + ":00";
        var searchEtime = $("#endTime").val() + ":00";
        var searchPlan = $("#selectPlan").val();
       // var selectModes = getModel();
              //实时预报演算
        var objData = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: selectModes,
           // modelID:GetGcxForecastDbfx_pModeID,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: Number(searchPlan),
            range: Number(searchRange),
            startTime: searchStime,
            stcd: "50101100"
        };

        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl + "Forecast/GetGcxForecastDbfx",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success: function (data) {
                var json = data.data;
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error("获取单站预报情景对比信息失败!");
                }
                else {
                    tools.loadinghide(false);
                    initShow();
                    create_bj_gcx_chart(json, _sttp, _stnm);
                    add_click_report_chartGcx();
                //    getBjTableData(_stcd, _stime, _etime, _userId, t_day);
                    $("#panel_BJ_Gcx").show();
                    tools.showPanelIndex("panel_BJ_Gcx");
                    console.log("panel_BJ_Gcx");
                    setGXCReportSize("panel_BJ_Gcx", default_width_report, default_height_report);
                    $("#tableid_bj").find('th').each(function (i) {
                        $(this).css('width', $('#bjTable').find('th:eq(' + i + ')').width() + 1);
                    });
                    return;
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取单站预报情景对比信息失败!");

            }
        })
    }
    else if (dd_yb_type == 1) {
       // var selectModes = getModel();
            var objData = null;
        var url = "";
        if (_sttp == "XX" || _sttp == "DD") {
            objData = {
                hisStormId: _hisStormId,
                plusType: _plusType,
                rainPlus: _rainPlus,
                etime: _etime,
                day: Number(t_day),
                func: 0,
                plan: Number(t_plan),
                range: t_range,
                stime: _stime,
                stcd: _stcd
            };
            url = apiUrl_cbh + "get_XXHQ_DiffGcx";
        }
        else {
            objData = {
                adjust: 1,
                endTime: _etime,
                foreDays: Number(t_day),
                hisStormId: _hisStormId,
                model: selectModes,
                plusType: _plusType,
                rainPlus: _rainPlus,
                plan: Number(t_plan),
                range: t_range,
                startTime: _stime,
                stcd: _stcd
            };
            url = apiUrl + "SchedulePlan/GetGcxDisPatchDbfx";
        }
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'json',
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: url,
            data: info,
           
            success: function (data) {
                var res = data;

                if (res == "" || res == null) {
                    tools.show_message_error("获取调度方案过程线对比信息失败！");
                    return;
                }

                var json = null;
                if (_sttp == "XX" || _sttp == "DD") {
                    json = res;
             
                }

                else {
                    json = res.data;
               
                }
                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                } else {
                    tools.loadinghide(false);
                    initShow();
                    if (_sttp == "XX" || _sttp == "DD") {
                        
                        create_bj_gcx_chart_xxhq(json, _sttp, _stnm);
                    }
                  
                    else {
                     
                        create_bj_gcx_chart(json, _sttp, _stnm);
                    }
                     
                    add_click_report_chartGcx();
                    getBjTableData(_stcd, _stime, _etime, _userId, t_day);
                    $("#panel_BJ_Gcx").show();
                    tools.showPanelIndex("panel_BJ_Gcx");
                    console.log("panel_BJ_Gcx");
                    setGXCReportSize("panel_BJ_Gcx", default_width_report, default_height_report);
                    $("#tableid_bj").find('th').each(function (i) {
                        $(this).css('width', $('#bjTable').find('th:eq(' + i + ')').width() + 1);
                    });
                    return;
                }
            },
            error: function (errorMsg) {

                tools.show_message_error("获取调度方案过程线对比信息失败");
            }

        });
    }
 
}

/**
 * 获取过程线比对信息
 */
function getBjTableData(_stcd, _stime, _etime, _userId, _day) {
    var objData = {
        stime: searchStime,
        stcd: _stcd,
        range: searchRange,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        func: null,
        etime: searchEtime,
        day: selectDays
    };


    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cbh + "get_SingleStcdScheMaxZQ",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (data) {
            if (data  == null || data  == "") {
                tools.loadinghide(false);
                tools.show_message_error("获取表格信息失败!");
                return;
            }

            var json = data;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                create_bj_table(json);
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

/**
 * 创建表格
 */
function create_bj_table(json) {

    var thData = json.dataname;
    var tdData = json.data;

    var html_th = new StringBuffer();
    var html_td = new StringBuffer();

    for (var i = 0; i < thData.length; i++) {
        if (i == 0) {
            html_th += "<tr><th>" + thData[i] + "</th>";
        } else {
            if (i == thData.length - 1) {
                html_th += "<th>" + thData[i] + "</th></tr>";
            }
            else {
                html_th += "<th>" + thData[i] + "</th>";
            }
        }
    }
    for (var i = 0; i < tdData.length; i++) {
        for (var j = 0; j < tdData[i].length; j++) {
            if (j == 0) {
                html_td += "<tr><td>" + tdData[i][j] + "</td>";
            } else {
                if (j == tdData[i].length - 1) {
                    html_td += "<td>" + tdData[i][j] + "</td></tr>"
                }
                else {
                    html_td += "<td>" + tdData[i][j] + "</td>"
                }
            }
        }
    }

    $("#bjTable thead").html("");
    $("#bjTable tbody").html("");
    $("#bjTable thead").append(html_th.toString());
    $("#bjTable tbody").append(html_td.toString());
    // 滑动滚动条固定表头
    bjTableHeader();
}
function bjTableHeader() {
    if ($("#tableid_bj").length > 0) {
        $("#tableid_bj").remove();
    }
    $("#bjTable").parent().prepend(
        '<table id="tableid_bj" class="table" ><thead>' + $("#bjTable thead").html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow-y': 'auto',
        'height': '142px'
    })
   
    $("#tableid_bj").css({
        'position': 'absolute',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#bjTable").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data-bj').scroll(function () {
        if ($('.tjfx-table-data-bj').scrollTop() > 0) {
            $("#tableid_bj").css('top', $('.tjfx-table-data-bj').scrollTop());
        } else {
            $("#tableid_bj").css('top', 0);
        }
    });
}
