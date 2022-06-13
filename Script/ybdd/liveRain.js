//# sourceURL=liveRain.js
//实况降水面板
//报表默认宽高
var default_liveRain_width_report = 1100;
var default_liveRain_height_report = 735;
var json_data = null;
var daysNum_ = null;
var modifyValueRain_hh = false;
var isSearch = false;
var cur_mode = -1;

//关闭按钮事件
$("#panel_liveRain .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});

//创建表格
function create_liveRainReport_table(reportId, _width, json) {

    //先清空数据
    $("#contProLine-liveRain .ybsq-table-header table colgroup col").remove();
    $("#contProLine-liveRain .ybsq-table-header table thead tr").remove();
    $("#contProLine-liveRain .tableLiveRain colgroup col").remove();
    $("#contProLine-liveRain .tableLiveRain tbody tr").remove();


    var _html_col = "";
    var _html_th = "";

    _html_col += "<col style='width: 50%;' />";
    _html_col += "<col style='width: 50%;' />";
    _html_th = "<tr><th>流域分区</th><th>降水量</th></tr>";

    $("#contProLine-liveRain  .ybsq-table-header table colgroup").append(_html_col);
    $("#contProLine-liveRain  .tableLiveRain colgroup").append(_html_col);
    $("#contProLine-liveRain  .ybsq-table-header table thead").append(_html_th);

    //解析数据
    var _html_body = "";
    var rainNameArr = json_data.basin;
    var rainDataArr = json_data.rain;

    for (var i = 0; i < rainNameArr.length ; i++) {
        _html_body += "<tr><td>" + rainNameArr[i] + "</td><td>" + rainDataArr[i] + "</td></tr>";
    }


    $("#contProLine-liveRain  .tableLiveRain tbody").append(_html_body);


};

//报表通用改变大小事件
$(".report-liveRain").resizable({
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
    setLiveRainReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setLiveRainReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).width(width).height(height);
    $("#" + reportId).css({
        "top": "40%",
        "left": "45%"
    });
    create_liveRainReport_table(reportId, width - 15, json_data);
    $("#panel_liveRain .tjfx-table-data_skxx").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_liveRain .tjfx-table-data_skxx").height(height - 45 - 38);


}
//报表通用可拖拽事件
$(".report-liveRain").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-liveRain").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});


 
/**
 * 获取降水预报信息
 */
function get_liveRianInfo(searchStime, searchEtime, mode, factor) {
    if (factor == undefined)
        factor = 0;

     var objData = {
        endTime: searchEtime,
        plusType: _plusType,
        rainPlus: _rainPlus,
        factor:factor,
        hisStormId: _hisStormId,
        startTime: searchStime
    }

    cur_mode = mode;
    if (mode == 1)
    {
        
        $(".selectModel").hide();
        
    }
    else { 
        $(".selectModel").show();
    }
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_fzg+"getRtRain",
        data: info,
        success: function (data) {
            if (data == "" || data == null) {
                tools.show_message_error("查询实况降水分布信息失败！");
                return;
            }

            //var json = JSON.parse(res);
            json_data = data;

            if (data.msg != "OK") {
                tools.show_message_error(data.msg);
                $(".report-liveRain .icon-close").click();
            } else {
                $("#panel_liveRain").show();
                if (!isSearch) {
                    initDate();
                }
                tools.showPanelIndex("panel_liveRain");
                setLiveRainReportSize("panel_liveRain", default_liveRain_width_report, default_liveRain_height_report);
                var x = 200;
                var y = 0;
                //添加图片
                $("#liveRainImg").attr('src',  data.image + "?" + Math.random() * (x - y + 1) + y);
                isSearch = false;
                return;
            }
        },
        error: function (errorMsg) {

            tools.show_message_error("查询降水预报信息失败");
        }

    });
}

//确定按钮点击事件
$("#liveRainBtn").click(function () {
    var liveRainStime = $("#beginTime_liveRain").val();
    var liveRainEtime = $("#endTime_liveRain").val();
    var addData_liveRain = Number($("#addData_liveRain").val());
    isSearch = true;
    get_liveRianInfo(liveRainStime, liveRainEtime, 1, addData_liveRain);
})

function initDate() {
    var btime = $("#beginTime").val() + ":00";
    var etime = $("#endTime").val() + ":00";

     
    tools.init_datarangepicker("#query_liveRain .form-date", "YYYY-MM-DD HH:mm");
    $('#query_liveRain #beginTime_liveRain').data('daterangepicker').setStartDate(btime);
    $('#query_liveRain #beginTime_liveRain').data('daterangepicker').setEndDate(btime);
    $('#query_liveRain #endTime_liveRain').data('daterangepicker').setStartDate(etime);
    $('#query_liveRain #endTime_liveRain').data('daterangepicker').setEndDate(etime);
}
