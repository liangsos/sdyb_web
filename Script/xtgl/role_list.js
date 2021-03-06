 


var oTable = null;
$.extend(true, $.fn.dataTable.defaults, {
	"ordering": false
});
$(function () {

	search(true);
 

	$('#search').click(function (e) {
		search();
	});

});

function search(isfirst) {

 
	var name = $("#name").val();
 
 
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
				name: name
			} : {};

			var settings = {
				"url": apiUrl_cloud + "api-permissioncenter/role/getRoleByPage",
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
		'bLengthChange': false,//是否允许角色自定义每页显示条数。

		'sScrollY': 'calc(100vh - 380px)',



		"aoColumns": [

			{ "sTitle": "id", "sClass": "center", "mData": "id" },
			{ "sTitle": "角色编码", "sClass": "center", "mData": "code" },
			{ "sTitle": "角色名", "sClass": "center", "mData": "name" },
			{ "sTitle": "角色描述", "sClass": "center", "mData": "desc" },
			{ "sTitle": "创建时间", "sClass": "center", "mData": "createTime" },
			{ "sTitle": "操作", "sClass": "center" }

		],

		"aoColumnDefs": [
			{ "orderable": false, "aTargets": [1, 2, 3, 4, 5] },// 制定列不参与排序
	 
			{
				"targets": [5],
				"bSortable": false,
				"data": [0],
				"mRender": function (data, type, full) {
					return "   <a title=\"编辑\" href=\"javascript: ; \" onclick=\"role_edit('编辑', 'role_add.html','" + full.id + "',  '450','340')\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6df;</i></a> <a title=\"分配资源\" href=\"javascript: ; \" onclick=\"role_menu('菜单', 'role_menu.html','" + full.id + "',  '800','580')\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe63c;</i></a> <a title=\"删除\" href=\"javascript: ; \" onclick=\"rol_del(" + full.id + ")\" class=\"ml-5\" style=\"text-decoration: none\"><i class=\"Hui-iconfont\">&#xe6e2;</i></a>";
				}
			}
		]

	});
}

/*角色-添加*/
function role_add(title, url, w, h) {
	layer_show(title, url, w, h);
}

/*角色-编辑*/
function role_edit(title, url, id, w, h) {
	layer_show(title, url + "?id=" + id + "&&op=edit", w, h);
}

/*角色-菜单资源*/
function role_menu(title, url, id, w, h) {
	layer_show(title, url + "?id=" + id + "&&op=edit", w, h);
}


/*角色-删除*/
function rol_del(id) {
	layer.confirm('确认要删除吗？', function (index) {
		var objData = {};
		objData.id = id;
		var settings = {
			"url": apiUrl_cloud + "api-permissioncenter/role/deleteRole",
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


function flushTable() {
	var table = $('#datatable').DataTable();
	table.draw(false);
}

