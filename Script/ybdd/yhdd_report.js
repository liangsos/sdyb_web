//# sourceURL=ybdd_report.js
/* 优化调度设置面板js */
//报表默认宽高
var default_par_width_report = 1100;
var default_par_height_report = 640;
var parentId = "#panel_yhdd";
var skTableObj = null;
var hdTableObj = null;
var skTableData = null;
var hdTableData = null;
//最大化按钮事件
$(".report-yhdd .icon-max-para").click(function () {
    console.log($(this).parent().parent().parent().attr("id"));
    if ($(this).attr("data-type") == "max") {
        $(this).parent().parent().parent().width(default_par_width_report).height(default_par_height_report).css({
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + default_par_width_report / 2 + "px",
            "margin-top": "-" + default_par_height_report / 2 + "px"
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
//关闭按钮事件
$(".report-yhdd .icon-close").click(function () {
    $("#panel_yhdd").hide();
    //隐藏面板层级
    tools.hidePanelIndex("panel_yhdd");
});
//报表通用可拖拽事件
$(".report-yhdd").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".report-yhdd").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close"))
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 初始化面板
 */
function initPanel_yhdd() {
    tools.showPanelIndex("panel_yhdd");
    $("#panel_yhdd").height(default_par_height_report);
    $("#panel_yhdd").width(default_par_width_report);
}
/**
 * 获取河道水库信息
 */
function getRiverAndRsvrInfo() {
    initPanel_yhdd();
    var objData = {
        endTime: searchEtime,
        range: Number(searchRange),
        startTime: searchStime,
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/basin/getRiverAndRsvrInfo",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                $("#panel_yhdd #kzgc").html("");
                $("#panel_yhdd  #kzmb").html("");
                var optionSk = "<option value=''>请选择站点</option>";
                var optionHd = "<option value=''>请选择站点</option>";
                $.each(res.data.rsvrList, function (index, item) { //水库
                    optionSk += "<option value = '" + item.stnm + ',' + item.stcd + ',' + item.fsltdz + ',' + item.dsflz + "' _stnm = '" + item.stnm + "' >" + item.stnm + "</option>"
                })
                $("#panel_yhdd #kzgc").append(optionSk)
                $.each(res.data.riverList, function (index, item) { //河道
                    optionHd += "<option value = '" + item.stnm + ',' + item.stcd + ',' + item.wrz + ',' + item.grz + "' _stnm = '" + item.stnm + "' >" + item.stnm + "</option>"
                })
                $("#panel_yhdd  #kzmb").append(optionHd);

                var skdataArr = [];
                var hddataArr = [];
                layui.use('form', function () {
                    var form = layui.form;
                    form.render('select');
                    //水库下拉框点击事件
                    form.on('select(kzgc)', function (data) {
                        if (data.value != "") {
                            var selectDataArr = data.value.split(',');
                            var singleSkdata = {
                                "stcd": selectDataArr[1],
                                "stnm": selectDataArr[0],
                                "fsltdz": selectDataArr[2],
                                "dsflz": selectDataArr[3],
                                "yz": "",
                                "kzlx": ""
                            }
                            if (skdataArr.length > 0) {
                                var result = skdataArr.some(item => {
                                    if (item.stnm == selectDataArr[0]) {
                                        return true
                                    }
                                })
                                if (!result) { // 如果不存在
                                    skdataArr.push(singleSkdata);
                                }
                            } else {
                                skdataArr.push(singleSkdata);
                            }

                            skTableObj.reload('skTable', {
                                data: skdataArr,
                                cols: [
                                    [{
                                        title: '站码',
                                        field: 'stcd',
                                        hide: true
                                    }, {
                                        title: '站名',
                                        field: 'stnm',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        templet: '#editStateSk',
                                        title: '控制类型',
                                        field: 'kzlx',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        field: 'yz',
                                        title: '阈值',
                                        edit: "text",
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '汛限水位',
                                        field: 'fsltdz',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '设计水位',
                                        field: 'dsflz',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '操作',
                                        toolbar: '#bar',
                                        align: 'center'
                                        // width: 179
                                    }]
                                ],
                                done: function (obj) {
                                    get_code(obj);
                                }
                            })
                        }
                    });
                    //添加水库控制类型栏下拉框点击事件
                    form.on('select(editStateSk)', function (data) {
                        //获取下拉框选中的值
                        var score = data.value;
                        var data_index = $(this).parent().parent().parent().parent().parent().attr("data-index");
                        $.each(skdataArr, function (index, value) {
                            if (value.LAY_TABLE_INDEX == data_index) {
                                value.kzlx = score;
                            }
                        });
                    });

                    //河道下拉框点击事件
                    form.on('select(kzmb)', function (data) {
                        if (data.value != "") {
                            var selectDataArr = data.value.split(',');
                            var singleHddata = {
                                "stcd": selectDataArr[1],
                                "stnm": selectDataArr[0],
                                "wrz": selectDataArr[2],
                                "grz": selectDataArr[3],
                                "yz": "",
                                "kzlx": ""
                            }
                            if (hddataArr.length > 0) {
                                var result = hddataArr.some(item => {
                                    if (item.stnm == selectDataArr[0]) {
                                        return true
                                    }
                                })
                                if (!result) { // 如果不存在
                                    hddataArr.push(singleHddata);
                                }
                            } else {
                                hddataArr.push(singleHddata);
                            }

                            hdTableObj.reload('hdTable', {
                                data: hddataArr,
                                cols: [
                                    [{
                                        title: '站码',
                                        field: 'stcd',
                                        hide: true
                                    }, {
                                        title: '站名',
                                        field: 'stnm',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '控制类型',
                                        width: 178,
                                        field: 'kzlx',
                                        templet: '#editStateHd',
                                        align: 'center'
                                    }, {
                                        field: 'yz',
                                        title: '阈值',
                                        edit: "text",
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '警戒水位',
                                        field: 'wrz',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '保证水位',
                                        field: 'grz',
                                        width: 178,
                                        align: 'center'
                                    }, {
                                        title: '操作',
                                        toolbar: '#bar',
                                        align: 'center'
                                        // width: 179
                                    }]
                                ],
                                done: function (obj) {
                                    get_code_hd(obj);
                                }
                            })
                        }
                    });
                    //添加河道控制类型栏下拉框点击事件
                    form.on('select(editStateHd)', function (data) {
                        //获取下拉框选中的值
                        var score = data.value;
                        var data_index = $(this).parent().parent().parent().parent().parent().attr("data-index");
                        $.each(hddataArr, function (index, value) {
                            if (value.LAY_TABLE_INDEX == data_index) {
                                value.kzlx = score;
                            }
                        });
                    });

                    //确认表单提交事件
                    form.on('submit(submitYhdd)', function (data) {
                        if (data.field.yhddName == "") {
                            layer.msg('方案名称不能为空' , {
                                icon: 5
                            });
                            return false;
                        } else if (data.field.yhddName == "规则调度" || data.field.yhddName == "初始状态" || data.field.yhddName == "优化调度") {
                            layer.msg('系统标记名称，不能作为自定义方案名称，请重新输入' , {
                                icon: 5
                            });
                            return false;
                        }
                        var subSkData = sstable.getData('skTable')
                        var subHdData = sstable.getData('hdTable')
                        var yhddName = data.field.yhddName;
                        ddName = yhddName;
                        //数据处理
                        var optControlTargets = "";
                        var optControlWsids = "";
                        $.each(subSkData, function (index, item) {
                            if (optControlTargets == "") {
                                optControlTargets += item.kzlx + "_" + item.yz;
                                optControlWsids += item.stcd;
                            } else {
                                optControlTargets += "," + item.kzlx + "_" + item.yz;
                                optControlWsids += "," + item.stcd;
                            }
                        })
                        $.each(subHdData, function (index, item) {
                            if (optControlTargets == "") {
                                optControlTargets += item.kzlx + "_" + item.yz;
                                optControlWsids += item.stcd;
                            } else {
                                optControlTargets += "," + item.kzlx + "_" + item.yz;
                                optControlWsids += "," + item.stcd;
                            }
                        })
                        //调取优化调控服务
                        RsvrOptJoint(optControlTargets, optControlWsids, yhddName);
                        $("#panel_yhdd").hide();
                        tools.hidePanelIndex("panel_yhdd");
                        return false; //阻止表单跳转
                    });
                });

                var sstable = layui.table;
                //实例化水库报表
                skTableObj = sstable.init('skTable', {
                    height: 196,
                    text: {
                        none: '请选择站点添加数据'
                    }
                })
                //实例化水库报表
                hdTableObj = sstable.init('hdTable', {
                    height: 196,
                    text: {
                        none: '请选择站点添加数据'
                    }
                })

                //监听行工具事件
                sstable.on('tool(skTable)', function (obj) {
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'del') {
                        obj.del();
                        removeAaary(skdataArr, data)
                    }
                });

                //监听行工具事件
                sstable.on('tool(hdTable)', function (obj) {
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'del') {
                        obj.del();
                        removeAaary(hddataArr, data)
                    }
                });

            } else {
                tools.show_message_error_const(res.message);
                tools.loadinghide(false);
                return;
            }
        },
        error: function (data) {
            tools.show_message_error_const(data.message);
            tools.loadinghide(false);
            return;
        }
    });
};
/*删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
function removeAaary(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].stnm == _obj.stnm) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            } else if (i == length - 1) {
                _arr.pop(); //删除并返回数组的最后一个元素
                return _arr;
            } else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}
/**
 * 给表格的自定义select赋初始值-水库
 * @param {} obj 
 */
function get_code(obj) {
    var skSelect = $("select[name='editStateSk']").val();
    $("#skTable").next().find('tr').each(function (e) {
        var $cr = $(this);
        var data_index = $cr.attr("data-index");
        $.each(obj.data, function (index, value) {
            if (value.LAY_TABLE_INDEX == data_index) {
                value.kzlx = skSelect;
            }
        });
    })
}
/**
 * 给表格的自定义select赋初始值-河道
 * @param {} obj 
 */
function get_code_hd(obj) {
    var hdSelect = $("select[name='editStateHd']").val();
    $("#hdTable").next().find('tr').each(function (e) {
        var $cr = $(this);
        var data_index = $cr.attr("data-index");
        $.each(obj.data, function (index, value) {
            if (value.LAY_TABLE_INDEX == data_index) {
                value.kzlx = hdSelect;
            }
        });
    })
}
/**
 * 水库群联合优化调控计算
 * @param {*调度控制断面目标集} optControlTargets 
 * @param {*调度控制断面站码集} optControlWsids 
 * @param {*调度方案名称} yhddName 
 */
function RsvrOptJoint(optControlTargets, optControlWsids, yhddName) {
    var objData = {
        adjust: 1,
        endTime: searchEtime,
        foreDays: Number(selectDays),
        hisStormId: _hisStormId,
        meteorPattern: meteor,
        model: getRadioModel(),
        optControlTargets: optControlTargets,
        optControlWsids: optControlWsids,
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: Number(searchRange),
        rsvrMode: 0,
        schedulePlanName: yhddName,
        scheduleType: 3,
        startTime: searchStime,
        stcd: ""
    };
    var info = JSON.stringify(objData);
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-optimized/RsvrOptJoint",
        data: info,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                yhddProgressShow(yhddName);
                
            } else {
                tools.show_message_error_const(data.message);
                tools.loadinghide(false);
                return;
            }
        },
        error: function (errorMsg) {
            tools.show_message_error_const(data.message);
            tools.loadinghide(false);
            return;
        }
    });
}