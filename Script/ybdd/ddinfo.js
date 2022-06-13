//# sourceURL=ddInfo.js
//报表默认宽高
var default_dd_width_report = 400;
var default_dd_height_report = 155;



//关闭按钮事件
$("#panelDdInfo .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#show_panel_info").removeAttr("checked");
});
//创建表格
function creatDdtable(list_stcd, json) {

    $("#panelDdInfo").show();

    setDdReportSize("panelDdInfo", default_dd_width_report, default_dd_height_report);

    //先清空数据
    $("#panelDdInfo  table colgroup col").remove();
    $("#panelDdInfo  table thead tr").remove();
    $("#panelDdInfo  table tbody tr").remove();

    var _html_th = "";
    var _html_body = "";
    _html_th = "<tr><th style='width:100px;'>站名</th><th style='width:100px;' >预报水位</th><th style='width:100px;'>调度后水位</th><th>降低值</th></tr>";
    $.each(json.Tablevalue, function (index, item) {
        _html_body += "<tr><td   ><a  href='#' onclick='ddinfo_click(this)'>" + item[0] + "</a></td><td >" + item[1] + "</td><td>" + item[2] + "</td><td style='font-size: 18px;'>" + item[3] + "</td> </tr>"

    })

  /*  _html_body += "<tr><td   >王家坝</td><td >" + json.Tablevalue[0][1] + "</td><td>" + json.Tablevalue[0][2] + "</td><td style='font-size: 18px;'>" + json.Tablevalue[0][3] + "</td> </tr>"
    _html_body += "<tr><td  >润河集</td><td  >" + json.Tablevalue[1][1] + "</td><td>" + json.Tablevalue[1][2] + "</td><td style='font-size: 18px;'>" + json.Tablevalue[1][3] + "</td> </tr>"
    _html_body += "<tr><td  >正阳关</td><td  >" + json.Tablevalue[2][1] + "</td><td>" + json.Tablevalue[2][2] + "</td><td style='font-size: 18px;'>" + json.Tablevalue[2][3] + "</td> </tr>"
  
  */   


    $("#panelDdInfo table thead").append(_html_th);
    $("#panelDdInfo table tbody").append(_html_body);

    $('#panelDdInfo').udraggable();

    $("#panelDdInfo").css({
        "top": "90px",
        "left": "calc(100% - 410px)"
    });
    tools.showPanelIndex("panelDdInfo");
};
function ddinfo_click(obj) {
    var res = tools.getFlagBystnm($(obj).html(), "5");
    show_info(res);

}
function setDdReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
   /* $("#" + reportId).css({
        "top": "90px",
        "left": "110%",
        "border": "solid 1px #999999"
    });*/
}
//面板添加点击事件 保证操作面板在最上层
$(".report-ddInfo").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});