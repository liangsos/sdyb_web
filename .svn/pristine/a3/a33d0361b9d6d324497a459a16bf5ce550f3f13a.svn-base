//# sourceURL=bbtj_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 475;
var json_data = null;
var bbtj_table_name = "流域各片产汇流总表";

//最大化按钮事件
$(".report-bbtj .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeBbtj($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        $(this).attr("data-type", "");
        console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setParSizeBbtj($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-bbtj .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});
/**
 * 数据导出
**/
$("#panel_bbtj").find('.fa-arrow-circle-o-up').click(function () {
    downloadExl_bbtj(json_data);
})

//创建表格
function create_bbtj_table(reportId, _width, json) {
 
    //先清空数据
    $("#panel_bbtj .tjfx-table-data_para-bbtj table colgroup col").remove();
    $("#panel_bbtj .tjfx-table-data_para-bbtj table thead tr").remove();
    $("#panel_bbtj .tjfx-table-data_para-bbtj table tbody tr").remove();

    $("#panel_bbtj .modal-title").html(bbtj_table_name);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.statisName, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.statis, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            var _class = "";
            _class += " style='white-space: normal;text-align:center'";
            if (isNaN(item_inner) && !isNaN(Date.parse(item_inner))) {
                _html_body += "<td>" + (item_inner == "" ? "" : moment(item_inner).format("MM-DD HH:mm")) + "</td>";
            } else {
                _html_body += "<td " + _class + " >";
                _html_body += item_inner + "</td>";
            }
        });
        _html_body += "</tr>";
    });
    $("#panel_bbtj .tjfx-table-data_para-bbtj table thead").append(_html_th);
    $("#panel_bbtj .tjfx-table-data_para-bbtj table tbody").append(_html_body);

};
function tableHeader_bbtj() {
    if ($("#tableid_bbtj").length > 0) {
    } else {
        $("#panel_bbtj_table").parent().prepend(
        '<table id="tableid_bbtj" class="table" ><thead>' + $("#panel_bbtj_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }
    
    $("#tableid_bbtj").find('th').each(function (i) {
        $(this).css('width', $('#panel_bbtj_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_bbtj").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_bbtj_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para-bbtj').scroll(function () {
        if ($('.tjfx-table-data_para-bbtj').scrollTop() > 0) {
            $("#tableid_bbtj").css('top', $('.tjfx-table-data_para-bbtj').scrollTop());
        } else {
            $("#tableid_bbtj").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-bbtj").resizable({
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
    setParSizeBbtj($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeBbtj(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv_bbtj(reportId);

    $("#" + reportId).width(width).height(height);

    create_bbtj_table(reportId, width - 15, json_data);
    $("#panel_bbtj .tjfx-table-data_para-bbtj").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_bbtj .tjfx-table-data_para-bbtj").height(height - 45);

    tableHeader_bbtj();
}
//报表通用可拖拽事件
$(".report-bbtj").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-bbtj").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_bbtj_data(searchRange, searchStime, searchEtime, userId, searchPlan, selectDays, model) {

    //tools.loadingshow("查询纳雨能力信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    
    var objData = {
        range: searchRange,
        stime: searchStime,
        etime: searchEtime,
        userId: userId,
        plan: searchPlan,
        day: selectDays,
        model: model
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: "panelNew.aspx/get_ForReport_Assembly",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data.d;

            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = JSON.parse(data.d);
            json_data = json;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-bbtj .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panel_bbtj").show();
                tools.showPanelIndex("panel_bbtj");
                setParSizeBbtj("panel_bbtj", default_par_width_report, default_par_height_report);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}
function initTableDiv_bbtj(reportId) {

    $("#" + reportId + " .tjfx-table-data_para-bbtj").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-bbtj").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-bbtj").css({
        "height": "440px",
        "overflow-y": "scroll"
    });
};
