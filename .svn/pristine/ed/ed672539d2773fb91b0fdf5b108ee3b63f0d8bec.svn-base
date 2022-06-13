//# sourceURL=yb_byyz_list.js
//报表默认宽高
var default_byyzList_width_report = 1100;
var default_byyzList_height_report = 440;

var json_byyzList_data = null;

$(document).ready(function () {
    $(document).bind("contextmenu", function (e) {
        return false;
    });

    $("#show_byyzList").prop("checked", false);
    $(".show_byyzList").hide();
    $(".show_byyzList").parent().hide();
    $("#show_byyzList").click(function () {
        if ($("#show_byyzList").is(':checked')) {
            hideRainImageInfo();
            yb_byyzList_show();

            $("#show_byyz").prop("checked", false);
            yb_ybyz_PanelHide();
            var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            if (svgDocument == null)
                return;
            var svgWnd = svgDocument.svgWnd;
            if (svgWnd == null)
                return;
            svgWnd.hideDrawRect();

            $(".show_byyz_position").hide();
            $(".show_byyz_position").parent().hide();
        }
        else {
            yb_byyzList_hide();
            var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            if (svgDocument == null)
                return;
            var svgWnd = svgDocument.svgWnd;
            if (svgWnd == null)
                return;
            svgWnd.hideByyzSomeRain();


        }

    });

});

//关闭按钮事件
$(".report-byyzList .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#show_byyzList").removeAttr("checked");

});

$("#panel_byyzList").find(".panel-header").myDrag({
    cursor: "move",
    opacity: 0.7,
    dragEnd: function (x, y) {
        var marTop = Number($("#panel_byyzList").css("margin-top").replace('px', ''));
        if ((y + marTop) < 0) {
            $("#panel_byyzList").css("top", -marTop);
        }
    }
});
//创建表格
function create_byyzList_table(json) {
    //debugger;
    //先清空数据
    $("#panel_byyzList .tjfx-table-data_para-byyzList table colgroup col").remove();
    $("#panel_byyzList .tjfx-table-data_para-byyzList table thead tr").remove();
    $("#panel_byyzList .tjfx-table-data_para-byyzList table tbody tr").remove();

    var _html_th = "<tr>";
    _html_th += "<th>名称</th>";
    _html_th += "<th>开始时间</th>";
    _html_th += "<th>结束时间</th>";
    _html_th += "<th>区域范围</th>";
    _html_th += "<th style='width: 60px;'>雨量调节</th>";
    _html_th += "<th style='width: 60px;'>雨量量级 </th>";
    _html_th += "<th>移植区域</th>";
    _html_th += "<th>移植开始时间</th>";
    _html_th += "<th>移植结束时间</th>";


    var _html_body = "";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        _html_body += "<td onmouseover='name_mouseover(this)' onmouseout='name_mouseout(this)'><a class='byyz_code ' style='cursor:pointer'  onclick='getSomeRain(this)' _data = '" + item.id + "' >" + item.name + "</a></td>";

        _html_body += "<td>" + moment(item.cbt).format("YYYY-MM-DD HH:mm") + "</td>";
        _html_body += "<td>" + moment(item.cet).format("YYYY-MM-DD HH:mm") + "</td>";
        _html_body += "<td style='white-space: normal;'>" + item.cleft + "~" + item.cright + "E " + item.cbottom + "~" + item.ctop + "N " + "</td>";
        _html_body += "<td>" + item.percent + "</td>";
        _html_body += "<td>" + item.rlevel + "</td>";
        _html_body += "<td  style='white-space: normal;'>" + item.sleft + "~" + item.sright + "E " + item.sbottom + "~" + item.stop + "N " + "</td>";
        _html_body += "<td>" + moment(item.sbt).format("YYYY-MM-DD HH:mm") + "</td>";
        _html_body += "<td>" + moment(item.set).format("YYYY-MM-DD HH:mm") + "</td>";


        _html_body += "</tr>";
    });



    $("#panel_byyzList .tjfx-table-data_para-byyzList table thead").append(_html_th);
    $("#panel_byyzList .tjfx-table-data_para-byyzList table tbody").append(_html_body);


    var arr_fangan = document.getElementsByClassName("byyz_code");
    $.each(arr_fangan, function (index, item) {
        $(item).unbind("mousedown", (function (e) { }));
        $(item).bind("mousedown", (function (e) {
            if (e.which == 3) {

                var opertionn = {
                    name: $(this).attr("_data"),
                    offsetX: 10,
                    offsetY: 8,
                    textLimit: 10,
                    beforeShow: $.noop,
                    afterShow: $.noop
                };

                var imageMenuData = [
                    [{
                        text: "导出",
                        func: function (opertionn) {

                            getExcelInfoByCode($(this).text(), $(this).attr("_data"));
                        }
                    }],
                    [{
                        text: "删除",
                        func: function (opertionn) {

                            deleteByyzListPlan($(this).attr("_data"));
                        }
                    }]
                ];
                $(this).smartMenu(imageMenuData, opertionn);
            }
        }));
    })


}
function name_mouseover(obj) {
    $(obj).children(":first").css("white-space", "normal");
    console.log("name_mouseover")
}
function name_mouseout(obj) {
    $(obj).children(":first").css("white-space", "nowrap");
    console.log("name_mouseout")
}
function getSomeRain(obj) {
    var objData = {
        code: $(obj).attr("_data"),
        regionId: Number(searchRange)
    };
    var info = JSON.stringify(objData);
    $(".loading-layer").show();
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/transplantRain",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var json = data;
            if (json.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("获取信息失败!");
            }
            else {
                tools.loadinghide(false);
                yb_byyzList_hide();
                var svg_code = json.data.image.replace("<g id=\"shade\"", "<g id=\"some_shade\"");
                var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
                $("#byyz_list_tl").attr("src", json.data.legendUrl + "?version=" + Date.parse(new Date()));
                if (svgDocument == null)
                    return;
                var svgWnd = svgDocument.svgWnd;
                if (svgWnd == null)
                    return;
                svgWnd.showByyzSomeRain(svg_code);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");

        }
    })
}

function deleteByyzListPlan(code) {
    var objData = {

        code: code
    };
    var info = JSON.stringify(objData);
    $(".loading-layer").show();
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/removeTspInfo",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var json = data;
            if (json.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("删除信息失败!");
            }
            else {
                tools.show_message_success("删除信息成功!");
                yb_byyzList_show();
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("删除信息失败!");

        }
    })
}



//面板添加点击事件 保证操作面板在最上层
$(".report-byyzList").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

function yb_byyzList_hide() {
    $("#panel_byyzList").hide();
}
function yb_byyzList_show() {

    $(".loading-layer").show();
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/transplantInfo",

        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var json = data;
            if (json.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败!");
            }
            else {
                json_byyzList_data = json;
                tools.loadinghide(false);
                $("#panel_byyzList").show();
                tools.showPanelIndex("panel_byyzList");
                setParSizeByyzList("panel_byyzList", default_byyzList_width_report, default_byyzList_height_report);

                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败!");

        }
    })


}
function setParSizeByyzList(reportId, width, height) {

    $("#" + reportId).width(width).height(height);
    if (reportId == "panel_byyzList") {
        create_byyzList_table(json_byyzList_data);
        $("#panel_byyzList .tjfx-table-data_para-byyzList").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "overflow-y": "auto"
        });
        $("#panel_byyzList .tjfx-table-data_para-byyzList").height(height - 45 - 32);
        $("#panel_byyzList").css({
            "left": "calc(50% - " + (default_byyzList_width_report / 2) + "px)",
            "top": "calc(50% - " + (default_byyzList_height_report / 2) + "px)",
            "margin-left": "0px",
            "margin-top": "0px"
        });

    }


}
function getExcelInfoByCode(name, code) {
    tools.loadingshow("正在获取数据表格中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);


    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl_cloud + 'api-realsituate/exportTprain', true);
    //定义responseType='blob', 是读取文件成功的关键，这样设置可以解决下载文件乱码的问题
    xhr.responseType = "arraybuffer";
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = (res) => {
        // // xls类型: application/vnd.ms-excel
        // xlsx类型：application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8

        const blob = new Blob(["\ufeff", xhr.response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
    }
    xhr.send(JSON.stringify({ code: code }));
    var isexit = false;
    xhr.onreadystatechange = function () {
        if (isexit)
            return;
        var type = xhr.getResponseHeader('Content-Type');
        if (type == "application/json") {
            tools.loadinghide(false);
            tools.show_message_error_const("数据服务异常,请联系开发人员查看!");
            isexit = true;
        }
        else {
            if (xhr.readyState == 4) {
                tools.loadinghide(false);
                var newBlob = new Blob([xhr.response], {
                    type: 'text/plain;charset=UTF-8'
                })
                var anchor = document.createElement('a')
                anchor.download = name + '.xlsx'
                anchor.href = window.URL.createObjectURL(newBlob)
                anchor.click()
                isexit = true;
            }
        }
    }
    xhr.onerror = function (e) {
        console.log(e)
    };
}
