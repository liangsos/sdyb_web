//# sourceURL=yb_tckz.js
//报表默认宽高
var default_live_width_report = 252;
var default_live_height_report = 486;


$("#show_vip").prop("checked", true);

$("#show_vip").click(function () {
    if ($("#show_vip").is(':checked')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.showYJText();
    }
    else {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.hideYJText();
    }

});
$("#show_byyz").prop("checked", false);
$("#show_byyz").click(function () {
    if ($("#show_byyz").is(':checked')) {
        hideRainImageInfo();
        yb_ybyz_PanelShow();

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
        //判断产汇流信息是否展示
        let display =$('#show_dychxx').css('display')
        if(display === "none"){
            $(".show_byyz_position").parent().hide();
        }else{
            $('#show_dychxx').css('margin-left','0px')
        }
    }

});
$(".show_byyz_position").hide();
//判断产汇流信息是否展示
let display =$('#show_dychxx').css('display')
if(display === "none"){
    $(".show_byyz_position").parent().hide();
}else{
    $('#show_dychxx').css('margin-left','0px')
}
$("#show_byyz_position").click(function () {
    if ($("#show_byyz_position").is(':checked')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        if (svgDocument == null)
            return;
        var svgWnd = svgDocument.svgWnd;
        if (svgWnd == null)
            return;
        var res = svgWnd.getRectInfo();
      //  alert(JSON.stringify(res));
    }
    else {


    }

});
$("#show_liuyu").prop("checked", false);

$("#show_liuyu").click(function () {
    if ($("#show_liuyu").is(':checked')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;

        $("#show_edge").prop("checked", true);
        svgWnd.showEdge();


        svgWnd.show_liuyu($('input[type=radio][name=rd_liuyu]:checked').val());
        $('input[type=radio][name=rd_liuyu]').attr("disabled", false);


    }
    else {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        $('input[type=radio][name=rd_liuyu]').attr("disabled", true);
        svgWnd.show_liuyu(-1);
    }

});
//最小化显示panelall面板
$("#show_panel_all").parent().click(function () {

    if (searchType == "2") {
        if ($("#show_panel_all").is(':checked')) {

            $("#panelSwAllYb").show();
            tools_panel_allYb.resizeYBTZZWindow();
            tools.showPanelIndex("panelSwAllYb");
        }
        else {

            $("#panelSwAllYb").hide();

        }

    } else {
        if ($("#show_panel_all").is(':checked')) {
            $("#panelSwAll").show();
            tools.showPanelIndex("panelSwAll");
        }
        else {

            $("#panelSwAll").hide();

        }
    }

});
//最小化显示panelall面板
$("#show_panel_info").parent().click(function () {

    if (cur_setp == 2) {
        if ($("#show_panel_info").is(':checked')) {
            $("#panelYbInfo").show();
            tools.showPanelIndex("panelYbInfo");
        }
        else {

            $("#panelYbInfo").hide();

        }

    } else if (cur_setp == 3) {
        if ($("#show_panel_info").is(':checked')) {
            $("#panelYjInfo").show();
            tools.showPanelIndex("panelYjInfo");
        }
        else {

            $("#panelYjInfo").hide();

        }

    }
    else if (cur_setp == 4) {
        if ($("#show_panel_info").is(':checked')) {
            $("#panelDdInfo").show();
            tools.showPanelIndex("panelDdInfo");
        }
        else {

            $("#panelDdInfo").hide();

        }

    }

});

$("#show_edge").prop("checked", true);
$("#show_edge").click(function () {
    if ($("#show_edge").is(':checked')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.showEdge();
    }
    else {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.hideEdge();

    }

});

$("#show_map_edge").prop("checked", true);
$("#show_map_edge").click(function () {
    if ($("#show_map_edge").is(':checked')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.showMapEdge();
    } else {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.hideMapEdge();

    }

});

$("#show_rainImage").prop("checked", false);
$("#show_rainImage").click(function () {
    if ($("#show_rainImage").is(':checked')) {

        showRainImageInfo();

    }
    else {

        hideRainImageInfo();
    }

});
$("#panel_tckz .icon-close-new").click(function () {
    $(this).parent().parent().parent().parent().hide();
    $('#bar_tckz').click();
});

$("#panel_tckz").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
function yb_tckz_PanelShow() {
    $("#panel_tckz").show();
    tools.showPanelIndex("panel_tckz");
}
function yb_tckz_PanelHide() {
    $("#panel_tckz").hide();
}
//面板添加点击事件 保证操作面板在最上层
$("#panel_tckz").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

function showTZB() {

    $("#show_panel_all").prop("checked", true);
    $("#show_panel_all").removeAttr("disabled");

}
function hideTZB() {
    $("#show_panel_all").prop("checked", false);
    $("#show_panel_all").attr("disabled", "disabled");
}
function showMainInfo() {
    // $("#show_panel_info").prop("checked", true);
    $("#show_panel_info").removeAttr("disabled");

}

function hideMainInfo() {
    $("#show_panel_info").prop("checked", false);
    $("#show_panel_info").attr("disabled", "disabled");
}
$("#modelSelectForMap").delegate(".dropdown li", "click", function () {
    //debugger;
    var checkedModel = $(this).attr('value_');
    changeYbMode(checkedModel);

})
$("#modelSelectForMap").delegate(".triangle-up", "click", function () {
    var checkedModel = getModelMap();
    changeYbMode(checkedModel);
})
$("#modelSelectForMap").delegate(".spin-down", "click", function () {
    var checkedModel = getModelMap();
    changeYbMode(checkedModel);
})


/**
 * 切换预报模型，重新设置站点状态
 * */
function changeYbMode(mode_name) {
    tools.loadingshow("切换模型中...", 20);
    var _svgid = ybddMapType == 1 ? "SVGDoc" : (ybddMapType == 2 ? "SVGDoc_ght" : "");
    tools.draw_layer(searchRange, searchType, tools_panel_allYb.json_data, mode_name, _svgid, "yubao");
    window.setTimeout(() => {
        tools.loadinghide(false);
    }, 1000);
}
$('input[type=radio][name=rd_model]').change(function () {
    return;

});
function changeModeByWJB(modename) {
    return;


}
$('input[type=radio][name=rd_liuyu]').change(function () {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    svgWnd.show_liuyu(-1);
    svgWnd.show_liuyu($('input[type=radio][name=rd_liuyu]:checked').val());
});
function showTckz() {
    if (!$('#bar_tckz').hasClass("bar_active")) {
        $('#bar_tckz').click();
    }
}
function hideYBMd() {


   // $("#yb_model_changfe").hide();
    var radioObj = $('input[type = radio][name = rd_model]');
    for (var i = 0; i < radioObj.length; i++) {
        radioObj[i].checked = false;
        $(radioObj[i]).attr("disabled", "disabled");
    }
    $("#paneljsyb").hide();
    hideRainInfo();
}
function showYBMd() {
    var radioObj = $('input[type = radio][name = rd_model]');
    for (var i = 0; i < radioObj.length; i++) {
        if(i==0)
            radioObj[i].checked = true;
        else
            radioObj[i].checked = false;

        $(radioObj[i]).removeAttr("disabled");

    }
}
function clearModelSelect() {
    $("#modelSelectForMap").html("");
}
