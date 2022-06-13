//# sourceURL=parameter_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;
var json_data = null;
var modifyValue_par = false;
var table_name = null;

//最大化按钮事件
$(".report-csxx .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSize($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
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
        setParSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-csxx .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});

//修改按钮事件
$("#btnModify_para").click(function () {
    $("#panel_parameter_table td input").removeAttr("readonly");
});

//确认按钮事件
$("#btnSureMod_para").click(function () {
    if (!modifyValue_par) {
        tools.show_message_error("请进行修改后再确认保存！");
        return;
    };

    var dataName_ = new Array();
    var data_ = new Array();
    $("#panel_parameter_table thead tr").each(function (i) {
        $(this).children('th').each(function (j) {
            dataName_.push($(this).text());
        })
    });
    $("#panel_parameter_table tbody tr").each(function (i) {
        var dataTd = new Array();
        $(this).children('td').each(function (j) {
            if ($(this).text() == "" || $(this).text() == null) {
                dataTd.push($(this).children().val());
            } else {
                dataTd.push($(this).text());
            }
        })
        data_.push(dataTd);
    });

    var objData = {
        TableName : table_name,
        Data: data_,
        DataName: dataName_
    };
    var info = JSON.stringify(objData);
    console.log(info);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: "panelNew.aspx/get_XXHQ_Infoupdate",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data.d;

            if (res == "" || res == null) {
                tools.show_message_error("保存信息失败！");
                return;
            }

            var json = JSON.parse(data.d);
            if (json.code == "0") {
                tools.show_message_error(json.msg);
                $(".report-csxx .icon-close").click();
            } else {
                tools.show_message_success(json.msg);
                modifyValue_par = false;
            }
        },
        error: function (errorMsg) {

            tools.show_message_error("查询信息失败");
        }

    });
});

//数值修改事件
function modifyValue(obj) {
    var value = obj.value;
    if (value == "" || value == null) {
        $(obj).val(0);
    }
    modifyValue_par = true;
}

//输入数值控制
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");    
    obj.value = obj.value.replace(/\.{2,}/g, ".");  
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两位小数  
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//不能以0开头
        obj.value = parseFloat(obj.value);
    }
}

//创建表格
function create_parameter_table(reportId, _width, json) {
 
    //先清空数据
    $("#panel_parameter .tjfx-table-data_para table colgroup col").remove();
    $("#panel_parameter .tjfx-table-data_para table thead tr").remove();
    $("#panel_parameter .tjfx-table-data_para table tbody tr").remove();

    $("#panel_parameter .modal-title").html(json.TableName);
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.DataName, function (index, item) {
        _html_th += "<th>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.Data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {

            var _class = "";

            _class += " style='white-space: normal;text-align:center'";
            if (index_inner == 4 || index_inner == 5 || index_inner == 6) {
                _html_body += "<td>";
                if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器不支持onchange事件
                    _html_body += "<input onblur='modifyValue(this)' type='text' onkeyup='clearNoNum(this)'" + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
                } else {
                    _html_body += "<input onchange='modifyValue(this)' type='text' onkeyup='clearNoNum(this)' " + " value='" + item_inner + "' style='border:0px;line-height:normal' readonly/></td>";
                }
            } else {
                _html_body += "<td " + _class + " >";
                _html_body += item_inner;
            }
        });
        _html_body += "</tr>";
    });


    $("#panel_parameter .tjfx-table-data_para table thead").append(_html_th);
    $("#panel_parameter .tjfx-table-data_para table tbody").append(_html_body);


};
function tableHeader() {
    $("#panel_parameter_table").parent().prepend(
        '<table id="tableid_" class="table" ><thead>' + $("#panel_parameter_table thead").html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })
    $("#tableid_").find('th').each(function (i) {
        $(this).css('width', $('#panel_parameter_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_parameter_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para').scroll(function () {
        if ($('.tjfx-table-data_para').scrollTop() > 0) {
            $("#tableid_").css('top', $('.tjfx-table-data_para').scrollTop());
        } else {
            $("#tableid_").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-csxx").resizable({
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
    setParSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);

    create_parameter_table(reportId, width - 15, json_data);
    $("#panel_parameter .tjfx-table-data_para").css({
        "width": "100%",
        "padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_parameter .tjfx-table-data_para").height(height - 45);


}
//报表通用可拖拽事件
$(".report-csxx").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-csxx").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_parameter_data(searchRange, searchStime, searchEtime, searchPlan, selectDays, userId) {

    var objData = {
        range: searchRange,
        stime: searchStime,
        etime: searchEtime,
        userId: userId,
        day: selectDays,
        plan: searchPlan
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: "panelNew.aspx/get_XXHQ_Infoout",
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
                $(".report-csxx .icon-close").click();
            } else {
                table_name = json.TableName;
                $("#panel_parameter").show();
                tools.showPanelIndex("panel_parameter");
                setParSize("panel_parameter", default_par_width_report, default_par_height_report);
                return;
            }
        },
        error: function (errorMsg) {

            tools.show_message_error("查询信息失败");
        }

    });
}
function initTableDiv(reportId) {

    $("#" + reportId + " .tjfx-table-data_para").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para").append(_html);
    $("#" + reportId + " .tjfx-table-data_para").css({
        "height": "440px",
        "overflow-y": "scroll"
    });



};
