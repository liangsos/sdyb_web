 

var default_ybyz_width_report = 1000;
var default_ybyz_height_report = 800;
var china_select_top, china_select_left, china_select_right, china_select_bottom;
var hw_select_top, hw_select_left, hw_select_right, hw_select_bottom;
var byyz_raintype, byyz_stime, byyz_etime;

$(document).ready(function () {
    $("#show_byyz").prop("checked", false);

    $(".show_byyz").hide();

    $("#show_byyz").click(function () {
        if ($("#show_byyz").is(':checked')) {
            hideRainImageInfo();
            yb_ybyz_PanelShow();

            $("#show_byyzList").prop("checked", false);
            yb_byyzList_hide();
            var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            if (svgDocument == null)
                return;
            var svgWnd = svgDocument.svgWnd;
            if (svgWnd == null)
                return;
            svgWnd.hideByyzSomeRain();
        }
        else {
            yb_ybyz_PanelHide();
            var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            if (svgDocument == null)
                return;
            var svgWnd = svgDocument.svgWnd;
            if (svgWnd == null)
                return;
            svgWnd.hideDrawRect();

            $(".show_byyz_position").hide();
            $(".show_byyz_position").parent().hide();
        }

    });

});
$("#panel_ybyz .icon-close").click(function () {
   $(this).parent().parent().parent().hide();
    // $('#bar_byyz').click();
    $("#show_byyz").prop("checked", false);
    yb_byyz_clean();
});
 
 
$("#panel_ybyz").find(".panel-header").myDrag({
    cursor: "move",
    opacity: 0.7,
    dragEnd: function (x, y) {
        var marTop = Number($("#panel_ybyz").css("margin-top").replace('px', ''));
        if ((y + marTop) < 0) {
            $("#panel_ybyz").css("top", -marTop);
        }
    }
});

$("#panel_ybyz .ybyz_btn").click(function () {
    //debugger;
    var cur_text = $(this).html();
    if (cur_text == "开始选择区域") {
        $(this).html("结束选择区域") ;
        var svgDocument_byyz_base = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
        if (svgDocument_byyz_base == null)
            return;
        var svgWnd_byyz_base = svgDocument_byyz_base.svgWnd;
        if (svgWnd_byyz_base == null)
            return;

        svgWnd_byyz_base.setZoomState();
    } else {
        $(this).html("开始选择区域");
        var svgDocument_byyz_base = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
        if (svgDocument_byyz_base == null)
            return;
        var svgWnd_byyz_base = svgDocument_byyz_base.svgWnd;
        if (svgWnd_byyz_base == null)
            return;

        var drawInfo = svgWnd_byyz_base.getDrawInfo();
        if (drawInfo == null) {
            svgWnd_byyz_base.setZoomState();
            return;
        }
           

        sendDrawInfo(drawInfo.x, drawInfo.x + drawInfo.width, drawInfo.y,drawInfo.y + drawInfo.height)
      //  alert(drawInfo);
        yb_ybyz_PanelHide();
 
        $(".show_byyz_position").show();
        $(".show_byyz_position").parent().show();
        $("#show_byyz_position").prop("checked", false);
    }
 
});
//最大化按钮事件
$("#panel_ybyz .icon-max").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_ybyz_width_report).height(default_ybyz_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" +( default_ybyz_width_report / 2) + "px",
            "margin-top": "-" + (default_ybyz_height_report / 2) + "px"
        });
 
        $(this).attr("data-type", "");
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });
 
        $(this).attr("data-type", "max");
    }
});
function yb_ybyz_PanelShow() {
    $("#panel_ybyz .ybyz_btn").html("开始选择区域");



    $("#panel_ybyz").width(default_ybyz_width_report).height(default_ybyz_height_report)

    $("#panel_ybyz").css({
        "left": "calc(50% - " + (default_ybyz_width_report / 2) + "px)",
        "top": "calc(50% - " + (default_ybyz_height_report / 2) + "px)",
        "margin-left": "0px",
        "margin-top": "0px"
    });


    $("#panel_ybyz").show();
    tools.showPanelIndex("panel_ybyz");
    yb_byyz_clean();
    getchinaRainImageList();


}
$("#ybyz_rainname").change(function () {
    getchinaRainImage();
});
function getchinaRainImageList() {
 
    $("#ybyz_rainname").html("");
   
     
    tools.loadingshow("获取全国实况雨量信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/getRsInfo",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            tools.loadinghide(false);
 
            if (res.code != 200) {

                tools.show_message_error("获取信息失败!");
            } else {
                var nameList = "";
                $.each(res.data, function (index, item) {
                    if (index == 0)
                        nameList = nameList + " <option value=" + index + " selected data-stime='" + item.stime + "' data-etime='" + item.etime + "'>" + item.name + "</option>";
                    else
                        nameList = nameList + " <option value=" + index + " data-stime='" + item.stime + "' data-etime='" + item.etime + "'>" + item.name + "</option>";

                });
                $("#ybyz_rainname").html(nameList);
                getchinaRainImage();
                var svgDocument = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
                if (svgDocument == null)
                    return;
                var svgWnd = svgDocument.svgWnd;
                if (svgWnd == null)
                    return;
                svgWnd.setZoomState(true);
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");
            return;
        }
    });
}
function resetParam() {
    china_select_top = null; china_select_left = null; china_select_right = null; china_select_bottom = null;
    hw_select_top = null; hw_select_left = null; hw_select_right = null; hw_select_bottom = null;
    byyz_raintype = null;
    byyz_stime = null;
    byyz_etime = null;
}
function sendDrawInfo(left, right, top, bottom) {

   
    var obj = $("#ybyz_rainname option:selected");
    if (obj == null)
        return;
 
    var raintype = $("#ybyz_raintype option:selected").text().replace("mm以上","");
    var objData = {
        startTime: moment(obj.attr("data-stime")).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(obj.attr("data-etime")).format("YYYY-MM-DD HH:mm:ss"),
        percent: 0,
        cnBottom: bottom,
        cnLeft: left,
        cnRight: right,
        cnTop: top,
        rainLevel: Number(raintype)
    };
    var info = JSON.stringify(objData);
    china_select_top = objData.cnTop;
    china_select_left = objData.cnLeft;
    china_select_right = objData.cnRight;
    china_select_bottom = objData.cnBottom;
    byyz_raintype = Number(raintype);
    byyz_stime = objData.startTime;
    byyz_etime = objData.endTime;

    tools.loadingshow("获取映射雨量信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/rainMapSvg",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            tools.loadinghide(false);
            var json = data;
            if (json.code != 200) {

                tools.show_message_error(json.msg);
            } else {
               
                var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
                if (svgDocument == null)
                    return;
                var svgWnd = svgDocument.svgWnd;
                if (svgWnd == null)
                    return;

                $("#byyz_list_tl").attr("src",  json.data.legendUrl + "?version=" + Date.parse(new Date()));

                hideRainImageInfo();
                //svgWnd.setdrawImage(json.data);
                svgWnd.resetDrawInfo(json.data);

                svgWnd.showDrawRect();
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");
            return;
        }
    });
}
function getchinaRainImage() {
    //debugger;
    $(".ybyz_btn").html("开始选择区域");
    var obj = $("#ybyz_rainname option:selected");
    if (obj == null)
        return;
    var objData = {
        startTime: moment(obj.attr("data-stime")).format("YYYY-MM-DD HH:mm:ss") ,
        endTime: moment(obj.attr("data-etime")).format("YYYY-MM-DD HH:mm:ss"),
        percent: 0
    };
    var info = JSON.stringify(objData);

    tools.loadingshow("获取全国实况雨量信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rain/pros/rainNationSvg",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (data) {
            tools.loadinghide(false);
      
            var json = data;
            if (json.code != 200) {

                tools.show_message_error(json.msg);
            } else {
                var svgDocument = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
                if (svgDocument == null)
                    return;
                var svgWnd = svgDocument.svgWnd;
                if (svgWnd == null)
                    return;
                if ((json.data != null) || (json.data != undefined)) {
                    var raintype = "";
                    var _index_select = 0;
                   /* if (json.data.rainLevels.length > 2)
                        _index_select = json.data.rainLevels.length / 2 ;*/
                    $.each(json.data.rainLevels, function (index, item) {
                        if (index == _index_select)
                            raintype = raintype + " <option value=" + index + " selected>" + item + "mm以上</option>";
                        else
                            raintype = raintype + " <option value=" + index + " >" + item + "mm以上</option>";

                    });
                    $("#ybyz_raintype").html(raintype);
                    $("#ybyz_tl").attr("src", json.data.legendUrl);
                    svgWnd.setRainImage(json.data.image);
                }
                else {
                    yb_byyz_clean();
                }
             

            
               
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取实况降水信息失败!");
            return;
        }
    });
    resetParam();
    var svgDocument = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    svgWnd.reset();

    return;
}
function yb_byyz_clean() {
    var svgDocument = document.getElementById("SVGDoc_byyz_base").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;
    $("#ybyz_raintype").html("");
    svgWnd.setRainImage("");
    $("#ybyz_tl").attr("src", "");
}
function yb_ybyz_PanelHide() {
    $("#panel_ybyz").hide();
    return; 
}
//面板添加点击事件 保证操作面板在最上层
$("#panel_ybyz").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});
