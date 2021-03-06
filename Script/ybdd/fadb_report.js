//# sourceURL=fadb_report.js
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 440;

var json_data = null;
var json_data_detail = null;
var fadb_table_name = "方案对比";
var fb_dd_yb_type = 1;
$(document).ready(function () {
    $(document).bind("contextmenu", function (e) {
        return false;
    });
});


//最大化按钮事件
$(".report-fadb .icon-max").click(function () {
    //console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
        });

        //动态设置报表高度
        setParSizeFadb($(this).parent().parent().parent().attr("id"), default_par_width_report, default_par_height_report);
        $(this).attr("data-type", "");
        //console.log("min/" + $(this).attr("data-type") + "/" + default_par_width_report + "/" + default_par_height_report);
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setParSizeFadb($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
        //console.log("max/" + $(this).attr("data-type") + "/" + $(window).width() + "/" + $(window).height());

    }
});
//关闭按钮事件
$(".report-fadb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");

});

//创建表格
function create_fadb_table(reportId, _width, json) {
    if (reportId == "panel_fadb") {
        //先清空数据
        $("#panel_fadb .tjfx-table-data_para-fadb table colgroup col").remove();
        $("#panel_fadb .tjfx-table-data_para-fadb table thead tr").remove();
        $("#panel_fadb .tjfx-table-data_para-fadb table tbody tr").remove();

        var base_index = fb_dd_yb_type == 1 ? 8 : 5;
        var ex_coloumn = fb_dd_yb_type == 1 ? json.datanm.length - base_index : json.dataName.length - base_index;
        if (ex_coloumn > 5) {
            ex_coloumn = 5;
        }
        var w_width = 1030;
        var _e_widht = 200;
        var _e_p_width = _e_widht / ex_coloumn;
        var _tx = ex_coloumn - 1 >= 0 ? ex_coloumn - 1 : 0
        var _l_p_width = _e_widht - _e_widht * _tx;
        var _mc_width = 60;


        var _p_width = 80;
        var _l_width = 80;
        var sgx = "";
        if (t_range >= 3) {
           /* if (fb_dd_yb_type == 1)
                sgx = "<span><font  style='color:#0000ff'>(<a href='#' onclick='showhgx_fadb()' >淮干水面线</a>)</font></span>";
        */}
        var _html_th = "<tr>";
        if (fb_dd_yb_type == 1) {
            _html_th += "<th style='width:" + (_mc_width) + "px;' class='th-click' rowspan='2'>方案名称</th>";
            _html_th += "<th style='width:" + (_p_width * 3) + "px;' class='th-click' colspan='3'>工程启用情况</th>";
        }
        else
            _html_th += "<th style='width:" + (_mc_width) + "px;' class='th-click' rowspan='2'>预报情景名称</th>";


        _html_th += "<th style='width:" + (_p_width * 2) + "px;' class='th-click' colspan='2'>水库情况</th>";
        _html_th += "<th style='width:" + (_p_width + _l_width) + "px;' class='th-click' colspan='2'>水文站点情况</th>";
        _html_th += "<th style='width:" + (_e_p_width * ex_coloumn) + "px;' class='th-click' colspan='" + ex_coloumn + "'>调度后重要站水位" + sgx + "</th>";
        _html_th += "</tr>";
        _html_th += "<tr>";

        if (fb_dd_yb_type == 1) {
            _html_th += "<th style='width:" + _p_width + "px;'>行洪区</th>";
            _html_th += "<th style='width:" + _p_width + "px;'>蓄洪区</th>";
            _html_th += "<th style='width:" + _p_width + "px;'>分洪河道</th>";
        }

        _html_th += "<th style='width:" + _p_width + "px;'>超汛限</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>超设计</th>";
        _html_th += "<th style='width:" + _p_width + "px;'>超警</th>";
        _html_th += "<th style='width:" + _l_width + "px;'>超保</th>";
        for (var i = 0; i < ex_coloumn; i++) {
            if (fb_dd_yb_type == 1) {
                var temp_col_name = json.datanm[base_index + i];
                if (temp_col_name == null)
                    temp_col_name = "";
                _html_th += "<th class='th-click' style='width:" + _e_p_width + "px;'>" + temp_col_name + "</th>";
            }
            else {
                var ex_stnm = json.dataName[base_index + i].replace("重点站水位", "");

                _html_th += "<th class='th-click' style='width:" + _e_p_width + "px;' ><a href='#' onclick='zdz_click(\"" + ex_stnm + "\")'  >" + ex_stnm + "</a></th>";

            }
        }
        _html_th += "</tr>";
        var _html_body = "";

        var shoulength = 25;
        if (fb_dd_yb_type == 1) {
            $.each(json.data, function (index, item) {
                _html_body += "<tr>";
                $.each(item, function (index_inner, item_inner) {
                    if (index_inner < base_index + ex_coloumn) {
                        var _style = "";
                        var _class = "";
                        _style += " style='white-space: normal;text-align:center'";
                          
                        if (index_inner == 0)
                            _class += "class=' td_middle'"

                        _html_body += "<td " + _class + _style + " >";
                        if ((item_inner == ".00") || (item_inner == "均未超") || (item_inner == "均未启用")) {
                            item_inner = "0";
                        }

                        if ((index_inner < base_index) && (index_inner > 0)) {
                            var arr_tx = item_inner.split(",");
                            var flag_index = item_inner.lastIndexOf("（");
                            if (flag_index > -1) {
                                var show_houzui = item_inner.substring(flag_index, item_inner.length);
                                var show_qianzui = item_inner.replace(show_houzui, "").replace(",", ", ");
                                show_houzui = show_houzui.replace("（", "").replace("）", "");
                                if (show_qianzui.length <= shoulength) {
                                    item_inner = show_qianzui;
                                }
                                else {
                                    item_inner = show_qianzui.substring(0, shoulength) + "...";
                                }
                                _html_body += item_inner;
                                _html_body += "<span><font style='color:#0000ff'>(<a href='#' onclick='show_detail_fadb(\"" + json.data[index][0] + "\",\"" + index_inner + "\");'>" + show_houzui + "</a>)</font></span>";
                            }
                            else
                                _html_body += item_inner;
                        } else if (index_inner == 0) {
                            _html_body += "<a class='fangan_name ' href='#' onclick='ddjg_click(this)' _data = '" + item_inner + "' >" + item_inner + "</a>";
                        } else {
                            _html_body += item_inner;
                        }

                        _html_body += "</td>";
                    }

                });
                _html_body += "</tr>";
            });
        }
        else {
            $.each(json.data, function (index, item) {
                _html_body += "<tr>";
                $.each(item, function (index_inner, item_inner) {
                    if (index_inner < base_index + ex_coloumn) {
                        var _style = "";

                        _style += " style='white-space: normal;text-align:center'";
                        _html_body += "<td " + _style + " >";
                        if ((item_inner == ".00") || (item_inner == "均未超") || (item_inner == "均未启用")) {
                            item_inner = "0";
                        }

                        if ((index_inner < base_index) && (index_inner > 0)) {
                            _html_body += item_inner;
                           /* var arr_tx = item_inner.split(",");
                            if (item_inner == "")
                                arr_tx = [];
                            if (item_inner.length <= shoulength) {
                                item_inner = item_inner;
                            }
                            else {
                                item_inner = item_inner.substring(0, shoulength) + "...";
                            }
                            _html_body += item_inner;
                            if (arr_tx.length > 0)
                                _html_body += "<span><font style='color:#0000ff'>(<a href='#' onclick='show_detail_fadb(\"" + json.data[index][0] + "\",\"" + index_inner + "\");'>" + arr_tx.length + "</a>)</font></span>";
*/
                        } else if (index_inner == 0) {
                            _html_body += item_inner;
                         //   _html_body += "<a href='#' onclick='ddjg_click(this)' _data = '" + item_inner + "' >" + item_inner + "</a>";
                        } else {
                            _html_body += item_inner;
                        }

                        _html_body += "</td>";
                    }

                });
                _html_body += "</tr>";
            });
        }


        $("#panel_fadb .tjfx-table-data_para-fadb table thead").append(_html_th);
        $("#panel_fadb .tjfx-table-data_para-fadb table tbody").append(_html_body);

    }
    else if (reportId == "panelTjfx_DdDetail") {
        //先清空数据
        $("#panelTjfx_DdDetail .tjfx-table-data table colgroup col").remove();
        $("#panelTjfx_DdDetail .tjfx-table-data table thead tr").remove();
        $("#panelTjfx_DdDetail .tjfx-table-data table tbody tr").remove();


        var len_tm = 0;
        var len_bwf = 0;
        $.each(json.dataName, function (index, item) {
            if (tools.islaststr(item, "时间") && (index != json.dataName.length - 1)) {
                len_tm++;
            }
            if (tools.islaststr(item, "百万方）") && (index != json.dataName.length - 1)) {
                len_bwf++;
            }
        });
        var w_tm = 150;
        var w_name = 110;
        var w_bwf = 135;
        var _html_th = "<tr>";
        var w_width = 1030;
        var w_xh = 40;
        var w_other = w_width - w_xh - len_tm * w_tm - w_bwf * len_bwf - w_name;
        var _e_p_width = w_other / (json.dataName.length - 2 - len_tm - len_bwf);
        var _l_p_width = w_other - _e_p_width * (json.dataName.length - 3 - len_tm - len_bwf);
        $.each(json.dataName, function (index, item) {
            if (index == 0)
                _html_th += "<th class='th-click' style='width:" + w_xh + "px;'>" + item + "</th>";
            else if (index == 1)
                _html_th += "<th class='th-click' style='width:" + w_name + "px;'>" + item + "</th>";
            else if (index != (json.dataName.length - 1))
                if (tools.islaststr(item, "时间"))
                    _html_th += "<th class='th-click' style='width:" + w_tm + "px;'>" + item + "</th>";
                else if (tools.islaststr(item, "百万方）"))
                    _html_th += "<th class='th-click' style='width:" + w_bwf + "px;'>" + item + "</th>";
                else
                    _html_th += "<th class='th-click' style='width:" + _e_p_width + "px;'>" + item + "</th>";
            else
                _html_th += "<th class='th-click' style='width:" + _l_p_width + "px;'>" + item + "</th>";
        });

        _html_th += "</tr>";
        var _html_body = "";

        $.each(json.data, function (index, item) {
            _html_body += "<tr>";
            $.each(item, function (index_inner, item_inner) {

                var _style = "";

                _style += " style='white-space: normal;text-align:center'";
                _html_body += "<td " + _style + " >";
                if (item_inner == ".00") {
                    item_inner = "0";
                }
                if (index_inner == 1) {
                    _html_body += "<span><font style='color:#0000ff'><a href='#' onclick='show_gcxdetail_fadb(\"" + item_inner + "\"," + json.ddxxflid + ",1);'>" + item_inner + "</a></font></span>";

                }
                else
                    _html_body += item_inner;


                _html_body += "</td>";

            });
            _html_body += "</tr>";
        });

        $("#panelTjfx_DdDetail .tjfx-table-data table thead").append(_html_th);
        $("#panelTjfx_DdDetail .tjfx-table-data table tbody").append(_html_body);
    }
    var arr_fangan = document.getElementsByClassName("fangan_name");
    $.each(arr_fangan, function (index, item) {
        $(item).unbind("mousedown", (function (e) { }));
        $(item).bind("mousedown", (function (e) {
            if (e.which == 3) {

                var opertionn = {
                    name: arr_fangan[index].innerHTML,
                    offsetX: 10,
                    offsetY: 8,
                    textLimit: 10,
                    beforeShow: $.noop,
                    afterShow: $.noop
                };

                var imageMenuData = [
        [{
            text: "删除",
            func: function (opertionn) {
             
                deleteDisPatchPlan(this.innerHTML);
            }
        }]
                ];
                if (e.target.innerHTML != "规则调度")
                    $(this).smartMenu(imageMenuData, opertionn);
            }
        }));
    })


}
function deleteDisPatchPlan(_schedulePlanName)
{
   // alert(_schedulePlanName);
    
    var objData = {
        adjust: 1,
        day: Number(selectDays),
        dbfxddfa: _schedulePlanName,
        etime: searchEtime,
        hisStormId: _hisStormId,
        // modelid: getRadioModel(),
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        // scheduleType: 3,
        stime: searchStime,
        stcd: ""
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
        url: apiUrl_cloud + "api-hwhydroinfo/DeleteFA",
        data: info,
        success: function (res) {
            if (res == "" || res == null) {
                tools.show_message_error_const("删除调度方案失败！");
                return;
            }

            var json = res;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
     
            } else {

                tools.show_message_success(json.msg)
                get_fadb_data(searchRange, searchPlan, searchStime, searchEtime, $("#_hid_userid").val(), selectDays, 9999);
                return;
            }
        },
        error: function (errorMsg) {

            tools.show_message_error_const("删除调度方案失败！");
        }

    });

}
function zdz_click(stnm) {
    show_gcxdetail_fadb(stnm, "5", 2);

    return;
}
function tableHeader_fadb() {
    if ($("#tableid_fadb").length > 0) {
    } else {
        $("#panel_fadb_table").parent().prepend(
        '<table id="tableid_fadb" class="table" ><thead>' + $("#panel_fadb_table thead").html() + '</thead></table>'
        ).css({
            'position': 'relative',
            'overflow-y': 'auto'
        })
    }

    $("#tableid_fadb").find('th').each(function (i) {
        $(this).css('width', $('#panel_fadb_table').find('th:eq(' + i + ')').width());
    });
    $("#tableid_fadb").css({
        'position': 'absolute',
        'table-layout': 'fixed',
        'top': '0',
        'left': 0,
        'z-index': 2
    })
    $("#panel_fadb_table").css({
        'position': 'absolute',
        'top': 0,
        'left': 0
    })
    $('.tjfx-table-data_para-fadb').scroll(function () {
        if ($('.tjfx-table-data_para-fadb').scrollTop() > 0) {
            $("#tableid_fadb").css('top', $('.tjfx-table-data_para-fadb').scrollTop());
        } else {
            $("#tableid_fadb").css('top', 0);
        }
    });
}

//报表通用改变大小事件
$(".report-fadb").resizable({
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
    setParSizeFadb($(event.target).attr("id"), ob.size.width, ob.size.height);
}
function setParSizeFadb(reportId, width, height, json) {
    // console.log(width + "/" + height);
    initTableDiv(reportId);

    $("#" + reportId).width(width).height(height);
    if (reportId == "panel_fadb") {
        create_fadb_table(reportId, width - 15, json_data);
        $("#panel_fadb .tjfx-table-data_para-fadb").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "overflow-y": "auto"
        });
        $("#panel_fadb .tjfx-table-data_para-fadb").height(height - 45 - 32);
    }
    else if (reportId == "panelTjfx_DdDetail") {
        create_fadb_table(reportId, width - 15, json_data_detail);
        $("#panelTjfx_DdDetail .tjfx-table-data").css({
            "width": "100%",
            "padding-right": tools.scroll_default_width + "px",
            "overflow-y": "auto"
        });
        $("#panelTjfx_DdDetail .tjfx-table-data").height(height - 45);
    }
    else if (reportId == "panel_hgsmx") {
        var _info_height = 60;
        $("#hgsmx_echart").width(width).height(height - _info_height - 32);
        $("#hgsmx_info").width(width).height(_info_height);
        if (chart_hgsmx != null)
            chart_hgsmx.resize();

    }

    tableHeader_fadb();
}
//报表通用可拖拽事件
$(".report-fadb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-fadb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 获取参数信息
 */
function get_fadb_data(_range, _plan, _stime, _etime, _userId, _selectDays, _fb_dd_yb_type, _selectData_modelId, _selectData_hisStormId) {
    if (_fb_dd_yb_type == undefined)
        _fb_dd_yb_type = 1;

    
    fb_dd_yb_type = _fb_dd_yb_type;
    t_range = _range;
    t_stime = _stime;
    t_etime = _etime;
    t_userId = _userId;
    t_plan = _plan;
    t_day = _selectDays;

    if (fb_dd_yb_type == 2) {
        tools.loadingshow("查询预报情景对比信息中...", arrRange_fabj_lodingtime[Number(searchRange) - 1]);
        $("#panel_fadb").find(".modal-title").html("情景对比");

        var searchStime = $("#beginTime").val() + ":00";
        var searchEtime = $("#endTime").val() + ":00";
        var searchPlan = $("#selectPlan").val();
       // var selectModes = getModel();
       
        //实时预报演算
        var objData = {
            adjust: 1,
            endTime: _etime,
            foreDays: Number(t_day),
            model: selectModes,
            modelId: _selectData_modelId,
            plusType: _plusType,
            rainPlus: _rainPlus,
            hisStormIds: _selectData_hisStormId,
            plan: Number(t_plan),
            range: Number(t_range),
            startTime: t_stime,
            stcd: ""
        };

        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl + "Forecast/GetForecastDbfx",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success: function (data) {
                var json = data;
                if (json.code == "0") {
                    tools.loadinghide(false);
                    tools.show_message_error("查询预报情景对比信息失败!");
                }
                else {
                    json_data = json.data;
                    tools.loadinghide(true);
                    $("#panel_fadb").show();
                    tools.showPanelIndex("panel_fadb");
                    setParSizeFadb("panel_fadb", default_par_width_report, default_par_height_report);
                    return;
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("查询预报情景对比信息失败!");

            }
        })
    }
    else if ((fb_dd_yb_type == 1)||(fb_dd_yb_type==9999)) {
        tools.loadingshow("查询调度方案对比信息中...", arrRange_fabj_lodingtime[Number(searchRange) - 1]);
        $("#panel_fadb").find(".modal-title").html("方案对比");
       

        var objData = {
            adjust: 1,
            autoFore:0,
            day: t_day,
            etime: _etime,
            hisStormId: _hisStormId,
            plan: t_plan,
            plusType: _plusType,
            rainPlus: _rainPlus,
            range: _range,
            stime: _stime,
            modelid: getRadioModel(),
            meteorPattern: meteor
        };
        var info = JSON.stringify(objData);
        json_data = null;

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: true,
            dataType: 'json',
            url: apiUrl_cloud + "api-hwhydroinfo/getDispachInfo",
            headers: {
                "Authorization": getCookie("accessToken")
            },

            data: info,
            success: function (res) {

                if (res.code != 200) {
                    tools.loadinghide(false);

                    tools.show_message_error_const("获取调度方案对比信息失败！");
                    return;
                }

                var json = res.data;
                json_data = json;
                if (json.code == "0") {
                    tools.loadinghide(false);

                    tools.show_message_error_const(json.msg);
                    $(".report-fadb .icon-close").click();
                } else {
                   
                    if (fb_dd_yb_type == 9999)
                    {
                        fb_dd_yb_type = 1;
                        tools.loadinghide(true);
                        create_fadb_table("panel_fadb", $("#panel_fadb").width()-15, json_data);
                    }
                    else {
                        tools.loadinghide(true);
                        $("#panel_fadb").show();
                        tools.showPanelIndex("panel_fadb");
                        setParSizeFadb("panel_fadb", default_par_width_report, default_par_height_report);

                    }
                    return;
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败");
            }

        });
    }



}
function initTableDiv(reportId) {

    $("#" + reportId + " .tjfx-table-data_para-fadb").empty();
    var _html = "<table id='" + reportId + "_table' class='table' style='table-layout: fixed'><colgroup></colgroup><thead></thead><tbody></tbody></table >";
    $("#" + reportId + " .tjfx-table-data_para-fadb").append(_html);
    $("#" + reportId + " .tjfx-table-data_para-fadb").css({
        "height": "440px",
        "overflow-y": "scroll"
    });



};

function show_gcxdetail_fadb(_stnm, strtype, dd_yb_type) {
    if (t_range < 6) {
        var res = tools.getInfoBystnm(_stnm, "5");
    } else {
        var res = tools.getInfoBystnm(_stnm, "9");
    }
    if (res != "") {

        var _stcd = res.split(',')[1];
        var _sttp = res.split(',')[2];

        if (_stcd != "") {

            show_report_gcx(t_range, _stcd, t_stime, t_etime, t_userId, _stnm, _sttp, t_day, t_plan, dd_yb_type);
        }
    }


};
function show_detail_fadb(_ddname, _typeid) {
    show_report_fxbjDetail_fadb(_ddname, _typeid);
}

function showhgx_fadb() {
    var objData = {
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        plan: t_plan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: t_day
    };
    chart_data = null;
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cbh + "get_Hhgl_SmxTm",
        data: info,

        success: function (data) {
            tools.loadinghide(false);
            if (data == null || data == "") {
                tools.loadinghide(false);
                tools.show_message_error("查询淮干水面线信息失败!");
                return;
            }

            var json = data;
            chart_data = json;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                $("#panel_hgsmx").show();
                tools.showPanelIndex("panel_hgsmx");
                setReportSize("panel_hgsmx", default_width_report, default_height_report);

                initChart_hgsmx_fadb(chart_data);
                add_click_gcx_comon();
                return;
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询淮干水面线信息失败!");
            return;
        }
    });
}

function initChart_hgsmx_fadb(json) {

    var tm_indexFromlast = 4;
    chart_hgsmx = null;
    chart_hgsmx = echarts.init(document.getElementById('hgsmx_echart'));

    series_data = null;
    tm_data = null;
    minmax_data = null;
    legend_data = null;

    var xAxis_data = new Array();
    legend_data = new Array();

    series_data = new Array();
    tm_data = new Array();
    minmax_data = new Array();
    cur_animation_index = 0;
    var data_len = 0;

    //json.dataname.length - 4，时间列
    $.each(json.data, function (index, item) {
        xAxis_data.push(item[0]);
        data_len = item[json.dataname.length - tm_indexFromlast].length;
        tm_data = $.extend(true, [], item[json.dataname.length - tm_indexFromlast]);
    });

    //外层data_len，内层json.data.length，每次显示json.data.length个点数据，
    $.each(json.dataname, function (index, item) {
        if ((index != 0) && (index != json.dataname.length - tm_indexFromlast)) {
            legend_data.push(item);
            var arr_l_data = new Array();
            for (var i = 0; i < data_len; i++) {
                var arr_t_data = new Array();
                $.each(json.data, function (inner_index, inner_item) {
                    arr_t_data.push(inner_item[index][i]);
                });
                arr_l_data.push(arr_t_data);
            }
            series_data.push(arr_l_data);
        }
    });
    //外层data_len，内层json.data.length，每次显示json.data.length个点数据，





    for (var i = 0; i < data_len; i++) {

        var arr_minmax_data = new Array();
        var min = 99999;
        var max = -99999;
        $.each(json.dataname, function (index, item) {
            if ((index != 0) && (index != json.dataname.length - tm_indexFromlast)) {
                $.each(json.data, function (inner_index, inner_item) {
                    min = Math.min(Number(inner_item[index][i]), min);
                    max = Math.max(Number(inner_item[index][i]), max);

                });
            }
        });
        arr_minmax_data.push(min, max);
        arr_minmax_data[0] = arr_minmax_data[0] - 1 < 0 ? 0 : Math.round(Number(arr_minmax_data[0] - 1), 0);
        arr_minmax_data[1] = Math.round(Number(arr_minmax_data[1] + 1), 0);
        minmax_data.push(arr_minmax_data);
    }


    var arr_series = new Array();
    $.each(legend_data, function (index, item) {
        console.log(item);
        arr_series.push({
            name: item,
            type: 'line',
            yAxisIndex: 0,
            symbol: "circle",
            z: 5,
            itemStyle: {
                color: (item == "警戒水位" ? colors[colors.length - 2] : (item == "保证水位" ? colors[colors.length - 1] : (item == "实时水位" ? colors[colors.length - 3] : colors[index]))),


            },
            lineStyle: {
                width: 2,
                type: ((item == "警戒水位") || (item == "保证水位") || (item == "实时水位")) ? 'dashed' : 'solid'  //'dotted'虚线 'solid'实线
            },
            showSymbol: true,
            data: series_data[index][cur_animation_index]
        });
    });


    var option = {
        title: {
            text: '淮干水面线图表\n(' + moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + "-" + moment((tm_data[tm_data.length - 1] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时") + ")",
            textStyle: {
                fontSize: 16
            },
            left: "center"
        },
        grid: {
            left: 25,
            top: 80,
            right: 25,
            bottom: 20,
            containLabel: true
        },
        tooltip: {},
        legend: {
            show: true,
            top: 40,
            left: "center",
            itemWidth: 20,
            itemHeight: 8,
            itemGap: 8,
            padding: [8, 100, 8, 80],
            data: legend_data
        },

        tooltip: {
            trigger: "axis",
            formatter: function (ob) {
                if (ob != null && ob.length > 0) {
                    return tools.format_tooltip_chart_hgx(ob, moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
                } else {
                    return "";
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis_data
        },
        yAxis: {
            type: 'value',
            name: '水位(m)',
            min: minmax_data[0][0],
            max: minmax_data[0][1]
        },
        series: arr_series
    };
    option = tools.initChartlegendIcon(option);
    // 使用刚指定的配置项和数据显示图表。
    chart_hgsmx.setOption(option, true);

    $("#hgsmx_tm_info").html(moment((tm_data[0] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));

}

/**
* 过程线图例点击事件(通用)
**/
function add_click_gcx_comon() {
    chart_hgsmx.off("legendselectchanged");
    chart_hgsmx.on("legendselectchanged", function (params) {
        if (params.name in params.selected) {
            var state = params.selected[params.name];
            var option = tools.selectchangeChartlegendIcon(chart_hgsmx.getOption(), state, params.name);
            chart_hgsmx.setOption(option, true);
        }


    });
}

$("#btn_hgsmx_start").click(function (event) {
    if (hgx_interval != null) {
        return;
    }
    hgx_interval = setInterval(refreshData, 500);
});
$("#btn_hgsmx_pause").click(function (event) {
    if (hgx_interval != null) {
        clearInterval(hgx_interval);
        hgx_interval = null;
    }

});
$("#btn_hgsmx_reset").click(function (event) {
    $("#btn_hgsmx_pause").click();
    resetDatafadb();
});
function resetDatafadb() {
    if (!chart_hgsmx) {
        return;
    }
    cur_animation_index = 0;
    //更新数据
    var option = chart_hgsmx.getOption();
    $.each(legend_data, function (index, item) {
        option.series[index].data = series_data[index][cur_animation_index];
    });
    option.yAxis.min = minmax_data[cur_animation_index][0];
    option.yAxis.max = minmax_data[cur_animation_index][1];
    $("#hgsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_hgsmx.setOption(option, true);
}
function refreshData() {
    if (!chart_hgsmx) {
        return;
    }
    cur_animation_index++;
    if (cur_animation_index >= tm_data.length) {
        cur_animation_index = 0;
    }
    //更新数据
    var option = chart_hgsmx.getOption();
    $.each(legend_data, function (index, item) {
        option.series[index].data = series_data[index][cur_animation_index];
    });
    option.yAxis.min = minmax_data[cur_animation_index][0];
    option.yAxis.max = minmax_data[cur_animation_index][1];
    $("#hgsmx_tm_info").html(moment((tm_data[cur_animation_index] + "").replace(".0", "").replace(new RegExp(/-/gm), "/")).format("YYYY年MM月DD日HH时"));
    chart_hgsmx.setOption(option, true);
}


function gettypename(_typeid) {
    var _typename = "";
    if (_typeid == "1") {
        _typename = "工程启用-行洪区";
    }
    else if (_typeid == "2") {
        _typename = "工程启用-蓄洪区";
    }
    else if (_typeid == "3") {
        _typename = "工程启用-分洪河道";
    }
    else if (_typeid == "4") {
        _typename = "水库-超汛限";
    }
    else if (_typeid == "5") {
        _typename = "水库-超设计";
    }
    else if (_typeid == "6") {
        _typename = "水文站点-超警";
    }
    else if (_typeid == "7") {
        _typename = "水文站点-超保";
    }
    return _typename;
}

function show_report_fxbjDetail_fadb(_ddname, _typeid) {
    $("#span_loading").html("查询更多信息中...");

    $(".loading-layer").show();
    var objData = {
        autoFore: 0,
        range: t_range,
        stime: t_stime,
        etime: t_etime,
        plan: t_plan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        dbfxddfa: _ddname,
        dbfxid: _typeid,
        day: t_day,
        modelid: getRadioModel()
    };
    $("#panelTjfx_DdDetail").find(".modal-title").html(gettypename(_typeid));

    var info = JSON.stringify(objData);
    json_data_detail = null;
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/get_Dbfx_DetailInfo",
        data: info,
        success: function (data) {
            tools.loadinghide(false);
            if (data.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error("查询更多信息失败!");
                return;
            }

            var json = data.data;
            json_data_detail = json;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                $("#panelTjfx_DdDetail").show();
                tools.showPanelIndex("panelTjfx_DdDetail");
                setReportSize("panelTjfx_DdDetail", default_width_report, default_height_report);
                return;
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询更多信息失败!");
            return;
        }
    });
}

function ddjg_click(obj) {
    var ddfaName = obj.innerHTML;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();
    var userId = $("#_hid_userid").val();
    get_ddjgReport_data(searchRange, searchStime, searchEtime, ddfaName, userId, searchPlan, selectDays);
}