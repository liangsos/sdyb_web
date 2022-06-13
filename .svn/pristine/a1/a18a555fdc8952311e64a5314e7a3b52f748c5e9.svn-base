/**
 * 面板配置文件
 */
var modifyValue_cl = false;
var panelConfig_sdldmxx = {
    //面板默认宽度
    panel_default_width: 1200,
    //面板默认高度
    panel_default_height: 645,
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
 * Tools_Panel_sdldmxx类-用于展示水动力学断面计算成果面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:
 */
var Tools_Panel_sdldmxx = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_sdldmxx.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelSdldmxx",
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
       /* if (panelConfig_sdldmxx.panel_default_height > $(document).height()) {
            panelConfig_sdldmxx.panel_default_height = $(document).height();
        }*/
        that.setPanelSize(panelConfig_sdldmxx.panel_default_width, panelConfig_sdldmxx.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#dmInfoBody-Sdldmxx")[0]);
        
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
                    "margin-left": "-" + panelConfig_sdldmxx.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig_sdldmxx.panel_default_height : panelConfig_sdldmxx.panel_default_height2 + panelConfig_sdldmxx.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = panelConfig_sdldmxx.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig_sdldmxx.panel_default_height : panelConfig_sdldmxx.panel_default_height2 + panelConfig_sdldmxx.table_height_yb;
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


            $("#dmInfoBody-Sdldmxx").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        /**
         * 过程线-表格缩放按钮
         **/
        $('#contProLine-Sdldmxx .icon-resize-left').click(function () {
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
                $("#dmInfoBody-Sdldmxx").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }

                $(this).parent().prev().width(0);
            } else if (marRight == (that.panel_actual_width - 20)) {
                $("#dmInfoBody-Sdldmxx").hide();
                $("#btn_ybsw-modify").hide();
                $("#btn_ybsw-save").hide();
                $(this).parent().prev().show();

                //最后的减2是边框的宽度
                $(this).parent().prev().width(marRight - 25 - 2); //2019-10-08 modify by chl 
            } else {
                $("#dmInfoBody-Sdldmxx").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }
                $(this).parent().prev().show();

                $(this).parent().prev().width(marRight - 25);
            }


            var w_right = $(this).parent().prev().width() + 2;
            $("#dmInfoBody-Sdldmxx").width(that.panel_actual_width - 20 - marRight); //2019-10-08 modify by chl 
            var w_left = $("#dmInfoBody-Sdldmxx").width();
            $("#contProLine-Sdldmxx").width(w_left + 25 + w_right); //2019-10-08 modify by chl 
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
    panelShow: function (csid) {
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
        
        that.panel_actual_width = panelConfig_sdldmxx.panel_default_width;
        that.panel_actual_height = panelConfig_sdldmxx.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        $("#dmInfoBody-Sdldmxx").css("margin-top", 30);
        $("#contProLine-Sdldmxx .content-left").css("margin-right", 425);
        $("#contProLine-Sdldmxx .sidebar-right,#contProLine-Sdldmxx .sidebar-control-right").show();
        $("#contProLine-Sdldmxx .field_yb").show();
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

        var _html_header = "大断面信息";
        $(that.parentId).find(".modal-title").html(_html_header);

        that.echart_line_gcx(csid);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_sdldmxx.panel_default_height,
            minWidth: panelConfig_sdldmxx.panel_default_width,
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
    echart_line_gcx: function (csid) {
        var that = this;
        //初始化参数

        that.obj_minMax_gcx = {
            sw: { min: panelConfig_sdldmxx.MAX_NUM, max: panelConfig_sdldmxx.MIN_NUM },
            ll: { min: panelConfig_sdldmxx.MAX_NUM, max: panelConfig_sdldmxx.MIN_NUM }
        };
        that.obj_data_gcx = {
            data: new Array(),
            sw: new Array(),
            ll: new Array()
        };

        var objData = {
            csid: csid,
            reacd: "HHMAIN01",
            rvcd: "HHMAIN"
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
            url: apiUrl_zyslx + "GetSectionInfo",
            data: info,
            success: function (data) {
                var res = data;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询大断面信息结果失败!");
                }

                var jsonFor = res.data;
                that.json_data = jsonFor.data;
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    //生成表格
                    that.create_table_sdldmxx(jsonFor);
                    
                    //生成过程线
                    that.create_gcx_sdldmxx(jsonFor);

                    that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);
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

        var tjTableHeight = $("#panelSdldmxx .field_yb").height();

        //获取真实宽度
        var _width = width - 20;
        $("#contProLine-Sdldmxx").width(_width);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig_sdldmxx.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 200);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig_sdldmxx.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        }
        var isshowall = false;
        //过程线
        $("#dmInfoBody-Sdldmxx").width(_width - 425 - 2).height(_height - tjTableHeight - 45 + 33); //2019-10-8 modify by chl
        $("#contProLine-Sdldmxx .content-left").css("margin-right", 425);
        $("#contProLine-Sdldmxx .content-left").css("margin-top", 0);
        $("#contProLine-Sdldmxx .sidebar-right").width(400);

        $("#contProLine-Sdldmxx .table_ybtj").css({
            "table-layout": "fixed"
        });

        $("#contProLine-Sdldmxx .table_ybtj thead").css({
            "white-space": "nowrap"
        });

        $("#contProLine-Sdldmxx .tableSdldmxx").parent().height(_height - tjTableHeight - 48 + 33);
        $("#contProLine-Sdldmxx .ybsq-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });

        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine-Sdldmxx .content-left").show();
                $("#dmInfoBody-Sdldmxx").show();
                $("#contProLine-Sdldmxx .sidebar-right").show();
            }
            else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#dmInfoBody-Sdldmxx").is(':visible');
                var v_right = $("#contProLine-Sdldmxx .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine-Sdldmxx .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine-Sdldmxx .content-left").show();
                }
                else if (v_left) {
                    $("#dmInfoBody-Sdldmxx").width(that.panel_actual_width - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Sdldmxx .content-left").css("margin-right", 25);
                    $("#contProLine-Sdldmxx .sidebar-right").width(0);
                }
                else if (v_right) {
                    $("#dmInfoBody-Sdldmxx").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Sdldmxx .content-left").css("margin-right", that.panel_actual_width - 20);

                    $("#contProLine-Sdldmxx .sidebar-right").width(that.panel_actual_width - 20 - 25 - 2);
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
    create_table_sdldmxx: function (json) {
        var that = this;
        //表头
        //先清空数据
        $("#contProLine-Sdldmxx .ybsq-table-header table colgroup col").remove();
        $("#contProLine-Sdldmxx .ybsq-table-header table thead tr").remove();
        $("#contProLine-Sdldmxx .tableSdldmxx colgroup col").remove();
        $("#contProLine-Sdldmxx .tableSdldmxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        _html_col += "<col style='width: 25%;' />";
        _html_col += "<col style='width: 25%;' />";
        _html_col += "<col style='width: 25%;' />";
        _html_col += "<col style='width: 25%;' />";
        _html_th = "<tr>"
        $.each(json.calculatetablenm, function (index, item) {
            _html_th += "<th>" + item + "</th>"
        })
        _html_th += "</tr>";

        $("#contProLine-Sdldmxx .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine-Sdldmxx .tableSdldmxx colgroup").append(_html_col);
        $("#contProLine-Sdldmxx .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";

        $.each(json.calculatetablevalue, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {
                _html_body += "<td>" + item_inner + "</td>";
            });
            _html_body += "</tr>";
        });
        $("#contProLine-Sdldmxx .tableSdldmxx tbody").append(_html_body);

        //统计信息
        try {
            $("#contProLine-Sdldmxx .table_ybtj thead tr").remove();
            $("#contProLine-Sdldmxx .table_ybtj tbody tr").remove();

            var _html_th_tj = "";
            _html_th_tj = "<tr>"
            $.each(json.basicinfotablenm, function (index, item) {
                _html_th_tj += "<th>" + item + "</th>"
            })
            _html_th_tj += "</tr>";
            $("#contProLine-Sdldmxx .table_ybtj thead").append(_html_th_tj);

            var _html_body_tj = "";
            _html_body_tj += "<tr>";
            var _class = "";
            _class += " style='white-space: normal;text-align:center'";
            $.each(json.basicinfotablevalue, function (i, item) {
                _html_body_tj += "<td" + _class + ">" + item + "</td>";
            });
            _html_body_tj += "</tr>";
            $("#contProLine-Sdldmxx .table_ybtj tbody").append(_html_body_tj);
        } catch (e) {

        }
    },

    /**
     * 生成过程线-水动力计算
     **/
    create_gcx_sdldmxx: function (jsonFor) {
        var that = this;

        that.obj_data_gcx = {
            data:new Array(),
            sw: new Array(),
            ll: new Array()
        };

        for (var i = 0; i < jsonFor.di.length; i++) {
            that.obj_data_gcx.data.push({ value: [jsonFor.di[i], Number(jsonFor.zb[i])] });
        }
        var axis_x_min = (that.obj_data_gcx.data != null && that.obj_data_gcx.data.length > 0) ? that.obj_data_gcx.data[0].value[0] : 0;
        var axis_x_max = (that.obj_data_gcx.data != null && that.obj_data_gcx.data.length > 0) ? that.obj_data_gcx.data[that.obj_data_gcx.data.length - 1].value[0] : 1;

        //初始化图表
        that.option = {};
        that.option = that.get_option_dmxx_zz(axis_x_min, axis_x_max);


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
     * 断面信息参数-河道
     **/
    get_option_dmxx_zz: function (axis_x_min, axis_x_max) {
        var that = this;
        var option = {
            legend: {
                show: true,
                top: 5,
                data: ["实时水位", "警戒水位", "保证水位"]
            },
            grid: {
                left: 8,
                top: 28,
                right: 0,
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show: false,
                type: "value",
                min: axis_x_min,
                max: axis_x_max,
                axisLine: { onZero: false }
            },
            yAxis: [{
                type: 'value',
                name: '左岸',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 5]
                },
                //min: that.obj_minMax_dmxx.gc.min < 0 ? 0 : that.obj_minMax_dmxx.gc.min,
                //max: that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_minMax_dmxx.gc.max - that.obj_minMax_dmxx.gc.min) : that.obj_minMax_dmxx.gc.max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: false
                },
                //axisLabel: {
                //    formatter: function (value, index) {
                //        return tools.format_sw(that.obj_minMax_dmxx.gc.min < 0 ? Number(value) + that.obj_minMax_dmxx.gc.min : value);
                //    }
                //}
            }],
            series: [{
                name: '断面信息',
                type: 'line',
                showSymbol: false,
                smooth: true,
                smoothMonotone: "none",
                symbol: "circle",
                z: 4,
                lineStyle: {
                    color: panelConfig.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_gcx.data
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        }
        option = tools.initChartlegendIcon(option);
        return option;
    }

};