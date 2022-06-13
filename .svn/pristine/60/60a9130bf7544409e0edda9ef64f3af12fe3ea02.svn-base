/**
 * 面板配置文件
 */
var panelRainReportConfig = {
    //面板默认宽度
    default_rain_width_report_yss: 1100,
    //面板默认高度
    default_rain_height_report_yss: 650,


    MIN_NUM: -99999,
    MAX_NUM: 99999,
    //最小值百分比
    MIN_DEPART: 0.2,
    //最大值百分比
    MAX_DEPART: 0.2,


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
var modifyValueRain_yss = false;
/**
 * Tools_RainReport类-用于展示相似洪水面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2020-04-13新增
 */
var Tools_RainReport = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_RainReport.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#paneljsyb",
    //面板实际宽度
    panel_actual_width: 0,
    //面板实际高度
    panel_actual_height: 0,
    //上次调用面板时间
    call_time: null,
    //echarts实例-过程线
    chartGcx: null,

    //数据源雨量
    arr_rain_data: new Array(),

    //range
    searchRange: "",

    //方案NO
    planNo: "",

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
      /*  if (panelRainReportConfig.default_rain_height_report_yss > $(document).height()) {
            panelRainReportConfig.default_rain_height_report_yss = $(document).height();
        }*/
        //that.setPanelSize(panelRainReportConfig.default_rain_width_report_yss, panelRainReportConfig.default_rain_height_report_yss, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Jsyb")[0]);

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
                    "margin-left": "-" + panelRainReportConfig.default_rain_width_report_yss / 2 + "px",
                    "margin-top": "-" + panelRainReportConfig.default_rain_height_report_yss / 2 + "px"
                });
                that.panel_actual_width = panelRainReportConfig.default_rain_width_report_yss;
                that.panel_actual_height = panelRainReportConfig.default_rain_height_report_yss
                //设置面板相关宽高
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

            //echarts清空数据
            that.chartGcx.clear();

            $("#proLineBody-Jsyb").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        //查询降水分区按钮点击事件
        $(that.parentId).find('#btnSearchjsfq').click(function () {
            //searchRange
            var searchPlan = $("#selectPlan").val();
            var userId = $("#_hid_userid").val();
            var ratio = "0"; //默认修正系数为0
            get_jsfq_data(searchRange, searchPlan, selectDays, userId, ratio);
        });

        //修改按钮事件
        $(that.parentId).find('#btnModify').click(function () {
            $("#paneljsyb_table td input").removeAttr("readonly");
        })

        //确认修改按钮事件
        $(that.parentId).find('#btnSureMod').click(function () {
            if (!modifyValueRain_yss) {
                tools.show_message_error("请进行修改后再确认保存！");
                return;
            };

            var stime_ = $("#endTime").val() + ":00";
            var dataName_ = new Array();
            var data_ = new Array();
            $("#paneljsyb_table thead tr").each(function (i) {
                $(this).children('th').each(function (j) {
                    dataName_.push($(this).text());
                })
            });
            $("#paneljsyb_table tbody tr").each(function (i) {
                var dataTd = new Array();
                $(this).children('td').each(function (j) {
                    if ($(this).text() == "" || $(this).text() == null) {
                        dataTd.push($(this).children().val());
                    } else {
                        dataTd.push($(this).text());
                    }
                })
                data_.push(dataTd);
            });

            var objData = {
                data: data_,
                dataName: dataName_,
                stime: stime_,
                daysNum: daysNum_
            };
            var info = JSON.stringify(objData);

            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: 'json',
                url: "panelNew.aspx/saveRainForecast",
                data: "{'info':'" + info + "'}",
                success: function (data) {
                    var res = data.d;

                    if (res == "" || res == null) {
                        tools.show_message_error("保存降水预报信息失败！");
                        return;
                    }

                    var json = JSON.parse(data.d);
                    if (json.code == "0") {
                        tools.show_message_error(json.msg);
                        $(".report-jsyb .icon-close").click();
                    } else {
                        tools.show_message_success(json.msg);
                        modifyValueRain_yss = false;
                    }
                },
                error: function (errorMsg) {

                    tools.show_message_error("查询降水预报信息失败");
                }

            });
        });

        //选择下拉按钮点击事件
        $(that.parentId).find('#sel1-i').click(function () {
            var sel = $(this);
            var block = sel.parents(".sel1-top").next();
            // 点击i触发函数，判断类型
            if ($(this).hasClass("fa-chevron-right")) {
                $(this).removeClass("fa-chevron-right");
                $(this).addClass("fa-chevron-down");
                block.children("div").each(function () {
                    $(this).removeClass("active")
                });
                block.slideDown();

            } else if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down");
                $(this).addClass("fa-chevron-right");
                block.slideUp();
            }
            block.children("div").on("click", function () {
                $(this).addClass("active");
                var blockPlanName = $(this).html();
                var spanPlanName = sel.prev("span").html();
                sel.prev("span").html($(this).html());
                sel.removeClass("fa-chevron-down");
                sel.addClass("fa-chevron-right");
                block.slideUp();
                if (blockPlanName != spanPlanName) {
                    planNo = blockPlanName.split("_")[0];
                    that.getRainPlan(searchRange, "1", planNo);
                }
            });
        });

        //确认方案按钮点击事件
        $(that.parentId).find('#jsybPlanBtn').click(function () {
            that.getRainPlan(searchRange, "2", planNo);
        })

    },
    /**
     * 展示面板
     * searchRange范围，_stcd站码,_stnm站名
     **/
    panelShow: function (_searchRange, _searchEtime) {
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
        $("#paneljsyb .sel").show();
        $("#contProLine-Jsyb").show();

        that.panel_actual_width = panelRainReportConfig.default_rain_width_report_yss;
        that.panel_actual_height = panelRainReportConfig.default_rain_height_report_yss;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }
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
        
        

        $(that.parentId).find(".modal-title").html("降水预报信息");

        that.getRainaReportData(_searchRange, _searchEtime);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelRainReportConfig.default_rain_height_report_yss,
            minWidth: panelRainReportConfig.default_rain_width_report_yss,
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
     * 获取预报降雨表格数据
     **/
    getRainaReportData: function (_searchRange, _searchEtime) {
        var that = this;
        var objData = {
            bsid: _searchRange,
            ptime: _searchEtime
        };
        var info = JSON.stringify(objData);

        //range
        searchRange = _searchRange;

        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/getRainForecast",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    //tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询降水预报信息失败！");
                    return;
                }

                var jsonFor = JSON.parse(data.d);
                json_data = jsonFor;
                daysNum_ = jsonFor.daysNum;
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    if (jsonFor.daysNum == 0) {
                        tools.show_message_error(jsonFor.msg);
                        $(".report-jsyb .icon-close").click();
                    } else {
                        //创建表格
                        that.create_rainReport_table(jsonFor)
                        //设置相关宽高
                        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
                        //查询降水方案名称
                        that.getPlanName(_searchRange, "0");
                        return;
                    }
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },
    /**
     * 创建降水预报表格
     **/
    create_rainReport_table: function (json) {
        var that = this;
        //先清空数据
        $("#paneljsyb .tjfx-table-data_rain table colgroup col").remove();
        $("#paneljsyb .tjfx-table-data_rain table thead tr").remove();
        $("#paneljsyb .tjfx-table-data_rain table tbody tr").remove();

        var _html_th = "<tr>";
        var _html_body = "";
        $.each(json.dataName, function (index, item) {
            _html_th += "<th>" + item + "</th>";

        });
        _html_th += "</tr>";
        $.each(json.data, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {

                var _class = "";

                _class += " style='white-space: normal;text-align:center'";
                if (index_inner > 0) {
                    _html_body += "<td>";
                    if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器不支持onchange事件
                        _html_body += "<input onblur='modifyRainValue(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
                    } else {
                        _html_body += "<input onchange='modifyRainValue(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
                    }
                } else {
                    _html_body += "<td " + _class + " >";
                    _html_body += item_inner;
                }
            });
            _html_body += "</tr>";
        });

        $("#paneljsyb .tjfx-table-data_rain table thead").append(_html_th);
        $("#paneljsyb .tjfx-table-data_rain table tbody").append(_html_body);


    },
    /**
     * 查询降水方案名称
     **/
    getPlanName: function (_range, _mode) {
        var that = this;
        var objData = {
            range: _range, //先默认传9， 后面需修改
            mode: _mode,
            userId: $("#_hid_userid").val()
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType: 'json',
            url: "panelNew.aspx/get_DayPDisPatch_Info",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;

                if (res == "" || res == null) {
                    tools.loadinghide(false);
                    tools.show_message_error("获取方案名称失败！");
                    return;
                }

                var json = JSON.parse(data.d);
                //json_data = json;
                if (json.downno.length == 0) {
                    tools.loadinghide(false);
                    tools.show_message_error("暂无降水方案！");
                    return;
                }
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error(json.msg);
                } else {
                    var html_planName = "";
                    var firstPlanName = "";
                    //清空选择框内容
                    $("#sel1-show-span").empty();
                    $("#paneljsyb .form-inline .sel1 .sel1-block div").remove();
                    $.each(json.downno, function (index, item) {
                        //默认显示第一个
                        if (index == 0) {
                            html_planName += "<div class = 'active'>" + item + "</div>";
                            firstPlanName = item;
                        } else {
                            html_planName += "<div>" + item + "</div>";
                        }
                    });
                    $("#paneljsyb .form-inline .sel1-top .sel1-show span").append(firstPlanName);
                    $("#paneljsyb .form-inline .sel1 .sel1-block").append(html_planName);

                    planNo = firstPlanName.split("_")[0];

                    //查询第一个方案
                    that.getRainPlan(_range, "1", planNo);
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败");
            }

        });

    },
    /**
     * 查询降水方案并制图
     **/
    getRainPlan: function(_range, _mode, _planNo){
        
        var that = this;

        //初始化参数
        that.arr_rain_data = new Array();

        var objData = {
            range: _range,
            mode: _mode,
            downno: _planNo,
            userId: $("#_hid_userid").val()
        };
        var info = JSON.stringify(objData);

        //等待框
        if (_mode == "1") {
            tools.showChartLoading(that.chartGcx);
        }

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType: 'json',
            url: "panelNew.aspx/get_DayPDisPatch_Info",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;

                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("获取方案名称失败！");
                    return;
                }

                var json = JSON.parse(data.d);
                //json_data = json;
                if (_mode == "1") {
                    if (json.data.length == 0) {
                        tools.loadinghide(false);
                        tools.show_message_error("暂无降水方案！");
                        return;
                    }
                };
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error(json.msg);
                } else {
                    if (_mode == "1") {//查询指定方案
                        //解析数据
                        var max_rainReport = panelRainReportConfig.MIN_NUM;
                        $.each(json.data, function (index, item) {
                            max_rainReport = Math.max(Number(item), max_rainReport);
                            that.arr_rain_data.push({ value: [index, item] });
                        })
                        if (that.arr_rain_data == null || that.arr_rain_data.length == 0)
                            return;

                        //获取最大雨量
                        var axis_rain_max = max_rainReport > 0 ? Math.ceil((max_rainReport * (1 + panelRainReportConfig.MAX_DEPART))) : 1;

                        //初始化图表
                        var option = {};
                        option = that.get_option_gcx_for_rainReport(axis_rain_max);

                        // 使用刚指定的配置项和数据显示图表。
                        option = tools.initChartlegendIcon(option);
                        //that.add_click_gcx_comon();
                        that.chartGcx.setOption(option, true);

                        tools.hideChartLoading(that.chartGcx);
                    } else {//存储选用的方案

                        tools.show_message_success(json.msg);
                    }
                    
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询信息失败");
            }

        });
    },

    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize) {
        var that = this;
        
        $("#paneljsyb .tjfx-table-data_rain").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "height": "auto",
            "margin-bottom": "10px"
        });
        
        $(this.parentId).width(width).height(height);
        var rainTableHeight = parseInt($('#paneljsyb .tjfx-table-data_rain').get(0).offsetHeight);
        //过程线
        $("#proLineBody-Jsyb").css("margin-top", 5);
        $("#proLineBody-Jsyb").width(width - 20).height(height - rainTableHeight - 40 - 50);
        $("#proLineBody-Jsyb").children().width(width - 20).height(height - rainTableHeight - 40 - 20 - 50);
        $("#proLineBody-Jsyb").children().children().width(width - 20).height(height - rainTableHeight - 40 - 20 - 50);
        if (isResize) {
            this.chartGcx.resize();
        }
    },
    /**
     * 降水方案制图
     **/
    get_option_gcx_for_rainReport: function (axis_rain_max) {
        var that = this;
        var option = {
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
                        color: panelRainReportConfig.ECHART_COLOR_AXIS_X
                    }
                },
                maxInterval: 1,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    alignWithLabel: true
                },
                boundaryGap:true
            },
            yAxis: [{
                type: 'value',
                name: '雨量(mm)',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 10]
                },
                position: 'left',
                min: 0,
                max: axis_rain_max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelRainReportConfig.ECHART_COLOR_RAIN
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
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            series: [{
                name: '雨量',
                type: 'bar',
                yAxisIndex: 0,
                itemStyle: {
                    color: panelRainReportConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelRainReportConfig.ECHART_COLOR_SHADOW,
                    shadowBlur: 3
                },
                barWidth: "80%",
                barMaxWidth: 13,
                data: that.arr_rain_data
            }],
            backgroundColor: panelRainReportConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    
    
};
//数值修改事件
function modifyRainValue(obj) {
    var that = this;
    var value = obj.value;
    if (value == "" || value == null) {
        $(obj).val(0);
    }
    var tdArr = new Array();
    var sumArr1 = new Array();
    var sumArr2 = new Array();
    var sum_value1 = 0;
    var sum_value2 = 0;

    $(obj).parent().parent().children('td').each(function (i) {
        if ($(this).text() == "" || $(this).text() == null) {
            tdArr.push($(this).children().val());
        }
    })

    for (var i = 0; i < tdArr.length - 1; i++) {
        var valueSplit = tdArr[i].split('-');
        if (valueSplit[0] == "" || valueSplit[0] == null) {
            valueSplit[0] = 0;
        }
        sumArr1.push(valueSplit[0]);
        if (valueSplit[1] == "" || valueSplit[1] == null) {
            valueSplit[1] = 0;
        }
        sumArr2.push(valueSplit[1]);
    }
    for (var i = 0; i < sumArr1.length; i++) {
        sum_value1 += parseInt(sumArr1[i]);
    }
    for (var i = 0; i < sumArr2.length; i++) {
        sum_value2 += parseInt(sumArr2[i]);
    }

    var modify_value = sum_value1 + "-" + sum_value2;
    $(obj).parent().parent().children().last().children().val(modify_value);

    modifyValueRain_yss = true;
}