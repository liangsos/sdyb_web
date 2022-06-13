/**
 * 面板配置文件
 */
var resultConfig = {
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
    ECHART_COLOR_RAIN_BAR: "#A8DFFF",
    //调度对比水位
    ECHART_COLOR_DDSW: "#0000FF",
    //调度对比流量
    ECHART_COLOR_DDLL: "#008000",

};

/**
 * Tools_Result类-用于展示结果面板
 * 说明:使用this.为全局属性可供外部调用，prototype为自定义方法
 * 该类相对于PanelCommon()类主要的区别是，该类倾向于组件，而PanelCommon倾向于是整体（返回结果也是Object整体）
 * 日志:2019-10-14新增
 */
var Tools_Result = function () {
    //面板初始化
    this.panelInit();
};

"use strict";
Tools_Result.prototype = {
    //接口路径
    ApiUrlPath: "",
    //版本号
    version: "1.0.0",
    //面板父元素ID
    parentId: "#panelJg",
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

    searchplan: "",

    /**
     * 面板初始化添加事件
     */
    panelInit: function () {
        var that = this;
        //判断高度是否超出
        if (resultConfig.panel_default_height > $(document).height()) {
            resultConfig.panel_default_height = $(document).height();
        }
        that.setPanelSize(resultConfig.panel_default_width, resultConfig.panel_default_height, false);
        //echarts实例-过程线
        that.chartGcx = echarts.init($("#proLineBody-Jg")[0]);

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
                    "margin-left": "-" + resultConfig.panel_default_width / 2 + "px",
                    "margin-top": "-" + (that.show_type == "1" ? resultConfig.panel_default_height : resultConfig.panel_default_height2 + resultConfig.table_height_yb) / 2 + "px"
                });
                that.panel_actual_width = resultConfig.panel_default_width;
                that.panel_actual_height = that.show_type == "1" ? resultConfig.panel_default_height : resultConfig.panel_default_height2 + resultConfig.table_height_yb;
                //设置水情面板相关宽高
                that.setPanelSize(that.panel_actual_width, that.panel_actual_height, true);
                $(this).attr("data-type", "");
                that.chartGcx.resize();
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
                that.chartGcx.resize();
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

            $("#proLineBody-Jg").show();
            $(that.parentId).hide();
            tools.hidePanelIndex(that.parentId.replace("#", ""));
        });

    
    },
 
   

  
    
    /**
     * 展示面板
     * _stcd站码 _stnm站名 _time截止时间 _sttp站类 _btime开始时间(非必填)
     **/
    panelShow: function (_stcd, _stnm, _time, _sttp, _btime, _plan) {
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
        that.searchplan = _plan;

        //展示面板
        $(that.parentId).show();

        that.panel_actual_width = resultConfig.panel_default_width;
        that.panel_actual_height = resultConfig.panel_default_height;
        //判断高度是否超出
        if (that.panel_actual_height > $(document).height()) {
            that.panel_actual_height = $(document).height();
        }

        $("#treeMenuJg").show();
        $("#proLineBody-Jg").css("margin-top", 30);
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
        _html_header = searchRangeName + "各站点预报数据曲线图";

        var days_forward_gcx = -3;
        if (that.show_sttp == "ZZ") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "河道站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = resultConfig.days_forward_zz;
        } else if (that.show_sttp == "DD") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "闸坝站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = resultConfig.days_forward_dd;
        } else if (that.show_sttp == "RR") {
            $(that.parentId).find(".modal-title").html(that.show_type == "1" ? "水库站点详细信息-" + _stnm : _html_header);
            days_forward_gcx = resultConfig.days_forward_rr;
        }
        if (_btime == "" || _btime == null || _btime == undefined) {
            that.show_btime = moment(_time).add(days_forward_gcx, 'days').format("YYYY-MM-DD 08:00:00");
        } else {
            that.show_btime = _btime;
        }

        that.echart_line_gcx_for(that.show_btime, that.show_etime);

        ////////////面板自由缩放设置////////////
        $(this.parentId).resizable({
            //固定宽高比
            ghost: true,     //拖动时 半透明
            helper: true,
            maxHeight: null,
            maxWidth: null,
            minHeight: resultConfig.panel_default_height,
            minWidth: resultConfig.panel_default_width,
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
    echart_line_gcx_for: function (stime, etime) {
        var that = this;
        //var arr_data = new Array();

        //stime = $("#beginTime").val() + ":00";
        //etime = $("#endTime").val() + ":00";

        var days_forward_gcx = -3;
        if (that.show_sttp == "ZZ" || that.show_sttp == "ZQ") {
            days_forward_gcx = resultConfig.days_forward_zz;
        } else if (that.show_sttp == "DD") {
            days_forward_gcx = resultConfig.days_forward_dd;
        } else if (that.show_sttp == "RR") {
            days_forward_gcx = resultConfig.days_forward_rr;
        }
        if (stime == "" || stime == null || stime == undefined) {
            stime = moment(etime).add(days_forward_gcx, 'days').format("yyyy-mm-dd 08:00:00");
        }

        //初始化参数

        that.obj_minMax_gcx = {
            sw: { min: resultConfig.MAX_NUM, max: resultConfig.MIN_NUM },
            ll: { min: resultConfig.MAX_NUM, max: resultConfig.MIN_NUM },
        };

        that.obj_data_gcx = {
            ybsw: new Array(),
            ybll: new Array(),
        };
        var obj_data_gcx_single = {
            show_stcd: null,
            show_stnm: null,
            show_sttp: null,
        }

        if (is_selectXAJ == true) {//是否选择了新安江模式
            var model = "XAJ";
        } else {
            var model = "";
        }

        //var info = JSON.stringify(objData);

        //等待框
        tools.showChartLoading(that.chartGcx);
        //查询数据
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            url: that.ApiUrlPath + "/get_Stcd_For",
            data: "{'stcd':'" + that.show_stcd + "','stime':'" + stime + "','etime':'" + etime + "','plan':'" + that.searchplan + "','day':'" + selectDays + "','userId':'" + $("#_hid_userid").val() + "','model':'" + model + "'}",
            //data: "{'info':'" + info + "'}",
            success: function (data) {
                var res = data.d;
                if (res == "" || res == null) {
                    //tools.hideChartLoading(that.chartGcx);
                    tools.show_message_error("查询过程线(预报信息)失败!");
                }

                var jsonFor = JSON.parse(res);
                if (jsonFor.code == "0") {
                    tools.show_message_error(jsonFor.msg);
                    return;
                } else {

                    //先获取流量/入库流量最后一段都为0或者空的数据 提取出最后为空的时刻
                    var arrQ = new Array();
                    var arrQin = new Array();
                    var emptyTM = "";
                    var emptyAll = true;
                    var emptyTM_In = "";
                    var emptyAll_In = true;
                    $.each(jsonFor.data, function (index, item) {
                        arrQ.push({ TM: item.TM, Q: item.Q });
                        arrQin.push({ TM: item.TM, Qin: item.Qin });
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
                        //预报水位
                        if (item.Zs != "" && item.Zs != "0") {
                            that.obj_data_gcx.ybsw.push({ value: [item.TM, item.Zs] });
                            that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zs), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zs), that.obj_minMax_gcx.sw.max);
                        }
                        else {
                            that.obj_data_gcx.ybsw.push({ value: [item.TM, 0] });
                            that.obj_minMax_gcx.sw.min = Math.min(Number(0), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(0), that.obj_minMax_gcx.sw.max);

                        }
                        //预报流量(水库代表实测出库)
                        if (item.Qs != "" && item.Qs != "0") {
                            if (that.show_sttp != "RR") {
                                //obj_data_gcx_bk.ll_in.push({ value: [item.TM, item.Qs] });
                                //that.obj_data_gcx_y_value.ll_in.push(item.Qs);
                            }
                            that.obj_data_gcx.ybll.push({ value: [item.TM, item.Qs] });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qs), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qs), that.obj_minMax_gcx.ll.max);
                        }
                        else {
                            if (that.show_sttp != "RR") {
                                //that.obj_data_gcx_bk.ll_in.push({ value: [item.TM, 0] });
                                //that.obj_data_gcx_y_value.ll_in.push(0);
                            }
                            that.obj_data_gcx.ybll.push({ value: [item.TM, 0] });
                            that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                            that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                        }


                        if (that.show_sttp == "ZZ" || that.show_sttp == "ZQ") {
                        } else if (that.show_sttp == "DD") {
                            ////闸下水位
                            that.obj_data_gcx.ybsw.push({ value: [item.TM, item.Zx] });
                            that.obj_minMax_gcx.sw.min = Math.min(Number(item.Zx), that.obj_minMax_gcx.sw.min);
                            that.obj_minMax_gcx.sw.max = Math.max(Number(item.Zx), that.obj_minMax_gcx.sw.max);
                        } else if (that.show_sttp == "RR") {
                            //预报入库流量
                            if (!((emptyAll_In || !emptyAll_In && moment(item.TM).diff(moment(emptyTM_In), "minutes", true) >= 0))) {
                                if (!(item.Qin == "" || item.Qin == "0")) {
                                    that.obj_data_gcx.ybll.push({ value: [item.TM, item.Qin] });
                                    that.obj_minMax_gcx.ll.min = Math.min(Number(item.Qin), that.obj_minMax_gcx.ll.min);
                                    that.obj_minMax_gcx.ll.max = Math.max(Number(item.Qin), that.obj_minMax_gcx.ll.max);
                                }
                                else {
                                    that.obj_data_gcx.ybll.push({ value: [item.TM, 0] });
                                    that.obj_minMax_gcx.ll.min = Math.min(Number(0), that.obj_minMax_gcx.ll.min);
                                    that.obj_minMax_gcx.ll.max = Math.max(Number(0), that.obj_minMax_gcx.ll.max);
                                }

                            }
                        }
                    });

                    obj_data_gcx_single.show_stcd = that.show_stcd;
                    obj_data_gcx_single.show_stnm = that.show_stnm;
                    obj_data_gcx_single.show_sttp = that.show_sttp;


                    if (that.is_checked) {
                        //被选中，数组中添加该站点信息
                        that.arr_data.push({ value: [that.obj_data_gcx, that.obj_minMax_gcx, obj_data_gcx_single] });
                    } else {
                        //取消选中，数组中删除改站点信息
                        var index = that.indexOf();
                        if (index != -1) {
                            that.arr_data.splice(index, 1);
                        }
                    }
                    if (that.arr_data.length > 0) {
                        //获取各站点水位流量最大最小值
                        var arr_sw_max = new Array();
                        var arr_sw_min = new Array();
                        var arr_ll_max = new Array(); 
                        var arr_ll_min = new Array();
                        for (var i = 0; i < that.arr_data.length; i++) {
                            arr_sw_max.push(that.arr_data[i].value[1].sw.max);
                            arr_sw_min.push(that.arr_data[i].value[1].sw.min);
                            arr_ll_max.push(that.arr_data[i].value[1].ll.max);
                            arr_ll_min.push(that.arr_data[i].value[1].ll.min);
                        }
                        //水位最大值数组排序（小 -> 大）
                        for (var i = 1; i < arr_sw_max.length; i++) {
                            for (var j = 0; j < arr_sw_max.length - i; j++) {
                                if (arr_sw_max[j] > arr_sw_max[j + 1]) {
                                    var temp = arr_sw_max[j];
                                    arr_sw_max[j] = arr_sw_max[j + 1];
                                    arr_sw_max[j + 1] = temp;
                                }
                            }
                        }
                        //水位最小值数组排序（小 -> 大）
                        for (var i = 1; i < arr_sw_min.length; i++) {
                            for (var j = 0; j < arr_sw_min.length - i; j++) {
                                if (arr_sw_min[j] > arr_sw_min[j + 1]) {
                                    var temp = arr_sw_min[j];
                                    arr_sw_min[j] = arr_sw_min[j + 1];
                                    arr_sw_min[j + 1] = temp;
                                }
                            }
                        }
                        //流量最大值数组排序（小 -> 大）
                        for (var i = 1; i < arr_ll_max.length; i++) {
                            for (var j = 0; j < arr_ll_max.length - i; j++) {
                                if (arr_ll_max[j] > arr_ll_max[j + 1]) {
                                    var temp = arr_ll_max[j];
                                    arr_ll_max[j] = arr_ll_max[j + 1];
                                    arr_ll_max[j + 1] = temp;
                                }
                            }
                        }
                        //流量最小值数组排序（小 -> 大）
                        for (var i = 1; i < arr_ll_min.length; i++) {
                            for (var j = 0; j < arr_ll_min.length - i; j++) {
                                if (arr_ll_min[j] > arr_ll_min[j + 1]) {
                                    var temp = arr_ll_min[j];
                                    arr_ll_min[j] = arr_ll_min[j + 1];
                                    arr_ll_min[j + 1] = temp;
                                }
                            }
                        }

                        var maxIndex = that.arr_data.length - 1;
                        var sw_min = arr_sw_min[0];
                        var sw_max = arr_sw_max[maxIndex];
                        var ll_min = arr_ll_min[0];
                        var ll_max = arr_ll_max[maxIndex];
                    }

                    var arrSw = that.get_sw_max_min(sw_max, sw_min);
                    var arrLl = that.get_ll_max_min(ll_max, ll_min);
                    var axis_sw_min = arrSw[1];
                    axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                    var axis_sw_max = arrSw[0];
                    var axis_ll_min = arrLl[1];
                    axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                    var axis_ll_max = arrLl[0];
                    
                    //var tempSw = that.obj_minMax_gcx.sw.max;
                    //var arrSw = that.get_sw_max_min(tempSw, that.obj_minMax_gcx.sw.min);
                    //var arrLl = that.get_ll_max_min(that.obj_minMax_gcx.ll.max, that.obj_minMax_gcx.ll.min);
                    //var axis_sw_min = arrSw[1];
                    //axis_sw_min = axis_sw_min < 0 ? 0 : axis_sw_min;
                    //var axis_sw_max = arrSw[0];
                    //var axis_ll_min = arrLl[1];
                    //axis_ll_min = axis_ll_min < 0 ? 0 : axis_ll_min;
                    //var axis_ll_max = arrLl[0];

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
                    var option ;
                    
                    option = that.get_option_gcx_for(axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX);
                    //动态加载series
                    var colors = ['#FF0000', '#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85'];
                    for (var i = 0; i < that.arr_data.length; i++) {
                        option.legend.data.push(that.arr_data[i].value[2].show_stnm + "预报水位", that.arr_data[i].value[2].show_stnm + "预报流量");
                        option.legend.selected[that.arr_data[i].value[2].show_stnm + "预报水位"] = false;

                        option.series.push({
                            name: that.arr_data[i].value[2].show_stnm + '预报水位',
                            type: 'line',
                            yAxisIndex: 0,
                            symbol: "image://Images/empty.png",
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (parmas) {
                                        return '{a|' + " " + parmas.seriesName.split("预报")[0] + " " + '}';
                                    },
                                    rich: {
                                        a: {
                                            color: '#008B00',
                                            fontFamily: 'Microsoft YaHei',
                                            fontSize: 13,
                                            padding: [4, 4],
                                        },

                                    },
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 2,

                                },
                            },
                            symbolSize: 1,
                            showSymbol: false,
                            hoverAnimation: false,
                            itemStyle: {
                                color: colors[i]
                            },
                            lineStyle: {
                                type: "solid"
                            },
                            data: that.arr_data[i].value[0].ybsw
                        }, {
                                name: that.arr_data[i].value[2].show_stnm + '预报流量',
                                type: 'line',
                                yAxisIndex: 1,
                                symbol: "image://Images/empty.png",
                                symbolSize: 1,
                                showSymbol: false,
                                hoverAnimation: false,
                                itemStyle: {
                                    color: colors[i]
                                },
                               
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: function (parmas) {
                                            return '{a|' + " " + parmas.seriesName.split("预报")[0] + " "+ '}';
                                        },
                                        rich: {
                                            a: {
                                                color: '#008B00',
                                                fontFamily: 'Microsoft YaHei',
                                                fontSize: 13,
                                                 padding: [4, 4],
                                            },
                          
                                        },
                                        backgroundColor: '#eee',
                                        borderColor: '#aaa',
                                        borderWidth: 2,
                                       
                                    },
                                },
                                lineStyle: {
                                    type: "dashed",
                                },
                                data: that.arr_data[i].value[0].ybll
                            });
                    }

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
     * 获取需要去掉的站点的下标
     **/
    indexOf: function () {
        var that = this;
        for (var i = 0; i < that.arr_data.length; i++) {
            if (that.arr_data[i].value[2].show_stnm == that.show_stnm) {
                return i;
            }
        }
        return -1;
    },

    /**
     * 设置水情面板相关宽高
     **/
    setPanelSize: function (width, height, isResize) {

        var that = this;
        $(this.parentId).width(width).height(height);

        //过程线
        $("#proLineBody-Jg").css("margin-top", 0);
        $("#proLineBody-Jg").width(width - 200 - 20).height(height - 40 );
        $("#proLineBody-Jg").children().width(width - 200 - 20).height(height - 40 - 20);
        $("#proLineBody-Jg").children().children().width(width - 200 - 20).height(height - 40 - 20);

    },

    /**
     * 过程线图例点击事件(预报)
     **/
    add_click_gcx_for: function () {
        var that = this;
        that.chartGcx.off("legendselectchanged");
        that.chartGcx.on("legendselectchanged", function (params) {
            if ((params.name == that.show_stnm + "预报入库流量") || (params.name == that.show_stnm + "预报流量")) {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];
            

                }
            }
            if (params.name == that.show_stnm + "预报水位") {
                if (params.name in params.selected) {
                    var state = params.selected[params.name];

                }
            }
        });
    },
    /**
     * 实时获取水位最大/小值-水位过程线用
     **/
    get_axis_sw_max_min_gcx: function () {
        var that = this;
        var axis_sw_min_temp = resultConfig.MAX_NUM;
        var axis_sw_max_temp = resultConfig.MIN_NUM;
        var axis_sw_min = resultConfig.MAX_NUM;
        var axis_sw_max = resultConfig.MIN_NUM;

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
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * resultConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * resultConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == resultConfig.MAX_NUM) {
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
        var axis_sw_min = resultConfig.MAX_NUM;
        var axis_sw_max = resultConfig.MIN_NUM;

        //获取水位最高 最低
        if (axis_sw_max_temp - axis_sw_min_temp > 0) {
            axis_sw_min = axis_sw_min_temp - (axis_sw_max_temp - axis_sw_min_temp) * resultConfig.MIN_DEPART;
            axis_sw_max = axis_sw_max_temp + (axis_sw_max_temp - axis_sw_min_temp) * resultConfig.MAX_DEPART;
        } else {
            if (axis_sw_min_temp == resultConfig.MAX_NUM) {
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
        var axis_ll_min = resultConfig.MAX_NUM;
        var axis_ll_max = resultConfig.MIN_NUM;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * resultConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * resultConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == resultConfig.MAX_NUM) {
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
        var axis_ll_min_temp = resultConfig.MAX_NUM;
        var axis_ll_max_temp = resultConfig.MIN_NUM;
        var axis_ll_min = resultConfig.MAX_NUM;
        var axis_ll_max = resultConfig.MIN_NUM;

        axis_ll_min_temp = that.obj_minMax_gcx.ll.min;
        axis_ll_max_temp = that.obj_minMax_gcx.ll.max;

        //获取流量最大 最小
        if (axis_ll_max_temp - axis_ll_min_temp > 0) {
            axis_ll_min = axis_ll_min_temp - (axis_ll_max_temp - axis_ll_min_temp) * resultConfig.MIN_DEPART;
            axis_ll_max = axis_ll_max_temp + (axis_ll_max_temp - axis_ll_min_temp) * resultConfig.MAX_DEPART;
        } else {
            if (axis_ll_min_temp == resultConfig.MAX_NUM) {
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
     * 水位过程线参数 (预报)
     **/
    get_option_gcx_for: function (axis_sw_max, axis_sw_min, axis_ll_max, axis_ll_min, intervalX, strFormatX) {
        var that = this;
        var option = {
            title: {
                text: "预报水位流量过程线",
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
                data: [],
                selected: {}
            },
            grid: {
                left: 25,
                top: 65,
                right: 35,
                bottom: 35,
                containLabel: true
            },
            xAxis: {
                type: "time",
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: resultConfig.ECHART_COLOR_AXIS_X
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
                        color: [resultConfig.ECHART_COLOR_GRID]
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
                        color: resultConfig.ECHART_COLOR_SW
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
                        color: [resultConfig.ECHART_COLOR_GRID]
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
                        color: resultConfig.ECHART_COLOR_LL
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
            series: [],
            backgroundColor: resultConfig.ECHART_COLOR_BACKGROUND
        };
        option = tools.initChartlegendIcon(option);
        return option;
    },
 
 
    /**
     * 从数组中获取最大最小值
     **/
    get_min_max: function (arr) {
        var min = resultConfig.MAX_NUM;
        var max = resultConfig.MIN_NUM;
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
    }
};