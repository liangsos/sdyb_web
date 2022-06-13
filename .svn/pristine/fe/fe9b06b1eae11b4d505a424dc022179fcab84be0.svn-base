$(document).ready(function () {

})

/*
 * 点击弹出管理员菜单 
 */
$('.gly .sjx').click(function (e) {
    var obj = $(this);
    if (obj.hasClass("active")) {
        obj.removeClass("active");
        $("#gly_menu").animate({ opacity: 0 }, 288, "linear" ,  function () {
            $("#gly_menu").hide();
        });
         
    }
    else {
        obj.addClass("active");
        $("#gly_menu").show();
        $("#gly_menu").animate({ opacity: 1 }, 288, "linear" , function () {
        });
    }
});

/*
 * 鼠标移出，管理员菜单隐藏
 */
$('#gly_menu').mouseleave(function (e) {
    $('.gly .sjx').removeClass("active");
    $("#gly_menu").animate({ opacity: 0 }, 288, "linear",function () {
        $("#gly_menu").hide(0);
    });
  
 
    console.log(e.target.id + "/" + e.target.nodeName);
});

/*
 *用户登出
 */ 
$('.login_out').click(function (e) {
    loginout();
});
$('.password_change').click(function (e) {
    var arr_node_actiove = document.getElementsByClassName("ant-radio-button-wrapper-checked");
    var page_index = $(arr_node_actiove[0]).attr("_pageindex");
    if ((page_index == 1) || (page_index == 3))
        $(window.parent.document.getElementById("panel_password_change")).removeClass("black").addClass("black");
    else
        $(window.parent.document.getElementById("panel_password_change")).removeClass("black");

    $(window.parent.document.getElementById("panel_password_change")).show();
});

