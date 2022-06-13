//# sourceURL=yjInfo.js
//报表默认宽高
var default_live_width_report = 252;
var default_live_height_report = 486;


//关闭按钮事件
$("#panelYjInfo .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#show_panel_info").removeAttr("checked");

 

});
//创建表格
function creatYjtable(list_stcd, svgWnd) {

    $("#panelYjInfo").show();

    var selectModel = getModelMap() + "_data";

    setYjReportSize("panelYjInfo", default_live_width_report, default_live_height_report);

    //先清空数据
    $("#panelYj_table colgroup col").remove();
    $("#panelYj_table thead tr").remove();
    $("#panelYj_table tbody tr").remove();

    var _html_th = "";
    var _html_body = "";
   // _html_th = "<tr><th>工程</th><th>根据预报建议</th></tr>";
    if (list_stcd.length > 0) {
        for (var i = 0; i < list_stcd.length; i++) {
            var _stcd = list_stcd[i];


            var resdata = getDispatchSuggest_dataByStcd(_stcd);
            //等同处理
            var ishtml = true;
            if (_stcd == "99990021") {
                _stcd = "99990007";
                ishtml = false;
            }


            if (resdata != null) {
                var item = "建议";
                var stnm = svgWnd.getFlagById(_stcd).split("_")[0];
                var sttp = svgWnd.getFlagById(_stcd).split("_")[2];

                if (ishtml) {
                    var _class = "";

                    _class += " style='white-space: normal;text-align:center;vertical-align: middle !important;'";

                    _html_body += "<tr><td " + _class + " >" + stnm + "</td><td>" + resdata[item] + "</td></tr>";
                }


                if ((sttp == "XX") && (resdata[item] == "启用")) {
                    //改变行蓄洪区的颜色
                    svgWnd.setDispatchSuggest_XX_StateYellow("id_" + _stcd);
                }
            }

        }
    }
    else {
        if (tool_dispatch.dispatchSuggest_model != "") {
            var _data = null;
            _data = tool_dispatch.dispatchSuggest_data.data[selectModel];
            // if (tool_dispatch.dispatchSuggest_model == "API6") {
            //     _data = tool_dispatch.dispatchSuggest_data.data.API6_data;
            // }
            // else if (tool_dispatch.dispatchSuggest_model == "API2") {
            //     _data = tool_dispatch.dispatchSuggest_data.data.API2_data;
            // }
            // else if (tool_dispatch.dispatchSuggest_model == "XAJ2") {
            //     _data = tool_dispatch.dispatchSuggest_data.data.XAJ2_data;
            // }
            // else if (tool_dispatch.dispatchSuggest_model == "MGE2") {
            //     _data = tool_dispatch.dispatchSuggest_data.data.MGE2_data;
            // }
            if (_data != null) {
                for (var item in _data) {
                    var jy = "建议";
                    var obj_scd = svgWnd.getFlagById(item);
                    if (obj_scd != null) {
                        var stnm = obj_scd.split("_")[0];
                        var sttp = obj_scd.split("_")[2];

                        var _class = "";

                        _class += " style='white-space: normal;text-align:center;vertical-align: middle !important;'";

                        _html_body += "<tr><td " + _class + " >" + stnm + "</td><td>" + _data[item][jy] + "</td></tr>";



                        if ((sttp == "XX") && (_data[item][jy] == "启用")) {
                            //改变行蓄洪区的颜色
                            svgWnd.setDispatchSuggest_XX_StateYellow("id_" + item);
                        }
                    }
                }
            }

        }



    }
 


    $("#ppanelYj_table thead").append(_html_th);
    $("#panelYj_table tbody").append(_html_body);

    $('#panelYjInfo').udraggable();
    $("#panelYjInfo").css({
        "top": "90px",
        "left": "calc(100% - 280px)"
    });

    tools.showPanelIndex("panelYjInfo");
};
function setYjReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
   /* $("#" + reportId).css({
        "top": "90px",
        "left": "110%",
        "border": "solid 1px #999999"
    });*/
}
//面板添加点击事件 保证操作面板在最上层
$(".report-yjInfo").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});