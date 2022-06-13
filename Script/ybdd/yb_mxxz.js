﻿//# sourceURL=yb_mxxz.js
//关闭按钮事件
 $("#panel_mxxz .icon-close-new,#panel_mxxz .btn_cancel").click(function () {
     $(this).parent().parent().parent().parent().hide();
 });
 // $("#panel_mxxz .btn_ok").click(function () {
 //     $(this).parent().parent().parent().parent().hide();
 // });
 $("#panel_mxxz").draggable({
     handle: '.panel-header',
     cursor: "move",
     opacity: 0.7
 });

 //确认按钮点击事件
$("#panel_mxxz .btn_ok").click(function () {
     selectModes = getModel();
    $("#panel_mxxz").hide();
    yb_setSteps(3, ybddMapType);
    $(".show_bfs").hide();
    $(".show_nynl").hide();
    //纳雨能力
    if(selectModes.indexOf("NYNL") > -1){
        $(".show_nynl").show();
        //贝叶斯概率预报模型
        if(selectModes.indexOf("BFS") > -1){
            $(".show_bfs").show();
            $("#show_bfs").css("margin-left","20px")
        }else{
            $(".show_bfs").hide();
        }
        $(".show_nynl").parent().show();
    }
    //贝叶斯概率预报模型
    if(selectModes.indexOf("BFS") > -1){
        $(".show_bfs").show();
        if(selectModes.indexOf("NYNL") > -1){
            $(".show_nynl").show();
        }else{
            $(".show_nynl").hide();
            $("#show_bfs").css("margin-left","0")
        }
        $(".show_bfs").parent().show();
    }
})

 function yb_mxxz_PanelShow() {
     $.ajax({
         type: 'get',
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         dataType: 'json',
         async: false,
         url: apiUrl_cloud + "api-hwdatabasic/getModelsByRange",
         data: {
             range: searchRange
         },
         headers: {
             "Authorization": getCookie("accessToken")
         },
         success: function (res) {
             if (res.code == 200) {
                 var dataTree = [];
                 var childrenArr = [];
                 $.each(res.data, function (index, item) {
                     var checked = false;
                     if (item.model == "APIUH" || item.model == "HBYH" || item.model == "SAC" || item.model == "TANK" ||
                         item.model == "XAJGJ" || item.model == "XAJMK" || item.model == "XC") {
                         checked = true;
                     }
                     var modelArr = {
                         title: "",
                         id: "",
                         field: "",
                         checked: false,
                         children: [],
                         spread: true,
                     };
                     if (item.range == 0) {
                         modelArr.id = item.id;
                         modelArr.title = item.modelName;
                         dataTree.push(modelArr);
                     } else {
                         modelArr.id = item.id;
                         modelArr.field = item.model;
                         modelArr.title = item.modelName;
                         modelArr.checked = checked
                         childrenArr.push(modelArr)
                     }
                 })
                 $.each(dataTree, function (i, data) {
                     $.each(childrenArr, function (index, item) {
                         if (item.id.split('.')[0] == data.id) {
                             data.children.push(item)
                         }
                     })
                 })

                 layui.use('tree', function () {
                     treeModel = layui.tree;
                     //渲染
                     var inst = treeModel.render({
                         elem: '#checkModel',
                         showCheckbox: true,
                         showLine: false,
                         id: "treeModel",
                         data: dataTree,
                         oncheck: function (obj) {
                             if (obj.data.field == "APIGIUH" || obj.data.field == "NYNL" || obj.data.field == "BFS") {
                                 if (obj.checked) {
                                     treeModel.setChecked("treeModel", 1.1);
                                     //当API+地貌单位线、纳雨能力、概率模型勾选时，API无法取消勾选,强绑定
                                     $("input[name='APIUH']").next().addClass('div-not-click');
                                 } else {
                                     $("input[name='APIUH']").next().removeClass('div-not-click');
                                 }
                             }
                             if (obj.data.field == "APIUH") {
                                 if (($("input[name='APIGIUH']").next().hasClass("layui-form-checked") || $("input[name='NYNL']").next().hasClass("layui-form-checked") || $("input[name='BFS']").next().hasClass("layui-form-checked")) && (!$("input[name='APIUH']").next().hasClass('div-not-click'))) {
                                     $("input[name='APIUH']").next().addClass('layui-form-checked')
                                     $("input[name='APIUH']").next().addClass('div-not-click');
                                 }
                             }
                         }
                     })
                })
                  $("#panel_mxxz").show();
                  tools.showPanelIndex("panel_mxxz");

             } else {
                 tools.show_message_error_const(res.message);
             }
         },
         error: function (res) {
             tools.show_message_error_const(res.responseJSON.message)
         }
     })
}
