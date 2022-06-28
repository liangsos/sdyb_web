
$(document).ready(function () {



    /* //顶部菜单鼠标移出，菜单助手两秒内消失
     $('.header').mouseout(function (e) {
         $(".header-help").animate({ opacity: "0"}, 1000);
       
     })
     //顶部菜单鼠标移入，菜单助手显示
     $('.header').mouseover(function (e) {
         $(".header-help").show();
         $(".header-help").stop(true,true);
         $(".header-help").css({ "opacity": 1 });
  
     })
      //菜单助手点击事件
     $('.header .header-help').click(function (e) {
         if ($(".header").css('top') !="0px") {
             $(" .header").animate({ top: "0px" }, 300);
             $(" .container").height($(document).height()-64);
             $(" .container").animate({ top: "104px" }, 300);
 
         }
         else {
             $(" .header").animate({ top: "-104px" }, 300);
             $(" .container").height($(document).height());
             $(" .container").animate({ top: "0px" }, 300);
     
         }
     });
 
 
     //菜单切换事件
     $('.header .shikuang,.header .yubao,.header .huishang,.header .fagl,.header .mxgj,.header .xtgl').click(function (e) {
 
         var arr_node_actiove = document.getElementsByClassName("ant-radio-button-wrapper-checked");
         $.each(arr_node_actiove, function (index, item) {
             var img_obj = $(item).find("img").eq(0);
             var img_src = img_obj.attr("src");
             img_obj.attr("src", img_src.replace("_selected", ""))
                 $(item).removeClass("ant-radio-button-wrapper-checked");
             $("#frame_" + item.id.split("_")[1]).hide();
           
         });
 
         var img_obj = $(this).find("img").eq(0);
         var img_src = img_obj.attr("src");
         img_obj.attr("src", img_src.substr(0, img_src.length - 4) + "_selected.png");
         $(this).addClass("ant-radio-button-wrapper-checked");
         $("#frame_" + $(this)[0].id.split("_")[1]).show();
     
 
     });
 */

    //处理链接过来的参数，默认显示哪个模块
    var show_menu = decodeURI(getQueryString("type"));

    var menu_id = (show_menu == null || $.trim(show_menu) == "" || show_menu == undefined) ? "1" : show_menu;//默认菜单;实况

    changePage(Number(menu_id));
});

function changePage(pageIndex) {
    if (!$(".page_" + pageIndex).is(':hidden')) {
        return;
    }

    for (var i = 1; i <= 6; i++) {
        if (i != pageIndex)
            $(".page_" + i).hide();
        else
            $(".page_" + i).show();
    }
    if (pageIndex == 1) {
        document.getElementsByName("frame_shikuang")[0].contentWindow.sengMsgToEarth({
            data: null,
            des: "重置定时交换雨量表",
            isDelay: false
        });
        
    }
    else{
        document.getElementsByName("frame_shikuang")[0].contentWindow.sengMsgToEarth({
            data: null,
            des: "停止定时交换雨量表",
            isDelay: false
        });
    }
}

$("#panel_password_change #change_ok").click(function () {
    var change_password = $.trim($("#change_password").val());
    var change_confirmPassword = $.trim($("#change_confirmPassword").val());



    if (change_password == "") {

        toastr.clear();
        toastr.error("密码不能为空!", null, { positionClass: 'toast-center-center', timeOut: "3000" });
        return;
    }

    if (change_confirmPassword != change_password) {
        toastr.clear();
        toastr.error("两次密码不一致!", null, { positionClass: 'toast-center-center', timeOut: "3000" });
        return;

    }
    var objData = {};
    objData.password = change_password;
    objData.confirmPassword = change_confirmPassword;
    objData.id = null;
    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/user/changePassowrd",
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
            toastr.clear();
            toastr.success(res.message, null, { positionClass: 'toast-center-center', timeOut: "3000" });
            $("#panel_password_change").hide();

        }
        else {
            toastr.clear();
            toastr.error(res.message, null, { positionClass: 'toast-center-center', timeOut: "3000" });
        }


    });



});
$("#panel_password_change #change_cancel").click(function () {
    $("#panel_password_change").hide();
});
//关闭按钮事件
$("#panel_password_change .icon-close").click(function () {
    $("#panel_password_change").hide();
});
$("#panel_password_change").draggable({
    handle: '.panel-header',
    cursor: "move",
    opacity: 0.7
});

function quit(msg) {
    //如果超时就处理 ，指定要跳转的页面(比如登陆页)
    toastr.clear();
    toastr.error(msg, null, { positionClass: 'toast-center-center', timeOut: "5000" });
    setTimeout(function () {
        deleteUserCookie();
        window.location.replace("login.html");
    }, 2000);
}