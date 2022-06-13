
var svgDoc = null;

var svgRoot = null;

var parentWnd = null; //保存html的window对象  
var svgzoom = null;

var Snap_svg = null;

var iscandraw = false;
var iscanrectmove = false;

var arr_levelRoom = [0.7, 1.3, 1.8, 2.4];
let isComplete = false;
let x1, x2, y1, y2,x_move_start,y_move_start,rect_let,rect_top;
let new_x, new_y;
let draw_width, draw_height;


document.oncontextmenu = function (ev) {
    return false;    //屏蔽右键菜单
};
 
function setZoomState(isreset) {
    if (isreset) {
        svgzoom.enablePan();
        svgzoom.enableZoom();
        iscandraw = false;
        return;
    }
    if (!iscandraw) {
        svgzoom.disablePan();
        svgzoom.disableZoom();
    }
    else {
        svgzoom.enablePan();
        svgzoom.enableZoom();
    }
    iscandraw = !iscandraw;
    
}
function onSvgclick(ev) {
 

}

function onSvgmousedown(ev) {
 
    if (!iscandraw)
        return;

    let ce = ev || event;
    // 获取鼠标点击后的坐标
    x1 = ce.offsetX;
    y1 = ce.offsetY;

    iscanrectmove = false;
    isComplete = false;
}
function onSvgonmousup(ev) {

     

    if (!iscandraw) {
 
        return;
    }
  
    let ce = ev || event;
    x2 = ce.offsetX;
    y2 = ce.offsetY;

    drawRect(x1, y1, x2 - x1, y2 - y1, "draw_rect", true);
    isComplete = true;
}
function onSvgonmousmove(ev) {
    if (!iscandraw)
        return;
    let ce = ev || event;
    let nx1 = ce.offsetX;
    let ny1 = ce.offsetY;
    if (!isComplete) {
        if (((nx1 - x1) > 10 || (ny1 - y1) > 10) && nx1 > 0 && ny1 > 0) {
            drawRect(x1, y1, nx1 - x1, ny1 - y1, "draw_rect", false);
            rect_let = x1;
            rect_top = y1;
        }
    }
}
 
function init(evt) {


    initSvgZoom(evt);
    Snap_svg = Snap('#' + svgRoot.id);
 
    document.svgWnd = window;
 

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
        }
    });
    svgRoot = document.rootElement;

    svgzoom.zoomAtPoint(arr_levelRoom[0] + 0.6, { x: $(window).width() / 2 + 0, y: $(window).height() / 2 + 70 });
    svgzoom.setMaxZoom(arr_levelRoom[3] + 0.9);
    svgzoom.setMinZoom(arr_levelRoom[0] + 0.1);

}

 
function setRainImage(rain_html) {
    $("#rainImage").html("");
    $("#rainImage").html(rain_html);

}

function drawRect(px, py, width, height, id,isover) {


    draw_width = width;
    draw_height = height;
    var svg_start = reportMouseCoordinates(document.getElementById(svgRoot.id), x1, y1, document.getElementById("g_test"));
    var px_start = svg_start.x;
    var py_start = svg_start.y;

    var svg_end = reportMouseCoordinates(document.getElementById(svgRoot.id), x1 + width, y1 + height, document.getElementById("g_test"));
    var px_end = svg_end.x;
    var py_end = svg_end.y;

    var temp_x_min = px_start < px_end ? px_start : px_end;
    var temp_x_max = px_start > px_end ? px_start : px_end;

    var temp_y_min = py_start < py_end ? py_start : py_end;
    var temp_y_max = py_start > py_end ? py_start : py_end;

 
    var f = document.getElementById("g_draw");
    var childs = f.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        f.removeChild(childs[i]);
    }
 
    // 创建矩形
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    if (temp_x_min >= 0 && temp_y_min >= 0) {
        rect.setAttribute("id", id);
        rect.setAttribute("x", temp_x_min);
        rect.setAttribute("y", temp_y_min);
        rect.setAttribute("width", temp_x_max - temp_x_min);
        rect.setAttribute("height", temp_y_max - temp_y_min);
        rect.setAttribute("style", "fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0);fill-opacity:0.1;");



        // 将绘制好的矩形添加到svg中
        var parent_obj = document.getElementById("g_draw");
        if (parent_obj != null)
            parent_obj.appendChild(rect);

        if (isover)
            console.log("x1=" + px_start + " y1=" + py_start + " x2=" + px_end + " y2=" + py_end);
    }
   
}
function getElementCenterById(id) {
    var obj = document.getElementById(id);
    if (obj != null) {
        var rect = obj.getBoundingClientRect();
        var pt_x = rect.left + rect.width / 2;
        var pt_y = rect.top + rect.height / 2;
        return [pt_x, pt_y];
    }
    return null;


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
function reset() {
    svgzoom.enablePan();
    svgzoom.enableZoom();
    iscandraw = false;

    var f = document.getElementById("g_draw");
    var childs = f.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        f.removeChild(childs[i]);
    }
    svgzoom.reset();
    svgzoom.zoomAtPoint(arr_levelRoom[0] + 0.6, { x: $(window).width() / 2 + 0, y: $(window).height() / 2 + 70 });

}
function getDrawInfo() {
    var res = null;
    var obj = document.getElementById("draw_rect");
    if (obj != null) {
        res = {
            x: Number(obj.getAttributeNS(null, "x")),
            y: Number(obj.getAttributeNS(null, "y")),
            width: Number(obj.getAttributeNS(null, "width")),
            height: Number(obj.getAttributeNS(null, "height")),
        }
    }
    return res;
}