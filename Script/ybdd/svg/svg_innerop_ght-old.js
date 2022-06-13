//# sourceURL=svg_innerop_11.js
var svgDoc = null;

var svgRoot = null;

var parentWnd = null; //保存html的window对象  
var svgzoom = null;

var Snap_svg = null;
var is_color_change = false;
var is_move_change = false;
var arr_color_change_ele = null;
 
var arr_scale_change_ele = null;
var findStInfo = "";
var defaul_model = 2;

document.oncontextmenu = function (ev) {
    return false;    //屏蔽右键菜单
}
function onSvgmousedown(evt) {
    parent.hide_menu_svg();
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
function getMenuPosition(_stcd) {
    var obj = document.getElementById("id_" + _stcd + "_" + cur_level);
    var rect = obj.getBoundingClientRect();
    var pt_x = rect.left + rect.width;
    var pt_y = rect.top + rect.height / 2;
    var point = { x: pt_x, y: pt_y };
    return point;
}
function onSvgclick(evt) {
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
    }


}
function getSvgPoint(_point) {
    var t_point = document.rootElement.createSVGPoint();
    t_point.x = _point[0];
    t_point.y = _point[1];
    var _pt = t_point.matrixTransform(svgzoom.getCTM());

    return _pt;
}
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

 
function getFlagById(_stcd) {
    var obj = document.getElementById("id_" + _stcd);
    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            return flag;
        }
    }
    return null;

}
function getElementRightPtById(_stcd) {
    var obj = document.getElementById("id_" + _stcd);
    if (obj != null) {
        var rect = obj.getBoundingClientRect();
        var pt_x = rect.left + rect.width;
        var pt_y = rect.top + rect.height / 2;
        return [pt_x, pt_y];
    }
    return null;


}
function getFlagById(_stcd) {
    var obj = document.getElementById("id_" + _stcd);
    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        return flag;
    }
    return null;


}
 
function clear_animate(is_color_clear, is_move_clear) {
    if (is_color_clear) {
        is_color_change = false;
        $.each(arr_color_change_ele, function (index, item) {
            console.log('stop-color');
            item.stop();
        });
        if (arr_color_change_ele != null)
            arr_color_change_ele.length = 0;

        console.log('clear_color_animate');
    }
    var tem_arr_scale_change_ele = $.extend(true, [], arr_scale_change_ele);
    $.each(tem_arr_scale_change_ele, function (index, item) {
        animate_bigsmall_close(item);
    });
 

    if (arr_scale_change_ele != null)
        arr_scale_change_ele.length = 0;





}
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
function coordinateTransform(screenPoint, someSvgObject) {
    var CTM = someSvgObject.getScreenCTM();
    return screenPoint.matrixTransform(CTM.inverse());
}
function reportMouseCoordinates(svgElement, pageX, pageY, svgChild) {
    var point = svgElement.createSVGPoint();
    point.x = pageX;
    point.y = pageY;
    point = coordinateTransform(point, svgChild);
    return point;
}
$(window).resize(function () {
    //console.log("svg");
    parent.update_element();
});
function init(evt) {
    is_color_change = false;
    is_move_change = false;
 
    initSvgZoom(evt);
    Snap_svg = Snap('#' + svgRoot.id);
    document.svgWnd = window;
    findnode(document.rootElement);
 
}
 

 
function setStcdState(item) {
 

    var obj = document.getElementById("id_" + item.Stcd);
    if (obj != null) {

        var flag = obj.getAttributeNS(null, "flag");
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

 
        if (item.stcd == "51209900")
            console.log("Asd");

        var n_color = color == "" ? "_white" : color;
 
        if (obj.nodeName == "g") {
            for (var j = 0; j < obj.children.length; j++) {
                if (_sttp == "RR") {
                    if (obj.children.length == 2)
                        obj.children[0].setAttributeNS(null, "class", "st_" + obj.children[0].nodeName + "_" + _sttp + n_color)
                    else
                        obj.children[obj.children.length - 1].setAttributeNS(null, "class", "st_" + obj.children[obj.children.length - 1].nodeName + "_" + _sttp + n_color)
                }
                else  if (_sttp == "DD") {
                            
                    obj.children[0].setAttributeNS(null, "class", "st_" + obj.children[0].nodeName + "_" + _sttp + n_color)
                }
                j = obj.children.length;
            }
        }
        else
            obj.setAttributeNS(null, "class", "st_" + obj.nodeName + "_" + _sttp + n_color);


 
   
 

 

        if (is_shanshuo == 1) {

            if (type_shanshuo == 0) {
               // alert(item.Stcd);
                is_color_change = true;
                arr_color_change_ele.push(Snap_svg.select('#id_' + item.Stcd));
                console.log(arr_color_change_ele.length);
               // ani_opacity_zero(item.Stcd);
                arr_scale_change_ele.push(item.Stcd);
                animate_bigsmall_open(item.Stcd, "big");

            }
        }
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

        $.each(_data, function (i, item) {
            setStcdState(item);
        });


        return;
    }, 500);


}
 
 
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
function animate_bigsmall_open(stcd, flag) {



    var m = new Snap.Matrix();
    var cener = getElementCenterById(stcd);
    var scale = 1;
    if (flag == "big")
        scale = 2.0;
    if (flag == "small")
        scale = 0.8;
    var svg_center = reportMouseCoordinates(document.getElementById(svgRoot.id), cener[0], cener[1], document.getElementById("id_" + stcd));
    m.scale(scale, scale, svg_center.x, svg_center.y);
    //   Snap_svg.select('#id_' + stcd).transform(m);

    if ((svg_center.x == 0) && (svg_center.y == 0)) {
        setTimeout(function () {
            if (flag == "big")
                animate_bigsmall_open(stcd, "small");
            if (flag == "small")
                animate_bigsmall_open(stcd, "big");
        }, 1000);

        return;
    }


    Snap_svg.select('#id_' + stcd).animate({ transform: m }, 1500, mina.easeout(), function () {
        if (flag == "big")
            animate_bigsmall_open(stcd, "small");
        if (flag == "small")
            animate_bigsmall_open(stcd, "big");
    });

}
function animate_bigsmall_close(stcd, flag) {
    var m = new Snap.Matrix();
    var cener = getElementCenterById(stcd);
    var scale = 1;
    var svg_center = reportMouseCoordinates(document.getElementById(svgRoot.id), cener[0], cener[1], document.getElementById("id_" + stcd));
    if ((svg_center.x == 0) && (svg_center.y == 0))
        return;

    m.scale(scale, scale, svg_center.x, svg_center.y);
    Snap_svg.select('#id_' + stcd).transform(m);
}

//递归遍历节点nodeType为3两个节点元素之间的空白区域也算是一个元素,4时是脚本
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

function ani_opacity_zero(_id) {
    if (is_color_change) {
        var obj = Snap_svg.select('#id_' + _id);
        obj.animate({ opacity: 0 }, 1000, mina.easeout(), function () {
            if (is_color_change) {
                ani_opacity_one(_id);
            }
        });
    }


}
function ani_opacity_one(_id) {
    if (is_color_change) {
        var obj = Snap_svg.select('#id_' + _id);
        obj.animate({ opacity: 1 }, 1000, mina.easeout(), function () {
            if (is_color_change) {
                ani_opacity_zero(_id);
            }
        });
    }
}

function position_change_ax(_id) {
    return;
    if (is_move_change) {

        var xian = Snap_svg.select('#id_' + _id);

        var yuan = Snap_svg.select('#open_ani_id_' + _id);

        var yuan_bk = document.getElementById('open_ani_id_' + _id);
        if (yuan == null)
            return;


        var obj = document.getElementById('id_' + _id);
        if (obj != null) {
            yuan_bk.setAttributeNS(null, "visibility", "visible");
            //  console.log('visibility-visible');
            if (obj.nodeName == "path") {
                Snap.animate(0, xian.getTotalLength(), function (val) {
                    //console.log(is_move_change+"状态");
                    if (!is_move_change) {
                        console.log("应该停止");
                        clear_animate(null, true);
                    }

                    var temp_movepoint = xian.getPointAtLength(val);
                    //获得路径上的每个点坐标
                    var x = temp_movepoint.x;
                    var y = temp_movepoint.y;
                    var deg = temp_movepoint.alpha;

                    yuan.transform(new Snap.Matrix().rotate(Snap.deg((deg - 90) / 180 * Math.PI), x, y).translate(x - 60, y - 60))

                }, 15000, mina.easeout(), function () {
                    //  yuan.remove();
                    yuan_bk.setAttributeNS(null, "visibility", "hidden");
                    //   console.log('animation end');
                    if (is_move_change) {
                        position_change_ax(_id);
                    }

                });
            }
        }



    }


}
function stcd_Active(stcd) {
    stcd_InactiveAll();
    var obj = document.getElementById(stcd);
    if (obj != null) {
        var flag = obj.getAttributeNS(null, "flag");
        if (flag != null) {
            var arr_data = flag.split("_");
            var _sttp = arr_data[2];
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
            obj.setAttributeNS(null, "class", new_class + "st_" + obj.nodeName + "_" + _sttp + "_red" + " stcd_shanshuo stcd_active");
        }
    }

}
function stcd_InactiveAll() {
    var arr_obj = document.getElementsByClassName("stcd_active");
    for (var i = 0; i < arr_obj.length; i++) {
        obj = arr_obj[i];
        if (obj != null) {
            var flag = obj.getAttributeNS(null, "flag");
            if (flag != null) {
                var arr_data = flag.split("_");
                var _sttp = arr_data[2];
                var old_class = obj.getAttributeNS(null, "class");
                var reg1 = new RegExp("_old", "g");
                var reg2 = new RegExp("st_" + obj.nodeName + "_" + _sttp + "_red", "g");
                var reg3 = new RegExp("stcd_shanshuo", "g");
                var reg4 = new RegExp("stcd_active", "g");
                var new_class = old_class.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "");

                obj.setAttributeNS(null, "class", new_class);
            }
        }
    }


}
 