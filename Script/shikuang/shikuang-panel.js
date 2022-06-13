


$(document).ready(function () {
    //加载其他异步页面
    tools.ModuleLoad("#content_panel", "panel_shikuang.html", function () {


        // tools_panel.panelShow("51114600", "小仕阳水库_", searchEtime, "RR", searchStime);

    });
    getAllStcdInfo();
    window.addEventListener('message', function (event) {
        /* window.setTimeout(function () {
             showStcdInfo(event.data.stcd);
         }, 200);*/

        var flag = event.data.flag;
        if (flag != null) {

            if (event.data.des == "鼠标点击") {
                if (cur_js_type == "tm_skjs")
                    show_info(flag);
            }
            else if (event.data.des == "鼠标移入") {
                show_popup_move_svg(event.data.ps.x, event.data.ps.y, flag);
            }

        }
        if (event.data.des == "鼠标移出") {
            hide_popup_move_svg();
        }
        if (event.data.des == "弹窗") {
            updateInfoWindowPosition();
        }
        if (event.data.des == "首页地图加载完毕") {

            //第一次加载之后隐藏提示框
            console.log("首页地图加载完毕");

            $(".loading-layer").hide();

            if (data_RealInfos != null)
                sengMsgToEarth({
                    data: data_RealInfos,
                    des: "添加闪烁点",
                    isDelay: false
                })
            if (earth_info != null)
                sengMsgToEarth({
                    data: earth_info,
                    des: "添加雨量信息",
                    isDelay: false
                })
        }
    })
});
function getAllStcdInfo() {
    baseConfigStcdsInfo = null;
    $.getJSON("img/map/stcd_all.json", function (data, status) {
        if (status == 'success') {
            baseConfigStcdsInfo = data;
        } else {
            console.log("没有读取到本地文件：" + status);
        }
    })
}

function getStcdInfoByID(stcd) {
    var findobj = baseConfigStcdsInfo.info.find(function (item) {
        return (item.flag.split("_")[1] == stcd);
    });
    return findobj;
}

function sengMsgToEarth(obj) {
    document.getElementsByName("home_earth")[0].contentWindow.postMessage(obj, "*");
}

/*
 * 获取实况信息
 * */
function getRealInfos(isDelay, isfirst) {
    var objData = {
        endTime: searchEtime,
        plan: searchPlan,
        range: searchRange,
        startTime: searchStime,
        stcd: ""
    };
    var info = JSON.stringify(objData);
    data_RealInfos = null;

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-realsituate/getRealInfos",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var json = data;
            if (json.code != 200) {

                tools.show_message_error(json.message);
            } else {

                data_RealInfos = json.data;
                if (!isfirst)
                    sengMsgToEarth({
                        data: data_RealInfos,
                        des: "添加闪烁点",
                        isDelay: isDelay
                    })

            }
        },
        error: function (errorMsg) {
            tools.show_message_error("获取实况信息失败!");
            return;
        }
    });
}


/*
 * 获取等值面
 * */
function getDzm(isDelay, isfirst) {
    var objData = {
        Etime: searchEtime,
        Btime: searchStime,
        addvcd: "37",
        frgrd: "1,2,3,4",
        yljb: searchYldj
    };
    var info = JSON.stringify(objData);
    earth_info = null;

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: "http://10.37.1.79:9003/sd-api/rs/get_YL_Fbt",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            var json = data;
            if (json.code != 1) {

                tools.show_message_error(json.message);
            } else {

                earth_info = json;
                if (!isfirst)
                    sengMsgToEarth({
                        data: earth_info,
                        des: "添加雨量信息",
                        isDelay: isDelay
                    })

            }
            $(".loading-layer").hide();
        },
        error: function (errorMsg) {
            tools.show_message_error("获取等值面信息失败!");
            $(".loading-layer").hide();
            return;
        }
    });
}