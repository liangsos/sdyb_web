//# sourceURL=jyfb_report.js
//报表默认宽高
var default_par_width_report = 1125;
var default_par_height_report = 440;
var json_data = null;
var jyfb_table_name = "降雨分布";

//最大化按钮事件
$(".report-jyfb .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeJyfb($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        $(this).attr("data-type", "");
        console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setParSizeJyfb($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-jyfb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});

//创建表格
function create_jyfb_table(reportId,json) {
 
    //先清空数据
    $("#panel_jyfb .tjfx-table-data_para-jyfb table colgroup col").remove();
    $("#panel_jyfb .tjfx-table-data_para-jyfb table thead tr").remove();
    $("#panel_jyfb .tjfx-table-data_para-jyfb table tbody tr").remove();

    $("#panel_jyfb .modal-title").html(jyfb_table_name);
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
            _html_body += item_inner;

        });
        _html_body += "</tr>";
    });
    $("#panel_jyfb .tjfx-table-data_para-jyfb table thead").append(_html_th);
    $("#panel_jyfb .tjfx-table-data_para-jyfb table tbody").append(_html_body);

    
};
function tableHeader_jyfb() {
    if ($("#tableid_jyfb").length > 0) {
    } else {
        $("#panel_jyfb_table").parent().prepend(
        '<table id="tableid_jyfb" class="table" ><thead>' + $("#panel_jyfb_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }
    
    $("#tableid_jyfb").find('th').each(function (i) {
        $(this).css('width', $('#panel_jyfb_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_jyfb").css({
        'position': 'absolute',
        'table-layout': 'auto',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_jyfb_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para-jyfb').scroll(function () {
        //alert($('.tjfx-table-data_para-jyfb').scrollTop());
        if ($('.tjfx-table-data_para-jyfb').scrollTop() > 0) {
            $("#tableid_jyfb").css('top', $('.tjfx-table-data_para-jyfb').scrollTop());
        } else {
            $("#tableid_jyfb").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-jyfb").resizable({
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
    setParSizeJyfb($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeJyfb(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);

    create_jyfb_table(reportId,json_data);
    $("#panel_jyfb .tjfx-table-data_para-jyfb").css({
        "width": "100%",
        //"padding-right": tools.scroll_default_width + "px",
        "margin-left": "195px"
    });
    $("#panel_jyfb .tjfx-table-data_para-jyfb").height(height - 45);
    $("#panel_jyfb .tjfx-table-data_para-jyfb").width(width - 212);
    tableHeader_jyfb();
}
//报表通用可拖拽事件
$(".report-jyfb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-jyfb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_jyfb_data( _stcd, searchStime, searchEtime) {

    tools.loadingshow("查询降雨分布信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);

    var objData = {
        stcd: _stcd,
        stime: searchStime,
        etime: searchEtime,
        userId: $("#_hid_userid").val()
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: "panelNew.aspx/get_StaRealPP_Info",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data.d;

            if (res == "" || res == null) {
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = JSON.parse(data.d);
            json_data = json;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
                $(".report-jyfb .icon-close").click();
            } else {
                tools.loadinghide(true);
                $("#panel_jyfb").show();
                tools.showPanelIndex("panel_jyfb");
                setParSizeJyfb("panel_jyfb", default_par_width_report, default_par_height_report);
                return;
            }
        },
        error: function (errorMsg) {

            tools.show_message_error("查询信息失败");
        }

    });
}
function initTableDiv(reportId) {

    $("#" + reportId + " .tjfx-table-data_para-jyfb").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: auto'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-jyfb").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-jyfb").css({
        "height": "440px",
        "overflow-y": "scroll",
        "overflow-x": "scroll"
    });
    //$("#" + reportId + " .tjfx-table-data_para-jyfb table tbody").css({
    //    "height" : "407px",
    //    "overflow-x" : "hidden",
    //    "overflow-y" : "scroll"
    //})


};
