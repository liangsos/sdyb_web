/**
 * 面板配置文件
 */
var panelConfig_singleDm = {
    //面板默认宽度
    panel_default_width: 1200,
    //面板默认高度
    panel_default_height: 550,
    //带预报统计时底部高度
    panel_default_height2: 460,
    //预报统计表格高度
    table_height_yb: 240,

    //最小值百分比
    MIN_DEPART: 0.2,
    //最大值百分比
    MAX_DEPART: 0.2,


};

/**
 * Tools_Panel_singleDm类-用于展示水动力学断面计算成果面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:
 */
var Tools_Panel_singleDm = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_singleDm.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelSingleDm",
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

    json_data: null,

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        /*  if (panelConfig_singleDm.panel_default_height > $(document).height()) {
              panelConfig_singleDm.panel_default_height = $(document).height();
          }*/
        that.setPanelSize(panelConfig_singleDm.panel_default_width, panelConfig_singleDm.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-SingleDm")[0]);

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
                    "margin-left": "-" + panelConfig_singleDm.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig_singleDm.panel_default_height : panelConfig_singleDm.panel_default_height2 + panelConfig_singleDm.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = panelConfig_singleDm.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig_singleDm.panel_default_height : panelConfig_singleDm.panel_default_height2 + panelConfig_singleDm.table_height_yb;
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


            $("#proLineBody-SingleDm").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

    },
    /**
     * 展示面板
     * _stcd站码 _stnm站名 _stime开始时间 _etime结束时间
     **/
    panelShow: function (jsonData) {
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

        that.panel_actual_width = panelConfig_singleDm.panel_default_width;
        that.panel_actual_height = panelConfig_singleDm.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        //$("#panelSingleDm .form-inline").css({
        //    "float": "left",
        //    "margin-left": 200 + "px",
        //})

        $("#proLineBody-SingleDm").css("margin-top", 30);
        $("#contProLine-SingleDm .content-left").css("margin-right", 425);
        $("#contProLine-SingleDm .sidebar-right,#contProLine-SingleDm .sidebar-control-right").show();
        $("#contProLine-SingleDm .field_yb").show();
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

        that.echart_line_gcx(jsonData);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true, //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_singleDm.panel_default_height,
            minWidth: panelConfig_singleDm.panel_default_width,
            zIndex: 0, //jquery-ui 默认拖拽z-index为90
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
    echart_line_gcx: function (jsonData) {
        var that = this;
        //生成表格
        that.create_table_sdljs(jsonData);
        //生成过程线
        that.create_gcx_sdljs(jsonData);
    },
    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize, isInit) {

        var that = this;
        $(this.parentId).width(width).height(height);

        //获取真实宽度
        var _width = width - 20;
        $("#contProLine-SingleDm").width(_width);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig_singleDm.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 200);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig_singleDm.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        }
        var isshowall = false;
        //过程线
        $("#proLineBody-SingleDm").width(_width - 425 - 2).height(_height - 45 + 33 - 70); //2019-10-8 modify by chl
        $("#contProLine-SingleDm .content-left").css("margin-right", 425);
        $("#contProLine-SingleDm .content-left").css("margin-top", 0);
        $("#contProLine-SingleDm .sidebar-right").width(400);

        $("#contProLine-SingleDm .table_ybtj").css({
            "table-layout": "fixed"
        });

        $("#contProLine-SingleDm .table_ybtj thead").css({
            "white-space": "nowrap"
        });

        $("#contProLine-SingleDm .tableSingleDm").parent().height(_height - 48 + 33);
        $("#contProLine-SingleDm .ybsq-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });

        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine-SingleDm .content-left").show();
                $("#proLineBody-SingleDm").show();
                $("#contProLine-SingleDm .sidebar-right").show();
            } else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody-SingleDm").is(':visible');
                var v_right = $("#contProLine-SingleDm .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine-SingleDm .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine-SingleDm .content-left").show();
                } else if (v_left) {
                    $("#proLineBody-SingleDm").width(that.panel_actual_width - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-SingleDm .content-left").css("margin-right", 25);
                    $("#contProLine-SingleDm .sidebar-right").width(0);
                } else if (v_right) {
                    $("#proLineBody-SingleDm").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine-SingleDm .content-left").css("margin-right", that.panel_actual_width - 20);

                    $("#contProLine-SingleDm .sidebar-right").width(that.panel_actual_width - 20 - 25 - 2);
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
        $("#contProLine-SingleDm .ybsq-table-header table colgroup col").remove();
        $("#contProLine-SingleDm .ybsq-table-header table thead tr").remove();
        $("#contProLine-SingleDm .tableSingleDm colgroup col").remove();
        $("#contProLine-SingleDm .tableSingleDm tbody tr").remove();

        $("#contProLine-SingleDm .ybsq-table-header-gc table colgroup col").remove();
        $("#contProLine-SingleDm .ybsq-table-header-gc table thead tr").remove();
        $("#contProLine-SingleDm .tableDmgc colgroup col").remove();
        $("#contProLine-SingleDm .tableDmgc tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        _html_col += "<col style='width: 23%;' />";
        _html_col += "<col style='width: 43%;' />";
        _html_col += "<col style='width: 33%;' />";
        _html_th = "<tr><th>序号</th><th>时间</th><th>水位</th></tr>"
        $("#contProLine-SingleDm .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine-SingleDm .tableSingleDm colgroup").append(_html_col);
        $("#contProLine-SingleDm .ybsq-table-header table thead").append(_html_th);

        var _html_col_gc = "";
        var _html_th_gc = "";

        _html_col_gc += "<col style='width: 33%;' />";
        _html_col_gc += "<col style='width: 33%;' />";
        _html_col_gc += "<col style='width: 33%;' />";
        _html_th_gc = "<tr><th>左堤高程</th><th>右堤高程</th><th>河底高程</th></tr>"
        $("#contProLine-SingleDm .ybsq-table-header-gc table colgroup").append(_html_col_gc);
        $("#contProLine-SingleDm .tableDmgc colgroup").append(_html_col_gc);
        $("#contProLine-SingleDm .ybsq-table-header-gc table thead").append(_html_th_gc);

        //解析数据
        var _html_body = "";
        $.each(json.xh, function (index, item) {
            _html_body += "<tr><td>" + item + "</td><td>" + json.tm[index] + "</td><td>" + json.sw[index] + "</td></tr>"
        })

        var _html_body_gc = "";
        _html_body_gc += "<tr><td>" + json.zdgc + "</td><td>" + json.ydgc + "</td><td>" + json.hdgc + "</td></tr>"

        $("#contProLine-SingleDm .tableSingleDm tbody").append(_html_body);
        $("#contProLine-SingleDm .tableDmgc tbody").append(_html_body_gc);


    },

    /**
     * 生成过程线-水动力计算
     **/
    create_gcx_sdljs: function (json) {
        var that = this;
        //解析数据
        //默认展示第一个数据
        var swArr = new Array();
        for (let index = 0; index < json.di.length; index++) {
            swArr.push(json.sw[0]);
        }
        //最高水位
        var zgswArr = new Array();
        for (let index = 0; index < json.di.length; index++) {
            zgswArr.push(json.zgsw)
        }

        var option = {
            baseOption: {
                timeline: {
                    left: 40,
                    right: 10,
                    symbolSize: 4,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 1000,
                    data: json.tm,
                    label: {
                        formatter: function (s) {
                            // $.each(json.sw, function (i, item) {
                                
                            // })
                            return moment(s).format("MM-DD HH:mm");
                        }
                    }
                },
                title: {
                    text: json.dmlx,
                    textStyle: {
                        fontSize: 16
                    },
                    left: "center"
                },
                tooltip: {},
                legend: {
                    show: true,
                    top: 40,
                    left: "center",
                    itemWidth: 20,
                    itemHeight: 8,
                    itemGap: 8,
                    padding: [8, 100, 8, 80],
                    data: ["最高水位", "水位"]
                },
                calculable: true,
                grid: {
                    left: 25,
                    top: 80,
                    right: 25,
                    bottom: 60,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: json.di
                },
                yAxis: {
                    type: 'value',
                    name: '水位(m)',
                    min: json.hdgc - 3,
                    max: tools.format_sw(Number(json.zdgc) >= Number(json.ydgc) ? Number(json.zdgc) + 3 : Number(json.ydgc) + 3)
                },
                series: [{
                    name: "最高水位",
                    type: 'line',
                    yAxisIndex: 0,
                    symbol: "circle",
                    z: 5,
                    itemStyle: {
                        color: "#FF4500",
                    },
                    lineStyle: {
                        width: 2,
                        type: 'dashed' //'dotted'虚线 'solid'实线
                    },
                    showSymbol: false,
                    connectNulls: true, //连接空数据
                    smooth: true, //平滑显示曲线
                    smoothMonotone: "none",
                    markPoint: {
                        symbolSize: 1, //设置为0时 不显示标志
                        symbolOffset: [80, 0], //偏移值X Y
                        showDelay: 0,
                        label: {
                            show: true,
                            color: "#fff",
                            backgroundColor: "#FF4500",
                            padding: [5, 10, 5, 10],
                            formatter: function (ob) {
                                if (ob.dataIndex == 0) {
                                    return "最高水位：" + json.zgsw
                                } else {
                                    return "";
                                }
                            }
                        },
                        data: [{
                            name: '显示值',
                            type: 'min'
                        }]
                    }
                }, {
                    name: "水位",
                    type: 'line',
                    yAxisIndex: 0,
                    symbol: "circle",
                    z: 4,
                    itemStyle: {
                        color: "#0000FF",
                    },
                    lineStyle: {
                        width: 2,
                        type: 'solid' //'dotted'虚线 'solid'实线
                    },
                    areaStyle: {
                        color: "#6495ED",
                        opacity: "0.7"
                    },
                    showSymbol: false,
                    connectNulls: true, //连接空数据
                    smooth: true, //平滑显示曲线
                    smoothMonotone: "none",
                }, {
                    name: "河底高程",
                    type: 'line',
                    yAxisIndex: 0,
                    symbol: "circle",
                    z: 5,
                    itemStyle: {
                        color: "#000000",
                    },
                    lineStyle: {
                        width: 2,
                        type: 'solid' //'dotted'虚线 'solid'实线
                    },
                    areaStyle: {
                        color: "#696969",
                        opacity: "1",
                        // shadowColor: '#696969'
                    },
                    showSymbol: false,
                    connectNulls: true, //连接空数据
                    smooth: true, //平滑显示曲线
                    smoothMonotone: "none",
                }]
            },
            options: []
        };

        //动态加载options
        $.each(json.sw, function (i, item) {
            var swArr = new Array();
            for (let index = 0; index < json.di.length; index++) {
                swArr.push(json.sw[i]);
            }
            option.options.push({
                series: [{
                        data: zgswArr
                    },
                    {
                        markPoint: {
                            symbol: "pin",
                            symbolSize: 1, //设置为0时 不显示标志
                            symbolOffset: [20, -20], //偏移值X Y
                            showDelay: 0,
                            label: {
                                show: true,
                                color: "#fff",
                                backgroundColor: "#63B8FF",
                                padding: [2, 10, 3, 10],
                                lineHeight: 16,
                                formatter: function (ob) {
                                    if (ob.dataIndex == 0) {
                                        return json.tm[i] + "     " + json.sw[i];;
                                    } else {
                                        return "";
                                    }
                                }
                            },
                            data: [{
                                // name: '显示值',
                                yAxis: json.sw[i],
                                x: "50%"
                            }]
                        },
                        data: swArr
                    },
                    {
                        data: json.zb
                    },
                ]
            })
        })

        // 使用刚指定的配置项和数据显示图表。
        that.option = tools.initChartlegendIcon(option);
        that.add_click_gcx_comon();
        that.chartGcx.setOption(option, true);
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

    }
};