/**
 * 面板配置文件
 */
var panelConfig_yxyl = {
    //面板默认宽度
    panel_default_width: 1200,
    //面板默认高度
    panel_default_height: 800,
    //带预报统计时底部高度
    panel_default_height2: 460,
    //预报统计表格高度
    table_height_yb: 105,
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
 * Tools_Panel_yxyl类-用于展示相似洪水面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2020-04-13新增
 */
var Tools_Panel_yxyl = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_yxyl.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelYxyl",
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
    //数据源
    obj_data_gcx: null,
    //洪水极大极小数据
    obj_minMax_gcx_hs: null,
    //时间点
    obj_data_gcx_tm: null,

    js_data: new Array(),
    sw_data: new Array(),
    ll_data: new Array(),

    js_time_arr:new Array(),

    //数据源备份
    obj_data_gcx_bk: null,
    //备份y轴数据
    obj_data_gcx_y_value: null,

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


    obj_yb_graphic: null,

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
      /*  if (panelConfig_yxyl.panel_default_height > $(document).height()) {
            panelConfig_yxyl.panel_default_height = $(document).height();
        }*/
        that.setPanelSize(panelConfig_yxyl.panel_default_width, panelConfig_yxyl.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Yxyl")[0]);

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
                    "margin-left": "-" + panelConfig_yxyl.panel_default_width / 2 + "px",
                    //"margin-top": "-" + (that.show_type == "1" ? panelConfig_yxyl.panel_default_height : panelConfig_yxyl.panel_default_height2 + panelConfig_yxyl.table_height_yb) / 2 + "px"
                    "margin-top": "-" + panelConfig_yxyl.panel_default_height / 2 + "px"
                });
                that.panel_actual_width = panelConfig_yxyl.panel_default_width;
                //that.panel_actual_height = that.show_type == "1" ? panelConfig_yxyl.panel_default_height : panelConfig_yxyl.panel_default_height2 + panelConfig_yxyl.table_height_yb;
                that.panel_actual_height = panelConfig_yxyl.panel_default_height
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

            $("#proLineBody-Yxyl").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });
    
    },

  
    
    /**
     * 展示面板
     * searchRange范围，_stcd站码,_stnm站名
     **/
    panelShow: function (stcd, _stnm, searchStime, searchEtime, userId) {
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

        //统一站类
        //if (_sttp == "ZQ") {
        //    _sttp = "ZZ";
        //} else if (_sttp == "HP") {
        //    _sttp = "RR";
        //}
        //that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        //that.show_sttp = _sttp;
        //that.show_etime = _time;



        //展示面板
        $(that.parentId).show();

        that.panel_actual_width = panelConfig_yxyl.panel_default_width;
        that.panel_actual_height = panelConfig_yxyl.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        $("#treeMenuYxyl").show();
        $("#proLineBody-Yxyl").css("margin-top", 30);
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
        _html_header = searchRangeName + "各站点前期影响雨量图";

        $(that.parentId).find(".modal-title").html(_html_header);

        that.echart_line_gcx_for(stcd, _stnm, searchStime, searchEtime, userId);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_yxyl.panel_default_height,
            minWidth: panelConfig_yxyl.panel_default_width,
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
    echart_line_gcx_for: function (_stcd, stnm, searchStime, searchEtime, userId) {
        var that = this;
        //初始化参数
        that.obj_minMax_gcx = {
            js:{max:panelConfig_yxyl.MIN_NUM},
        };
        
        that.js_data = new Array();

        that.obj_data_gcx = {
            dataName: "",
            js: new Array(),
        };

        var objData = {
            stcd: _stcd,
            stime: searchStime,
            etime: searchEtime,
            userId: userId
        };
        var info = JSON.stringify(objData);

        //等待框
        tools.showChartLoading(that.chartGcx);
        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/get_PA_Info",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    //tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("无前期影响雨量数据!");
                    return;
                }

                var jsonFor = JSON.parse(res);
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {

                    that.creat_tj_table(jsonFor);

                    //解析数据
                    $.each(jsonFor.data, function (index, item) {
                        that.obj_data_gcx.dataName = index;
                        if (item.length==0) {
                            tools.show_message_error("无前期影响雨量数据!");
                            return;
                        }
                        $.each(item, function (i, data) {
                            that.js_data.push({ value: [data[0], data[1]] });
                            that.obj_minMax_gcx.js.max = Math.max(Number(data[1]), that.obj_minMax_gcx.js.max);
                        })
                        that.obj_data_gcx.js.push(item);
                    });
                    var js_data_all = that.obj_data_gcx.js[0];

                    $.each(js_data_all, function (i, item) {
                        that.js_time_arr.push(item[0]);
                    });

                    //获取时间轴刻度
                    var _minTime = "";
                    var _maxTime = "";
                    if (that.obj_data_gcx.js != null && that.obj_data_gcx.js.length > 0) {
                        _minTime = js_data_all[0][0];
                        _maxTime = js_data_all[js_data_all.length - 1][0];
                    }
                    var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
                    //获取时间轴格式化字符串
                    var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

                    //初始化图表
                    var option = {};

                    option = that.get_option_gcx_for(intervalX, strFormatX);

                    // 使用刚指定的配置项和数据显示图表。
                    option = tools.initChartlegendIcon(option);
                    that.add_click_gcx_comon();
                    that.chartGcx.setOption(option, true);

                    tools.hideChartLoading(that.chartGcx);
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
    setPanelSize: function (width, height, isResize) {

        var that = this;
        $(this.parentId).width(width).height(height);

        //过程线
        $("#proLineBody-Yxyl").css("margin-top", 0);
        $("#proLineBody-Yxyl").width(width - 200 - 20).height(height - panelConfig_yxyl.table_height_yb - 40);
        $("#proLineBody-Yxyl").children().width(width - 200 - 20).height(height - panelConfig_yxyl.table_height_yb - 40 - 20);
        $("#proLineBody-Yxyl").children().children().width(width - 200 - 20).height(height - panelConfig_yxyl.table_height_yb - 40 - 20);

    },
    /**
     * 水位过程线参数
     **/
    get_option_gcx_for: function (intervalX, strFormatX) {
        var that = this;
        var option = {
            title: {
                text: that.obj_data_gcx.dataName,
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
                data: ["前期影响雨量"],
                selected: {
                    //"雨量": false,
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
                type: "category",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_yxyl.ECHART_COLOR_AXIS_X
                    }
                },
                interval: intervalX,
                maxInterval: intervalX,
                minInterval: intervalX,
                axisLabel: {
                    show: true,
                    interval: 1,
                    color: "#000000",
                    formatter: function (value, index) {
                        return moment(value).format("MM月DD日");
                    }
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap:true
            },
            yAxis: [{
                //show: false,
                type: 'value',
                name: '雨量(mm)',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 10]
                },
                position: 'left',
                //offset: 0,
                //nameLocation: 'start',
                //inverse: true,
                min: 0,
                max: that.obj_minMax_gcx.js.max + 10,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_yxyl.ECHART_COLOR_RAIN
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [panelConfig_cgxz.ECHART_COLOR_GRID]
                    }
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
                },
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            series: [{
                name: '雨量',
                type: 'bar',
                yAxisIndex: 0,
                itemStyle: {
                    color: panelConfig_yxyl.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_yxyl.ECHART_COLOR_SHADOW,
                    shadowBlur: 3
                },
                barWidth: "60%",
                barMaxWidth: 13,
                data: that.js_data
            }],
            backgroundColor: panelConfig_yxyl.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
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
     * 创建统计表
     **/
    creat_tj_table: function (json) {
        var that = this;
        $("#contProLine-Yxyl .table_ybtj thead tr").remove();
        $("#contProLine-Yxyl .table_ybtj tbody tr").remove();
        var _html_thead = "<tr>";
        $.each(json.statisName, function (i, item) {
            _html_thead += "<th>" + item + "</th>";
        })
        _html_body += "</tr>";
        $("#contProLine-Yxyl .table_ybtj thead").append(_html_thead);
        //$("#contProLine-Yxyl .table_ybtj thead").append("<tr><th>洪号</th><th>时段长(h)</th><th>降雨起始日期</th><th>降雨历时(h)</th><th>总降水量</th><th>前期影响雨量</th><th>最高水位</th><th>洪量(百万方)</th><th>径流系数</th></tr>");
        var _html_body = "";
        $.each(json.statis, function (i, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {
                _html_body += "<td>" + item_inner + "</td>"
            });
            _html_body += "</tr>";
        });
        $("#contProLine-Yxyl .table_ybtj tbody").append(_html_body);
    }
};
