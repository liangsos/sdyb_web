var cur_rain_type = "今日";

//记录实况自定义时间
var zdy_sk = {
    stime: null,
    etime: null,
    shours: null,
    ehours: null
}
//记录预报自定义时间
var zdy_yb = {
    stime: null,
    etime: null,
    shours: null,
    ehours: null
}

//河系名称
var arr_hexiname = ["胶莱大沽区", "潍弥白浪区", "下级湖湖东区", "沂沭河区", "漳卫南运河", "中运河区", "大汶河区", "独流入海区"
    , "胶东半岛区", "日赣区", "上级湖湖东区", "上级湖湖西区", "徒骇马颊河"];

//记录当前降水类型，"sk","yb",时间选择框确定按钮之后
var cur_js_type = "tm_skjs";

//记录上次点击的自定义类型,时间选择框确定按钮之前
var last_zdy_click = "tm_skjs";
//初始化参数部分
function initParamsByAbstract() {
    arr_chart = new Array();
    $('#tm_home_rain_start,#tm_home_rain_end').datetimepicker({
        minView: "2",
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'zh-CN'
    })

    $("#tm_home_rain_start").val(moment().add(-3, 'days').format("YYYY-MM-DD"));
    $("#tm_home_rain_end").val(moment().format("YYYY-MM-DD"));
    var html_xs_start = "";
    var html_xs_end = "";
    var xs_start = "8";
    var xs_end = moment().hour();
    for (var i = 0; i <= 23; i++) {
        if (i.toString() == xs_start)
            html_xs_start += " <option  selected>" + i + "</option>";
        else
            html_xs_start += " <option value=" + i + " >" + i + "</option>";

        if (i.toString() == xs_end)
            html_xs_end += " <option  selected>" + i + "</option>";
        else
            html_xs_end += " <option  value=" + i + " >" + i + "</option>";

    }

    $("#startdate_xs").html(html_xs_start);
    $("#enddate_xs").html(html_xs_end);

    setTimeNoZDY(cur_rain_type);

    searchYldj = $("#tm_home_rain_yljb").find("option:selected").text();
}




/**
 * 清除页面数据-水情
 * */
function clearPageData_Sq() {
    $("#sq_sk_cjh").html("");
    $("#sq_sk_cxx").html("");
    $("#sq_sk_czc").html("");
    $("#sq_sk_cls").html("");
    $("#sq_hp_csj").html("");
    //清除移动列表数据
    listMoveClear();
}
/**
 * 清除页面数据-雨情
 * */
function clearPageData_Yq() {
    //  $("#yq_ylt").attr("src", "");
}

/**
 * 更新定时任务的“今日”时间
 * */
function updatetm_timeWork() {
    if (moment().hour() <= 8) {
        searchStime_timeWork = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
        searchEtime_timeWork = moment().format("YYYY-MM-DD HH:00:00");
    }
    else {
        searchStime_timeWork = moment().format("YYYY-MM-DD 08:00:00");
        searchEtime_timeWork = moment().format("YYYY-MM-DD HH:00:00");
    }
}
/**
 * 非自定义的时候，获取首页时间
 * @param {any} tmtype 实时，3天，9天
 */
function setTimeNoZDY(tmtype) {
    if (cur_js_type == "tm_skjs") {
        if (tmtype == "今日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD HH:00:00");
            }
            else {
                searchStime = moment().format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD HH:00:00");
            }
            searchStime_timeWork = searchStime;
            searchEtime_timeWork = searchEtime;
        }
        else if (tmtype == "昨日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-2", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
            }
            else {
                searchStime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD 08:00:00");
            }
        }
        else if (tmtype == "近3日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-3", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD HH:00:00");
            }
            else {
                searchStime = moment().add("-2", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD HH:00:00");
            }
        }

    }
    if (cur_js_type == "tm_ybjs") {
        if (tmtype == "今日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().format("YYYY-MM-DD 08:00:00");
            }
            else {
                searchStime = moment().format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("1", "days").format("YYYY-MM-DD 08:00:00");
            }

        }
        else if (tmtype == "未来3日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("2", "days").format("YYYY-MM-DD 08:00:00");
            }
            else {
                searchStime = moment().format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("3", "days").format("YYYY-MM-DD 08:00:00");
            }
        }
        else if (tmtype == "未来6日") {
            if (moment().hour() <= 8) {
                searchStime = moment().add("-1", "days").format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("5", "days").format("YYYY-MM-DD 08:00:00");
            }
            else {
                searchStime = moment().format("YYYY-MM-DD 08:00:00");
                searchEtime = moment().add("6", "days").format("YYYY-MM-DD 08:00:00");
            }
        }
    }


}


/**
 * 自定义时间
 * @param {any} tm_start 开始时间
 * @param {any} tm_end 结束时间
 */
function setTimeByZDY(tm_start, tm_end) {
    searchStime = tm_start;
    searchEtime = tm_end;

}


/**
 * 刷新页面数据
 * @param {any} isfirst 是否第一次进入,水情摘要,城市排行榜,超警站点列表 第一次执行，后面定时执行，其他根据按钮点击时间执行
 */
function reloadPage() {

    $("#span_loading").html("查询信息中...");
    $(".loading-layer").show();


    //获取雨情信息
    getYqInfo(false);

    //实况-面板
    getRealInfos(false);


    //获取水情信息，水情摘要和预警，定时执行或者“实况降水-今日”执行
    if ((cur_js_type == "tm_skjs") && (cur_rain_type == "今日")) {
        getSqInfo();
    }
}
/**
 * 获取雨情信息
 * */
function getYqInfo(isDelay, isfirst) {
    //清除雨情数据
    clearPageData_Yq();

    /* //雨情摘要
      getRainAbstract();
  
       //雨量图
      getRainPic();
  
      //等值面-三维地图数据层
      getDzm(false);*/



    $("#span_loading").html("查询信息中...");

    var url = "";
    if (cur_js_type == "tm_skjs") {
        url = apiUrl_cloud + "sd-api/Predic_Rain_Query_Real";
    }
    else if (cur_js_type == "tm_ybjs") {
        url = apiUrl_zf + "Predic_Rain_Query_Predic";
    }
    earth_info = null;

    var objData = {
        stime: searchStime,
        etime: searchEtime,
        frgrd: "1,2,3,4",
        yljb: searchYldj,
        type: 0
    };
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: url,
        data: JSON.stringify(objData),
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            $(".loading-layer").hide();
            if (res.code == 1) {

                earth_info = {
                    dzm: { data: res.dzm, dzmTuli: res.dzmTuli, yljb: res.yljb, yljbColor: res.yljbColor },
                    zdyl: res.data,
                    city: res.city,
                    hexi: res.hexi
                };

                ////////////雨量图
                $("#yq_ylt").attr("src", res.dzmPic + "?t=" + Math.random());

                ////////////雨情摘要
                //省面雨量
                $("#yq_smyl").html(res.city[0].rain);

                //最大降水量站
                $("#yq_zdjslz_name").html(res.data[0].loc + res.data[0].stnm);
                $("#yq_zdjslz_value").html(res.data[0].rain);


                if (!isfirst) {
                    sengMsgToEarth({
                        data: earth_info,
                        des: "添加雨量信息",
                        isDelay: isDelay
                    })

                }

                //过滤，获取指定水系的前两个
                var temp_sx = new Array();
                for (var i = 0; i < res.hexi.length; i++) {
                    if ($.inArray(res.hexi[i].name, arr_hexiname) != -1)
                        temp_sx.push(res.hexi[i]);

                    if (temp_sx.length >= 2)
                        i = res.hexi.length;
                }

                //两个特别地区
                $("#sx_1_name").html(temp_sx[0].name);
                $("#sx_1_value").html(temp_sx[0].rain);
                $("#sx_2_name").html(temp_sx[1].name);
                $("#sx_2_value").html(temp_sx[1].rain);

            }
        },
        error: function (errorMsg) {
            $(".loading-layer").hide();
            return;
        }
    });
}


/**
 * 获取水情信息
 * */
function getSqInfo() {
    clearInterval(timer_timeWork);
    start_timeWork();
    timer_timeWork = setInterval(function () { start_timeWork(); }, 1000 * 60 * 60);
}

//定时任务
function start_timeWork() {

    //更新实时时间
    updatetm_timeWork();

    //清除水情数据
    clearPageData_Sq();

    //水情摘要
    getWaterAbstract();

    //城市排行榜
    getTopCity();

    //超警站点列表
    getAlertStationInfo();
}
/**
 * 水情摘要 
 * @param {any} tmtype 时间了
 * @param {any} tm_start
 * @param {any} tm_end
 */
function getWaterAbstract(tmtype, tm_start, tm_end) {

    $("#span_loading").html("查询信息中...");
    //$(".loading-layer").show();
    var objData = {
        startTime: searchStime_timeWork,
        endTime: searchEtime_timeWork,
        plan: 14
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/live/getWaterSituation",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            // $(".loading-layer").hide();
            if (res.code == 200) {

                $("#sq_sk_cjh").html(res.data.reservoirStation.eckflzNum);
                $("#sq_sk_cxx").html(res.data.reservoirStation.efsltdzNum);
                $("#sq_sk_czc").html(res.data.reservoirStation.enormzNum);
                $("#sq_sk_cls").html(res.data.reservoirStation.ehhrzNum);

                $("#sq_hp_csj").html(res.data.lakeStation.edsflzNum);

                //河道echart图
                initSqChartInfo(res.data.riverStation.ewrzNum, res.data.riverStation.egrzNum, res.data.riverStation.eobhtzNum);

                //水库echart图
                initTjInfo(res.data.reservoirStation.efsltdzNum, res.data.reservoirStation.ehhrzNum, res.data.reservoirStation.eckflzNum, res.data.reservoirStation.enormzNum);
            }
        },
        error: function (errorMsg) {
            // $(".loading-layer").hide();
            return;
        }
    });
}
/**
 * 获取城市排行榜
 * */
function getTopCity() {
    $("#span_loading").html("查询信息中...");
    //$(".loading-layer").show();
    var objData = {
        startTime: searchStime_timeWork,
        endTime: searchEtime_timeWork,
        plan: 14
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/live/getTop7CityRiver",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            //  $(".loading-layer").hide();
            if (res.code == 200) {
                initECG(res.data);
            }
        },
        error: function (errorMsg) {
            //   $(".loading-layer").hide();
            return;
        }
    });
}

/*
 *获取雨情摘要
 * */
function getRainAbstract() {
    var objData = {
        startTime: searchStime,
        endTime: searchEtime,
        plan: 14
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/live/getRainSituation",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {

                //省面雨量
                $("#yq_smyl").html(res.data.province.rainfall);
                //最大降水量站

                var _location = res.data.maxPnStation.location == null ? "" : res.data.maxPnStation.location;
                var _stnm = res.data.maxPnStation.stnm == null ? "" : res.data.maxPnStation.stnm;

                $("#yq_zdjslz_name").html(_location + _stnm);

                $("#yq_zdjslz_value").html(res.data.maxPnStation.rainfall);

                //两个特别地区
                $("#sx_1_name").html(res.data.hnList[0].hnnm);
                $("#sx_1_value").html(res.data.hnList[0].rainfall);
                $("#sx_2_name").html(res.data.hnList[1].hnnm);
                $("#sx_2_value").html(res.data.hnList[1].rainfall);

            }
        },
        error: function (errorMsg) {
            return;
        }
    });




}
//获取雨量图，根据实时、3天、9天以及自定义处理
/*function getRainPic() {

    $("#span_loading").html("查询信息中...");
    //$(".loading-layer").show();

    var objData = {
        startTime: searchStime,
        endTime: searchEtime,
        plan: 14
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/live/getRainPicture",
        data: JSON.stringify(objData),
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
          //  $(".loading-layer").hide();
            if (res.code == 200) {
                $("#yq_ylt").attr("src", res.data[6].url);
            }
        },
        error: function (errorMsg) {
          //  $(".loading-layer").hide();
            return;
        }
    });

}*/

function getRainPic() {

    $("#span_loading").html("查询信息中...");
    //$(".loading-layer").show();

    var objData = {
        stime: searchStime,
        etime: searchEtime,
        frgrd: "1,2,3,4"
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_zf + "Predic_Rain_Picture_RadomP",
        data: JSON.stringify(objData),
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            //  $(".loading-layer").hide();
            if (res.code == 1) {
                $("#yq_ylt").attr("src", res.data.url);
            }
        },
        error: function (errorMsg) {
            //  $(".loading-layer").hide();
            return;
        }
    });

}
//获取超警站点
function getAlertStationInfo() {

    $("#span_loading").html("查询信息中...");
    //$(".loading-layer").show();

    var objData = {
        startTime: searchStime_timeWork,
        endTime: searchEtime_timeWork,
        plan: 0,
        range: 14
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/live/getAlertStationInfo",
        data: JSON.stringify(objData),
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            //  $(".loading-layer").hide();
            if (res.code == 200) {

                initRainData("hd", res.data.riverList);
                initRainData("sk", res.data.reservoirList);
            }
        },
        error: function (errorMsg) {
            //   $(".loading-layer").hide();
            return;
        }
    });

}
//雨量图切换时间
$(".yqxx_btn").click(function (e) {

    /*var arr_active = document.getElementsByClassName("yb_btn_active");
    for (var i = 0; i < arr_active.length;i++)
        $(arr_active[i]).removeClass("yb_btn_active").addClass("yb_btn");

    $(e.target).addClass("yb_btn_active");*/


    cur_rain_type = e.target.firstChild.data;
    if (cur_rain_type == "自定义") {


        if ($(e.target).hasClass("tm_ybjs")) {
            last_zdy_click = "zdy_ybjs";
        }
        else if ($(e.target).hasClass("tm_skjs")) {
            last_zdy_click = "zdy_skjs";
        }
        //恢复上次时间
        if (last_zdy_click == "zdy_ybjs") {
            if (zdy_yb.stime != null) {
                $("#tm_home_rain_start")[0].value = zdy_yb.stime;
                $("#tm_home_rain_end")[0].value = zdy_yb.etime;
                $("#startdate_xs").val(zdy_yb.shours);
                $("#enddate_xs").val(zdy_yb.ehours);
            }


        }
        else if (last_zdy_click == "zdy_skjs") {
            if (zdy_sk.stime != null) {
                $("#tm_home_rain_start")[0].value = zdy_sk.stime;
                $("#tm_home_rain_end")[0].value = zdy_sk.etime;
                $("#startdate_xs").val(zdy_sk.shours);
                $("#enddate_xs").val(zdy_sk.ehours);
            }
        }

        $("#home_time_select").show();
    }
    else {
        changeActiveBtn(e.target);
        setTimeNoZDY(cur_rain_type);
        reloadPage(false);

    }


});


//切换时间按钮状态
function changeActiveBtn(obj) {
    var arr_active = document.getElementsByClassName("yb_btn_active");
    for (var i = 0; i < arr_active.length; i++)
        $(arr_active[i]).removeClass("yb_btn_active").addClass("yb_btn");
    var _ele = obj;
    if ((obj == "zdy_skjs") || (obj == "zdy_ybjs"))
        _ele = "#" + obj;

    $(_ele).addClass("yb_btn_active");

    if ($(_ele).hasClass("tm_ybjs")) {
        cur_js_type = "tm_ybjs";
    }
    else if ($(_ele).hasClass("tm_skjs")) {
        cur_js_type = "tm_skjs";
    }
    //  alert(cur_js_type);

}

//自定义时间取消点击事件
$("#home_time_select_colse,#time_select_btn_cancle").click(function (e) {

    $("#home_time_select").hide();

});

//自定义时间确认点击事件
$("#time_select_btn_ok").click(function (e) {
    $("#home_time_select").hide();
    if (last_zdy_click == "zdy_skjs")
        changeActiveBtn("zdy_skjs");
    else if (last_zdy_click == "zdy_ybjs")
        changeActiveBtn("zdy_ybjs");


    searchYldj = $("#tm_home_rain_yljb").find("option:selected").text();
    //alert(searchYldj);
    setTimeByZDY(moment($("#tm_home_rain_start").val()).format("YYYY-MM-DD") + " " + pad2($("#startdate_xs").val(), 2) + ":00:00", moment($("#tm_home_rain_end").val()).format("YYYY-MM-DD") + " " + pad2($("#enddate_xs").val(), 2) + ":00:00");


    //记录本次时间
    if (cur_js_type == "tm_ybjs") {
        zdy_yb.stime = moment($("#tm_home_rain_start").val()).format("YYYY-MM-DD");
        zdy_yb.etime = moment($("#tm_home_rain_end").val()).format("YYYY-MM-DD");
        zdy_yb.shours = $("#startdate_xs").val();
        zdy_yb.ehours = $("#enddate_xs").val();
    }
    else if (cur_js_type == "tm_skjs") {
        zdy_sk.stime = moment($("#tm_home_rain_start").val()).format("YYYY-MM-DD");
        zdy_sk.etime = moment($("#tm_home_rain_end").val()).format("YYYY-MM-DD");
        zdy_sk.shours = $("#startdate_xs").val();
        zdy_sk.ehours = $("#enddate_xs").val();
    }
    reloadPage(false);
});

//时间选择改变事件(开始时间改变后，默认结束时间往后推3天)
$("#tm_home_rain_start").change(function (e, value) {

    if (e.target.value == undefined)
        return;

    var btime = e.target.value;
    var etime = addDate(btime, 3)

    $("#tm_home_rain_end")[0].value = etime;

})

// 添加天数
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

    // var time = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes;

    var time = date.getFullYear() + "-" + month + "-" + day;
    return time;
}