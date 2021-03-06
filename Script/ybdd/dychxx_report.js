//# sourceURL=dychxx_report.js
//报表默认宽高
let default_par_width_report = 1300;
let default_par_height_report = 740;
let json_data = null;
let dychxx_table_name = "单元产汇流信息";
let dychxxData = null

$(".show_dychxx").hide();
$(".show_dychxx").parent().hide();
//最大化按钮事件
$(".report-dychxx .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $("#panel_dychxx").width(default_par_width_report).height(default_par_height_report).css({
            "left": "calc(50% - " + (default_par_width_report / 2) + "px)",
            "top": "calc(50% - " + (default_par_height_report / 2) + "px)",
            "margin-left": "0px",
            "margin-top": "0px",
            "position":"absolute"
        });
        //设置echarts图表区域
        $("#dychxxEchart").css({
            "width":"1090px",
            "height":"500px",
        })
        $(this).attr("data-type", "");
    } else {
        $("#panel_dychxx").width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });
        $("#dychxxEchart").width($(window).width()-200).height($(window).height()-300)
        //动态设置报表高度
        // setParSizeDychxx($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
    }
    tools_panel.chartDychxx.resize()
});
//关闭按钮事件
$(".report-dychxx .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#para_check").removeAttr("checked");
    $("#show_dychxx").removeAttr("checked");
});
$("#show_dychxx").on('change',function () {
    if ($("#show_dychxx").is(':checked')) {
        $("#panel_dychxx").width(default_par_width_report).height(default_par_height_report)
        $("#panel_dychxx").show();
        searchType = 4
        //默认触发树形菜单的一个菜单点击事件
        $("#hdNode_dychxx li").eq(0).find('a').trigger('click')
        tools.showPanelIndex("panel_dychxx");
        $("#panel_dychxx .modal-title").html(dychxx_table_name);
        $("#panel_dychxx").css({
            "left": "calc(50% - " + (default_par_width_report / 2) + "px)",
            "top": "calc(50% - " + (default_par_height_report / 2) + "px)",
            "margin-left": "0px",
            "margin-top": "0px",
            "position":"absolute"
        });
    } else {
        $("#panel_dychxx").hide();
    }
})
//初始画方法
function initPanel(data){
    initEcharts(data);
    // initLeftTable(data);
    initBottomTable(data);
}


//默认时选择第一个模型进行展示
//雨量 产流深 柱状图  径流量 折线图
function initEcharts(data){
    let model = selectModes.split(",")
    let modelData = data[model[0]+"_Info"]
    let statisData = modelData.statis
    let echartData = modelData.data
    let dataName = modelData.dataName
    let areaName = statisData[0][0]
    let areaData = echartData[areaName]
    let yl = []
    let cls = []
    let jll = []
    let dt = []
    $.each(areaData , function(index , item){
        dt.push(item[0]) //时间
        yl.push({value:[item[0],Number(item[1] == '.0'?"0":item[1])]}) //雨量
        cls.push({value:[item[0],Number(item[2] == '.0'?"0":item[2])]}) //产流深
        jll.push({value:[item[0],Number(item[3] == '.0'?"0":item[3])]}) //径流量
    })

    let Colors = ['#d9ca00','#08e3b8','#d28602']

    let serise = [{
        name:'雨量',
        type:'bar',
        itemStyle: {
            color: Colors[0]
        },
        data:yl
    },{
        name:'产流深',
        type:'bar',
        itemStyle: {
            color: Colors[1]
        },
        data:cls
    },{
        name:'径流量',
        type:'line',
        yAxisIndex: 1,
        showSymbol:false,
        itemStyle: {
            color: Colors[2]
        },
        data:jll
    }]
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid:{
            left:'5%',
            right:'5%'
        },
        legend:{
            data:['雨量' , '产流深' ,'径流量']
        },
        dataZoom:{
            show: true,
            type: "slider",
            height: 20,
            start: 0,
            end: 50,
            textStyle: {
                color: '#ffffff'
            }
        },
        xAxis:[{
            id:'dt',
            // splitNumber:20,
            name:'时间',
            type:'time',
            // data:dt
        }],
        yAxis:[{
            type: 'value',
            name: '雨量(mm)',
            position: 'left',
            axisLine: {
                show: true,
                lineStyle: {
                    color: Colors[1]
                }
            }
        }, {
            type: 'value',
            name: '径流量(m³/s)',
            position: 'right',
            axisLine: {
                show: true,
                lineStyle: {
                    color: Colors[2]
                }
            }
        }],
        series:serise
    }
    if(!tools_panel.chartDychxx){
        tools_panel.chartDychxx = echarts.init($("#dychxxEchart")[0])
    }
    tools_panel.chartDychxx.setOption(option)
}

function initLeftTable(data){

}

function initBottomTable(data){
    let model = selectModes.split(",")
    let modelName = selectModelsName.split(",")

    $("#panel_dychxx .table_dychxx_header table colgroup col").remove();
    $("#panel_dychxx .table_dychxx colgroup col").remove()
    $("#panel_dychxx .table_dychxx_header thead tr").remove();
    $("#panel_dychxx .table_dychxx thead tr").remove();
    $("#panel_dychxx .table_dychxx tbody tr").remove();

    let _html_tj_thead = "";
    let _html_col = "";
    //循环模型
    $.each(model , function (index, item){
        //获取每个数据
        let modelData = data[item+"_Info"]
        //表数据
        let statisData = modelData.statis
        //表头名称
        let statisNameData = modelData.statisName
        //只循环第一次生成表头
        if(index === 0){
            //设单元格尺寸
            _html_col += "<col style='width: 7%;' />";
            _html_col += "<col style='width: 20%;' />";
            _html_col += "<col style='width: 22%;' />";
            _html_col += "<col style='width: 10%;' />";
            _html_col += "<col style='width: 8%;' />";
            _html_col += "<col style='width: 8%;' />";
            _html_col += "<col style='width: 8%;' />";
            _html_col += "<col style='width: 10%;' />";
            _html_col += "<col style='width: 7%;' />";
            $("#panel_dychxx .table_dychxx_header table colgroup").append(_html_col);
            $("#panel_dychxx .table_dychxx colgroup").append(_html_col)
            _html_tj_thead = "<tr><th>是否显示</th><th>预报模型</th>";
            $.each(statisNameData ,function (idx , itemName){
                _html_tj_thead += "<th>" + itemName + "</th>";
            })
            _html_tj_thead += "<tr>";
            $("#panel_dychxx .table_dychxx_header table thead").append(_html_tj_thead);
        }
        $.each(statisData, function (i, itemData) {
             if(index === 0){
                 $("#panel_dychxx .table_dychxx tbody").append("<tr class= 'linkModel hover' _data= '" + item + "'><td>" +
                     "<input type='checkbox' class='model_yb_check' checked /></td>" +
                     "<td>" + modelName[index] + "</td>" +
                     "<td>" + (itemData[0]?itemData[0]:'') +"</td>" +
                     "<td>" + (itemData[1]?itemData[1]:'') + "</td>" +
                     "<td>" + (itemData[2]?itemData[2]:'') + "</td>" +
                     "<td>" + (itemData[3]?itemData[3]:'') + "</td>" +
                     "<td>" + (itemData[4]?itemData[4]:'') + "</td>" +
                     "<td>" + (itemData[5]?itemData[5]:'') + "</td>" +
                     "<td>" + (itemData[6]?itemData[6]:'') + "</td>" +
                     "</tr>");
             }else{
                 $("#panel_dychxx .table_dychxx tbody").append("<tr class= 'linkModel' _data= '" + item + "'><td>" +
                     "<input type='checkbox' class='model_yb_check' /></td>" +
                     "<td>" + modelName[index] + "</td>" +
                     "<td>" + (itemData[0]?itemData[0]:'') +"</td>" +
                     "<td>" + (itemData[1]?itemData[1]:'') + "</td>" +
                     "<td>" + (itemData[2]?itemData[2]:'') + "</td>" +
                     "<td>" + (itemData[3]?itemData[3]:'') + "</td>" +
                     "<td>" + (itemData[4]?itemData[4]:'') + "</td>" +
                     "<td>" + (itemData[5]?itemData[5]:'') + "</td>" +
                     "<td>" + (itemData[6]?itemData[6]:'') + "</td>" +
                     "</tr>");
             }
        });

    })
}
/**
 * 获取参数信息
 */
function get_dychxx_data(searchRange, searchStime,searchEtime , _stcd) {
    // tools.loadingshow("查询单元产汇流信息中...", arrRange_dychxx_lodingtime[Number(searchRange) - 1]);
    let objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays:selectDays,
        hisStormId: _hisStormId,
        meteorPattern:meteor || "EC,GM",
        model: selectModes,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: searchRange,
        startTime: searchStime,
        stcd:_stcd
    };
    let info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-realsituate/GetUnitRunoffInfos",
        data: info,
        success: function (data) {
            let res = data;
            if (res === "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("查询信息失败！");
                return;
            }
            dychxxData = res.data
            initPanel(dychxxData)
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }

    });
}


//行点击事件
//单站统计表点击事件
$("#panel_dychxx .table_dychxx").on("click", ".linkModel", function (e) {
    let model = $(this).attr("_data");
    //判断模型是否勾选
    if (!$(this).find("input").is(':checked')) {
        //未勾选则勾选，echarts展示该模型曲线
        eventHandle(this , model)
    }
});

// //单站统计表checkbox点击事件
$("#panel_dychxx .table_dychxx").on("click", "input[type='checkbox']", function (e) {
    e.stopPropagation();//阻止冒泡
    let model = $(this).parent().parent().attr("_data");
    if (!$(this).is(':checked')) {
        eventHandle(this, model)
    }
})

function eventHandle(_this, model){
    $("#panel_dychxx .table_dychxx").find("input").prop("checked",false)
    $(_this).find("input").prop("checked", true);
    $("#panel_dychxx .table_dychxx tr").removeClass("hover");
    $(_this).addClass("hover");
    changeSerise(model)
}

//修改表格数据
function changeSerise(model){
    let modelData = dychxxData[model+"_Info"]
    let statisData = modelData.statis
    let echartData = modelData.data
    let areaName = statisData[0][0]
    let areaData = echartData[areaName]
    let yl = []
    let cls = []
    let jll = []
    $.each(areaData , function(index , item){
        yl.push({value:[item[0],Number(item[1] == '.0'?"0":item[1])]}) //雨量
        cls.push({value:[item[0],Number(item[2] == '.0'?"0":item[2])]}) //产流深
        jll.push({value:[item[0],Number(item[3] == '.0'?"0":item[3])]}) //径流量
    })
    let option = {
        series:[{
            name:'雨量',
            type:'bar',
            data:yl
        },{
            name:'产流深',
            type:'bar',
            data:cls
        },{
            name:'径流量',
            type:'line',
            yAxisIndex: 1,
            showSymbol:false,
            data:jll
        }]
    }
    tools_panel.chartDychxx.setOption(option)
}

//报表通用可拖拽事件
$(".report-dychxx").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

//面板添加点击事件 保证操作面板在最上层
$(".report-dychxx").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});
