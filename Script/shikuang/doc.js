//文件路径
var fileUrl = "";// getQueryString('fileUrl');

//水情会商、水情文档
$(document).ready(function () {
});
/**
   * 初始化
   **/
window.onload = function () {

}
/**
 * 显示pdf文件
 * @param {文件路径} fileUrl 
 */
function showPdf(fileUrl) {
    $("#framePdf").attr("src", "Jquery/pdf/web/viewer.html?ts=" + new Date() + "&file=" + encodeURIComponent(fileUrl));
    //使用load事件 判断iframe是否加载成功 add by hzx 2020-05-25
    $("#framePdf").load(function () {
        try {
            var iframeTitle = $("#framePdf")[0].contentWindow.document.title;
            if (iframeTitle == null || iframeTitle == undefined || iframeTitle == "" || iframeTitle.indexOf("PDF") <= -1) {
                //再一次刷新iframe
                $("#framePdf").attr("src", "Jquery/pdf/web/viewer.html?ts=" + new Date() + "&file=" + encodeURIComponent(fileUrl));
            }
        } catch (e) {
            $("#framePdf").attr("src", "Jquery/pdf/web/viewer.html?ts=" + new Date() + "&file=" + encodeURIComponent(fileUrl));
            console.log("加载iframe失败。" + e);
        }
    });
}



//屏幕大小改变事件 自适应
$(window).resize(function () {
    resize();
});
resize();

//屏幕大小改变事件 自适应
function resize() {
    $('.left,.nav_left').height($(window).height());
    $('.right').height($(window).height());
    $('.doclist').height($(window).height() - 200);
}

//获取参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//重新加载文件
function reloadPdf(tempFileUrl) {
    fileUrl = tempFileUrl;
    showPdf(fileUrl);
}