/**
 * 面板配置文件
 */
var panelConfig = {
    //面板默认宽度
    panel_default_width: 1200,
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
    ECHART_COLOR_BACKGROUND: "#181725",
    //X轴
    ECHART_COLOR_AXIS_X: "#ffffff",
    //水位
    ECHART_COLOR_SW: "#ffffff",
    //时间轴
    ECHART_COLOR_TM: "#ffffff",
    //调度水位
    ECHART_COLOR_SW_DD: "#2F4554",
 
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
    ECHART_COLOR_JJSW: "#77B5FF",
    //保证水位
    ECHART_COLOR_BZSW: "#8B0000",
    //汛限水位
    ECHART_COLOR_XXSW: "#77B5FF",
    //校核水位
    ECHART_COLOR_JHSW: "#FF00FF",
    //雨量
    ECHART_COLOR_RAIN: "#6ECAFF",
    //累计雨量
    ECHART_COLOR_RAIN_SUM: "#77B5FF",
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
    ECHART_COLOR_DDSW: "#77B5FF",
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
        that.chartGcx = echarts.init($("#proLineBody")[0] );
        //echarts实例-日雨量柱状图
        that.chartRyl = echarts.init($("#rainInfoBody")[0] );
        //echarts实例-时段雨量柱状图
        that.chartSdyl = echarts.init($("#rainInfoHourBody")[0] );
        //echarts实例-断面信息
        that.chartDm = echarts.init($("#dmInfoBody")[0] );
        //echarts实例-ZV曲线
        that.chartZV = echarts.init($("#zvChartBody")[0] );
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
            that.reflashDragPoint(3);
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
            

            //echarts清空数据
            that.chartGcx.clear();
            that.chartRyl.clear();
            that.chartSdyl.clear();
            that.chartDm.clear();
            that.chartZV.clear();

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
        });        /**
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
            var marRight;
            var margin_right = parseInt($(this).parent().next().css("margin-right"));

           // that.modifyFormInline(that.panel_actual_width);
            //右缩进
            if ($(this).hasClass("iconRight")) {
                if (margin_right <= 25)
                    return;

                if (margin_right == (that.panel_actual_width - 20 )) {
                    if (that.show_type == "3") {
                        marRight = 575;
                    } else {
                        if (((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000"))&&(that.show_type=="2")) 
                            marRight=640;
                        else
                        marRight = 625;
                    }
                } else {
                    marRight = 25;
                }
            } else {
                //左缩进
                if (margin_right >= (that.panel_actual_width - 20  ))
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
                    marRight = (that.panel_actual_width - 20  );
                }
            }
            if (marRight == 25) {
                $(this).parent().prev().hide();
                $("#proLineBody").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-getRain").show();
                    $("#btn_ybsw-save").show();
                    $("#btn_ybsw-updaily").show();
                }

                $(this).parent().prev().width(0);
            } else if (marRight == (that.panel_actual_width - 20 )) {
                $("#proLineBody").hide();
                $("#btn_ybsw-modify").hide();
                $("#btn_ybsw-getRain").hide();
                $("#btn_ybsw-save").hide();
                $("#btn_ybsw-updaily").hide();
                $(this).parent().prev().show();

                //最后的减2是边框的宽度
                $(this).parent().prev().width(marRight - 25 - 2); //2019-10-08 modify by chl 
            } else {
                $("#proLineBody").show();
                if (that.show_type == "2") {
                    $("#btn_ybsw-modify").show();
                    $("#btn_ybsw-getRain").show();
                    $("#btn_ybsw-save").show();
                    $("#btn_ybsw-updaily").show();
                }
                $(this).parent().prev().show();

                $(this).parent().prev().width(marRight - 25);
            }


            var w_right = $(this).parent().prev().width() + 2;
            $("#proLineBody").width(that.panel_actual_width - 20 - marRight ); //2019-10-08 modify by chl 
            $("#contProLine .content-left").width(that.panel_actual_width - 20 - marRight );//2019-10-08 modify by chl

            var w_left = $("#proLineBody").width();
            $("#contProLine").width(w_left + 25 + w_right); //2019-10-08 modify by chl 
            $(this).parent().next().animate({ "margin-right": marRight }, 500);



            if (that.chartGcx != null) {
                that.chartGcx.resize();
            }
            //刷新拖动点
            that.reflashDragPoint(3);


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
                if (that.datatables_zv != null && $("#contDd_ZV .dataTables_scrollHead .tableZV").width() <= 100) {
                    that.datatables_zv.columns.adjust();
                }
            }
            that.add_click_ZV();
        });

 
        
     
        //单站统计表点击事件
        $(this.parentId + " .table_ybtj").on("click", ".linkModel", function (e) {

            var model = $(this).attr("_data");
            var seriesName;
            if (model == "API6") {
                seriesName = 'API流量';
            }
            if (model == "API2") {
                seriesName = '短时段流量';
            }
            if (model == "XAJ2") {
                seriesName = 'XAJ流量';
            }
            if (model == "MGE2") {
                seriesName = '融合流量';
            }

            that.chartGcx.dispatchAction({
                type: 'highlight',
                seriesName: seriesName
            })

            setTimeout(dounplay, 1000)

            function dounplay() {
                that.chartGcx.dispatchAction({
                    type: 'downplay',
                    seriesName: seriesName
                })
            }


            $(that.parentId + " .table_ybtj tr").removeClass("hover");
            $(this).addClass("hover");
        });

     
       // that.change_table_jh_input();
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

        if (that.show_type == "2" || that.show_type == "3") {
            //$("#linkTj_Hd").click();
        }

        that.panel_actual_width = panelConfig.panel_default_width;
        that.panel_actual_height =  that.show_type == "1" ? panelConfig.panel_default_height : panelConfig.panel_default_height2;
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

        
            $("#contProLine .content-left").css("margin-right", 425);
            $("#contProLine .sidebar-right,#contProLine .sidebar-control-right").show();
            $("#contProLine .field_yb").hide();
            

        } else {
           
        }
        that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true, true);

        //根据站类显示不同的内容
        var _html_header = "";
  
        var days_forward_gcx = -3;
        
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
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: panelConfig.panel_default_height,
            minWidth: panelConfig.panel_default_width,
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
        var res = getRsvrStnInfo;
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
            url: apiUrl_fzg + fun,
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
            sw: { min: panelConfig.MAX_NUM, max: panelConfig.MIN_NUM },
            ll: { min: panelConfig.MAX_NUM, max: panelConfig.MIN_NUM }
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
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            startTime: searchStime,
            endTime: searchEtime,
        };
        var info = JSON.stringify(objData);

        //等待框
        tools.showChartLoading(that.chartGcx);


        //实时水情

        var res = getWshedRealGcx.data;
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
                that.obj_data_gcx.sssw.push({ value: [item.TM, item.Z] });
                that.obj_minMax_gcx.sw.min = Math.min(Number(item.Z), that.obj_minMax_gcx.sw.min);
                that.obj_minMax_gcx.sw.max = Math.max(Number(item.Z), that.obj_minMax_gcx.sw.max);
                //流量
                if (item.Q != "" && item.Q != "0") {
                    that.obj_data_gcx.ssll.push({ value: [item.TM, item.Q] });
                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Q), that.obj_minMax_gcx.ll.min);
                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Q), that.obj_minMax_gcx.ll.max);
                }

                if (that.show_sttp == "RR") {
                    //入库流量
                    if (item.Qin != "" && item.Qin != "0") {
                        that.obj_data_gcx.ll_in.push({ value: [item.TM, item.Qin] });
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
                    that.obj_data_gcx.jjsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.jjsw] });
                    that.obj_data_gcx.jjsw.push({ value: [maxTime, that.obj_fcch_gcx.jjsw] });
                }

                //保证水位
                if (that.obj_fcch_gcx.bzsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.bzsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.bzsw] });
                    that.obj_data_gcx.bzsw.push({ value: [maxTime, that.obj_fcch_gcx.bzsw] });
                }
            } else if (that.show_sttp == "RR") {
                //汛限水位
                if (that.obj_fcch_gcx.xxsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.xxsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.xxsw] });
                    that.obj_data_gcx.xxsw.push({ value: [maxTime, that.obj_fcch_gcx.xxsw] });
                }
                //正常水位
                if (that.obj_fcch_gcx.zcsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.zcsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.zcsw] });
                    that.obj_data_gcx.zcsw.push({ value: [maxTime, that.obj_fcch_gcx.zcsw] });
                }
                //设计水位
                if (that.obj_fcch_gcx.sjsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.sjsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.sjsw] });
                    that.obj_data_gcx.sjsw.push({ value: [maxTime, that.obj_fcch_gcx.sjsw] });
                }
                //校核水位
                if (that.obj_fcch_gcx.jhsw > panelConfig.MIN_NUM) {
                    that.obj_data_gcx.jhsw.push({ value: [that.obj_data_gcx.sssw[0].value[0], that.obj_fcch_gcx.jhsw] });
                    that.obj_data_gcx.jhsw.push({ value: [maxTime, that.obj_fcch_gcx.jhsw] });
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
        var objData = {
            stcd: that.show_stcd,
            startTime: searchStime,
            endTime: searchEtime,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormId: _hisStormId,
            plan: searchPlan
        };
        var info = JSON.stringify(objData);
        res = getWshedRealPP;
        if (res == "") {
            tools.hideChartLoading(that.chartRyl);
            alert("获取降雨信息失败!");
            return;
        }
        var json = res.data;
        //解析数据
        var _max = panelConfig.MIN_NUM;
        $.each(json.data, function (index, item) {
            _max = Math.max(Number(item[1]), _max);
            that.arr_ryl_data.push({ value: [item[0], Number(item[1])] });
            that.arr_ryl_sum.push({ value: [item[0], Number(item[2])] });
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

        //柱子点击事件-跳转时段雨量
        that.chartRyl.off("click");
   
 
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
                axisLen = axisLen <= 10 ? axisLen : 10;// axisLen > (that.arr_ryl_data.length - 1) ? (that.arr_ryl_data.length - 1) : axisLen;
                return (moment(maxTime.replace(new RegExp(/-/gm), "/")).valueOf() - moment(minTime.replace(new RegExp(/-/gm), "/")).valueOf()) / axisLen;
            } else {
                return 99999999;
            }
        } else {
            return 3450000;  //一小时
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
                    that.arr_sdyl_data.push({ value: [tempTime, child[1]] });
                    _max = Math.max(Number(child[1]), _max);
                    sum += Number(child[1]);
                    that.arr_sdyl_sum.push({ value: [tempTime, sum == parseInt(sum) ? sum : sum.toFixed(1)] });
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
            gc: { min: panelConfig.MAX_NUM, max: panelConfig.MIN_NUM }
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

        var res = getSection;
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

        var lenGc = jsonData.data.recNum;



        for (var i = 0; i < lenGc; i++) {
            that.obj_data_dmxx.data.push({ value: [jsonData.data.di[i], Number(jsonData.data.zb[i])] });
        }

        //数据处理
        if (that.show_sttp == "ZZ" || that.show_sttp == "TT") {


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
            }
            else if (that.obj_fcch_dmxx.jjsw != "") {
                leftGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
            }
            else if (that.obj_fcch_dmxx.sw != "") {
                leftGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
            }
            /* if (arrTz[6] != "") {
                 rightGz = arrTz[6];
             }
             else */
            if (that.obj_fcch_dmxx.bzsw != "") {
                rightGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
            }
            else if (that.obj_fcch_dmxx.jjsw != "") {
                rightGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
            }
            else if (that.obj_fcch_dmxx.sw != "") {
                rightGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
            }

            //特征值数据源
            if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                if (that.obj_fcch_dmxx.sw != "") {
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                }
                if (that.obj_fcch_dmxx.jjsw != "") {
                    that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw] });
                    that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw] });
                }
                if (that.obj_fcch_dmxx.bzsw != "") {
                    that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw] });
                    that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw] });
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
            }
            else if (that.obj_fcch_dmxx.jjsw != "") {
                leftGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
            }
            else if (that.obj_fcch_dmxx.sw != "") {
                leftGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
            }
            /* if (arrTz[7] != "") {
                 rightGz = arrTz[7];
             }
             else */
            if (that.obj_fcch_dmxx.bzsw != "") {
                rightGz = (that.obj_fcch_dmxx.bzsw * 1.05).toString()
            }
            else if (that.obj_fcch_dmxx.jjsw != "") {
                rightGz = (that.obj_fcch_dmxx.jjsw * 1.2).toString()
            }
            else if (that.obj_fcch_dmxx.sw != "") {
                rightGz = (that.obj_fcch_dmxx.sw * 1.25).toString()
            }

            //特征值数据源
            if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                if (that.obj_fcch_dmxx.sw != "") {
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                }
                if (that.obj_fcch_dmxx.sw_zx != "") {
                    that.obj_data_dmxx.sw_zx.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw_zx] });
                    that.obj_data_dmxx.sw_zx.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw_zx] });
                }
                if (that.obj_fcch_dmxx.jjsw != "") {
                    that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw] });
                    that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw] });
                }
                if (that.obj_fcch_dmxx.bzsw != "") {
                    that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw] });
                    that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw] });
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
            }
            else if (that.obj_fcch_dmxx.xxsw != "") {
                leftGz = (that.obj_fcch_dmxx.xxsw * 1.1).toString()
            }
            else if (that.obj_fcch_dmxx.sw != "") {
                leftGz = (that.obj_fcch_dmxx.sw * 1.15).toString()
            }

            //特征值数据源
            if (that.obj_data_dmxx.data != null && that.obj_data_dmxx.data.length > 0) {
                if (that.obj_fcch_dmxx.sw != "") {
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                }
                if (that.obj_fcch_dmxx.ssw != "") {
                    that.obj_data_dmxx.ssw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.ssw] });
                    that.obj_data_dmxx.ssw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.ssw] });
                }
                if (that.obj_fcch_dmxx.xxsw != "") {
                    that.obj_data_dmxx.xxsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.xxsw] });
                    that.obj_data_dmxx.xxsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.xxsw] });
                }
                if (that.obj_fcch_dmxx.sjsw != "") {
                    that.obj_data_dmxx.sjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sjsw] });
                    that.obj_data_dmxx.sjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sjsw] });
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
                    that.obj_data_dmxx.data.push({ value: [i, leftGz] });
                }
                //第一个坡度
                for (var i = 5; i <= 9; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, (Number(leftGz) * Number(1 - (i - 5 + 1) * 0.2)).toString()] });
                }
                //中间详细数据
                for (var i = 10; i <= 30; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, 0] });
                }
                //第二个坡度
                for (var i = 31; i <= 35; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, (Number(rightGz) * Number(0.2 * (i - 31))).toString()] });
                }
                //第二个平台
                for (var i = 36; i <= 39; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, rightGz] });
                }

                if (that.show_sttp == "ZZ" || that.show_sttp == "TT") {
                    if (that.obj_fcch_dmxx.sw != "") {
                        that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                        that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                    }
                    if (that.obj_fcch_dmxx.jjsw != "") {
                        that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw] });
                        that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw] });
                    }
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw] });
                        that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw] });
                    }
                } else {
                    if (that.obj_fcch_dmxx.sw != "") {
                        that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                        that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                    }
                    if (that.obj_fcch_dmxx.sw_zx != "") {
                        that.obj_data_dmxx.sw_zx.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw_zx] });
                        that.obj_data_dmxx.sw_zx.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw_zx] });
                    }
                    if (that.obj_fcch_dmxx.jjsw != "") {
                        that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.jjsw] });
                        that.obj_data_dmxx.jjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.jjsw] });
                    }
                    if (that.obj_fcch_dmxx.bzsw != "") {
                        that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.bzsw] });
                        that.obj_data_dmxx.bzsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.bzsw] });
                    }
                }
            } else {
                //中间详细数据
                for (var i = 1; i <= 20; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, 0] });
                }
                //第一个坡度
                for (var i = 21; i <= 25; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, (Number(leftGz) * Number(0.2 * (i - 21))).toString()] });
                }
                //第一个平台
                for (var i = 26; i <= 29; i++) {
                    that.obj_data_dmxx.data.push({ name: i, value: [i, leftGz] });
                }

                if (that.obj_fcch_dmxx.sw != "") {
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sw] });
                    that.obj_data_dmxx.sw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sw] });
                }
                if (that.obj_fcch_dmxx.ssw != "") {
                    that.obj_data_dmxx.ssw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.ssw] });
                    that.obj_data_dmxx.ssw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.ssw] });
                }
                if (that.obj_fcch_dmxx.xxsw != "") {
                    that.obj_data_dmxx.xxsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.xxsw] });
                    that.obj_data_dmxx.xxsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.xxsw] });
                }
                if (that.obj_fcch_dmxx.sjsw != "") {
                    that.obj_data_dmxx.sjsw.push({ value: [that.obj_data_dmxx.data[0].value[0], that.obj_fcch_dmxx.sjsw] });
                    that.obj_data_dmxx.sjsw.push({ value: [that.obj_data_dmxx.data[that.obj_data_dmxx.data.length - 1].value[0], that.obj_fcch_dmxx.sjsw] });
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

    
    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize, isInit) {

        var that = this;
        $(this.parentId).width(width).height(height);
      //  that.modifyFormInline(width);

        var tjTableHeight = $(this.parentId + " .field_yb").height();
        //获取真实宽度
        var _width = width - 20;
        $("#contProLine").width(_width - 0);
        var _height = height - 32 - 33 - 15;
        if ((that.show_type == "2" || that.show_type == "3") && that.show_all) {
            _height = _height - panelConfig.table_height_yb;
            //$(this.parentId + " .tj_body").width(_width - 0);
            $(this.parentId + " .tableHd," + this.parentId + " .tableSk," + this.parentId + " .tableHp," + this.parentId + " .tableXx").parent().height(panelConfig.table_height_yb - 33 - 33 - 10);
            $(this.parentId + " .ybtj-table-header").css({
                "width": "100%",
                "padding-right": tools.scroll_default_width + "px"
            });
            //that.modifyFormInline(width);
        }
        //基本信息
        $(this.parentId).find(".table-jbxx").width(_width - 2 - 0); //2019-10-8 modify by chl
        $(this.parentId).find(".table-jbxx").parent().height(_height - 2);
        var isshowall = false;
        //过程线
        if (that.show_type == "1" || ((that.show_type == "2" || that.show_type == "3") && !that.show_all)) {
            if (that.show_type == "3") {

                $("#proLineBody").width(_width - 575 - 0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                $("#contProLine .content-left").css("margin-right", 575);
                $("#contProLine .content-left").css("margin-top", -28);
                $("#contProLine .sidebar-right").width(550);

              

            } else {
                if (((that.show_stcd == "50101100") || (that.show_stcd == "50102350") || (that.show_stcd == "50103000"))&&(that.show_type=="2")) {
                    $("#contProLine .content-left").width(_width - 840 - 2);
                    $("#proLineBody").width(_width - 840 - 2).height(_height - (that.show_type == "2" ? tjTableHeight : 0) - 48);
                    $("#contProLine .content-left").css("margin-right", 440);
                    $("#contProLine .content-left").css("margin-top", 0);
                    $("#contProLine .sidebar-right").width(615);

                }
                else {
                    $("#contProLine .content-left").width(_width - 625 - 2);
                    $("#proLineBody").width(_width - 625 - 2).height(_height - (that.show_type == "2" ? tjTableHeight : 0) - 48);
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
            }
            else {
                //判断当前状态，是两个都有，还是单个
                var v_left = $("#proLineBody").is(':visible');
                var v_right = $("#contProLine .sidebar-right").is(':visible');
                if ((v_left) && (v_right)) {
                    $("#contProLine .sidebar-right").show();
                    $("#proLineDd").show();
                    $("#contProLine .content-left").show();
                }
                else if (v_left) {
                    $("#proLineBody").width(that.panel_actual_width - 0 - 20 - 25 - 2).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine .content-left").css("margin-right", 25);
                    $("#contProLine .sidebar-right").width(0);
                }
                else if (v_right) {
                    $("#proLineBody").width(0).height(_height - (that.show_type != "1" ? 105 : 0) - (($(".ybsw-modify").is(":visible")) ? 45 : 0)); //2019-10-8 modify by chl
                    $("#contProLine .content-left").css("margin-right", that.panel_actual_width - 0 - 20);

                    $("#contProLine .sidebar-right").width(that.panel_actual_width - 0 - 20 - 25 - 2);
                }

            }
        }


        if (isResize) {
            this.chartGcx.resize();
        }

        //降雨信息
        $("#rainInfoBody").width(_width - 10 - 0).height(_height - 10); //2019-10-8 modify by chl
        $("#rainInfoHourBody").width(_width - 10).height(_height - 10);
        if (isResize) {
            this.chartRyl.resize();
            this.chartSdyl.resize();
        }

        //断面信息
        $("#dmInfoBody").width(_width - 0).height(_height); //2019-10-8 modify by chl
        if (isResize) {
            this.chartDm.resize();
        }
        $("#ifram_qjt").width(_width - 0).height(_height);
        $("#ifram_spjk").width(_width - 0).height(_height);
        $("#dix_mxxz").width(_width - 0).height(_height);

        //ZV曲线
        $("#contDd_ZV").height(_height);
        $("#zvChartBody").width(_width - 280 - 0).height(_height); //2019-10-012 modify by chl
        if (isResize) {
            this.chartZV.resize();
        }

        //水位流量关系曲线
        $("#contQx").height(_height).width(_width - 0);
        $("#contQx img").height(_height).width(_width - 0);



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
                }
                else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Q + "</td></tr>";
            } else if (that.show_sttp == "DD") {
                var temp_z = Number(item.Z);
                if (temp_z >= that.obj_fcch_gcx.bzsw) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                }
                else if (temp_z >= that.obj_fcch_gcx.jjsw) {
                    font_Z_start = "<font color='Blue'>";
                    font_Z_end = "</font>";
                }
                _html_body += "<tr><td>" + (item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm")) + "</td><td>" + (item.Z == "0" ? "" : font_Z_start + item.Z + font_Z_end) + "</td><td>" + item.Q + "</td></tr>";
            } else if (that.show_sttp == "RR") {
                var temp_z = Number(item.Z);
                if (temp_z >= (that.obj_fcch_gcx.jhsw < 0 ? 9999 : that.obj_fcch_gcx.jhsw)) {
                    font_Z_start = "<font color='Red'>";
                    font_Z_end = "</font>";
                }
                else if (temp_z >= that.obj_fcch_gcx.sjsw) {
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
            if (chartWidth <= 600) {//单站
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
                bottom: 8,
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
                    color: panelConfig.ECHART_COLOR_TM,
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
                    color: panelConfig.ECHART_COLOR_TM,
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
            endTime: searchEtime,
 
            startTime: searchStime,
   
            stcd: that.show_stcd,
        };
        var info = JSON.stringify(objData);

        var res = getStcdZQ;
        if (res == null || res == "") {
            tools.loadinghide(false);
            tools.show_message_error("获取ZV曲线失败!");
            return;
        }

        var json = res.data;
        if (json.code == "0") {
            tools.loadinghide(false);
            tools.show_message_error(json.msg);
        } else {


            var _res = json;


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
            that.create_table_zv(_res);

        }
        tools.loadinghide(true);
 
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
                    color:"#ffffff",
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
                        color: "#77B5FF",
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
                hoverAnimation: false,  //经过拐点动画取消
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
                hoverAnimation: false,  //经过拐点动画取消
                data: that.arr_zq_data
            }],
            backgroundColor: panelConfig.ECHART_COLOR_BACKGROUND
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
                },
                    textStyle: {
 
                    color: "#ffffff",
                },
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
                    color: panelConfig.ECHART_COLOR_TM,
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
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                }, textStyle: {

                    color: "#ffffff",
                },
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
                    color: panelConfig.ECHART_COLOR_TM,
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
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
                },
                data: that.obj_data_gcx.bzsw
            }],
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
                }, textStyle: {

                    color: "#ffffff",
                },
                inactiveColor: "#ff0000"
            },
            grid: {
                left: 5,
                top: 25,
                right: 5,
                bottom: 5,
              //  show:true,
             //   backgroundColor:"#181725",
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
                    color: panelConfig.ECHART_COLOR_TM,
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
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
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
                connectNulls: true,   //连接空数据
                smooth: true,     //平滑显示曲线
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                yAxisIndex: 0,
                symbol: "circle",
                showSymbol: false,
                itemStyle: {
                    color: panelConfig.ECHART_COLOR_JHSW
                },
                markPoint: {
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                data: ["分洪流量"], textStyle: {

                    color: "#ffffff",
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
                    color: panelConfig.ECHART_COLOR_TM,
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
                data: ["实时水位", "警戒水位", "保证水位"], textStyle: {

                    color: "#ffffff",
                },
                inactiveColor: "#ff0000"
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            yAxis: that.obj_fcch_dmxx.sw,
                            x: that.obj_fcch_dmxx.sw_position + "%"
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                data: ["闸上水位", "闸下水位", "警戒水位", "保证水位"], textStyle: {

                    color: "#ffffff",
                },
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            yAxis: that.obj_fcch_dmxx.sw_zx,
                            x: that.obj_fcch_dmxx.sw_position + "%"
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            yAxis: that.obj_fcch_dmxx.sw,
                            x: that.obj_fcch_dmxx.sw_position + "%"
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                data: ["实时水位", "汛限水位", "设计水位", "兴利水位"], textStyle: {

                    color: "#ffffff",
                },
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            yAxis: that.obj_fcch_dmxx.sw,
                            x: that.obj_fcch_dmxx.sw_position + "%"
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
                    symbolSize: 1,    //设置为0时 不显示标志
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
                    data: [
                        {
                            name: '显示值',
                            type: 'min'
                        }
                    ]
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
        var index = -1;   //分段索引
        var isFirst = true; //是否首个数据
        for (var i = 0; i < len; i++) {
            if (Number(arr[i].value[1]) < _sw) {
                if (isFirst) {
                    index++;
                    arrDm.push({ begin: Number(arr[i].value[0]), end: Number(arr[i].value[0]) });
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