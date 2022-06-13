 

 
var useId = decodeURI(getQueryString("id"));
var op = decodeURI(getQueryString("op"));
 
$(function () {

	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});

	$("#form-member-add").validate({
		rules: {
		 
			name: {
				required: true,
			},
		 


		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid",
		submitHandler: function (form) {
			save();
			
		}
	});

 

	if(op == "edit")
		role_getinfo(useId);

 
 
});
 

/*用户-获取角色列表*/
function role_getinfo(id) {
	var objData = {};
	objData.id = id;
	var settings = {
		"url": apiUrl_cloud + "api-permissioncenter/role/getRoleById",
		"method": "POST",
		"timeout": 0,
		"async": false,
		"headers": {
			"Authorization": getCookie("accessToken"),
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(objData),

	};

	$.ajax(settings).done(function (res) {
		if (res.code == 200) {
			$("#code").val(res.data.code);
			$("#desc").val(res.data.desc);
			$("#name").val(res.data.name);
	 
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}
 
function save() {
	var objData = {};
	objData.code = $("#code").val();
	objData.desc = $("#desc").val();
	objData.name = $("#name").val();
 
	if (op == "edit")
		objData.id = Number(useId);


	var url = op == "edit" ? apiUrl_cloud + "api-permissioncenter/role/modifyRole" : apiUrl_cloud + "api-permissioncenter/role/saveRole";
	var settings = {
		"url": url ,
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Authorization": getCookie("accessToken"),
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(objData),
	};

	$.ajax(settings).done(function (res) {
		if (res.code == 200) {
			layer.msg('操作成功!', { icon: 1, time: 1000 }, function () {
				parent.flushTable();
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			});
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}