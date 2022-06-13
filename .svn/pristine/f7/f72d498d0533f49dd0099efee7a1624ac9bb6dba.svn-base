//# sourceURL=report.js
//报表默认宽高
var default_width_report = 1100;
var default_height_report = 530;

var t_range = "";
var t_stime = "";
var t_etime = "";
var t_userId = "";
var t_plan = "";
var t_day = "";

var json_data = null;
var json_data_detail = null;
var chart_hgsmx = null;
var chart_data = null;
var series_data = null;
var tm_data = null;
var minmax_data = null;
var legend_data = null;
var cur_animation_index = 0;
var colors = ['#000000', '#FFC125', '#008B8B', '#8B658B', '#8B6969', '#FF8247', '#FFA500', '#FF1493', '#87CEFF', '#0000FF', '#FF0000'];
var hgx_interval = null;

var arrId = new Array();

//最大化按钮事件
$(".report-bb .icon-max").click(function () {
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_width_report).height(default_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_width_report / 2 + "px",
            "margin-top": "-" + default_height_report / 2 + "px"
        });

        //动态设置报表高度
        setReportSize($(this).parent().parent().parent().attr("id"), default_width_report, default_height_report);
        $(this).attr("data-type", "");
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setReportSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
    }
});
//关闭按钮事件
$(".report-bb .icon-close").click(function () {
    $("#btn_hgsmx_reset").click();
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));


});
//站点击事件
$("#panelTjfx_Dd").on("click", ".th-click", function () {
    var _stnm = $(this).html();
   // show_gcxdetail(_stnm, "");
});

/**
 * TAB切换事件- 手动处理避免显示延迟
 **/
$("#panelTjfx_Dd .nav a").click(function (e) {
    /*  if ($(this).parent('li').hasClass('active'))
          return;
  
      //改变标题栏
      $(this).parent('li').siblings('.active:last').removeClass("active");
      $(this).parent('li').addClass("active");
  
      //获取当前元素ID
      var id = $(this).attr("_data");
      $(id).siblings('.active:last').removeClass("in active");
      $(id).addClass("in active");*/
});
function nav_click(obj) {
    if ($(obj).parent('li').hasClass('active'))
        return;

    //改变标题栏
    $(obj).parent('li').siblings('.active:last').removeClass("active");
    $(obj).parent('li').addClass("active");

    //获取当前元素ID

    var id_ = $(obj).attr("id");
    var result = id_.indexOf('linkDd_');
    if (result > -1) {
        //$("#dtfa").show();
        var divId = $(obj).attr("_data");
        $(divId).siblings('.active:last').removeClass("in active");
        $(divId).addClass("in active");

        var _ddname = obj.innerHTML;
        var length_ = $(divId + " table tr").length;
        if (length_ == 0) {
            get_tableInfo_gzdd_xzdd(_ddname, arrId, divId);
        } else {
            for (var m = 0; m < arrId[0][0].length; m++) {//行蓄洪区
                $("#tableid_xxhq_" + m).find('th').each(function (i) {
                    $(this).css('width', $('#panelXxhq_table_' + m).find('th:eq(' + i + ')').width() + 1);
                });
                $("#tableid_sk_" + m).find('th').each(function (i) {
                    $(this).css('width', $('#panelSk_table_' + m).find('th:eq(' + i + ')').width() + 1);
                });
                $("#tableid_kzz_" + m).find('th').each(function (i) {
                    $(this).css('width', $('#panelKzz_table_' + m).find('th:eq(' + i + ')').width() + 1);
                });
            }
        }
    } else {
        //$("#dtfa").hide();
        var id = $(obj).attr("_data");
        $(id).siblings('.active:last').removeClass("in active");
        $(id).addClass("in active");
    }
}
 

//创建表格
function create_table(reportId, _width, json) {
    if (reportId == "panelTjfx_Dd") {
        //先清空数据
        $("#panelTjfx_Dd .tjfx-table-data table colgroup col").remove();
        $("#panelTjfx_Dd .tjfx-table-data table thead tr").remove();
        $("#panelTjfx_Dd .tjfx-table-data table tbody tr").remove();

        var base_index = 8;
        var ex_coloumn = json.datanm.length - base_index;
        if (ex_coloumn > 5) {
            ex_coloumn = 5;
        }
        var w_width = 1030;
        var _e_widht = 200;
        var _e_p_width = _e_widht / ex_coloumn;
        var _tx = ex_coloumn - 1 >= 0 ? ex_coloumn - 1 : 0
        var _l_p_width = _e_widht - _e_widht * _tx;
        var _mc_width = 60;


        var _p_width = 80;
        var _l_width = 80;
        var sgx = "";
        if (t_range >= 3) {
            sgx = "<span><font  style='color:#0000ff'>(<a href='#' onclick='showhgx()' >淮干水面线</a>)</font></span>";
        }
        var _html_th = "<tr>";
        _html_th += "<th style='width:" + (_mc_width) + "px;' class='th-click' rowspan='2'>方案名称</th>";
        _html_th += "<th style='width:" + (_p_width * 3) + "px;' class='th-click' colspan='3'>工程启用情况</th>";
        _html_th += "<th style='width:" + (_p_width * 2) + "px;' class='th-click' colspan='2'>水库情况</th>";
        _html_th += "<th style='width:" + (_p_width + _l_width) + "px;' class='th-click' colspan='2'>水文站点情况</th>";
        _html_th += "<th style='width:" + (_e_p_width * ex_coloumn) + "px;' class='th-click' colspan='" + ex_coloumn + "'>调度后重要站水位" + sgx + "</th>";
        _html_th += "</tr>";
        _html_th += "<tr>";
        _html_th += "<th style='width:" + _p_width + "px;'>行洪区</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>蓄洪区</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>分洪河道</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>超汛限</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>超设计</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>超警</th>";
        _html_th += "<th style='width:" + _l_width + "px;'>超保</th>";
        for (var i = 0; i < ex_coloumn; i++) {

            _html_th += "<th class='th-click' style='width:" + _e_p_width + "px;'>" + json.datanm[base_index + i] + "</th>";
        }

        _html_th += "</tr>";
        var _html_body = "";

        var shoulength = 25;
        $.each(json.data, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {
                if (index_inner < base_index + ex_coloumn) {
                    var _class = "";

                    _class += " style='white-space: normal;text-align:center'";
                    _html_body += "<td " + _class + " >";
                    if ((item_inner == ".00") || (item_inner == "均未超") || (item_inner == "均未启用")) {
                        item_inner = "0";
                    }

                    if ((index_inner < base_index) && (index_inner > 0)) {
                        var arr_tx = item_inner.split(",");
                        var flag_index = item_inner.lastIndexOf("（");
                        if (flag_index > -1) {
                            var show_houzui = item_inner.substring(flag_index, item_inner.length);
                            var show_qianzui = item_inner.replace(show_houzui, "").replace(",", ", ");
                            show_houzui = show_houzui.replace("（", "").replace("）", "");
                            if (show_qianzui.length <= shoulength) {
                                item_inner = show_qianzui;
                            }
                            else {
                                item_inner = show_qianzui.substring(0, shoulength) + "...";
                            }
                            _html_body += item_inner;
                            _html_body += "<span><font style='color:#0000ff'>(<a href='#' onclick='show_detail(\"" + json.data[index][0] + "\",\"" + index_inner + "\");'>" + show_houzui + "</a>)</font></span>";
                        }
                        else
                            _html_body += item_inner;
                    }
                    /* else if (index_inner == 0) {
                         _html_body += "<a href='#' onclick='show_detail();'>" + item_inner + "</a>";
                     }*/
                    else {
                        _html_body += item_inner;
                    }

                    _html_body += "</td>";
                }

            });
            _html_body += "</tr>";
        });


        $("#panelTjfx_Dd .tjfx-table-data table thead").append(_html_th);
        $("#panelTjfx_Dd .tjfx-table-data table tbody").append(_html_body);
        // 滑动滚动条固定表头
        tableHeader();
    }
    else if (reportId == "panelTjfx_DdDetail") {
        //先清空数据
        $("#panelTjfx_DdDetail .tjfx-table-data table colgroup col").remove();
        $("#panelTjfx_DdDetail .tjfx-table-data table thead tr").remove();
        $("#panelTjfx_DdDetail .tjfx-table-data table tbody tr").remove();


        var len_tm = 0;
        var len_bwf = 0;
        $.each(json.dataName, function (index, item) {
            if (tools.islaststr(item, "时间") && (index != json.dataName.length - 1-2)) {
                len_tm++;
            }
            if (tools.islaststr(item, "百万方）") && (index != json.dataName.length - 1-2)) {
                len_bwf++;
            }
        });
        var w_tm = 150;
        var w_name = 110;
        var w_bwf = 135;
        var _html_th = "<tr>";
        var w_width = 1030;
        var w_xh = 40;
        var w_other = w_width - w_xh - len_tm * w_tm - w_bwf * len_bwf - w_name;
        var _e_p_width = w_other / (json.dataName.length - 2 - len_tm - len_bwf-2);
        var _l_p_width = w_other - _e_p_width * (json.dataName.length - 3 - len_tm - len_bwf-2);
        $.each(json.dataName, function (index, item) {
            if (index < json.dataName.length - 2)
            {
                if (index == 0)
                    _html_th += "<th class='th-click' style='width:" + w_xh + "px;'>" + item + "</th>";
                else if (index == 1)
                    _html_th += "<th class='th-click' style='width:" + w_name + "px;'>" + item + "</th>";
                else if (index != (json.dataName.length - 1-2))
                    if (tools.islaststr(item, "时间"))
                        _html_th += "<th class='th-click' style='width:" + w_tm + "px;'>" + item + "</th>";
                    else if (tools.islaststr(item, "百万方）"))
                        _html_th += "<th class='th-click' style='width:" + w_bwf + "px;'>" + item + "</th>";
                    else
                        _html_th += "<th class='th-click' style='width:" + _e_p_width + "px;'>" + item + "</th>";
                else
                    _html_th += "<th class='th-click' style='width:" + _l_p_width + "px;'>" + item + "</th>";
            }
          
        });

        _html_th += "</tr>";
        var _html_body = "";

        /*  var tree_type = gettypename(json.ddxxflid);
          var tree_ddxxflid =json.ddxxflid;
          var tree_arr_stnm = new Array();
          var tree_li_name = json.data;*/
        $.each(json.data, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {

                if (index_inner < item.length - 2)
                {
                    var _class = "";

                    _class += " style='white-space: normal;text-align:center'";
                    _html_body += "<td " + _class + " >";
                    if (item_inner == ".00") {
                        item_inner = "0";
                    }
                    // if (index_inner == 1) {
                    //     _html_body += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail(\"" + item_inner + "\"," + json.ddxxflid + ",\"" + item[item.length - 2] + "\",\"" + item[item.length - 1] + "\");'>" + item_inner + "</a></font></span>";

                    // }
                    // else
                        _html_body += item_inner;
                    _html_body += "</td>";
                }
            });
            _html_body += "</tr>";
        });

   
        $("#panelTjfx_DdDetail .tjfx-table-data table thead").append(_html_th);
        $("#panelTjfx_DdDetail .tjfx-table-data table tbody").append(_html_body);

    }
};
function tableHeader() {
    $("#panelTjfx_Dd_table").parent().prepend(
        '<table id="tableid_" class="table" ><thead>' + $("#panelTjfx_Dd_table thead").html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })
    $("#tableid_").find('th').each(function (i) {
        $(this).css('width', $('#panelTjfx_Dd_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panelTjfx_Dd_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data').scroll(function () {
        if ($('.tjfx-table-data').scrollTop() > 0) {
            $("#tableid_").css('top', $('.tjfx-table-data').scrollTop());
        } else {
            $("#tableid_").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-bb").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 650,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});
function reportBbResize(event, ob) {
    //动态设置报表高度
    setReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setReportSize(reportId, width, height, json) {
    //console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);
    if (reportId == "panelTjfx_Dd") {
        create_table(reportId, width - 15, json_data);
        $("#panelTjfx_Dd .tjfx-table-data").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "overflow-y": "auto"
        });
        $("#panelTjfx_Dd .tjfx-table-data").height(height - 45 - 32);
    }
    else if (reportId == "panelTjfx_DdDetail") {
        create_table(reportId, width - 15, json_data_detail);
        $("#panelTjfx_DdDetail .tjfx-table-data").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "overflow-y": "auto"
        });
        $("#panelTjfx_DdDetail .tjfx-table-data").height(height - 45);
    }
    else if (reportId == "panel_hgsmx") {
        var _info_height = 60;


        $("#hgsmx_echart").width(width).height(height - _info_height - 32);
        $("#hgsmx_info").width(width).height(_info_height);
        if (chart_hgsmx != null)
            chart_hgsmx.resize();

    }

}
//报表通用可拖拽事件
$(".report-bb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-bb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 调度方案分析比较
 */
function show_report_fxbj(_range, _plan, _stime, _etime, _userId, _selectDays) {
 
    tools.loadingshow("查询调度方案对比信息中...", arrRange_fabj_lodingtime[Number(searchRange) - 1]);

    t_range = _range;
    t_stime = _stime;
    t_etime = _etime;
    t_userId = _userId;
    t_plan = _plan;
    t_day = _selectDays;
 
    var objData = {
        adjust: 1,
        autoFore: 0,
        day: t_day,
        etime: _etime,
        hisStormId: _hisStormId,
        plan: t_plan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: _range,
        stime: _stime,
        modelid: getRadioModel()
    };
    var info = JSON.stringify(objData);
    json_data = null;
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-hwhydroinfo/getDispachInfo",
        headers: {
            "Authorization": getCookie("accessToken")
        },

        data: info,
        success: function (data) {
          
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("获取调度方案对比信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-bb .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panelTjfx_Dd").show();
                tools.showPanelIndex("panelTjfx_Dd");
                setReportSize("panelTjfx_Dd", default_width_report, default_height_report);
                //默认显示控制站特征
                $("#linkKztz").click();
                return;
            }

        },
        error: function (errorMsg) {
           tools.loadinghide(false);
            tools.show_message_error("获取调度方案对比信息失败!");
            return;
        }
    });
    //获取控制站特征
    get_tableInfo_kztz();
}
function initTableDiv(reportId) {
    if (reportId != "panel_hgsmx") {
        $("#" + reportId + " .tjfx-table-data").empty();
        var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
        $("#" + reportId + " .tjfx-table-data").append(_html);
        $("#" + reportId + " .tjfx-table-data").css({
            "height": "440px",
            "overflow-y": "scroll"
        });
    }


};
function show_gcxdetail(_stnm, strtype, temp_stcd, temp_sttp) {
    if (temp_sttp == "FH")
        temp_sttp = "DD";

    _stcd = temp_stcd;
    _sttp = temp_sttp;
    show_report_gcx(t_range, _stcd, t_stime, t_etime, t_userId, _stnm, _sttp, t_day, t_plan);
};

/**
 * 方案比较点击事件
 */
$("#panelTjfx_Dd .tableTjfx tr td").on("click", function () {

});
function show_detail(_ddname, _typeid) {
    show_report_fxbjDetail(_ddname, _typeid);
}
function showhgx() {
    var objData = {
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        plan: t_plan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: t_day
    };
    chart_data = null;
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cbh + "get_Hhgl_SmxTm",
        data: info,
        success: function (data) {
           tools.loadinghide(false);
            if (data == null || data == "") {
               tools.loadinghide(false);
                tools.show_message_error("查询淮干水面线信息失败!");
                return;
            }

            var json = JSON.parse(data.d);
            chart_data = json;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                $("#panel_hgsmx").show();
                tools.showPanelIndex("panel_hgsmx");
                setReportSize("panel_hgsmx", default_width_report, default_height_report);

                initChart_hgsmx(chart_data);
                add_click_gcx_comon();
                return;
            }

        },
        error: function (errorMsg) {
           tools.loadinghide(false);
            tools.show_message_error("查询淮干水面线信息失败!");
            return;
        }
    });
}
function initChart_hgsmx(json) {

    var tm_indexFromlast = 4;
    chart_hgsmx = null;
    chart_hgsmx = echarts.init(document.getElementById('hgsmx_echart'));

    series_data = null;
    tm_data = null;
    minmax_data = null;
    legend_data = null;

    var xAxis_data = new Array();
    legend_data = new Array();

    series_data = new Array();
    tm_data = new Array();
    minmax_data = new Array();
    cur_animation_index = 0;
    var data_len = 0;

    //json.dataname.length - 4，时间列
    $.each(json.data, function (index, item) {
        xAxis_data.push(item[0]);
        data_len = item[json.dataname.length - tm_indexFromlast].length;
        tm_data = $.extend(true, [], item[json.dataname.length - tm_indexFromlast]);
    });

    //外层data_len，内层json.data.length，每次显示json.data.length个点数据，
    $.each(json.dataname, function (index, item) {
        if ((index != 0) && (index != json.dataname.length - tm_indexFromlast)) {
            legend_data.push(item);
            var arr_l_data = new Array();
            for (var i = 0; i < data_len; i++) {
                var arr_t_data = new Array();
                $.each(json.data, function (inner_index, inner_item) {
                    arr_t_data.push(inner_item[index][i]);
                });
                arr_l_data.push(arr_t_data);
            }
            series_data.push(arr_l_data);
        }
    });
    //外层data_len，内层json.data.length，每次显示json.data.length个点数据，





    for (var i = 0; i < data_len; i++) {

        var arr_minmax_data = new Array();
        var min = 99999;
        var max = -99999;
        $.each(json.dataname, function (index, item) {
            if ((index != 0) && (index != json.dataname.length - tm_indexFromlast)) {
                $.each(json.data, function (inner_index, inner_item) {
                    min = Math.min(Number(inner_item[index][i]), min);
                    max = Math.max(Number(inner_item[index][i]), max);

                });
            }
        });
        arr_minmax_data.push(min, max);
        arr_minmax_data[0] = arr_minmax_data[0] - 1 < 0 ? 0 : Math.round(Number(arr_minmax_data[0] - 1), 0);
        arr_minmax_data[1] = Math.round(Number(arr_minmax_data[1] + 1), 0);
        minmax_data.push(arr_minmax_data);
    }


    var arr_series = new Array();
    $.each(legend_data, function (index, item) {
        console.log(item);
        arr_series.push({
            name: item,
            type: 'line',
            yAxisIndex: 0,
            symbol: "circle",
            z: 5,
            itemStyle: {
                color: (item == "警戒水位" ? colors[colors.length - 2] : (item == "保证水位" ? colors[colors.length - 1] : (item == "实时水位" ? colors[colors.length - 3] : colors[index]))),


            },
            lineStyle: {
                width: 2,
                type: ((item == "警戒水位") || (item == "保证水位") || (item == "实时水位")) ? 'dashed' : 'solid'  //'dotted'虚线 'solid'实线
            },
            showSymbol: true,
            data: series_data[index][cur_animation_index]
        });
    });


    var option = {
        title: {
            text: '淮干水面线图表\n(' + moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + "-" + moment((tm_data[tm_data.length - 1] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + ")",
            textStyle: {
                fontSize: 16
            },
            left: "center"
        },
        grid: {
            left: 25,
            top: 80,
            right: 25,
            bottom: 20,
            containLabel: true
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
            data: legend_data
        },

        tooltip: {
            trigger: "axis",
            formatter: function (ob) {
                if (ob != null && ob.length > 0) {
                    return tools.format_tooltip_chart_hgx(ob, moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
                } else {
                    return "";
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis_data
        },
        yAxis: {
            type: 'value',
            name: '水位(m)',
            min: minmax_data[0][0],
            max: minmax_data[0][1]
        },
        series: arr_series
    };
        option = tools.initChartlegendIcon(option);
    // 使用刚指定的配置项和数据显示图表。
    chart_hgsmx.setOption(option, true);

    $("#hgsmx_tm_info").html(moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));

}
/**
* 过程线图例点击事件(通用)
**/
function add_click_gcx_comon() {   
    chart_hgsmx.off("legendselectchanged");
    chart_hgsmx.on("legendselectchanged", function (params) {
        if (params.name in params.selected) {
            var state = params.selected[params.name];
            var option = tools.selectchangeChartlegendIcon(chart_hgsmx.getOption(), state, params.name);
            chart_hgsmx.setOption(option, true);
        }


    });
}
$("#btn_hgsmx_start").click(function (event) {
    if (hgx_interval != null) {
        return;
    }
    hgx_interval = setInterval(refreshData, 500);
});
$("#btn_hgsmx_pause").click(function (event) {
    if (hgx_interval != null) {
        clearInterval(hgx_interval);
        hgx_interval = null;
    }

});
$("#btn_hgsmx_reset").click(function (event) {
    $("#btn_hgsmx_pause").click();
    resetData();
});
function resetData() {
    if (!chart_hgsmx) {
        return;
    }
    cur_animation_index = 0;
    //更新数据
    var option = chart_hgsmx.getOption();
    $.each(legend_data, function (index, item) {
        option.series[index].data = series_data[index][cur_animation_index];
    });
    option.yAxis.min = minmax_data[cur_animation_index][0];
    option.yAxis.max = minmax_data[cur_animation_index][1];
    $("#hgsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_hgsmx.setOption(option, true);
}
function refreshData() {
    if (!chart_hgsmx) {
        return;
    }
    cur_animation_index++;
    if (cur_animation_index >= tm_data.length) {
        cur_animation_index = 0;
    }
    //更新数据
    var option = chart_hgsmx.getOption();
    $.each(legend_data, function (index, item) {
        option.series[index].data = series_data[index][cur_animation_index];
    });
    option.yAxis.min = minmax_data[cur_animation_index][0];
    option.yAxis.max = minmax_data[cur_animation_index][1];
    $("#hgsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_hgsmx.setOption(option, true);
}
function gettypename(_typeid) {
    var _typename = "";
    if (_typeid == "1") {
        _typename = "工程启用-行洪区";
    }
    else if (_typeid == "2") {
        _typename = "工程启用-蓄洪区";
    }
    else if (_typeid == "3") {
        _typename = "工程启用-分洪河道";
    }
    else if (_typeid == "4") {
        _typename = "水库-超汛限";
    }
    else if (_typeid == "5") {
        _typename = "水库-超设计";
    }
    else if (_typeid == "6") {
        _typename = "水文站点-超警";
    }
    else if (_typeid == "7") {
        _typename = "水文站点-超保";
    }
    return _typename;
}
function show_report_fxbjDetail(_ddname, _typeid) {
    $("#span_loading").html("查询更多信息中...");

   // $(".loading-layer").show();
    var objData = {
        adjust: 1,
        autoFore: 0,
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        plan: t_plan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        dbfxddfa: _ddname,
        dbfxid: _typeid,
        day: t_day,
        modelid: getRadioModel()
    };
    $("#panelTjfx_DdDetail").find(".modal-title").html(gettypename(_typeid));

    var info = JSON.stringify(objData);
    json_data_detail = null;
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud +"api-hwhydroinfo/get_Dbfx_DetailInfo",
        data: info,
        success: function (data) {
            tools.loadinghide(false);
            if (data.code != 200) {
               tools.loadinghide(false);
                tools.show_message_error("查询更多信息失败!");
                return;
            }

            var json = data.data;
            json_data_detail = json;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                $("#panelTjfx_DdDetail").show();
            //    tools.showPanelIndex("panelTjfx_DdDetail");
          //      setReportSize("panelTjfx_DdDetail", default_width_report, default_height_report);
                return;
            }

        },
        error: function (errorMsg) {
           tools.loadinghide(false);
            tools.show_message_error("查询更多信息失败!");
            return;
        }
    });
}
/**
 *获取表格信息-控制站特征
 */
function get_tableInfo_kztz() {
    //初始化表格
    $("#contKztz .table tr").remove();
    //if ($("#panelKztz_table").children().children().length > 0) {
    //    return;
    //}

    var objData = {
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        userId: t_userId,
        plan: t_plan,
        day: t_day
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: "PanelNew.aspx/get_KzStationTZ",
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
                arrId = create_table_kztz(json);
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
}
/**
 *生成表格-控制站特征
 */
function create_table_kztz(json) {
    var arr_ = json.data;

    var html_th = new StringBuffer();
    var html_td = new StringBuffer();
    var html_select = new StringBuffer();
    var html_li = new StringBuffer();
    html_li = "<li><a id='linkKztz' onclick='nav_click(this)' _data='#contKztz' href='javascript:void(0);' data-toggle='tab'>控制站特征</a></li><li><a id='linkFadb' onclick='nav_click(this)' _data='#contFadb' href='javascript:void(0);' data-toggle='tab'>方案对比</a></li>"

    var html_table = new StringBuffer();
    html_table = "<div id='contKztz' class='tab-pane fade'><table id='panelKztz_table' class='table'><thead></thead><tbody></tbody></table></div><div id='contFadb' class='tab-pane fade'><div class='tjfx-table-data'><table id='panelTjfx_Dd_table' class='table' style='table-layout:fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table></div></div>"

    var select_arr = arr_[3];

    var tableArr = new Array();
    var tableIdArr = new Array();

    var xxhqTableId;
    var skTableId;
    var kzzTableId;

    for (var i = 0; i < arr_.length; i++) {
        if (i == 0) {//表头
            for (var j = 0; j < arr_[i].length; j++) {
                if (j == 0) {
                    html_th += "<tr><th>" + arr_[i][j] + "</th>";
                }
                else {
                    if (i == arr_[i][j].length - 1) {
                        html_th += "<th>" + arr_[i][j] + "</th></tr>";
                    } else {
                        html_th += "<th>" + arr_[i][j] + "</th>";
                    }
                }
            }
        }
        else {//表体
            if (i == 3) {//下拉框特殊处理
                for (var j = 0; j < arr_[i].length; j++) {
                    if (j == 0) {
                        for (var x = 0; x < arr_[i][j].length; x++) {
                            html_select += "<option  value = " + "'" + arr_[i][j][x] + "'" + " ><a onclick = 'select()'>" + arr_[i][j][x] + "</a></option>"
                            html_li += "<li><a id = 'linkDd_" + x + "'  onclick='nav_click(this)' _data = '#contDd_" + x + "' href = 'javascript:void(0);' data-toggle = 'tab'>" + arr_[i][j][x] + "</a></li>"

                            html_table += "<div id = 'contDd_" + x + "' class='tab-pane fade'><div class='xxhq-table-data_" + x + "' style='height: 131px; overflow-y: auto; border: #CDC9C9 1px solid;'><table id='panelXxhq_table_" + x + "' class='table'><thead></thead><tbody></tbody></table></div><br><div class='sk-table-data_" + x + "' style='height: 131px; overflow-y: auto; border: #CDC9C9 1px solid;'><table id='panelSk_table_" + x + "' class='table'><thead></thead><tbody></tbody></table></div><br><div class='kzz-table-data_" + x + "' style='height: 131px; overflow-y: auto; border: #CDC9C9 1px solid;'><table id='panelKzz_table_" + x + "' class='table'><thead></thead><tbody></tbody></table></div></div>"
                            xxhqTableId = "panelXxhq_table_" + x;
                            skTableId = "panelSk_table_" + x;
                            kzzTableId = "panelKzz_table_" + x;

                            tableArr.push([xxhqTableId, skTableId, kzzTableId]);
                        }
                        tableIdArr.push(tableArr);
                        html_td += "<tr id = 'select_tr'><td id = 'select_td'><select id='select_fa' class = 'control-label'>" + html_select + "</select></td>";
                    } else {
                        if (j == arr_[i].length - 1) {
                            html_td += "<td>" + arr_[i][j][0] + "</td></tr>";
                        } else {
                            html_td += "<td>" + arr_[i][j][0] + "</td>";
                        }
                    }
                }
            }
            else {
                for (var j = 0; j < arr_[i].length; j++) {
                    if (j == 0) {
                        html_td += "<tr><td>" + arr_[i][j] + "</td>";
                    }
                    else {
                        if (j == arr_[i][j].length - 1) {
                            html_td += "<td>" + arr_[i][j] + "</td></tr>";
                        }
                        else {
                            html_td += "<td>" + arr_[i][j] + "</td>";
                        }
                    }
                }
            }
        }
    }

    $("#panelTjfx_Dd .nav").html("");
    $("#panelTjfx_Dd .nav").append(html_li.toString());

    $("#tab-div").html("");
    $("#tab-div").append(html_table.toString());

    $("#panelKztz_table thead").html("");
    $("#panelKztz_table tbody").html("");
    $("#panelKztz_table thead").append(html_th.toString());
    $("#panelKztz_table tbody").append(html_td.toString());

    /**
     *控制站特征下拉框点击事件
     */
    $("#select_fa").on("change", function () {
        pID = $("option:selected", this).val();
        $("#select_td").nextAll().html("");
        //获取点击option对应的下标
        var p = getArrayIndex(select_arr[0], pID);
        if (p != -1) {
            for (var i = 1; i < select_arr.length; i++) {
                var tdValue = select_arr[i][p];
                $("#select_tr").children().eq(i).html(tdValue);
            }
        }
    })

    return tableIdArr;
}

function getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
}

/**
 *获取调度方案表格信息
 */
function get_tableInfo_gzdd_xzdd(_ddname, arrId,divId) {
    //初始化表格
 
    //$("#contFadb").nextAll().find("tr").remove();

    $("#span_loading").html("查询更多信息中...");
    $(".loading-layer").show();

    var objData = {
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        userId: t_userId,
        dbfxddfa: _ddname,
        day: t_day,
        plan: t_plan
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: "PanelNew.aspx/get_SingleSchedualDetail",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            if (data.d == null || data.d == "") {
               tools.loadinghide(false);
                tools.show_message_error("获取表格信息失败!");
                return;
            }
           tools.loadinghide(false);
            var json = JSON.parse(data.d);
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                create_table_gzdd_xzdd(json, _ddname, arrId,divId);

                for (var m = 0; m < arrId[0][0].length; m++) {//行蓄洪区
                    $("#tableid_xxhq_" + m).find('th').each(function (i) {
                        $(this).css('width', $('#panelXxhq_table_' + m).find('th:eq(' + i + ')').width() + 1);
                    });
                    $("#tableid_sk_" + m).find('th').each(function (i) {
                        $(this).css('width', $('#panelSk_table_' + m).find('th:eq(' + i + ')').width() + 1);
                    });
                    $("#tableid_kzz_" + m).find('th').each(function (i) {
                        $(this).css('width', $('#panelKzz_table_' + m).find('th:eq(' + i + ')').width() + 1);
                    });
                }

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
}
/**
 *生成表格-规则调度/初始状态
 */
function create_table_gzdd_xzdd(json, _ddname, arrId,divId) {
    var arr_nameXxhq = json.dataName[0];
    var arr_nameSk = json.dataName[1];
    var arr_nameKzz = json.dataName[2];

    var arr_valueXxhq = json.data[0];
    var arr_valueSk = json.data[1];
    var arr_valueKzz = json.data[2];

    for (var m = 0; m < arrId[0].length; m++) {
        for (var n = 0; n < arrId[0][m].length; n++) {
            if (n == 0) {//行蓄洪区
                var html_xxhq_th = new StringBuffer();
                var html_xxhq_td = new StringBuffer();
                for (var i = 0; i < arr_nameXxhq.length; i++) {
                    if (i == 0) {
                        html_xxhq_th += "<tr><th>" + arr_nameXxhq[i] + "</th>";
                    } else {
                        if (i == arr_nameXxhq.length - 1) {
                            html_xxhq_th += "<th>" + arr_nameXxhq[i] + "</th></tr>";
                        }
                        else {
                            html_xxhq_th += "<th>" + arr_nameXxhq[i] + "</th>";
                        }
                    }
                }
                for (var i = 0; i < arr_valueXxhq.length; i++) {
                    for (var j = 0; j < arr_valueXxhq[i].length; j++) {
                        if (j == 0) {
                            html_xxhq_td += "<tr><td>" + arr_valueXxhq[i][j] + "</td>";
                        } else {
                            if (j == arr_valueXxhq[i].length - 1) {
                                html_xxhq_td += "<td>" + arr_valueXxhq[i][j] + "</td></tr>"
                            }
                            else {
                                html_xxhq_td += "<td>" + arr_valueXxhq[i][j] + "</td>"
                            }
                        }
                    }
                }


                $(divId + " #" + arrId[0][m][n] + " thead").html("");
                $(divId + " #" + arrId[0][m][n] + " tbody").html("");
                $(divId + " #" + arrId[0][m][n] + " thead").append(html_xxhq_th.toString());
                $(divId + " #" + arrId[0][m][n] + " tbody").append(html_xxhq_td.toString());
            }
            if (n == 1) {//水库
                var html_sk_th = new StringBuffer();
                var html_sk_td = new StringBuffer();
                for (var i = 0; i < arr_nameSk.length; i++) {
                    if (i == 0) {
                        html_sk_th += "<tr><th>" + arr_nameSk[i] + "</th>";
                    } else {
                        if (i == arr_nameSk.length - 1) {
                            html_sk_th += "<th>" + arr_nameSk[i] + "</th></tr>";
                        }
                        else {
                            html_sk_th += "<th>" + arr_nameSk[i] + "</th>";
                        }
                    }
                }
                for (var i = 0; i < arr_valueSk.length; i++) {
                    for (var j = 0; j < arr_valueSk[i].length; j++) {
                        if (j == 0) {
                            html_sk_td += "<tr><td>" + arr_valueSk[i][j] + "</td>";
                        } else {
                            if (j == arr_valueSk[i].length - 1) {
                                html_sk_td += "<td>" + arr_valueSk[i][j] + "</td></tr>"
                            }
                            else {
                                if (j == 5) {
                                  
                                    if (Number(arr_valueSk[i][j]) > Number(arr_valueSk[i][arr_valueSk[i].length - 1])) {
                                        html_sk_td += "<td><font color='Red'>" + arr_valueSk[i][j] + "</font></td>"

                                    }
                                    else if (Number(arr_valueSk[i][j]) > Number(arr_valueSk[i][arr_valueSk[i].length - 2])) {
                                        html_sk_td += "<td><font color='Blue'>" + arr_valueSk[i][j] + "</font></td>"

                                    }
                                    else {
                                        html_sk_td += "<td>" + arr_valueSk[i][j] + "</td>"

                                    }
                                }
                                else {
                                    html_sk_td += "<td>" + arr_valueSk[i][j] + "</td>"

                                }
                            }
                        }
                    }
                }
                $(divId + " #" + arrId[0][m][n] + " thead").html("");
                $(divId + " #" + arrId[0][m][n] + " tbody").html("");
                $(divId + " #" + arrId[0][m][n] + " thead").append(html_sk_th.toString());
                $(divId + " #" + arrId[0][m][n] + " tbody").append(html_sk_td.toString());
            }
            if (n == 2) {//控制站
                var html_kzz_th = new StringBuffer();
                var html_kzz_td = new StringBuffer();
                for (var i = 0; i < arr_nameKzz.length; i++) {
                    if (i == 0) {
                        html_kzz_th += "<tr><th>" + arr_nameKzz[i] + "</th>";
                    } else {
                        if (i == arr_nameKzz.length - 1) {
                            html_kzz_th += "<th>" + arr_nameKzz[i] + "</th></tr>";
                        }
                        else {
                            html_kzz_th += "<th>" + arr_nameKzz[i] + "</th>";
                        }
                    }
                }
                for (var i = 0; i < arr_valueKzz.length; i++) {
                    for (var j = 0; j < arr_valueKzz[i].length; j++) {
                        if (j == 0) {
                            html_kzz_td += "<tr><td>" + arr_valueKzz[i][j] + "</td>";
                        } else {
                            if (j == arr_valueKzz[i].length - 1) {
                                html_kzz_td += "<td>" + arr_valueKzz[i][j] + "</td></tr>"
                            }
                            else {
                                if (j == 2) {

                                    if (Number(arr_valueKzz[i][j]) > Number(arr_valueKzz[i][arr_valueKzz[i].length - 1])) {
                                        html_kzz_td += "<td><font color='Red'>" + arr_valueKzz[i][j] + "</font></td>"

                                    }
                                    else if (Number(arr_valueKzz[i][j]) > Number(arr_valueKzz[i][arr_valueKzz[i].length - 2])) {
                                        html_kzz_td += "<td><font color='Blue'>" + arr_valueKzz[i][j] + "</font></td>"

                                    }
                                    else {
                                        html_kzz_td += "<td>" + arr_valueKzz[i][j] + "</td>"

                                    }


                                  
                                }
                                else {
                                    html_kzz_td += "<td>" + arr_valueKzz[i][j] + "</td>"

                                }
                            }
                        }
                    }
                }
                $(divId + " #" + arrId[0][m][n] + " thead").html("");
                $(divId + " #" + arrId[0][m][n] + " tbody").html("");
                $(divId + " #" + arrId[0][m][n] + " thead").append(html_kzz_th.toString());
                $(divId + " #" + arrId[0][m][n] + " tbody").append(html_kzz_td.toString());
            }
        }
    }

    ddTableHeader(_ddname, arrId);
}
function ddTableHeader(_ddname, arrId) {
    var arr = arrId[0];
    var arr2 = [];
    for (i = 0; i < arr[0].length; i++) {
        arr2[i] = [];

    }
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[0].length; j++) {
            arr2[j][i] = arr[i][j];
        }

    }

    for (var i = 0; i < arr2[0].length; i++) {//行蓄洪区表头
        if ($("#tableid_xxhq_" + i).length > 0) {
            $("#tableid_xxhq_" + i).remove();
        }
        $("#" + arr2[0][i]).parent().prepend(
            "<table id='tableid_xxhq_" + i + "' class='table'><thead>" + $("#" + arr2[0][i] + " thead").html() + "</thead></table>"
        ).css({
            'position': 'relative',
            'overflow-y': 'auto',
            'max-height': '131px',
            'height': '300px'
        })
        $("#tableid_xxhq_" + i).css({
            'position': 'absolute',
            'top': '0',
            'left': 0,
            'z-index': 2
        })
        $("#" + arr2[0][i]).css({
            'position': 'absolute',
            'top': 0,
            'left': 0
        })
        var class_1 = $("#" + arr2[0][i]).parent().attr('class');
        var fzId_1 = $("#" + arr2[0][i]).prev().attr('id');
        $("." + class_1).scroll(function (e) {
            var _classname = e.target.className;
            var _tableid = e.target.firstChild.id;
            if ($('.' + _classname).scrollTop() > 0) {
                $("#" + _tableid).css('top', $('.' + _classname).scrollTop());
            } else {
                $("#" + _tableid).css('top', 0);
            }
        });
    }
    for (var i = 0; i < arr2[1].length; i++) {//水库表头
        if ($("#tableid_sk_" + i).length > 0) {
            $("#tableid_sk_" + i).remove();
        }
        $("#" + arr2[1][i]).parent().prepend(
            "<table id='tableid_sk_" + i + "' class='table' ><thead>" + $("#" + arr2[1][i] + " thead").html() + "</thead></table>"
        ).css({
            'position': 'relative',
            'overflow-y': 'auto',
            'max-height': '131px',
            'height': '300px'
        })
        $("#tableid_sk_" + i).css({
            'position': 'absolute',
            'top': '0',
            'left': 0,
            'z-index': 2
        })
        $("#" + arr2[1][i]).css({
            'position': 'absolute',
            'top': 0,
            'left': 0
        })
        var class_2 = $("#" + arr2[1][i]).parent().attr('class');
        var fzId_2 = $("#" + arr2[1][i]).prev().attr('id');
        $('.' + class_2).scroll(function (e) {
            var _classname = e.target.className;
            var _tableid = e.target.firstChild.id;
            if ($('.' + _classname).scrollTop() > 0) {
                $("#" + _tableid).css('top', $('.' + _classname).scrollTop());
            } else {
                $("#" + _tableid).css('top', 0);
            }
        });
    }
    for (var i = 0; i < arr2[2].length; i++) {//控制站表头
        if ($("#tableid_kzz_" + i).length > 0) {
            $("#tableid_kzz_" + i).remove();
        }
        $("#" + arr2[2][i]).parent().prepend(
            "<table id='tableid_kzz_" + i + "' class='table' ><thead>" + $("#" + arr2[2][i] + " thead").html() + "</thead></table>"
        ).css({
            'position': 'relative',
            'overflow-y': 'auto',
            'max-height': '131px',
            'height': '300px'
        })
        $("#tableid_kzz_" + i).css({
            'position': 'absolute',
            'top': '0',
            'left': 0,
            'z-index': 2
        })
        $("#" + arr2[2][i]).css({
            'position': 'absolute',
            'top': 0,
            'left': 0
        })
        var class_3 = $("#" + arr2[2][i]).parent().attr('class');
        var fzId_3 = $("#" + arr2[2][i]).prev().attr('id');
        $('.' + class_3).scroll(function (e) {
            var _classname = e.target.className;
            var _tableid = e.target.firstChild.id;
            if ($('.' + _classname).scrollTop() > 0) {
                $("#" + _tableid).css('top', $('.' + _classname).scrollTop());
            } else {
                $("#" + _tableid).css('top', 0);
            }
        });
    }
}