//# sourceURL=updownData.js
function upDownPanelShow() {
    $("#panel_updown").show();
    tools.showPanelIndex("panel_updown");
    //option
    let htmlRadio = "";
    let modelNameArr = selectModelsName.split(',')
    let modelValArr = selectModes.split(',')
    $.each(modelNameArr, function (i, item) {
        if (i == 0) { //默认选中第一个模型
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value ='" + modelValArr[i] + "'  model_ = '" + item + "'  select>" + item + "</option>"
        } else {
            htmlRadio += "<option name = 'modelMap'  id = 'modelMap" +
                i + "'  value ='" + modelValArr[i] + "' model_ = '" + item + "' >" + item + "</option>"
        }
    })
    $("#select_jzmx").html("");
    $("#select_jzmx").append(htmlRadio);
}

//关闭按钮事件
$("#panel_updown .icon-close").click(function () {
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
$("#panel_updown #sureUpdown").click(function () {
    $("#panel_updown").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_updown");
    //获取缩放模型的数据
    let selectModel = $("#select_jzmx option:selected").val();
    // var upDownModel = "";
    // if (selectModel == "API模型") {
    //     upDownModel = "jsonForModel1"
    // } else if (selectModel == "短时段模型") {
    //     upDownModel = "jsonForModel2"
    // } else if (selectModel == "新安江模型") {
    //     upDownModel = "jsonForModel3"
    // } else if (selectModel == "多模型融合") {
    //     upDownModel = "jsonForMGE"
    // }
    // tools_panel[upDownModel];
    //获取到列表中的缩放数据
    let upDownModelData = tools_panel.modelData
    //获取当前缩放的数据 和数据的索引值
    let zoomData = [];
    let zoomIndex = 0;
    $.each(upDownModelData , function (index , item){
        if(item.modelName === selectModel){
            zoomData = item.data
            zoomIndex = index
        }
    });

    //缩放系数
    const p = 1;
    let y = parseFloat($("#select_sfbl").val()) / parseFloat(100);
    const x = parseFloat(p) + parseFloat(y);
    //进行缩放
    let upDownLine = [];
    let modifyZoomData = []
    $.each(zoomData.data, function (index, item) {
        if (moment(item.TM).isSame(searchEtime)) {
            upDownLine.push({
                value: [item.TM, tools.format_ll(item.Qs)]
            })
            modifyZoomData.push( [item.TM, tools.format_ll(item.Qs)])
        } else if (moment(item.TM).isAfter(searchEtime)) {
            upDownLine.push({
                value: [item.TM, tools.format_ll(parseFloat(item.Qs) * parseFloat(x))]
            })
            modifyZoomData.push([item.TM, tools.format_ll(parseFloat(item.Qs) * parseFloat(x))])
        }
    })
    debugger
    // tools_panel.modelData[zoomIndex].data.data = upDownLine
    tools_panel.modifyData = modifyZoomData
    //触发模型选项

    $("#ybtjTable").find("input[type='checkbox']").removeAttr('checked')
    $("tr[_data='"+selectModel+"']").find("input[type='checkbox']").attr("checked","true")
    $("tr[_data='"+selectModel+"']").find("input[type='checkbox']").trigger('click')

    var option = tools_panel.chartGcx.getOption();
    let xzS = option.series[option.series.length-1]
    if(xzS.name === "缩放修正流量"){
        //删除最后一条数据
        option.series.pop()
    }
    //折线展示
    let legendData = option.legend[0].data
    $.each(legendData , function(index , item){
        if(item.indexOf(selectModel) > -1 || item === '流量'){
            option.legend[0].selected[item] = true
        }else{
            option.legend[0].selected[item] = false
        }
    })

    option.series.push({
        name: "缩放修正流量",
        type: 'line',
        yAxisIndex: 1,
        symbol: "image://Images/empty.png",
        symbolSize: 1,
        showSymbol: false,
        hoverAnimation: false,
        itemStyle: {
            color: "#68228B",
            emphasis: {
                focus: 'series'
            }
        },
        lineStyle: {
            type: "dashed",
        },
        data: upDownLine
    });
    tools_panel.chartGcx.setOption(option, true);

})
