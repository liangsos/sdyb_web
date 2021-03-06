const apiUrl = "http://10.37.1.43:8080/hyb-service1/ybdd-api/";
const apiUrl_cbh = "http://10.37.1.43:8080/cbh-service1/ybddxtpostgresqlversion-api/";
const apiUrl_fzg = "http://10.37.1.43:8080/fzg-service1/ybdd-api/";

const apiUrl_xj = "http://10.37.1.75:80/sd-api/";
const apiUrl_zyslx = "http://10.37.1.43:8086/ybddzyslx-api/";
const apiUrl_bky = "http://10.5.1.33:8080/FloodAnalysis/";

const apiUrl_cloud = "http://10.37.1.73:30000/";
const apiUrl_zf = "http://10.37.1.79:9003/sd-api/";

var login_time = null;

//是否调试模式
const isdebug = true;
$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-~8",
    beforeSend: function (jqXHR, settings) {
        settings.timeout = 0;
        if (settings.data != undefined) {
            if (settings.data.indexOf("{") == 0) {
                /* var objData = JSON.parse(settings.data);
                 if ($("#show_autoFore").is(':checked')) {
                     eval("objData.autoFore =1");
                 }
                 else {
                     eval("objData.autoFore =0");
                 }
                 settings.data = JSON.stringify(objData);*/
                //当plan=1且meterPattern不为空时，hisstormId=空
                var objData = JSON.parse(settings.data);
                if (objData.plan == "1" && (objData.hasOwnProperty("meteorPattern") && objData.meteorPattern != "")) {
                    objData.hisStormId = "";
                    settings.data = JSON.stringify(objData)
                }
            }
        }

    },
    complete: function (XMLHttpRequest, textStatus) {
        //通过XMLHttpRequest取得响应结果
        var res = XMLHttpRequest.responseText;
        try {
            var jsonData = JSON.parse(res);
            if ((jsonData.code >= 400) && (jsonData.code <= 402)) {

                window.top.quit(jsonData.message);

            }


        } catch (e) {
        }

    }
});


//登录
function userLogin() {


    //防止连续点击
    if (login_time == null) {
        login_time = new Date();
    } else {
        if ((new Date() - login_time) < 2000) {
            return;
        }
        login_time = new Date();
    }

    var userName = $.trim($("#userName").val());
    var password = $.trim($("#password").val());


    if (userName == "") {
        showLoginError("用户名不能为空!");
        return;
    }

    if (password == "") {

        showLoginError("密码不能为空!");
        return;

    }

    var yanzm = $("#yanzm").val().toLowerCase();
    var verCode = $("#verCode").val().toLowerCase();

    if (!isdebug) {
        if (yanzm != verCode) {

            showLoginError("验证码不正确!");
            return;
        }
    }

    setCookie("loginType", "1");

    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/auth/login",
        "method": "POST",
        "timeout": 0,
        "async": false,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "account": userName,
            "password": password
        }),
    };

    $.ajax(settings).done(function (res) {
        if (res.code == 200) {
            setCookie("userid", res.data.userDTO.id);
            setCookie("userRange", res.data.defaultRange);
            setCookie("accessToken", res.data.accessToken);
            setCookie("username", res.data.userDTO.name);

             if (!isdebug)
                window.location.href = "http://10.37.1.73:32622/#/navigation";
            else
                window.location.href = "ybdd.html";
        }
        else {

            showLoginError(res.message);

        }
    }).fail(function (res) {

    });

    //userLogin_43();


}

/**
 * 登陆43
 * */
function userLogin_43() {
    var userName = "admin";//$("#userName").val();
    var password = "sqqxc@3366";//$("#password").val();

    $.ajax({
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl + "login",
        data: { password: password, username: userName },
        success: function (res) {
            if (res.code == 1) {

                setCookie("token_43", res.data.token);

                //  window.location.href = "index.aspx";

            }
            else {
                //  $(".error_info").html(res.msg);
            }

        }
    })
}

/**
 * 登出
 * */
function loginout() {

    var settings = {
        "url": apiUrl_cloud + "api-permissioncenter/auth/logout",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": getCookie("accessToken")
        },

    };

    $.ajax(settings).done(function (res) {
        if ((res.code == 200) || ((res.code >= 400) && (res.code <= 402))) {
            deleteUserCookie();
            window.parent.location.replace("login.html");
        }
        else {
            tools.show_message_error_const(res.message);
        }
    }).fail(function (res) {

    });

}

//登录通过身份证信息
function loginOnCard(cardId) {
    return;

    setCookie("loginType", "2");
    $.ajax({
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: 'json',
        async: false,
        url: apiUrl + "loginOnCard?cardId=" + cardId,
        success: function (res) {
            if (res.code == 1) {
                setCookie("userid", res.data.user.userid);
                setCookie("accessToken", res.data.accessToken);
            }
            else {
                delCookie("userid");
                delCookie("userRange");
                delCookie("accessToken");
                delCookie("loginType");
                window.location.href = "norole.html";
            }

        }
    })
}


//显示登录错误信息
function showLoginError(msg) {
    $(".error_info").html(msg);
    $(".error_info").stop(true, true);
    $(".error_info").show();
    $(".error_info").fadeOut(5000);
}

/**
 * 删除用户缓存
 * */
function deleteUserCookie() {
    delCookie("userid");
    delCookie("userRange");
    delCookie("username");
    delCookie("accessToken");
    delCookie("loginType");
    delCookie("token_43");
    $("#_hid_token").val("");
    $("#_hid_userid").val("");
}

