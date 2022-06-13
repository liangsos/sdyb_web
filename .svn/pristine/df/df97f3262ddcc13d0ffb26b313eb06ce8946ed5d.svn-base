/**
 * 初始化左侧区域列表
 * */
function initAreaList() {
    var setting = {

        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false
        },
        check: {
            enable: false,

        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeonClick,
            beforeExpand: zTreeBeforeExpand
        },
        edit: {
            enable: false
        }

    };
    var zNodes = new Array();

    var parentLY = {
        name: "流域分区",
        data: "",
        open: true,
        children: [{
            name: "全部",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "漳卫南运河",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "徒骇马颊河",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "大汶河",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "潍弥白浪区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "胶莱大沽区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "胶东半岛区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "独流入海区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "上级湖湖西区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "上级湖湖东区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "下级湖湖东区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "沂沭河区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "中运河区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "日赣区",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "黄河花园口以下",
            type: "liuyu",
            icon: "./img/li_black.png"
        }, {
            name: "小清河",
            type: "liuyu",
            icon: "./img/li_black.png"
        }]
    };
    var parentCity = {
        name: "行政区划",
        data: "",
        open: false,
        children: [{
            name: "全部",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "潍坊",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "青岛",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "烟台",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "威海",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "日照",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "临沂",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "枣庄",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "济宁",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "菏泽",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "泰安",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "淄博",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "济南",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "聊城",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "德州",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "滨州",
            type: "city",
            icon: "./img/li_black.png"
        }, {
            name: "东营",
            type: "city",
            icon: "./img/li_black.png"
        }]

    };
    zNodes.push(parentLY);
    zNodes.push(parentCity);
    $.fn.zTree.init($("#areaDemo"), setting, zNodes);


    //默认选中第一个，流域全省图
    /*  $("#areaDemo_2 a  span.node_name").css("cssText", "color:white !important;").addClass("ztree_node_active");
    $("#areaDemo_2 a  span.node_name").parent().parent().addClass("ztree_node_active_bk");
    $("#areaDemo_2 a  span.node_name").prev().css("background-image", " url(./img/li_white.png)");
 */


    return;

}

/**
 * 
 * 节点点击事件
 * @param {any} event
 * @param {any} treeId
 * @param {any} treeNode
 */
function zTreeonClick(event, treeId, treeNode) {
    debugger;
    if (treeNode.name == "全部") {
        $("#show_map_edge").show();
        $("#show_map_edge").parent().parent().show();
    } else {
        $("#show_map_edge").hide();
        $("#show_map_edge").parent().parent().hide();
    }

    if (!treeNode.isParent) {


        console.log(treeNode.name);


        var rangeInfo = arrRange.find(function (item) {
            return item.subRiver == treeNode.name;
        });
        if (rangeInfo == null)
            return;

        var ischange = false;




        if (ybddMapType == 1) {
            //战略图切换

            ischange = hideGaiHuaPic(rangeInfo.id);
        } else {
            //概化图图切换
            ischange = showGaiHuaPic(rangeInfo.id);
        }

        if (!ischange)
            return;



        //区域高亮处理
        var arr_node_actiove = document.getElementsByClassName("ztree_node_active");
        var tem_arr_node_actiove = $.extend(true, [], arr_node_actiove);
        $.each(tem_arr_node_actiove, function (index, item) {
            $(item).css("cssText", "rgba(0, 0, 0, 0.55) !important;").removeClass("ztree_node_active");
            $(item).prev().css("background-image", " url(./img/li_black.png)");
            $(item).parent().parent().removeClass("ztree_node_active_bk");
        });
        $("#" + treeNode.tId + " a  span.node_name").prev().css("background-image", " url(./img/li_white.png)");
        $("#" + treeNode.tId + " a  span.node_name").css("cssText", "color:white !important;").addClass("ztree_node_active");
        $("#" + treeNode.tId + " a  span.node_name").parent().parent().addClass("ztree_node_active_bk");



    }


};

/**
 * 节点展开配置
 * @param {any} treeId
 * @param {any} treeNode
 */
function zTreeBeforeExpand(treeId, treeNode) {

    var treeObj = $.fn.zTree.getZTreeObj("areaDemo");
    treeObj.expandAll(false);
    return true;
};


/**
 * 设置选中地图
 * @param {any} _range range
 */
function setSelectMap(_range) {
    if (_range == "14") {
        $("#show_map_edge").show();
        $("#show_map_edge").parent().parent().show();
    } else {
        $("#show_map_edge").hide();
        $("#show_map_edge").parent().parent().hide();
    }
    var _select_num = "";
    if (_range == "14")
        _select_num = 2;
    else
        _select_num = Number(_range) + 2;

    $("#areaDemo_" + _select_num + " a  span.node_name").css("cssText", "color:white !important;").addClass("ztree_node_active");
    $("#areaDemo_" + _select_num + " a  span.node_name").parent().parent().addClass("ztree_node_active_bk");
    $("#areaDemo_" + _select_num + " a  span.node_name").prev().css("background-image", " url(./img/li_white.png)");

    hideGaiHuaPic(_range);
}