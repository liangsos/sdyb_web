/**生成一个随机数**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}
/**绘制验证码图片**/
function drawPic() {
    var canvas = document.getElementById("canvas");
 
    var width = 76;
    var height = 32;
    canvas.width = width;
    canvas.height = height;
    //获取该canvas的2D绘图环境 
    var code = "";
    if (canvas != null) {
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'bottom';
        /**绘制背景色**/
        ctx.fillStyle = "rgb(255,255,255)";//randomColor(180, 240);
        //颜色若太深可能导致看不清
        ctx.fillRect(0, 0, width, height);
        /**绘制文字**/
        var str = '123456789';

        //生成四个验证码
        for (var i = 1; i <= 4; i++) {
            var txt = str[randomNum(0, str.length)];
            code = code + txt;
            ctx.fillStyle = randomColor(50, 160);
            //随机生成字体颜色
            ctx.font = randomNum(24, 25) + 'px SimHei';
            //随机生成字体大小
            var x =4+ i * 12;
            var y = randomNum(30, 32);
            var deg = randomNum(-20, 20);
            //修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }

        /**绘制干扰线**/
        /*for (var i = 0; i < 3; i++) {
            ctx.strokeStyle = randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, width / 2), randomNum(0, height / 2));
            ctx.lineTo(randomNum(0, width / 2), randomNum(0, height));
            ctx.stroke();
        }*/
        /**绘制干扰点**/
       /* for (var i = 0; i < 50; i++) {
            ctx.fillStyle = randomColor(255);
            ctx.beginPath();
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }*/
    }
    return code;
}


//初始化验证码
$(function () {
    verCode = drawPic();
    $("#verCode").val(verCode);
    var reflashCode = document.getElementById("canvas");
    if (reflashCode != null) {
        document.getElementById("canvas").onclick = function (e) {
            e.preventDefault();
            verCode = drawPic();
            $("#verCode").val(verCode);
        }
    };

    $('.password_control').click(function (e) {
        showOrhidePassword();
    });
});

function showOrhidePassword() {
    var cur_img = $('.password_control').attr("src");
    if (cur_img.indexOf("login_form_password_noeye") > -1) {
        $('.password_control').attr("src", "./img/Images/login_form_password_eye.png")
        $("#password_see").show();
        $("#password").hide();
    }
    else {
        $('.password_control').attr("src", "./img/Images/login_form_password_noeye.png")
        $("#password_see").hide();
        $("#password").show();
    }


}  
function changePassword(e) {
    if (e.id == "password")
        $("#password_see").val(e.value);
    else if (e.id == "password_see")
        $("#password").val(e.value);

    console.log(e);

}