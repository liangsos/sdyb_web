


var oTable = null;
$.extend(true, $.fn.dataTable.defaults, {
	"ordering": false
});
$(function () {

	search(true);
	member_getRoleList();

	$('#search').click(function (e) {
		search();
	});

});

function search(isfirst) {

	var account = $("#account").val();
	var name = $("#name").val();
	var roleId = $("#role").val();
	var mobile = $("#mobile").val();

	if (roleId == -1)
		roleId = null;

	if (oTable != null) {
		oTable.fnClearTable(false);
		oTable.dataTable().fnDestroy();
		oTable = null;
		$('#datatable thead').empty();
		$('#datatable tbody').empty();
	}

	oTable=$('.table-sort').dataTable({
		serverSide: true,
		ajax: function (data, callback, settings) {
			var objData = {};
			objData.startIndex = data.start;//起始位置
			objData.pageSize = data.length;//一页大小
			objData.pageNum = (data.start / data.length) + 1;//当前页码
			objData.params = isfirst != true ? {
				account: account,
				name: name,
				roleId: roleId,
				mobile: mobile,
			} : {};

			var settings = {
				"url": apiUrl_cloud + "api-permissioncenter/user/getPageUser",
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
					var returnData = {};
					//	returnData.draw = resData.draw;

					var _data = new Array();
					$.each(res.data.list, function (index, item) {
						//if (index<20)
						_data.push(item);
					})
					returnData.recordsTotal = res.data.totalSize;
					returnData.recordsFiltered = res.data.totalSize;//后台不实现过滤功能，每次查询均视作全部结果
					returnData.data = _data;

					callback(returnData);
				}
			});


		},
		"searching": false,
		'iDisplayLength': 20,
		'bLengthChange': false,//是否允许用户自定义每页显示条数。

		'sScrollY': 'calc(100vh - 380px)',



		"aoColumns": [

			{ "sTitle": "id", "sClass": "center", "mData": "id" },
			{ "sTitle": "账号", "sClass": "center", "mData": "account" },
			{ "sTitle": "姓名", "sClass": "center", "mData": "name" },
			{ "sTitle": "角色", "sClass": "center", "mData": "roleName" },
			{ "sTitle": "手机号码", "sClass": "center", "mData": "mobile" },
			{ "sTitle": "行政区划", "sClass": "center", "mData": "addvcdName" },
			{ "sTitle": "状态", "sClass": "center", "mData": "status" },
			{ "sTitle": "创建时间", "sClass": "center", "mData": "createTime" },
			{ "sTitle": "操作", "sClass": "center" }

		],

		"aoColumnDefs": [
			{ "orderable": false, "aTargets": [1, 2, 3, 4, 5, 6, 7, 8] },// 制定列不参与排序
			{
				"targets": [6],
				"mRender": function (data, type, full) {
					if (data == "1")
						return "<span style='color:#11A2FE'>启用</span>"
					else
						return "<span style='color:red'>停用</span>"
				}
			},
			{
				"targets": [8],
				"bSortable": false,
				"data": [0],
				"mRender": function (data, type, full) {
					if (!full.lockUser)
						return "<a style=\"text-decoration: none\" onClick=\"member_setState(" + full.id + "," + full.status + ")\"  title=\"停用/启用\"><i class=\"Hui-iconfont\">&#xe631;</i></a> <a title=\"编辑\" href=\"javascript: ; \" onclick=\"member_edit('编辑', 'member_add.html','" + full.id + "',  '450','340')\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6df;</i></a> <a style=\"text-decoration: none\" class=\"ml-5\" onClick=\"reset_password(" + full.id + ")\" href=\"javascript: ; \" title=\"重置密码\"><i class=\"Hui-iconfont\">&#xe63f;</i></a> <a title=\"删除\" href=\"javascript: ; \" onclick=\"member_del(" + full.id + ")\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6e2;</i></a>";
					else
						return "<a style=\"text-decoration: none\" onClick=\"member_setUnlock(" + full.id + ")\"  title=\"解锁\"><i class=\"Hui-iconfont\">&#xe605;</i></a> <a style=\"text-decoration: none\" onClick=\"member_setState(" + full.id + "," + full.status + ")\"  title=\"停用/启用\"><i class=\"Hui-iconfont\">&#xe631;</i></a> <a title=\"编辑\" href=\"javascript: ; \" onclick=\"member_edit('编辑', 'member_add.html','" + full.id + "',  '450','340')\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6df;</i></a> <a style=\"text-decoration: none\" class=\"ml-5\" onClick=\"reset_password(" + full.id + ")\" href=\"javascript: ; \" title=\"重置密码\"><i class=\"Hui-iconfont\">&#xe63f;</i></a> <a title=\"删除\" href=\"javascript: ; \" onclick=\"member_del(" + full.id + ")\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6e2;</i></a>";

				}
			}
		]

	});
}
/*用户-添加*/
function member_add(title, url, w, h) {
	layer_show(title, url, w, h);
}


/*用户-编辑*/
function member_edit(title, url,id,w, h) {
	layer_show(title, url+"?id="+id+"&&op=edit", w, h);
}

/*用户-查看*/
function member_show(title, url, id, w, h) {
	layer_show(title, url, w, h);
}

/*用户-获取角色列表*/
function member_getRoleList() {
	$("#role").html("");
	var settings = {
		"url": apiUrl_cloud + "api-permissioncenter/user/getAllRole",
		"method": "GET",
		"timeout": 0,
		"headers": {
			"Authorization": getCookie("accessToken"),
			"Content-Type": "application/json"
		},

	};

	$.ajax(settings).done(function (res) {
		if (res.code == 200) {
			var arr_op = "";
			arr_op += "<option value='-1' selected>全部</option>";
			$.each(res.data, function (index, item) {
					arr_op += "<option value='" + item.id + "'>" + item.name + "</option>";
			})
			$("#role").html(arr_op);
		}
		else
			layer.msg(res.message, { icon: 2, time: 3000 });

	});
}



/*密码-重置*/
function reset_password(id) {
	layer.confirm('确认要重置密码吗？', function (index) {
		var objData = {};
		objData.id = id;
		var settings = {
			"url": apiUrl_cloud + "api-permissioncenter/user/resetPassword",
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
				layer.msg('重置成功!', { icon: 1, time: 1000 }, function () {
					flushTable();

				});
			}
			else
				layer.msg(res.message, { icon: 2, time: 3000 });

		});
	});
}
/*用户-删除*/
function member_del(id) {
		layer.confirm('确认要删除吗？', function (index) {
			var objData = {};
			objData.id = id;
			var settings = {
				"url": apiUrl_cloud + "api-permissioncenter/user/deleteUser",
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
					layer.msg('删除成功!', { icon: 1, time: 1000 }, function () {
						flushTable();

					});
				}
				else
					layer.msg(res.message, { icon: 2, time: 3000 });

			});
		});
}


/*用户-停用或者启用*/
function member_setState(id, status) {
	var layer_title = status == "1" ? '确认要停用吗？' : '确认要启用吗？';
	layer.confirm(layer_title, function (index) {
		var objData = {};
		objData.id = Number($.trim(id));
		objData.status = status == "1" ? 0 : 1;
		var settings = {
			"url": apiUrl_cloud + "api-permissioncenter/user/disableUser",
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
					flushTable();

				});
			}
			else
				layer.msg(res.message, { icon: 2, time: 3000 });

		});


	});
}


/*用户-解锁*/
function member_setUnlock(id) {

	layer.confirm('确认要解锁该用户吗？', function (index) {
		var objData = {};
		objData.id = Number($.trim(id));
		var settings = {
			"url": apiUrl_cloud + "api-permissioncenter/user/releaseLockUser",
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
					flushTable();

				});
			}
			else
				layer.msg(res.message, { icon: 2, time: 3000 });

		});


	});
}


function flushTable() {
	var table = $('#datatable').DataTable();
	table.draw(false);
}

