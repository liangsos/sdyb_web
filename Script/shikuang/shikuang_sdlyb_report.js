//# sourceURL=shikuang_sdlyb_report.js
//报表默认宽高
var default_sqyj_width_report = 1330;
var default_sqyj_height_report = 515;
var json_data = null;
var ddjg_table_name = "";
var objData = null;
var icon_max = "";
var jsonData = null;
var selectModel = "";
var modelName = "";
var stationHtmlHd = "";
var stationHtmlSk = ""
//最大化按钮事件
$(".report-sqyj .icon-max-para").click(function () {
    //console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_sqyj_width_report).height(default_sqyj_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_sqyj_width_report / 2 + "px",
            "margin-top": "-" + default_sqyj_height_report / 2 + "px"
        });
        $(this).attr("data-type", "");
        icon_max = "";
        //动态设置报表高度
        setParSizeSqyj($(this).parent().parent().parent().attr("id"), default_sqyj_width_report, default_sqyj_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });
        $(this).attr("data-type", "max");
        icon_max = "max";
        //动态设置报表高度
        setParSizeSqyj($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
    }
});
//关闭按钮事件
$(".report-sqyj .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    // $("#para_check").removeAttr("checked");

});

/**
 * TAB切换事件- 手动处理避免显示延迟
 **/
$("#panel_sqyj .nav a").click(function (e) {
    if ($(this).parent('li').hasClass('active'))
        return;

    //改变标题栏
    $(this).parent('li').siblings('.active:last').removeClass("active");
    $(this).parent('li').addClass("active");

    //获取当前元素ID
    var id = $(this).attr("_data");
    $(id).siblings('.active:last').removeClass("in active");
    $(id).addClass("in active");
    tableHeader_sqyj();
    if (id == "#contSqyj_hd") {//河道
        $("#infoTxt_sk").hide();
        $("#infoTxt_hd").show();
    } else {//水库
        $("#infoTxt_hd").hide();
        $("#infoTxt_sk").show();
    }
});

function getRealWsReport(type) {
    var objData = {
        endTime: searchEtime_timeWork,
        plan: 0,
        range: 14,
        startTime: searchStime_timeWork
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-rainsituation/live/getRealAlertReport",
        data: info,
        headers: {
            "Authorization": $("#_hid_token").val()
        },
        success: function (res) {
            jsonData = res.data;

            $("#panel_sqyj").show();
            tools.showPanelIndex("panel_sqyj");
            //默认河道
            if (type == 1) {
                //只保留水库预警
                selectModel = "水库";
                $("#linkSqyj_sk").click();

            }
            else if (type == 2) {
                //只保留河道预警
                selectModel = "河道";
                $("#linkSqyj_hd").click();
            }

            create_sqyj_table_hd(jsonData, selectModel);
            create_sqyj_table_sk(jsonData, selectModel);
            $("#panel_sqyj").width(default_sqyj_width_report).height(default_sqyj_height_report).css({
                "top": "50%",
                "left": "50%",
                "margin-left": "-" + default_sqyj_width_report / 2 + "px",
                "margin-top": "-" + default_sqyj_height_report / 2 + "px"
            });
            $(".report-sqyj .icon-max-para").attr("data-type", "");
            icon_max = "";
            setParSizeSqyj("panel_sqyj", default_sqyj_width_report, default_sqyj_height_report);

        }

    })
}

//创建表格
function create_sqyj_table_hd(json, model) {
    //先清空数据
    $("#tableHd_sqyj thead tr").remove();
    $("#tableHd_sqyj tbody tr").remove();
 
    $("#infoTxt_hd").html("");
    $("#panel_sqyj .modal-title").html(selectModel + "水情表");
   
    //表头
    var _html_th = "<tr><th>序号</th>";
    var _html_body = "";
    $.each(json.river.dataName, function (index, item) {
        if (index != json.river.dataName.length - 1)
            _html_th += "<th>" + item + "</th>"
    })
    _html_th += "</tr>"
    $.each(json.river.data, function (index_out, item_out) {
        _html_body += "<tr>";
        $.each(item_out, function (index, item) {
            if (index == 0)
                _html_body += "<td>" + Number(index_out + 1) + "</td><td>" + item + "</td>"
            else if (index == 1) {
                if (item_out[item_out.length - 2] == "超历史")
                    _html_body += "<td> <a style='color:purple;text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"
                else if (item_out[item_out.length - 2] == "超保证")
                    _html_body += "<td> <a style='color:red;text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"
                else if (item_out[item_out.length - 2] == "超警戒")
                    _html_body += "<td> <a style='color:blue;text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"

                else _html_body += "<td> <a style='text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"

            } else if (index != item_out.length - 1)
                _html_body += "<td>" + item + "</td>"

        })
        _html_body += "</tr>";
    })

    $("#tableHd_sqyj thead").append(_html_th);
    $("#tableHd_sqyj tbody").append(_html_body);
    $("#infoTxt_hd").html("超保证:"+json.river.riverStation.grzNum+"个,超历史:"+json.river.riverStation.obhtzNum+"个,超警戒:"+json.river.riverStation.wrzNum+"个,累积超额洪量:"+json.river.riverStation.ljcehl+"百万m³");

};

function tableHeader_sqyj() {
    $("#skHead thead tr").remove();

    $("#skHead thead").prepend(
        $("#tableSk_sqyj thead").html()
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })


    $("#skHead").find('th').each(function (i) {
        $(this).css('width', $('#tableSk_sqyj').find('th:eq(' + i + ')').css('width'));
    });
    $("#skHead").css({
        'position': 'absolute',
        'display': 'table-caption',
        "background": "rgb(18,37,56)",
        'z-index': 2
    })

    $("#hdHead thead tr").remove();

    $("#hdHead thead").prepend(
        $("#tableHd_sqyj thead").html()
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })


    $("#hdHead").find('th').each(function (i) {
        $(this).css('width', $('#tableHd_sqyj').find('th:eq(' + i + ')').css('width'));
    });
    $("#hdHead").css({
        'position': 'absolute',
        'display': 'table-caption',
        "background": "rgb(18,37,56)",
        'z-index': 2
    })


    //   $("#tableSk_sqyj thead tr").remove();
}

//报表通用改变大小事件
$(".report-sqyj").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true, //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 650,
    zIndex: 0, //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});

function reportBbResize(event, ob) {
    //动态设置报表高度
    setParSizeSqyj($(event.target).attr("id"), ob.size.width, ob.size.height);
}

function setParSizeSqyj(reportId, width, height, json) {
    initTableDiv(reportId);
    $("#" + reportId).width(width).height(height);
    $("#" + reportId).css({
        "top": "calc(50% - " + (height / 2) + "px)",
        "left": "calc(50% - " + (width / 2) + "px)",
        "margin-left": "0px",
        "margin-top": "0px"

    });
    tableHeader_sqyj();
}
//报表通用可拖拽事件
$(".report-sqyj").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-sqyj").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

function initTableDiv(reportId) {
    if (icon_max == "max") {
        $("#" + reportId + " .tab-pane").css({
            "height": $(window).height() - 95,
            "overflow-y": "scroll"
        });
        $(".sqyj-table").css({
            "height": $(window).height() - 135,
            "overflow-y": "scroll"
        });
    } else {
        $("#" + reportId + " .tab-pane").css({
            "height": "420px",
            "overflow-y": "scroll"
        });
        $(".sqyj-table").css({
            "height": "452px",
            "overflow-y": "scroll"
        });
    }
};


function create_sqyj_table_sk(json, model) {
    //先清空数据
    $("#tableSk_sqyj thead tr").remove();
    $("#tableSk_sqyj tbody tr").remove();
    $("#skHead thead tr").remove();
    $("#infoTxt_sk").html("");
    //表头
    var _html_th = "<tr><th>序号</th>";
    var _html_body = "";
    $.each(json.rsvr.dataName, function (index, item) {
        if (index != json.rsvr.dataName.length - 1)
            _html_th += "<th>" + item + "</th>"
    })
    _html_th += "</tr>"
    $.each(json.rsvr.data, function (index_out, item_out) {
        _html_body += "<tr>";
        $.each(item_out, function (index, item) {
            if (index == 0)
                _html_body += "<td>" + Number(index_out + 1) + "</td><td>" + item + "</td>"
            else if (index == 1) {
                if ((item_out[item_out.length - 2] == "超汛限") || (item_out[item_out.length - 2] == "超兴利"))
                    _html_body += "<td> <a style='color:blue;text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"
                else if ((item_out[item_out.length - 2] == "超校核") || (item_out[item_out.length - 2] == "超设计"))
                    _html_body += "<td> <a style='color:red;text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"
                else _html_body += "<td> <a style='text-decoration: underline' href='#' onclick='show_ybgcx(\"" + item_out[item_out.length - 1] + "\"" + ",\"" + item + "\"" + "," + "\"" + "RR\");'>" + item + "</a></td>"

            }
            else if (index != item_out.length - 1)
                _html_body += "<td>" + item + "</td>"

        })
        _html_body += "</tr>";
    })
 

    $("#tableSk_sqyj thead").append(_html_th);
    $("#tableSk_sqyj tbody").append(_html_body);
    $("#infoTxt_sk").html("超校核:"+json.rsvr.reservoirStation.ckflzNum+"个,超设计:"+json.rsvr.reservoirStation.dsflzNum+"个,超汛限:"+json.rsvr.reservoirStation.fsltdzNum+"个,超兴利:"+json.rsvr.reservoirStation.normzNum+"个,累积超额洪量:"+json.rsvr.reservoirStation.ljcehl+"百万m³");
}

function show_ybgcx(stcd, stnm, sttp) {
    show_info(stnm + "_" + stcd + "_" + sttp + "_(true_true_true)");
    return;

}
