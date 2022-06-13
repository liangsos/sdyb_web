//# sourceURL=selectModify.js
function modifyPanelShow() {
    $("#panel_modify").show();
    tools.showPanelIndex("panel_modify");
     var htmlRadio = "";
    var modelNameArr = selectModelsName.split(',')
    var modelArr = selectModes.split(',');
    $.each(modelNameArr, function (i, item) {
        if (i == 0) { //默认选中第一个模型
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelNameArr[i] + "'  model_ = '" + modelArr[i] + "'  select>" + item + "</option>"
        } else {
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value_ ='" + modelNameArr[i] + "' model_ = '" + modelArr[i] + "' >" + item + "</option>"
        }
    })
    $("#select_modify").html("");
    $("#select_modify").append(htmlRadio);
}
//关闭按钮事件
$("#panel_modify .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});

//报表通用可拖拽事件
$(".modal_time").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".modal_time").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

//确认按钮点击事件
$("#panel_modify #sureModify").click(function () {
    // debugger
    $("#panel_modify").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_modify");
    //获取缩放模型的数据
    modifyModel = $("#select_modify option:selected").attr('model_')
})
