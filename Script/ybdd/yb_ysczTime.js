function yb_ysczTime_PanelShow() {
    $("#panel_ysczTime").show();
    tools.showPanelIndex("panel_ysczTime");
    var sysDate = new Date();
    //前一天日期(月初前一天为上月月底)
    var yesterday = getYesterday();
    var year = sysDate.getFullYear();
    var month = sysDate.getMonth() + 1;
    var day = sysDate.getDate();
    var time = year + "-" + month + "-" + day + " " + "08:00";
    tools.init_datarangepicker("#yscz_time .form-date", "YYYY-MM-DD HH:mm");

    $('#yscz_time #panel_ysczBeginTime').data('daterangepicker').setStartDate($("#beginTime").val());
    $('#yscz_time #panel_ysczBeginTime').data('daterangepicker').setEndDate($("#beginTime").val());
    $('#yscz_time #panel_ysczEndTime').data('daterangepicker').setStartDate($("#endTime").val());
    $('#yscz_time #panel_ysczEndTime').data('daterangepicker').setEndDate($("#endTime").val());
}
//关闭按钮事件
$("#panel_ysczTime .icon-close-new,#panel_ysczTime .btn_cancel").click(function () {
    $("#panel_ysczTime").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_ysczTime");
    $("#bar_yscz").attr("src", "./page_h/img/bar_yscz.png");
});


//时间选择改变事件(开始时间改变后，默认结束时间往后推3天)
$("#panel_ysczBeginTime").change(function (e, value) {
    if (value == undefined)
        return;
    var btime = value;
    var etime = tools.addDate(btime, 3)
    $("#panel_ysczEndTime")[0].value = etime;
    $("#panel_ysczEndTime").data('daterangepicker').setStartDate(etime);
    $("#panel_ysczEndTime").data('daterangepicker').setEndDate(etime);

})
//报表通用可拖拽事件
$("#panel_ysczTime").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$("#panel_ysczTime").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_ysczTime #selectYsczTime").click(function () {
    var searchStime = $("#panel_ysczTime #panel_ysczBeginTime").val() + ":00";
    var searchEtime = $("#panel_ysczTime #panel_ysczEndTime").val() + ":00";
    var m_start = moment(searchStime);
    var m_end = moment(searchEtime);
    if ((m_start.isAfter(m_end)) || m_start.isSame(m_end)) {
        tools.show_message_error("结束时间不能小于等于开始时间,请重新选择起始时间");
        onekeyyb = "0";
        return;
    }
    if (m_start.year() != m_end.year()) {
        tools.show_message_error("起始时间不允许跨年,请重新选择起始时间");
        return;
    }
    var dis_month = m_end.diff(m_start, 'months') // 0
    if (dis_month > 6) {
        tools.show_message_error("起始时间不允许超过半年,请重新选择起始时间");
        return;
    }
    $("#panel_ysczTime").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_ysczTime");
    var objData = {
        code: Number(searchRange),
        startTime: searchStime,
        endTime: searchEtime,
    };

    var info = JSON.stringify(objData);
    var days = Number(moment(searchEtime).diff(moment(searchStime), 'day'))
    var numloading = 1.6 * days * 7;


    tools.loadingshow("水文要素插值中...", numloading);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-interp/interp/excerpt",
        data: info,
        success: function (data) {
            $("#bar_yscz").attr("src", "./page_h/img/bar_yscz.png");
            if (data.code != 200) {
                tools.loadinghide(false);
                tools.show_message_error(data.message);
            } else {
                tools.loadinghide(true);
                tools.show_message_success(data.data);
                return;
            }
        },
        error: function (errorMsg) {
            $("#bar_yscz").attr("src", "./page_h/img/bar_yscz.png");
            tools.loadinghide(false);
            tools.show_message_error("要素插值失败！");
        }

    });
})