///////////////
/*城市预警排行榜参数说明*/

//当前排行城市图表索引
var cur_ec_first = 1;
//系统当前能显示的图表数目
var show_ec_num = 5;
//系统总共需要显示的图表数目
var ec_total_num = 16;
//图表数组
var arr_chart = null;


//初始化城市预警排行榜数据
function initECG(top_city_res) {

    $(".echart-group").html("");
    for (var i = 1; i <= ec_total_num; i++) {
        var color = "#0374FF";
        var city = "";
        if (i == 1) {
            color = "#FC654A";

        }
        else if (i == 2) {
            color = "#FFAF33";

        }
        else if (i == 3) {
            color = "#FC654A";

        }
        city = top_city_res[i - 1].cityName;

        var _html = " <div class=\"ec_" + i + "\" style=\"width:20%;height:100%;    display: inline-block;\">"
        _html += "<div style=\"height:18px;\">";
        _html += "<label style=\"font-size:16px;float:left;margin-left:5px;color:      color: 'rgba(255,255,255,0.5)',;\">超警数:</label> "
        _html += " <label style=\"float:left;font-size:16px;color:white;margin-left:2px;\">&nbsp;&nbsp;" + (top_city_res[i - 1].ewrzNum + top_city_res[i - 1].egrzNum + top_city_res[i - 1].eobhtzNum) + "</label>";
        _html += "</div>";
        _html += "<div style=\"height:calc(100% - 18px);\">";
        _html += "<div id=\"ecg_" + i + "\" style=\"height:100%;width:100%;margin-top:5px;\"></div>";
        _html += "</div>";
        _html += "</div>";
        $(".echart-group").append(_html);
        var MChart = echarts.init(document.getElementById("ecg_" + i), null, { devicePixelRatio: 2.5 });
        var datas = [[
            { name: '超警戒', value: top_city_res[i - 1].ewrzNum, num: top_city_res[i - 1].ewrzNum },
            { name: '超保证', value: top_city_res[i - 1].egrzNum, num: top_city_res[i - 1].egrzNum },
            { name: '超历史', value: top_city_res[i - 1].eobhtzNum, num: top_city_res[i - 1].eobhtzNum },
        ],
        ];
        var arr_color = ["#0000ff", "#ff0000", "#ff00ff"];
        option = {
            color: arr_color,
            title: {
                text: city,
                left: 'center',
                top: 'center',
                // padding:[24,0],
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    align: 'center'
                }
            },
            grid: {
                x: 0,
                x2: 0,
                y: 0,
                y2: 0
            },
            series: datas.map(function (data, idx) {

                return {
                    type: 'pie',
                    radius: [20, 40],
                    roseType: 'area',


                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    label: {

                        formatter: function (params) {
                            if (params.data.name == "超历史")
                                return ' {c|' + + params.data.num + '} ' + ' 个';
                            else if (params.data.name == "超保证")
                                return ' {b|' + + params.data.num + '} ' + ' 个';
                            else if (params.data.name == "超警戒")
                                return ' {a|' + + params.data.num + '} ' + ' 个';
                        },
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 14,

                        rich: {
                            a: {

                                fontSize: 14,
                                color: arr_color[0],
                            },
                            b: {

                                fontSize: 14,
                                color: arr_color[1],
                            },
                            c: {

                                fontSize: 14,
                                color: arr_color[2],
                            },
                            d: {

                                fontSize: 14,
                                color: arr_color[3],
                            }
                        },

                    },
                    labelLine: {
                        length: 2,
                        showAbove: false,
                        length2: 0,
                        maxSurfaceAngle: 20,
                        color: '#28B1C7'
                    },
                    labelLayout: function (params) {
                        const isLeft = params.labelRect.x < MChart.getWidth() / 2;
                        const isRight = params.labelRect.x > MChart.getWidth() / 2;
                        const isTop = params.labelRect.y < MChart.getHeight() / 2;
                        const isBottom = params.labelRect.y > MChart.getHeight() / 2;
                        const points = params.labelLinePoints;

                        var _x = 0;
                        var _y = 0;
                        if ((isLeft == true) && (isTop == true)) {
                            //左上角超历史
                            _x = '40%';
                            _y = '20%';
                        }
                        else if ((isRight == true) && (isTop == true)) {
                            //右上角超警戒
                            _x = '63%';
                            _y = '20%';


                        }
                        else if ((isRight == true) && (isBottom == true)) {
                            //右下角超保证
                            _x = '65%';
                            _y = '74%';
                            points[0][1] -= 10;
                            points[1][1] -= 10;
                            points[2][1] -= 10;
                        }
                        else if ((isLeft == true) && (isBottom == true)) {
                            //左下角超保证
                            _x = '65%';
                            _y = '74%';
                            points[0][1] -= 10;
                            points[1][1] -= 10;
                            points[2][1] -= 10;

                        }

                        points[2][0] = isLeft
                            ? params.labelRect.x
                            : params.labelRect.x + params.labelRect.width + 36;

                        if ((isLeft == true) && (isBottom == true)) {

                            points[0][0] += 30;
                            points[1][0] += 30;
                            points[2][0] += 120;

                        }
                        if ((isRight == true) && (isTop == true)) {


                            points[2][0] -= 35;

                        }
                        return {
                            labelLinePoints: points,

                            x: _x,
                            y: _y,
                            width: 120,

                        };
                    },


                    data: data
                };
            })
        };
        MChart.setOption(option);
        arr_chart.push(MChart);
    }

    cur_ec_first = 1;
    if (cur_ec_first + show_ec_num - 1 < ec_total_num) {
        $(".echart-right").css("visibility", "visible");
    }

}

//初始化实时预报图表数据(右上角水库图)
function initTjInfo(dzxsk_xx, dzxsk_ls, dzxsk_jh, dzxsk_zc) {
    var myChart = echarts.init(document.getElementById("tj_info"), null, { devicePixelRatio: 2.5 });
    var datas = [[
        { name: '超汛限', value: dzxsk_xx, num: dzxsk_xx },
        { name: '超历史', value: dzxsk_ls, num: dzxsk_ls },
        { name: '超校核', value: dzxsk_jh, num: dzxsk_jh },
    ],
    ];
    var arr_color = ["#0000ff", "#ff0000", "#ff00ff"];
    
    option = {
        color: arr_color,
        title: {
            text: '水库站',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        grid: {
            left: 30
        },
        series: datas.map(function (data, idx) {

            return {
                type: 'pie',
                radius: [20, 50],
                roseType: 'area',
                label: {

                    formatter: function (params) {
                        if (params.data.name == "超历史")
                            return params.data.name + '  {b|' + params.data.num + '} ' + ' 个';
                        else if (params.data.name == "超校核")
                            return params.data.name + '  {c|' + params.data.num + '} ' + ' 个';
                        else if (params.data.name == "超汛限")
                            return params.data.name + '  {a|' + params.data.num + '} ' + ' 个';
                    },
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14,

                    rich: {
                        a: {

                            fontSize: 14,
                            color: arr_color[0],
                        },
                        b: {

                            fontSize: 14,
                            color: arr_color[1],
                        },
                        c: {

                            fontSize: 14,
                            color: arr_color[2],
                        },
                        d: {

                            fontSize: 14,
                            color: arr_color[3],
                        }
                    },

                },
                labelLine: {
                    length: 2,
                    showAbove: false,
                    length2: 0,
                    maxSurfaceAngle: 20,
                    color: '#28B1C7'
                },
                labelLayout: function (params) {
                    console.log(myChart.getWidth() + ":" + myChart.getHeight());
                    const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                    const isRight = params.labelRect.x > myChart.getWidth() / 2;
                    const isTop = params.labelRect.y < myChart.getHeight() / 2;
                    const isBottom = params.labelRect.y > myChart.getHeight() / 2;
                    const points = params.labelLinePoints;
                    var _x = 0;
                    var _y = 0;
                    if ((isLeft == true) && (isTop == true)) {
                        //左上角超历史
                        _x = '40%';
                        _y = '25%';
                    }
                    else if ((isRight == true) && (isTop == true)) {
                        //右上角超警戒
                        _x = '68%';
                        _y = '25%';
                    }
                    else if ((isRight == true) && (isBottom == true)) {
                        //右下角超保证
                        _x = '68%';
                        _y = '74%';
                        points[0][1] -= 10;
                        points[1][1] -= 10;
                        points[2][1] -= 10;
                    }
                    else if ((isLeft == true) && (isBottom == true)) {
                        //左下角超保证
                        _x = '40%';
                        _y = '74%';
                        points[0][1] -= 10;
                        points[1][1] -= 10;
                        points[2][1] -= 10;

                    }


                    points[2][0] = isLeft
                        ? params.labelRect.x
                        : params.labelRect.x + params.labelRect.width + 60;



                    return {
                        labelLinePoints: points,

                        x: _x,
                        y: _y,
                        width: 120,

                    };
                },

                data: data
            };
        })
    };
    myChart.setOption(option);

    arr_chart.push(myChart);
}

//初始化水情摘要图表数据(左上角河道图)
function initSqChartInfo(hd_jj, hd_bz, hd_ls) {
    var myChart = echarts.init(document.getElementById("sq_chart"), null, { devicePixelRatio: 2.5 });
    var datas = [[

        { name: '超警戒', value: hd_jj, num: hd_jj },
        { name: '超历史', value: hd_ls, num: hd_ls },
        { name: '超保证', value: hd_bz, num: hd_bz },

    ],
    ];

  //  var arr_color = ["#FF890A", "#07D79B", "#0DB6F6"];

    var arr_color = ["#0000ff", "#ff0000", "#ff00ff"];
    

    option = {
        color: arr_color,
        title: {
            text: '河道站',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 12
            }
        },
        grid: {
            left: 30
        },
        series: datas.map(function (data, idx) {

            return {
                type: 'pie',
                radius: [20, 50],
                roseType: 'area',


                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {

                    formatter: function (params) {
                        if (params.data.name == "超历史")
                            return params.data.name + ' {b|' + params.data.num + '}' + ' 个';
                        else if (params.data.name == "超保证")
                            return params.data.name + ' {c|' + params.data.num + '}' + ' 个';
                        else if (params.data.name == "超警戒")
                            return params.data.name + ' {a|' + params.data.num + '}' + ' 个';
                    },
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 14,
                    rich: {
                        a: {

                            fontSize: 12,
                            color: arr_color[0],
                        },
                        b: {

                            fontSize: 12,
                            color: arr_color[1],
                        },
                        c: {

                            fontSize: 12,
                            color: arr_color[2],
                        },
                        d: {

                            fontSize: 12,
                            color: arr_color[3],
                        }
                    },

                },
                labelLine: {
                    length: 2,
                    showAbove: false,
                    length2: 0,
                    maxSurfaceAngle: 20,
                    color: '#28B1C7'
                },
                labelLayout: function (params) {
                    console.log(myChart.getWidth() + ":" + myChart.getHeight());
                    const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                    const isRight = params.labelRect.x > myChart.getWidth() / 2;
                    const isTop = params.labelRect.y < myChart.getHeight() / 2;
                    const isBottom = params.labelRect.y > myChart.getHeight() / 2;
                    const points = params.labelLinePoints;
                    var _x = 0;
                    var _y = 0;
                    var flag = "";
                    if ((isLeft == true) && (isTop == true)) {
                        //左上角超历史
                        _x = '40%';
                        _y = '16%';
                    }
                    else if ((isRight == true) && (isTop == true)) {
                        //右上角超警戒
                        _x = '68%';
                        _y = '16%';
                    }
                    else if ((isRight == true) && (isBottom == true)) {
                        //右下角超保证
                        _x = '68%';
                        _y = '80%';
                        points[0][1] -= 0;
                        points[1][1] -= 0;
                        points[2][1] -= 0;
                    }
                    else if ((isLeft == true) && (isBottom == true)) {
                        //左下角超保证
                        _x = '45%';
                        _y = '74%';
                        points[0][1] -= 10;
                        points[1][1] -= 10;
                        points[2][1] -= 10;

                    }


                    points[2][0] = isLeft
                        ? params.labelRect.x
                        : params.labelRect.x + params.labelRect.width + 60;



                    return {
                        labelLinePoints: points,

                        x: _x,
                        y: _y,
                        width: 120,

                    };
                },

                data: data
            };
        })
    };
    myChart.setOption(option);

    arr_chart.push(myChart);
}


//排行榜右击按钮
$(".echart-right").click(function () {
    var curml = $(".ec_1").css("marginLeft");
    var v_curml = Number(curml.replace("px", ""));
    var w_l = $(".echart-group").width() / 5;
    $(".ec_1").animate({ marginLeft: (v_curml - w_l) + "px" });
    cur_ec_first++;
    $(".echart-left").css("visibility", "visible");
    if (cur_ec_first + show_ec_num - 1 >= ec_total_num) {
        $(".echart-right").css("visibility", "hidden");
    }
});
//排行榜左击按钮
$(".echart-left").click(function () {
    var curml = $(".ec_1").css("marginLeft");
    var v_curml = Number(curml.replace("px", ""));
    var w_l = $(".echart-group").width() / 5;
    $(".ec_1").animate({ marginLeft: (v_curml + w_l) + "px" });
    cur_ec_first--;
    if (cur_ec_first == 1) {
        $(".echart-left").css("visibility", "hidden");
    }
    if (cur_ec_first + show_ec_num - 1 < ec_total_num) {
        $(".echart-right").css("visibility", "visible");
    }
});