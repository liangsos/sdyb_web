$(document).ready(function () {

    checkRoleFromSxxWeb();

    if ((getCookie("accessToken") == null) || (getCookie("userid") == null)) {
        if (getCookie("loginType") != "2")
            window.location.replace("login.html");
        return;
    }
 
    $("#_hid_token").val(getCookie("accessToken"));
    $("#_hid_userid").val(getCookie("userid"));
   // alert(getCookie("username"));
    $("#username").html(getCookie("username"));
     
})


/**
 * 从水信息跳转过来的时候，根据参数验证角色权限
 * */
function checkRoleFromSxxWeb() {
    var uid = decodeURI(getQueryString("uid"));
 
    if ((uid != "null"))
        loginOnCard(uid);
}