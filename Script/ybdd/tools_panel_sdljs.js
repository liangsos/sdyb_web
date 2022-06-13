﻿/**
 * 面板配置文件
 */
var modifyValue_cl = false;
var panelConfig_sdljs = {
    //面板默认宽度
    panel_default_width: 1200,
    //面板默认高度
    panel_default_height: 550,
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
    //调度水位
    ECHART_COLOR_SW_DD: "#2F4554",
    //多年同期-水位
    ECHART_COLOR_SW_DNTQ: "#000000",
    //闸下水位
    ECHART_COLOR_ZXSW: "#184994",
    //流量
    ECHART_COLOR_LL: "#FF0000",
    //流量
    ECHART_COLOR_CKLL: "#008000",
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
    //断面
    ECHART_COLOR_DM: "#AAACB3",
    //断面-水位
    ECHART_COLOR_DM_SW: "#8ECEF5",
    //断面-闸下水位
    ECHART_COLOR_DM_ZXSW: "#CCCCFE",
    //断面边界线
    ECHART_COLOR_DM_LINE: "#B084BC",
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
    ECHART_COLOR_RAIN_BAR2: "#A8DFFF",
    //调度对比水位
    ECHART_COLOR_DDSW: "#0000FF",
    //调度对比流量
    ECHART_COLOR_DDLL: "#008000",
    //产流深
    ECHART_COLOR_CLS:"#FFA500",

};

/**
 * Tools_Panel_sdljs类-用于展示水动力学断面计算成果面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:
 */
var Tools_Panel_sdljs = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_sdljs.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelSdljs",
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
    //echarts实例-日雨量柱状图
    chartRyl: null,
    //echarts实例-时段雨量柱状图
    chartSdyl: null,
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

    //查询站点
    stcd_search: "",
    //查询开始时间
    stime_scarch: "",
    //查询结束时间
    etime_search: "",
    //查询时间段
    deftm_search: "",
    //查询的方法
    show_methodName: "",

    //////基本信息使用参数//////
    //是否初始化
    is_show_jbxx: false,

    //is_modify: false,



    //////水位过程线使用参数//////
    //是否初始化
    is_show_gcx: false,
    //极值水位（警戒、保证、汛限）
    obj_fcch_gcx: null,
    //极大极小数据
    obj_minMax_gcx: null,
    //数据源
    obj_data_gcx: null,

    //时间点
    obj_data_gcx_tm: null,

    //数据源备份
    obj_data_gcx_bk: null,
    //备份y轴数据
    obj_data_gcx_y_value: null,

    //修改的数据，水位流量
    obj_data_gcx_y_modifyIndex: null,

    //修改的index
    obj_data_gcx_y_modifyIndex_all: null,

    obj_yb_graphic: null,

    //option
    option: null,

    json_data:null,

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
      /*  if (panelConfig_sdljs.panel_default_height > $(document).height()) {
            panelConfig_sdljs.panel_default_height = $(document).height();
        }*/
        that.setPanelSize(panelConfig_sdljs.panel_default_width, panelConfig_sdljs.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Sdljs")[0]);
        
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
                    "margin-left": "-" + panelConfig_sdljs.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig_sdljs.panel_default_height : panelConfig_sdljs.panel_default_height2 + panelConfig_sdljs.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = panelConfig_sdljs.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig_sdljs.panel_default_height : panelConfig_sdljs.panel_default_height2 + panelConfig_sdljs.table_height_yb;
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
                console.log(that.panel_actual_height);
                //设置水情面板相关宽高
                that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
                $(this).attr("data-type", "max");
            }
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


            $("#proLineBody-Sdljs").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        /**
         * 过程线-表格缩放按钮
         **/
        $('#contProLine-Sdljs .icon-resize-left').click(function () {
            var marRight;
            var margin_right = parseInt($(this).parent().next().css("margin-right"));

            //右缩进
            if ($(this).hasClass("iconRight")) {
                if (margin_right <= 25)
                    return;

                if (margin_right == (that.panel_actual_width - 20)) {
                    if (that.show_type == "3") {
                        marRight = 575;
                    } else {
                        marRight = 425;
                    }
                } else {
                    marRight = 25;
                }
            } else {
                //左缩进
                if (margin_right >= (that.panel_actual_width - 20))
                    return;

                if (parseInt($(this).parent().next().css("margin-right")) == 25) {
                    if (that.show_type == "3") {
                        marRight = 575;
                    } else {
                        marRight = 425;
                    }
                } else {
                    marRight = (that.panel_actual_width - 20);
                }
            }
            if (marRight == 25) {
                $(this).parent().prev().hide();
                $("#proLineBody-Sdljs").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }

                $(this).parent().prev().width(0);
            } else if (marRight == (that.panel_actual_width - 20)) {
                $("#proLineBody-Sdljs").hide();
                $("#btn_ybsw-modify").hide();
                $("#btn_ybsw-save").hide();
                $(this).parent().prev().show();

                //最后的减2是边框的宽度
                $(this).parent().prev().width(marRight - 25 - 2); //2019-10-08 modify by chl 
            } else {
                $("#proLineBody-Sdljs").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }
                $(this).parent().prev().show();

                $(this).parent().prev().width(marRight - 25);
            }


            var w_right = $(this).parent().prev().width() + 2;
            $("#proLineBody-Sdljs").width(that.panel_actual_width - 20 - marRight); //2019-10-08 modify by chl 
            var w_left = $("#proLineBody-Sdljs").width();
            $("#contProLine-Sdljs").width(w_left + 25 + w_right); //2019-10-08 modify by chl 
            $(this).parent().next().animate({ "margin-right": marRight }, 500);



            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }

        });
        
    },
    /**
     * 展示面板
     * _stcd站码 _stnm站名 _stime开始时间 _etime结束时间
     **/
    panelShow: function (xh, selectDays, searchStime, searchEtime, model, searchPlan, rvcd, sjjg) {
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
        }
        tools.showPanelIndex(that.parentId.replace("#", ""));

        //展示面板
        $(that.parentId).show();
        
        that.panel_actual_width = panelConfig_sdljs.panel_default_width;
        that.panel_actual_height = panelConfig_sdljs.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        //$("#panelSdljs .form-inline").css({
        //    "float": "left",
        //    "margin-left": 200 + "px",
        //})

        $("#proLineBody-Sdljs").css("margin-top", 30);
        $("#contProLine-Sdljs .content-left").css("margin-right", 425);
        $("#contProLine-Sdljs .sidebar-right,#contProLine-Sdljs .sidebar-control-right").show();
        $("#contProLine-Sdljs .field_yb").show();
        $(that.parentId).find(".panel-header").css({
            "text-align": "left"
        });

        $(that.parentId).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + that.panel_actual_width / 2 + "px",
            "margin-top": "-" + that.panel_actual_height / 2 + "px"
        });

       
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

        var _html_header = "水动力学断面计算成果";
        $(that.parentId).find(".modal-title").html(_html_header);

        that.echart_line_gcx(xh, selectDays, searchStime, searchEtime, model, searchPlan, rvcd, sjjg);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_sdljs.panel_default_height,
            minWidth: panelConfig_sdljs.panel_default_width,
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
     * 关闭面板
     **/
    panelHide: function () {
        var that = this;
        $(that.parentId).find('.icon-close').click();
    },

    /**
     * 水动力学断面计算过程线
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx: function (xh, selectDays, searchStime, searchEtime, model, searchPlan, rvcd, sjjg) {
        var that = this;
        //初始化参数

        that.obj_minMax_gcx = {
            sw: { min: panelConfig_sdljs.MAX_NUM, max: panelConfig_sdljs.MIN_NUM },
            ll: { min: panelConfig_sdljs.MAX_NUM, max: panelConfig_sdljs.MIN_NUM }
        };
        that.obj_data_gcx = {
            sw: new Array(),
            ll: new Array()
        };
      
        var objData = {
            csid: xh,
            day: selectDays,
            etime: searchEtime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            model: model,
            modelid: getRadioModel(),
            plan: searchPlan,
            rvcd: rvcd,
            sjjg: sjjg,
            stime: searchStime,
            // userid: $("#_hid_userid").val()
        };
        var info = JSON.stringify(objData);

        //that.obj_data_gcx_tm = new Array();
        //等待框
        tools.showChartLoading(that.chartGcx);
        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-hwhydroinfo/get_hydracalSingleDmInfo",
            data: info,
            success: function (data) {
                var res = data;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询产流系数结果失败!");
                }

                var jsonFor = res.data;
                that.json_data = jsonFor.data;
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    //生成表格
                    that.create_table_sdljs(jsonFor);
                    
                    //生成过程线
                    that.create_gcx_sdljs(jsonFor);

                    
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },
    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize, isInit) {

        var that = this;
        $(this.parentId).width(width).height(height);

        //获取真实宽度
        var _width = width - 20;
        $("#contProLine-Sdljs").width(_width);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig_sdljs.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 200);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig_sdljs.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        }
        var isshowall = false;
        //过程线
        $("#proLineBody-Sdljs").width(_width - 425 - 2).height(_height - 45 + 33); //2019-10-8 modify by chl
        $("#contProLine-Sdljs .content-left").css("margin-right", 425);
        $("#contProLine-Sdljs .content-left").css("margin-top", 0);
        $("#contProLine-Sdljs .sidebar-right").width(400);

        $("#contProLine-Sdljs .table_ybtj").css({
            "table-layout": "fixed"
        });

        $("#contProLine-Sdljs .table_ybtj thead").css({
            "white-space": "nowrap"
        });

        $("#contProLine-Sdljs .tableSdljs").parent().height(_height - 48 + 33);
        $("#contProLine-Sdljs .ybsq-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });

        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine-Sdljs .content-left").show();
                $("#proLineBody-Sdljs").show();
                $("#contProLine-Sdljs .sidebar-right").show();
            }
            else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody-Sdljs").is(':visible');
                var v_right = $("#contProLine-Sdljs .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine-Sdljs .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine-Sdljs .content-left").show();
                }
                else if (v_left) {
                    $("#proLineBody-Sdljs").width(that.panel_actual_width - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Sdljs .content-left").css("margin-right", 25);
                    $("#contProLine-Sdljs .sidebar-right").width(0);
                }
                else if (v_right) {
                    $("#proLineBody-Sdljs").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Sdljs .content-left").css("margin-right", that.panel_actual_width - 20);

                    $("#contProLine-Sdljs .sidebar-right").width(that.panel_actual_width - 20 - 25 - 2);
                }

            }
        }

        if (isResize) {
            this.chartGcx.resize();
        }

    },

    /**
     * 生成表格-水动力学计算成果
     **/
    create_table_sdljs: function (json) {
        var that = this;
        //表头
        //先清空数据
        $("#contProLine-Sdljs .ybsq-table-header table colgroup col").remove();
        $("#contProLine-Sdljs .ybsq-table-header table thead tr").remove();
        $("#contProLine-Sdljs .tableSdljs colgroup col").remove();
        $("#contProLine-Sdljs .tableSdljs tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        _html_col += "<col style='width: 15%;' />";
        _html_col += "<col style='width: 36%;' />";
        _html_col += "<col style='width: 15%;' />";
        _html_col += "<col style='width: 15%;' />";
        _html_th = "<tr>"
        $.each(json.tablename, function (index, item) {
            _html_th += "<th>" + item + "</th>"
        })
        _html_th += "</tr>";

        $("#contProLine-Sdljs .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine-Sdljs .tableSdljs colgroup").append(_html_col);
        $("#contProLine-Sdljs .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";

        $.each(json.tablevalue, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {
                _html_body += "<td>" + item_inner + "</td>";
            });
            _html_body += "</tr>";
        });
        $("#contProLine-Sdljs .tableSdljs tbody").append(_html_body);
    },

    /**
     * 生成过程线-水动力计算
     **/
    create_gcx_sdljs: function (jsonFor) {
        var that = this;

        that.obj_data_gcx = {
            sw: new Array(),
            ll: new Array()
        };
        var hldata;
        //解析数据
        var sdljs_timeArr;
        var sdljs_swArr;
        var sdljs_llArr;

        $.each(jsonFor.tablevalue, function (index, item) {
            that.obj_data_gcx.sw.push({ value: [item[1], item[2]] });
            that.obj_minMax_gcx.sw.min = Math.min(Number(item[2]), that.obj_minMax_gcx.sw.min);
            that.obj_minMax_gcx.sw.max = Math.max(Number(item[2]), that.obj_minMax_gcx.sw.max);

            that.obj_data_gcx.ll.push({ value: [item[1], item[3]] });
            that.obj_minMax_gcx.ll.min = Math.min(Number(item[3]), that.obj_minMax_gcx.ll.min);
            that.obj_minMax_gcx.ll.max = Math.max(Number(item[3]), that.obj_minMax_gcx.ll.max);
        })
        

        var arrSw = that.get_sw_max_min(that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx.sw.min);
        var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);

        var axis_sw_min = arrSw[1];
        axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
        var axis_sw_max = arrSw[0];

        var axis_ll_min = arrLl[1];
        axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
        var axis_ll_max = arrLl[0];
        //获取时间轴刻度
        var _minTime = "";
        var _maxTime = "";
        if (jsonFor.tablevalue != null) {
            _minTime = jsonFor.tablevalue[0][1];
            _maxTime = jsonFor.tablevalue[jsonFor.tablevalue.length - 1][1];;
        }
        var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
        //获取时间轴格式化字符串
        var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

        //初始化图表
        that.option = {};
        that.option = that.get_option_gcx_sdljs(axis_sw_max,axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);


        // 使用刚指定的配置项和数据显示图表。
        that.option = tools.initChartlegendIcon(that.option);
        that.add_click_gcx_comon();
        that.chartGcx.setOption(that.option, true);
        tools.hideChartLoading(that.chartGcx);

        
        
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
     * 实时获取水位最大/小值-水位过程线用
     **/
    get_axis_sw_max_min_gcx: function () {
        var that = this;
        var axis_sw_min_temp = panelConfig_sdljs.MAX_NUM;
        var axis_sw_max_temp = panelConfig_sdljs.MIN_NUM;
        var axis_sw_min = panelConfig_sdljs.MAX_NUM;
        var axis_sw_max = panelConfig_sdljs.MIN_NUM;

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
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_sdljs.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_sdljs.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_sdljs.MAX_NUM) {
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
        var axis_sw_min = panelConfig_sdljs.MAX_NUM;
        var axis_sw_max = panelConfig_sdljs.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_sdljs.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_sdljs.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_sdljs.MAX_NUM) {
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
        var axis_ll_min = panelConfig_sdljs.MAX_NUM;
        var axis_ll_max = panelConfig_sdljs.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_sdljs.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_sdljs.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_sdljs.MAX_NUM) {
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
        var axis_ll_min_temp = panelConfig_sdljs.MAX_NUM;
        var axis_ll_max_temp = panelConfig_sdljs.MIN_NUM;
        var axis_ll_min = panelConfig_sdljs.MAX_NUM;
        var axis_ll_max = panelConfig_sdljs.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_sdljs.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_sdljs.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_sdljs.MAX_NUM) {
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
     * 获取时间轴刻度-水位过程线用
     **/
    get_axis_interval_gcx: function (minTime, maxTime) {
        var that = this;
        //获取时间轴最大最小差值
        if (minTime != "" && maxTime != "") {
            //获取echarts实例宽度
            var chartWidth = that.chartGcx.getWidth() - 80;
            var distance = 90;
            if (chartWidth <= 600) {
                distance = 90;
            } else if (chartWidth > 600 && chartWidth <= 1000) {
                distance = 120;
            } else {
                distance = 150;
            }
            var axisLen = parseInt(chartWidth / distance);
            return (moment(maxTime).valueOf() - moment(minTime).valueOf()) / axisLen;
        } else {
            return 99999999;
        }
    },
    /**
     * 格式化时间刻度值-水位过程线
     **/
    format_axis_label_gcx: function (minTime, maxTime) {
        var that = this;
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
    },

    /**
     * 水位过程线参数-水动力计算
     **/
    get_option_gcx_sdljs: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        that.option = {
            title: {
                text: "水动力学断面计算成果过程线",
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
                data: ["水位", "流量"],
                selected: {
                    "水位": true,
                    "出库流量": true,
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
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_sdljs.ECHART_COLOR_AXIS_X
                    }
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
                    lineStyle: {
                        color: [panelConfig_sdljs.ECHART_COLOR_GRID]
                    }
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
                    lineStyle: {
                        color: panelConfig_sdljs.ECHART_COLOR_SW
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
                        color: [panelConfig_sdljs.ECHART_COLOR_GRID]
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
                        color: panelConfig_sdljs.ECHART_COLOR_LL
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_ll(value);
                    }
                },
                splitLine: {
                    show: false,
                }
            }],
            tooltip: {
                trigger: "axis",
                formatter: function (ob) {
                    if (ob != null && ob.length > 0) {
                        that.sl_time = ob[0].value[0];
                        return tools.format_tooltip_chart(ob);
                    } else {
                        return "";
                    }
                }
            },
            series: [{
                name: '水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_sdljs.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sw
            }, {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_sdljs.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll
            }],
            backgroundColor: panelConfig_sdljs.ECHART_COLOR_BACKGROUND
        };
        that.option = tools.initChartlegendIcon(that.option);
        return that.option;
    },
    /**
     * 从数组中获取最大最小值
     **/
    get_min_max: function (arr) {
        var min = panelConfig_sdljs.MAX_NUM;
        var max = panelConfig_sdljs.MIN_NUM;
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
    }

};