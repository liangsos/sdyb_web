//# sourceURL=panel.js
var ddName = "";
$(document).ready(function () {
    //实例化工具类
    tools_panel = new Tools_Panel();
    tool_dispatch = new Tools_Dispatch();
    tool_dispatch_xxtj = new Tools_Dispatch_XXTJ();
    tools_panel_all = new Tools_Panel_All();
    tools_panel_allYb = new Tools_Panel_AllYb();
    tools_panel_sdljs = new Tools_Panel_sdljs();
    tools_panel_singleDm = new Tools_Panel_singleDm();
    /**
     * 调度方案保存事件
     */
    $("#btnSureDd").click(function (event) {
        //先根据选择调度类型赋值scheduleType的值
        var scheduleType = Number($("#txtNameDd  option:selected").val());
        if (scheduleType == -9999 || scheduleType == 0 || scheduleType == 3) { //优化调度和自定义都为3
            scheduleType = 3;
        }
        default_scheduleType = scheduleType;
        //如果选择的是优化调度、则先进行优化调控设置——2022.6.21 add by chl
        if ($("#txtNameDd option:selected").val() == "0") {
            $("#panelSaveDd").hide();
            $("#panel_yhdd").show();
            getRiverAndRsvrInfo();
            return;
        }

        var ddname = $.trim($("#xz_text").val());
            if (ddname == "") {
                alert("请输入方案名称！")
                return;
            }
        ddName = ddname;
        $("#panelSaveDd").hide();
        $("#panelYjInfo").hide();
        $("#panelYbInfo").hide();
        $("#panelDdInfo").hide();

        clearSvgAnimate();
   
        searchStime = $("#beginTime").val() + ":00";
        searchEtime = $("#endTime").val() + ":00";
        searchPlan = $("#selectPlan").val();
          
        onekeydd = "0";
        
       // isgetprogress = true;
        var settings = {
            "url": apiUrl_cloud + "api-realsituate/JointDispatch",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": getCookie("accessToken")
            },
            "data": JSON.stringify({
                "adjust": 1,
                "endTime": searchEtime,
                "foreDays": Number(selectDays),
                "model": getRadioModel(),
                "plan": Number(searchPlan),
                "range": Number(searchRange),
                "schedulePlanName": ddname,
                "rsvrMode":Number( $('input[type=radio][name=rd_gzdd_param]:checked').val()),
                "scheduleType": scheduleType,
                "startTime": searchStime,
                "plusType": _plusType,
                "rainPlus": _rainPlus,
                "hisStormId": _hisStormId,
                "meteorPattern": meteor,
                "stcd": ""
            }),
        };

        $.ajax(settings).done(function (json) {
            if (json.code != 200) {
               // isgetprogress = false;
                tools.show_message_error("联合调度演算失败！");
                return;
            }
            if (json.data.code == "0") {
                tools.show_message_error("联合调度演算失败！");
                return;
            }
           //     initDdSelect();
                //l联合调度演算成果入库
           //     saveJointDispatch(false,ddname)
           //     getDDInfo();
          
        }).fail(function (_res) {
           // isgetprogress = false;
            clearInterval(timerGL);
            tools.show_message_error("联合调度演算失败！");
            return;
        });
        getDDprogress();

    });

    /**
     * 关闭面板
     */
    $("#btnCancleDd").click(function () {
        $("#panelSaveDd").hide();
        // initDdSelect();
    });

    $("#txtNameDd").change(function (e) {
        var vid = $("#txtNameDd  option:selected").val();
        if (vid == -9999) {
            makeInfoself();
        }
        else {
            nomakeInfoself();
        }
        if(vid == 2)
        {
            $(":radio[name='rd_gzdd_param'][value='1']").prop("checked", "checked");
            $("#div_gzdd_param").show();
            $("#panelSaveDd").height(160);
        }
        else {
            $("#div_gzdd_param").hide();
           $("#panelSaveDd").height(120);
        }
    });

    $("#btnSureYBClear").click(function () {
        return;
    });
    $("#btnCancleYBClear").click(function () {
        //   alert("Asd");
        $("#panelYBClear").hide();
        onekeyproc(false);
    });

    //关闭按钮事件
    $("#panelYBClear .icon-close").click(function () {
        $(this).parent().parent().parent().hide();
    });
    /**
        * 树状菜单
        */
    $('.treeMenu .tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '折叠');
    $('.treeMenu .tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', '展开').find(' > i').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', '折叠').find(' > i').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
        }
        e.stopPropagation();
    });

    //联合调度按钮点击事件
    $("#btnLhdd").click(function () {
        searchStime = $("#beginTime").val() + ":00";
        searchEtime = $("#endTime").val() + ":00";
        searchPlan = $("#selectPlan").val();
        //var models = getModel();
        get_lhddReport_data(searchRange, searchStime, searchEtime, searchPlan, selectDays, selectModes);
        $("#panelSaveDd").hide();
    })
});
function makeInfoself() {
    $("#xz_text").show();
    $("#xz_text").val("");
    $("#xz_text").removeAttr("disabled");
    $("#xz_text").focus();

}
function nomakeInfoself() {
    $("#xz_text").attr("disabled", "disabled");
    $("#xz_text").val($("#txtNameDd").find("option:selected").text());
    $("#xz_text").hide();

}
function initDdSelect() {
    $("#txtNameDd").empty();
    $("#txtNameDd").append("<option value='1'>初始状态</option>");
    $("#txtNameDd").append("<option value='2' selected>规则调度</option>");
    $("#txtNameDd").append("<option value='0'>优化调度</option>");
    $("#div_gzdd_param").show();
    $(":radio[name='rd_gzdd_param'][value='1']").prop("checked", "checked");
    $("#panelSaveDd").height(160);
    $("#xz_text").hide();
    var lis_exit = ["规则调度", "初始状态", "自定义","优化调度"];
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
        meteorPattern: meteor,
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
                // tools.show_message_error_const("暂无调度方案数据！");
                return;
            }
            if (json.data.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error_const(json.msg);
            } else {
                $.each(json.data, function (index, item) {
                    if ($.inArray(item, lis_exit) == -1) {
                        $("#txtNameDd").append("<option value='3'>" + item + "</option>");
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
    $("#txtNameDd").append("<option value='-9999'>自定义</option>");
    
    $("#xz_text").val($("#txtNameDd").find("option:selected").text());

}
function saveJointDispatch(isyhdd,ddname) {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        hisStormId: _hisStormId,
        model: getRadioModel(),
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        rsvrMode: Number($('input[type=radio][name=rd_gzdd_param]:checked').val()),
        schedulePlanName: ddname,
        scheduleType:  isyhdd == true ? 3 : default_scheduleType,
        startTime: searchStime,
        meteorPattern: meteor,
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
        url: apiUrl_cloud + "api-realsituate/SaveJointDispatch",
        data: info,
        success: function (res) {
            if (res.code != 200) {
               // isgetprogress = false;
                tools.loadinghide(false);
                tools.show_message_error_const("联合调度演算成果入库失败！");
                return;
            }
           // isgetprogress = false;
            if (isyhdd) {//优化调度-调度名称为优化调度设置面板传来的名称,第二个参数为是否为优化调度
                funcDispatch(ddname);
            } else {
                funcDispatch(ddName);
            }
            
        },
        error: function (errorMsg) {
          //  isgetprogress = false;
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}

//获取调度信息
function getDDInfo(){
    initDdSelect();
    //l联合调度演算成果入库
    saveJointDispatch(false,ddName)
}