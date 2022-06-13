//# sourceURL=svg_innerop_ght.js
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
 
var findStInfo = "";
 
 
//14个区域对应的四级缩放阈值
var arr_MaplevelRoom = [
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4],
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4],
    [1.1, 1.5, 2.0, 2.4], [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4],
    [0.7, 1.3, 1.8, 2.4], [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4],
    [1.1, 1.5, 2.0, 2.4], [0.7, 1.3, 1.8, 2.4]];
//14个区域对应的初始化便宜位置
var arr_MaplevelPos = [
    [250, 300], [-1450, -600], [250, 300],
    [-200, -100], [1000, -100], [1520, -400],
    [300, 150], [-1820, 600], [250, 300],
    [250, 300], [-420, 500], [250, 300],
    [220, 300], [250, 300]];
//14个区域对应的初始化room，最小room，以及最大room
var arr_MapRoomConfig = [
    [1.3, 0.8, 3.3], [1.3, 0.8, 3.3], [0.8, 0.8, 3.3],
    [1.45, 0.8, 3.3], [1.45, 0.8, 3.3], [1.3, 0.8, 3.3],
    [3.0, 0.8, 3.3], [1.4, 0.8, 3.3], [0.8, 0.8, 3.3],
    [0.8, 0.8, 3.3], [1.3, 0.8, 3.3], [0.8, 0.8, 3.3],
    [2.4, 0.8, 3.3], [0.8, 0.8, 3.3]];

var cur_map_room = null;

//当前地图等级；
var cur_level = 0;

 
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


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
            parent.show_stcd_menu(pt_x, pt_y, flag);

        }
        obj.setAttributeNS(null, "cursor", "");
    }

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
    var obj = document.getElementById("id_" + _stcd );
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
            obj = document.getElementById("id_" + _stcd );
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
    
        var obj = document.getElementById("id_" + _stcd );
        if (obj != null) {
            i = 4;
            var flag = obj.getAttributeNS(null, "flag");
            if (flag != null) {
                return flag;
            }
        }
    
    return null;

}


/**
 * 通过站码获取元素右侧垂直中心点坐标
 * @param {any} _stcd 站码
 */
function getElementRightPtById(_stcd) {
   
        var obj = document.getElementById("id_" + _stcd  );
        if (obj != null) {
            i = 4;
            var rect = obj.getBoundingClientRect();
            var pt_x = rect.left + rect.width;
            var pt_y = rect.top + rect.height / 2;
            return [pt_x, pt_y];
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
function initRiver() {
    return;
}

/**
 * 根据条件值设置元素状态
 * @param {any} item 后台返回的状态值
 */
function setStcdState(item) {

    var obj = document.getElementById("id_" + item.Stcd);


    if (obj != null) {

        var flag = obj.getAttributeNS(null, "flag");

        if (flag == null)
            return;

        var _stnm = flag.split("_")[0];
        var _sttp = flag.split("_")[2];
        
        var color = "";
        var is_shanshuo = 0;
        var type_shanshuo = -1;
        var stateValue = -1;
        if (item.Status.indexOf("预警") > -1) {
            if (item.Status.indexOf("蓝色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_blue";
                stateValue = 0;
            } else if (item.Status.indexOf("黄色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_yellow";
                stateValue = 1;
            } else if (item.Status.indexOf("橙色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_orange";
                stateValue = 2;
            } else if (item.Status.indexOf("红色预警") > -1) {
                is_shanshuo = 1;
                type_shanshuo = 0;
                color = "_red";
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
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                        stateValue = 1;
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        stateValue = 3;
                        color = "_red";
                    }

                    break;
                case "ZZ":
                    if (item.Status.indexOf("超警") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                    }

                    break;
                case "DD":
                    if (item.Status.indexOf("超警") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超保") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                    } else if (item.Status.indexOf("已启用") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_orange";
                    }
                    break;
                case "RR":
                    if (item.Status.indexOf("超汛") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_blue";
                    } else if (item.Status.indexOf("超设") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                    } else if (item.Status.indexOf("超校") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_pink";
                    }
                    break;
                case "XX":
                    if (item.Status.indexOf("已启用") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 1;
                        color = "_orange";
                    }
                    else {
                        is_shanshuo = 1;
                        type_shanshuo = -1;
                        color = "_blue";
                    }

                    break;
                case "HP":
                    if (item.Status.indexOf("超汛") > -1) {
                        color = "_blue";
                    } else if (item.Status.indexOf("超正常") > -1) {
                        color = "_blue";
                    } else if (item.Status.indexOf("超设") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_red";
                    } else if (item.Status.indexOf("超校") > -1) {
                        is_shanshuo = 1;
                        type_shanshuo = 0;
                        color = "_pink";
                    }
                    break;
            }
        }

      

        if (color == "") {

            color = "_white";
        }

      

        syncBroState(item.Stcd, _sttp, color);


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
    }
}

/**
 * 设置元素状态 -颜色
 * @param {any} stcd 站码
 * @param {any} sttp 站类
 * @param {any} color 颜色
 */
function syncBroState(stcd, _sttp, color) {
    var obj = document.getElementById("id_" + stcd);
    if (obj.nodeName == "g") {
        for (var j = 0; j < obj.children.length; j++) {
            if (_sttp == "RR") {
                if (obj.children.length == 2)
                    obj.children[0].setAttributeNS(null, "class", "st_" + obj.children[0].nodeName + "_" + _sttp + color)
                else
                    obj.children[obj.children.length - 1].setAttributeNS(null, "class", "st_" + obj.children[obj.children.length - 1].nodeName + "_" + _sttp + color)
            }
            else if (_sttp == "DD") {

                obj.children[0].setAttributeNS(null, "class", "st_" + obj.children[0].nodeName + "_" + _sttp + color)
            }
            j = obj.children.length;
        }
    }
    else
        obj.setAttributeNS(null, "class", "st_" + obj.nodeName + "_" + _sttp + color);

   
}
/**
 * 元素透明度改变动画
 * @param {any} stcd 站码
 */
function syncBroOpacity(stcd) {
  
        var obj = null;

        obj = Snap_svg.select('#id_' + stcd );

        if ((obj != null) && (obj != undefined)) {
            arr_color_change_ele.push(obj);
                ani_opacity_zero(stcd);
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
    var obj = Snap_svg.select("#id_" + stcd);;
        if (obj != null) {
            arr_scale_change_ele.push(stcd);
            //启动当前级别站点的动画
            animate_scale_open(stcd, "big");
        }
   
}

/**
 * 
* 四预，根据每个进程的返回数据重新初始化所有元素的状态
 * @param {any} json 后端返回的json数据
 * @param {any} mode_name 模型名称
 * @param {any} process_type 类型 "shikuang"，"yubao"，"yujing"，"diaodu"
 */
function initClass(json, mode_name, process_type) {
    window.setTimeout(() => {

        var node = document.documentElement;
        findnode(node);

      
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
 
        is_color_change = false;
        is_move_change = false;
        clear_animate();
        arr_color_change_ele = new Array();
        arr_scale_change_ele = new Array();
        arr_gif_ele = new Array();

        $.each(_data, function (i, item) {
            setStcdState(item);
        });


        return;
    }, 500);


}

/**
 * 设置河流颜色
 * @param {any} classname 河流的class 标志
 * @param {any} color 颜色
 */
function setRiverColor(classname, color) {
    return;
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


/**
 * 显示地图边界
 * */
function showEdge() {

}

/**
 * 隐藏地图边界
 * */
function hideEdge() {

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
            //  console.log("onUpdatedCTM");
            var zoom = this.getZoom();
            parent.update_element(zoom);
            parent.update_menu_position();

        }
    });
    svgRoot = document.rootElement;

    svgzoom.zoomAtPoint(1.2, { x: $(window).width() / 2 + 130, y: $(window).height() / 2 });
    svgzoom.setMinZoom(0.5);
    svgzoom.setMaxZoom(3.5);


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
            var sz_obj = document.getElementById("id_" + temp_c.getAttributeNS(null, "id").replace("animotion_", "") );
            if (sz_obj != null)
                sz_obj.setAttributeNS(null, 'visibility', 'visible');
        }



        f.removeChild(childs[i]);
    }

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

                   // $("#" + child.id).removeAttr("style");

                    var flag = child.getAttributeNS(null, "flag");
                    if (flag != null) {
                        xxx++;
                        var arr_data = flag.split("_");
                        var _stnm = arr_data[0];

                        var _sttp = arr_data[2];
                        var arr_boj = new Array();
                        if (child.nodeName == "g") {

                            for (var j = 0; j < child.children.length; j++) {
                                if (_sttp == "RR") {
                                    if (child.children.length == 2)
                                        arr_boj.push(child.children[0]);
                                    else
                                        arr_boj.push(child.children[child.children.length - 1]);
                             
                                    j = child.children.length;
                                }
                                else
                                    arr_boj.push(child.children[j]);
                            }

                            
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
            var sz_obj = document.getElementById("id_" + temp_c.getAttributeNS(null, "id").replace("animotion_", "")  );
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
    var obj = document.getElementById(stcd  );
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
    var sz_obj = document.getElementById("id_" + stcd  );

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
    var sz_obj = document.getElementById("id_" + stcd  );

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

 

 
 

 

 
 