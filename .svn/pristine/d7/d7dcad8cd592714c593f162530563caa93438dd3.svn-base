/**
 * 显示清除缓存面板
 * */
function yb_clearCache_PanelShow() {
    if (searchType == "3") {//清理调度缓存
        $("#panelClearScheduleCache").show();

    } else {//清理缓存
        $("#panelClearCache").show();
        // 
    }
}

/**
 * 隐藏清除缓存面板
 * */
function yb_clearCache_PanelHide() {
    $("#panelClearScheduleCache").hide();
    $("#panelClearCache").hide();
}

/*
 *清除预报缓存确定按钮
 */
$("#btnSureClearCache").click(function () {
    $('#bar_clearCache').click();
    clearCache();
})
/*
 *清除预报缓存取消按钮
 */
$("#btnCancleClearCache").click(function () {
    $('#bar_clearCache').click();
})
/*
 *清除调度缓存确定按钮
 */
$("#btnSureClearScheduleCache").click(function () {
    $('#bar_clearCache').click();
    clearScheduleCache();
})
/*
 *清除调度缓存取消按钮
 */
$("#btnCancleClearScheduleCache").click(function () {
    $('#bar_clearCache').click();
})

/**
 * 清除调度缓存
 */
function clearScheduleCache() {
   var objData = {
       adjust: 1,
       schedulePlanName:ddName,
       meteorPattern:meteor,
       endTime: searchEtime,
       foreDays: Number(selectDays),
       model: getRadioModel(),
       plan: Number(searchPlan),
       range: Number(searchRange),
       startTime: searchStime,
       plusType: _plusType,
       rainPlus: _rainPlus,
       hisStormId: _hisStormId,
       stcd: ""
   };

    var info = JSON.stringify(objData);

    tools.loadingshow("清除调度缓存中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/ClearDispatchCache",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            if (data == null || data == "") {
                tools.show_message_error("缓存数据库清空失败!");
                return;
            }
            var json = data;
            if (json.code == "0") {
                tools.show_message_error(json.msg);
            } else {
                tools.loadinghide(true);
                tools.show_message_success("清除调度缓存成功！");

                searchStime = $("#beginTime").val() + ":00";
                searchEtime = $("#endTime").val() + ":00";
                sessionStorage.setItem("stime", searchStime);
                sessionStorage.setItem("etime", searchEtime);
                // location.reload();
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error(errorMsg);
            return;
        }
    })
}


/**
 * 清除预报缓存
 * 清除上次做预报传的modes，而不是模型选择面板中选择的
 */
function clearCache() {

    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        model: selectModesLastYb,
        plan: Number(searchPlan),
        range: Number(searchRange),
        startTime: searchStime,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        stcd: ""
    };

    var info = JSON.stringify(objData);
    tools.loadingshow("清除预报缓存中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/ClearCache",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code != 200) {
                tools.loadinghide(true);
                tools.show_message_error(res.message);
                return;
            }
            tools.loadinghide(true);
            tools.show_message_success("清除预报缓存成功！");
            searchStime = $("#beginTime").val() + ":00";
            searchEtime = $("#endTime").val() + ":00";
            sessionStorage.setItem("stime", searchStime);
            sessionStorage.setItem("etime", searchEtime);

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error(errorMsg);
            return;
        }

    })

}
