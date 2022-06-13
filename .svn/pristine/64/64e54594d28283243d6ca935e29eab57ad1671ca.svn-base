//针对对象数据进行排序propertyName 要排序的属性名，order 1为正序0为倒序
function compare(propertyName, order) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (order == 0) {
            if (value2 < value1) {
                return -1;
            }
            else if (value2 > value1) {
                return 1;
            }
            else {
                return 0;
            }
        } if (order == 1) {
            if (value2 > value1) {
                return -1;
            }
            else if (value2 < value1) {
                return 1;
            }
            else {
                return 0;
            }
        }

    }
}

//小时格式化，确保2位数
function pad2(num, n) {
    if ((num + "").length >= n) return num;
    return pad2("0" + num, n);
}

//获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

