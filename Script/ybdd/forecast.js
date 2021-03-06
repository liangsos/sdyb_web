
let form = layui.form;
let layerIndex = "";
$(".show_forecast").hide();
$(".show_forecast").parent().hide();
/* 预报发布点击事件 */
$("#forecast").on('change', function () {
    if ($("#forecast").is(':checked')) {
        var optionHtml = "";
        var modelArr = selectModes.split(',');
        var modelsNameArr = selectModelsName.split(',')
        $.each(modelsNameArr, function (i, item) {
            optionHtml += "<option value='" + modelArr[i] + "' >" + item + "</option>"
        })
        $("#modelid").html(optionHtml);
        layerIndex = layer.open({
            type: 1,
            title: "预报发布",
            area: ['410px', '440px'],
            content: $('#ybfbPanel'),
            cancel: function () {
                $("#forecast").removeAttr("checked");
            }
        })
        form.render('select');
    } else {
        $('#ybfbPanel').hide();
        $("#forecast").removeAttr("checked");
    }
})
/**发布按钮 */
form.on('submit(ybfbFormSave)', function (data) {
    var formData = data.field;
    var objData = {
        adjust: 0,
        autoFore: 0,
        day: Number(selectDays),
        etime: searchEtime,
        fbys: formData.fbys,
        fbyz: formData.fbyz,
        func: Number(searchType) - 1,
        hisStormId: _hisStormId,
        modelid: formData.modelid,
        models: selectModes,
        plan: Number(searchPlan),
        plusType: _plusType,
        rainPlus: _rainPlus,
        range: searchRange,
        stime: searchStime,
        unitnm: formData.unitnm,
        yjq:formData.yjq
    };
    var params_info = JSON.stringify(objData);
    Daily_forecast_singleBasin(params_info);
    return false;
})
function Daily_forecast_singleBasin(params_info) {
    $.ajax({
        url: apiUrl_cloud + "api-hwhydroinfo/Daily_forecast_singleBasin",
        data: params_info,
        type: "post",
        async: true,
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": getCookie("accessToken")
        },
        success: function (res) {
            if (res.code == 200) {
                layer.close(layerIndex);
                $("#forecast").removeAttr("checked");
                tools.show_message_success(res.data);
            } else {
                tools.show_message_error("流域日常化上报失败!");
                return;
            }
        },
        error: function (_res) {
            tools.show_message_error("流域日常化上报失败!");
        },
    });
}