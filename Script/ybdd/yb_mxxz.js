//# sourceURL=yb_mxxz.js
//关闭按钮事件
$("#panel_mxxz .icon-close-new,#panel_mxxz .btn_cancel").click(function () {
    $(this).parent().parent().parent().parent().hide();
});
// $("#panel_mxxz .btn_ok").click(function () {
//     $(this).parent().parent().parent().parent().hide();
// });
$("#panel_mxxz").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

//确认按钮点击事件
$("#panel_mxxz .btn_ok").click(function () {
    selectModes = getModel();
    $("#panel_mxxz").hide();
    yb_setSteps(3, ybddMapType);
    $(".show_bfs").hide();
    // $(".show_nynl").hide();
    //纳雨能力
    // if (selectModes.indexOf("NYNL") > -1) { ——取消纳雨能力勾选时右侧控制面板才显示-2022.6.25 mdf by chl
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

    //预报条件进行到模型选择——add by chl 2022.6.15
    ybCondition = 3;
})

function yb_mxxz_PanelShow() {
    getModelsByRange("checkModel");
    $("#panel_mxxz").show();
    tools.showPanelIndex("panel_mxxz");
}