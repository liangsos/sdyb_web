


var oTable = null;
$.extend(true, $.fn.dataTable.defaults, {
	"ordering": false
});
$(function () {
	var tm = new Date();
	var month = tm.getMonth() + 1;
	month = month < 10 ? "0" + month : month;

	$("#loginEndTime").val(tm.getFullYear() + "-" + month + "-" + tm.getDate());
	tm.setTime(tm.getTime() - 24 * 60 * 60 * 1000);

	var month = tm.getMonth() + 1;
	month = month < 10 ? "0" + month : month;
	$("#loginBeginTime").val(tm.getFullYear() + "-" + month + "-" + tm.getDate());

	search(true);
	$('#search').click(function (e) {
		search();
	});
});

function search(isfirst) {

	var account = $("#account").val(); 
	var name = $("#name").val();
	var loginBeginTime = $("#loginBeginTime").val() + " 00:00:00";
	var loginEndTime = $("#loginEndTime").val() + " 00:00:00";


	if (oTable != null) {
		oTable.fnClearTable(false);
		oTable.dataTable().fnDestroy();
		oTable = null;
		$('#datatable thead').empty();
		$('#datatable tbody').empty();
	}

	oTable = $('.table-sort').dataTable({
		serverSide: true,
		ajax: function (data, callback, settings) {
			var objData = {};
			objData.startIndex = data.start;//起始位置
			objData.pageSize = data.length;//一页大小
			objData.pageNum = (data.start / data.length) + 1;//当前页码
			objData.params = isfirst != true ? {
				account: account,
				userName: name,
				loginEndTime: loginEndTime,
				loginBeginTime: loginBeginTime,
			} : {};

			var settings = {
				"url": apiUrl_cloud + "api-permissioncenter/log/getPageLoginLog",
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
			{ "sTitle": "姓名", "sClass": "center", "mData": "userName" },
			{ "sTitle": "登录人ID", "sClass": "center", "mData": "userId" },
			{ "sTitle": "登录地点", "sClass": "center", "mData": "location" },
			{ "sTitle": "登录时间", "sClass": "center", "mData": "loginTime" },
			{ "sTitle": "登录IP", "sClass": "center", "mData": "requestIp" }
		],

		"aoColumnDefs": [
			{ "orderable": false, "aTargets": [0, 1, 2, 3, 4, 5, 6] }

		]

	});
}


