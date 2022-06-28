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
    //更改统计值
    if (id == "#contSqyj_hd") {//河道
        $("#stationNum").html("");
        $("#stationNum").append(stationHtmlHd);
    } else {//水库
        $("#stationNum").html("");
        $("#stationNum").append(stationHtmlSk);
    }
});

function getRealWsReport(type) {
 


    var objData = {
        adjust: 1,
        endTime: "2020-08-14 12:00:00",
        foreDays: 3,
        model: "APIUH",
        plan: 0,
        range: 11,
        plusType: 0,
        rainPlus: 0,
        hisStormId: -1,
        startTime: "2020-08-12 08:00:00",
        meteorPattern: "",
        stcd: ""
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-rainsituation/real/genForeWsReport",
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
                selectModel="水库";
                $("#linkSqyj_hd").click();
            }
            else if (type == 2) {
                //只保留河道预警
                selectModel="河道";
                $("#linkSqyj_sk").click();
            }
       
            create_sqyj_table_hd(jsonData, selectModel);
            create_sqyj_table_sk(jsonData, selectModel);
            setParSizeSqyj("panel_sqyj", default_sqyj_width_report, default_sqyj_height_report);
        }
    })
}

//创建表格
function create_sqyj_table_hd(json, model) {

    //先清空数据
    $("#tableHd_sqyj thead tr").remove();
    $("#tableHd_sqyj tbody tr").remove();
    $("#stationNum").html("");
 
    $("#panel_sqyj .modal-title").html(selectModel + "水情表");
    //单流域
    var riverStation = json.basinReportInfoList[0].riverReportInfoList[0].reportInfo.riverStation;
    var reservoirStation = json.basinReportInfoList[0].reservoirReportInfoList[0].reportInfo.reservoirStation;
    stationHtmlHd = "<span style=' color:white'>"
    $.each(riverStation, function (i, data) {
        var font_start = "";
        var font_end = "";
        if (i == "wrzNum") {
            if (data > 0) {
                font_start = "<font color='blue' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlHd += "河道超警戒：" + font_start + data + font_end + "个；"
        }
        if (i == "grzNum") {
            if (data > 0) {
                font_start = "<font color='red' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlHd += "河道超保证：" + font_start + data + font_end + "个；"
        }
        if (i == "obhtzNum") {
            if (data > 0) {
                font_start = "<font color='purple' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlHd += "河道超历史：" + font_start + data + font_end + "个；"
        }
        if (i == "ljcehl") {
            if (data > 0) {
                font_start = "<font style='font-weight:900;color:#dc7000'>"
                font_end = "</font>";
            }
            stationHtmlHd += "河道累积超额洪量：" + font_start + data + font_end + "百万m³；"
        }
    })
    stationHtmlHd += "</span>";
    //水库
    stationHtmlSk = "<span>";
    $.each(reservoirStation, function (i, data) {
        var font_start = "";
        var font_end = "";
        if (i == "fsltdzNum") {
            if (data > 0) {
                font_start = "<font color='blue' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlSk += "水库超汛限：" + font_start + data + font_end + "个；"
        }
        if (i == "normzNum") {
            if (data > 0) {
                font_start = "<font color='blue' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlSk += "水库超正常：" + font_start + data + font_end + "个；"
        }
        if (i == "dsflzNum") {
            if (data > 0) {
                font_start = "<font color='red' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlSk += "水库超设计：" + font_start + data + font_end + "个；"
        }
        if (i == "ckflzNum") {
            if (data > 0) {
                font_start = "<font color='purple' style='font-weight:900'>"
                font_end = "</font>";
            }
            stationHtmlSk += "水库超校核：" + font_start + data + font_end + "个；"
        }
        if (i == "ljcehl") {
            if (data > 0) {
                font_start = "<font style='font-weight:900;color:#dc7000'>"
                font_end = "</font>";
            }
            stationHtmlSk += "水库累积超额洪量：" + font_start + data + font_end + "百万m³；"
        }
    })
    stationHtmlSk += "</span>"
    $("#stationNum").append(stationHtmlHd);
    //表头
    var _html_th = "<tr><th>序号</th>";
    var _html_body = "";
    $.each(json.basinReportInfoList[0].riverReportInfoList[0].reportInfo, function (index, item) {
        if (index == "dataName") {
            $.each(item, function (i, header) {
                if (i != item.length - 1)
                    _html_th += "<th>" + header + "</th>"
            })
        } else if (index == "data") {
            $.each(item, function (i, data) {
                _html_body += "<tr>";
                $.each(data, function (j, innerData) {
                    if (j == 1) {
                        if (data[6] > 0) {
                            _html_body += "<td> <a class='sqyjcolorPur' href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "ZZ\");'>" + innerData + "</a></td>"
                        } else if (data[5] > 0) {
                            _html_body += "<td> <a class='sqyjcolor' href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "ZZ\");'>" + innerData + "</a></td>"
                        } else {
                            _html_body += "<td><a href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "ZZ\");'>" + innerData + "</a></td>"
                        }
                    } else if (j == 0) {
                        _html_body += "<td>" + Number(i + 1) + "</td><td>" + innerData + "</td>"
                    } else {
                        if (j != data.length - 1)
                            _html_body += "<td>" + innerData + "</td>"
                    }
                })
                _html_body += "</tr>";
            })
        }
    })
    _html_th += "</tr>"

    $("#tableHd_sqyj thead").append(_html_th);
    $("#tableHd_sqyj tbody").append(_html_body);

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
        'z-index': 2
    })
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
            "height": $(window).height() - 65,
            "overflow-y": "scroll"
        });
        $(".sqyj-table").css({
            "height": $(window).height() - 65,
            "overflow-y": "scroll"
        });
    } else {
        $("#" + reportId + " .tab-pane").css({
            "height": "430px",
            "overflow-y": "scroll"
        });
        $(".sqyj-table").css({
            "height": "430px",
            "overflow-y": "scroll"
        });
    }
};


function create_sqyj_table_sk(json, model) {
    //先清空数据
    $("#tableSk_sqyj thead tr").remove();
    $("#tableSk_sqyj tbody tr").remove();
    $("#skHead thead tr").remove();
    //表头
    var _html_th = "<tr><th>序号</th>";
    var _html_body = "";
    $.each(json.basinReportInfoList[0].reservoirReportInfoList[0].reportInfo, function (index, item) {
        if (index == "dataName") {
            $.each(item, function (i, header) {
                if (i != item.length - 1)
                    _html_th += "<th>" + header + "</th>"
            })
        } else if (index == "data") {
            $.each(item, function (i, data) {
                _html_body += "<tr>";
                $.each(data, function (j, innerData) {
                    if (j == 1) {
                        if (data[11] > 0) {
                            _html_body += "<td> <a class='sqyjcolorPur' href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "RR\");'>" + innerData + "</a></td>"
                        } else if (data[9] > 0) {
                            _html_body += "<td> <a class='sqyjcolor' href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "RR\");'>" + innerData + "</a></td>"
                        } else {
                            _html_body += "<td><a href='#' onclick='show_ybgcx(\"" + data[data.length - 1] + "\"" + ",\"" + data[1] + "\"" + "," + "\"" + "RR\");'>" + innerData + "</a></td>"
                        }
                    } else if (j == 0) {
                        _html_body += "<td>" + Number(i + 1) + "</td><td>" + innerData + "</td>"
                    } else {
                        if (j != data.length - 1)
                            _html_body += "<td>" + innerData + "</td>"
                    }
                })
                _html_body += "</tr>";
            })
        }
    })
    _html_th += "</tr>"
    $("#tableSk_sqyj thead").append(_html_th);
    $("#tableSk_sqyj tbody").append(_html_body);
}

function show_ybgcx(stcd, stnm, sttp) {
    show_info(stnm+"_"+stcd+"_"+sttp+"_(true_true_true)");
    return;
 
}
