/**
 * 面板配置文件
 */
var historyFloodConfig = {
    //面板默认宽度
    panel_default_width: 1200,
    //面板默认高度
    panel_default_height: 800,
    //带预报统计时底部高度
    panel_default_height2: 460,
    //预报统计表格高度
    table_height_yb: 240,
    MIN_NUM: -99999,
    MAX_NUM: 99999,
    //最小值百分比
    MIN_DEPART: 0.2,
    //最大值百分比
    MAX_DEPART: 0.2,

    //***************默认天数相关*********************//
    //河道过程线默认前推天数
    days_forward_zz: -7,
    //闸坝过程线默认前推天数
    days_forward_dd: -7,
    //水库过程线默认前推天数
    days_forward_rr: -7,
    //河道预报默认后推天数
    days_push_zz: 4,

    //***************颜色相关参数*********************//
    //图表背景色
    ECHART_COLOR_BACKGROUND: "#FFFFFF",
    //X轴
    ECHART_COLOR_AXIS_X: "#838486",
    //水位
    ECHART_COLOR_SW: "#000000",
    //当前水位
    ECHART_COLOR_SW_SS: "#0F347B",
    //调度水位
    ECHART_COLOR_SW_DD: "#2F4554",
    //多年同期-水位
    ECHART_COLOR_SW_DNTQ: "#000000",
    //闸下水位
    ECHART_COLOR_ZXSW: "#184994",
    //流量
    ECHART_COLOR_LL: "#FF0000",
    //当前流量
    ECHART_COLOR_LL_SS: "#1E9BD1",
    //流量
    ECHART_COLOR_LL_DD: "#008000",
    //引水流量
    ECHART_COLOR_YSLL: "#B99388",
    //多年同期-流量
    ECHART_COLOR_LL_DNTQ: "#FF00FF",
    //蓄量
    ECHART_COLOR_XL: "#039C93",
    //警戒水位
    ECHART_COLOR_JJSW: "#0000FF",
    //保证水位
    ECHART_COLOR_BZSW: "#FF0000",
    //汛限水位
    ECHART_COLOR_XXSW: "#0000FF",
    //校核水位
    ECHART_COLOR_JHSW: "#FF00FF",
    //雨量
    ECHART_COLOR_RAIN: "#6ECAFF",
    //累计雨量
    ECHART_COLOR_RAIN_SUM: "#0000FF",
    //雨量-文本颜色
    ECHART_COLOR_RAIN_OUT: "#FF0000",
    //雨量柱子
    ECHART_COLOR_RAIN_BAR: "#6ECAFF",
    //设计水位
    ECHART_COLOR_SJSW: "#FF0000",
    //死水位
    ECHART_COLOR_SSW: "#000000",
    //阴影颜色
    ECHART_COLOR_SHADOW: "#888A8D",
    //网格线颜色
    ECHART_COLOR_GRID: "#DDDDDD",
    //雨量
    ECHART_COLOR_RAIN: "#6ECAFF",
    //雨量柱子
    ECHART_COLOR_RAIN_BAR: "#A8DFFF",
    //调度对比水位
    ECHART_COLOR_DDSW: "#0000FF",
    //调度对比流量
    ECHART_COLOR_DDLL: "#008000",

};

/**
 * Tools_HistoryFlood类-用于展示相似洪水面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2020-04-13新增
 */
var Tools_HistoryFlood = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_HistoryFlood.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelXshs",
    //展示类型 1实况 2预报 3调度方案对比
    show_type: "1",
    //展示全部还是单站
    show_all: true,
    //展示面板的站码
    show_stcd: "",
    //展示面板的站名
    show_stnm: "",
    //展示面板的站类
    show_sttp: "",
    //展示面板的开始时间
    show_btime: "",
    //展示面板的结束时间
    show_etime: "",
    //展示的方案ID
    planId_dd: "",
    //面板实际宽度
    panel_actual_width: 0,
    //面板实际高度
    panel_actual_height: 0,
    //上次调用面板时间
    call_time: null,
    //echarts实例-过程线
    chartGcx: null,
    //echarts实例-断面信息
    chartDm: null,
    //预报特征统计表 标志(避免多次点击站点重复查询)
    ybTj_Flag: "",
    //预报特征统计表 数据
    ybTj_Data: "",
    //调度后统计表
    ddTj_Flag: "",
    //调度后统计表 数据
    ddTj_Data: "",

    //////基本信息使用参数//////
    //是否初始化
    is_show_jbxx: false,

    is_modify: false,



    //////水位过程线使用参数//////
    //是否初始化
    is_show_gcx: false,
    //极值水位（警戒、保证、汛限）
    obj_fcch_gcx: null,
    //极大极小数据
    obj_minMax_gcx: null,
    //实况数据极大极小数据
    obj_minMax_gcx_ss:null,
    //数据源
    obj_data_gcx: null,
 
    //洪水极大极小数据
    obj_minMax_gcx_hs: null,
    //时间点
    obj_data_gcx_tm: null,
    //洪水名
    floodname:"",

    js_data: new Array(),
    sw_data: new Array(),
    ll_data: new Array(),

    //洪水批次
    batch: "1",
    //当前洪水批次
    //current_batch: "",
    //总洪水数量
    floodNumber: 0,
    //总批次
    batchNumber:0,

    //数据源备份
    obj_data_gcx_bk_move: null,
    //备份y轴数据
    obj_data_gcx_y_his_value: null,

    //修改的数据，水位流量
    obj_data_gcx_y_modifyIndex: null,

    //修改的index
    obj_data_gcx_y_modifyIndex_all: null,

    //多站数据
    arr_data: new Array(),
    //是否被选中
    is_checked: false,


    //////降雨信息使用参数//////
    //是否初始化
    is_show_jyxx: false,
    //数据源-日雨量
    arr_ryl_data: new Array(),
    //数据源-日雨量累计
    arr_ryl_sum: new Array(),
    //数据源-时段雨量
    arr_sdyl_data: new Array(),
    //数据源-时段雨量累计
    arr_sdyl_sum: new Array(),


    obj_yb_graphic_his: null,
 
    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        if (historyFloodConfig.panel_default_height > $(document).height()) {
            historyFloodConfig.panel_default_height = $(document).height();
        }
        that.setPanelSize(historyFloodConfig.panel_default_width, historyFloodConfig.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Xshs")[0]);
        that.chartGcx.on('datarangeselected', function () {
            console.log("updateChartGcxGraphic");
           // that.updateChartGcxGraphic();
        });
        //面板可拖动处理
        $(this.parentId).find(".panel-header").myDrag({
            dragEnd: function (x, y) {
                var marTop = Number($(that.parentId).css("margin-top").replace('px', ''));
                if ((y + marTop) < 0) {
                    $(that.parentId).css("top", -marTop);
                }
            }
        });

        /**
         * 面板点击事件-保证当前操作的在最上层
         **/
        $(that.parentId).click(function (event) {
            if ($(event.target).hasClass("icon-close"))
                return;

            tools.showPanelIndex($(this).attr("id"));
        });

        /**
         * 最大化按钮
         **/
        $(that.parentId).find('.icon-max').click(function () {
            if ($(this).attr("data-type") == "max") {
                $(that.parentId).css({
                    "top": "50%",
                    "left": "50%",
                    "margin-left": "-" + historyFloodConfig.panel_default_width / 2 + "px",
                    //"margin-top": "-" + (that.show_type == "1" ? historyFloodConfig.panel_default_height : historyFloodConfig.panel_default_height2 + historyFloodConfig.table_height_yb) / 2 + "px"
                    "margin-top": "-" + historyFloodConfig.panel_default_height / 2 + "px"
                });
                that.panel_actual_width = historyFloodConfig.panel_default_width;
                //that.panel_actual_height = that.show_type == "1" ? historyFloodConfig.panel_default_height : historyFloodConfig.panel_default_height2 + historyFloodConfig.table_height_yb;
                that.panel_actual_height = historyFloodConfig.panel_default_height
                //设置水情面板相关宽高
                that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
                $(this).attr("data-type", "");
            } else {
                $(that.parentId).css({
                    "top": "0px",
                    "left": "0px",
                    "margin-left": "0px",
                    "margin-top": "0px"
                });
                that.panel_actual_width = $(window).width();
                that.panel_actual_height = $(window).height();
                //设置水情面板相关宽高
                that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
                $(this).attr("data-type", "max");
            }
        
            that.reflashDragPoint(3);
        });

        /**
         * 模态框显示/隐藏事件
         **/
        $(that.parentId).find('.icon-close').click(function () {
            //参数初始化
            that.show_sttp = "";
            that.show_stcd = "";
            that.show_stnm = "";
            that.is_show_jbxx = false;
            that.is_show_gcx = false;
            that.is_show_jyxx = false;
            that.is_show_dmxx = false;
            that.is_show_lsjz = false;

            //echarts清空数据
            that.chartGcx.clear();

            $("#proLineBody-Xshs").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        //选择下拉按钮点击事件
        //$("#sel1-i").click(function () {
        //    var that = $(this);
        //    var block = that.parents(".sel1-top").next();
        //    // 点击i触发函数，判断类型
        //    if ($(this).hasClass("fa-chevron-right")) {
        //        $(this).removeClass("fa-chevron-right");
        //        $(this).addClass("fa-chevron-down")
        //        block.children("div").each(function () {
        //            $(this).removeClass("active")
        //        });
        //        block.slideDown();

        //    } else if ($(this).hasClass("fa-chevron-down")) {
        //        $(this).removeClass("fa-chevron-down");
        //        $(this).addClass("fa-chevron-right")
        //        block.slideUp()
        //    }
        //    block.children("div").on("click", function () {
        //        $(this).addClass("active");
        //        that.prev("span").html($(this).html())
        //        that.removeClass("fa-chevron-down");
        //        that.addClass("fa-chevron-right")
        //        block.slideUp()
        //    });
        //});

        //确认按钮点击事件
        //$("#xshsbtn").click(function () {
        //    var floodName = $(".sel1 .sel1-show span").html();
        //    that.changeData(floodName);

        //    //alert(floodName);
        //});

        //统计表点击事件
        $("#contProLine-Xshs .table_ybtj tbody").on("click", "tr", function () {
            var td = $(this).find("td");
            var floodName = td.eq(0).text();
            that.changeData(floodName);
        })

        //下一批次按钮点击事件
        $("#xshsbtnNex").click(function () {

            var next_batch = parseInt(that.batch) + 1;
            if (next_batch <= that.batchNumber) {
                that.batch = next_batch + "";
            } else {
                return;
            }

            //初始化参数
            that.obj_minMax_gcx = {
                js: { max: historyFloodConfig.MIN_NUM },
                sw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
                ll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
            };
            that.obj_minMax_gcx_ss = {
                sssw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
                ssll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM }
            }

            that.js_data = [];
            that.sw_data = [];
            that.ll_data = [];

            that.obj_data_gcx = {
                floodname: new Array(),
                js: new Array(),
                sw: new Array(),
                ll: new Array(),
                sssw: new Array(),
                ssll: new Array()
            };
            that.obj_data_gcx_bk_move = {
                sssw: new Array(),
                ssll: new Array()
            };

            var objData = {
                range: searchRange,
                stcd: that.show_stcd,
                batch: that.batch,
                userId: $("#_hid_userid").val()
            };
            var info = JSON.stringify(objData);

            //等待框
            tools.showChartLoading(that.chartGcx);
            //查询数据
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                url: that.ApiUrlPath + "/get_HistorFlood_Info",
                data: "{'info':'" + info + "'}",
                success: function (data) {
                    var res = data.d;
                    if (res == "" || res == null) {
                        //tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error("无历史洪水数据!");
                    }

                    var jsonFor = JSON.parse(res);
                    if (jsonFor.floodName == "" || jsonFor.floodName == null) {
                        tools.show_message_error("无历史洪水数据!");
                        return;
                    }
                    if (jsonFor.code == "0") {
                        tools.show_message_error(jsonFor.msg);
                        return;
                    } else {

                        that.creat_tj_table(jsonFor);

                        //查询当前水位流量数据
                        var stime = $("#beginTime").val() + ":00";
                        var etime = $("#endTime").val() + ":00";

                        $.ajax({
                            type: 'post',
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            url: that.ApiUrlPath + "/getSwGcx",
                            data: "{'stime':'" + stime + "','etime':'" + etime + "','stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','userId':'" + $("#_hid_userid").val() + "'}",
                            success: function (data) {
                                var res_real = data.d;
                                if (res_real == "" || res_real == null) {
                                    tools.hideChartLoading(that.chartGcx);
                                    tools.show_message_error("查询过程线(实时水情)失败!");
                                    return;
                                }
                                var json = JSON.parse(res_real);
                                if (json.code == "0") {
                                    tools.hideChartLoading(that.chartGcx);
                                    tools.show_message_error(json.msg);
                                    return;
                                } else {
                                    if (json.data != "" && json.data.length > 0) {
                                        //解析实况水位流量数据
                                        $.each(json.data, function (index, ssdata) {
                                            //if (ssdata = "" || ssdata.length == 0) {
                                            //    return true;
                                            //}
                                            //水位
                                            that.obj_data_gcx.sssw.push({ value: [index, ssdata.Z] });
                                           
                                            that.obj_minMax_gcx_ss.sssw.min = Math.min(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.min);
                                            that.obj_minMax_gcx_ss.sssw.max = Math.max(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.max);
                                            //流量
                                            if (ssdata.Q != "" && ssdata.Q != "0") {
                                                that.obj_data_gcx.ssll.push({ value: [index, ssdata.Q] });
                                              
                                                that.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.min);
                                                that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.max);
                                            }
                                            if (that.show_sttp == "RR") {
                                                //入库流量
                                                if (ssdata.Qin != "" && ssdata.Qin != "0") {
                                                    that.obj_data_gcx.ssll.push({ value: [index, ssdata.Qin] });
                                                    
                                                    hat.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.min);
                                                    that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.max);
                                                }
                                            }
                                        });
                                    };

                                    var html_floodName = "";
                                    var first_floodName;
                                    that.obj_data_gcx_bk_move.sssw = tools.copyArr(that.obj_data_gcx.sssw);
                                    that.obj_data_gcx_bk_move.ssll = tools.copyArr(that.obj_data_gcx.ssll);
                                    //解析数据
                                    $.each(jsonFor.floodData, function (index, item) {
                                        //that.floodname = index;
                                        that.obj_data_gcx.floodname.push(index);
                                        that.obj_data_gcx.js.push([item[0]]);
                                        that.obj_data_gcx.sw.push([item[1]]);
                                        that.obj_data_gcx.ll.push([item[2]]);

                                    });

                                    $.each(that.obj_data_gcx.floodname, function (index, item) {
                                        //默认显示第一个
                                        if (index == 0) {
                                            that.floodname = item;
                                        } else {
                                        }
                                    })

                                    //默认显示第一个数据
                                    $.each(that.obj_data_gcx.js[0][0], function (index, item) {
                                        that.js_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.js.max = Math.max(Number(item), that.obj_minMax_gcx.js.max);
                                    })
                                    $.each(that.obj_data_gcx.sw[0][0], function (index, item) {
                                        that.sw_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.sw.min = Math.min(Number(item), that.obj_minMax_gcx.sw.min, that.obj_minMax_gcx_ss.sssw.min);
                                        that.obj_minMax_gcx.sw.max = Math.max(Number(item), that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx_ss.sssw.max);
                                    })
                                    $.each(that.obj_data_gcx.ll[0][0], function (index, item) {
                                        that.ll_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(item), that.obj_minMax_gcx.ll.min, that.obj_minMax_gcx_ss.ssll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(item), that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx_ss.ssll.max);
                                    })

                                    //获取实时（计算）的最大、最小水位流量
                                    var tempSw = that.obj_minMax_gcx.sw.max;

                                    var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                                    var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                                    var axis_sw_min = arrSw[1];
                                    axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                                    var axis_sw_max = arrSw[0];
                                    var axis_ll_min = arrLl[1];
                                    axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                                    var axis_ll_max = arrLl[0];

                                    //初始化图表
                                    var option = {};

                                    option = that.get_option_gcx_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min);

                                    // 使用刚指定的配置项和数据显示图表。
                                    option = tools.initChartlegendIcon(option);
                                    that.add_click_gcx_comon();
                                    that.chartGcx.setOption(option, true);
                                    max_sw_time = null;
                                    max_ll_time = null;
                                    that.addmove(max_sw_time, max_ll_time);
                                    tools.hideChartLoading(that.chartGcx);
                                }
                            }
                        });
                    }
                },
                error: function (errorMsg) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(预报信息)失败!");
                }
            });

        });

        //上一批次按钮点击事件
        $("#xshsbtnPre").click(function () {

            var pre_batch = parseInt(that.batch) - 1;
            if (pre_batch > 0) {
                that.batch = pre_batch + "";
            } else {
                return;
            }
            //初始化参数
            that.obj_minMax_gcx = {
                js: { max: historyFloodConfig.MIN_NUM },
                sw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
                ll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
            };
            that.obj_minMax_gcx_ss = {
                sssw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
                ssll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM }
            }

            that.js_data = [];
            that.sw_data = [];
            that.ll_data = [];

            that.obj_data_gcx = {
                floodname: new Array(),
                js: new Array(),
                sw: new Array(),
                ll: new Array(),
                sssw: new Array(),
                ssll: new Array()
            };
            that.obj_data_gcx_bk_move = {
                sssw: new Array(),
                ssll: new Array()
            };
            var objData = {
                range: searchRange,
                stcd: that.show_stcd,
                batch: that.batch,
                userId: $("#_hid_userid").val()
            };
            var info = JSON.stringify(objData);

            //等待框
            tools.showChartLoading(that.chartGcx);
            //查询数据
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                url: that.ApiUrlPath + "/get_HistorFlood_Info",
                data: "{'info':'" + info + "'}",
                success: function (data) {
                    var res = data.d;
                    if (res == "" || res == null) {
                        //tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error("无历史洪水数据!");
                    }

                    var jsonFor = JSON.parse(res);
                    if (jsonFor.floodName == "" || jsonFor.floodName == null) {
                        tools.show_message_error("无历史洪水数据!");
                        return;
                    }
                    if (jsonFor.code == "0") {
                        tools.show_message_error(jsonFor.msg);
                        return;
                    } else {

                        that.creat_tj_table(jsonFor);

                        //查询当前水位流量数据
                        var stime = $("#beginTime").val() + ":00";
                        var etime = $("#endTime").val() + ":00";

                        $.ajax({
                            type: 'post',
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            url: that.ApiUrlPath + "/getSwGcx",
                            data: "{'stime':'" + stime + "','etime':'" + etime + "','stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','userId':'" + $("#_hid_userid").val() + "'}",
                            success: function (data) {
                                var res_real = data.d;
                                if (res_real == "" || res_real == null) {
                                    tools.hideChartLoading(that.chartGcx);
                                    tools.show_message_error("查询过程线(实时水情)失败!");
                                    return;
                                }
                                var json = JSON.parse(res_real);
                                if (json.code == "0") {
                                    tools.hideChartLoading(that.chartGcx);
                                    tools.show_message_error(json.msg);
                                    return;
                                } else {
                                    if (json.data != "" && json.data.length > 0) {
                                        //解析实况水位流量数据
                                        $.each(json.data, function (index, ssdata) {
                                            //if (ssdata = "" || ssdata.length == 0) {
                                            //    return true;
                                            //}
                                            //水位
                                            that.obj_data_gcx.sssw.push({ value: [index, ssdata.Z] });
                                             
                                            that.obj_minMax_gcx_ss.sssw.min = Math.min(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.min);
                                            that.obj_minMax_gcx_ss.sssw.max = Math.max(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.max);
                                            //流量
                                            if (ssdata.Q != "" && ssdata.Q != "0") {
                                                that.obj_data_gcx.ssll.push({ value: [index, ssdata.Q] });
                                                
                                                that.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.min);
                                                that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.max);
                                            }
                                            if (that.show_sttp == "RR") {
                                                //入库流量
                                                if (ssdata.Qin != "" && ssdata.Qin != "0") {
                                                    that.obj_data_gcx.ssll.push({ value: [index, ssdata.Qin] });
                                                  
                                                    that.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.min);
                                                    that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.max);
                                                }
                                            }
                                        });
                                    };

                                    that.obj_data_gcx_bk_move.sssw = tools.copyArr(that.obj_data_gcx.sssw);
                                    that.obj_data_gcx_bk_move.ssll = tools.copyArr(that.obj_data_gcx.ssll);

                                    var html_floodName = "";
                                    var first_floodName;

                                    //解析数据
                                    $.each(jsonFor.floodData, function (index, item) {
                                        //that.floodname = index;
                                        that.obj_data_gcx.floodname.push(index);
                                        that.obj_data_gcx.js.push([item[0]]);
                                        that.obj_data_gcx.sw.push([item[1]]);
                                        that.obj_data_gcx.ll.push([item[2]]);

                                    });

                                    $.each(that.obj_data_gcx.floodname, function (index, item) {
                                        //默认显示第一个
                                        if (index == 0) {
                                            that.floodname = item;
                                        } else {
                                        }
                                    })

                                    //默认显示第一个数据
                                    $.each(that.obj_data_gcx.js[0][0], function (index, item) {
                                        that.js_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.js.max = Math.max(Number(item), that.obj_minMax_gcx.js.max);
                                    })
                                    $.each(that.obj_data_gcx.sw[0][0], function (index, item) {
                                        that.sw_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.sw.min = Math.min(Number(item), that.obj_minMax_gcx.sw.min, that.obj_minMax_gcx_ss.sssw.min);
                                        that.obj_minMax_gcx.sw.max = Math.max(Number(item), that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx_ss.sssw.max);
                                    })
                                    $.each(that.obj_data_gcx.ll[0][0], function (index, item) {
                                        that.ll_data.push({ value: [index, item] });
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(item), that.obj_minMax_gcx.ll.min, that.obj_minMax_gcx_ss.ssll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(item), that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx_ss.ssll.max);
                                    })

                                    //获取实时（计算）的最大、最小水位流量
                                    var tempSw = that.obj_minMax_gcx.sw.max;

                                    var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                                    var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                                    var axis_sw_min = arrSw[1];
                                    axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                                    var axis_sw_max = arrSw[0];
                                    var axis_ll_min = arrLl[1];
                                    axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                                    var axis_ll_max = arrLl[0];

                                    //初始化图表
                                    var option = {};

                                    option = that.get_option_gcx_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min);

                                    // 使用刚指定的配置项和数据显示图表。
                                    option = tools.initChartlegendIcon(option);
                                    that.add_click_gcx_comon();
                                    that.chartGcx.setOption(option, true);
                                    max_sw_time = null;
                                    max_ll_time = null;
                                    that.addmove(max_sw_time, max_ll_time);
                                    tools.hideChartLoading(that.chartGcx);
                                }
                            }
                        });
                    }
                },
                error: function (errorMsg) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(预报信息)失败!");
                }
            });
        })
    },
 
   
    changeData: function (floodName) {
     //   alert("changeData");
        var that = this;
        //初始化参数
        var index_ = "";

        that.obj_minMax_gcx = {
            js: { max: historyFloodConfig.MIN_NUM },
            sw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
            ll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
        };

        that.js_data = [];
        that.sw_data = [];
        that.ll_data = [];

        $.each(that.obj_data_gcx.floodname, function (index, item) {
            if (item == floodName) {
                index_ = index;
            }
        });
        that.floodname = floodName;

        that.initSWandLL();


        max_sw_time = null;
        max_ll_time = null;
        //默认显示第一个数据
        $.each(that.obj_data_gcx.js[index_][0], function (index, item) {
            that.js_data.push({ value: [index, item] });
            that.obj_minMax_gcx.js.max = Math.max(Number(item), that.obj_minMax_gcx.js.max);
        })
        $.each(that.obj_data_gcx.sw[index_][0], function (index, item) {
            that.sw_data.push({ value: [index, item] });
            that.obj_minMax_gcx.sw.min = Math.min(Number(item), that.obj_minMax_gcx.sw.min, that.obj_minMax_gcx_ss.sssw.min);
            that.obj_minMax_gcx.sw.max = Math.max(Number(item), that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx_ss.sssw.max);
           // max_sw_time = ssdata.TM;
        })
        $.each(that.obj_data_gcx.ll[index_][0], function (index, item) {
            that.ll_data.push({ value: [index, item] });
            that.obj_minMax_gcx.ll.min = Math.min(Number(item), that.obj_minMax_gcx.ll.min, that.obj_minMax_gcx_ss.ssll.min);
            that.obj_minMax_gcx.ll.max = Math.max(Number(item), that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx_ss.ssll.max);
           // max_ll_time = ssdata.TM;
        })

        //获取实时（计算）的最大、最小水位流量
        var tempSw = that.obj_minMax_gcx.sw.max;

        var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
        var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
        var axis_sw_min = arrSw[1];
        axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
        var axis_sw_max = arrSw[0];
        var axis_ll_min = arrLl[1];
        axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
        var axis_ll_max = arrLl[0];

        //初始化图表
        var option = {};

        option = that.get_option_gcx_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min);

        // 使用刚指定的配置项和数据显示图表。
        option = tools.initChartlegendIcon(option);
        that.add_click_gcx_comon();
        that.chartGcx.setOption(option, true);

        //  alert("ASd");
        max_sw_time = null;
        max_ll_time = null;
         that.addmove(max_sw_time, max_ll_time);

    },
    initSWandLL:function()
    {
        
        var that = this;
        that.obj_data_gcx.sssw.length = 0;
        that.obj_data_gcx.ssll.length = 0;

        that.obj_data_gcx.sssw = tools.copyArr(that.obj_data_gcx_bk_move.sssw);
        that.obj_data_gcx.ssll = tools.copyArr(that.obj_data_gcx_bk_move.ssll);

 
    },
    
    /**
     * 展示面板
     * searchRange范围，_stcd站码,_stnm站名
     **/
    panelShow: function (searchRange,_stcd,_stnm,_sttp) {
        var that = this;
        
        //判断两次调用面板的时间间隔 避免快速点击产生的bug
        if (that.call_time == null) {
            that.call_time = new Date();
        } else {
            if ((new Date() - that.call_time) < 2000) {
                return;
            }
            that.call_time = new Date();
        }

        //判断当前面板是否显示
        if (!$(that.parentId).is(':hidden')) {
            that.panelHide();
            that.batch = "1";
        }
        tools.showPanelIndex(that.parentId.replace("#", ""));

        //统一站类
        //if (_sttp == "ZQ") {
        //    _sttp = "ZZ";
        //} else if (_sttp == "HP") {
        //    _sttp = "RR";
        //}
        that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        that.show_sttp = _sttp;
        //that.show_etime = _time;



        //展示面板
        $(that.parentId).show();

        that.panel_actual_width = historyFloodConfig.panel_default_width;
        that.panel_actual_height = historyFloodConfig.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        $("#treeMenuXshs").show();
        $("#proLineBody-Xshs").css("margin-top", 30);
        $(that.parentId).find(".panel-header").css({
            "text-align": "left"
        });
        $(that.parentId).find(".content-left").css({
            "margin-right": 0 + "px"
        });
       

        $(that.parentId).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + that.panel_actual_width / 2 + "px",
            "margin-top": "-" + that.panel_actual_height / 2 + "px"
        });
        
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);

        //根据站类显示不同的内容
        var _html_header = "";
        _html_header = searchRangeName + "各站点历史洪水曲线图";

        $(that.parentId).find(".modal-title").html(_html_header);

        that.echart_line_gcx_for(searchRange, _stcd,_stnm);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: historyFloodConfig.panel_default_height,
            minWidth: historyFloodConfig.panel_default_width,
            zIndex: 0,  //jquery-ui 默认拖拽z-index为90
            resize: null,
            start: null,
            stop: function (event, ob) {
                that.panel_actual_width = ob.size.width;
                that.panel_actual_height = ob.size.height
                //设置水情面板相关宽高
                that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
            }
        });
        
    },
    /**
    * 过程线图例点击事件(通用)
    **/
    add_click_gcx_comon: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartGcx.getOption(), state, params.name);
                that.chartGcx.setOption(option, true);
            }


        });

    },
    /**
     * 关闭面板
     **/
    panelHide: function () {
        var that = this;
        $(that.parentId).find('.icon-close').click();
    },
    /**
     * 水位流量过程线（预报）
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_for: function (searchRange, _stcd,_stnm) {
        var that = this;
        //var arr_data = new Array();


        //初始化参数

        var obj_data_floodName = new Array();

        that.obj_minMax_gcx = {
            js:{max:historyFloodConfig.MIN_NUM},
            sw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
            ll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM }
        };
        that.obj_minMax_gcx_ss = {
            sssw: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM },
            ssll: { min: historyFloodConfig.MAX_NUM, max: historyFloodConfig.MIN_NUM }
        }
        
        that.js_data = [];
        that.sw_data = [];
        that.ll_data = [];

        that.obj_yb_graphic_his = {
            arr_graphic: new Array(),
            sssw_count: 0,
            ssll_count: 0

        };
        that.obj_data_gcx_y_his_value = {
            sssw: new Array(),
            ssll: new Array(),
        };
        that.obj_data_gcx = {
            floodname: new Array(),
            js: new Array(),
            sw: new Array(),
            ll: new Array(),
            sssw: new Array(),
            ssll: new Array()
        };
        that.obj_data_gcx_bk_move = {
            sssw: new Array(),
            ssll: new Array()
        };
        var obj_data_gcx_single = {
            show_stcd: null,
            show_stnm: null,
            show_sttp: null,
        }
        var flood_batch = "";
        var objData = {
            range: searchRange,
            stcd: _stcd,
            batch: that.batch,
            userId: $("#_hid_userid").val()
        };
        var info = JSON.stringify(objData);

        //等待框
        tools.showChartLoading(that.chartGcx);



        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/get_HistorFlood_Info",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    //tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("无历史洪水数据!");
                }

                var jsonFor = JSON.parse(res);
                //总洪水数
                that.floodNumber = jsonFor.floodNumber;
                //总批次
                that.batchNumber = Math.ceil(that.floodNumber / 5);
                if (jsonFor.floodName == "" || jsonFor.floodName == null) {
                    tools.show_message_error("无历史洪水数据!");
                    return;
                }
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {

                    that.creat_tj_table(jsonFor);

                    //查询当前水位流量数据
                    var stime = $("#beginTime").val() + ":00";
                    var etime = $("#endTime").val() + ":00";

                    $.ajax({
                        type: 'post',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        url: that.ApiUrlPath + "/getSwGcx",
                        data: "{'stime':'" + stime + "','etime':'" + etime + "','stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','userId':'" + $("#_hid_userid").val() + "'}",
                        success: function (data) {
                            var res_real = data.d;
                            if (res_real == "" || res_real == null) {
                                tools.hideChartLoading(that.chartGcx);
                                tools.show_message_error("查询过程线(实时水情)失败!");
                                return;
                            }
                            var json = JSON.parse(res_real);
                            if (json.code == "0") {
                                tools.hideChartLoading(that.chartGcx);
                                tools.show_message_error(json.msg);
                                return;
                            } else {
                                if (json.data != "" && json.data.length > 0) {


                                   max_sw_time = null;
                                   max_ll_time = null;


                                    //解析实况水位流量数据
                                    $.each(json.data, function (index, ssdata) {
                                        //if (ssdata = "" || ssdata.length == 0) {
                                        //    return true;
                                        //}
                                        //水位
                                        that.obj_data_gcx.sssw.push({ value: [index, ssdata.Z] });
                                        
                                        that.obj_data_gcx_y_his_value.sssw.push(ssdata.Z);
                                        that.obj_minMax_gcx_ss.sssw.min = Math.min(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.min);
                                        that.obj_minMax_gcx_ss.sssw.max = Math.max(Number(ssdata.Z), that.obj_minMax_gcx_ss.sssw.max);
                                        max_sw_time = ssdata.TM;                                        
                                        //流量
                                        if (ssdata.Q != "" && ssdata.Q != "0") {
                                            max_ll_time = ssdata.TM;
                                            that.obj_data_gcx.ssll.push({ value: [index, ssdata.Q] });
                                            that.obj_data_gcx_y_his_value.ssll.push(ssdata.Q);
                                            that.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.min);
                                            that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Q), that.obj_minMax_gcx_ss.ssll.max);
                                       
                                        }
                                        if (that.show_sttp == "RR") {
                                            //入库流量
                                            if (ssdata.Qin != "" && ssdata.Qin != "0") {
                                                that.obj_data_gcx.ssll.push({ value: [index, ssdata.Qin] });
                                                 that.obj_minMax_gcx_ss.ssll.min = Math.min(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.min);
                                                that.obj_minMax_gcx_ss.ssll.max = Math.max(Number(ssdata.Qin), that.obj_minMax_gcx_ss.ssll.max);
                                            }
                                        }
                                    });
                                };



                                //解析历史洪水数据
                                $.each(jsonFor.floodName, function (index, item) {
                                    //提取洪水名
                                    obj_data_floodName.push(item);
                                });
                                //将洪水名写入选择框
                                //清空选择框内容
                                //$("#sel1-show-span").empty();
                                //$("#panelXshs .form-inline .sel1 .sel1-block div").remove();

                                var html_floodName = "";
                                var first_floodName;

                                that.obj_data_gcx_bk_move.sssw = tools.copyArr(that.obj_data_gcx.sssw);
                                that.obj_data_gcx_bk_move.ssll = tools.copyArr(that.obj_data_gcx.ssll);


                                //$.each(obj_data_floodName, function (index, item) {
                                //    //默认显示第一个
                                //    if (index == 0) {
                                //        html_floodName += "<div class='active'>" + item + "</div>";
                                //        first_floodName = item;
                                //    } else {
                                //        html_floodName += "<div>" + item + "</div>"
                                //    }
                                //})
                                //$("#panelXshs .form-inline .sel1-top .sel1-show span").append(first_floodName);
                                //$("#panelXshs .form-inline .sel1 .sel1-block").append(html_floodName);

                                //解析数据
                                $.each(jsonFor.floodData, function (index, item) {
                                    //that.floodname = index;
                                    that.obj_data_gcx.floodname.push(index);
                                    that.obj_data_gcx.js.push([item[0]]);
                                    that.obj_data_gcx.sw.push([item[1]]);
                                    that.obj_data_gcx.ll.push([item[2]]);

                                });

                                $.each(that.obj_data_gcx.floodname, function (index, item) {
                                    //默认显示第一个
                                    if (index == 0) {
                                        that.floodname = item;
                                        //html_floodName += "<div class='active'>" + item + "</div>";
                                        //first_floodName = item;
                                    } else {
                                        //html_floodName += "<div>" + item + "</div>"
                                    }
                                })
                                //$("#panelXshs .form-inline .sel1-top .sel1-show span").append(first_floodName);
                                //$("#panelXshs .form-inline .sel1 .sel1-block").append(html_floodName);

                                //默认显示第一个数据
                                $.each(that.obj_data_gcx.js[0][0], function (index, item) {
                                    that.js_data.push({ value: [index, item] });
                                    that.obj_minMax_gcx.js.max = Math.max(Number(item), that.obj_minMax_gcx.js.max);
                                })
                                $.each(that.obj_data_gcx.sw[0][0], function (index, item) {
                                    that.sw_data.push({ value: [index, item] });
                                    that.obj_minMax_gcx.sw.min = Math.min(Number(item), that.obj_minMax_gcx.sw.min, that.obj_minMax_gcx_ss.sssw.min);
                                    that.obj_minMax_gcx.sw.max = Math.max(Number(item), that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx_ss.sssw.max);
                                })
                                $.each(that.obj_data_gcx.ll[0][0], function (index, item) {
                                    that.ll_data.push({ value: [index, item] });
                                    that.obj_minMax_gcx.ll.min = Math.min(Number(item), that.obj_minMax_gcx.ll.min, that.obj_minMax_gcx_ss.ssll.min);
                                    that.obj_minMax_gcx.ll.max = Math.max(Number(item), that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx_ss.ssll.max);
                                })


                                //获取实时（计算）的最大、最小水位流量
                                var tempSw = that.obj_minMax_gcx.sw.max;

                                var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                                var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                                var axis_sw_min = arrSw[1];
                                axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                                var axis_sw_max = arrSw[0];
                                var axis_ll_min = arrLl[1];
                                axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                                var axis_ll_max = arrLl[0];

                                //初始化图表
                                var option = {};

                                option = that.get_option_gcx_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min);

                                // 使用刚指定的配置项和数据显示图表。
                                option = tools.initChartlegendIcon(option);
                                that.add_click_gcx_comon();
                                that.chartGcx.setOption(option, true);

                                that.addmove(max_sw_time, max_ll_time);
                      
                                tools.hideChartLoading(that.chartGcx);
                            }
                        }
                    });

                    
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },
    addmove: function (max_sw_time, max_ll_time)
    {
        var that = this;
        that.obj_yb_graphic_his.arr_graphic.length = 0;
        that.obj_yb_graphic_his.sssw_count = 0;
        that.obj_yb_graphic_his.ssll_count = 0;
        $.each(that.obj_data_gcx.sssw, function (dataIndex, item) {
            that.obj_yb_graphic_his.arr_graphic.push(
                {
                    type: 'circle',
                    position: that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, item.value),
                    shape: {
                        r: 4
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: echarts.util.curry(that.onSWPointDragging, dataIndex, that, max_sw_time),
                    ondragend: echarts.util.curry(that.onSWPointDragend, dataIndex, that),
                    z: 100
                });
        });
        that.obj_yb_graphic_his.sssw_count = that.obj_data_gcx.sssw.length;

        $.each(that.obj_data_gcx.ssll, function (dataIndex, item) {
            that.obj_yb_graphic_his.arr_graphic.push(
                {
                    type: 'circle',
                    position: that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 1 }, item.value),
                    shape: {
                        r: 4
                    },
                    style: {
                        fill: '#ff0000',
                    },

                    invisible: true,
                    draggable: true,
                    ondrag: echarts.util.curry(that.onLLPointDragging, dataIndex, that, max_ll_time),
                    ondragend: echarts.util.curry(that.onLLPointDragend, dataIndex, that),
                    z: 100
                });
        });
        that.obj_yb_graphic_his.ssll_count = that.obj_data_gcx.ssll.length;

        that.update_sssw_option();
        that.update_ssll_option();
        that.reflashDragPoint(3);
        that.updateChartGcxGraphic();
    },
    updateChartGcxGraphic: function () {
        var that = this;
        that.chartGcx.setOption({
            graphic: that.obj_yb_graphic_his.arr_graphic,

        });
    },
 onSWPointDragging: function (dataIndex, that, max_sw_time, dx, dy) {
   
        var newpos = that.chartGcx.convertFromPixel({ xAxisIndex: 0, yAxisIndex: 0 }, this.position);
        x = newpos[0].toFixed(2);
        y = newpos[1].toFixed(2);
        old_x=parseFloat(that.obj_data_gcx.sssw[dataIndex].value[0]).toFixed(2);
        old_y=parseFloat(that.obj_data_gcx.sssw[dataIndex].value[1]).toFixed(2);
        move_x = parseInt(x - old_x) ;
        move_y=(y-old_y).toFixed(2); 
       
 
 
         for(var ii=0;ii<that.obj_data_gcx.sssw.length;ii++)
         {
             var temp_x = parseInt(that.obj_data_gcx.sssw[ii].value[0]) + move_x;
           //  console.log("pre/" + that.obj_data_gcx.sssw[ii].value[1]);
             var xxxx = parseFloat(that.obj_data_gcx.sssw[ii].value[1]).toFixed(2);
             var xxxx22 = parseFloat(xxxx)+ parseFloat(move_y);
             var temp_y = parseFloat(xxxx22).toFixed(2);
             
             that.obj_data_gcx.sssw[ii].value[0] = temp_x;
             that.obj_data_gcx.sssw[ii].value[1] = temp_y;
 
             var xxxx_y = parseFloat(that.obj_data_gcx_y_his_value.sssw[ii]).toFixed(2);
             var xxxx22_y = parseFloat(xxxx_y) + parseFloat(move_y);
             var temp_y_y = parseFloat(xxxx22_y).toFixed(2);
             that.obj_data_gcx_y_his_value.sssw[ii] = temp_y_y;

        }
         if (that.obj_data_gcx_bk_move.sssw.length > 0) {
             console.log(that.obj_data_gcx_bk_move.sssw[0].value[0] + "/" + that.obj_data_gcx_bk_move.sssw[0].value[1]);
         }
 
         that.chartGcx.setOption({
            series: [{
                id: 'id_series_dqsw',
                data: that.obj_data_gcx.sssw
            }]
        }
        ); 
         that.update_sssw_option();
         that.reflashDragPoint(3);



    },
reflashDragPoint: function (type) {
        var that = this;
        if (type == 1) {
                $.each(that.obj_data_gcx.sssw, function (index, value) {
                    that.obj_yb_graphic_his.arr_graphic[index].position = that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, that.obj_data_gcx.sssw[index].value);
                });
            }
            if (type == 2) {
               $.each(that.obj_data_gcx.ssll, function (index, value) {
                        that.obj_yb_graphic_his.arr_graphic[that.obj_data_gcx.sssw.length + index].position = that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 1 }, that.obj_data_gcx.ssll[index].value);
                    });
            }
            if (type == 3) {
                $.each(that.obj_data_gcx.sssw, function (index, value) {
                    that.obj_yb_graphic_his.arr_graphic[index].position = that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, that.obj_data_gcx.sssw[index].value);
                });
                $.each(that.obj_data_gcx.ssll, function (index, value) {
                    that.obj_yb_graphic_his.arr_graphic[that.obj_data_gcx.sssw.length + index].position = that.chartGcx.convertToPixel({ xAxisIndex: 0, yAxisIndex: 1 }, that.obj_data_gcx.ssll[index].value);
                });
            }
        that.updateChartGcxGraphic();       
    },
onSWPointDragend: function (dataIndex, that, dx, dy) {
        
    if(that.obj_data_gcx_bk_move.sssw.length>0)
    {
        console.log("onSWPointDragend:" + that.obj_data_gcx_bk_move.sssw[0].value[0] + "/" + that.obj_data_gcx_bk_move.sssw[0].value[1]);
    }
    },
update_sssw_option: function () {
        var that = this;
        var old_min = that.obj_minMax_gcx.sw.min;
        var old_max = that.obj_minMax_gcx.sw.max;
        var new_min = Math.min.apply(null, that.obj_data_gcx_y_his_value.sssw);
        var new_max = Math.max.apply(null, that.obj_data_gcx_y_his_value.sssw);
        that.obj_minMax_gcx.sw.min = Math.min(new_min, old_min);
        that.obj_minMax_gcx.sw.max = Math.max(new_max, old_max);

       // console.log(new_min + "/" + new_max);
        if ((old_min != that.obj_minMax_gcx.sw.min) || (old_max != that.obj_minMax_gcx.sw.max)) {
            var tempSw = that.obj_minMax_gcx.sw.max;
            var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
            that.chartGcx.setOption({
                yAxis: [{
                    id: "yAxis_sw",
                    min: arrSw[1] < 0 ? 0 : arrSw[1],
                    max: arrSw[0]
                }],

            });
        }
    },
    update_ssll_option: function () {
        var that = this;
        var old_min = that.obj_minMax_gcx.ll.min;
        var old_max = that.obj_minMax_gcx.ll.max;
        var new_min = Math.min.apply(null, that.obj_data_gcx_y_his_value.ssll);
        var new_max = Math.max.apply(null, that.obj_data_gcx_y_his_value.ssll);
        that.obj_minMax_gcx.ll.min = Math.min(new_min, old_min);
        that.obj_minMax_gcx.ll.max = Math.max(new_max, old_max);
        if ((old_min != that.obj_minMax_gcx.ll.min) || (old_max != that.obj_minMax_gcx.ll.max)) {
            var tempLl = that.obj_minMax_gcx.ll.max;
            var arrLl = that.get_ll_max_min(tempLl, that.obj_minMax_gcx.ll.min);
            that.chartGcx.setOption({
                yAxis: [{
                    id: "yAxis_ll",
                    min: arrLl[1] < 0 ? 0 : arrLl[1],
                    max: arrLl[0]
                }],

            });
        }
    },

    onLLPointDragging: function (dataIndex, that, max_ll_time, dx, dy) {
       
        var newpos = that.chartGcx.convertFromPixel({ xAxisIndex: 0, yAxisIndex: 1 }, this.position);
        x = newpos[0].toFixed(2);
        y = newpos[1].toFixed(2);
        old_x = parseFloat(that.obj_data_gcx.ssll[dataIndex].value[0]).toFixed(2);
        old_y = parseFloat(that.obj_data_gcx.ssll[dataIndex].value[1]).toFixed(2);
        move_x = parseInt(x - old_x);
        move_y = (y - old_y).toFixed(2);

      //  console.log(move_y);
        for (var ii = 0; ii < that.obj_data_gcx.ssll.length; ii++) {
            var temp_x = parseInt(that.obj_data_gcx.ssll[ii].value[0]) + move_x;
 
            var xxxx = parseFloat(that.obj_data_gcx.ssll[ii].value[1]).toFixed(2);
            var xxxx22 = parseFloat(xxxx) + parseFloat(move_y);
            var temp_y = parseFloat(xxxx22).toFixed(2);
            that.obj_data_gcx.ssll[ii].value[0] = temp_x;
            that.obj_data_gcx.ssll[ii].value[1] = temp_y;
            var xxxx_y = parseFloat(that.obj_data_gcx_y_his_value.ssll[ii]).toFixed(2);
            var xxxx22_y = parseFloat(xxxx_y) + parseFloat(move_y);
            var temp_y_y = parseFloat(xxxx22_y).toFixed(2);
            that.obj_data_gcx_y_his_value.ssll[ii] = temp_y_y;
        }


        that.chartGcx.setOption({
            series: [{
                id: 'id_series_dqll',
                data: that.obj_data_gcx.ssll
            }]
        }
        );
        that.update_ssll_option();
        that.reflashDragPoint(3);




    },
    onLLPointDragend: function (dataIndex, that, dx, dy) {
        

        //处理右侧table的数据的更新，思路，获取html内容，直接替换值，反过来，修改了table的值，则修改that.obj_data_gcx.sssw的值，且更新graphic的position

    },


    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize) {

        var that = this;
        $(this.parentId).width(width).height(height);

        //过程线
        $("#proLineBody-Xshs").css("margin-top", 0);
        $("#proLineBody-Xshs").width(width - 200 - 20).height(height - historyFloodConfig.table_height_yb - 40);
        $("#proLineBody-Xshs").children().width(width - 200 - 20).height(height - historyFloodConfig.table_height_yb - 40 - 20);
        $("#proLineBody-Xshs").children().children().width(width - 200 - 20).height(height - historyFloodConfig.table_height_yb - 40 - 20);

        if (isResize) {
            this.chartGcx.resize();
        }
    },

    /**
     * 过程线图例点击事件(预报)
     **/
    add_click_gcx_for: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if ((params.name == that.show_stnm + "预报入库流量") || (params.name == that.show_stnm + "预报流量")) {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];
            

                }
            }
            if (params.name == that.show_stnm + "预报水位") {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];

                }
            }
        });
    },
    /**
     * 实时获取水位最大/小值-水位过程线用
     **/
    get_axis_sw_max_min_gcx: function () {
        var that = this;
        var axis_sw_min_temp = historyFloodConfig.MAX_NUM;
        var axis_sw_max_temp = historyFloodConfig.MIN_NUM;
        var axis_sw_min = historyFloodConfig.MAX_NUM;
        var axis_sw_max = historyFloodConfig.MIN_NUM;

        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
            axis_sw_min_temp = that.obj_minMax_gcx.sw.min;
            axis_sw_max_temp = that.obj_minMax_gcx.sw.max;

            axis_sw_min_temp = Math.min(axis_sw_min_temp, that.obj_fcch_gcx.jjsw);
            axis_sw_max_temp = Math.max(axis_sw_max_temp, that.obj_fcch_gcx.jjsw);

            axis_sw_min_temp = Math.min(axis_sw_min_temp, that.obj_fcch_gcx.bzsw);
            axis_sw_max_temp = Math.max(axis_sw_max_temp, that.obj_fcch_gcx.bzsw);

        } else if (that.show_sttp == "RR") {
            axis_sw_min_temp = that.obj_minMax_gcx.sw.min;
            axis_sw_max_temp = that.obj_minMax_gcx.sw.max;

            axis_sw_min_temp = Math.min(axis_sw_min_temp, that.obj_fcch_gcx.xxsw);
            axis_sw_max_temp = Math.max(axis_sw_max_temp, that.obj_fcch_gcx.xxsw);
        }

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * historyFloodConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * historyFloodConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == historyFloodConfig.MAX_NUM) {
                axis_sw_min = 0;
                axis_sw_max = 1;
            } else {
                axis_sw_min = axis_sw_min_temp - 0.5;
                axis_sw_max = axis_sw_max_temp + 0.5;
            }
        }

        return new Array(axis_sw_max, axis_sw_min);
    },
    /**
     * 获取最大最小值（水位）
     **/
    get_sw_max_min: function (axis_sw_max_temp, axis_sw_min_temp) {
        var that = this;
        var axis_sw_min = historyFloodConfig.MAX_NUM;
        var axis_sw_max = historyFloodConfig.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * historyFloodConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * historyFloodConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == historyFloodConfig.MAX_NUM) {
                axis_sw_min = 0;
                axis_sw_max = 1;
            } else {
                axis_sw_min = axis_sw_min_temp - 0.5;
                axis_sw_max = axis_sw_max_temp + 0.5;
            }
        }

        return new Array(axis_sw_max, axis_sw_min);
    },
    /**
     * 获取最大最小值（流量）
     **/
    get_ll_max_min: function (axis_ll_max_temp, axis_ll_min_temp) {
        var that = this;
        var axis_ll_min = historyFloodConfig.MAX_NUM;
        var axis_ll_max = historyFloodConfig.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * historyFloodConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * historyFloodConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == historyFloodConfig.MAX_NUM) {
                axis_ll_min = 0;
                axis_ll_max = 1;
            } else {
                axis_ll_min = axis_ll_min_temp > 0 ? axis_ll_min_temp - 0.5 : 0;
                axis_ll_max = axis_ll_max_temp + 0.5;
            }
        }

        //水库最小流量>=0
        if (that.show_sttp == "RR") {
            return new Array(axis_ll_max, axis_ll_min < 0 ? 0 : axis_ll_min);
        } else {
            return new Array(axis_ll_max, axis_ll_min);
        }
    },

    /**
     * 实时获取流量最大/小值-水位过程线用
     **/
    get_axis_ll_max_min_gcx: function () {
        var that = this;
        var axis_ll_min_temp = historyFloodConfig.MAX_NUM;
        var axis_ll_max_temp = historyFloodConfig.MIN_NUM;
        var axis_ll_min = historyFloodConfig.MAX_NUM;
        var axis_ll_max = historyFloodConfig.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * historyFloodConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * historyFloodConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == historyFloodConfig.MAX_NUM) {
                axis_ll_min = 0;
                axis_ll_max = 1;
            } else {
                axis_ll_min = axis_ll_min_temp > 0 ? axis_ll_min_temp - 0.5 : 0;
                axis_ll_max = axis_ll_max_temp + 0.5;
            }
        }

        //水库最小流量>=0
        if (that.show_sttp == "RR") {
            return new Array(axis_ll_max, axis_ll_min < 0 ? 0 : axis_ll_min);
        } else {
            return new Array(axis_ll_max, axis_ll_min);
        }
    },  
    /**
     * 水位过程线参数
     **/
    get_option_gcx_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + that.floodname,
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
                data: ["雨量", "水位", "流量","当前水位","当前流量"],
                selected: {
                    "雨量": false,
                    //"水位": false,
                }
            },
            grid: {
                left: 5,
                top: 45,
                right: 5,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "value",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: historyFloodConfig.ECHART_COLOR_AXIS_X
                    }
                },
                maxInterval: 5,
                //minInterval: 1,
                //axisLabel: {
                //    color: "#000000"
                //    //formatter: function (value, index) {
                //    //    return moment(value).format(strFormatX);
                //    //}
                //},
                splitLine: {
                    show: false,
                    //lineStyle: {
                    //    color: [historyFloodConfig.ECHART_COLOR_GRID]
                    //}
                }
            },
            yAxis: [{
                id: "yAxis_sw",
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
                    lineStyle: {
                        color: historyFloodConfig.ECHART_COLOR_SW
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_sw(value);
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [historyFloodConfig.ECHART_COLOR_GRID]
                    }
                }
            }, {

                id: "yAxis_ll",
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
                        color: historyFloodConfig.ECHART_COLOR_LL
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
            }, {
                show: false,
                type: 'value',
                name: '雨量',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 0]
                },
                position: 'right',
                //offset: 0,
                nameLocation: 'start',
                inverse: true,
                min: 0,
                max: that.obj_minMax_gcx.js.max == historyFloodConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.js.max * 8),
                axisLine: {
                    lineStyle: {
                        color: historyFloodConfig.ECHART_COLOR_RAIN
                    }
                },
                //雨量Y轴暂时隐藏 改变属性show offset:50 axisLabel
                axisLabel: {
                    show: false,
                    inside: true
                },
                splitLine: {
                    show: false
                }
            }],
            tooltip: {
                trigger: "axis"
                //formatter: function (ob) {
                //    if (ob != null && ob.length > 0) {
                //        that.sl_time = ob[0].value[0];
                //        return tools.format_tooltip_chart(ob);
                //    } else {
                //        return "";
                //    }
                //}
            },
            series: [{
                name: '雨量',
                type: 'bar',
                yAxisIndex: 2,
                itemStyle: {
                    color: historyFloodConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: historyFloodConfig.ECHART_COLOR_SHADOW,
                    shadowBlur: 2
                },
                //barWidth: "95%",
                barMaxWidth: 13,
                data: that.js_data
            }, {
                name: '水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: historyFloodConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.sw_data
            }, {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: historyFloodConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.ll_data
            }, {
                id: 'id_series_dqsw',
                name: "当前水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
 
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: historyFloodConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.sssw
            }, {
                id: 'id_series_dqll',
                name: '当前流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                     color: historyFloodConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ssll
            }],
            backgroundColor: historyFloodConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },

    /**
     * 从数组中获取最大最小值
     **/
    get_min_max: function (arr) {
        var min = historyFloodConfig.MAX_NUM;
        var max = historyFloodConfig.MIN_NUM;
        if (arr == null || arr.length == 0) {
            return { min: min, max: max };
        }

        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i].value[1] == "")
                continue;

            if (Number(arr[i].value[1]) < min) {
                min = arr[i].value[1];
            }
            if (Number(arr[i].value[1]) > max) {
                max = arr[i].value[1];
            }
        }

        return { min: min, max: max };
    },

    /**
     * 创建统计表
     **/
    creat_tj_table: function (json) {
        var that = this;
        $("#contProLine-Xshs .table_ybtj thead tr").remove();
        $("#contProLine-Xshs .table_ybtj tbody tr").remove();

        $("#contProLine-Xshs .table_ybtj thead").append("<tr><th>洪号</th><th>时段长(h)</th><th>降雨起始日期</th><th>降雨历时(h)</th><th>总降水量</th><th>前期影响雨量</th><th>最高水位</th><th>洪量(百万方)</th><th>径流系数</th></tr>");
        var _html_body = "";
        $.each(json.statis, function (i, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {
                _html_body += "<td>" + item_inner + "</td>"
            });
            _html_body += "</tr>";
        });
        $("#contProLine-Xshs .table_ybtj tbody").append(_html_body);
    }
};
