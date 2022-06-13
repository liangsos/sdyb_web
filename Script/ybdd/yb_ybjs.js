//# sourceURL=yjInfo.js
//报表默认宽高
var default_live_width_report = 252;
var default_live_height_report = 486;



$("#panel_ybjs .icon-close-new,#panel_ybjs .btn_cancel").click(function () {
    $(this).parent().parent().parent().parent().hide();
});
$("#panel_ybjs .btn_ok").click(function () {
    $(this).parent().parent().parent().parent().hide();
});
$("#panel_ybjs").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});