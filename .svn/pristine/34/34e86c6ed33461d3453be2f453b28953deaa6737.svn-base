var useId = decodeURI(getQueryString("id"));
var op = decodeURI(getQueryString("op"));
 

$(function () {

    initMenuList();
    role_getMenuInfo();
    $("#form-role-menu").validate({
         
        submitHandler: function (form) {
            save();

        }
    });
});
function initMenuList() {

    var setting = {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false
        },
        check: {
            enable: true,
            chkboxType: { "Y": "ps", "N": "ps" }
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
 
 
    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/role/getAllResource",
        "method": "GET",
        "timeout": 0,
        "async": false,
        "headers": {
            "Authorization": getCookie("accessToken"),
            "Content-Type": "application/json"
        },
     

    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            var zNodes = new Array();
            getMenuNode(res.data.menuList, zNodes);
            $.fn.zTree.init($("#menu_list"), setting, zNodes);

        }
        else
            layer.msg(res.message, { icon: 2, time: 3000 });

    });
 

    return;
  

}
 

 
function getMenuNode(data, _parent_nodes) {
    if (data.length == 0)
        return ;



    $.each(data, function (index, item) {
        var child_nodes = new Array();
        $.each(item.resourceList, function (index_inner, item_inner) {
            child_nodes.push({ name: item_inner.name, id: item_inner.id, menuId: item_inner.menuId });
        });
        var res_child = getMenuNode(item.childList, child_nodes);
        if (res_child != null)
             child_nodes.push(res_child);

        var parent = {
            name: item.name,
            id: item.id,
            open: true,
            children: child_nodes
        };
        _parent_nodes.push(parent);
    });

   
}

function setSelectedMenuNode(data) {
    if (data.length == 0)
        return;

    $.each(data, function (index, item) { 
        $.each(item.resourceList, function (index_inner, item_inner) {
            var treeObj = $.fn.zTree.getZTreeObj("menu_list");
            var node = treeObj.getNodesByParam("id", item_inner.id, null); // 仅查找一个节点
            $.each(node, function (index_menu, item_menu) {
                if (item_menu.menuId != undefined)
                    treeObj.checkNode(item_menu, true, true);
            });
           
        });
        setSelectedMenuNode(item.childList);
    });


}
function zTreeOnCheck(event, treeId, treeNode) {
 

};
function zTreeOnCollapse(event, treeId, treeNode) {

 
};
function zTreeOnExpand(event, treeId, treeNode) {
 
};

function zTreeonClick(event, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("menu_list");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length > 0) {
        if (!nodes[0].open)
            treeObj.expandNode(nodes[0], true, true, true);
        else
            treeObj.expandNode(nodes[0], false, true, true);
    }
};


 
function role_getMenuInfo() {
    var objData = {};
    objData.id = Number(useId);
    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/role/getRoleResourceById",
        "method": "POST",
        "timeout": 0,
        "async": false,
        "headers": {
            "Authorization": getCookie("accessToken"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(objData),

    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            setSelectedMenuNode(res.data.menuList);
        }
        else
            layer.msg(res.message, { icon: 2, time: 3000 });

    });
}

 
function save() {

    var treeObj = $.fn.zTree.getZTreeObj("menu_list");
    var nodes = treeObj.getCheckedNodes(true);

    var arr_menu = new Array();
    $.each(nodes, function (index, item) {
        if (item.menuId != undefined)
            arr_menu.push({ menuId: item.menuId, resourceId: item.id });
    });

    var objData = {};
 
    objData.authorizeInfoList = arr_menu;
    objData.roleId = Number(useId);



     var settings = {
         "url": apiUrl_cloud + "api-permissioncenter/role/roleAuthorize",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": getCookie("accessToken"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(objData),
    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            layer.msg('操作成功!', { icon: 1, time: 1000 }, function () {
                parent.flushTable();
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            });
        }
        else
            layer.msg(res.message, { icon: 2, time: 3000 });

    });
}