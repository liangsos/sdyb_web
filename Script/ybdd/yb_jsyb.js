//# sourceURL=yb_jsyb.js
var default_jyzzt_width_report = 1000;
var default_jyzzt_height_report = 500;
function upJsybPanelShow() {
    $("#panel_jyzzt").show();
    $("#btnGet").bootstrapSwitch()
    $("#btnGet").bootstrapSwitch("state", false)
    tools.showPanelIndex("panel_jyzzt");
    //每次打开面板，都重新初始化
    upData = []
    $("#panel_jyzzt").width(default_jyzzt_width_report).height(default_jyzzt_height_report)
    $("#panel_jyzzt").css({
        "left": "calc(50% - " + (default_jyzzt_width_report / 2) + "px)",
        "top": "calc(50% - " + (default_jyzzt_height_report / 2) + "px)",
        "margin-left": "0px",
        "margin-top": "0px",
        "position":"absolute"
    });

}

//关闭按钮事件
$("#panel_jyzzt .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});


//面板可拖动处理
// $("#panel_jyzzt").find(".panel-header").myDrag({
//     cursor: "move",
//     opacity: 0.7,
//     dragEnd: function (x, y) {
//         let marTop = Number($("#panel_jyzzt").css("margin-top").replace('px', ''));
//         if ((y + marTop) < 0) {
//             $("#panel_jyzzt").css("top", -marTop);
//         }
//     }
// });
//报表通用可拖拽事件
$("#panel_jyzzt").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".mode-jyzzt").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 降雨模式下拉框值选择触发
 */
let pfid = null
$("#jsyb_fpfa").on("change" , function(event){
    let modValue = $("#jsyb_fpfa  option:selected").val();
    if (modValue === '') {
        _hisStormId = -1;
        tools.show_message_error_const("请先点击表格中对应的流域名称")
        return
    }
    _hisStormId = modValue;
    let param = {
        dpNoComment:modValue
    }
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-rainsituation/basin/getDpdbPInfo",
        data: JSON.stringify(param),
        success:function(res){
            if(res.code === 200){
                let legendName = res.data.comment;
                pfid = res.data.pfid
                //循环获取参数
                x_data = []
                y_data = []
                $.each(res.data.pointList , function (index ,item){
                    x_data.push(item.lno)
                    y_data.push(item.p)
                })

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    legend: {
                        data:[modValue]
                    },
                    xAxis: [
                        {
                            id:"x_t",
                            type: 'category',
                            name: '时段',
                            data: x_data
                        }
                    ],
                    yAxis: [
                        {
                            id:"y_m",
                            type: 'value',
                            name: '雨量(mm)',

                        }
                    ],
                    series:[
                        {
                            name: modValue,
                            type: 'bar',
                            barWidth: "10px",
                            data: y_data,
                            lineStyle: {
                                color: "#49efd8"
                            },
                            itemStyle: {
                                color: "#49efd8"
                            }
                        },{
                            name: modValue,
                            smooth: true,
                            type: 'line',
                            data: y_data,
                            lineStyle: {
                                color: "#49efd8"
                            },
                            itemStyle: {
                                color: "#49efd8"
                            }
                        }
                    ]
                }
                if(!tools_panel.chartMod){
                    tools_panel.chartMod = echarts.init($("#init_jyzzt")[0])
                }
                tools_panel.chartMod.clear()
                tools_panel.chartMod.setOption(option,true)
                upJsybPanelShow()
            }else{
                tools.show_message_error_const(res.message)
            }
        },
        error:function(msg){
            tools.show_message_error_const(msg)
        }
    })
})

//取点，开启画点和撤回点
let upData = []
$(".btn-div").delegate('input[name="btnGet"]', 'switchChange.bootstrapSwitch', function (event, state) {
    let zr;
    zr = tools_panel.chartMod.getZr();
    zr.off('dblclick')
    if (state === true) { //添加设置点
        zr.off('click');
        zr.off('dblclick')
        zr.on('click', function (params) {
            let option = tools_panel.chartMod.getOption()
            let pointInPixel = [params.offsetX, params.offsetY];
            let pointInGrid = tools_panel.chartMod.convertFromPixel({
                xAxisId: 'x_t',
                yAxisId: 'y_m'
            }, pointInPixel);
            pointInGrid[0] = option.xAxis[0].axisPointer.value;
            pointInGrid[1] = pointInGrid[1].toFixed(2);
            upData.push(pointInGrid);
            if (option.series.length === 0 || !option.series[option.series.length - 1].id || option.series[option.series.length - 1].id !== "xzyl") {
                option.series.push({
                    id: 'xzyl',
                    name: "修正日雨量",
                    data: upData,
                    type: 'line',
                    smooth: true,
                    symbolSize: 10,
                    lineStyle: {
                        type: "dashed"
                    }
                })
            } else {
                option.series[option.series.length - 1].data.push(pointInGrid);
            }
            tools_panel.chartMod.setOption(option);
            return false;
        });
        zr.off('contextmenu')
        zr.on('contextmenu', (params) => { //右键取消设置点
            if (upData.length > 0) {
                let option = tools_panel.chartMod.getOption()
                upData.pop();//删除最后一个点
                option.series[option.series.length - 1].data = upData;
                tools_panel.chartMod.setOption(option);
                return false;
            }
        });
    } else { //取消设置点
        setTimeout(function () {
            tools_panel.chartMod.setOption({
                graphic: upData.map(function (item, dataIndex) {
                    return {
                        type: 'circle',
                        position:tools_panel.chartMod.convertToPixel({
                            xAxisId: 'x_t',
                            yAxisId: 'y_m'
                        }, item),
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: 10 / 2
                        },
                        invisible: true,
                        draggable: true,
                        ondrag: function (dx, dy) {
                            onPointDraggingYl(dataIndex, [dx.offsetX, dx.offsetY]);
                        },
                        onmousemove: function () {
                            showTooltipYl(dataIndex);
                        },
                        onmouseout: function () {
                            hideTooltipYl(dataIndex);
                        },
                        z: 100
                    };
                })
            });
        }, 0)
        window.addEventListener('resize', updatePositionYl);
        zr.off("click");
    }
})

function onPointDraggingYl (dataIndex, pos) {
    upData[dataIndex] = tools_panel.chartMod.convertFromPixel({
        xAxisId: 'x_t',
        yAxisId: 'y_m'
    }, pos);
    upData[dataIndex][1] = upData[dataIndex][1].toFixed(2)
    tools_panel.chartMod.setOption({
        series: [
            {
                id: "xzyl",
                data: upData
            }
        ]
    })
}
function updatePositionYl () {
    tools_panel.chartMod.setOption({
        graphic: upData.map(function (item, dataIndex) {
            return {
                position: tools_panel.chartMod.convertToPixel({
                    xAxisId: 'x_t',
                    yAxisId: 'y_m'
                }, item)
            };
        })
    });
}
function showTooltipYl (dataIndex) {
    tools_panel.chartMod.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: dataIndex
    });
}
function hideTooltipYl (dataIndex) {
    tools_panel.chartMod.dispatchAction({
        type: 'hideTip'
    });
}


//成线
let newData = []
$("#btnMake").on('click',function(){
    if(upData.length < 4){
        tools.show_message_error_const("请传入大于等于4个点")
        return
    }

    let len = tools_panel.chartMod.getOption().xAxis[0].data.length
    let pointList = []
    $.each(upData , function(index , item){
        pointList.push({
            "lno":item[0],
            "p":item[1]
        })
    })
    let param = {
        "length":len,
        "pointList":pointList
    }

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-rainsituation/basin/genlineByPoint",
        data: JSON.stringify(param),
        success:function(res){
            if(res.code === 200){
                let data = res.data
                let option = tools_panel.chartMod.getOption()
                //先置空
                newData = data
                tempData = []
                $.each(data,function(index , item){
                    tempData.push(item.p)
                })

                //取消选点
                option.series.pop()

                //将上一次生成的曲线取消
                if(option.series[option.series.length - 1].name === "日雨量修正曲线"){
                    option.legend[0].data.pop()
                    //需要pop 2次 因为一个为条形图 一个为柱状图
                    option.series.pop()
                    option.series.pop()
                }
                option.legend[0].data.push("日雨量调整曲线");
                option.series.push({
                    type: 'line',
                    name: "日雨量调整曲线",
                    symbol: "circle",
                    lineStyle: {
                        color: '#ff733c'
                    },
                    itemStyle: {
                         color: '#ff733c'
                    },
                    showSymbol: false,
                    connectNulls: true, //连接空数据
                    smooth: true, //平滑显示曲线
                    smoothMonotone: "none",
                    data: tempData
                 },{
                    type: 'bar',
                    name: "日雨量调整曲线",
                    barWidth:"10px",
                    lineStyle: {
                        color: '#ff733c'
                    },
                    itemStyle: {
                         color: '#ff733c'
                    },
                    data: tempData
                 })
                tools_panel.chartMod.setOption(option,true);
                upData = []
                $("#btnGet").bootstrapSwitch("state", false)
            }else{
                tools.show_message_error_const(res.message)
            }
        },
        error:function(msg){
            tools.show_message_error_const(msg)
        }
    })
})

// //保存点
$("#btnIn").on('click',function(){

    layer.prompt({
        formType: 0,
        value: '',
        title: '输入生成曲线名称'
    }, function(value ,index, elem){
        layer.close(index)
        let param = {
            "comment":value,
            "pfid":pfid,
            "pointList":newData
        }
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'json',
            headers: {
                "Authorization": getCookie("accessToken")
            },
            url: apiUrl_cloud + "api-rainsituation/basin/addDpdbPInfo",
            data: JSON.stringify(param),
            success:function(res){
                if(res.code === 200){
                    //重新初始化下拉框
                    init_rain_model()
                    //关闭曲线面板
                    tools.hidePanelIndex("panel_jyzzt")
                    tools.show_message_success("保存成功")
                }else{
                    tools.show_message_error_const(res.message)
                }
            },
            error:function(msg){
                tools.show_message_error_const(msg)
            }
        })
    },function(){
        return
    })
})
