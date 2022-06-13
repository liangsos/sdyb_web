//关闭按钮事件
$("#panel_jysz .icon-close-new,#panel_jysz .btn_cancel").click(function () {
    $("#panel_jysz").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_jysz");

});

//报表通用可拖拽事件
$("#panel_jysz").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$("#panel_jysz").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_jysz .btn_ok").click(function () {
    debugger
    searchPlan = $("#selectPlan").val();
    selectDays = $("#select_Days").val();
    if (searchPlan == 1) {
        _plusType = Number($('input[type=radio][name=sjy_model]:checked').val());
        //获取分区面雨量，生成分区面雨量预报表
        if (_plusType == 0) { //面平均
            meteor = "";
        } else {//模式
            meteor = $("#selectDataFrom option:checked").val();
        }
    } else {
        _plusType = Number($('input[type=radio][name=fdxs_model]:checked').val());
        _hisStormId = searchPlan == 2 ? ($('#selectLSQJ').val() == null ? -1 : $('#selectLSQJ').val()) : (searchPlan == 3 ? ($('#selectBYYZ').val() == null ? -1 : $('#selectBYYZ').val()) : -1);
    }
    _rainPlus = $('#dsz').val() == "" ? 0 : Number($('#dsz').val());
   

    // meteor = $("#selectDataFrom option:checked").val();

    $("#panel_jysz").hide();
    yb_setSteps(2, ybddMapType);
})
 
function yb_jyjz_PanelShow() {
    $("#select_Days").val(selectDays);
    $("input[name='fdxs_model'][value='" + _plusType+"']").attr("checked", true);
    $('#dsz').val(_rainPlus);
    $('#selectLSQJ').val();
  //  $("#selectPlan").val(searchPlan);
  
  $("#panel_jysz").show();
  $("input[name='sjy_model'][value='1']").attr("checked", true);

    tools.showPanelIndex("panel_jysz");

}
$('input[type=radio][name=fdxs_model]').change(function (e) {
    //debugger;
    
    if ($('input[name=fdxs_model]:checked').val()== '0') {
        $("#dsz_label").html("增大值:(%)");
        $("#dsz").css("margin-left", "20px");
    }
    else if ($('input[name=fdxs_model]:checked').val() == '1') {
        $("#dsz_label").html("增大值:");
        $("#dsz").css("margin-left", "20px");
    }

});
/**
 * 气象预估数据源切换事件
 */
$('input[type=radio][name=sjy_model]').change(function (e) {
    //debugger;
    if ($('input[name=sjy_model]:checked').val() == '0') {
        $("#selectDataFrom").attr("disabled", "disabled");
        //获取分区面雨量，生成分区面雨量预报表
        get_rainReport_data(searchRange, searchEtime);
        //预报情景面板禁用
        $("#panel_jysz").addClass('div-not-click');
        // $("#panel_jysz").hide();
    } else if ($('input[name=sjy_model]:checked').val() == '1') {
        $("#selectDataFrom").attr("disabled", false);
    }
});
$("#selectPlan").change(function () {
    //debugger;
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    var temp_searchPlan = $("#selectPlan").val();

    if (temp_searchPlan == 0) {
        $("#dataFrom").hide();
        $("#dataFromOption").hide();
        $("#magnifiedForm").show();
        $("#IncValue").show();
        $("#selectLSQJ").hide();
        $("#selectBYYZ").hide();
    }else if (temp_searchPlan == 1) {
        $("#dataFromOption").show();
        $("#dataFrom").show();
        $("#magnifiedForm").hide();
        $("#IncValue").hide();
        $("#selectLSQJ").hide();
        $("#selectBYYZ").hide();
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
                debugger
                if (res.code != 200) {
                    tools.loadinghide(false);
                    tools.show_message_error_const("获取降水模式失败!");
                    return;
                }

                $("#selectDataFrom").html("");
                var _html = "";
                $.each(res.data, function (index, item) {
                    _html += "<option value='" + item.sourceCode + "'>" + item.sourceName + "</option>";
                })

                $("#selectDataFrom").html(_html);
                $("#selectDataFrom").show();
                 if ($('input[name=sjy_model]:checked').val() == '0') {
                     $("#selectDataFrom").attr("disabled", "disabled");
                 }
                $("#panel_jysz_box").height(350);

                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取历史典型降水失败!");
                return;
            }
        });
    } else if (temp_searchPlan == 2) {
        $("#dataFrom").hide();
        $("#dataFromOption").hide();
        $("#magnifiedForm").show();
        $("#IncValue").show();
        $("#selectBYYZ").hide();
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

                $("#selectLSQJ").html("");
                var _html = "";
                $.each(res.data, function (index, item) {
                    _html += "<option value='" + item.floodId + "'>" + item.name + "</option>";
                })

                $("#selectLSQJ").html(_html);
                $("#selectLSQJ").show();
                $("#panel_jysz_box").height(350);

                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取历史典型降水失败!");
                return;
            }
        });

    } else if (temp_searchPlan == 3) {
        $("#dataFrom").hide();
        $("#dataFromOption").hide();
        $("#magnifiedForm").show();
        $("#IncValue").show();
        $("#selectLSQJ").hide();
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
                    $("#selectBYYZ").html("");
                    var _html = "";
                    $.each(json.data, function (index, item) {
                        _html += "<option value='" + item.id + "'>" + item.name + "</option>";

                    })

                    $("#selectBYYZ").html(_html);
                    $("#selectBYYZ").show();
                    $("#panel_jysz_box").height(350);

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
    // else {
    //     $("#selectLSQJ").hide();
    //     $("#panel_jysz_box").height(320);
    // }
    // if (temp_searchPlan == 3) {
    //     $.ajax({
    //         type: 'post',
    //         contentType: "application/json; charset=utf-8",
    //         dataType: 'json',
    //         async: true,
    //         url: apiUrl_cloud + "api-rain/pros/transplantInfo",

    //         headers: {
    //             "Authorization": getCookie("accessToken")
    //         },
    //         success: function (data) {
    //             var json = data;
    //             if (json.code != 200) {
    //                 tools.loadinghide(false);

    //             }
    //             else {
    //                 $("#selectBYYZ").html("");
    //                 var _html = "";
    //                 $.each(json.data, function (index, item) {
    //                     _html += "<option value='" + item.id + "'>" + item.name + "</option>";

    //                 })

    //                 $("#selectBYYZ").html(_html);
    //                 $("#selectBYYZ").show();
    //                 $("#panel_jysz_box").height(350);

    //                 return;
    //             }
    //         },
    //         error: function (errorMsg) {
    //             tools.loadinghide(false);
    //             tools.show_message_error("获取暴雨移植信息失败!");
    //             return;
    //         }
    //     });
    // } else {
    //     $("#selectBYYZ").hide();
    //     $("#panel_jysz_box").height(320);
    // }
});
 