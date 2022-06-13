var default_hsyj_width_report = 300;
var default_hsyj_height_report = 180;

var tree_river = null;
var slect_river_info = null;

//演进河流数组
/*var arr_river_yj_all = ["挑河",
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
]*/
var arr_river_yj_all =
    [
        { "name": "挑河" },
        { "name": "沾利河" },
        { "name": "漳卫河", "subriver": [{ "name": "漳河" }, { "name": "卫河河南", "subriver": [{ "name": "安阳河" }] }, { "name": "南运河" }, { "name": "四女寺减河" }] },
        { "name": "马颊河" },
        { "name": "德惠新河" },
        { "name": "徒骇河", "subriver": [{ "name": "老赵牛河" }, { "name": "秦口河" }] },
        { "name": "北沙河" },
        { "name": "洸府河" },
        { "name": "万福河" },
        { "name": "白马河" },
        { "name": "泗河", "subriver": [{ "name": "小沂河" }] },
        { "name": "新薛河" },
        { "name": "城郭河" },
        { "name": "西泇河" },
        { "name": "东鱼河" },
        { "name": "洙赵新河" },
        { "name": "梁济运河" },
        { "name": "韩庄运河" },
        { "name": "玉符河", "subriver": [{ "name": "锦阳川" }] },
        { "name": "大汶河", "subriver": [{ "name": "瀛汶河", "subriver": [{ "name": "石汶河" }] }, { "name": "柴汶河", "subriver": [{ "name": "光明河" }] }] },
        { "name": "弥河" },
        { "name": "白浪河" },
        { "name": "潍河", "subriver": [{ "name": "渠河" }, { "name": "汶河" }] },
        { "name": "大沽河", "subriver": [{ "name": "小沽河", "subriver": [{ "name": "猪洞河" }] }, { "name": "南胶莱河" }] },
        { "name": "北胶莱河", "subriver": [{ "name": "胶河" }, { "name": "泽河" }] },
        { "name": "大沽夹河", "subriver": [{ "name": "清洋河" }] },
        { "name": "五龙河", "subriver": [{ "name": "蚬河" }] },
        { "name": "白沙河" },
        { "name": "墨水河" },
        { "name": "黄水河" },
        { "name": "乳山河" },
        { "name": "母猪河" },
        { "name": "付疃河" },
        { "name": "沂河", "subriver": [{ "name": "东汶河", "subriver": [{ "name": "梓河" }] }, { "name": "祊河", "subriver": [{ "name": "温凉河" }] }] },
        { "name": "沭河", "subriver": [{ "name": "袁公河" }, { "name": "浔河" }, { "name": "分沂入沭" }] },
        { "name": "新沭河" },
    ]



$(document).ready(function () {

});
$("#panelHsyj .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    $("#bar_hsyj").attr("src", "./page_h/img/bar_hsyj.png");
    $("#bar_hsyj").removeClass("bar_active");
});

$("#panelHsyj").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

function getRiverMenuNode(data, _parent_nodes) {
    if (data.length == 0)
        return;



    $.each(data, function (index, item) {
        var child_nodes = new Array();
        if (item.subriver != undefined) {
            var res_child = getRiverMenuNode(item.subriver, child_nodes);
            if (res_child != null)
                child_nodes.push(res_child);

        }

        var parent = child_nodes.length > 0 ? {
            name: item.name,
            children: child_nodes
        } : {
            name: item.name
        };
        _parent_nodes.push(parent);
    });


}

function yb_hsyj_PanelShow() {


    var setting = {

        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: true
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "ps" }

        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeonClick_hlyj,
            //  beforeExpand: zTreeBeforeExpand
        }, edit: {
            enable: false
        }

    };

    var zNodes = new Array();

    debugger;
    getRiverMenuNode(arr_river_yj_all, zNodes);

    tree_river = $.fn.zTree.init($("#list_river"), setting, zNodes);



    //保留上次勾选项目
    if (slect_river_info != null)
        $.each(slect_river_info, function (index, item) {
            if (item.level == 0) {
                $.each(item.children, function (inner_index, inner_item) {
                    if (inner_item.checked) {
                        var obj_select = tree_river.getNodesByParam("name", inner_item.name, null)[0];
                        tree_river.checkNode(obj_select, true, true);
                    }
                })
            }
        })


    $("#panelHsyj").show();
    $("#panelHsyj").css({
        "left": "calc(50% - " + (default_hsyj_width_report / 2) + "px)",
        "top": "calc(50% - " + (default_hsyj_height_report / 2) + "px)",
        "margin-left": "0px",
        "margin-top": "0px"
    });

    return;

}

function yb_hsyj_PanelHide() {
    $("#panelHsyj").hide();
    return;
}
//面板添加点击事件 保证操作面板在最上层
$("#panelHsyj").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close-new") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

function zTreeonClick_hlyj(event, treeId, treeNode) {
    debugger;
    tree_river.expandNode(treeNode);
    console.log(treeNode);
}
$("#hsyj_sumbit_ok").click(function (event) {



    var arr_slect_river = new Array();
    slect_river_info = tree_river.getCheckedNodes(true);
    debugger;
    $.each(slect_river_info, function (index, item) {
        if (item.level == 0) {
            if (item.checked)
                arr_slect_river.push(item.name);
            if (item.children != undefined)
                $.each(item.children, function (inner_index, inner_item) {
                    if (inner_item.checked) {
                        arr_slect_river.push(inner_item.name);

                        //目前三级,懒得弄了
                        if (inner_item.children != undefined)
                        $.each(inner_item.children, function (inner_index2, inner_item2) {
                            if (inner_item2.checked) {
                                arr_slect_river.push(inner_item2.name);
                               // alert(inner_item.name);
                            }
                        })
                    }
                })
        }
    })


    if (arr_slect_river.length > 0)
        start_hsyj(arr_slect_river);



    $("#panelHsyj .icon-close").click();
});


/**
 * 洪水演进效果
 */
function start_hsyj(arr_riverName) {

    if (ybddMapType != "1")
        return;
    if (searchRange != "14")
        return;

    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;

    svgWnd.btn_river_yj(arr_riverName);
}
/**
 * 清除洪水演进效果
 */
function clear_hsyj() {

    $("#bar_hsyj").attr("src", "./page_h/img/bar_hsyj.png");

    if (ybddMapType != "1")
        return;
    if (searchRange != "14")
        return;

    var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
    var svgWnd = svgDocument.svgWnd;
    svgWnd.clearAll_river_yj();
}