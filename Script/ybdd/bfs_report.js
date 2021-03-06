//# sourceURL=bfs_report.js
//报表默认宽高
let default_par_width_report = 900;
let default_par_height_report = 500;
let json_data = null;
let bfs_table_name = "概率预报";

$(".show_bfs").hide();
// $(".show_bfs").parent().hide();
//关闭按钮事件
$(".report-bfs .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");
    $("#show_bfs").removeAttr("checked");
});

$("#show_bfs").on('change',function () {
    if ($("#show_bfs").is(':checked')) {
        $("#panel_bfs").show();
        $("#panel_bfs .modal-title").html(bfs_table_name);
        tools.showPanelIndex("panel_bfs");
        //面板居中
        $(".report-bfs").width(default_par_width_report).height(default_par_height_report)
        $(".report-bfs").css({
            "left": "calc(50% - " + (default_par_width_report / 2) + "px)",
            "top": "calc(50% - " + (default_par_height_report / 2) + "px)",
            "margin-left": "0px",
            "margin-top": "0px",
            "position":"absolute"
        });
        initBfsEcharts()
    } else {
        $("#panel_bfs").hide();
    }
})

//报表通用可拖拽事件
$(".report-bfs").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

//面板添加点击事件 保证操作面板在最上层
$(".report-bfs").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});


$(".select-bfs").delegate('#selbfs', 'change', function (event) {
    initBfsEcharts();
})




//初始化概率预报模型echarts图
function initBfsEcharts(){
    let stcdBfs = $("#selbfs  option:selected").val();
    let param = {
        "endTime": searchEtime,
        "startTime": searchStime,
        "stcd": stcdBfs
    }
    let info = JSON.stringify(param)

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-models/bfsCalc",
        data: info,
        success: function (res) {
            if(res.code === 200){
                //预报区间上限
                let ybqjQup = []
                //预报区间下限
                let ybqjQdw = []
                //预报实测
                let ybsc = []
                //确定性预报
                let qdxyb = []
                //预报倾向
                let ybqx = []
                //时间
                // let ts = []
                let legendName = ["5%-95%的预报区间","实测值","确定性预报结果","预报倾向值"]
                let ybData = res.data
                $.each(ybData , function(index,item){
                    // let t1 = []
                    // let t2 = []
                    //面积图的堆积作用 会是最大值+最小值
                    ybqjQup.push({value:[item.tm , Number(item.qup)-Number(item.qdw)]})
                    ybqjQdw.push({value:[item.tm , item.qdw]})
                    // ybqj.push({
                    //     "qup":item.qup,
                    //     "qdw":item.qdw
                    // })
                    if(item.q !== 0){
                        ybsc.push({value:[item.tm,item.q]})
                    }
                    qdxyb.push({value:[item.tm,item.apiQ]})
                    ybqx.push({value:[item.tm,item.qs]})
                    // ts.push(item.tm)
                })

                let ybEchart = echarts.init($("#chart-bfs")[0])
                let series = [{
                    type:"line",
                    name: "5%-95%的预报区间",
                    stack: 'confidence-band',
                    lineStyle:{
                        opacity:0,
                        color:"#00dbdb"
                    },
                    itemStyle:{
                        color:"#00dbdb"
                    },
                    showSymbol: false,
                    data:ybqjQdw
                },{
                    type:"line",
                    name: "5%-95%的预报区间",
                    stack: 'confidence-band',
                    lineStyle:{
                        opacity:0,
                        color:"#00dbdb"
                    },
                    itemStyle:{
                        color:"#00dbdb"
                    },
                    showSymbol: false,
                    areaStyle: {},
                    data:ybqjQup
                },{
                    type:"scatter",
                    name: "实测值",
                    lineStyle:{
                        color:"#f83939"
                    },
                    symbolSize: 6,
                    itemStyle:{
                        color:"#f83939"
                    },
                    data:ybsc
                },{
                    type:"line",
                    name: "确定性预报结果",
                    lineStyle:{
                        color:"#f275fc"
                    },
                    itemStyle:{
                        color:"#f275fc"
                    },
                    showSymbol: false,
                    data:qdxyb
                },{
                    type:"line",
                    name: "预报倾向值",
                    lineStyle:{
                        color:"#246af5"
                    },
                    itemStyle:{
                        color:"#246af5"
                    },
                    data:ybqx
                }]

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        formatter:function (params){
                            let str = params[0].axisValueLabel + "<br />";
                            let ybTip = []
                            for (let i = 0; i < params.length; i++) {
                                if(params[i].seriesName === "5%-95%的预报区间"){
                                    ybTip.push(params[i].data.value[1])
                                    if(str.indexOf("5%-95%的预报区间") > -1 ){
                                        continue
                                    }
                                    str +=
                                        '<span style="display:inline-block;margin-right:5px;border-radius:50%;' +
                                        'width:10px;height:10px;left:5px;background-color:'+params[i].color+'">' +
                                        '</span>' + params[i].seriesName + " : ybTips <br />";
                                }else{
                                    str +=
                                        '<span style="display:inline-block;margin-right:5px;border-radius:50%;' +
                                        'width:10px;height:10px;left:5px;background-color:'+params[i].color+'">' +
                                        '</span>' + params[i].seriesName + " : " + params[i].data.value[1] + "<br />";
                                }
                            }
                            return str.replace("ybTips", ybTip[0] + "-" + (Number(ybTip[0])+Number(ybTip[1])))
                        }
                    },
                    //条目
                    legend:{
                        data:legendName
                    },
                    grid:{
                        left: "12%"
                    },
                    //配置x轴
                    xAxis:{
                        splitNumber:20,
                        name:"日期",
                        type:"time",
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:"dashed",
                                color:"#c0fffb"
                            }
                        },
                        axisLabel:{
                            rotate:20,
                            formatter:function(value, index){
                                return moment(value).format("DD日HH时")
                            }
                        }
                    },
                    //配置y轴
                    yAxis:{
                        name:"流量(m³/s)",
                        type:"value",
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:"dashed",
                                color:"#c0fffb"
                            }
                        }
                    },
                    //配置曲线集
                    series:series
                }
                ybEchart.setOption(option,true)

            }else{
                tools.show_message_error_const(res.message)
            }
        },
        error:function(error){
            if(error.statusText === "Internal Server Error"){
                tools.show_message_error_const("服务器异常")
            }else{
                tools.show_message_error_const(error.statusText)
            }
        }
    })
}
