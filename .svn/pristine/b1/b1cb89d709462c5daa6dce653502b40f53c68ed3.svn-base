//# sourceURL=nynl_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;
var json_data = null;
var nynl_table_name = "纳雨能力";

$(".show_nynl").hide();
$(".show_nynl").parent().hide();
//最大化按钮事件
$(".report-nynl .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeNynl($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
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
        setParSizeNynl($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-nynl .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");
    $("#show_nynl").removeAttr("checked");
});
$("#show_nynl").on('change',function () {
    if ($("#show_nynl").is(':checked')) {

        $("#panel_nynl").show();
        get_nynl_data(searchRange, searchStime, searchEtime)
        // tools_panel_allYb.resizeYBTZZWindow();
        tools.showPanelIndex("panel_nynl");
    } else {
        $("#panel_nynl").hide();
    }
})

//创建表格
function create_nynl_table(reportId, _width, json) {

    //先清空数据
    $("#panel_nynl .tjfx-table-data_para-nynl table colgroup col").remove();
    $("#panel_nynl .tjfx-table-data_para-nynl table thead tr").remove();
    $("#panel_nynl .tjfx-table-data_para-nynl table tbody tr").remove();

    $("#panel_nynl .modal-title").html(nynl_table_name);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.datanm, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            var _class = "";
            _class += " style='white-space: normal;text-align:center'";
            _html_body += "<td " + _class + " >";
            _html_body += item_inner;

        });
        _html_body += "</tr>";
    });
    $("#panel_nynl .tjfx-table-data_para-nynl table thead").append(_html_th);
    $("#panel_nynl .tjfx-table-data_para-nynl table tbody").append(_html_body);

};
function tableHeader_nynl() {
    if ($("#tableid_nynl").length > 0) {
    } else {
        $("#panel_nynl_table").parent().prepend(
        '<table id="tableid_nynl" class="table" ><thead>' + $("#panel_nynl_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }

    $("#tableid_nynl").find('th').each(function (i) {
        $(this).css('width', $('#panel_nynl_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_nynl").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_nynl_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para-nynl').scroll(function () {
        if ($('.tjfx-table-data_para-nynl').scrollTop() > 0) {
            $("#tableid_nynl").css('top', $('.tjfx-table-data_para-nynl').scrollTop());
        } else {
            $("#tableid_nynl").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-nynl").resizable({
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
    setParSizeNynl($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeNynl(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv_nynl(reportId);

    $("#" + reportId).width(width).height(height);

    create_nynl_table(reportId, width - 15, json_data);
    $("#panel_nynl .tjfx-table-data_para-nynl").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_nynl .tjfx-table-data_para-nynl").height(height - 45);

    tableHeader_nynl();
}
//报表通用可拖拽事件
$(".report-nynl").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-nynl").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_nynl_data(searchRange, searchStime,searchEtime) {

    tools.loadingshow("查询纳雨能力信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    var objData = {
        adjust:1,
        range: searchRange,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        endTime: searchEtime,
        startTime: searchStime
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/Hydroinfo/get_RsvrCapacity",
        data: info,
        //url: "panelNew.aspx/get_RsvrCapacity",
        //data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = res;
            json_data = json.data;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-nynl .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panel_nynl").show();
                tools.showPanelIndex("panel_nynl");
                setParSizeNynl("panel_nynl", default_par_width_report, default_par_height_report);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}
function initTableDiv_nynl(reportId) {

    $("#" + reportId + " .tjfx-table-data_para-nynl").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-nynl").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-nynl").css({
        "height": "440px",
        "overflow-y": "scroll"
    });



};
