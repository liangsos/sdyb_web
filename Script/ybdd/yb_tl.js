//# sourceURL=yjInfo.js
//报表默认宽高
var default_live_width_report = 252;
var default_live_height_report = 486;



$("#panel_tl .icon-close-new").click(function () {
    $(this).parent().parent().parent().parent().hide();
    $('#bar_tl').click();
});
 
$("#panel_tl").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
function yb_tl_PanelShow() {
    $("#panel_tl").show();
    tools.showPanelIndex("panel_sjsz");

    return;
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;

    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.setZoomState();
}
function yb_tl_PanelHide() {
    $("#panel_tl").hide();
    return;
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;

    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.setZoomState();
}
//面板添加点击事件 保证操作面板在最上层
$("#panel_tl").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});
