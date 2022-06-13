//# sourceURL=ybinfo.js
//报表默认宽高
var default_yb_width_report = 604;
var default_yb_height_report = 524;

var fbs_data =null;
//关闭按钮事件
$("#panelYbInfo .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#show_panel_info").removeAttr("checked");
});

//创建表格
function creatYbtable(list_stcd, json, ispos) {
    // return;
    // $("#panelYbInfo").show();

    setYbReportSize("panelYbInfo", default_yb_width_report, default_yb_height_report);

    //先清空数据
    $("#panelYbInfo  table colgroup col").remove();
    $("#panelYbInfo  table thead tr").remove();
    $("#panelYbInfo  table tbody tr").remove();

    var _html_th = "";
    var _html_body = "";
    var borderStyle = "black 1px solid ";
    _html_th = "<tr><th style='width:100px;'>站名</th><th style='width:130px;' >模型名称</th><th style='width:100px;'>最高水位</th><th>最大流量</th><th style='width:180px;'>峰现时间</th></tr>";
    var _rowspan = 4;
    fbs_data = new Array();


    // var objData = {
    //     STCD: "50101100,50102350,50103000",
    //     STARTTM: moment(searchStime).format("YYYY-MM-DD HH:mm"),
    //     ENDTM: moment(searchEtime).format("YYYY-MM-DD HH:mm")

    // };
    // if ($("#show_autoFore").is(':checked')) {
    //     objData.STARTTM = moment(fbs_stm_auto).format("YYYY-MM-DD HH:mm");
    //     objData.ENDTM = moment(fbs_etm_auto).format("YYYY-MM-DD HH:mm");

    //     $("#panelYbInfo").find(".modal-title").html("自动预报信息(" + objData.STARTTM + " -- " + objData.ENDTM + ")").css({ "margin-left": "120px" });
    // }
    // else
    //     $("#panelYbInfo").find(".modal-title").html("预报信息").css({ "margin-left": "calc(50% - 15px" });

    // var info = JSON.stringify(objData);
    // $.ajax({
    //     type: 'post',
    //     contentType: "application/json; charset=utf-8",
    //     dataType: 'json',
    //     async: false,
    //     url: apiUrl_bky + "waterCondition/GetZWaterChartDataNewByHuaiHe",
    //     data: info,
    //     headers: {
    //         "Authorization": "TokeneyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodWFpaGUyMDIxaHVhaWhlQDIwMjEifQ.b_X7BsIlmtiv5NAYXiwMdjfqpCJB8tFDgMivE5PwGkc"

    //     },
    //     success: function (res) {

    //         var data = $.parseJSON(res);
    //         fbs_data.push(data["50101100"]);
    //         fbs_data.push(data["50102350"]);
    //         fbs_data.push(data["50103000"]);
    //         _rowspan = 5;

    //     },
    //     error: function (errorMsg) {
    //         tools.show_message_error_const("获取失败!");

    //     }
    // });


    $.each(json.tabledata, function (index, item) {
        _html_body += "<tr style='border:0px'><td  rowspan='" + item.length + "' style='background-color:#fff !important;border-top: " + borderStyle + ";border-bottom: " + borderStyle + "; border-left: " + borderStyle + ";'><a  href='#' onclick='ybinfo_click(this)'>" + item[0] + "</a></td>";
            $.each(item, function (i, data) {
                if (i != 0) {
                     if (data.length != 0) {
                         _html_body += "<td style='border-top: " + borderStyle + ";'>" + data[0] + "</td><td style='border-top: " + borderStyle + ";'>" + data[1] +
                             "</td><td style='border-top: " + borderStyle + ";'>" + data[2] + "</td><td style='border-top: " + borderStyle + ";border-right: " + borderStyle + ";'>" +
                             moment(data[3]).format("YYYY-MM-DD HH") + "</td></tr>"
                     } else {
                         _html_body += "<td style='border-top: " + borderStyle + ";'>" + "&nbsp;" + "</td><td style='border-top: " + borderStyle + ";'>" + "" + "</td><td style='border-top: " + borderStyle + ";'>" +
                             "" + "</td><td style='border-top: " + borderStyle + ";border-right: " + borderStyle + ";'>" + "" + "</td></tr>"
                     }
                 }
                 
             })
    })


    $("#panelYbInfo table thead").append(_html_th);
    $("#panelYbInfo table tbody").append(_html_body);

    $('#panelYbInfo').udraggable();
    if (ispos != -1) {
        $("#panelYbInfo").css({
            "top": "90px",
            "left": "calc(100% - 630px)"
        });
    }


    //默认选择为1，到时候根据实际选择的模型来算
    // setCurActive(1);
    if ($("#show_autoFore").is(':checked')) {
        ybinfo_click("王家坝_50101100_ZQ_(true_true_true)", 1);
    }

};
function setYbReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
    /* $("#" + reportId).css({
         "top": "90px",
         "left": "110%",
         "border": "solid 1px #999999"
     });*/
}
//面板添加点击事件 保证操作面板在最上层
$(".report-ybInfo").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});
function setCurActive(index) {
    return;
    $("#panelYbInfo table tbody tr").removeClass("info_red");
    $("#panelYbInfo table tbody").children().eq(index).addClass("info_red");
  //  $("#panelYbInfo table tbody").children().eq(index + $("#panelYbInfo table tbody").children().length/3).addClass("info_red");
 //   $("#panelYbInfo table tbody").children().eq(index + $("#panelYbInfo table tbody").children().length / 3*2).addClass("info_red");
    tools.showPanelIndex("panelYbInfo");
}
function ybinfo_click(obj,isflag) {
    var res =isflag==1? obj:tools.getFlagBystnm($(obj).html(), "5");
    show_info(res);

 
}