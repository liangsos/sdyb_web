//# sourceURL=jsfq_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;
var json_data = null;
var jsfq_table_name = "降水分区";
var pfInfoList = null;

//最大化按钮事件
$(".report-jsfq .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeJsfq($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        $(this).attr("data-type", "");
        //console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setParSizeJsfq($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        //console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-jsfq .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});

//创建表格
function create_jsfq_table(reportId, _width, json) {
    //先清空数据
    $("#panel_jsfq .tjfx-table-data_para-jsfq table thead tr").remove();
    $("#panel_jsfq .tjfx-table-data_para-jsfq table tbody tr").remove();
    $("#jsfqHead thead tr").remove();

    $("#panel_jsfq .modal-title").html(jsfq_table_name);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "<th>" + "操作" + "</th>"
    _html_th += "</tr>";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            var _class = "";
            _class += " style='white-space: normal;text-align:center'";
            if (index_inner == 1) {
                //气象分区option
                var htmlOption = "";
                $.each(pfInfoList, function (index, item) {
                    if (item_inner == item.pfId) {
                        htmlOption += "<option value='" + item.pfId + "' selected> " + item.pfName + "</option>"
                    } else {
                        htmlOption += "<option value='" + item.pfId + "'> " + item.pfName + "</option>"
                    }
                })
                _html_body += "<td><select disabled='disabled'>" + htmlOption + "</select></td>"
            } else {
                _html_body += "<td " + _class + " >" + item_inner + "</td>";
            }
        });
        _html_body += "<td><a href='#' style='text-decoration:none;' onclick='modifyBasinPf(this)'><i class = 'fa fa-pencil'></i>修改</a>&nbsp;&nbsp;" +
            "<a href = '#' style = 'text-decoration:none;' onclick = 'saveBasinPf(this)'><i class='fa fa-check-circle'></i>保存</a></td > "
        _html_body += "</tr>";
    });
    $("#panel_jsfq .tjfx-table-data_para-jsfq table thead").append(_html_th);
    $("#panel_jsfq .tjfx-table-data_para-jsfq table tbody").append(_html_body);

};
function tableHeader_jsfq() {
    $("#jsfqHead thead tr").remove();
    $("#jsfqHead thead").prepend(
        $("#panel_jsfq_table thead").html()
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })

    $("#jsfqHead").find('th').each(function (i) {
        $(this).css('width', $('#panel_jsfq_table').find('th:eq(' + i + ')').css('width'));
    });
    $("#jsfqHead").css({
        'position': 'absolute',
        'display': 'table-caption',
        'z-index': 2,
        "border-top": "0px"
    })
}

//报表通用改变大小事件
$(".report-jsfq").resizable({
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
    setParSizeJsfq($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeJsfq(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv_jsfq(reportId);

    $("#" + reportId).width(width).height(height);

    create_jsfq_table(reportId, width - 15, json_data);
    $("#panel_jsfq .tjfx-table-data_para-jsfq").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_jsfq .tjfx-table-data_para-jsfq").height(height - 45);

    tableHeader_jsfq();
}
//报表通用可拖拽事件
$(".report-jsfq").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-jsfq").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_jsfq_data(searchRange, searchPlan, selectDays, userId, ratio) {

    //tools.loadingshow("查询纳雨能力信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    
    var objData = {
        range: searchRange
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: apiUrl_cloud + "api-rainsituation/basin/getMeteorPPMapWshedInfo",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var res = data;

            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }
            getPfInfoList();
            var json = data.data;
            json_data = json;
            // tools.loadinghide(true);
            
            return;
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}
function initTableDiv_jsfq(reportId) {

    // $("#" + reportId + " .tjfx-table-data_para-jsfq").empty();
    // var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    // $("#" + reportId + " .tjfx-table-data_para-jsfq").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-jsfq").css({
        "height": "440px",
        "overflow-y": "scroll"
    });
};
/**
 * 获取气象分区
 */
function getPfInfoList() {
    $.ajax({
        type: 'get',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: true,
        dataType: 'json',
        url: apiUrl_cloud + "api-rainsituation/basin/getPfInfoList",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }
            pfInfoList = res.data;
            $("#panel_jsfq").show();
            tools.showPanelIndex("panel_jsfq");
            setParSizeJsfq("panel_jsfq", default_par_width_report, default_par_height_report);
            return;
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}
/**
 * 修改气象分区
 */
function modifyBasinPf(e) {
    $(e).parent().parent().find("select").attr("disabled", false);
}
/**
 * 保存气象分区
 */
function saveBasinPf(e) {
    var pfId = $(e).parent().parent().find("select").val();
    var basinId = $(e).parent().parent().children(":eq(2)")[0].innerHTML;
    var wsid = $(e).parent().parent().children(":eq(4)")[0].innerHTML;

    var objData = {
        basinId: basinId,
        pfId: pfId,
        wsid: wsid
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: apiUrl_cloud + "api-rainsituation/basin/modifyBasinPf",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error_const("修改气象分区保存失败！");
                return;
            }
            tools.show_message_success("修改气象分区保存成功！")
            return;
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error_const("修改气象分区保存失败！");
        }
    });
}