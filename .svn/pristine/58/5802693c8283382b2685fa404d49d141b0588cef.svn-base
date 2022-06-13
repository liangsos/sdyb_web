
//查询开始时间
var searchStime = "2020-08-12 08:00:00";

//查询结束时间
var searchEtime = "2020-08-14 12:00:00";

//历史情景ID
var _hisStormId = -1;

//雨量放大值
var _rainPlus = 0;

//雨量放大类型
var _plusType = 0;

//模型(单站极值使用)
var _modeid = "";

//模型选择
var selectModes = "APIUH,XAJMK,HBYH,XC,XAJGJ,TANK,SAC";
//查询计划
var searchPlan = "0";

//查询周期
var selectDays = "3";

//查询种类，实况,预报，调度，1，2，3
var searchType = "2";

//默认调度类型
var default_scheduleType = 2;

//默认调度名称
var schedulePlanName = "";

//查询区域
var searchRange = "11";

//工具类
var tools = new Tools();


var isCgxz = false;

var isyuyan = false;

$(document).ready(function () {
    // debugger;
    //加载其他异步页面
    tools.ModuleLoad("#content_panel", "panel_huishang.html", function () {

    });

});
window.addEventListener('message', function (event) {

    var flag = event.data.flag;
    if (flag != null) {
        if (event.data.des == "鼠标点击") {
            resetParams(event.data.searchPlan);
            show_info(flag);
        }
    }
})

/**
 * 重设面板参数
 * @param {any} obj
 */
function resetParams(obj) {
    //查询开始时间
      searchStime = obj.searchStime;

    //查询结束时间
      searchEtime = obj.searchEtime;

    //历史情景ID
      _hisStormId = obj.hisStormId;

    //雨量放大值
      _rainPlus = obj.rainPlus;

    //雨量放大类型
      _plusType = obj.plusType;
 
    //查询计划
      searchPlan = obj.searchPlan;

    //查询周期
      selectDays = obj.searchDays;

    //查询种类，实况,预报，调度，1，2，3
      searchType = obj.searchType;

    //查询区域
    searchRange = obj.searchRange;

    // 默认调度类型
    default_scheduleType = obj.scheduleType;
     

    // 默认调度名称
    schedulePlanName = obj.scheduleName;

    //模型选择
    selectModes = obj.models;


}