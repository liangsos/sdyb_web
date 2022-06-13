//# sourceURL=liveInfo.js
//报表默认宽高
var default_live_width_report = 453;
var default_live_height_report = 327;
var json_data = null;
var daysNum_ = null;
var modifyValueRain_hh = false;

//关闭按钮事件
$(".report-skxx .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});

//创建表格
function create_liveInfo_table(reportId, _width, json) {

    //先清空数据
    //$("#panelSkxx .tjfx-table-data_skxx table colgroup col").remove();
    //$("#panelSkxx .tjfx-table-data_skxx table thead tr").remove();
    //$("#panelSkxx .tjfx-table-data_skxx table tbody tr").remove();

    $("#panelSkxx  table colgroup col").remove();
    $("#panelSkxx  table thead tr").remove();
    $("#panelSkxx  table tbody tr").remove();


    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {

            var _class = "";

            _class += " style='white-space: normal;text-align:center;vertical-align: middle !important;'";

            _html_body += "<td " + _class + " >";
            _html_body += item_inner + "</td>";

            //if (index_inner > 0) {
            //    _html_body += "<td>";
            //    if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器不支持onchange事件
            //        _html_body += "<input onblur='modifyValueRainTable(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
            //    } else {
            //        _html_body += "<input onchange='modifyValueRainTable(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
            //    }
            //} else {
            //    _html_body += "<td " + _class + " >";
            //    _html_body += item_inner;
            //}
        });
        _html_body += "</tr>";
    });


    $("#panelSkxx table thead").append(_html_th);
    $("#panelSkxx table tbody").append(_html_body);


};


//报表通用改变大小事件
//$(".report-skxx").resizable({
//    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
//    ghost: true,     //拖动时 半透明
//    helper: true,
//    maxHeight: null,
//    maxWidth: null,
//    minHeight: 300,
//    minWidth: 500,
//    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
//    resize: null,
//    start: null,
//    stop: reportBbResize
//});
function reportBbResize(event, ob) {
    //动态设置报表高度
    setLiveReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setLiveReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
    $("#" + reportId).css({
        "top": "34%",
        "left": "100%",
        "border": "solid 1px #999999"
        //"margin-left": "-265px",
        //"margin-top": "-200px"
    });
    //initTableDivLiveInfo(reportId);
    //$(".report-skxx .icon-max-skxx").attr("data-type", "");
    

    create_liveInfo_table(reportId, width - 15, json_data);
    //$("#panelSkxx").css({
    //    "width": "100%",
    //    "padding-right": tools.scroll_default_width + "px"
    //});
    //$("#panelSkxx").height(height - 45 - 38);


}
//报表通用可拖拽事件
//$(".report-skxx").draggable({
//    handle: '.panel-header',
//    cursor: "move",
//    opacity: 0.7
//});
//面板添加点击事件 保证操作面板在最上层
$(".report-skxx").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取降水预报信息
 */
function get_liveInfo(searchRange, searchEtime) {

    var objData = {
        bsid: searchRange,
        ptime: searchEtime
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: "panelNew.aspx/getRainForecast",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data.d;

            if (res == "" || res == null) {
                tools.show_message_error("查询降水预报信息失败！");
                return;
            }

            var json = JSON.parse(data.d);
            json_data = json;
            daysNum_ = json.daysNum;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
                $(".report-skxx .icon-close").click();
            } else {
                if (json.daysNum == 0) {
                    tools.show_message_error(json.msg);
                    $(".report-skxx .icon-close").click();
                } else {
                    $("#panelSkxx").show();
                    tools.showPanelIndex("panelSkxx");
                    setLiveReportSize("panelSkxx", default_live_width_report, default_live_height_report);

                    $('#panelSkxx').udraggable();
                    return;
                }
            }
        },
        error: function (errorMsg) {

            tools.show_message_error("查询降水预报信息失败");
        }

    });
}
function initTableDivLiveInfo(reportId) {

    $("#" + reportId).empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId ).append(_html);
    $("#" + reportId ).css({
        "height": "440px",
        "overflow-y": "scroll"
    });

};
