//每页行数
var _pageLen = 20;
var userId = "";

function getPdfList(_mode, _docType, _userId) {

    //清空列表和文档
    $("#listDoc_ybdd").empty();

    var objData = {
        mode: _mode,
        docType: _docType,
        userId: _userId,
    };
    userId = _userId;

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
            var pdfName = "";
            if (res == "" || res == null) {
                tools.loadinghide(false);
                tools.show_message_error("获取文档列表失败！");
                return;
            }

            var docs = JSON.parse(data.d);
            var pdfSum = docs.name.length;

            if (docs.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                //var _pdf_file = "";
                var _html = "";
                //设置分页组件
                //var _count = Math.ceil(parseInt(pdfSum) / _pageLen);
                //if (_count == 0) {
                //    //查询为空时
                //    $('.pager_ybdd').pagination({
                //        pageCount: 1,
                //        jump: true,
                //        coping: true
                //    });
                //} else {
                //    $('.pager_ybdd').pagination({
                //        pageCount: _count,
                //        jump: true,
                //        coping: true,  //首页和尾页
                //        count: 1,
                //        callback: function (api) {
                //            //跳转页面
                //            getPdfList("1", "1", userId, api.getCurrent(), api);
                //        }
                //    });
                //}

                $.each(docs.name, function (index, obj) {
                    _html += "<li data-file='" + obj + "'>" + obj + "</li>";

                    if (index == 0) {
                        pdfName = obj; 
                    }
                });
                $("#listDoc_ybdd").append(_html);
                //显示默认文档
                showPdf("1", "1", pdfName, _userId);
                if (_html != "") {
                    selectedIndex = 0;
                    $("#listDoc_ybdd").find("li").eq(selectedIndex).addClass("hover");
                } else {
                    selectedIndex = 0;
                }
            }
        },
        error: function (errorMsg) {
            tools.show_message_error("获取文档列表失败");
        }
    });
}
/**
 * 文档列表点击事件
**/
$('#listDoc_ybdd').delegate('li', 'click', function () {
    showPdf("1", "1", $(this).attr("data-file"), userId);

    //清除现选中效果
    $("#listDoc_ybdd").find("li").eq(selectedIndex).removeClass("hover");
    selectedIndex = $("#listDoc_ybdd").find("li").index($(this));
    $(this).addClass("hover");
});

function showPdf(_mode, _docType, _docName, _userId) {
    var objData = {
        mode: _mode,
        docType: _docType,
        docName: _docName,
        userId: _userId,
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
                tools.show_message_error("获取文档列表失败！");
                return;
            }

            var json = JSON.parse(data.d);
            var pdfData = json.data;
            if (json.code == "0") {
                tools.loadinghide(false);
                tools.show_message_error(json.msg);
            } else {
                sessionStorage.setItem("_imgUrl", pdfData);
                $("#ybfb_pdf").show();
                $("#framePdf_ybfb").attr("src", "../JQuery/pdf/web/viewer.html");
                resize();
                return;
            }
        },
        error: function (errorMsg) {
            tools.loadinghide(false);
            tools.show_message_error("查询信息失败");
        }
    });
}

//屏幕大小改变事件 自适应
function resize() {
    $('.left_pdf,.right_pdf').height($(window).height());
    $('.right_pdf').height($(window).height());
    $('.doclist_ybdd').height($(window).height() - 100);
    //$('.newico').css('margin-top', ($(window).height() - 70) / 2);
}

//侧边隐藏显示
$('.newico').click(function () {
    if (parseInt($(".left_pdf").css("margin-left")) > 20) {
        $('.left_pdf').css('margin-left', '17px');
    } else {
        $('.left_pdf').css('margin-left', '241px');
    }
    //$(this).siblings('.new').animate({ width: 'toggle' }, 200);
    $(this).toggleClass('hover');
    //$(".nav_left_ybdd").animate({ width: 'toggle' }, 100);
    //$(this).toggleClass('hover');
});