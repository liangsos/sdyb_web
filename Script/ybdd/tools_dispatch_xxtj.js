/**
 * Tools_Dispatch_XXTJ类-用于展示调度后行蓄洪区统计表
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 日志:2019-04-12 HZX新增
 *     2019-04-16 该类暂时不用，蓄洪区统计表在tools_panel中已有体现 upd HZX
 */
var Tools_Dispatch_XXTJ = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Dispatch_XXTJ.prototype = {
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelDdTj_XX",
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

    //////基本信息使用参数//////
    //是否初始化
    is_show_jbxx: false,

    //////水位过程线使用参数//////
    //是否初始化
    is_show_gcx: false,
    //极值水位（警戒、保证、汛限）
    obj_fcch_gcx: null,
    //极大极小数据
    obj_minMax_gcx: null,
    //数据源
    obj_data_gcx: null,

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        if (dispatchConfig.panel_default_height > $(document).height()) {
            dispatchConfig.panel_default_height = $(document).height();
        }
        that.setPanelSize(dispatchConfig.panel_default_width, dispatchConfig.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBodyXX")[0]);
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
                    "margin-left": "-" + dispatchConfig.panel_default_width / 2 + "px",
                    "margin-top": "-" + dispatchConfig.panel_default_height / 2 + "px"
                });
                that.panel_actual_width = dispatchConfig.panel_default_width;
                that.panel_actual_height = dispatchConfig.panel_default_height;
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
                that.panel_actual_width = $(document).width();
                that.panel_actual_height = $(document).height();
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
            //echarts清空数据
            that.chartGcx.clear();

            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

        /**
         * TAB切换事件- 手动处理避免显示延迟
         **/
        $(that.parentId + " .nav a").click(function (e) {
            if ($(this).parent('li').hasClass('active'))
                return;

            //改变标题栏
            $(this).parent('li').siblings('.active:last').removeClass("active");
            $(this).parent('li').addClass("active");

            //获取当前元素ID
            var id = $(this).attr("_data");
            $(id).siblings('.active:last').removeClass("in active");
            $(id).addClass("in active");
        });

        /**
         * 基本信息TAB点击事件
         **/
        $("#linkStationInfoXX").click(function () {
            if (!that.is_show_jbxx) {
                that.create_table_jbxx();
                that.is_show_jbxx = true;
            }
        });

        /**
         * 过程线TAB点击事件
         **/
        $("#linkProLineXX").click(function () {
            if (!that.is_show_gcx) {
                that.echart_line_gcx(that.show_btime, that.show_etime);
                that.is_show_gcx = true;
                that.add_click_gcx_comon();
            }
        });

        /**
         * 过程线-表格缩放按钮
         **/
        $('#contProLineXX .icon-resize-left').click(function () {
            $(this).parent().prev().toggle();
            if (parseInt($(this).parent().next().css("margin-right")) == 25) {
                $(this).parent().next().animate({"margin-right": 425}, 1000);
                $("#proLineBodyXX").width(that.panel_actual_width - 20 - 425);
            } else {
                $(this).parent().next().animate({"margin-right": 25}, 1000);
                $("#proLineBodyXX").width(that.panel_actual_width - 20 - 25);
            }

            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }
        });

        //统计表点击事件
        $(this.parentId + " .tableDdXX").on("click", ".link-stcd", function () {
            that.is_show_jbxx = false;
            that.is_show_gcx = false;
            that.show_stcd = $(this).attr("_stcd");
            that.show_stnm = $(this).attr("_stnm");
            that.show_sttp = "XX";//$(this).attr("_sttp");
            $(this).addClass("hover").siblings().removeClass("hover");

            //当前标签页内容更新
            $("#panelDdTj_XX .nav-modal li.active a:eq(0)").click();
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
     * 展示面板
     * _stcd站码 _stnm站名 _time截止时间 _sttp站类 _btime开始时间
     **/
    panelShow: function (_stcd, _stnm, _sttp, _stime, _etime) {
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
        that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        that.show_sttp = _sttp;
        that.show_btime = _stime;
        that.show_etime = _etime;

        that.panel_actual_width = dispatchConfig.panel_default_width;
        that.panel_actual_height = dispatchConfig.panel_default_height;

        //过程线显示内容控制
        $("#contProLineXX .sidebar-right,#contProLineXX .sidebar-control-right").hide();
        $(that.parentId).find(".panel-header").css({
            "text-align": "center"
        });
        $(that.parentId).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + that.panel_actual_width / 2 + "px",
            "margin-top": "-" + that.panel_actual_height / 2 + "px"
        });

        //查询统计表
        that.create_table_ddtj();
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
        //标题
        $(that.parentId).find(".modal-title").html(searchRangeName + "行蓄洪区调度特征统计表");
        //展示面板
        $(that.parentId).show();

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: dispatchConfig.panel_default_height,
            minWidth: dispatchConfig.panel_default_width,
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
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize) {
        var that = this;
        $(this.parentId).width(width).height(height);
        //获取真实宽度
        var _width = width - 20;
        var _height = height - 32 - 15;
        var tableHeight = 240;
        //基本信息
        $(this.parentId).find(".table-jbxx").width(_width - 2);
        $(this.parentId).find(".table-jbxx").parent().height(_height - tableHeight - 2);

        //头部表格高度240
        _height = _height - tableHeight;
        $(this.parentId + " .tableDdXX").parent().height(tableHeight - 33 - 33 - 10);
        $(this.parentId + " .ddtj-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });
        //过程线
        $("#proLineBodyXX").width(_width).height(_height);
        if (isResize) {
            this.chartGcx.resize();
        }
    },

    /**
     * 生成调度特征统计表格
     */
    create_table_ddtj: function (json) {
        var that = this;
        $("#span_loading").html("查询行蓄洪区统计信息中...");
        $(".loading-layer").show();

        //先清空数据
        $(that.parentId + " .tableDdXX tbody tr").remove();
       

              var objData_dd = {
            adjust: 1,
            forecastModel: "MGE2",
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: getRadioModel(),
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: Number(searchPlan),
            range: Number(searchRange),
            schedulePlanName: that.planId_dd,
            scheduleType: 1,
            startTime: searchStime,
            stcd: ""
        };
        var info =   JSON.stringify(objData_dd);
        var url =  apiUrl + "PreSchedule/GetDisPatchInfoTj";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: url,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            data: info,
            success: function (json) {
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error("获取行蓄洪区特征值统计信息失败");

                } else {
                    //预报统计后查询单站
                    tools.loadinghide(false);
                    $("#linkProLineXX").click();
                    //解析数据
                    var jsonTj = JSON.parse(res);
                    var _html_xx = "";
                    var existIndex = 0;
                    var existCount = 0;
                    $.each(jsonTj.dataXx, function (i, item) {
                        item.STime = item.STime == "" ? "" : moment(item.STime).format("YYYY-MM-DD HH:mm");
                        item.ETime = item.ETime == "" ? "" : moment(item.ETime).format("YYYY-MM-DD HH:mm");
                        item.MaxFq = item.MaxFq == "0" ? "" : item.MaxFq;
                        item.MaxFqTm = item.MaxFqTm == "" ? "" : moment(item.MaxFqTm).format("YYYY-MM-DD HH:mm");

                        _html_xx += "<tr class='link-stcd' _stcd='" + item.Stcd + "' _stnm='" + item.Stnm + "' _sttp='" + item.Sttp + "'><td>" + item.Stnm + "</td><td>" + item.STime + "</td><td>" + item.ETime + "</td><td>" + item.TFw + "</td><td>" + item.MaxFq + "</td><td>" + item.MaxFqTm + "</td></tr>";
                        if (item.Stcd == that.show_stcd) {
                            existIndex = i;
                            existCount = jsonTj.dataXx.length;
                        }
                    });
                    $(that.parentId + " .tableDdXX tbody").append(_html_xx);

                    //自动定位
                    var $list = $(that.parentId + " .tableDdXX").parent()[0];
                    $(that.parentId + " .tableDdXX tr:eq(" + existIndex + ")").addClass("hover");

                    try {
                        if ($list.scrollHeight <= $list.clientHeight || existType == "")
                            return;
                        //第一页
                        if (parseInt($list.clientHeight / 33) >= existIndex) {
                            $($list).scrollTop(0);
                        } else if (existIndex > (existCount - parseInt($list.clientHeight / 33))) {
                            //末页
                            $($list).scrollTop($list.scrollHeight - $list.clientHeight);
                        } else {
                            $($list).scrollTop((existIndex + 1) * 33 - $list.clientHeight);
                        }
                    } catch (e) {
                    }

                }
            }
        });

 
    },
    /**
     * 基本信息
     */
    create_table_jbxx: function () {
        var that = this;
        //先清空表格
        $("#contStatinInfoXX .table-jbxx tr").remove();
        var objData = {
            stcd: that.show_stcd,
            stime: searchStime,
            etime: searchEtime
        };
        var info = JSON.stringify(objData);
        var fun = ((that.show_sttp == "RR") || (that.show_sttp == "HP")) ? "getRsvrStnInfo" : (((that.show_sttp == "DD") || (that.show_sttp == "ZZ")) ? "getRiverStnInfo" : "")
        if (fun == "")
            return;

        //获取数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-stnbasic/" + fun,
            data: info,
            success: function (data) {
                var res = data;
                if (res == "") {
                    tools.show_message_error("获取基本信息失败!");
                    return;
                }
                var json_res = res;
                if (json_res.code !== "0") {
                    tools.show_message_error("获取基本信息失败!");
                    return;
                }
                var arr_name = json_res.data[0];
                var arr_value = json_res.data[1];
                var html_empty = new StringBuffer();
                var len = arr_name.length;

                var _html = "<tr><th colspan='4' style='font-weight:bold;'>基本信息</th></tr>";
                //基本信息
                for (var i = 0; i < len; i++) {
                    if (len == (i + 1)) {
                        _html += "<tr><th>" + arr_name[i] + "</th><td>" + arr_value[i] + "</td><th></th><td></td></tr>";
                    } else {
                        _html += "<tr><th>" + arr_name[i] + "</th><td>" + arr_value[i] + "</td><th>" + arr_name[i + 1] + "</th><td>" + arr_value[i + 1] + "</td></tr>";
                    }
                    i++;
                }

                //调度规则
                _html += "<tr><th colspan='4' style='font-weight:bold;'>调度规则</th></tr>";
                _html += "<tr><td colspan='4'>" + ""+ "</td></tr>";

                $("#contStatinInfoXX .table-jbxx").append(_html);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取基本信息失败!");
                return;
            }
        });
    },
    /**
     * 过程线
     */
    echart_line_gcx: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_minMax_gcx = {
            ll: {min: dispatchConfig.MAX_NUM, max: dispatchConfig.MIN_NUM}
        };
        that.obj_data_gcx = {
            ll: new Array(),
            ddll: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartGcx);
        var objData_dd = {
           
        };
        var info = that.show_type == "2" ? JSON.stringify(objData_yb) : JSON.stringify(objData_dd);
        var url = that.show_type == "2" ? apiUrl + "Forecast/GetForInfoStatis" : apiUrl + "PreSchedule/GetDisPatchInfoTj";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: url,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            data: info,
            success: function (json) {
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error(that.show_type == "2" ? "获取预报特征值统计信息失败" : "获取调度后特征值统计信息失败");

                } else {
                    //判断数据是否查询成功

                    if (that.show_type == "2") {
                        that.ybTj_Flag = range + moment(stime).format("YYYYMMDDHHmm") + moment(etime).format("YYYYMMDDHHmm") + plan + day;
                        that.ybTj_Data = res;
                    } else {
                        that.ddTj_Flag = range + moment(stime).format("YYYYMMDDHHmm") + moment(etime).format("YYYYMMDDHHmm") + plan + day;
                        that.ddTj_Data = res;
                    }

                    callBack();
                    $(that.parentId).show();
                    tools.loadinghide(true);

                }
            }
        });
        var objData_dd = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            hisStormId: _hisStormId,
            model: getRadioModel(),
            plan: Number(searchPlan),
            plusType: _plusType,
            rainPlus: _rainPlus,
            range: Number(searchRange),
            rsvrMode: Number($('input[type=radio][name=rd_gzdd_param]:checked').val()),
            schedulePlanName: that.planId_dd,
            scheduleType: default_scheduleType,
            startTime: searchStime,
            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData_dd);
        var url = apiUrl_cloud + "api-realsituate/GetGcxDisPatch";
        var data = "";
        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: url,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            data: info,
            success: function (res) {
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询行蓄洪区过程线失败!");
                    return;
                }

                if (res.code == "0") {
                    tools.show_message_error(res.msg);
                    return;
                }


                json = res.data;

                //解析数据
                $.each(json.data, function (index, item) {
                    //流量
                    if (item.Q != "" && item.Q != "0") {
                        that.obj_data_gcx.ll.push({value: [item.TM, item.Q]});
                        that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                    }
                });

                var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                var axis_ll_min = arrLl[1];
                axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                var axis_ll_max = arrLl[0];
                //获取时间轴刻度
                var _minTime = "";
                var _maxTime = "";
                if (json.data != null && json.data.length > 0) {
                    _minTime = json.data[0].TM;
                    _maxTime = json.data[json.data.length - 1].TM;
                }
                var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
                //获取时间轴格式化字符串
                var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

                //初始化图表
                var option = that.get_option_gcx_xx(axis_ll_max, axis_ll_min, intervalX, strFormatX);

                // 使用刚指定的配置项和数据显示图表。
                that.chartGcx.setOption(option, true);
                tools.hideChartLoading(that.chartGcx);
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询行蓄洪区过程线失败!");
            }
        });
    },

    /**
     * 水位过程线参数-行蓄洪区
     **/
    get_option_gcx_xx: function (axis_ll_max, axis_ll_min, intervalX) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + "流量过程线",
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
                padding: [8, 10, 8, 80],
                data: ["分洪流量"]
            },
            grid: {
                left: 5,
                top: 45,
                right: 15,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_AXIS_X
                    }
                },
                interval: intervalX,
                maxInterval: intervalX,
                minInterval: intervalX,
                axisLabel: {
                    color: "#000000",
                    formatter: function (value, index) {
                        return moment(value).format("DD日HH时");
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [dispatchConfig.ECHART_COLOR_GRID]
                    }
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
                        color: dispatchConfig.ECHART_COLOR_LL
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_ll(value);
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                }
            },
            series: [{
                name: "分洪流量",
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ll
            }],
            backgroundColor: dispatchConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 获取最大最小值（水位）
     **/
    get_sw_max_min: function (axis_sw_max_temp, axis_sw_min_temp) {
        var that = this;
        var axis_sw_min = dispatchConfig.MAX_NUM;
        var axis_sw_max = dispatchConfig.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * dispatchConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * dispatchConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == dispatchConfig.MAX_NUM) {
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
        var axis_ll_min = dispatchConfig.MAX_NUM;
        var axis_ll_max = dispatchConfig.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * dispatchConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * dispatchConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == dispatchConfig.MAX_NUM) {
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
     * 获取时间轴刻度
     **/
    get_axis_interval: function (minTime, maxTime, chartWidth) {
        if (minTime == "" || maxTime == "")
            return 99999999;

        var chartWidth = chartWidth - 80;
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
};