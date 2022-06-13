//# sourceURL=importPdf.js
//报表默认宽高
var mode = "";   //操作类型: 0 写入，1 读取
var docType = ""; //文档类型: 0 预报发布文档, 1 调度方案文档 
var strBase64 = ""; //导入的pdf文件二进制数据

$(function () {
    //表单验证
    $("#form_ybfb").validate({
        rules: {
            pdfDocName: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            pdfDocName: {
                required: "请输入文档名称",
                maxlength: "文档名称不能超过50个字符"
            }
        }
    });
});

function ybfbPanelShow(_mode, _docType) {
    mode = _mode;
    docType = _docType;
    $("#panel_ybfb").show();
    tools.showPanelIndex("panel_ybfb");
}

//获取文件
function importPdf(obj) {
    //let jsonpdf;
    if (!obj.files) {
        $("#txtDoc_ybfb").val('');
        return;
    }
    var pdfData = obj.files[0];
    var pdfName = pdfData.name;
    var pdfname = pdfName.split(".pdf")[0];
    $("#pdfDocName").val(pdfname);
    if (pdfData != undefined) {
        var reader = new FileReader();
        reader.readAsDataURL(pdfData);
        reader.onloadend = function (ev) {
            strBase64 = ev.target.result;
            //strBase64 = reader.result.substring(84);
        };
        reader.onerror = function () {
            alert('上传失败');
        }
    } else {
        strBase64 = "";
    }
    
}

//上传pdf文档
$("#importPdfBtn").click(function () {
    var docName = $("#pdfDocName").val();
    var flag = $("#form_ybfb").valid();
    if (!flag) {
        //没有通过验证
        return;
    }
    
    if (strBase64 == "") {
        tools.show_message_error("请选择文档！");
        return;
    }

    var objData = {
        mode: mode,
        docType: docType,
        docName: docName,
        userId: $("#_hid_userid").val(),
        docData: strBase64,
    };

    var info = JSON.stringify(objData);

    $.ajax({
        type: 'post',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        url: "panelNew.aspx/get_ReleasDocu_Info",
        data: "{'info':'" + info + "'}",
        success: function (data) {
            var res = data.d;

            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("导入文档失败！");
                return;
            }

            var json = JSON.parse(data.d);

            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                tools.show_message_success(json.msg);
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
})


//关闭按钮事件
$("#panel_ybfb .icon-close").click(function () {
    $(this).parent().parent().parent().hide();
    //隐藏面板层级
    tools.hidePanelIndex($(this).parent().parent().parent().attr("id"));

});

//报表通用可拖拽事件
$(".modal_ybfb").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});
//面板添加点击事件 保证操作面板在最上层
$(".modal_ybfb").click(function (event) {
    //按钮事件阻止
    if ($(event.target).hasClass("btn") || $(event.target).hasClass("th-click") || $(event.target).hasClass("icon-close") || event.target.tagName == "A")
        return;
    tools.showPanelIndex($(this).attr("id"));
});

/**
 * 校验输入项
**/
function checkInput() {
    return $("#form1").validate({
        rules: {
            pdfDocName: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            pdfDocName: {
                required: "请输入文档名称",
                maxlength: "文档名称不能超过50个字符"
            }
        }
    });
}
/**
 * 数据导出
**/
$("#panel_ybfb").find('.fa-arrow-circle-o-down').click(function () {
    download_word();
});