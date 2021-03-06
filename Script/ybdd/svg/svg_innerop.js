//# sourceURL=svg_innerop.js
var svgDoc = null;
var svgRoot = null;
var parentWnd = null; //保存html的window对象
var svgzoom = null;
var Snap_svg = null;

var is_color_change = false;
var is_move_change = false;
var arr_color_change_ele = null;
var arr_scale_change_ele = null;
var arr_gif_ele = null;
var reveriver_state = null;
var findStInfo = "";
var defaul_model = 2;
var cur_range = null;

//记录当前数据，包含各个站点的状态值
var cur_data = null;
//从配置文件接收所有的站点配置信息
var baseConfigStcdsInfo = null;
var baseConfigLyInfo = null;
//14个区域对应的四级缩放阈值
var arr_MaplevelRoom = [
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4],
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4],
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4],
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4],
    [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4]];
//14个区域对应的初始化便宜位置
var arr_MaplevelPos = [
    [-1420, -700], [-1450, -600], [-1200, -100],
    [-200, -100], [1000, -100], [1520, -400],
    [300, 150], [-1820, 600], [-820, 350],
    [-420, 500], [-420, 500], [-320, 500],
    [220, 300], [250, 300]];
//14个区域对应的初始化room，最小room，以及最大room
var arr_MapRoomConfig = [
    [1.5, 0.8, 3.3], [1.3, 0.8, 3.3], [1.45, 0.8, 3.3],
    [1.45, 0.8, 3.3], [1.45, 0.8, 3.3], [1.3, 0.8, 3.3],
    [3.0, 0.8, 3.3], [1.4, 0.8, 3.3], [1.9, 0.8, 3.3],
    [2.5, 0.8, 3.3], [1.3, 0.8, 3.3], [2.4, 0.8, 3.3],
    [2.4, 0.8, 3.3], [0.8, 0.8, 3.3]];

var cur_map_room = null;

//当前地图等级；
var cur_level = 0;


//以下是暴雨移植功能需要的参数
let x1, x2, y1, y2, x_move_start, y_move_start, rect_let, rect_top, x_move_end, y_move_end;
let new_x, new_y;
var iscanrectmove = false;

var byyz_center = [null, null];
var stcd_node_info = null;
var byyz_select_stcd_info = null;


//演进动画是否继续
var isRiverYj_continute = false;
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


//演进河流数组
var arr_river_yj = ["挑河",
    "沾利河",
    "南运河",
    "四女寺减河",
    "老赵牛河",
    "秦口河",
    "德惠新河",
    "徒骇河",
    "马颊河",
    "漳卫河",
    "安阳河",
    "卫河河南",
    "漳河",
    "北沙河",
    "洸府河",
    "万福河",
    "白马河",
    "小沂河",
    "新薛河",
    "城郭河",
    "西泇河",
    "东鱼河",
    "洙赵新河",
    "梁济运河",
    "泗河",
    "韩庄运河",
    "玉符河",
    "锦阳川",
    "光明河",
    "石汶河",
    "瀛汶河",
    "柴汶河",
    "大汶河",
    "弥河",
    "白浪河",
    "汶河",
    "渠河",
    "潍河",
    "大沽河",
    "南胶莱河",
    "北胶莱河",
    "泽河",
    "猪洞河",
    "小沽河",
    "胶河",
    "清洋河",
    "大沽夹河",
    "五龙河",
    "蚬河",
    "白沙河",
    "黄水河",
    "乳山河",
    "母猪河",
    "墨水河",
    "浔河",
    "付疃河",
    "新沭河",
    "分沂入沭",
    "沭河",
    "袁公河",
    "温凉河",
    "祊河",
    "梓河",
    "东汶河",
    "沂河"
]
/**
 * 屏蔽右键菜单
 */
document.oncontextmenu = function (ev) {
    return false;
}

/**
 * //鼠标按下事件(暴雨移植使用)
 * @param {any} evt
 */
function onSvgmousedown(evt) {
    var obj = evt.target;
    if ((obj.id == "shade") || (obj.parentNode.id == "shade")) {
        //防止和实况雨量图冲突
        if ((obj.parentNode.id == "rainImage") || (obj.parentNode.parentNode.id == "rainImage"))
            return;

        setSvgState(false);
        let ce = evt || event;
        x_move_start = ce.offsetX;
        y_move_start = ce.offsetY;
        iscanrectmove = true;
        return;
    }

    parent.hide_menu_svg();
    //右键点击到站点，显示站点菜单
    if (evt.button === 2) {
        var obj = evt.target;
        var flag = null;
        if ((obj.id != "Layers") && (obj.id != "")) {
            obj.setAttributeNS(null, "cursor", "pointer");
            flag = obj.getAttributeNS(null, "flag");

        }
        else {
            var parent_obj = obj.parentNode;
            flag = parent_obj.getAttributeNS(null, "flag");
        }
        if (flag != null) {

            var rect = obj.getBoundingClientRect();
            var pt_x = rect.left + rect.width;
            var pt_y = rect.top + rect.height / 2;
            //   parent.show_stcd_menu(pt_x, pt_y, flag);

        }
        obj.setAttributeNS(null, "cursor", "");
    }

}



/**
 * //鼠标弹起事件(暴雨移植使用)
 * @param {any} evt
 */
function onSvgonmousup(evt) {
    var obj = evt.target;
    setSvgState(true);
    if (iscanrectmove) {
        iscanrectmove = false;
        resetDrawStart();
    } if ((obj.id == "shade") || (obj.parentNode.id == "shade")) {

        getRectInfo();
    }
}


/**
 * //鼠标移动事件(暴雨移植使用)
 * @param {any} evt
 */
function onSvgonmousmove(evt) {
    var obj = evt.target;
    if (iscanrectmove) {
        // if (obj.id == "shade") {
        let ce = evt || event;
        let nx1 = ce.offsetX;
        let ny1 = ce.offsetY;
        let move_x = nx1 - x_move_start;
        let move_y = ny1 - y_move_start;


        let abs_move_x = Math.abs(move_x);
        let abs_move_y = Math.abs(move_y);
        if ((abs_move_x > 10) || (abs_move_y > 10)) {



            moveRect(move_x, move_y);

            return;
        }


    }

}

/*
 *隐藏暴雨移植列表的雨量图
 * */
function hideByyzSomeRain() {

    $("#byyz_some_rain").html("");
    parent.hideByyzSomeRain_Tl();
}

/*
 *显示暴雨移植列表的雨量图
 * */
function showByyzSomeRain(contentobj) {
    $("#byyz_some_rain").html("");
    $("#byyz_some_rain").html(contentobj);
    parent.showByyzSomeRain_Tl();
}
/**
 * 隐藏绘画的矩形(暴雨移植)
 * */
function hideDrawRect() {
    stcd_InactiveAll();
    RR_clearAcviveGif();
    parent.hideByyzSomeRain_Tl();
    document.getElementById("drawImage").setAttributeNS(null, "visibility", "hidden");

}

/**
 * //当暴雨地图移动之后，需要更新当前的偏移值为起始标记值，作为下次计算的标准
 */
function resetDrawStart() {
    let obj = document.getElementById("drawImage");
    var trans_info = obj.getAttributeNS(null, "transform").replace("translate(", "").replace(")", "").split(" ");
    var trans_x = Number(trans_info[0]);
    var trans_y = Number(trans_info[1]);
    rect_let = trans_x;
    rect_top = trans_y;
}


/**
 * //鼠标点击事件(所有站点元素)
 * @param {any} evt
 */
function onSvgclick(evt) {

    //   parent.hide_menu_svg();
    var obj = evt.target;

    //  alert(obj.nodeName + ":" + obj.id);
    if ((obj.id != "Layers") && (obj.id != "")) {

        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            parent.show_info(flag);
        }


    } else {

        var parent_obj = obj.parentNode;
        var flag = parent_obj.getAttributeNS(null, "flag");
        if (flag != null) {
            parent.show_info(flag);
        }

    }

}

/**
 * 根据站码获取对应菜单栏的坐标位置
 * @param {any} _stcd 站码
 */
function getMenuPosition(_stcd) {
    var obj = document.getElementById("id_" + _stcd + "_" + cur_level);
    var rect = obj.getBoundingClientRect();
    var pt_x = rect.left + rect.width;
    var pt_y = rect.top + rect.height / 2;
    var point = { x: pt_x, y: pt_y };
    return point;
}


/**
 * //鼠标移入事件(所有站点元素)
 * @param {any} evt
 */
function onSvgonmouseover(evt) {

    var obj = evt.target;
    var flag = null;
    if ((obj.id != "Layers") && (obj.id != "")) {
        obj.setAttributeNS(null, "cursor", "pointer");
        flag = obj.getAttributeNS(null, "flag");

    }
    else {
        var parent_obj = obj.parentNode;
        flag = parent_obj.getAttributeNS(null, "flag");
    }
    if (flag != null) {
        if (flag.indexOf("_XX_") == -1) {
            var rect = obj.getBoundingClientRect();
            var pt_x = rect.left + rect.width / 2;
            var pt_y = rect.top;
            parent.show_popup_move_svg(pt_x, pt_y, flag);
        }
        else {


            var _stcd = flag.split("_")[1];
            obj = document.getElementById("id_" + _stcd + "_" + cur_level);
            var rect = obj.getBoundingClientRect();
            var pt_x = rect.left + rect.width / 2;
            var pt_y = rect.top;

            parent.show_popup_move_svg(pt_x, pt_y, flag);
        }
        parent.hide_yj_vip_info(flag.split("_")[1]);
    }
    obj.setAttributeNS(null, "cursor", "");
}

/**
 * //鼠标移出事件(所有站点元素)
 * @param {any} evt
 */
function onSvgonmouseout(evt) {

    var obj = evt.target;
    var flag = null;
    if ((obj.id != "Layers") && (obj.id != "")) {
        obj.setAttributeNS(null, "cursor", "pointer");
        flag = obj.getAttributeNS(null, "flag");

    } else {
        var parent_obj = obj.parentNode;
        flag = parent_obj.getAttributeNS(null, "flag");
    }
    if (flag != null) {
        parent.hide_popup_move_svg();
        parent.show_yj_vip_info(flag.split("_")[1]);
        //  parent.hide_menu_svg();
    }

}

/**
 * 根据屏幕坐标获取svg坐标
 * @param {any} _point 坐标
 */
function getSvgPoint(_point) {
    var t_point = document.rootElement.createSVGPoint();
    t_point.x = _point[0];
    t_point.y = _point[1];
    var _pt = t_point.matrixTransform(svgzoom.getCTM());
    return _pt;
}

/**
 * 根据站码获取元素中心点坐标(屏幕坐标)
 * @param {any} _stcd 站码
 */
function getElementCenterById(_stcd) {
    var obj = document.getElementById("id_" + _stcd);
    if (_stcd.split("_").length == 1)
        obj = document.getElementById("id_" + _stcd + "_" + cur_level);

    if (obj != null) {
        var rect = obj.getBoundingClientRect();
        var pt_x = rect.left + rect.width / 2;
        var pt_y = rect.top + rect.height / 2;
        return [pt_x, pt_y];
    }
    return null;


}

/**
 * 根据名字获取该区域的坐标(屏幕坐标)
 * @param {any} name 流域或者行政区划名字
 */
function getAreaCenterById(name) {
    var obj = document.getElementById(name);

    if (obj != null) {
        var rect = obj.getBoundingClientRect();
        var pt_x = rect.left + rect.width / 2;
        var pt_y = rect.top + rect.height / 2;
        return [pt_x, pt_y];
    }
    return null;


}


/**
 * 显示绘画的矩形(暴雨移植)
 * */
function showDrawRect() {
    parent.showByyzSomeRain_Tl();
    document.getElementById("drawImage").setAttributeNS(null, "visibility", "visible");
}

/**
 * 重置绘画内容(暴雨移植)
 * @param {any} drawcontent 
 */
function resetDrawInfo(data) {
    let obj = document.getElementById("drawImage");
    obj.setAttribute("transform", "translate(0 0)");
    rect_let = 0;
    rect_top = 0;
    if (data == null) {
        $("#drawImage").html("");
        byyz_center = [null, null];
        return;
    }

    $("#drawImage").html(data.image);
    byyz_center = [data.maxStation.lon, data.maxStation.lat];
    getNearStcd(byyz_center[0], byyz_center[1]);
}



//暴雨移植，确定位置的时候，找到特定点最近的站。
function getNearStcd(x, y) {
    var min_distance = 99999;
    var res_stcd = null;
    var res_stnm = null;
    byyz_select_stcd_info = null;
    $.each(stcd_node_info, function (index, item) {
        var stcd_level = item.stcd.split("_")[2];
        if (cur_level == stcd_level) {
            var _distance = distance(x, y, item.center[0], item.center[1]);
            if (_distance < min_distance) {
                min_distance = _distance;
                res_stcd = item.stcd;
                res_stnm = item.stnm;
            }
        }

    })
    console.log(res_stnm + ":" + res_stcd);
    if (res_stcd != null) {
        stcd_Active(res_stcd.split("_")[0] + "_" + res_stcd.split("_")[1]);
        byyz_select_stcd_info = { stcd: res_stcd, stnm: res_stnm };
    }

}

function distance(x1, y1, x2, y2) {
    var xdiff = x2 - x1;
    var ydiff = y2 - y1;
    return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
}
function get_byyz_select_stcd_info() {
    return byyz_select_stcd_info;
}

/**
 * 坐标从屏幕坐标转为svg坐标
 *  屏幕坐标 = 矩阵* svg对象坐标
 *  矩阵.inverse() =矩阵的逆矩阵
 *  svgObj.getScreenCTM(); 该矩阵将svg坐标转换为屏幕坐标
 * @param {any} screenPoint 屏幕坐标
 * @param {any} someSvgObject svg元素
 */
function coordinateTransform(screenPoint, someSvgObject) {
    var CTM = someSvgObject.getScreenCTM();
    return screenPoint.matrixTransform(CTM.inverse());
}

/**
 * 将svg坐标转换为屏幕坐标
 * 和coordinateTransform函数一起使用
 * @param {any} svgElement svg子元素
 * @param {any} pageX 坐标x
 * @param {any} pageY 坐标y
 * @param {any} svgChild  svg子元素
 */
function reportMouseCoordinates(svgElement, pageX, pageY, svgChild) {
    var point = svgElement.createSVGPoint();
    point.x = pageX;
    point.y = pageY;
    point = coordinateTransform(point, svgChild);
    return point;
}




/**
 * 恢复预警状态的站改变成原始状态
 * @param {any} stcd 站码
 */
function setDispatchSuggest_XX_StateOld(stcd) {
    return;
    var obj = document.getElementById(stcd);
    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            var arr_data = flag.split("_");
            var _sttp = arr_data[2];
            if (obj.nodeName == "g") {

                if (_sttp == "RR") {
                    obj = obj.children[child.childNodes.length - 1];
                }
                else
                    obj = obj.children[0];
            }

            var old_class = obj.getAttributeNS(null, "class");
            var reg1 = new RegExp("_old", "g");
            var reg2 = new RegExp("st_" + obj.nodeName + "_" + _sttp + "_orange", "g");
            var new_class = old_class.replace(reg1, "").replace(reg2, "");
            obj.setAttributeNS(null, "class", new_class);
        }
    }
}

/**
 * 设置预警状态的站改变成绿色
 * @param {any} stcd 站码
 */
function setDispatchSuggest_XX_StateYellow(stcd) {


    var obj = document.getElementById(stcd);
    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            var arr_data = flag.split("_");
            var _sttp = arr_data[2];
            if (obj.nodeName == "g") {

                if (_sttp == "RR") {
                    obj = obj.children[child.childNodes.length - 1];
                }
                else
                    obj = obj.children[0];
            }
            var old_class = obj.getAttributeNS(null, "class");
            var new_class = "";
            if (old_class != null) {
                if (old_class.indexOf("st_" + obj.nodeName + "_" + _sttp) > -1) {
                    var arr_class = old_class.split(" ");
                    for (var nx = 0; nx < arr_class.length; nx++) {
                        if (arr_class[nx].indexOf("st_" + obj.nodeName + "_" + _sttp) > -1) {
                            new_class = new_class + (arr_class[nx] + "_old ");
                        }
                        else
                            new_class += arr_class[nx] + " ";
                    }
                }
            }
            obj.setAttributeNS(null, "class", new_class + "st_" + obj.nodeName + "_" + _sttp + "_green");
        }
    }
}

/**
 * 通过站码获取flag属性
 * @param {any} _stcd 站码
 */
function getFlagById(_stcd) {
    for (var i = 1; i <= 4; i++) {
        var obj = document.getElementById("id_" + _stcd + "_" + i);
        if (obj != null) {
            i = 4;
            var flag = obj.getAttributeNS(null, "flag");
            if (flag != null) {
                return flag;
            }
        }
    }
    return null;

}


/**
 * 通过站码获取元素右侧垂直中心点坐标
 * @param {any} _stcd 站码
 */
function getElementRightPtById(_stcd) {
    for (var i = 1; i <= 4; i++) {
        var obj = document.getElementById("id_" + _stcd + "_" + i);
        if (obj != null) {
            i = 4;
            var rect = obj.getBoundingClientRect();
            var pt_x = rect.left + rect.width;
            var pt_y = rect.top + rect.height / 2;
            return [pt_x, pt_y];
        }
    }

    return null;
}

/**
 * 隐藏vip信息
 * */
function hide_vip() {

    var arr = document.getElementsByClassName("cl_vip_line");
    for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('stroke-width', '0');
    }

}
/**
 * 显示vip信息
 * */
function show_vip() {
    var arr = document.getElementsByClassName("cl_vip_line");
    for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('stroke-width', '1');
    }
    parent.update_element();
}

/**
 * 清除vip信息
 * */
function clear_vip_line() {
    $("[id^='vip_line_']").remove();
}

/**
 * 清除所有动画
 */
function clear_animate() {


    //清除颜色动画
    is_color_change = false;
    var tem_arr_color_change_ele = $.extend(true, [], arr_color_change_ele);
    $.each(tem_arr_color_change_ele, function (index, item) {
        console.log('stop-color');
        item.stop(true);
        document.getElementById(item.node.id).style.opacity = 1;
    });

    //清除缩放动画
    var tem_arr_scale_change_ele = $.extend(true, [], arr_scale_change_ele);
    $.each(tem_arr_scale_change_ele, function (index, item) {
        animate_scale_close(item);
    });
    if (arr_color_change_ele != null)
        arr_color_change_ele.length = 0;

    if (arr_scale_change_ele != null)
        arr_scale_change_ele.length = 0;


    //清除gif动画
    RR_clearStateGif();

    if (arr_gif_ele != null)
        arr_gif_ele.length = 0;

    console.log('clear_color_animate');
}

/**
 * 画线(vip)
 * @param {any} _stcd 站码
 * @param {any} _point 坐标
 * @param {any} div_name dom元素
 * @param {any} isshow 是否显示
 */
function drawLine(_stcd, _point, div_name, isshow) {

    var oldline = document.getElementById(div_name);
    if (oldline != null) {
        document.rootElement.removeChild(oldline);
    }
    //console.log(_stcd);
    _center = getElementCenterById(_stcd);
    if (_center != null) {
        //    var obj = document.getElementById(_stcd);
        var CTM = document.rootElement.getScreenCTM();
        var t_point = document.rootElement.createSVGPoint();
        t_point.x = _point[0];
        t_point.y = _point[1];
        var _pt = t_point.matrixTransform(CTM.inverse());
        //   var _ptxx = t_point.matrixTransform(CTM);

        if ((isNaN(_pt.x)) || (isNaN(_pt.y))) {
            return;
        }

        var linePath = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linePath.setAttribute('x1', parseInt(_center[0]));
        linePath.setAttribute('x2', _pt.x);
        //  console.log(_pt + "/" + _pt.x + "/" + _pt.y);
        linePath.setAttribute('y1', parseInt(_center[1]));
        linePath.setAttribute('y2', _pt.y);
        linePath.setAttribute('id', div_name);
        linePath.setAttribute('class', "cl_vip_line");
        linePath.setAttribute('stroke', 'blue');
        linePath.setAttribute('stroke-width', isshow == true ? '1' : "0");
        document.rootElement.appendChild(linePath);
    }
}

/*
 窗口重绘事件
 */
$(window).resize(function () {

});

/**
 * svg初始化事件
 * @param {any} evt
 */
function init(evt) {
    is_color_change = false;
    is_move_change = false;

    initSvgZoom(evt);
    Snap_svg = Snap('#' + svgRoot.id);
    document.svgWnd = window;
    //动态添加四级站点的id和flag,应该根据地图的事件情况来选择是否添加，一般来说，全省地图是配置好的
    autoAddMapInfo();


    if (parent.getCurRange() == "14") {
        initRiverForHsyj();

    }

    initAllRiverBaseColor();


    //确保动态添加站点信息完成后再做xml配置
    window.setTimeout(() => {
        getHlFdXml();
        initRiverState();
    }, 1500);

}


function initRiverForHsyj() {
    debugger;
    $.each($("[id^='river_']"), function (index, item) {
        console.log(item);
        $(item).hide();
    });
}
/**
 * 元素缩放动画开启
 * @param {any} stcd 站码
 * @param {any} flag flag属性
 */
function animate_scale_open(stcd, flag) {
    var m = new Snap.Matrix();
    var cener = getElementCenterById(stcd);
    var scale = 1;
    if (flag == "big")
        scale = 2.5;
    if (flag == "small")
        scale = 0.8;
    var svg_center = reportMouseCoordinates(document.getElementById(svgRoot.id), cener[0], cener[1], document.getElementById("id_" + stcd));
    m.scale(scale, scale, svg_center.x, svg_center.y);
    //   Snap_svg.select('#id_' + stcd).transform(m);

    if ((svg_center.x == 0) && (svg_center.y == 0)) {
        setTimeout(function () {
            if (flag == "big")
                animate_scale_open(stcd, "small");
            if (flag == "small")
                animate_scale_open(stcd, "big");
        }, 1000);

        return;
    }


    Snap_svg.select('#id_' + stcd).animate({ transform: m }, 1500, mina.easeout(), function () {
        if (flag == "big")
            animate_scale_open(stcd, "small");
        if (flag == "small")
            animate_scale_open(stcd, "big");
    });

}

/**
 * 元素缩放动画关闭
 * @param {any} stcd 站码
 * @param {any} flag flag属性
 */
function animate_scale_close(stcd, flag) {
    var m = new Snap.Matrix();
    var cener = getElementCenterById(stcd);
    var scale = 1;
    var svg_center = reportMouseCoordinates(document.getElementById(svgRoot.id), cener[0], cener[1], document.getElementById("id_" + stcd));
    if ((svg_center.x == 0) && (svg_center.y == 0))
        return;

    m.scale(scale, scale, svg_center.x, svg_center.y);
    Snap_svg.select('#id_' + stcd).transform(m);
}


/**
 * 初始化河流
 * */
function initRiver2() {
    return;

    var arr_obj = document.getElementsByClassName("river_line");
    var arr_clolor = ["#00BFFF"];
    var f = document.getElementById("g_river_move");
    var childs = f.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        f.removeChild(childs[i]);
    }
    for (var i = 0; i < arr_obj.length; i++) {
        var d = arr_obj[i].getAttribute("d");
        arr_obj[i].setAttribute('stroke', arr_clolor[0]);
        var id = arr_obj[i].getAttribute("id");
        var new_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        new_path.setAttribute('fill', "none");
        new_path.setAttribute('stroke', "url(#color_river)");
        new_path.setAttribute('id', id + "_move");
        new_path.setAttribute('stroke-width', "11");
        new_path.setAttribute('d', d);
        new_path.setAttribute('class', 'river_move');
        document.getElementById("g_river_move").appendChild(new_path);
    }
    arr_obj = [];
    arr_obj = document.getElementsByClassName("river_zl");

    for (var i = 0; i < arr_obj.length; i++) {
        setRiverColor(arr_obj[i].getAttributeNS(null, "class").replace("river_zl", "").replace(/\s+/g, ""), "default");
    }
}

/**
 * 根据条件值设置元素状态
 * @param {any} item 后台返回的状态值
 */
function setStcdState(item) {

    var obj = null

    for (var i = 1; i <= 4; i++) {
        obj = document.getElementById("id_" + item.Stcd + "_" + i);
        if (obj != null)
            break;
    }


    if (obj != null) {

        var flag = obj.getAttributeNS(null, "flag");

        if (flag == null)
            return;

        var _stnm = flag.split("_")[0];
        var _sttp = flag.split("_")[2];
        if (obj.nodeName == "g") {

            if (_sttp == "RR") {
                obj = obj.children[obj.children.length - 1];
            }
            else
                obj = obj.children[0];
        }
        if (item.Stcd == "41805350") {
            console.log("葛沟");
        }
        var color = "";
        var color_16 = "";
        var is_shanshuo = 0;
        var type_shanshuo = -1;
        var stateValue = -1;
        if (item.Status.indexOf("预警") > -1) {
            if (item.Status.indexOf("蓝色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_blue";
                color_16 = "#0086D1";
                stateValue = 0;
            } else if (item.Status.indexOf("黄色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_yellow";
                color_16 = "#FFFF00";
                stateValue = 1;
            } else if (item.Status.indexOf("橙色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_orange";
                color_16 = "#FFA500";
                stateValue = 2;
            } else if (item.Status.indexOf("红色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_red";
                color_16 = "#FF0000";
                stateValue = 3;
            }
        }
        else {
            switch (_sttp) {
                case "ZQ":
                    if (item.Status.indexOf("超警") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        stateValue = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                        stateValue = 1;
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        stateValue = 3;
                        color = "_red";
                        color_16 = "#FF0000";
                    }

                    break;
                case "ZZ":
                    if (item.Status.indexOf("超警") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                        color_16 = "#FF0000";
                    }

                    break;
                case "DD":
                    if (item.Status.indexOf("超警") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                        color_16 = "#FF0000";
                    } else if (item.Status.indexOf("已启用") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_orange";
                        color_16 = "#FFA500";
                    }
                    break;
                case "RR":
                    if (item.Status.indexOf("超汛") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超设") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                        color_16 = "#FF0000";
                    } else if (item.Status.indexOf("超校") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_pink";
                        color_16 = "#FF00FF";
                    }
                    break;
                case "XX":
                    if (item.Status.indexOf("已启用") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 1;
                        color = "_orange";
                        color_16 = "#FFA500";
                    }
                    else {
                        is_shanshuo = 1;
                        type_shanshuo = -1;
                        color = "_blue";
                        color_16 = "#0086D1";
                    }

                    break;
                case "HP":
                    if (item.Status.indexOf("超汛") > -1) {
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        color = "_blue";
                        color_16 = "#0086D1";
                    } else if (item.Status.indexOf("超设") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                        color_16 = "#FF0000";
                    } else if (item.Status.indexOf("超校") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_pink";
                        color_16 = "#FF00FF";
                    }
                    break;
            }
        }

        /*  if ((item.Stcd == "50101100") || (item.Stcd == "50103000") || (item.Stcd == "50102350"))
              reveriver_state.push({ stcd: item.Stcd, stateValue: stateValue, color: color });*/



        if (color == "") {

            color = "_white";
            // color_16 = "#96DAF1";
            color_16 = "#00BFFF";
        }

        //  obj.setAttributeNS(null, "class", "st_" + obj.nodeName + "_" + _sttp + color);

        syncBroState(item.Stcd, _sttp, color);
        //  if (parent.getCurRange() == "14") {
        setRiverStetByStcdColor(item.Stcd, color_16);
        //   }
        /*  setRiverColor("river_" + item.Stcd,color);*/



        if (is_shanshuo == 1) {

            if (type_shanshuo == 0) {
                is_color_change = true;

                if (_sttp == "RR") {
                    arr_gif_ele.push({ stcd: item.Stcd, color: color });
                    RR_addStateGif(item.Stcd, color);
                }
                else {
                    syncBroOpacity(item.Stcd);
                    syncBroScale(item.Stcd);

                }




            }

        }

        cur_data.push({ stcd: item.Stcd, color: color_16, stnm: _stnm, Q: item.Q, Z: item.Z });
    }
}

/**
 * 设置元素状态 -颜色
 * @param {any} stcd 站码
 * @param {any} sttp 站类
 * @param {any} color 颜色
 */
function syncBroState(stcd, sttp, color) {
    for (var i = 1; i <= 4; i++) {

        var obj_temp = document.getElementById("id_" + stcd + "_" + i);
        if (obj_temp != null) {
            if (obj_temp.children.length > 0) {
                for (var j = 0; j < obj_temp.children.length; j++) {
                    if (sttp == "DD") {
                        obj_temp.children[0].setAttributeNS(null, "class", "st_" + obj_temp.children[j].nodeName + "_" + sttp + color)
                        j = obj_temp.children.length;
                    }
                    else
                        obj_temp.children[j].setAttributeNS(null, "class", "st_" + obj_temp.children[j].nodeName + "_" + sttp + color)
                }
            }
            else {
                if (((color == "_white") && (sttp == "ZQ")) || ((color == "_white") && (sttp == "ZZ")) || ((color == "_white") && (sttp == "PP")))
                    obj_temp.setAttributeNS(null, "class", "st_" + obj_temp.nodeName + "_" + sttp)
                else
                    obj_temp.setAttributeNS(null, "class", "st_" + obj_temp.nodeName + "_" + sttp + color)
            }




        }

    }
}
/**
 * 元素透明度改变动画
 * @param {any} stcd 站码
 */
function syncBroOpacity(stcd) {
    for (var i = 1; i <= 4; i++) {
        var obj = null;

        obj = Snap_svg.select('#id_' + stcd + "_" + i);

        if ((obj != null) && (obj != undefined)) {
            arr_color_change_ele.push(obj);
            if (cur_level == i)
                ani_opacity_zero(stcd);
        }
    }
}

/**
 * 元素透明度转为0动画
 * @param {any} _id 元素id
 */
function ani_opacity_zero(_id) {
    if (is_color_change) {
        var obj = Snap_svg.select('#id_' + _id);
        if ((obj != null) && (obj != undefined))
            obj.animate({ opacity: 0 }, 1000, mina.easeout(), function () {
                if (is_color_change) {
                    ani_opacity_one(_id);
                }

            });
    }
}

/**
 * 元素透明度转为1动画
 * @param {any} _id 元素id
 */
function ani_opacity_one(_id) {
    if (is_color_change) {
        var obj = Snap_svg.select('#id_' + _id);
        if ((obj != null) && (obj != undefined))
            obj.animate({ opacity: 1 }, 1000, mina.easeout(), function () {
                if (is_color_change) {
                    ani_opacity_zero(_id);
                }
            });
    }
}

/**
 * 元素缩放改变动画
 * @param {any} stcd 站码
 */
function syncBroScale(stcd) {

    for (var i = 1; i <= 4; i++) {

        var _stcd = stcd + "_" + i;

        var obj = Snap_svg.select("#id_" + _stcd);;
        if (obj != null) {
            arr_scale_change_ele.push(_stcd);
            //启动当前级别站点的动画
            if (cur_level == i)
                animate_scale_open(_stcd, "big");
        }
    }
}

/**
 * 
* 四预，根据每个进程的返回数据重新初始化所有元素的状态
 * @param {any} json 后端返回的json数据
 * @param {any} mode_name 模型名称
 * @param {any} process_type 类型 "shikuang"，"yubao"，"yujin"，"diaodu"
 */
function initClass(json, mode_name, process_type) {
    // window.setTimeout(() => {

    var node = document.documentElement;
    findnode(node);
    initRiverState();

    if (parent.getCurRange() == "14")
        clearAll_river_yj();

    if ((json == null) || (json == undefined))
        return;

    var _data = null;
    if (process_type == "yubao") {
        if ((mode_name == "") || (mode_name == null) || (mode_name == undefined))
            return;
        _data = json.data[mode_name + "_data"];
    }
    else if (process_type == "shikuang") {
        _data = json.data;
    }
    else if (process_type == "yujin") {
        _data = json.data[mode_name + "_data"];
    }
    else {
        _data = json.data;
    }


    if ((_data == null) || (_data == undefined))
        return;

    reveriver_state = new Array();
    is_color_change = false;
    is_move_change = false;
    clear_animate();

    arr_color_change_ele = new Array();
    arr_scale_change_ele = new Array();
    arr_gif_ele = new Array();
    cur_data = new Array();
    $.each(_data, function (i, item) {
        setStcdState(item);
    });

    return;



}

/**
 * 设置河流颜色
 * @param {any} classname 河流的class 标志
 * @param {any} color 颜色
 */
function setRiverColor(classname, color) {
    return;
    // alert(classname);
    var river_obj = document.getElementsByClassName(classname);
    if (river_obj.length > 0) {
        for (var xxx = 0; xxx < river_obj.length; xxx++) {
            if (color == "_blue")
                river_obj[xxx].setAttribute('stroke', "#0086D1");
            else if (color == "default")
                river_obj[xxx].setAttribute('stroke', "#00BFFF");
            else
                river_obj[xxx].setAttribute('stroke', color == "" ? "#00BFFF" : (color).split("_")[1]);
        }
    }
}

/**
 * 添加文本
 * @param {any} _txt 文本
 * @param {any} stcd 站码
 * @param {any} level 元素等级
 */
function addText(_txt, stcd, level) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 100);
    text.setAttribute('y', 100);
    text.setAttribute('id', "txt_" + stcd);
    text.setAttribute('fill', level == 1 ? "red" : "blue");
    $(text).text(_txt);
    document.rootElement.appendChild(text);
}

/**
 * 修改文本
 * @param {any} _txt 文本
 * @param {any} stcd 站码
 * @param {any} level 元素等级
 */
function modifyText(_txt, stcd, level) {

    /*  var textnode = document.getElementById("txt_state_" + stcd);
      textnode.setAttribute('fill',   "blue");
      textnode.textContent = _txt;*/

}

/*
 *清除雨量信息
 * */
function clearRainInfo() {
    return;
    var arr_obj = document.getElementsByClassName("rainInfo");
    for (var i = 0; i < arr_obj.length; i++) {
        obj = arr_obj[i];
        obj.textContent = "";
    }
}

/**
 * 修改雨量信息
 * @param {any} _txt 文本
 * @param {any} name 元素名称(id)
 * @param {any} ishowIcon 是否显示图标
 */
function modifyRainInfo(_txt, name, ishowIcon) {
    return;
    var textnode = document.getElementById("rain_" + name);
    textnode.textContent = _txt;
    if (!ishowIcon) {
        document.getElementById("Icon_RAIN").setAttributeNS(null, "visibility", "hidden");
        return;
    }

    document.getElementById("Icon_RAIN").setAttributeNS(null, "visibility", "visible");
    var imagenode = document.getElementById("rainImage_" + name);
    var imagUrl = "";
    var v_rain = Number(_txt);
    if (v_rain <= 10)
        imagUrl = "1-10.gif";
    else if (v_rain <= 25)
        imagUrl = "10-25.gif";
    else if (v_rain <= 50)
        imagUrl = "25-50.gif";
    else if (v_rain <= 100)
        imagUrl = "50-100.gif";
    else if (v_rain <= 250)
        imagUrl = "100-250.gif";
    else
        imagUrl = "gt250.gif";
    imagenode.setAttribute('xlink:href', "gif/" + imagUrl);
}


/**
 * 修改圆柱体(重点站)
 * @param {any} num 数值
 */
function modifyYZT(num) {
    modifyD("rc_1", num, 1);
    return;
}

/**
 * 获取圆柱体(重点站)的高度
 * @param {any} stcd
 */
function getRcheight(stcd) {
    var arr_v = new Array();
    for (var i = 1; i <= 2; i++) {
        var npc = document.getElementById("npc_rc_" + stcd + "_" + i);
        var d_value = npc.getAttribute("d");
        var npc_index_Cz_start = d_value.indexOf("C");
        var npc_index_Cz_end = d_value.indexOf("z");
        var npc_v_Cz = d_value.substr(npc_index_Cz_start + 1, npc_index_Cz_end - npc_index_Cz_start - 1);
        var arr_Cz = npc_v_Cz.split(",");
        arr_v.push(Number(arr_Cz[arr_Cz.length - 1]));
    }
    return arr_v[1] - arr_v[0];
}


/**
 * 通过站码获取重点站圆柱体开始到结束的代码片段
 * @param {any} stcd站码
 */
function getRcStarttoEnd(stcd) {
    var arr_v = new Array();
    for (var i = 1; i <= 2; i++) {
        var npc = document.getElementById("npc_rc_" + stcd + "_" + i);
        var d_value = npc.getAttribute("d");
        var npc_index_Cz_start = d_value.indexOf("C");
        var npc_index_Cz_end = d_value.indexOf("z");
        var npc_v_Cz = d_value.substr(npc_index_Cz_start + 1, npc_index_Cz_end - npc_index_Cz_start - 1);
        var arr_Cz = npc_v_Cz.split(",");
        arr_v.push(Number(arr_Cz[arr_Cz.length - 1]));
    }
    return arr_v;
}

/**
 * 清除重点站 圆柱体
 * */
function clearRC() {

    var el = document.getElementById('Info_YZT');
    var childs = el.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {

        el.removeChild(childs[i]);
    }
}

/**
 * 添加重点站 圆柱体
 * @param {any} stcd
 * @param {any} ss_sw
 * @param {any} xx_sw
 * @param {any} bz_sw
 * @param {any} ptx
 * @param {any} pty
 */
function addRC(stcd, ss_sw, xx_sw, bz_sw, ptx, pty) {

    var yzt_width = 10;
    var yzt_height = 120;

    var g_obj = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g_obj.setAttribute('id', "yzt_" + stcd);

    var npc_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var npc_2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var npc_3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    npc_1.setAttribute('fill', "none");
    npc_1.setAttribute('stroke', "#211714");
    npc_1.setAttribute('id', "npc_rc_" + stcd + "_1");
    npc_1.setAttribute('stroke-miterlimit', "10");
    npc_1.setAttribute('d', "M" + ptx + "," + pty + "c-5.521,0-10,1.49-10,3.33c0,1.843,4.479,3.33,10,3.33c5.529,0,10-1.487,10-3.33C" + (ptx + 10) + "," + (pty + 1) + "," + (ptx + 6) + "," + pty + "," + ptx + "," + pty + "z");
    //npc_1.setAttribute('d', "M1798.697,739.426c-5.521,0-10,1.49-10,3.33c0,1.843,4.479,3.33,10,3.33c5.529,0,10-1.487,10-3.33C1808.697,740.918,1804.226,739.426,1798.697,739.426z");

    npc_2.setAttribute('fill', "none");
    npc_2.setAttribute('stroke', "#211714");
    npc_2.setAttribute('id', "npc_rc_" + stcd + "_2");
    npc_2.setAttribute('stroke-miterlimit', "10");
    npc_2.setAttribute('d', "M" + ptx + "," + (pty + yzt_height) + "c-5.521,0-10,1.5-10,3.34c0,1.843,4.479,3.33,10,3.33c5.529,0,10-1.487,10-3.33C" + (ptx + 10) + "," + (pty + yzt_height + 1) + "," + (ptx + 6) + "," + (pty + yzt_height) + "," + ptx + "," + (pty + yzt_height) + "z");
    //npc_2.setAttribute('d', "M1798.697,829.088c-5.521,0-10,1.5-10,3.34c0,1.843,4.479,3.33,10,3.33c5.529,0,10-1.487,10-3.33C1808.697,830.588,1804.226,829.088,1798.697,829.088z");


    npc_3.setAttribute('fill', "none");
    npc_3.setAttribute('stroke', "#211714");
    npc_3.setAttribute('id', "npc_rc_" + stcd + "_2");
    npc_3.setAttribute('stroke-miterlimit', "10");
    npc_3.setAttribute('d', "M" + ptx + "," + (pty + 8) + "c-5.521,0-10-1.489-10-3.33v" + yzt_height + "c0-1.84,4.479-3.34,10-3.34c5.529,0,10,1.5,10,3.34v-" + yzt_height + "C" + (ptx + 10) + "," + (pty + 6) + "," + (ptx + 6) + "," + (pty + 8) + "," + ptx + "," + (pty + 8) + "z");
    //npc_3.setAttribute('d', "M1798.697,747.088c-5.521,0-10-1.489-10-3.33v89.67c0-1.84,4.479-3.34,10-3.34c5.529,0,10,1.5,10,3.34v-89.67C1808.697,745.599,1804.226,747.088,1798.697,747.088z");

    g_obj.appendChild(npc_1);
    g_obj.appendChild(npc_2);
    g_obj.appendChild(npc_3);

    var rc_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rc_1.setAttribute('fill', "none");
    rc_1.setAttribute('id', "rc_" + stcd + "_1");
    rc_1.setAttribute('stroke-miterlimit', "10");
    rc_1.setAttribute('d', "M" + (ptx + 9) + "," + (pty + yzt_height + 2) + "v0c0-1.84-4.39-3.33-9.83-3.33c-5.43,0-9.83,1.49-9.83,3.33v-0c0,1.84,4.4,3.33,9.83,3.33C" + (ptx + 4) + "," + (pty + yzt_height + 5) + "," + (ptx + 8) + "," + (pty + yzt_height + 4) + "," + (ptx + 8) + "," + (pty + yzt_height + 2) + "z");


    var rc_2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rc_2.setAttribute('fill', "none");
    rc_2.setAttribute('stroke', "#604C3F");
    rc_2.setAttribute('id', "rc_" + stcd + "_2");
    rc_2.setAttribute('stroke-miterlimit', "10");
    rc_2.setAttribute('d', "M" + (ptx + 9) + "," + (pty + yzt_height + 2) + "c0,1.85-4.39,3.33-9.83,3.33c-5.43,0-9.83-1.49-9.83-3.33s4.4-3.33,9.83-3.33C" + (ptx + 4) + "," + (pty + yzt_height - 1) + "," + (ptx + 8) + "," + (pty + yzt_height) + "," + (ptx + 8) + "," + (pty + yzt_height + 2) + "z");


    var rc_3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    rc_3.setAttribute('fill', "none");
    rc_3.setAttribute('stroke', "#604C3F");
    rc_3.setAttribute('id', "rc_" + stcd + "_3");
    rc_3.setAttribute('stroke-miterlimit', "10");
    rc_3.setAttribute('d', "M" + (ptx + 9) + "," + (pty + yzt_height + 2) + "c0,1.85-4.39,3.33-9.83,3.33c-5.43,0-9.83-1.49-9.83-3.33s4.4-3.33,9.83-3.33C" + (ptx + 4) + "," + (pty + yzt_height - 1) + "," + (ptx + 8) + "," + (pty + yzt_height) + "," + (ptx + 8) + "," + (pty + yzt_height + 2) + "z");


    g_obj.appendChild(rc_1);
    g_obj.appendChild(rc_2);
    g_obj.appendChild(rc_3);


    var text_color = ["#000000", "#FF0000", "#0000FF"]
    var text_id = ["_ss", "_bz", "_xx"]
    var text_value = [ss_sw, bz_sw, xx_sw]
    for (i = 1; i <= 3; i++) {
        var line_ss = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line_ss.setAttribute('fill', "none");
        line_ss.setAttribute('stroke', text_color[i - 1]);
        line_ss.setAttribute('stroke-width', "3");
        line_ss.setAttribute('x1', i == 1 ? ptx - 10 : ptx + 10);
        line_ss.setAttribute('y1', i == 1 ? pty + 10 : pty + (i - 2) * 40 + 10);
        line_ss.setAttribute('x2', i == 1 ? ptx - 60 : ptx + 60);
        line_ss.setAttribute('y2', i == 1 ? pty + 10 : pty + (i - 2) * 40 + 10);
        line_ss.setAttribute('stroke-miterlimit', "10");
        line_ss.setAttribute('id', "yzt_line_" + stcd + text_id[i - 1]);

        var rect_ss = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect_ss.setAttribute('fill', "none");
        rect_ss.setAttribute('stroke', text_color[i - 1]);
        rect_ss.setAttribute('stroke-width', "0");
        rect_ss.setAttribute('x', i == 1 ? (ptx - 90) : (ptx + 25));
        rect_ss.setAttribute('y', i == 1 ? (pty) : (pty + (i - 2) * 40));
        rect_ss.setAttribute('width', 70);
        rect_ss.setAttribute('height', 26);

        rect_ss.setAttribute('id', "yzt_rect_" + stcd + text_id[i - 1]);

        var text_ss = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        //  text_ss.setAttribute('transform', i == 1 ? "matrix(1 0 0 1 " + (ptx - 60) + " " + (pty - 10 + 10) + ")" : "matrix(1 0 0 1 " + (ptx + 20) + " " + (pty + (i - 2) * 40 - 10 + 10) + ")");
        text_ss.setAttribute('x', i == 1 ? (ptx - 90) : (ptx + 25));
        text_ss.setAttribute('y', i == 1 ? (pty) : (pty + (i - 2) * 40));
        text_ss.setAttribute('fill', text_color[i - 1]);
        text_ss.setAttribute('font-family', "'ArialMT'");
        text_ss.setAttribute('font-size', "26.5658");
        text_ss.setAttribute('id', "yzt_text_" + stcd + text_id[i - 1]);
        $(text_ss).text(getSWfomatData(text_value[i - 1]));

        g_obj.appendChild(line_ss);
        g_obj.appendChild(rect_ss);
        g_obj.appendChild(text_ss);
    }


    document.getElementById("Info_YZT").appendChild(g_obj);
    modifyD(stcd, null, 1, ss_sw, xx_sw, bz_sw);

}



/**
 * 格式化水位值为小数点两位
 * @param {any} x  水位值
 * 
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
 * 修改重点站圆柱体
 * @param {any} stcd
 * @param {any} num
 * @param {any} type
 * @param {any} ss_sw
 * @param {any} xx_sw
 * @param {any} bz_sw
 * @param {any} dis_value
 */
function modifyD(stcd, num, type, ss_sw, xx_sw, bz_sw, dis_value) {

    if ((type != 1) && (type != 2))
        return;

    //需要更新文字
    if (num == null) {
        var max_pre = Math.max(ss_sw, bz_sw, xx_sw).toFixed(2);
        var min_pre = Math.min(ss_sw, bz_sw, xx_sw).toFixed(2);

        var max_value = (Math.max(ss_sw, bz_sw, xx_sw) * 1.1).toFixed(2);
        var min_value = (Math.min(ss_sw, bz_sw, xx_sw) / 1.1).toFixed(2);

        if (max_pre - min_pre < 5) {
            max_value = Number(max_pre) + 1.5;
            min_value = Number(min_pre) - 1.5;
        }
        dis_value = (max_value - min_value).toFixed(2);

        num = (getRcheight(stcd) * ((ss_sw - min_value) / dis_value)).toFixed(2);
    }

    var obj = document.getElementById("rc_" + stcd + "_" + type);
    var d_value = obj.getAttribute("d");
    var new_d_value = d_value;
    var index_Cz_start = d_value.indexOf("C");
    var index_Cz_end = d_value.indexOf("z");
    var index_Mc_start = 0;
    var index_Mc_end = type == 1 ? d_value.indexOf("v") : d_value.indexOf("c");
    var v_Mc = d_value.substr(index_Mc_start + 1, index_Mc_end - index_Mc_start - 1);
    var arr_Mc = v_Mc.split(",");
    for (var i = 0; i < arr_Mc.length; i++) {
        if (i % 2 != 0) {
            arr_Mc[i] = (Number(arr_Mc[i]) - num).toString();
        }
    }
    var new_Mc = arr_Mc.join(",");
    new_d_value = type == 1 ? new_d_value.replace("M" + v_Mc + "v", "M" + new_Mc + "v") : new_d_value.replace("M" + v_Mc + "c", "M" + new_Mc + "c");

    var v_Cz = d_value.substr(index_Cz_start + 1, index_Cz_end - index_Cz_start - 1);

    var arr_Cz = v_Cz.split(",");
    for (var i = 0; i < arr_Cz.length; i++) {
        if (i % 2 != 0) {
            arr_Cz[i] = (Number(arr_Cz[i]) - num).toString();
        }
    }
    var new_Cz = arr_Cz.join(",");
    new_d_value = new_d_value.replace("C" + v_Cz + "z", "C" + new_Cz + "z");



    if (type == 1) {
        var index_vC_start = d_value.indexOf("v");
        var index_vC_end = d_value.indexOf("C");
        if ((index_vC_start > -1) && (index_vC_end > index_vC_start)) {
            var v_vC = d_value.substr(index_vC_start + 1, index_vC_end - index_vC_start - 1);
            var arr_c = v_vC.split("c");
            var x1 = $.trim(arr_c[0]);
            var x2 = $.trim(arr_c[2].split("v")[1]);

            arr_c[0] = (Number($.trim(arr_c[0])) + num).toString();
            arr_c[2] = arr_c[2].split("v")[0] + "v" + (Number($.trim(arr_c[2].split("v")[1])) - num).toString();

            if ((Number(arr_c[0]) > getRcheight(stcd)) || (Number(arr_c[0]) < 0))
                return;

            var new_vC = arr_c.join("c");
            new_d_value = new_d_value.replace("v" + v_vC + "C", "v" + new_vC + "C");
            if (Number(arr_c[0]) != 0) {
                obj.setAttribute('fill', "#009FE8");
                document.getElementById("rc_" + stcd + "_2").setAttribute('fill', "#009FE8");
                document.getElementById("rc_" + stcd + "_3").setAttribute('fill', "#009FE8");
            }
            else {
                obj.setAttribute('fill', "#FFFFFF");
                document.getElementById("rc_" + stcd + "_2").setAttribute('fill', "#FFFFFF");
                document.getElementById("rc_" + stcd + "_3").setAttribute('fill', "#FFFFFF");
            }



        }
    }
    if (type == 2) {


        var max_pre = Math.max(ss_sw, bz_sw, xx_sw).toFixed(2);
        var min_pre = Math.min(ss_sw, bz_sw, xx_sw).toFixed(2);

        var max_value = (Math.max(ss_sw, bz_sw, xx_sw) * 1.1).toFixed(2);
        var min_value = (Math.min(ss_sw, bz_sw, xx_sw) / 1.1).toFixed(2);

        if (max_pre - min_pre < 5) {
            max_value = Number(max_pre) + 1.5;
            min_value = Number(min_pre) - 1.5;
        }
        var dis_value = (max_value - min_value).toFixed(2);

        var line_ss = document.getElementById("yzt_line_" + stcd + "_ss");
        var rect_ss = document.getElementById("yzt_rect_" + stcd + "_ss");
        var text_ss = document.getElementById("yzt_text_" + stcd + "_ss");

        var dis_ss = (getRcheight(stcd) * (1 - (ss_sw - min_value) / dis_value)).toFixed(2);
        var pt_info = getRcStarttoEnd(stcd);
        line_ss.setAttribute('y1', pt_info[0] + Number(dis_ss));
        line_ss.setAttribute('y2', pt_info[0] + Number(dis_ss));
        rect_ss.setAttribute('y', pt_info[0] + Number(dis_ss) - 10 - 26);
        text_ss.setAttribute('y', pt_info[0] + Number(dis_ss) - 10);


        var line_xx = document.getElementById("yzt_line_" + stcd + "_xx");
        var text_xx = document.getElementById("yzt_text_" + stcd + "_xx");
        var rect_xx = document.getElementById("yzt_rect_" + stcd + "_xx");
        var dis_xx = (getRcheight(stcd) * (1 - (xx_sw - min_value) / dis_value)).toFixed(2);
        line_xx.setAttribute('y1', pt_info[0] + Number(dis_xx));
        line_xx.setAttribute('y2', pt_info[0] + Number(dis_xx));
        text_xx.setAttribute('y', pt_info[0] + Number(dis_xx) + 30);
        rect_xx.setAttribute('y', pt_info[0] + Number(dis_xx) + 30 - 26);

        var line_bz = document.getElementById("yzt_line_" + stcd + "_bz");
        var text_bz = document.getElementById("yzt_text_" + stcd + "_bz");
        var rect_bz = document.getElementById("yzt_rect_" + stcd + "_bz");

        var dis_bz = (getRcheight(stcd) * (1 - (bz_sw - min_value) / dis_value)).toFixed(2);
        line_bz.setAttribute('y1', pt_info[0] + Number(dis_bz));
        line_bz.setAttribute('y2', pt_info[0] + Number(dis_bz));
        text_bz.setAttribute('y', pt_info[0] + Number(dis_bz) - 10);
        rect_bz.setAttribute('y', pt_info[0] + Number(dis_bz) - 10 - 26);
    }

    obj.setAttribute('d', new_d_value);
    if (type == 1)
        modifyD(stcd, num, 2, ss_sw, xx_sw, bz_sw);
}


function showEdge() {




}


function hideEdge() {

}

/**
 * 显示地图边界
 * */
function showMapEdge() {


    document.getElementById("map_edge").style.fill = "#f8d1dc";
    document.getElementById("map_edge").style.opacity = 1;
    //document.getElementById("流域分区").style.display = "block";
    setLyColor("warm");

}

/**
 * 隐藏地图边界
 * */
function hideMapEdge() {
    document.getElementById("map_edge").style.fill = "#32acd5";
    document.getElementById("map_edge").style.opacity = 0.2;
    setLyColor("cold");
    // document.getElementById("流域分区").style.display = "none";
}

/**
 * 清除state_stcd_txt文本
 * */
function clearText() {
    return;
    var arr_obj = document.getElementsByClassName("state_stcd_txt");
    for (var i = 0; i < arr_obj.length; i++) {
        obj = arr_obj[i];
        obj.textContent = "";
    }


}

/**
 * 显示重点站 圆柱体
 * */
function showYJText() {
    return;
    document.getElementById("Info_YZT").style.display = "block";

}

/**
 * 隐藏重点站 圆柱体
 * */
function hideYJText() {

    return;
    document.getElementById("Info_YZT").style.display = "none";

}

/**
 * 显示雨量图中文本 ，雨量值数字
 * */
function showRainText() {

    document.getElementById("Info_RAIN").setAttributeNS(null, "visibility", "visible");
    // document.getElementById("Icon_RAIN").setAttributeNS(null, "visibility", "visible");


}

/**
 * 隐藏雨量图中文本 ，雨量值数字
 * */
function hideRainText() {

    document.getElementById("Info_RAIN").setAttributeNS(null, "visibility", "hidden");
    document.getElementById("Icon_RAIN").setAttributeNS(null, "visibility", "hidden");
}

/**
 * 显示雨量图
 * */
function showRainImage() {

    var obj = document.getElementById("rainImage");

    obj.setAttribute('visibility', "visible");
}


/**
 * 隐藏雨量图
 * */
function hideRainImage() {

    var obj = document.getElementById("rainImage");

    obj.setAttribute('visibility', "hidden");

}


/**
 * 初始化svg地图，设置可缩放
 * @param {any} evt
 */
function initSvgZoom(evt) {
    if (svgzoom != null) {
        svgzoom.destroy();
        svgzoom = null;
    }
    svgzoom = svgPanZoom(evt, {
        zoomEnabled: true,         //开启缩放功能
        controlIconsEnabled: false,  //开启右下角缩放控件功能

        onUpdatedCTM: function () {


            var zoom = this.getZoom();
            showMapByLevel(zoom);
            console.log(zoom);
            // var _center=this.center();
            parent.update_menu_position();
            resetDrawStart();

        }
    });
    svgRoot = document.rootElement;
    //  svgzoom.fit();
    //  svgzoom.center();

    cur_map_room = arr_MaplevelRoom[Number(parent.getCurRange() - 1)];

    svgzoom.zoomAtPoint(arr_MapRoomConfig[Number(parent.getCurRange() - 1)][0], { x: $(window).width() / 2 + arr_MaplevelPos[Number(parent.getCurRange() - 1)][0], y: $(window).height() / 2 + arr_MaplevelPos[Number(parent.getCurRange() - 1)][1] });

    cur_level = 1;

    svgzoom.setMaxZoom(arr_MapRoomConfig[Number(parent.getCurRange() - 1)][2]);
    svgzoom.setMinZoom(arr_MapRoomConfig[Number(parent.getCurRange() - 1)][1]);



    hideDrawRect();
    getStcdInfoFromJson();

    if (parent.getCurRange() == "14") {
        getLyColorInfoFromJson();

    }

}


/**
 * 根据当前地图缩放值显示对应的元素
 * @param {any} zoom 缩放值
 */
function showMapByLevel(zoom) {

    var temp_level = -1;
    if (zoom < cur_map_room[0])
        temp_level = 1;
    else if (zoom >= cur_map_room[cur_map_room.length - 1])
        temp_level = cur_map_room.length;
    else {
        for (var i = 0; i < cur_map_room.length - 1; i++) {
            if (i != cur_map_room.length - 1) {
                if ((zoom < cur_map_room[i + 1]) && (zoom >= cur_map_room[i])) {
                    temp_level = i + 1;
                    break;
                }
            }

        }
    }
    if (temp_level == cur_level)
        return;
    else
        cur_level = temp_level;

    console.log(cur_level);
    var arr_hide_level = new Array();
    var arr_show_level = new Array();
    switch (cur_level) {
        case 1:
            arr_show_level.push("Level1")
            arr_hide_level.push("Level2")
            arr_hide_level.push("Level3")
            arr_hide_level.push("Level4")
            arr_show_level.push("河流一级")
            arr_hide_level.push("河流二级")
            arr_hide_level.push("河流三级")
            arr_hide_level.push("河流四级")
            break;
        case 2:
            arr_hide_level.push("Level1")
            arr_show_level.push("Level2")
            arr_hide_level.push("Level3")
            arr_hide_level.push("Level4")

            arr_show_level.push("河流一级")
            arr_show_level.push("河流二级")
            arr_hide_level.push("河流三级")
            arr_hide_level.push("河流四级")

            break;
        case 3:
            arr_hide_level.push("Level1")
            arr_hide_level.push("Level2")
            arr_show_level.push("Level3")
            arr_hide_level.push("Level4")

            arr_show_level.push("河流一级")
            arr_show_level.push("河流二级")
            arr_show_level.push("河流三级")
            arr_hide_level.push("河流四级")

            break;
        case 4:
            arr_hide_level.push("Level1")
            arr_hide_level.push("Level2")
            arr_hide_level.push("Level3")
            arr_show_level.push("Level4")

            arr_show_level.push("河流一级")
            arr_show_level.push("河流二级")
            arr_show_level.push("河流三级")
            arr_show_level.push("河流四级")
            break;
        default:
            break;
    }
    $.each(arr_show_level, function (index, item) {
        //  console.log(item);
        var obj = document.getElementById(item);
        if (obj != null) {
            obj.style.display = "block";
        }

    })
    $.each(arr_hide_level, function (index, item) {
        var obj = document.getElementById(item);
        if (obj != null) {
            obj.style.display = "none";
        }

    })
    changeAinimotonByLevel();

}

/**
 * 清除所有水库站点的状态gif动画，状态和高亮要区分，状态分超警戒，超保证等，高亮就一个状态active
 * */
function RR_clearStateGif() {
    var f = document.getElementById("g_RR_State");
    var childs = f.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {

        var temp_c = childs.item(i);
        if (temp_c.nodeName == "image") {
            var sz_obj = document.getElementById("id_" + temp_c.getAttributeNS(null, "id").replace("animotion_", "") + "_" + cur_level);
            if (sz_obj != null)
                sz_obj.setAttributeNS(null, 'visibility', 'visible');
        }



        f.removeChild(childs[i]);
    }

}


/**
 * 根据当前图层等级，切换对应元素的动画
 * */
function changeAinimotonByLevel() {
    RR_clearStateGif();
    $.each(arr_gif_ele, function (index, item) {
        RR_addStateGif(item.stcd, item.color);
    });

    $.each(arr_scale_change_ele, function (index, item) {

        var stcd_level = item.split("_")[1];
        if (stcd_level == cur_level)
            animate_scale_open(item, "big");
        else
            animate_scale_close(item);
    });

    $.each(arr_color_change_ele, function (index, item) {
        var stcd_level = item.node.id.split("_")[2];
        if (stcd_level == cur_level)
            ani_opacity_zero(item.node.id.replace("id_", ""));
        else
            item.stop();
    });
}

/**
 * 设置实况雨量图的内容
 * @param {any} rain_html 雨量代码
 */
function setRainImage(rain_html) {
    if (rain_html == undefined)
        rain_html = "";
    -
        $("#rainImage").html("");
    $("#rainImage").html(rain_html);

}

/**
 * 设置选取绘画雨量图的内容(暴雨移植)
 * @param {any} rain_html 雨量代码
 */
function setdrawImage(rain_html) {
    if (rain_html == undefined)
        rain_html = "";

    $("#drawImage").html("");
    $("#drawImage").html(rain_html);

}


/**
 * 刷新html内容，暂为空
 * */
function refreshHtml() {
    /* document.rootElement.innerHTML = document.rootElement.innerHTML;
     initSvgZoom();*/
}


//递归遍历节点nodeType为3两个节点元素之间的空白区域也算是一个元素,4时是脚本
/**
 * //给分区地图动态添加flag属性。(胶东半岛3d图专用，因为id已经设置好。)
 * @param {any} node 。svg元素
 */
function addFlag(node) {
    //    console.log("addF123lag");
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes.item(i).nodeType != 3 && node.childNodes.item(i).nodeType != 4) {
            var child = node.childNodes.item(i);

            if ((child.id != "Layers") && (child.id != "") && (child.id != null) && (child.id != undefined)) {
                //除了全省地图，其他地图都动态添加flag属性，因为ai处理过后，flag属性全部丢失。
                if (child.id.indexOf("id_") > -1) {
                    if (parent.getCurRange() != "14") {
                        if (parent.getCurRange() == "6") {
                            var flag = child.getAttributeNS(null, "flag");
                            if (flag == null) {
                                var _stcd = child.id.split("_")[1];
                                var findobj = baseConfigStcdsInfo.info.find(function (item) {
                                    return item.stcd == _stcd;
                                });
                                child.setAttributeNS(null, 'flag', findobj.flag);
                                flag = findobj.flag;
                            }
                            //其他修补
                            if ((child.nodeName == "g") && (flag.indexOf("_RR_") > -1)) {
                                for (var j = 0; j < child.children.length; j++) {
                                    if (child.children[j].nodeName == "path") {
                                        child.children[j].style.fill = "#fff";
                                    }
                                }
                            }

                        }


                    }

                }
            }
            if (child.childNodes) {
                addFlag(child);
            }
            else {
                break;
            }
        }
    }
}

function getNodePs(node) {

    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes.item(i).nodeType != 3 && node.childNodes.item(i).nodeType != 4) {
            var child = node.childNodes.item(i);

            if ((child.id != "Layers") && (child.id != "") && (child.id != null) && (child.id != undefined)) {
                var child_class = child.getAttributeNS(null, "class");



                var flag = child.getAttributeNS(null, "flag");
                if (flag != null) {
                    var screen_center = getElementCenterByIdBase(child.id);
                    var svg_center = reportMouseCoordinates(document.getElementById(svgRoot.id), screen_center[0], screen_center[1], document.getElementById(child.id));
                    stcd_node_info.push({ stcd: child.id, stnm: flag.split("_")[0], center: [svg_center.x, svg_center.y] });

                }
            }
            if (child.childNodes) {
                getNodePs(child);
            }
            else {
                break;
            }

        }
    }
}

/**
 * 遍历节点，设置节点初始状态
 * @param {any} node svg节点
 */
function findnode(node) {
    var xxx = 0;
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes.item(i).nodeType != 3 && node.childNodes.item(i).nodeType != 4) {
            var child = node.childNodes.item(i);

            if ((child.id != "Layers") && (child.id != "") && (child.id != null) && (child.id != undefined)) {
                var child_class = child.getAttributeNS(null, "class");
                var ishandle = true;
                if (child_class != null) {
                    if ((child_class.indexOf("edgeLine") > -1)) {
                        ishandle = false;
                    }
                }
                if (ishandle) {
                    var flag = child.getAttributeNS(null, "flag");
                    if (flag != null) {
                        xxx++;
                        var arr_data = flag.split("_");
                        var _stnm = arr_data[0];

                        var _sttp = arr_data[2];
                        var arr_boj = new Array();
                        if (child.nodeName == "g") {

                            for (var j = 0; j < child.children.length; j++) {
                                arr_boj.push(child.children[j]);
                            }

                            /*   if (_sttp == "RR") {
                                   child = child.children[child.children.length - 1];
                               }
                               else {
                                   child = child.children[0];
                               }
                               */
                        }
                        else
                            arr_boj.push(child);

                        $.each(arr_boj, function (index_arr_inner, item_arr_inner) {
                            if (item_arr_inner != null) {

                                if (_sttp == "RR") {

                                    item_arr_inner.setAttributeNS(null, "class", "st_" + item_arr_inner.nodeName + "_" + _sttp + "_white");

                                }
                                else {
                                    item_arr_inner.setAttributeNS(null, "class", "st_" + item_arr_inner.nodeName + "_" + _sttp);
                                }
                            }

                        })
                        if (arr_boj.length == 0)
                            break;

                    }
                }
            }
            if (ishandle) {
                if (child.childNodes) {
                    findnode(child);
                }
                else {
                    break;
                }
            }
        }
    }
}


/**
 * 遍历节点，通过名称获取站点信息
 * @param {any} stname 需要获取的站点名称
 * @param {any} node svg元素节点
 */
function getStcdByname(stname, node) {
    if ((node != null) && (node != undefined)) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes.item(i).nodeType != 3 && node.childNodes.item(i).nodeType != 4) {
                var child = node.childNodes.item(i);
                if ((child.id != "Layers") && (child.id != "") && (child.id != null) && (child.id != undefined)) {
                    var child_class = child.getAttributeNS(null, "class");
                    var flag = child.getAttributeNS(null, "flag");
                    if (flag != null) {
                        var arr_data = flag.split("_");
                        var _stnm = arr_data[0];
                        var _stcd = arr_data[1];
                        var _sttp = arr_data[2];
                        if (_stnm == stname) {
                            findStInfo = flag;
                            break;
                        }
                    }
                }
                if (child.childNodes) {
                    getStcdByname(stname, child);
                }
                else {
                    break;
                }
            }
        }
    }
}

/**
 * 清除水库的高亮状态
 * */
function RR_clearAcviveGif() {
    var f = document.getElementById("g_RR_Active");
    var childs = f.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        var temp_c = childs.item(i);
        if (temp_c.nodeName == "image") {
            var sz_obj = document.getElementById("id_" + temp_c.getAttributeNS(null, "id").replace("animotion_", "") + "_" + cur_level);
            if (sz_obj != null)
                sz_obj.setAttributeNS(null, 'visibility', 'visible');
        }
        f.removeChild(childs[i]);
    }
}


/**
 *  设置站高亮状态
 * @param {any} stcd 站码
 */
function stcd_Active(stcd) {
    stcd_InactiveAll();
    RR_clearAcviveGif();
    var obj = document.getElementById(stcd + "_" + cur_level);
    if (obj == null)
        return;
    if (obj.id == "id_") {
        return;
    }

    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            var arr_data = flag.split("_");
            var _sttp = arr_data[2];
            if (_sttp != "RR") {
                var list_obj = [];
                if (obj.nodeName == "g") {

                    for (var j = 0; j < obj.children.length; j++) {
                        list_obj.push(obj.children[j])
                    }

                }
                else
                    list_obj.push(obj)

                $.each(list_obj, function (index_xxx, item_xxx) {

                    var old_class = item_xxx.getAttributeNS(null, "class");
                    if (old_class != null) {
                        if ((old_class.indexOf("stcd_active") == -1) && (old_class.indexOf("stcd_shanshuo") == -1)) {
                            var new_class = "";
                            if (old_class != null) {
                                var arr_class = old_class.split(" ");
                                for (var nx = 0; nx < arr_class.length; nx++) {
                                    if ($.trim(arr_class[nx]) != "") {
                                        if (arr_class[nx].indexOf("st_" + item_xxx.nodeName + "_" + _sttp) > -1) {
                                            new_class = new_class + (" " + arr_class[nx] + "_old ");
                                        }
                                        else
                                            new_class += arr_class[nx] + "_base ";
                                    }

                                }
                                new_class = new_class + " tpf_" + _sttp + " ";

                            }
                            item_xxx.setAttributeNS(null, "class", new_class + "st_" + item_xxx.nodeName + "_" + _sttp + "_red" + " stcd_shanshuo stcd_active");

                        }
                    }
                    else
                        item_xxx.setAttributeNS(null, "class", "st_" + item_xxx.nodeName + "_" + _sttp + "_red" + " stcd_shanshuo stcd_active");


                })
            }
            else {
                RR_addActiveGif(stcd.replace("id_", ""));
            }

            console.log("asd");
        }
    }

}

/**
 * 停止所有高亮状态
 * */
function stcd_InactiveAll() {
    var arr_obj = document.getElementsByClassName("stcd_active");
    for (var i = 0; i < arr_obj.length; i++) {
        obj = arr_obj[i];

        if (obj != null) {

            var _sttp = "";
            var old_class = obj.getAttributeNS(null, "class");
            var arr_class = old_class.split(" ");
            for (var nx = 0; nx < arr_class.length; nx++) {
                if ($.trim(arr_class[nx]) != "") {
                    if (arr_class[nx].indexOf("tpf_") > -1) {
                        new_class = new_class + (" " + arr_class[nx] + "_old ");
                        _sttp = arr_class[nx].replace("tpf_", "");
                        nx = arr_class.length;
                    }

                }

            }
            var reg1 = new RegExp("_old", "g");
            var reg2 = new RegExp("st_" + obj.nodeName + "_" + _sttp + "_red", "g");
            var reg3 = new RegExp("stcd_shanshuo", "g");
            var reg4 = new RegExp("stcd_active", "g");
            var reg5 = new RegExp("_base", "g");
            var reg6 = new RegExp("tpf_" + _sttp, "g");
            var new_class = old_class.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "").replace(reg5, "").replace(reg6, "");
            obj.setAttributeNS(null, "class", new_class);
        }
    }


}


/**
 * 显示分区，即切换分区
 * @param {any} _name 分区名称
 */
function showFenqu(_name) {
    if (parent.getCurFenqu() == _name)
        return false;

    var mapname = "";
    if (_name == "全部") {
        mapname = "img/map/shandong.svg";
    }
    else {
        mapname = "img/map/3d_" + _name + ".svg";
    }
    var Exists = parent.isExitSvgFile(mapname);
    if (Exists) {
        parent.loadSvgFile(mapname, _name);
        return true;
    }
    parent.show_error(_name + "暂时没有作战图!");
    return false;
}


/**
 * 水库设置高亮状态
 * @param {any} stcd 站码
 */
function RR_addActiveGif(stcd) {
    stcd = "" + stcd;
    var sz_obj = document.getElementById("id_" + stcd + "_" + cur_level);

    if (sz_obj == null)
        return;
    sz_obj.setAttributeNS(null, 'visibility', 'hidden');
    var flag = getFlagById(stcd);
    if (flag == null)
        return;
    if (flag.split("_")[2] == "RR") {
        var child = sz_obj.children[0];
        var cx = child.getAttributeNS(null, "cx");
        var cy = child.getAttributeNS(null, "cy");
        var r = child.getAttributeNS(null, "r");
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgimg.setAttributeNS(null, 'height', r * 2);
        svgimg.setAttributeNS(null, 'width', r * 2);
        svgimg.setAttributeNS(null, 'id', "animotion_" + stcd);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'gif/active.gif');
        svgimg.setAttributeNS(null, 'x', Number(cx) - 1 * Number(r));
        svgimg.setAttributeNS(null, 'y', Number(cy) - 1 * Number(r));
        svgimg.setAttributeNS(null, 'flag', flag);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        document.getElementById('g_RR_Active').appendChild(svgimg);
    }
    return;
}

/**
 * 水库增加状态动画，这里使用gif图片，解决使用animotion 动画太多卡顿问题。
 * @param {any} stcd 站码
 * @param {any} color 颜色
 */
function RR_addStateGif(stcd, color) {
    stcd = "" + stcd;
    var sz_obj = document.getElementById("id_" + stcd + "_" + cur_level);

    if (sz_obj == null)
        return;
    sz_obj.setAttributeNS(null, 'visibility', 'hidden');
    var flag = getFlagById(stcd);
    if (flag == null)
        return;
    if (flag.split("_")[2] == "RR") {
        var child = sz_obj.children[0];
        var cx = child.getAttributeNS(null, "cx");
        var cy = child.getAttributeNS(null, "cy");
        var r = child.getAttributeNS(null, "r");
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgimg.setAttributeNS(null, 'height', r * 5);
        svgimg.setAttributeNS(null, 'width', r * 5);
        svgimg.setAttributeNS(null, 'id', "animotion_" + stcd);
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', "gif/" + color.split("_")[1] + '.gif');
        svgimg.setAttributeNS(null, 'x', Number(cx) - 2.5 * Number(r));
        svgimg.setAttributeNS(null, 'y', Number(cy) - 2.5 * Number(r));
        svgimg.setAttributeNS(null, 'flag', flag);
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        document.getElementById('g_RR_State').appendChild(svgimg);
    }
    return;
}

/**
 * 设置是否能够对svg进行移动和缩放
 * @param {any} flag 标识位
 */
function setSvgState(flag) {
    if (!flag) {
        svgzoom.disablePan();
        svgzoom.disableZoom();
    }
    else {
        svgzoom.enablePan();
        svgzoom.enableZoom();
    }
}

/**
 * 移动雨量图(暴雨移植)
 * @param {any} px 偏移量x 屏幕坐标
 * @param {any} py 偏移量y 屏幕坐标
 */
function moveRect(px, py) {

    var svg_yuandian = reportMouseCoordinates(document.getElementById(svgRoot.id), 0, 0, document.getElementById("g_test"));

    var svg_start = reportMouseCoordinates(document.getElementById(svgRoot.id), Math.abs(px), Math.abs(py), document.getElementById("g_test"));

    var svg_move_x = svg_start.x - svg_yuandian.x;
    var svg_move_y = svg_start.y - svg_yuandian.y;
    var px_start = px < 0 ? 0 - Math.abs(svg_move_x) : Math.abs(svg_move_x);
    var py_start = py < 0 ? 0 - Math.abs(svg_move_y) : Math.abs(svg_move_y);


    let obj = document.getElementById("drawImage");

    obj.setAttribute("transform", "translate(" + (rect_let + px_start) + " " + (rect_top + py_start) + ")");
    console.log((rect_let + px_start) + "/////" + (rect_top + py_start) + "/////" + byyz_center[0] + "/////" + byyz_center[1]);
    getNearStcd(byyz_center[0] + (rect_let + px_start), byyz_center[1] + (rect_top + py_start));
}

/**
 * 获取画的矩形的svg坐标(暴雨移植，暂无引用)
 * */
function getRectInfo() {

    var res = null;

    var obj = document.getElementById("drawImage");
    var trans_info = obj.getAttributeNS(null, "transform").replace("translate(", "").replace(")", "").split(" ");
    var trans_x = Number(trans_info[0]);
    var trans_y = Number(trans_info[1]);


    var rect = obj.getBoundingClientRect();


    var rect_lefttop = reportMouseCoordinates(document.getElementById(svgRoot.id), rect.left, rect.top, obj);
    var rect_rightbottom = reportMouseCoordinates(document.getElementById(svgRoot.id), rect.left + rect.width, rect.top + rect.height, obj);

    res = { left: rect_lefttop.x + trans_x, top: rect_lefttop.y + trans_y, right: rect_rightbottom.x + trans_x, bottom: rect_rightbottom.y + trans_y };

    return res;
    console.log((rect_lefttop.x + trans_x) + ":" + (rect_lefttop.y + trans_y) + ":" + (rect_rightbottom.x + trans_x) + ":" + (rect_rightbottom.y + trans_y));

}


/**
 * //从配置文件中读取所有的站点配置信息
 * */
function getStcdInfoFromJson() {

    baseConfigStcdsInfo = null;
    $.getJSON("stcd_all.json", function (data, status) {
        if (status == 'success') {
            baseConfigStcdsInfo = data;
        } else {
            console.log("没有读取到本地文件：" + status);
        }
    })
}

/**
 * //从配置文件中读取所有的流域配色信息
 * */
function getLyColorInfoFromJson() {

    baseConfigLyInfo = null;
    $.getJSON("liuyu_color.json", function (data, status) {
        if (status == 'success') {
            baseConfigLyInfo = data;
            setLyColor("warm");
        } else {
            console.log("没有读取到本地文件：" + status);
        }
    })
}


//设置流域颜色
function setLyColor(type) {
    if (parent.getCurRange() != "14")
        return;

    $.each(baseConfigLyInfo.info, function (index, item) {
        if (type == "warm")
            document.getElementById(item.name).style.fill = item.warm;
        else
            document.getElementById(item.name).style.fill = item.cold;

    })

}
function getElementCenterByIdBase(_stcd) {
    var obj = document.getElementById(_stcd);
    if (obj != null) {
        var rect = obj.getBoundingClientRect();
        var pt_x = rect.left + rect.width / 2;
        var pt_y = rect.top + rect.height / 2;
        return [pt_x, pt_y];
    }
    return null;
}

/**
 * 自动添加地图信息(除了全省地图，其他都要配信息)
 * */
function autoAddMapInfo() {
    stcd_node_info = new Array();
    if (parent.getCurRange() != "14") {
        window.setTimeout(() => {
            for (var i = 1; i <= 4; i++) {
                var obj = document.getElementById("Level" + i);
                if (i != cur_level)
                    obj.style.display = "none";
                else
                    obj.style.display = "block";
                addStcdInfo(obj, i);
            }
            getNodePs(document.documentElement);
            console.log("svgzoom.getZoom():" + svgzoom.getZoom());
            // showMapByLevel(svgzoom.getZoom());
        }, 500);
    }
    else
        getNodePs(document.documentElement);;

}
/**
 * //给分区地图动态更改id和添加flag属性
 * @param {any} node 。分别是Level1~Level4
 * @param {any} level_index,Level 层级1~4
 */
function addStcdInfo(node, level_index) {
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes.item(i).nodeType != 3 && node.childNodes.item(i).nodeType != 4) {
            var child = node.childNodes.item(i);

            if ((child.id != "Layers") && (child.id != "") && (child.id != null) && (child.id != undefined)) {
                var findobj = null;

                //水库闸坝特殊处理，因为有的站名带“水库”两个字，有的不带,而且g对应RR或者DD
                if (child.nodeName == "g") {
                    if (child.children.length > 0) {
                        if (child.children[0].nodeName == "rect") {
                            findobj = baseConfigStcdsInfo.info.find(function (item) {
                                return ((item.flag.split("_")[0] == child.id.split("_")[0]) && (item.flag.split("_")[2] == "DD"));
                            });
                        }
                        else if (child.children[0].nodeName == "circle") {
                            findobj = baseConfigStcdsInfo.info.find(function (item) {
                                return (((item.flag.split("_")[0] == child.id.split("_")[0]) && (item.flag.split("_")[2] == "RR")) || ((item.flag.split("_")[0] == child.id.split("_")[0] + "水库") && (item.flag.split("_")[2] == "RR")));
                            });
                        }
                    }
                }
                else //其他站类处理
                    findobj = baseConfigStcdsInfo.info.find(function (item) {
                        return ((item.flag.split("_")[0] == child.id.split("_")[0]) && (item.flag.split("_")[2] != "RR") && (item.flag.split("_")[2] != "DD"));
                    });

                if (findobj != null) {
                    child.setAttributeNS(null, 'id', "id_" + findobj.stcd + "_" + level_index);
                    child.setAttributeNS(null, 'flag', findobj.flag);
                    //水库统一处理默认样式
                    if ((child.nodeName == "g") && (findobj.flag.indexOf("_RR_") > -1)) {
                        for (var j = 0; j < child.children.length; j++) {
                            if (child.children[j].nodeName == "path") {
                                child.children[j].style.fill = "#fff";
                            }
                        }
                    }
                    //闸坝统一处理默认样式
                    if ((child.nodeName == "g") && (findobj.flag.indexOf("_DD_") > -1)) {
                        for (var j = 0; j < child.children.length; j++) {
                            //线条宽度
                            var _line_width = level_index <= 2 ? 0.5 : (level_index == 3 ? 0.25 : 0.2);
                            child.children[j].setAttributeNS(null, "style", "fill:#fff;stroke:#e50012;stroke-linejoin:round;stroke-width:" + _line_width + "px");
                        }
                    }
                }

            }
            if (child.childNodes) {
                addStcdInfo(child, level_index);
            }
            else {
                break;
            }
        }
    }
}


//////////以下是河流演进的功能

/**
 * 河流动画
 * @param {any} index 索引
 * @param {any} arrSrc 原始河流数组
 * @param {any} upColor 上游颜色
 */
function annimotion_river(index, arrSrc, upColor) {
    if (index > 0) {
        var text_g = document.getElementById("text_g_" + arrSrc[index - 1].getAttribute("id") + "_move");
        if (text_g != undefined) {
            var childs = text_g.childNodes;
            for (var i = childs.length - 1; i >= 0; i--) {
                text_g.removeChild(childs[i]);
            }

        }


    }

    if (index >= arrSrc.length)
        return;


    if (cur_data == null)
        return;
    if (cur_data.length == 0)
        return;


    var d = arrSrc[index].getAttribute("d");
    var transform = arrSrc[index].getAttribute("transform");
    var id = arrSrc[index].getAttribute("id");


    var gl_stcd = id.split("_")[2];
    var findobj = cur_data.find(function (item) {
        return item.stcd == gl_stcd;
    });

    var color = upColor;
    //找不到，直接进入下一个河流段
    if (findobj != undefined) {

        color = findobj.color;

    }

    if (color == "#0086D1")
        color = "#0000ff";

    var _name = findobj == undefined ? "" : findobj.stnm;
    var _ll = findobj == undefined ? "" : Math.round(findobj.Q, 0);
    var _sw = findobj == undefined ? "" : parent.getSWfomatData(findobj.Z + "");

    var new_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    new_path.setAttribute('fill', "none");
    new_path.setAttribute('stroke', color);
    new_path.setAttribute('id', id + "_move");
    new_path.setAttribute('stroke-width', "2");
    new_path.setAttribute('d', d);
    new_path.setAttribute('transform', transform);
    document.getElementById("g_river_move").appendChild(new_path);
    var obj = Snap_svg.select('#' + id + "_move");
    var river_length = obj.getTotalLength();
    new_path.setAttribute('stroke-dasharray', river_length);
    new_path.setAttribute('stroke-dashoffset', river_length);

    var g_text = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g_text.setAttribute('id', "text_g_" + id + "_move");
    var text_bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // text_bg.setAttribute('fill', "transparent");
    text_bg.setAttribute('fill', "#123e56");
    text_bg.setAttribute('stroke-width', "0");
    text_bg.setAttribute('x', -10000);
    text_bg.setAttribute('y', -10000);
    text_bg.setAttribute('rx', 6);
    text_bg.setAttribute('ry', 6);
    text_bg.setAttribute('transform', transform);
    text_bg.setAttribute('width', 80);
    text_bg.setAttribute('height', 36);
    // text_bg.setAttribute('border', "1px solid #ccc");
    // text_bg.setAttribute('border-radius', "4px");
    g_text.appendChild(text_bg);



    var text_name = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text_name.setAttribute('x', -10000);
    text_name.setAttribute('y', -10000);
    text_name.setAttribute('id', "text_name_" + id + "_move");
    text_name.setAttribute('font-family', "'ArialMT'");
    text_name.setAttribute('transform', transform);
    text_name.setAttribute('font-size', "8");
    // text_sw.setAttribute('fill', arr_clolor[index % arr_clolor.length]);
    text_name.setAttribute('fill', "#ffffff");
    $(text_name).text(_name);
    g_text.appendChild(text_name);


    var text_ll = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text_ll.setAttribute('x', -10000);
    text_ll.setAttribute('y', -10000);
    text_ll.setAttribute('id', "text_ll_" + id + "_move");
    text_ll.setAttribute('font-family', "'ArialMT'");
    text_ll.setAttribute('transform', transform);
    text_ll.setAttribute('font-size', "8");
    // text_sw.setAttribute('fill', arr_clolor[index % arr_clolor.length]);
    text_ll.setAttribute('fill', "#ffffff");


    $(text_ll).text("流量:" + _ll + "m³/s");
    g_text.appendChild(text_ll);

    var text_sw = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text_sw.setAttribute('x', -10000);
    text_sw.setAttribute('y', -10000);
    text_sw.setAttribute('id', "text_sw_" + id + "_move");
    text_sw.setAttribute('font-family', "'ArialMT'");
    text_sw.setAttribute('transform', transform);
    text_sw.setAttribute('font-size', "8");
    // text_sw.setAttribute('fill', arr_clolor[index % arr_clolor.length]);
    text_sw.setAttribute('fill', "#ffffff");

    $(text_sw).text("水位:" + _sw + "m");
    g_text.appendChild(text_sw);

    /*  var text_tm = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text_tm.setAttribute('x', -10000);
      text_tm.setAttribute('y', -10000);
      text_tm.setAttribute('id', "text_sw_" + id + "_move");
      text_tm.setAttribute('font-family', "'ArialMT'");
      text_tm.setAttribute('transform', transform);
      text_tm.setAttribute('font-size', "10");
      // text_sw.setAttribute('fill', arr_clolor[index % arr_clolor.length]);
      text_tm.setAttribute('fill', "#0000ff");
  
      $(text_tm).text("时间:" + findobj.Z+ "");
      g_text.appendChild(text_tm);*/
    if (findobj != null)
        document.getElementById("g_river_move_text").appendChild(g_text);



    Snap.animate(river_length, 0, function (val) {

        var temp_movepoint = obj.getPointAtLength(river_length - val);
        //获得路径上的每个点坐标
        var x = temp_movepoint.x;
        var y = temp_movepoint.y;
        var deg = temp_movepoint.alpha;

        console.log(x + "/" + y)

        new_path.setAttribute('stroke-dashoffset', val);
        text_name.setAttribute('x', x + 5);
        text_name.setAttribute('y', y - 30);
        text_ll.setAttribute('x', x + 5);
        text_ll.setAttribute('y', y - 20);
        text_sw.setAttribute('x', x + 5);
        text_sw.setAttribute('y', y - 10);
        text_bg.setAttribute('x', x);
        text_bg.setAttribute('y', y - 40);


    }, 1500, mina.easeout(), function () {
        if (isRiverYj_continute)
            annimotion_river(index + 1, arrSrc, color);
    });

}

/**
 * 河流演进效果
 * @param {any} river_name 河流名称
 */
function river_yj(river_name) {
    //只做当前级别河流的演进效果
    var obj_river = document.getElementById(river_name);
    var river_level = obj_river.parentNode.getAttributeNS(null, "river_level");
    if (Number(river_level) > cur_level)
        return;



    var arr_river_child = new Array();
    for (var i = 0; i < obj_river.children.length; i++) {
        if (obj_river.children[i].nodeName == "path") {
            arr_river_child.push(obj_river.children[i]);
        }
    }
    arr_river_child.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        else {
            return 1;
        }
    });

    //  var arr_clolor = ["#ff0000", "#00ff00", "#ff00ff", "#00ffff"];
    // clearAll_river_yj();
    isRiverYj_continute = true;
    annimotion_river(0, arr_river_child, "#00BFFF");

}


/**
 * 清除演进动画
 * */
function clearAll_river_yj() {
    isRiverYj_continute = false;
    var arr_layer = ["g_river_move", "g_river_move_text"];
    for (var index = 0; index < arr_layer.length; index++) {
        var f = document.getElementById(arr_layer[index]);
        var childs = f.childNodes;
        for (var i = childs.length - 1; i >= 0; i--) {
            var obj = Snap_svg.select('#' + f.id);
            obj.stop(true);
            f.removeChild(childs[i]);
        }
    }


}


/**
 * 一键河流演进
 * @param {any} arr_riverName 河流名称数组
 */
function btn_river_yj(arr_riverName) {
    clearAll_river_yj();
    $.each(arr_riverName, function (index, item) {
        river_yj("river_" + item);
    })
}
/////////////////////////////////////////////////////////////




//////////以下是河流分段颜色和站点绑定的功能


/**
 * 根据站点设置河流状态颜色
 * @param {} stcd 站码
 * @param {*} color 颜色
 */
function setRiverStetByStcdColor(stcd, color) {
    if (color == "")
        return;


    if (color == "#0086D1")
        color = "#0000ff";

    var obj = document.getElementById("seg" + stcd);
    if ((obj == null) || (obj == undefined))
        return;

    if (obj.nodeName == "g") {
        obj.children[0].style.fill = color;
    }
    else {
        obj.style.stroke = color;
    }

}


/**
 * 
 * @returns 初始化河流段的状态颜色,分两种元素
 */
function initRiverState() {
    for (var k = 1; k <= 4; k++) {
        var obj = document.getElementById("state_river_" + k);
        if ((obj == null) || (obj == undefined))
            return;

        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].nodeName == "g") {

                obj.children[i].children[0].style.fill = "none";

            }
            else if (obj.children[i].nodeName == "path") {
                obj.children[i].style.stroke = "transparent";

            }
        }
    }

}
/////////////////////////////////////////////////////////////


//初始化河流基础颜色，添加分段g标签
function initAllRiverBaseColor() {

    var arr_riverLevel = ["河流一级", "河流二级", "河流三级", "河流四级"];
    for (var i = 0; i < arr_riverLevel.length; i++) {
        var obj_level = document.getElementById(arr_riverLevel[i]);
        if (obj_level != null) {
            for (var j = 0; j < obj_level.children.length; j++) {
                if (obj_level.children[j].id.indexOf("state_river_") == -1) {
                    if (obj_level.children[j].nodeName == "g") {

                        obj_level.children[j].children[0].style.fill = "#00BFFF";

                    }
                    else if (obj_level.children[j].nodeName == "path") {
                        obj_level.children[j].style.stroke = "#00BFFF";
                        ;
                    }
                }


            }
            if (parent.getCurRange() == "14")
                obj_level.innerHTML += "<g id='state_river_" + (i + 1) + "' ></g>";
            else
                obj_level.innerHTML += "<g id='state_river_" + (i + 1) + "' transform='translate(0.02 45.8)'></g>";


        }

    }
}


//河流分段和站码绑定，从xml中获取
function getHlFdXml() {


    $.ajax({
        url: "state_river.xml",
        dataType: 'xml',
        type: 'GET',
        async: false,
        error: function (xml) {
            alert("加载XML 文件出错！");
        },
        success: function (xml) {
            var arr_eles = xml.children[0].children;
            for (var i = 0; i < arr_eles.length; i++) {
                var stcd = arr_eles[i].id.replace("seg", "");

                var ele_level = getStcdLevel(stcd);
                if (ele_level != null) {
                    var content = arr_eles[i].outerHTML;
                    document.getElementById("state_river_" + ele_level).innerHTML += content;
                }

            }

        }
    });

}

/**
 * 通过站码获取绑定的河流在哪一层
 * @param {*} stcd 站码
 * @returns 
 */
function getStcdLevel(stcd) {
    var res = null;

    var max_level = 4;
    for (var i = 1; i <= max_level; i++) {
        if (document.getElementById("id_" + stcd + "_" + i) != null) {
            res = i;
            i = max_level;
        }

    }
    return res;
}