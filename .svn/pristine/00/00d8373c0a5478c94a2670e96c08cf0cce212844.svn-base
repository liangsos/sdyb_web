

$(function () {

    initLoginInfo();


});
function initLoginInfo() {


    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/log/getLoginInfo",
        "method": "GET",
        "timeout": 0,
        "async": false,
        "headers": {
            "Authorization": getCookie("accessToken"),
            "Content-Type": "application/json"
        }

    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            $("#loginVisitCount").html(res.data.loginVisitCount);
            $("#lastRequestIp").html(res.data.lastRequestIp);
            $("#lastLoginTime").html(res.data.lastLoginTime);
        }
        else
            layer.msg(res.message, { icon: 2, time: 3000 });

    });

}





