//报表默认宽高
var default_width_report = 600;
var default_height_report = 300;
var json_data = null;

//最大化按钮事件
$(".report-ddgz .icon-max-ddgz").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_width_report).height(default_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_width_report / 2 + "px",
            "margin-top": "-" + default_height_report / 2 + "px"
        });

        //动态设置报表高度
        setRuleSize($(this).parent().parent().parent().attr("id"), default_width_report, default_height_report);
        $(this).attr("data-type", "");
        console.log("min/" + $(this).attr("data-type") + "/" + default_width_report + "/" + default_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setRuleSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-bb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));


});


//创建表格
function create_ruler_table(reportId, _width, json) {
 
    //先清空数据
    $("#panelddgz_dz .tjfx-table-data table colgroup col").remove();
    $("#panelddgz_dz .tjfx-table-data table thead tr").remove();
    $("#panelddgz_dz .tjfx-table-data table tbody tr").remove();


    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {

            var _class = "";

            _class += " style='white-space: normal;text-align:center'";
            _html_body += "<td " + _class + " >";
            if (item_inner == ".00") {
                item_inner = "0";
            }
            if (tools.islaststr(json.dataName[index_inner], "流量")) {
                item_inner = Math.round(item_inner, 0);
            }

            _html_body += item_inner;


            _html_body += "</td>";

        });
        _html_body += "</tr>";
    });


    $("#panelddgz_dz .tjfx-table-data table thead").append(_html_th);
    $("#panelddgz_dz .tjfx-table-data table tbody").append(_html_body);


};
function tableHeader() {
    $("#panelddgz_dz_table").parent().prepend(
        '<table id="tableid_" class="table" ><thead>' + $("#panelddgz_dz_table thead").html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })
    $("#tableid_").find('th').each(function (i) {
        $(this).css('width', $('#panelddgz_dz_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panelddgz_dz_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data').scroll(function () {
        if ($('.tjfx-table-data').scrollTop() > 0) {
            $("#tableid_").css('top', $('.tjfx-table-data').scrollTop());
        } else {
            $("#tableid_").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-bb").resizable({
    //aspectRatio: panel_default_width / panel_default_height,   //固定宽高比
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 300,
    minWidth: 650,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});
function reportBbResize(event, ob) {
    //动态设置报表高度
    setRuleSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setRuleSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);

    create_ruler_table(reportId, width - 15, json_data);
    $("#panelddgz_dz .tjfx-table-data").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panelddgz_dz .tjfx-table-data").height(height - 45);


}
//报表通用可拖拽事件
$(".report-bb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-bb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 调度方案分析比较
 */
function show_dd_rule(_stcd) {
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        startTime: searchStime,
        foreDays: Number(selectDays),
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        stcd: _stcd
        //userId: $("#_hid_userid").val()
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-rainsituation/real/getDisPatchRuleInfo",
        data: info,

        success: function (data) {
            var res = data;

            if (res.code != 200) {
                tools.show_message_error("查询调度规则信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            $("#panelddgz_dz").show();
            tools.showPanelIndex("panelddgz_dz");
            setRuleSize("panelddgz_dz", default_width_report, default_height_report);
            return;
        },
        error: function (errorMsg) {

            tools.show_message_error("查询调度规则信息失败");
        }

    });
}
function initTableDiv(reportId) {

    $("#" + reportId + " .tjfx-table-data").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data").append(_html);
    $("#" + reportId + " .tjfx-table-data").css({
        "height": "440px",
        "overflow-y": "scroll"
    });



};
