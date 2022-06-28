
$(document).ready(function () {

    //列表点击事件
    $("#panel_showPdfList #AddDoc").click(function () {
        showuploadPdf();
    })

});
/**
 * 显示PDF
 */
function showPdfList() {
    $("#panel_showPdfList #pdflList").html("");
    var _html = "";
    var settings = {
        "url": apiUrl_cloud + "api-rainsituation/getDocInfoList",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": getCookie("accessToken")
        },

    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            $.each(res.data, function (index, item) {
                _html += " <li><a onclick='openFile(\"" + item.docUrl + "\")'>" + (index + 1) + "." + item.docName + "</a><a onclick='deleteFile(" + item.id + ")' style='float:right'>删除</a></li>";
            })
            $("#panel_showPdfList #pdflList").html(_html);
            $("#panel_showPdfList").show();
        }
        else {

            showLoginError(res.message);

        }
    }).fail(function (res) {

    });

}
/**
 * 隐藏PDF
 */
function hidePdfList() {
    $("#panel_showPdfList").hide();
}
/**
 * 拖拽PDF
 */
$("#panel_showPdfList").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//关闭按钮事件
$("#panel_showPdfList .icon-close").click(function () {
    $("#panel_showPdfList").hide();
});


/**
 * 删除文件
 * @param {文件id}} id 
 */
function deleteFile(id) {

    var objData = {
        id: id
    };
    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: true,
        url: apiUrl_cloud + "api-rainsituation/deleteFile",
        data: JSON.stringify(objData),
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                tools.show_message_success("文件删除成功!");
                showPdfList();
            }
            else {
                tools.show_message_error("文件删除失败!");
            }
        },
        error: function () {
            return;
        }
    });

}
/**
 * 打开文件
 * @param {文件路径} docUrl 
 */
function openFile(docUrl) {
    showPdfContent(docUrl);
}
