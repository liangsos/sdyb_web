//# sourceURL=sdlyb_report.js
var tools_panel_singleDm;
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;
// var json_data = null;
// var sdlyb_table_name = "水动力学河段断面信息";
var parentId = "#panel_hddm";
var xh;
var rvcd;
var selectModel;

//最大化按钮事件
$(".report-hddm .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeSdlyb($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
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
        setParSizeSdlyb($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        // console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());
    }
});
//关闭按钮事件
$(".report-hddm .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    // $("#para_check").removeAttr("checked");
    $("#bar_sdl").attr("src", "./img/revr.png");

});

//创建表格
function create_sdlyb_table(reportId, _width, json) {

    //先清空数据
    $("#panel_hddm .tjfx-table-data_para-sdlyb table colgroup col").remove();
    $("#panel_hddm .tjfx-table-data_para-sdlyb table thead tr").remove();
    $("#panel_hddm .tjfx-table-data_para-sdlyb table tbody tr").remove();

    // $("#panel_hddm .modal-title").html(sdlyb_table_name);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.tablename, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.tablevalue, function (index, item) {
        _html_body += "<tr  class=\"linkTr\"  onclick=\"getSingleDm(" + "\'" + item[0] + "\'" + "," + "\'" + item[5] + "\'" + "," + "\'" + item[6] + "\'" + "," + "\'" + item[7] + "\'" + ")\">";
        $.each(item, function (index_inner, item_inner) {
            var _class = "";
            _class += " style='white-space: normal;text-align:center'";
            if (index_inner < item.length - 3) {
                _html_body += "<td " + _class + ">";
                _html_body += item_inner + "</td>";
            }
        });
        _html_body += "</tr>";
    });
    $("#panel_hddm .tjfx-table-data_para-sdlyb table thead").append(_html_th);
    $("#panel_hddm .tjfx-table-data_para-sdlyb table tbody").append(_html_body);
};

function tableHeader_sdlyb() {
    if ($("#tableid_sdlyb").length > 0) {} else {
        $("#panel_hddm_table").parent().prepend(
            '<table id="tableid_sdlyb" class="table" ><thead>' + $("#panel_hddm_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }

    $("#tableid_sdlyb").find('th').each(function (i) {
        $(this).css('width', $('#panel_hddm_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_sdlyb").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_hddm_table").css({
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
$(".report-hddm").resizable({
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
    setParSizeSdlyb($(event.target).attr("id"), ob.size.width, ob.size.height);
}

function setParSizeSdlyb(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
    if (reportId == "panel_hddm") {
        initTableDiv_sdlyb(reportId);

        create_sdlyb_table(reportId, width - 15, json);
        $("#panel_hddm .tjfx-table-data_para-sdlyb").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px"
        });
        $("#panel_hddm .tjfx-table-data_para-sdlyb").height(height - 45);
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
$(".report-hddm").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-hddm").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));

    // var aaa = $(event.target).parent();
});

function initTableDiv_sdlyb(reportId) {
    $("#" + reportId + " .tjfx-table-data_para-sdlyb").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-sdlyb").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-sdlyb").css({
        "height": "440px",
        "overflow-y": "scroll"
    });
};

//关闭按钮事件
// $("#panel_sjjg .icon-close").click(function () {
//     $(this).parent().parent().parent().hide();
//     //隐藏面板层级
//     tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
// });

/**
 * 水动力学临时存储断面计算信息
 * @param {*} csid 
 * @param {*} bsid 
 * @param {*} rvid 
 * @param {*} reacd 
 */
function getSingleDm(csid, bsid, rvid, reacd) {
    var objData = {
        csid: csid,
        bsid: bsid,
        reacd: reacd,
        rvid: rvid
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
        url: apiUrl_cloud + "api-hwhydroinfo/get_hydracalResSingleDmMinio",
        data: info,
        success: function (res) {
            tools.loadinghide(false);
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询水动力断面计算信息失败！");
                return;
            }
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-sdlyb .icon-close").click();
            } else {
                tools_panel_singleDm.panelShow(res.data);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}