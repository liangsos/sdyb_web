var default_pdf_width_report = 800;
var default_pdf_height_report = 600;
/**
 * 显示PDF
 */
function showPdfContent(fileUrl) {
    document.getElementsByName("frame_pdf")[0].contentWindow.reloadPdf(fileUrl);
    $("#panel_showPdf").show();
}
/**
 * 隐藏PDF
 */
function hidePdf() {
    $("#panel_showPdf").hide();
}
/**
 * 拖拽PDF
 */
$("#panel_showPdf").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//关闭按钮事件
$("#panel_showPdf .icon-close").click(function () {
    $("#panel_showPdf").hide();
});
//最大化按钮事件
$("#panel_showPdf .icon-max").click(function () {

    debugger;
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_pdf_width_report).height(default_pdf_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_pdf_width_report / 2 + "px",
            "margin-top": "-" + default_pdf_height_report / 2 + "px"
        });


        $(this).attr("data-type", "");

    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });


        $(this).attr("data-type", "max");


    }
});