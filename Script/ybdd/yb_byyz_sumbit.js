var default_ybyz_sumbit_width_report = 300;
var default_ybyz_sumbit_height_report = 180;
$(document).ready(function () {
    tools.init_datarangepicker("#panelSaveByyz .form-date", "YYYY-MM-DD HH:mm");
    $(".show_byyz_position").hide();
    //判断产汇流信息是否展示
    let display =$('#show_dychxx').css('display')
    if(display === "none"){
        $(".show_byyz_position").parent().hide();
    }else{
        $('#show_dychxx').css('margin-left','0px')
    }

    $("#show_byyz_position").click(function () {
        if ($("#show_byyz_position").is(':checked')) {
            yb_ybyz_sumbit_PanelShow();
        }
        else {
            yb_ybyz_sumbit_PanelHide();

        }

    });
});
$("#panelSaveByyz .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    $("#show_byyz_position").prop("checked", false);

});

$("#panelSaveByyz").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

function yb_ybyz_sumbit_PanelShow() {
    $('#panelSaveByyz #byyz_sumbit_time').data('daterangepicker').setStartDate(moment($('#endTime').val()).format("YYYY-MM-DD HH"));
    $('#panelSaveByyz #byyz_sumbit_time').data('daterangepicker').setEndDate(moment($('#endTime').val()).format("YYYY-MM-DD HH"));
    var _select_value = 4;
    if (searchRange != "14")
        _select_value = Number(searchRange);

    $("#byyz_sumbit_ly").val(_select_value);
    $("#byyz_sumbit_name").val($("#byyz_sumbit_ly option:selected").text()+"_"+$("#ybyz_rainname option:selected").text())


    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    var res_byyz_select_stcd_info = svgWnd.get_byyz_select_stcd_info();
    if (res_byyz_select_stcd_info != null) {
        $("#byyz_sumbit_stcd").val(res_byyz_select_stcd_info.stnm);
        $("#byyz_sumbit_stcd").attr("_data", res_byyz_select_stcd_info.stcd.split("_")[1]);

    }
    else {
        $("#byyz_sumbit_stcd").val("");
        $("#byyz_sumbit_stcd").attr("_data", "");
    }


    $("#panelSaveByyz").show();
    $("#panelSaveByyz").css({
        "left": "calc(50% - " + (default_ybyz_sumbit_width_report / 2) + "px)",
        "top": "calc(50% - " + (default_ybyz_sumbit_height_report / 2) + "px)",
        "margin-left": "0px",
        "margin-top": "0px"
    });
    return;

}

function yb_ybyz_sumbit_PanelHide() {

    $("#panelSaveByyz").hide();
    return;
}
//面板添加点击事件 保证操作面板在最上层
$("#panelSaveByyz").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

$("#byyz_sumbit_ok").click(function (event) {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    var res = svgWnd.getRectInfo();
    var name = $("#byyz_sumbit_name").val();
    sendByyzInfo(name, moment($("#byyz_sumbit_time").val()).format("YYYY-MM-DD 08:00"), res)
    $("#show_byyz_position").prop("checked", false);
    $("#show_byyz").prop("checked", false);

});
function sendByyzInfo( name, ntm, res) {

    var objData = {
        endTime: byyz_etime  ,
        startTime: byyz_stime  ,
        percent: 0,
        rainLevel: byyz_raintype,
        cnBottom: china_select_bottom,
        cnLeft: china_select_left,
        cnRight: china_select_right,
        cnTop: china_select_top,
        name: name,
        newTime: ntm + ":00",
        sdLeft: res.left,
        sdTop: res.top,
        sdRight: res.right,
        sdBottom: res.bottom,
        basin: $("#byyz_sumbit_ly").val(),
        targetCode: $("#byyz_sumbit_stcd").attr("_data")
    };
    var info = JSON.stringify(objData);
    tools.loadingshow("暴雨移植计算中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $("#panelSaveByyz").hide();
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    svgWnd.hideDrawRect();
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/transplant",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            tools.loadinghide(false);

            var json = data;
            if (json.code != 200) {

                tools.show_message_error(json.message);
            } else {
               tools.show_message_success(json.message);

            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");
            return;
        }
    });
}

