//# sourceURL=rain_report.js
//报表默认宽高
var default_rain_width_report = 780;
var default_rain_width_report_EU = 1020;
var default_rain_height_report = 355;
var json_data = null;
var daysNum_ = null;
var modifyValueRain_hh = false;

$(function () {
    $("#paneljsyb_table tbody").on("click", "tr", function () {
        var td = $(this).find("td");
        var data = td.eq(0).text();
    });
})

//最大化按钮事件
$(".report-jsyb .icon-max-jsyb").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_rain_width_report).height(default_rain_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_rain_width_report / 2 + "px",
            "margin-top": "-" + default_rain_height_report / 2 + "px"
        });

        //动态设置报表高度
        setRainReportSize($(this).parent().parent().parent().attr("id"), default_rain_width_report, default_rain_height_report);
        $(this).attr("data-type", "");
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setRainReportSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
    }
});
//关闭按钮事件
$(".report-jsyb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    hideRainInfo();
    //预报情景面板启用
    $("#panel_jysz").removeClass('div-not-click');
    //一键预报面板启用
    $("#panel_yjyb").removeClass('div-not-click');
    // $("#panel_jysz").show();
});

//修改按钮事件
$("#btnModify").click(function () {
    var days =Number($("#days_Modify").val());
    var sum = Number($("#sum_Modify").val());
    if (days != 0) {
        var avg = Math.round(sum / days, 0);
        if (avg >= 0) {
            var rowLenght = $("#paneljsyb_table").find("tr").length;
            for (var j = 0; j < rowLenght - 1; j++) {
                for (var i = 0; i < days; i++) {
                    $("#input_" + (j) + "_" + (i + 1)).val(avg);
                    modifyValueRainTable($("#input_" + (j) + "_" + (i + 1))[0]);
                }
                //更新一行 的计算总值

            }
        }
    }
  /*  $(".ModifyShow").show();
    $("#paneljsyb_table td input").removeAttr("readonly");*/
})

//确认按钮事件
$("#btnSureMod").click(function () {
    if ((!modifyValueRain_hh) && (Number($("#days_Ybao").val()) == daysNum_) && ($("#jsyb_ylxz").val() == 1)) {
      //  alert("Asd");
        tools.show_message_error_const("请进行修改后再确认保存！");
        return;
    };
    searchPlan = 1;

    var stime_ = $("#endTime").val() + ":00";
    var dataName_ = new Array();
    var data_ = new Array();
    $("#paneljsyb_table thead tr").each(function (i) {
        $(this).children('th').each(function (j) {
            dataName_.push($(this).text());
        })
    });
    $("#paneljsyb_table tbody tr").each(function (i) {
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
        blktable: data_,
        colname: dataName_,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        plan: Number(searchPlan),
        stime: stime_,
        grade: Number($("#jsyb_ylxz").val()),
        daynum: Number($("#days_Ybao").val())
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
        url: apiUrl_cloud + "api-stnbasic/saveBasinRF",
        data: info,

        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.show_message_error_const("保存降水预报信息失败！");
                return;
            }

            //var json = res.data;

            tools.show_message_success(res.msg);
            modifyValueRain_hh = false;

            //addDataToPhoto(JSON.parse(info));

            $("#paneljsyb_table thead tr th:last").click();
            clearCache();
            //显示预报情景选择面板
            $("#panel_jysz").show();
        },
        error: function (errorMsg) {

            tools.show_message_error_const("查询降水预报信息失败");
        }

    });
});

//查询降水分区按钮点击事件
$("#btnSearchjsfq").click(function () {
    //searchRange
    var searchPlan = $("#selectPlan").val();
    var userId = $("#_hid_userid").val();
    var ratio = "0"; //默认修正系数为0
    get_jsfq_data(searchRange, searchPlan, selectDays, userId, ratio);
})



//数值修改事件
function modifyValueRainTable(obj) {
    var value = obj.value;
    if (value == "" || value == null) {
        $(obj).val(0);
    }
    var tdArr = new Array();
    var sumArr1 = new Array();
    var sumArr2 = new Array();
    var sum_value1 = 0;
    var sum_value2 = 0;

    $(obj).parent().parent().children('td').each(function (i) {
        if ($(this).text() == "" || $(this).text() == null) {
            tdArr.push($(this).children().val());
        }
    })

    for (var i = 0; i < tdArr.length - 1; i++) {
        var valueSplit = tdArr[i].split('-');
        if (valueSplit[0] == "" || valueSplit[0] == null) {
            valueSplit[0] = 0;
        }
        sumArr1.push(valueSplit[0]);
        if (valueSplit[1] == "" || valueSplit[1] == null) {
            valueSplit[1] = 0;
        }
        sumArr2.push(valueSplit[1]);
    }
    for (var i = 0; i < sumArr1.length; i++) {
        sum_value1 += parseInt(sumArr1[i]);
    }
    for (var i = 0; i < sumArr2.length; i++) {
        sum_value2 += parseInt(sumArr2[i]);
    }

    var modify_value = sum_value2 == 0 ? sum_value1 : sum_value1 + "-" + sum_value2;
    $(obj).parent().parent().children().last().children().val(modify_value);

    modifyValueRain_hh = true;
}

/**
 * 初始化下拉降雨方案
 */
function init_rain_model (){
    let param = {
        range:searchRange
    }
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-rainsituation/basin/getDayPResample",
        data: JSON.stringify(param),
        success:function(res){
            if(res.code === 200){
                let data = res.data
                let htmlSt = "<option value=''>---请选择---</option>"
                let html = ""
                $.each(data , function(index, item){
                    html += "<option value='"+item+"'>"+item+"</option>"
                })
                $("#jsyb_fpfa").html("")
                $("#jsyb_fpfa").append(htmlSt + html)
            }else{
                tools.show_message_error_const(res.msg)
            }
        },
        error:function(msg){
            tools.show_message_error_const(msg)
        }
    })
}

//创建表格
function create_rainReport_table(reportId, _width, json) {

    //先清空数据
    $("#paneljsyb .tjfx-table-data_rain table colgroup col").remove();
    $("#paneljsyb .tjfx-table-data_rain table thead tr").remove();
    $("#paneljsyb .tjfx-table-data_rain table tbody tr").remove();


    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.colname, function (index, item) {
        if(index ==0)
            _html_th += "<th style='width: 120px;'>" + item + "</th>";
        else
            _html_th += "<th onclick='changeMapValue(this)'>" + item + "</th>";

    });
    _html_th += "</tr>";
    $.each(json.blktable, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {

            var _class = "";

            _class += " style='white-space: normal;text-align:center'";
            if (index_inner > 0) {
                _html_body += "<td>";
                if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE浏览器不支持onchange事件
                    _html_body += "<input id='input_" + index + "_" + index_inner + "' onblur='modifyValueRainTable(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal;    width: 100%;text-align: center;'  /></td>";
                } else {
                    _html_body += "<input id='input_" + index + "_" + index_inner + "' onchange='modifyValueRainTable(this)' type='text' onkeyup=" + "value=value.replace(/[^0-9-]+/,'') " + " value='" + item_inner + "' style='border:0px;line-height:normal;    width: 100%;text-align: center;'  /></td>";
                }
            } else {
                _html_body += "<td " + _class + " >";
                _html_body += item_inner;
            }
        });
        _html_body += "</tr>";
    });


    $("#paneljsyb .tjfx-table-data_rain table thead").append(_html_th);
    $("#paneljsyb .tjfx-table-data_rain table tbody").append(_html_body);

    $("#paneljsyb_table thead tr th:last").click();
};
function tableHeader() {
    $("#paneljsyb_table").parent().prepend(
        '<table id="tableid_rainReport" class="table" ><thead>' + $("#paneljsyb_table thead").html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow-y': 'auto'
    })
    $("#tableid_rainReport").find('th').each(function (i) {
        $(this).css('width', $('#paneljsyb_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_rainReport").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#paneljsyb_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_rain').scroll(function () {
        if ($('.tjfx-table-data_rain').scrollTop() > 0) {
            $("#tableid_rainReport").css('top', $('.tjfx-table-data_rain').scrollTop());
        } else {
            $("#tableid_rainReport").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-jsyb").resizable({
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
    setRainReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setRainReportSize(reportId, width, height, json) {
    // console.log(width + "/" + height);
    $("#" + reportId).css({
        "top": "30%",
        "left": "80%",
        "margin-left": "-" + width / 2*1.3 + "px",
        "margin-top": "-" + default_rain_height_report / 2 + "px"
    });
    initTableDivRain(reportId);
    $(".report-jsyb .icon-max-jsyb").attr("data-type", "");
    $("#" + reportId).width(width).height(height);

    create_rainReport_table(reportId, width - 15, json_data);
    $("#paneljsyb .tjfx-table-data_rain").css({
        "width": "100%",
        "padding-left": tools.scroll_default_width + "px"
    });
    $("#paneljsyb .tjfx-table-data_rain").height(height - 45 - 38);

    //初始化下拉降雨方案
    init_rain_model()

}
//报表通用可拖拽事件
$(".report-jsyb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-jsyb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

$(".tjfx-table-data_rain").click(function () {
    //var thSeq = $(this).children()[0].children()[1].ch.find("th").index($(this)[0]);
    //alert("第" + thSeq + "列");
})

$("#paneljsyb_table tr:gt(0)").click(function () {
    var TaskType = $(this).find("td").eq(0).html();
    alert(TaskType)

})

$("#jsyb_ylxz").change(function () {

    get_rainReport_data(searchRange, searchEtime);

});


/**
 * 获取降水预报信息
 */
function get_rainReport_data(searchRange, searchEtime) {
       var objData = {
        code: searchRange,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        startTime: searchEtime,
        grade:Number( $("#jsyb_ylxz").val())
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: apiUrl_cloud + "api-stnbasic/getBasinRF",
        headers: {
            "Authorization": getCookie("accessToken")
        },

        data: info,

        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.show_message_error("查询降水预报信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            daysNum_ = json.daynum;
            if (json.daynum == 0) {
                tools.show_message_error(json.msg);
                $(".report-jsyb .icon-close").click();
            } else {
              //  $(".ModifyShow").hide();
                $("#paneljsyb").show();
                $("#paneljsyb .sel").hide();
                $("#contProLine-Jsyb").hide();
                $("#days_Modify").val("0");
                $("#sum_Modify").val("0");
                tools.showPanelIndex("paneljsyb");
                setRainReportSize("paneljsyb", default_rain_width_report_EU, default_rain_height_report);

                $("#days_Ybao").val(daysNum_)

                //在图片上添加数据文字并可拖拽
                //addDataToPhoto(json);


                //obj = $("#menu");
                //drag(obj);

                return;
            }

        },
        error: function (errorMsg) {

            tools.show_message_error("查询降水预报信息失败");
        }

    });
}
function initTableDivRain(reportId) {

    $("#" + reportId + " .tjfx-table-data_rain").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_rain").append(_html);
    $("#" + reportId + " .tjfx-table-data_rain").css({
        "height": "440px",
        "overflow-y": "scroll"
    });

};

function addDataToPhoto(json) {
    $("#imgDiv span").remove();

    var spanHtml = "";
    var lastDataIndex = json.data[0].length - 1;
    $.each(json.data, function (index, item) {
        if (index == 0) {
            spanHtml += "<span style='position:absolute; bottom: 400px; left: 360px; color: red; font-weight: bold; font-size: 22px; cursor: move'>" + item[lastDataIndex] + "</span>"
        }
        if (index == 1) {
            spanHtml += "<span style='position:absolute; bottom: 416px; left: 466px; color: red; font-weight: bold; font-size: 22px; cursor: move'>" + item[lastDataIndex] + "</span>"
        }
        if (index == 2) {
            spanHtml += "<span style='position:absolute; bottom: 410px; left: 565px; color: red; font-weight: bold; font-size: 22px; cursor: move'>" + item[lastDataIndex] + "</span>"
        }
        if (index == 3) {
            spanHtml += "<span style='position:absolute; bottom: 480px; left: 666px; color: red; font-weight: bold; font-size: 22px; cursor: move'>" + item[lastDataIndex] + "</span>"
        }
    })
    $("#imgDiv").append(spanHtml);

    $('#imgDiv span').udraggable({
        containment: 'parent'
    })
}

//点击表头，切换地图数据
//行单击事件
function changeMapValue(obj) {
    var tr = obj;

    var maparr = new Array();

    //先获取当前点击表头下标，是第几列
    var cellindex = obj.cellIndex;

    //找到对应tbody对应列的值
    var a = $(obj).parent().parent().next().children();
    var dataArr = new Array();

    $(".rainSelect").removeClass("rainSelect");
    $(obj).addClass("rainSelect");
    $.each(a, function (index, item) {
        $(item.children[cellindex].children[0]).addClass("rainSelect");
        var data = item.children[cellindex].children[0].value;
        var lyName = item.children[0].innerText;
        dataArr.push(data);

        maparr.push({ name: [lyName], text: [data] });
    })
    var ishowIcon = true;
    if ($(obj).parent().children().length - 1 == cellindex)
        ishowIcon = false;

    showRainInfo(maparr, ishowIcon);
}