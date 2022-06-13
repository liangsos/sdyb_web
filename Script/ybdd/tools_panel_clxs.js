/**
 * 面板配置文件
 */
var modifyValue_cl = false;
var panelConfig_clxs = {
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
 * Tools_Panel_clxs类-用于展示产流系数面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:
 */
var Tools_Panel_clxs = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_clxs.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelClxs",
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

    //是否进行了修正
    isModify: false,

    json_data:null,

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
       /* if (panelConfig_clxs.panel_default_height > $(document).height()) {
            panelConfig_clxs.panel_default_height = $(document).height();
        }*/
        that.setPanelSize(panelConfig_clxs.panel_default_width, panelConfig_clxs.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Clxs")[0]);
        
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
                    "margin-left": "-" + panelConfig_clxs.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig_clxs.panel_default_height : panelConfig_clxs.panel_default_height2 + panelConfig_clxs.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = panelConfig_clxs.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig_clxs.panel_default_height : panelConfig_clxs.panel_default_height2 + panelConfig_clxs.table_height_yb;
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
         * 数据导出
        **/
        $(that.parentId).find('.fa-arrow-circle-o-up').click(function () {
            downloadExl_clxs(that.json_data,that.show_stnm);
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


            $("#proLineBody-Clxs").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        /**
         * 过程线-表格缩放按钮
         **/
        $('#contProLine-Clxs .icon-resize-left').click(function () {
            var marRight;
            var margin_right = parseInt($(this).parent().next().css("margin-right"));

            //右缩进
            if ($(this).hasClass("iconRight")) {
                if (margin_right <= 25)
                    return;

                if (margin_right == (that.panel_actual_width - 20 - 200)) {
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
                if (margin_right >= (that.panel_actual_width - 20 - 200))
                    return;

                if (parseInt($(this).parent().next().css("margin-right")) == 25) {
                    if (that.show_type == "3") {
                        marRight = 575;
                    } else {
                        marRight = 425;
                    }
                } else {
                    marRight = (that.panel_actual_width - 20 - 200);
                }
            }
            if (marRight == 25) {
                $(this).parent().prev().hide();
                $("#proLineBody-Clxs").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }

                $(this).parent().prev().width(0);
            } else if (marRight == (that.panel_actual_width - 20 - 200)) {
                $("#proLineBody-Clxs").hide();
                $("#btn_ybsw-modify").hide();
                $("#btn_ybsw-save").hide();
                $(this).parent().prev().show();

                //最后的减2是边框的宽度
                $(this).parent().prev().width(marRight - 25 - 2); //2019-10-08 modify by chl 
            } else {
                $("#proLineBody-Clxs").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-save").show();
                }
                $(this).parent().prev().show();

                $(this).parent().prev().width(marRight - 25);
            }


            var w_right = $(this).parent().prev().width() + 2;
            $("#proLineBody-Clxs").width(that.panel_actual_width - 20 - marRight - 200); //2019-10-08 modify by chl 
            var w_left = $("#proLineBody-Clxs").width();
            $("#contProLine-Clxs").width(w_left + 25 + w_right); //2019-10-08 modify by chl 
            $(this).parent().next().animate({ "margin-right": marRight }, 500);



            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }

        });

        //修正按钮事件
        $("#clxsModify").click(function () {
            //$("#contProLine-Cgxz .table_ybtj td input").removeAttr("readonly");
            if (!modifyValue_cl) {
                tools.show_message_error("请先修改汇流时间段数！");
                return;
            };

            var modify_deftm = "";
            $("#contProLine-Clxs .table_ybtj tbody tr").each(function (i) {
                $(this).children('td').each(function (j) {
                    if (j == 4) {
                        modify_deftm = $(this).children().val();
                    }
                })
            });
                    var objData = {
                stime: that.stime_scarch,
                etime: that.etime_search,
                stcd: that.stcd_search,
                plusType: _plusType,
                rainPlus: _rainPlus,
                hisStormId: _hisStormId,
                deftm: modify_deftm
            };
            var info = JSON.stringify(objData);

            if (that.show_methodName == "rkjhf") {
                //等待框
                tools.showChartLoading(that.chartGcx);
                //查询数据
                $.ajax({
                    type: 'post',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    url: apiUrl_cbh + "get_clxsjs",
                    headers: {
                        "Authorization": getCookie("accessToken")
                    },
                    data: info,
                    //url: that.ApiUrlPath + "/get_clxsjs",
                    //data: "{'info':'" + info + "'}",
                    success: function (data) {
                        var res = data;
                        if (res == "" || res == null) {
                            tools.hideChartLoading(that.chartGcx);
                            tools.show_message_error("查询产流系数结果失败!");
                        }

                        var jsonFor = res;
                        that.json_data = jsonFor;
                        if (jsonFor.ValueForTable.length == 0) {
                            tools.show_message_error("无产流系数数据");
                            return;
                        }
                        if (jsonFor.code == "0") {
                            tools.show_message_error(jsonFor.msg);
                            return;
                        } else {
                            //生成表格
                            that.create_table_clxx(jsonFor);

                            //生成过程线
                            that.isModify = true;
                            that.create_gcx_clxx(jsonFor, that.isModify);


                        }
                    },
                    error: function (errorMsg) {
                        tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error("查询过程线(预报信息)失败!");
                    }
                });
            } else if (that.show_methodName == "smkrf") {
                //等待框
                tools.showChartLoading(that.chartGcx);
                //查询数据
                $.ajax({
                    type: 'post',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    url: apiUrl_cbh + "get_clxsjs01",
                    headers: {
                        "Authorization": getCookie("accessToken")
                    },
                    data: info,
                    //url: that.ApiUrlPath + "/get_clxsjs01",
                    //data: "{'info':'" + info + "'}",
                    success: function (data) {
                        var res = data;
                        if (res == "" || res == null) {
                            tools.hideChartLoading(that.chartGcx);
                            tools.show_message_error("查询产流系数结果失败!");
                        }

                        var jsonFor = res;
                        that.json_data = jsonFor;
                        if (jsonFor.ValueForTable.length == 0) {
                            tools.show_message_error("无产流系数数据");
                            return;
                        }
                        if (jsonFor.code == "0") {
                            tools.show_message_error(jsonFor.msg);
                            return;
                        } else {
                            //生成表格
                            that.create_table_clxx(jsonFor);

                            //生成过程线
                            that.isModify = true;
                            that.create_gcx_clxx(jsonFor, that.isModify);


                        }
                    },
                    error: function (errorMsg) {
                        tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error("查询过程线(预报信息)失败!");
                    }
                });
            };
        });
        
    },
    /**
     * 展示面板
     * _stcd站码 _stnm站名 _stime开始时间 _etime结束时间
     **/
    panelShow: function (_stime, _etime, _stcd, _stnm, _methodName, _deftm) {
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

        that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        that.show_methodName = _methodName;
        //that.show_etime = _time;

        //展示面板
        $(that.parentId).show();
        
        that.panel_actual_width = panelConfig_clxs.panel_default_width;
        //that.panel_actual_height = that.show_type == "1" ? panelConfig_clxs.panel_default_height : panelConfig_clxs.panel_default_height2 + panelConfig_clxs.table_height_yb;
        that.panel_actual_height = panelConfig_clxs.panel_default_height2 + panelConfig_clxs.table_height_yb;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        $("#treeMenuClxs").show();
        $("#panelClxs .form-inline").css({
            "float": "left",
            "margin-left": 200 + "px",

        })

        $("#proLineBody-Clxs").css("margin-top", 30);
        $("#contProLine-Clxs .content-left").css("margin-right", 425);
        $("#contProLine-Clxs .sidebar-right,#contProLine-Clxs .sidebar-control-right").show();
        $("#contProLine-Clxs .field_yb").show();
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

        var _html_header = "";
        var metName = "";
        if (_methodName == "rkjhf") {
            metName = "入库加和法";
        }else{
            metName = "始末库容法"
        }
        _html_header = _stnm + "产流系数-" + metName;
        $(that.parentId).find(".modal-title").html(_html_header);

        if (_methodName == "rkjhf") {
            that.echart_line_gcx_for_rkjhf(_stcd, _stnm, _stime, _etime, _deftm);
        }
        if (_methodName == "smkrf") {
            that.echart_line_gcx_for_smkrf(_stcd, _stnm, _stime, _etime, _deftm);
        }
        

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_clxs.panel_default_height,
            minWidth: panelConfig_clxs.panel_default_width,
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
     * 入库加和法
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_for_rkjhf: function (_stcd, _stnm, _stime, _etime, _deftm) {
        var that = this;
        //初始化参数

        that.obj_minMax_gcx = {
            sw: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
            ckll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
            rkll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM }
        };
        that.obj_data_gcx = {
            sw: new Array(),
            ckll: new Array(),
            rkll: new Array(),
            aveq: new Array()
        };
        //以下三个对象是预报传用，可调整数值
        //that.obj_data_gcx_bk = {
        //    ybsw: new Array(),
        //    ll_in: new Array(),
        //};
        //that.obj_data_gcx_y_value = {
        //    ybsw: new Array(),
        //    ll_in: new Array(),
        //};

        that.stcd_search = _stcd;
        that.stime_scarch = _stime;
        that.etime_search = _etime;
        that.deftm_search = _deftm;
        //that.plan_search = _plan;
        //that.day_search = _day;
        //that.userid_search = _userid;
        //that.ratio_search = _ratio;

        var objData = {
            stime: _stime,
            etime: _etime,
            stcd: _stcd,
            deftm: _deftm
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
            url: that.ApiUrlPath + "/get_clxsjs",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询产流系数结果失败!");
                }

                var jsonFor = JSON.parse(res);
                that.json_data = jsonFor;
                if (jsonFor.ValueForTable.length == 0) {
                    tools.show_message_error("无产流系数数据");
                    return;
                }
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    //生成表格
                    that.create_table_clxx(jsonFor);
                    
                    //生成过程线
                    that.isModify = false;
                    that.create_gcx_clxx(jsonFor, that.isModify);

                    
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },
    /**
     * 始末库容法
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_for_smkrf: function (_stcd, _stnm, _stime, _etime, _deftm) {
        var that = this;
        //初始化参数

        that.obj_minMax_gcx = {
            sw: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
            ckll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
            rkll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM }
        };
        that.obj_data_gcx = {
            sw: new Array(),
            ckll: new Array(),
            rkll: new Array(),
            aveq: new Array()
        };
        //以下三个对象是预报传用，可调整数值
        //that.obj_data_gcx_bk = {
        //    ybsw: new Array(),
        //    ll_in: new Array(),
        //};
        //that.obj_data_gcx_y_value = {
        //    ybsw: new Array(),
        //    ll_in: new Array(),
        //};

        that.stcd_search = _stcd;
        that.stime_scarch = _stime;
        that.etime_search = _etime;
        //that.plan_search = _plan;
        //that.day_search = _day;
        //that.userid_search = _userid;
        //that.ratio_search = _ratio;

        var objData = {
            stime: _stime,
            etime: _etime,
            stcd: _stcd,
            deftm: _deftm
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
            url: that.ApiUrlPath + "/get_clxsjs01",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询产流系数结果失败!");
                }

                var jsonFor = JSON.parse(res);
                that.json_data = jsonFor;
                if (jsonFor.ValueForTable.length == 0) {
                    tools.show_message_error("无产流系数数据");
                    return;
                }
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    //生成表格
                    that.create_table_clxx(jsonFor);

                    //生成过程线
                    that.isModify = false;
                    that.create_gcx_clxx(jsonFor,that.isModify);


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
        $("#contProLine-Clxs").width(_width - 200);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig_clxs.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 200);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig_clxs.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        }
        var isshowall = false;
        //过程线
        $("#proLineBody-Clxs").width(_width - 425 - 2 - 200).height(_height - 105 - 45 + 33); //2019-10-8 modify by chl
        $("#contProLine-Clxs .content-left").css("margin-right", 425);
        $("#contProLine-Clxs .content-left").css("margin-top", 0);
        $("#contProLine-Clxs .sidebar-right").width(400);

        $("#contProLine-Clxs .table_ybtj").css({
            "table-layout": "fixed"
        });

        $("#contProLine-Clxs .table_ybtj thead").css({
            "white-space": "nowrap"
        });

        $("#contProLine-Clxs .tableClxx").parent().height(_height - 105 - 48 + 33);
        $("#contProLine-Clxs .ybsq-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });

        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine-Clxs .content-left").show();
                $("#proLineBody-Clxs").show();
                $("#contProLine-Clxs .sidebar-right").show();
            }
            else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody-Clxs").is(':visible');
                var v_right = $("#contProLine-Clxs .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine-Clxs .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine-Clxs .content-left").show();
                }
                else if (v_left) {
                    $("#proLineBody-Clxs").width(that.panel_actual_width - 200 - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Clxs .content-left").css("margin-right", 25);
                    $("#contProLine-Clxs .sidebar-right").width(0);
                }
                else if (v_right) {
                    $("#proLineBody-Clxs").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-Clxs .content-left").css("margin-right", that.panel_actual_width - 200 - 20);

                    $("#contProLine-Clxs .sidebar-right").width(that.panel_actual_width - 200 - 20 - 25 - 2);
                }

            }
        }

        if (isResize) {
            this.chartGcx.resize();
        }

    },

    /**
     * 生成表格-产汇流信息
     **/
    create_table_clxx: function (json) {
        var that = this;
        //表头
        //先清空数据
        $("#contProLine-Clxs .ybsq-table-header table colgroup col").remove();
        $("#contProLine-Clxs .ybsq-table-header table thead tr").remove();
        $("#contProLine-Clxs .tableClxx colgroup col").remove();
        $("#contProLine-Clxs .tableClxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        _html_col += "<col style='width: 25%;' />";
        _html_col += "<col style='width: 15%;' />";
        _html_col += "<col style='width: 15%;' />";
        _html_col += "<col style='width: 15%;' />";
        _html_th = "<tr>"
        $.each(json.TableName, function (index, item) {
            _html_th += "<th>" + item + "</th>"
        })
        _html_th += "</tr>";

        $("#contProLine-Clxs .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine-Clxs .tableClxx colgroup").append(_html_col);
        $("#contProLine-Clxs .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";

        $.each(json.ValueForTable, function (index, item) {
            _html_body += "<tr><td>" + (item[0] == "" ? "" : moment(item[0]).format("MM-DD HH:mm")) + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td></tr>";
        });
        $("#contProLine-Clxs .tableClxx tbody").append(_html_body);
        //  $("#contProLine-Clxs .tableClxx .edit_input input").removeAttr("readonly");
        //生成该站统计信息
        try {
            $("#contProLine-Clxs .table_ybtj thead tr").remove();
            $("#contProLine-Clxs .table_ybtj tbody tr").remove();

            var _html_th_tj = "";
            _html_th_tj = "<tr>"
            $.each(json.tjName, function (index, item) {
                _html_th_tj += "<th>" + item + "</th>"
            })
            _html_th_tj += "</tr>";

            $("#contProLine-Clxs .table_ybtj thead").append(_html_th_tj);
            var _html_body_tj = "";
            _html_body_tj += "<tr>";
            $.each(json.tjValue, function (i, item) {
                var _class = "";

                _class += " style='white-space: normal;text-align:center'";
                if (i == 4) {
                    _html_body_tj += "<td>";
                    if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器不支持onchange事件
                        _html_body_tj += "<input onblur='modifyValue_clxs(this)' type='text' onkeyup='clearNoNum_clxs(this)'" + " value='" + item + "' style='border:0px;line-height:normal' /></td>";
                    } else {
                        _html_body_tj += "<input onchange='modifyValue_clxs(this)' type='text' onkeyup='clearNoNum_cgxz(this)' " + " value='" + item + "' style='border:0px;line-height:normal' /></td>";
                    }
                }else if (i == 2 || i == 3 || i == 5) {
                    _html_body_tj += "<td>" + (item == "" ? "" : moment(item).format("MM-DD HH:mm")) + "</td>";
                } else {
                    _html_body_tj += "<td>" + item + "</td>";
                }
            });
            _html_body_tj += "</tr>";
            $("#contProLine-Clxs .table_ybtj tbody").append(_html_body_tj);
        } catch (e) {
        }
    },

    /**
     * 生成过程线-产汇流信息
     **/
    create_gcx_clxx: function (jsonFor, isModify) {
        var that = this;
        if (isModify) {//修正时初始化参数否则不用
            that.obj_minMax_gcx = {
                sw: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
                ckll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM },
                rkll: { min: panelConfig_clxs.MAX_NUM, max: panelConfig_clxs.MIN_NUM }
            };
            that.obj_data_gcx = {
                sw: new Array(),
                ckll: new Array(),
                rkll: new Array(),
                aveq: new Array()
            };
        }
        var hldata;
        //解析数据
        var clxs_timeArr = jsonFor.TableValue[0];
        var clxs_swArr = jsonFor.TableValue[1];
        var clxs_ckllArr = jsonFor.TableValue[2];
        var clxs_rkllArr = jsonFor.TableValue[3];
        var aveq_arr = jsonFor.aveq;
        $.each(clxs_swArr, function (index, item) {
            that.obj_data_gcx.sw.push({ value: [clxs_timeArr[index], item] });
            that.obj_minMax_gcx.sw.min = Math.min(Number(item), that.obj_minMax_gcx.sw.min);
            that.obj_minMax_gcx.sw.max = Math.max(Number(item), that.obj_minMax_gcx.sw.max);
        });
        $.each(clxs_ckllArr, function (index, item) {
            that.obj_data_gcx.ckll.push({ value: [clxs_timeArr[index], item] });
            that.obj_minMax_gcx.ckll.min = Math.min(Number(item), that.obj_minMax_gcx.ckll.min);
            that.obj_minMax_gcx.ckll.max = Math.max(Number(item), that.obj_minMax_gcx.ckll.max);
        });
        $.each(clxs_rkllArr, function (index, item) {
            that.obj_data_gcx.rkll.push({ value: [clxs_timeArr[index], item] });
            that.obj_minMax_gcx.rkll.min = Math.min(Number(item), that.obj_minMax_gcx.rkll.min);
            that.obj_minMax_gcx.rkll.max = Math.max(Number(item), that.obj_minMax_gcx.rkll.max);
        })
        $.each(aveq_arr, function (index, item) {
            that.obj_data_gcx.aveq.push({ value: [clxs_timeArr[index], item] });
        })

        var arrSw = that.get_sw_max_min(that.obj_minMax_gcx.sw.max, that.obj_minMax_gcx.sw.min);
        var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.rkll.max, that.obj_minMax_gcx.rkll.min);

        var axis_sw_min = arrSw[1];
        axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
        var axis_sw_max = arrSw[0];

        var axis_ll_min = arrLl[1];
        axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
        var axis_ll_max = arrLl[0];
        //获取时间轴刻度
        var _minTime = "";
        var _maxTime = "";
        if (jsonFor.TableValue != null) {
            _minTime = clxs_timeArr[0];
            _maxTime = clxs_timeArr[clxs_timeArr.length - 1];
        }
        var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
        //获取时间轴格式化字符串
        var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

        //初始化图表
        that.option = {};
        that.option = that.get_option_gcx_zz_for(axis_sw_max,axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);


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
        var axis_sw_min_temp = panelConfig_clxs.MAX_NUM;
        var axis_sw_max_temp = panelConfig_clxs.MIN_NUM;
        var axis_sw_min = panelConfig_clxs.MAX_NUM;
        var axis_sw_max = panelConfig_clxs.MIN_NUM;

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
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_clxs.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_clxs.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_clxs.MAX_NUM) {
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
        var axis_sw_min = panelConfig_clxs.MAX_NUM;
        var axis_sw_max = panelConfig_clxs.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_clxs.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_clxs.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_clxs.MAX_NUM) {
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
        var axis_ll_min = panelConfig_clxs.MAX_NUM;
        var axis_ll_max = panelConfig_clxs.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_clxs.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_clxs.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_clxs.MAX_NUM) {
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
        var axis_ll_min_temp = panelConfig_clxs.MAX_NUM;
        var axis_ll_max_temp = panelConfig_clxs.MIN_NUM;
        var axis_ll_min = panelConfig_clxs.MAX_NUM;
        var axis_ll_max = panelConfig_clxs.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_clxs.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_clxs.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_clxs.MAX_NUM) {
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
     * 水位过程线参数-河道(预报)
     **/
    get_option_gcx_zz_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        that.option = {
            title: {
                text: that.show_stnm + "产流系数过程线",
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
                data: ["水位", "入库流量", "出库流量","基流"],
                selected: {
                    "水位": false,
                    "出库流量": false,
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
                        color: panelConfig_clxs.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_clxs.ECHART_COLOR_GRID]
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
                        color: panelConfig_clxs.ECHART_COLOR_SW
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
                        color: [panelConfig_clxs.ECHART_COLOR_GRID]
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
                        color: panelConfig_clxs.ECHART_COLOR_LL
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
                    color: panelConfig_clxs.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sw
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_clxs.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.rkll
            }, {
                name: '出库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_clxs.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ckll
            },{
                name: '基流',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_clxs.ECHART_COLOR_XXSW
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.aveq
            }],
            backgroundColor: panelConfig_clxs.ECHART_COLOR_BACKGROUND
        };
        that.option = tools.initChartlegendIcon(that.option);
        return that.option;
    },
    /**
     * 从数组中获取最大最小值
     **/
    get_min_max: function (arr) {
        var min = panelConfig_clxs.MAX_NUM;
        var max = panelConfig_clxs.MIN_NUM;
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

};

/**
 * 数值修改事件
 **/
function modifyValue_clxs(obj) {
    var value = obj.value;
    if (value == "" || value == null) {
        $(obj).val(0);
    }
    modifyValue_cl = true;
}
/**
 * 输入数值控制
 **/
function clearNoNum_clxs(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");    
    obj.value = obj.value.replace(/\.{2,}/g, ".");  
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两位小数  
}