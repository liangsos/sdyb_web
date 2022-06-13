/**
 * 获取树形菜单数据
 */
function GetTreeMenuData() {
    $(".treeUl").html("");
    var objData = {
        range: searchRange,
    };
    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        headers: {
            "Authorization": getCookie("accessToken")
        },
        url: apiUrl_cloud + "api-hwhydroinfo/getStcdInfo",
        data: info,
        success: function (res) {
            if (res.code != 200) {
                tools.show_message_error("获取信息失败!");
                return;
            }
            creatTreeMenu(res.data);
            return;
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("获取信息失败!");
            return;
        }
    });
}


/**
* 创建树形菜单
*/
function creatTreeMenu(json) {
    var treeStnm = {
        hd: json.stasnm[0],
        zb: json.stasnm[1],
        sk: json.stasnm[2]
    };
    var treeStcd = {
        hd: json.stasid[0],
        zb: json.stasid[1],
        sk: json.stasid[2]
    };
    var treeSttp = {
        hd: json.stassttpsttp[0],
        zb: json.stassttpsttp[1],
        sk: json.stassttpsttp[2]
    };
    var html_hd = new StringBuffer();
    var html_zb = new StringBuffer();
    var html_sk = new StringBuffer();

    $.each(treeStnm.hd, function (i, item) {
        html_hd += "<li" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.hd[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.hd[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.hd[i] + "</span></a></li>"
    })
    $.each(treeStnm.zb, function (i, item) {
        html_zb += "<li hidden=" + "hidden" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.zb[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.zb[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.zb[i] + "</span></a></li>"
    })
    $.each(treeStnm.sk, function (i, item) {
        html_sk += "<li hidden=" + "hidden" + "><a onClick=" + "test(this)" + "><span>" + treeStnm.sk[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeStcd.sk[i] + "</span>" + "<span style=" + "display:" + "none" + ">" + treeSttp.sk[i] + "</span></a></li>"
    })

    $("#hdNode").html("");
    $("#zbNode").html("");
    $("#skNode").html("");
    $("#hdNodeDd").html("");
    $("#zbNodeDd").html("");
    $("#skNodeDd").html("");

    $("#hdNode").append(html_hd.toString());
    $("#zbNode").append(html_zb.toString());
    $("#skNode").append(html_sk.toString());
    $("#hdNodeDd").append(html_hd.toString());
    $("#zbNodeDd").append(html_zb.toString());
    $("#skNodeDd").append(html_sk.toString());
}



/**
 * 树形菜单点击事件
 */
function test(elem) {
    var _stnm = elem.getElementsByTagName("span")[0].innerHTML;
    var _stcd = elem.getElementsByTagName("span")[1].innerHTML;
    var _sttp = elem.getElementsByTagName("span")[2].innerHTML;

    if (searchType == "1") {
        tools_panel.show_type = searchType;
        tools_panel.show_all = false;
        tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
    } else {
        //预报界面
        if (searchType == "2") {
            //单站预报结果展示
            if ($("#panelDd").show()) {
                $("#panelDd").hide();
                $("#panelSw").show();
            }
            tools_panel.show_type = searchType;
            tools_panel.show_all = false;
            tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
        }
        //调度界面
        if (searchType == "3") {
            if (_sttp == "ZQ") {
                //       tools_panel.planId_dd = "1";  //从调度方案对比结果中查找当前调度方案的ID
                //单站预报结果展示
                if ($("#panelDd").show()) {
                    $("#panelDd").hide();
                    $("#panelSw").show();
                }
                tools_panel.show_type = searchType;
                tools_panel.show_all = false;
                tools_panel.panelShow(_stcd, _stnm, searchEtime, _sttp, searchStime);
            } else {
                if ($("#panelSw").show()) {
                    $("#panelSw").hide();
                    $("#panelDd").show();
                }
                tool_dispatch.show_type = searchType;
                tool_dispatch.panelShow(_stcd, _stnm, _sttp, searchStime, searchEtime);
            }
        }
    }

}
$(document).ready(function () {
    /**
        * 树状菜单
        */
    $('.treeMenu .tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', '折叠');
    $('.treeMenu .tree li.parent_li > span').on('click', function (e) {
        debugger;
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', '展开').find(' > i').addClass('glyphicon-plus-sign').removeClass('glyphicon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', '折叠').find(' > i').addClass('glyphicon-minus-sign').removeClass('glyphicon-plus-sign');
        }
        e.stopPropagation();
    });
});