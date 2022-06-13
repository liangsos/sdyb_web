//# sourceURL=summaryInfo.js
//默认宽高
var default_width_summary = 540;
var default_height_summary = 95;

//报表通用改变大小事件
$(".report-summary").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 500,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});
function reportBbResize(event, ob) {
    //动态设置报表高度
    setSummarySize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setSummarySize(reportId, width, height, json) {
    $("#" + reportId).width(width).height(height);
    $("#" + reportId).css({
        "top": "113%",
        "left": "28%",
        "border": "solid 1px #999999"
    });
}
//报表通用可拖拽事件
$(".report-summary").draggable({
    handle: '.report-summary',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-summary").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取降水预报信息
 */
function getSummary() {

    $("#panelSummary").show();
    tools.showPanelIndex("panelSummary");
    setSummarySize("panelSummary", default_width_summary, default_height_summary);
   
}
