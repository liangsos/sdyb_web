/**
 * 一键预报
 * 当用户没有进行任何条件选择时，直接点击预报计算弹出该面板
 * 让用户进行预报条件选择
 */
function yb_yjyb_PanelShow() {
    $("#panel_yjyb").show();
    tools.showPanelIndex("panel_yjyb");
    //初始化时间
    tools.init_datarangepicker("#form_yjyb .form-date", "YYYY-MM-DD HH:mm");
    $('#form_yjyb #panel_beginTime_yjyb').data('daterangepicker').setStartDate($("#beginTime").val());
    $('#form_yjyb #panel_beginTime_yjyb').data('daterangepicker').setEndDate($("#beginTime").val());
    $('#form_yjyb #panel_endTime_yjyb').data('daterangepicker').setStartDate($("#endTime").val());
    $('#form_yjyb #panel_endTime_yjyb').data('daterangepicker').setEndDate($("#endTime").val());
    //历史洪水
    $("#tm_lshs_yjyb").val(getCookie("tm_lshs_yjyb") == null ? 1 : getCookie("tm_lshs_yjyb"));
    if ($("#tm_lshs_yjyb").val() > 0) {
        $("#panel_beginTime_yjyb").attr("disabled", "disabled");
        $("#panel_endTime_yjyb").attr("disabled", "disabled");
    } else {
        $("#panel_beginTime_yjyb").removeAttr("disabled");
        $("#panel_endTime_yjyb").removeAttr("disabled");
    };

    //预报情景设置
    $("#select_Days_yjyb").val(selectDays);
    $("input[name='fdxs_model_yjyb'][value='" + _plusType + "']").attr("checked", true);
    $('#dsz_yjyb').val(_rainPlus);
    $('#selectLSQJ_yjyb').val();
    $("input[name='sjy_model_yjyb'][value='1']").attr("checked", true);

    //模型选择
    getModelsByRange("checkModel_yjyb");
    

}
//关闭按钮事件
$("#panel_yjyb .icon-close-new,#panel_yjyb .btn_cancel").click(function () {
    $("#panel_yjyb").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_yjyb");
});

//时间选择改变事件(开始时间改变后，默认结束时间往后推3天)
$("#panel_beginTime_yjyb").change(function (e, value) {
    if(value ==undefined)
    return;

    //   alert((value));
    var btime = value;
    var etime = tools.addDate(btime, 3)
    $("#panel_endTime_yjyb")[0].value = etime;
    $("#panel_endTime_yjyb").data('daterangepicker').setStartDate(etime);
    $("#panel_endTime_yjyb").data('daterangepicker').setEndDate(etime);

})
//报表通用可拖拽事件
$("#panel_yjyb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$("#panel_yjyb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_yjyb .btn_ok").click(function () {
    var btime = $("#panel_yjyb #panel_beginTime_yjyb").val();
    var etime = $("#panel_yjyb #panel_endTime_yjyb").val();
    searchStime = btime + ":00";
    searchEtime = etime + ":00";

    $('.serach-tm #beginTime').data('daterangepicker').setStartDate(btime);
    $('.serach-tm #beginTime').data('daterangepicker').setEndDate(btime);
    $('.serach-tm #endTime').data('daterangepicker').setStartDate(etime);
    $('.serach-tm #endTime').data('daterangepicker').setEndDate(etime);

    setCookie("beginTime", btime);
    setCookie("endTime", etime);
    setCookie("tm_lshs_yjyb", $("#tm_lshs_yjyb").val());

    if ($("#tm_lshs_yjyb").val() == 4) {
        $("#show_autoFore").prop("checked", true);
    }

    //预报情景确定
     searchPlan = $("#selectPlan_yjyb").val();
     selectDays = $("#select_Days_yjyb").val();
     if (searchPlan == 1) {
         _plusType = Number($('input[type=radio][name=sjy_model_yjyb]:checked').val());
         //获取分区面雨量，生成分区面雨量预报表
         if (_plusType == 0) { //面平均
             meteor = "";
         } else { //模式
             meteor = $("#selectDataFrom_yjyb option:checked").val();
         }
     } else {
         _plusType = Number($('input[type=radio][name=fdxs_model_yjyb]:checked').val());
         _hisStormId = searchPlan == 2 ? ($('#selectLSQJ_yjyb').val() == null ? -1 : $('#selectLSQJ_yjyb').val()) : (searchPlan == 3 ? ($('#selectBYYZ_yjyb').val() == null ? -1 : $('#selectBYYZ_yjyb').val()) : -1);
     }
     _rainPlus = $('#dsz_yjby').val() == "" ? 0 : Number($('#dsz_yjby').val());

    //模型选择确认
    selectModes = getModel();
    $(".show_bfs").hide();
    // $(".show_nynl").hide();
    //纳雨能力
    // if (selectModes.indexOf("NYNL") > -1) {  ——取消纳雨能力勾选时右侧控制面板才显示-2022.6.25 mdf by chl
    //     $(".show_nynl").show();
    //     //贝叶斯概率预报模型
    //     if (selectModes.indexOf("BFS") > -1) {
    //         $(".show_bfs").show();
    //         $("#show_bfs").css("margin-left", "20px")
    //     } else {
    //         $(".show_bfs").hide();
    //     }
    //     $(".show_nynl").parent().show();
    // }
    //贝叶斯概率预报模型
    if (selectModes.indexOf("BFS") > -1) {
        $(".show_bfs").show();
        // if (selectModes.indexOf("NYNL") > -1) {
        //     $(".show_nynl").show();
        // } else {
        //     $(".show_nynl").hide();
        //     $("#show_bfs").css("margin-left", "0")
        // }
        $(".show_bfs").parent().show();
    }
    
    $("#panel_yjyb").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_yjyb");

    //预报计算——判断方案是否已经计算
    yb_modelIsCal()
})

$("#tm_lshs_yjyb").change(function () {
    var _value = $("#tm_lshs_yjyb").val();
    var s_tm = ""
    var e_tm = ""

    if (_value > 0) {
        $("#panel_beginTime_yjyb").attr("disabled", "disabled");
        $("#panel_endTime_yjyb").attr("disabled", "disabled");
      
        if (_value == 1) {
            s_tm = "2020-08-12 08:00";
            e_tm = "2020-08-14 12:00";
        }
        else if (_value == 2) {
            s_tm = "2019-08-09 08:00";
            e_tm = "2019-08-11 14:00";
        }
        else if (_value == 3) {
            s_tm = "2018-08-17 08:00";
            e_tm = "2018-08-19 20:00";
        }
    }
    else {
        $("#panel_beginTime_yjyb").removeAttr("disabled");
        $("#panel_endTime_yjyb").removeAttr("disabled");
        s_tm = moment().add(-3, 'days').format("YYYY-MM-DD 08:00");
        e_tm = moment().format("YYYY-MM-DD 08:00");
    }
    $('#panel_beginTime_yjyb').data('daterangepicker').setStartDate(s_tm);
    $('#panel_beginTime_yjyb').data('daterangepicker').setStartDate(s_tm);
    $('#panel_endTime_yjyb').data('daterangepicker').setStartDate(e_tm);
    $('#panel_endTime_yjyb').data('daterangepicker').setStartDate(e_tm);

})
/**
 * 预报情景设置
 */
$('input[type=radio][name=fdxs_model_yjyb]').change(function (e) {
    //debugger;

    if ($('input[name=fdxs_model_yjyb]:checked').val() == '0') {
        $("#dsz_label_yjyb").html("增大值:(%)");
        $("#dsz_yjby").css("margin-left", "20px");
    } else if ($('input[name=fdxs_model_yjyb]:checked').val() == '1') {
        $("#dsz_label_yjyb").html("增大值:");
        $("#dsz_yjby").css("margin-left", "20px");
    }

});
/**
 * 气象预估数据源切换事件
 */
$('input[type=radio][name=sjy_model_yjyb]').change(function (e) {
    //debugger;
    if ($('input[name=sjy_model_yjyb]:checked').val() == '0') {
        $("#selectDataFrom_yjyb").attr("disabled", "disabled");
        //获取分区面雨量，生成分区面雨量预报表
        get_rainReport_data(searchRange, searchEtime);
        //预报情景面板禁用
        $("#panel_yjyb").addClass('div-not-click');
    } else if ($('input[name=sjy_model_yjyb]:checked').val() == '1') {
        $("#selectDataFrom_yjyb").attr("disabled", false);
    }
});
$("#selectPlan_yjyb").change(function () {
    //debugger;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    var temp_searchPlan = $("#selectPlan_yjyb").val();

    if (temp_searchPlan == 0) {
        $("#dataFrom_yjyb").hide();
        $("#dataFromOption_yjyb").hide();
        $("#magnifiedForm_yjyb").show();
        $("#IncValue_yjyb").show();
        $("#selectLSQJ_yjyb").hide();
        $("#selectBYYZ_yjyb").hide();
    } else if (temp_searchPlan == 1) {
        $("#dataFromOption_yjyb").show();
        $("#dataFrom_yjyb").show();
        $("#magnifiedForm_yjyb").hide();
        $("#IncValue_yjyb").hide();
        $("#selectLSQJ_yjyb").hide();
        $("#selectBYYZ_yjyb").hide();
        //调用接口
        var objData = {
            range: searchRange,
        };
        var info = JSON.stringify(objData);
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_cloud + "api-rainsituation/real/getPrecipMode",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success: function (res) {
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error_const("获取降水模式失败!");
                    return;
                }

                $("#selectDataFrom_yjyb").html("");
                var _html = "";
                $.each(res.data, function (index, item) {
                    _html += "<option value='" + item.sourceCode + "'>" + item.sourceName + "</option>";
                })

                $("#selectDataFrom_yjyb").html(_html);
                $("#selectDataFrom_yjyb").show();
                if ($('input[name=sjy_model_yjyb]:checked').val() == '0') {
                    $("#selectDataFrom_yjyb").attr("disabled", "disabled");
                }

                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取历史典型降水失败!");
                return;
            }
        });
    } else if (temp_searchPlan == 2) {
        $("#dataFrom_yjyb").hide();
        $("#dataFromOption_yjyb").hide();
        $("#magnifiedForm_yjyb").show();
        $("#IncValue_yjyb").show();
        $("#selectBYYZ_yjyb").hide();
        //调用接口
        var objData = {
            range: searchRange,
        };
        var info = JSON.stringify(objData);

        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: true,
            url: apiUrl_cloud + "api-rainsituation/real/getWshedFloodInfo",
            data: info,
            headers: {
                "Authorization": getCookie("accessToken")
            },
            success: function (res) {
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error_const("获取历史典型降水失败!");
                    return;
                }

                $("#selectLSQJ_yjyb").html("");
                var _html = "";
                $.each(res.data, function (index, item) {
                    _html += "<option value='" + item.floodId + "'>" + item.name + "</option>";
                })

                $("#selectLSQJ_yjyb").html(_html);
                $("#selectLSQJ_yjyb").show();

                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取历史典型降水失败!");
                return;
            }
        });

    } else if (temp_searchPlan == 3) {
        $("#dataFrom_yjyb").hide();
        $("#dataFromOption_yjyb").hide();
        $("#magnifiedForm_yjyb").show();
        $("#IncValue_yjyb").show();
        $("#selectLSQJ_yjyb").hide();
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

                } else {
                    $("#selectBYYZ_yjyb").html("");
                    var _html = "";
                    $.each(json.data, function (index, item) {
                        _html += "<option value='" + item.id + "'>" + item.name + "</option>";

                    })

                    $("#selectBYYZ_yjyb").html(_html);
                    $("#selectBYYZ_yjyb").show();

                    return;
                }
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取暴雨移植信息失败!");
                return;
            }
        });
    }
});