
//报表默认宽高
var default_live_width_report = 252;
var default_live_height_report = 486;

 

    $("#panel_ylt .icon-close-new").click(function () {
        $(this).parent().parent().parent().parent().parent().hide();
        $('#bar_rlt').click();
    });

    $("#panel_ylt").draggable({
        handle: '.panel-header',
        cursor: "move",
        opacity: 0.7
    });

    //面板添加点击事件 保证操作面板在最上层
    $("#panel_ylt").click(function (event) {
        //按钮事件阻止
        if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
            return;
        tools.showPanelIndex($(this).attr("id"));
    });

$("#panel_ylt #proc_rainImage").click(function () {
    getRainImage(moment($("#beginTime").val()).format("YYYY-MM-DD 08:00"), moment($("#endTime").val()).format("YYYY-MM-DD 08:00"), 0, -1, false);

    });
 
function yb_ylt_PanelShow() {
    $("#panel_ylt").show();
    showRainImage();
    tools.showPanelIndex("panel_ylt");

};
function yb_ylt_PanelHide() {
    $("#panel_ylt").hide();
    hideRainImageInfo();
};
function hideRainImageInfo() {
    //  return;
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.hideRainImage();
    $(".rain_info").hide();
    $("#show_rainImage").prop("checked", false);

    $("#show_edge").prop("checked", true);
    svgWnd.showEdge();
    if ($('#bar_rlt').hasClass("bar_active")) {
        $('#bar_rlt').click();
    }


}
function showRainImage() {
    //  return;
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.showRainImage();
 
}
function getRainImage(stm, etm, factor, sort,isclickbtn) {
    if (sort == 0) {
        var temptm = etm;
        etm = stm;
        stm = temptm;
    }
    var isproc = false;
    if (sort == -1)
        isproc = true;

    var objData = {
        endTime: etm+":00",
        startTime: stm + ":00",
        factor: 0,
        regionId: Number(searchRange)
    };
    var info = JSON.stringify(objData);

    tools.loadingshow("获取实况雨量信息中...", arrRange_nynl_lodingtime[Number(searchRange) - 1]);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: searchRange == "14" ? apiUrl_cloud + "api-rain/getSdRain" : apiUrl_cloud + "api-rain/getRegionRain",
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
                if (sort == -1)
                    raindaysinfo = null;

                initRianEchart(json.data.daily);
                showRainImageInfo(json.data.image, json.data.legendUrl, stm.split(" ")[0], etm.split(" ")[0], isproc, isclickbtn);

               

            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取实况降水信息失败!");
            return;
        }
    });
}
function changeRianEchartColor(dayindex) {
    var color_data = new Array();
    if (raindaysinfo == null)
        return;

    $.each(raindaysinfo, function (index, item) {

        if (dayindex == index)
            color_data.push("#FF6633");
        else
            color_data.push("#419fff");
    })


    rain_echart.setOption({
        series: [{
            itemStyle: {

                color: function (params) {
                    return color_data[params.dataIndex];
                }


            }
        }]
    });
}
function initRianEchart(daily) {

    rain_echart = null;
    if (raindaysinfo == null)
        raindaysinfo = daily;
    var x_data = new Array();
    var y_data = new Array();
    var color_data = new Array();
    $.each(raindaysinfo, function (index, item) {
        x_data.push(item.tm);
        y_data.push(Number(item.rain));
        color_data.push("#419fff");
    })

    rain_echart = echarts.init($("#rain_echart")[0]);
    option = {
        grid: {
            left: 5,
            top: 35,
            right: 45,
            bottom: 5,
            containLabel: true
        },
        xAxis: {
            name: ' 时间',
            type: 'category',
            data: x_data,
            lineStyle: {
                color: "#000000"
            },
            axisLabel: {
                //rotate: 30,
                // interval: 0
            }
        },
        yAxis: {
            name: ' 雨量(mm)',
            max: Math.round(Math.round(Math.max.apply(null, y_data) * 1.1, 0) / 10, 0) * 10 + 10,
            type: 'value',
            lineStyle: {
                color: "#000000"
            }
        },
        series: [{
            data: y_data,
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式

                            fontSize: 14
                        }
                    },
                    color: function (params) {
                        return color_data[params.dataIndex];
                    }

                },
            },
             
           
        }]
    };
    rain_echart.setOption(option, true);
    rain_echart.getZr().off('click');
    rain_echart.getZr().on('click', params => {
        let pointInPixel = [params.offsetX, params.offsetY]
        if (rain_echart.containPixel('grid', pointInPixel)) {
            let xIndex = rain_echart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0];
            getRainImage(moment(searchStime).add(xIndex, 'days').format("YYYY-MM-DD 08:00"), moment(searchStime).add(1 + xIndex, 'days').format("YYYY-MM-DD 08:00"), 0, 1, false);
        }
    })

}
function showRainInfo(json, ishowIcon) {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;

    svgWnd.clearRainInfo();
    $.each(json, function (index, item) {
        svgWnd.modifyRainInfo(item.text, item.name, ishowIcon);
    });

    svgWnd.showRainText();

}
function hideRainInfo() {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    svgWnd.hideRainText();
}
function showRainImageInfo(image, legendUrl, raintm_from, raintm_to, isproc, isclickbtn) {

    //debugger;
    if (cur_setp == 0)
        return;

    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (svgDocument == null)
        return;
    var svgWnd = svgDocument.svgWnd;
    if (svgWnd == null)
        return;

    $("#show_edge").prop("checked", false);
    // svgWnd.hideEdge();

    var dayindex = -1;
    if (legendUrl != undefined)
        $("#rain_tl").attr("src", legendUrl + "?" + Math.random() * (10000 - 1 + 1) + 1);
    if (image != undefined)
        svgWnd.setRainImage(image);
    if ((raintm_from != undefined) && (raintm_to != undefined)) {
        if (isproc) {
            $("#cur_rain_tm_show").html(moment(raintm_from).format("MM月DD日") + " 8时   -   " + moment(raintm_to).format("MM月DD日 8时 "));
           
        }
        else {
            
            $("#cur_rain_tm").html(raintm_from + " -- " + raintm_to);
            $("#cur_rain_tm_show").html(moment(raintm_from).format("MM月DD日"));
            dayindex = moment(raintm_from).diff(moment(moment($("#beginTime").val()).format("YYYY-MM-DD")), 'day');

            
        }




    }
    changeRianEchartColor(dayindex);
    if ((last_setp == 1) && (ybddMapType == 1)) {

        $("#show_rainImage").prop("checked", true);
        //  svgWnd.showRainImage();
        if (isclickbtn)
            $("#bar_rlt").click();
    }

}