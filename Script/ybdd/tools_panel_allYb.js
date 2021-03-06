/**
 * 面板配置文件
 */
var panelConfig_allYb = {
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
    ECHART_COLOR_LL_DD: "#008000",
    //引水流量
    ECHART_COLOR_YSLL: "#B99388",
    //多年同期-流量
    ECHART_COLOR_LL_DNTQ: "#0F347B",
    //蓄量
    ECHART_COLOR_XL: "#039C93",
    //警戒水位
    ECHART_COLOR_JJSW: "#0000FF",
    //保证水位
    ECHART_COLOR_BZSW: "#8B0000",
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
    ECHART_COLOR_SJSW: "#8B0000",
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
 * Tools_Panel_ALL类-用于展示水情show_all面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2019-01-18 HZX新增
 *      2019-03-07 HZX添加关注功能
 *      2019-10-08 CHL添加树状菜单功能 优化界面
 *      2019-10-12 CHL树状菜单功能优化
 */
var Tools_Panel_AllYb = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel_AllYb.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelSwAllYb",
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

    //////基本信息使用参数//////
    //是否初始化
    is_show_jbxx: false,

    is_modify: false,

    json_data: null,

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


    //////断面信息使用参数//////
    //是否初始化
    is_show_dmxx: false,
    //水位信息
    obj_fcch_dmxx: null,
    //极大极小数据
    obj_minMax_dmxx: null,
    //数据源
    obj_data_dmxx: null,

    //////历史极值使用参数//////
    //是否初始化
    is_show_lsjz: false,
    //极大值 显示值
    str_max_rank: "",
    //极大值 显示值
    str_min_rank: "",

    obj_yb_graphic: null,

    //预报统计表格数据
    //中间数据
    html_hd_model: "",
    html_sk_model: "",
    html_hp_model: "",

    //各模型数据（动态选择模型）
    htmlHdModel: "",
    htmlSkModel: "",
    htmlHpModel: "",

    //各模型数据
    html_hd_model1: "",
    html_hd_model2: "",
    html_hd_model3: "",
    html_hd_mge: "",

    html_sk_model1: "",
    html_sk_model2: "",
    html_sk_model3: "",
    html_sk_mge: "",

    html_hd_thead: "",
    html_sk_thead: "",
    html_hp_thead: "",

    //getStcdFor各模型数据
    API6Data: null,
    API2Data: null,
    XAJ2Data: null,
    MGE2Data: null,

    //getStcdFor各模型过程线数据(云平台)
    modelData: new Array(),
    //模型数据-云平台版本
    obj_data_model: null,
    //特征统计表下拉框中选择的Model
    selectOptionModel: "",

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        /*  if (panelConfig_allYb.panel_default_height > $(document).height()) {
              panelConfig_allYb.panel_default_height = $(document).height();
          }*/
        that.setPanelSize(panelConfig_allYb.panel_default_width, panelConfig_allYb.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody_AllYb")[0]);
        //echarts实例-日雨量柱状图
        that.chartRyl = echarts.init($("#rainInfoBody_AllYb")[0]);
        //echarts实例-时段雨量柱状图
        that.chartSdyl = echarts.init($("#rainInfoHourBody_AllYb")[0]);
        //echarts实例-断面信息
        that.chartDm = echarts.init($("#dmInfoBody_AllYb")[0]);
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
                    "margin-left": "-" + panelConfig_allYb.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig_allYb.panel_default_height : panelConfig_allYb.panel_default_height2 + panelConfig_allYb.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = panelConfig_allYb.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig_allYb.panel_default_height : panelConfig_allYb.panel_default_height2 + panelConfig_allYb.table_height_yb;
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
            //刷新拖动点
            that.reflashDragPoint(3);
        });

        /**
         * 最小化按钮
         **/
        $(that.parentId).find('.fa-minus-circle').click(function () {
            $(that.parentId).hide();
            $("#show_panel_all").removeAttr("checked");
        })

        /**
         * 模态框显示/隐藏事件
         **/
        $(that.parentId).find('.icon-close').click(function () {

            //hideTZB();
            $("#show_panel_all").removeAttr("checked");
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));

            return;
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
            that.chartRyl.clear();
            that.chartSdyl.clear();
            that.chartDm.clear();

            $("#proLineBody_AllYb").show();

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
            //获取当前页面所有可见的table（vislible为false时是全部的），.columns.adjust()然后在强制计算宽度,解决TAB切换时表头不正确问题
            $.fn.dataTable.tables({
                visible: true,
                api: true
            }).columns.adjust();

            that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);
        });

        /**
         * 基本信息TAB点击事件
         **/
        $("#linkStationInfo_AllYb").click(function () {
            if (!that.is_show_jbxx) {
                if (that.show_type == "3" && that.show_sttp == "XX") {
                    that.create_table_jbxx_dd();
                } else {
                    that.create_table_jbxx();
                }
                that.is_show_jbxx = true;
            }
        });

        /**
         * 过程线TAB点击事件
         **/
        $("#linkProLine_AllYb").click(function () {
            // if (!that.is_show_gcx) {
            if (that.show_type == "1") {
                that.echart_line_gcx_real(that.show_btime, that.show_etime);
                that.add_click_gcx_real();
            } else if (that.show_type == "2") {
                //that.echart_line_gcx_for(that.show_btime, that.show_etime);
                that.echart_line_gcx_for_new(that.show_btime, that.show_etime);
                that.add_click_gcx_for();
            } else if (that.show_type == "3") {
                //行蓄洪区单独展示
                if (that.show_sttp == "XX") {
                    that.echart_line_gcx_xx(that.show_btime, that.show_etime);
                    that.add_click_gcx_comon();
                } else {
                    that.echart_line_gcx_dd(that.show_btime, that.show_etime);
                    that.add_click_gcx_dd();
                }
            }
            that.is_show_gcx = true;

            // }
        });

        /**
         * 降雨信息TAB点击事件
         **/
        $("#linkRainInfo_AllYb").click(function () {
            if (!that.is_show_jyxx) {
                $("#btnSearchRain_AllYb").click();
                //that.is_show_jyxx = true;

            }
        });

        /**
         * 降雨信息查询按钮
         **/
        $("#btnSearchRain_AllYb").click(function () {
            $("#rainInfoBody_AllYb").show();
            $("#rainInfoHourBody_AllYb").hide();
            $("#btnReturnRyl_AllYb").hide();

            //调用降雨信息
            that.echart_bar_rain(that.show_btime, that.show_etime);

        });

        /**
         * 返回日雨量-按钮
         **/
        $("#btnReturnRyl_AllYb").click(function () {
            $("#rainInfoBody_AllYb").show();
            $("#rainInfoHourBody_AllYb").hide();
            $(this).hide();
        });


        /**
         * 断面信息TAB点击事件
         **/
        $("#linkDmInfo_AllYb").click(function () {
            if (!that.is_show_dmxx) {
                that.echart_line_dmxx();
                that.is_show_dmxx = true;
                that.add_click_dm();
            }
        });

        /**
         * 历史极值TAB点击事件
         **/
        /* $("#linkRankList").click(function () {
            if (!that.is_show_lsjz) {
                that.create_table_lsjz();
                that.is_show_lsjz = true;
            }
        });
        $("#linkRankMax").click(function () {
            $("#contRankList .spanRank").html(that.str_max_rank);
        });
        $("#linkRankMin").click(function () {
            $("#contRankList .spanRank").html(that.str_min_rank);
        }); */

        //统计表点击事件
        $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").on("click", ".link-stcd", function () {
            that.is_show_jbxx = false;
            that.is_show_gcx = false;
            that.is_show_dmxx = false;
            that.is_show_lsjz = false;
            that.show_stcd = $(this).attr("_stcd");
            that.show_stnm = $(this).attr("_stnm");
            if ($(this).parent().parent().hasClass("tableXx")) {
                that.show_sttp = "XX";
            } else {
                if ($(this).attr("_sttp") == "ZQ") {
                    that.show_sttp = "ZZ";
                } else if ($(this).attr("_sttp") == "HP") {
                    that.show_sttp = "RR";
                } else {
                    that.show_sttp = $(this).attr("_sttp");
                }
            }
            $(that.parentId + " .tableHd tr," + that.parentId + " .tableSk tr," + that.parentId + " .tableHp tr," + that.parentId + " .tableXx tr").removeClass("hover");
            $(this).addClass("hover");
            //当前标签页内容更新
            $(".tb_body_allYb li.active a:eq(0)").click();
        });

        //统计表切换事件
        $(that.parentId + " .tj_body_all li a").click(function (e) {
            // var _html_hd_thead = that.obj_data_model.hdHead[0];
            // $("#tableHd_tj_Yb thead").append(_html_hd_thead);
            // var _html_sk_thead = that.obj_data_model.skHead[0];
            // $("#tableSk_tj_Yb thead").append(_html_sk_thead);
            if (!(that.show_type == "3" && that.show_all))
                return;

            if ($(this).attr("id") == "linkTj_Xx_AllYb") {
                $("#linkDmInfo_AllYb").parent().hide();
                $("#linkRankList").parent().hide();
            } else {
                $("#linkDmInfo_AllYb").parent().show();
                $("#linkRankList").parent().show();
            }
            if ($(this).attr("id") == "linkTj_Kzztz_AllYb") { //add by chl 2019-11-15
                that.getKzztzTableInfo();
            }

        });

        that.change_table_jh_input();

        //模型radio切换点击事件
        $("#modelRadio").delegate(".dropdown li", "click", function () {
            var checkedModel = $(this).attr('value_');
            //获取选择的模型在显示过程线时判断改站点是否有此模型数据
            that.selectOptionModel = checkedModel;
            $.each(that.obj_data_model.modelName, function (i, item) {
                if (checkedModel == item) {
                    //清空初始化表格
                    $('#tableHd_tj_Yb tbody').empty();
                    // $('#tableHd_tj_Yb thead').empty();
                    // $('#contTj_Hd_AllYb .tableHd thead').empty();
                    $('#tableSk_tj_Yb tbody').empty();
                    // $('#tableSk_tj_Yb thead').empty();
                    // $('#contTj_Sk_AllYb .tableSk thead').empty();
                    $('#tableHp_tj_Yb tbody').empty();
                    // $('#tableHp_tj_Yb thead').empty();
                    // $('#contTj_Hp_AllYb .tableHp thead').empty();
                    $('#tableXx_tj tbody').empty();
                    // $('#tableXx_tj thead').empty();
                    // $('#contTj_Xx_AllYb .tableXx thead').empty();
                    // if ($('#tableHd_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHd_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHd_tj_Yb thead').empty();
                    // }
                    // if ($('#tableSk_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableSk_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableSk_tj_Yb thead').empty();
                    // }
                    // if ($('#tableHp_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHp_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHp_tj_Yb thead').empty();
                    // }
                    //填充数据
                    if (that.obj_data_model.hdData.length > 0) {
                        var _html_hd_thead = that.obj_data_model.hdHead[0];
                        // $("#tableHd_tj_Yb thead").append(_html_hd_thead);
                        $("#tableHd_tj_Yb tbody").append(that.obj_data_model.hdData[i]);
                        //排序
                        $('#tableHd_tj_Yb').DataTable({ //河道
                            "destroy": true,
                            "retrieve": true,
                            "bStateSave": false,
                            // 是否允许检索
                            "searching": false,
                            // 是否允许排序
                            "ordering": false,
                            // 是否允许翻页，设成false，翻页按钮不显示
                            "paging": false,
                            // 水平滚动条
                            "scrollX": false,
                            // 垂直滚动条
                            "scrollY": 165,
                            // 件数选择功能 默认true
                            "lengthChange": false,
                            // 自动列宽
                            "autoWidth": true,
                            "stateSave": true, //刷新时是否保存状态
                            "scrollCollapse": true,
                            "bAutoWidth": false,
                            "bScrollCollapse": true, //是否开启DataTables的高度自适应
                        });

                    }
                    if (that.obj_data_model.skData.length > 0) {
                        var _html_sk_thead = that.obj_data_model.skHead[0];
                        // that.htmlSkModel = that.obj_data_model.skData[0];
                        // $("#tableSk_tj_Yb thead").append(_html_sk_thead);
                        $("#tableSk_tj_Yb tbody").append(that.obj_data_model.skData[i]);
                        $('#tableSk_tj_Yb').DataTable({ //水库
                            "destroy": true,
                            "retrieve": true,
                            "bStateSave": false,
                            // 是否允许检索
                            "searching": false,
                            // 是否允许排序
                            "ordering": false,
                            // "columnDefs": [{
                            //     "data": null,
                            //     "targets": 0,
                            //     "orderable": false
                            // }],
                            // "fnDrawCallback": function () {
                            //     var api = this.api();
                            //     var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数 　
                            //     api.column(0).nodes().each(function (cell, i) {
                            //         cell.innerHTML = startIndex + i + 1;
                            //     });
                            // },
                            "order": [
                                [4, "desc"]
                            ],
                            // 是否允许翻页，设成false，翻页按钮不显示
                            "paging": false,
                            // 水平滚动条
                            "scrollX": false,
                            // 垂直滚动条
                            "scrollY": 165,
                            // 件数选择功能 默认true
                            "lengthChange": false,
                            // 自动列宽
                            "autoWidth": false,
                            "stateSave": true, //刷新时是否保存状态
                            "scrollCollapse": true,
                            "bAutoWidth": false,
                            "bScrollCollapse": true, //是否开启DataTables的高度自适应
                        });
                    }
                    $("#contTj_Hd_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    $("#contTj_Sk_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    //绘图
                    // var model_ = $(this).attr('model_');
                    if (that.modelData[i] == undefined) {
                        tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error_const("当前站点未配置该计算模型!");
                    }
                    that.echart_line_gcx_for_model(that.modelData[i]);
                }
            })
        })
        $("#modelRadio").delegate(".triangle-up", "click", function () {
            var checkedModel = that.getRadioOptions();
            //获取选择的模型在显示过程线时判断改站点是否有此模型数据
            that.selectOptionModel = checkedModel;
            $.each(that.obj_data_model.modelName, function (i, item) {
                if (checkedModel == item) {
                    //清空初始化表格
                    $('#tableHd_tj_Yb tbody').empty();
                    // $('#tableHd_tj_Yb thead').empty();
                    // $('#contTj_Hd_AllYb .tableHd thead').empty();
                    $('#tableSk_tj_Yb tbody').empty();
                    // $('#tableSk_tj_Yb thead').empty();
                    // $('#contTj_Sk_AllYb .tableSk thead').empty();
                    $('#tableHp_tj_Yb tbody').empty();
                    // $('#tableHp_tj_Yb thead').empty();
                    // $('#contTj_Hp_AllYb .tableHp thead').empty();
                    $('#tableXx_tj tbody').empty();
                    // $('#tableXx_tj thead').empty();
                    // $('#contTj_Xx_AllYb .tableXx thead').empty();
                    // if ($('#tableHd_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHd_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHd_tj_Yb thead').empty();
                    // }
                    // if ($('#tableSk_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableSk_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableSk_tj_Yb thead').empty();
                    // }
                    // if ($('#tableHp_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHp_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHp_tj_Yb thead').empty();
                    // }
                    //填充数据
                    // var _html_hd_thead = that.obj_data_model.hdHead[0];
                    // $("#tableHd_tj_Yb thead").append(_html_hd_thead);
                    $("#tableHd_tj_Yb tbody").append(that.obj_data_model.hdData[i]);
                    $("#tableSk_tj_Yb tbody").append(that.obj_data_model.skData[i]);
                    // var _html_sk_thead = that.obj_data_model.skHead[0];
                    // $("#tableSk_tj_Yb thead").append(_html_sk_thead);
                    //排序
                    $('#tableHd_tj_Yb').DataTable({ //河道
                        "destroy": true,
                        "retrieve": true,
                        "bStateSave": false,
                        // 是否允许检索
                        "searching": false,
                        // 是否允许排序
                        "ordering": false,
                        // 是否允许翻页，设成false，翻页按钮不显示
                        "paging": false,
                        // 水平滚动条
                        "scrollX": false,
                        // 垂直滚动条
                        "scrollY": 165,
                        // 件数选择功能 默认true
                        "lengthChange": false,
                        // 自动列宽
                        "autoWidth": true,
                        "stateSave": true, //刷新时是否保存状态
                        "scrollCollapse": true,
                        "bAutoWidth": false,
                        "bScrollCollapse": true, //是否开启DataTables的高度自适应
                    });

                    $('#tableSk_tj_Yb').DataTable({ //水库
                        "destroy": true,
                        "retrieve": true,
                        "bStateSave": false,
                        // 是否允许检索
                        "searching": false,
                        // 是否允许排序
                        "ordering": false,
                        // "columnDefs": [{
                        //     "data": null,
                        //     "targets": 0,
                        //     "orderable": false
                        // }],
                        // "fnDrawCallback": function () {
                        //     var api = this.api();
                        //     var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数 　
                        //     api.column(0).nodes().each(function (cell, i) {
                        //         cell.innerHTML = startIndex + i + 1;
                        //     });
                        // },
                        "order": [
                            [4, "desc"]
                        ],
                        // 是否允许翻页，设成false，翻页按钮不显示
                        "paging": false,
                        // 水平滚动条
                        "scrollX": false,
                        // 垂直滚动条
                        "scrollY": 165,
                        // 件数选择功能 默认true
                        "lengthChange": false,
                        // 自动列宽
                        "autoWidth": true,
                        "stateSave": true, //刷新时是否保存状态
                        "scrollCollapse": true,
                        "bAutoWidth": false,
                        "bScrollCollapse": true, //是否开启DataTables的高度自适应
                    });
                    $("#contTj_Hd_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    $("#contTj_Sk_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    //绘图
                    // var model_ = $(this).attr('model_');
                    if (that.modelData[i] == undefined) {
                        tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error_const("当前站点未配置该计算模型!");
                    }
                    that.echart_line_gcx_for_model(that.modelData[i]);
                }
            })
        })
        $("#modelRadio").delegate(".spin-down", "click", function () {
            var checkedModel = that.getRadioOptions();
            //获取选择的模型在显示过程线时判断改站点是否有此模型数据
            that.selectOptionModel = checkedModel;
            $.each(that.obj_data_model.modelName, function (i, item) {
                if (checkedModel == item) {
                    //清空初始化表格
                    $('#tableHd_tj_Yb tbody').empty();
                    // $('#tableHd_tj_Yb thead').empty();
                    // $('#contTj_Hd_AllYb .tableHd thead').empty();
                    $('#tableSk_tj_Yb tbody').empty();
                    // $('#tableSk_tj_Yb thead').empty();
                    // $('#contTj_Sk_AllYb .tableSk thead').empty();
                    $('#tableHp_tj_Yb tbody').empty();
                    // $('#tableHp_tj_Yb thead').empty();
                    // $('#contTj_Hp_AllYb .tableHp thead').empty();
                    $('#tableXx_tj tbody').empty();
                    // $('#tableXx_tj thead').empty();
                    // $('#contTj_Xx_AllYb .tableXx thead').empty();
                    // if ($('#tableHd_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHd_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHd_tj_Yb thead').empty();
                    // }
                    // if ($('#tableSk_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableSk_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableSk_tj_Yb thead').empty();
                    // }
                    // if ($('#tableHp_tj_Yb').hasClass('dataTable')) {
                    //     var oldTable = $('#tableHp_tj_Yb').dataTable();
                    //     oldTable.fnClearTable(); //清空一下table
                    //     oldTable.fnDestroy(); //还原初始化了的dataTable
                    //     //$('#tableHp_tj_Yb thead').empty();
                    // }
                    //填充数据
                    var _html_hd_thead = that.obj_data_model.hdHead[0];
                    // $("#tableHd_tj_Yb thead").append(_html_hd_thead);
                    $("#tableHd_tj_Yb tbody").append(that.obj_data_model.hdData[i]);
                    $("#tableSk_tj_Yb tbody").append(that.obj_data_model.skData[i]);
                    // var _html_sk_thead = that.obj_data_model.skHead[0];
                    // $("#tableSk_tj_Yb thead").append(_html_sk_thead);
                    //排序
                    $('#tableHd_tj_Yb').DataTable({ //河道
                        "destroy": true,
                        "retrieve": true,
                        "bStateSave": false,
                        // 是否允许检索
                        "searching": false,
                        // 是否允许排序
                        "ordering": false,
                        // 是否允许翻页，设成false，翻页按钮不显示
                        "paging": false,
                        // 水平滚动条
                        "scrollX": false,
                        // 垂直滚动条
                        "scrollY": 165,
                        // 件数选择功能 默认true
                        "lengthChange": false,
                        // 自动列宽
                        "autoWidth": true,
                        "stateSave": true, //刷新时是否保存状态
                        "scrollCollapse": true,
                        "bAutoWidth": false,
                        "bScrollCollapse": true, //是否开启DataTables的高度自适应
                    });

                    $('#tableSk_tj_Yb').DataTable({ //水库
                        "destroy": true,
                        "retrieve": true,
                        "bStateSave": false,
                        // 是否允许检索
                        "searching": false,
                        // 是否允许排序
                        "ordering": false,
                        // "columnDefs": [{
                        //     "data": null,
                        //     "targets": 0,
                        //     "orderable": false
                        // }],
                        // "fnDrawCallback": function () {
                        //     var api = this.api();
                        //     var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数 　
                        //     api.column(0).nodes().each(function (cell, i) {
                        //         cell.innerHTML = startIndex + i + 1;
                        //     });
                        // },
                        "order": [
                            [4, "desc"]
                        ],
                        // 是否允许翻页，设成false，翻页按钮不显示
                        "paging": false,
                        // 水平滚动条
                        "scrollX": false,
                        // 垂直滚动条
                        "scrollY": 165,
                        // 件数选择功能 默认true
                        "lengthChange": false,
                        // 自动列宽
                        "autoWidth": true,
                        "stateSave": true, //刷新时是否保存状态
                        "scrollCollapse": true,
                        "bAutoWidth": false,
                        "bScrollCollapse": true, //是否开启DataTables的高度自适应
                    });
                    $("#contTj_Hd_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    $("#contTj_Sk_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                        if ($(item).attr('_stcd') == that.show_stcd) {
                            $(item).addClass("hover");
                        }
                    })
                    //绘图
                    // var model_ = $(this).attr('model_');
                    if (that.modelData[i] == undefined) {
                        tools.hideChartLoading(that.chartGcx);
                        tools.show_message_error_const("当前站点未配置该计算模型!");
                    }
                    that.echart_line_gcx_for_model(that.modelData[i]);
                }
            })
        })

        //水动力预报按钮点击事件
        $(that.parentId + " #data_HydraForcastCalculate").click(function () {
            get_sdlyb_data(selectDays, searchEtime, searchPlan, searchRange, searchStime)
        })


    },
    update_ybsw_option: function () {
        var that = this;
        var old_min = that.obj_minMax_gcx.sw.min;
        var old_max = that.obj_minMax_gcx.sw.max;
        var new_min = Math.min.apply(null, that.obj_data_gcx_y_value.ybsw);
        var new_max = Math.max.apply(null, that.obj_data_gcx_y_value.ybsw);
        that.obj_minMax_gcx.sw.min = Math.min(new_min, old_min);
        that.obj_minMax_gcx.sw.max = Math.max(new_max, old_max);


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
    update_ybll_option: function () {
        var that = this;
        var old_min = that.obj_minMax_gcx.ll.min;
        var old_max = that.obj_minMax_gcx.ll.max;
        var new_min = Math.min.apply(null, that.obj_data_gcx_y_value.ll_in);
        var new_max = Math.max.apply(null, that.obj_data_gcx_y_value.ll_in);
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

    setActiveGraphicState: function (type, state) {
        var that = this;
        if (type == 1) {
            $.each(that.obj_data_gcx_y_modifyIndex.ybsw, function (index, _value) {
                that.obj_yb_graphic.arr_graphic[_value].invisible = state;
            });
        } else if (type == 2) {
            $.each(that.obj_data_gcx_y_modifyIndex.ll_in, function (index, _value) {
                if (that.show_sttp == "RR") {
                    that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + _value].invisible = state;

                } else {
                    that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + _value].invisible = state;

                }
            });
        }
        that.updateChartGcxGraphic();
    },


    setDragPointShowOrHide: function (type, index, isupdatenow) {
        var that = this;
        //刷新拖动点
        if ($(".ybsw-modify").is(":visible")) {

            if (type == 1) {
                if (that.obj_data_gcx_bk.ybsw[index].value[1] != that.obj_data_gcx.ybsw[index].value[1]) {

                    that.obj_yb_graphic.arr_graphic[index].invisible = false;
                } else {
                    that.obj_yb_graphic.arr_graphic[index].invisible = true;

                    that.obj_data_gcx_y_modifyIndex.ybsw.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ybsw), 1);


                }

            }
            if (type == 2) {
                if (that.show_sttp == "RR") {
                    if (that.obj_data_gcx_bk.ll_in[index].value[1] != that.obj_data_gcx.ll_in[index].value[1]) {

                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = false;

                    } else {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                        that.obj_data_gcx_y_modifyIndex.ll_in.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ll_in), 1);
                    }
                } else {
                    if (that.obj_data_gcx_bk.ll_in[index].value[1] != that.obj_data_gcx.ybll[index].value[1]) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = false;

                    } else {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                        that.obj_data_gcx_y_modifyIndex.ll_in.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ll_in), 1);
                    }

                }

            }
            if (isupdatenow) {
                that.updateChartGcxGraphic();
            }

        }

    },
    updateChartGcxGraphic: function () {
        var that = this;
        that.chartGcx.setOption({
            graphic: that.obj_yb_graphic.arr_graphic,

        });
    },
    reflashDragPoint: function (type) {
        var that = this;
        //刷新拖动点
        if ($(".ybsw-modify").is(":visible")) {

            if ((type == 1) || (type == 3)) {
                $.each(that.obj_data_gcx.ybsw, function (index, value) {
                    that.obj_yb_graphic.arr_graphic[index].position = that.chartGcx.convertToPixel({
                        xAxisIndex: 0,
                        yAxisIndex: 0
                    }, that.obj_data_gcx.ybsw[index].value);
                });
            }
            if ((type == 2) || (type == 3)) {
                if (that.show_sttp == "RR") {
                    $.each(that.obj_data_gcx.ll_in, function (index, value) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].position = that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, that.obj_data_gcx.ll_in[index].value);
                    });
                } else {
                    $.each(that.obj_data_gcx.ybll, function (index, value) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].position = that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, that.obj_data_gcx.ybll[index].value);
                    });
                }
            }
            that.updateChartGcxGraphic();

        }
    },

    change_table_jh_input: function () {

        var that = this;
        $("#contProLine_AllYb .tableSqxx").on("input propertychange", "input", function () {
            //强制改为数字
            var newVal = $(this).val().replace(/[^\d]/g, '');
            if (newVal == "") {
                $(this).val(0);
            }
            var input_type = 0;
            if ($(this).hasClass("md_sw")) {
                input_type = 1;
            } else if ($(this).hasClass("md_ll")) {
                input_type = 2;
            }
            //  alert(input_type);
            //更新后的值
            var val = $(this).val();
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                if (val >= that.obj_fcch_gcx.bzsw) {
                    $(this).css("color", "red");
                } else if (val >= that.obj_fcch_gcx.jjsw) {
                    $(this).css("color", "blue");
                } else if (val < that.obj_fcch_gcx.jjsw) {
                    $(this).css("color", "black");
                }
            }
            if (that.show_sttp == "RR") {
                if (val >= that.obj_fcch_gcx.jhsw || val >= that.obj_fcch_gcx.sjsw) {
                    $(this).css("color", "red");
                } else if (val >= that.obj_fcch_gcx.xxsw) {
                    $(this).css("color", "blue");
                } else if (val < that.obj_fcch_gcx.xxsw) {
                    $(this).css("color", "black");
                }
            }
            //更新列的索引
            var colIndex = $(this.parentNode).prevAll().length;
            var rowIndex = $(this.parentNode).parent().prevAll().length;

            if (input_type == 1) {
                var _index = $.inArray(rowIndex, that.obj_data_gcx_y_modifyIndex.ybsw);

                if (_index < 0) {
                    that.obj_data_gcx_y_modifyIndex.ybsw.push(rowIndex);
                }
                var all_index = $.inArray(rowIndex, that.obj_data_gcx_y_modifyIndex_all);
                if (all_index < 0) {
                    that.obj_data_gcx_y_modifyIndex_all.push(rowIndex);
                }
                that.obj_data_gcx.ybsw[rowIndex].value[1] = val;
                that.obj_data_gcx_y_value.ybsw[rowIndex] = val;
                that.chartGcx.setOption({
                    series: [{
                        id: 'id_series_ybsw',
                        data: that.obj_data_gcx.ybsw
                    }],

                });


                that.update_ybsw_option();
                that.reflashDragPoint(1);

                var state = that.chartGcx.getOption().legend[0].selected.预报水位;
                if (state == true) {
                    that.setDragPointShowOrHide(1, rowIndex, true);

                }

            } else if (input_type == 2) {
                var _index = $.inArray(rowIndex, that.obj_data_gcx_y_modifyIndex.ll_in);

                if (_index < 0) {
                    that.obj_data_gcx_y_modifyIndex.ll_in.push(rowIndex);
                }
                var all_index = $.inArray(rowIndex, that.obj_data_gcx_y_modifyIndex_all);
                if (all_index < 0) {
                    that.obj_data_gcx_y_modifyIndex_all.push(rowIndex);
                }
                if (that.show_sttp == "RR") {
                    that.obj_data_gcx.ll_in[rowIndex].value[1] = val;
                    that.obj_data_gcx_y_value.ll_in[rowIndex] = val;
                    that.chartGcx.setOption({
                        series: [{
                            id: 'id_series_ybll',
                            data: that.obj_data_gcx.ll_in
                        }],

                    });
                } else {

                    that.obj_data_gcx.ybll[rowIndex].value[1] = val;
                    that.obj_data_gcx_y_value.ll_in[rowIndex] = val;
                    that.chartGcx.setOption({
                        series: [{
                            id: 'id_series_ybll',
                            data: that.obj_data_gcx.ybll
                        }],

                    });
                }

                that.update_ybll_option();
                that.reflashDragPoint(2);
                that.setDragPointShowOrHide(2, rowIndex, true);


            }

        });
    },
    /**
     *获取控制站特征表格信息
     *add by chl 2019-11-15
     **/
    getKzztzTableInfo: function () {
        var that = this;
        var objData = {
            range: searchRange,
            stime: searchStime,
            etime: searchEtime,
            userId: $("#_hid_userid").val(),
            plan: searchPlan,
            day: selectDays
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: "PanelNew.aspx/get_KzStationTZ01",
            data: "{'info':'" + info + "'}",
            success: function (data) {
                if (data.d == null || data.d == "") {
                    tools.loadinghide(false);
                    tools.show_message_error("获取表格信息失败!");
                    return;
                }
                var json = JSON.parse(data.d);
                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                } else {
                    that.create_table_kzztz(json);
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

    },
    /**
     *生成控制站特征表格
     *add by chl 2019-11-15
     **/
    create_table_kzztz: function (json) {
        var arr_ = json.data;
        var html_th = new StringBuffer();
        var html_td = new StringBuffer();

        for (var i = 0; i < arr_.length; i++) {
            if (i == 0) { //表头
                for (var j = 0; j < arr_[i].length; j++) {
                    if (j == 0) {
                        html_th += "<tr><th>" + arr_[i][j] + "</th>";
                    } else {
                        if (i == arr_[i].length - 1) {
                            html_th += "<th>" + arr_[i][j] + "</th></tr>";
                        } else {
                            html_th += "<th>" + arr_[i][j] + "</th>";
                        }
                    }
                }
            } else { //表体
                if (i < 4) { //读取前三条数据
                    for (var j = 0; j < arr_[i].length; j++) {
                        if (j == 0) {
                            html_td += "<tr><td>" + arr_[i][j] + "</td>";
                        } else {
                            if (j == arr_[i].length - 1) {
                                html_td += "<td>" + arr_[i][j] + "</td></tr>";
                            } else {
                                html_td += "<td>" + arr_[i][j] + "</td>";
                            }
                        }
                    }
                }
                if (i > arr_.length - 3) { //读取最后两行数据
                    for (var j = 0; j < arr_[i].length; j++) {
                        if (j == 0) {
                            html_td += "<tr><td>" + arr_[i][j] + "</td>";
                        } else {
                            if (j == arr_[i].length - 1) {
                                html_td += "<td>" + arr_[i][j] + "</td></tr>";
                            } else {
                                html_td += "<td>" + arr_[i][j] + "</td>";
                            }
                        }
                    }
                }
            }
        }
        $("#kzztz_table_AllYb thead").html("");
        $("#kzztz_table_AllYb tbody").html("");
        $("#kzztz_table_AllYb thead").append(html_th.toString());
        $("#kzztz_table_AllYb tbody").append(html_td.toString());
    },
    /**
     * 展示面板
     * _stcd站码 _stnm站名 _time截止时间 _sttp站类 _btime开始时间(非必填)
     **/
    panelShow: function (_stcd, _stnm, _time, _sttp, _btime) {
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
        if (_sttp == "ZQ") {
            _sttp = "ZZ";
        } else if (_sttp == "HP") {
            _sttp = "RR";
        }
        that.show_stcd = _stcd;
        that.show_stnm = _stnm;
        that.show_sttp = _sttp;
        that.show_etime = _time;

        //展示面板
        $(that.parentId).show();
        if (that.show_type == "2" || that.show_type == "3") {
            //$("#linkTj_Sk_AllYb").click();
        }

        that.panel_actual_width = panelConfig_allYb.panel_default_width;
        that.panel_actual_height = that.show_type == "1" ? panelConfig_allYb.panel_default_height : panelConfig_allYb.panel_default_height2 + panelConfig_allYb.table_height_yb;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        //全部站统计表
        $(".tj_body_all").show();
        $("#btn_ybsw-modify").css({
            "display": "none"
        });
        $("#btn_ybsw-save").css({
            "display": "none"
        });
        //2019-10-12 add by chl
        //$("#treeMenuSw").hide();
        $("#panelSwAllYb .form-inline").css({
            "float": "none",
            "margin-left": 0

        })

        if (that.show_type == "3") {
            $("#data_outYb").css({
                "display": "none"
            });
            $("#linkTj_Xx_AllYb").parent().show();
            $("#linkTj_Kzztz_AllYb").parent().show(); //2019-11-15 add by chl
        } else {
            $("#data_outYb").css({
                "display": "block"
            });
            $("#linkTj_Xx_AllYb").parent().hide();
            $("#linkTj_Kzztz_AllYb").parent().hide(); //2019-11-15 add by chl
        }
        $("#contProLine_AllYb .sidebar-right,#contProLine_AllYb .sidebar-control-right").hide();
        $("#contProLine_AllYb .field_yb").hide();
        $(that.parentId).find(".panel-header").css({
            "text-align": "center"
        });

        that.create_table_ybtj_new();
        //that.modifyFormInline(that.panel_actual_width);
        $(that.parentId).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + that.panel_actual_width / 2 + "px",
            "margin-top": "-" + that.panel_actual_height / 2 + "px"
        });
        //that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

        //根据站类显示不同的内容
        var _html_header = "";
        if (that.show_type == "2" || that.show_type == "3") {
            if (that.show_all) {
                if (that.show_type == "2") {
                    if (isHzh == true) {
                        _html_header = "洪泽湖以上各站点预报特征统计表";
                    } else {
                        _html_header = searchRangeName + "各站点预报特征统计表";
                    }
                } else {
                    if (isHzh == true) {
                        _html_header = "调度后洪泽湖以上各站点特征统计表";
                    } else {
                        _html_header = "调度后" + searchRangeName + "各站点特征统计表";
                    }
                }
            } else {
                if (that.show_type == "2") {
                    _html_header = "站点预报详细信息-" + _stnm;
                } else {
                    _html_header = "站点调度后详细信息-" + _stnm;
                }
            }
        }
        var days_forward_gcx = -3;
        if (that.show_sttp == "ZZ") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "河道站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig_allYb.days_forward_zz;
        } else if (that.show_sttp == "DD") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "闸坝站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig_allYb.days_forward_dd;
        } else if (that.show_sttp == "RR") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "水库站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig_allYb.days_forward_rr;
        }
        if (_btime == "" || _btime == null || _btime == undefined) {
            that.show_btime = moment(_time).add(days_forward_gcx, 'days').format("YYYY-MM-DD 08:00:00");
        } else {
            that.show_btime = _btime;
        }

        //默认显示过程线
        //if (!((that.show_type == "2" || that.show_type == "3") && that.show_all)) {
        //    $("#linkProLine_AllYb").click();
        //}
        // $("#linkProLine_AllYb").click();
        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true, //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig_allYb.panel_default_height,
            minWidth: panelConfig_allYb.panel_default_width,
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

    resizeYBTZZWindow: function () {
        var that = this;
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
    },
    /**
     * 关闭面板
     **/
    panelHide: function () {
        var that = this;
        $(that.parentId).find('.icon-close').click();
    },
    /**
     * 生成表格-基本信息
     **/
    create_table_jbxx: function () {
        var that = this;
        //先清空表格
        $("#contStatinInfo_AllYb .table-jbxx tr").remove();

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

                $("#contStatinInfo_AllYb .table-jbxx").append(html_empty.toString());
            },
            error: function (errorMsg) {
                tools.show_message_error("获取测站基本信息失败!");
                return;
            }
        });
    },
    /**
     * 基本信息(行蓄洪区)
     */
    create_table_jbxx_dd: function () {
        var that = this;
        //先清空表格
        $("#contStatinInfo_AllYb .table-jbxx tr").remove();
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
                _html += "<tr><td colspan='4'>" + "" + "</td></tr>";

                $("#contStatinInfo_AllYb .table-jbxx").append(_html);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取基本信息失败!");
                return;
            }
        });
    },
    /**
     * 生成表格-预报特征统计新版 - modify by chl 20210315
     **/
    create_table_ybtj_new: function () {
        var that = this;
        if (that.show_type == "2") {
            $("#span_loading_jdt").html("查询预报统计信息中...");
        } else {
            $("#span_loading_jdt").html("查询调度后统计信息中...");
        }
        //  $(".loading-layer").show();

        if (that.show_type == "2" && that.show_stnm != "洪泽湖") {
            $("#linkTj_Hd_AllYb").click();
        } else if (that.show_type == "2" && that.show_stnm == "洪泽湖") {
            $("#linkTj_Hp_AllYb").click();
        } else if (that.show_type == "3" && that.show_stnm != "洪泽湖") {
            $("#linkTj_Xx_AllYb").click();
        } else if (that.show_type == "3" && that.show_stnm == "洪泽湖") {
            $("#linkTj_Hp_AllYb").click();
        }
        //是否已经查询过
        var range = searchRange;
        var stime = searchStime;
        var etime = searchEtime;
        var plan = searchPlan;
        var day = selectDays;
        //先清空数据
        $('#tableHd_tj_Yb tbody').empty();
        $('#tableHd_tj_Yb thead').empty();
        $('.dataTables_scrollBody .tableHd thead').empty();
        $('#tableSk_tj_Yb tbody').empty();
        $('#tableSk_tj_Yb thead').empty();
        $('.dataTables_scrollBody .tableSk thead').empty();
        $('#tableHp_tj_Yb tbody').empty();
        $('#tableHp_tj_Yb thead').empty();
        $('.dataTables_scrollBody .tableHp thead').empty();
        $('#tableXx_tj tbody').empty();
        $('#tableXx_tj thead').empty();
        // $('#contTj_Xx_AllYb .tableXx thead').empty();
        // if ($('#tableHd_tj_Yb').hasClass('dataTable')) {
        //     var oldTable = $('#tableHd_tj_Yb').dataTable();
        //     oldTable.fnClearTable(); //清空一下table
        //     oldTable.fnDestroy(); //还原初始化了的dataTable
        //     $('#tableHd_tj_Yb thead').empty();
        // }
        // if ($('#tableSk_tj_Yb').hasClass('dataTable')) {
        //     var oldTable = $('#tableSk_tj_Yb').dataTable();
        //     oldTable.fnClearTable(); //清空一下table
        //     oldTable.fnDestroy(); //还原初始化了的dataTable
        //     $('#tableSk_tj_Yb thead').empty();
        // }
        // if ($('#tableHp_tj_Yb').hasClass('dataTable')) {
        //     var oldTable = $('#tableHp_tj_Yb').dataTable();
        //     oldTable.fnClearTable(); //清空一下table
        //     oldTable.fnDestroy(); //还原初始化了的dataTable
        //     $('#tableHp_tj_Yb thead').empty();
        // }
        // if ($('#tableXx_tj').hasClass('dataTable')) {
        //     var oldTable = $('#tableXx_tj').dataTable();
        //     oldTable.fnClearTable(); //清空一下table
        //     oldTable.fnDestroy(); //还原初始化了的dataTable
        //     $('#tableXx_tj thead').empty();
        // }

        //解析数据
        var res = "";
        var callBack = function () {
            //预报统计后查询单站
            //tools.loadinghide(false);
            //$("#linkProLine_AllYb").click();

            var jsonTj;
            jsonTj = that.ybTj_Data;

            //if (that.show_type == "2") {
            //    jsonTj = JSON.parse(that.ybTj_Data);
            //} else {
            //    jsonTj = JSON.parse(that.ddTj_Data);
            //}

            //add by chl 20200402 导出数据赋值
            outjson = jsonTj;

            that.obj_data_model = {
                modelName: new Array(),
                hdHead: new Array(),
                hdData: new Array(),
                skHead: new Array(),
                skData: new Array(),
                hpHead: new Array(),
                hpData: new Array()
            };



            var _html_hd = "";
            var _html_sk = "";
            var _html_hp = "";
            var _html_xx = "";
            var existType = "";
            var existIndex = 0;
            var existCount = 0;

            var _html_hd_thead = "";
            var _html_sk_thead = "";
            var _html_hp_thead = "";
            var _html_xx_thead = "";

            var stcd_tj = "";
            var sttp_tj = "";

            //初始化数据
            that.htmlHdModel = "";
            that.htmlSkModel = "";
            that.htmlHpModel = "";

            //radio按钮
            var modelArr = selectModes.split(',');
            var htmlRadio = "<select id = 'modelSelect'>";
            var modelsNameArr = selectModelsName.split(',')
            $.each(modelsNameArr, function (i, item) {
                //不加载纳雨能力和贝叶斯预报概率模型
                if (modelArr[i] !== 'NYNL' && modelArr[i] !== 'BFS') {
                    if (i == 0) { //默认选中第一个模型
                        htmlRadio += "<option name = 'inlineRadioOptions'  id = 'inlineRadio" +
                            i + "'  value_ ='" + modelArr[i] + "'  model_ = '" + item + "'  select>" + item + "</option>"
                    } else {
                        htmlRadio += "<option name = 'inlineRadioOptions'  id = 'inlineRadio" +
                            i + "'  value_ ='" + modelArr[i] + "' model_ = '" + item + "' >" + item + "</option>"
                    }
                }
            })
            htmlRadio += "</select>"
            $("#modelRadio").html("");
            $("#modelRadio").append(htmlRadio);
            $('#modelSelect').fancyspinbox();

            for (var i = 0; i < modelArr.length; i++) {
                if (modelArr[i] === 'NYNL' || modelArr[i] === 'BFS') {
                    continue
                }
                //获取各模型河道水库湖泊数据
                var hdPro = modelArr[i] + "_dataHd";
                var skPro = modelArr[i] + "_dataSk";
                var hpPro = modelArr[i] + "_dataHp";
                var hdData = jsonTj[hdPro];
                var skData = jsonTj[skPro];
                var hpData = jsonTj[hpPro];
                if (hdData == null && skData == null && hpData == null) {
                    tools.show_message_error_const(modelArr[i] + '无数据！');
                    // $("input[name='inlineRadioOptions']")[i].hide();
                    // return;
                } else {
                    that.processData(hdData, skData, hpData, modelArr[i]);
                }

            }
            //默认显示第一个模型
            if (that.obj_data_model.hdData.length > 0) {
                _html_hd_thead = that.obj_data_model.hdHead[0];
                that.htmlHdModel = that.obj_data_model.hdData[0];
                $("#tableHd_tj_Yb thead").append(_html_hd_thead);
                $("#tableHd_tj_Yb tbody").append(that.htmlHdModel);
                //排序
                $('#tableHd_tj_Yb').DataTable({ //河道
                    "destroy": true,
                    "retrieve": true,
                    "bStateSave": false,
                    // "columnDefs": [{
                    //     "data": null,
                    //     "targets": 0
                    // }],
                    // "fnDrawCallback": function () {
                    //     var api = this.api();
                    //     var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数 　
                    //     api.column(0).nodes().each(function (cell, i) {
                    //         cell.innerHTML = startIndex + i + 1;
                    //     });
                    // },
                    // 是否允许检索
                    "searching": false,
                    // 是否允许排序
                    "ordering": false,
                    // 是否允许翻页，设成false，翻页按钮不显示
                    "paging": false,
                    // 水平滚动条
                    "scrollX": false,
                    // 垂直滚动条
                    "scrollY": 165,
                    // 件数选择功能 默认true
                    "lengthChange": false,
                    // 自动列宽
                    "autoWidth": true,
                    "stateSave": true, //刷新时是否保存状态
                    "scrollCollapse": true,
                    "bAutoWidth": false,
                    "bScrollCollapse": true, //是否开启DataTables的高度自适应
                });
            }
            if (that.obj_data_model.skData.length > 0) {
                _html_sk_thead = that.obj_data_model.skHead[0];
                that.htmlSkModel = that.obj_data_model.skData[0];
                $("#tableSk_tj_Yb thead").append(_html_sk_thead);
                $("#tableSk_tj_Yb tbody").append(that.htmlSkModel);
                $('#tableSk_tj_Yb').DataTable({ //水库
                    "destroy": true,
                    "retrieve": true,
                    "bStateSave": false,
                    // 是否允许检索
                    "searching": false,
                    // 是否允许排序
                    "ordering": false,
                    "order": [
                        [4, "desc"]
                    ],
                    // "columnDefs": [{
                    //     "data": null,
                    //     "targets": 0,
                    //     "orderable": false
                    // }],
                    // "fnDrawCallback": function () {
                    //     var api = this.api();
                    //     var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数 　
                    //     api.column(0).nodes().each(function (cell, i) {
                    //         cell.innerHTML = startIndex + i + 1;
                    //     });
                    // },
                    // 是否允许翻页，设成false，翻页按钮不显示
                    "paging": false,
                    // 水平滚动条
                    "scrollX": false,
                    // 垂直滚动条
                    "scrollY": 165,
                    // 件数选择功能 默认true
                    "lengthChange": false,
                    // 自动列宽
                    "autoWidth": true,
                    "stateSave": true, //刷新时是否保存状态
                    "scrollCollapse": true,
                    "bAutoWidth": false,
                    "bScrollCollapse": true, //是否开启DataTables的高度自适应
                });
            }

            //处理按钮
            // if (that.obj_data_model.modelName.length == 1) {
            //     //只选了一个模型则隐藏按钮
            //     $("#modelRadio").hide();
            // }





            // if (jsonTj.hasOwnProperty("dataHp")) {
            //     $('#tableHp_tj_Yb').DataTable({//水库
            //         "destroy": true,
            //         "retrieve": true,
            //         "bStateSave": false,
            //         // 是否允许检索
            //         "searching": false,
            //         // 是否允许排序
            //         "ordering": true,
            //         "order": [[4, "desc"]],
            //         // 是否允许翻页，设成false，翻页按钮不显示
            //         "paging": false,
            //         // 水平滚动条
            //         "scrollX": false,
            //         // 垂直滚动条
            //         "scrollY": 165,
            //         // 件数选择功能 默认true
            //         "lengthChange": false,
            //         // 自动列宽
            //         "autoWidth": true,
            //         "stateSave": true,//刷新时是否保存状态
            //         "scrollCollapse": true,
            //         "bAutoWidth": false,
            //         "bScrollCollapse": true, //是否开启DataTables的高度自适应
            //     });
            // }

            var $list;
            if (that.show_type == "3" && jsonTj.hasOwnProperty("dataXx") && that.show_stnm != "洪泽湖") {
                existType = "xx";
            }
            if (existType == "hd") {
                $("#linkTj_Hd_AllYb").click();
                $(that.parentId + " .tableHd tr:eq(" + existIndex + ")").addClass("hover");
                $list = $(that.parentId + " .tableHd").parent()[0];
            } else if (existType == "sk") {
                $("#linkTj_Sk_AllYb").click();
                $list = $(that.parentId + " .tableSk").parent()[0];
                $(that.parentId + " .tableSk tr:eq(" + existIndex + ")").addClass("hover");
            } else if (existType == "hp") {
                $("#linkTj_Hp_AllYb").click();
                $list = $(that.parentId + " .tableHp").parent()[0];
                $(that.parentId + " .tableHp tr:eq(" + existIndex + ")").addClass("hover");
            } else if (existType == "xx") {
                $("#linkTj_Xx_AllYb").click();
                $list = $(that.parentId + " .tableXx").parent()[0];
                $(that.parentId + " .tableXx tr:eq(" + existIndex + ")").addClass("hover");
            } else {
                $list = $(that.parentId + " .dataTables_scrollBody .tableHd").parent()[0];
                $("#contTj_Hd_AllYb .dataTables_scrollBody table tbody tr").each(function (i, item) {
                    if ($(item).attr('_stcd') == that.show_stcd) {
                        $(item).addClass("hover");
                    }
                })
                // $list = $(that.parentId + " .table").parent()[0];
                // $(that.parentId + ".tableHd tr").each(function (i, val) {
                //     var a = val;
                // })
                // $(that.parentId + " .table tr:eq(" + existIndex + ")").addClass("hover");
            }

            //自动定位
            try {
                if ($list.scrollHeight <= $list.clientHeight || existType == "")
                    $($list).scrollTop($list.scrollHeight);
                // return;
                //第一页
                if (parseInt($list.clientHeight / 33) >= existIndex) {
                    $($list).scrollTop(0);
                } else if (existIndex > (existCount - parseInt($list.clientHeight / 33))) {
                    //末页
                    $($list).scrollTop($list.scrollHeight - $list.clientHeight);
                } else {
                    $($list).scrollTop((existIndex + 1) * 33 - $list.clientHeight);
                }
            } catch (e) { };

            //that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);
            $("#linkProLine_AllYb").click();
            $("#linkTj_Sk_AllYb").click();
            $("#linkTj_Hd_AllYb").click();
        };

        var _flag = (range + moment(stime).format("YYYYMMDDHHmm") + moment(etime).format("YYYYMMDDHHmm") + plan + day);
        /*  if ((that.show_type == "2" && that.ybTj_Flag != "" && that.ybTj_Flag == _flag) || (that.show_type == "3" && that.ddTj_Flag != "" && that.ddTj_Flag == _flag)) {
              //res = that.ybTj_Data;
              callBack();
          } else {*/


        //userLogin();
        var objData = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: selectModes,
            plan: Number(searchPlan),
            range: Number(searchRange),
            // range: 11,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            startTime: searchStime,
            stcd: "",
            // userId: $("#_hid_userid").val(),
            meteorPattern: meteor
        };

        var info = JSON.stringify(objData);


        //预报成果信息统计
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-realsituate/GetForInfoStatis",
            data: info,
            success: function (data) {
                if (curprogresstype != "")
                    clearProgress(curprogresstype);
                var res = data;
                if (res == "") {
                    tools.loadinghide(false);
                    tools.show_message_error(that.show_type == "2" ? "获取预报特征值统计信息失败" : "获取调度后特征值统计信息失败");
                    return;
                }

                //判断数据是否查询成功
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error(res.msg);
                    return;
                } else {

                    //延时，放在进度条之后
                    // setTimeout(function () {
                    that.ybTj_Flag = range + moment(stime).format("YYYYMMDDHHmm") + moment(etime).format("YYYYMMDDHHmm") + plan + day;
                    that.ybTj_Data = res.data;

                    // $(that.parentId).show();
                    callBack();
                    tools.loadinghide(true);
                    that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);
                    //    }, 1500);


                }

            },
            error: function (errorMsg) {
                clearProgress(curprogresstype);
                tools.loadinghide(false);
                tools.show_message_error(that.show_type == "2" ? "获取预报特征值统计信息失败" : "获取调度后特征值统计信息失败");
                return;
            }

        })

    },
    /**
     * 处理预报特征统计表格数据
     **/
    processData: function (hdData, skData, hpData, modelName) {
        var that = this;

        //初始化数据
        that.html_hd_model = "";
        that.html_sk_model = "";
        that.html_hp_model = "";

        that.html_hd_thead = "";
        that.html_sk_thead = "";
        that.html_hp_thead = "";

        //河道下标 0:站名;1:洪峰水位;2:洪峰水位时间;3:洪峰流量;4:警戒水位;5:保证水位;6:保证流量
        if (hdData != null) {
            $.each(hdData, function (index, item) {
                if (index == 0) { //列名
                    if (that.obj_data_model.hdHead.length == 0) {
                        that.html_hd_thead = "<tr><th>序号</th>";
                        $.each(item, function (i, data) {
                            if (data != "站码" && data != "站类")
                                that.html_hd_thead += "<th>" + data + "</th>"
                        })
                        that.html_hd_thead += "</tr>";
                    }
                } else {
                    var font_start = "";
                    var font_end = "";
                    if (Number(item[1]) > Number(item[5])) { //下标1：洪峰水位；下标5：保证水位
                        font_start = "<font color='Red'><strong>"
                        font_end = "</strong></font>";
                    } else if (Number(item[1]) > Number(item[4])) { //下标1：洪峰水位；下标4：警戒水位
                        font_start = "<font color='Blue'><strong>"
                        font_end = "</strong></font>";
                    }
                    that.html_hd_model += "<tr class='link-stcd' _stcd='" + item[item.length - 3] + "' _stnm='" + item[0] + "' _sttp='" + item[item.length - 2] + "'><td>" + index + "</td><td>" + item[0] + "</td><td>" + font_start + item[1] + font_end + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[9] + "</td></tr>";
                }
            });
            if (that.obj_data_model.hdHead.length == 0) {
                that.obj_data_model.hdHead.push(that.html_hd_thead);
            }
            that.obj_data_model.hdData.push(that.html_hd_model)
        } else {
            $("#linkTj_Hd_AllYb").parent().hide();
            $("#linkTj_Hd_AllYb").css({
                "display": "none"
            });
        }

        if (skData != null) {
            //水库下标 0:站名;1:当前水位;2:当前出库流量;3:预报最高水位;4:超汛限水位;5:汛限水位;6:设计水位;7:校核水位;8:全陪高程;9:移民高程;10:历史最高水位
            $.each(skData, function (index, item) {
                if (index == 0) { //列名
                    if (that.obj_data_model.skHead.length == 0) {
                        that.html_sk_thead = "<tr><th>序号</th>";
                        $.each(item, function (i, data) {
                            if (data != "站码" && data != "站类")
                                that.html_sk_thead += "<th>" + data + "</th>"
                        })
                        that.html_sk_thead += "</tr>";
                    }
                } else {
                    var font_start = "";
                    var font_end = "";
                    if (Number(item[1]) > Number(item[6])) { //下标1：当前水位；下标6：设计水位
                        font_start = "<font color='Red'><strong>"
                        font_end = "</strong></font>";
                    } else if (Number(item[1]) > Number(item[5])) { //下标1：当前水位；下标5：汛限水位
                        font_start = "<font color='Blue'><strong>"
                        font_end = "</strong></font>";
                    }
                    if (Number(item[3]) > Number(item[6])) { //下标3：预报最高水位；下标6：设计水位
                        font_start = "<font color='Red'><strong>"
                        font_end = "</strong></font>";
                    } else if (Number(item[3]) > Number(item[5])) { //下标3：预报最高水位；下标5：汛限水位
                        font_start = "<font color='Blue'><strong>"
                        font_end = "</strong></font>";
                    }



                    that.html_sk_model += "<tr class='link-stcd' _stcd='" + item[item.length - 3] + "' _stnm='" + item[0] + "' _sttp='" + item[item.length - 2] + "'><td>" + index + "</td><td>" + item[0] + "</td><td>" + font_start + item[1] + font_end + "</td><td>" + item[2] + "</td><td>" + font_start + item[3] + font_end + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[7] + "</td><td>" + item[8] + "</td><td>" + item[9] + "</td><td>" + item[10] + "</td><td>" + item[13] + "</td></tr>";

                    if (item[item.length - 2] == that.show_stcd) {
                        existType = "sk";
                        existIndex = index;
                        existCount = jsonTj.dataSk.length;
                    }
                }
            });
            if (that.obj_data_model.skHead.length == 0) {
                that.obj_data_model.skHead.push(that.html_sk_thead)
            }
            that.obj_data_model.skData.push(that.html_sk_model)
        } else {
            $("#linkTj_Sk_AllYb").parent().hide();
            $("#linkTj_Sk_AllYb").css({
                "display": "none"
            });
        }


        if (hpData == null) {
            $("#linkTj_Hp_AllYb").parent().hide();
            $("#linkTj_Hp_AllYb").css({
                "display": "none"
            });
            //$("#linkTj_Hd_All").click();
        }

        that.obj_data_model.modelName.push(modelName)
        // that.obj_data_model.hdHead.push(that.html_hd_thead)
        // that.obj_data_model.hdData.push(that.html_hd_model)
        // that.obj_data_model.skHead.push(that.html_sk_thead)
        // that.obj_data_model.skData.push(that.html_sk_model)
        // that.obj_data_model.hpHead.push(that.html_hp_thead)
        // that.obj_data_model.hpData.push(that.html_hp_model)

    },



    /**
     * 水位流量过程线（实况）
     **/
    echart_line_gcx_real: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            zcsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            jhsw: panelConfig_allYb.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showZcsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            ll: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_data_gcx = {
            sssw: new Array(),
            sw_zx: new Array(),
            ssll: new Array(),
            ll_in: new Array(),
            ybsw: new Array(),
            ybll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartGcx);
        //实时水情
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/getSwGcx",
            data: "{'stime':'" + stime + "','etime':'" + etime + "','stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','userId':'" + $("#_hid_userid").val() + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(实时水情)失败!");
                    return;
                }
                var json = JSON.parse(res);
                if (json.code == "0") {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error(json.msg);
                    return;
                }

                //解析实时水情
                //思路：循环一遍数据即可获取图表数据源+最大最小值
                //特征水位获取
                if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                    that.obj_fcch_gcx.jjsw = json.Jjsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Jjsw);
                    that.obj_fcch_gcx.bzsw = json.Bzsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Bzsw);
                } else {
                    if (json.hasOwnProperty("Xxsw")) {
                        that.obj_fcch_gcx.xxsw = json.Xxsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Xxsw);
                    } else {
                        that.obj_fcch_gcx.zcsw = json.Zcxsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Zcxsw);
                    }
                    that.obj_fcch_gcx.sjsw = json.Sjsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Sjsw);
                    that.obj_fcch_gcx.jhsw = json.Jhsw == "" ? panelConfig_allYb.MIN_NUM : Number(json.Jhsw);
                }

                //河道：时间,水位,流量,水势   闸坝：时间,闸上水位,闸下水位,流量,水势   水库：时间,水位,入库流量,出库流量,蓄量
                if (json.data != "" && json.data.length > 0) {
                    $.each(json.data, function (index, item) {
                        if (item == "" || item.length == 0)
                            return true;

                        //水位
                        that.obj_data_gcx.sssw.push({
                            value: [item.TM, item.Z]
                        });
                        that.obj_minMax_gcx.sw.min = Math.min(Number(item.Z), that.obj_minMax_gcx.sw.min);
                        that.obj_minMax_gcx.sw.max = Math.max(Number(item.Z), that.obj_minMax_gcx.sw.max);
                        //流量
                        if (item.Q != "" && item.Q != "0") {
                            that.obj_data_gcx.ssll.push({
                                value: [item.TM, item.Q]
                            });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                        }

                        if (that.show_sttp == "RR") {
                            //入库流量
                            if (item.Qin != "" && item.Qin != "0") {
                                that.obj_data_gcx.ll_in.push({
                                    value: [item.TM, item.Qin]
                                });
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qin), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qin), that.obj_minMax_gcx.ll.max);
                            }
                        }
                    });
                }

                //处理数据警戒水位 保证水位 汛限水位数据源
                if (that.obj_data_gcx.sssw != null && that.obj_data_gcx.sssw.length > 0) {
                    var maxTime = (that.obj_data_gcx.ybsw != null && that.obj_data_gcx.ybsw.length > 0) ? that.obj_data_gcx.ybsw[that.obj_data_gcx.ybsw.length - 1].value[0] : that.obj_data_gcx.sssw[that.obj_data_gcx.sssw.length - 1].value[0];
                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                        //警戒水位
                        if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.jjsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.jjsw]
                            });
                            that.obj_data_gcx.jjsw.push({
                                value: [maxTime, that.obj_fcch_gcx.jjsw]
                            });
                        }

                        //保证水位
                        if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.bzsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.bzsw]
                            });
                            that.obj_data_gcx.bzsw.push({
                                value: [maxTime, that.obj_fcch_gcx.bzsw]
                            });
                        }
                    } else if (that.show_sttp == "RR") {
                        //汛限水位
                        if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.xxsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.xxsw]
                            });
                            that.obj_data_gcx.xxsw.push({
                                value: [maxTime, that.obj_fcch_gcx.xxsw]
                            });
                        }
                        //正常水位
                        if (that.obj_fcch_gcx.zcsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.zcsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.zcsw]
                            });
                            that.obj_data_gcx.zcsw.push({
                                value: [maxTime, that.obj_fcch_gcx.zcsw]
                            });
                        }
                        //设计水位
                        if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.sjsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.sjsw]
                            });
                            that.obj_data_gcx.sjsw.push({
                                value: [maxTime, that.obj_fcch_gcx.sjsw]
                            });
                        }
                        //校核水位
                        if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.jhsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.jhsw]
                            });
                            that.obj_data_gcx.jhsw.push({
                                value: [maxTime, that.obj_fcch_gcx.jhsw]
                            });
                        }
                    }
                }
                //生成表格
                that.create_table_sqxx_real(json);

                //警戒 保证  汛限是否勾选
                if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                    that.obj_fcch_gcx.showJjsw = true;
                } else {
                    that.obj_fcch_gcx.showJjsw = false;
                }
                if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                    that.obj_fcch_gcx.showBzsw = true;
                } else {
                    that.obj_fcch_gcx.showBzsw = false;
                }
                if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                    that.obj_fcch_gcx.showXxsw = true;
                } else {
                    that.obj_fcch_gcx.showXxsw = false;
                }
                if (that.obj_fcch_gcx.zcsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.zcsw) {
                    that.obj_fcch_gcx.showZcsw = true;
                } else {
                    that.obj_fcch_gcx.showZcsw = false;
                }

                //获取实时（计算）的最大、最小水位流量
                var tempSw = that.obj_minMax_gcx.sw.max;
                if (that.show_sttp == "RR") {
                    if (that.obj_fcch_gcx.showXxsw)
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                } else {
                    if (that.obj_fcch_gcx.showJjsw)
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                    if (that.obj_fcch_gcx.showBzsw)
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                }
                var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                var axis_sw_min = arrSw[1] < 0 ? 0 : arrSw[1];
                var axis_sw_max = arrSw[0];
                var axis_ll_min = arrLl[1] < 0 ? 0 : arrLl[1];
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
                var option = {};
                if (that.show_sttp == "ZZ") {
                    option = that.get_option_gcx_zz_real(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                } else if (that.show_sttp == "DD") {
                    option = that.get_option_gcx_dd_real(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                } else if (that.show_sttp == "RR") {
                    option = that.get_option_gcx_rr_real(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                }

                // 使用刚指定的配置项和数据显示图表。
                that.chartGcx.setOption(option, true);
                tools.hideChartLoading(that.chartGcx);
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(实时水情)失败!");
            }
        });
    },


    /**
     * 水位流量过程线（预报）
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_for_new: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            zcsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            jhsw: panelConfig_allYb.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            ll: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            rain: {
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_yb_graphic = {
            arr_graphic: new Array(),
            ybsw_count: 0,
            ybll_count: 0

        };
        that.obj_data_gcx = {
            sssw: new Array(),
            sw_zx: new Array(),
            ssll: new Array(),
            ll_in: new Array(),
            ybsw: new Array(),
            ybll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            rain: new Array()
        };
        //以下三个对象是预报传用，可调整数值
        that.obj_data_gcx_bk = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_value = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.is_modify = false;
        that.obj_data_gcx_y_modifyIndex = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_modifyIndex_all = new Array();
        that.obj_data_gcx_tm = new Array();

        if (is_selectXAJ == true) { //是否选择了新安江模式
            var model = "XAJ";
        } else {
            var model = "";
        }

        var objData = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            hisStormId: _hisStormId,
            model: selectModes,
            modelId: "",
            plan: Number(searchPlan),
            plusType: _plusType,
            rainPlus: _rainPlus,
            range: Number(searchRange),
            startTime: searchStime,
            stcd: that.show_stcd,
            // userId: $("#_hid_userid").val(),
            meteorPattern: meteor
        };

        var info = JSON.stringify(objData);


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
            url: apiUrl_cloud + "api-realsituate/GetStcdFor",
            data: info,
            success: function (data) {
                var res = data;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error_const("查询过程线(预报信息)失败!");
                }
                if (res.data.calmodel.indexOf(that.selectOptionModel) < 0) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error_const("当前站点未配置该计算模型!");
                }
                var jsonFor = res.data;
                if (res.code != 200) {
                    tools.show_message_error_const(jsonFor.msg);
                    return;
                } else {
                    that.modelData = [];
                    //判断有几种模型
                    var modelArr = selectModes.split(',');
                    for (var i = 0; i < modelArr.length; i++) {
                        that.modelData.push(jsonFor[modelArr[i]]);
                        var cur_op = that.getRadioOptions();
                        if (cur_op == modelArr[i]) {
                            that.echart_line_gcx_for_model(that.modelData[i]);
                            // return;
                        }
                    }

                    // if (jsonFor.hasOwnProperty("API2")) {
                    //     that.API2Data = jsonFor.API2;
                    // }
                    // if (jsonFor.hasOwnProperty("API6")) {
                    //     that.API6Data = jsonFor.API6;
                    // }
                    // if (jsonFor.hasOwnProperty("XAJ2")) {
                    //     that.XAJ2Data = jsonFor.XAJ2;
                    // }
                    // if (jsonFor.hasOwnProperty("MGE2")) {
                    //     that.MGE2Data = jsonFor.MGE2;
                    // }

                    // var cur_op = that.getRadioOptions();
                    // if (cur_op == "API2") {
                    //     if (jsonFor.hasOwnProperty("API2")) {
                    //         that.echart_line_gcx_for_model(that.API2Data);
                    //     }
                    // }
                    // if (cur_op == "API6") {
                    //     if (jsonFor.hasOwnProperty("API6")) {
                    //         that.echart_line_gcx_for_model(that.API6Data);
                    //     }
                    // }
                    // if (cur_op == "XAJ2") {
                    //     if (jsonFor.hasOwnProperty("XAJ2")) {
                    //         that.echart_line_gcx_for_model(that.XAJ2Data);
                    //     }
                    // }
                    // if (cur_op == "MGE2") {
                    //     if (jsonFor.hasOwnProperty("MGE2")) {
                    //         that.echart_line_gcx_for_model(that.MGE2Data);
                    //     }
                    // }
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },

    echart_line_gcx_for_model: function (jsonFor) {
        var that = this;

        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            zcsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            jhsw: panelConfig_allYb.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            ll: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            rain: {
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_yb_graphic = {
            arr_graphic: new Array(),
            ybsw_count: 0,
            ybll_count: 0

        };
        that.obj_data_gcx = {
            sssw: new Array(),
            sw_zx: new Array(),
            ssll: new Array(),
            ll_in: new Array(),
            ybsw: new Array(),
            ybll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            rain: new Array()
        };
        //以下三个对象是预报传用，可调整数值
        that.obj_data_gcx_bk = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_value = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.is_modify = false;
        that.obj_data_gcx_y_modifyIndex = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_modifyIndex_all = new Array();
        that.obj_data_gcx_tm = new Array();

        //是否存在产汇流区间
        var unitName = new Array();
        //是否存在上游流量
        var upStaName = new Array();
        if (jsonFor.unitName != "") {
            for (var i = 0; i < jsonFor.unitName.length; i++) {
                unitName.push({
                    name: jsonFor.unitName[i],
                    data: new Array()
                });
            }
        }
        if (jsonFor.upStaName != "") {
            for (var i = 0; i < jsonFor.upStaName.length; i++) {
                upStaName.push({
                    name: jsonFor.upStaName[i],
                    data: new Array()
                });
            }
        }

        //特征值获取 从统计表中提取
        try {
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") { //河道
                that.obj_fcch_gcx.jjsw = (jsonFor.Jjsw == "" || jsonFor.Jjsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Jjsw);
                that.obj_fcch_gcx.bzsw = (jsonFor.Bzsw == "" || jsonFor.Bzsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Bzsw);
            } else { //水库、湖泊
                that.obj_fcch_gcx.xxsw = (jsonFor.Xxsw == "" || jsonFor.Xxsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Xxsw);
                that.obj_fcch_gcx.sjsw = (jsonFor.Sjsw == "" || jsonFor.Sjsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Sjsw);
                that.obj_fcch_gcx.jhsw = (jsonFor.Jhsw == "" || jsonFor.Jhsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Jhsw);
            }
        } catch (e) { }

        //先获取流量/入库流量最后一段都为0或者空的数据 提取出最后为空的时刻
        var arrQ = new Array();
        var arrQin = new Array();
        var emptyTM = "";
        var emptyAll = true;
        var emptyTM_In = "";
        var emptyAll_In = true;
        $.each(jsonFor.data, function (index, item) {
            arrQ.push({
                TM: item.TM,
                Q: item.Q
            });
            arrQin.push({
                TM: item.TM,
                Qin: item.Qin
            });
        });
        for (i = arrQ.length - 1; i >= 0; i--) {
            if (arrQ[i].Q == "" || arrQ[i].Q == "0") {
                emptyTM = arrQ[i].TM;
            } else {
                emptyAll = false;
                break;
            }
        }
        for (i = arrQin.length - 1; i >= 0; i--) {
            if (arrQin[i].Q == "" || arrQin[i].Q == "0") {
                emptyTM_In = arrQin[i].TM;
            } else {
                emptyAll_In = false;
                break;
            }
        }
        arrQ = null;
        arrQin = null;

        max_sw_time = null;
        max_ll_time = null;
        //解析数据
        $.each(jsonFor.data, function (index, item) {
            //雨量
            that.obj_data_gcx.rain.push({
                value: [item.TM, item.Pavg]
            });
            that.obj_minMax_gcx.rain.max = Math.max(Number(item.Pavg), that.obj_minMax_gcx.rain.max);
            var _tm = item.TM.split('.')[0];
            that.obj_data_gcx_tm.push(_tm);
            //水位
            if (item.Z != "" && item.Z != "0") {
                that.obj_data_gcx.sssw.push({
                    value: [item.TM, item.Z]
                });
                that.obj_minMax_gcx.sw.min = Math.min(Number(item.Z), that.obj_minMax_gcx.sw.min);
                that.obj_minMax_gcx.sw.max = Math.max(Number(item.Z), that.obj_minMax_gcx.sw.max);
                max_sw_time = item.TM;
            }

            //流量（水库代表实测入库）
            if (!((item.Q == "" || item.Q == "0") && (emptyAll || !emptyAll && moment(item.TM).diff(moment(emptyTM), "minutes", true) >= 0))) {
                that.obj_data_gcx.ssll.push({
                    value: [item.TM, item.Q]
                });
                max_ll_time = item.TM;
                that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
            }

            //预报水位
            if (item.Zs != "" && item.Zs != "0") {
                that.obj_data_gcx.ybsw.push({
                    value: [item.TM, item.Zs]
                });
                that.obj_data_gcx_bk.ybsw.push({
                    value: [item.TM, item.Zs]
                });
                that.obj_data_gcx_y_value.ybsw.push(item.Zs);
                that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zs), that.obj_minMax_gcx.sw.min);
                that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zs), that.obj_minMax_gcx.sw.max);
            } else {
                that.obj_data_gcx.ybsw.push({
                    value: [item.TM, 0]
                });
                that.obj_data_gcx_bk.ybsw.push({
                    value: [item.TM, 0]
                });
                that.obj_data_gcx_y_value.ybsw.push(0);
                that.obj_minMax_gcx.sw.min = Math.min(Number(0), that.obj_minMax_gcx.sw.min);
                that.obj_minMax_gcx.sw.max = Math.max(Number(0), that.obj_minMax_gcx.sw.max);

            }
            //预报流量(水库代表实测出库)
            if (item.Qs != "" && item.Qs != "0") {
                if (that.show_sttp != "RR") {
                    that.obj_data_gcx_bk.ll_in.push({
                        value: [item.TM, item.Qs]
                    });
                    that.obj_data_gcx_y_value.ll_in.push(item.Qs);
                }
                that.obj_data_gcx.ybll.push({
                    value: [item.TM, item.Qs]
                });
                that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qs), that.obj_minMax_gcx.ll.min);
                that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qs), that.obj_minMax_gcx.ll.max);
            } else {
                if (that.show_sttp != "RR") {
                    that.obj_data_gcx_bk.ll_in.push({
                        value: [item.TM, 0]
                    });
                    that.obj_data_gcx_y_value.ll_in.push(0);
                }
                that.obj_data_gcx.ybll.push({
                    value: [item.TM, 0]
                });
                that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
            }

            //产汇流区间
            if (unitName != null && unitName.length > 0) {
                for (var i = 0; i < item.Qqj.length; i++) {
                    unitName[i].data.push({
                        value: [item.TM, item.Qqj[i]]
                    });
                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qqj[i]), that.obj_minMax_gcx.ll.min);
                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qqj[i]), that.obj_minMax_gcx.ll.max);
                }
            }

            //上游流量
            if (upStaName != null && upStaName.length > 0) {
                for (var i = 0; i < item.Qhd.length; i++) {
                    upStaName[i].data.push({
                        value: [item.TM, item.Qhd[i]]
                    });
                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qhd[i]), that.obj_minMax_gcx.ll.min);
                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qhd[i]), that.obj_minMax_gcx.ll.max);
                }
            }

            if (that.show_sttp == "ZZ") { } else if (that.show_sttp == "DD") {
                //闸下水位
                /*   that.obj_data_gcx.sw_zx.push({ value: [item.TM, item.Zx] });
                   that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zx), that.obj_minMax_gcx.sw.min);
                   that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zx), that.obj_minMax_gcx.sw.max);
              */
            } else if (that.show_sttp == "RR") {
                //预报入库流量
                if (!((emptyAll_In || !emptyAll_In && moment(item.TM).diff(moment(emptyTM_In), "minutes", true) >= 0))) {
                    if (!(item.Qin == "" || item.Qin == "0")) {
                        that.obj_data_gcx.ll_in.push({
                            value: [item.TM, item.Qin]
                        });
                        that.obj_data_gcx_bk.ll_in.push({
                            value: [item.TM, item.Qin]
                        });
                        that.obj_data_gcx_y_value.ll_in.push(item.Qin);
                        that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qin), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qin), that.obj_minMax_gcx.ll.max);
                    } else {
                        that.obj_data_gcx.ll_in.push({
                            value: [item.TM, 0]
                        });
                        that.obj_data_gcx_bk.ll_in.push({
                            value: [item.TM, 0]
                        });
                        that.obj_data_gcx_y_value.ll_in.push(0);
                        that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                    }

                }
            }
        });

        //处理数据警戒水位 保证水位 汛限水位数据源
        if (that.obj_data_gcx.rain != null && that.obj_data_gcx.rain.length > 0) {
            var maxTime = that.obj_data_gcx.rain[that.obj_data_gcx.rain.length - 1].value[0];
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                //警戒水位
                if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                    that.obj_data_gcx.jjsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jjsw]
                    });
                    that.obj_data_gcx.jjsw.push({
                        value: [maxTime, that.obj_fcch_gcx.jjsw]
                    });
                }
                //保证水位
                if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                    that.obj_data_gcx.bzsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.bzsw]
                    });
                    that.obj_data_gcx.bzsw.push({
                        value: [maxTime, that.obj_fcch_gcx.bzsw]
                    });
                }
            } else if (that.show_sttp == "RR") {
                //汛限水位
                if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                    that.obj_data_gcx.xxsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.xxsw]
                    });
                    that.obj_data_gcx.xxsw.push({
                        value: [maxTime, that.obj_fcch_gcx.xxsw]
                    });
                }
                //设计水位
                if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                    that.obj_data_gcx.sjsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.sjsw]
                    });
                    that.obj_data_gcx.sjsw.push({
                        value: [maxTime, that.obj_fcch_gcx.sjsw]
                    });
                }
                //校核水位
                if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                    that.obj_data_gcx.jhsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jhsw]
                    });
                    that.obj_data_gcx.jhsw.push({
                        value: [maxTime, that.obj_fcch_gcx.jhsw]
                    });
                }
            }
        }

        //警戒 保证  汛限是否勾选
        if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
            that.obj_fcch_gcx.showJjsw = true;
        } else {
            that.obj_fcch_gcx.showJjsw = false;
        }
        if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
            that.obj_fcch_gcx.showBzsw = true;
        } else {
            that.obj_fcch_gcx.showBzsw = false;
        }
        if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
            that.obj_fcch_gcx.showXxsw = true;
        } else {
            that.obj_fcch_gcx.showXxsw = false;
        }
        if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
            that.obj_fcch_gcx.showSjsw = true;
        } else {
            that.obj_fcch_gcx.showSjsw = false;
        }
        if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
            that.obj_fcch_gcx.showJhsw = true;
        } else {
            that.obj_fcch_gcx.showJhsw = false;
        }

        //获取实时（计算）的最大、最小水位流量
        var tempSw = that.obj_minMax_gcx.sw.max;
        if (that.show_sttp == "RR") {
            if (that.obj_fcch_gcx.showXxsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
            }
            if (that.obj_fcch_gcx.showSjsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
            }
            if (that.obj_fcch_gcx.showJhsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
            }
        } else {
            if (that.obj_fcch_gcx.showJjsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
            }
            if (that.obj_fcch_gcx.showBzsw) {
                tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
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
        //获取时间轴刻度
        var _minTime = "";
        var _maxTime = "";
        if (jsonFor.data != null && jsonFor.data.length > 0) {
            _minTime = jsonFor.data[0].TM;
            _maxTime = jsonFor.data[jsonFor.data.length - 1].TM;
        }
        var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
        //获取时间轴格式化字符串
        var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

        //初始化图表
        var option = {};
        if (that.show_sttp == "ZZ") {
            option = that.get_option_gcx_zz_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
        } else if (that.show_sttp == "DD") {
            option = that.get_option_gcx_dd_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
        } else if (that.show_sttp == "RR") {
            option = that.get_option_gcx_rr_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
        }

        //添加产汇流 上游流量
        var colors = ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85'];
        if (unitName != null && unitName.length > 0) {
            if (option.legend != undefined) {
                option.legend.data.push("");
            }

            for (var i = 0; i < unitName.length; i++) {
                //添加图例默认不展示
                option.legend.data.push(unitName[i].name);
                option.legend.selected[unitName[i].name] = false;

                option.series.push({
                    name: unitName[i].name,
                    type: 'line',
                    yAxisIndex: 1,
                    symbol: "image://Images/empty.png",
                    symbolSize: 1,
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle: {
                        color: colors[i]
                    },
                    lineStyle: {
                        type: "dashed"
                    },
                    data: unitName[i].data
                });
                var bk_data = new Array();
                $.each(unitName[i].data, function (innerindex, inneritem) {
                    if (innerindex < that.obj_data_gcx.sssw.length) {
                        bk_data.push(inneritem);
                    }

                });
                option.series.push({
                    name: unitName[i].name,
                    type: 'line',
                    yAxisIndex: 1,
                    symbol: "image://Images/empty.png",
                    symbolSize: 1,
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle: {
                        color: colors[i]
                    },

                    data: bk_data
                });

            }
        }
        if (upStaName != null && upStaName.length > 0) {
            for (var i = 0; i < upStaName.length; i++) {
                //添加图例 默认不展示
                option.legend.data.push(upStaName[i].name);
                option.legend.selected[upStaName[i].name] = false;

                option.series.push({
                    name: upStaName[i].name,
                    type: 'line',
                    yAxisIndex: 1,
                    symbol: "image://Images/empty.png",
                    symbolSize: 1,
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle: {
                        color: colors[i + unitName.length]
                    },
                    lineStyle: {
                        type: "dashed"
                    },
                    data: upStaName[i].data
                });
                var bk_data = new Array();
                $.each(upStaName[i].data, function (innerindex, inneritem) {
                    if (innerindex < that.obj_data_gcx.sssw.length) {
                        bk_data.push(inneritem);
                    }

                });
                option.series.push({
                    name: upStaName[i].name,
                    type: 'line',
                    yAxisIndex: 1,
                    symbol: "image://Images/empty.png",
                    symbolSize: 1,
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle: {
                        color: colors[i + unitName.length]
                    },

                    data: bk_data
                });
            }
        }

        // 使用刚指定的配置项和数据显示图表。
        option = tools.initChartlegendIcon(option);
        that.chartGcx.setOption(option, true);

        if (!that.show_all) {
            $.each(that.obj_data_gcx.ybsw, function (dataIndex, item) {
                that.obj_yb_graphic.arr_graphic.push({
                    type: 'circle',
                    position: that.chartGcx.convertToPixel({
                        xAxisIndex: 0,
                        yAxisIndex: 0
                    }, item.value),
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
            that.obj_yb_graphic.ybsw_count = that.obj_data_gcx.ybsw.length;
            if (that.show_sttp == "RR") {
                $.each(that.obj_data_gcx.ll_in, function (dataIndex, item) {
                    that.obj_yb_graphic.arr_graphic.push({
                        type: 'circle',
                        position: that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, item.value),
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
                that.obj_yb_graphic.ybll_count = that.obj_data_gcx.ll_in.length;
            } else {
                $.each(that.obj_data_gcx.ybll, function (dataIndex, item) {
                    that.obj_yb_graphic.arr_graphic.push({
                        type: 'circle',
                        position: that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, item.value),
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
                that.obj_yb_graphic.ybll_count = that.obj_data_gcx.ybll.length;
            }

            that.updateChartGcxGraphic();



        }
        tools.hideChartLoading(that.chartGcx);

    },

    /**
     * 水位流量过程线（预报）
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_for: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            zcsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            jhsw: panelConfig_allYb.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            ll: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            rain: {
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_yb_graphic = {
            arr_graphic: new Array(),
            ybsw_count: 0,
            ybll_count: 0

        };
        that.obj_data_gcx = {
            sssw: new Array(),
            sw_zx: new Array(),
            ssll: new Array(),
            ll_in: new Array(),
            ybsw: new Array(),
            ybll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            rain: new Array()
        };
        //以下三个对象是预报传用，可调整数值
        that.obj_data_gcx_bk = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_value = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.is_modify = false;
        that.obj_data_gcx_y_modifyIndex = {
            ybsw: new Array(),
            ll_in: new Array(),
        };
        that.obj_data_gcx_y_modifyIndex_all = new Array();
        that.obj_data_gcx_tm = new Array();

        if (is_selectXAJ == true) { //是否选择了新安江模式
            var model = "XAJ";
        } else {
            var model = "";
        }

        //等待框
        tools.showChartLoading(that.chartGcx);
        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/get_Stcd_For",
            data: "{'stcd':'" + that.show_stcd + "','stime':'" + stime + "','etime':'" + etime + "','plan':'" + searchPlan + "','day':'" + selectDays + "','userId':'" + $("#_hid_userid").val() + "','model':'" + model + "'}",
            //data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(预报信息)失败!");
                }

                var jsonFor = JSON.parse(res);
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {


                    //是否存在产汇流区间
                    var unitName = new Array();
                    //是否存在上游流量
                    var upStaName = new Array();
                    if (jsonFor.unitName != "") {
                        for (var i = 0; i < jsonFor.unitName.length; i++) {
                            unitName.push({
                                name: jsonFor.unitName[i],
                                data: new Array()
                            });
                        }
                    }
                    if (jsonFor.upStaName != "") {
                        for (var i = 0; i < jsonFor.upStaName.length; i++) {
                            upStaName.push({
                                name: jsonFor.upStaName[i],
                                data: new Array()
                            });
                        }
                    }

                    //特征值获取 从统计表中提取
                    try {
                        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") { //河道
                            that.obj_fcch_gcx.jjsw = (jsonFor.Jjsw == "" || jsonFor.Jjsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Jjsw);
                            that.obj_fcch_gcx.bzsw = (jsonFor.Bzsw == "" || jsonFor.Bzsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Bzsw);
                        } else { //水库、湖泊
                            that.obj_fcch_gcx.xxsw = (jsonFor.Xxsw == "" || jsonFor.Xxsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Xxsw);
                            that.obj_fcch_gcx.sjsw = (jsonFor.Sjsw == "" || jsonFor.Sjsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Sjsw);
                            that.obj_fcch_gcx.jhsw = (jsonFor.Jhsw == "" || jsonFor.Jhsw == "0") ? panelConfig_allYb.MIN_NUM : Number(jsonFor.Jhsw);
                        }

                    } catch (e) { }
                    if ((that.show_type == "2" || that.show_type == "3") && !that.show_all) {
                        //生成表格
                        //that.create_table_sqxx(jsonFor);
                    }
                    //先获取流量/入库流量最后一段都为0或者空的数据 提取出最后为空的时刻
                    var arrQ = new Array();
                    var arrQin = new Array();
                    var emptyTM = "";
                    var emptyAll = true;
                    var emptyTM_In = "";
                    var emptyAll_In = true;
                    $.each(jsonFor.data, function (index, item) {
                        arrQ.push({
                            TM: item.TM,
                            Q: item.Q
                        });
                        arrQin.push({
                            TM: item.TM,
                            Qin: item.Qin
                        });
                    });
                    for (i = arrQ.length - 1; i >= 0; i--) {
                        if (arrQ[i].Q == "" || arrQ[i].Q == "0") {
                            emptyTM = arrQ[i].TM;
                        } else {
                            emptyAll = false;
                            break;
                        }
                    }
                    for (i = arrQin.length - 1; i >= 0; i--) {
                        if (arrQin[i].Q == "" || arrQin[i].Q == "0") {
                            emptyTM_In = arrQin[i].TM;
                        } else {
                            emptyAll_In = false;
                            break;
                        }
                    }
                    arrQ = null;
                    arrQin = null;

                    max_sw_time = null;
                    max_ll_time = null;
                    //解析数据
                    $.each(jsonFor.data, function (index, item) {
                        //雨量
                        that.obj_data_gcx.rain.push({
                            value: [item.TM, item.Pavg]
                        });
                        that.obj_minMax_gcx.rain.max = Math.max(Number(item.Pavg), that.obj_minMax_gcx.rain.max);
                        var _tm = item.TM.split('.')[0];
                        that.obj_data_gcx_tm.push(_tm);
                        //水位
                        if (item.Z != "" && item.Z != "0") {
                            that.obj_data_gcx.sssw.push({
                                value: [item.TM, item.Z]
                            });
                            that.obj_minMax_gcx.sw.min = Math.min(Number(item.Z), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(item.Z), that.obj_minMax_gcx.sw.max);
                            max_sw_time = item.TM;
                        }

                        //流量（水库代表实测入库）
                        if (!((item.Q == "" || item.Q == "0") && (emptyAll || !emptyAll && moment(item.TM).diff(moment(emptyTM), "minutes", true) >= 0))) {
                            that.obj_data_gcx.ssll.push({
                                value: [item.TM, item.Q]
                            });
                            max_ll_time = item.TM;
                            that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                        }

                        //预报水位
                        if (item.Zs != "" && item.Zs != "0") {
                            that.obj_data_gcx.ybsw.push({
                                value: [item.TM, item.Zs]
                            });
                            that.obj_data_gcx_bk.ybsw.push({
                                value: [item.TM, item.Zs]
                            });
                            that.obj_data_gcx_y_value.ybsw.push(item.Zs);
                            that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zs), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zs), that.obj_minMax_gcx.sw.max);
                        } else {
                            that.obj_data_gcx.ybsw.push({
                                value: [item.TM, 0]
                            });
                            that.obj_data_gcx_bk.ybsw.push({
                                value: [item.TM, 0]
                            });
                            that.obj_data_gcx_y_value.ybsw.push(0);
                            that.obj_minMax_gcx.sw.min = Math.min(Number(0), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(0), that.obj_minMax_gcx.sw.max);

                        }
                        //预报流量(水库代表实测出库)
                        if (item.Qs != "" && item.Qs != "0") {
                            if (that.show_sttp != "RR") {
                                that.obj_data_gcx_bk.ll_in.push({
                                    value: [item.TM, item.Qs]
                                });
                                that.obj_data_gcx_y_value.ll_in.push(item.Qs);
                            }
                            that.obj_data_gcx.ybll.push({
                                value: [item.TM, item.Qs]
                            });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qs), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qs), that.obj_minMax_gcx.ll.max);
                        } else {
                            if (that.show_sttp != "RR") {
                                that.obj_data_gcx_bk.ll_in.push({
                                    value: [item.TM, 0]
                                });
                                that.obj_data_gcx_y_value.ll_in.push(0);
                            }
                            that.obj_data_gcx.ybll.push({
                                value: [item.TM, 0]
                            });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                        }

                        //产汇流区间
                        if (unitName != null && unitName.length > 0) {
                            for (var i = 0; i < item.Qqj.length; i++) {
                                unitName[i].data.push({
                                    value: [item.TM, item.Qqj[i]]
                                });
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qqj[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qqj[i]), that.obj_minMax_gcx.ll.max);
                            }
                        }

                        //上游流量
                        if (upStaName != null && upStaName.length > 0) {
                            for (var i = 0; i < item.Qhd.length; i++) {
                                upStaName[i].data.push({
                                    value: [item.TM, item.Qhd[i]]
                                });
                                that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qhd[i]), that.obj_minMax_gcx.ll.min);
                                that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qhd[i]), that.obj_minMax_gcx.ll.max);
                            }
                        }

                        if (that.show_sttp == "ZZ") { } else if (that.show_sttp == "DD") {
                            //闸下水位
                            /*   that.obj_data_gcx.sw_zx.push({ value: [item.TM, item.Zx] });
                               that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zx), that.obj_minMax_gcx.sw.min);
                               that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zx), that.obj_minMax_gcx.sw.max);
                          */
                        } else if (that.show_sttp == "RR") {
                            //预报入库流量
                            if (!((emptyAll_In || !emptyAll_In && moment(item.TM).diff(moment(emptyTM_In), "minutes", true) >= 0))) {
                                if (!(item.Qin == "" || item.Qin == "0")) {
                                    that.obj_data_gcx.ll_in.push({
                                        value: [item.TM, item.Qin]
                                    });
                                    that.obj_data_gcx_bk.ll_in.push({
                                        value: [item.TM, item.Qin]
                                    });
                                    that.obj_data_gcx_y_value.ll_in.push(item.Qin);
                                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qin), that.obj_minMax_gcx.ll.min);
                                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qin), that.obj_minMax_gcx.ll.max);
                                } else {
                                    that.obj_data_gcx.ll_in.push({
                                        value: [item.TM, 0]
                                    });
                                    that.obj_data_gcx_bk.ll_in.push({
                                        value: [item.TM, 0]
                                    });
                                    that.obj_data_gcx_y_value.ll_in.push(0);
                                    that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                                    that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                                }

                            }

                        }
                    });

                    //处理数据警戒水位 保证水位 汛限水位数据源
                    if (that.obj_data_gcx.rain != null && that.obj_data_gcx.rain.length > 0) {
                        var maxTime = that.obj_data_gcx.rain[that.obj_data_gcx.rain.length - 1].value[0];
                        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                            //警戒水位
                            if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                                that.obj_data_gcx.jjsw.push({
                                    value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jjsw]
                                });
                                that.obj_data_gcx.jjsw.push({
                                    value: [maxTime, that.obj_fcch_gcx.jjsw]
                                });
                            }
                            //保证水位
                            if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                                that.obj_data_gcx.bzsw.push({
                                    value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.bzsw]
                                });
                                that.obj_data_gcx.bzsw.push({
                                    value: [maxTime, that.obj_fcch_gcx.bzsw]
                                });
                            }
                        } else if (that.show_sttp == "RR") {
                            //汛限水位
                            if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                                that.obj_data_gcx.xxsw.push({
                                    value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.xxsw]
                                });
                                that.obj_data_gcx.xxsw.push({
                                    value: [maxTime, that.obj_fcch_gcx.xxsw]
                                });
                            }
                            //设计水位
                            if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                                that.obj_data_gcx.sjsw.push({
                                    value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.sjsw]
                                });
                                that.obj_data_gcx.sjsw.push({
                                    value: [maxTime, that.obj_fcch_gcx.sjsw]
                                });
                            }
                            //校核水位
                            if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                                that.obj_data_gcx.jhsw.push({
                                    value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jhsw]
                                });
                                that.obj_data_gcx.jhsw.push({
                                    value: [maxTime, that.obj_fcch_gcx.jhsw]
                                });
                            }
                        }
                    }

                    //警戒 保证  汛限是否勾选
                    if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                        that.obj_fcch_gcx.showJjsw = true;
                    } else {
                        that.obj_fcch_gcx.showJjsw = false;
                    }
                    if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                        that.obj_fcch_gcx.showBzsw = true;
                    } else {
                        that.obj_fcch_gcx.showBzsw = false;
                    }
                    if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                        that.obj_fcch_gcx.showXxsw = true;
                    } else {
                        that.obj_fcch_gcx.showXxsw = false;
                    }
                    if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
                        that.obj_fcch_gcx.showSjsw = true;
                    } else {
                        that.obj_fcch_gcx.showSjsw = false;
                    }
                    if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
                        that.obj_fcch_gcx.showJhsw = true;
                    } else {
                        that.obj_fcch_gcx.showJhsw = false;
                    }

                    //获取实时（计算）的最大、最小水位流量
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (that.show_sttp == "RR") {
                        if (that.obj_fcch_gcx.showXxsw) {
                            tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                            that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                        }
                        if (that.obj_fcch_gcx.showSjsw) {
                            tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                            that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                        }
                        if (that.obj_fcch_gcx.showJhsw) {
                            tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                            that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                        }
                    } else {
                        if (that.obj_fcch_gcx.showJjsw) {
                            tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                            that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                        }
                        if (that.obj_fcch_gcx.showBzsw) {
                            tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                            that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
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
                    //获取时间轴刻度
                    var _minTime = "";
                    var _maxTime = "";
                    if (jsonFor.data != null && jsonFor.data.length > 0) {
                        _minTime = jsonFor.data[0].TM;
                        _maxTime = jsonFor.data[jsonFor.data.length - 1].TM;
                    }
                    var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
                    //获取时间轴格式化字符串
                    var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

                    //初始化图表
                    var option = {};
                    if (that.show_sttp == "ZZ") {
                        option = that.get_option_gcx_zz_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                    } else if (that.show_sttp == "DD") {
                        option = that.get_option_gcx_dd_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                    } else if (that.show_sttp == "RR") {
                        option = that.get_option_gcx_rr_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                    }

                    //添加产汇流 上游流量
                    var colors = ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85'];
                    if (unitName != null && unitName.length > 0) {
                        option.legend.data.push("");
                        for (var i = 0; i < unitName.length; i++) {
                            //添加图例默认不展示
                            option.legend.data.push(unitName[i].name);
                            option.legend.selected[unitName[i].name] = false;

                            option.series.push({
                                name: unitName[i].name,
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: colors[i]
                                },
                                lineStyle: {
                                    type: "dashed"
                                },
                                data: unitName[i].data
                            });
                            var bk_data = new Array();
                            $.each(unitName[i].data, function (innerindex, inneritem) {
                                if (innerindex < that.obj_data_gcx.sssw.length) {
                                    bk_data.push(inneritem);
                                }

                            });
                            option.series.push({
                                name: unitName[i].name,
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: colors[i]
                                },

                                data: bk_data
                            });

                        }
                    }
                    if (upStaName != null && upStaName.length > 0) {
                        for (var i = 0; i < upStaName.length; i++) {
                            //添加图例 默认不展示
                            option.legend.data.push(upStaName[i].name);
                            option.legend.selected[upStaName[i].name] = false;

                            option.series.push({
                                name: upStaName[i].name,
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: colors[i + unitName.length]
                                },
                                lineStyle: {
                                    type: "dashed"
                                },
                                data: upStaName[i].data
                            });
                            var bk_data = new Array();
                            $.each(upStaName[i].data, function (innerindex, inneritem) {
                                if (innerindex < that.obj_data_gcx.sssw.length) {
                                    bk_data.push(inneritem);
                                }

                            });
                            option.series.push({
                                name: upStaName[i].name,
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: colors[i + unitName.length]
                                },

                                data: bk_data
                            });
                        }
                    }

                    // 使用刚指定的配置项和数据显示图表。
                    option = tools.initChartlegendIcon(option);
                    that.chartGcx.setOption(option, true);

                    if (!that.show_all) {
                        $.each(that.obj_data_gcx.ybsw, function (dataIndex, item) {
                            that.obj_yb_graphic.arr_graphic.push({
                                type: 'circle',
                                position: that.chartGcx.convertToPixel({
                                    xAxisIndex: 0,
                                    yAxisIndex: 0
                                }, item.value),
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
                        that.obj_yb_graphic.ybsw_count = that.obj_data_gcx.ybsw.length;
                        if (that.show_sttp == "RR") {
                            $.each(that.obj_data_gcx.ll_in, function (dataIndex, item) {
                                that.obj_yb_graphic.arr_graphic.push({
                                    type: 'circle',
                                    position: that.chartGcx.convertToPixel({
                                        xAxisIndex: 0,
                                        yAxisIndex: 1
                                    }, item.value),
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
                            that.obj_yb_graphic.ybll_count = that.obj_data_gcx.ll_in.length;
                        } else {
                            $.each(that.obj_data_gcx.ybll, function (dataIndex, item) {
                                that.obj_yb_graphic.arr_graphic.push({
                                    type: 'circle',
                                    position: that.chartGcx.convertToPixel({
                                        xAxisIndex: 0,
                                        yAxisIndex: 1
                                    }, item.value),
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
                            that.obj_yb_graphic.ybll_count = that.obj_data_gcx.ybll.length;
                        }

                        that.updateChartGcxGraphic();



                    }


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
     * 水位流量过程线（调度对比）
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_dd: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            zcsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            jhsw: panelConfig_allYb.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            },
            ll: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_data_gcx = {
            sssw: new Array(),
            ssll: new Array(),
            ll_in: new Array(),
            ybsw: new Array(),
            ybll: new Array(),
            ddsw: new Array(),
            ddll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            upZBName: new Array(),
            upZBData: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartGcx);
        var objData_dd = {
            adjust: 1,
            forecastModel: "MGE2",
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: getRadioModel(),
            plan: Number(searchPlan),
            range: Number(searchRange),
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            schedulePlanName: that.planId_dd,
            scheduleType: default_scheduleType,
            startTime: searchStime,
            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData_dd);
        var url = apiUrl + "PreSchedule/GetGcxDisPatch";
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
            success: function (jsonDd) {
                if (jsonDd == "" || jsonDd == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询行蓄洪区过程线失败!");
                    return;
                }

                if (jsonDd.code == "0") {
                    tools.show_message_error(jsonDd.msg);
                    return;
                }



                //特征值获取 从统计表中提取
                try {
                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD") { //河道、闸坝
                        $.each(jsonDd.statis, function (i, item) {
                            that.obj_fcch_gcx.jjsw = (item[4] == "" || item[4] == "0") ? panelConfig_allYb.MIN_NUM : Number(item[4]);
                            that.obj_fcch_gcx.bzsw = (item[5] == "" || item[5] == "0") ? panelConfig_allYb.MIN_NUM : Number(item[5]);
                            return false;
                        });
                    } else {
                        $.each(jsonDd.statis, function (i, item) {
                            that.obj_fcch_gcx.xxsw = (item[5] == "" || item[5] == "0") ? panelConfig_allYb.MIN_NUM : Number(item[5]);
                            that.obj_fcch_gcx.sjsw = (item[6] == "" || item[6] == "0") ? panelConfig_allYb.MIN_NUM : Number(item[6]);
                            that.obj_fcch_gcx.jhsw = (item[7] == "" || item[7] == "0") ? panelConfig_allYb.MIN_NUM : Number(item[7]);
                            return false;
                        });
                    };


                } catch (e) { }
                if (!that.show_all) {
                    //生成表格
                    that.create_table_sqxx_dd(jsonDd);
                }
                //先获取水位/流量/入库流量最后一段都为0或者空的数据 提取出最后为空的时刻
                //目的是为了显示出 前面是实时数据（实线） 后面是预报或者调度数据（虚线）

                var arrZ = new Array();
                var arrQ = new Array();
                var arrQin = new Array();
                var emptyTM = "";
                var emptyTM_Z = "";
                var emptyAll = true;
                var emptyTM_In = "";
                var emptyAll_In = true;
                if ((jsonDd.upZBName != null) && (jsonDd.upZBName != undefined) && (jsonDd.upZBName != "")) {

                    $.each(jsonDd.upZBName, function (index, item) {
                        that.obj_data_gcx.upZBName.push(item);
                        var arr_Updd_data = new Array();
                        that.obj_data_gcx.upZBData.push(arr_Updd_data);

                    });
                    $.each(jsonDd.data, function (index, item) {
                        arrZ.push({
                            TM: item.TM,
                            Z: item.Z
                        });
                        arrQ.push({
                            TM: item.TM,
                            Q: item.Q
                        });
                        arrQin.push({
                            TM: item.TM,
                            Q: item.Qin
                        });
                        $.each(item.Updd, function (index_inner, item_inner) {
                            that.obj_data_gcx.upZBData[index_inner].push({
                                value: [item.TM, item_inner]
                            });

                        });
                    });
                }
                for (var i = arrZ.length - 1; i >= 0; i--) {
                    if (arrZ[i].Z == "" || arrZ[i].Z == "0") {
                        emptyTM_Z = arrZ[i].TM;
                    } else {
                        emptyAll = false;
                        break;
                    }
                }
                for (var i = arrQ.length - 1; i >= 0; i--) {
                    if (arrQ[i].Q == "" || arrQ[i].Q == "0") {
                        emptyTM = arrQ[i].TM;
                    } else {
                        emptyAll = false;
                        break;
                    }
                }
                for (var i = arrQin.length - 1; i >= 0; i--) {
                    if (arrQin[i].Q == "" || arrQin[i].Q == "0") {
                        emptyTM_In = arrQin[i].TM;
                    } else {
                        emptyAll_In = false;
                        break;
                    }
                }
                arrZ = null;
                arrQ = null;
                arrQin = null;

                //解析数据
                $.each(jsonDd.data, function (index, item) {
                    //水位
                    if (!((item.Z == "" || item.Z == "0") && (emptyAll || !emptyAll && moment(item.TM).diff(moment(emptyTM_Z), "minutes", true) >= 0))) {
                        that.obj_data_gcx.sssw.push({
                            value: [item.TM, item.Z]
                        });
                        that.obj_minMax_gcx.sw.min = Math.min(Number(item.Z), that.obj_minMax_gcx.sw.min);
                        that.obj_minMax_gcx.sw.max = Math.max(Number(item.Z), that.obj_minMax_gcx.sw.max);
                    }
                    //流量（水库代表实测出库）
                    if (!((item.Q == "" || item.Q == "0") && (emptyAll || !emptyAll && moment(item.TM).diff(moment(emptyTM), "minutes", true) >= 0))) {
                        that.obj_data_gcx.ssll.push({
                            value: [item.TM, item.Q]
                        });
                        that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                    }

                    //预报水位
                    if (item.Zs != "" && item.Zs != "0") {
                        that.obj_data_gcx.ybsw.push({
                            value: [item.TM, item.Zs]
                        });
                        that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zs), that.obj_minMax_gcx.sw.min);
                        that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zs), that.obj_minMax_gcx.sw.max);
                    }
                    //预报流量
                    if (item.Qs != "" && item.Qs != "0") {
                        that.obj_data_gcx.ybll.push({
                            value: [item.TM, item.Qs]
                        });
                        that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qs), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qs), that.obj_minMax_gcx.ll.max);
                    }

                    //调度计算水位
                    if (item.Zdd != "" && item.Zdd != "0") {
                        that.obj_data_gcx.ddsw.push({
                            value: [item.TM, item.Zdd]
                        });
                        that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zdd), that.obj_minMax_gcx.sw.min);
                        that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zdd), that.obj_minMax_gcx.sw.max);
                    }
                    //调度计算流量
                    if (item.Qdd != "" && item.Qdd != "0") {
                        that.obj_data_gcx.ddll.push({
                            value: [item.TM, item.Qdd]
                        });
                        that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qdd), that.obj_minMax_gcx.ll.min);
                        that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qdd), that.obj_minMax_gcx.ll.max);
                    }

                    if (that.show_sttp == "RR") {
                        //入库流量
                        if (!((item.Qin == "" || item.Qin == "0") && (emptyAll_In || !emptyAll_In && moment(item.TM).diff(moment(emptyTM_In), "minutes", true) >= 0))) {
                            that.obj_data_gcx.ll_in.push({
                                value: [item.TM, item.Qin]
                            });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qin), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qin), that.obj_minMax_gcx.ll.max);
                        }
                    }
                });

                //处理数据警戒水位 保证水位 汛限水位数据源
                if (jsonDd.data != null && jsonDd.data.length > 0) {
                    var _minTime = jsonDd.data[0].TM;
                    var _maxTime = jsonDd.data[jsonDd.data.length - 1].TM;
                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                        //警戒水位
                        if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.jjsw.push({
                                value: [_minTime, that.obj_fcch_gcx.jjsw]
                            });
                            that.obj_data_gcx.jjsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.jjsw]
                            });
                        }
                        //保证水位
                        if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.bzsw.push({
                                value: [_minTime, that.obj_fcch_gcx.bzsw]
                            });
                            that.obj_data_gcx.bzsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.bzsw]
                            });
                        }
                    } else if (that.show_sttp == "RR") {
                        //汛限水位
                        if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.xxsw.push({
                                value: [_minTime, that.obj_fcch_gcx.xxsw]
                            });
                            that.obj_data_gcx.xxsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.xxsw]
                            });
                        }
                        //设计水位
                        if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.sjsw.push({
                                value: [_minTime, that.obj_fcch_gcx.sjsw]
                            });
                            that.obj_data_gcx.sjsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.sjsw]
                            });
                        }
                        //校核水位
                        if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                            that.obj_data_gcx.jhsw.push({
                                value: [_minTime, that.obj_fcch_gcx.jhsw]
                            });
                            that.obj_data_gcx.jhsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.jhsw]
                            });
                        }
                    }
                }

                //警戒 保证  汛限是否勾选
                if (that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                    that.obj_fcch_gcx.showJjsw = true;
                } else {
                    that.obj_fcch_gcx.showJjsw = false;
                }
                if (that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                    that.obj_fcch_gcx.showBzsw = true;
                } else {
                    that.obj_fcch_gcx.showBzsw = false;
                }
                if (that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                    that.obj_fcch_gcx.showXxsw = true;
                } else {
                    that.obj_fcch_gcx.showXxsw = false;
                }
                if (that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
                    that.obj_fcch_gcx.showSjsw = true;
                } else {
                    that.obj_fcch_gcx.showSjsw = false;
                }
                if (that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
                    that.obj_fcch_gcx.showJhsw = true;
                } else {
                    that.obj_fcch_gcx.showJhsw = false;
                }

                //获取实时（计算）的最大、最小水位流量
                var tempSw = that.obj_minMax_gcx.sw.max;
                if (that.show_sttp == "RR") {
                    if (that.obj_fcch_gcx.showXxsw) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (that.obj_fcch_gcx.showSjsw) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (that.obj_fcch_gcx.showJhsw) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                } else {
                    if (that.obj_fcch_gcx.showJjsw) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (that.obj_fcch_gcx.showBzsw) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
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
                //获取时间轴刻度
                var _minTime = "";
                var _maxTime = "";
                if (jsonDd.data != null && jsonDd.data.length > 0) {
                    _minTime = jsonDd.data[0].TM;
                    _maxTime = jsonDd.data[jsonDd.data.length - 1].TM;
                }
                var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
                //获取时间轴格式化字符串
                var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

                //初始化图表
                var option = {};
                if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                    option = that.get_option_gcx_zz_dd(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                } else if (that.show_sttp == "RR") {
                    option = that.get_option_gcx_rr_dd(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                }

                // 使用刚指定的配置项和数据显示图表。
                that.chartGcx.setOption(option, true);
                tools.hideChartLoading(that.chartGcx);
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询调度后过程线失败!");
            }
        });
    },

    /**
     * 水位流量过程线（调度后行蓄洪区）
     **/
    echart_line_gcx_xx: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_minMax_gcx = {
            ll: {
                min: dispatchConfig.MAX_NUM,
                max: dispatchConfig.MIN_NUM
            }
        };
        that.obj_data_gcx = {
            ll: new Array(),
            ddll: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartGcx);
        var objData_dd = {
            adjust: 1,
            forecastModel: "MGE2",
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: getRadioModel(),
            plan: Number(searchPlan),
            range: Number(searchRange),
            schedulePlanName: that.planId_dd,
            scheduleType: default_scheduleType,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            startTime: searchStime,
            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData_dd);
        var url = apiUrl + "PreSchedule/GetGcxDisPatch";
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
            success: function (json) {
                if (json == "" || json == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询行蓄洪区过程线失败!");
                    return;
                }

                if (json.code == "0") {
                    tools.show_message_error(json.msg);
                    return;
                }

                //解析数据
                $.each(json.data, function (index, item) {
                    //流量
                    //if (item.Q != "" && item.Q != "0") {
                    that.obj_data_gcx.ll.push({
                        value: [item.TM, item.Q]
                    });
                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                    //}
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
     * 雨量柱状图
     **/
    echart_bar_rain: function (stime, etime) {
        var that = this;
        //初始化参数
        that.arr_ryl_data = new Array();
        //数据源-日雨量累计
        that.arr_ryl_sum = new Array();
        //数据源-时段雨量
        that.arr_sdyl_data = new Array();
        //数据源-时段雨量累计
        that.arr_sdyl_sum = new Array();

        //等待框
        tools.showChartLoading(that.chartRyl);
        //获取日雨量
        var res = "";

        //var objData = {
        //    stcd: that.show_stcd,
        //    stime: stime,
        //    etime: etime,
        //    plan: searchPlan,
        //    userId: $("#_hid_userid").val()
        //};
        //var info = JSON.stringify(objData);

        searchStime = $("#beginTime").val() + ":00";
        searchEtime = $("#endTime").val() + ":00";
        searchPlan = $("#selectPlan").val();

        //  selectModes = getModel();
        //实时预报演算
        var objData = {
            adjust: 1,
            endTime: searchEtime,
            foreDays: Number(selectDays),
            model: selectModes,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: Number(searchPlan),
            range: Number(searchRange),
            startTime: searchStime,
            stcd: that.show_stcd,
            meteorPattern: meteor
        };

        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-realsituate/GetWshedRealPP",
            data: info,
            //url: that.ApiUrlPath + "/get_Real_PP",
            //data: "{'info':'" + info + "'}",
            success: function (data) {
                res = data;
                if (res.code != 200) {
                    tools.hideChartLoading(that.chartRyl);
                    tools.show_message_error_const(res.message)
                    // alert("获取降雨信息失败!");
                    return;
                }
                var json = res.data;
                that.arr_ryl_sum = new Array();
                //解析数据
                var _max = panelConfig_allYb.MIN_NUM;
                $.each(json.data, function (index, item) {
                    _max = Math.max(Number(item[1]), _max);
                    that.arr_ryl_data.push({
                        value: [item[0], Number(item[1])]
                    });
                    that.arr_ryl_sum.push({
                        value: [item[0], Number(item[2])]
                    });
                });
                if (that.arr_ryl_data == null || that.arr_ryl_data.length == 0)
                    return;

                //获取最大雨量
                var axis_rain_max = _max > 0 ? Math.ceil((_max * (1 + panelConfig_allYb.MAX_DEPART))) : 1;
                var max_rain_ryl_sum = that.arr_ryl_sum[that.arr_ryl_sum.length - 1].value[1];
                var axis_rain_max_sum = max_rain_ryl_sum > 0 ? Math.ceil((max_rain_ryl_sum * (1 + panelConfig_allYb.MAX_DEPART))) : 1;
                //获取时间轴刻度
                var intervalX = that.get_axis_interval_bar("1");
                //初始化图表
                var option = that.get_option_ryl(axis_rain_max, axis_rain_max_sum, intervalX);

                // 使用刚指定的配置项和数据显示图表。
                that.chartRyl.setOption(option, true);
                tools.hideChartLoading(that.chartRyl);

                //柱子点击事件-跳转时段雨量
                that.chartRyl.off("click");
                /*  that.chartRyl.on('click', function (ob) {
                      if (ob.seriesType == "bar") {
                          $("#rainInfoBody_AllYb").hide();
                          $("#rainInfoHourBody_AllYb").show();
                          $("#btnReturnRyl_AllYb").show();
                          that.echart_bar_rain_sd(ob.value[0]);
                      }
                  });*/
            },
            error: function (errorMsg) {
                alert("生成降雨信息失败!");
                tools.hideChartLoading(that.chartRyl);
            }
        });
    },
    /**
     * 获取时间轴刻度-日雨量
     **/
    get_axis_interval_bar: function (type) {
        var that = this;
        //获取时间轴最大最小差值
        var minTime = "";
        var maxTime = "";
        if (type == "1") {
            if (that.arr_ryl_data != null && that.arr_ryl_data.length > 0) {
                minTime = that.arr_ryl_data[0].value[0];
                maxTime = that.arr_ryl_data[that.arr_ryl_data.length - 1].value[0];
                var axisLen = parseInt((that.chartRyl.getWidth() - 80) / 75);
                axisLen = axisLen > (that.arr_ryl_data.length - 1) ? (that.arr_ryl_data.length - 1) : axisLen;
                return (moment(maxTime.replace(new RegExp(/-/gm), "/")).valueOf() - moment(minTime.replace(new RegExp(/-/gm), "/")).valueOf()) / axisLen;
            } else {
                return 99999999;
            }
        } else {
            return 3450000; //一小时
        }
    },
    /**
     * 雨量柱状图-时段
     **/
    echart_bar_rain_sd: function (time) {
        var that = this;
        //数据源-时段雨量
        that.arr_sdyl_data = new Array();
        //数据源-时段雨量累计
        that.arr_sdyl_sum = new Array();

        //等待框
        tools.showChartLoading(that.chartSdyl);
        //获取时段雨量
        var res = "";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: that.ApiUrlPath + "/getSdyl",
            data: "{'stcd':'" + that.show_stcd + "','time':'" + time + "'}",
            success: function (data) {
                res = data.d;
                if (res == "") {
                    tools.hideChartLoading(that.chartSdyl);
                    alert("获取时段降雨信息失败!");
                    return;
                }

                //解析数据
                var arrRes = res.split("|");
                var sum = 0;
                var len = arrRes.length;
                var _max = panelConfig_allYb.MIN_NUM;
                var year = time.substr(0, 4);
                for (var i = 1; i < len; i++) {
                    if (arrRes[i].toString().length == 0)
                        continue;

                    var child = arrRes[i].split(",");
                    var tempTime = year + "-" + child[0] + ":00";
                    that.arr_sdyl_data.push({
                        value: [tempTime, child[1]]
                    });
                    _max = Math.max(Number(child[1]), _max);
                    sum += Number(child[1]);
                    that.arr_sdyl_sum.push({
                        value: [tempTime, sum == parseInt(sum) ? sum : sum.toFixed(1)]
                    });
                }
                if (that.arr_sdyl_data == null || that.arr_sdyl_data.length == 0)
                    return;

                //获取最大雨量
                var axis_rain_max = _max > 0 ? Math.ceil((_max * (1 + panelConfig_allYb.MAX_DEPART))) : 1;
                var max_rain_ryl_sum = that.arr_sdyl_sum[that.arr_sdyl_sum.length - 1].value[1];
                var axis_rain_max_sum = max_rain_ryl_sum > 0 ? Math.ceil((max_rain_ryl_sum * (1 + panelConfig_allYb.MAX_DEPART))) : 1;
                //获取时间轴刻度
                var intervalX = that.get_axis_interval_bar("2");
                //初始化图表
                var option = that.get_option_sdyl(axis_rain_max, axis_rain_max_sum, intervalX);

                // 使用刚指定的配置项和数据显示图表。
                that.chartSdyl.setOption(option, true);
                tools.hideChartLoading(that.chartSdyl);

                //显示返回按钮
                $("#btnReturnRyl_AllYb").show();
            },
            error: function (errorMsg) {
                alert("生成时段降雨信息失败!");
                tools.hideChartLoading(that.chartRyl);
            }
        });
    },
    /**
     * 断面信息
     **/
    echart_line_dmxx: function () {
        var that = this;
        //初始化参数
        that.obj_fcch_dmxx = {
            sw: panelConfig_allYb.MIN_NUM,
            sw_zx: panelConfig_allYb.MIN_NUM,
            jjsw: panelConfig_allYb.MIN_NUM,
            bzsw: panelConfig_allYb.MIN_NUM,
            xxsw: panelConfig_allYb.MIN_NUM,
            sjsw: panelConfig_allYb.MIN_NUM,
            ssw: panelConfig_allYb.MIN_NUM,
            sw_time: "",
            sw_position: "0"
        };
        that.obj_minMax_dmxx = {
            gc: {
                min: panelConfig_allYb.MAX_NUM,
                max: panelConfig_allYb.MIN_NUM
            }
        };
        that.obj_data_dmxx = {
            data: new Array(),
            sw: new Array(),
            sw_zx: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            sjsw: new Array(),
            ssw: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartDm);
        //左高程  右高程--用于模拟断面
        var leftGz = panelConfig_allYb.MAX_NUM;
        var rightGz = panelConfig_allYb.MAX_NUM;

        var objData = {
            stcd: that.show_stcd,
            startTime: that.show_btime,
            endTime: that.show_etime,
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-stnbasic/getSection",
            data: info,
            success: function (data) {
                var res = data;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartDm);
                    tools.show_message_error("获取断面信息失败!");
                    return;
                }
                if (res.code !== "0") {
                    tools.show_message_error("获取断面信息失败!");
                    return;
                }
                var jsonData = res;
                /* if (json.msg.indexOf("失败") > -1) {
                     tools.hideChartLoading(that.chartDm);
                     tools.show_message_error("获取断面信息失败!");
                     return;
                 }*/

                //解析数据  河道：站号,时间,实时水位,警戒水位,保证水位,左堤高程,右堤高程|*起点距,河底高程
                //闸坝：站号,时间,闸上水位,闸下水位,警戒水位,保证水位,左堤高程,右堤高程|*起点距,河底高程
                //水库：站号,时间,实时水位,汛限水位,死水位,设计水位,坝顶高程|*起点距,河底高程
                /* var arrRes = res.split("*");
                 var arrTz = arrRes[0].split("|")[1].split(",");
                 var arrGc = arrRes[1].split("|");
                 var lenGc = arrGc.length;
                 var child;*/
                var lenGc = jsonData.data.recNum;


                //高程数据处理
                /*  for (var i = 1; i < lenGc; i++) {
                      if (arrGc[i].toString().length == 0)
                          continue;

                      child = arrGc[i].split(",");
                      that.obj_data_dmxx.data.push({value: [child[0], Number(child[1])]});
                  }*/
                for (var i = 0; i < lenGc; i++) {
                    that.obj_data_dmxx.data.push({
                        value: [jsonData.data.di[i], Number(jsonData.data.zb[i])]
                    });
                }

                //数据处理
                if (that.show_sttp == "ZZ" || that.show_sttp == "TT") {
                    /*  that.obj_fcch_dmxx.sw = arrTz[2] == "" ? "" : Number(arrTz[2]);
                      that.obj_fcch_dmxx.jjsw = arrTz[3] == "" ? "" : Number(arrTz[3]);
                      that.obj_fcch_dmxx.bzsw = arrTz[4] == "" ? "" : Number(arrTz[4]);
                      that.obj_fcch_dmxx.sw_time = arrTz[1];

                      that.obj_minMax_dmxx.gc.max = Math.max(Number(arrTz[5]), Number(arrTz[6]));*/

                    that.obj_fcch_dmxx.sw = Number(jsonData.data.rtZ);
                    that.obj_fcch_dmxx.jjsw = Number(jsonData.data.wrZ);
                    that.obj_fcch_dmxx.bzsw = Number(jsonData.data.grZ);
                    that.obj_fcch_dmxx.sw_time = jsonData.data.tm;



                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.jjsw);
                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.bzsw);

                    //模拟左右高程
                    /*  if (arrTz[5] != "") {
                          leftGz = arrTz[5];
                      }
                      else*/
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        leftGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
                    } else if (that.obj_fcch_dmxx.jjsw != "") {
                        leftGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
                    } else if (that.obj_fcch_dmxx.sw != "") {
                        leftGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
                    }
                    /* if (arrTz[6] != "") {
                         rightGz = arrTz[6];
                     }
                     else */
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        rightGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
                    } else if (that.obj_fcch_dmxx.jjsw != "") {
                        rightGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
                    } else if (that.obj_fcch_dmxx.sw != "") {
                        rightGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
                    }

                    //特征值数据源
                    if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                        if (that.obj_fcch_dmxx.sw != "") {
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                            });
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                            });
                        }
                        if (that.obj_fcch_dmxx.jjsw != "") {
                            that.obj_data_dmxx.jjsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw]
                            });
                            that.obj_data_dmxx.jjsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw]
                            });
                        }
                        if (that.obj_fcch_dmxx.bzsw != "") {
                            that.obj_data_dmxx.bzsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw]
                            });
                            that.obj_data_dmxx.bzsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw]
                            });
                        }
                    }
                } else if (that.show_sttp == "DD") {


                    that.obj_fcch_dmxx.sw = Number(jsonData.data.upZ).toFixed(2);
                    that.obj_fcch_dmxx.sw_zx = Number(jsonData.data.dwZ).toFixed(2);
                    that.obj_fcch_dmxx.jjsw = Number(jsonData.data.wrZ).toFixed(2);
                    that.obj_fcch_dmxx.bzsw = Number(jsonData.data.grZ).toFixed(2);
                    that.obj_fcch_dmxx.sw_time = jsonData.data.tm;



                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.jjsw);
                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.bzsw);

                    //模拟左右高程
                    /*  if (arrTz[6] != "") {
                          leftGz = arrTz[6];
                      }
                      else */
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        leftGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
                    } else if (that.obj_fcch_dmxx.jjsw != "") {
                        leftGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
                    } else if (that.obj_fcch_dmxx.sw != "") {
                        leftGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
                    }
                    /* if (arrTz[7] != "") {
                         rightGz = arrTz[7];
                     }
                     else */
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        rightGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
                    } else if (that.obj_fcch_dmxx.jjsw != "") {
                        rightGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
                    } else if (that.obj_fcch_dmxx.sw != "") {
                        rightGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
                    }

                    //特征值数据源
                    if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                        if (that.obj_fcch_dmxx.sw != "") {
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                            });
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                            });
                        }
                        if (that.obj_fcch_dmxx.sw_zx != "") {
                            that.obj_data_dmxx.sw_zx.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw_zx]
                            });
                            that.obj_data_dmxx.sw_zx.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw_zx]
                            });
                        }
                        if (that.obj_fcch_dmxx.jjsw != "") {
                            that.obj_data_dmxx.jjsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw]
                            });
                            that.obj_data_dmxx.jjsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw]
                            });
                        }
                        if (that.obj_fcch_dmxx.bzsw != "") {
                            that.obj_data_dmxx.bzsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw]
                            });
                            that.obj_data_dmxx.bzsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw]
                            });
                        }
                    }
                } else {
                    /* that.obj_fcch_dmxx.sw = arrTz[2] == "" ? "" : Number(arrTz[2]);
                     that.obj_fcch_dmxx.xxsw = arrTz[3] == "" ? "" : Number(arrTz[3]);
                     that.obj_fcch_dmxx.ssw = arrTz[4] == "" ? "" : Number(arrTz[4]);
                     that.obj_fcch_dmxx.sjsw = arrTz[5] == "" ? "" : Number(arrTz[5]);
                     that.obj_fcch_dmxx.sw_time = arrTz[1];

                     that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, Number(arrTz[6]));*/

                    that.obj_fcch_dmxx.sw = Number(jsonData.data.rtZ).toFixed(2);
                    that.obj_fcch_dmxx.xxsw = Number(jsonData.data.flwl).toFixed(2);
                    that.obj_fcch_dmxx.ssw = Number(jsonData.data.actZ).toFixed(2);
                    that.obj_fcch_dmxx.sjsw = Number(jsonData.data.dsZ).toFixed(2);
                    that.obj_fcch_dmxx.sw_time = jsonData.data.tm;

                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.xxsw);
                    that.obj_minMax_dmxx.gc.max = Math.max(that.obj_minMax_dmxx.gc.max, that.obj_fcch_dmxx.sjsw);

                    //模拟左右高程
                    /* if (arrTz[6] != "") {
                         leftGz = arrTz[6];
                     }
                     else */
                    if (that.obj_fcch_dmxx.sjsw != "") {
                        leftGz = (that.obj_fcch_dmxx.sjsw * 1.05).toString()
                    } else if (that.obj_fcch_dmxx.xxsw != "") {
                        leftGz = (that.obj_fcch_dmxx.xxsw * 1.1).toString()
                    } else if (that.obj_fcch_dmxx.sw != "") {
                        leftGz = (that.obj_fcch_dmxx.sw * 1.15).toString()
                    }

                    //特征值数据源
                    if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                        if (that.obj_fcch_dmxx.sw != "") {
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                            });
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                            });
                        }
                        if (that.obj_fcch_dmxx.ssw != "") {
                            that.obj_data_dmxx.ssw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.ssw]
                            });
                            that.obj_data_dmxx.ssw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.ssw]
                            });
                        }
                        if (that.obj_fcch_dmxx.xxsw != "") {
                            that.obj_data_dmxx.xxsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.xxsw]
                            });
                            that.obj_data_dmxx.xxsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.xxsw]
                            });
                        }
                        if (that.obj_fcch_dmxx.sjsw != "") {
                            that.obj_data_dmxx.sjsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sjsw]
                            });
                            that.obj_data_dmxx.sjsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sjsw]
                            });
                        }
                    }
                }

                //获取实时水位显示位置 百分比
                that.obj_fcch_dmxx.sw_position = that.get_dmxx_position(that.obj_data_dmxx.data, that.obj_fcch_dmxx.sw);
                //判断图表数据源是否有数据 若无则模拟数据
                var isEmpty = false;
                if ((that.obj_data_dmxx.data == null || that.obj_data_dmxx.data == 0) && leftGz != panelConfig_allYb.MAX_NUM) {
                    isEmpty = true;
                    that.obj_minMax_dmxx.gc.min = 0;
                    that.obj_fcch_dmxx.sw_position = "50";

                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD" || that.show_sttp == "TT") {
                        //第一个平台
                        for (var i = 1; i <= 4; i++) {
                            that.obj_data_dmxx.data.push({
                                value: [i, leftGz]
                            });
                        }
                        //第一个坡度
                        for (var i = 5; i <= 9; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, (Number(leftGz) * Number(1 - (i - 5 + 1) * 0.2)).toString()]
                            });
                        }
                        //中间详细数据
                        for (var i = 10; i <= 30; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, 0]
                            });
                        }
                        //第二个坡度
                        for (var i = 31; i <= 35; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, (Number(rightGz) * Number(0.2 * (i - 31))).toString()]
                            });
                        }
                        //第二个平台
                        for (var i = 36; i <= 39; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, rightGz]
                            });
                        }

                        if (that.show_sttp == "ZZ" || that.show_sttp == "TT") {
                            if (that.obj_fcch_dmxx.sw != "") {
                                that.obj_data_dmxx.sw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                                });
                                that.obj_data_dmxx.sw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                                });
                            }
                            if (that.obj_fcch_dmxx.jjsw != "") {
                                that.obj_data_dmxx.jjsw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw]
                                });
                                that.obj_data_dmxx.jjsw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw]
                                });
                            }
                            if (that.obj_fcch_dmxx.bzsw != "") {
                                that.obj_data_dmxx.bzsw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw]
                                });
                                that.obj_data_dmxx.bzsw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw]
                                });
                            }
                        } else {
                            if (that.obj_fcch_dmxx.sw != "") {
                                that.obj_data_dmxx.sw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                                });
                                that.obj_data_dmxx.sw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                                });
                            }
                            if (that.obj_fcch_dmxx.sw_zx != "") {
                                that.obj_data_dmxx.sw_zx.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw_zx]
                                });
                                that.obj_data_dmxx.sw_zx.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw_zx]
                                });
                            }
                            if (that.obj_fcch_dmxx.jjsw != "") {
                                that.obj_data_dmxx.jjsw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw]
                                });
                                that.obj_data_dmxx.jjsw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw]
                                });
                            }
                            if (that.obj_fcch_dmxx.bzsw != "") {
                                that.obj_data_dmxx.bzsw.push({
                                    value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw]
                                });
                                that.obj_data_dmxx.bzsw.push({
                                    value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw]
                                });
                            }
                        }
                    } else {
                        //中间详细数据
                        for (var i = 1; i <= 20; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, 0]
                            });
                        }
                        //第一个坡度
                        for (var i = 21; i <= 25; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, (Number(leftGz) * Number(0.2 * (i - 21))).toString()]
                            });
                        }
                        //第一个平台
                        for (var i = 26; i <= 29; i++) {
                            that.obj_data_dmxx.data.push({
                                name: i,
                                value: [i, leftGz]
                            });
                        }

                        if (that.obj_fcch_dmxx.sw != "") {
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw]
                            });
                            that.obj_data_dmxx.sw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw]
                            });
                        }
                        if (that.obj_fcch_dmxx.ssw != "") {
                            that.obj_data_dmxx.ssw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.ssw]
                            });
                            that.obj_data_dmxx.ssw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.ssw]
                            });
                        }
                        if (that.obj_fcch_dmxx.xxsw != "") {
                            that.obj_data_dmxx.xxsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.xxsw]
                            });
                            that.obj_data_dmxx.xxsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.xxsw]
                            });
                        }
                        if (that.obj_fcch_dmxx.sjsw != "") {
                            that.obj_data_dmxx.sjsw.push({
                                value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sjsw]
                            });
                            that.obj_data_dmxx.sjsw.push({
                                value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sjsw]
                            });
                        }
                    }
                }

                //最大 最小高程
                var minMax = that.get_min_max(that.obj_data_dmxx.data);
                var min_gc_dmxx_temp = minMax.min;
                var max_gc_dmxx_temp = Math.max(minMax.max, that.obj_minMax_dmxx.gc.max);
                var axis_x_min = (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) ? that.obj_data_dmxx.data[0].value[0] : 0;
                var axis_x_max = (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) ? that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0] : 1;
                if (isEmpty) {
                    that.obj_minMax_dmxx.gc.min = 0;
                    that.obj_minMax_dmxx.gc.max = max_gc_dmxx_temp * 1.05;
                } else {
                    if (max_gc_dmxx_temp - min_gc_dmxx_temp > 0) {
                        that.obj_minMax_dmxx.gc.min = min_gc_dmxx_temp - (max_gc_dmxx_temp - min_gc_dmxx_temp) * panelConfig_allYb.MIN_DEPART / 2;
                        that.obj_minMax_dmxx.gc.max = max_gc_dmxx_temp + (max_gc_dmxx_temp - min_gc_dmxx_temp) * panelConfig_allYb.MAX_DEPART / 2;
                    } else {
                        if (min_gc_dmxx_temp == MIN_NUM) {
                            that.obj_minMax_dmxx.gc.min = 0;
                            that.obj_minMax_dmxx.gc.max = 1;
                        } else {
                            that.obj_minMax_dmxx.gc.min = min_gc_dmxx_temp - 0.5;
                            that.obj_minMax_dmxx.gc.max = max_gc_dmxx_temp + 0.5;
                        }
                    }
                }

                //最低高程小于0 特殊处理
                //所有的数据源都变小（+最低高程） Y轴刻度变大（-最低高程)
                if (that.obj_minMax_dmxx.gc.min < 0) {
                    //更新水位数据
                    that.obj_fcch_dmxx.sw = (that.obj_fcch_dmxx.sw != "" && that.obj_fcch_dmxx.sw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sw;
                    that.obj_fcch_dmxx.sw_zx = (that.obj_fcch_dmxx.sw_zx != "" && that.obj_fcch_dmxx.sw_zx != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sw_zx) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sw_zx;
                    that.obj_fcch_dmxx.jjsw = (that.obj_fcch_dmxx.jjsw != "" && that.obj_fcch_dmxx.jjsw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.jjsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.jjsw;
                    that.obj_fcch_dmxx.bzsw = (that.obj_fcch_dmxx.bzsw != "" && that.obj_fcch_dmxx.bzsw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.bzsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.bzsw;
                    that.obj_fcch_dmxx.xxsw = (that.obj_fcch_dmxx.xxsw != "" && that.obj_fcch_dmxx.xxsw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.xxsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.xxsw;
                    that.obj_fcch_dmxx.sjsw = (that.obj_fcch_dmxx.sjsw != "" && that.obj_fcch_dmxx.sjsw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sjsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sjsw;
                    that.obj_fcch_dmxx.ssw = (that.obj_fcch_dmxx.ssw != "" && that.obj_fcch_dmxx.ssw != panelConfig_allYb.MAX_NUM) ? (Number(that.obj_fcch_dmxx.ssw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.ssw;

                    //更新数据源
                    that.obj_data_dmxx.data = that.update_arr_dmxx(that.obj_data_dmxx.data);
                    that.obj_data_dmxx.sw = that.update_arr_dmxx(that.obj_data_dmxx.sw);
                    that.obj_data_dmxx.sw_zx = that.update_arr_dmxx(that.obj_data_dmxx.sw_zx);
                    that.obj_data_dmxx.jjsw = that.update_arr_dmxx(that.obj_data_dmxx.jjsw);
                    that.obj_data_dmxx.bzsw = that.update_arr_dmxx(that.obj_data_dmxx.bzsw);
                    that.obj_data_dmxx.xxsw = that.update_arr_dmxx(that.obj_data_dmxx.xxsw);
                    that.obj_data_dmxx.sjsw = that.update_arr_dmxx(that.obj_data_dmxx.sjsw);
                    that.obj_data_dmxx.ssw = that.update_arr_dmxx(that.obj_data_dmxx.ssw);
                }

                //初始化图表
                var option = {};
                if (that.show_sttp == "ZZ") {
                    option = that.get_option_dmxx_zz(axis_x_min, axis_x_max);
                } else if (that.show_sttp == "DD") {
                    option = that.get_option_dmxx_dd(axis_x_min, axis_x_max);
                } else if (that.show_sttp == "RR") {
                    option = that.get_option_dmxx_rr(axis_x_min, axis_x_max);
                }

                // 使用刚指定的配置项和数据显示图表。
                that.chartDm.setOption(option, true);
                tools.hideChartLoading(that.chartDm);
            },
            error: function (errorMsg) {
                tools.show_message_error("生成断面信息失败!");
                tools.hideChartLoading(that.chartDm);
            }
        });
    },

    modifyFormInline: function (width) {
        /*  var that = this;

          if ($("#treeMenuSw").is(":visible")) {
              $(this.parentId).find(".form-inline").width(width - 200-20);
          }
          else {
              $(this.parentId).find(".form-inline").width(width);
          }
          */
    },
    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize, isInit) {

        var that = this;
        $(this.parentId).width(width).height(height);
        that.modifyFormInline(width);

        var tjtableHeight = $("#tj_tbody_allYb").height();

        //获取真实宽度
        var _width = width - 20;
        $("#contProLine_AllYb").width(_width - 200);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            //_height = _height - panelConfig_allYb.table_height_yb;
            //$(this.parentId + " .tj_body_all").width(_width - 200);
            //$(this.parentId + " .tableHd," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig_allYb.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px",
                //"height": "auto"
            });
            $(this.parentId + " .dataTables_scrollHeadInner").css({
                "width": "100%",
            });
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").css({
                "width": "100%",
            });
            $(this.parentId + '.dataTables_scrollHead').css({
                "padding-right": "8px"
            })
            //that.modifyFormInline(width);
        }
        //基本信息
        $(this.parentId).find(".table-jbxx").width(_width); //2019-10-8 modify by chl
        $(this.parentId).find(".table-jbxx").parent().height(_height - 2);
        var isshowall = false;
        //过程线
        if (that.show_type == "1" || ((that.show_type == "2" || that.show_type == "3") && !that.show_all)) {
            //  var xx = $(".ybsw-modify").is(":visible");
            if (that.show_type == "3") {

                $("#proLineBody_AllYb").width(_width - 575 - 200).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                $("#contProLine_AllYb .content-left").css("margin-right", 575);
                $("#contProLine_AllYb .content-left").css("margin-top", -28);
                $("#contProLine_AllYb .sidebar-right").width(550);

            } else {

                $("#proLineBody_AllYb").width(_width - 425 - 2 - 200).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                $("#contProLine_AllYb .content-left").css("margin-right", 425);
                $("#contProLine_AllYb .content-left").css("margin-top", 0);
                $("#contProLine_AllYb .sidebar-right").width(400);
                /*
                  var isshow_right = $("#contProLine_AllYb .sidebar-right").width() == 0 ? false : true;
                $("#proLineBody_AllYb").width(_width - (isshow_right==true?425:0) - 200).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                $("#contProLine_AllYb .content-left").css("margin-right", (isshow_right == true ? 425 : 25));
                $("#contProLine_AllYb .content-left").css("margin-top", 0);
                $("#contProLine_AllYb .sidebar-right").width((isshow_right == true ? 400 : 0));
                 */


            }
            $("#contProLine_AllYb .tableSqxx").parent().height(_height - (that.show_type != "1" ? 105 : 0) - 48);
            $("#contProLine_AllYb .ybsq-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        } else {
            isshowall = true;
            $("#proLineBody_AllYb").css("margin-top", 0);
            var tjtableHeight = $("#tj_tbody_allYb").height();
            $("#proLineBody_AllYb").width(_width).height(_height - tjtableHeight - 35);
            //$("#proLineBody_AllYb").width(_width).height(_height - (($(".ybsw-modify").is(":visible")) ? 45 : 0));
        }
        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine_AllYb .content-left").show();
                $("#proLineBody_AllYb").show();
                $("#contProLine_AllYb .sidebar-right").show();
            } else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody_AllYb").is(':visible');
                var v_right = $("#contProLine_AllYb .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine_AllYb .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine_AllYb .content-left").show();
                } else if (v_left) {
                    $("#proLineBody_AllYb").width(that.panel_actual_width - 200 - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine_AllYb .content-left").css("margin-right", 25);
                    $("#contProLine_AllYb .sidebar-right").width(0);
                } else if (v_right) {
                    $("#proLineBody_AllYb").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine_AllYb .content-left").css("margin-right", that.panel_actual_width - 200 - 20);

                    $("#contProLine_AllYb .sidebar-right").width(that.panel_actual_width - 200 - 20 - 25 - 2);
                }
            }
        }


        if (isResize) {
            this.chartGcx.resize();
        }

        //降雨信息
        $("#rainInfoBody_AllYb").width(_width - 10).height(_height - tjtableHeight - 35); //2019-10-8 modify by chl
        $("#rainInfoHourBody_AllYb").width(_width - 10).height(_height - 10);
        if (isResize) {
            this.chartRyl.resize();
            this.chartSdyl.resize();
        }

        //断面信息
        $("#dmInfoBody_AllYb").width(_width).height(_height - tjtableHeight - 35); //2019-10-8 modify by chl
        if (isResize) {
            this.chartDm.resize();
        }

        //历史极值表格宽高
        var rank_height = (_height - 33) / 2 - 30;
        $(this.parentId + " .tableSwMax").parent().height(rank_height);
        $(this.parentId + " .tableSwMin").parent().height(rank_height);
        $(this.parentId + " .tableLlMax").parent().height(rank_height);
        $(this.parentId + " .tableLlMin").parent().height(rank_height);
        $(this.parentId + " .rank-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });
    },
    /**
     * 生成表格-实时水情
     **/
    create_table_sqxx_real: function (json) {
        var that = this;
        //表头 河道：时间、水位、流量
        //    闸坝：时间、水位、流量、
        //    水库：时间、水位、入库流量、出库流量
        //先清空数据
        $("#contProLine_AllYb .ybsq-table-header table colgroup col").remove();
        $("#contProLine_AllYb .ybsq-table-header table thead tr").remove();
        $("#contProLine_AllYb .tableSqxx colgroup col").remove();
        $("#contProLine_AllYb .tableSqxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";
        if (that.show_sttp == "ZZ") {
            _html_col += "<col style='width: 50%;' />";
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 25%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>流量</th></tr>";
        } else if (that.show_sttp == "DD") {
            _html_col += "<col style='width: 50%;' />";
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 25%;' />";
            _html_th = "<tr><th>时间</th><th>闸上水位</th><th>流量</th></tr>";
        } else if (that.show_sttp == "RR") {
            _html_col += "<col style='width: 40%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>入库流量</th><th>出库流量</th></tr>";
        }
        $("#contProLine_AllYb .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine_AllYb .tableSqxx colgroup").append(_html_col);
        $("#contProLine_AllYb .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";
        $.each(json.data, function (index, item) {
            var font_Z_start = "";
            var font_Z_end = "";
            var font_Zs_color = "";
            item.TM = item.TM.replace(new RegExp(/-/gm), "/");
            if (that.show_sttp == "ZZ") {
                var temp_z = Number(item.Z);
                if (temp_z >= that.obj_fcch_gcx.bzsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Q + "</td></tr>";
            } else if (that.show_sttp == "DD") {
                var temp_z = Number(item.Z);
                if (temp_z >= that.obj_fcch_gcx.bzsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Q + "</td></tr>";
            } else if (that.show_sttp == "RR") {
                var temp_z = Number(item.Z);
                if (temp_z >= that.obj_fcch_gcx.jhsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.xxsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Qin + "</td><td>" + item.Q + "</td></tr>";
            }
        });
        $("#contProLine_AllYb .tableSqxx tbody").append(_html_body);
    },
    /**
     * 生成表格-预报水情
     **/
    create_table_sqxx: function (json) {
        var that = this;
        //表头 河道：时间、水位、流量、预报水位、预报流量
        //    闸坝：时间、水位、闸下水位、流量、预报水位、预报流量
        //    水库：时间、水位、入库流量、出库流量、预报水位、预报流量
        //先清空数据
        $("#contProLine_AllYb .ybsq-table-header table colgroup col").remove();
        $("#contProLine_AllYb .ybsq-table-header table thead tr").remove();
        $("#contProLine_AllYb .tableSqxx colgroup col").remove();
        $("#contProLine_AllYb .tableSqxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        if (that.show_sttp == "ZZ") {
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>流量</th><th>预报水位</th><th>预报流量</th></tr>";
        } else if (that.show_sttp == "DD") {
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_th = "<tr><th>时间</th><th>闸上水位</th><th>流量</th><th>预报水位</th><th>预报流量</th></tr>";
        } else if (that.show_sttp == "RR") {
            _html_col += "<col style='width: 21%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 17%;' />";
            _html_col += "<col style='width: 17%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>入库流量</th><th>出库流量</th><th>预报水位</th><th>预报流量</th></tr>";
        }
        $("#contProLine_AllYb .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine_AllYb .tableSqxx colgroup").append(_html_col);
        $("#contProLine_AllYb .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";
        $.each(json.data, function (index, item) {
            var grayclass = "";

            if (item.TM != "" && moment(that.show_etime).diff(moment(item.TM), "minutes", true) >= 0) {
                grayclass = " td_gray ";
            }
            var font_Z_start = "";
            var font_Z_end = "";
            var font_Zs_color = "";

            if (that.show_sttp == "ZZ") {
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= that.obj_fcch_gcx.bzsw) {
                    font_Zs_color = " style='color:Red'";

                } else if (temp_Zs >= that.obj_fcch_gcx.jjsw) {

                    font_Zs_color = " style='color:Blue'";
                }
                if ((item.Z == "0") || (item.Z == "")) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qs + "'   /></td></tr>";

                } else {
                    var temp_z = Number(item.Z);
                    if (temp_z >= that.obj_fcch_gcx.bzsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }

                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qs + "'  readonly /></td></tr>";

                }
            } else if (that.show_sttp == "DD") {
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= that.obj_fcch_gcx.bzsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.jjsw) {
                    font_Zs_color = " style='color:Blue'";
                }
                if ((item.Z == "0") || (item.Z == "")) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qs + "'   /></td></tr>";

                } else {
                    var temp_z = Number(item.Z);
                    if (temp_z >= that.obj_fcch_gcx.bzsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qs + "'  readonly /></td></tr>";

                }
            } else if (that.show_sttp == "RR") {
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= that.obj_fcch_gcx.jhsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.sjsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.xxsw) {
                    font_Zs_color = " style='color:Blue'";
                }
                if ((item.Z == "0") || (item.Z == "")) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z) + "</td><td class='" + grayclass + "'>" + item.Q + "</td><td class='" + grayclass + "'>" + item.Qs + "</td> <<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qin + "'   /></td></tr>";

                } else {

                    var temp_z = Number(item.Z);
                    if (temp_z >= that.obj_fcch_gcx.jhsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.xxsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td class='" + grayclass + "'>" + item.Q + "</td><td class='" + grayclass + "'>" + item.Qs + "</td> <<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qin + "'  readonly /></td></tr>";

                }
            }
        });
        $("#contProLine_AllYb .tableSqxx tbody").append(_html_body);
        //  $("#contProLine_AllYb .tableSqxx .edit_input input").removeAttr("readonly");
        //生成该站统计信息
        try {
            $("#contProLine_AllYb .table_ybtj thead tr").remove();
            $("#contProLine_AllYb .table_ybtj tbody tr").remove();
            var jsonTj = JSON.parse(that.ybTj_Data);
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>洪峰水位</th><th>洪峰水位时间</th><th>洪峰流量</th><th>警戒水位</th><th>保证水位</th><th>保证流量</th></tr>");
                var isExist = false;
                $.each(jsonTj.dataHd, function (i, item) {
                    if (item.Stcd == that.show_stcd) {
                        isExist = true;
                        item.Hfsw = item.Hfsw == "0" ? "" : item.Hfsw;
                        item.Hwtm = item.Hwtm == "" ? "" : moment(item.Hwtm).format("YYYY-MM-DD HH:mm");
                        item.Hfll = item.Hfll == "0" ? "" : item.Hfll;
                        item.Jjsw = item.Jjsw == "0" ? "" : item.Jjsw;
                        item.Bzsw = item.Bzsw == "0" ? "" : item.Bzsw;
                        item.Bzll = item.Bzll == "0" ? "" : item.Bzll;
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Hfsw + "</td><td>" + item.Hwtm + "</td><td>" + item.Hfll + "</td><td>" + item.Jjsw + "</td><td>" + item.Bzsw + "</td><td>" + item.Bzll + "</td></tr>");
                        return false;
                    }
                });
                if (!isExist) {
                    $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                }
            } else {
                //湖泊站
                if (that.show_stcd == "51201601" || that.show_stcd == "51203401" || that.show_stcd == "50916500" || that.show_stcd == "51107801" || that.show_stcd == "51003650" || that.show_stcd == "51003800") {
                    $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>当前水位</th><th>现状下泄流量</th><th>预报最高水位</th><th>超汛限水位</th><th>预报总来水量</th><th>汛限水位</th><th>设计洪水位</th><th>设计库容</th><th>校核洪水位</th><th>总库容</th><th>历史最高水位</th></tr>");
                    var isExist = false;
                    $.each(jsonTj.dataHp, function (i, item) {
                        if (item.Stcd == that.show_stcd) {
                            isExist = true;
                            item.Z = item.Z == "0" ? "" : item.Z;
                            item.Otq = item.Otq == "0" ? "" : item.Otq;
                            item.MaxZ = item.MaxZ == "0" ? "" : item.MaxZ;
                            item.Cxx = item.Cxx == "0" ? "" : item.Cxx;
                            item.Yblsl = item.Yblsl == "0" ? "" : item.Yblsl;
                            item.Xxsw = item.Xxsw == "0" ? "" : item.Xxsw;
                            item.Sjsw = item.Sjsw == "0" ? "" : item.Sjsw;
                            item.Sjw = item.Sjw == "0" ? "" : item.Sjw;
                            item.Jhsw = item.Jhsw == "0" ? "" : item.Jhsw;
                            item.W = item.W == "0" ? "" : item.W;
                            item.Lszg = item.Lszg == "0" ? "" : item.Lszg;
                            $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Z + "</td><td>" + item.Otq + "</td><td>" + item.MaxZ + "</td><td>" + item.Cxx + "</td><td>" + item.Yblsl + "</td><td>" + item.Xxsw + "</td><td>" + item.Sjsw + "</td><td>" + item.Sjw + "</td><td>" + item.Jhsw + "</td><td>" + item.W + "</td><td>" + item.Lszg + "</td></tr>");
                            return false;
                        }
                    });
                    if (!isExist) {
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    //水库站
                    $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>当前水位</th><th>当前出库流量</th><th>预报最高水位</th><th>超汛限水位</th><th>汛限水位</th><th>设计水位</th><th>校核水位</th><th>全陪高程</th><th>移民高程</th><th>历史最高水位</th></tr>");
                    var isExist = false;
                    $.each(jsonTj.dataSk, function (i, item) {
                        if (item.Stcd == that.show_stcd) {
                            isExist = true;
                            item.Z = item.Z == "0" ? "" : item.Z;
                            item.Otq = item.Otq == "0" ? "" : item.Otq;
                            item.MaxZ = item.MaxZ == "0" ? "" : item.MaxZ;
                            item.Xxsw = item.Xxsw == "0" ? "" : item.Xxsw;
                            item.Sjsw = item.Sjsw == "0" ? "" : item.Sjsw;
                            item.Jhsw = item.Jhsw == "0" ? "" : item.Jhsw;
                            item.Qpgc = item.Qpgc == "0" ? "" : item.Qpgc;
                            item.Ymgc = item.Ymgc == "0" ? "" : item.Ymgc;
                            item.Lszg = item.Lszg == "0" ? "" : item.Lszg;
                            $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Z + "</td><td>" + item.Otq + "</td><td>" + item.MaxZ + "</td><td>" + item.Cxx + "</td><td>" + item.Xxsw + "</td><td>" + item.Sjsw + "</td><td>" + item.Jhsw + "</td><td>" + item.Qpgc + "</td><td>" + item.Ymgc + "</td><td>" + item.Lszg + "</td></tr>");
                            return false;
                        }
                    });
                    if (!isExist) {
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                }
            }
        } catch (e) { }
    },
    /**
     * 生成表格-调度后水情
     **/
    create_table_sqxx_dd: function (json) {
        var that = this;
        //表头 河道：时间、水位、流量、预报水位、预报流量
        //    闸坝：时间、水位、闸下水位、流量、预报水位、预报流量
        //    水库：时间、水位、入库流量、出库流量、预报水位、预报流量
        //先清空数据
        $("#contProLine_AllYb .ybsq-table-header table colgroup col").remove();
        $("#contProLine_AllYb .ybsq-table-header table thead tr").remove();
        $("#contProLine_AllYb .tableSqxx colgroup col").remove();
        $("#contProLine_AllYb .tableSqxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";
        if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 14%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>流量</th><th>预报水位</th><th>预报流量</th><th>调度水位</th><th>调度流量</th></tr>";
        } else if (that.show_sttp == "RR") {
            _html_col += "<col style='width: 14%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_col += "<col style='width: 12%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>入库流量</th><th>出库流量</th><th>预报水位</th><th>预报流量</th><th>调度水位</th><th>调度流量</th></tr>";
        }
        $("#contProLine_AllYb .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine_AllYb .tableSqxx colgroup").append(_html_col);
        $("#contProLine_AllYb .ybsq-table-header table thead").append(_html_th);

        //解析数据
        var _html_body = "";
        $.each(json.data, function (index, item) {
            var font_Z_start = "";
            var font_Z_end = "";
            var font_Zs_start = "";
            var font_Zs_end = "";
            var font_Zdd_start = "";
            var font_Zdd_end = "";
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                var temp_z = Number(item.Z);
                if (temp_z >= that.obj_fcch_gcx.bzsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= that.obj_fcch_gcx.bzsw) {
                    font_Zs_start = "<font color='Red'>";
                    font_Zs_end = "</font>";
                } else if (temp_Zs >= that.obj_fcch_gcx.jjsw) {
                    font_Zs_start = "<font color='Blue'>";
                    font_Zs_end = "</font>";
                }
                var temp_Zdd = Number(item.Zdd);
                if (temp_Zdd >= that.obj_fcch_gcx.bzsw) {
                    font_Zdd_start = "<font color='Red'>";
                    font_Zdd_end = "</font>";
                } else if (temp_Zdd >= that.obj_fcch_gcx.jjsw) {
                    font_Zdd_start = "<font color='Blue'>";
                    font_Zdd_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><td>" + font_Zs_start + item.Zs + font_Zs_end + "</td><td>" + item.Qs + "</td><td>" + font_Zdd_start + item.Zdd + font_Zdd_end + "</td><td>" + item.Qdd + "</td></tr>";
            } else if (that.show_sttp == "RR") {
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : item.Z) + "</td><td>" + item.Q + "</td><td>" + item.Qs + "</td> <td>" + item.Zs + "</td><td>" + item.Qin + "</td><td>" + item.Zdd + "</td><td>" + item.Qdd + "</td></tr>";
            }
        });
        $("#contProLine_AllYb .tableSqxx tbody").append(_html_body);

        //生成该站统计信息
        try {
            $("#contProLine_AllYb .table_ybtj thead tr").remove();
            $("#contProLine_AllYb .table_ybtj tbody tr").remove();
            var jsonTj = JSON.parse(that.ddTj_Data);
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>洪峰水位</th><th>洪峰水位时间</th><th>洪峰流量</th><th>警戒水位</th><th>保证水位</th><th>保证流量</th></tr>");
                var isExist = false;
                $.each(jsonTj.dataHd, function (i, item) {
                    if (item.Stcd == that.show_stcd) {
                        isExist = true;
                        item.Hfsw = item.Hfsw == "0" ? "" : item.Hfsw;
                        item.Hwtm = item.Hwtm == "" ? "" : moment(item.Hwtm).format("YYYY-MM-DD HH:mm");
                        item.Hfll = item.Hfll == "0" ? "" : item.Hfll;
                        item.Jjsw = item.Jjsw == "0" ? "" : item.Jjsw;
                        item.Bzsw = item.Bzsw == "0" ? "" : item.Bzsw;
                        item.Bzll = item.Bzll == "0" ? "" : item.Bzll;
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Hfsw + "</td><td>" + item.Hwtm + "</td><td>" + item.Hfll + "</td><td>" + item.Jjsw + "</td><td>" + item.Bzsw + "</td><td>" + item.Bzll + "</td></tr>");
                        return false;
                    }
                });
                if (!isExist) {
                    $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                }
            } else {
                //湖泊站
                if (that.show_stcd == "51201601" || that.show_stcd == "51203401" || that.show_stcd == "50916500" || that.show_stcd == "51107801" || that.show_stcd == "51003650" || that.show_stcd == "51003800") {
                    $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>当前水位</th><th>现状下泄流量</th><th>预报最高水位</th><th>超汛限水位</th><th>预报总来水量</th><th>汛限水位</th><th>设计洪水位</th><th>设计库容</th><th>校核洪水位</th><th>总库容</th><th>历史最高水位</th></tr>");
                    var isExist = false;
                    $.each(jsonTj.dataHp, function (i, item) {
                        if (item.Stcd == that.show_stcd) {
                            isExist = true;
                            item.Z = item.Z == "0" ? "" : item.Z;
                            item.Otq = item.Otq == "0" ? "" : item.Otq;
                            item.MaxZ = item.MaxZ == "0" ? "" : item.MaxZ;
                            item.Cxx = item.Cxx == "0" ? "" : item.Cxx;
                            item.Yblsl = item.Yblsl == "0" ? "" : item.Yblsl;
                            item.Xxsw = item.Xxsw == "0" ? "" : item.Xxsw;
                            item.Sjsw = item.Sjsw == "0" ? "" : item.Sjsw;
                            item.Sjw = item.Sjw == "0" ? "" : item.Sjw;
                            item.Jhsw = item.Jhsw == "0" ? "" : item.Jhsw;
                            item.W = item.W == "0" ? "" : item.W;
                            item.Lszg = item.Lszg == "0" ? "" : item.Lszg;
                            $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Z + "</td><td>" + item.Otq + "</td><td>" + item.MaxZ + "</td><td>" + item.Cxx + "</td><td>" + item.Yblsl + "</td><td>" + item.Xxsw + "</td><td>" + item.Sjsw + "</td><td>" + item.Sjw + "</td><td>" + item.Jhsw + "</td><td>" + item.W + "</td><td>" + item.Lszg + "</td></tr>");
                            return false;
                        }
                    });
                    if (!isExist) {
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                } else {
                    //水库站
                    $("#contProLine_AllYb .table_ybtj thead").append("<tr><th>站名</th><th>当前水位</th><th>当前出库流量</th><th>预报最高水位</th><th>超汛限水位</th><th>汛限水位</th><th>设计水位</th><th>校核水位</th><th>全陪高程</th><th>移民高程</th><th>历史最高水位</th></tr>");
                    var isExist = false;
                    $.each(jsonTj.dataSk, function (i, item) {
                        if (item.Stcd == that.show_stcd) {
                            isExist = true;
                            item.Z = item.Z == "0" ? "" : item.Z;
                            item.Otq = item.Otq == "0" ? "" : item.Otq;
                            item.MaxZ = item.MaxZ == "0" ? "" : item.MaxZ;
                            item.Xxsw = item.Xxsw == "0" ? "" : item.Xxsw;
                            item.Sjsw = item.Sjsw == "0" ? "" : item.Sjsw;
                            item.Jhsw = item.Jhsw == "0" ? "" : item.Jhsw;
                            item.Qpgc = item.Qpgc == "0" ? "" : item.Qpgc;
                            item.Ymgc = item.Ymgc == "0" ? "" : item.Ymgc;
                            item.Lszg = item.Lszg == "0" ? "" : item.Lszg;
                            $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>" + item.Stnm + "</td><td>" + item.Z + "</td><td>" + item.Otq + "</td><td>" + item.MaxZ + "</td><td>" + item.Cxx + "</td><td>" + item.Xxsw + "</td><td>" + item.Sjsw + "</td><td>" + item.Jhsw + "</td><td>" + item.Qpgc + "</td><td>" + item.Ymgc + "</td><td>" + item.Lszg + "</td></tr>");
                            return false;
                        }
                    });
                    if (!isExist) {
                        $("#contProLine_AllYb .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    }
                }
            }
        } catch (e) { }
    },
    /**
     * 生成表格-历史极值
     **/
    create_table_lsjz: function () {
        var that = this;
        //先清空表格
        $("#contRankList .spanRank").html("");
        $("#contRankList .tableSwMax tbody tr").remove();
        $("#contRankList .tableSwMin tbody tr").remove();
        $("#contRankList .tableLlMax tbody tr").remove();
        $("#contRankList .tableLlMin tbody tr").remove();

        //获取数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: that.ApiUrlPath + "/getLsjz",
            data: "{'stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','time':'" + searchEtime + "'}",
            success: function (data) {
                var res = data.d;
                if (res == null || res.length == 0) {
                    tools.show_message_error("获取历史极值信息失败!");
                    return;
                }

                //解析数据   时间,水位,流量*水位极大排名,水位极小排名,流量极大排名,流量极小排名*水位极大数据*水位极小数据*流量极大数据*流量极小数据
                var arrData = res.split("*");
                var _sw = tools.format_sw(arrData[0].split(",")[1]);
                var _ll = tools.format_ll(arrData[0].split(",")[2]);
                var arrRank = arrData[1].split(",");
                if (arrRank == null || arrRank.length < 4) {
                    arrRank = new Array(0, 0, 0, 0);
                }
                that.str_max_rank = "当前水位" + _sw + "m 极大排名" + arrRank[0] + " 当前流量" + _ll + "m³/s 极大排名" + arrRank[2];
                that.str_min_rank = "当前水位" + _sw + "m 极小排名" + arrRank[1] + " 当前流量" + _ll + "m³/s 极小排名" + arrRank[3];
                $("#contRankList .spanRank").html(that.str_max_rank);

                //生成表格
                that.create_table_lsjz_detail("tableSwMax", arrData[2], arrRank[0]);
                that.create_table_lsjz_detail("tableSwMin", arrData[3], arrRank[1]);
                that.create_table_lsjz_detail("tableLlMax", arrData[4], arrRank[2]);
                that.create_table_lsjz_detail("tableLlMin", arrData[5], arrRank[3]);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取历史极值信息失败!");
            }
        });
    },
    /**
     * 生成表格-历史极值-具体实现
     **/
    create_table_lsjz_detail: function (tableId, data, redIndex) {
        var that = this;
        if (data == null || data.length == 0)
            return;

        var arr = data.split("|");
        var len = arr.length;
        var _html = new StringBuffer();
        for (var i = 0; i < len; i++) {
            if (arr[i].length == 0)
                continue;
            var child = arr[i].split(",");
            if (Number(child[0]) == Number(redIndex)) {
                _html.append("<tr class='red'><td>" + child[0] + "</td><td>" + child[1] + "</td><td>" + child[2] + "</td><td>" + child[3] + "</td></tr>");
            } else {
                _html.append("<tr><td>" + child[0] + "</td><td>" + child[1] + "</td><td>" + child[2] + "</td><td>" + child[3] + "</td></tr>");
            }
        }
        $("#contRankList ." + tableId + " tbody").append(_html.toString());
    },

    /**
     *断面点击
     **/
    add_click_dm: function () {
        var that = this;
        that.chartDm.off("legendselectchanged");
        that.chartDm.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartDm.getOption(), state, params.name);
                that.chartDm.setOption(option, true);
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
     * 过程线图例点击事件(实况)
     **/
    add_click_gcx_real: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartGcx.getOption(), state, params.name);
                that.chartGcx.setOption(option, true);
            }


            if (that.show_sttp == "RR") {
                if (params.name == "汛限水位" || params.name == "正常蓄水位" || params.name == "设计水位" || params.name == "校核水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            } else {
                if (params.name == "警戒水位" || params.name == "保证水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            }
        });

    },

    /**
     * 过程线图例点击事件(预报)
     **/
    add_click_gcx_for: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {

            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartGcx.getOption(), state, params.name);
                that.chartGcx.setOption(option, true);
            }

            if ((params.name == "预报入库流量") || (params.name == "预报流量")) {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];
                    that.setActiveGraphicState(2, !state);

                }
            }
            if (params.name == "预报水位") {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];
                    that.setActiveGraphicState(1, !state);
                }
            }
            if (that.show_sttp == "RR") {
                if (params.name == "汛限水位" || params.name == "正常蓄水位" || params.name == "设计水位" || params.name == "校核水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            } else {
                if (params.name == "警戒水位" || params.name == "保证水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            }
        });
    },

    /**
     * 过程线图例点击事件(调度)
     **/
    add_click_gcx_dd: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartGcx.getOption(), state, params.name);
                that.chartGcx.setOption(option, true);
            }
            if (that.show_sttp == "RR") {
                if (params.name == "汛限水位" || params.name == "正常蓄水位" || params.name == "设计水位" || params.name == "校核水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            } else {
                if (params.name == "警戒水位" || params.name == "保证水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig_allYb.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig_allYb.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig_allYb.MIN_NUM)) {
                        arrSw = [1, 0];
                    } else {
                        arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    }
                    that.chartGcx.setOption({
                        yAxis: [{
                            min: arrSw[1] < 0 ? 0 : arrSw[1],
                            max: arrSw[0]
                        }]
                    });
                }
            }
        });
    },

    /**
     * 实时获取水位最大/小值-水位过程线用
     **/
    get_axis_sw_max_min_gcx: function () {
        var that = this;
        var axis_sw_min_temp = panelConfig_allYb.MAX_NUM;
        var axis_sw_max_temp = panelConfig_allYb.MIN_NUM;
        var axis_sw_min = panelConfig_allYb.MAX_NUM;
        var axis_sw_max = panelConfig_allYb.MIN_NUM;

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
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_allYb.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_allYb.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_allYb.MAX_NUM) {
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
        var axis_sw_min = panelConfig_allYb.MAX_NUM;
        var axis_sw_max = panelConfig_allYb.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_allYb.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig_allYb.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig_allYb.MAX_NUM) {
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
        var axis_ll_min = panelConfig_allYb.MAX_NUM;
        var axis_ll_max = panelConfig_allYb.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_allYb.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_allYb.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_allYb.MAX_NUM) {
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
        var axis_ll_min_temp = panelConfig_allYb.MAX_NUM;
        var axis_ll_max_temp = panelConfig_allYb.MIN_NUM;
        var axis_ll_min = panelConfig_allYb.MAX_NUM;
        var axis_ll_max = panelConfig_allYb.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_allYb.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig_allYb.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig_allYb.MAX_NUM) {
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
     * 日雨量柱状图参数
     **/
    get_option_ryl: function (axis_rain_max, axis_rain_max_sum, intervalX) {
        var that = this;
        var option = {
            grid: {
                left: 8,
                top: 28,
                right: 8,
                bottom: 8,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                    show: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '  时雨量(mm)',
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
                        color: panelConfig_allYb.ECHART_COLOR_RAIN
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                name: '累计雨量(mm)  ',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 20, 0, 0]
                },
                position: 'right',
                min: 0,
                max: axis_rain_max_sum,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_RAIN_SUM
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            tooltip: {
                trigger: "item",
                formatter: function (ob) {
                    return moment(ob.value[0].replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日hh时") + "</br>" + ob.seriesName + "：" + ob.value[1] + "mm";
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 10);
                }
            },
            series: [{
                name: '时雨量',
                type: 'bar',
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: "top",
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_OUT,
                    fontSize: 10,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value[1]) == 0) {
                            return "";
                        } else {
                            return ob.value[1];
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_allYb.ECHART_COLOR_SHADOW,
                    shadowBlur: 5
                },
                barWidth: "95%",
                data: that.arr_ryl_data
            }, {
                name: '累计雨量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_SUM
                },
                data: that.arr_ryl_sum
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 时段雨量柱状图参数
     **/
    get_option_sdyl: function (axis_rain_max, axis_rain_max_sum, intervalX) {
        var that = this;
        var option = {
            grid: {
                left: 20,
                top: 28,
                right: 12,
                bottom: 10,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
                    }
                },
                interval: intervalX,
                maxInterval: intervalX,
                minInterval: intervalX,
                axisLabel: {
                    color: "#000000",
                    formatter: function (value, index) {
                        return moment(value).format("HH时");
                    }
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '  时段雨量(mm)',
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
                        color: panelConfig_allYb.ECHART_COLOR_RAIN
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                name: '累计雨量(mm)  ',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 20, 0, 0]
                },
                position: 'right',
                min: 0,
                max: axis_rain_max_sum,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_RAIN_SUM
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            tooltip: {
                trigger: "item",
                formatter: function (ob) {
                    return moment(ob.value[0]).format("YYYY年MM月DD日HH时") + "</br>" + ob.seriesName + "：" + ob.value[1];
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 10);
                }
            },
            series: [{
                name: '时段雨量',
                type: 'bar',
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: "top",
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_OUT,
                    fontSize: 10,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value[1]) == 0) {
                            return "";
                        } else {
                            return ob.value[1];
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_allYb.ECHART_COLOR_SHADOW,
                    shadowBlur: 5
                },
                barWidth: "95%",
                data: that.arr_sdyl_data
            }, {
                name: '累计雨量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_SUM
                },
                data: that.arr_sdyl_sum
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-河道(实况)
     **/
    get_option_gcx_zz_real: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            legend: {
                show: true,
                itemWidth: 20,
                itemHeight: 8,
                data: ["水位", "流量", "警戒水位", "保证水位"],
                selected: {
                    "警戒水位": that.obj_fcch_gcx.showJjsw,
                    "保证水位": that.obj_fcch_gcx.showBzsw
                }
            },
            grid: {
                left: 5,
                top: 25,
                right: 5,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: '警戒水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "警戒水位：" + that.obj_fcch_gcx.jjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "保证水位：" + that.obj_fcch_gcx.bzsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.bzsw
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-闸坝(实况)
     **/
    get_option_gcx_dd_real: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            legend: {
                show: true,
                itemWidth: 20,
                itemHeight: 8,
                data: ["水位", "流量", "警戒水位", "保证水位"],
                selected: {
                    "警戒水位": that.obj_fcch_gcx.showJjsw,
                    "保证水位": that.obj_fcch_gcx.showBzsw
                }
            },
            grid: {
                left: 5,
                top: 25,
                right: 5,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            },
            //     {
            //     name: '闸下水位',
            //     type: 'line',
            //     yAxisIndex: 0,
            //     itemStyle: {
            //         color: panelConfig_allYb.ECHART_COLOR_ZXSW
            //     },
            //     showSymbol: false,
            //     data: that.obj_data_gcx.sw_zx
            // },
            {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: '警戒水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "警戒水位：" + that.obj_fcch_gcx.jjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "保证水位：" + that.obj_fcch_gcx.bzsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.bzsw
            }
            ],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-水库（实况）
     **/
    get_option_gcx_rr_real: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            legend: {
                //   inactiveColor:"#FF0000",
                show: true,
                itemWidth: 20,
                itemHeight: 8,
                data: ["水位", "入库流量", "出库流量", that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM ? "汛限水位" : "正常蓄水位", "设计水位", "校核水位"],
                selected: {
                    "汛限水位": that.obj_fcch_gcx.showXxsw,
                    "正常蓄水位": that.obj_fcch_gcx.showZcsw,
                    "设计水位": false,
                    "校核水位": false
                }
            },
            grid: {
                left: 5,
                top: 25,
                right: 5,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll_in
            }, {
                name: '出库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM ? "汛限水位" : "正常蓄水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM ? "汛限水位：" + that.obj_fcch_gcx.xxsw : "正常蓄水位：" + that.obj_fcch_gcx.zcsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_fcch_gcx.xxsw > panelConfig_allYb.MIN_NUM ? that.obj_data_gcx.xxsw : that.obj_data_gcx.zcsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "设计水位：" + that.obj_fcch_gcx.sjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.sjsw
            }, {
                name: '校核水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [210, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JHSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "校核水位：" + that.obj_fcch_gcx.jhsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jhsw
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-河道(预报)
     **/
    get_option_gcx_zz_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + "水位流量过程线",
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
                data: ["雨量", "水位", "流量", "预报水位", "预报流量", "警戒水位", "保证水位"],
                selected: {
                    "雨量": false,
                    "水位": false,
                    "预报水位": false,
                    "警戒水位": that.obj_fcch_gcx.showJjsw,
                    "保证水位": that.obj_fcch_gcx.showBzsw
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
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
                    }
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig_allYb.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_RAIN
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
                name: '雨量',
                type: 'bar',
                yAxisIndex: 2,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_allYb.ECHART_COLOR_SHADOW,
                    shadowBlur: 2
                },
                //barWidth: "95%",
                barMaxWidth: 13,
                data: that.obj_data_gcx.rain
            }, {
                name: '水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                id: 'id_series_ybsw',
                name: '预报水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.ybsw
            }, {
                id: 'id_series_ybll',
                name: '预报流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ybll
            }, {
                name: '警戒水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "警戒水位：" + that.obj_fcch_gcx.jjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "保证水位：" + that.obj_fcch_gcx.bzsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.bzsw
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-闸坝(预报)
     **/
    get_option_gcx_dd_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + "水位流量过程线",
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
                data: ["雨量", "闸上水位", /*"闸下水位",*/ "流量", "预报水位", "预报流量", "警戒水位", "保证水位"],
                selected: {
                    "雨量": false,
                    "闸上水位": false,
                    /* "闸下水位": false,*/
                    "预报水位": false,
                    "警戒水位": that.obj_fcch_gcx.showJjsw,
                    "保证水位": that.obj_fcch_gcx.showBzsw
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
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
                    }
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig_allYb.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_RAIN
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
                name: '雨量',
                type: 'bar',
                yAxisIndex: 2,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_allYb.ECHART_COLOR_SHADOW,
                    shadowBlur: 2
                },
                //barWidth: "95%",
                barMaxWidth: 13,
                data: that.obj_data_gcx.rain
            }, {
                name: '闸上水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            },
            /* {
                            name: '闸下水位',
                            type: 'line',
                            yAxisIndex: 0,
                            symbol: "circle",
                            z: 5,
                            itemStyle: {
                                color: panelConfig_allYb.ECHART_COLOR_ZXSW
                            },
                            showSymbol: false,
                            data: that.obj_data_gcx.sw_zx
                        },*/
            {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {

                id: 'id_series_ybsw',
                name: '预报水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.ybsw
            }, {
                id: 'id_series_ybll',
                name: '预报流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ybll
            }, {
                name: '警戒水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "警戒水位：" + that.obj_fcch_gcx.jjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "保证水位：" + that.obj_fcch_gcx.bzsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.bzsw
            }
            ],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },

    onSWPointDragging: function (dataIndex, that, max_sw_time, dx, dy) {
        if ((moment(that.obj_data_gcx.ybsw[dataIndex].value[0]).isBefore(moment(max_sw_time))) || (moment(that.obj_data_gcx.ybsw[dataIndex].value[0]).isSame(moment(max_sw_time)))) {
            //   alert(max_sw_time);
            return;
        }
        var newpos = that.chartGcx.convertFromPixel({
            xAxisIndex: 0,
            yAxisIndex: 0
        }, this.position);
        y = newpos[1].toFixed(2);
        that.obj_data_gcx.ybsw[dataIndex].value[1] = y;
        that.obj_data_gcx_y_value.ybsw[dataIndex] = y;
        that.chartGcx.setOption({
            series: [{
                id: 'id_series_ybsw',
                data: that.obj_data_gcx.ybsw
            }]
        });



        that.update_ybsw_option();
        that.reflashDragPoint(1);



    },
    onSWPointDragend: function (dataIndex, that, dx, dy) {
        var _index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex.ybsw);
        if (_index < 0) {
            that.obj_data_gcx_y_modifyIndex.ybsw.push(dataIndex);
        }
        var all_index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex_all);
        if (all_index < 0) {
            that.obj_data_gcx_y_modifyIndex_all.push(dataIndex);
        }

        var y = that.obj_data_gcx.ybsw[dataIndex].value[1];
        $("#contProLine_AllYb .tableSqxx tbody").find("tr").each(function () {

            var tdArr = $(this).children();
            var ybsw_tm = tdArr.eq(0).html();
            var tm = that.obj_data_gcx.ybsw[dataIndex].value[0].split('.')[0];
            //  var o_tm = tm.substring(0, tm.length - 3);
            //   o_tm = o_tm.substring(5);
            var o_tm = moment(tm).format("MM-DD HH:mm")
            if (ybsw_tm == o_tm) {
                if (that.show_sttp == "ZZ") {
                    tdArr.eq(3).find('input').val(y);
                    if (y >= that.obj_fcch_gcx.bzsw) {
                        tdArr.eq(3).find('input').css("color", "red");
                    } else if (y >= that.obj_fcch_gcx.jjsw) {
                        tdArr.eq(3).find('input').css("color", "blue");
                    } else if (y < that.obj_fcch_gcx.jjsw) {
                        tdArr.eq(3).find('input').css("color", "black");
                    }
                } else if (that.show_sttp == "DD") {
                    tdArr.eq(4).find('input').val(y);
                    if (y >= that.obj_fcch_gcx.bzsw) {
                        tdArr.eq(4).find('input').css("color", "red");
                    } else if (y >= that.obj_fcch_gcx.jjsw) {
                        tdArr.eq(4).find('input').css("color", "blue");
                    } else if (y < that.obj_fcch_gcx.jjsw) {
                        tdArr.eq(4).find('input').css("color", "black");
                    }
                } else if (that.show_sttp == "RR") {
                    tdArr.eq(4).find('input').val(y);
                    if (y >= that.obj_fcch_gcx.jhsw || y >= that.obj_fcch_gcx.sjsw) {
                        tdArr.eq(4).find('input').css("color", "red");
                    } else if (y >= that.obj_fcch_gcx.xxsw) {
                        tdArr.eq(4).find('input').css("color", "blue");
                    } else if (y < that.obj_fcch_gcx.xxsw) {
                        tdArr.eq(4).find('input').css("color", "black");
                    }
                }
                return false;
            }


        });

        that.setDragPointShowOrHide(1, dataIndex, true);
        //处理右侧table的数据的更新，思路，获取html内容，直接替换值，反过来，修改了table的值，则修改that.obj_data_gcx.ybsw的值，且更新graphic的position

    },

    onLLPointDragging: function (dataIndex, that, max_ll_time, dx, dy) {
        if (that.show_sttp == "RR") {
            if ((moment(that.obj_data_gcx.ll_in[dataIndex].value[0]).isBefore(moment(max_ll_time))) || (moment(that.obj_data_gcx.ll_in[dataIndex].value[0]).isSame(moment(max_ll_time)))) {

                return;
            }
        } else {
            if ((moment(that.obj_data_gcx.ybll[dataIndex].value[0]).isBefore(moment(max_ll_time))) || (moment(that.obj_data_gcx.ybll[dataIndex].value[0]).isSame(moment(max_ll_time)))) {

                return;
            }
        }

        var newpos = that.chartGcx.convertFromPixel({
            xAxisIndex: 0,
            yAxisIndex: 1
        }, this.position);
        y = newpos[1].toFixed(2);
        if (that.show_sttp == "RR") {
            that.obj_data_gcx.ll_in[dataIndex].value[1] = y;
        } else {
            that.obj_data_gcx.ybll[dataIndex].value[1] = y;
        }

        that.obj_data_gcx_y_value.ll_in[dataIndex] = y;
        that.chartGcx.setOption({
            series: [{
                id: 'id_series_ybll',
                data: that.show_sttp == "RR" ? that.obj_data_gcx.ll_in : that.obj_data_gcx.ybll
            }]
        });



        that.update_ybll_option();
        that.reflashDragPoint(2);


    },
    onLLPointDragend: function (dataIndex, that, dx, dy) {
        var _index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex.ll_in);
        if (_index < 0) {
            that.obj_data_gcx_y_modifyIndex.ll_in.push(dataIndex);
        }
        var all_index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex_all);
        if (all_index < 0) {
            that.obj_data_gcx_y_modifyIndex_all.push(dataIndex);
        }
        if (that.show_sttp == "RR") {
            var y = that.obj_data_gcx.ll_in[dataIndex].value[1];
            $("#contProLine_AllYb .tableSqxx tbody").find("tr").each(function () {

                var tdArr = $(this).children();
                var ybsw_tm = tdArr.eq(0).html();
                var tm = that.obj_data_gcx.ll_in[dataIndex].value[0].split('.')[0];
                //   var o_tm = tm.substring(0, tm.length - 3);
                //  o_tm = o_tm.substring(5);
                var o_tm = moment(tm).format("MM-DD HH:mm")
                if (ybsw_tm == o_tm) {

                    tdArr.eq(5).find('input').val(y);


                    return false;
                }


            });
        } else {
            var y = that.obj_data_gcx.ybll[dataIndex].value[1];
            $("#contProLine_AllYb .tableSqxx tbody").find("tr").each(function () {

                var tdArr = $(this).children();
                var ybsw_tm = tdArr.eq(0).html();
                var tm = that.obj_data_gcx.ybll[dataIndex].value[0].split('.')[0];
                //   var o_tm = tm.substring(0, tm.length - 3);
                //    o_tm = o_tm.substring(5);
                var o_tm = moment(tm).format("MM-DD HH:mm")
                if (ybsw_tm == o_tm) {
                    tdArr.eq(4).find('input').val(y);

                    return false;
                }


            });
        }

        that.setDragPointShowOrHide(2, dataIndex, true);



        //处理右侧table的数据的更新，思路，获取html内容，直接替换值，反过来，修改了table的值，则修改that.obj_data_gcx.ybsw的值，且更新graphic的position

    },
    /**
     * 水位过程线参数-水库(预报)
     **/
    get_option_gcx_rr_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {

            title: {
                text: that.show_stnm + "水位流量过程线",
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
                data: ["雨量", "水位", "入库流量", "出库流量", "预报水位", "预报入库流量", "汛限水位", "设计水位", "校核水位"],
                selected: {
                    "雨量": false,
                    "水位": true,
                    "入库流量": false,
                    "出库流量": false,
                    "预报水位": true,
                    "预报入库流量": false,
                    "汛限水位": that.obj_fcch_gcx.showXxsw,
                    "设计水位": that.obj_fcch_gcx.showSjsw,
                    "校核水位": that.obj_fcch_gcx.showJhsw
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
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
                    }
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig_allYb.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_RAIN
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
                name: '雨量',
                type: 'bar',
                yAxisIndex: 2,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig_allYb.ECHART_COLOR_SHADOW,
                    shadowBlur: 2
                },
                //barWidth: "95%",
                barMaxWidth: 13,
                data: that.obj_data_gcx.rain
            }, {
                name: '水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: '出库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ybll
            }, {
                id: 'id_series_ybsw',
                name: '预报水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.ybsw
            }, {
                id: 'id_series_ybll',
                name: '预报入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ll_in
            }, {
                name: '汛限水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "汛限水位：" + that.obj_fcch_gcx.xxsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.xxsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "设计水位：" + that.obj_fcch_gcx.sjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.sjsw
            }, {
                name: '校核水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [200, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JHSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "校核水位：" + that.obj_fcch_gcx.jhsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jhsw
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-河道(调度后对比)
     **/
    get_option_gcx_zz_dd: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var arr_legend = new Array();
        arr_legend.push("水位");
        arr_legend.push("流量");
        arr_legend.push("预报水位");
        arr_legend.push("预报流量");
        arr_legend.push("调度计算水位");
        arr_legend.push("调度计算流量");
        arr_legend.push("警戒水位");
        arr_legend.push("保证水位");
        $.each(that.obj_data_gcx.upZBName, function (index, item) {
            arr_legend.push(item);

        });
        var arr_series = new Array();
        arr_series.push({
            name: '水位',
            type: 'line',
            yAxisIndex: 0,
            symbol: "circle",
            z: 5,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_SW
            },
            showSymbol: false,
            data: that.obj_data_gcx.sssw
        });
        arr_series.push({
            name: '流量',
            type: 'line',
            yAxisIndex: 1,
            symbol: "circle",
            z: 5,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_LL
            },
            showSymbol: false,
            connectNulls: true, //连接空数据
            smooth: true, //平滑显示曲线
            smoothMonotone: "none",
            data: that.obj_data_gcx.ssll
        });
        arr_series.push({
            name: '预报水位',
            type: 'line',
            yAxisIndex: 0,
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_SW
            },
            lineStyle: {
                type: "dashed"
            },
            data: that.obj_data_gcx.ybsw
        });
        arr_series.push({
            name: '预报流量',
            type: 'line',
            yAxisIndex: 1,
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_LL
            },
            lineStyle: {
                type: "dashed",
            },
            data: that.obj_data_gcx.ybll
        });
        arr_series.push({
            name: '调度计算水位',
            type: 'line',
            yAxisIndex: 0,
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_DDSW
            },
            lineStyle: {
                type: "dashed"
            },
            data: that.obj_data_gcx.ddsw
        });
        arr_series.push({
            name: '调度计算流量',
            type: 'line',
            yAxisIndex: 1,
            symbol: "image://Images/empty.png",
            symbolSize: 1,
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_DDLL
            },
            lineStyle: {
                type: "dashed",
            },
            data: that.obj_data_gcx.ddll
        });
        arr_series.push({
            name: '警戒水位',
            type: 'line',
            yAxisIndex: 0,
            symbol: "circle",
            showSymbol: false,
            z: 5,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_JJSW
            },
            markPoint: {
                symbolSize: 1, //设置为0时 不显示标志
                symbolOffset: [60, 0], //偏移值X Y
                label: {
                    backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                    padding: [5, 10, 5, 10],
                    formatter: function (ob) {
                        if (ob.dataIndex == 0) {
                            return "警戒水位：" + that.obj_fcch_gcx.jjsw;
                        } else {
                            return "";
                        }
                    }
                },
                data: [{
                    name: '显示值',
                    type: 'min'
                }]
            },
            data: that.obj_data_gcx.jjsw
        });
        arr_series.push({
            name: '保证水位',
            type: 'line',
            yAxisIndex: 0,
            symbol: "circle",
            showSymbol: false,
            z: 5,
            itemStyle: {
                color: panelConfig_allYb.ECHART_COLOR_BZSW
            },
            markPoint: {
                symbolSize: 1, //设置为0时 不显示标志
                symbolOffset: [140, 0], //偏移值X Y
                label: {
                    backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                    padding: [5, 10, 5, 10],
                    formatter: function (ob) {
                        if (ob.dataIndex == 0) {
                            return "保证水位：" + that.obj_fcch_gcx.bzsw;
                        } else {
                            return "";
                        }
                    }
                },
                data: [{
                    name: '显示值',
                    type: 'min'
                }]
            },
            data: that.obj_data_gcx.bzsw
        });

        $.each(that.obj_data_gcx.upZBName, function (index, item) {
            arr_series.push({
                name: item,
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.upZBData[index]
            });

        });


        var option = {
            title: {
                text: that.show_stnm + "水位流量过程线",
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
                /*  selected: {
                      "预报水位": false,
                      "预报流量": false,
                      "警戒水位": false,//that.obj_fcch_gcx.showJjsw,
                      "保证水位": false//that.obj_fcch_gcx.showBzsw
                  }*/
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
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                        that.sl_time = ob[0].value[0];
                        return tools.format_tooltip_chart(ob);
                    } else {
                        return "";
                    }
                }
            },
            series: arr_series,
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        var selected_item = {};
        for (i = 0; i < arr_legend.length; i++) {
            var key_name = arr_legend[i];
            if ((i == 0) || (i == 1) || (i == 4) || (i == 5)) {
                selected_item[key_name] = true;
            } else {
                selected_item[key_name] = false;
            }
        };
        option.legend.selected = selected_item;
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-水库(调度后对比)
     **/
    get_option_gcx_rr_dd: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            title: {
                text: that.show_stnm + "水位流量过程线",
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
                data: ["水位", "入库流量", "出库流量", "预报水位", "预报入库流量", "调度计算水位", "调度计算出库流量", "汛限水位", "设计水位", "校核水位"],
                selected: {
                    "预报水位": false,
                    "预报入库流量": false,
                    "汛限水位": false, //that.obj_fcch_gcx.showXxsw
                    "设计水位": false, //that.obj_fcch_gcx.showSjsw
                    "校核水位": false //that.obj_fcch_gcx.showJhsw
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
                        color: panelConfig_allYb.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_SW
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                        color: panelConfig_allYb.ECHART_COLOR_LL
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
                z: 5, //实际水位流量显示在最上面
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL_DNTQ
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ll_in
            }, {
                name: '出库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: '预报水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.ybsw
            }, {
                name: '预报入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ll_in
            }, {
                name: '调度计算水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DDSW
                },
                lineStyle: {
                    type: "dashed"
                },
                data: that.obj_data_gcx.ddsw
            }, {
                name: '调度计算出库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "image://Images/empty.png",
                symbolSize: 1,
                showSymbol: false,
                hoverAnimation: false,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DDLL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ddll
            }, {
                name: '汛限水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "汛限水位：" + that.obj_fcch_gcx.xxsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.xxsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "设计水位：" + that.obj_fcch_gcx.sjsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.sjsw
            }, {
                name: '校核水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [200, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JHSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return "校核水位：" + that.obj_fcch_gcx.jhsw;
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_gcx.jhsw
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
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
                        color: [panelConfig_allYb.ECHART_COLOR_GRID]
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
                axisLine: {
                    onZero: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '左岸',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 5]
                },
                min: that.obj_minMax_dmxx.gc.min < 0 ? 0 : that.obj_minMax_dmxx.gc.min,
                max: that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_minMax_dmxx.gc.max - that.obj_minMax_dmxx.gc.min) : that.obj_minMax_dmxx.gc.max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_sw(that.obj_minMax_dmxx.gc.min < 0 ? Number(value) + that.obj_minMax_dmxx.gc.min : value);
                    }
                }
            }],
            series: [{
                name: '实时水位',
                type: 'line',
                showSymbol: false,
                symbolSize: 0,
                symbol: "circle",
                hoverAnimation: false,
                z: 1,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [20, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SW,
                        padding: [2, 10, 3, 10],
                        lineHeight: 16,
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.sw != "" ? ("实时水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.sw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.sw) + "\n时间：" + that.obj_fcch_dmxx.sw_time) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        yAxis: that.obj_fcch_dmxx.sw,
                        x: that.obj_fcch_dmxx.sw_position + "%"
                    }]
                },

                data: that.obj_data_dmxx.sw
            }, {
                name: '警戒水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [100, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.jjsw != "" ? ("警戒水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.jjsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.jjsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [220, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.bzsw != "" ? ("保证水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.bzsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.bzsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.bzsw
            }, {
                name: '断面信息',
                type: 'line',
                showSymbol: false,
                smooth: true,
                smoothMonotone: "none",
                symbol: "circle",
                z: 4,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        }
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 断面信息参数-闸坝
     **/
    get_option_dmxx_dd: function (axis_x_min, axis_x_max) {
        var that = this;
        var option = {
            legend: {
                show: true,
                top: 5,
                data: ["闸上水位", "闸下水位", "警戒水位", "保证水位"]
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
                axisLine: {
                    onZero: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '左岸',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 5]
                },
                min: that.obj_minMax_dmxx.gc.min < 0 ? 0 : that.obj_minMax_dmxx.gc.min,
                max: that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_minMax_dmxx.gc.max - that.obj_minMax_dmxx.gc.min) : that.obj_minMax_dmxx.gc.max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_sw(that.obj_minMax_dmxx.gc.min < 0 ? Number(value) + that.obj_minMax_dmxx.gc.min : value);
                    }
                }
            }],
            series: [{
                name: '闸下水位',
                type: 'line',
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                symbol: "circle",
                z: 1,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_ZXSW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_ZXSW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [90, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_ZXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.sw_zx != "" ? ("闸下水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.sw_zx + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.sw_zx)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        yAxis: that.obj_fcch_dmxx.sw_zx,
                        x: that.obj_fcch_dmxx.sw_position + "%"
                    }]
                },
                data: that.obj_data_dmxx.sw_zx
            }, {
                name: '闸上水位',
                type: 'line',
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                symbol: "circle",
                z: 1,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [0, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.sw != "" ? ("闸上水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.sw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.sw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        yAxis: that.obj_fcch_dmxx.sw,
                        x: that.obj_fcch_dmxx.sw_position + "%"
                    }]
                },

                data: that.obj_data_dmxx.sw
            }, {
                name: '警戒水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [100, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_JJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.jjsw != "" ? ("警戒水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.jjsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.jjsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.jjsw
            }, {
                name: '保证水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [220, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_BZSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.bzsw != "" ? ("保证水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.bzsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.bzsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.bzsw
            }, {
                name: '断面信息',
                type: 'line',
                showSymbol: false,
                smooth: true,
                smoothMonotone: "none",
                symbol: "circle",
                z: 4,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        }
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 断面信息参数-水库
     **/
    get_option_dmxx_rr: function (axis_x_min, axis_x_max) {
        var that = this;
        var min_y = 0;
        if (that.show_sttp == "RR") {
            var xx_cz = 10;
            min_y = that.obj_fcch_dmxx.ssw - xx_cz < 0 ? 0 : that.obj_fcch_dmxx.ssw - xx_cz;
            if (min_y >= that.obj_fcch_dmxx.sw) {
                min_y = that.obj_fcch_dmxx.sw - xx_cz;
                if (min_y < 0) {
                    min_y = 0;
                }

            }
        }

        var option = {
            legend: {
                show: true,
                top: 5,
                data: ["实时水位", "汛限水位", "设计水位", "兴利水位"]
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
                axisLine: {
                    onZero: false
                }
            },
            yAxis: [{
                type: 'value',
                name: '左岸',
                nameGap: 10,
                nameTextStyle: {
                    padding: [0, 0, 0, 5]
                },
                min: that.show_sttp == "RR" ? (min_y) : (that.obj_minMax_dmxx.gc.min < 0 ? 0 : that.obj_minMax_dmxx.gc.min),
                max: that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_minMax_dmxx.gc.max - that.obj_minMax_dmxx.gc.min) : that.obj_minMax_dmxx.gc.max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig_allYb.ECHART_COLOR_SW
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return tools.format_sw(that.obj_minMax_dmxx.gc.min < 0 ? Number(value) + that.obj_minMax_dmxx.gc.min : value);
                    }
                }
            }],
            series: [{
                name: '实时水位',
                type: 'line',
                showSymbol: false,
                symbolSize: 0,
                hoverAnimation: false,
                symbol: "circle",
                z: 1,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [40, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.sw != "" ? ("实时水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.sw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.sw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        yAxis: that.obj_fcch_dmxx.sw,
                        x: that.obj_fcch_dmxx.sw_position + "%"
                    }]
                },

                data: that.obj_data_dmxx.sw
            }, {
                name: '兴利水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.ssw != "" ? ("兴利水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.ssw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.ssw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.ssw
            }, {
                name: '汛限水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [180, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.xxsw != "" ? ("汛限水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.xxsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.xxsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.xxsw
            }, {
                name: '设计水位',
                type: 'line',
                showSymbol: false,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [300, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig_allYb.ECHART_COLOR_SJSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_dmxx.sjsw != "" ? ("设计水位：" + (that.obj_minMax_dmxx.gc.min < 0 ? (that.obj_fcch_dmxx.sjsw + that.obj_minMax_dmxx.gc.min).toFixed(2) : that.obj_fcch_dmxx.sjsw)) : "";
                            } else {
                                return "";
                            }
                        }
                    },
                    data: [{
                        name: '显示值',
                        type: 'min'
                    }]
                },
                data: that.obj_data_dmxx.sjsw
            }, {
                name: '断面信息',
                type: 'line',
                showSymbol: false,
                smooth: true,
                smoothMonotone: "none",
                symbol: "circle",
                z: 4,
                lineStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig_allYb.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig_allYb.ECHART_COLOR_BACKGROUND
        }
        option = tools.initChartlegendIcon(option);
        return option;
    },

    /**
     * 获取断面实时水位显示位置 百分比
     **/
    get_dmxx_position: function (arr, sw) {
        if (arr == null || arr.length == 0)
            return "50";

        var _sw = Number(sw);
        var arrDm = new Array();
        //循环断面数据 获取水位比断面高的数据段
        var len = arr.length;
        var index = -1; //分段索引
        var isFirst = true; //是否首个数据
        for (var i = 0; i < len; i++) {
            if (Number(arr[i].value[1]) < _sw) {
                if (isFirst) {
                    index++;
                    arrDm.push({
                        begin: Number(arr[i].value[0]),
                        end: Number(arr[i].value[0])
                    });
                    isFirst = false;
                } else {
                    arrDm[index].end = Number(arr[i].value[0]);
                }
            } else {
                isFirst = true;
            }
        }

        //取分段跨度较大的一段处理
        var _index = -1;
        var _interval = 0;
        for (var i = 0; i < arrDm.length; i++) {
            if (_interval < (arrDm[i].end - arrDm[i].begin)) {
                _interval = arrDm[i].end - arrDm[i].begin;
                _index = i;
            }
        }

        //获取实时水位显示的位置
        if (_index > -1) {
            //X轴最大最小值
            var axis_x_min = Number(arr[0].value[0]);
            var axis_x_max = Number(arr[arr.length - 1].value[0]);
            var pos = ((arrDm[_index].end - arrDm[_index].begin) / 2 + arrDm[_index].begin - axis_x_min) * 100 / (axis_x_max - axis_x_min);
            return pos.toFixed(0);
        } else {
            return "50";
        }
    },
    /**
     * 更新断面信息中的数据源
     **/
    update_arr_dmxx: function (arr) {
        var that = this;
        if (arr == null || arr.length == 0) {
            return arr;
        }

        var len = arr.length;
        for (var i = 0; i < len; i++) {
            arr[i].value[1] = arr[i].value[1] != "" ? Number(arr[i].value[1]) - that.obj_minMax_dmxx.gc.min : arr[i].value[1];
        }

        return arr;
    },
    /**
     * 从数组中获取最大最小值
     **/
    get_min_max: function (arr) {
        var min = panelConfig_allYb.MAX_NUM;
        var max = panelConfig_allYb.MIN_NUM;
        if (arr == null || arr.length == 0) {
            return {
                min: min,
                max: max
            };
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

        return {
            min: min,
            max: max
        };
    },
    getRadioOptions: function () {
        var s_select_model = $("#modelRadio").find(".selected")[0];
        var select_model = $(s_select_model).attr("value_")
        return select_model;
    }
};
