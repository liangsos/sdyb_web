/**
 * 定时预报
 * 让用户进行定时预报条件选择，触发定时预报
 */
function yb_dsyb_PanelShow() {
    //模型选择
    getModelsByRange("checkModel_dsyb");
    $("#selectPlan_dsyb").trigger("change")

    //预报情景设置
    $("#select_Days_dsyb").val(selectDays);
    $("input[name='fdxs_model_dsyb'][value='" + _plusType + "']").attr("checked", true);
    $('#dsz_dsyb').val(_rainPlus);
    $('#selectLSQJ_dsyb').val();
    $("input[name='sjy_model_dsyb'][value='1']").attr("checked", true);

    $("#panel_dsyb").show();
    tools.showPanelIndex("panel_dsyb");

}
function yb_dsyb_PanelHide() {
    $("#panel_dsyb").hide();
    tools.hidePanelIndex("panel_dsyb");
    $("#bar_dsyb").attr("src", "./img/timing.png");
}

//关闭按钮事件
$("#panel_dsyb .icon-close-new,#panel_dsyb .btn_cancel").click(function () {
    $("#bar_dsyb").attr("src", "./img/timing.png");
    $("#panel_dsyb").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_dsyb");
});

//报表通用可拖拽事件
$("#panel_dsyb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$("#panel_dsyb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_dsyb .btn_ok").click(function () {

    //预报情景确定
     searchPlan = $("#selectPlan_dsyb").val();
     selectDays = $("#select_Days_dsyb").val();
     if (searchPlan == 1) {
         _plusType = Number($('input[type=radio][name=sjy_model_dsyb]:checked').val());
         //获取分区面雨量，生成分区面雨量预报表
         if (_plusType == 0) { //面平均
             meteor = "";
         } else { //模式
             meteor = $("#selectDataFrom_dsyb option:checked").val();
         }
     } else {
         _plusType = Number($('input[type=radio][name=fdxs_model_dsyb]:checked').val());
         _hisStormId = searchPlan == 2 ? ($('#selectLSQJ_dsyb').val() == null ? -1 : $('#selectLSQJ_dsyb').val()) : (searchPlan == 3 ? ($('#selectBYYZ_dsyb').val() == null ? -1 : $('#selectBYYZ_dsyb').val()) : -1);
     }
     _rainPlus = $('#dsz_dsyb').val() == "" ? 0 : Number($('#dsz_dsyb').val());

    //模型选择确认
    selectModes = getModel();
    $(".show_bfs").hide();
    // $(".show_nynl").hide();
    //纳雨能力
    // if (selectModes.indexOf("NYNL") > -1) ——取消纳雨能力勾选时右侧控制面板才显示-2022.6.25 mdf by chl
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

    $("#panel_dsyb").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_dsyb");

    //定时预报
    dsyb()
})

/**
 * 预报情景设置
 */
$('input[type=radio][name=fdxs_model_dsyb]').change(function (e) {
    //debugger;

    if ($('input[name=fdxs_model_dsyb]:checked').val() == '0') {
        $("#dsz_label_dsyb").html("增大值:(%)");
        // $("#dsz_dsyb").css("margin-left", "20px");
    } else if ($('input[name=fdxs_model_dsyb]:checked').val() == '1') {
        $("#dsz_label_dsyb").html("增大值:");
        // $("#dsz_dsyb").css("margin-left", "20px");
    }

});
/**
 * 气象预估数据源切换事件
 */
$('input[type=radio][name=sjy_model_dsyb]').change(function (e) {
    //debugger;
    if ($('input[name=sjy_model_dsyb]:checked').val() == '0') {
        $("#selectDataFrom_dsyb").attr("disabled", "disabled");
        //获取分区面雨量，生成分区面雨量预报表
        get_rainReport_data(searchRange, searchEtime);
        //预报情景面板禁用
        $("#panel_dsyb").addClass('div-not-click');
    } else if ($('input[name=sjy_model_dsyb]:checked').val() == '1') {
        $("#selectDataFrom_dsyb").attr("disabled", false);
    }
});
$("#selectPlan_dsyb").change(function () {
    //debugger;
    let temp_searchPlan = $("#selectPlan_dsyb").val();

    if (temp_searchPlan == 0) {
        $("#dataFrom_dsyb").hide();
        $("#dataFromOption_dsyb").hide();
        $("#magnifiedForm_dsyb").show();
        $("#IncValue_dsyb").show();
        $("#selectLSQJ_dsyb").hide();
        $("#selectBYYZ_dsyb").hide();
    } else if (temp_searchPlan == 1) {
        $("#dataFromOption_dsyb").show();
        $("#dataFrom_dsyb").show();
        $("#magnifiedForm_dsyb").hide();
        $("#IncValue_dsyb").hide();
        $("#selectLSQJ_dsyb").hide();
        $("#selectBYYZ_dsyb").hide();
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

                $("#selectDataFrom_dsyb").html("");
                var _html = "";
                $.each(res.data, function (index, item) {
                    _html += "<option value='" + item.sourceCode + "'>" + item.sourceName + "</option>";
                })

                $("#selectDataFrom_dsyb").html(_html);
                $("#selectDataFrom_dsyb").show();
                if ($('input[name=sjy_model_dsyb]:checked').val() == '0') {
                    $("#selectDataFrom_dsyb").attr("disabled", "disabled");
                }

                tools.loadinghide(true);
            },
            error: function (errorMsg) {
                tools.loadinghide(false);
                tools.show_message_error("获取历史典型降水失败!");
                return;
            }
        });
    }
});


function dsyb(){
    // 预报时间间隔
    let autoIntervalT = $("#autoInterval_dsyb").val()
    let objData = {
        adjust: 1,
        autoInterval:autoIntervalT,
        foreDays: Number(selectDays),
        hisStormId: _hisStormId,
        model: selectModes,
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        stcd: "",
        meteorPattern: meteor
        // userId: $("#_hid_userid").val()
    };
    let info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl_cloud + "api-rainsituation/foreJobStart",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code === 200) {
                tools.show_message_success("定时预报设置成功")
            } else {
                tools.show_message_error_const(res.message);
            }
            yb_dsyb_PanelHide()
        },
        error: function (errorMsg) {
            tools.show_message_error_const(errorMsg);
            yb_dsyb_PanelHide()
        }
    });
}
