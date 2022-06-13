$('#svg_menu li').mouseout(function (e) {
    $(this).removeClass("active");
    $(this).find(".right_flag").eq(0).hide();

})
$('#svg_menu li').mouseover(function (e) {

    $(this).addClass("active");
    $(this).find(".right_flag").eq(0).show();
})
