 

var map_range = "";
var vip_default_chayi_pt = null;
var list_stcd = [];
var list_stcd_yb = ["50100500", "50101100", "50102350", "50103000"];
var list_stcd_dd = ["50100500", "50101100", "50102350", "50103000"];
var cur_fenqu = "全部";
function show_popup_move_svg(_ptx, _pty, _info) {
    var _html = "";
    $("#popup_move_svg ul li").remove();
    var _stnm = _info.split("_")[0];
    var _stcd = _info.split("_")[1];
    var _sttp = _info.split("_")[2];
    $("#popup_move_svg .span-title").html(_stnm);

    if (_sttp == "ZZ" || _sttp == "ZQ" || _sttp == "DD" || _sttp == "RR" || _sttp == "XX" || _sttp == "HP") {
        if (searchType != "-1") {
            if (!((searchType == "2") && (isyuyan == true))) {
                if ((_sttp == "XX") && (searchType != "3")) {
                    return;
                }
            }

            var ss_sw = 0;
            var bz_sw = 0;
            var jj_sw = 0;

            var resdata = "";
            if ((searchType == "2") || ((searchType == "3") && (_sttp != "XX"))) {
                resdata = get_SingleStcd_extremInfo_Multymodel(_stcd);
                if ((_stcd == "51101201") || (_stcd == "51105811") || (_stcd == "51112711") || (_stcd == "51111911"))
                    $(".ol-popup-move").css("width", "630px");
                else
                    $(".ol-popup-move").css("width", "560px");
            }
            else {
                $(".ol-popup-move").css("width", "530px");
                //  resdata = get_SingleStcd_extremInfo(_stcd);
                resdata = get_SingleStcd_extremInfo_Multymodel(_stcd);
            }

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
            var add_h = $("#index_params").height();//+ $("#indexHeader").height()  ;
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

            //  alert($("#popup_move_svg").height());

        }

    }
}
function update_menu_position() {
    if (!$("#svg_menu").is(':hidden')) {
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        if (ybddMapType != "1")
            svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
 
        var svgWnd = svgDocument.svgWnd;
        var _stcd = $("#svg_menu").attr("data-stcd")
        var point = svgWnd.getMenuPosition(_stcd);
        $("#svg_menu").css({
            "left": point.x,
            "top": point.y,
            "display": "block"
        });
    }
 
 
}


/**
 * 隐藏站点右键菜单
 * */
function hide_menu_svg() {
    $("#svg_menu").css({
        "left": -9999,
        "top": -9999,
    });
    $("#svg_menu").hide();
}


/**
 * 显示站点右键菜单
 * @param {any} _ptx x坐标
 * @param {any} _pty y坐标
 * @param {any} _info 站点信息
 */
function show_stcd_menu(_ptx, _pty, _info) {

 
    var _stnm = _info.split("_")[0];
    var _stcd = _info.split("_")[1];
    var _sttp = _info.split("_")[2];
    $("#svg_menu").attr("data-stcd", _stcd);
    $("#svg_menu").css({
        "left": -9999,
        "top": -9999,
    });
    $("#svg_menu").show();
    var t2 = window.setTimeout(function () {
        $("#svg_menu").css({
            "left": _ptx  ,
            "top": _pty ,
        });
 


    }, 200);
     
}

/**
 * 画圆柱体
 * @param {any} ss_sw 实时水位
 * @param {any} bz_sw 保证水位
 * @param {any} jj_sw 警戒水位
 * @param {any} t_hight 圆柱体高度
 */
function drawYZT(ss_sw, bz_sw, jj_sw, t_hight) {
    //debugger;
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

    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0.5, 0, 18, empty_height);



    cxt.strokeStyle = "#000000";
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
    cxt.strokeStyle = "black";
    cxt.lineWidth = 1;

    cxt.ellipse(9, 5, 9, 3, 0, 0, Math.PI * 2);

    cxt.stroke();
    cxt.closePath();

    cxt.beginPath();
    cxt.strokeStyle = "#000000";
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
    cxt.fillStyle = "purple";               //设置填充颜色为紫色
    cxt.font = '24px "微软雅黑"';           //设置字体      

    console.log(bz_height + "/" + jj_height);
    if (bz_height > 30)
        cxt.fillText(getSWfomatData(bz_sw), 20, bz_height - 10);        //填充文字
    else
        cxt.fillText(getSWfomatData(bz_sw), 20, bz_height + 25);        //填充文字

    cxt.beginPath();
    cxt.strokeStyle = "#0000FF";
    cxt.moveTo(18, jj_height);
    cxt.lineTo(72, jj_height);
    cxt.stroke();

    cxt.beginPath();
    cxt.fillStyle = "purple";               //设置填充颜色为紫色
    cxt.font = '24px "微软雅黑"';           //设置字体  
    if (t_hight - jj_height < 30)    //填充文字
        cxt.fillText(getSWfomatData(jj_sw), 20, jj_height - 10);
    else
        cxt.fillText(getSWfomatData(jj_sw), 20, jj_height + 25);

}


/**
 * 水位格式化
 * @param {any} x 水位值
 */
function getSWfomatData(x)
{
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
 * 水位格式化
 * @param {any} x 水位值
 */
function map_format_sw  (val) {
    if (val < 0) {
        return "";
    }
    if (val == "" || val == null || val == undefined)
        return "";

    return (Math.round(Number(val) * 100) / 100).toFixed(2);
}

/**
 * 画重点站信息，四预都有
 * @param {any} range range
 * @param {any} show_type 显示类型
 * @param {any} json 数据
 */
function draw_vip_info(range, show_type, json) {
 
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    svgWnd.clearRC();
    if (json.data != undefined)
    {
        $.each(json.data, function (index, item) {
            if (item.Stcd == "50101100") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 2976.697, 1709.426);
            }
            else if (item.Stcd == "50103000") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 3850.697, 1939.426);
            }
            else if (item.Stcd == "50302400") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 2006.475, 1282.116);
            }
            else if (item.Stcd == "50701001") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 3731.502, 2608.779);
            }
            else if (item.Stcd == "50500301") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 3150.164, 2325.985);
            }
            else if (item.Stcd == "50100250") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 1877.196, 1946.264);
            }
            else if (item.Stcd == "50201800") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 1634.493, 2134.478);
            }


            else if (item.Stcd == "50701301") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 3401.766, 2405.128);
            }
            else if (item.Stcd == "50502400") {
                svgWnd.addRC(item.Stcd, item.Z, item.jjsw, item.sjsw, 2801.404, 2244.079);
            }


        });
    }

}

/**
 * 画预警重点站信息
 * */
function draw_yj_vip_info() {

    // $("div").remove(".yj_vip_popup_info");
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    creatYjtable(list_stcd, svgWnd);




}



/**
 * 画预报重点站信息
 * */
function draw_yb_vip_info(json, ispos) {

    creatYbtable(list_stcd_yb, json, ispos);




}

/**
 * 画调度重点站信息
 * */
function draw_dd_vip_info(json) {

    creatDdtable(list_stcd_dd, json);




}


/**
 * 更新预警重点站信息
 * */
function update_yj_vip_info() {
    for (var i = 0; i < list_stcd.length; i++) {
        var _stcd = list_stcd[i];
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        if (ybddMapType != "1")
            svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        var point = svgWnd.getElementCenterById(_stcd);
        $("#popup_yj_vip_" + _stcd).css({
            "left": point[0],
            "top": point[1],
            "display": "block"
        });

    }
}

/**
 * 隐藏所有预警重点站信息
 * */
function hide_yj_vip_all() {
    $("[id^='popup_yj_vip_']").css({
        "display": "none"

    });
    for (var i = 0; i < list_stcd.length; i++) {
        var _stcd = list_stcd[i];
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        if (ybddMapType != "1")
            svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        var point = svgWnd.getElementCenterById(_stcd);
        var sttp = svgWnd.getFlagById(_stcd).split("_")[2];
        if (sttp == "XX") {
            //改变行蓄洪区的颜色
            svgWnd.setDispatchSuggest_XX_StateOld("id_"+_stcd);
        }
    }
}

/**
 * 隐藏单站预警重点站信息
 * @param {any} _stcd 站码
 */
function hide_yj_vip_info(_stcd) {
    $("#popup_yj_vip_" + _stcd).css({
        "display": "none"
      
    });
}

/**
 * 显示单站预警重点站信息
 * @param {any} _stcd 站码
 */
function show_yj_vip_info(_stcd) {
    $("#popup_yj_vip_" + _stcd).css({
        "display": "block"

    });
}


/**
 * 获取重点站的位置信息
 */
function getvippoint(_stcd, _stnm, map_range, cy_pt) {
    return ;
}


/**
 * 更新重点站的位置信息
 */
function update_element(zoom) {
    return;
     
}
/**
 * 画重点站的连线
 */
function draw_vip_line(_stcd, _point, index, isshow) {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    var add_h = $("#index_params").height();// $("#indexHeader").height() + $("#index_params").height();
    _point[1] = _point[1] - add_h;
    _point[0] = _point[0] + 23;
    svgWnd.drawLine(_stcd, _point, 'vip_line_' + index, isshow);
 
 
}


/**
 * 显示悬浮框
 */
function show_popup_svg(_stcd) {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    var _center = svgWnd.getElementRightPtById(_stcd);
    if (_center != null) {
        $("#popup_svg").css({
            "left": _center[0],
            "top": _center[1] + 55 - 60,
        });
        $("#popup_svg").attr("data-stcd", _stcd);
        $("#popup_svg").show();
    }
}


/**
 * 根据站码获取站点信息
 * @param {any} _stcd 站码
 */
function get_station_info(_stcd) {
    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    if (ybddMapType != "1")
        svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    return svgWnd.getFlagById(_stcd);
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
function show_info(_info) {

    var arr_data = _info.split("_");
    if (arr_data.length != 6) {
        return;
    }
    var _stnm = arr_data[0];
    var _stcd = arr_data[1];
    var _sttp = arr_data[2];
   
 
    var _sk_show = arr_data[3].replace("(", "").replace(")", "");
    var _yb_show = arr_data[4].replace("(", "").replace(")", "");
    var _dd_show = arr_data[5].replace("(", "").replace(")", "");

  

    if ((searchType == "1" && _sk_show == "true") || (searchType == "2" && (_yb_show == "true" || _dd_show == "true")) || (searchType == "3" && _dd_show == "true")) 
    {
        if ((searchType == "2") && (_stcd == "50401100")) {
            /*  chooseObj = objSta;*/
            show_popup_svg(_stcd);
            return;
        }
        else if (searchType == "1") {
            hide_popup_svg();
 
            //阜阳闸 横排头 亳县闸 蒙城闸特殊处理 界面显示为河道站，实况以闸坝站展示
            if (_stcd == "50601930" || _stcd == "50700300" || _stcd == "50801100" || _stcd == "50801800")
                _sttp = "DD";
            tools_panel.show_type = searchType;
            tools_panel.show_all = false;
            //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
            GetTreeMenuData();
            tools_panel.treeData = null;
            tools_panel.panelShow(_stcd,_stnm, searchEtime, _sttp, searchStime);
        } else {
            //调度界面
            if (searchType == "2" && _sttp == "XX") {
                return;
            }

            if ((searchType == "3" && _sttp != "ZZ" && _sttp != "ZQ") || (searchType == "2" && (_sttp == "DD" || _sttp == "XX"))) {
             
                //闸坝站只有3个站可点击 班台闸 茨河铺闸 何巷闸 新增三河闸 二河闸
                //if (parseInt(searchRange) < RangeDividingLine) {
                //    if (_sttp == "DD" && _stcd != "50401100" && _stcd != "50903420" && _stcd != "50301450" && _stcd != "50403400" && _stcd != "50904800" && _stcd != "51002650" && _stcd != "51110300")
                //        return;
                //}
                if ((_sttp == "DD" && (_stcd == "50301450" || _stcd == "50403400" || _stcd == "50903420" || _stcd == "51002650" || _stcd == "51110300")) || (_sttp == "HP" || _sttp == "RR" || _sttp == "XX")) {//班台闸 茨河铺闸 何巷闸 三河闸 二河闸 为调度其余闸坝有预报
                    tool_dispatch.show_type = searchType;
                    tool_dispatch.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                    GetTreeMenuData();
                    tools_panel.treeData = null;
                    tool_dispatch.panelShow(_stcd, _stnm, _sttp, searchStime, searchEtime);
                } else {
                    tools_panel.show_type = searchType;
                    tools_panel.show_all = false;
                  
                    //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                    GetTreeMenuData();
                    tools_panel.treeData = null;
                    tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
                }
                
            } else if ((searchType == "2" || searchType == "3") && (_sttp == "ZZ" || _sttp == "ZQ")) {
                // if (((_stcd== "51101101") || (_stcd== "51112710")) && (searchType == "2")) {
                //     //chooseObj = objSta;
                //     show_popup_svg(_stcd);
                // }
                // else {
                    hide_popup_svg();
                    //单站调度后对比效果
                    if (searchType == "3") {
                        //      tools_panel.planId_dd = "1";  //从调度方案对比结果中查找当前调度方案的ID
                    }
                    //单站预报结果展示
                  
                    tools_panel.show_type = searchType;
                    tools_panel.show_all = false;
                    //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                    GetTreeMenuData();
                    tools_panel.treeData = null;
                    tools_panel.panelShow(_stcd,_stnm, searchEtime, _sttp, searchStime);

                // }
            } else if (searchType == "2" && (_sttp == "RR" || _sttp == "HP")) {
                //预报状态下弹出overlay 供用户选择是看预报结果还是调度
             //   chooseObj = objSta;
             //   show_popup_svg(_stcd);
                hide_popup_svg();
                //单站调度后对比效果
                if (searchType == "3") {
                    //      tools_panel.planId_dd = "1";  //从调度方案对比结果中查找当前调度方案的ID
                }
                //单站预报结果展示
              
                tools_panel.show_type = searchType;
                tools_panel.show_all = false;
                //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
                GetTreeMenuData();
                tools_panel.treeData = null;
                tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
               
              
            } else {
                hide_popup_svg();
      
            }
        }
    }


}



/**
 * 显示预报情景模式信息
 * @param {any} _info
 * @param {any} treeData
 */
function show_info_qj_yb(_info,treeData) {

    var arr_data = _info.split("_");
    if (arr_data.length != 6) {
        return;
    }
    var _stnm = arr_data[0];
    var _stcd = arr_data[1];
    var _sttp = arr_data[2];
    tools_panel.show_type = 2;
    tools_panel.treeData = null;
    tools_panel.treeData = treeData;
    tools_panel.show_all = false;
    //tools_panel.ApiUrlPath = parseInt(searchRange) < RangeDividingLine ? ApiUrlHuaiHe : ApiUrlSiShui;
    GetTreeMenuData();
    tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);

 

}

/**
 * 根据站码获取调度意见
 * @param {any} stcd 站码
 */
function getDispatchSuggest_dataByStcd(stcd) {
    var res = null;
    if (tool_dispatch.dispatchSuggest_model != "")
    {
        if(tool_dispatch.dispatchSuggest_model =="API6")
        {
            for (var item in tool_dispatch.dispatchSuggest_data.data.API6_data) {
                if (item == stcd) {
                    res = tool_dispatch.dispatchSuggest_data.data.API6_data[item];
                    break;
                }
            }

        }
        else if(tool_dispatch.dispatchSuggest_model =="API2")
        {
            for (var item in tool_dispatch.dispatchSuggest_data.data.API2_data) {
                if (item == stcd) {
                    res = tool_dispatch.dispatchSuggest_data.data.API2_data[item];
                    break;
                }
            }
        }
        else if (tool_dispatch.dispatchSuggest_model == "XAJ2") {
            for (var item in tool_dispatch.dispatchSuggest_data.data.XAJ2_data) {
                if (item == stcd) {
                    res = tool_dispatch.dispatchSuggest_data.data.XAJ2_data[item];
                    break;
                }
            }
        }
        else if (tool_dispatch.dispatchSuggest_model == "MGE2") {
            for (var item in tool_dispatch.dispatchSuggest_data.data.MGE2_data) {
                if (item == stcd) {
                    res = tool_dispatch.dispatchSuggest_data.data.MGE2_data[item];
                    break;
                }
            }
        }
    }
   
    return res;
 
}


/**
 * 从json数据中查找指定站码的预报调度信息
 * @param {any} stcd 查找的站码
 * @param {any} json json数据
 */
function getYbDdinfoByStcd(stcd,json) {
    var res = null;
    for (var i = 0; i < json.data.length; i++) {
        var obj=json.data[i];
        if (obj.Stcd == stcd) {
            res = obj.STNM + "," + obj.Z + "," + obj.Status;
            break;
        }
    }
    
    return res;
}

/**
 * 加载svg文件，用于作战图切换
 * @param {any} filename 文件名称
 * @param {any} fenquname 分区名称
 */
function loadSvgFile(filename,fenquname) {
    $("#SVGDoc").attr("data", filename);
    cur_fenqu = fenquname;
   // if (fenquname != "全部") {
        //切换地图，延迟一下处理，动态添加站点flag信息
        window.setTimeout(() => {
            var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
            if (ybddMapType != "1")
                svgDocument = document.getElementById("SVGDoc_ght").getSVGDocument();

            svgDocument.svgWnd.autoAddMapInfo()
 
            //svgDocument.svgWnd.addFlag(svgDocument.documentElement)
        }, 500);
  //  }

}


/**
 * 获取当前分区
 * */
function getCurFenqu() {
    return cur_fenqu;
}

/**
 * 获取当前range
 * */
function getCurRange() {
    return searchRange;
}

/**
 * 定义一个函数给svg中调用，用以显示消息
 * @param {any} msg 消息文本
 */
function show_error(msg) {
    tools.show_message_error_const(msg);
}

/**
 * 隐藏暴雨移植图例
 * */
function hideByyzSomeRain_Tl() {
    $("#byyz_list_tl").attr("src", "");
    $(".byyz_list_tl").hide();

}
/**
 * 显示暴雨移植图例
 * */
function showByyzSomeRain_Tl(contentobj) {
    $(".byyz_list_tl").show();
}