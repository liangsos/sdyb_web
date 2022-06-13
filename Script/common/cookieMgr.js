/**
 * 设置cookie
 * @param {any} name 名称
 * @param {any} value 值
 * @param {any} day 有效期
 */
var setCookie = function (name, value, day) {
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
    //    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + ";path=/;domain=10.37.1.73";
          document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + ";path=/ "       
        if (day == -1)
        document.cookie = name + "=" + escape("");
    } else {
        document.cookie = name + "=" + escape(value);
    }
};

/**
 * 获取cookie
 * @param {any} name 名称
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


/**
 * 删除cookie
 * @param {any} name 名称
 */
function delCookie(name) {
    setCookie(name, ' ', -1);
}