var default_pdf_width_report = 800;
var default_pdf_height_report = 600;
/**
 * 显示PDF
 */
function showuploadPdf(fileUrl) {

    $("#panel_AddPdf").show();
}
/**
 * 隐藏PDF
 */
function hideuploadPdf() {
    $("#panel_AddPdf").hide();
}
/**
 * 拖拽PDF
 */
$("#panel_AddPdf").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//关闭按钮事件
$("#panel_AddPdf .icon-close").click(function () {
    $("#panel_AddPdf").hide();
});

//下载模板文件
$("#panel_AddPdf #model_doc").click(function () {
    var settings = {
        "url": apiUrl_cloud + "api-rainsituation/downlodTemplate",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": getCookie("accessToken")
        },

    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            var url = res.data.docUrl;
            const link = document.createElement('a');
            link.setAttribute('download', res.data.docName);
            link.setAttribute('href', url);
            Object.assign(link.style, {
                position: 'absolute',
                top: 0,
                opacity: 0,
            });
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        else {

            showLoginError(res.message);

        }
    }).fail(function (res) {

    });


});


//上传文件
$('#btn_upload').click(function () {
    debugger;
    if (document.getElementById('i_file').files.length == 0) {

        tools.show_message_error("请选择文件!");
        return;
    }


    var form = new FormData();
    var arr = document.getElementById('i_file').files[0].name.split('\\');;
    form.append("file", document.getElementById('i_file').files[0], arr[arr.length - 1]);

    var settings = {
        "url": apiUrl_cloud + "api-rainsituation/uploadFile",
        "method": "POST",
        "headers": {
            "Authorization": getCookie("accessToken")
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (_res) {
        var res = JSON.parse(_res);
        if (res.code == 200) {
            tools.show_message_success("文件上传成功!");
            //此时需要更新文档列表
            $("#panel_AddPdf").hide();
            showPdfList();
        }
        else {
            tools.show_message_error("文件上传失败!");
        }

    }).fail(function () {
        tools.show_message_error("文件上传失败!");
    });
});
