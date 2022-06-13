var defualtStcd = "50103000";
function initFanganList() {
   
    return;
    $("#fangan_title").html("");
    var setting = {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false
        },
        check: {
            enable: true,
            chkboxType: { "Y": "", "N": "" }
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: zTreeOnCheck,
            onCollapse: zTreeOnCollapse,
            onExpand: zTreeOnExpand,
            onClick: zTreeonClick
        }, edit: {
            enable: false
        }
    };

    var zNodes = new Array();
    searchStime = $("#beginTime").val() + ":00";
    searchEtime = $("#endTime").val() + ":00";
    searchPlan = $("#selectPlan").val();
   
    var _objData = {
        range: searchRange,
        stime: searchStime,
        etime: searchEtime,
        plan: searchPlan,
        plusType: _plusType,
        rainPlus: _rainPlus,
        hisStormId: _hisStormId,
        day: selectDays
    };

    var _info = JSON.stringify(_objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cbh + "get_Fore_multCircumstMultModelInfo",
        data: _info,
        success: function (data) {

            if (data.code == "0") {
                tools.show_message_error(data.msg);

            } else {
                if (data.circumst == undefined)
                    return;

                $.each(data.circumst, function (index, item) {
                    var arr_child = new Array();
                    $.each(data.models[index], function (index_child, item_child) {
                        arr_child.push({ name: item_child, data: data.params[index][index_child] , data_hisStormId: data.hisids[index][index_child] });
                    });
                    var parent = {
                        name: item,
                        data: "",
                        open: true,
                        children: arr_child
                    };
                    zNodes.push(parent);
                });
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                $("#fangan_title").html("<a style=\"text-decoration:underline;\" href=\"javascript:void(0)\" onclick=\"showQJing()\"><strong >" + data.floodid + "</strong></a>");
                $("#fangan_list").show(); 
                
              /*  if (zNodes.length > 0) {
                    if (!$("#icon_bar3").hasClass("hover"))
                        $("#icon_bar3").click();
                }*/

                var get_showSpan = document.getElementsByClassName("node_name");
                for (var i = 0; i < get_showSpan.length; i++)
                {
                    if (get_showSpan[i].parentNode.className.indexOf("level0") > -1)
                    {
                        var len = get_showSpan[i].innerHTML.length;
 
                        get_showSpan[i].innerHTML = len > 16 ? get_showSpan[i].innerHTML.substring(0, 16) + "..." : get_showSpan[i].innerHTML;
                    }
   
                      
                }
            
                $(".ztree li a.level1 ").mouseover(function (e) {
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                
                    var node = treeObj.getNodeByTId(e.target.id.replace("_span", "").replace("_a", "").replace("_ico", ""));
                 //   alert(node.data);

                    $("#" + e.target.id.replace("_span", "").replace("_a", "").replace("_ico", "") + "_a").attr("title", node.data);

                });
              
            }

        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            // tools.show_message_error("获取重要站点实时信息失败!");
            return;
        }
    });
 


    return;

}
function showQJing()
{
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectData_modelId = "";
    var selectData_hisStormId = "";
    $.each(nodes, function (index, item) {
        selectData_modelId += item.data + ","
        selectData_hisStormId += item.data_hisStormId + ","
    })
    if (selectData_modelId != "")
    {
        selectData_modelId = selectData_modelId.substring(0, selectData_modelId.length - 1);
        selectData_hisStormId = selectData_hisStormId.substring(0, selectData_hisStormId.length - 1);
       // alert(selectData_modelId);

        showQingJing(selectData_modelId, selectData_hisStormId);
    }
 

}
function zTreeOnCheck(event, treeId, treeNode) {
    var checked = treeNode.checked;
    //获取方案信息
  //  alert(treeNode.data);
    console.log((treeNode ? treeNode.name : "root") + "checked " + (checked ? "true" : "false"));
   // showQingJing();

};
function zTreeOnCollapse(event, treeId, treeNode) {

    $("#" + treeNode.tId + " a  span.node_name").css("color", "rgb(36 14 36)");
};
function zTreeOnExpand(event, treeId, treeNode) {
    $("#" + treeNode.tId + " a  span.node_name").css("color", "#ff5722");
};

function zTreeonClick(event, treeId, treeNode) {


    if (!treeNode.isParent) {
        /*  if ($("#" + treeNode.tId + "_check").hasClass("checkbox_false_full")) {
              $.fn.zTree.getZTreeObj("treeDemo").checkNode(treeNode, true, false);
  
          }
          else if ($("#" + treeNode.tId + "_check").hasClass("checkbox_true_full")) {
              $.fn.zTree.getZTreeObj("treeDemo").checkNode(treeNode, false, false);
          }
          zTreeOnCheck(null, treeId, treeNode);
          */
        // alert(treeNode.data);
        if ((treeNode.data != undefined) && (treeNode.data != null) && (treeNode.data != ""))
            show_info_qj_yb(document.getElementById("SVGDoc").getSVGDocument().svgWnd.getFlagById(defualtStcd), treeNode.data);



    }
    else {

        var selectAll = "";
        var selectChecked = "";
        $.each(treeNode.children, function (index, item) {
            if (item.checked) {
                selectChecked += item.data + ","
            }
            selectAll += item.data + ","

        })

        var selectData_modelId = selectChecked == "" ? selectAll : selectChecked;
        var cunt = 0;
        var arr1 = selectData_modelId.split(",");
        $.each(arr1, function (index, item) {
            if (item != "")
                cunt++;
        })
        if ((cunt <= 2) && (selectData_modelId.indexOf("MGE2") > -1)) {
            tools.show_message_error_const("使用多模型融合,请选择至少两个基础模型!");
            return;
        }

        if ((selectData_modelId != undefined) && (selectData_modelId != null) && (selectData_modelId != ""))
            show_info_qj_yb(document.getElementById("SVGDoc").getSVGDocument().svgWnd.getFlagById(defualtStcd), selectData_modelId);

    }

};