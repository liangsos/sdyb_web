
/**
 * 显示悬浮框
 * @param {any} _ptx
 * @param {any} _pty
 * @param {any} _info
 */
function show_popup_move_svg(_ptx, _pty, _info) {
    var _html = "";
    $("#popup_move_svg ul li").remove();
    var _stnm = _info.split("_")[0];
    var _stcd = _info.split("_")[1];
    var _sttp = _info.split("_")[2];
    $("#popup_move_svg .span-title").html(_stnm);

    if (_sttp == "ZZ" || _sttp == "ZQ" || _sttp == "DD" || _sttp == "RR" || _sttp == "XX" || _sttp == "HP") {
        if (searchType == "1") {
            var ss_sw = 0;
            var bz_sw = 0;
            var jj_sw = 0;

            var resdata = "";
            $(".ol-popup-move").css("width", "530px");
            resdata = get_SingleStcd_extremInfo_Multymodel(_stcd);

            if (resdata != "") {
                var json = resdata;
                if (json.code != "1") {
                    tools.show_message_error("获取单站极值信息失败!");
                    return;
                }
                $(".ol-popup-move").css("min-width", "490px");
                $.each(json.Name, function (_index, _item) {
                    if (_item != "") {
                        if (_item != "站名") {

                            if (tools.islaststr(_item, "时间")) {
                                if (json.value[_index] != null) {
                                    var _tm = json.value[_index].replace(".0", "").replace(new RegExp(/-/gm), "/");
                                    _html += "<li><span>" + _item + "：" + moment(_tm).format("YYYY年MM月DD日HH时") + "</span></li>";

                                }
                                else
                                    _html += "<li><span>" + _item + "：</span></li>";

                            }
                            else {
                                if (tools.islaststr(_item, "流量")) {
                                    _html += "<li><span>" + _item + "：" + Math.round(Number(json.value[_index].replace("m3/s", ""))) + "m³/s" + "</span></li>";

                                }
                                else if (tools.islaststr(_item, "水位")) {
                                    if (searchType == "1") {
                                        if (_item == "实时水位") {
                                            _html += "<li><span>水位：" + tools.format_sw_new(json.value[_index].replace("m", "")) + "m" + "</span></li>";

                                            ss_sw = Number(json.value[_index].replace("m", ""));
                                        }
                                    }
                                    else if ((searchType == "2") || (searchType == "3")) {
                                        if (_item == "最高水位") {
                                            _html += "<li><span>最高水位：" + tools.format_sw_new(json.value[_index].replace("m", "")) + "m" + "</span></li>";

                                            ss_sw = Number(json.value[_index].replace("m", ""));
                                        }
                                    }
                                    if (_sttp != "RR") {

                                        if (_item == "保证水位") {

                                            bz_sw = Number(json.value[_index].replace("m", ""));
                                        } else if (_item == "警戒水位") {

                                            jj_sw = Number(json.value[_index].replace("m", ""));
                                        }

                                    }
                                    else {
                                        if (_item == "校核水位") {

                                            bz_sw = Number(json.value[_index].replace("m", ""));
                                        } else if (_item == "汛限水位") {

                                            jj_sw = Number(json.value[_index].replace("m", ""));
                                        }
                                    }


                                }
                                else {
                                    _html += "<li><span>" + _item + "：" + json.value[_index] + "</span></li>";
                                }

                            }
                        }
                    }



                });


            }
            else {
                _html += "<li><span>暂无数据</span></li>";

            }

            $("#popup_move_svg ul").append(_html);


            if ((resdata != null) && (resdata.Name != undefined)) {
                if (_sttp != "XX") {
                    if (_sttp != "RR") {
             
                            drawYZT(ss_sw, bz_sw, jj_sw, 32 * (resdata.Name.length - 3));
                    }
                    else {
                        drawYZT(ss_sw, bz_sw, jj_sw, 32 * (resdata.Name.length - 4));
                    }
                }

            }





            //先放到屏幕外面。显示，获取当前元素的高度，然后设置提示框的坐标
            var add_h = -20;//$("#index_params").height();//+ $("#indexHeader").height()  ;
            $("#popup_move_svg").css({
                "left": -9999,
                "top": -9999,
            });

            $("#popup_move_svg").show();
            var t2 = window.setTimeout(function () {
                $("#popup_move_svg").css({
                    "left": _ptx - $("#popup_move_svg_content").width() / 4,
                    "top": _pty + add_h - $("#popup_move_svg_content").height() - 20,
                });
            }, 200);

        }

    }
}

/**
 * 悬浮框，只展示经纬度坐标
 * @param {坐标x} _ptx 
 * @param {*坐标y} _pty 
 * @param {*信息} _info 
 * @returns 
 */
 function show_popup_move_svg_PS(_ptx, _pty, _info) {
    var _html = "";
    $("#popup_move_svg ul li").remove();

    $("#popup_move_svg .span-title").html("格点坐标信息");
   $(".ol-popup-move").css("min-width", "560px");
    _html += "<li><span style='font-size: 22px;'>经度</span><span style='font-size: 22px;'>：" + _info[0] + "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='font-size: 22px;'>纬度</span><span style='font-size: 22px;'>：" + _info[1] + "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='font-size: 22px;'>模式:&nbsp;&nbsp;EC</span></li>";
 
    $("#popup_move_svg ul").append(_html);

    //先放到屏幕外面。显示，获取当前元素的高度，然后设置提示框的坐标
    var add_h = -20;//$("#index_params").height();//+ $("#indexHeader").height()  ;
    $("#popup_move_svg").css({
        "left": -9999,
        "top": -9999,
    });

    $("#popup_move_svg").show();
    var t2 = window.setTimeout(function () {
        $("#popup_move_svg").css({
            "left": _ptx - $("#popup_move_svg_content").width() / 4,
            "top": _pty + add_h - $("#popup_move_svg_content").height() - 20,
        });
        //  alert($("#popup_move_svg_content").height());


    }, 200);
}

/**
 * 画圆柱体
 * @param {any} ss_sw
 * @param {any} bz_sw
 * @param {any} jj_sw
 * @param {any} t_hight
 */
function drawYZT(ss_sw, bz_sw, jj_sw, t_hight) {

    if (t_hight <= 0)
        return;

    $("#div_pop_yzt").height(t_hight);
    $("#pop_canvas").attr("height", t_hight + "");


    $("#div_pop_yzt").show();
    var c = document.getElementById("pop_canvas");
    var cxt = c.getContext("2d");
    c.height = c.height;

    var max_pre = Math.max(ss_sw, bz_sw, jj_sw).toFixed(2);
    var min_pre = Math.min(ss_sw, bz_sw, jj_sw).toFixed(2);

    var max_value = ss_sw == 0 ? (Math.max(ss_sw, bz_sw, jj_sw) * 1.5).toFixed(2) : (Math.max(ss_sw, bz_sw, jj_sw) * 1.1).toFixed(2);
    var min_value = ss_sw == 0 ? (Math.min(ss_sw, bz_sw, jj_sw) / 1.5).toFixed(2) : (Math.min(ss_sw, bz_sw, jj_sw) / 1.1).toFixed(2);

    if (max_pre - min_pre < 5) {
        max_value = Number(max_pre) + 1.5;
        min_value = Number(min_pre) - 1.5;
    }
    var dis_value = (max_value - min_value).toFixed(2);

    var blue_height = (t_hight * ((ss_sw - min_value) / dis_value)).toFixed(0);
    var empty_height = t_hight - 5 - blue_height;
    var blue_height_start = t_hight - 3 - blue_height;

    var bz_height = t_hight - (t_hight * ((bz_sw - min_value) / dis_value)).toFixed(0);
    var jj_height = t_hight - (t_hight * ((jj_sw - min_value) / dis_value)).toFixed(0);

    cxt.fillStyle = "#181725";
    //cxt.globalAlpha = 0.3;
    cxt.fillRect(0.5, 0, 18, empty_height);



    cxt.strokeStyle = "#fff";
    cxt.moveTo(18 - 0.5, 5);

    cxt.lineTo(18 - 0.5, t_hight - 2 - 0.5);


    cxt.stroke();
    cxt.beginPath();
    cxt.moveTo(0.5, t_hight - 2 - 0.5);
    cxt.lineTo(0.5, 5);
    cxt.stroke();



    cxt.fillStyle = "#0000FF";
    cxt.fillRect(1, blue_height_start, 16, blue_height);

    cxt.beginPath();
    cxt.strokeStyle = "#fff";
    cxt.lineWidth = 1;

    cxt.ellipse(9, 5, 9, 3, 0, 0, Math.PI * 2);

    cxt.stroke();
    cxt.closePath();

    cxt.beginPath();
    cxt.strokeStyle = "#fff";
    cxt.lineWidth = 1;

    cxt.ellipse(9, blue_height_start, 8.5, 3, 0, 0, Math.PI * 2);
    cxt.fillStyle = "#0000FF";
    cxt.lineWidth = 0;
    cxt.fill();
    cxt.stroke();
    cxt.closePath();

    cxt.beginPath();
    cxt.ellipse(9, t_hight - 5, 9, 4, 0, 0, Math.PI * 1);
    cxt.fillStyle = "#0000FF";
    cxt.fill();
    cxt.stroke();
    cxt.closePath();


    cxt.beginPath();
    cxt.strokeStyle = "#FF0000";
    cxt.moveTo(18, bz_height);
    cxt.lineTo(72, bz_height);
    cxt.stroke();

    cxt.beginPath();
    cxt.fillStyle = "#FF0000";               //设置填充颜色为紫色
    cxt.font = '24px "微软雅黑"';           //设置字体      
    if (bz_height > 30)
        cxt.fillText(getSWfomatData(bz_sw), 20, bz_height - 10);        //填充文字
    else
        cxt.fillText(getSWfomatData(bz_sw), 20, bz_height + 25);        //填充文字

    cxt.beginPath();
    cxt.strokeStyle = "#77B5ff";
    cxt.moveTo(18, jj_height);
    cxt.lineTo(72, jj_height);
    cxt.stroke();

    cxt.beginPath();
    cxt.fillStyle = "#77B5ff";               //设置填充颜色为紫色
    cxt.font = '24px "微软雅黑"';           //设置字体      
    if (t_hight - jj_height < 30)    //填充文字
        cxt.fillText(getSWfomatData(jj_sw), 20, jj_height - 10);
    else
        cxt.fillText(getSWfomatData(jj_sw), 20, jj_height + 25);
}

/**
 * 水位格式化
 * @param {any} x
 */
function getSWfomatData(x) {
    var f = parseFloat(x); // 解析一个字符串，返回一个浮点数；

    var f = Math.round(x * 100) / 100;
    var s = f.toString(); // 把一个逻辑值转换为字符串，并返回结果；
    var rs = s.indexOf('.'); // 返回某个指定的字符串值在字符串中首次出现的位置；如果字符串值没有出现，返回-1；

    // 没有小数点时：
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/**
 * 隐藏悬浮框
 * */
function hide_popup_move_svg() {

    $("#popup_move_svg").hide();
    $("#div_pop_yzt").hide();

}

 
/**
 * 隐藏信息悬浮框
 * */
function hide_popup_svg() {
    $("#popup_svg").attr("data-stcd", "");
    $("#popup_svg").hide();
}

/**
 * 单站鼠标事件对应的信息显示
 * @param {any} _info
 */
function show_info(res) {
    tools_panel.show_type = "1";
    tools_panel.show_all = false;
    tools_panel.panelShow(res.split("_")[1], res.split("_")[0], searchEtime, res.split("_")[2], searchStime);
}



/**
 * 获取单站极致信息
 * @param {any} Stcd 站码
 */
function get_SingleStcd_extremInfo_Multymodel(Stcd) {

    var result="";
    
    var func = 0;//实况为0，依次往后推;
    var objData = {
        adjust:1,
        stcd: Stcd,
        stime: searchStime,
        etime: searchEtime,
        func: func,
        model: 1,//这个参数固定死是1
       // modelid: "",
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: selectDays,
        meteorPattern: ""
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/getSingleStcdInfo",
        data: info,

        success: function (res) {
            if (res.code != 200)
                tools.show_message_error("获取信息失败!");

            if (res.data.code != "1") {
                tools.show_message_error("获取信息失败!");

            }
            else
                result = res.data;
        },
        error: function (errorMsg) {
            tools.show_message_error("获取信息失败!");

        }

    });
    return result;
}





