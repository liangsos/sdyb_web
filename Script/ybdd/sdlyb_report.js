//# sourceURL=sdlyb_report.js
var tools_panel_sdljs, tools_panel_sdldmxx;
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;
// var json_data = null;
var sdlyb_table_name = "水动力学预报计算";
var parentId = "#panel_sdlyb";
var xh;
var rvcd;
var selectModel;

//最大化按钮事件
$(".report-sdlyb .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        // setParSizeSdljs($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        $(this).attr("data-type", "");
        // console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        // setParSizeSdljs($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        // console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());
    }
});
//关闭按钮事件
$(".report-sdlyb .icon-close").click(function () {
    layer.confirm('是否保存计算结果？', {
        icon: 3,
        btn: ['是', '否'], //按钮
        yes: function (index) {
            saveHydracalResult();
            layer.close(index);
        },
        btn2: function (index) {
            layer.close(index);
        }
    });

    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    // $("#para_check").removeAttr("checked");
    $("#bar_sdl").attr("src", "./img/revr.png");

});

//创建表格
function create_sdlyb_table2(reportId, _width, json) {
 
    //先清空数据
    $("#panel_sdlyb .tjfx-table-data_para-sdlyb table colgroup col").remove();
    $("#panel_sdlyb .tjfx-table-data_para-sdlyb table thead tr").remove();
    $("#panel_sdlyb .tjfx-table-data_para-sdlyb table tbody tr").remove();

    $("#panel_sdlyb .modal-title").html(sdlyb_table_name);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.name, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.data, function (index, item) {
        _html_body += "<tr class='linkTr'>";
        $.each(item, function (index_inner, item_inner) {
            if (index_inner < 6) {
                var _class = "";
                _class += " style='white-space: normal;text-align:center'";
                if (index_inner == 4) {
                    _html_body += "<td " + _class + "><a style=\"cursor:pointer\" onclick=\"hddm(" + "\'" + item[6] + "\'" + "," + "\'" + item[7] + "\'" + "," + "\'" + item[8] + "\'" + ")\" >" + item_inner + "</a></td>";
                } else if (index_inner == 3) {
                    _html_body += "<td " + _class + "><a style=\"cursor:pointer\" onclick=\"hdxx(" + "\'" + item[6] + "\'" + "," + "\'" + item[7] + "\'" + "," + "\'" + item[8] + "\'" + "," + "\'" + item_inner  + "\'" + ")\">" + item_inner + "</a></td>";
                }
                // else if (index_inner == 3) {
                //     _html_body += "<td " + _class + "><a style='cursor:pointer' onclick='dmxx(this)'>" + item_inner + "</a></td>";
                // }
                else {
                    _html_body += "<td " + _class + ">";
                    _html_body += item_inner + "</td>";
                }
            }
        });
        _html_body += "</tr>";
    });
    $("#panel_sdlyb .tjfx-table-data_para-sdlyb table thead").append(_html_th);
    $("#panel_sdlyb .tjfx-table-data_para-sdlyb table tbody").append(_html_body);

};
function tableHeader_sdlyb() {
    if ($("#tableid_sdlyb").length > 0) {
    } else {
        $("#panel_sdlyb_table").parent().prepend(
        '<table id="tableid_sdlyb" class="table" ><thead>' + $("#panel_sdlyb_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }
    
    $("#tableid_sdlyb").find('th').each(function (i) {
        $(this).css('width', $('#panel_sdlyb_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_sdlyb").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_sdlyb_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para-sdlyb').scroll(function () {
        if ($('.tjfx-table-data_para-sdlyb').scrollTop() > 0) {
            $("#tableid_sdlyb").css('top', $('.tjfx-table-data_para-sdlyb').scrollTop());
        } else {
            $("#tableid_sdlyb").css('top', 0);
        }
    });
}
//报表通用改变大小事件
$(".report-sdlyb").resizable({
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
    stop: reportBbResize2
});
function reportBbResize2(event, ob) {
    //动态设置报表高度
    setParSizeSdljs($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeSdljs(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
    if (reportId == "panel_sdlyb") {
        initTableDiv_sdlyb2(reportId);

        create_sdlyb_table2(reportId, width - 15, json);
        $("#panel_sdlyb .tjfx-table-data_para-sdlyb").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });
        $("#panel_sdlyb .tjfx-table-data_para-sdlyb").height(height - 45);
    } else if (reportId == "panel_sdlsmx") {
        var _info_height = 60;
        $("#sdlsmx_echart").width(width).height(height - _info_height - 32);
        $("#sdlsmx_info").width(width).height(_info_height);
        if (chart_hgsmx != null)
            chart_hgsmx.resize();

    }

    tableHeader_sdlyb();
}
//报表通用可拖拽事件
$(".report-sdlyb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-sdlyb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
       return;
    tools.showPanelIndex($(this).attr("id"));
});

function initTableDiv_sdlyb2(reportId) {

    $("#" + reportId + " .tjfx-table-data_para-sdlyb").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-sdlyb").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-sdlyb").css({
        "height": "440px",
        "overflow-y": "scroll"
    });
};

function dmjs(e){
    xh = e.innerHTML;
    rvcd = e.parentElement.parentElement.children[1].innerHTML

    $("#panel_sjjg").show();
    tools.showPanelIndex("panel_sjjg");
    //tools.hidePanelIndex("panel_sdlyb");
}

//关闭按钮事件
$("#panel_sjjg .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});

//确认按钮点击事件
$("#panel_sjjg #selectSjjg").click(function () {
    var sjjg = $("#panel_sjjg #select_Sjjg").val();

    var model = Number(selectModel);
    var searchStime = $("#beginTime").val() + ":00";
    var searchEtime = $("#endTime").val() + ":00";
    var searchPlan = $("#selectPlan").val();
    tools_panel_sdljs.panelShow(xh, selectDays,searchStime, searchEtime, model,searchPlan,rvcd,sjjg);

    $("#panel_sjjg").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_sjjg");
})

function dmxx(e) {
    var csid = e.parentElement.parentElement.rowIndex;
    tools_panel_sdldmxx.panelShow(csid);
}

/**
 * 河段信息水面线
 * @param {*河系编码} bsid 
 * @param {*河流编码} rvid 
 * @param {*河段编码} reacd 
 * @param {*河段名称} dm 
 */
function hdxx(bsid, rvid, reacd,dm) {
    var objData = {
        bsid: bsid,
        reacd: reacd,
        rvid: rvid
    };
    chart_data = null;
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": $("#_hid_token").val()
        },
        url: apiUrl_cloud + "api-hwhydroinfo/get_hydracalResReachMinio",
        data: info,
        success: function (data) {
            tools.loadinghide(false);
            var res = data;
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询水动力水面线信息失败！");
                return;
            }
            var json = res;
            chart_data = json.data;
            if (json.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-sdlyb .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panel_sdlsmx").show();
                tools.showPanelIndex("panel_sdlsmx");
                $("#panel_sdlsmx .modal-title").html(dm + "水动力水面线")
                setParSizeSdljs("panel_sdlsmx", default_par_width_report, default_par_height_report);

                initChart_sdlsmx(chart_data);
                add_click_gcx_comon_sdl();
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}
function initChart_sdlsmx(json) {

    var tm_indexFromlast = 4;
    chart_sdlsmx = null;
    chart_sdlsmx = echarts.init(document.getElementById('sdlsmx_echart'));

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

    $.each(json.hzb, function (index, item) {
        xAxis_data.push(item);
    });
    $.each(json.tm, function (index, item) {
        tm_data.push(item);
    });
    data_len = tm_data.length;

    var hdgc = json.hdgc;


    var swMin = json.zzbmin - 0.5;
    var swMax = json.zzbmax + 0.5;

    //根据横坐标，每个时间点17个数据series_data 最终多少个时间点多少组数据，每组里面根据横坐标17个数据
    series_data = json.sw;

    // var arr_series = new Array();
    var arr_series = [{
        name: "水位",
        type: 'line',
        yAxisIndex: 0,
        symbol: "circle",
        z: 5,
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
        data: series_data[cur_animation_index]
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
        data: hdgc
    }]

    arr_series.push();



    var option = {
        title: {
            text: '水动力水面线图\n(' + moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + "-" + moment((tm_data[tm_data.length - 1] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + ")",
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
            data: ["水位,河底高程"]
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
            min: swMin,
            max: swMax
            //min: minmax_data[0][0],
            //max: minmax_data[0][1]
        },
        series: arr_series
    };
    option = tools.initChartlegendIcon(option);
    // 使用刚指定的配置项和数据显示图表。
    chart_sdlsmx.setOption(option, true);

    $("#sdlsmx_tm_info").html(moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));

}

/**
 * 过程线图例点击事件(通用)
 **/
function add_click_gcx_comon_sdl() {
    chart_sdlsmx.off("legendselectchanged");
    chart_sdlsmx.on("legendselectchanged", function (params) {
        if (params.name in params.selected) {
            var state = params.selected[params.name];
            var option = tools.selectchangeChartlegendIcon(chart_sdlsmx.getOption(), state, params.name);
            chart_sdlsmx.setOption(option, true);
        }
    });
}

$("#btn_sdlsmx_start").click(function (event) {
    if (hgx_interval != null) {
        return;
    }
    hgx_interval = setInterval(refreshData, 500);
});
$("#btn_sdlsmx_pause").click(function (event) {
    if (hgx_interval != null) {
        clearInterval(hgx_interval);
        hgx_interval = null;
    }

});
$("#btn_sdlsmx_reset").click(function (event) {
    $("#btn_sdlsmx_pause").click();
    resetDatasdlsmx();
});

function resetDatasdlsmx() {
    if (!chart_sdlsmx) {
        return;
    }
    cur_animation_index = 0;
    //更新数据
    var option = chart_sdlsmx.getOption();

    option.series[0].data = series_data[cur_animation_index];

    //option.yAxis[0].min = minmax_data[cur_animation_index][0];
    //option.yAxis[0].max = minmax_data[cur_animation_index][1];
    $("#sdlsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_sdlsmx.setOption(option, true);
}

function refreshData() {
    if (!chart_sdlsmx) {
        return;
    }
    cur_animation_index++;
    if (cur_animation_index >= tm_data.length) {
        cur_animation_index = 0;
    }
    //更新数据
    var option = chart_sdlsmx.getOption();
    option.series[0].data = series_data[cur_animation_index];
    //option.yAxis[0].min = minmax_data[cur_animation_index][0];
    //option.yAxis[0].max = minmax_data[cur_animation_index][1];
    $("#sdlsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_sdlsmx.setOption(option, true);
}

/**
 * 河段断面信息
 * @param {*} bsid 
 * @param {*} rvid 
 * @param {*} reacd 
 */
function hddm(bsid, rvid, reacd) {
    var objData = {
        bsid: bsid,
        reacd: reacd,
        rvid: rvid
    };
    chart_data = null;
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": $("#_hid_token").val()
        },
        url: apiUrl_cloud + "api-hwhydroinfo/get_hydracalReaCs",
        data: info,
        success: function (data) {
            tools.loadinghide(false);
            var res = data;
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询水动力水面线信息失败！");
                return;
            }
            var json = res;
            chart_data = json.data;
            if (json.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                 $("#panel_hddm").show();
                 tools.showPanelIndex("panel_hddm");
                 setParSizeSdlyb("panel_hddm", default_par_width_report, default_par_height_report, res.data);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}
/**
 * 水动力学计算结果保存入库
 */
function saveHydracalResult() {
     tools.loadingshow("水动力计算结果保存入库中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    var objData = {
        adjust: 1,
        autoFore: 0,
        day: selectDays,
        etime: searchEtime,
        hisStormId: _hisStormId,
        model: 1,
        modelid: getRadioModel(),
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        stime: searchStime,
        meteorPattern: meteor
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": $("#_hid_token").val()
        },
        url: apiUrl_cloud + "api-hwhydroinfo/get_hydracalResultSave",
        data: info,
        success: function (res) {
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("保存失败！");
                return;
            }
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error(res.msg);
            } else {
                tools.loadinghide(true);
                tools.show_message_success(res.data.message);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
  }