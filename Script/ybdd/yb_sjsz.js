
function yb_shjz_PanelShow() {
    $("#panel_sjsz").show();
    tools.showPanelIndex("panel_sjsz");    var sysDate = new Date();
    //前一天日期(月初前一天为上月月底)
    var yesterday = getYesterday();
    var year = sysDate.getFullYear();
    var month = sysDate.getMonth() + 1;
    var day = sysDate.getDate();
    var time = year + "-" + month + "-" + day + " " + "08:00";
    tools.init_datarangepicker("#form_time .form-date", "YYYY-MM-DD HH:mm");
 

    $('#form_time #panel_beginTime').data('daterangepicker').setStartDate($("#beginTime").val());
    $('#form_time #panel_beginTime').data('daterangepicker').setEndDate($("#beginTime").val());
    $('#form_time #panel_endTime').data('daterangepicker').setStartDate($("#endTime").val());
    $('#form_time #panel_endTime').data('daterangepicker').setEndDate($("#endTime").val());
    $("#tm_lshs").val(getCookie("tm_lshs") == null ? 1 : getCookie("tm_lshs"));
    if ($("#tm_lshs").val() > 0) {
        $("#panel_beginTime").attr("disabled", "disabled");
        $("#panel_endTime").attr("disabled", "disabled");
    } else {
        $("#panel_beginTime").removeAttr("disabled");
        $("#panel_endTime").removeAttr("disabled");
    }
    ;
}
//关闭按钮事件
$("#panel_sjsz .icon-close-new,#panel_sjsz .btn_cancel").click(function () {
    $("#panel_sjsz").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_sjsz");

});

 
//时间选择改变事件(开始时间改变后，默认结束时间往后推3天)
$("#panel_beginTime").change(function (e, value) {
    if(value ==undefined)
    return;

    //   alert((value));
    var btime = value;
    var etime = addDate(btime, 3)
    $("#panel_endTime")[0].value = etime;
    $("#panel_endTime").data('daterangepicker').setStartDate(etime);
    $("#panel_endTime").data('daterangepicker').setEndDate(etime);

})
//报表通用可拖拽事件
$("#panel_sjsz").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$("#panel_sjsz").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_sjsz #selectTime").click(function () {
    var btime = $("#panel_sjsz #panel_beginTime").val();
    var etime = $("#panel_sjsz #panel_endTime").val();

    $('.serach-tm #beginTime').data('daterangepicker').setStartDate(btime);
    $('.serach-tm #beginTime').data('daterangepicker').setEndDate(btime);
    $('.serach-tm #endTime').data('daterangepicker').setStartDate(etime);
    $('.serach-tm #endTime').data('daterangepicker').setEndDate(etime);

    setCookie("beginTime", btime);
    setCookie("endTime", etime);
    setCookie("tm_lshs", $("#tm_lshs").val());
   // alert($("#beginTime").val());
    $('#cur_tm').html(" 模拟时间:" + moment($("#beginTime").val()).format("YYYY-MM-DD HH 时") + " -- " + moment($("#endTime").val()).format("YYYY-MM-DD HH 时"));

    if ($("#tm_lshs").val() == 4) {
        $("#show_autoFore").prop("checked", true);
    //    $('#tm_auroFore').html(" 自动时间:" + moment($("#beginTime").val()).format("YYYY-MM-DD HH 时") + " -- " + moment($("#endTime").val()).format("YYYY-MM-DD HH 时"));

    }
    $("#panel_sjsz").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_sjsz");
   // reset(true);
    handle(1);
    yb_setSteps(1, ybddMapType);
    //预报条件进行到时间设置——add by chl 2022.6.15
    ybCondition = 1;
    //initFanganList();
})
$("#tm_lshs").change(function () {
    var _value = $("#tm_lshs").val();
    var s_tm = ""
    var e_tm = ""

    if (_value > 0) {
        $("#panel_beginTime").attr("disabled", "disabled");
        $("#panel_endTime").attr("disabled", "disabled");
      
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
        $("#panel_beginTime").removeAttr("disabled");
        $("#panel_endTime").removeAttr("disabled");

        s_tm = moment().add(-3, 'days').format("YYYY-MM-DD 08:00");
        e_tm = moment().format("YYYY-MM-DD 08:00");


    }
    $('#panel_beginTime').data('daterangepicker').setStartDate(s_tm);
    $('#panel_beginTime').data('daterangepicker').setStartDate(s_tm);
    $('#panel_endTime').data('daterangepicker').setStartDate(e_tm);
    $('#panel_endTime').data('daterangepicker').setStartDate(e_tm);

})

//添加天数
function addDate(date, days) {

    if (days == undefined || days == '') {
        days = 1;
    }
    //系统当前日期
    var sysDate = new Date();

    var date = new Date(date);
    date.setDate(date.getDate() + days);

    if (date > sysDate) {//结束时间不能大于系统当前时间
        //date = sysDate;
        var month = sysDate.getMonth() + 1;
        var day = sysDate.getDate();
    } else {
        var month = date.getMonth() + 1;
        var day = date.getDate();
    }


    var hours = date.getHours();
    var minutes = date.getMinutes();

    var mm = "'" + month + "'";
    var dd = "'" + day + "'";
    var hh = "'" + hours + "'";
    var min = "'" + minutes + "'";

    //单位数前面加0
    if (mm.length == 3) {
        month = "0" + month;
    }

    if (dd.length == 3) {
        day = "0" + day;
    }
    if (hh.length == 3) {
        hours = "0" + hours;
    }
    if (min.length == 3) {
        minutes = "0" + minutes;
    }

    var time = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes;

    return time;
}