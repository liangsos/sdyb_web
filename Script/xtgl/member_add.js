 

 //用户id
var useId = decodeURI(getQueryString("id"));

//操作类型
var op = decodeURI(getQueryString("op"));
 
$(function () {

	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});

	$("#form-member-add").validate({
		rules: {
			account: {
				required: true,
			},
			name: {
				required: true,
			},
			mobile: {
				required: true,
				isMobile: true,
			},


		},
		onkeyup: false,
		focusCleanup: true,
		success: "valid",
		submitHandler: function (form) {
			save();
			
		}
	});



	member_getRoleList();
	member_getAddvcdList();
	if (op == "edit")
		member_getinfo(useId);

 
 
});
/*用户-获取角色列表*/
function member_getRoleList() {
	$("#role").html("");
	var settings = {
		"url": apiUrl_cloud + "api-permissioncenter/user/getAllRole",
		"method": "GET",
		"timeout": 0,
		"async": false,
		"headers": {
			"Authorization": getCookie("accessToken"),
			"Content-Type": "application/json"
		},

	};

	$.ajax(settings).done(function (res) {
		if (res.code == 200) {
			var arr_op = "";
			if (op == "edit")
				arr_op += "<option value='null' selected></option>";
			$.each(res.data, function (index, item) {
				if (index == 0) {
					if (op == "edit")
						arr_op += "<option value='" + item.id + "'>" + item.name + "</option>";
					else
						arr_op += "<option value='" + item.id + "' selected>" + item.name + "</option>";
                }	
				else
					arr_op += "<option value='" + item.id + "'>" + item.name + "</option>";
			})
			$("#role").html(arr_op);
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}


/*用户-获取行政区划列表*/
function member_getAddvcdList() {
	$("#addvcd").html("");
	var settings = {
		"url": apiUrl_cloud + "api-permissioncenter/user/getAddvcdList",
		"method": "GET",
		"timeout": 0,
		"async": false,
		"headers": {
			"Authorization": getCookie("accessToken"),
			"Content-Type": "application/json"
		},

	};

	$.ajax(settings).done(function (res) {
		if (res.code == 200) {
			var arr_op = "";
			if (op == "edit")
				arr_op += "<option value='null' selected></option>";
			$.each(res.data, function (index, item) {
				if (index == 0) {
					if (op == "edit")
						arr_op += "<option value='" + item.addvcdCode + "'>" + item.addvcdName + "</option>";
					else
						arr_op += "<option value='" + item.addvcdCode + "' selected>" + item.addvcdName + "</option>";
				}
				else
					arr_op += "<option value='" + item.addvcdCode + "'>" + item.addvcdName + "</option>";
			})
			$("#addvcd").html(arr_op);
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}
/*用户-获取用户信息*/
function member_getinfo(id) {
	var objData = {};
	objData.id = id;
	var settings = {
		"url": apiUrl_cloud + "api-permissioncenter/user/getUserById",
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
			$("#account").val(res.data.account);
			$("#account").attr("readonly", "readonly");
			$("#account").css("background", "#ccc");
			$("#mobile").val(res.data.mobile);
			$("#name").val(res.data.name);
			$("#role").val(res.data.roleId);
			$("#addvcd").val(res.data.addvcd);
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}


/**
 * 保存用户信息
 * */
function save() {
	var objData = {};
	objData.account = $("#account").val();
	objData.mobile = $("#mobile").val();
	objData.name = $("#name").val();
	objData.roleId = Number($("#role").val());
	objData.addvcd = Number($("#addvcd").val());
	if (op == "edit")
		objData.id = Number(useId);


	var url = op == "edit" ? apiUrl_cloud + "api-permissioncenter/user/updateUser" : apiUrl_cloud + "api-permissioncenter/user/saveUser";
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