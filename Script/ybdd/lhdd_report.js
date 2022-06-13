//# sourceURL=lhdd_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 515;

var default_xxhqxsl_set_width_report = 320;
var default_xxhqxsl_set_height_report = 120;

var json_data = null;
var lhdd_table_name = "";
var objData = null;
var icon_max = "";
var selectModel = "";
var xxhqxsl_json = null;
var xxhqxsl_set_selectIndex = -1;
//最大化按钮事件
$(".report-lhdd .icon-max-para").click(function () {
    //console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });
        $(this).attr("data-type", "");
        icon_max = "";
        //动态设置报表高度
        setParSizeLhdd($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });
        $(this).attr("data-type", "max");
        icon_max = "max";
        //动态设置报表高度
        setParSizeLhdd($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());

    }
});
//关闭按钮事件
$(".report-lhdd .icon-close,.report-xxhqxsl_set .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
});

/**
 * TAB切换事件- 手动处理避免显示延迟
 **/
$("#panel_lhdd .nav a").click(function (e) {
      if ($(this).parent('li').hasClass('active'))
          return;
  
      //改变标题栏
      $(this).parent('li').siblings('.active:last').removeClass("active");
      $(this).parent('li').addClass("active");
  
      //获取当前元素ID
      var id = $(this).attr("_data");
      $(id).siblings('.active:last').removeClass("in active");
      $(id).addClass("in active");
});


//报表通用改变大小事件
$(".report-lhdd").resizable({
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
    setParSizeLhdd($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeLhdd(reportId, width, height, json) {
    initTableDiv_lhdd(reportId);

    $("#" + reportId).width(width).height(height);

    //create_ddjg_table_hd(reportId, width - 15, json_data);
    $("#panel_lhdd .tjfx-table-data_para-lhdd").css({
        "width": "100%",
        //"padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_lhdd .tjfx-table-data_para-lhdd").height(height - 125);
 
    $("#panelxxhqxsl").width(default_xxhqxsl_set_width_report);
    //tableHeader_jsfq();
}
//报表通用可拖拽事件
$(".report-lhdd,.report-xxhqxsl_set").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-lhdd").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_lhddReport_data(searchRange, searchStime, searchEtime, searchPlan, selectDays, models) {
    return;

    tools.loadingshow("获取联合调度运用工程信息中...", arrRange_ddjg_lodingtime[Number(searchRange) - 1]);

    selectModel = models;
    
    objData = null;

    objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: getRadioModel(),
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        range: searchRange,
        startTime: searchStime,
        stcd:""
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl + "PreSchedule/GetJointDispatchPorj",
        data: info,
        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            if (res.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-lhdd .icon-close").click();
            } else {

                create_lhdd_table(json_data);

                tools.loadinghide(true);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
    get_xxhqxsl_data();
    initFangAnSelect();
    默认行蓄洪区
    $("#linkLhdd_xx").click();

    $("#panel_lhdd").show();

    tools.showPanelIndex("panel_lhdd");
    setParSizeLhdd("panel_lhdd", default_par_width_report, default_par_height_report);

}
$("#listNamelhdd").change(function (e) {

    var vid = $("#listNamelhdd  option:selected").val();
    if (vid == -9999) {
        lhdd_makeInfoself();
    }
    else {
        lhdd_nomakeInfoself();
    }

});
function lhdd_makeInfoself() {
    $("#lhddFaName").css("display", "inline");
    $("#lhddFaName").val("");
    $("#lhddFaName").removeAttr("disabled");
    $("#lhddFaName").focus();

}
function lhdd_nomakeInfoself() {
    $("#lhddFaName").attr("disabled", "disabled");
    $("#lhddFaName").val($("#listNamelhdd").find("option:selected").text());
    $("#lhddFaName").hide();

}
function initFangAnSelect() {
    $("#listNamelhdd").empty();
   // $("#listNamelhdd").append("<option value='2' selected>规则调度</option>");
  //  $("#listNamelhdd").append("<option value='1'>初始状态</option>");
    var lis_exit = ["规则调度", "初始状态", "自定义"];
    var objData = {
         autoFore: 0,
         day: selectDays,
         etime: searchEtime,
         hisStormId: _hisStormId,
         plan: searchPlan,
         plusType: _plusType,
         rainPlus: _rainPlus,
         range: searchRange,
        stime: searchStime,
         modelid: getRadioModel()
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
        url: apiUrl_cloud + "api-hwhydroinfo/get_ScheduleFaNm",
        data: info,
        success: function (res) {
            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error_const("查询信息失败！");
                return;
            }

            var json = res.data;
            if (json.data.length == 0) {
                tools.loadinghide(false);
                tools.show_message_error("暂无调度方案数据！");
                return;
            }
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                $.each(json.data, function (index, item) {
                    if ($.inArray(item, lis_exit) == -1) {
                        if (lis_exit.length == 3)
                            $("#listNamelhdd").append("<option value='3' selected>" + item + "</option>");
                        else
                            $("#listNamelhdd").append("<option value='3'>" + item + "</option>");
                        lis_exit.push(item);
                    }

                })

                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
    if (lis_exit.length == 3) {
        $("#lhddFaName").css("display", "inline");
        $("#listNamelhdd").append("<option value='-9999' selected>自定义</option>");
    }
    else
    {
        $("#lhddFaName").hide();
        $("#listNamelhdd").append("<option value='-9999'>自定义</option>");
    }
       
   
    $("#lhddFaName").val($("#listNamelhdd").find("option:selected").text());
    if (lis_exit.length == 3) {
        lhdd_makeInfoself();
    }
}
function get_xxhqxsl_data() {
    var objData = {
        range: searchRange,
        stime: searchStime,
        etime: searchEtime,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: selectDays
    };
    var info = JSON.stringify(objData);
    xxhqxsl_json = null;
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: apiUrl_cbh + "get_Real_XxhqInnerW",
        headers: {
            "Authorization": getCookie("accessToken")
        },

        data: info,

        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.show_message_error("查询行蓄洪区内蓄水信息失败！");
                return;
            }

            var json = res;
            xxhqxsl_json = json;
            if (json.code == 0) {
                tools.show_message_error(json.msg);
             
            } else {
                
                create_xxhqxslReport_table(xxhqxsl_json);
                return;
            }

        },
        error: function (errorMsg) {

            tools.show_message_error("查询行蓄洪区内蓄水信息失败");
        }

    });
}
function create_xxhqxslReport_table(  json) {
    //先清空数据
 
    $("#tableJcxx_lhdd thead tr").remove();
    $("#tableJcxx_lhdd tbody tr").remove();
    var _html_th = "<tr>";
    $.each(json.tablenm, function (index, item) {
        if (index == 0)
            _html_th += "<th style='width:50px;' >" + item + "</th>";
        else
            _html_th += "<th  >" + item + "</th>";
    });

    _html_th += "</tr>";

    var _html_body = "";

    $.each(json.tablevalue, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            if (index_inner < json.tablenm.length) {
                if (item_inner == ".00") {
                    item_inner = "0";
                }

                var _class = "";
                _class += " style='white-space: normal;text-align:center'";
                if (index_inner == 0)
                    _html_body += "<td style='width:50px;' " + _class + " >";
                else
                    _html_body += "<td " + _class + " >";

                if (index_inner == 1)
                    _html_body += "<a onclick='setXxhqValue(" + index + ")' style='cursor:pointer'>" + item_inner + "</a>";
                else

                    _html_body += item_inner;

                _html_body += "</td>";
            }


        });
        _html_body += "</tr>";
    });
  
    $("#tableJcxx_lhdd thead").append(_html_th);
    $("#tableJcxx_lhdd tbody").append(_html_body);

   



 
}
function initTableDiv_lhdd(reportId) {
    if (icon_max == "max") {
        $("#" + reportId + " .tab-pane").css({
            "height": $(window).height() - 65,
            "overflow-y": "scroll"
        });
    } else {
        $("#" + reportId + " .tab-pane").css({
            "height": "430px",
            "overflow-y": "scroll"
        });
    }
};

function create_lhdd_table(json) {
    //先清空数据
    $("#tableXx_lhdd thead tr").remove();
    $("#tableXx_lhdd tbody tr").remove();
    $("#tableFh_lhdd thead tr").remove();
    $("#tableFh_lhdd tbody tr").remove();
    $("#tableSk_lhdd thead tr").remove();
    $("#tableSk_lhdd tbody tr").remove();

    $("#panel_lhdd .modal-title").html("联合调度运用工程");

    var stcd_lhddtable = "";

    //行蓄洪区
    //表头
    var _html_th_xx = "<tr>";
    var _html_body_xx = "";
    var gcName = "";
    $.each(json.行蓄洪区_dataName, function (index, item) {
        if (index == 1) {
            _html_th_xx += "<th>是否启用</th><th>" + item + "</th>"
        } else {
            _html_th_xx += "<th>" + item + "</th>";
        }
    });
    _html_th_xx += "</tr>";
    //表体
    var _class = " style='white-space: normal;text-align:center'";
    $.each(json.行蓄洪区_data, function (index, item) {
        _html_body_xx += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            if (index_inner == 0) {
                gcName = item_inner;
                var res = tools.getInfoBystnm(gcName, "5");
                if (res != "") {
                    stcd_lhddtable = res.split(',')[1];
                }

                _html_body_xx += "<td " + _class + " >";
                _html_body_xx += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_lhdd(\"" + item_inner + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            }else if (index_inner == 1) {
                _html_body_xx += "<td><input type='checkbox' name='lhddCheckbox' onclick='checkValue(this)' value='" + stcd_lhddtable + "' style='border:0px;line-height:normal' /></td><td><input type='text'" + " value='' style='border:0px;line-height:normal' readonly/></td>";
            } else if (index_inner == 3) {
                _html_body_xx += "<td " + _class + " >";
                _html_body_xx += "<span><font style='color:#0000ff'><a href='#' onclick='show_ddRule_lhdd(\"" + gcName + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            }
            else {
                _html_body_xx += "<td " + _class + " >" + item_inner + "</td>";
            }
        });
        _html_body_xx += "</tr>";
    });
    $("#tableXx_lhdd thead").append(_html_th_xx);
    $("#tableXx_lhdd tbody").append(_html_body_xx);

    //分洪枢纽
    //表头
    var _html_th_fh = "<tr>";
    var _html_body_fh = "";
    $.each(json.分洪枢纽_dataName, function (index, item) {
        if (index == 1) {
            _html_th_fh += "<th>是否启用</th><th>" + item + "</th>"
        } else {
            _html_th_fh += "<th>" + item + "</th>";
        }
    });
    _html_th_fh += "</tr>";
    //表体
    var _class = " style='white-space: normal;text-align:center'";
    $.each(json.分洪枢纽_data, function (index, item) {
        _html_body_fh += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            if (index_inner == 0) {
                gcName = item_inner;
                var res = tools.getInfoBystnm(gcName, "5");
                if (res != "") {
                    stcd_lhddtable = res.split(',')[1];
                }

                _html_body_fh += "<td " + _class + " >";
                _html_body_fh += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_lhdd(\"" + item_inner + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            }else if (index_inner == 1) {
                _html_body_fh += "<td><input type='checkbox' name='lhddCheckbox' onclick='checkValue(this)' value='" + stcd_lhddtable + "' style='border:0px;line-height:normal' /></td><td><input type='text'" + " value='' style='border:0px;line-height:normal' readonly/></td>";
            } else if (index_inner == 3) {
                _html_body_fh += "<td " + _class + " >";
                _html_body_fh += "<span><font style='color:#0000ff'><a href='#' onclick='show_ddRule_lhdd(\"" + gcName + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            }
            else {
                _html_body_fh += "<td " + _class + " >" + item_inner + "</td>";
            }
        });
        _html_body_fh += "</tr>";
    });
    $("#tableFh_lhdd thead").append(_html_th_fh);
    $("#tableFh_lhdd tbody").append(_html_body_fh);

    //重点水库
    //表头
    var _html_th_sk = "<tr>";
    var _html_body_sk = "";
    $.each(json.重点水库_dataName, function (index, item) {
        if (index == 2) {
            _html_th_sk += "<th>人工调控</th><th>" + item + "</th>"
        } else {
            _html_th_sk += "<th>" + item + "</th>";
        }
    });
    _html_th_sk += "</tr>";
    //表体
    var _class = " style='white-space: normal;text-align:center'";
    $.each(json.重点水库_data, function (index, item) {
        _html_body_sk += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            if (index_inner == 0) {
                gcName = item_inner;

                var res = tools.getInfoBystnm(gcName, "5");
                if (res != "") {
                    stcd_lhddtable = res.split(',')[1];
                }

                _html_body_sk += "<td " + _class + " >";
                _html_body_sk += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_lhdd(\"" + item_inner + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            } else if (index_inner == 1) {
                _html_body_sk += "<td " + _class + " >";
                _html_body_sk += "<span><font style='color:#0000ff'><a href='#' onclick='show_ddRule_lhdd(\"" + gcName + "\"" + ");'>" + item_inner + "</a></font></span></td>";
            }
            else if (index_inner == 2) {
                _html_body_sk += "<td><input type='checkbox' name='lhddSkCheckbox' onclick='checkSkValue(this)' value='" + stcd_lhddtable + "' style='border:0px;line-height:normal' /></td><td><input type='text' name='lhddInputText' data='" + gcName + "' style='border:0px;line-height:normal' readonly/></td>";
            }else if (index_inner == 3) {
                _html_body_sk += "<td><input type='text' name='lhddInputText' data='" + gcName + "' style='border:0px;line-height:normal' readonly/></td>";
            } else {
                _html_body_sk += "<td " + _class + " >" + item_inner + "</td>";
            }
        });
        _html_body_sk += "</tr>";
    });
    $("#tableSk_lhdd thead").append(_html_th_sk);
    $("#tableSk_lhdd tbody").append(_html_body_sk);
}

//联合调度确认按钮点击事件
$("#btnSureModLhdd").click(function () {
    //获取表格填写数据
    var checkArr = new Array();
    var checkData = new Array();
    var skArr = new Array();
    var skData = new Array();
    var floodDiverInfo = {};
    var schedulePlanName = $("#lhddFaName").val();
    if (schedulePlanName == "" || schedulePlanName == null || schedulePlanName == undefined) {
        tools.show_message_error("请输入方案名称!");
        return;
    }

    $("input[type=checkbox][name='lhddCheckbox']:checked,input[type=checkbox][name='lhddSkCheckbox']:checked").each(function (i) {//把所有被选中的复选框的值存入数组
        if (this.name == 'lhddCheckbox') {
            checkArr[i] = $(this).val();
            checkData[i] = $(this).parent().next().children().val();
        }
        if (this.name == 'lhddSkCheckbox') {
            checkArr[i] = $(this).val();
            checkData[i] = $(this).parent().next().children().val() + "_" + $(this).parent().next().next().children().val();
        }
        //checkArr[i] = $(this).val();
        //checkData[i] = $(this).parent().next().children().val();
        floodDiverInfo[checkArr[i]] = checkData[i];
    });

    var objData = {
        adjust: 1,
        endTime: searchEtime,
        floodDiverInfo: floodDiverInfo,
        foreDays: Number(selectDays),
        forecastModel:"MGE2",
        model: getRadioModel(),
        plan: searchPlan,
        range: searchRange,
        schedulePlanName: schedulePlanName,
        scheduleType: 3,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        startTime: searchStime,
        stcd: ""
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl + "PreSchedule/ArtifitJointDispatch",
        data: info,
        success: function (data) {
            var res = data;
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("人工联合调度计算失败！");
                return;
            }
            var json = res.data;
            json_data = json;
            if (res.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-lhdd .icon-close").click();
            } else {
                tools.show_message_success(json.msg);
                tools.loadinghide(true);
                
             //   initDdSelect();
                funcDispatch(schedulePlanName);
                
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
    $(".report-lhdd .icon-close").click();
    getDDprogress();
})

function show_gcxdetail_lhdd(_stnm) {
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    if (searchRange < 6) {
        var res = tools.getInfoBystnm(_stnm, "5");
    } else {
        var res = tools.getInfoBystnm(_stnm, "9");
    }
    if (res != "") {
        stcd_lhdd = res.split(',')[1];
        sttp_lhdd = res.split(',')[2];
    }
    //if (sttp_ddjg == "ZZ" || sttp_ddjg == "ZQ") {
    //    //河道单站调度结果展示
    //    tools_panel.show_type = "3";
    //    tools_panel.show_all = false;
    //    //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
    //    GetTreeMenuData();
    //    tools_panel.panelShow(stcd_ddjg, _stnm, searchEtime, sttp_ddjg, searchStime);
    //} else {

        //闸坝水库单站调度结果展示
        tool_dispatch.show_type = "3";
        tool_dispatch.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
        GetTreeMenuData();
        tool_dispatch.panelShow(stcd_lhdd, _stnm, sttp_lhdd, searchStime, searchEtime);
    //}
}

function show_ddRule_lhdd(_stnm) {
    if (searchRange < 6) {
        var res = tools.getInfoBystnm(_stnm, "5");
    } else {
        var res = tools.getInfoBystnm(_stnm, "9");
    }
    if (res != "") {
        stcd_lhdd = res.split(',')[1];
        sttp_lhdd = res.split(',')[2];
    }
    show_dd_rule(stcd_lhdd);
}

function checkValue(e) {
    if (e.checked == true) {
        $(e).parent().next().children()[0].removeAttribute("readonly");
        var v1 = Number($(e).parent().parent().find('td:eq(5)').html());
        var v2 = Number($(e).parent().parent().find('td:eq(6)').html());
        var v_min="";
        if (v1 < v2)
            v_min = v1;
        else
            v_min = v2;

        $(e).parent().next().children()[0].value = v_min;
 
    }
    else
        $(e).parent().next().children()[0].value = "";


}
function checkSkValue(e) {
    if (e.checked == true) {
        $(e).parent().next().children()[0].removeAttribute("readonly");
        $(e).parent().next().next().children()[0].removeAttribute("readonly");
    }
}
function createSetInfo() {
    $("#Div_xxhq_set").html("");
    var _html = "";

    $.each(xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][7], function (index, item) {
        _html += "<label style='float:left;font-size: 14px;margin-bottom: 0px;margin-top: " + ((index + 1) * 10 + 3) + "px;'>" + item + ":</label>";
        _html += "<input id='v_xxhqxsl_set_" + index + "' type='number' min='0' style='float:right;font-size: 14px;width:120px;margin-top:" + (index + 1) * 10 + "px;' value=" + xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][8][index] + ">";
        _html += "<br />"
    })
    $("#Div_xxhq_set").html(_html);
    $("#Div_xxhq_set").height(default_xxhqxsl_set_height_report + xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][7].length * 40 - 100);
    $("#panelxxhqxsl_set").height(default_xxhqxsl_set_height_report + xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][7].length * 40);
}

function setXxhqValue(id) {
    xxhqxsl_set_selectIndex = id;
    //  alert(xxhqxsl_set_selectIndex);
    set_xxhqxsl_data();
    //   alert(xxhqxsl_json.tablevalue[id][7]);
}

function set_xxhqxsl_data() {
    $("#panelxxhqxsl_set").css({
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "margin-left": "-" + default_xxhqxsl_set_width_report / 2 + "px",
        "margin-top": "-" + default_xxhqxsl_set_height_report / 2 + "px"
    });
    $("#panelxxhqxsl_set").width(default_xxhqxsl_set_width_report);
    $("#panelxxhqxsl_set").show();


    tools.showPanelIndex("panelxxhqxsl_set");
    createSetInfo();
 
}
$("#Div_xxhq_set_btn").click(function () {

    var xxid = xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][5];
    var s_stcd = "";
    var s_name = "";
    var s_value = "";
    $.each(xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][6], function (index, item) {
        if (s_stcd == "")
            s_stcd += item;
        else
            s_stcd += "," + item;
    })
    $.each(xxhqxsl_json.tablevalue[xxhqxsl_set_selectIndex][7], function (index, item) {
        if (s_name == "") {
            s_name += item;
            s_value += $("#v_xxhqxsl_set_" + index).val();

        }

        else {
            s_name += "," + item;
            s_value += "," + $("#v_xxhqxsl_set_" + index).val();
        }

    })


    var objData = {
        stime: searchStime,
        etime: searchEtime,
        stcd: s_stcd,
        stnm: s_name,
        xxhqid: xxid,
        z: s_value,
        xh: (xxhqxsl_set_selectIndex + 1)
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        url: apiUrl_cbh + "get_Real_XxhqInnerWUpdate",
        headers: {
            "Authorization": getCookie("accessToken")
        },

        data: info,

        success: function (data) {
            var res = data;

            if (res == "" || res == null) {
                tools.show_message_error("行蓄洪区内蓄水信息更新失败！");
                return;
            }

            var json = res;
            if (json.code == 0) {
                tools.show_message_error(json.msg);
                $(".report-xxhqxsl_set .icon-close").click();
            } else {
                $(".report-xxhqxsl_set .icon-close").click();
                $('#tableJcxx_lhdd').find('tr:eq(' + json.tabledata[0] + ')').find('td:eq(3)').html(json.tabledata[1]);
                $('#tableJcxx_lhdd').find('tr:eq(' + json.tabledata[0] + ')').find('td:eq(4)').html(json.tabledata[2]);

                return;
            }

        },
        error: function (errorMsg) {

            tools.show_message_error("行蓄洪区内蓄水信息更新失败");
        }

    });
})
 