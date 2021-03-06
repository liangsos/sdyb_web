/**
 * 面板配置文件
 */
var dispatchConfig = {
    //面板默认宽度
    panel_default_width: 1250,
    //面板默认高度
    panel_default_height: 650,
    MIN_NUM: -99999,
    MAX_NUM: 99999,
    //最小值百分比
    MIN_DEPART: 0.2,
    //最大值百分比
    MAX_DEPART: 0.2,

    //***************颜色相关参数*********************//
    //图表背景色
    // ECHART_COLOR_BACKGROUND: "#FFFFFF",
    ECHART_COLOR_BACKGROUND:"rgb(24,24,38)",
    //X轴
    ECHART_COLOR_AXIS_X: "#838486",
    //legend
    ECHART_COLOR_LEGEND: "#ffffff",
    //水位
    ECHART_COLOR_SW: "#8ECEF5",
    //调度水位
    ECHART_COLOR_SW_DD: "#0000FF",
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
    ECHART_COLOR_LL_DNTQ: "#FFBE31",
    //蓄量
    ECHART_COLOR_XL: "#039C93",
    //警戒水位
    ECHART_COLOR_JJSW: "#0000FF",
    //保证水位
    ECHART_COLOR_BZSW: "#FF0000",
    //分洪后水位
    ECHART_COLOR_FHHSW:"#09C7F7",
    //汛限水位
    ECHART_COLOR_XXSW: "#07D79B",
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
    //校核水位
    ECHART_COLOR_JHSW:"#FF00FF",
    //正常高水位
    ECHART_COLOR_ZCSW:"#006400",
    //历史最高
    ECHART_COLOR_LSZG:"#000000",
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
    // 蓄水量渐变
    ECHART_COLOR_LINESTYLE_XSL1: "#47F3DF",
    ECHART_COLOR_LINESTYLE_XSL2: "#457BFF",
    //流量渐变
    ECHART_COLOR_LINESTYLE_LL1: "#FFB332",
    ECHART_COLOR_LINESTYLE_LL2: "#FF890A",
    //累计雨量渐变
    ECHART_COLOR_LINESTYLE_SUM1: "#FFB332",
    ECHART_COLOR_LINESTYLE_SUM2: "#FF890A",
    //时雨量渐变
    ECHART_COLOR_LINESTYLE_SSXL1: "#46FFFC",
    ECHART_COLOR_LINESTYLE_SSXL2: "#006CB9",
    //实时水位渐变
    ECHART_COLOR_LINESTYLE_SSSW1: "#AFEFFF",
    ECHART_COLOR_LINESTYLE_SSSW2: "#77B5FF",
    ECHART_COLOR_LINESTYLE_SSSW3: "#07D79B",
    //兴利水位
    ECHART_COLOR_LINESTYLE_XLSW: "#01B0FF",
    //设计水位
    ECHART_COLOR_LINESTYLE_SJSW: "#6D79FA",
    //汛限水位
    ECHART_COLOR_LINESTYLE_XXSW: "#FFBE31",
    //断面信息
    ECHART_COLOR_LINESTYLE_DMXX1: "#00C5AB",
    ECHART_COLOR_LINESTYLE_DMXX2: "#00B4B9",
    lineObj(linear1, linear2) {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
                offset: 0, color: linear1 // 0% 处的颜色
            }, {
                offset: 1, color: linear2 // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        }
    },
};

/**
 * Tools_Dispatch类-用于展示调度面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 日志:2019-03-27 HZX新增
 *      2019-10-12 CHL树状菜单功能优化
 */
var Tools_Dispatch = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Dispatch.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelDd",
    //展示类型 1实况 2预报 3调度方案对比
    show_type: "1",
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
    //面板实际宽度
    panel_actual_width: 0,
    //面板实际高度
    panel_actual_height: 0,
    //上次调用面板时间
    call_time: null,
    //echarts实例-过程线
    chartGcx: null,
    //echarts实例-ZV曲线
    chartZV: null,
    //echarts实例-ZQ曲线
    chartZQ: null,

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
    //现状、规则、人工调度
    obj_search_gcx: { xz: false, gz: false, rg: false, data: "" },

    obj_last_data:null,
    //分洪后水位
    obj_data_gcx_fhhswName: "",
    //分洪后流量
    obj_data_gcx_fhhllName: "",

    //ZV曲线
    is_show_zv: false,
    //数据源
    arr_zv_data: new Array(),
    //表格
    datatables_zv: null,

    //ZQ曲线
    is_show_zq: false,
    //数据源
    arr_zq_data: new Array(),
    //表格
    datatables_zq: null,

    dispatchSuggest_data: null,
    dispatchSuggest_model: "",

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        that.setPanelSize(dispatchConfig.panel_default_width, dispatchConfig.panel_default_height, false);
        //时间初始化
        tools.init_datapicker_top(that.parentId + " .form-date", "yyyy-mm-dd", 2);
        tools.init_select_hour(that.parentId + " .select-hour");
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineDd")[0]);
        //echarts实例-ZV曲线
        that.chartZV = echarts.init($("#zvChartBodyDd")[0]);
        //echarts实例-ZV曲线
        that.chartZQ = echarts.init($("#zqChartBody")[0]);
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
            if ($(event.target).hasClass("icon-close") || $(event.target).hasClass("show_rule"))
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
                that.panel_actual_height = dispatchConfig.panel_default_height == 0 ? 650 : dispatchConfig.panel_default_height;
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
            that.is_show_zv = false;
            that.is_show_zq = false;
            that.obj_search_gcx = {xz: false, gz: false, rg: false, data: ""};

            //echarts清空数据
            that.chartGcx.clear();
            that.chartZV.clear();
            that.chartZQ.clear();

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
        $("#linkDd_Base").click(function () {
            if (!that.is_show_jbxx) {
                if (that.show_stcd != "99990001")
                {
                    $("#jbxx_table_show").show();
                    $("#jbxx_pdf_show").hide();
                    that.create_table_jbxx();

                }
                else {
                    $("#jbxx_table_show").hide();
                    $("#jbxx_pdf_show").show();
                }

                that.is_show_jbxx = true;
            }
        });

        /**
         * 历史运用TAB点击事件
         **/
        $("#linkUseInfo").click(function () {
            that.createUseInfoTable();
        });

        /**
       * 过程线-表格缩放按钮
       **/
        $('#contDd .icon-resize-left').click(function () {
            var marRight;
            var _m_right = (that.show_stcd == "50401100" ? 526 : 626);
            var default_width = _m_right+25;
            if (that.show_sttp == "HP") {
                if (that.show_stcd == "51107801") {
                    default_width = _m_right + 25-100;
                }
                else
                    default_width = _m_right + 25-140;
            }

            var state = 0;
            var isneedannimotion = false;
            var margin_right = parseInt($(this).parent().next().css("margin-right")); //next 表格，pre过程线
            that.modifyFormInline(that.panel_actual_width);
            //右缩进
            if ($(this).hasClass("iconRight")) {
                if (margin_right <= 25)
                    return;

                if (margin_right == (that.panel_actual_width - 20 - 200)) {
                        marRight = default_width;
                } else {
                    marRight = 25;
                }
            } else {
                //左缩进
                if (margin_right >= (that.panel_actual_width - 20 - 200))
                    return;

                if (parseInt($(this).parent().next().css("margin-right")) == 25) {
                    marRight = default_width;
                } else {
                    marRight = (that.panel_actual_width - 20   - 200);
                }
            }
            if (marRight == 25) {
                $(this).parent().prev().hide();
                $(this).parent().prev().width(0);
                $(this).parent().next().width(that.panel_actual_width - 200 - 25 - 2 - 20);
                $("#proLineDd").hide();
            } else if (marRight == (that.panel_actual_width - 20  - 200)) {

                $("#proLineDd").show();
                $(this).parent().prev().show();
                $("#proLineDd").width(that.panel_actual_width - 200 - 25 - 2 - 20);
                $(this).parent().prev().width(that.panel_actual_width - 200 - 25 - 2 - 20);
                $(this).parent().next().width(0);
                $("#contDd .sider-left").hide();
            } else {


                $(this).parent().next().show();
                $("#proLineDd").show();
                $(this).parent().prev().show();

                $("#proLineDd").width(marRight- 25 - 2);
                $(this).parent().prev().width(marRight - 25 - 2);
                $(this).parent().next().width(that.panel_actual_width - 20 - 200 - marRight - 2);


            }
            var w_left = $(this).parent().next().width();
            var w_right = $(this).parent().prev().width() + 2;

            $("#contDd").width(w_left + 25 + w_right); //2019-10-08 modify by chl
            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }
             $(this).parent().next().animate({ "margin-right": marRight }, 500);
           /* $(".ybtj-table-header th").css( "white-space","nowrap");
                $(this).parent().next().animate({ "margin-right": marRight }, {
                    duration: 500,
                    step: function (now, fx) {

                           //  $("#contProLine").width($(this).parent().prev().width() + 2 + 25 + $("#proLineDd").width());

                        if ((now == 25) && (fx.end == 25)) {
                            $(this).prev().prev().hide();
                            $(this).prev().prev().width(0);
                            $(this).prev().next().width(that.panel_actual_width - 200 - 25 - 2 - 20);
                            $("#proLineDd").hide();
                        }
                        else if ((now == that.panel_actual_width - 20 - 200) && (fx.end == that.panel_actual_width - 20 - 200)) {
                            $(this).hide();
                            $("#proLineDd").width(now - 25 - 2);
                            $(this).prev().prev().width(now - 25 - 2);
                            $(this).prev().next().width(0);

                        }
                        else if ((now == default_width) && (fx.end == default_width)) {

                            $("#proLineDd").width(now - 25 - 2);
                            $(this).prev().prev().width(now - 25 - 2);
                            $(this).prev().next().width(that.panel_actual_width - 20 - 200 - marRight-2);

                        }


                        if (now == fx.end) {

                            $(".ybtj-table-header th").css("white-space", "normal");
                        }
                        if (that.chartGcx != null) {
                            that.chartGcx.resize();
                        }


                    }
            });  */
        });
        /**
         * 调度界面
         **/
        $("#linkDd").click(function () {
            if (!that.is_show_gcx) {
                that.echart_line_dd(that.show_btime, that.show_etime, "0");
                that.add_click_gcx();
              //  that.add_click_gcx_comon();
                that.is_show_gcx = true;

            }
        });
        //调度计算按钮
        $("#btnDd").click(function () {
            var val = $('input:radio[name=radioRole]:checked').val();
            if (val == "1") {
                that.obj_search_gcx.xz = true;
            } else if (val == "2") {
                that.obj_search_gcx.gz = true;
            }
            that.echart_line_dd(that.show_btime, that.show_etime, "1");
            if (val == "3") {
                //成果表格相关input标签可编辑
                $("#contDd .tableDd .edit_input_nohis input").removeAttr("readonly");
            }
        });

        $("#btnDdParams").click(function () {
            show_dd_rule(that.show_stcd);
        });

        $("#fangan_allreday").change(function () {

            if(Number($(this).val())>-1){
                var objData = {
                    stcd: that.show_stcd,
                    stime: that.show_btime,
                    etime: that.show_etime,
                    dbfxddfa: $("#fangan_allreday").find("option:selected").text(),
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
                    url: apiUrl_cbh + "get_Same_KzStationXxhq",
                    data: info,

                    success: function (data) {
                        if (data == null || data == "") {
                            tools.show_message_error("获取信息失败!");
                            return;
                        }
                        var json = data;
                        if (json.code == "0") {
                            tools.show_message_error(json.msg);
                            return;
                        } else {
                            that.changeTableValue(json);
                            return;
                        }
                    },
                    error: function (errorMsg) {
                        tools.show_message_error("获取信息失败!");

                    }

                });
            }


        });

        //调度规则改变事件
        $('input[type=radio][name=radioRole]').change(function () {
            var val = $('input:radio[name=radioRole]:checked').val();
            var jhHeight = 0;
            that.echart_line_dd(that.show_btime, that.show_etime, "0");
            if (val == "1" || val == "2") {
                $("#contDd .ddEach").hide();
                that.hideFhParams();
                //成果表格相关input标签不可编辑
                $("#contDd .tableDd .edit_input_nohis input").attr("readonly", "readonly");
            } else {
                //人机交互
                //jhHeight = 66;
                //$("#contDd .ddEach").show();
                //成果表格相关input标签可编辑
                $("#contDd .tableDd .edit_input_nohis input").removeAttr("readonly");
                if (that.show_sttp == "XX")
                    that.showFhParams();
            }

            //改变表格和图表高度
            var _height = $(that.parentId).height() - 32 - 33 - 15;
            var tjHeight = 105;
          /*  if (that.show_sttp == "HP") {
                tjHeight = 170;
            }
            */

            if ((that.show_stcd == "51101101") || (that.show_stcd == "51112710") || (that.show_stcd == "51112711") || (that.show_stcd == "51105811") || (that.show_stcd == "51111911") || (that.show_stcd == "51101201")) {
                $("#proLineDd").height(_height - 90 - tjHeight - jhHeight);
                that.chartGcx.resize();
                $("#contDd .sider-left").height(_height - 90 - tjHeight - jhHeight);
                $("#contDd .sider-right").height(_height - 90 - tjHeight - jhHeight);
                $("#contDd .tableDd").parent().height(_height - 90 - tjHeight - 33 - jhHeight);

            }
            else {
                $("#proLineDd").height(_height - 52 - tjHeight - jhHeight);
                that.chartGcx.resize();
                $("#contDd .sider-left").height(_height - 52 - tjHeight - jhHeight);
                $("#contDd .sider-right").height(_height - 52 - tjHeight - jhHeight);
                $("#contDd .tableDd").parent().height(_height - 52 - tjHeight - 33 - jhHeight);

                //add by chl 20191028
                var tableHeight = $("#contDd .table_ddtj").height();
                $("#proLineDd").height(_height - 52 - 33 - jhHeight - tableHeight);
                $("#contDd .ybtj-table-body").height(_height - 52 - 33 - jhHeight - tableHeight-30);
                $("#contDd .sider-right").height(_height - 52 - 33 - jhHeight - tableHeight);
                $("#contDd .sider-left").height(_height - 52 - 33 - jhHeight - tableHeight);
                $("#contDd .div-main").height(_height - 52 - 33 - jhHeight - tableHeight);

            }

        });
        //人机交互修改按钮
        $("#btnJh").click(function () {
            that.change_table_jh();
        });
        //调度表格-可修改input内容改变事件
        that.change_table_jh_input();

        /**
         * ZV曲线
         **/
        $("#linkDd_ZV").click(function () {
            if (!that.is_show_zv) {
                //初始化数据表格
                if (that.datatables_zv != null) {
                    that.datatables_zv.clear();
                    that.datatables_zv.destroy();
                }
                if (that.show_sttp == "XX") {
                    $(that.parentId + " .tableZV thead tr").remove();
                    $(that.parentId + " .tableZV thead").append("<tr><th>水位</th><th>蓄量</th><th>水面面积</th></tr>");
                    //行蓄洪区调用新接口
                    //调用ZQ曲线
                    that.echart_line_zv_xx();
                    that.is_show_zv = true;
                }else{
                    $(that.parentId + " .tableZV thead tr").remove();
                    $(that.parentId + " .tableZV thead").append("<tr><th>水位</th><th>蓄水量</th><th>流量</th></tr>");
                    //调用ZQ曲线
                    that.echart_line_zv();
                    that.is_show_zv = true;
                }

            } else {
                if (that.datatables_zv != null && $("#contDd_ZV .dataTables_scrollHead .tableZV").width() <= 100) {
                    that.datatables_zv.columns.adjust();
                }
            }
            that.add_click_ZV();
        });

        /**
         * ZQ曲线
         **/
        $("#linkDd_ZQ").click(function () {
            if (!that.is_show_zq) {
                //初始化数据表格
                if (that.datatables_zq != null) {
                    that.datatables_zq.clear();
                    that.datatables_zq.destroy();
                }

                $(that.parentId + " .tableZQ thead tr").remove();
                $(that.parentId + " .tableZQ thead").append("<tr><th>水位</th><th>蓄水量</th><th>流量</th></tr>");

                //调用ZQ曲线
                that.echart_line_zq();
                that.is_show_zq = true;
            } else {
                if (that.datatables_zq != null && $("#contDd_ZQ .dataTables_scrollHead .tableZQ").width() <= 100) {
                    that.datatables_zq.columns.adjust();
                }
            }
            that.add_click_ZQ();
        });
    },
    changeTableValue: function (json) {
        var changecolIndex_arr = new Array();
        $.each(json.datanm, function (index, item) {
            var colName = item;
            $("#contDd .ybtj-table-header").find('th').each(function (thindex, thitem) { //遍历Table dgItem的th
                var headCaption = $(thitem).text();
                if (headCaption == colName) {
                    changecolIndex_arr.push(thindex);

                }

            });
        })


        for (var i = json.data.length - 1; i >= 0; i--) {
            $.each(changecolIndex_arr, function (index, item) {
                if (item>0)
                    $("#contDd .ybtj-table-body tbody").children().eq($("#contDd .ybtj-table-body").find("tr").length - (json.data.length - i)).children().eq(item).children().eq(0).val(Math.round (json.data[i][index],0));
                else
                    $("#contDd .ybtj-table-body tbody").children().eq($("#contDd .ybtj-table-body").find("tr").length - (json.data.length - i)).children().eq(item).html(json.data[i][index]);

            })
        }

    },
    showFhParams: function () {
        var that = this;
        $(".dd_rg_v0").show();
        var index=1;
        for (var i = 0; i < that.obj_data_gcx.arrTh.length; i++) {
            if (that.obj_data_gcx.arrTh[i].is_edit) {
                var name = that.obj_data_gcx.arrTh[i].name;
                $("#fhv_" + index).val(0);
                $("#fhv_" + index).on("input", function (e) {
                    tools.inputnum(e);
                });
                $("#fhv_" + index).on("blur", function (e) {
                 //   alert($("#"+e.target.id).prev().attr("data-name") + ":" + e.target.value);
                    that.adjustFh();
                });
                $(".dd_rg_v" + +index).eq(0).html("<span></span>&nbsp;" + name.replace("分洪流量", "").replace("控制工程", "") + ":&nbsp;").attr("data-name", name);
                $(".dd_rg_v" + +index).show();
                index++;
            }
        }
        that.initFangAnSelect_zdy();

    },
    hideFhParams: function () {
        for (var i = 0; i <= 5; i++) {
            $(".dd_rg_v" + i).hide();
            if (i != 0)
                $(".dd_rg_v" + +i).eq(0).html("<span></span>&nbsp;:&nbsp;").attr("data-name", "");
            $("#fhv_" + i).val(0);
            $("#fhv_" + i).off();
        }
        $(".hasfangan").hide();
    },
    adjustFh: function()
    {

        var that = this;
        var _floodDiversionW = {};
               for (var i = 1; i <= 5; i++) {
            if(!$(".dd_rg_v" + i).is(":hidden"))
            {
                _floodDiversionW[$("#fhv_" + i).prev().attr("data-name").replace("分洪流量", "")] = Number($("#fhv_" + i).val());
            }
        }
        var settings = {
            "url": apiUrl+"PreSchedule/GetDispatchVolToPro",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": getCookie("accessToken")
            },
            "data": JSON.stringify({
                "adjust":1,
                "endTime": searchEtime,
                "floodDiversionW":_floodDiversionW,
                "foreDays": Number(selectDays),
                "forecastModel":"MGE2",
                "model": getRadioModel(),
                "plan":Number(searchPlan),
                "range":Number(searchRange),
                "scheduleData":{"additionalProp1":[["string"]],"additionalProp2":[["string"]],"additionalProp3":[["string"]]},
                "schedulePlanName": that.planId_dd,
                "scheduleType":3,
                "startTime": searchStime,
                "plusType": _plusType,
                "rainPlus": _rainPlus,
                "hisStormId": _hisStormId,
                "stcd":that.show_stcd
            }),
        };

        $.ajax(settings).done(function (res) {
            if (res.code == "0") {
                tools.show_message_error( "设置分洪调度数据失败");
                return;

            }
            var newdata = that.obj_last_data;
            $.each(res.data.name, function (index, item) {
                var nameFlag = item + "分洪流量";
                var find_index = -1;
                var obj = that.obj_data_gcx.arrTh.find(x => x.name === nameFlag);
                if (obj != null)
                    find_index = obj.index;

                if (find_index > -1) {
                    var len = res.data.data[0].length;
                    var old_len = newdata.data.length;
                    var t_i = 0;
                    for (var i = len - 1; i >= 0; i--) {
                        //新的赋值
                        newdata.data[old_len -1- t_i][find_index] = res.data.data[index][i];
                        t_i++;
                    }

                }
            });
            that.init_param_dd();
            that.init_show_dd(newdata);
            //更新整个json数据重新初始化就行。。。
        }).fail(function(){
            tools.show_message_error( "设置分洪调度数据失败");

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
        _sttp = (_sttp == "ZZ" || _sttp == "ZQ") ? "ZZ" : _sttp;
        that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        that.show_sttp = _sttp;
        that.show_btime = _stime;
        that.show_etime = _etime;

        //2019-10-15 add by chl
        $("#panelDd .form-inline").css({
            "float": "left",
            "margin-left": 200 + "px"
        })

        //根据站类显示不同的内容
        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
            $(that.parentId).find(".modal-title").html("分洪河道调度过程-" + _stnm);
            $("#linkDd").parent().show();      //调度
            $("#linkDd_Base").parent().show(); //基本信息
            $("#linkDd_ZV").parent().hide();
            $("#linkDd_ZQ").parent().hide();

            //默认勾选
            $("#chkRole_XZ").parent().hide();
            $("#chkRole_GZ").prop("checked", true);

            $("#linkUseInfo").hide();
        } else if (that.show_sttp == "RR") {
            $(that.parentId).find(".modal-title").html("水库调度过程-" + _stnm);
            $("#linkDd").parent().show();      //调度
            $("#linkDd_Base").parent().show(); //基本信息
            $("#linkDd_ZV").parent().show();
            $("#linkDd_ZQ").parent().show();

            $("#chkRole_XZ").parent().show();
            if (that.show_type == "3") {
                $("#chkRole_GZ").prop("checked", true);
            }
            else {
                $("#chkRole_XZ").prop("checked", true);
            }

            $("#linkUseInfo").hide();

        } else if (that.show_sttp == "HP") {
            $(that.parentId).find(".modal-title").html("湖泊调度过程-" + _stnm);
            $("#linkDd").parent().show();      //调度
            $("#linkDd_Base").parent().show(); //基本信息
            $("#linkDd_ZV").parent().show();
            $("#linkDd_ZQ").parent().show();

            $("#chkRole_XZ").parent().show();
            if (that.show_type == "3") {
                $("#chkRole_GZ").prop("checked", true);
            }
            else {
                $("#chkRole_XZ").prop("checked", true);
            }

            $("#linkUseInfo").hide();

        } else if (that.show_sttp == "XX") {
            $(that.parentId).find(".modal-title").html("行蓄洪区调度过程-" + _stnm);
            $("#linkDd").parent().show();      //调度
            $("#linkDd_Base").parent().show(); //基本信息
            $("#linkDd_ZV").parent().show();
            $("#linkDd_ZQ").parent().hide();

            $("#chkRole_XZ").parent().hide();
            $("#chkRole_GZ").prop("checked", true);
            $("#linkUseInfo").show();

        }
        if ((that.show_sttp == "XX") || (that.show_sttp == "RR") || (that.show_sttp == "HP")|| (that.show_sttp == "DD")) {
            $("#btnDdParams").show();
        }
        else {
            $("#btnDdParams").hide();


        }
        //交互界面默认隐藏
        $("#contDd .ddEach").hide();
        $("#btn_ybsw-modify").hide();
        $("#btn_ybsw-save").hide();


        $(".sider-righ").show();
        $(".sider-left").show();
        //调度默认全屏
        // $(that.parentId).css({
        //     "top": "0px",
        //     "left": "0px",
        //     "margin-left": "0px",
        //     "margin-top": "0px"
        // });
        // $(that.parentId).find('.icon-max').attr("data-type", "max");
        // that.panel_actual_width = $(document).width();
        // that.panel_actual_height = $(document).height();
        // that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
        that.panel_actual_width = dispatchConfig.panel_default_width;
        that.panel_actual_height = dispatchConfig.panel_default_height;
       /* $(that.parentId).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + that.panel_actual_width / 2 + "px",
            "margin-top": "-" + that.panel_actual_height / 2 + "px"
        });
        */
        that.hideFhParams();
        //显示面板
        $(that.parentId).show();
        //默认显示调度
        $("#linkDd").click();
        that.panel_actual_width = panelConfig.panel_default_width;
        that.panel_actual_height = panelConfig.panel_default_height;
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

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
                that.panel_actual_height = ob.size.height;
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

    modifyFormInline: function (width) {
     /*   var that = this;


        if ($("#treeMenuDd").is(":visible")) {
            $(this.parentId).find(".form-inline").width(width - 200-20);
        }
        else {
            $(this.parentId).find(".form-inline").width(width);
        }
        */
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
   * 过程线图例点击事件(ZV)
   **/
    add_click_ZV: function () {
        var that = this;
        that.chartZV.off("legendselectchanged");
        that.chartZV.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartZV.getOption(), state, params.name);
                that.chartZV.setOption(option, true);
            }


        });

    },
    /**
   * 过程线图例点击事件(ZQ)
   **/
    add_click_ZQ: function () {
        var that = this;
        that.chartZQ.off("legendselectchanged");
        that.chartZQ.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartZQ.getOption(), state, params.name);
                that.chartZQ.setOption(option, true);
            }


        });

    },
    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize, isInit) {

        var that = this;
        $(this.parentId).width(width).height(height);
        that.modifyFormInline(width);

        //获取真实宽度
        var _width = width - 20;
        var _height = height - 32 - 33 - 15;   //主体部分高度
        $("#contDd").width(_width - 200);
        //调度过程数据+过程线各50%
        //统计高度
        var tjHeight = 105;
      /*  if (that.show_sttp == "HP") {
            tjHeight = 170;
        }*/
        //人工交互高度
        var rg_height = 0;
        //if (!$("#contDd .ddEach").is(':hidden')) {
        //    tjHeight += 66;
        //    rg_height = 68;
        //}
        var margin_right = (that.show_stcd == "50401100"?526:626);
        if ((that.show_stcd == "51101101") || (that.show_stcd == "51112710") || (that.show_stcd == "51112711") || (that.show_stcd == "51105811") || (that.show_stcd == "51111911") || (that.show_stcd == "51101201")) {
            $("#proLineDd").width(margin_right).height(_height - 90 - tjHeight);
            $("#contDd .sider-left").css("margin-right", margin_right + 25);
            $("#contDd .sider-right").width(margin_right).height(_height - 90 - tjHeight);
            $("#contDd .sider-left").height(_height - 90 - tjHeight);
            $("#contDd .tableDd").parent().height(_height - 90 - tjHeight - 33);
            $("#contDd .table_ddtj").height(100);
        }
        else {
            if (that.show_sttp == "HP") {
                var hp_width = margin_right-100;
                if (that.show_stcd == "51107801")
                {
                    hp_width = margin_right - 140;
                }
                $("#proLineDd").width(hp_width).height(_height - 52 - tjHeight);
                $("#contDd .sider-left").css("margin-right", hp_width + 25);
                $("#contDd .sider-left").height(_height - 52 - tjHeight);
                $("#contDd .sider-right").width(hp_width).height(_height - 52 - tjHeight);

            } else {
                $("#proLineDd").width(margin_right).height(_height - 52 - tjHeight);
                $("#contDd .sider-left").css("margin-right", margin_right + 25);
                $("#contDd .sider-left").height(_height - 52 - tjHeight);
                $("#contDd .sider-right").width(margin_right).height(_height - 52 - tjHeight);

            }
            $("#contDd .tableDd").parent().height(_height - 52 - tjHeight - 33);
           // $("#contDd .table_ddtj").height(50);
        }
        //add by chl 20191028
        var tableHeight = $("#contDd .table_ddtj").height() + rg_height;
        $("#proLineDd").height(_height - 52 - 33 - tableHeight);
        $("#contDd .ybtj-table-body").height(_height - 52 - 33 - tableHeight-30);
        $("#contDd .sider-right").height(_height - 52 - 33 - tableHeight);
        $("#contDd .sider-left").height(_height - 52 - 33 - tableHeight);
        $("#contDd .div-main").height(_height - 52 - 33 - tableHeight);

        $("#contDd .sider-left").css("width", "Auto");
        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (isInit) {
            $("#contDd .sider-left").show();
            $("#proLineDd").show();
            $("#contDd .sider-right").show();
        }
        else {
            //判断当前状态，是两个都有，还是单个
            var v_left = $("#contDd .sider-left").is(':visible');
            var v_right = $("#contDd .sider-right").is(':visible');
            if ((v_left) && (v_right)) {
                $("#contDd .sider-left").show();
                $("#proLineDd").show();
                $("#contDd .sider-right").show();
            }
            else if (v_left) {
                var _x_height = 52;
                if ((that.show_stcd == "51101101") || (that.show_stcd == "51112710") || (that.show_stcd == "51112711") || (that.show_stcd == "51105811") || (that.show_stcd == "51111911") || (that.show_stcd == "51101201")) {
                    _x_height = 90;
                }

                $("#proLineDd").width(0).height(_height - _x_height - tjHeight);
                $("#contDd .sider-left").css("margin-right", 25);
                $("#contDd .sider-left").height(_height - _x_height - tjHeight);
                $("#contDd .sider-right").width(0).height(_height - _x_height - tjHeight);
            }
            else if (v_right) {
                var _x_height = 52;
                if ((that.show_stcd == "51101101") || (that.show_stcd == "51112710") || (that.show_stcd == "51112711") || (that.show_stcd == "51105811") || (that.show_stcd == "51111911") || (that.show_stcd == "51101201")) {
                    _x_height = 90;
                }
                $("#proLineDd").width(that.panel_actual_width - 200 - 20 - 25 - 2).height(_height - _x_height - tjHeight);
                $("#contDd .sider-left").css("margin-right", that.panel_actual_width-200 - 20);
                $("#contDd .sider-left").height(_height - _x_height - tjHeight);
                $("#contDd .sider-right").width(that.panel_actual_width - 200- 20 - 25 - 2).height(_height - _x_height - tjHeight);
            }

        }

        $("#contDd .ybtj-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });
        if (isResize) {
            this.chartGcx.resize();
        }
        //基本信息
        $(this.parentId).find(".table-jbxx").width(_width - 2 - 200); //2019-10-012 modify by chl
        $(this.parentId).find(".table-jbxx").parent().height(_height - 2);
        //ZV曲线
        $("#contDd_ZV").height(_height);
        $("#zvChartBodyDd").width(_width - 260 - 200).height(_height); //2019-10-012 modify by chl
        if (isResize) {
            this.chartZV.resize();
        }
        //ZQ曲线
        $("#contDd_ZQ").height(_height);
        $("#zqChartBody").width(_width - 260 - 200).height(_height); //2019-10-012 modify by chl
        if (isResize) {
            this.chartZQ.resize();
        }

        //历史运用信息
        $(this.parentId).find(".table-lsyy").width(_width - 2 - 200); //2019-10-012 modify by chl
        $(this.parentId).find(".table-lsyy").parent().height(_height - 2);

        //改变表格高度
        if (isResize) {
            //调度过程
            $(this.parentId).find("#contDd .dataTables_scrollBody").css("max-height", (_height - 50 - 40) + "px");
            //ZV曲线
            $(this.parentId).find("#contDd_ZV .dataTables_scrollBody").css("max-height", (_height - 32) + "px");
            //ZQ曲线
            $(this.parentId).find("#contDd_ZQ .dataTables_scrollBody").css("max-height", (_height - 32) + "px");
        }
    },

    /**
     * 预报调度（数据+过程线）
     * ddjs计算flag 0仅展示 1计算
     */
    echart_line_dd: function (stime, etime, ddjs) {
        var that = this;

        //等待框
        tools.showChartLoading(that.chartGcx);

        var objData = {
            adjust: 1,
            data: null,
            dataName: null,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            hisStormId: _hisStormId,
            model:  getRadioModel(),
            plan: Number(searchPlan),
            plusType: _plusType,
            rainPlus: _rainPlus,
            range: Number(searchRange),
            rsvrMode: Number($('input[type=radio][name=rd_gzdd_param]:checked').val()),
            schedulePlanName: that.planId_dd,
            scheduleType: null,
            startTime: searchStime,
            stcd: that.show_stcd
        };
        var radio_id =$('input:radio[name=radioRole]:checked').length>0? $('input:radio[name=radioRole]:checked')[0].id:"chkRole_GZ";


        objData.scheduleType = radio_id == "chkRole_XZ" ? 1 : (radio_id == "chkRole_GZ" ? 2 : (radio_id == "chkRole_RG" ? 3 : null));
        objData.dataName = new Array();
        objData.dataName.push("日期");
        //人机交互拼接data
        if ($('input:radio[name=radioRole]:checked').val() == "3") {


            //表头
            var arrTitle = new Array();
            var arrIndex = new Array();
            for (var i = 0; i < that.obj_data_gcx.arrTh.length; i++) {
                if (i == 0) {
                    arrTitle.push(that.obj_data_gcx.arrTh[i].name);
                } else {
                    if (that.obj_data_gcx.arrTh[i].is_edit) {
                        arrTitle.push(that.obj_data_gcx.arrTh[i].name);
                        arrIndex.push(that.obj_data_gcx.arrTh[i].index);
                    }
                }
                if(that.obj_data_gcx.arrTh[i].name.indexOf("分洪流量")>-1)
                {
                    objData.dataName.push(that.obj_data_gcx.arrTh[i].name.replace("分洪流量", ""));
                }
            }

            //数据数组
            var arrData = new Array();
            var child = new Array();

            $("#contDd .tableDd").find("tr").each(function () {
                var tdArr = $(this).children();
                child = new Array();
                child.push(tdArr.eq(0).text());

                for (var i = 0; i < arrIndex.length; i++) {
                    child.push(tdArr.eq(arrIndex[i]).find('input').val());
                }
                arrData.push(child);
            });
            objData.data = arrData;
        }

        //初始化
        that.init_param_dd();

        var data = "";
        that.obj_last_data = null;
        var info = JSON.stringify(objData);
        var url = apiUrl_cloud + "api-realsituate/GetStcdDisPatch";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: false,
            url: url,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            data: info,
            success: function (res) {
                if (ddjs == "0")  //未调度前原始数据（供现状和规则之间切换展示）
                    that.obj_search_gcx.data = res.data;

                var json = res.data;;
                that.obj_last_data = res.data;

                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                    return;
                } else {
                    that.init_show_dd(json);
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error(ddjs == "0" ? "查询调度成果失败!" : "调度计算失败！");
            }
        });
    },
    /**
     * 预报调度初始化参数
     */
    init_param_dd: function () {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: dispatchConfig.MIN_NUM, bzsw: dispatchConfig.MIN_NUM,
            xxsw: dispatchConfig.MIN_NUM, sjsw: dispatchConfig.MIN_NUM, jhsw: dispatchConfig.MIN_NUM, zcsw: dispatchConfig.MIN_NUM, lszg: dispatchConfig.MIN_NUM,
            showJjsw: true, showBzsw: true, showXxsw: true, showJhsw: true
        };
        that.obj_minMax_gcx = {
            sw: {min: dispatchConfig.MAX_NUM, max: dispatchConfig.MIN_NUM},
            ll: { min: dispatchConfig.MAX_NUM, max: dispatchConfig.MIN_NUM },
            dtfh: { min: dispatchConfig.MAX_NUM, max: dispatchConfig.MIN_NUM }
        };
        that.obj_data_gcx = {
            arrTh: new Array(),
            sw: new Array(),
            sw_js: new Array(),
            ybll: new Array(),
            ll: new Array(),
            ll_in: new Array(),
            xxsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            zcsw: new Array(),
            lszg: new Array(),
            fharr: new Array(),
            fhhsw: new Array(),
            fhhll: new Array(),
        };
        that.obj_data_gcx_fhhllName = "";
        that.obj_data_gcx_fhhswName = "";
    },
    /**
     * 展示调度界面表格+图表
     **/
    init_show_dd: function (json) {
        var that = this;
        //解析数据
        //特征值获取
        if (that.show_sttp == "RR" || that.show_sttp == "HP") {
            that.obj_fcch_gcx.xxsw = json.XXSW == "" ? dispatchConfig.MIN_NUM : Number(json.XXSW);
            that.obj_fcch_gcx.sjsw = json.SJSW == "" ? dispatchConfig.MIN_NUM : Number(json.SJSW);
            that.obj_fcch_gcx.jhsw = json.JHSW == "" ? dispatchConfig.MIN_NUM : Number(json.JHSW);
            that.obj_fcch_gcx.zcsw = json.ZCSW == "" ? dispatchConfig.MIN_NUM : Number(json.ZCSW);
            that.obj_fcch_gcx.lszg = json.LSZG == "" ? dispatchConfig.MIN_NUM : Number(json.LSZG);
        }

        //生成调度成果表格
        that.create_table_ddtj(json);
        //生成调度成果表格
        $("#contDd .ybtj-table-header table colgroup col").remove();
        $("#contDd .ybtj-table-header table thead tr").remove();
        $("#contDd .tableDd colgroup col").remove();
        $("#contDd .tableDd tbody tr").remove();
        that.obj_data_gcx.arrTh = new Array();
        if (json.dataName != "" && json.dataName.length > 0) {
            //第一列默认为时间 列宽为1.5
            var sumWeight = 0;
            var countEdit = 0;
            for (var i = 0; i < json.dataName.length; i++) {
                if (json.dataName[i].indexOf("时间") > -1) {
                    that.obj_data_gcx.arrTh.push({index: i, name: json.dataName[i], weight: 2, is_edit: false, data: new Array()});
                    sumWeight += 2;
                } else {
                    var _weight = 1;
                    if (json.dataName[i].length > 10) {
                        _weight = 1.8;
                    } else if (json.dataName[i].length > 8) {
                        _weight = 1.5;
                    } else if (json.dataName[i].length > 6) {
                        _weight = 1.2;
                    } else {
                        _weight = 1;
                    }
                    //是否可编辑
                    var _is_edit = false;
                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                        if (json.dataName[i].indexOf("分洪流量") > -1) {
                            _is_edit = true;
                            countEdit++;
                        }
                    } else if (that.show_sttp == "RR") {
                        if (json.dataName[i].indexOf("出库流量") > -1) {
                            _is_edit = true;
                            countEdit++;
                        }
                    } else if (that.show_sttp == "HP") {
                        if (i != 0 && i != 1 && i != 2) {
                            _is_edit = true;
                            countEdit++;
                        }
                    } else if (that.show_sttp == "XX") {
                        if (json.dataName[i].indexOf("分洪流量") > -1) {
                            _is_edit = true;
                            countEdit++;
                        }
                    }
                    that.obj_data_gcx.arrTh.push({index: i, name: json.dataName[i], weight: _weight, is_edit: _is_edit, data: new Array()});
                    sumWeight += _weight;
                }
            }

            //自动生成 人机交互的CHECKBOX
            if (countEdit > 1) {
                $("#contDd .dd_check").show();
                $("#contDd .dd_check").empty();
                var _html_check = "<label class=\"control-label\">选择列</label>";
                for (var j = 0; j < that.obj_data_gcx.arrTh.length; j++) {
                    if (that.obj_data_gcx.arrTh[j].is_edit) {
                        _html_check += "<label><input id=\"chkJh_" + j + "\" type=\"checkbox\" name='checkbox-rjjh' _data_i='" + j + "' _data_name='" + that.obj_data_gcx.arrTh[j].name + "'/><span></span>&nbsp;" + that.obj_data_gcx.arrTh[j].name + "&nbsp;</label>";
                    }
                }
                $("#contDd .dd_check").append(_html_check);
            } else {
                $("#contDd .dd_check").hide();
            }

            //单个权重比
            var avgWeight = 100 / sumWeight;
            var _html_th = "<tr>";
            var _html_col = "";
            for (var j = 0; j < that.obj_data_gcx.arrTh.length; j++) {
                if (that.show_stcd == "51107801") {

                }
                else {
                }
                _html_col += "<col style='width: " + that.obj_data_gcx.arrTh[j].weight * avgWeight + "%;' />";
                _html_th += "<th>" + that.obj_data_gcx.arrTh[j].name.replace("分洪流量", "") + "</th>";
            }
            _html_th += "</tr>";
            $("#contDd .ybtj-table-header table colgroup").append(_html_col);
            $("#contDd .tableDd colgroup").append(_html_col);
            $("#contDd .ybtj-table-header table thead").append(_html_th);
        }

        //可修改列
        //分洪河道  最后几列带分流           行蓄洪区：最后几列带分洪
        //水库  第三列：出库流量       湖泊：前两列+后两列除外 其余可修改
        var minTime = "";
        var minTime_Jh = "";
        var maxTime = "";
        if (json.data != "" && json.data.length > 0) {
            var _html = new StringBuffer();
            $.each(json.data, function (index, item) {
                if (item == "" || item.length == 0)
                    return true;

                if (index == 0) {
                    minTime = item[0];
                }
                if (index == (json.data.length - 1)) {
                    maxTime = item[0];
                }
                _html.append("<tr>");
                for (var i = 0; i < item.length; i++) {
                    //是否为历史记录
                    var isHis = false;
                    if (item[0] != "" && moment(that.show_etime).diff(moment(item[0]), "minutes", true) >= 0) {
                        isHis = true;
                    }
                    if (minTime_Jh == "" && !isHis)  //开始时间为预报第一个时间节点
                    {
                        minTime_Jh = item[0];
                    }

                    if (that.obj_data_gcx.arrTh[i].is_edit) {
                        if (that.obj_data_gcx.arrTh[i].name.indexOf("流量") >= 0) {
                            _html.append("<td class='edit_input " + (isHis ? "td_gray" : "edit_input_nohis") + "'><input type='number' step='100' min='0' value='" + Math.floor(item[i]) + "' readonly/></td>");

                        }
                        else {
                            _html.append("<td class='edit_input " + (isHis ? "td_gray" : "edit_input_nohis") + "'><input type='number' step='100' min='0' value='" + item[i] + "' readonly/></td>");

                        }




                    } else {
                        if (that.obj_data_gcx.arrTh[i].name.indexOf("流量") >= 0) {
                            _html.append("<td class='" + (isHis ? "td_gray" : "") + "'>" + Math.floor( item[i] )+ "</td>");

                        }
                        else if (that.obj_data_gcx.arrTh[i].name.indexOf("库水位") >= 0) {
                            var font_Z_start = "";
                            var font_Z_end = "";
                            if (that.show_sttp == "RR") {
                                if (item[i] >= that.obj_fcch_gcx.xxsw) {
                                    font_Z_start = "<font color='Blue'>";
                                    font_Z_end = "</font>";
                                }
                                if (item[i] >= that.obj_fcch_gcx.sjsw) {
                                    font_Z_start = "<font color='Red'>";
                                    font_Z_end = "</font>";
                                }
                                if (item[i] >= that.obj_fcch_gcx.jhsw) {
                                    font_Z_start = "<font color='Red'>";
                                    font_Z_end = "</font>";
                                }
                            } else {
                                if (item[i] >= that.obj_fcch_gcx.xxsw) {
                                    font_Z_start = "<font color='Blue'>";
                                    font_Z_end = "</font>";
                                }
                                if (item[i] >= that.obj_fcch_gcx.sjsw) {
                                    font_Z_start = "<font color='Red'>";
                                    font_Z_end = "</font>";
                                }
                            }
                            _html.append("<td class='" + (isHis ? "td_gray" : "") + "'>" + font_Z_start + item[i] + font_Z_end + "</td>");
                        }
                        else {
                            _html.append("<td class='" + (isHis ? "td_gray" : "") + "'>" + item[i] + "</td>");
                        }

                    }

                    //数据源
                    if (i > 0) {
                        if (that.obj_data_gcx.arrTh[i].name.indexOf("流量") >= 0) {
                            item[i] = Math.floor(item[i]);
                        }
                        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                            //大概的列  时间、预报流量、分洪流量、分洪后流量
                            if (i == 2) {
                                that.obj_data_gcx.ybll.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            }
                            // else if (i == (item.length - 1)) {
                            //     //最后一列为分洪后流量
                            //     that.obj_data_gcx.ll.push({value: [item[0], item[i]]});
                            //     that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                            //     that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            // }
                            else if (that.obj_data_gcx.arrTh[i].is_edit) {
                                //动态的分洪流量列
                                that.obj_data_gcx.arrTh[i].data.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            }
                        } else if (that.show_sttp == "RR") {
                            if (that.obj_data_gcx.arrTh[i].name.indexOf("入库流量") > -1) {
                                that.obj_data_gcx.ll_in.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            } else if (that.obj_data_gcx.arrTh[i].name.indexOf("出库流量") > -1) {
                                that.obj_data_gcx.ll.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            } else if (that.obj_data_gcx.arrTh[i].name.indexOf("水位") > -1) {
                                //计算水位 + 实测水位合并一列，stime之前为实测 以后为计算
                                if (moment(that.show_etime).diff(moment(item[0]), "minutes", true) >= 0) {
                                    that.obj_data_gcx.sw.push({value: [item[0], item[i]]});
                                    that.obj_minMax_gcx.sw.min = Math.min(Number(item[i]), that.obj_minMax_gcx.sw.min);
                                    that.obj_minMax_gcx.sw.max = Math.max(Number(item[i]), that.obj_minMax_gcx.sw.max);
                                } else {
                                    that.obj_data_gcx.sw_js.push({value: [item[0], item[i]]});
                                    if (item[i] != "" && item[i] != "0") {
                                        that.obj_minMax_gcx.sw.min = Math.min(Number(item[i]), that.obj_minMax_gcx.sw.min);
                                        that.obj_minMax_gcx.sw.max = Math.max(Number(item[i]), that.obj_minMax_gcx.sw.max);
                                    }
                                }
                            }
                        } else if (that.show_sttp == "HP") {
                            //入流
                            if (i == 2) {
                                that.obj_data_gcx.ll.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            } else if (i == 1) {
                                //水位
                                that.obj_data_gcx.sw.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.sw.min = Math.min(Number(item[i]), that.obj_minMax_gcx.sw.min);
                                that.obj_minMax_gcx.sw.max = Math.max(Number(item[i]), that.obj_minMax_gcx.sw.max);
                            } else if (that.obj_data_gcx.arrTh[i].is_edit) {
                                //可编辑-流量
                                that.obj_data_gcx.arrTh[i].data.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            }
                        } else if (that.show_sttp == "XX") {
                            //大概的列  时间、预报流量、分洪流量、分洪后流量
                            if (i == 1) {//控制站水位
                                that.obj_data_gcx.sw.push({value: [item[0], item[i]]});
                                that.obj_minMax_gcx.sw.min = Math.min(Number(item[i]), that.obj_minMax_gcx.sw.min);
                                that.obj_minMax_gcx.sw.max = Math.max(Number(item[i]), that.obj_minMax_gcx.sw.max);
                            }
                            // else if (i == (item.length - 1)) {
                            //     //最后一列为分洪后流量
                            //     that.obj_data_gcx.ll.push({value: [item[0], item[i]]});
                            //     that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                            //     that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                                // }
                            else if (i == 2) {//控制站流量
                                that.obj_data_gcx.arrTh[i].data.push({ value: [item[0], item[i]] });
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item[i]), that.obj_minMax_gcx.ll.max);
                            }
                            else if (that.obj_data_gcx.arrTh[i].is_edit) {
                                //动态的分洪流量列
                                that.obj_data_gcx.arrTh[i].data.push({ value: [item[0], item[i]] });
                                that.obj_minMax_gcx.dtfh.min = Math.min(Number(item[i]), that.obj_minMax_gcx.dtfh.min);
                                that.obj_minMax_gcx.dtfh.max = Math.max(Number(item[i]), that.obj_minMax_gcx.dtfh.max);
                            }
                        }
                    }
                }
                _html.append("</tr>");
            });
            $("#contDd .tableDd tbody").append(_html.toString());
        }

        //闸坝处理分洪后水位流量 add by chl 20200422
        if (that.show_sttp == "XX") {
            if (json.hasOwnProperty("afterData")) {
                for (var i = 0; i < json.afterData.length; i++) {
                    if (json.afterName[i].indexOf("水位") > -1) {
                        for (var j = 0; j < json.afterData[i].length; j++) {
                            that.obj_data_gcx.fhhsw.push({ value: [json.afterData[0][j], json.afterData[i][j]] });
                        }
                    }
                    if (json.afterName[i].indexOf("流量") > -1) {
                        for (var j = 0; j < json.afterData[i].length; j++) {
                            that.obj_data_gcx.fhhll.push({ value: [json.afterData[0][j], json.afterData[i][j]] });
                        }
                    }
                }
                for (var i = 0; i < json.afterName.length; i++) {
                    if (json.afterName[i].indexOf("水位") > -1) {
                        that.obj_data_gcx_fhhswName = json.afterName[i];
                    }
                    if (json.afterName[i].indexOf("流量") > -1) {
                        that.obj_data_gcx_fhhllName = json.afterName[i];
                    }
                }
            }
        }

        //处理特征水位
        if (that.show_sttp == "RR") {
            if (that.obj_data_gcx.sw != null && that.obj_data_gcx.sw.length > 0) {
                var _minTime = that.obj_data_gcx.ll_in[0].value[0];
                var _maxTime = that.obj_data_gcx.ll_in[that.obj_data_gcx.ll_in.length - 1].value[0];
                //汛限水位
                if (that.obj_fcch_gcx.xxsw > dispatchConfig.MIN_NUM) {
                    that.obj_data_gcx.xxsw.push({value: [_minTime, that.obj_fcch_gcx.xxsw]});
                    that.obj_data_gcx.xxsw.push({value: [_maxTime, that.obj_fcch_gcx.xxsw]});
                }
                //设计水位
                if (that.obj_fcch_gcx.sjsw > dispatchConfig.MIN_NUM) {
                    that.obj_data_gcx.sjsw.push({value: [_minTime, that.obj_fcch_gcx.sjsw]});
                    that.obj_data_gcx.sjsw.push({value: [_maxTime, that.obj_fcch_gcx.sjsw]});
                }
                //校核水位
                if (that.obj_fcch_gcx.jhsw > dispatchConfig.MIN_NUM) {
                    that.obj_data_gcx.jhsw.push({value: [_minTime, that.obj_fcch_gcx.jhsw]});
                    that.obj_data_gcx.jhsw.push({value: [_maxTime, that.obj_fcch_gcx.jhsw]});
                }
                //正常蓄水位
                if (that.obj_fcch_gcx.zcsw > dispatchConfig.MIN_NUM) {
                    that.obj_data_gcx.zcsw.push({value: [_minTime, that.obj_fcch_gcx.zcsw]});
                    that.obj_data_gcx.zcsw.push({value: [_maxTime, that.obj_fcch_gcx.zcsw]});
                }
                //历史最高
                if (that.obj_fcch_gcx.lszg > dispatchConfig.MIN_NUM) {
                    that.obj_data_gcx.lszg.push({value: [_minTime, that.obj_fcch_gcx.lszg]});
                    that.obj_data_gcx.lszg.push({value: [_maxTime, that.obj_fcch_gcx.lszg]});
                }
            }

            //汛限、校核是否勾选
            if (that.obj_fcch_gcx.xxsw > dispatchConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                that.obj_fcch_gcx.showXxsw = true;
            } else {
                that.obj_fcch_gcx.showXxsw = false;
            }
            if (that.obj_fcch_gcx.jhsw > dispatchConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
                that.obj_fcch_gcx.showJhsw = true;
            } else {
                that.obj_fcch_gcx.showJhsw = false;
            }
        }

        //获取实时（计算）的最大、最小水位流量
        var tempSw = that.obj_minMax_gcx.sw.max;
        if (that.show_sttp == "RR") {
            if (that.obj_fcch_gcx.showXxsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
            }
            if (that.obj_fcch_gcx.showJhsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
            }
        }
        var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
        var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
        var axis_sw_min = arrSw[1];
        axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
        var axis_sw_max = arrSw[0];
        var axis_ll_min = arrLl[1];
        axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
        var axis_ll_max = arrLl[0];
        //获取时间轴刻度 并设置人机交互时间选择范围
        var intervalX;
        if (minTime != "" && maxTime != "") {
            intervalX = that.get_axis_interval(minTime, maxTime, that.chartGcx.getWidth());

            $("#txtBeginTimeJh").val(moment(minTime_Jh).format("YYYY-MM-DD"));
            $("#beginHourJh").val(moment(minTime_Jh).format("HH"));
            $("#txtEndTimeJh").val(moment(maxTime).format("YYYY-MM-DD"));
            $("#endHourJh").val(moment(maxTime).format("HH"));
            $("#txtBeginTimeJh,#txtEndTimeJh").datetimepicker("setStartDate", moment(minTime_Jh).format("YYYY-MM-DD"));
            $("#txtBeginTimeJh,#txtEndTimeJh").datetimepicker("setEndDate", moment(maxTime).format("YYYY-MM-DD"));
            $("#contDd .form-date").datetimepicker('update');
            $("#txtGdz").val("");
        } else {
            intervalX = that.get_axis_interval("", "", that.chartGcx.getWidth());

            //空值时不可选
            $("#txtBeginTimeJh").val(moment().format("YYYY-MM-DD"));
            $("#beginHourJh").val(moment().format("HH"));
            $("#txtEndTimeJh").val(moment().format("YYYY-MM-DD"));
            $("#endHourJh").val(moment().format("HH"));
            $("#txtBeginTimeJh,#txtEndTimeJh").datetimepicker("setStartDate", moment().format("YYYY-MM-DD"));
            $("#txtBeginTimeJh,#txtEndTimeJh").datetimepicker("setEndDate", moment().format("YYYY-MM-DD"));
            $("#contDd .form-date").datetimepicker('update');
            $("#txtGdz").val("");
        }

        //初始化图表
        var option = {};
        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
            option = that.get_option_gcx_dd(axis_ll_max, axis_ll_min, intervalX);
        } else if (that.show_sttp == "RR") {
            option = that.get_option_gcx_rr(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX);
        } else if (that.show_sttp == "HP") {
            option = that.get_option_gcx_hp(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX);
        } else if (that.show_sttp == "XX") {
            option = that.get_option_gcx_xx(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX);
        }

        //添加动态列
        var colors = ['#0000FF', '#000000', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85'];
        if (that.show_sttp == "HP" || that.show_sttp == "ZZ" || that.show_sttp == "DD") {
            var color_index = 0;
            for (var i = 0; i < that.obj_data_gcx.arrTh.length; i++) {
                if (that.obj_data_gcx.arrTh[i].is_edit) {
                    option.legend.data.push(that.obj_data_gcx.arrTh[i].name);
                    option.legend.selected[that.obj_data_gcx.arrTh[i].name] = true;
                    option.series.push({
                        name: that.obj_data_gcx.arrTh[i].name,
                        type: 'line',
                        yAxisIndex: 0,
                        symbol: "image://Images/empty.png",
                        symbolSize: 1,
                        showSymbol: false,
                        hoverAnimation: false,
                        itemStyle: {
                            color: colors[color_index]
                        },
                        lineStyle: {
                            type: "dashed"
                        },
                        data: that.obj_data_gcx.arrTh[i].data
                    });
                    color_index++;
                }
            }
        }
        if (that.show_sttp == "XX") {
            var color_index = 0;
            for (var i = 0; i < that.obj_data_gcx.arrTh.length; i++) {
                    if (that.obj_data_gcx.arrTh[i].is_edit) {
                        option.legend.data.push(that.obj_data_gcx.arrTh[i].name);
                        option.legend.selected[that.obj_data_gcx_fhhswName] = false;
                        option.legend.selected[that.obj_data_gcx.arrTh[i].name] = true;
                        option.series.push({
                            name: that.obj_data_gcx.arrTh[i].name,
                            type: 'line',
                            yAxisIndex: 0,
                            symbol: "image://Images/empty.png",
                            symbolSize: 1,
                            showSymbol: false,
                            hoverAnimation: false,
                            itemStyle: {
                                color: colors[color_index]
                            },
                            lineStyle: {
                                type: "dashed"
                            },
                            stack: '总量',
                            areaStyle: {},
                            data: that.obj_data_gcx.arrTh[i].data
                        });
                        color_index++;
                    }
            }
        }
        option = tools.initChartlegendIcon(option);
        // 使用刚指定的配置项和数据显示图表。
        that.chartGcx.setOption(option, true);
        tools.hideChartLoading(that.chartGcx);

		that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);
    },
    /**
     * ZV曲线
     **/
    echart_line_zv: function () {
        var that = this;
        //初始化参数
        that.arr_zv_data = new Array();
        that.arr_zq_data = new Array();
        //等待框
        tools.showChartLoading(that.chartZV);

        // var objData = {
        //     stcd: that.show_stcd,
        //     userId: $("#_hid_userid").val()
        // };
        // var info = JSON.stringify(objData);

        var objData = {
            endTime: searchEtime,

            startTime: searchStime,

            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData);
        //获取ZV曲线
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_cloud + "api-rainsituation/real/getWshedZQInfo",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            // url: that.ApiUrlPath + "/" + (that.ApiUrlPath == "PanelNew.aspx" ? "getGxqx" :"get_Stcd_ZQ"),
            // data: "{'info':'" + info + "'}",
            success: function (res) {
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error(res.message);
                    return;
                }

                var _res = res.data;

                // var _res = $.parseJSON(res);
                //  if (res.code != 200) {
                //      tools.loadinghide(false);
                //      tools.show_message_error(res.message);
                //      return;
                //  }

                //解析数据  水库：水位,蓄水量|
                var arrList = _res.data;
                var len = arrList.length;

                var min_X = dispatchConfig.MAX_NUM;
                var max_X = dispatchConfig.MIN_NUM;
                var xs_min_Y = dispatchConfig.MAX_NUM;
                var xs_max_Y = dispatchConfig.MIN_NUM;

                var ll_min_Y = dispatchConfig.MAX_NUM;
                var ll_max_Y = dispatchConfig.MIN_NUM;

                for (var i = 0; i < len; i++) {
                    if (arrList[i].toString().length == 0)
                        continue;

                    that.arr_zv_data.push({ value: [Number(arrList[i][0]), arrList[i][1]] });
                    that.arr_zq_data.push({ value: [Number(arrList[i][0]), arrList[i][2]] });


                    //最大最小水位
                    min_X = Math.min(Number(arrList[i][0]), min_X);
                    max_X = Math.max(Number(arrList[i][0]), max_X);

                    //最大最小蓄量
                    xs_min_Y = Math.min(Number(arrList[i][1]), xs_min_Y);
                    xs_max_Y = Math.max(Number(arrList[i][1]), xs_max_Y);

                    ll_min_Y = Math.min(Number(arrList[i][2]), ll_min_Y);
                    ll_max_Y = Math.max(Number(arrList[i][2]), ll_max_Y);

                }

                //最高、低水位
                var min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx;
                if (max_X - min_X > 0) {
                    min_sw_gxqx = min_X - (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                    max_sw_gxqx = max_X + (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                } else {
                    if (min_X == dispatchConfig.MAX_NUM) {
                        min_sw_gxqx = 0;
                        max_sw_gxqx = 1;
                    } else {
                        min_sw_gxqx = min_X - 0.5;
                        max_sw_gxqx = max_X + 0.5;
                    }
                }

                //最大 最小蓄量
                if (xs_max_Y - xs_min_Y > 0) {
                    min_xs_gxqx = parseInt(xs_min_Y * (1 - dispatchConfig.MIN_DEPART));
                    max_xs_gxqx = parseInt(xs_max_Y * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (xs_min_Y == dispatchConfig.MAX_NUM) {
                        min_xs_gxqx = 0;
                        max_xs_gxqx = 1;
                    } else {
                        min_xs_gxqx = parseInt(xs_min_Y - 1);
                        max_xs_gxqx = parseInt(xs_max_Y + 1);
                    }
                }
                  //最大 最小流量
                if (ll_max_Y - ll_min_Y > 0) {
                    min_ll_gxqx = parseInt(ll_min_Y * (1 - dispatchConfig.MIN_DEPART));
                    max_ll_gxqx = parseInt(ll_max_Y * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (ll_min_Y == dispatchConfig.MAX_NUM) {
                        min_ll_gxqx = 0;
                        max_ll_gxqx = 1;
                    } else {
                        min_ll_gxqx = parseInt(ll_min_Y - 1);
                        max_ll_gxqx = parseInt(ll_max_Y + 1);
                    }
                }
                //初始化图表
                var option = that.get_option_zv(min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx);

                // 使用刚指定的配置项和数据显示图表。
                that.chartZV.setOption(option, true);
                tools.hideChartLoading(that.chartZV);
                //绘制表格
                that.create_table_zv(res);
            },
            error: function (errorMsg) {
                tools.show_message_error("生成关系曲线失败!");
                tools.hideChartLoading(that.chartZq);
            }
        });
    },
    /**
     * ZV曲线-行蓄洪区
     **/
    echart_line_zv_xx: function () {
        var that = this;
        //初始化参数
        that.arr_zv_data = new Array();
        that.arr_zq_data = new Array();
        //等待框
        tools.showChartLoading(that.chartZV);
               var objData = {
            endTime: searchEtime,
            startTime: searchStime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            stcd:that.show_stcd
        };
        var info = JSON.stringify(objData);


        //获取ZV曲线
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl + "RealSituate/getProjProjZvaInfos",
            data: info,
            success: function (data) {
                var res = data;

                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartZV);
                    tools.show_message_error("获取ZV曲线失败!");
                    return;
                }

                var _res = res.data;

                var min_X = dispatchConfig.MAX_NUM;
                var max_X = dispatchConfig.MIN_NUM;
                var xs_min_Y = dispatchConfig.MAX_NUM;
                var xs_max_Y = dispatchConfig.MIN_NUM;

                var ll_min_Y = dispatchConfig.MAX_NUM;
                var ll_max_Y = dispatchConfig.MIN_NUM;

                $.each(_res,function(i,item){
                    if (i != "dataName") {
                        //解析数据  水库：水位,蓄水量|
                        var arrList = item;
                        var len = arrList.length;

                        for (var i = 0; i < len; i++) {
                            if (arrList[i].toString().length == 0)
                                continue;

                            that.arr_zv_data.push({ value: [Number(arrList[i][0]), arrList[i][1]] });
                            that.arr_zq_data.push({ value: [Number(arrList[i][0]), arrList[i][2]] });


                            //最大最小水位
                            min_X = Math.min(Number(arrList[i][0]), min_X);
                            max_X = Math.max(Number(arrList[i][0]), max_X);

                            //最大最小蓄量
                            xs_min_Y = Math.min(Number(arrList[i][1]), xs_min_Y);
                            xs_max_Y = Math.max(Number(arrList[i][1]), xs_max_Y);

                            ll_min_Y = Math.min(Number(arrList[i][2]), ll_min_Y);
                            ll_max_Y = Math.max(Number(arrList[i][2]), ll_max_Y);

                        }
                    }
                })




                //最高、低水位
                var min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx;
                if (max_X - min_X > 0) {
                    min_sw_gxqx = min_X - (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                    max_sw_gxqx = max_X + (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                } else {
                    if (min_X == dispatchConfig.MAX_NUM) {
                        min_sw_gxqx = 0;
                        max_sw_gxqx = 1;
                    } else {
                        min_sw_gxqx = min_X - 0.5;
                        max_sw_gxqx = max_X + 0.5;
                    }
                }

                //最大 最小蓄量
                if (xs_max_Y - xs_min_Y > 0) {
                    min_xs_gxqx = parseInt(xs_min_Y * (1 - dispatchConfig.MIN_DEPART));
                    max_xs_gxqx = parseInt(xs_max_Y * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (xs_min_Y == dispatchConfig.MAX_NUM) {
                        min_xs_gxqx = 0;
                        max_xs_gxqx = 1;
                    } else {
                        min_xs_gxqx = parseInt(xs_min_Y - 1);
                        max_xs_gxqx = parseInt(xs_max_Y + 1);
                    }
                }
                //最大 最小流量
                if (ll_max_Y - ll_min_Y > 0) {
                    min_ll_gxqx = parseInt(ll_min_Y * (1 - dispatchConfig.MIN_DEPART));
                    max_ll_gxqx = parseInt(ll_max_Y * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (ll_min_Y == dispatchConfig.MAX_NUM) {
                        min_ll_gxqx = 0;
                        max_ll_gxqx = 1;
                    } else {
                        min_ll_gxqx = parseInt(ll_min_Y - 1);
                        max_ll_gxqx = parseInt(ll_max_Y + 1);
                    }
                }
                //初始化图表
                var option = that.get_option_zv_xx(min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx);

                // 使用刚指定的配置项和数据显示图表。
                that.chartZV.setOption(option, true);
                tools.hideChartLoading(that.chartZV);
                //绘制表格
                that.create_table_zv_xx(res);
            },
            error: function (errorMsg) {
                tools.show_message_error("生成关系曲线失败!");
                tools.hideChartLoading(that.chartZq);
            }
        });
    },
    /**
     * ZQ曲线
     **/
    echart_line_zq: function () {
        var that = this;
        //初始化参数
        that.arr_zq_data = new Array();

        //等待框
        tools.showChartLoading(that.chartZQ);

        // var objData = {
        //     stcd: that.show_stcd,
        //     userId: $("#_hid_userid").val()
        // };
        // var info = JSON.stringify(objData);
        var objData = {
            endTime: searchEtime,

            startTime: searchStime,

            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData);
        //获取ZV曲线
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_cloud + "api-rainsituation/real/getWshedZQInfo",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            // url: that.ApiUrlPath + "/" + (that.ApiUrlPath == "PanelNew.aspx" ? "getGxqx" : "get_Stcd_ZQ"),
            // data: "{'info':'" + info + "'}",
            success: function (res) {
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error(res.message);
                    return;
                }

                var _res = res.data;


                //解析数据  水库：水位,蓄水量|
                var arrList = _res.data;
                var len = arrList.length;

                var min_X = dispatchConfig.MAX_NUM;
                var max_X = dispatchConfig.MIN_NUM;
                var ll_min_Y = dispatchConfig.MAX_NUM;
                var ll_max_Y = dispatchConfig.MIN_NUM;
                for (var i = 0; i < len; i++) {
                    if (arrList[i].toString().length == 0)
                        continue;


                    that.arr_zq_data.push({ value: [arrList[i][2], Number(arrList[i][0])] });
                    //最大最小水位
                    min_X = Math.min(Number(arrList[i][0]), min_X);
                    max_X = Math.max(Number(arrList[i][0]), max_X);

                    //最大最小蓄量
                    ll_min_Y = Math.min(Number(arrList[i][2]), ll_min_Y);
                    ll_max_Y = Math.max(Number(arrList[i][2]), ll_max_Y);
                }

                //最高、低水位
                var min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx;
                if (max_X - min_X > 0) {
                    min_sw_gxqx = min_X - (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                    max_sw_gxqx = max_X + (max_X - min_X) * dispatchConfig.MIN_DEPART / 2;
                } else {
                    if (min_X == dispatchConfig.MAX_NUM) {
                        min_sw_gxqx = 0;
                        max_sw_gxqx = 1;
                    } else {
                        min_sw_gxqx = min_X - 0.5;
                        max_sw_gxqx = max_X + 0.5;
                    }
                }

                //最大 最小流量
                if (ll_max_Y - ll_min_Y > 0) {
                    min_ll_gxqx = parseInt(ll_min_Y * (1 - dispatchConfig.MIN_DEPART));
                    max_ll_gxqx = parseInt(ll_max_Y * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (ll_min_Y == dispatchConfig.MAX_NUM) {
                        min_ll_gxqx = 0;
                        max_ll_gxqx = 1;
                    } else {
                        min_ll_gxqx = parseInt(ll_min_Y - 1);
                        max_ll_gxqx = parseInt(ll_max_Y + 1);
                    }
                }

                //初始化图表
                var option = that.get_option_zq(min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx);

                // 使用刚指定的配置项和数据显示图表。
                that.chartZQ.setOption(option, true);
                tools.hideChartLoading(that.chartZQ);
                //绘制表格
                that.create_table_zq(res);
            },
            error: function (errorMsg) {
                tools.show_message_error("生成关系曲线失败!");
                tools.hideChartLoading(that.chartZq);
            }
        });
    },
    /**
     * 过程线图例点击事件
     **/
    add_click_gcx: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartGcx.getOption(), state, params.name);
                that.chartGcx.setOption(option, true);
            }
            if (that.show_sttp == "RR") {
                if (params.name == "汛限水位" || params.name == "设计水位" || params.name == "校核水位" || params.name == "正常蓄水位" || params.name == "历史最高水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > dispatchConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > dispatchConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > dispatchConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > dispatchConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.历史最高水位 && that.obj_fcch_gcx.lszg > dispatchConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.lszg);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.lszg, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(dispatchConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(dispatchConfig.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{}, {
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            }
        });
    },
    /**
     * 人机交互按钮点击事件
     **/
    change_table_jh: function () {
        var that = this;
        if (that.obj_data_gcx.arrTh == null || that.obj_data_gcx.arrTh.length == 0)
            return;

        //修改后的流量
        var txtLl = $("#txtGdz").val();
        //修改区间段
        var stimeJh = $("#txtBeginTimeJh").val() + " " + $("#beginHourJh").val() + ":00:00";
        var etimeJh = $("#txtEndTimeJh").val() + " " + $("#endHourJh").val() + ":00:00";

        //改变的列索引
        var arrIndex = new Array();
        for (var i = 0; i < that.obj_data_gcx.arrTh.length; i++) {
            //是否存在勾选框
            if ($("#contDd .dd_check").is(':hidden')) {
                if (that.obj_data_gcx.arrTh[i].is_edit)
                    arrIndex.push(that.obj_data_gcx.arrTh[i].index);
            } else {
                if (that.obj_data_gcx.arrTh[i].is_edit && $("#contDd #chkJh_" + i).is(':checked'))
                    arrIndex.push(that.obj_data_gcx.arrTh[i].index);
            }
        }
        if (arrIndex == null || arrIndex.length == 0) {
            tools.show_message_error("请先勾选修改的列！");
            return;
        }

        //改变单列的情况
        var _time;
        var _row_index = -1;
        $("#contDd .tableDd").find("tr").each(function () {
            _row_index++;
            var tdArr = $(this).children();
            //获取第一列时间值
            _time = tdArr.eq(0).text();
            if (_time == "")
                return true;
            if (moment(stimeJh).diff(moment(_time), "minutes", true) >= 1 || moment(_time).diff(moment(etimeJh), "minutes", true) >= 1)
                return true;

            for (var i = 0; i < arrIndex.length; i++) {
                tdArr.eq(arrIndex[i]).find('input').val(txtLl);

                //更改数据源
                if (that.show_sttp == "RR") {
                    that.obj_data_gcx.ll[_row_index].value[1] = txtLl;
                } else {
                    that.obj_data_gcx.arrTh[arrIndex[i]].data[_row_index].value[1] = txtLl;
                }
            }
        });

        var option = that.chartGcx.getOption();
        //更新数据源
        if (that.show_sttp == "RR") {
            option.series.find(function (item, index) {
                return item.name == "出库流量";
            }).data = that.obj_data_gcx.ll;
        } else {
            for (var i = 0; i < arrIndex.length; i++) {
                option.series.find(function (item, index) {
                    return item.name == that.obj_data_gcx.arrTh[arrIndex[i]].name;
                }).data = that.obj_data_gcx.arrTh[arrIndex[i]].data;
            }
        }
        //更新最大最小值
        that.obj_minMax_gcx.ll.min = Math.min(Number(txtLl), that.obj_minMax_gcx.ll.min);
        that.obj_minMax_gcx.ll.max = Math.max(Number(txtLl), that.obj_minMax_gcx.ll.max);
        var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
        option.yAxis[0].min = arrLl[1] < 0 ? 0 : arrLl[1];
        option.yAxis[0].max = arrLl[0];
        that.chartGcx.setOption(option, true);
    },
    /**
     * 人机交互-表格内部值改变事件
     * 更改一个输入框的内容 直接更新该行以下的内容一致
     **/
    change_table_jh_input: function () {
        var that = this;
        $("#contDd .tableDd").on("input propertychange", "input", function () {
            //强制改为数字
            var newVal = $(this).val().replace(/[^\d]/g, '');
            if (newVal == "") {
                $(this).val(0);
            } else {
                $(this).val(Number(newVal));
            }

            //更新后的值
            var val = $(this).val();
            //更新列的索引
            var colIndex = $(this.parentNode).prevAll().length;
            var rowIndex = $(this.parentNode).parent().prevAll().length;

            if (that.show_sttp == "RR") {
                that.obj_data_gcx.ll[rowIndex].value[1] = val;
            } else {
                that.obj_data_gcx.arrTh[colIndex].data[rowIndex].value[1] = val;
            }
            var _index = 1;
            $("#contDd .tableDd tr:gt(" + rowIndex + ")").each(function () {
                var tdArr = $(this).children();

                tdArr.eq(colIndex).find('input').val(val);
                if (that.show_sttp == "RR") {
                    that.obj_data_gcx.ll[rowIndex + _index].value[1] = val;
                } else {
                    that.obj_data_gcx.arrTh[colIndex].data[rowIndex + _index].value[1] = val;
                }
                _index++;
            });

            //更新数据源
            var option = that.chartGcx.getOption();
            if (that.show_sttp == "RR") {
                option.series.find(function (item, index) {
                    return item.name == "出库流量";
                }).data = that.obj_data_gcx.ll;
            } else {
                option.series.find(function (item, index) {
                    return item.name == that.obj_data_gcx.arrTh[colIndex].name;
                }).data = that.obj_data_gcx.arrTh[colIndex].data;
            }
            //更新最大最小值
            that.obj_minMax_gcx.ll.min = Math.min(Number(val), that.obj_minMax_gcx.ll.min);
            that.obj_minMax_gcx.ll.max = Math.max(Number(val), that.obj_minMax_gcx.ll.max);
            var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
            option.yAxis[0].min = arrLl[1] < 0 ? 0 : arrLl[1];
            option.yAxis[0].max = arrLl[0];
            that.chartGcx.setOption(option, true);
        });
    },
    /**
     * 生成调度特征统计表格
     * 生成调度特征统计表格
     */
    create_table_ddtj: function (json) {
        var that = this;
        var _html_th = "<tr>";
        var _html_tr = "";
        $("#contDd .table_ddtj thead tr").remove();
        $("#contDd .table_ddtj tbody tr").remove();
        //表头
        if (json.countName != "" && json.countName.length > 0) {
            for (var i = 0; i < json.countName.length; i++) {
                _html_th += "<th>" + json.countName[i] + "</th>";
            }
            _html_th += "</tr>";

            $("#contDd .table_ddtj thead").append(_html_th);
        }

        //表格主体部分
        if (json.countData != "" && json.countData.length > 0) {
            $.each(json.countData, function (index, item) {
              //  if (item[0] != "") {
                    _html_tr += "<tr>";
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] == ".00") {
                            item[i] = "0";
                        }
                        if ((json.countName[i].indexOf("流量") > 0) && (json.countName[i].indexOf("流量时间") < 0)) {
                            item[i] = Math.floor(item[i]);
                        }
                        _html_tr += "<td>" + item[i] + "</td>";
                    }
                    _html_tr += "</tr>";
             //   }

            });
            $("#contDd .table_ddtj tbody").append(_html_tr);
        } else {
            //默认值-湖泊三行  分洪河道、行蓄洪区、水库一行
            if (json.countName != "" && json.countName.length > 0) {
                if (that.show_sttp == "ZZ" || that.show_sttp == "DD" || that.show_sttp == "XX" || that.show_sttp == "RR") {
                    _html_tr += "<tr>";
                    for (var i = 0; i < json.countName.length; i++) {
                        _html_tr += "<td>&nbsp;</td>";
                    }
                    _html_tr += "</tr>";
                } else {
                    for (var m = 0; m < 3; m++) {
                        _html_tr += "<tr>";
                        if (m == 0) {
                            _html_tr += "<td>峰值</td>";
                        } else if (m == 1) {
                            _html_tr += "<td>时间</td>";
                        } else if (m == 2) {
                            _html_tr += "<td>水量</td>";
                        }
                        for (var i = 1; i < json.countName.length; i++) {
                            _html_tr += "<td>&nbsp;</td>";
                        }
                        _html_tr += "</tr>";
                    }

                }
                $("#contDd .table_ddtj tbody").append(_html_tr);
            }
        }
    },
    /**
     * 基本信息
     */
    create_table_jbxx: function () {
        var that = this;
        //先清空表格
        $("#contDd_Base .table-jbxx tr").remove();


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

                for (var i = 0; i < len; i++) {
                    if (len == (i + 1)) {
                        html_empty += "<tr><th>" + arr_name[i] + "</th><td>" + arr_value[i] + "</td><th></th><td></td></tr>";
                    } else {
                        html_empty += "<tr><th>" + arr_name[i] + "</th><td>" + arr_value[i] + "</td><th>" + arr_name[i + 1] + "</th><td>" + arr_value[i + 1] + "</td></tr>";
                    }
                    i++;
                }

                //特征水位
               /* _html += "<tr><th colspan='4' style='font-weight:bold;'>特征水位</th></tr>";
                for (var i = 0; i < json.tzName.length; i++) {
                    if (json.tzName.length == (i + 1)) {
                        _html += "<tr><th>" + json.tzName[i] + "</th><td>" + json.tzData[i] + "</td><th></th><td></td></tr>";
                    } else {
                        _html += "<tr><th>" + json.tzName[i] + "</th><td>" + json.tzData[i] + "</td><th>" + json.tzName[i + 1] + "</th><td>" + json.tzData[i + 1] + "</td></tr>";
                    }
                    i++;
                }
                */
                //调度规则
                html_empty += "<tr><th colspan='4' style='font-weight:bold;'>调度规则</th></tr>";
                html_empty += "<tr><td colspan='4'>" +  "" + "</td></tr>";

                $("#contDd_Base .table-jbxx").append(html_empty);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取基本信息失败!");
                return;
            }
        });
    },
    createUseInfoTable: function() {
        var that = this;
        //清空表格
        $("#contUseInfo .table-lsyy thead tr").remove();
        $("#contUseInfo .table-lsyy tbody tr").remove();
             var objData = {
            endTime: searchEtime,
            startTime: searchPlan,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            stcd: that.show_stcd
        };
        var info = JSON.stringify(objData);
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl + "RealSituate/getProjHisUseInfos",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success:function (data){
                if (data == "" || data == null ) {
                    tools.show_message_error("获取历史运用信息失败!");
                    return;
                }
                //解析数据
                var json = data.data;
                var html_th = "";
                var html_tbody = "";
                html_th += "<tr>";
                $.each(json.dataName,function(i,data){
                    html_th += "<th>" + data + "</th>";
                })
                html_th += "</tr>";

                $.each(json.data,function(i,data){
                    html_tbody += "<tr>"
                    $.each(data,function(j,item){
                        html_tbody += "<td>" + item + "</td>"
                    })
                    html_tbody += "</tr>"
                })
                $("#contUseInfo .table-lsyy thead").append(html_th);
                $("#contUseInfo .table-lsyy tbody").append(html_tbody);

            },
            error: function (errorMsg) {
                tools.show_message_error("获取历史运用信息失败!");
                return;
            }

        })

    },
    /**
     * 生成表格-ZV曲线-行蓄洪区
     **/
    create_table_zv_xx: function (str) {
        var that = this;
        if (str == null || str == "")
            return;

        var _res = str.data;
        var tableData;
        var gxqx_data = new Array();
        $.each(_res,function(i,item){
            if (i != "dataName") {
                tableData = item;
                if (tableData.length == 0)
                    return;

                for (var i = 0; i < tableData.length; i++) {
                    var arr_child = new Array();
                    arr_child.push(tableData[i][0]);
                    if (tableData[i][1] == ".00") {
                        tableData[i][1]="0.00"
                    }
                    arr_child.push(tableData[i][1]);
                    arr_child.push(tableData[i][2]);
                    // arr_child.push(tools.format_ll(_res.data[i][1]));
                    // arr_child.push(tools.format_ll(_res.data[i][2]));
                    gxqx_data.push(arr_child);
                }

            }
        })

        //转换DataTables
        that.datatables_zv = $(that.parentId + ' .tableZV').DataTable({
            "data": gxqx_data,
            "scrollY": that.panel_actual_height - 32 - 37 - 15 - 32,
            "scrollX": false,
            "sort": true,
            "aaSorting": [[1, "asc"]],                //默认排序
            "columnDefs": [{
                "targets": 0,
                "orderable": true
            }, {
                "targets": 1,
                "orderable": true
            }],
            "oLanguage": {
                "sZeroRecords": "无ZV曲线"
            }
        });

        //取消表格横向滚动条
        $("#zvBody").find(".dataTables_scrollBody").css({
            "overflow-x": "hidden",
            "overflow-y": "auto"
        });
    },
    /**
     * 生成表格-ZV曲线
     **/
    create_table_zv: function (str) {
        var that = this;
        if (str == null || str == "")
            return;

        var _res = str.data;
        if (_res.data.length == 0)
            return;
        var gxqx_data = new Array();
        for (var i = 0; i < _res.data.length; i++) {
            var arr_child = new Array();
            arr_child.push(_res.data[i][0]);
            if (_res.data[i][1] == ".00") {
                _res.data[i][1]="0.00"
            }
            arr_child.push(_res.data[i][1]);
            arr_child.push(_res.data[i][2]);
           // arr_child.push(tools.format_ll(_res.data[i][1]));
           // arr_child.push(tools.format_ll(_res.data[i][2]));
            gxqx_data.push(arr_child);
        }


        //转换DataTables
        that.datatables_zv = $(that.parentId + ' .tableZV').DataTable({
            "data": gxqx_data,
            "scrollY": that.panel_actual_height - 32 - 37 - 15 - 32,
            "scrollX": false,
            "sort": true,
            "aaSorting": [[1, "asc"]],                //默认排序
            "columnDefs": [{
                "targets": 0,
                "orderable": true
            }, {
                "targets": 1,
                "orderable": true
            }],
            "oLanguage": {
                "sZeroRecords": "无ZV曲线"
            }
        });

        //取消表格横向滚动条
        $("#zvBody").find(".dataTables_scrollBody").css({
            "overflow-x": "hidden",
            "overflow-y": "auto"
        });
    },
    /**
     * 生成表格-ZQ曲线
     **/
    create_table_zq: function (str) {
        var that = this;
        if (str == null || str == "")
            return;

        var _res = $.parseJSON(str);
        if (_res.data.length == 0)
            return;
        var gxqx_data = new Array();
        for (var i = 0; i < _res.data.length; i++) {
            var arr_child = new Array();
            arr_child.push(_res.data[i][0]);
            arr_child.push(tools.format_ll(_res.data[i][1]));
            arr_child.push(tools.format_ll(_res.data[i][2]));
            gxqx_data.push(arr_child);
        }

        //转换DataTables
        that.datatables_zq = $(that.parentId + ' .tableZQ').DataTable({
            "data": gxqx_data,
            "scrollY": that.panel_actual_height - 32 - 37 - 15 - 32,
            "scrollX": false,
            "sort": true,
            "aaSorting": [[1, "asc"]],                //默认排序
            "columnDefs": [{
                "targets": 0,
                "orderable": false
            }, {
                "targets": 1,
                "orderable": true
            }],
            "oLanguage": {
                "sZeroRecords": "无ZQ曲线"
            }
        });

        //取消表格横向滚动条
        $("#zqBody").find(".dataTables_scrollBody").css({
            "overflow-x": "hidden",
            "overflow-y": "auto"
        });
    },
    /**
     * 水位过程线参数-分洪河道
     **/
    get_option_gcx_dd: function (axis_ll_max, axis_ll_min, intervalX) {
        var that = this;
        var f_name= that.obj_data_gcx.arrTh[2].name;
        var l_name = that.obj_data_gcx.arrTh[that.obj_data_gcx.arrTh.length - 1].name;
        var option = {
            title: {
                text: that.show_stnm + "调度方案水位流量过程线",
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
                data: [f_name, l_name],
                selected: {
                    f_name: true,    //[that.obj_data_gcx.arrTh[1].name]: true, 此种写法为ES6 但是IE11不兼容 upd by hzx 20190417
                    l_name: true
                },
                textStyle: {
                    color: panelConfig.ECHART_COLOR_LEGEND,
                },
            },
            grid: {
                left: 5,
                top: 45,
                right: 28,
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
                name: f_name,
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ybll
            }
                // , {
                //     name: that.obj_data_gcx.arrTh[that.obj_data_gcx.arrTh.length - 1].name,
                //     type: 'line',
                //     yAxisIndex: 0,
                //     itemStyle: {
                //         color: dispatchConfig.ECHART_COLOR_LL_DNTQ
                //     },
                //     showSymbol: false,
                //     data: that.obj_data_gcx.ll
                // }
            ],
            backgroundColor: dispatchConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-水库
     **/
    get_option_gcx_rr: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + "调度方案水位流量过程线",
                textStyle: {
                    fontSize: 16,
                    color:"#ffffff"
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
                data: ["实测水位", "计算水位", "入库流量", "出库流量", "汛限水位", "设计水位", "校核水位", "正常蓄水位"],
                selected: {
                    "汛限水位": that.obj_fcch_gcx.showXxsw,
                    "设计水位": false,
                    "校核水位": that.obj_fcch_gcx.showJhsw,
                    "正常蓄水位": false
                },
                textStyle: {
                    color: panelConfig.ECHART_COLOR_LEGEND
                },
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
            }, {
                type: 'value',
                name: '水位(m)',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 0]
                },
                position: 'right',
                min: axis_sw_min,
                max: axis_sw_max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_SW
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
                        color: [dispatchConfig.ECHART_COLOR_GRID]
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
                name: '实测水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sw
            }, {
                name: '计算水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.sw_js
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll_in
            }, {
                name: '出库流量',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll
            }, {
                name: '汛限水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1,    //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: dispatchConfig.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "汛限水位：" + that.obj_fcch_gcx.xxsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
                },
                data: that.obj_data_gcx.xxsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1,    //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: dispatchConfig.ECHART_COLOR_SJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "设计水位：" + that.obj_fcch_gcx.sjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
                },
                data: that.obj_data_gcx.sjsw
            }, {
                name: '校核水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1,    //设置为0时 不显示标志
                    symbolOffset: [220, 0], //偏移值X Y
                    label: {
                        backgroundColor: dispatchConfig.ECHART_COLOR_JHSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "校核水位：" + that.obj_fcch_gcx.jhsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
                },
                data: that.obj_data_gcx.jhsw
            }, {
                name: '正常蓄水位',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_ZCSW
                },
                markPoint: {
                    symbolSize: 1,    //设置为0时 不显示标志
                    symbolOffset: [100, 0], //偏移值X Y
                    label: {
                        backgroundColor: dispatchConfig.ECHART_COLOR_ZCSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "正常蓄水位：" + that.obj_fcch_gcx.zcsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
                },
                data: that.obj_data_gcx.zcsw
            }
                // , {
                //     name: '历史最高水位',
                //     type: 'line',
                //     yAxisIndex: 1,
                //     showSymbol: false,
                //     itemStyle: {
                //         color: dispatchConfig.ECHART_COLOR_LSZG
                //     },
                //     markPoint: {
                //         symbolSize: 1,    //设置为0时 不显示标志
                //         symbolOffset: [140, 0], //偏移值X Y
                //         label: {
                //             backgroundColor: dispatchConfig.ECHART_COLOR_LSZG,
                //             padding: [5, 10, 5, 10],
                //             formatter: function (ob) {
                //                 if (ob.dataIndex == 0) {
                //                     return "历史最高水位：" + that.obj_fcch_gcx.lszg;
                //                 } else {
                //                     return "";
                //                 }
                //             }
                //         },
                //         data: [
                //             {
                //                 name: '显示值',
                //                 type: 'min'
                //             }
                //         ]
                //     },
                //     data: that.obj_data_gcx.lszg
                // }
            ],
            backgroundColor: dispatchConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-湖泊
     **/
    get_option_gcx_hp: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX) {
        var that = this;
        var f_name= that.obj_data_gcx.arrTh[1].name;
        var l_name = that.obj_data_gcx.arrTh[2].name;
        var option = {
            title: {
                text: that.show_stnm + "调度方案水位流量过程线",
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
                data: [f_name, l_name],
                selected: {
                    f_name: true,
                    l_name: true
                },
                textStyle: {
                    color: panelConfig.ECHART_COLOR_LEGEND,
                },
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
            }, {
                type: 'value',
                name: '水位(m)',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 0]
                },
                position: 'right',
                min: axis_sw_min,
                max: axis_sw_max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_SW
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
                        color: [dispatchConfig.ECHART_COLOR_GRID]
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
                name: l_name,
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll
            }, {
                name: f_name,
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sw
            }],
            backgroundColor: dispatchConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-行蓄洪区
     **/
    get_option_gcx_xx: function (axis_sw_min, axis_sw_max,axis_ll_max, axis_ll_min, intervalX) {
        var that = this;
        var f_name= that.obj_data_gcx.arrTh[1].name;
        //var l_name = that.obj_data_gcx.arrTh[that.obj_data_gcx.arrTh.length - 1].name;
        var fhhswName = that.obj_data_gcx_fhhswName;
        var fhhllName = that.obj_data_gcx_fhhllName;
        var option = {
            title: {
                text: that.show_stnm + "调度方案水位流量过程线",
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
                data: ["控制站水位", fhhswName, fhhllName],
                selected: {
                    "控制站水位": false,
                    fhhswName: false,
                    fhhllName:true
                },
                textStyle: {
                    color: panelConfig.ECHART_COLOR_LEGEND,
                },
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
            }, {
                id: "yAxis_sw",
                type: 'value',
                name: '水位(m)',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 0]
                },
                position: 'right',
                min: axis_sw_min,
                max: axis_sw_max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_SW
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_sw(value);
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
                name: "控制站水位",
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.sw
            },{
                name: fhhswName,
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_FHHSW
                },
                lineStyle: {
                    type: "dashed"
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.fhhsw
            },{
                name: fhhllName,
                type: "line",
                yAxisIndex: 0,
                symbol: "circle",
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL_DD
                },
                showSymbol: false,
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
                smoothMonotone: "none",
                z:5,
                stack: '总量',
                data: that.obj_data_gcx.fhhll
            }
                // , {
                //     name: that.obj_data_gcx.arrTh[that.obj_data_gcx.arrTh.length - 1].name,
                //     type: 'line',
                //     yAxisIndex: 0,
                //     itemStyle: {
                //         color: dispatchConfig.ECHART_COLOR_LL_DNTQ
                //     },
                //     showSymbol: false,
                //     data: that.obj_data_gcx.ll
                // }
            ],
            backgroundColor: dispatchConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * ZV曲线参数-行蓄洪区
     **/
    get_option_zv_xx: function (min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx) {
        var that = this;
        var option = {
            legend: {
                show: true,
                top: 20,
                left: "center",
                textStyle: {
                    fontSize: 14,
                    color: panelConfig.ECHART_COLOR_LEGEND
                },
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: ["蓄量", "水面面积"],
                selected: {
                    "蓄量": true,
                    "水面面积": true
                }

            },

            grid: {
                left: 30,
                top: 55,
                right: 35,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: "value",
                //  name: "蓄水量（百万m3）",
                name: '水位（m）',
                nameLocation: "middle",
                nameGap: 20,
                min: min_sw_gxqx,
                max: max_sw_gxqx,
                // min: min_y_gxqx,
                //  max: max_y_gxqx,
                axisLine: {
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 3,
                    showMaxLabel: false
                }
            },
            yAxis: [{
                type: 'value',
                //  name: '水位（m）',
                name: "蓄量（百万m3）",
                position: 'left',
                nameGap: 48,
                nameLocation: "middle",
                min: min_xs_gxqx,
                max: max_xs_gxqx,
                // min: min_sw_gxqx,
                //  max: max_sw_gxqx,
                axisLine: {
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_SW
                    },
                    onZero: false
                },
                splitLine: {
                    show: true
                },
                axisLabel: {
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        return tools.format_sw(value);
                    }
                }
            }, {
                type: "value",
                name: "水面面积(平方千米)",
                position: 'right',
                nameLocation: "middle",
                nameGap: 48,
                min: min_ll_gxqx,
                max: max_ll_gxqx,
                axisLine: {
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_LL
                    }
                },
                splitLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 3,
                    showMaxLabel: false
                }
            }],
            tooltip: {
                show: true,
                trigger: "axis",
                hideDelay: 0,
                axisPointer: {
                    type: "cross",
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: "#0000FF",
                        width: 2
                    }
                },

                formatter: function (ob) {
                    if (ob != null && ob.length > 0) {
                        return tools.format_tooltip_zvq(ob);
                    } else {
                        return "";
                    }
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 5);
                }
            },
            series: [{
                type: 'line',
                name: '蓄量',
                yAxisIndex: 0,
                symbol: "circle",
                lineStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                hoverAnimation: false,  //经过拐点动画取消
                data: that.arr_zv_data
            }, {
                type: 'line',
                name: '水面面积',
                yAxisIndex: 1,
                symbol: "circle",
                lineStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                hoverAnimation: false,  //经过拐点动画取消
                data: that.arr_zq_data
            }],
            backgroundColor: "#FAE6D2"
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * ZV曲线参数
     **/
    get_option_zv: function (min_sw_gxqx, max_sw_gxqx, min_xs_gxqx, max_xs_gxqx, min_ll_gxqx, max_ll_gxqx) {
        var that = this;
        var option = {
            legend: {
                show: true,
                top: 20,
                left: "center",
                textStyle: {
                    fontSize: 14,
                    color: panelConfig.ECHART_COLOR_LEGEND
                },
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: ["蓄水量", "流量"],
                selected: {
                    "蓄水量": true,
                    "流量": true
                }
            },

            grid: {
                left: 30,
                top: 55,
                right: 35,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: "value",
              //  name: "蓄水量（百万m3）",
                name: '水位（m）',
                nameLocation: "middle",
                nameGap: 20,
                min: min_sw_gxqx,
                max: max_sw_gxqx,
               // min: min_y_gxqx,
              //  max: max_y_gxqx,
                axisLine: {
                    lineStyle: {
                        color: dispatchConfig.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 3,
                    showMaxLabel: false
                }
            },
            yAxis: [{
                type: 'value',
              //  name: '水位（m）',
                name: "蓄水量（百万m3）",
                position: 'left',
                nameGap: 48,
                nameLocation: "middle",
                min: min_xs_gxqx,
                max: max_xs_gxqx,
               // min: min_sw_gxqx,
              //  max: max_sw_gxqx,
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_LINESTYLE_XSL1
                    },
                    onZero: false
                },
                splitLine: {
                    show: true
                },
                axisLabel: {
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        return tools.format_sw(value);
                    }
                }
            }, {
                    type: "value",
                    name: "流量(m³/s)",
                    position: 'right',
                    nameLocation: "middle",
                    nameGap: 48,
                    min: min_ll_gxqx,
                    max: max_ll_gxqx,
                    axisLine: {
                        lineStyle: {
                            color: panelConfig.ECHART_COLOR_LINESTYLE_LL1
                        }
                    },
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 3,
                        showMaxLabel: false
                    }
                }],
            tooltip: {
                show: true,
                trigger: "axis",
                hideDelay: 0,
                axisPointer: {
                    type: "cross",
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: "#0000FF",
                        width: 2
                    }
                },

                formatter: function (ob) {
                    if (ob != null && ob.length > 0) {
                        return tools.format_tooltip_zvq(ob);
                    } else {
                        return "";
                    }
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 5);
                }
            },
            series: [{
                type: 'line',
                name: '蓄水量',
                yAxisIndex: 0,
                symbol: "circle",
                lineStyle: {
                    color: panelConfig.lineObj(panelConfig.ECHART_COLOR_LINESTYLE_XSL1, panelConfig.ECHART_COLOR_LINESTYLE_XSL2)
                },
                itemStyle: {
                    color: panelConfig.lineObj(panelConfig.ECHART_COLOR_LINESTYLE_XSL1, panelConfig.ECHART_COLOR_LINESTYLE_XSL2)
                },
                hoverAnimation: false,  //经过拐点动画取消
                data: that.arr_zv_data
            }, {
                    type: 'line',
                    name: '流量',
                    yAxisIndex: 1,
                    symbol: "circle",
                    lineStyle: {
                         color: panelConfig.lineObj(panelConfig.ECHART_COLOR_LINESTYLE_LL1, panelConfig.ECHART_COLOR_LINESTYLE_LL2)
                    },
                    itemStyle: {
                         color: panelConfig.lineObj(panelConfig.ECHART_COLOR_LINESTYLE_LL1, panelConfig.ECHART_COLOR_LINESTYLE_LL2)
                    },
                    hoverAnimation: false,  //经过拐点动画取消
                    data: that.arr_zq_data
                }],
            backgroundColor: "rgb(24,24,38)"
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * ZQ曲线参数
     **/
    get_option_zq: function (min_sw_gxqx, max_sw_gxqx, min_y_gxqx, max_y_gxqx) {
        var that = this;
        var option = {
            grid: {
                left: 30,
                top: 15,
                right: 15,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                type: "value",
                name: "流量(m³/s)",
                nameLocation: "middle",
                nameGap: 20,
                min: min_y_gxqx,
                max: max_y_gxqx,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    }
                },
                splitLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 3,
                    showMaxLabel: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '水位（m）',
                nameGap: 48,
                nameLocation: "middle",
                min: min_sw_gxqx,
                max: max_sw_gxqx,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    },
                    onZero: false
                },
                splitLine: {
                    show: true
                },
                axisLabel: {
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        return tools.format_sw(value);
                    }
                }
            }],
            tooltip: {
                show: true,
                trigger: "axis",
                hideDelay: 0,
                axisPointer: {
                    type: "cross",
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: "#0000FF",
                        width: 2
                    }
                },
                formatter: function (ob) {
                    return "水位：" + tools.format_sw(ob[0].value[1]) + " m,流量：" + tools.format_ll(ob[0].value[0]) + " m³/s";
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 5);
                }
            },
            series: [{
                type: 'line',
                name: 'ZQ关系曲线',
                symbol: "circle",
                lineStyle: {
                    color: dispatchConfig.ECHART_COLOR_GXQX
                },
                itemStyle: {
                    color: "#000000"
                },
                hoverAnimation: false,  //经过拐点动画取消
                data: that.arr_zq_data
            }],
            backgroundColor: "#FAE6D2"
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

        chartWidth = chartWidth - 80;
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
    initFangAnSelect_zdy: function () {
        $("#fangan_allreday").empty();
        // $("#listNamelhdd").append("<option value='2' selected>规则调度</option>");
        $("#fangan_allreday").append("<option value='-1' selected>无</option>");
        var lis_exit = ["规则调度", "初始状态", "自定义"];
        var objData = {
            autoFore: 0,
            day: selectDays,
            etime: searchEtime,
            hisStormId: _hisStormId,
            plan: searchPlan,
            plusType: _plusType,
            rainPlus: _rainPlus,
            range: searchRange,
            stime: searchStime,
            modelid: getRadioModel()
        };
        var info = JSON.stringify(objData);
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'json',
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-hwhydroinfo/get_ScheduleFaNm",
            data: info,
            success: function (res) {

                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error("查询信息失败！");
                    return;
                }

                var json = res.data;
                if (json.data.length == 0) {
                    tools.loadinghide(false);
                    tools.show_message_error("暂无调度方案数据！");
                    return;
                }
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error(json.msg);
                } else {
                    $.each(json.data, function (index, item) {
                        if ($.inArray(item, lis_exit) == -1) {

                            $("#fangan_allreday").append("<option value='3'>" + item + "</option>");
                            lis_exit.push(item);
                        }

                    })
                    $(".hasfangan").show();
                    return;
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败");
            }

        });

    }
};
