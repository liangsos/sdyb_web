//当前已经完成步骤数目
var cur_step_index = 0;
var cur_step_type = null;
//总步骤数目
var max_steps = 6;


$(document).ready(function () {
    yb_setSteps(0, "h");
    yb_setSteps(0, "s");
});

/**
 * 设置预报步骤状态
 * @param {any} index 完成步骤数目索引
 * @param {any} maptype 菜单类型，h表示横向，s竖向
 */
function yb_setSteps(index, maptype) {
    var menu_type = "";
    if (maptype == "1")
        menu_type = "h";
    else if (maptype == "2")
        menu_type = "s";
    else
        return;

    if ((cur_step_index == index)&& (cur_step_type == menu_type))
        return;


    var menu_class = ".yb-pa-" + menu_type;
    //处理图标
    for (var i = 1; i <= max_steps; i++) {
        var obj = $(menu_class+" .yb_step_" + i);

        if (i <= index) {
            //设置成已完成状态，包含图标状态和进度条
            obj.find(".icon_img_bg").eq(0).attr("src", "./page_h/img/yb_step_bg_over.png");
            obj.find(".icon_img").eq(0).attr("src", "./page_h/img/yb_step_" + obj[0].id.split("_")[1] + "_over.png");
            obj.find("div").eq(0).find("img").eq(0).attr("src", "./page_h/img/yb_step_text_bg_" + menu_type + "_selected.png");
            obj.find("div").eq(0).find("span").eq(0).css("color","#ffffff");


        }
        else {
            //设置成未完成状态，包含图标状态和进度条
            obj.find(".icon_img_bg").eq(0).attr("src", "./page_h/img/yb_step_bg.png");
            obj.find(".icon_img").eq(0).attr("src", "./page_h/img/yb_step_" + obj[0].id.split("_")[1] + ".png");
            obj.find("div").eq(0).find("img").eq(0).attr("src", "./page_h/img/yb_step_text_bg_" + menu_type + ".png");
            obj.find("div").eq(0).find("span").eq(0).css("color", "rgba(5, 116, 255, 1)");
        }

    }
    //处理进度条,如果是1，则只显示ready_1,其他不显示，如果是6，则全部显示over,如果其他，则index-1，全部显示over，index显示ready，其他不显示
    if (index == 1) {
        for (var i = 1; i <= max_steps - 1; i++) {
            $(menu_class+" .progress_over_" + i).hide();
            if (i == index)
                $(menu_class+" .progress_ready_" + i).show();
            else
                $(menu_class+" .progress_ready_" + i).hide();
        }
    }
    else if (index == 6) {
        for (var i = 1; i <= max_steps - 1; i++) {
            $(menu_class+" .progress_over_" + i).show();
            $(menu_class+" .progress_ready_" + i).hide();
        }
    }
    else {
        for (var i = 1; i <= max_steps - 1; i++) {
            if (i < index) {
                $(menu_class+" .progress_over_" + i).show();
                $(menu_class+" .progress_ready_" + i).hide();
            }
            else if (i == index) {
                $(menu_class+" .progress_over_" + i).hide();
                $(menu_class+" .progress_ready_" + i).show();;
            }
            else {
                $(menu_class+" .progress_over_" + i).hide();
                $(menu_class+" .progress_ready_" + i).hide();;
            }
        }
    }

    cur_step_index = index;
    cur_step_type = menu_type;
}