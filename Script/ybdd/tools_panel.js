/**
 * 面板配置文件
 */
var panelConfig = {
    //面板默认宽度
    panel_default_width: 1400,
    //面板默认高度
    panel_default_height: 550,
    //带预报统计时底部高度
    panel_default_height2: 830,
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
    //ECHART_COLOR_LL_DNTQ: "#0F347B",
    //入库流量
    ECHART_COLOR_RKLL: "#0F347B",
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

    //MGE2流量颜色
    ECHART_COLOR_MGE2LL: "#FF0000",
    //API6流量颜色
    ECHART_COLOR_API6LL: "#FF7F50",
    //API2流量颜色
    ECHART_COLOR_API2LL: "#B03060",
    //XAJ2流量颜色
    ECHART_COLOR_XAJ2LL: "#FF00FF",

    //MGE2流量颜色
    ECHART_COLOR_MGE2SW: "#008B45",
    //API6流量颜色
    ECHART_COLOR_API6SW: "#483D8B",
    //API2流量颜色
    ECHART_COLOR_API2SW: "#2F4F4F",
    //XAJ2流量颜色
    ECHART_COLOR_XAJ2SW: "#20B2AA",

    //////旬月均值颜色
    //旬月均值-当前
    ECHART_COLOR_NOW_XYJZ: "#4646FF",
    //旬月均值-历史
    ECHART_COLOR_HIS_XYJZ: "#FF6600",
    //旬月均值-距平线
    ECHART_COLOR_JP_XYJZ: "#FF3333",
    //旬月均值-距平文本
    ECHART_COLOR_JP_LAB_XYJZ: "#EDFD1A",
    //旬月均值-背景色(上)
    ECHART_COLOT_BG_TOP: "rgba(204,204,254,0.93)",
    //旬月均值-背景色(下)
    ECHART_COLOR_BG_BOTTOM: "rgba(255,204,204,0.93)",
    //网格线颜色
    ECHART_COLOR_GRID_MINOR: "#EEEEEE",
    //指示线颜色
    ECHART_COLOR_CROSS: "#777777"
};

/**
 * Tools_Panel类-用于展示水情面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2019-01-18 HZX新增
 *      2019-03-07 HZX添加关注功能
 *      2019-10-08 CHL添加树状菜单功能 优化界面
 *      2019-10-12 CHL树状菜单功能优化
 */
var Tools_Panel = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Panel.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelSw",
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

    //echarts实例-降雨分配方案柱形图
    chartMod: null,
    //单元产汇流信息流程图
    chartDychxx: null,
    //echarts4实例-旬月均值
    chartMonthQ: null,
    chartMonthZ: null,
    //echarts4实例-对比分析
    chartDbfx: null,

    //////基本信息使用参数//////
    //是否初始化
    is_show_jbxx: false,

    is_modify: false,

    is_show_qjt: false,
    is_show_spjk: false,

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

    //////旬月均值使用参数//////
    //是否初始化
    is_show_xyjz: false,
    //极大极小数据
    obj_max_xyjz_q: null,
    //数据源
    obj_data_xyjz_q: null,
    //极大极小数据
    obj_max_xyjz_z: null,
    //数据源
    obj_data_xyjz_z: null,

    //////对比分析使用参数//////
    //是否初始化
    is_show_dbfx: false,
    //极大极小数据
    obj_minMax_dbfx: null,
    //数据源
    obj_data_dbfx: null,

    obj_yb_graphic: null,
    //各模型预报数据
    jsonForModel1: null,
    jsonForModel2: null,
    jsonForModel3: null,
    jsonForMGE: null,

    //echarts实例-ZV曲线
    chartZV: null,
    //ZV曲线
    is_show_zv: false,
    //数据源
    arr_zv_data: new Array(),
    arr_zq_data: new Array(),
    //表格
    datatables_zv: null,

    treeData: null,

    obj_sw_fbs: null,
    obj_ll_fbs: null,

    min_sw_fbs: null,
    max_sw_fbs: null,

    min_sw_fbs: null,
    max_sw_fbs: null,

    //getStcdFor各模型过程线数据(云平台)
    modelData: new Array(),
    obj_data_gcx_cloud: null,
    //修改数据
    modifyData: new Array(),
    //修改数据
    modifyDataQx: new Array(),
    //单站日雨量
    arr_ryl_station: new Array(),
    //面雨量option
    rainAreaOption: null,
    //点雨量option
    rainStationOption: null,
    //雨量值是否查询
    isSearchRainData: 0, //0未查询，1已查询
    //水库出库流量——传给后端接口返回相关水位
    otqForSimLineInfo: new Array(),
    //实测最后时刻水位
    z0: "",
    //实测最后时刻流量
    L0: "",
    //修正保存数据
    saveSimlineData: new Array(),
    //得到后端返回的修正后的水位流量——曲线磨光接口
    simlineData: new Array,
    //实测最后时刻流量
    z0Time: "",
    //预报最后时刻
    forEndTime: "",
    //修正后得到的相关水位相关流量
    newLl: new Array(),
    newSw: new Array(),

    //echarts实例-水位流量关系线
    chartQx: null,
    //是否初始化
    is_show_qx: false,
    //水位信息
    obj_fcch_qx: null,
    //极大极小数据
    obj_minMax_qx: null,
    //数据源
    obj_data_qx: null,
    //点击了面板事件标识，为了在过程线中，resize窗口使用
    isMax: null,
    //是否缩进事件
    isRes: null,
    //单站特征统计值
    feature: [],
    //记录的洪峰水位流量
    ybzgsw: '',
    hfsw: '',
    hfll: '',

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        /* if (panelConfig.panel_default_height > $(document).height()) {
             panelConfig.panel_default_height = $(document).height();
         }*/
        that.setPanelSize(panelConfig.panel_default_width, panelConfig.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody")[0]);
        //echarts实例-日雨量柱状图
        that.chartRyl = echarts.init($("#rainInfoBody")[0]);
        //echarts实例-时段雨量柱状图
        that.chartSdyl = echarts.init($("#rainInfoHourBody")[0]);
        //echarts实例-断面信息
        that.chartDm = echarts.init($("#dmInfoBody")[0]);
        //echarts实例-ZV曲线
        that.chartZV = echarts.init($("#zvChartBody")[0]);
        //echarts实例-水位流量关系线
        that.chartQx = echarts.init($("#qxChartBody")[0]);
        //echarts实例-降雨分配方案柱形图
        that.chartMod = echarts.init($("#init_jyzzt")[0])
        that.chartDychxx = echarts.init($("#dychxxEchart")[0])
        //echarts实例-旬月均值
        that.chartMonthQ = echarts.init($("#monthQBody")[0]);
        that.chartMonthZ = echarts.init($("#monthZBody")[0]);
        //对比分析
        that.chartDbfx = echarts.init($("#compareChartBody")[0]);

        tools.init_datapicker(that.parentId + " .form-date", "yyyy-mm-dd", 2);
        tools.init_select_hour(that.parentId + " .select-hour");
        var timer_daterange = null;
        var now = moment().format("YYYY-MM-DD HH:mm:ss");
        var diff = tools.get_timer_diff(now, "60");
        var _option = tools.get_daterangepicker_option("#panelSw .form-datetime", "YYYY-MM-DD HH:00", false);
        // $("#panelSw .form-datetime").data('daterangepicker').remove();
        $("#panelSw .form-datetime").daterangepicker(_option, function (start, end, label) {
        });
       /*  var update_daterange_1hour = function () {
            //先销毁后更新
            _option.maxDate = moment().add(1, "hours");
            $("#panelSw .form-datetime").data('daterangepicker').remove();
            $("#panelSw .form-datetime").daterangepicker(_option, function (start, end, label) {
                //自动查询
                // $("#btnSearchGcx").click();
            });
        };
        setTimeout(function () {
            timer_daterange = setInterval(function () {
                update_daterange_1hour();
            }, 60 * 60 * 1000);
            update_daterange_1hour();
        }, diff * 1000); */

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
            if ($(event.target).hasClass("icon-close") || $(event.target).hasClass("ybsw-zoom") || $(event.target).hasClass("jyzzt-close"))
                return;

            tools.showPanelIndex($(this).attr("id"));
        });

        /**
         * 最大化按钮
         **/
        $(that.parentId).find('.icon-max').click(function () {
            that.isMax = true //放大缩小事件标识
            if ($(this).attr("data-type") == "max") {
                $(that.parentId).css({
                    "top": "50%",
                    "left": "50%",
                    "margin-left": "-" + panelConfig.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? panelConfig.panel_default_height : panelConfig.panel_default_height2) / 2 + "px"
                });
                that.panel_actual_width = panelConfig.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? panelConfig.panel_default_height : panelConfig.panel_default_height2;
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
            //刷新拖动点
            // that.reflashDragPoint(3);
            that.echartSetGraphic();
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
            that.is_show_zv = false;
            that.is_show_qjt = false;
            that.is_show_spjk = false;
            that.is_show_qx = false;
            that.is_show_xyjz = false;

            //echarts清空数据
            that.chartGcx.clear();
            that.chartRyl.clear();
            that.chartSdyl.clear();
            that.chartDm.clear();
            that.chartZV.clear();
            that.chartQx.clear();

            //清空修改数据
            that.modifyData = [];
            //清空修改数据
            that.modifyDataQx = [];
            //是否查询雨量数据
            that.isSearchRainData = 0;

            $("#proLineBody").show();
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
        $("#linkStationInfo").click(function () {

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
         * 全景图TAB点击事件
         **/
        $("#linkQjt").click(function () {

            if (!that.is_show_qjt) {

                that.create_qjt();

                that.is_show_qjt = true;
            }
        });
        /**
         * 视频监控TAB点击事件
         **/
        $("#linkSpjk").click(function () {

            if (!that.is_show_spjk) {

                that.create_spjk();

                that.is_show_spjk = true;
            }
        });
        /**
         * 过程线TAB点击事件
         **/
        $("#linkProLine").click(function () {

            if (!that.is_show_gcx) {
                if (that.show_type == "1") {
                    that.echart_line_gcx_real(that.show_btime, that.show_etime);
                    that.add_click_gcx_real();
                } else if (that.show_type == "2") {
                    var isRh = false;
                    that.echart_line_gcx_for_new(that.show_btime, that.show_etime, isRh);
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

            }
        });

        /**
         * 降雨信息TAB点击事件
         **/
        $("#linkRainInfo").click(function () {

            $("#btnChooseRain").bootstrapSwitch("state", false)
            $("#btnExport").hide()
            if (!that.is_show_jyxx) {
                $("#btnSearchRain").click();
                that.is_show_jyxx = true;

            }
        });

        /**
         * 降雨信息查询按钮
         **/
        $("#btnSearchRain").click(function () {
            $("#rainInfoBody").show();
            $("#rainInfoHourBody").hide();
            $("#btnReturnRyl").hide();

            //调用降雨信息
            that.echart_bar_rain(that.show_btime, that.show_etime);

        });

        /**
         * 返回日雨量-按钮
         **/
        $("#btnReturnRyl").click(function () {
            $("#rainInfoBody").show();
            $("#rainInfoHourBody").hide();
            $(this).hide();
        });
        /**
         * 过程线-表格缩放按钮
         **/
        $('#contProLine .icon-resize-left').click(function () {
            that.isRes = true
            debugger
            var marRight;
            var margin_right = parseInt($(this).parent().next().css("margin-right"));

            that.modifyFormInline(that.panel_actual_width);
            //右缩进
            if ($(this).hasClass("iconRight")) {
                if (margin_right <= 25)
                    return;

                if (margin_right == (that.panel_actual_width - 20 - 200)) {
                    if (that.show_type == "3") {
                        marRight = 575;
                    } else {
                        if (((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) && (that.show_type == "2"))
                            marRight = 640;
                        else
                            marRight = 625;
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
                        if (((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) && (that.show_type == "2"))
                            marRight = 640;
                        else
                            marRight = 625;
                    }
                } else {
                    marRight = (that.panel_actual_width - 20 - 200);
                }
            }
            if (marRight == 25) {
                $(this).parent().prev().hide();
                $("#proLineBody").show();
                if (that.show_type == "2") {
                    if (isCgxz) {
                        //获取当前开关值
                        let val = $("#btn_ybsw-modify").is(":checked")
                        $("#btn_ybsw-modify").bootstrapSwitch();
                        $("#btn_ybsw-modify").bootstrapSwitch("state", val);
                        $("#modifyNote").show();
                        if (!val) {
                            $("#btn_ybsw-zoom").show();
                        }
                        $("#btn_ybsw-getRain").show();
                        $("#btn_ybsw-save").show();
                        $("#btn_ybsw-updaily").show();
                    } else {
                        $("#btn_ybsw-modify").bootstrapSwitch("destroy");
                        $("#btn_ybsw-getRain").hide();
                        $("#modifyNote").hide();
                        $("#btn_ybsw-zoom").hide();
                        $("#btn_ybsw-save").hide();
                        $("#btn_ybsw-updaily").hide();
                    }
                }
                $(this).parent().prev().width(0);
            } else if (marRight == (that.panel_actual_width - 20 - 200)) {
                // $("#proLineBody").hide();
                $("#btn_ybsw-modify").bootstrapSwitch("destroy");
                $("#btn_ybsw-modify").hide();
                $("#modifyNote").hide();
                $("#btn_ybsw-getRain").hide();
                $("#btn_ybsw-zoom").hide();
                $("#btn_ybsw-save").hide();
                $("#btn_ybsw-updaily").hide();
                $(this).parent().prev().show();

                //最后的减2是边框的宽度
                $(this).parent().prev().width(marRight - 25 - 2); //2019-10-08 modify by chl
            } else {
                $("#proLineBody").show();
                if (that.show_type == "2") {
                    if (isCgxz) {
                        //获取当前开关值
                        let val = $("#btn_ybsw-modify").is(":checked")
                        $("#btn_ybsw-modify").bootstrapSwitch();
                        $("#btn_ybsw-modify").bootstrapSwitch("state", val);
                        $("#modifyNote").show();
                        if (!val) {
                            $("#btn_ybsw-zoom").show();
                        }
                        $("#btn_ybsw-getRain").show();
                        $("#btn_ybsw-save").show();
                        $("#btn_ybsw-updaily").show();
                    } else {
                        $("#btn_ybsw-modify").bootstrapSwitch("destroy");
                        $("#modifyNote").hide();
                        $("#btn_ybsw-zoom").hide();
                        $("#btn_ybsw-getRain").hide();
                        $("#btn_ybsw-save").hide();
                        $("#btn_ybsw-updaily").hide();
                    }
                }
                $(this).parent().prev().show();

                $(this).parent().prev().width(marRight - 25);
            }


            var w_right = $(this).parent().prev().width() + 2;
            $("#proLineBody").width(that.panel_actual_width - 20 - marRight - 200); //2019-10-08 modify by chl
            $("#contProLine .content-left").width(that.panel_actual_width - 20 - marRight - 200); //2019-10-08 modify by chl

            var w_left = $("#proLineBody").width();
            $("#contProLine").width(w_left + 25 + w_right); //2019-10-08 modify by chl
            $(this).parent().next().animate({
                "margin-right": marRight
            }, 500);



            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }
            //刷新拖动点
            // that.reflashDragPoint(3);

            that.echartSetGraphic();
        });

        /**
         * 断面信息TAB点击事件
         **/
        $("#linkDmInfo").click(function () {

            if (!that.is_show_dmxx) {
                that.echart_line_dmxx();
                that.is_show_dmxx = true;
                that.add_click_dm();
            }
        });

        /**
         * ZV曲线
         **/
        $("#link_ZV").click(function () {

            if (!that.is_show_zv) {
                //初始化数据表格
                if (that.datatables_zv != null) {
                    that.datatables_zv.clear();
                    that.datatables_zv.destroy();
                }

                $(that.parentId + " .tableZV thead tr").remove();
                $(that.parentId + " .tableZV thead").append("<tr><th>水位</th><th>蓄水量</th><th>流量</th></tr>");

                //调用ZQ曲线
                that.echart_line_zv();
                that.is_show_zv = true;
            } else {
                if (that.datatables_zv != null) {
                    that.datatables_zv.fnDraw();
                }

                if (that.datatables_zv != null && $("#contDd_ZV .dataTables_scrollHead .tableZV").width() <= 100) {
                    that.datatables_zv.columns.adjust();
                }
            }
            that.add_click_ZV();
        });

        /**
         * 水位流量关系TAB点击事件
         **/
        $("#linkQx").click(function () {

            if (ybMenu === 1) {
                that.echart_line_qx();
                that.add_click_Qx();
                that.init_ZQ_All()
            } else {
                if (!that.is_show_qx) {
                    that.echart_line_qx();
                    that.add_click_Qx();
                    that.is_show_qx = true
                }
            }
            // that.add_click_dm();
        });

        /**
         * 历史极值TAB点击事件
         **/
        $("#linkRankList").click(function () {
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
        });

        /**
         * 旬月均值TAB点击事件
         **/
        $("#linkMonthChart").click(function () {
            if (!that.is_show_xyjz) {
                $("#btnSearchXY").click();
                that.is_show_xyjz = true;
            }
        });

        /**
         * 旬月流量均值查询按钮
         **/
        $("#btnSearchXY").click(function () {
            var stime = $("#txtBeginTimeXY").val() + " 08:00:00";
            var etime = $("#txtEndTimeXY").val() + " 08:00:00";

            that.echart_bar_xyjz_q(stime, etime);
            that.echart_bar_xyjz_z(stime, etime);
        });

        /**
         * 旬均/月均切换事件
         **/
        $('input:radio[name="radXYType"]').change(function () {
            if ($("input[name='radXYType']:checked").val() == "xun") {
                that.chartMonthQ.setOption(that.obj_data_xyjz_q.option_xun, true);
                that.chartMonthZ.setOption(that.obj_data_xyjz_z.option_xun, true);
            } else {
                that.chartMonthQ.setOption(that.obj_data_xyjz_q.option_month, true);
                that.chartMonthZ.setOption(that.obj_data_xyjz_z.option_month, true);
            }
        });
        /**
         * 对比分析TAB点击事件
         **/
        $("#linkCompareChart").click(function () {
            $("#chkNowLl_Dbfx").parent().show();
            $("#chkLastLl_Dbfx").parent().show();
            $("#chkDntqSw_Dbfx").parent().show();
            $("#chkDntqLl_Dbfx").parent().show();
            $("#contCompareChart .dbfx_tuli").show();
        });
        /**
         * 对比分析查询按钮
         **/
        $("#btnSearchDbfx").click(function () {
            var now = new Date();
            var stime = $("#txtBeginTimeDbfx").val();
            var etime = $("#txtEndTimeDbfx").val();
            var year = $.trim($("#txtComYear").val());
            var bxOrGc = $("input[name='swTypePanel']:checked").val();
            if (Number(year) >= now.getFullYear() || Number(year) < 1900) {
                tools.show_message_error("对比年度请输入1900~" + (now.getFullYear() - 1).toString() + "之间的有效年份!");
                return;
            }
            if (stime.substr(0, 4) != etime.substr(0, 4)) {
                tools.show_message_error("不能跨年度对比分析!");
                return;
            }
            that.echart_line_dbfx(stime, etime, year, bxOrGc);
            //绑定事件
            if (!that.is_show_dbfx) {
                that.is_show_dbfx = true;
            }
        });
        //添加对比分析相关事件
        that.add_click_dbfx();

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
            $(".tb_body li.active a:eq(0)").click();
        });

        //统计表切换事件
        $(that.parentId + " .tj_body li a").click(function (e) {
            if (!(that.show_type == "3" && that.show_all))
                return;

            if ($(this).attr("id") == "linkTj_Xx") {
                $("#linkDmInfo").parent().hide();
                $("#linkRankList").parent().hide();
            } else {
                $("#linkDmInfo").parent().show();
                $("#linkRankList").parent().show();
            }
            if ($(this).attr("id") == "linkTj_Kzztz") { //add by chl 2019-11-15
                that.getKzztzTableInfo();
            }
        });

        //单站统计表点击事件
        $(this.parentId + " .table_ybtj").on("click", ".linkModel", function (e) {

            var model = $(this).attr("_data");
            var seriesName = model + "流量"

            //判断模型是否勾选
            if ($(this).find("input").is(':checked')) {
                //已勾选则取消勾选，取消echarts该模型曲线
                $(this).find("input").prop("checked", false);
                that.chartGcx.dispatchAction({
                    type: 'legendUnSelect',
                    name: seriesName
                })
            } else {
                //未勾选则勾选，echarts展示该模型曲线
                $(this).find("input").prop("checked", true);
                that.chartGcx.dispatchAction({
                    type: 'legendSelect',
                    name: seriesName
                })
                that.chartGcx.dispatchAction({
                    type: 'highlight',
                    seriesName: seriesName
                })
                setTimeout(that.chartGcx.dispatchAction({
                    type: 'downplay',
                    seriesName: seriesName
                }), 1000)
                $(that.parentId + " .table_ybtj tr").removeClass("hover");
                $(this).addClass("hover");
                //修改表格数据
                that.change_tableData_forModel(model);
            }
        });
        //单站统计表checkbox点击事件
        $(this.parentId + " .table_ybtj").on("click", "input[type='checkbox']", function (e) {
            e.stopPropagation(); //阻止冒泡
            var model = $(this).parent().parent().attr("_data");
            var seriesName = model + "流量"
            if ($(this).is(':checked')) {
                that.chartGcx.dispatchAction({
                    type: 'legendSelect',
                    name: seriesName
                })
                that.chartGcx.dispatchAction({
                    type: 'highlight',
                    seriesName: seriesName
                })
                setTimeout(that.chartGcx.dispatchAction({
                    type: 'downplay',
                    seriesName: seriesName
                }), 1000)
                $(that.parentId + " .table_ybtj tr").removeClass("hover");
                $(this).parent().parent().addClass("hover");
                //修改表格数据
                that.change_tableData_forModel(model);
            } else {
                that.chartGcx.dispatchAction({
                    type: 'legendUnSelect',
                    name: seriesName
                })
            }
        })
        //预报修改按钮点击事件 --云平台版本
        $(".content-left").delegate('input[name="btn_ybsw-modify"]', 'switchChange.bootstrapSwitch', function (event, state) {
            var zr;
            zr = that.chartGcx.getZr();
            zr.off('dblclick')
            that.newLl = [];
            that.newSw = [];
            if (state == true) { //添加设置点
                $("#btn_ybsw-zoom").hide();
                var zr;
                that.newLl = [];
                that.newSw = [];
                that.modifyData = [];
                zr = that.chartGcx.getZr();
                var beginPointDate = new Date(that.z0Time);
                var timeStamp = beginPointDate.getTime();
                var firstPointArr = [timeStamp, that.L0];
                that.modifyData.push(firstPointArr);
                zr.off('click');
                zr.off('dblclick')
                zr.on('click', function (params) {
                    var option = that.chartGcx.getOption()
                    // var grid = option.grid;
                    var pointInPixel = [params.offsetX, params.offsetY];
                    // if (that.modifyData.length > 1) {
                    //     that.modifyData = [];
                    //     option.series.pop();
                    //     that.chartGcx.setOption(option, true);
                    // }
                    // console.log("横坐标值：" + that.chartGcx.getOption().xAxis[0].axisPointer.value);
                    var pointInGrid = that.chartGcx.convertFromPixel({
                        xAxisId: 'xAxis_time',
                        yAxisId: 'yAxis_ll'
                    }, pointInPixel);
                    pointInGrid[0] = that.chartGcx.getOption().xAxis[0].axisPointer.value;
                    //时间戳转换
                    var pointTime = moment(pointInGrid[0]).format("YYYY-MM-DD HH:00:00");
                    if (that.modifyData.length == 1) { //判断第一个点是否在开始时间
                        if (moment(pointTime).isSameOrBefore(that.show_etime)) {
                            tools.show_message_error_const("修正点不能早于查询结束时间")
                            return;
                        }
                    }
                    if (moment(pointTime).isSame(that.forEndTime)) { //设置点为预报最后时刻时取消添加点
                        zr.off("click");
                        zr.off('contextmenu');
                        $("#btn_ybsw-modify").bootstrapSwitch("state", false)
                    }
                    pointInGrid[1] = tools.format_ll(pointInGrid[1]);
                    // if (that.chartGcx.containPixel('gird', pointInPixel)) {
                    that.modifyData.push(pointInGrid);
                    if (option.series[option.series.length - 1].id != "xzll") {
                        option.series.push({
                            id: 'xzll',
                            name: "修正流量",
                            data: that.modifyData,
                            yAxisIndex: 1,
                            type: 'line',
                            smooth: true,
                            symbolSize: 10,
                            lineStyle: {
                                type: "dashed"
                            }
                        })
                    } else {
                        option.series[option.series.length - 1].data.push(pointInGrid);
                    }
                    that.chartGcx.setOption(option);
                    return false;
                    // }
                });
                zr.off('contextmenu')
                zr.on('contextmenu', (params) => { //右键取消设置点
                    // console.log('右键单击');
                    if (that.modifyData.length > 1) {
                        var option = that.chartGcx.getOption()
                        that.modifyData.pop(); //删除最后一个点
                        option.series[option.series.length - 1].data = that.modifyData;
                        that.chartGcx.setOption(option);
                        return false;
                    }
                });

            } else { //取消设置点
                $("#btn_ybsw-zoom").show();
                that.newLl = [];
                that.newSw = [];
                setTimeout(function () {
                    that.chartGcx.setOption({
                        graphic: that.modifyData.map(function (item, dataIndex) {
                            return {
                                type: 'circle',
                                position: that.chartGcx.convertToPixel({
                                    xAxisId: 'xAxis_time',
                                    yAxisId: 'yAxis_ll'
                                }, item),
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: 10 / 2
                                },
                                invisible: true,
                                draggable: true,
                                ondrag: function (dx, dy) {
                                    that.onPointDragging(dataIndex, [dx.offsetX, dx.offsetY]);
                                },
                                onmousemove: function () {
                                    that.showTooltip(dataIndex);
                                },
                                onmouseout: function () {
                                    that.hideTooltip(dataIndex);
                                },
                                z: 100
                            };
                        })
                    });
                }, 0)
                var zr;
                zr = that.chartGcx.getZr();
                if (isCgxz) {
                    zr.off('dblclick')
                    zr.on('dblclick', {
                        seriesName: '修正流量'
                    }, function (params) {
                        let xIndex = that.chartGcx.getOption().xAxis[0].axisPointer.value;
                        var option = that.chartGcx.getOption();
                        var seriesData = option.series[option.series.length - 1].data;
                        var yValue = "";
                        var updateData = [];
                        var updateIndex = '';
                        $.each(seriesData, function (index, item) {
                            if (item[0] == xIndex) {
                                yValue = item[1]
                                updateData = item
                                updateIndex = index
                            }
                        })
                        layer.prompt({
                            title: '请输入修正值',
                            value: yValue
                        }, function (val, index) {
                            // layer.msg('得到了' + val);
                            option.series[option.series.length - 1].data[updateIndex][1] = val;
                            that.modifyData[updateIndex][1] = val;
                            that.chartGcx.setOption(option);
                            that.echartSetGraphic();
                            layer.close(index);
                        });
                    })
                }

                //  setTimeout(function () {
                //  that.chartGcx.setOption({
                //      graphic: that.modifyData.map(function (item, dataIndex) {
                //          return {
                //              type: 'circle',
                //              position: that.chartGcx.convertToPixel({
                //                  xAxisId: 'xAxis_time',
                //                  yAxisId: 'yAxis_ll'
                //              }, item),
                //              shape: {
                //                  cx: 0,
                //                  cy: 0,
                //                  r: 10 / 2
                //              },
                //              invisible: true,
                //              draggable: true,
                //              ondrag: function (dx, dy) {
                //                  that.onPointDragging(dataIndex, [dx.offsetX, dx.offsetY]);
                //              },
                //              onmousemove: function () {
                //                  that.showTooltip(dataIndex);
                //              },
                //              onmouseout: function () {
                //                  that.hideTooltip(dataIndex);
                //              },
                //              z: 100
                //          };
                //      })
                //  });
                //  }, 0)
                window.addEventListener('resize', that.updatePosition);
                zr.off("click");
            }
        })

        //相关-云平台
        $("#btn_ybsw-getRain").click(function () {
            $("#btn_ybsw-modify").bootstrapSwitch("state", false)
            zr = that.chartGcx.getZr();
            zr.off("click");
            var param = [];
            $.each(that.modifyData, function (index, item) {
                item[0] = moment(item[0]).format("YYYY-MM-DD HH:00:00");
                param.push({
                    q: item[1],
                    tm: item[0]
                });
            })
            var otqList = [];
            if (that.show_sttp == "RR") {
                otqList = that.otqForSimLineInfo
            }

            var objData = {
                outQList: otqList,
                pointList: param,
                wsid: that.show_stcd,
                z0: that.z0,
                feature: that.feature
            };
            var info = JSON.stringify(objData);
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                url: apiUrl_cloud + "api-rainsituation/real/getSimLineInfo",
                headers: {
                    "Authorization": getCookie("accessToken")
                },
                data: info,
                success: function (res) {
                    var newDataQ = [];
                    var newDataZ = [];
                    that.newLl = [];
                    that.newSw = [];
                    if (res.code == 200) {
                        that.simlineData = res.data.pointList;
                        var option = that.chartGcx.getOption();
                        var dataLength = option.series[3].data.length - res.data.pointList.length;
                        $.each(res.data.pointList, function (index, item) {
                            newDataQ.push({
                                value: [item.tm, item.q]
                            })
                            newDataZ.push({
                                value: [item.tm, item.z]
                            })
                            that.obj_minMax_gcx.sw.min = Math.min(Number(item.z), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(item.z), that.obj_minMax_gcx.sw.max);


                            //更新表中数据
                            $("#contProLine .tableSqxx tr").each(function (i, data) {
                                if (i >= dataLength) {
                                    if (that.show_sttp == "RR") {
                                        if (item.z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                                            $(this).find('td:eq(4)').children().css({
                                                "color": "Red"
                                            })
                                        } else if (item.z >= that.obj_fcch_gcx.sjsw) {
                                            $(this).find('td:eq(4)').children().css({
                                                "color": "Red"
                                            })
                                        } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM && item.z >= that.obj_fcch_gcx.xxsw) {
                                            $(this).find('td:eq(4)').children().css({
                                                "color": "Blue"
                                            })
                                        } else {
                                            $(this).find('td:eq(4)').children().css({
                                                "color": ""
                                            })
                                        }
                                        //  $(this).find('td:eq(3)').children().val(item.otq);
                                        $(this).find('td:eq(4)').children().val(item.z);
                                        $(this).find('td:eq(5)').children().val(item.q);
                                    } else {
                                        if (item.z >= that.obj_fcch_gcx.bzsw) {
                                            $(this).find('td:eq(3)').children().css({
                                                "color": "Red"
                                            })
                                        } else if (item.z >= that.obj_fcch_gcx.jjsw) {
                                            $(this).find('td:eq(3)').children().css({
                                                "color": "Blue"
                                            })
                                        } else {
                                            $(this).find('td:eq(3)').children().css({
                                                "color": ""
                                            })
                                        }
                                        $(this).find('td:eq(3)').children().val(item.z);
                                        $(this).find('td:eq(4)').children().val(item.q);
                                    }
                                    return false;
                                }
                            })
                            dataLength++;
                        })

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
                        var axis_sw_min = arrSw[1];
                        axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                        var axis_sw_max = arrSw[0];


                        option.yAxis[0].min = axis_sw_min;
                        option.yAxis[0].max = axis_sw_max;

                        /* 新增需求——获得相关水位后，将原本的预报水位流量预报时段的数据替换为接口获得的相关水位数据
                        并将统计表中的数据和右侧报表的数据统一修改为获得的 2022.6.16  modify by chl */
                        $.each(option.series, function (index, item) {
                            if (item.id == "id_series_ybsw") {
                                item.data.splice(item.data.length - newDataZ.length, newDataZ.length, );
                                $.each(newDataZ, function (i, data) {
                                    item.data.push(data);
                                })
                                //更新obj_data_gcx.ybsw数据
                                that.obj_data_gcx.ybsw = item.data;
                            }
                            if (item.id == "id_series_ybll") {
                                item.data.splice(item.data.length - newDataQ.length, newDataQ.length, );
                                $.each(newDataQ, function (i, data) {
                                    item.data.push(data);
                                })
                                //更新obj_data_gcx.ybll数据
                                if (that.show_sttp == "RR") {
                                    that.obj_data_gcx.ll_in = item.data;
                                } else {
                                    that.obj_data_gcx.ybll = item.data;
                                }
                            }
                        })

                        //删除最后一个添加的修正流量数据
                        option.series.splice(option.series.length - 1, 1);
                        /* option.series[option.series.length - 1] = {
                            name: "修正流量",
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "img://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                lineStyle: {
                                    type: "solid",
                                },
                                data: newDataQ
                        }
                        option.series.push({
                            name: "修正水位",
                            type: 'line',
                            yAxisIndex: 0,
                            symbol: "img://Images/empty.png",
                            symbolSize: 1,
                            showSymbol: false,
                            hoverAnimation: false,
                            lineStyle: {
                                type: "solid",
                            },
                             itemStyle: {
                                 color: "#2E8B57"
                             },
                            data: newDataZ
                        }) */

                        that.chartGcx.setOption(option, true);
                        that.modifyData = [];
                        that.newLl = newDataQ;
                        that.newSw = newDataZ;

                        //修改特征统计表数据
                        $("#contProLine .table_ybtj tbody tr").remove();
                        var html = "<tr>"
                        $.each(res.data.feature, function (i, data) {
                            html += "<td>" + data + "</td>"
                        })
                        $("#contProLine .table_ybtj tbody").append(html);
                        //记录洪峰水位流量
                        that.ybzgsw = '';
                        that.hfsw = '';
                        that.hfll = '';
                        if (that.show_sttp == "RR") {
                            that.ybzgsw = res.data.feature[0][3] //预报最高水位
                        } else {
                            that.hfsw = res.data.feature[0][1] //洪峰水位
                            that.hfll = res.data.feature[0][3] //洪峰流量
                        }

                    } else {
                        tools.show_message_error_const(res.message);
                    }
                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error();

                }
            });
        })
        //上报
        $("#btn_ybsw-updaily").click(function () {
            var objData = {
                adjust: 0,
                autoFore: 0,
                day: Number(selectDays),
                etime: that.show_etime,
                func: Number(searchType) - 1,
                hisStormId: _hisStormId,
                modelid: getRadioModel(),
                models: selectModes,
                plan: Number(searchPlan),
                plusType: _plusType,
                rainPlus: _rainPlus,
                range: searchRange,
                stime: that.show_btime,
                stcd: that.show_stcd
            };
            var info = JSON.stringify(objData);
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                url: apiUrl_cloud + "api-hwhydroinfo/Daily_forecast_singlestcd",
                headers: {
                    "Authorization": getCookie("accessToken")
                },
                data: info,
                //url: that.ApiUrlPath + "/Daily_forecast",
                //data: "{'info':'" + info + "'}",
                success: function (res) {
                    tools.loadinghide(false);
                    if (res.code != 200) {
                        tools.show_message_error("日常化上报失败!");
                        return;
                    }
                    tools.show_message_success(res.data);
                    tools.loadinghide(false);
                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error("日常化上报失败!");

                }
            });
        })

        //保存
        $("#btn_ybsw-save").click(function () {
            if (that.newLl.length == 0) {
                tools.show_message_error_const("没有进行数据修正");
                return;
            }
            $(".loading-layer").show();
            $("#span_loading").html("预报修正数据保存中...");

            $.each(that.simlineData, function (index, item) {
                $.each(that.saveSimlineData, function (i, data) {
                    if (item.tm == data.tm) {
                        that.saveSimlineData[i].modifyQq = Number(item.q);
                        that.saveSimlineData[i].modifyZ = Number(item.z);
                    }
                })
            })
            var objData = {
                adjust: 1,
                endTime: that.show_etime,
                foreDays: Number(selectDays),
                hisStormId: _hisStormId,
                minioDataList: that.saveSimlineData,
                plan: searchPlan,
                plusType: _plusType,
                rainPlus: _rainPlus,
                range: searchRange,
                startTime: that.show_btime,
                stcd: that.show_stcd,
                model: modifyModel,
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
                url: apiUrl_cloud + "api-rainsituation/real/saveSimlineDataToMio",
                data: info,
                success: function (data) {
                    var res = data;
                    if (res.code != 200) {
                        tools.loadinghide(false);
                        tools.show_message_error_const("保存预报修改数据失败!");
                        return;
                    }
                    isModifyAndSave = true;
                    that.is_modify = false;
                    tools.show_message_success("保存预报修改数据成功!");
                    tools.loadinghide(false);
                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error("保存预报修改数据失败!");

                }
            });

        });
        that.change_table_jh_input();

        //雨量切换
        $('input[name="btnChooseRain"]').on('switchChange.bootstrapSwitch', function (event, state) {
            if (that.isSearchRainData == 1) {
                if (state == true) { //点
                    that.chartRyl.setOption(that.rainStationOption, true);
                    //导出按钮出现
                    $("#btnExport").show()
                } else { //面
                    that.chartRyl.setOption(that.rainAreaOption, true);
                    $("#btnExport").hide()
                }
            }
        })

        //雨量导出事件
        $("#btnExport").on('click', function () {
            let objData2 = {
                adjust: 1,
                wsid: that.show_stcd,
                endTime: searchEtime,
                startTime: searchStime,
                plusType: _plusType,
                rainPlus: _rainPlus,
                hisStormId: _hisStormId,
                plan: searchPlan,
                // userId: $("#_hid_userid").val(),
                range: Number(searchRange),
                model: selectModes,
                foreDays: Number(selectDays),
                meteorPattern: meteor
            };
            let url = apiUrl_cloud + 'api-rainsituation/real/exportSingleStcdRainInfo'
            let methodType = 'POST'
            let fileName = that.show_stnm + '雨量数据.xlsx'
            let sync = true

            that.exportBlob(url, methodType, objData2, fileName, sync)

        })


        //成果修正缩放功能--start
        $("#btn_ybsw-zoom").on('click', function () {
            upDownPanelShow()
        })
        //成果修正缩放功能--end




        //修改水位流量关系曲线============================================================== start
        $(".xzcg-btn").delegate('input[name="btn_swqx-modify"]', 'switchChange.bootstrapSwitch', function (event, state) {
            var zr;
            zr = that.chartQx.getZr();
            zr.off('dblclick')
            if (state == true) { //添加设置点
                var zr;
                that.modifyDataQx = [];
                zr = that.chartQx.getZr();
                zr.off('click');
                zr.off('dblclick')
                zr.on('click', function (params) {
                    var option = that.chartQx.getOption()
                    // var grid = option.grid;
                    var pointInPixel = [params.offsetX, params.offsetY];
                    // if (that.modifyData.length > 1) {
                    //     that.modifyData = [];
                    //     option.series.pop();
                    //     that.chartGcx.setOption(option, true);
                    // }
                    // console.log("横坐标值：" + that.chartQx.getOption().xAxis[0].axisPointer.value);
                    // console.log("纵坐标值：" + that.chartQx.getOption().yAxis[0].axisPointer.value);
                    var pointInGrid = that.chartQx.convertFromPixel({
                        xAxisId: 'll_x',
                        yAxisId: 'sw_y'
                    }, pointInPixel);
                    // let pointInGrid = []
                    pointInGrid[0] = pointInGrid[0].toFixed(2);
                    // pointInGrid[1] = pointInGrid[1].toFixed(0);
                    pointInGrid[1] = that.chartQx.getOption().yAxis[0].axisPointer.value.toFixed(2);
                    // if (that.chartGcx.containPixel('gird', pointInPixel)) {
                    that.modifyDataQx.push({
                        value: pointInGrid
                    });
                    //移除还有ZQXZ的曲线
                    if (option.series.length === 0 || !option.series[option.series.length - 1].id || option.series[option.series.length - 1].id != "ZQXZ") {
                        option.series.push({
                            id: 'ZQXZ',
                            name: "修正水位流量",
                            data: that.modifyDataQx,
                            type: 'line',
                            smooth: true,
                            symbolSize: 10,
                            lineStyle: {
                                type: "dashed"
                            }
                        })
                    } else {
                        option.series[option.series.length - 1].data.push({
                            value: pointInGrid
                        });
                    }
                    that.chartQx.setOption(option);
                    return false;
                    // }
                });
                zr.off('contextmenu')
                zr.on('contextmenu', (params) => { //右键取消设置点
                    // console.log('右键单击');
                    if (that.modifyDataQx.length > 0) {
                        var option = that.chartQx.getOption()
                        that.modifyDataQx.pop(); //删除最后一个点
                        option.series[option.series.length - 1].data = that.modifyDataQx;
                        that.chartQx.setOption(option);
                        return false;
                    }
                });

            } else { //取消设置点
                // that.newLlQx = [];
                // that.newSwQx = [];
                setTimeout(function () {
                    that.chartQx.setOption({
                        graphic: that.modifyDataQx.map(function (item, dataIndex) {
                            return {
                                type: 'circle',
                                position: that.chartQx.convertToPixel({
                                    xAxisId: 'll_x',
                                    yAxisId: 'sw_y'
                                }, item.value),
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: 10 / 2
                                },
                                invisible: true,
                                draggable: true,
                                ondrag: function (dx, dy) {
                                    that.onPointDraggingQx(dataIndex, [dx.offsetX, dx.offsetY]);
                                },
                                onmousemove: function () {
                                    that.showTooltipQx(dataIndex);
                                },
                                onmouseout: function () {
                                    that.hideTooltipQx(dataIndex);
                                },
                                z: 100
                            };
                        })
                    });
                }, 0)
                var zr;
                zr = that.chartQx.getZr();
                zr.off('dblclick')
                zr.on('dblclick', {
                    seriesName: '修正水位流量'
                }, function (params) {
                    let xIndex = that.chartQx.getOption().xAxis[0].axisPointer.value;
                    var option = that.chartQx.getOption();
                    var seriesData = option.series[option.series.length - 1].data;
                    var yValue = "";
                    let xValue = ""
                    var updateData = [];
                    var updateIndex = '';
                    $.each(seriesData, function (index, item) {
                        if (item.value[0] == xIndex) {
                            yValue = Number(item.value[1])
                            xValue = Number(item.value[0]).toFixed()
                            updateData = item.value
                            updateIndex = index
                        }
                    })
                    if (xValue === '' || yValue === '') {
                        layer.msg("请双击修正点的正确位置", {
                            icon: 5
                        })
                        return
                    }
                    layer.prompt({
                        title: '请输入水位流量修正值，使用逗号(,)隔开',
                        value: yValue + "," + xValue
                    }, function (val, index) {
                        if (val.indexOf(',') === -1 && val.indexOf('，') === -1) {
                            layer.msg("请输入正确的水位流量值", {
                                icon: 5
                            })
                            return
                        }
                        let valAry = []
                        if (val.indexOf(',') > 0) {
                            valAry = val.split(',')
                        }
                        if (val.indexOf('，') > 0) {
                            valAry = val.split('，')
                        }
                        // layer.msg('得到了' + val);
                        option.series[option.series.length - 1].data[updateIndex].value[1] = Number(valAry[0]);
                        option.series[option.series.length - 1].data[updateIndex].value[0] = Number(valAry[1]);
                        that.modifyDataQx[updateIndex].value[1] = Number(valAry[0]);
                        that.modifyDataQx[updateIndex].value[0] = Number(valAry[1]);
                        that.chartQx.setOption(option);
                        that.echartSetGraphic();
                        layer.close(index);
                    });
                })

                window.addEventListener('resize', that.updatePositionQx);
                zr.off("click");
            }
        })

        //生成曲线
        $("#btn_swqx-getRain").click(function () {
            let zr = that.chartQx.getZr();
            let param = [];
            if (that.modifyDataQx.length <= 3) {
                layer.msg('请传入大于等于4个点', {
                    icon: 2
                })
                return
            }
            zr.off("click");
            $.each(that.modifyDataQx, function (index, item) {
                param.push({
                    q: item.value[0],
                    z: item.value[1]
                });
            })
            let objData = {
                pointList: param,
            };
            let info = JSON.stringify(objData);
            let newll = []
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                url: apiUrl_cloud + "api-rainsituation/real/genRiverZQ",
                headers: {
                    "Authorization": getCookie("accessToken")
                },
                data: info,
                success: function (res) {
                    let option = that.chartQx.getOption()
                    let floodData = []
                    if (res.code === 200) {
                        var ll_min = dispatchConfig.MAX_NUM;
                        var ll_max = dispatchConfig.MIN_NUM;
                        var sw_min = dispatchConfig.MAX_NUM;
                        var sw_max = dispatchConfig.MIN_NUM;
                        $.each(res.data.pointList, function (i, data) {
                            floodData.push({
                                value: [Number(data.q), Number(data.z)]
                            })
                            ll_min = Math.min(Number(data.q), ll_min);
                            ll_max = Math.max(Number(data.q), ll_max);
                            sw_min = Math.min(Number(data.z), sw_min);
                            sw_max = Math.max(Number(data.z), sw_max);
                        })

                        //最高、低水位
                        var min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx;
                        if (sw_max - sw_min > 0) {
                            min_sw_gxqx = sw_min - (sw_max - sw_min) * dispatchConfig.MIN_DEPART / 2;
                            max_sw_gxqx = sw_max + (sw_max - sw_min) * dispatchConfig.MIN_DEPART / 2;
                        } else {
                            if (sw_min == dispatchConfig.MAX_NUM) {
                                min_sw_gxqx = 0;
                                max_sw_gxqx = 1;
                            } else {
                                min_sw_gxqx = sw_min - 0.5;
                                max_sw_gxqx = sw_max + 0.5;
                            }
                        }
                        //最大 最小流量
                        if (ll_max - ll_min > 0) {
                            min_ll_gxqx = parseInt(ll_min * (1 - dispatchConfig.MIN_DEPART));
                            max_ll_gxqx = parseInt(ll_max * (1 + dispatchConfig.MIN_DEPART / 2));
                        } else {
                            if (ll_min == dispatchConfig.MAX_NUM) {
                                min_ll_gxqx = 0;
                                max_ll_gxqx = 1;
                            } else {
                                min_ll_gxqx = parseInt(ll_min - 1);
                                max_ll_gxqx = parseInt(ll_max + 1);
                            }
                        }
                        //比较坐标轴的最大值和最小值
                        //水位最大值
                        let swMax = option.yAxis[0].max
                        //水位最小值
                        let swMin = option.yAxis[0].min
                        //流量最大值
                        let llMax = option.xAxis[0].max
                        // 流量最小值
                        let llMin = option.xAxis[0].min

                        if (swMax - max_sw_gxqx > 0) {
                            option.yAxis[0].max = swMax
                        }
                        if (swMin - min_sw_gxqx < 0) {
                            option.yAxis[0].min = swMin
                        }
                        if (llMax - max_ll_gxqx > 0) {
                            option.xAxis[0].max = llMax
                        }
                        if (llMin - min_ll_gxqx < 0) {
                            option.xAxis[0].min = llMin
                        }

                        option.legend[0].data.push("流量水位修正ZQ曲线");
                        option.series.pop()
                        option.series.push({
                            type: 'line',
                            name: "流量水位修正ZQ曲线",
                            symbol: "circle",
                            lineStyle: {
                                color: '#0F347B'
                            },
                            itemStyle: {
                                color: '#1E9BD1'
                            },
                            showSymbol: false,
                            connectNulls: true, //连接空数据
                            smooth: true, //平滑显示曲线
                            smoothMonotone: "none",
                            data: floodData
                        })
                        that.chartQx.setOption(option, true);
                        that.modifyDataQx = [];
                    } else {
                        tools.show_message_error_const(res.message);
                    }
                    that.newll = floodData;
                    $("#btn_swqx-modify").bootstrapSwitch("state", false)
                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error_const();
                }
            });
        })
        //上报
        $("#btn_swqx-updaily").click(function () {
            var objData = {
                range: searchRange,
                stime: that.show_btime,
                etime: that.show_etime,
                plan: searchPlan,
                userId: $("#_hid_userid").val(),
                day: selectDays
            }
            var info = JSON.stringify(objData);
            var objData = {
                stime: that.show_btime,
                etime: that.show_etime,
                plan: searchPlan,
                plusType: _plusType,
                rainPlus: _rainPlus,
                hisStormId: _hisStormId,
                day: selectDays,
                range: searchRange,
            };
            var info = JSON.stringify(objData);
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                url: apiUrl_cbh + "Daily_forecast",
                headers: {
                    "Authorization": getCookie("accessToken")
                },
                data: info,
                //url: that.ApiUrlPath + "/Daily_forecast",
                //data: "{'info':'" + info + "'}",
                success: function (data) {
                    var res = data;
                    tools.loadinghide(false);
                    if (res == null || res.length == 0) {
                        tools.show_message_error("日常化上报失败!");
                        return;
                    }
                    tools.show_message_success(res);
                    tools.loadinghide(false);
                },
                error: function (errorMsg) {
                    tools.loadinghide(false);
                    tools.show_message_error("日常化上报失败!");

                }
            });
        })

        //保存
        $("#btn_swqx-save").click(function () {
            let zqQxValue = $("#select_zqQx  option:selected").val();
            let zqQxText = $("#select_zqQx  option:selected").text();
            layer.prompt({
                formType: 0,
                value: '',
                title: '当前：【' + zqQxText + '】,输入曲线描述'
            }, function (value, index, elem) {
                layer.close(index)
                if (that.newll.length === 0) {
                    tools.show_message_error_const("没有进行数据修正");
                    return;
                }
                $(".loading-layer").show();
                $("#span_loading").html("预报修正数据保存中...");

                let pointListP = []
                $.each(that.newll, function (idx, item) {
                    pointListP.push({
                        "tm": null,
                        "q": item.value[0],
                        "z": item.value[1],
                        "otq": 0
                    })
                })
                var objData = {
                    // commments:getCookie("userid")+"操作流量数位数据修正保存接口",
                    commments: value,
                    floodId: zqQxValue,
                    pointList: pointListP,
                    stcd: that.show_stcd
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
                    url: apiUrl_cloud + "api-rainsituation/real/addRiverZQ",
                    data: info,
                    success: function (data) {
                        var res = data;
                        if (res.code != 200) {
                            tools.loadinghide(false);
                            tools.show_message_error_const("保存预报修改数据失败!");
                            return;
                        }
                        that.is_modify = false;
                        tools.show_message_success("保存预报修改数据成功!");
                        tools.loadinghide(false);
                        //保存成功之后消除当前页面线
                        let option = that.chartQx.getOption()
                        option.legend[0].data.pop()
                        option.series.pop()
                        that.chartQx.setOption(option, true)
                        //保存之后重新初始化所有ZQ曲线
                        that.init_ZQ_All()
                    },
                    error: function (errorMsg) {
                        tools.loadinghide(false);
                        tools.show_message_error("保存预报修改数据失败!");
                    }
                });
            }, function () {
                return;
            });
        })

        $("#zqQx_all").delegate('#select_zqQx_all', 'change', function (event) {
            let zqQxValue = $("#select_zqQx_all  option:selected").val();
            let zqQxText = $("#select_zqQx_all  option:selected").text();
            // console.log("zqQxValue:"+zqQxValue+"   zqQxText:"+zqQxText)
            if (!zqQxValue || !zqQxText) {
                return
            }

            let param = {
                bgtm: zqQxValue,
                lnnm: zqQxText,
                stcd: that.show_stcd
            }
            var info = JSON.stringify(param);
            $.ajax({
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                async: true,
                headers: {
                    "Authorization": getCookie("accessToken")
                },
                url: apiUrl_cloud + "api-rainsituation/real/getZqrlInfo",
                data: info,
                success: function (data) {
                    var res = data;
                    let floodData = []
                    if (res.code !== 200) {
                        tools.show_message_error("获取ZQ数据失败!");
                        tools.loadinghide(false);
                        return
                    }

                    if (res.data.pointList.length === 0) {
                        tools.show_message_error("未获取到ZQ数据!");
                        tools.loadinghide(false);
                        return
                    }

                    $.each(res.data.pointList, function (i, data) {
                        floodData.push({
                            value: [Number(data.q), Number(data.z)]
                        })
                    })

                    let option = that.chartQx.getOption()
                    let colors = option.gradientColor
                    // if (option.legend[0].data.length > colors.length) {
                    //     option.legend[0].data.pop()
                    //     option.series.pop()
                    // }
                    option.legend[0].data.push(zqQxText)
                    //永远加在倒数第2个
                    option.series.splice(option.series.length-2 , 1 ,{
                        type: 'line',
                        name: zqQxText,
                        symbol: "circle",
                        lineStyle: {
                            color: '#0F347B'
                        },
                        itemStyle: {
                            color: '#1E9BD1'
                        },
                        showSymbol: false,
                        connectNulls: true, //连接空数据
                        smooth: true, //平滑显示曲线
                        smoothMonotone: "none",
                        data: floodData
                    })
                    that.chartQx.setOption(option, true);
                },
                error: function (errorMsg) {
                    tools.show_message_error("获取ZQ数据失败!");
                    tools.loadinghide(false);
                }
            });

        })



        //修改水位流量关系曲线============================================================== end
    },
    echartSetGraphic: function () {
        var that = this;
        that.chartGcx.setOption({
            graphic: that.modifyData.map(function (item, dataIndex) {
                return {
                    type: 'circle',
                    position: that.chartGcx.convertToPixel({
                        xAxisId: 'xAxis_time',
                        yAxisId: 'yAxis_ll'
                    }, item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: 10 / 2
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: function (dx, dy) {
                        that.onPointDragging(dataIndex, [dx.offsetX, dx.offsetY]);
                    },
                    onmousemove: function () {
                        that.showTooltip(dataIndex);
                    },
                    onmouseout: function () {
                        that.hideTooltip(dataIndex);
                    },
                    z: 100
                };
            })
        });
    },
    //预报数据拖动——山东云平台版本
    onPointDragging: function (dataIndex, pos) {
        var that = this;
        that.modifyData[dataIndex] = that.chartGcx.convertFromPixel({
            xAxisId: 'xAxis_time',
            yAxisId: 'yAxis_ll'
        }, pos);
        that.modifyData[dataIndex][1] = tools.format_ll(that.modifyData[dataIndex][1]);
        // that.modifyData[dataIndex][0] = that.chartGcx.getOption().xAxis[0].axisPointer.value;
        // Update data
        that.chartGcx.setOption({
            series: [{
                id: "xzll",
                data: that.modifyData
            }]
        })
        // var option = that.chartGcx.getOption();
        // option.series[option.series.length - 1].data = that.modifyData;
        // that.chartGcx.setOption(option);
    },
    //预报数据拖动——山东云平台版本
    updatePosition: function () {
        var that = this;
        that.chartGcx.setOption({
            graphic: that.modifyData.map(function (item, dataIndex) {
                return {
                    position: that.chartGcx.convertToPixel({
                        xAxisId: 'xAxis_time',
                        yAxisId: 'yAxis_ll'
                    }, item)
                };
            })
        });
    },
    //预报数据拖动——山东云平台版本
    showTooltip: function (dataIndex) {
        var that = this;
        that.chartGcx.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    },
    //预报数据拖动——山东云平台版本
    hideTooltip: function (dataIndex) {
        var that = this;
        that.chartGcx.dispatchAction({
            type: 'hideTip'
        });
    },

    //水位流量修正start
    //预报数据拖动——山东云平台版本
    onPointDraggingQx: function (dataIndex, pos) {
        var that = this;
        that.modifyDataQx[dataIndex].value = that.chartQx.convertFromPixel({
            xAxisId: 'll_x',
            yAxisId: 'sw_y'
        }, pos);
        that.modifyDataQx[dataIndex].value[0] = tools.format_ll(that.modifyDataQx[dataIndex].value[0]);
        that.modifyDataQx[dataIndex].value[1] = tools.format_sw(that.modifyDataQx[dataIndex].value[1]);
        // that.modifyData[dataIndex][0] = that.chartGcx.getOption().xAxis[0].axisPointer.value;
        // Update data
        that.chartQx.setOption({
            series: [{
                id: "ZQXZ",
                data: that.modifyDataQx
            }]
        })
        // var option = that.chartGcx.getOption();
        // option.series[option.series.length - 1].data = that.modifyData;
        // that.chartGcx.setOption(option);
    },
    //预报数据拖动——山东云平台版本
    updatePositionQx: function () {
        var that = this;
        that.chartQx.setOption({
            graphic: that.modifyDataQx.map(function (item, dataIndex) {
                return {
                    position: item.value
                };
            })
        });
    },
    //预报数据拖动——山东云平台版本
    showTooltipQx: function (dataIndex) {
        var that = this;
        that.chartQx.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    },
    //预报数据拖动——山东云平台版本
    hideTooltipQx: function (dataIndex) {
        var that = this;
        that.chartQx.dispatchAction({
            type: 'hideTip'
        });
    },
    //水位流量修正end




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
        // that.updateChartGcxGraphic();
    },


    setDragPointShowOrHide: function (type, index, isupdatenow) {
        /*var that = this;
        //刷新拖动点
        if ($(".ybsw-modify").is(":visible")) {

            if (type == 1) {
                if (that.obj_data_gcx_bk.ybsw[index].value[1] != that.obj_data_gcx.ybsw[index].value[1]) {

                    that.obj_yb_graphic.arr_graphic[index].invisible = true;
                }
                else {
                    that.obj_yb_graphic.arr_graphic[index].invisible = true;

                    that.obj_data_gcx_y_modifyIndex.ybsw.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ybsw), 1);


                }

            }
            if (type == 2) {
                if (that.show_sttp == "RR") {
                    if (that.obj_data_gcx_bk.ll_in[index].value[1] != that.obj_data_gcx.ll_in[index].value[1]) {

                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;

                    }
                    else {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                        that.obj_data_gcx_y_modifyIndex.ll_in.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ll_in), 1);
                    }
                }
                else {
                    if (that.obj_data_gcx_bk.ll_in[index].value[1] != that.obj_data_gcx.ybll[index].value[1]) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;

                    }
                    else {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                        that.obj_data_gcx_y_modifyIndex.ll_in.splice($.inArray(index, that.obj_data_gcx_y_modifyIndex.ll_in), 1);
                    }

                }

            }
            if (isupdatenow) {
                that.updateChartGcxGraphic();
            }

        }
        */
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
                    that.obj_yb_graphic.arr_graphic[index].invisible = true;
                });
            }
            if ((type == 2) || (type == 3)) {
                if (that.show_sttp == "RR") {
                    $.each(that.obj_data_gcx.ll_in, function (index, value) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].position = that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, that.obj_data_gcx.ll_in[index].value);
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                    });
                } else {
                    $.each(that.obj_data_gcx.ybll, function (index, value) {
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].position = that.chartGcx.convertToPixel({
                            xAxisIndex: 0,
                            yAxisIndex: 1
                        }, that.obj_data_gcx.ybll[index].value);
                        that.obj_yb_graphic.arr_graphic[that.obj_data_gcx.ybsw.length + index].invisible = true;
                    });
                }
            }
            // that.updateChartGcxGraphic();

        }
    },

    change_table_jh_input: function () {

        var that = this;
        $("#contProLine .tableSqxx").on("input propertychange", "input", function () {
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
                //更改保存的数据
                $.each(that.simlineData, function (i, data) {
                    if (that.obj_data_gcx.ybsw[rowIndex].value[0] == data.tm) {
                        data.z = val;
                    }
                })

                that.update_ybsw_option();
                // that.reflashDragPoint(1);

                var state = that.chartGcx.getOption().legend[0].selected.预报水位;
                if (state == true) {
                    // that.setDragPointShowOrHide(1, rowIndex, true);

                }
                //修改后的值与特征统计表中的洪峰水位洪峰流量比较
                if (that.show_sttp == "RR") {
                    if (val > that.ybzgsw) {
                        // $("#contProLine .table_ybtj tbody tr:eq(0)").find('td:eq(3)').val(val)
                        $("#contProLine .table_ybtj tbody tr").each(function (i, item) {
                            $(this).find('td:eq(3)').html(val)
                        })
                    }
                } else {
                    if (val > that.hfsw) {
                        $("#contProLine .table_ybtj tbody tr").each(function (i, item) {
                            $(this).find('td:eq(1)').html(val)
                        })
                        //  $("#contProLine .table_ybtj tbody tr")[0].find('td:eq(1)').val(val)
                    }
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
                    //更改保存的数据
                    $.each(that.simlineData, function (i, data) {
                        if (that.obj_data_gcx.ll_in[rowIndex].value[0] == data.tm) {
                            data.q = val;
                        }
                    })
                } else {

                    that.obj_data_gcx.ybll[rowIndex].value[1] = val;
                    that.obj_data_gcx_y_value.ll_in[rowIndex] = val;
                    that.chartGcx.setOption({
                        series: [{
                            id: 'id_series_ybll',
                            data: that.obj_data_gcx.ybll
                        }],

                    });
                    //更改保存的数据
                    $.each(that.simlineData, function (i, data) {
                        if (that.obj_data_gcx.ybll[rowIndex].value[0] == data.tm) {
                            data.q = val;
                        }
                    })
                    //修改后的值与特征统计表中的洪峰水位洪峰流量比较
                    if (val > that.hfll) {
                        // $("#contProLine .table_ybtj tbody tr:eq(0)").find('td:eq(1)').val(val)
                        $("#contProLine .table_ybtj tbody tr").each(function (i, item) {
                            $(this).find('td:eq(3)').html(val)
                        })
                    }
                }

                that.update_ybll_option();
                // that.reflashDragPoint(2);
                // that.setDragPointShowOrHide(2, rowIndex, true);



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
        $("#kzztz_table thead").html("");
        $("#kzztz_table tbody").html("");
        $("#kzztz_table thead").append(html_th.toString());
        $("#kzztz_table tbody").append(html_td.toString());
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

        ////////////初始化面板时间////////////
        //旬月均值开始和结束时间  前推12个月
        $("#txtBeginTimeXY").val(moment().add(-12, 'months').format("YYYY-MM-DD"));
        $("#txtEndTimeXY").val(moment().format("YYYY-MM-DD"));
        //对比分析开始和结束时间  前推一个月
        $("#txtBeginTimeDbfx,#txtBeginTimeDbfx2").val(moment().add(-1, 'months').format("YYYY-MM-DD"));
        $("#txtEndTimeDbfx,#txtEndTimeDbfx2").val(moment().format("YYYY-MM-DD"));
        $("#txtComYear").val(new Date().getFullYear() - 1);

        that.panel_actual_width = panelConfig.panel_default_width;
        that.panel_actual_height = that.show_type == "1" ? panelConfig.panel_default_height : panelConfig.panel_default_height2;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }
        if (that.show_type == "1") {
            $(that.parentId).show();
            $(that.parentId).find(".panel-header").css({
                "text-align": "left"
            });
            $(that.parentId).css({
                "top": "50%",
                "left": "50%",
                "margin-left": "-" + that.panel_actual_width / 2 + "px",
                "margin-top": "-" + that.panel_actual_height / 2 + "px"
            });

            $(".tj_body").hide();
            $("#contProLine .content-left").css("margin-right", 425);
            $("#contProLine .sidebar-right,#contProLine .sidebar-control-right").show();
            $("#contProLine .field_yb").hide();
            $("#btn_ybsw-modify").bootstrapSwitch("destroy");
            $("#btn_ybsw-modify").css({
                "display": "none"
            });
            $("#modifyNote").hide();
            $("#btn_ybsw-getRain").css({
                "display": "none"
            });

            $("#btn_ybsw-zoom").css({
                "display": "none"
            });
            $("#btn_ybsw-save").css({
                "display": "none"
            });
            $("#btn_ybsw-updaily").css({
                "display": "none"
            });
            $("#data_out_stcd").css({
                "display": "none"
            });
            $("#data_in_stcd").css({
                "display": "none"
            });
            $("#treeMenuSw").show();
            $("#panelSw .form-inline").css({
                "float": "left",
                "margin-left": 200 + "px",

            })

        } else {
            if (that.show_all) {
                //全部站统计表
                $(".tj_body").show();
                $("#btn_ybsw-modify").css({
                    "display": "none"
                });
                $("#btn_ybsw-getRain").css({
                    "display": "none"
                });
                $("#btn_ybsw-zoom").css({
                    "display": "none"
                });
                $("#btn_ybsw-save").css({
                    "display": "none"
                });
                $("#btn_ybsw-updaily").css({
                    "display": "none"
                });
                //2019-10-12 add by chl
                $("#treeMenuSw").hide();
                $("#panelSw .form-inline").css({
                    "float": "none",
                    "margin-left": 0

                })

                if (that.show_type == "3") {
                    $("#linkTj_Xx").parent().show();
                    $("#linkTj_Kzztz").parent().show(); //2019-11-15 add by chl
                } else {
                    $("#linkTj_Xx").parent().hide();
                    $("#linkTj_Kzztz").parent().hide(); //2019-11-15 add by chl
                }
                $("#contProLine .sidebar-right,#contProLine .sidebar-control-right").hide();
                $("#contProLine .field_yb").hide();
                $(that.parentId).find(".panel-header").css({
                    "text-align": "center"
                });
                //查询统计表
                if (that.show_type == "3") {

                    $("#contTj_Hd .tableHdheader").find("tr").eq(0).children().eq(1).html("洪峰流量");
                    $("#contTj_Hd .tableHdheader").find("tr").eq(0).children().eq(3).html("洪峰水位");

                } else {


                    $("#contTj_Hd .tableHdheader").find("tr").eq(0).children().eq(1).html("洪峰水位");
                    $("#contTj_Hd .tableHdheader").find("tr").eq(0).children().eq(3).html("洪峰流量");

                }
            } else {
                //单站统计表
                $(that.parentId).show();

                //2019-10-12 add by chl
                $("#treeMenuSw").show();
                $("#panelSw .form-inline").css({
                    "float": "left",
                    "margin-left": 200 + "px",

                })

                $(".tj_body").hide();
                if (that.show_type == "2") {
                    if (isCgxz) {
                        if (isYj) {
                            closeModifyBtn();
                        } else if (isSaveForPro) {
                            $("#btn_ybsw-modify").bootstrapSwitch();
                            $("#btn_ybsw-modify").bootstrapSwitch("state", false);
                            $("#modifyNote").show();
                            $("#btn_ybsw-getRain").show();
                            $("#btn_ybsw-save").show();
                            $("#btn_ybsw-updaily").show();
                        } else {
                            $("#btn_ybsw-modify").bootstrapSwitch();
                            $("#btn_ybsw-modify").bootstrapSwitch("state", true);
                            $("#modifyNote").show();
                            $("#btn_ybsw-getRain").show();
                            $("#btn_ybsw-save").show();
                            $("#btn_ybsw-updaily").show();
                        }
                    } else {
                        closeModifyBtn();
                    }
                } else {
                    closeModifyBtn();
                }


                $("#proLineBody").css("margin-top", 30);
                $("#contProLine .content-left").css("margin-right", 425);
                $("#contProLine .sidebar-right,#contProLine .sidebar-control-right").show();
                $("#contProLine .field_yb").show();
                $(that.parentId).find(".panel-header").css({
                    "text-align": "left"
                });
            }
            that.modifyFormInline(that.panel_actual_width);
            $(that.parentId).css({
                "top": "50%",
                "left": "50%",
                "margin-left": "-" + that.panel_actual_width / 2 + "px",
                "margin-top": "-" + that.panel_actual_height / 2 + "px"
            });
        }
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

        //根据站类显示不同的内容
        var _html_header = "";
        if (that.show_type == "2" || that.show_type == "3") {
            if (that.show_all) {
                if (that.show_type == "2") {
                    _html_header = searchRangeName + "各站点预报特征统计表";
                } else {
                    _html_header = "调度后" + searchRangeName + "各站点特征统计表";
                }
            } else {
                if (that.show_type == "2") {
                    _html_header = "站点预报详细信息-" + _stnm;
                    //滚动条到最新实时数据位置
                } else {
                    _html_header = "站点调度后详细信息-" + _stnm;
                }

            }
        }
        var days_forward_gcx = -3;
        if (that.show_sttp == "ZZ") {
            $("#linkQx").show();
        } else {
            $("#linkQx").hide();
        }
        if (that.show_type == "2") {
            $("#linkMxxz").show();
        } else {
            $("#linkMxxz").hide();
        }
        if (that.show_sttp == "ZZ") {
            $("#link_ZV").hide();
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "河道站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig.days_forward_zz;
        } else if (that.show_sttp == "DD") {
            //$("#link_ZV").show();
            $("#link_ZV").hide();
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "闸坝站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig.days_forward_dd;
        } else if (that.show_sttp == "RR") {
            $("#link_ZV").show();
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "水库站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = panelConfig.days_forward_rr;
        }
        if (_btime == "" || _btime == null || _btime == undefined) {
            that.show_btime = moment(_time).add(days_forward_gcx, 'days').format("YYYY-MM-DD 08:00:00");
        } else {
            that.show_btime = _btime;
        }

        //默认显示过程线
        if (!((that.show_type == "2" || that.show_type == "3") && that.show_all)) {
            $("#linkProLine").click();
        }

        //
        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true, //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig.panel_default_height,
            minWidth: panelConfig.panel_default_width,
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
    create_qjt: function () {
        var that = this;
        //获取数据
        $.ajax({
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_xj + "get_Stcd_VR?stcd=" + that.show_stcd,
            success: function (res) {

                if (res.code != "1") {
                    tools.show_message_error("获取全景图信息失败!");
                    return;
                }

                if (res.data.length == 0) {
                    tools.show_message_error("获取全景图信息失败!");
                    return;
                }
                $("#ifram_qjt").attr("src", res.data[0].url);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取全景图信息失败!");
                return;
            }
        });
    },
    create_spjk: function () {
        var that = this;
        $("#ifram_spjk").attr("src", "http://10.37.1.43/ybdd_jk_web/?stcd=" + that.show_stcd);

    },
    /**
     * 生成表格-基本信息
     **/
    create_table_jbxx: function () {
        var that = this;
        //先清空表格
        $("#contStatinInfo .table-jbxx tr").remove();

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
                if (json_res.code != "0") {
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

                $("#contStatinInfo .table-jbxx").append(html_empty.toString());
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
        $("#contStatinInfo .table-jbxx tr").remove();
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
                if (json_res.code != "0") {
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

                $("#contStatinInfo .table-jbxx").append(_html);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取基本信息失败!");
                return;
            }
        });
    },
    /**
     * 水位流量过程线（实况）
     **/
    echart_line_gcx_real: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig.MIN_NUM,
            bzsw: panelConfig.MIN_NUM,
            xxsw: panelConfig.MIN_NUM,
            zcsw: panelConfig.MIN_NUM,
            sjsw: panelConfig.MIN_NUM,
            jhsw: panelConfig.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showZcsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            },
            ll: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
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
        var objData = {
            stcd: that.show_stcd,
            startTime: searchStime,
            endTime: searchEtime,
        };
        var info = JSON.stringify(objData);

        //等待框
        tools.showChartLoading(that.chartGcx);
        //实时水情
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-realsituate/GetWshedRealGcx",
            data: info,
            //url: that.ApiUrlPath + "/getSwGcx",
            //data: "{'stime':'" + stime + "','etime':'" + etime + "','stcd':'" + that.show_stcd + "','sttp':'" + that.show_sttp + "','userId':'" + $("#_hid_userid").val() + "'}",
            success: function (data) {
                var res = data.data;
                if (res == "" || res == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(实时水情)失败!");
                    return;
                }
                var json = res;
                if (json.code == "0") {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error(json.msg);
                    return;
                }

                //解析实时水情
                //思路：循环一遍数据即可获取图表数据源+最大最小值
                //特征水位获取
                if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                    that.obj_fcch_gcx.jjsw = json.Jjsw == "" ? panelConfig.MIN_NUM : Number(json.Jjsw);
                    that.obj_fcch_gcx.bzsw = json.Bzsw == "" ? panelConfig.MIN_NUM : Number(json.Bzsw);
                } else {
                    if (json.hasOwnProperty("Xxsw")) {
                        that.obj_fcch_gcx.xxsw = json.Xxsw == "" ? panelConfig.MIN_NUM : Number(json.Xxsw);
                    } else {
                        that.obj_fcch_gcx.zcsw = json.Zcxsw == "" ? panelConfig.MIN_NUM : Number(json.Zcxsw);
                    }
                    that.obj_fcch_gcx.sjsw = json.Sjsw == "" ? panelConfig.MIN_NUM : Number(json.Sjsw);
                    that.obj_fcch_gcx.jhsw = json.Jhsw == "" ? panelConfig.MIN_NUM : Number(json.Jhsw);
                }

                //河道：时间,水位,流量,水势   闸坝：时间,闸上水位,闸下水位,流量,水势   水库：时间,水位,入库流量,出库流量,蓄量
                if (json.data != "" && json.data.length != undefined && json.data.length > 0) {
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
                        if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.jjsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.jjsw]
                            });
                            that.obj_data_gcx.jjsw.push({
                                value: [maxTime, that.obj_fcch_gcx.jjsw]
                            });
                        }

                        //保证水位
                        if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.bzsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.bzsw]
                            });
                            that.obj_data_gcx.bzsw.push({
                                value: [maxTime, that.obj_fcch_gcx.bzsw]
                            });
                        }
                    } else if (that.show_sttp == "RR") {
                        //汛限水位
                        if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.xxsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.xxsw]
                            });
                            that.obj_data_gcx.xxsw.push({
                                value: [maxTime, that.obj_fcch_gcx.xxsw]
                            });
                        }
                        //正常水位
                        if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.zcsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.zcsw]
                            });
                            that.obj_data_gcx.zcsw.push({
                                value: [maxTime, that.obj_fcch_gcx.zcsw]
                            });
                        }
                        //设计水位
                        if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.sjsw.push({
                                value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.sjsw]
                            });
                            that.obj_data_gcx.sjsw.push({
                                value: [maxTime, that.obj_fcch_gcx.sjsw]
                            });
                        }
                        //校核水位
                        if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
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
                if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                    that.obj_fcch_gcx.showJjsw = true;
                } else {
                    that.obj_fcch_gcx.showJjsw = false;
                }
                if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                    that.obj_fcch_gcx.showBzsw = true;
                } else {
                    that.obj_fcch_gcx.showBzsw = false;
                }
                if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                    that.obj_fcch_gcx.showXxsw = true;
                } else {
                    that.obj_fcch_gcx.showXxsw = false;
                }
                if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.zcsw) {
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
    echart_line_gcx_for_new: function (stime, etime, isRh) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig.MIN_NUM,
            bzsw: panelConfig.MIN_NUM,
            xxsw: panelConfig.MIN_NUM,
            zcsw: panelConfig.MIN_NUM,
            sjsw: panelConfig.MIN_NUM,
            jhsw: panelConfig.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true,
            showZcsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            },
            ll: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            },
            rain: {
                max: panelConfig.MIN_NUM
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
            ybsw: new Array(), //现在新版本融合曲线为ybsw、ybll和ll_in，其他模型为model1、2、3
            ybll: new Array(),
            jjsw: new Array(),
            bzsw: new Array(),
            xxsw: new Array(),
            zcsw: new Array(),
            sjsw: new Array(),
            jhsw: new Array(),
            rain: new Array(),
            ybsw_model1: new Array(),
            ybsw_model2: new Array(),
            ybsw_model3: new Array(),
            ybll_model1: new Array(),
            ybll_model2: new Array(),
            ybll_model3: new Array(),
            ll_in_model1: new Array(),
            ll_in_model2: new Array(),
            ll_in_model3: new Array(),
            sw_fbs: new Array(),
            ll_fbs: new Array()
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
        var objData;
        that.obj_data_gcx_cloud = new Array(); //云平台，动态模型数据

        //当就行成果修正时，只展示选择需要修改的基准模型的数据其他模型不展示——add by chl 2022.6.15
        if (isCgxz) {
            objData = {
                adjust: 1,
                endTime: searchEtime,
                foreDays: Number(selectDays),
                model: modifyModel,
                modelId: that.treeData,
                plan: Number(searchPlan),
                range: Number(searchRange),
                startTime: searchStime,
                plusType: _plusType,
                rainPlus: _rainPlus,
                hisStormId: _hisStormId,
                stcd: that.show_stcd,
                meteorPattern: meteor
            };
        } else {
            objData = {
                adjust: 1,
                endTime: searchEtime,
                foreDays: Number(selectDays),
                model: selectModes,
                modelId: that.treeData,
                plan: Number(searchPlan),
                range: Number(searchRange),
                startTime: searchStime,
                plusType: _plusType,
                rainPlus: _rainPlus,
                hisStormId: _hisStormId,
                stcd: that.show_stcd,
                meteorPattern: meteor
            };
        }


        //预报最后时刻时间
        that.forEndTime = moment(searchEtime).add(Number(selectDays), 'days').format("YYYY-MM-DD HH:mm:ss");

        if (that.treeData != null) {
            objData.model = null;

        }
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
                if (res == "" || res == null || res.data == "" || res.data == null) {
                    tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(预报信息)失败!");
                }

                var jsonFor = res;

                //add by chl 20200403 导出数据及类型赋值
                outjsonStcd = jsonFor;
                outshow_sttp = that.show_sttp;

                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {
                    //echarts实例-过程线
                    that.chartGcx = echarts.init($("#proLineBody")[0]);
                    jsonFor = jsonFor.data;

                    //判断有几个模型
                    var model = jsonFor.calmodel;
                    if (that.treeData != null) {
                        //"0_API2_0%,0_API6_0%,0_MGE2_0%,0_XAJ2_0%,"
                        //"API6,API2,XAJ2,MGE2"
                        model = "";
                        var arr1 = that.treeData.split(",");
                        $.each(arr1, function (index, item) {
                            var arr2 = item.split("_");
                            if (arr2.length == 3) {
                                if (model == "")
                                    model += arr2[1];
                                else
                                    model += "," + arr2[1];
                            }
                        })
                    }
                    var modelArr = model.split(",");
                    //只有单个模型
                    if (modelArr.length == 1) {
                        that.modelData = []
                        that.creatEchartsAndTable(jsonFor[model], model);
                        that.modelData.push({
                            modelName: model,
                            data: jsonFor[model]
                        })
                    } else { //多个模型  多个模型时不展示产汇流区间以及上游流量，只展示水位流量
                        //取公共值、实时水位流量数据及生成表格
                        var jsonForModel;
                        var tjTableData = {
                            statisName: new Array(),
                            statis: new Array(),
                            model: new Array()
                        };
                        jsonForModel = jsonFor[modelArr[0]];
                        tjTableData.statisName.push(jsonFor[modelArr[0]].statisName); //表头都一样，只取一个
                        for (var i = 0; i < modelArr.length; i++) {
                            //收集统计表信息
                            tjTableData.statis.push(jsonFor[modelArr[i]].statis);
                            tjTableData.model.push(modelArr[i])
                        }
                        //特征值获取 从统计表中提取
                        try {
                            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") { //河道
                                that.obj_fcch_gcx.jjsw = (jsonForModel.Jjsw == "" || jsonForModel.Jjsw == "0") ? panelConfig.MIN_NUM : Number(jsonForModel.Jjsw);
                                that.obj_fcch_gcx.bzsw = (jsonForModel.Bzsw == "" || jsonForModel.Bzsw == "0") ? panelConfig.MIN_NUM : Number(jsonForModel.Bzsw);
                            } else { //水库、湖泊
                                if (jsonForModel.hasOwnProperty("Xxsw")) {
                                    that.obj_fcch_gcx.xxsw = jsonForModel.Xxsw == "" ? panelConfig.MIN_NUM : Number(jsonForModel.Xxsw);
                                } else {
                                    that.obj_fcch_gcx.zcsw = jsonForModel.Zcxsw == "" ? panelConfig.MIN_NUM : Number(jsonForModel.Zcxsw);
                                }
                                that.obj_fcch_gcx.sjsw = (jsonForModel.Sjsw == "" || jsonForModel.Sjsw == "0") ? panelConfig.MIN_NUM : Number(jsonForModel.Sjsw);
                                that.obj_fcch_gcx.jhsw = (jsonForModel.Jhsw == "" || jsonForModel.Jhsw == "0") ? panelConfig.MIN_NUM : Number(jsonForModel.Jhsw);
                            }
                        } catch (e) {}
                        if ((that.show_type == "2" || that.show_type == "3") && !that.show_all) {
                            //生成表格
                            that.create_table_sqxx_new2(jsonFor.tableData, jsonFor.tableName, tjTableData, model);
                            if (that.show_type == "2") {
                                var tr_ssd = document.getElementsByClassName("tr_ssd");
                                if ($(tr_ssd[tr_ssd.length - 5]).get(0) != undefined)
                                    $("#contProLine .ybsq-table-body").animate({
                                        scrollTop: $(tr_ssd[tr_ssd.length - 5]).get(0).offsetTop
                                    }, 100); //定位tr
                            }
                        }

                        //绘图-默认显示第一个模型
                        //先获取流量/入库流量最后一段都为0或者空的数据 提取出最后为空的时刻
                        var arrQ = new Array();
                        var arrQin = new Array();
                        var emptyTM = "";
                        var emptyAll = true;
                        var emptyTM_In = "";
                        var emptyAll_In = true;
                        $.each(jsonForModel.data, function (index, item) {
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
                        $.each(jsonForModel.data, function (index, item) {
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
                        });
                        //处理数据警戒水位 保证水位 汛限水位数据源
                        if (that.obj_data_gcx.rain != null && that.obj_data_gcx.rain.length > 0) {
                            var maxTime = that.obj_data_gcx.rain[that.obj_data_gcx.rain.length - 1].value[0];
                            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                                //警戒水位
                                if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                                    that.obj_data_gcx.jjsw.push({
                                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jjsw]
                                    });
                                    that.obj_data_gcx.jjsw.push({
                                        value: [maxTime, that.obj_fcch_gcx.jjsw]
                                    });
                                }
                                //保证水位
                                if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                                    that.obj_data_gcx.bzsw.push({
                                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.bzsw]
                                    });
                                    that.obj_data_gcx.bzsw.push({
                                        value: [maxTime, that.obj_fcch_gcx.bzsw]
                                    });
                                }
                            } else if (that.show_sttp == "RR") {
                                //汛限水位
                                if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                                    that.obj_data_gcx.xxsw.push({
                                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.xxsw]
                                    });
                                    that.obj_data_gcx.xxsw.push({
                                        value: [maxTime, that.obj_fcch_gcx.xxsw]
                                    });
                                }
                                //正常水位
                                if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                                    that.obj_data_gcx.zcsw.push({
                                        value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.zcsw]
                                    });
                                    that.obj_data_gcx.zcsw.push({
                                        value: [maxTime, that.obj_fcch_gcx.zcsw]
                                    });
                                }
                                //设计水位
                                if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                                    that.obj_data_gcx.sjsw.push({
                                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.sjsw]
                                    });
                                    that.obj_data_gcx.sjsw.push({
                                        value: [maxTime, that.obj_fcch_gcx.sjsw]
                                    });
                                }
                                //校核水位
                                if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
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
                        if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                            that.obj_fcch_gcx.showJjsw = true;
                        } else {
                            that.obj_fcch_gcx.showJjsw = false;
                        }
                        if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                            that.obj_fcch_gcx.showBzsw = true;
                        } else {
                            that.obj_fcch_gcx.showBzsw = false;
                        }
                        if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                            that.obj_fcch_gcx.showXxsw = true;
                        } else {
                            that.obj_fcch_gcx.showXxsw = false;
                        }
                        if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
                            that.obj_fcch_gcx.showSjsw = true;
                        } else {
                            that.obj_fcch_gcx.showSjsw = false;
                        }
                        if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
                            that.obj_fcch_gcx.showJhsw = true;
                        } else {
                            that.obj_fcch_gcx.showJhsw = false;
                        }
                        if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.zcsw) {
                            that.obj_fcch_gcx.showZcsw = true;
                        } else {
                            that.obj_fcch_gcx.showZcsw = false;
                        }

                        //各模型预报数据
                        that.modelData = [];
                        $.each(modelArr, function (i, item) {
                            $.each(jsonFor, function (j, data) {
                                if (item == j) {
                                    that.modelData.push({
                                        modelName: item,
                                        data: data
                                    })
                                }
                            })
                        })
                        that.obj_data_gcx_cloud = [];
                        //数据解析，将个模型数据整理得到各模型对应水位流量
                        $.each(that.modelData, function (index, item) {
                            // that.obj_data_gcx_cloud[index] = new Array();
                            that.obj_data_gcx_cloud.push({
                                modelName: item.modelName,
                                data: {
                                    ybsw: new Array(),
                                    ybll: new Array(),
                                    ll_in: new Array()
                                }
                            });
                            $.each(item.data.data, function (i, data) {
                                //预报水位
                                if (data.Zs != "" && data.Zs != "0") {
                                    that.obj_data_gcx_cloud[index].data.ybsw.push({
                                        value: [data.TM, data.Zs]
                                    });
                                    that.obj_minMax_gcx.sw.min = Math.min(Number(data.Zs), that.obj_minMax_gcx.sw.min);
                                    that.obj_minMax_gcx.sw.max = Math.max(Number(data.Zs), that.obj_minMax_gcx.sw.max);
                                } else {
                                    that.obj_data_gcx_cloud[index].data.ybsw.push({
                                        value: [data.TM, 0]
                                    });
                                    that.obj_minMax_gcx.sw.min = Math.min(Number(0), that.obj_minMax_gcx.sw.min);
                                    that.obj_minMax_gcx.sw.max = Math.max(Number(0), that.obj_minMax_gcx.sw.max);
                                }
                                //预报流量(水库代表实测出库)
                                if (that.show_sttp == "RR") { //水库
                                    if (data.Qs != "" && data.Qs != "0") { //水库的 qs 为出库流量,其他Qs 为预报流量
                                        that.obj_data_gcx_cloud[index].data.ybll.push({
                                            value: [data.TM, data.Qs]
                                        })
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(data.Qs), that.obj_minMax_gcx.ll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(data.Qs), that.obj_minMax_gcx.ll.max);
                                    } else {
                                        that.obj_data_gcx_cloud[index].data.ybll.push({
                                            value: [data.TM, 0]
                                        })
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                                    }
                                    if (!((emptyAll_In || !emptyAll_In && moment(data.TM).diff(moment(emptyTM_In), "minutes", true) >= 0))) {
                                        if (!(data.Qin == "" || data.Qin == "0")) {
                                            that.obj_data_gcx_cloud[index].data.ll_in.push({
                                                value: [data.TM, data.Qin]
                                            })
                                            that.obj_minMax_gcx.ll.min = Math.min(Number(data.Qin), that.obj_minMax_gcx.ll.min);
                                            that.obj_minMax_gcx.ll.max = Math.max(Number(data.Qin), that.obj_minMax_gcx.ll.max);
                                        } else {
                                            that.obj_data_gcx_cloud[index].data.ll_in.push({
                                                value: [data.TM, 0]
                                            })
                                            that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                                            that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                                        }
                                    }
                                } else { //非水库
                                    //非水库，qs预报流量即为各模型预报流量
                                    if (data.Qs != "" && data.Qs != "0") {
                                        that.obj_data_gcx_cloud[index].data.ybll.push({
                                            value: [data.TM, data.Qs]
                                        })
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(data.Qs), that.obj_minMax_gcx.ll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(data.Qs), that.obj_minMax_gcx.ll.max);
                                    } else {
                                        that.obj_data_gcx_cloud[index].data.ybll.push({
                                            value: [data.TM, 0]
                                        })
                                        that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                                        that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                                    }
                                }
                            })
                        })

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
                        if (jsonForModel.data != null && jsonForModel.data.length > 0) {
                            _minTime = jsonForModel.data[0].TM;
                            _maxTime = jsonForModel.data[jsonForModel.data.length - 1].TM;
                        }
                        var intervalX = that.get_axis_interval_gcx(_minTime, _maxTime);
                        //获取时间轴格式化字符串
                        var strFormatX = that.format_axis_label_gcx(_minTime, _maxTime);

                        //初始化图表
                        var option = {};
                        if (that.show_sttp == "RR") {
                            option = that.get_option_gcx_rr_for_cloud(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                        } else {
                            option = that.get_option_gcx_for_cloud(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                        }

                        //动态添加各模型曲线
                        // var colors = ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85'];
                        $.each(that.obj_data_gcx_cloud, function (i, item) {
                            option.legend.data.push(item.modelName + "水位", item.modelName + "流量");
                            if (i == 0) {
                                option.legend.selected[item.modelName + "水位"] = true;
                                option.legend.selected[item.modelName + "流量"] = true;
                            } else {
                                option.legend.selected[item.modelName + "水位"] = false;
                                option.legend.selected[item.modelName + "流量"] = false;
                            }
                            if (that.show_sttp == "RR" && i == 0) {
                                option.legend.data.push("出库流量");
                                option.legend.selected["出库流量"] = true;
                                option.series.push({
                                    name: "出库流量",
                                    type: 'line',
                                    yAxisIndex: 1,
                                    symbol: "image://Images/empty.png",
                                    symbolSize: 1,
                                    showSymbol: false,
                                    hoverAnimation: false,
                                    itemStyle: {
                                        color: panelConfig.ECHART_COLOR_LL
                                    },
                                    lineStyle: {
                                        type: "dashed"
                                    },
                                    data: item.data.ybll
                                });
                            }
                            option.series.push({
                                name: item.modelName + "水位",
                                type: 'line',
                                yAxisIndex: 0,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: tools.randomColor()
                                },
                                lineStyle: {
                                    type: "dashed"
                                },
                                data: item.data.ybsw
                            });
                            option.series.push({
                                name: item.modelName + "流量",
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: tools.randomColor(),
                                    emphasis: {
                                        focus: 'series'
                                    }
                                },
                                lineStyle: {
                                    type: "dashed",
                                },
                                data: that.show_sttp == "RR" ? item.data.ll_in : item.data.ybll
                            })
                        })

                        // 使用刚指定的配置项和数据显示图表。
                        option = tools.initChartlegendIcon(option);
                        that.chartGcx.setOption(option, true);

                        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

                        tools.hideChartLoading(that.chartGcx);

                        // $("#btn_ybsw-modify").bootstrapSwitch();
                        // $("#btn_ybsw-modify").bootstrapSwitch("state",false)
                    }
                }
            },
            error: function (errorMsg) {
                tools.hideChartLoading(that.chartGcx);
                tools.show_message_error("查询过程线(预报信息)失败!");
            }
        });
    },

    creatEchartsAndTable: function (jsonFor, model) {
        var that = this;

        //记录特征值用于预报修改获得相关水位接口
        that.feature = [];
        that.feature = jsonFor.statis[0];

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
                that.obj_fcch_gcx.jjsw = (jsonFor.Jjsw == "" || jsonFor.Jjsw == "0") ? panelConfig.MIN_NUM : Number(jsonFor.Jjsw);
                that.obj_fcch_gcx.bzsw = (jsonFor.Bzsw == "" || jsonFor.Bzsw == "0") ? panelConfig.MIN_NUM : Number(jsonFor.Bzsw);
            } else { //水库、湖泊
                if (jsonFor.hasOwnProperty("Xxsw")) {
                    that.obj_fcch_gcx.xxsw = jsonFor.Xxsw == "" ? panelConfig.MIN_NUM : Number(jsonFor.Xxsw);
                } else {
                    that.obj_fcch_gcx.zcsw = jsonFor.Zcxsw == "" ? panelConfig.MIN_NUM : Number(jsonFor.Zcxsw);
                }
                that.obj_fcch_gcx.sjsw = (jsonFor.Sjsw == "" || jsonFor.Sjsw == "0") ? panelConfig.MIN_NUM : Number(jsonFor.Sjsw);
                that.obj_fcch_gcx.jhsw = (jsonFor.Jhsw == "" || jsonFor.Jhsw == "0") ? panelConfig.MIN_NUM : Number(jsonFor.Jhsw);
            }

        } catch (e) {}
        if ((that.show_type == "2" || that.show_type == "3") && !that.show_all) {
            //生成表格
            that.create_table_sqxx(jsonFor, model);
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

            if (that.show_sttp == "ZZ") {} else if (that.show_sttp == "DD") {
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
                if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.jjsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.jjsw]
                    });
                    that.obj_data_gcx.jjsw.push({
                        value: [maxTime, that.obj_fcch_gcx.jjsw]
                    });
                }
                //保证水位
                if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.bzsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.bzsw]
                    });
                    that.obj_data_gcx.bzsw.push({
                        value: [maxTime, that.obj_fcch_gcx.bzsw]
                    });
                }
            } else if (that.show_sttp == "RR") {
                //汛限水位
                if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.xxsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.xxsw]
                    });
                    that.obj_data_gcx.xxsw.push({
                        value: [maxTime, that.obj_fcch_gcx.xxsw]
                    });
                }
                //正常水位
                if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.zcsw.push({
                        value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.zcsw]
                    });
                    that.obj_data_gcx.zcsw.push({
                        value: [maxTime, that.obj_fcch_gcx.zcsw]
                    });
                }
                //设计水位
                if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.sjsw.push({
                        value: [that.obj_data_gcx.rain[0].value[0], that.obj_fcch_gcx.sjsw]
                    });
                    that.obj_data_gcx.sjsw.push({
                        value: [maxTime, that.obj_fcch_gcx.sjsw]
                    });
                }
                //校核水位
                if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
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
        if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
            that.obj_fcch_gcx.showJjsw = true;
        } else {
            that.obj_fcch_gcx.showJjsw = false;
        }
        if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
            that.obj_fcch_gcx.showBzsw = true;
        } else {
            that.obj_fcch_gcx.showBzsw = false;
        }
        if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
            that.obj_fcch_gcx.showXxsw = true;
        } else {
            that.obj_fcch_gcx.showXxsw = false;
        }
        if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
            that.obj_fcch_gcx.showSjsw = true;
        } else {
            that.obj_fcch_gcx.showSjsw = false;
        }
        if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
            that.obj_fcch_gcx.showJhsw = true;
        } else {
            that.obj_fcch_gcx.showJhsw = false;
        }
        if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.zcsw) {
            that.obj_fcch_gcx.showZcsw = true;
        } else {
            that.obj_fcch_gcx.showZcsw = false;
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

        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

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

            // that.updateChartGcxGraphic();



        }


        tools.hideChartLoading(that.chartGcx);
    },
    /**
     * 水位流量过程线（调度对比）
     * 传参为实际发生的开始+结束时间，返回结果为实际+自动预报（3天）的数据
     **/
    echart_line_gcx_dd: function (stime, etime) {
        var that = this;
        //初始化参数
        that.obj_fcch_gcx = {
            jjsw: panelConfig.MIN_NUM,
            bzsw: panelConfig.MIN_NUM,
            xxsw: panelConfig.MIN_NUM,
            zcsw: panelConfig.MIN_NUM,
            sjsw: panelConfig.MIN_NUM,
            jhsw: panelConfig.MIN_NUM,
            showJjsw: true,
            showBzsw: true,
            showXxsw: true,
            showSjsw: true,
            showJhsw: true,
            showZcsw: true
        };
        that.obj_minMax_gcx = {
            sw: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            },
            ll: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
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
            meteorPattern: meteor
        };
        var info = JSON.stringify(objData_dd);
        var url = apiUrl_cloud + "api-realsituate/GetGcxDisPatch";

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

                jsonDd = res.data;

                //特征值获取 从统计表中提取
                try {
                    if (that.show_sttp == "ZZ" || that.show_sttp == "DD") { //河道、闸坝
                        $.each(jsonDd.statis, function (i, item) {
                            that.obj_fcch_gcx.jjsw = (item[4] == "" || item[4] == "0") ? panelConfig.MIN_NUM : Number(item[4]);
                            that.obj_fcch_gcx.bzsw = (item[5] == "" || item[5] == "0") ? panelConfig.MIN_NUM : Number(item[5]);
                            return false;
                        });
                    } else {
                        $.each(jsonDd.statis, function (i, item) {
                            that.obj_fcch_gcx.xxsw = (item[5] == "" || item[5] == "0") ? panelConfig.MIN_NUM : Number(item[5]);
                            that.obj_fcch_gcx.sjsw = (item[6] == "" || item[6] == "0") ? panelConfig.MIN_NUM : Number(item[6]);
                            that.obj_fcch_gcx.jhsw = (item[7] == "" || item[7] == "0") ? panelConfig.MIN_NUM : Number(item[7]);
                            return false;
                        });
                    };
                    //var jsonTj = JSON.parse(tools_panel_all.ddTj_Data);
                    //if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                    //    $.each(jsonTj.dataHd, function (i, item) {
                    //        if (item.Stcd == that.show_stcd) {
                    //            that.obj_fcch_gcx.jjsw = (item.Jjsw == "" || item.Jjsw == "0") ? panelConfig.MIN_NUM : Number(item.Jjsw);
                    //            that.obj_fcch_gcx.bzsw = (item.Bzsw == "" || item.Bzsw == "0") ? panelConfig.MIN_NUM : Number(item.Bzsw);
                    //            return false;
                    //        }
                    //    });
                    //} else {
                    //    $.each(jsonTj.dataSk, function (i, item) {
                    //        if (item.Stcd == that.show_stcd) {
                    //            that.obj_fcch_gcx.xxsw = (item.Xxsw == "" || item.Xxsw == "0") ? panelConfig.MIN_NUM : Number(item.Xxsw);
                    //            that.obj_fcch_gcx.sjsw = (item.Sjsw == "" || item.Sjsw == "0") ? panelConfig.MIN_NUM : Number(item.Sjsw);
                    //            that.obj_fcch_gcx.jhsw = (item.Jhsw == "" || item.Jhsw == "0") ? panelConfig.MIN_NUM : Number(item.Jhsw);
                    //            return false;
                    //        }
                    //    });
                    //    $.each(jsonTj.dataHp, function (i, item) {
                    //        if (item.Stcd == that.show_stcd) {
                    //            that.obj_fcch_gcx.xxsw = (item.Xxsw == "" || item.Xxsw == "0") ? panelConfig.MIN_NUM : Number(item.Xxsw);
                    //            that.obj_fcch_gcx.sjsw = (item.Sjsw == "" || item.Sjsw == "0") ? panelConfig.MIN_NUM : Number(item.Sjsw);
                    //            that.obj_fcch_gcx.jhsw = (item.Jhsw == "" || item.Jhsw == "0") ? panelConfig.MIN_NUM : Number(item.Jhsw);
                    //            return false;
                    //        }
                    //    });
                    //}
                } catch (e) {}
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
                        if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.jjsw.push({
                                value: [_minTime, that.obj_fcch_gcx.jjsw]
                            });
                            that.obj_data_gcx.jjsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.jjsw]
                            });
                        }
                        //保证水位
                        if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.bzsw.push({
                                value: [_minTime, that.obj_fcch_gcx.bzsw]
                            });
                            that.obj_data_gcx.bzsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.bzsw]
                            });
                        }
                    } else if (that.show_sttp == "RR") {
                        //汛限水位
                        if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.xxsw.push({
                                value: [_minTime, that.obj_fcch_gcx.xxsw]
                            });
                            that.obj_data_gcx.xxsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.xxsw]
                            });
                        }
                        //设计水位
                        if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                            that.obj_data_gcx.sjsw.push({
                                value: [_minTime, that.obj_fcch_gcx.sjsw]
                            });
                            that.obj_data_gcx.sjsw.push({
                                value: [_maxTime, that.obj_fcch_gcx.sjsw]
                            });
                        }
                        //校核水位
                        if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
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
                if (that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jjsw) {
                    that.obj_fcch_gcx.showJjsw = true;
                } else {
                    that.obj_fcch_gcx.showJjsw = false;
                }
                if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.bzsw) {
                    that.obj_fcch_gcx.showBzsw = true;
                } else {
                    that.obj_fcch_gcx.showBzsw = false;
                }
                if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.xxsw) {
                    that.obj_fcch_gcx.showXxsw = true;
                } else {
                    that.obj_fcch_gcx.showXxsw = false;
                }
                if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.sjsw) {
                    that.obj_fcch_gcx.showSjsw = true;
                } else {
                    that.obj_fcch_gcx.showSjsw = false;
                }
                if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM && that.obj_minMax_gcx.sw.max > that.obj_fcch_gcx.jhsw) {
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
            meteorPattern: meteor
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

        //单站日雨量数据
        that.arr_ryl_station = {
            station: new Array(),
            data: new Array()
        }
        that.chartRyl.clear();
        that.rainAreaOption = null;
        that.rainStationOption = null;

        //等待框
        tools.showChartLoading(that.chartRyl);
        //获取日雨量
        var res = "";
        var objData = {
            adjust: 1,
            stcd: that.show_stcd,
            endTime: searchEtime,
            startTime: searchStime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: searchPlan,
            // userId: $("#_hid_userid").val(),
            range: Number(searchRange),
            model: selectModes,
            foreDays: Number(selectDays),
            meteorPattern: meteor
        };
        var info = JSON.stringify(objData);
        var objData2 = {
            adjust: 1,
            wsid: that.show_stcd,
            endTime: searchEtime,
            startTime: searchStime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: searchPlan,
            // userId: $("#_hid_userid").val(),
            range: Number(searchRange),
            model: selectModes,
            foreDays: Number(selectDays),
            meteorPattern: meteor
        };
        var info2 = JSON.stringify(objData2);

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
            success: function (data) {
                res = data;
                if (res.code != 200) {
                    tools.hideChartLoading(that.chartRyl);
                    tools.show_message_error_const(res.message);
                    // alert("获取降雨信息失败!");
                    return;
                }
                that.isSearchRainData = 1;
                var json = res.data;
                that.arr_ryl_sum = new Array();
                //解析数据
                var _max = panelConfig.MIN_NUM;
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
                var axis_rain_max = _max > 0 ? Math.ceil((_max * (1 + panelConfig.MAX_DEPART))) : 1;
                var max_rain_ryl_sum = that.arr_ryl_sum[that.arr_ryl_sum.length - 1].value[1];
                var axis_rain_max_sum = max_rain_ryl_sum > 0 ? Math.ceil((max_rain_ryl_sum * (1 + panelConfig.MAX_DEPART))) : 1;
                //获取时间轴刻度
                var intervalX = that.get_axis_interval_bar("1");
                //初始化图表
                var option = that.get_option_ryl(axis_rain_max, axis_rain_max_sum, intervalX);

                // 使用刚指定的配置项和数据显示图表。
                that.chartRyl.setOption(option, true);
                tools.hideChartLoading(that.chartRyl);

                // $("#btnChooseRain").bootstrapSwitch();
                // $("#btnChooseRain").bootstrapSwitch("state", false)

                that.rainAreaOption = option;
                //柱子点击事件-跳转时段雨量
                that.chartRyl.off("click");
                /*  that.chartRyl.on('click', function (ob) {
                      if (ob.seriesType == "bar") {
                          $("#rainInfoBody").hide();
                          $("#rainInfoHourBody").show();
                          $("#btnReturnRyl").show();
                          that.echart_bar_rain_sd(ob.value[0]);
                      }
                  });*/
            },
            error: function (errorMsg) {
                alert("生成降雨信息失败!");
                tools.hideChartLoading(that.chartRyl);
            }
        });

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-rainsituation/real/getRealPPByStcd",
            data: info2,
            success: function (data) {
                res = data;
                if (res.code != 200) {
                    tools.hideChartLoading(that.chartRyl);
                    tools.show_message_error_const(res.message);
                    // alert("获取降雨信息失败!");
                    return;
                }
                that.isSearchRainData = 1;
                var json = res.data;
                //解析数据
                var _max = panelConfig.MIN_NUM;
                var stationName = [];
                $.each(json.stationList, function (index, data) {
                    stationName.push(data.stnm);
                    that.arr_ryl_station.station.push(data.stnm);
                    that.arr_ryl_station.data[index] = new Array();
                    $.each(data.tableData, function (i, item) {
                        _max = Math.max(Number(item[1]), _max);
                        that.arr_ryl_station.data[index].push({
                            value: [item[0], item[1]]
                        })
                    })
                })
                if (that.arr_ryl_station == null || that.arr_ryl_station.length == 0)
                    return;
                //获取最大雨量
                var axis_rain_max = _max > 0 ? Math.ceil((_max * (1 + panelConfig.MAX_DEPART))) : 1;
                //获取时间轴刻度
                var intervalX = that.get_axis_interval_bar("1");

                var stationOption = that.get_option_stcdRain(axis_rain_max, intervalX);

                //动态添加各站点数据
                $.each(that.arr_ryl_station.data, function (i, item) {
                    stationOption.legend.data.push(stationName[i]);
                    stationOption.legend.inactiveColor = "#DCDCDC";
                    stationOption.series.push({
                        name: that.arr_ryl_station.station[i],
                        type: 'bar',
                        yAxisIndex: 0,
                        label: {
                            show: true,
                            position: "top",
                            color: panelConfig.ECHART_COLOR_RAIN_OUT,
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
                            color: tools.randomColor(),
                            shadowColor: panelConfig.ECHART_COLOR_SHADOW,
                            shadowBlur: 5
                        },
                        // barWidth: "95%",
                        data: item
                    });
                })
                that.rainStationOption = stationOption;
                // 使用刚指定的配置项和数据显示图表。
                // that.chartRyl.setOption(option, true);
                tools.hideChartLoading(that.chartRyl);

                $("#btnChooseRain").bootstrapSwitch();
                $("#btnChooseRain").bootstrapSwitch("state", false)
                $("#btnExport").hide()

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
                axisLen = axisLen <= 10 ? axisLen : 10; // axisLen > (that.arr_ryl_data.length - 1) ? (that.arr_ryl_data.length - 1) : axisLen;
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
                var _max = panelConfig.MIN_NUM;
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
                var axis_rain_max = _max > 0 ? Math.ceil((_max * (1 + panelConfig.MAX_DEPART))) : 1;
                var max_rain_ryl_sum = that.arr_sdyl_sum[that.arr_sdyl_sum.length - 1].value[1];
                var axis_rain_max_sum = max_rain_ryl_sum > 0 ? Math.ceil((max_rain_ryl_sum * (1 + panelConfig.MAX_DEPART))) : 1;
                //获取时间轴刻度
                var intervalX = that.get_axis_interval_bar("2");
                //初始化图表
                var option = that.get_option_sdyl(axis_rain_max, axis_rain_max_sum, intervalX);

                // 使用刚指定的配置项和数据显示图表。
                that.chartSdyl.setOption(option, true);
                tools.hideChartLoading(that.chartSdyl);

                //显示返回按钮
                $("#btnReturnRyl").show();
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
            sw: panelConfig.MIN_NUM,
            sw_zx: panelConfig.MIN_NUM,
            jjsw: panelConfig.MIN_NUM,
            bzsw: panelConfig.MIN_NUM,
            xxsw: panelConfig.MIN_NUM,
            sjsw: panelConfig.MIN_NUM,
            ssw: panelConfig.MIN_NUM,
            sw_time: "",
            sw_position: "0"
        };
        that.obj_minMax_dmxx = {
            gc: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
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
        var leftGz = panelConfig.MAX_NUM;
        var rightGz = panelConfig.MAX_NUM;

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
                if (res.code != "0") {
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
                    /*  that.obj_fcch_dmxx.sw = arrTz[2] == "" ? "" : Number(arrTz[2]);
                      that.obj_fcch_dmxx.sw_zx = arrTz[3] == "" ? "" : Number(arrTz[3]);
                      that.obj_fcch_dmxx.jjsw = arrTz[4] == "" ? "" : Number(arrTz[4]);
                      that.obj_fcch_dmxx.bzsw = arrTz[5] == "" ? "" : Number(arrTz[5]);
                      that.obj_fcch_dmxx.sw_time = arrTz[1];

                      that.obj_minMax_dmxx.gc.max = Math.max(Number(arrTz[6]), Number(arrTz[7]));*/

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
                if ((that.obj_data_dmxx.data == null || that.obj_data_dmxx.data == 0) && leftGz != panelConfig.MAX_NUM) {
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
                        that.obj_minMax_dmxx.gc.min = min_gc_dmxx_temp - (max_gc_dmxx_temp - min_gc_dmxx_temp) * panelConfig.MIN_DEPART / 2;
                        that.obj_minMax_dmxx.gc.max = max_gc_dmxx_temp + (max_gc_dmxx_temp - min_gc_dmxx_temp) * panelConfig.MAX_DEPART / 2;
                    } else {
                        if (min_gc_dmxx_temp == panelConfig.MIN_NUM) {
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
                    that.obj_fcch_dmxx.sw = (that.obj_fcch_dmxx.sw != "" && that.obj_fcch_dmxx.sw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sw;
                    that.obj_fcch_dmxx.sw_zx = (that.obj_fcch_dmxx.sw_zx != "" && that.obj_fcch_dmxx.sw_zx != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sw_zx) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sw_zx;
                    that.obj_fcch_dmxx.jjsw = (that.obj_fcch_dmxx.jjsw != "" && that.obj_fcch_dmxx.jjsw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.jjsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.jjsw;
                    that.obj_fcch_dmxx.bzsw = (that.obj_fcch_dmxx.bzsw != "" && that.obj_fcch_dmxx.bzsw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.bzsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.bzsw;
                    that.obj_fcch_dmxx.xxsw = (that.obj_fcch_dmxx.xxsw != "" && that.obj_fcch_dmxx.xxsw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.xxsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.xxsw;
                    that.obj_fcch_dmxx.sjsw = (that.obj_fcch_dmxx.sjsw != "" && that.obj_fcch_dmxx.sjsw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.sjsw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.sjsw;
                    that.obj_fcch_dmxx.ssw = (that.obj_fcch_dmxx.ssw != "" && that.obj_fcch_dmxx.ssw != panelConfig.MAX_NUM) ? (Number(that.obj_fcch_dmxx.ssw) - that.obj_minMax_dmxx.gc.min) : that.obj_fcch_dmxx.ssw;

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
    /**
     * 水位流量关系
     **/
    echart_line_qx: function () {
        var that = this;
        //初始化参数
        that.obj_data_gcx_qx = {
            floodName: [],
            floodData: []
        };
        //等待框
        tools.showChartLoading(that.chartQx);
        var objData = {
            stcd: that.show_stcd
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": $("#_hid_token").val()
            },
            url: apiUrl_cloud + "api-rainsituation/real/getRiverZQInfo",
            data: info,
            success: function (data) {
                var res = data;
                if (res.code != 200) {
                    tools.hideChartLoading(that.chartQx);
                    tools.show_message_error("获取水位流量关系失败!");
                    return;
                }
                if (ybMenu === 1) {
                    //初始化曲线水位下拉框 start
                    if ($("#zqQx").length !== 0) {
                        $("#zqQx").remove()
                    }
                    if (!res.data || res.data.floodInfoList.length === 0) {
                        return
                    }
                    let htmlStart = "<div id='zqQx' class='zqQx'>" +
                        "<label class='control-label ModifyShow'>洪水曲线&nbsp;</label>" +
                        "<select id='select_zqQx' class='form-control' style='width:180px'>"
                    let htmlEnd = "</select></div>"
                    let html = ""
                    $.each(res.data.floodInfoList, function (index, item) {
                        html += "<option value=" + item.floodId + ">" + item.name + "</option>"
                    })
                    $("#sel_info").append(htmlStart + html + htmlEnd)
                }
                //初始化曲线水位下拉框 end
                if (res.data.floodInfoList.length == 0) {
                    tools.hideChartLoading(that.chartQx);
                    tools.show_message_error("无水位流量关系!");
                    return;
                }
                //解析数据
                var ll_min = dispatchConfig.MAX_NUM;
                var ll_max = dispatchConfig.MIN_NUM;
                var sw_min = dispatchConfig.MAX_NUM;
                var sw_max = dispatchConfig.MIN_NUM;

                $.each(res.data.floodInfoList, function (index, item) {
                    that.obj_data_gcx_qx.floodName.push(item.name);
                    var floodData = [];
                    $.each(item.riverIList, function (i, data) {
                        floodData.push({
                            value: [Number(data.q), Number(data.z)]
                        })
                        ll_min = Math.min(Number(data.q), ll_min);
                        ll_max = Math.max(Number(data.q), ll_max);
                        sw_min = Math.min(Number(data.z), sw_min);
                        sw_max = Math.max(Number(data.z), sw_max);
                    })
                    that.obj_data_gcx_qx.floodData.push(floodData);
                })

                //最高、低水位
                var min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx;
                if (sw_max - sw_min > 0) {
                    min_sw_gxqx = sw_min - (sw_max - sw_min) * dispatchConfig.MIN_DEPART / 2;
                    max_sw_gxqx = sw_max + (sw_max - sw_min) * dispatchConfig.MIN_DEPART / 2;
                } else {
                    if (sw_min == dispatchConfig.MAX_NUM) {
                        min_sw_gxqx = 0;
                        max_sw_gxqx = 1;
                    } else {
                        min_sw_gxqx = sw_min - 0.5;
                        max_sw_gxqx = sw_max + 0.5;
                    }
                }
                //最大 最小流量
                if (ll_max - ll_min > 0) {
                    min_ll_gxqx = parseInt(ll_min * (1 - dispatchConfig.MIN_DEPART));
                    max_ll_gxqx = parseInt(ll_max * (1 + dispatchConfig.MIN_DEPART / 2));
                } else {
                    if (ll_min == dispatchConfig.MAX_NUM) {
                        min_ll_gxqx = 0;
                        max_ll_gxqx = 1;
                    } else {
                        min_ll_gxqx = parseInt(ll_min - 1);
                        max_ll_gxqx = parseInt(ll_max + 1);
                    }
                }
                if (ybMenu === 1) {
                    max_sw_gxqx = (max_sw_gxqx * 1.1).toFixed()
                    max_ll_gxqx = (max_ll_gxqx * 1.1).toFixed()
                }

                //初始化图表
                var option = that.get_option_qx(min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx);
                //动态加载series
                var colors = ['#A0CE3A', '#585247', '#31C5C0', '#0F347B', '#1E9BD1', '#7F6AAD', '#009D85'];
                $.each(that.obj_data_gcx_qx.floodData, function (index, item) {
                    option.legend.data.push(that.obj_data_gcx_qx.floodName[index]);
                    option.legend.selected[that.obj_data_gcx_qx.floodName[index]] = true;

                    option.series.push({
                        type: 'line',
                        name: that.obj_data_gcx_qx.floodName[index],
                        // yAxisIndex: 1,
                        symbol: "circle",
                        lineStyle: {
                            color: colors[index]
                        },
                        itemStyle: {
                            color: colors[index]
                        },
                        showSymbol: false,
                        connectNulls: true, //连接空数据
                        smooth: true, //平滑显示曲线
                        smoothMonotone: "none",
                        data: item
                    })
                })


                // 使用刚指定的配置项和数据显示图表。
                that.chartQx.setOption(option, true);
                tools.hideChartLoading(that.chartQx);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取水位流量关系失败!");
                tools.hideChartLoading(that.chartQx);
            }
        });
    },
    get_option_qx: function (min_sw_gxqx, max_sw_gxqx, min_ll_gxqx, max_ll_gxqx) {
        var that = this;
        var option = {
            legend: {
                show: true,
                top: 20,
                left: "center",
                textStyle: {
                    fontSize: 14
                },
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: [],
                selected: {}
            },

            grid: {
                left: 30,
                top: 55,
                right: 35,
                bottom: 30,
                containLabel: true
            },
            xAxis: {
                id: "ll_x",
                type: "value",
                name: '流量(m³/s)',
                nameLocation: "middle",
                nameGap: 20,
                min: min_ll_gxqx,
                max: max_ll_gxqx,
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
            yAxis: {
                id: 'sw_y',
                type: 'value',
                name: '水位（m）',
                position: 'left',
                nameGap: 48,
                nameLocation: "middle",
                min: min_sw_gxqx,
                max: max_sw_gxqx,
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
            },
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
                        return tools.format_tooltip_qx(ob);
                    } else {
                        return "";
                    }
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 5);
                }
            },
            series: [],
            backgroundColor: "#fffefe"
        };
        option = tools.initChartlegendIcon(option);
        return option;
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

        var tjTableHeight = $(this.parentId + " .field_yb").height();
        //获取真实宽度
        var _width = width - 20;
        $("#contProLine").width(_width - 200);
        // debugger
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 200);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
            //that.modifyFormInline(width);
        }
        //基本信息
        $(this.parentId).find(".table-jbxx").width(_width - 2 - 200); //2019-10-8 modify by chl
        $(this.parentId).find(".table-jbxx").parent().height(_height - 2);
        var isshowall = false;
        //过程线
        if (that.show_type == "1" || ((that.show_type == "2" || that.show_type == "3") && !that.show_all)) {
            if (that.show_type == "3") {

                $("#proLineBody").width(_width - 575 - 200).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                $("#contProLine .content-left").css("margin-right", 575);
                $("#contProLine .content-left").css("margin-top", -28);
                $("#contProLine .sidebar-right").width(550);



            } else {
                if (((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) && (that.show_type == "2")) {
                    $("#contProLine .content-left").width(_width - 840 - 2);
                    $("#proLineBody").width(_width - 840 - 2).height(_height - (that.show_type == "2" ? tjTableHeight : 0) - 48);
                    $("#contProLine .content-left").css("margin-right", 440);
                    $("#contProLine .content-left").css("margin-top", 0);
                    $("#contProLine .sidebar-right").width(615);

                } else {
                    $("#contProLine .content-left").width(_width - 825 - 2);
                    $("#proLineBody").width(_width - 825 - 2).height(_height - (that.show_type == "2" ? tjTableHeight + 48 : 0)); //--2022.4.20 chl
                    $("#contProLine .content-left").css("margin-right", 425);
                    $("#contProLine .content-left").css("margin-top", 0);
                    $("#contProLine .sidebar-right").width(600);

                }


            }
            $("#contProLine .tableSqxx").parent().height(_height - (that.show_type == "3" ? 105 : 0) - (that.show_type == "2" ? tjTableHeight : 0) - 48);
            $("#contProLine .ybsq-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
        } else {
            isshowall = true;
            $("#proLineBody").css("margin-top", 0);

            $("#proLineBody").width(_width).height(_height - (($(".ybsw-modify").is(":visible")) ? 45 : 0));
        }
        if ((isInit == undefined) || (isInit == null)) {
            isInit = false;
        }
        if (!isshowall) {
            if (isInit) {
                $("#contProLine .content-left").show();
                $("#proLineBody").show();
                $("#contProLine .sidebar-right").show();
            } else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody").is(':visible');
                var v_right = $("#contProLine .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine .content-left").show();

                    if (!that.isMax && !that.isRes) {
                        $("#btn_ybsw-modify").bootstrapSwitch();
                        $("#btn_ybsw-modify").bootstrapSwitch("state", true)
                        that.isMax = false
                    }
                    if (that.isMax && that.isRes) {
                        //获取当前开关值
                        let val = $("#btn_ybsw-modify").is(":checked")
                        $("#btn_ybsw-modify").bootstrapSwitch();
                        $("#btn_ybsw-modify").bootstrapSwitch("state", val);
                        $("#modifyNote").show();
                        if (!val) {
                            $("#btn_ybsw-zoom").show();
                        }
                        that.isRes = false
                        that.isMax = false
                    }
                    $("#modifyNote").show();
                    $("#btn_ybsw-getRain").show();
                    $("#btn_ybsw-save").show();
                    $("#btn_ybsw-updaily").show();
                } else if (v_left) {
                    $("#contProLine .content-left").width(that.panel_actual_width - 200 - 20 - 25 - 2)
                    $("#proLineBody").width(that.panel_actual_width - 200 - 20 - 25 - 2).height(_height - (that.show_type != "1" ? tjTableHeight : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine .content-left").css("margin-right", 25);
                    $("#contProLine .sidebar-right").width(0);
                } else if (v_right) {
                    $("#proLineBody").width(0).height(_height - (that.show_type != "1" ? tjTableHeight : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine .content-left").css("margin-right", that.panel_actual_width - 200 - 20);

                    $("#contProLine .sidebar-right").width(that.panel_actual_width - 200 - 20 - 25 - 2);
                }

            }
        }


        if (isResize) {
            this.chartGcx.resize();
        }

        //降雨信息
        $("#rainInfoBody").width(_width - 10 - 200).height(_height - 10); //2019-10-8 modify by chl
        $("#rainInfoHourBody").width(_width - 10).height(_height - 10);
        if (isResize) {
            this.chartRyl.resize();
            this.chartSdyl.resize();
        }

        //断面信息
        $("#dmInfoBody").width(_width - 200).height(_height); //2019-10-8 modify by chl
        if (isResize) {
            this.chartDm.resize();
        }
        $("#ifram_qjt").width(_width - 200).height(_height);
        $("#ifram_spjk").width(_width - 200).height(_height);
        $("#dix_mxxz").width(_width - 200).height(_height);

        //ZV曲线
        $("#contDd_ZV").height(_height);
        $("#zvChartBody").width(_width - 260 - 200).height(_height); //2019-10-012 modify by chl
        if (isResize) {
            this.chartZV.resize();
        }
        if (that.datatables_zv != null) {
            debugger;


            $('#zvBody .dataTables_scrollBody').css({
                'height': (_height - 30) + "px",
                'max-height': 'none',
                'border': 'none'
            });

            // Force table redraw
            that.datatables_zv.fnDraw();
        }
        //水位流量关系曲线
        $("#contQx").height(_height).width(_width - 200);
        $("#qxChartBody").width(_width - 200).height(_height-100);
        if (isResize) {
            this.chartQx.resize();
        }


        //历史极值表格宽高
        var rank_height = (_height - 33) / 2 - 30;
        $(this.parentId + " .tableSwMax").parent().height(rank_height);
        $(this.parentId + " .tableSwMin").parent().height(rank_height);
        $(this.parentId + " .tableLlMax").parent().height(rank_height);
        $(this.parentId + " .tableLlMin").parent().height(rank_height);
        $(this.parentId + " .tableSwMax").parent().width((_width - 200));
        $(this.parentId + " .tableSwMin").parent().width((_width - 200));
        $(this.parentId + " .tableLlMax").parent().width((_width - 200));
        $(this.parentId + " .tableLlMin").parent().width((_width - 200));
        $(this.parentId + " .rank-table-header").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });

        //旬月均值canvas宽高
        $("#monthQBody,#monthZBody").width(_width - 200).height(_height - 25);
        if (isResize) {
            this.chartMonthQ.resize();
            this.chartMonthZ.resize();
        }

        //对比分析高度
        $("#compareChartBody").width(_width - 202).height(_height - 50);
        if (isResize) {
            this.chartDbfx.resize();
        }
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
        $("#contProLine .ybsq-table-header table colgroup col").remove();
        $("#contProLine .ybsq-table-header table thead tr").remove();
        $("#contProLine .tableSqxx colgroup col").remove();
        $("#contProLine .tableSqxx tbody tr").remove();
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
        $("#contProLine .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine .tableSqxx colgroup").append(_html_col);
        $("#contProLine .ybsq-table-header table thead").append(_html_th);

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
                if (temp_z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                }
                if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                    if (temp_z >= that.obj_fcch_gcx.xxsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }
                }
                //else if (temp_z >= that.obj_fcch_gcx.xxsw) {
                //    font_Z_start = "<font color='Blue'>";
                //    font_Z_end = "</font>";
                //}
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Qin + "</td><td>" + item.Q + "</td></tr>";
            }
        });
        $("#contProLine .tableSqxx tbody").append(_html_body);
    },
    /**
     * 生成表格-预报水情 新版-多模型
     **/
    create_table_sqxx_new2: function (json, tableName, tjtableData, model) {
        var that = this;
        that.forEndTime = json[json.length - 1][0];
        that.singleModeData = {
            modelName: new Array(),
            modelData: new Array()
        }
        that.otqForSimLineInfo = new Array();
        that.saveSimlineData = [];
        that.z0 = "";
        //预报模型修改、获取相关水位时，将出库流量传给后端
        $.each(json, function (index, item) {
            if (that.show_sttp == "RR") {
                if (item[3] != "") {
                    that.otqForSimLineInfo.push({
                        otq: item[3],
                        tm: item[0]
                    })
                }
                //修改模型保存数据
                that.saveSimlineData.push({
                    tm: item[0],
                    z: item[1],
                    q: item[2],
                    outQ: item[3],
                    modifyQq: '',
                    modifyZ: ''
                })
                if (item[0] == that.show_etime) {
                    that.L0 = item[3];
                    that.z0Time = item[0],
                        that.z0 = item[1]
                }
                // if (json[index][1] != ".00" && json[index + 1][1] == ".00") {
                //     that.z0 = item[1]
                //     that.z0Time = item[0]
                // }
            } else {
                //修改模型保存数据
                that.saveSimlineData.push({
                    tm: item[0],
                    z: item[1],
                    q: item[2],
                    modifyQq: '',
                    modifyZ: ''
                })
                if (item[0] == that.show_etime) {
                    that.L0 = item[2];
                    that.z0Time = item[0],
                        that.z0 = item[1]
                }
                // if (json[index][1] != ".00" && json[index + 1][1] == ".00") {
                //     that.z0 = item[1]
                // }
            }
        })
        //给修改数据添加起始点
        that.modifyData = [];
        var beginPointDate = new Date(that.z0Time);
        var timeStamp = beginPointDate.getTime();
        var firstPointArr = [timeStamp, that.L0];
        that.modifyData.push(firstPointArr);
        //表头 河道：时间、水位、流量、预报水位、预报流量
        //        闸坝：时间、水位、闸下水位、流量、预报水位、预报流量
        //        水库：时间、水位、入库流量、出库流量、预报水位、预报流量
        //云平台版本表格只显示第一个模型的数据
        var modelArr = model.split(',');
        // var tableNameArr = tableName.split(',');
        var modelFirstIndex = 0; //记录第一个模型下标
        var modelLastIndex = 0; //记录截取长度
        $.each(modelArr, function (i, item) {
            that.singleModeData.modelData[i] = {
                sw: new Array(),
                ll: new Array()
            };
            $.each(tableName, function (j, name) {
                if (name.indexOf(item) != -1) {
                    that.singleModeData.modelName.push(item);
                    $.each(json, function (k, data) {
                        if (tableName[j].indexOf("水位") != -1)
                            that.singleModeData.modelData[i].sw.push(data[j]);
                        if (tableName[j].indexOf("流量") != -1)
                            that.singleModeData.modelData[i].ll.push(data[j]);
                    })
                    modelLastIndex++;
                    if (modelLastIndex == 1) { //第一个模型下标
                        modelFirstIndex = j;
                    }
                }
            })
        })
        $.unique(that.singleModeData.modelName)
        //只保留第一个模型的数据
        tableName.splice(modelFirstIndex + 2, modelLastIndex)
        $.each(json, function (i, item) {
            item.splice(modelFirstIndex + 2, modelLastIndex)
        })

        //先清空数据
        $("#contProLine .ybsq-table-header table colgroup col").remove();
        $("#contProLine .ybsq-table-header table thead tr").remove();
        $("#contProLine .tableSqxx colgroup col").remove();
        $("#contProLine .tableSqxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";
        if (that.show_sttp == "RR") { //6
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 16%;' />";
            _html_col += "<col style='width: 16%;' />";
        } else { //5
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 20%;' />";
        }
        $("#contProLine .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine .tableSqxx colgroup").append(_html_col);

        _html_th += "<tr>";
        // if ((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) {
        //     $.each(tableName, function (indenx, item) {
        //         if (indenx == tableName.length - 3) {
        //             _html_th += "<th>分布式模型</th>";
        //         }
        //         _html_th += "<th>" + item + "</th>";
        //     })
        // }
        // else {
        $.each(tableName, function (indenx, item) {
            _html_th += "<th>" + item + "</th>";
        })
        // }

        _html_th += "</tr>";
        $("#contProLine .ybsq-table-header table thead").append(_html_th);

        var _html_body = "";

        var iaddfbs = false;
        var fbs_index = -1;
        // if ((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) {
        //     fbs_index = that.show_stcd == "50101100" ? 0 : (that.show_stcd == "50102350" ? 1 : 2);
        //     iaddfbs = true;
        //     obj_ll_fbs = [];
        //     obj_sw_fbs = [];

        //     min_sw_fbs = 99999999;
        //     max_sw_fbs = 0;

        //     min_ll_fbs = 99999999;
        //     max_ll_fbs = 0;


        // }

        $.each(json, function (index, item) {
            var grayclass = "";
            // _html_body = ""
            var font_Z_start = "";
            var font_Z_end = "";
            var font_Zs_color = "";
            if ((item[0] != "") && moment(that.show_etime).diff(moment(item[0]), "minutes", true) >= 0)
                _html_body += "<tr class='tr_ssd'>"
            else
                _html_body += "<tr>"
            for (var i = 0; i < item.length; i++) {
                if (item[i] == ".00")
                    item[i] = "";
                if (i == 0) { //时间
                    if (item[0] != "" && moment(that.show_etime).diff(moment(item[0]), "minutes", true) >= 0) { //实况部分
                        grayclass = " td_gray ";
                    }
                    _html_body += "<td class='" + grayclass + "'>" + (item[0] == "" ? "" : moment(item[0]).format("MM-DD HH:mm")) + "</td>"
                } else if (i == 1) {
                    var temp_z = Number(item[i]);
                    if (that.show_sttp == "RR") {
                        font_Z_start = "";
                        font_Z_end = ""
                        if (temp_z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                            font_Z_start = "<font color='Red'>";
                            font_Z_end = "</font>";
                        } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                            font_Z_start = "<font color='Red'>";
                            font_Z_end = "</font>";
                        } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                            if (temp_z >= that.obj_fcch_gcx.xxsw) {
                                font_Z_start = "<font color='Blue'>";
                                font_Z_end = "</font>";
                            }
                        }
                    } else {
                        if (temp_z >= that.obj_fcch_gcx.bzsw) {
                            font_Z_start = "<font color='Red'>";
                            font_Z_end = "</font>";
                        } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                            font_Z_start = "<font color='Blue'>";
                            font_Z_end = "</font>";
                        }
                    }
                    _html_body += "<td class='" + grayclass + "'>" + font_Z_start + item[i] + font_Z_end + "</td>"
                } else if (i == item.length - 2) {
                    var temp_Zs = Number(item[i]);
                    font_Zs_color = "";
                    if (that.show_sttp == "RR") {
                        if (temp_Zs >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                            font_Zs_color = " style='color:Red'";
                        } else if (temp_Zs >= that.obj_fcch_gcx.sjsw) {
                            font_Zs_color = " style='color:Red'";
                        } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                            if (temp_Zs >= that.obj_fcch_gcx.xxsw) {
                                font_Zs_color = " style='color:Blue'";
                            }
                        }
                    } else {
                        if (temp_Zs >= that.obj_fcch_gcx.bzsw) {
                            font_Zs_color = " style='color:Red'";

                        } else if (temp_Zs >= that.obj_fcch_gcx.jjsw) {

                            font_Zs_color = " style='color:Blue'";
                        }
                    }
                    _html_body += "<td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_sw' step='0.01' min='0' value='" + item[i] + "' " + font_Zs_color + "  readonly/></td>";
                } else if (i == item.length - 1) {
                    _html_body += "<td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item[i] + "'  readonly /></td>";
                } else {
                    if (iaddfbs) {
                        if (i == item.length - 3) {
                            _html_body += "<td class='" + grayclass + "'>" + Number(ll_fbs).toFixed(0) + "</td>"
                        }
                    }
                    _html_body += "<td class='" + grayclass + "'>" + item[i] + "</td>"
                }
            }
            _html_body += "</tr>"
        });
        $("#contProLine .tableSqxx tbody").append(_html_body);
        //  $("#contProLine .tableSqxx .edit_input input").removeAttr("readonly");
        //生成该站统计信息
        try {
            $("#contProLine .table_ybtj_header table colgroup col").remove();
            $("#contProLine .table_ybtj colgroup col").remove()
            $("#contProLine .table_ybtj_header thead tr").remove();
            $("#contProLine .table_ybtj thead tr").remove();
            $("#contProLine .table_ybtj tbody tr").remove();

            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                var _html_tj_thead = "";
                var _html_col = "";
                _html_col += "<col style='width: 11%;' />";
                // _html_col += "<col style='width: 5.5%;' />";
                _html_col += "<col style='width: 20%;' />";
                _html_col += "<col style='width: 9%;' />";
                _html_col += "<col style='width: 20%;' />";
                _html_col += "<col style='width: 11%;' />";
                _html_col += "<col style='width: 11%;' />";
                _html_col += "<col style='width: 11%;' />";
                _html_col += "<col style='width: 11%;' />";
                $("#contProLine .table_ybtj_header table colgroup").append(_html_col);
                $("#contProLine .table_ybtj colgroup").append(_html_col)
                _html_tj_thead = "<tr><th>是否显示</th>";
                $.each(tjtableData.statisName, function (i, item) {
                    $.each(item, function (index, data) {
                        _html_tj_thead += "<th>" + data + "</th>";
                    })
                })
                _html_tj_thead += "<tr>";
                // $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                $("#contProLine .table_ybtj_header table thead").append(_html_tj_thead);
                $.each(tjtableData.statis, function (i, item) {
                    if (i == 0) {
                        // if (i == tjtableData.statis.length - (5 - $('input[type=radio][name=rd_model]:checked').val())) {
                        $.each(item, function (index, data) {
                            $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel hover' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' class='model_yb_check' checked/></td><td>" + data[0] + "</td><td>" + data[1] +
                                "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" + data[6] + "</td><tr>");
                        })
                    } else {
                        $.each(item, function (index, data) {
                            $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' class='model_yb_check' /></td><td>" + data[0] + "</td><td>" + data[1] +
                                "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" + data[6] + "</td><tr>");
                        })
                    }


                });
                // if ((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000")) {
                //     var fbs_index = that.show_stcd == "50101100" ? 0 : (that.show_stcd == "50102350" ? 1 : 2);
                //     var fbs_bzll = that.show_stcd == "50101100" ? "7400" : (that.show_stcd == "50102350" ? "9400" : "");
                //     if (fbs_data[fbs_index].warnContrastListSWZS != undefined) {
                //         $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel' _data= '" + "王家坝分布式" + "'><td><input type='checkbox' class='model_yb_check' disabled=\"disabled\"/></td><td>" + "王家坝" + "</td><td>" + "分布式模型" +
                //             "</td><td>" + Number(fbs_data[fbs_index].warnContrastListSWZS.extremeValue0.fengzhiWLevel).toFixed(2) + "</td><td>" + moment(fbs_data[fbs_index].warnContrastListSWZS.extremeValue0.fengzhiTime).format("YYYY-MM-DD HH:00:00") + "</td><td>" + Number(fbs_data[fbs_index].warnContrastListSWZS.extremeValue0.fengzhiFlow).toFixed(0) + "</td><td>" + Number(fbs_data[fbs_index].WGRZ.WRZ).toFixed(2) + "</td><td>" + Number(fbs_data[fbs_index].WGRZ.GRZ).toFixed(2) + "</td><td>" + fbs_bzll + "</td></tr>");
                //     }
                // }
                // $('#ybtjTable').DataTable({
                //     "destroy": true,
                //     "retrieve": true,
                //     "bStateSave": false,
                //     // 是否允许检索
                //     "searching": false,
                //     // 是否允许排序
                //     "ordering": false,
                //     // 是否允许翻页，设成false，翻页按钮不显示
                //     "paging": false,
                //     // 水平滚动条
                //     "scrollX": false,
                //     // 垂直滚动条
                //     "scrollY": 203,
                //     // 件数选择功能 默认true
                //     "lengthChange": false,
                //     // 自动列宽
                //     "autoWidth": true,
                //     "stateSave": true, //刷新时是否保存状态
                //     "scrollCollapse": true,
                //     "bAutoWidth": false,
                //     "bScrollCollapse": true, //是否开启DataTables的高度自适应
                // });
            } else {
                //湖泊站
                // if (that.show_stcd == "51201601" || that.show_stcd == "51203401" || that.show_stcd == "50916500" || that.show_stcd == "51107801" || that.show_stcd == "51003650" || that.show_stcd == "51003800") {
                //     _html_tj_thead = "<tr><th>是否选用</th>";
                //     $.each(tjtableData.statisName, function (i, item) {
                //         $.each(item, function (index, data) {
                //             _html_tj_thead += "<th>" + data + "</th>";
                //         })
                //     })
                //     _html_tj_thead += "<tr>";
                //     $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                //     $.each(tjtableData.statis, function (i, item) {
                //         if (i == tjtableData.statis.length - (5 - $('input[type=radio][name=rd_model]:checked').val())) {
                //             $.each(item, function (index, data) {
                //                 $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel hover' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' class='model_yb_check' checked/></td><td>" + data[0] + "</td><td>" + data[1]
                //                     + "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" + data[6] + "</td><td>" + data[7]
                //                     + "</td><td>" + data[8] + "</td><td>" + data[9] + "</td><td>" + data[10] + "</td><td>" + data[11] + "</td></tr>");
                //             })
                //         } else {
                //             $.each(item, function (index, data) {
                //                 $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' class='model_yb_check' /></td><td>" + data[0] + "</td><td>" + data[1]
                //                     + "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" + data[6] + "</td><td>" + data[7]
                //                     + "</td><td>" + data[8] + "</td><td>" + data[9] + "</td><td>" + data[10] + "</td><td>" + data[11] + "</td></tr>");
                //             })
                //         }

                //     });
                // } else {
                var _html_tj_thead = "";
                var html_col = "";
                html_col += "<col style='width: 6%;' />";
                // html_col += "<col style='width: 5%;' />";
                html_col += "<col style='width: 16%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 9%;' />";
                html_col += "<col style='width: 9%;' />";
                html_col += "<col style='width: 9%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 7%;' />";
                html_col += "<col style='width: 9%;' />";
                $("#contProLine .table_ybtj_header table colgroup").append(html_col);
                $("#contProLine .table_ybtj colgroup").append(html_col)
                _html_tj_thead = "<tr><th>是否显示</th>";
                $.each(tjtableData.statisName, function (i, item) {
                    $.each(item, function (index, data) {
                        _html_tj_thead += "<th>" + data + "</th>";
                    })
                })
                _html_tj_thead += "<tr>";
                // $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                $("#contProLine .table_ybtj_header table thead").append(_html_tj_thead);
                $.each(tjtableData.statis, function (i, item) {
                    if (i == 0) {
                        // if (i == tjtableData.statis.length - (5 - $('input[type=radio][name=rd_model]:checked').val())) {
                        $.each(item, function (index, data) {
                            $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel hover' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' checked class='model_yb_check' /></td><td>" + data[0] + "</td><td>" + data[1] +
                                "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" + data[6] + "</td><td>" + data[7] +
                                "</td><td>" + data[8] + "</td><td>" + data[9] + "</td><td>" + data[10] + "</td><tr>");
                        })
                    } else {
                        $.each(item, function (index, data) {
                            $("#contProLine .table_ybtj tbody").append("<tr class= 'linkModel' _data= '" + tjtableData.model[i] + "'><td><input type='checkbox' class='model_yb_check' /></td><td>" + data[0] + "</td><td>" +
                                data[1] + "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + data[5] + "</td><td>" +
                                data[6] + "</td><td>" + data[7] + "</td><td>" + data[8] + "</td><td>" + data[9] + "</td><td>" + data[10] + "</td><tr>");
                        })
                    }

                });
                // }
            }
        } catch (e) {}

        // $(".model_yb_check").each(function (i, n) {
        //     if (that.show_stcd != "50101100") {
        //         $(this).attr("disabled", "disabled");
        //     } else {
        //         $(this).click(function () {
        //             if ($(this).is(':checked')) {

        //                 $('input[class=model_yb_check][type="checkbox"]').prop("checked", false);

        //                 $(this).prop("checked", true);

        //                 changeModeByWJB($(this).parent().next().next().html())
        //             } else {
        //                 if ($('input[class=model_yb_check][type="checkbox"]:checked').length == 0)
        //                     $(this).prop("checked", true);
        //             }
        //         });
        //     }

        // });
    },
    /**
     * 生成表格-预报水情
     **/
    create_table_sqxx: function (json, model) {
        var that = this;
        //表头 河道：时间、水位、流量、预报水位、预报流量
        //    闸坝：时间、水位、闸下水位、流量、预报水位、预报流量
        //    水库：时间、水位、入库流量、出库流量、预报水位、预报流量
        //先清空数据
        $("#contProLine .ybsq-table-header table colgroup col").remove();
        $("#contProLine .ybsq-table-header table thead tr").remove();
        $("#contProLine .tableSqxx colgroup col").remove();
        $("#contProLine .tableSqxx tbody tr").remove();
        var _html_col = "";
        var _html_th = "";

        if (that.show_sttp == "ZZ") {
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>流量</th><th>" + model + "水位</th><th>" + model + "流量</th></tr>";
        } else if (that.show_sttp == "DD") {
            _html_col += "<col style='width: 25%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_th = "<tr><th>时间</th><th>闸上水位</th><th>流量</th><th>" + model + "水位</th><th>" + model + "流量</th></tr>";
        } else if (that.show_sttp == "RR") {
            _html_col += "<col style='width: 21%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 15%;' />";
            _html_col += "<col style='width: 17%;' />";
            _html_col += "<col style='width: 17%;' />";
            _html_th = "<tr><th>时间</th><th>水位</th><th>入库流量</th><th>出库流量</th><th>" + model + "水位</th><th>" + model + "流量</th></tr>";
        }
        $("#contProLine .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine .tableSqxx colgroup").append(_html_col);
        $("#contProLine .ybsq-table-header table thead").append(_html_th);

        //解析数据
        that.z0 = "";
        that.z0Time = "";
        that.z0Time = that.show_etime;
        that.otqForSimLineInfo = [];
        that.saveSimlineData = [];
        var _html_body = "";
        $.each(json.data, function (index, item) {
            //预报模型修改、获取相关水位时，水库站将出库流量传给后端
            if (that.show_sttp == "RR") {
                // if (item.Q != "") {
                that.otqForSimLineInfo.push({
                    otq: item.Qs, //出库流量
                    tm: item.TM
                })
                // }
                //修改模型保存数据
                that.saveSimlineData.push({
                    tm: item.TM,
                    z: item.Z,
                    q: item.Q,
                    outQ: item.Qs,
                    modifyQq: '',
                    modifyZ: ''
                })
            } else {
                //修改模型保存数据
                that.saveSimlineData.push({
                    tm: item.TM,
                    z: item.Z,
                    q: item.Q,
                    modifyQq: '',
                    modifyZ: ''
                })
            }

            var grayclass = "";
            var isReadOnly = ""
            if (item.TM != "" && moment(that.show_etime).diff(moment(item.TM), "minutes", true) >= 0) {
                grayclass = " td_gray ";
                isReadOnly = "readonly"
            }
            if (moment(that.show_etime).isSame(moment(item.TM))) {
                that.z0 = item.Z;
                that.L0 = item.Q
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
                if (moment(item.TM).isAfter(that.show_etime)) { //是否可编辑改为用时间判断
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z.toFixed(2)) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs.toFixed(2) + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qs + "'   /></td></tr>";

                } else {
                    var temp_z = Number(item.Z);
                    if (temp_z >= that.obj_fcch_gcx.bzsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }

                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z.toFixed(2) + font_Z_end) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs.toFixed(2) + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qs + "'  readonly /></td></tr>";

                }
            } else if (that.show_sttp == "DD") {
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= that.obj_fcch_gcx.bzsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.jjsw) {
                    font_Zs_color = " style='color:Blue'";
                }
                if ((item.Z == "0") || (item.Z == "")) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z.toFixed(2)) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs.toFixed(2) + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qs + "'   /></td></tr>";

                } else {
                    var temp_z = Number(item.Z);
                    if (temp_z >= that.obj_fcch_gcx.bzsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                        font_Z_start = "<font color='Blue'>";
                        font_Z_end = "</font>";
                    }
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z.toFixed(2) + font_Z_end) + "</td><td class='" + grayclass + "'>" + ((item.Z == "0" && item.Q == "0") ? "" : item.Q) + "</td><<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs.toFixed(2) + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qs + "'  readonly /></td></tr>";

                }
            } else if (that.show_sttp == "RR") {
                var temp_Zs = Number(item.Zs);
                if (temp_Zs >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.sjsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                    if (temp_Zs >= that.obj_fcch_gcx.xxsw) {
                        font_Zs_color = " style='color:Blue'";
                    }
                }
                //else if (temp_Zs >= that.obj_fcch_gcx.xxsw) {
                //    font_Zs_color = " style='color:Blue'";
                //}
                if (moment(item.TM).isAfter(that.show_etime)) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" +
                        (item.Z == "0" ? "" : item.Z.toFixed(2)) + "</td><td class='" + grayclass + "'>" +
                        item.Q + "</td><td class='" + grayclass + "'>" +
                        item.Qs + "</td> <<td class='yb_edit_input " +
                        grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" +
                        item.Zs.toFixed(2) + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " +
                        grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" +
                        item.Qin + "'   /></td></tr>";

                } else {

                    var temp_z = Number(item.Z);
                    if (temp_z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    }
                    if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                        if (temp_z >= that.obj_fcch_gcx.xxsw) {
                            font_Z_start = "<font color='Blue'>";
                            font_Z_end = "</font>";
                        }
                    }
                    //else if (temp_z >= that.obj_fcch_gcx.xxsw) {
                    //    font_Z_start = "<font color='Blue'>";
                    //    font_Z_end = "</font>";
                    //}
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" +
                        (item.Z == "0" ? "" : font_Z_start + item.Z.toFixed(2) + font_Z_end) + "</td><td class='" + grayclass + "'>" + item.Q + "</td><td class='" + grayclass + "'>" +
                        item.Qs + "</td> <<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs.toFixed(2) + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qin + "'  readonly /></td></tr>";

                }
            }
        });
        //给修改数据添加起始点
        that.modifyData = [];
        var beginPointDate = new Date(that.z0Time);
        var timeStamp = beginPointDate.getTime();
        var firstPointArr = [timeStamp, that.L0];
        that.modifyData.push(firstPointArr);
        $("#contProLine .tableSqxx tbody").append(_html_body);
        //  $("#contProLine .tableSqxx .edit_input input").removeAttr("readonly");
        //生成该站统计信息
        try {
            $("#contProLine .table_ybtj_header table colgroup col").remove();
            $("#contProLine .table_ybtj colgroup col").remove()
            $("#contProLine .table_ybtj_header thead tr").remove();
            $("#contProLine .table_ybtj thead tr").remove();
            $("#contProLine .table_ybtj tbody tr").remove();

            //记录洪峰水位洪峰流量
            that.ybzgsw = '';
            that.hfsw = '';
            that.hfll = '';
            if (that.show_sttp == "RR") {
                that.ybzgsw = json.statis[0][3] //预报最高水位
            } else {
                that.hfsw = json.statis[0][1] //洪峰水位
                that.hfll = json.statis[0][3] //洪峰流量
            }

            var _html_tj_thead = "";
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                _html_tj_thead = "<tr>";
                $.each(json.statisName, function (i, item) {
                    _html_tj_thead += "<th>" + item + "</th>";
                })
                _html_tj_thead += "<tr>";
                $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                //var isExist = false;
                $.each(json.statis, function (i, item) {
                    $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td></tr>");
                });
                //if (!isExist) {
                //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                //}
            } else {
                //湖泊站
                if (that.show_stcd == "51201601" || that.show_stcd == "51203401" || that.show_stcd == "50916500" || that.show_stcd == "51107801" || that.show_stcd == "51003650" || that.show_stcd == "51003800") {
                    _html_tj_thead = "<tr>";
                    $.each(json.statisName, function (i, item) {
                        _html_tj_thead += "<th>" + item + "</th>";
                    })
                    _html_tj_thead += "<tr>";
                    $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                    //var isExist = false;
                    $.each(json.statis, function (i, item) {
                        $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[7] + "</td><td>" + item[8] + "</td><td>" + item[9] + "</td><td>" + item[10] + "</td></tr>");
                    });
                    //if (!isExist) {
                    //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    //}
                } else {
                    //水库站
                    _html_tj_thead = "<tr>";
                    $.each(json.statisName, function (i, item) {
                        _html_tj_thead += "<th>" + item + "</th>";
                    })
                    _html_tj_thead += "<tr>";
                    $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                    //var isExist = false;
                    $.each(json.statis, function (i, item) {
                        $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[7] + "</td><td>" + item[8] + "</td><td>" + item[9] + "</td><td>" + item[10] + "</td></tr>");
                    });
                    //if (!isExist) {
                    //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    //}
                }
            }
        } catch (e) {}
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
        $("#contProLine .ybsq-table-header table colgroup col").remove();
        $("#contProLine .ybsq-table-header table thead tr").remove();
        $("#contProLine .tableSqxx colgroup col").remove();
        $("#contProLine .tableSqxx tbody tr").remove();
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
        $("#contProLine .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine .tableSqxx colgroup").append(_html_col);
        $("#contProLine .ybsq-table-header table thead").append(_html_th);

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
        $("#contProLine .tableSqxx tbody").append(_html_body);

        //生成该站统计信息
        try {
            $("#contProLine .table_ybtj_header table colgroup col").remove();
            $("#contProLine .table_ybtj colgroup col").remove()
            $("#contProLine .table_ybtj_header thead tr").remove();
            $("#contProLine .table_ybtj thead tr").remove();
            $("#contProLine .table_ybtj tbody tr").remove();
            var _html_tj_thead = "";
            if (that.show_sttp == "ZZ" || that.show_sttp == "DD") {
                _html_tj_thead = "<tr>";
                $.each(json.statisName, function (i, item) {
                    _html_tj_thead += "<th>" + item + "</th>";
                })
                _html_tj_thead += "<tr>";
                $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                //var isExist = false;
                $.each(json.statis, function (i, item) {
                    $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td></tr>");
                });
                //if (!isExist) {
                //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                //}
            } else {
                //湖泊站
                if (that.show_stcd == "51201601" || that.show_stcd == "51203401" || that.show_stcd == "50916500" || that.show_stcd == "51107801" || that.show_stcd == "51003650" || that.show_stcd == "51003800") {
                    _html_tj_thead = "<tr>";
                    $.each(json.statisName, function (i, item) {
                        _html_tj_thead += "<th>" + item + "</th>";
                    })
                    _html_tj_thead += "<tr>";
                    $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                    //var isExist = false;
                    $.each(json.statis, function (i, item) {
                        $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[7] + "</td><td>" + item[8] + "</td><td>" + item[9] + "</td><td>" + item[10] + "</td></tr>");
                    });
                    //if (!isExist) {
                    //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    //}
                } else {
                    //水库站
                    _html_tj_thead = "<tr>";
                    $.each(json.statisName, function (i, item) {
                        _html_tj_thead += "<th>" + item + "</th>";
                    })
                    _html_tj_thead += "<tr>";
                    $("#contProLine .table_ybtj thead").append(_html_tj_thead);
                    //var isExist = false;
                    $.each(json.statis, function (i, item) {
                        $("#contProLine .table_ybtj tbody").append("<tr><td>" + item[0] + "</td><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td><td>" + item[4] + "</td><td>" + item[5] + "</td><td>" + item[6] + "</td><td>" + item[7] + "</td><td>" + item[8] + "</td><td>" + item[9] + "</td><td>" + item[10] + "</td></tr>");
                    });
                    //if (!isExist) {
                    //    $("#contProLine .table_ybtj tbody").append("<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
                    //}
                }
            }
        } catch (e) {}
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
            url: apiUrl_zf + "rs/get_Lsjz",
            data: JSON.stringify({
                time: moment().format("YYYY-MM-DD HH:mm"),
                stcd: that.show_stcd,
                bxOrGc: 1
            }),
            success: function (json) {
                if (json == null || json == undefined) {
                    tools.show_message_error("获取历史极值信息失败!");
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    return;
                }

                //解析数据   时间,水位,流量*水位极大排名,水位极小排名,流量极大排名,流量极小排名*水位极大数据*水位极小数据*流量极大数据*流量极小数据
                //解析数据
                that.str_max_rank = "当前水位" + tools.format_sw(json.sq_z) + "m 极大排名" + json.rank_z_max + " 当前流量" + json.sq_q + "m³/s 极大排名" + json.rank_q_max;
                that.str_min_rank = "当前水位" + tools.format_sw(json.sq_z) + "m 极小排名" + json.rank_z_min + " 当前流量" + json.sq_q + "m³/s 极小排名" + json.rank_q_min;
                $("#contRankList .spanRank").html(that.str_max_rank);

                //生成表格
                that.create_table_lsjz_detail("tableSwMax", json.data_z_max, json.rank_z_max);
                that.create_table_lsjz_detail("tableSwMin", json.data_z_min, json.rank_z_min);
                that.create_table_lsjz_detail("tableLlMax", json.data_q_max, json.rank_q_max);
                that.create_table_lsjz_detail("tableLlMin", json.data_q_min, json.rank_q_min);
            },
            error: function (errorMsg) {
                tools.show_message_error("获取历史极值信息失败!");
            }
        });
    },
    /**
     * 生成表格-历史极值-具体实现
     **/
    create_table_lsjz_detail: function (tableId, arr, redIndex) {
        var that = this;
        if (arr == null || arr.length == 0)
            return;

        var len = arr.length;
        var _html = new StringBuffer();
        if (tableId.indexOf("Sw") > -1) {
            for (var i = 0; i < len; i++) {
                if (Number(arr[i].rank) == Number(redIndex)) {
                    _html.append("<tr class='red'><td>" + arr[i].rank + "</td><td>" + arr[i].z + "</td><td>" + arr[i].tm + "</td></tr>");
                } else {
                    _html.append("<tr><td>" + arr[i].rank + "</td><td>" + arr[i].z + "</td><td>" + arr[i].tm + "</td></tr>");
                }
            }
        } else {
            for (var i = 0; i < len; i++) {
                if (Number(arr[i].rank) == Number(redIndex)) {
                    _html.append("<tr class='red'><td>" + arr[i].rank + "</td><td>" + arr[i].q + "</td><td>" + arr[i].tm + "</td></tr>");
                } else {
                    _html.append("<tr><td>" + arr[i].rank + "</td><td>" + arr[i].q + "</td><td>" + arr[i].tm + "</td></tr>");
                }
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
     * 过程线图例点击事件(Qx)
     **/
    add_click_Qx: function () {
        var that = this;
        that.chartQx.off("legendselectchanged");
        that.chartQx.on("legendselectchanged", function (params) {
            if (params.name in params.selected) {
                var state = params.selected[params.name];
                var option = tools.selectchangeChartlegendIcon(that.chartQx.getOption(), state, params.name);
                that.chartQx.setOption(option, true);
            }
        });

    },
    /**
     * 初始化所有ZQ曲线
     */
    init_ZQ_All: function () {
        var that = this
        let param = {
            stcd: that.show_stcd
        }
        var info = JSON.stringify(param);
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-rainsituation/real/getStZqrlList",
            data: info,
            success: function (data) {
                var res = data;
                if (res.code !== 200) {
                    tools.show_message_error("获取本站ZQ全数据失败!");
                    tools.loadinghide(false);
                    return
                }
                if (res.data.length === 0) {
                    tools.show_message_error("未获取到本站ZQ全数据!");
                    tools.loadinghide(false);
                    return
                }

                let htmlStart = "<label class='control-label ModifyShow'>ZQ曲线&nbsp;</label>" +
                    "<select id='select_zqQx_all' class='form-control' style='width:180px'>" +
                    "<option value=''>--请选择--</option>"
                let htmlEnd = "</select>"
                let html = ""
                $.each(res.data, function (index, item) {
                    html += "<option value='" + item.bgtm + "'>" + item.lnnm + "</option>"
                });
                $("#zqQx_all").html("")
                $("#zqQx_all").append(htmlStart + html + htmlEnd)
            },
            error: function (errorMsg) {
                tools.show_message_error("获取本站ZQ全数据失败!");
                tools.loadinghide(false);
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
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
                    // that.setActiveGraphicState(2, !state);

                }
            }
            if (params.name == "预报水位") {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];
                    // that.setActiveGraphicState(1, !state);
                }
            }
            if (that.show_sttp == "RR") {
                if (params.name == "汛限水位" || params.name == "正常蓄水位" || params.name == "设计水位" || params.name == "校核水位") {
                    var tempSw = that.obj_minMax_gcx.sw.max;
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
                    if (params.selected.汛限水位 && that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.xxsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.xxsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.正常蓄水位 && that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.zcsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.zcsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.设计水位 && that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.sjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.sjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.校核水位 && that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jhsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jhsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
                    if (params.selected.警戒水位 && that.obj_fcch_gcx.jjsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.jjsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.jjsw, that.obj_minMax_gcx.sw.min);
                    }
                    if (params.selected.保证水位 && that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                        tempSw = Math.max(tempSw, that.obj_fcch_gcx.bzsw);
                        that.obj_minMax_gcx.sw.min = Math.min(that.obj_fcch_gcx.bzsw, that.obj_minMax_gcx.sw.min);
                    }
                    var arrSw = new Array();
                    if (Math.abs(tempSw) == Math.abs(panelConfig.MAX_NUM) || Math.abs(that.obj_minMax_gcx.sw.min) == Math.abs(panelConfig.MIN_NUM)) {
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
        var axis_sw_min_temp = panelConfig.MAX_NUM;
        var axis_sw_max_temp = panelConfig.MIN_NUM;
        var axis_sw_min = panelConfig.MAX_NUM;
        var axis_sw_max = panelConfig.MIN_NUM;

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
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig.MAX_NUM) {
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
        var axis_sw_min = panelConfig.MAX_NUM;
        var axis_sw_max = panelConfig.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * panelConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * panelConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == panelConfig.MAX_NUM) {
                axis_sw_min = 0;
                axis_sw_max = 1;
            } else {
                axis_sw_min = axis_sw_min_temp - 3;
                axis_sw_max = axis_sw_max_temp + 3;
            }
        }

        return new Array(axis_sw_max, axis_sw_min);
    },
    /**
     * 获取最大最小值（流量）
     **/
    get_ll_max_min: function (axis_ll_max_temp, axis_ll_min_temp) {
        var that = this;
        var axis_ll_min = panelConfig.MAX_NUM;
        var axis_ll_max = panelConfig.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig.MAX_NUM) {
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
        var axis_ll_min_temp = panelConfig.MAX_NUM;
        var axis_ll_max_temp = panelConfig.MIN_NUM;
        var axis_ll_min = panelConfig.MAX_NUM;
        var axis_ll_max = panelConfig.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * panelConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * panelConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == panelConfig.MAX_NUM) {
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
        //判断时间差
        //var timeDiff = that.diffTimeHour(minTime, maxTime);
        //获取时间轴最大最小差值
        if (minTime != "" && maxTime != "") {
            //获取echarts实例宽度
            var chartWidth = that.chartGcx.getWidth() - 80;
            var distance = 110;
            if (chartWidth <= 600) { //单站
                distance = 110;
                //if (timeDiff > 24) {
                //    distance = 70;
                //} else {
                //    distance = 110;
                //}
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
     *  判断两个时间的时间差
     **/
    diffTimeHour: function (oldTime, newTime) {
        const timeDiff = (new Date(newTime.replace(/-/g, '/'))).getTime() - (new Date(oldTime.replace(/-/g, '/'))).getTime()
        const formatTimeDiff = timeDiff / (3600 * 1000)
        return formatTimeDiff
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
                bottom: 43,
                containLabel: true
            },
            dataZoom: [{
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
                    }
                },
                interval: intervalX,
                maxInterval: intervalX,
                minInterval: intervalX,
                axisLabel: {
                    color: "#000000",
                    formatter: function (value, index) {
                        return moment(value).format("DD日hh时");
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
                        color: panelConfig.ECHART_COLOR_RAIN
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
                        color: panelConfig.ECHART_COLOR_RAIN_SUM
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
                    color: panelConfig.ECHART_COLOR_RAIN_OUT,
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
                    shadowBlur: 5
                },
                barWidth: "95%",
                data: that.arr_ryl_data
            }, {
                name: '累计雨量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_RAIN_SUM
                },
                data: that.arr_ryl_sum
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },

    /**
     * 站点日雨量
     **/
    get_option_stcdRain: function (axis_rain_max, intervalX) {
        var that = this;
        var option = {
            grid: {
                left: 8,
                top: 28,
                right: 8,
                bottom: 43,
                containLabel: true
            },
            dataZoom: [{
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            legend: {
                show: true,
                type: 'scroll',
                top: 20,
                left: "center",
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                inactiveColor: '#DCDCDC',
                data: [],
                selected: {},
                width: "60%"
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
                    }
                },
                interval: intervalX,
                maxInterval: intervalX,
                minInterval: intervalX,
                axisLabel: {
                    color: "#000000",
                    formatter: function (value, index) {
                        return moment(value).format("DD日hh时");
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
                        color: panelConfig.ECHART_COLOR_RAIN
                    }
                },
                splitLine: {
                    show: false
                }
            }, ],
            tooltip: {
                trigger: "item",
                formatter: function (ob) {
                    return moment(ob.value[0].replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日hh时") + "</br>" + ob.seriesName + "：" + ob.value[1] + "mm";
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 10);
                }
            },
            series: [],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: panelConfig.ECHART_COLOR_RAIN
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
                        color: panelConfig.ECHART_COLOR_RAIN_SUM
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
                    color: panelConfig.ECHART_COLOR_RAIN_OUT,
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
                    shadowBlur: 5
                },
                barWidth: "95%",
                data: that.arr_sdyl_data
            }, {
                name: '累计雨量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_RAIN_SUM
                },
                data: that.arr_sdyl_sum
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
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


        var objData = {
            //  endTime: searchEtime,

            //   startTime: searchStime,

            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData);

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
                var xs_min_Y = dispatchConfig.MAX_NUM;
                var xs_max_Y = dispatchConfig.MIN_NUM;

                var ll_min_Y = dispatchConfig.MAX_NUM;
                var ll_max_Y = dispatchConfig.MIN_NUM;

                for (var i = 0; i < len; i++) {
                    if (arrList[i].toString().length == 0)
                        continue;

                    that.arr_zv_data.push({
                        value: [Number(arrList[i][0]), arrList[i][1]]
                    });
                    that.arr_zq_data.push({
                        value: [Number(arrList[i][0]), arrList[i][2]]
                    });


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
                that.create_table_zv(_res);


                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取ZV曲线失败!");
                return;
            }
        });

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
                    fontSize: 14
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
                name: "流量(m³/s)",
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
                name: '蓄水量',
                yAxisIndex: 0,
                symbol: "circle",
                lineStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_SW
                },
                hoverAnimation: false, //经过拐点动画取消
                data: that.arr_zv_data
            }, {
                type: 'line',
                name: '流量',
                yAxisIndex: 1,
                symbol: "circle",
                lineStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                itemStyle: {
                    color: dispatchConfig.ECHART_COLOR_LL
                },
                hoverAnimation: false, //经过拐点动画取消
                data: that.arr_zq_data
            }],
            backgroundColor: "#FAE6D2"
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 生成表格-ZV曲线
     **/
    create_table_zv: function (json) {
        var that = this;
        if (json == null || json == "")
            return;

        var _res = json;
        if (_res.data.length == 0)
            return;
        var gxqx_data = new Array();
        for (var i = 0; i < _res.data.length; i++) {
            var arr_child = new Array();
            arr_child.push(_res.data[i][0]);
            if (_res.data[i][1] == ".00") {
                _res.data[i][1] = "0.00"
            }
            arr_child.push(_res.data[i][1]);
            arr_child.push(_res.data[i][2]);
            // arr_child.push(tools.format_ll(_res.data[i][1]));
            // arr_child.push(tools.format_ll(_res.data[i][2]));
            gxqx_data.push(arr_child);
        }


        //转换DataTables
        that.datatables_zv = $(that.parentId + ' .tableZV').dataTable({
            "data": gxqx_data,
            "scrollY": that.panel_actual_height - 32 - 37 - 15 - 32,
            "scrollX": false,
            "sort": true,
            "aaSorting": [
                [1, "asc"]
            ], //默认排序
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                    color: panelConfig.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                        color: panelConfig.ECHART_COLOR_SW
                    },
                    showSymbol: false,
                    data: that.obj_data_gcx.sssw
                },
                //     {
                //     name: '闸下水位',
                //     type: 'line',
                //     yAxisIndex: 0,
                //     itemStyle: {
                //         color: panelConfig.ECHART_COLOR_ZXSW
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
                        color: panelConfig.ECHART_COLOR_LL
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
                        color: panelConfig.ECHART_COLOR_JJSW
                    },
                    markPoint: {
                        symbolSize: 1, //设置为0时 不显示标志
                        symbolOffset: [60, 0], //偏移值X Y
                        label: {
                            backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                        color: panelConfig.ECHART_COLOR_BZSW
                    },
                    markPoint: {
                        symbolSize: 1, //设置为0时 不显示标志
                        symbolOffset: [140, 0], //偏移值X Y
                        label: {
                            backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                data: ["水位", "入库流量", "出库流量", that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位", "设计水位", "校核水位"],
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: '入库流量',
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                itemStyle: {
                    //color: panelConfig.ECHART_COLOR_LL_DNTQ
                    color: panelConfig.ECHART_COLOR_RKLL
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
                    color: panelConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位：" + that.obj_fcch_gcx.xxsw : "正常蓄水位：" + that.obj_fcch_gcx.zcsw;
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
                data: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? that.obj_data_gcx.xxsw : that.obj_data_gcx.zcsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_SJSW,
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
                    color: panelConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [210, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JHSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-河道(预报)--山东云平台
     **/
    get_option_gcx_for_cloud: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
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
                type: 'scroll',
                animation: false,
                top: 20,
                left: "center",
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: ["雨量", that.show_sttp == "DD" ? "闸上水位" : "水位", "流量", "警戒水位", "保证水位"],
                selected: {
                    "雨量": false,
                    "水位": false,
                    // "API水位": false,
                    // "短时段水位": false,
                    "警戒水位": that.obj_fcch_gcx.showJjsw,
                    "保证水位": that.obj_fcch_gcx.showBzsw
                }
            },
            grid: {
                id: "cloud",
                left: 5,
                top: 45,
                right: 5,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                id: "xAxis_time",
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_RAIN
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
                    shadowBlur: 2
                },
                //barWidth: "95%",
                barMaxWidth: 13,
                data: that.obj_data_gcx.rain
            }, {
                name: that.show_sttp == "DD" ? "闸上水位" : "水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                data: that.obj_data_gcx.sssw
            }, {
                name: that.show_sttp == "RR" ? "入库流量" : "流量",
                type: 'line',
                yAxisIndex: 1,
                symbol: "circle",
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_LL
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
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                    color: panelConfig.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
    /**
     * 水位过程线参数-河道(预报)
     **/
    get_option_gcx_zz_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        if (that.show_stcd == "50102350") {
            that.obj_data_gcx.ssll = jQuery.grep(that.obj_data_gcx.ssll, function (item) {
                return Number(item.value[1]) > 0;
            });
        }
        var option = {
            title: {
                text: that.show_stnm + "水位流量过程线",
                textStyle: {
                    fontSize: 16
                },
                left: "center"
            },
            legend: {
                type: 'scroll',
                animation: false,
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
                    "预报水位": true,
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
                id: "xAxis_time",
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_RAIN
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                    color: panelConfig.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                type: 'scroll',
                animation: false,
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
                    "预报水位": true,
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
                id: "xAxis_time",
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_RAIN
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
                        color: panelConfig.ECHART_COLOR_RAIN_BAR,
                        shadowColor: panelConfig.ECHART_COLOR_SHADOW,
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
                        color: panelConfig.ECHART_COLOR_SW
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
                                    color: panelConfig.ECHART_COLOR_ZXSW
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
                        color: panelConfig.ECHART_COLOR_LL
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: panelConfig.ECHART_COLOR_LL
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
                        color: panelConfig.ECHART_COLOR_JJSW
                    },
                    markPoint: {
                        symbolSize: 1, //设置为0时 不显示标志
                        symbolOffset: [60, 0], //偏移值X Y
                        label: {
                            backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                        color: panelConfig.ECHART_COLOR_BZSW
                    },
                    markPoint: {
                        symbolSize: 1, //设置为0时 不显示标志
                        symbolOffset: [140, 0], //偏移值X Y
                        label: {
                            backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },

    // onSWPointDragging: function (dataIndex, that, max_sw_time, dx, dy) {
    //     if ((moment(that.obj_data_gcx.ybsw[dataIndex].value[0]).isBefore(moment(max_sw_time))) || (moment(that.obj_data_gcx.ybsw[dataIndex].value[0]).isSame(moment(max_sw_time)))) {
    //         //   alert(max_sw_time);
    //         return;
    //     }
    //     var newpos = that.chartGcx.convertFromPixel({
    //         xAxisIndex: 0,
    //         yAxisIndex: 0
    //     }, this.position);
    //     y = newpos[1].toFixed(2);
    //     /* x_tm=that.DateToTime(Math.round(Number(newpos[0]) / 1000), "Y-m-d- H")+":00:00";
    //      console.log("原： " + y + ":" + x_tm);*/
    //     var cur_idnex = that.obj_data_gcx.ybsw.findIndex(x => x.value[0] === that.sl_time);
    //     if (cur_idnex > -1) {
    //         that.obj_data_gcx.ybsw[cur_idnex].value[1] = y;
    //         that.obj_data_gcx_y_value.ybsw[cur_idnex] = y;
    //         that.chartGcx.setOption({
    //             series: [{
    //                 id: 'id_series_ybsw',
    //                 data: that.obj_data_gcx.ybsw
    //             }]
    //         });
    //         that.updateSWTbaleByModefyChart(cur_idnex, that);
    //         console.log("有： " + y + ":" + that.sl_time);

    //         that.update_ybsw_option();

    //     } else {
    //         //   console.log("无： " + y + ":" + x_tm);
    //     }


    // },
    // updateSWTbaleByModefyChart: function (dataIndex, that) {
    //     var y = that.obj_data_gcx.ybsw[dataIndex].value[1];
    //     $("#contProLine .tableSqxx tbody").find("tr").each(function () {

    //         var tdArr = $(this).children();
    //         var ybsw_tm = tdArr.eq(0).html();
    //         var tm = that.obj_data_gcx.ybsw[dataIndex].value[0].split('.')[0];
    //         //  var o_tm = tm.substring(0, tm.length - 3);
    //         //   o_tm = o_tm.substring(5);
    //         var o_tm = moment(tm).format("MM-DD HH:mm")
    //         if (ybsw_tm == o_tm) {
    //             if (that.show_sttp == "ZZ") {
    //                 tdArr.eq(3).find('input').val(y);
    //                 if (y >= that.obj_fcch_gcx.bzsw) {
    //                     tdArr.eq(3).find('input').css("color", "red");
    //                 } else if (y >= that.obj_fcch_gcx.jjsw) {
    //                     tdArr.eq(3).find('input').css("color", "blue");
    //                 } else if (y < that.obj_fcch_gcx.jjsw) {
    //                     tdArr.eq(3).find('input').css("color", "black");
    //                 }
    //             } else if (that.show_sttp == "DD") {
    //                 tdArr.eq(4).find('input').val(y);
    //                 if (y >= that.obj_fcch_gcx.bzsw) {
    //                     tdArr.eq(4).find('input').css("color", "red");
    //                 } else if (y >= that.obj_fcch_gcx.jjsw) {
    //                     tdArr.eq(4).find('input').css("color", "blue");
    //                 } else if (y < that.obj_fcch_gcx.jjsw) {
    //                     tdArr.eq(4).find('input').css("color", "black");
    //                 }
    //             } else if (that.show_sttp == "RR") {
    //                 tdArr.eq(4).find('input').val(y);
    //                 if (y >= that.obj_fcch_gcx.jhsw || y >= that.obj_fcch_gcx.sjsw) {
    //                     tdArr.eq(4).find('input').css("color", "red");
    //                 } else if (y >= that.obj_fcch_gcx.xxsw) {
    //                     tdArr.eq(4).find('input').css("color", "blue");
    //                 } else if (y < that.obj_fcch_gcx.xxsw) {
    //                     tdArr.eq(4).find('input').css("color", "black");
    //                 }
    //             }
    //             return false;
    //         }


    //     });
    // },
    // onSWPointDragend: function (dataIndex, that, dx, dy) {
    //     var _index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex.ybsw);
    //     if (_index < 0) {
    //         that.obj_data_gcx_y_modifyIndex.ybsw.push(dataIndex);
    //     }
    //     var all_index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex_all);
    //     if (all_index < 0) {
    //         that.obj_data_gcx_y_modifyIndex_all.push(dataIndex);
    //     }



    //     that.setDragPointShowOrHide(1, dataIndex, true);
    //     that.reflashDragPoint(1);
    //     //处理右侧table的数据的更新，思路，获取html内容，直接替换值，反过来，修改了table的值，则修改that.obj_data_gcx.ybsw的值，且更新graphic的position

    // },

    // onLLPointDragging: function (dataIndex, that, max_ll_time, dx, dy) {
    //     if (that.show_sttp == "RR") {
    //         if ((moment(that.obj_data_gcx.ll_in[dataIndex].value[0]).isBefore(moment(max_ll_time))) || (moment(that.obj_data_gcx.ll_in[dataIndex].value[0]).isSame(moment(max_ll_time)))) {

    //             return;
    //         }
    //     } else {
    //         if ((moment(that.obj_data_gcx.ybll[dataIndex].value[0]).isBefore(moment(max_ll_time))) || (moment(that.obj_data_gcx.ybll[dataIndex].value[0]).isSame(moment(max_ll_time)))) {

    //             return;
    //         }
    //     }

    //     var newpos = that.chartGcx.convertFromPixel({
    //         xAxisIndex: 0,
    //         yAxisIndex: 1
    //     }, this.position);
    //     y = newpos[1].toFixed(2);

    //     var cur_idnex = -1;
    //     if (that.show_sttp == "RR") {
    //         cur_idnex = that.obj_data_gcx.ll_in.findIndex(x => x.value[0] === that.sl_time);
    //     } else {
    //         cur_idnex = that.obj_data_gcx.ybll.findIndex(x => x.value[0] === that.sl_time);
    //     }
    //     if (cur_idnex > -1) {
    //         if (that.show_sttp == "RR") {
    //             that.obj_data_gcx.ll_in[cur_idnex].value[1] = y;
    //         } else {
    //             that.obj_data_gcx.ybll[cur_idnex].value[1] = y;
    //         }

    //         that.obj_data_gcx_y_value.ll_in[cur_idnex] = y;
    //         console.log("有： " + y + ":" + that.sl_time);
    //         that.chartGcx.setOption({
    //             series: [{
    //                 id: 'id_series_ybll',
    //                 data: that.show_sttp == "RR" ? that.obj_data_gcx.ll_in : that.obj_data_gcx.ybll
    //             }]
    //         });
    //         that.updateLLTbaleByModefyChart(cur_idnex, that);
    //         that.update_ybll_option();


    //     }





    // },
    // updateLLTbaleByModefyChart: function (dataIndex, that) {

    //     if (that.show_sttp == "RR") {
    //         var y = that.obj_data_gcx.ll_in[dataIndex].value[1];
    //         $("#contProLine .tableSqxx tbody").find("tr").each(function () {

    //             var tdArr = $(this).children();
    //             var ybsw_tm = tdArr.eq(0).html();
    //             var tm = that.obj_data_gcx.ll_in[dataIndex].value[0].split('.')[0];
    //             //   var o_tm = tm.substring(0, tm.length - 3);
    //             //  o_tm = o_tm.substring(5);
    //             var o_tm = moment(tm).format("MM-DD HH:mm")
    //             if (ybsw_tm == o_tm) {

    //                 tdArr.eq(7).find('input').val(y);


    //                 return false;
    //             }


    //         });
    //     } else {
    //         var y = that.obj_data_gcx.ybll[dataIndex].value[1];
    //         $("#contProLine .tableSqxx tbody").find("tr").each(function () {

    //             var tdArr = $(this).children();
    //             var ybsw_tm = tdArr.eq(0).html();
    //             var tm = that.obj_data_gcx.ybll[dataIndex].value[0].split('.')[0];
    //             //   var o_tm = tm.substring(0, tm.length - 3);
    //             //    o_tm = o_tm.substring(5);
    //             var o_tm = moment(tm).format("MM-DD HH:mm")
    //             if (ybsw_tm == o_tm) {
    //                 tdArr.eq(7).find('input').val(y);

    //                 return false;
    //             }


    //         });
    //     }

    // },
    // onLLPointDragend: function (dataIndex, that, dx, dy) {
    //     var _index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex.ll_in);
    //     if (_index < 0) {
    //         that.obj_data_gcx_y_modifyIndex.ll_in.push(dataIndex);
    //     }
    //     var all_index = $.inArray(dataIndex, that.obj_data_gcx_y_modifyIndex_all);
    //     if (all_index < 0) {
    //         that.obj_data_gcx_y_modifyIndex_all.push(dataIndex);
    //     }
    //     that.setDragPointShowOrHide(2, dataIndex, true);
    //     that.reflashDragPoint(2);


    //     //处理右侧table的数据的更新，思路，获取html内容，直接替换值，反过来，修改了table的值，则修改that.obj_data_gcx.ybsw的值，且更新graphic的position

    // },

    /**
     * 水位过程线参数-水库(预报)
     **/
    get_option_gcx_rr_for_cloud: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
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
                type: 'scroll',
                animation: false,
                top: 20,
                // left: "center",
                // orient: 'vertical',
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: ["雨量", "水位", "入库流量", that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位", "设计水位", "设计水位", "校核水位"],
                selected: {
                    "雨量": false,
                    "水位": true,
                    "入库流量": false,
                    "出库流量": false,
                    "汛限水位": that.obj_fcch_gcx.showXxsw,
                    "正常蓄水位": that.obj_fcch_gcx.showZcsw,
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
                id: "xAxis_time",
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_RAIN
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    //color: panelConfig.ECHART_COLOR_LL_DNTQ
                    color: panelConfig.ECHART_COLOR_RKLL
                },
                showSymbol: false,
                connectNulls: true, //连接空数据
                smooth: true, //平滑显示曲线
                smoothMonotone: "none",
                data: that.obj_data_gcx.ssll
            }, {
                name: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位：" + that.obj_fcch_gcx.xxsw : "正常蓄水位：" + that.obj_fcch_gcx.zcsw;
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
                data: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? that.obj_data_gcx.xxsw : that.obj_data_gcx.zcsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_SJSW,
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
                    color: panelConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [200, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JHSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
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
                type: 'scroll',
                animation: false,
                show: true,
                top: 20,
                left: "center",
                itemWidth: 20,
                itemHeight: 8,
                itemGap: 8,
                padding: [8, 100, 8, 80],
                data: ["雨量", "水位", "入库流量", "出库流量", "预报水位", "预报入库流量", that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位", "设计水位", "设计水位", "校核水位"],
                selected: {
                    "雨量": false,
                    "水位": true,
                    "入库流量": true,
                    "出库流量": false,
                    "预报水位": true,
                    "预报入库流量": true,
                    "汛限水位": that.obj_fcch_gcx.showXxsw,
                    "正常蓄水位": that.obj_fcch_gcx.showZcsw,
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
                id: "xAxis_time",
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                max: that.obj_minMax_gcx.rain.max == panelConfig.MIN_NUM ? 1 : parseInt(that.obj_minMax_gcx.rain.max * 8),
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_RAIN
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
                    color: panelConfig.ECHART_COLOR_RAIN_BAR,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW,
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    //color: panelConfig.ECHART_COLOR_LL_DNTQ
                    color: panelConfig.ECHART_COLOR_RKLL
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
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed",
                },
                data: that.obj_data_gcx.ll_in
            }, {
                name: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位" : "正常蓄水位",
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_XXSW,
                        padding: [5, 10, 5, 10],
                        formatter: function (ob) {
                            if (ob.dataIndex == 0) {
                                return that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? "汛限水位：" + that.obj_fcch_gcx.xxsw : "正常蓄水位：" + that.obj_fcch_gcx.zcsw;
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
                data: that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM ? that.obj_data_gcx.xxsw : that.obj_data_gcx.zcsw
            }, {
                name: '设计水位',
                type: 'line',
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                z: 5,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_SJSW,
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
                    color: panelConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [200, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JHSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                color: panelConfig.ECHART_COLOR_SW
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
                color: panelConfig.ECHART_COLOR_LL
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
                color: panelConfig.ECHART_COLOR_SW
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
                color: panelConfig.ECHART_COLOR_LL
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
                color: panelConfig.ECHART_COLOR_DDSW
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
                color: panelConfig.ECHART_COLOR_DDLL
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
                color: panelConfig.ECHART_COLOR_JJSW
            },
            markPoint: {
                symbolSize: 1, //设置为0时 不显示标志
                symbolOffset: [60, 0], //偏移值X Y
                label: {
                    backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                color: panelConfig.ECHART_COLOR_BZSW
            },
            markPoint: {
                symbolSize: 1, //设置为0时 不显示标志
                symbolOffset: [140, 0], //偏移值X Y
                label: {
                    backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
                    color: panelConfig.ECHART_COLOR_LL
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_SW
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
                        color: [panelConfig.ECHART_COLOR_GRID]
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
                        color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    //color: panelConfig.ECHART_COLOR_LL_DNTQ
                    color: panelConfig.ECHART_COLOR_RKLL
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
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_LL
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
                    color: panelConfig.ECHART_COLOR_DDSW
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
                    color: panelConfig.ECHART_COLOR_DDLL
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
                    color: panelConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_XXSW,
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
                    color: panelConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [140, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_SJSW,
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
                    color: panelConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [200, 0], //偏移值X Y
                    label: {
                        backgroundColor: panelConfig.ECHART_COLOR_JHSW,
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
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [20, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_SW,
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
                    color: panelConfig.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [100, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                    color: panelConfig.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [220, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
                    color: panelConfig.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_ZXSW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM_ZXSW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [90, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_ZXSW,
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
                    color: panelConfig.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [0, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_SW,
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
                    color: panelConfig.ECHART_COLOR_JJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [100, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_JJSW,
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
                    color: panelConfig.ECHART_COLOR_BZSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [220, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_BZSW,
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
                    color: panelConfig.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                        color: panelConfig.ECHART_COLOR_SW
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
                    color: panelConfig.ECHART_COLOR_SW,
                    width: 1
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM_SW,
                    opacity: 1
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [40, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_SW,
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
                    color: panelConfig.ECHART_COLOR_SSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [60, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_SSW,
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
                    color: panelConfig.ECHART_COLOR_XXSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [180, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_XXSW,
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
                    color: panelConfig.ECHART_COLOR_SJSW
                },
                markPoint: {
                    symbolSize: 1, //设置为0时 不显示标志
                    symbolOffset: [300, 0], //偏移值X Y
                    showDelay: 0,
                    label: {
                        show: true,
                        color: "#fff",
                        backgroundColor: panelConfig.ECHART_COLOR_SJSW,
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
                    color: panelConfig.ECHART_COLOR_DM_LINE,
                    width: 2
                },
                areaStyle: {
                    color: panelConfig.ECHART_COLOR_DM,
                    opacity: 1
                },
                data: that.obj_data_dmxx.data
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
        var min = panelConfig.MAX_NUM;
        var max = panelConfig.MIN_NUM;
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
    /**
     * 更新预报单站数据表
     **/
    updataYbSingleTable: function (json) {
        var that = this;
        //表头 河道：时间、水位、流量、预报水位、预报流量
        //    闸坝：时间、水位、闸下水位、流量、预报水位、预报流量
        //    水库：时间、水位、入库流量、出库流量、预报水位、预报流量
        //先清空数据
        $("#contProLine .ybsq-table-header table colgroup col").remove();
        $("#contProLine .ybsq-table-header table thead tr").remove();
        $("#contProLine .tableSqxx colgroup col").remove();
        $("#contProLine .tableSqxx tbody tr").remove();
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
        $("#contProLine .ybsq-table-header table colgroup").append(_html_col);
        $("#contProLine .tableSqxx colgroup").append(_html_col);
        $("#contProLine .ybsq-table-header table thead").append(_html_th);

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
                if (temp_Zs >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                    font_Zs_color = " style='color:Red'";
                } else if (temp_Zs >= that.obj_fcch_gcx.sjsw) {
                    font_Zs_color = " style='color:Red'";
                } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                    if (temp_Zs >= that.obj_fcch_gcx.xxsw) {
                        font_Zs_color = " style='color:Blue'";
                    }
                }
                if ((item.Z == "0") || (item.Z == "")) {
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : item.Z) + "</td><td class='" + grayclass + "'>" + item.Q + "</td><td class='" + grayclass + "'>" + item.Qs + "</td> <<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + " />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll' step='0.01' min='0' value='" + item.Qin + "'   /></td></tr>";

                } else {

                    var temp_z = Number(item.Z);
                    if (temp_z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    } else if (temp_z >= that.obj_fcch_gcx.sjsw) {
                        font_Z_start = "<font color='Red'>";
                        font_Z_end = "</font>";
                    }
                    if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM) {
                        if (temp_z >= that.obj_fcch_gcx.xxsw) {
                            font_Z_start = "<font color='Blue'>";
                            font_Z_end = "</font>";
                        }
                    }
                    _html_body += "<tr><td class='" + grayclass + "'>" + (item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm")) + "</td><td class='" + grayclass + "'>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td class='" + grayclass + "'>" + item.Q + "</td><td class='" + grayclass + "'>" + item.Qs + "</td> <<td class='yb_edit_input " + grayclass + "'> <input type='number' class='md_sw' step='0.01' min='0' value='" + item.Zs + "' " + font_Zs_color + "  readonly />" + "</td><td class='yb_edit_input " + grayclass + "'>" + "<input type='number' class='md_ll'  step='0.01' min='0' value='" + item.Qin + "'  readonly /></td></tr>";

                }
            }
        });
        $("#contProLine .tableSqxx tbody").append(_html_body);
    },
    /**
     * 修改预报单站表格数据替换模型
     **/
    change_tableData_forModel: function (model) {
        var that = this;
        var copyData;
        $.each(that.singleModeData.modelName, function (i, item) {
            if (model == item) {
                copyData = that.singleModeData.modelData[i]
            }
        })
        if (that.show_sttp == "RR") {
            $("#contProLine .ybsq-table-header table tr").find("th:eq(4)").html(model + "水位");
            $("#contProLine .ybsq-table-header table tr").find("th:eq(5)").html(model + "流量")
        } else {
            $("#contProLine .ybsq-table-header table tr").find("th:eq(3)").html(model + "水位");
            $("#contProLine .ybsq-table-header table tr").find("th:eq(4)").html(model + "流量")
        }
        $("#contProLine .tableSqxx tr").each(function (i, item) {
            if (that.show_sttp == "RR") {
                if (copyData.sw[i] >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                    $(this).find('td:eq(4)').children().css({
                        "color": "Red"
                    })
                } else if (copyData.sw[i] >= that.obj_fcch_gcx.sjsw) {
                    $(this).find('td:eq(4)').children().css({
                        "color": "Red"
                    })
                } else if (that.obj_fcch_gcx.xxsw != panelConfig.MIN_NUM && that.obj_fcch_gcx.zcsw == panelConfig.MIN_NUM && copyData.sw[i] >= that.obj_fcch_gcx.xxsw) {
                    $(this).find('td:eq(4)').children().css({
                        "color": "Blue"
                    })
                } else {
                    $(this).find('td:eq(4)').children().css({
                        "color": ""
                    })
                }
                $(this).find('td:eq(4)').children().val(copyData.sw[i]);
                $(this).find('td:eq(5)').children().val(copyData.ll[i]);
            } else {
                if (copyData.sw[i] >= that.obj_fcch_gcx.bzsw) {
                    $(this).find('td:eq(3)').children().css({
                        "color": "Red"
                    })
                } else if (copyData.sw[i] >= that.obj_fcch_gcx.jjsw) {
                    $(this).find('td:eq(3)').children().css({
                        "color": "Blue"
                    })
                } else {
                    $(this).find('td:eq(3)').children().css({
                        "color": ""
                    })
                }
                $(this).find('td:eq(3)').children().val(copyData.sw[i]);
                $(this).find('td:eq(4)').children().val(copyData.ll[i]);
            }
        })

    },

    /**
     * 二进制文件导出方法
     * @param url  下载地址
     * @param methodType  请求方法  POST|GET
     * @param param 请求参数 json格式
     * @param fileName 文件名称
     * @param sync 是否是异步 true|false
     */
    exportBlob: function (url, methodType, param, fileName, sync) {
        tools.loadingshow("正在导出数据中...");
        const xhr = new XMLHttpRequest();
        xhr.open(methodType, url, sync);
        //定义responseType='blob', 是读取文件成功的关键，这样设置可以解决下载文件乱码的问题
        xhr.responseType = "arraybuffer";
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", getCookie("accessToken"));
        xhr.onload = (res) => {
            // // xls类型: application/vnd.ms-excel
            // xlsx类型：application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8

            const blob = new Blob(["\ufeff", xhr.response], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
            });
        }
        xhr.send(JSON.stringify(param));
        var isexit = false;
        xhr.onreadystatechange = function () {
            if (isexit)
                return;
            var type = xhr.getResponseHeader('Content-Type');
            if (type == "application/json") {
                tools.loadinghide(false);
                tools.show_message_error_const("数据服务异常,请联系开发人员查看!");
                isexit = true;
            } else {
                if (xhr.readyState == 4) {
                    tools.loadinghide(false);
                    var newBlob = new Blob([xhr.response], {
                        type: 'text/plain;charset=UTF-8'
                    })
                    var anchor = document.createElement('a')
                    anchor.download = fileName
                    anchor.href = window.URL.createObjectURL(newBlob)
                    anchor.click()
                    isexit = true;
                }
            }
        }
        xhr.onerror = function (e) {
            console.log(e)
        };

    },

    /**
     * 旬月均值-流量
     * 旬月分开展示
     **/
    echart_bar_xyjz_q: function (stime, etime) {
        var that = this;
        //初始化
        that.obj_max_xyjz_q = {
            ll_xun: panelConfig.MIN_NUM,
            jp_xun: panelConfig.MIN_NUM,
            ll_month: panelConfig.MIN_NUM,
            jp_month: panelConfig.MIN_NUM
        };
        that.obj_data_xyjz_q = {
            option_xun: {},
            option_month: {},
            time_xun: new Array(),
            now_xun: new Array(),
            his_xun: new Array(),
            jp_xun: new Array(),
            time_month: new Array(),
            now_month: new Array(),
            his_month: new Array(),
            jp_month: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartMonthQ);

        //获取旬月均值流量
        var res = "";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            url: apiUrl_zf + "rs/get_Xyjz",
            data: JSON.stringify({
                Btime: stime,
                Etime: etime,
                stcd: that.show_stcd,
                type: "2"
            }),
            success: function (json) {
                if (json == null || json == undefined) {
                    tools.show_message_error("获取流量旬月均值失败!");
                    tools.hideChartLoading(that.chartMonthQ);
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    tools.hideChartLoading(that.chartMonthQ);
                    return;
                }

                //解析数据
                var arrRes = json.data;
                for (var i = 0; i < arrRes.length; i++) {
                    //旬月分开
                    if (arrRes[i].xun.indexOf("旬") > -1) {
                        that.obj_data_xyjz_q.time_xun.push({
                            value: [arrRes[i].xun, arrRes[i].year]
                        });
                        that.obj_data_xyjz_q.now_xun.push(-Number(arrRes[i].q));
                        that.obj_data_xyjz_q.his_xun.push(Number(arrRes[i].q_his));
                        that.obj_data_xyjz_q.jp_xun.push(Number(arrRes[i].ratio));

                        if (Math.abs(Number(arrRes[i].q)) > that.obj_max_xyjz_q.ll_xun) {
                            that.obj_max_xyjz_q.ll_xun = Math.abs(Number(arrRes[i].q));
                        }
                        if (Math.abs(Number(arrRes[i].q_his)) > that.obj_max_xyjz_q.ll_xun) {
                            that.obj_max_xyjz_q.ll_xun = Math.abs(Number(arrRes[i].q_his));
                        }
                        //流量为负值时 特殊计算最大流量
                        if (Math.abs(Number(arrRes[i].q) - Number(arrRes[i].q_his)) > that.obj_max_xyjz_q.ll_xun) {
                            that.obj_max_xyjz_q.ll_xun = Math.abs(Number(arrRes[i].q) - Number(arrRes[i].q_his));
                        }
                        if (Math.abs(Number(arrRes[i].ratio)) > that.obj_max_xyjz_q.jp_xun) {
                            that.obj_max_xyjz_q.jp_xun = Math.abs(Number(arrRes[i].ratio));
                        }
                    } else {
                        that.obj_data_xyjz_q.time_month.push({
                            value: [arrRes[i].xun, arrRes[i].year]
                        });
                        that.obj_data_xyjz_q.now_month.push(-Number(arrRes[i].q));
                        that.obj_data_xyjz_q.his_month.push(Number(arrRes[i].q_his));
                        that.obj_data_xyjz_q.jp_month.push(Number(arrRes[i].ratio));

                        if (Math.abs(Number(arrRes[i].q)) > that.obj_max_xyjz_q.ll_month) {
                            that.obj_max_xyjz_q.ll_month = Math.abs(Number(arrRes[i].q));
                        }
                        if (Math.abs(Number(arrRes[i].q_his)) > that.obj_max_xyjz_q.ll_month) {
                            that.obj_max_xyjz_q.ll_month = Math.abs(Number(arrRes[i].q_his));
                        }
                        //流量为负值时 特殊计算最大流量
                        if (Math.abs(Number(arrRes[i].q) - Number(arrRes[i].q_his)) > that.obj_max_xyjz_q.ll_month) {
                            that.obj_max_xyjz_q.ll_month = Math.abs(Number(arrRes[i].q) - Number(arrRes[i].q_his));
                        }
                        if (Math.abs(Number(arrRes[i].ratio)) > that.obj_max_xyjz_q.jp_month) {
                            that.obj_max_xyjz_q.jp_month = Math.abs(Number(arrRes[i].ratio));
                        }
                    }
                }

                //设置最大值
                that.obj_max_xyjz_q.ll_xun = that.obj_max_xyjz_q.ll_xun > 0 ? that.obj_max_xyjz_q.ll_xun * (1 + panelConfig.MAX_DEPART * 1.5) : 1;
                that.obj_max_xyjz_q.jp_xun = that.obj_max_xyjz_q.jp_xun > 100 ? that.obj_max_xyjz_q.jp_xun * (1 + panelConfig.MAX_DEPART * 1.5) : 100;
                that.obj_max_xyjz_q.ll_month = that.obj_max_xyjz_q.ll_month > 0 ? that.obj_max_xyjz_q.ll_month * (1 + panelConfig.MAX_DEPART * 1.5) : 1;
                that.obj_max_xyjz_q.jp_month = that.obj_max_xyjz_q.jp_month > 100 ? that.obj_max_xyjz_q.jp_month * (1 + panelConfig.MAX_DEPART * 1.5) : 100;

                //初始化图表
                that.obj_data_xyjz_q.option_xun = that.get_option_xyjz_q("xun");
                that.obj_data_xyjz_q.option_month = that.get_option_xyjz_q("month");

                // 使用刚指定的配置项和数据显示图表。
                if ($("#radXY_Xun").is(':checked')) {
                    that.chartMonthQ.setOption(that.obj_data_xyjz_q.option_xun, true);
                } else {
                    that.chartMonthQ.setOption(that.obj_data_xyjz_q.option_month, true);
                }
                tools.hideChartLoading(that.chartMonthQ);
            },
            error: function (e) {
                tools.show_message_error("获取流量旬月均值失败!");
                tools.hideChartLoading(that.chartMonthQ);
            }
        });
    },

    /**
     * 旬月均值-水位
     **/
    echart_bar_xyjz_z: function (stime, etime) {
        var that = this;
        //初始化
        that.obj_max_xyjz_z = {
            sw_xun: panelConfig.MIN_NUM,
            jp_xun: panelConfig.MIN_NUM,
            sw_month: panelConfig.MIN_NUM,
            jp_month: panelConfig.MIN_NUM
        };
        that.obj_data_xyjz_z = {
            option_xun: {},
            option_month: {},
            time_xun: new Array(),
            now_xun: new Array(),
            his_xun: new Array(),
            jp_xun: new Array(),
            time_month: new Array(),
            now_month: new Array(),
            his_month: new Array(),
            jp_month: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartMonthZ);

        //获取旬月均值水位
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            url: apiUrl_zf + "rs/get_Xyjz",
            data: JSON.stringify({
                Btime: stime,
                Etime: etime,
                stcd: that.show_stcd,
                type: "1",
                bxOrGc: "1"
            }),
            success: function (json) {
                if (json == null || json == undefined) {
                    tools.show_message_error("获取水位旬月均值失败!");
                    tools.hideChartLoading(that.chartMonthZ);
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    tools.hideChartLoading(that.chartMonthZ);
                    return;
                }

                //解析数据
                var arrRes = json.data;
                for (var i = 0; i < arrRes.length; i++) {
                    if (arrRes[i].xun.indexOf("旬") > -1) {
                        that.obj_data_xyjz_z.time_xun.push({
                            value: [arrRes[i].xun, arrRes[i].year]
                        });
                        that.obj_data_xyjz_z.now_xun.push(-Number(arrRes[i].z));
                        that.obj_data_xyjz_z.his_xun.push(Number(arrRes[i].z_his));
                        that.obj_data_xyjz_z.jp_xun.push(Number(arrRes[i].ratio));

                        if (Math.abs(Number(arrRes[i].z)) > that.obj_max_xyjz_z.sw_xun) {
                            that.obj_max_xyjz_z.sw_xun = Math.abs(Number(arrRes[i].z));
                        }
                        if (Math.abs(Number(arrRes[i].z_his)) > that.obj_max_xyjz_z.sw_xun) {
                            that.obj_max_xyjz_z.sw_xun = Math.abs(Number(arrRes[i].z_his));
                        }
                        //水位为负值时 特殊计算
                        if (Math.abs(Number(arrRes[i].z) - Number(arrRes[i].z_his)) > that.obj_max_xyjz_z.sw_xun) {
                            that.obj_max_xyjz_z.sw_xun = Math.abs(Number(arrRes[i].z) - Number(arrRes[i].z_his));
                        }
                        if (Math.abs(Number(arrRes[i].ratio)) > that.obj_max_xyjz_z.jp_xun) {
                            that.obj_max_xyjz_z.jp_xun = Math.abs(Number(arrRes[i].ratio));
                        }
                    } else {
                        that.obj_data_xyjz_z.time_month.push({
                            value: [arrRes[i].xun, arrRes[i].year]
                        });
                        that.obj_data_xyjz_z.now_month.push(-Number(arrRes[i].z));
                        that.obj_data_xyjz_z.his_month.push(Number(arrRes[i].z_his));
                        that.obj_data_xyjz_z.jp_month.push(Number(arrRes[i].ratio));

                        if (Math.abs(Number(arrRes[i].z)) > that.obj_max_xyjz_z.sw_month) {
                            that.obj_max_xyjz_z.sw_month = Math.abs(Number(arrRes[i].z));
                        }
                        if (Math.abs(Number(arrRes[i].z_his)) > that.obj_max_xyjz_z.sw_month) {
                            that.obj_max_xyjz_z.sw_month = Math.abs(Number(arrRes[i].z_his));
                        }
                        //水位为负值时 特殊计算
                        if (Math.abs(Number(arrRes[i].z) - Number(arrRes[i].z_his)) > that.obj_max_xyjz_z.sw_month) {
                            that.obj_max_xyjz_z.sw_month = Math.abs(Number(arrRes[i].z) - Number(arrRes[i].z_his));
                        }
                        if (Math.abs(Number(arrRes[i].ratio)) > that.obj_max_xyjz_z.jp_month) {
                            that.obj_max_xyjz_z.jp_month = Math.abs(Number(arrRes[i].ratio));
                        }
                    }
                }

                //设置最大值
                that.obj_max_xyjz_z.sw_xun = that.obj_max_xyjz_z.sw_xun > 0 ? that.obj_max_xyjz_z.sw_xun * (1 + panelConfig.MAX_DEPART * 1.5) : 1;
                that.obj_max_xyjz_z.jp_xun = that.obj_max_xyjz_z.jp_xun > 100 ? that.obj_max_xyjz_z.jp_xun * (1 + panelConfig.MAX_DEPART * 1.5) : 100;
                that.obj_max_xyjz_z.sw_month = that.obj_max_xyjz_z.sw_month > 0 ? that.obj_max_xyjz_z.sw_month * (1 + panelConfig.MAX_DEPART * 1.5) : 1;
                that.obj_max_xyjz_z.jp_month = that.obj_max_xyjz_z.jp_month > 100 ? that.obj_max_xyjz_z.jp_month * (1 + panelConfig.MAX_DEPART * 1.5) : 100;

                //初始化图表
                that.obj_data_xyjz_z.option_xun = that.get_option_xyjz_z("xun");
                that.obj_data_xyjz_z.option_month = that.get_option_xyjz_z("month");

                // 使用刚指定的配置项和数据显示图表。
                if ($("#radXY_Xun").is(':checked')) {
                    that.chartMonthZ.setOption(that.obj_data_xyjz_z.option_xun, true);
                } else {
                    that.chartMonthZ.setOption(that.obj_data_xyjz_z.option_month, true);
                }
                tools.hideChartLoading(that.chartMonthZ);
            },
            error: function (e) {
                tools.show_message_error("获取水位旬月均值失败!");
                tools.hideChartLoading(that.chartMonthZ);
            }
        });
    },
    /**
     * 旬月均值参数-流量
     **/
    get_option_xyjz_q: function (type) {
        var that = this;
        var option = {
            legend: {
                show: true,
                right: 150,
                data: ["当前均值", "历史同期", "距平"]
            },
            grid: {
                left: 8,
                top: 28,
                right: 8,
                bottom: 28,
                containLabel: true
            },
            xAxis: {
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#000",
                    interval: 0, //全部显示
                    margin: 2,
                    formatter: function (value, index) {
                        //竖文字
                        return tools.format_label_vertical(value);
                    }
                },
                // axisLabel: {
                //     interval: 0,
                //     color: "#000",
                //     formatter: function (value) {
                //         //x轴的文字改为竖版显示
                //         var res = value.substr(0, value.indexOf(",", 0));
                //         var str = res.split("");
                //         return str.join("\n");
                //     }
                // },
                splitLine: {
                    show: type == "xun" ? true : false,
                    interval: function (index, value) {
                        if (index % 3 == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    lineStyle: {
                        color: ['#000000'],
                        width: 1
                    }
                },
                data: type == "xun" ? that.obj_data_xyjz_q.time_xun : that.obj_data_xyjz_q.time_month
            },
            yAxis: [{
                type: 'value',
                position: 'left',
                name: '流量(m3/s)',
                nameLocation: "start",
                nameGap: 10,
                inverse: true, //反向坐标轴
                min: type == "xun" ? -that.obj_max_xyjz_q.ll_xun : -that.obj_max_xyjz_q.ll_month,
                max: type == "xun" ? that.obj_max_xyjz_q.ll_xun : that.obj_max_xyjz_q.ll_month,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    }
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        //返回正数
                        return tools.format_ll(Math.abs(value));
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                position: 'right',
                name: '百分比',
                nameGap: 10,
                min: type == "xun" ? -that.obj_max_xyjz_q.jp_xun : -that.obj_max_xyjz_q.jp_month,
                max: type == "xun" ? that.obj_max_xyjz_q.jp_xun : that.obj_max_xyjz_q.jp_month,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    }
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        //返回整数
                        return parseInt(value) + "%";
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            tooltip: {
                trigger: "axis",
                formatter: function (ob) {
                    return tools.format_tooltip_chart_xyjz(ob, "ll");
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 10);
                }
            },
            series: [{
                type: 'bar',
                name: '当前均值',
                yAxisIndex: 0,
                //barWidth: "95%",
                barCategoryGap: type == "xun" ? "20%" : "50%",
                label: {
                    show: true,
                    position: "top",
                    distance: 2,
                    color: panelConfig.ECHART_COLOR_NOW_XYJZ,
                    fontSize: 9,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value) == 0) {
                            return "";
                        } else {
                            return tools.format_ll(-(ob.value));
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_NOW_XYJZ,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW, //阴影效果
                    shadowBlur: 3
                },
                stack: 'one',
                data: type == "xun" ? that.obj_data_xyjz_q.now_xun : that.obj_data_xyjz_q.now_month
            }, {
                type: 'bar',
                name: '历史同期',
                yAxisIndex: 0,
                barCategoryGap: type == "xun" ? "20%" : "50%",
                label: {
                    show: true,
                    position: "bottom",
                    distance: 2,
                    color: panelConfig.ECHART_COLOR_HIS_XYJZ,
                    fontSize: 9,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value) == 0) {
                            return "";
                        } else {
                            return tools.format_ll(ob.value);
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_HIS_XYJZ,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW, //阴影效果
                    shadowBlur: 3
                },
                stack: 'one',
                data: type == "xun" ? that.obj_data_xyjz_q.his_xun : that.obj_data_xyjz_q.his_month
            }, {
                type: 'line',
                name: '距平',
                yAxisIndex: 1,
                symbol: "circle", //以后改为图片
                showAllSymbol: true,
                hoverAnimation: false,
                label: {
                    show: true,
                    distance: 3,
                    color: panelConfig.ECHART_COLOR_JP_LAB_XYJZ
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_JP_XYJZ
                },
                data: type == "xun" ? that.obj_data_xyjz_q.jp_xun : that.obj_data_xyjz_q.jp_month,
                markArea: {
                    silent: true,
                    data: [
                        [{
                                //底部背景色
                                name: '',
                                yAxis: type == "xun" ? -that.obj_max_xyjz_q.jp_xun : -that.obj_max_xyjz_q.jp_month,
                                itemStyle: {
                                    color: panelConfig.ECHART_COLOR_BG_BOTTOM
                                },
                            },
                            {
                                yAxis: 0
                            }
                        ],
                        [{
                            //上部背景色
                            name: '',
                            yAxis: 0,
                            itemStyle: {
                                color: panelConfig.ECHART_COLOT_BG_TOP
                            },
                        }, {
                            yAxis: type == "xun" ? that.obj_max_xyjz_q.jp_xun : that.obj_max_xyjz_q.jp_month
                        }]
                    ]
                }
            }]
        };

        return option;
    },
    /**
     * 旬月均值参数-水位
     **/
    get_option_xyjz_z: function (type) {
        var that = this;
        var option = {
            legend: {
                show: true,
                right: 150,
                data: ["当前均值", "历史同期", "距平"]
            },
            grid: {
                left: 8,
                top: 28,
                right: 8,
                bottom: 8,
                containLabel: true
            },
            xAxis: {
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#000",
                    interval: 0, //全部显示
                    margin: 2,
                    formatter: function (value, index) {
                        //竖文字
                        return tools.format_label_vertical(value);
                    }
                },
                splitLine: {
                    show: type == "xun" ? true : false,
                    interval: function (index, value) {
                        if (index % 3 == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    lineStyle: {
                        color: ['#000000'],
                        width: 1
                    }
                },
                data: type == "xun" ? that.obj_data_xyjz_z.time_xun : that.obj_data_xyjz_z.time_month
            },
            yAxis: [{
                type: 'value',
                position: 'left',
                name: '水位(m)',
                nameLocation: "start",
                nameGap: 10,
                inverse: true, //反向坐标轴
                min: type == "xun" ? -that.obj_max_xyjz_z.sw_xun : -that.obj_max_xyjz_z.sw_month,
                max: type == "xun" ? that.obj_max_xyjz_z.sw_xun : that.obj_max_xyjz_z.sw_month,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    }
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        //返回正数
                        return tools.format_sw(Math.abs(value));
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                position: 'right',
                name: '百分比',
                nameGap: 10,
                min: type == "xun" ? -that.obj_max_xyjz_z.jp_xun : -that.obj_max_xyjz_z.jp_month,
                max: type == "xun" ? that.obj_max_xyjz_z.jp_xun : that.obj_max_xyjz_z.jp_month,
                axisLine: {
                    lineStyle: {
                        color: "#000000"
                    }
                },
                axisLabel: {
                    show: true,
                    showMinLabel: false,
                    showMaxLabel: false,
                    formatter: function (value, index) {
                        //返回整数
                        return parseInt(value) + "%";
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            tooltip: {
                trigger: "axis",
                formatter: function (ob) {
                    return tools.format_tooltip_chart_xyjz(ob, "sw");
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position(pos, size, 10);
                }
            },
            series: [{
                type: 'bar',
                name: '当前均值',
                yAxisIndex: 0,
                //barWidth: "95%",
                barCategoryGap: type == "xun" ? "20%" : "50%",
                label: {
                    show: true,
                    position: "top",
                    distance: 2,
                    color: panelConfig.ECHART_COLOR_NOW_XYJZ,
                    fontSize: 9,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value) == 0) {
                            return "";
                        } else {
                            return tools.format_sw(-(ob.value));
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_NOW_XYJZ,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW, //阴影效果
                    shadowBlur: 3
                },
                stack: 'one',
                data: type == "xun" ? that.obj_data_xyjz_z.now_xun : that.obj_data_xyjz_z.now_month
            }, {
                type: 'bar',
                name: '历史同期',
                yAxisIndex: 0,
                barCategoryGap: type == "xun" ? "20%" : "50%",
                label: {
                    show: true,
                    position: "bottom",
                    distance: 2,
                    color: panelConfig.ECHART_COLOR_HIS_XYJZ,
                    fontSize: 9,
                    fontWeight: 600,
                    formatter: function (ob) {
                        if (Number(ob.value) == 0) {
                            return "";
                        } else {
                            return tools.format_sw(ob.value);
                        }
                    }
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_HIS_XYJZ,
                    shadowColor: panelConfig.ECHART_COLOR_SHADOW, //阴影效果
                    shadowBlur: 3
                },
                stack: 'one',
                data: type == "xun" ? that.obj_data_xyjz_z.his_xun : that.obj_data_xyjz_z.his_month
            }, {
                type: 'line',
                name: '距平',
                yAxisIndex: 1,
                symbol: "circle", //以后改为图片
                showAllSymbol: true,
                hoverAnimation: false,
                label: {
                    show: true,
                    distance: 3,
                    color: panelConfig.ECHART_COLOR_JP_LAB_XYJZ
                },
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_JP_XYJZ
                },
                data: type == "xun" ? that.obj_data_xyjz_z.jp_xun : that.obj_data_xyjz_z.jp_month,
                markArea: {
                    silent: true,
                    data: [
                        [{
                                //底部背景色
                                name: '',
                                yAxis: type == "xun" ? -that.obj_max_xyjz_z.jp_xun : -that.obj_max_xyjz_z.jp_month,
                                itemStyle: {
                                    color: panelConfig.ECHART_COLOR_BG_BOTTOM
                                },
                            },
                            {
                                yAxis: 0
                            }
                        ],
                        [{
                            //上部背景色
                            name: '',
                            yAxis: 0,
                            itemStyle: {
                                color: panelConfig.ECHART_COLOT_BG_TOP
                            },
                        }, {
                            yAxis: type == "xun" ? that.obj_max_xyjz_z.jp_xun : that.obj_max_xyjz_z.jp_month
                        }]
                    ]
                }
            }]
        };

        return option;
    },
    /**
     * 对比分析
     **/
    echart_line_dbfx: function (stime, etime, year, bxOrGc) {
        var that = this;
        //初始化
        that.obj_minMax_dbfx = {
            sw: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            },
            ll: {
                min: panelConfig.MAX_NUM,
                max: panelConfig.MIN_NUM
            }
        };
        that.obj_data_dbfx = {
            sw_now: new Array(),
            ll_now: new Array(),
            sw_last: new Array(),
            ll_last: new Array(),
            sw_dntq: new Array(),
            ll_dntq: new Array()
        };

        //等待框
        tools.showChartLoading(that.chartDbfx);

        stime = stime + " 08:00:00";
        etime = etime + " 08:00:00";
        var stime_db = year + stime.substr(4);
        var etime_db = year + etime.substr(4);
        //实时水情、多年同期同时查询-最后统一处理
        var ajaxIndex = 0;
        var objSq = null;
        var arrDntq = new Array();

        //实时水情
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            url: apiUrl_zf + "rs/get_Dbfx",
            data: JSON.stringify({
                Btime: stime,
                Etime: etime,
                BtimeDb: stime_db,
                EtimeDb: etime_db,
                stcd: that.show_stcd,
                sttp: that.show_sttp,
                bxOrGc: 1
            }),
            success: function (json) {
                objSq = json;
                callBack();

                if (json == null || json == undefined) {
                    tools.show_message_error("获取对比分析信息失败!");
                    tools.hideChartLoading(that.chartDbfx);
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    tools.hideChartLoading(that.chartDbfx);
                    return;
                }
            },
            error: function (e) {
                callBack();
                tools.hideChartLoading(that.chartDbfx);
                tools.show_message_error("获取对比分析信息失败!");
            }
        });

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            url: apiUrl_zf + "rs/get_Dntq",
            data: JSON.stringify({
                Btime: stime,
                Etime: etime,
                stcd: that.show_stcd,
                bxOrGc: bxOrGc
            }),
            success: function (json) {
                arrDntq = json.data;
                callBack();

                if (json == null || json == undefined) {
                    tools.show_message_error("查询对比分析(多年同期)失败!");
                    tools.hideChartLoading(that.chartDbfx);
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    tools.hideChartLoading(that.chartDbfx);
                    return;
                }
            },
            error: function (e) {
                callBack();
                tools.hideChartLoading(that.chartDbfx);
                tools.show_message_error("查询对比分析(多年同期)失败!");
            }
        });

        //回调函数用于解析数据
        var callBack = function () {
            ajaxIndex++;

            if (ajaxIndex == 2) {
                //解析实时数据  tm时间；z水位；q流量
                var arrSq = objSq.data;
                var lenSq = arrSq.length;
                for (var i = 0; i < lenSq; i++) {
                    if (!arrSq[i].hasOwnProperty("flwchrcd"))
                        arrSq[i].flwchrcd = "";

                    //干涸特殊处理
                    if (arrSq[i].flwchrcd == "干涸") {
                        that.obj_data_dbfx.sw_now.push({
                            value: [arrSq[i].tm, Number(arrSq[i].z) > 0 ? arrSq[i].z : ""]
                        });
                        that.obj_data_dbfx.ll_now.push({
                            value: [arrSq[i].tm, Number(arrSq[i].q) > 0 ? arrSq[i].q : ""]
                        });
                    } else {
                        //水位
                        that.obj_data_dbfx.sw_now.push({
                            value: [arrSq[i].tm, arrSq[i].z]
                        });
                        that.obj_minMax_dbfx.sw.min = Math.min(Number(arrSq[i].z), that.obj_minMax_dbfx.sw.min);
                        that.obj_minMax_dbfx.sw.max = Math.max(Number(arrSq[i].z), that.obj_minMax_dbfx.sw.max);
                        //流量
                        that.obj_data_dbfx.ll_now.push({
                            value: [arrSq[i].tm, arrSq[i].q]
                        });
                        if (arrSq[i].q != "") {
                            that.obj_minMax_dbfx.ll.min = Math.min(Number(arrSq[i].q), that.obj_minMax_dbfx.ll.min);
                            that.obj_minMax_dbfx.ll.max = Math.max(Number(arrSq[i].q), that.obj_minMax_dbfx.ll.max);
                        }
                    }
                }

                //解析对比数据  tm时间；z水位；q流量
                var arrSqDb = objSq.dataDb;
                lenSq = arrSqDb.length;
                var yearNow = etime.substr(0, 4);
                for (var i = 0; i < lenSq; i++) {
                    var tempTime = yearNow + arrSqDb[i].tm.substr(4, arrSqDb[i].tm.length - 4);
                    if (!arrSqDb[i].hasOwnProperty("flwchrcd"))
                        arrSqDb[i].flwchrcd = "";

                    //干涸特殊处理
                    if (arrSqDb[i].flwchrcd == "干涸") {
                        that.obj_data_dbfx.sw_last.push({
                            value: [tempTime, Number(arrSqDb[i].z) > 0 ? arrSqDb[i].z : ""]
                        });
                        that.obj_data_dbfx.ll_last.push({
                            value: [tempTime, Number(arrSqDb[i].q) > 0 ? arrSqDb[i].q : ""]
                        });
                    } else {
                        //水位
                        that.obj_data_dbfx.sw_last.push({
                            value: [tempTime, arrSqDb[i].z]
                        });
                        that.obj_minMax_dbfx.sw.min = Math.min(Number(arrSqDb[i].z), that.obj_minMax_dbfx.sw.min);
                        that.obj_minMax_dbfx.sw.max = Math.max(Number(arrSqDb[i].z), that.obj_minMax_dbfx.sw.max);
                        //流量
                        that.obj_data_dbfx.ll_last.push({
                            value: [tempTime, arrSqDb[i].q]
                        });
                        if (arrSqDb[i].q != "") {
                            that.obj_minMax_dbfx.ll.min = Math.min(Number(arrSqDb[i].q), that.obj_minMax_dbfx.ll.min);
                            that.obj_minMax_dbfx.ll.max = Math.max(Number(arrSqDb[i].q), that.obj_minMax_dbfx.ll.max);
                        }
                    }
                }

                //解析多年同期   //tm时间；z多年同期水位；q多年同期流量；
                if (arrDntq != null && arrDntq.length > 0) {
                    var len_dntq = arrDntq.length;
                    for (var i = 0; i < len_dntq; i++) {
                        //水位
                        that.obj_data_dbfx.sw_dntq.push({
                            value: [arrDntq[i].tm, arrDntq[i].z]
                        });
                        that.obj_minMax_dbfx.sw.min = Math.min(Number(arrDntq[i].z), that.obj_minMax_dbfx.sw.min);
                        that.obj_minMax_dbfx.sw.max = Math.max(Number(arrDntq[i].z), that.obj_minMax_dbfx.sw.max);
                        //流量
                        that.obj_data_dbfx.ll_dntq.push({
                            value: [arrDntq[i].tm, arrDntq[i].q]
                        });
                        that.obj_minMax_dbfx.ll.min = Math.min(Number(arrDntq[i].q), that.obj_minMax_dbfx.ll.min);
                        that.obj_minMax_dbfx.ll.max = Math.max(Number(arrDntq[i].q), that.obj_minMax_dbfx.ll.max);
                    }
                }

                //获取最高水位和最大流量
                var max_sw_temp = that.obj_minMax_dbfx.sw.max;
                var min_sw_temp = that.obj_minMax_dbfx.sw.min;
                var max_ll_temp = that.obj_minMax_dbfx.ll.max;
                var min_ll_temp = that.obj_minMax_dbfx.ll.min;
                if (max_sw_temp - min_sw_temp > 0) {
                    that.obj_minMax_dbfx.sw.min = min_sw_temp - (max_sw_temp - min_sw_temp) * panelConfig.MIN_DEPART;
                    that.obj_minMax_dbfx.sw.max = max_sw_temp + (max_sw_temp - min_sw_temp) * panelConfig.MAX_DEPART;
                } else {
                    if (min_sw_temp == panelConfig.MAX_NUM) {
                        that.obj_minMax_dbfx.sw.min = 0;
                        that.obj_minMax_dbfx.sw.max = 1;
                    } else {
                        that.obj_minMax_dbfx.sw.min = min_sw_temp > 0 ? min_sw_temp - 0.5 : 0;
                        that.obj_minMax_dbfx.sw.max = max_sw_temp + 0.5;
                    }
                }
                if (max_ll_temp - min_ll_temp > 0) {
                    that.obj_minMax_dbfx.ll.min = min_ll_temp - (max_ll_temp - min_ll_temp) * panelConfig.MIN_DEPART;
                    that.obj_minMax_dbfx.ll.max = max_ll_temp + (max_ll_temp - min_ll_temp) * panelConfig.MAX_DEPART;
                } else {
                    if (min_ll_temp == panelConfig.MAX_NUM) {
                        that.obj_minMax_dbfx.ll.min = 0;
                        that.obj_minMax_dbfx.ll.max = 1;
                    } else {
                        that.obj_minMax_dbfx.ll.min = min_ll_temp > 0 ? min_ll_temp - 0.5 : 0;
                        that.obj_minMax_dbfx.ll.max = max_ll_temp + 0.5;
                    }
                }

                //获取时间轴刻度
                var intervalX = that.get_axis_interval_dbfx();
                //获取时间轴格式化字符串
                var strFormatX = that.format_axis_label_dbfx();
                //初始化图表
                var option = {};
                option = that.get_option_dbfx(intervalX, strFormatX);


                // 使用刚指定的配置项和数据显示图表。
                that.chartDbfx.setOption(option, true);
                tools.hideChartLoading(that.chartDbfx);
            }
        }
    },
    /**
     * 获取时间轴刻度-对比分析用
     **/
    get_axis_interval_dbfx: function () {
        var that = this;
        //获取时间轴最大最小差值
        var minTime, maxTime;
        if (that.obj_data_dbfx.sw_now != null && that.obj_data_dbfx.sw_now.length > 0) {
            minTime = that.obj_data_dbfx.sw_now[0].value[0];
            maxTime = that.obj_data_dbfx.sw_now[that.obj_data_dbfx.sw_now.length - 1].value[0];

            //获取echarts4实例宽度
            var chartWidth = that.chartDbfx.getWidth() - 80;
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
     * 格式化时间刻度值-对比分析线
     **/
    format_axis_label_dbfx: function () {
        var that = this;
        var res = "DD日HH时";
        //获取时间轴最大最小差值
        var minTime, maxTime;
        if (that.obj_data_dbfx.sw_now != null && that.obj_data_dbfx.sw_now.length > 0) {
            minTime = that.obj_data_dbfx.sw_now[0].value[0];
            maxTime = that.obj_data_dbfx.sw_now[that.obj_data_dbfx.sw_now.length - 1].value[0];

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
     * 对比分析参数
     **/
    get_option_dbfx: function (intervalX, strFormatX) {
        var that = this;
        var option = {
            legend: {
                show: false,
                data: ["当前水位", "当前流量", "对比水位", "对比流量", "多年同期水位", "多年同期流量"],
                selected: {
                    "当前水位": that.get_is_show_dbfx("now_sw"),
                    "当前流量": that.get_is_show_dbfx("now_ll"),
                    "对比水位": that.get_is_show_dbfx("last_sw"),
                    "对比流量": that.get_is_show_dbfx("last_ll"),
                    "多年同期水位": that.get_is_show_dbfx("dntq_sw"),
                    "多年同期流量": that.get_is_show_dbfx("dntq_ll")
                }
            },
            grid: {
                left: 5,
                top: 25,
                right: 8,
                bottom: 5,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_AXIS_X
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
                        color: [panelConfig.ECHART_COLOR_GRID]
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_GRID_MINOR
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
                min: that.obj_minMax_dbfx.sw.min,
                max: that.obj_minMax_dbfx.sw.max,
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
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: [panelConfig.ECHART_COLOR_GRID]
                    }
                },
                minorSplitLine: {
                    show: true,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_GRID_MINOR
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
                min: that.obj_minMax_dbfx.ll.min,
                max: that.obj_minMax_dbfx.ll.max,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_LL
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
                snap: true,
                axisPointer: {
                    type: "cross",
                    label: {
                        show: true,
                        padding: [5, 5, 5, 5],
                        formatter: function (obj) {
                            if (obj.axisDimension == "x") {
                                return moment(obj.value).format("YYYY-MM-DD HH:mm");
                            } else {
                                //左侧轴
                                if (obj.axisIndex == 0) {
                                    return tools.format_sw(obj.value);
                                } else {
                                    return tools.format_ll(obj.value);
                                }
                            }
                            return "";
                        }
                    },
                    lineStyle: {
                        color: panelConfig.ECHART_COLOR_CROSS,
                        type: "solid"
                    },
                    crossStyle: {
                        color: panelConfig.ECHART_COLOR_CROSS,
                        type: "dashed"
                    }
                },
                formatter: function (ob) {
                    return tools.format_tooltip_chart(ob, "1");
                },
                position: function (pos, params, dom, rect, size) {
                    return tools.format_tooltip_position_left(pos, size, 5);
                }
            },
            series: [{
                name: '当前水位',
                type: 'line',
                yAxisIndex: 0,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SW
                },
                showSymbol: false,
                connectNulls: false,
                data: that.obj_data_dbfx.sw_now
            }, {
                name: '当前流量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_LL
                },
                showSymbol: false,
                connectNulls: false, //连接空数据
                // smooth: true,     //平滑显示曲线
                // smoothMonotone: "none",
                data: that.obj_data_dbfx.ll_now
            }, {
                name: '对比水位',
                type: 'line',
                yAxisIndex: 0,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SW
                },
                lineStyle: {
                    type: "dashed"
                },
                showSymbol: false,
                connectNulls: false,
                data: that.obj_data_dbfx.sw_last
            }, {
                name: '对比流量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_LL
                },
                lineStyle: {
                    type: "dashed"
                },
                showSymbol: false,
                connectNulls: false, //连接空数据
                // smooth: true,     //平滑显示曲线
                // smoothMonotone: "none",
                data: that.obj_data_dbfx.ll_last
            }, {
                name: '多年同期水位',
                type: 'line',
                yAxisIndex: 0,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_SW_DNTQ
                },
                lineStyle: {
                    type: "dashed"
                },
                showSymbol: false,
                data: that.obj_data_dbfx.sw_dntq
            }, {
                name: '多年同期流量',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_LL_DNTQ
                },
                lineStyle: {
                    type: "dashed"
                },
                showSymbol: false,
                data: that.obj_data_dbfx.ll_dntq
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
        }

        return option;
    },
    /**
     * 对比分析-是否显示
     **/
    get_is_show_dbfx: function (type) {
        var that = this;
        var _show = false;

        switch (type) {
            case "now_sw": //实时水位
                _show = $("#chkNowSw_Dbfx").is(':checked');
                break;
            case "now_sw2": //实时水位-任意时间
                _show = $("#chkNowSw_Dbfx2").is(':checked');
                break;
            case "now_ll": //实时流量
                _show = $("#chkNowLl_Dbfx").is(':checked');
                break;
            case "now_ll2": //实时流量-任意时间
                _show = $("#chkNowLl_Dbfx2").is(':checked');
                break;
            case "last_sw": //对比水位
                _show = $("#chkLastSw_Dbfx").is(':checked');
                break;
            case "last_sw2": //对比水位-任意时间
                _show = $("#chkLastSw_Dbfx2").is(':checked');
                break;
            case "last_ll": //对比流量
                _show = $("#chkLastLl_Dbfx").is(':checked');
                break;
            case "last_ll2": //对比流量-任意时间
                _show = $("#chkLastLl_Dbfx2").is(':checked');
                break;
            case "dntq_sw": //多年同期水位
                _show = $("#chkDntqSw_Dbfx").is(':checked');
                break;
            case "dntq_sw2": //多年同期水位-任意时间
                _show = $("#chkDntqSw_Dbfx2").is(':checked');
                break;
            case "dntq_ll": //多年同期流量
                _show = $("#chkDntqLl_Dbfx").is(':checked');
                break;
            case "dntq_ll2": //多年同期流量-任意时间
                _show = $("#chkDntqLl_Dbfx2").is(':checked');
                break;
        }

        return _show;
    },
    /**
     * 对比分析-点击事件
     **/
    add_click_dbfx: function () {
        var that = this;
        /**
         * 实时CheckBox
         **/
        $("#chkNowSw_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "当前水位"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "当前水位"
                });
            }
        });
        $("#chkNowLl_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "当前流量"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "当前流量"
                });
            }
        });

        /**
         * 对比CheckBox
         **/
        $("#chkLastSw_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "对比水位"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "对比水位"
                });
            }
        });
        $("#chkLastLl_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "对比流量"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "对比流量"
                });
            }
        });

        /**
         * 多年同期CheckBox
         **/
        $("#chkDntqSw_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "多年同期水位"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "多年同期水位"
                });
            }
        });
        $("#chkDntqLl_Dbfx").bind("change", function () {
            if ($(this).is(':checked')) {
                that.chartDbfx.dispatchAction({
                    type: 'legendToggleSelect',
                    name: "多年同期流量"
                });
            } else {
                that.chartDbfx.dispatchAction({
                    type: 'legendUnSelect',
                    name: "多年同期流量"
                });
            }
        });
    },
};
