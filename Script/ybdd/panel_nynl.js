//报表默认宽高
var default_width_report = $(window).width() * 0.8;
var default_height_report = $(window).height() * 0.8;
//设置弹出框最小的宽高
if (default_width_report < 900)
    default_width_report = 900;
if (default_height_report < 460)
    default_height_report = 460;
var default_height_detail = 0; //详细表高度
var default_height_count = 0;  //汇总表高度
//地市
var arrDs = new Array();
var arrDsOnly = new Array();
//流域
var arrLy = new Array();
//全部测站
var arrStationAll = new Array();
//参数默认值
var default_params = "300@0.3,0.4,0.5,0.625,0.7,0.75|0.3,0.4,0.5,0.625,0.7,0.75|0.3,0.4,0.5,0.625,0.7,0.75|0.3,0.4,0.5,0.625,0.7,0.75";
var user_params = "";
//参数-雨量级别
var default_arr_rain = ["50", "100", "150", "200", "250", "300"];
var table = null;
var tableCount = null;
var isFirstShow_Detail = true;
var isFirstShow_Count = true;
//导出word地址
var url_word = "";

$(document).ready(function () {
    
    tools.add_tab_click("#panelMain");
    //初始化日期
    tools.init_datapicker(".form-date-nynl", "yyyy-mm-dd", 2);
    tools.init_select_hour("#endHour");
    $("#txtEndTime").val(moment().format("YYYY-MM-DD"));
    $("#endHour").val(moment().format("HH"));
    $(".form-date-nynl").datetimepicker('update');
    //触发日期改变事件 判断下拉列表是否禁用 add by hzx 2022-06-17
    tools.maual_update_maxhour("txtEndTime","endHour");

    //时间控件 最大日期动态更新 add by hzx 2022-06-13
    tools.auto_update_maxdate("#txtEndTime");
    //时间+小时控件精确到小时可先控制更新 add by hzx 2022-06-17
    tools.auto_update_maxhour([{
        date:"txtEndTime",
        hour:"endHour"
    }]);

    //下拉多选初始化
    $('.selectpickerNor').selectpicker({
        style: 'btn-default',
        multipleSeparator: ",",            //分隔符
        width: "571px"
    });
    //纳雨能力checkbox点击事件
    $("#show_nynl").on('change', function () {
        if ($("#show_nynl").is(':checked')) {
            $("#panelMain").show();
            tools.showPanelIndex("panelMain");
        } else {
            $("#panelMain").hide();
        }
    })

    //站点初始化
    initCondition();
    initMuliSelect("listRain");
    // initSinSelect("listYljb");
    $("#listRain").selectpicker("val", ["50", "100", "150"]);

    $("#listRain").parent().click(function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open')
        } else {
            $(this).addClass('open')
        }
    })

    /**
     * 导出汇总excel
     **/
    $("#btnExportExcel").click(function () {
        tools.table_export_excel({
            fileName: "水库纳雨能力" + moment($("#txtEndTime").val() + " " + $("#endHour").val() + ":00:00").format("YYYYMMDDHH"),
            tableId: ["#table", "#tableCount"],
            sheetName: ["计算表", "汇总表"]
        });
    });

    /**
     * 设为默认值
     **/
    $("#btnDefault").click(function () {
        initParam(default_params);
    });

    /**
    * 设为默认值
    **/
    $("#btnSaveSet").click(function () {
        var _param = $("#txtRain6").val() + "@" + getParam();
        //保存用户配置
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "user/saveUserSetting",
            data: JSON.stringify({
                sqlType: user_params != "" ? "2" : "1",
                userId: $("#hid_user_id").val(),
                type: "1",
                info: _param,
                createTime: moment().format("YYYY-MM-DD HH:mm:ss")
            }),
            cache: false,
            success: function (json) {
                if (json == null || json == undefined) {
                    tools.show_message_error("保存用户配置失败!");
                    return;
                }
                if (json.code == 0) {
                    tools.show_message_error(json.msg);
                    return;
                }
                user_params = _param;
                tools.show_message_success("保存用户配置成功!");
            },
            error: function (e) {
                tools.show_message_error("保存用户配置失败!");
            }
        });
    });

    /**
     * 查询按钮
     **/
    $("#btnSearch").click(function () {
        isFirstShow_Detail = true;
        isFirstShow_Count = true;
        url_word = "";
        //时间
        var time = $("#txtEndTime").val() + " " + $("#endHour").val() + ":00:00";
        //查询时间不能超过当前时间+1小时
        if (moment(time).isAfter(moment().add(1, "hours"))) {
            tools.show_message_error("查询时间过大，请重新选择！");
            return;
        }

        //选站
        var typeInfo = getCondition();
        //径流系数
        var rainParam = getParam();
        //汇总表中的雨量级别（通用）
        var rainCount = $("#listRain").val();
        if (rainCount == null || rainCount.length == 0) {
            tools.show_message_error("请选择降雨量级参数!");
            return;
        }
        var rainXx = rainCount;
        var rainXl = rainCount;
        var rainSj = rainCount;
        var rainJh = rainCount;
        //计算表预泄水量计算
        var listYx = $("#listYXSW").val();
        var isYx = listYx==""?false:true;
        var yxXx = {
            isShow: (listYx == "1" || listYx == "2" || listYx == "3"),
            value: rainCount
        };
        var yxXl = {
            isShow: (listYx == "4"),
            value: rainCount
        };
        var yxSj = {
            isShow: (listYx == "5"),
            value: rainCount
        };
        var yxJh = {
            isShow: (listYx == "6"),
            value: rainCount
        };

        //汇总查询条件
        var objData = {
            time: time,
            type: $("#selectType").val(),
            typeInfo: typeInfo,
            rain: default_arr_rain.join(","),
            rainXx: rainXx.join(","),
            rainXl: rainXl.join(","),
            rainSj: rainSj.join(","),
            rainJh: rainJh.join(","),
            rainCount: rainCount.join(","),
            rainOut: rainParam,
            yx: isYx ? "1" : "0",
            xx: (listYx == "1" || listYx == "2" || listYx == "3") ? listYx : "",
            excelIn: "0",
            excelInfo: [],
            addvcd: "37",
            bxOrGc: $('input:radio[name="swTypeNynl"]:checked').val()
        };

        //调用接口
        // $("#span_loading").html("计算水库纳雨能力中...");
        $(".loading-layer").show();
        // tools.removeOverLayers("overlay_gj");
        // tools.removeLayers("type", "station");
        // tools.map_data.arr_rr_gj = new Array();
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            url: apiUrl_zf+ "rs/get_sk_nynl",
            data: JSON.stringify(objData),
            success: function (data) {
                if (data == "" || data == null) {
                    tools.show_message_error("计算水库纳雨能力失败!");
                    $(".loading-layer").hide();
                    return;
                }
                //解析数据
                if (data.code != "1") {
                    tools.show_message_error(data.msg);
                    $(".loading-layer").hide();
                    return;
                }

                url_word = data.url;
                // //地图上显示告警（深拷贝方式 避免该数组联动修改 upd by hzx 2020-08-19）
                // tools.map_data.arr_rr_gj = JSON.parse(JSON.stringify(data.dataDetail));
                // tools.draw_sk_gj(rainXx, rainXl, rainSj, rainJh, $("#listYljb").val(), $("#chkSk1").is(':checked'), $("#chkSk2").is(':checked'), $("#chkSk3").is(':checked'), $("#chkSk4").is(':checked'), $("#chkSkName").is(':checked'));

                //汛限水位列名 动态判断 add by hzx 2022-06-07
                var titleX1 = "至汛限</br>水位差";
                var titleX2 = "汛限水位</br>(m)";
                if(listYx == "1" || listYx== "2" || listYx== "3") {
                    if (listYx == "1") {
                        titleX1 = "至汛中限</br>制水位差";
                        titleX2 = "汛中限制</br>水位(m)";
                    } else if (listYx == "3") {
                        titleX1 = "至汛中超</br>蓄水位差";
                        titleX2 = "汛中超</br>水位(m)";
                    } else if (listYx == "2") {
                        titleX1 = "至汛末</br>蓄水位差";
                        titleX2 = "汛末蓄</br>水位(m)";
                    }
                }

                //先生成columns
                var columns1_lock = [{
                    title: '序号',
                    data: 'xh',
                    orderable: false,
                    rowspan: 2,
                    width: 40
                }, {
                    title: '地市',
                    data: 'ds',
                    orderable: true,
                    type: "chinese-string",
                    rowspan: 2,
                    width: 60
                }, {
                    title: '站码',
                    data: 'stcd',
                    orderable: true,
                    type: "chinese-string",
                    rowspan: 2,
                    width: 80
                }, {
                    title: '站名',
                    data: 'stnm',
                    orderable: true,
                    type: "chinese-string",
                    rowspan: 2,
                    width: 100
                }, {
                    title: '水系',
                    data: 'bsnm',
                    orderable: true,
                    type: "chinese-string",
                    rowspan: 2,
                    width: 90
                }, {
                    title: '集水</br>面积',
                    data: 'jsmj',
                    orderable: false,
                    rowspan: 2,
                    width: 50
                }, {
                    title: '区间</br>面积',
                    data: 'qjmj',
                    orderable: false,
                    rowspan: 2,
                    width: 50
                }, {
                    title: '时间',
                    data: 'tm',
                    orderable: false,
                    rowspan: 2,
                    width: 150
                }, {
                    title: '蓄水量',
                    data: 'w',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: titleX1,
                    data: 'xxsw_D',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: titleX2,
                    data: 'xxsw',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '兴利水位</br>(m)',
                    data: 'xlsw',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '设计水位</br>(m)',
                    data: 'sjsw',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '校核水位</br>(m)',
                    data: 'jhsw',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '汛限库容</br>(百万方)',
                    data: 'xxkr',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '兴利库容</br>(百万方)',
                    data: 'xlkr',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '设计库容</br>(百万方)',
                    data: 'sjkr',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '校核库容</br>(百万方)',
                    data: 'jhkr',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }, {
                    title: '总库容</br>(百万方)',
                    data: 'zkr',
                    orderable: true,
                    type: "number-sort",
                    rowspan: 2,
                    width: 75
                }];

                //第一行非固定列
                var columns1_unset = [{
                    title: '可接纳净雨(mm)',
                    colspan: 4,
                    className:"td_border_left"
                }, {
                    title: '产生的净雨(mm)',
                    colspan: default_arr_rain.length,
                    className:"td_border_left"
                }, {
                    title: '产水量(百万方)',
                    colspan: default_arr_rain.length,
                    className:"td_border_left"
                }, {
                    title: '是否超汛限',
                    colspan: rainXx.length,
                    className:"td_border_left"
                }, {
                    title: '是否超兴利',
                    colspan: rainXl.length,
                    className:"td_border_left"
                }, {
                    title: '是否超设计',
                    colspan: rainSj.length,
                    className:"td_border_left"
                }, {
                    title: '是否超校核',
                    colspan: rainJh.length,
                    className:"td_border_left"
                }];
                //预泄水量相关
                var columns1_yx = new Array();
                if(yxXx.isShow){
                    columns1_yx.push({
                        title: '至汛限预泄水量',
                        colspan: yxXx.value.length,
                        className:"td_border_left"
                    })
                }
                if(yxXl.isShow){
                    columns1_yx.push({
                        title: '至兴利预泄水量',
                        colspan: yxXl.value.length,
                        className:"td_border_left"
                    })
                }
                if(yxSj.isShow){
                    columns1_yx.push({
                        title: '至设计预泄水量',
                        colspan: yxSj.value.length,
                        className:"td_border_left"
                    })
                }
                if(yxJh.isShow){
                    columns1_yx.push({
                        title: '至校核预泄水量',
                        colspan: yxJh.value.length,
                        className:"td_border_left"
                    })
                }
                //最高水位、超限水深
                var columns1_unset2 = new Array();
                columns1_unset2.push({
                    title: '最高水位',
                    colspan: rainCount.length,
                    className:"td_border_left"
                });
                columns1_unset2.push({
                    title: '超限水深',
                    colspan: rainCount.length,
                    className:"td_border_left"
                });

                //第二行表头
                var sub_columns = [{
                    title: '至汛限',
                    data: 'rainXx',
                    orderable: true,
                    type: "number-sort",
                    width: "70px",
                    className:"td_border_left"
                }, {
                    title: '至兴利',
                    data: 'rainXl',
                    orderable: true,
                    type: "number-sort",
                    width: 70
                }, {
                    title: '至设计',
                    data: 'rainSj',
                    orderable: true,
                    type: "number-sort",
                    width: 70
                }, {
                    title: '至校核',
                    data: 'rainJh',
                    orderable: true,
                    type: "number-sort",
                    width: 70
                }];
                for (var i = 0; i < default_arr_rain.length; i++) {
                    var objCol = {
                        title: default_arr_rain[i] + "mm",
                        data: "rain" + default_arr_rain[i],
                        orderable: true,
                        type: "number-sort",
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < default_arr_rain.length; i++) {
                    var objCol = {
                        title: default_arr_rain[i] + "mm",
                        data: "water" + default_arr_rain[i],
                        orderable: true,
                        type: "number-sort",
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < rainXx.length; i++) {
                    var objCol = {
                        title: rainXx[i] + "mm",
                        data: "isXx" + rainXx[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < rainXl.length; i++) {
                    var objCol = {
                        title: rainXl[i] + "mm",
                        data: "isXl" + rainXl[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < rainSj.length; i++) {
                    var objCol = {
                        title: rainSj[i] + "mm",
                        data: "isSj" + rainSj[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < rainJh.length; i++) {
                    var objCol = {
                        title: rainJh[i] + "mm",
                        data: "isJh" + rainJh[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                //预泄水量相关
                if(yxXx.isShow){
                    for (var i = 0; i < yxXx.value.length; i++) {
                        var objCol = {
                            title: yxXx.value[i]+ "mm",
                            data: "YxXx" + yxXx.value[i],
                            orderable: false,
                            width: 50
                        };
                        if (i == 0) {
                            objCol.className = "td_border_left";
                        }
                        sub_columns.push(objCol);
                    }
                }
                if(yxXl.isShow){
                    for (var i = 0; i < yxXl.value.length; i++) {
                        var objCol = {
                            title: yxXl.value[i]+ "mm",
                            data: "YxXl" + yxXl.value[i],
                            orderable: false,
                            width: 50
                        };
                        if (i == 0) {
                            objCol.className = "td_border_left";
                        }
                        sub_columns.push(objCol);
                    }
                }
                if(yxSj.isShow){
                    for (var i = 0; i < yxSj.value.length; i++) {
                        var objCol = {
                            title: yxSj.value[i]+ "mm",
                            data: "YxSj" + yxSj.value[i],
                            orderable: false,
                            width: 50
                        };
                        if (i == 0) {
                            objCol.className = "td_border_left";
                        }
                        sub_columns.push(objCol);
                    }
                }
                if(yxJh.isShow){
                    for (var i = 0; i < yxJh.value.length; i++) {
                        var objCol = {
                            title: yxJh.value[i]+ "mm",
                            data: "YxJh" + yxJh.value[i],
                            orderable: false,
                            width: 50
                        };
                        if (i == 0) {
                            objCol.className = "td_border_left";
                        }
                        sub_columns.push(objCol);
                    }
                }
                //最高水位、超限水深
                for (var i = 0; i < rainCount.length; i++) {
                    var objCol = {
                        title: rainCount[i]+ "mm",
                        data: "levelZg" + rainCount[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }
                for (var i = 0; i < rainCount.length; i++) {
                    var objCol = {
                        title: rainCount[i]+ "mm",
                        data: "levelCx" + rainCount[i],
                        orderable: false,
                        width: 50
                    };
                    if (i == 0) {
                        objCol.className = "td_border_left";
                    }
                    sub_columns.push(objCol);
                }

                //初始化数据表格
                if (table != null) {
                    table.clear();
                    table.destroy();
                }
                table = null;
                //先加表头
                var _html_head = new StringBuffer();
                $("#table thead tr").remove();
                _html_head.append("<tr class='tr40'>");
                for (var i = 0; i < columns1_lock.length; i++) {
                    _html_head.append("<th rowspan='2'>" + columns1_lock[i].title + "</th>");
                }
                for (var i = 0; i < columns1_unset.length; i++) {
                    _html_head.append("<th class='" + (columns1_unset[i].hasOwnProperty("className") ? columns1_unset[i].className : "") + "' colspan='" + columns1_unset[i].colspan + "'>" + columns1_unset[i].title + "</th>");
                }
                if(columns1_yx != null && columns1_yx.length > 0) {
                    for (var i = 0; i < columns1_yx.length; i++) {
                        _html_head.append("<th class='" + (columns1_yx[i].hasOwnProperty("className") ? columns1_yx[i].className : "") + "' colspan='" + columns1_yx[i].colspan + "'>" + columns1_yx[i].title + "</th>");
                    }
                }
                for (var i = 0; i < columns1_unset2.length; i++) {
                    _html_head.append("<th class='" + (columns1_unset2[i].hasOwnProperty("className") ? columns1_unset2[i].className : "") + "' colspan='" + columns1_unset2[i].colspan + "'>" + columns1_unset2[i].title + "</th>");
                }
                _html_head.append("</tr><tr class='tr40'>");
                for (var i = 0; i < sub_columns.length; i++) {
                    _html_head.append("<th class='" + (sub_columns[i].hasOwnProperty("className") ? sub_columns[i].className : "") + "'>" + sub_columns[i].title + "</th>");
                }
                _html_head.append("</tr>");
                $("#table thead").append(_html_head.toString());

                //修改数据源
                var dataDetail = data.dataDetail;
                var lenDetail = dataDetail.length;
                for (var i = 0; i < lenDetail; i++) {
                    dataDetail[i].xh = (i + 1);
                    if (dataDetail[i].sw != "" && dataDetail[i].xxsw != "") {
                        dataDetail[i].xxsw_D = (Number(dataDetail[i].sw) - Number(dataDetail[i].xxsw)).toFixed(2);
                    } else {
                        dataDetail[i].xxsw_D = "";
                    }
                    //动态数据源-产生的净雨
                    if (dataDetail[i].rain != null && dataDetail[i].rain.length > 0) {
                        for (var j = 0; j < dataDetail[i].rain.length; j++) {
                            dataDetail[i]["rain" + default_arr_rain[j]] = dataDetail[i].rain[j];
                        }
                    }
                    //动态数据源-产水量
                    if (dataDetail[i].water != null && dataDetail[i].water.length > 0) {
                        for (var j = 0; j < dataDetail[i].water.length; j++) {
                            dataDetail[i]["water" + default_arr_rain[j]] = dataDetail[i].water[j];
                        }
                    }
                    //动态数据源-是否超汛
                    if (dataDetail[i].isXx != null && dataDetail[i].isXx.length > 0) {
                        for (var j = 0; j < dataDetail[i].isXx.length; j++) {
                            dataDetail[i]["isXx" + rainXx[j]] = dataDetail[i].isXx[j] == "1" ? "√" : "";
                        }
                    }
                    //动态数据源-是否超兴利
                    if (dataDetail[i].isXl != null && dataDetail[i].isXl.length > 0) {
                        for (var j = 0; j < dataDetail[i].isXl.length; j++) {
                            dataDetail[i]["isXl" + rainXl[j]] = dataDetail[i].isXl[j]== "1" ? "√" : "";
                        }
                    }
                    //动态数据源-是否超设计
                    if (dataDetail[i].isSj != null && dataDetail[i].isSj.length > 0) {
                        for (var j = 0; j < dataDetail[i].isSj.length; j++) {
                            dataDetail[i]["isSj" + rainSj[j]] = dataDetail[i].isSj[j]== "1" ? "√" : "";
                        }
                    }
                    //动态数据源-是否超校核
                    if (dataDetail[i].isJh != null && dataDetail[i].isJh.length > 0) {
                        for (var j = 0; j < dataDetail[i].isJh.length; j++) {
                            dataDetail[i]["isJh" + rainJh[j]] = dataDetail[i].isJh[j]== "1" ? "√" : "";
                        }
                    }
                    //动态数据预泄水量相关
                    if(yxXx.isShow && dataDetail[i].water_xx != null && dataDetail[i].water_xx.length > 0){
                        for (var j = 0; j < dataDetail[i].water_xx.length; j++) {
                            dataDetail[i]["YxXx" + default_arr_rain[j]] = dataDetail[i].water_xx[j];
                        }
                    }
                    if(yxXl.isShow && dataDetail[i].water_xl != null && dataDetail[i].water_xl.length > 0){
                        for (var j = 0; j < dataDetail[i].water_xl.length; j++) {
                            dataDetail[i]["YxXl" + default_arr_rain[j]] = dataDetail[i].water_xl[j];
                        }
                    }
                    if(yxSj.isShow && dataDetail[i].water_sj != null && dataDetail[i].water_sj.length > 0){
                        for (var j = 0; j < dataDetail[i].water_sj.length; j++) {
                            dataDetail[i]["YxSj" + default_arr_rain[j]] = dataDetail[i].water_sj[j];
                        }
                    }
                    if(yxJh.isShow && dataDetail[i].water_jh != null && dataDetail[i].water_jh.length > 0){
                        for (var j = 0; j < dataDetail[i].water_jh.length; j++) {
                            dataDetail[i]["YxJh" + default_arr_rain[j]] = dataDetail[i].water_jh[j];
                        }
                    }
                    //动态数据源-最高水位
                    if (dataDetail[i].level_zg != null && dataDetail[i].level_zg.length > 0) {
                        for (var j = 0; j < dataDetail[i].level_zg.length; j++) {
                            dataDetail[i]["levelZg" + default_arr_rain[j]] = dataDetail[i].level_zg[j];
                        }
                    }
                    //动态数据源-超限水深
                    if (dataDetail[i].level_cx != null && dataDetail[i].level_cx.length > 0) {
                        for (var j = 0; j < dataDetail[i].level_cx.length; j++) {
                            dataDetail[i]["levelCx" + default_arr_rain[j]] = dataDetail[i].level_cx[j];
                        }
                    }
                }

                //生成实例
                table = $('#table').DataTable({
                    scrollY: default_height_detail,
                    scrollX: true,
                    scrollCollapse: true,
                    data: dataDetail,
                    aoColumns: columns1_lock.concat(sub_columns),
                    sort: true,
                    autoWidth: false,
                    oLanguage: {
                        "sZeroRecords": "无水库纳雨能力计算表信息",
                    },
                    rowCallback: function (row, data, index) {
                        $('td:eq(0)', row).html(index + 1);
                    }
                });

                //手动调用固定列 并改变高度(延时执行 待DataTable生成后)
                setTimeout(function(){
                    new $.fn.dataTable.FixedColumns(table, {
                        leftColumns: 4,
                        // heightMatch: 'semiauto',
                        "drawCallback": function () {
                            //$("#contDetail .DTFC_LeftHeadWrapper tr").css("height", "40.5px");
                            $("#contDetail .DTFC_LeftBodyLiner").css({
                                "overflow-x": "hidden",
                                "height": $("#panelMain").height() - 174,
                                "max-height": $("#panelMain").height() - 174
                            });
                        }
                    });
                },350);

                //初始化数据表格
                if (tableCount != null) {
                    tableCount.clear();
                    tableCount.destroy();
                }
                tableCount = null;
                //合计表  先生成列
                //先加表头
                _html_head = new StringBuffer();
                $("#tableCount thead tr").remove();
                _html_head.append("<tr class='tr40'><th rowspan='3'>地市</th>");
                columns1_lock = new Array();
                columns1_lock = [{
                    title: "地市",
                    data: 'ds',
                    rowspan: 3,
                    width: 100
                }];
                for (var i = 0; i < rainCount.length; i++) {
                    _html_head.append("<th colspan='7'>"+rainCount[i] +"mm降水量</th>");
                }
                _html_head.append("</tr><tr class='tr40'>");
                //第二行
                for (var i = 0; i < rainCount.length; i++) {
                    _html_head.append("<th colspan='3'>入库水量</th><th colspan='4'>数量统计</th>");
                }
                _html_head.append("</tr><tr class='tr40'>");
                //第三行
                for (var i = 0; i < rainCount.length; i++) {
                    columns1_lock = columns1_lock.concat([
                        {
                            title: "大型",
                            data: 'inDx' + rainCount[i],
                            width: 80
                        }, {
                            title: "中型",
                            data: 'inZx' + rainCount[i],
                            width: 80
                        }, {
                            title: "合计",
                            data: 'inCount' + rainCount[i],
                            width: 80
                        }, {
                            title: "超汛限",
                            data: 'countCxx' + rainCount[i],
                            width: 80
                        }, {
                            title: "超兴利",
                            data: 'countCxl' + rainCount[i],
                            width: 80
                        }, {
                            title: "超设计",
                            data: 'countCsj' + rainCount[i],
                            width: 80
                        }, {
                            title: "超校核",
                            data: 'countCjh' + rainCount[i],
                            width: 80
                        }
                    ]);

                    _html_head.append("<th>大型</th><th>中型</th><th>合计</th><th>超汛限</th><th>超兴利</th><th>超设计</th><th>超校核</th>");
                }
                _html_head.append("</tr>");
                $("#tableCount thead").append(_html_head.toString());

                //修改数据源
                var dataCount = data.dataCount;
                var lenCount = dataCount.length;
                for (var i = 0; i < lenCount; i++) {
                    //数组拆分为Object
                    if (dataCount[i].count != null && dataCount[i].count.length > 0) {
                        for (var j = 0; j < dataCount[i].count.length; j++) {
                            dataCount[i]["inDx" + rainCount[j]] = dataCount[i].count[j].inDx;
                            dataCount[i]["inZx" + rainCount[j]] = dataCount[i].count[j].inZx;
                            dataCount[i]["inCount" + rainCount[j]] = dataCount[i].count[j].inCount;
                            dataCount[i]["countCxx" + rainCount[j]] = dataCount[i].count[j].countCxx;
                            dataCount[i]["countCxl" + rainCount[j]] = dataCount[i].count[j].countCxl;
                            dataCount[i]["countCsj" + rainCount[j]] = dataCount[i].count[j].countCsj;
                            dataCount[i]["countCjh" + rainCount[j]] = dataCount[i].count[j].countCjh;
                        }
                    }
                }

                //添加汇总数据源   先添加空节点
                var objTemp = {};
                var sumCol = rainCount.length * 7 + 1;
                if (lenCount > 0) {
                    objTemp = JSON.parse(JSON.stringify(dataCount[0]));
                }
                var objCount1 = JSON.parse(JSON.stringify(objTemp));
                objCount1.ds = "汇总信息";
                dataCount.push(objCount1);
                if (data.tjInfo != null && data.tjInfo.length > 0) {
                    for (var i = 0; i < data.tjInfo.length; i++) {
                        var objCount2 = JSON.parse(JSON.stringify(objTemp));
                        objCount2.ds = data.tjInfo[i];
                        dataCount.push(objCount2);
                    }
                }

                //先销毁后生成实例
                tableCount = $('#tableCount').DataTable({
                    scrollY: default_height_detail,
                    scrollX: false,
                    scrollCollapse: true,
                    data: dataCount,
                    columns: columns1_lock,
                    sort: false,
                    autoWidth: true,
                    oLanguage: {
                        "sZeroRecords": "无水库纳雨能力汇总表信息",
                    },
                    columnDefs: [{
                        targets: "_all", //要合并的列
                        createdCell: function (td, cellData, rowData, row, col) {
                            if(row >= lenCount){
                                if(col == 0){
                                    $(td).attr('colspan', sumCol)
                                }else{
                                    $(td).remove();
                                }
                            }
                        }
                    }]
                });

                //跳转计算表
                $("#linkDetail").click();
                $(".loading-layer").hide();
            },
            error: function (e) {
                tools.show_message_error("计算水库纳雨能力失败!");
                $(".loading-layer").hide();
                return;
            }
        });
    });

    /**
     * 计算表-行点击
     **/
    $('#table tbody').on('click', 'tr', function () {
        // var aData = table.row(this).data();
        // tools.flyTo(aData.lgtd, aData.lttd);

        //行点击变色
        if (!$(this).hasClass('selected')) {
            index = $(this).index();
            $("#contDetail .dataTables_scrollBody table tbody tr td.selected").removeClass('selected');
            $("#contDetail .DTFC_LeftBodyLiner  table tbody tr td.selected").removeClass('selected');
            $("#contDetail .dataTables_scrollBody table tbody tr:eq(" + index + ") ").children().addClass('selected');
            $("#contDetail .DTFC_LeftBodyLiner  table tbody tr:eq(" + index + ")").children().addClass('selected')
        }
    });

    /**
     * 导出Excel
     */
    $("#btnExport").click(function () {
        if ($("#contDetail").hasClass("active")) {
            $('#table').tableExport({
                type: "excel",
                escape: false,
                fileName: "水库纳雨能力-计算表",
                tableName: "计算表",
                mso: {
                    //styles: ['border-bottom', 'border-top', 'border-left', 'border-right'],
                    worksheetName: "计算表"
                }
            });
        } else if ($("#contCount").hasClass("active")) {
            $('#tableCount').tableExport({
                type: "excel",
                escape: false,
                fileName: "水库纳雨能力-汇总表",
                tableName: "汇总表",
                mso: {
                    //styles: ['border-bottom', 'border-top', 'border-left', 'border-right'],
                    worksheetName: "汇总表"
                }
            });
        } else {

        }
    });

    /**
     * 导出预测预报
     */
    $("#btnExportWord").click(function () {
        if (url_word == "") {
            tools.show_message_error("请先进行纳雨能力分析！");
            return;
        }

        //动态创建a标签 模拟点击
        var link = document.createElement('a');
        link.target = '_blank';
        link.href = url_word;
        document.body.appendChild(link).click();
        document.body.removeChild(link);
    });
    
    //导出按钮隐藏显示
    $("#linkCondition").click(function () {
        $("#btnExport").hide();
    });
    $("#linkDetail,#linkCount").click(function () {
        $("#btnExport").show();

        if ($(this).attr("id") == "linkDetail" && isFirstShow_Detail) {
            setReportSize("panelMain", $("#panelMain").width(), $("#panelMain").height());
            isFirstShow_Detail = false;
        }
        if ($(this).attr("id") == "linkCount" && isFirstShow_Count) {
            setReportSize("panelMain", $("#panelMain").width(), $("#panelMain").height());
            isFirstShow_Count = false;
        }
    });

    /**
     * 任意雨量修改时 更新多选下拉
     */
    $("#txtRain6").blur(function () {
        var val = $.trim($(this).val());
        if (val != default_arr_rain[5]) {
            default_arr_rain[5] = val;
            //重置下拉多选
            // initMuliSelect("listCxx");
            // initMuliSelect("listCxl");
            // initMuliSelect("listCsj");
            initMuliSelect("listRain");
            // initSinSelect("listYljb");
        }
    });

});

//最大化按钮事件
$(".report-bb .icon-max").click(function () {
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_width_report).height(default_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_width_report / 2 + "px",
            "margin-top": "-" + default_height_report / 2 + "px"
        });

        //动态设置报表高度
        var _id = $(this).parent().parent().parent().attr("id");
        setReportSize(_id, default_width_report, default_height_report);
        $(this).attr("data-type", "");
    } else {
        $(this).parent().parent().parent().width($(window).width()).height($(window).height()).css({
            "top": "0px",
            "left": "0px",
            "margin-left": "0px",
            "margin-top": "0px"
        });

        //动态设置报表高度
        setReportSize($(this).parent().parent().parent().attr("id"), $(window).width(), $(window).height());
        $(this).attr("data-type", "max");
    }
});
//关闭按钮事件
$(".report-bb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));
    $("#show_nynl").removeAttr("checked");
});
//报表通用改变大小事件
$(".report-bb").resizable({
    ghost: true,     //拖动时 半透明
    helper: true,
    maxHeight: null,
    maxWidth: null,
    minHeight: 460,
    minWidth: 900,
    zIndex: 0,  //jquery-ui 默认拖拽z-index为90
    resize: null,
    start: null,
    stop: reportBbResize
});

function reportBbResize(event, ob) {
    //动态设置报表高度
    setReportSize($(event.target).attr("id"), ob.size.width, ob.size.height);
}

function setReportSize(reportId, width, height) {
    $("#" + reportId).width(width).height(height);
    //改变表格高度
    if (reportId == "panelMain") {
        default_height_detail = height - 160;
        default_height_count = height - 205;
        isFirstShow_Detail = true;
        isFirstShow_Count = true;

        if (table != null) {
            if ($("#contDetail").hasClass("active")) {
                isFirstShow_Detail = false;
                table.columns.adjust();
                $("#contDetail").find(".dataTables_scrollBody").css("max-height", (default_height_detail) + "px");
                $("#contDetail").find(".DTFC_LeftBodyLiner").css({
                    "max-height":(default_height_detail - 13) + "px",
                    "height":(default_height_detail - 13) + "px"
                });
                $("#contDetail").find(".DTFC_LeftBodyLiner").parent().css({
                    "height":(default_height_detail - 13) + "px"
                });
            } else if ($("#contCount").hasClass("active")) {
                isFirstShow_Count = false;
                tableCount.columns.adjust();
                $("#contCount").find(".dataTables_scrollBody").css("max-height", (default_height_count) + "px");
            }
        }
    }
}

//默认改变窗体大小 尽量大一些
setReportSize("panelMain", default_width_report, default_height_report);

//报表通用可拖拽事件（IE下存在拖动超过html的BUG）
$("#panelMain").find(".panel-header").myDrag({});

//面板添加点击事件 保证操作面板在最上层
$(".report-bb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("close") || event.target.tagName == "A")
        return;

    tools.showPanelIndex($(this).attr("id"));
});

//获取查询条件  地市|流域|测站
function getCondition() {
    var _type = $("#selectType").val();
    var res = "";
    if (_type == "1") {
        $.each($('#list_selected li'), function (i, item) {
            if (res != "")
                res += ",";
            res += $(this).attr("data-addvcd");
        });
        //选空时 前端临时将当前信息录入，待后端加参数后可删除
        // if (res == "") {
        //     if (tools.addvcd.length == 4) {
        //         res = tools.addvcd + "00";
        //     } else if (tools.addvcd.length == 6) {
        //         res = tools.addvcd.substr(0, 4) + "00";
        //     }
        // }
    } else if (_type == "2") {
        $.each($('#list_selected li'), function (i, item) {
            if (res != "")
                res += ",";
            res += $(this).text();
        });
    } else {
        $.each($('#list_selected li'), function (i, item) {
            if (res != "")
                res += ",";
            res += $(this).attr("data-stcd");
        });
    }

    return res;
}

//获取所有的站点
function initCondition() {
    //获取地市流域
    // $("#span_loading").html("初始化查询条件中...");
    // $(".loading-layer").show();

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        url: apiUrl_zf + "rs/get_sk_list",
        success: function (data) {
            if (data == "" || data == null) {
                tools.show_message_error("初始化查询条件失败!");
                $(".loading-layer").hide();
                return;
            }
            //解析数据
            //var json = JSON.parse(data);
            if (data.code != "1") {
                tools.show_message_error(data.msg);
                $(".loading-layer").hide();
                return;
            }

            //遍历数据
            var arrRes = data.data;
            var len = arrRes.length;
            for (var i = 0; i < len; i++) {
                //地市
                if (arrDsOnly.indexOf(arrRes[i].ds) <= -1) {
                    arrDsOnly.push(arrRes[i].ds);
                    arrDs.push({
                        addvcd: arrRes[i].addvcd,
                        addvnm: arrRes[i].ds
                    });
                }

                //流域
                if (arrLy.indexOf(arrRes[i].ly) <= -1) {
                    arrLy.push(arrRes[i].ly);
                }

                //测站
                arrStationAll.push({
                    stcd: arrRes[i].stcd,
                    stnm: arrRes[i].stnm,
                    pym: arrRes[i].pym,
                    addvcd: arrRes[i].addvcd,
                    addvnm: arrRes[i].ds,
                    ly: arrRes[i].ly,
                    type: arrRes[i].type
                });
            }

            //地市按照行政区划码排序
            arrDs.sort(function (a, b) {
                return Number(a.addvcd) - Number(b.addvcd);
            });

            //默认展示地市
            initWaitList("1");
            $(".loading-layer").hide();
        },
        error: function () {
            tools.show_message_error("初始化查询条件失败!");
            $(".loading-layer").hide();
            return;
        }
    });

     initParam(default_params);
    //获取用户配置
    /* $.ajax({
        type: 'post',
        dataType: "json",
        url: "user/getUserSetting",
        data: {userId: $("#hid_user_id").val(), type: "1"},
        success: function (json) {
            if (json == "" || json == null) {
                tools.show_message_error("获取用户配置失败!");
                $(".loading-layer").hide();
                return;
            }

            //解析数据
            if (json.data != null && json.data != undefined) {
                if (json.data.info != "") {
                    user_params = json.data.info;
                }
            }
            initParam(user_params != "" ? user_params : default_params);
        },
        error: function () {
            tools.show_message_error("获取用户配置失败!");
            $(".loading-layer").hide();
            return;
        }
    }); */
}

//类型改变事件
$("#selectType").change(function () {
    var _type = $(this).val();
    initWaitList(_type);
    if (_type == "3") {
        $(".divPY").show();
        $("#txtPY").val("");
    } else {
        $(".divPY").hide();
    }
});

/**
 * 测站模糊查询
 **/
$("#txtPY").bind("input propertychange", function (event) {
    var _val = $.trim($("#txtPY").val()).toUpperCase();
    var len = arrStationAll.length;
    var _html = new StringBuffer();
    $("#list_wait li").remove();
    if (_val == "") {
        for (var i = 0; i < len; i++) {
            _html.append("<li data-stcd='" + arrStationAll[i].stcd + "'>" + arrStationAll[i].stcd + "-" + arrStationAll[i].stnm + "</li>");
        }
    } else {
        for (var i = 0; i < len; i++) {
            if ((arrStationAll[i].stcd.indexOf(_val) > -1 || arrStationAll[i].stnm.indexOf(_val) > -1 || arrStationAll[i].pym.toUpperCase().indexOf(_val) > -1) && ($("#list_selected li[data-stcd=" + arrStationAll[i].stcd + "]").length == 0)) {
                _html.append("<li data-stcd='" + arrStationAll[i].stcd + "'>" + arrStationAll[i].stcd + "-" + arrStationAll[i].stnm + "</li>");
            }
        }
    }
    $("#list_wait").append(_html.toString());
});

/**
 * 待选列表点击事件
 **/
$("#list_wait").delegate("li", "click", function () {
    var _stcd = $(this).attr("data-stcd");

    //判断已选列表是否存在
    var _exist = false;
    if (_stcd == null || _stcd == undefined || _stcd == "") {
        _stcd = $(this).text();
        $.each($('#list_selected li'), function (i, item) {
            if ($(item).text() == _stcd) {
                _exist = true;
                return false;
            }
        });
    } else {
        $.each($('#list_selected li'), function (i, item) {
            if ($(item).attr("data-stcd") == _stcd) {
                _exist = true;
                return false;
            }
        });
    }

    //不存在添加
    if (!_exist) {
        $("#list_selected").append($(this).clone());
    }
});

/**
 * 已选列表点击事件
 **/
$("#list_selected").delegate("li", "click", function () {
    $(this).remove();
});

/**
 * 全选按钮点击事件
 **/
$("#btnDown").click(function () {
    $("#list_selected li").remove();
    //待选列表中的测站全进入已选列表
    $("#list_selected").append($('#list_wait li').clone());
});

/**
 * 反选按钮点击事件
 **/
$("#btnUp").click(function () {
    $("#list_selected li").remove();
});

//待选列表初始化 1地市 2流域 3测站
function initWaitList(val) {
    $("#list_wait li").remove();
    $("#list_selected li").remove();
    var _html = "";
    if (val == "1") {
        for (var i = 0; i < arrDs.length; i++) {
            _html += "<li data-addvcd='" + arrDs[i].addvcd + "'>" + arrDs[i].addvnm + "</li>";
        }
    } else if (val == "2") {
        for (var i = 0; i < arrLy.length; i++) {
            _html += "<li>" + arrLy[i] + "</li>";
        }
    } else if (val == "3") {
        for (var i = 0; i < arrStationAll.length; i++) {
            _html += "<li data-stcd='" + arrStationAll[i].stcd + "'>" + arrStationAll[i].stcd + "-" + arrStationAll[i].stnm + "</li>";
        }
    }
    $("#list_wait").append(_html);
}

//初始化参数表
function initParam(params) {
    $("#txtRain6").val(params.split("@")[0]);

    var arr = params.split("@")[1].split("|");
    var child;
    for (var i = 0; i < arr.length; i++) {
        child = arr[i].split(",");
        for (var j = 0; j < child.length; j++) {
            $("#txtRain" + (i + 1).toString() + "_" + (j + 1).toString()).val(child[j]);
        }
    }
}

//获取所有参数table
function getParam() {
    var res = "";
    for (var i = 1; i <= 4; i++) {
        if (res != "")
            res += "|";

        var child = "";
        for (var j = 1; j <= 6; j++) {
            if (child != "")
                child += ",";
            child += $("#txtRain" + i.toString() + "_" + j.toString()).val();
        }
        res += child;
    }

    return res;
}

/**
 * 只能输入数字 小数点 输入框控制
 **/
$('.number_only').on('keyup', function () {
    this.value = this.value.replace(/[^\d.]/g, '');
    //校验数据准确性
    if (Number(this.value) != this.value) {
        this.value = "";
        $(this).attr("placeholder", "请输入正确的径流系数！");
    } else {
        $(this).attr("placeholder", "");
    }
});
$('.number_only').on('afterpaste', function () {
    this.value = this.value.replace(/[^\d.]/g, '');
    //校验数据准确性
    if (Number(this.value) != this.value) {
        this.value = "";
        $(this).attr("placeholder", "请输入正确的径流系数！");
    } else {
        $(this).attr("placeholder", "");
    }
});

//初始化下拉多选框
function initMuliSelect(id) {
    try {
        var oldVal = $("#" + id).val();
        $("#" + id + " option").remove();
        var _html = "";
        for (var i = 0; i < default_arr_rain.length; i++) {
            _html += "<option value='" + default_arr_rain[i] + "'>" + default_arr_rain[i] + "mm" + "</option>";
        }
        $("#" + id).append(_html);
        $("#" + id).selectpicker('refresh');
        $('#' + id).selectpicker('render');
        //尝试赋值原数据
        $("#" + id).selectpicker("val", oldVal);
    } catch (e) {
    }
}

//初始化下拉单选
function initSinSelect(id) {
    var oldVal = $("#" + id).val();
    $("#" + id + " option").remove();
    var _html = "";
    for (var i = 0; i < default_arr_rain.length; i++) {
        _html += "<option value='" + default_arr_rain[i] + "'>" + default_arr_rain[i] + "mm" + "</option>";
    }
    $("#" + id).append(_html);

    //尝试赋值原数据
    if (oldVal == null || oldVal == "") {
        $("#" + id).val(default_arr_rain[0]);   //默认选中第一个
    } else {
        $("#" + id).val(oldVal);
    }
}

/**
 * uploadfive上传插件初始化(测试功能用)
 */
function initUploadFive() {
    $("#txtExcel").uploadifive({
        'method': 'post',
        'uploadScript': 'uploadExcel',
        'auto': true,                        //是否自动上传
        'multi': false,                       //是否允许多个同时上传
        'queueSizeLimit': 1,                  //队列大小限制
        //'uploadLimit': 1,                     //定义允许的最大上传数量
        'fileType': "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // 文件的MIME类型
        'fileSizeLimit': '100MB',             //上传文件的大小限制
        'fileObjName': 'Filedata',            //文件上传对象的名称
        'dnd': false,                         //拖放功能启用
        'buttonClass': 'upload_btn',          //按钮样式
        'buttonText': '添加文件',             //浏览按钮的文本
        'overrideEvents': ['onError', 'onCheck', 'onFallback'],        //该项定义了一组默认脚本中你不想执行的事件名称
        'formData': {"docType": "JLXS"},
        'removeCompleted': true,            //不设置该选项或者将其设置为false，将使上传队列中的项目始终显示于队列中，直到点击了关闭按钮或者队列被清空
        'height': '30',
        'width': '100',
        //选择文件失败
        'onError': function (errorType) {
            if (errorType == "QUEUE_LIMIT_EXCEEDED" || errorType == "UPLOAD_LIMIT_EXCEEDED") {
                tools.show_message_error("只能选择一个文档！");
            } else if (errorType == "FILE_SIZE_LIMIT_EXCEEDED") {
                tools.show_message_error("文档过大，请重新选择！");
            } else if (errorType == "404_FILE_NOT_FOUND" || errorType == "403_FORBIDDEN") {
                tools.show_message_error("空文档，请重新选择！");
            } else if (errorType == "FORBIDDEN_FILE_TYPE") {
                tools.show_message_error("请选择EXCEL文档！");
            } else {
                tools.show_message_error("未知错误!");
            }
        },
        //文件上传成功触发
        'onUploadComplete': function (file, data) {
            console.log(data);
            var json = JSON.parse(data);
            if (json.code != "1") {
                tools.show_message_error(json.msg);
            } else {
                //查询条件更新为Excel中的内容
                if (json.data != null && json.data.length > 0) {
                    $("#txtRain1_1").val(json.data[0].param50);
                }
                tools.show_message_success("径流系数已更新！")
            }
        },
        //浏览器H5校验失败
        'onFallback': function () {
            $("#errorInfo").text("您的浏览器不支持HTML5文件上传控件!");
        }
    });
}