//# sourceURL=ddjg_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 515;
var json_data = null;
var ddjg_table_name = "";
var objData = null;
var icon_max = "";
//最大化按钮事件
$(".report-ddjg .icon-max-para").click(function () {
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
        setParSizeDdjg($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        
        //console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
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
        setParSizeDdjg($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
       
        //console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-ddjg .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});

/**
 * TAB切换事件- 手动处理避免显示延迟
 **/
$("#panel_ddjg .nav a").click(function (e) {
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

function show_gcxdetail_ddjg(_stnm, temp_stcd, temp_sttp) {
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";


    if (temp_sttp == "FH")
        temp_sttp = "DD";

    stcd_ddjg = temp_stcd;
    sttp_ddjg = temp_sttp;

    if (sttp_ddjg == "ZZ" || sttp_ddjg == "ZQ") {
        //河道单站调度结果展示
        tools_panel.show_type = "3";
        tools_panel.show_all = false;
        ////tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
        GetTreeMenuData();
        tools_panel.panelShow(stcd_ddjg, _stnm, searchEtime, sttp_ddjg, searchStime);
    } else {
        //闸坝水库单站调度结果展示
        tool_dispatch.show_type = "3";
       // tool_dispatch.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
        GetTreeMenuData();
        tool_dispatch.panelShow(stcd_ddjg, _stnm, sttp_ddjg, searchStime, searchEtime);
    }
}

/**
 * 河道超警TAB点击事件
 **/
// $("#linkDdjg_hd").click(function () {
//     get_ddjg_hd_data();
// });

/**
 * 水库超讯TAB点击事件
 **/
// $("#linkDdjg_sk").click(function () {
//     get_ddjg_sk_data();
// });

/**
 * 工程启用TAB点击事件
 **/
// $("#linkDdjg_xx").click(function () {
//     get_ddjg_xx_data();
// });

//创建表格
function create_ddjg_table_hd(json) {
 
    //先清空数据
    $("#tableHd_ddjg thead tr").remove();
    $("#tableHd_ddjg tbody tr").remove();

    $("#panel_ddjg .modal-title").html(ddjg_table_name + "方案结果");
    //表头
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
       
        $.each(item, function (i, data) {
            if (i < item.length - 2) {
                _html_th += "<th>" + data + "</th>";
            }
            });
      
    });
    _html_th += "</tr>";
    //表体
    var font_start = "";
    var font_end = "";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
            if (item_inner[2] > item_inner[5]) {//超警戒
                font_start = "<font color='Blue'>"
                font_end = "</font>";
            } else if (item_inner[2] > item_inner[6]) {//超保证
                font_start = "<font color='Red'>"
                font_end = "</font>";
            }
            $.each(item_inner, function (i, data) {
                if (i < item_inner.length - 2) {
                    // if (i == 1) {
                    //     var _class = "";
                    //     _class += " style='white-space: normal;text-align:center'";
                    //     _html_body += "<td " + _class + " >";
                    //     _html_body += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_ddjg(\"" + data + "\"" + ",\"" + item_inner[item_inner.length - 2] + "\",\"" + item_inner[item_inner.length - 1] + "\");'>" + data + "</a></font></span>";
                    // } else
                        if (i == 2) {
                        var _class = "";
                        _class += " style='white-space: normal;text-align:center'";
                        _html_body += "<td " + _class + " >" + font_start + data + font_end;
                        //_html_body += data + font_end + "</td>";
                    } else {
                        var _class = "";
                        _class += " style='white-space: normal;text-align:center'";
                        _html_body += "<td " + _class + " >";
                        _html_body += data;
                    }
                }
                _html_body += "</td>"
            })
            _html_body += "</tr>";
        });
        
    });
    $("#tableHd_ddjg thead").append(_html_th);
    $("#tableHd_ddjg tbody").append(_html_body);

};

//报表通用改变大小事件
$(".report-ddjg").resizable({
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
    setParSizeDdjg($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeDdjg(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);

    //create_ddjg_table_hd(reportId, width - 15, json_data);
    $("#panel_ddjg .tjfx-table-data_para-ddjg").css({
        "width": "100%",
        //"padding-right": tools.scroll_default_width + "px"
    });
    $("#panel_ddjg .tjfx-table-data_para-ddjg").height(height - 65);

    //tableHeader_jsfq();
}
//报表通用可拖拽事件
$(".report-ddjg").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-ddjg").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_ddjgReport_data(searchRange, searchStime, searchEtime, ddfaName, userId, searchPlan, selectDays) {

    tools.loadingshow("调度结果信息中...", arrRange_ddjg_lodingtime[Number(searchRange) - 1]);
    
    ddjg_table_name = ddfaName;
    objData = null;

    objData = {
        day: selectDays,
        dbfxddfa: ddfaName,
        etime: searchEtime,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        range: searchRange,
        stime: searchStime,   
       modelid: getRadioModel()
    };

    //默认河道
    $("#linkDdjg_hd").click();
    get_ddjg_hd_data();
    get_ddjg_sk_data();
    get_ddjg_xx_data();
    //tools.loadinghide(true);
    $("#panel_ddjg").show();
    tools.showPanelIndex("panel_ddjg");
    setParSizeDdjg("panel_ddjg", default_par_width_report, default_par_height_report);

}
function initTableDiv(reportId) {

    //$("#" + reportId + " .tjfx-table-data_para-ddjg table thead").empty();
    //$("#" + reportId + " .tjfx-table-data_para-ddjg table tbody").empty();
    //var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    //$("#" + reportId + " .tjfx-table-data_para-ddjg").append(_html);
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

function get_ddjg_hd_data() {
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud +"api-hwhydroinfo/get_SingleSchedualDetailriver",
        data: info,
        success: function (data) {
            var res = data ;

            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-ddjg .icon-close").click();
            } else {
                
                create_ddjg_table_hd(json_data);
                tools.loadinghide(true);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}

function get_ddjg_sk_data() {
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: apiUrl_cloud +"api-hwhydroinfo/get_SingleSchedualDetailrsvr",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (data) {
            var res = data;

            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-ddjg .icon-close").click();
            } else {
                tools.loadinghide(true);
                create_ddjg_table_sk(json_data);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });

}

function create_ddjg_table_sk(json) {
    //先清空数据
    $("#tableSk_ddjg thead tr").remove();
    $("#tableSk_ddjg tbody tr").remove();

    //$("#panel_ddjg .modal-title").html(ddjg_table_name + "方案结果");
    //表头
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
      
        $.each(item, function (i, data) {
            if (i < item.length - 2) {
                _html_th += "<th>" + data + "</th>";
            }
            });
      
    });
    _html_th += "</tr>";
    //表体
    var font_start = "";
    var font_end = "";
    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {
           
                if (item_inner[5] > item_inner[7]) {//超汛限
                    font_start = "<font color='Blue'>"
                    font_end = "</font>";
                } else if (item_inner[5] > item_inner[8]) {//超设计
                    font_start = "<font color='Red'>"
                    font_end = "</font>";
                }
                $.each(item_inner, function (i, data) {
                    if (i < item_inner.length - 2) {
                        // if (i == 1) {
                        //     var _class = "";
                        //     _class += " style='white-space: normal;text-align:center'";
                        //     _html_body += "<td " + _class + " >";
                        //     _html_body += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_ddjg(\"" + data + "\"" + ",\"" + item_inner[item_inner.length - 2] + "\",\"" + item_inner[item_inner.length - 1] + "\");'>" + data + "</a></font></span>";
                        // } else
                            if (i == 5) {
                            var _class = "";
                            _class += " style='white-space: normal;text-align:center'";
                            _html_body += "<td " + _class + " >" + font_start + data + font_end;
                            //_html_body += data + font_end + "</td>";
                        } else {
                            var _class = "";
                            _class += " style='white-space: normal;text-align:center'";
                            _html_body += "<td " + _class + " >";
                            _html_body += data;
                        }
                    }
                    _html_body += "</td>";
                })
            
            _html_body += "</tr>";
        });

    });
    $("#tableSk_ddjg thead").append(_html_th);
    $("#tableSk_ddjg tbody").append(_html_body);
}

function get_ddjg_xx_data() {
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: apiUrl_cloud +"api-hwhydroinfo/get_SingleSchedualDetailgcdd",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        data: info,
        success: function (data) {
            var res = data;

            if (res.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }

            var json = res.data;
            json_data = json;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
                $(".report-ddjg .icon-close").click();
            } else {
                tools.loadinghide(true);
                create_ddjg_table_xx(json_data);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}
function create_ddjg_table_xx(json) {
    //先清空数据
    $("#tableXx_ddjg thead tr").remove();
    $("#tableXx_ddjg tbody tr").remove();

    //$("#panel_ddjg .modal-title").html(ddjg_table_name + "方案结果");
    //表头
    var _html_th = "<tr>";
    var _html_body = "";
    $.each(json.dataName, function (index, item) {
            $.each(item, function (i, data) {
                if (i < item.length - 2) {
                    _html_th += "<th>" + data + "</th>";
                }
            });
         
    });
    _html_th += "</tr>";
    //表体

    $.each(json.data, function (index, item) {
        _html_body += "<tr>";
        $.each(item, function (index_inner, item_inner) {

            $.each(item_inner, function (i, data) {
                if (i < item_inner.length - 2) {
                    // if (i == 1) {
                    //     var _class = "";
                    //     _class += " style='white-space: normal;text-align:center'";
                    //     _html_body += "<td " + _class + " >";
                    //     _html_body += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_ddjg(\"" + data + "\"" + ",\"" + item_inner[item_inner.length - 2] + "\",\"" + item_inner[item_inner.length - 1] + "\");'>" + data + "</a></font></span>";
                    // } else {
                        var _class = "";
                        _class += " style='white-space: normal;text-align:center'";
                        _html_body += "<td " + _class + " >";
                        _html_body += data;
                    // }
                }
                _html_body += "</td>"
            })
            _html_body += "</tr>";
        });

    });
    $("#tableXx_ddjg thead").append(_html_th);
    $("#tableXx_ddjg tbody").append(_html_body);
}