//# sourceURL=data_out.js
var wb;// 读取完成的数据
var rABS = false; // 是否将文件读取为二进制字符串
let data1 = new Array(); // 从excel中获得的对象数组
var tmpDown;//导出的二进制对象
var tools_panel;//工具类

/**
 * 总表导出
 */
function downloadExl(){
    var type = "xlsx";
    var downloadData = "";
    var dataStyle = "";
    var json = "";

    console.log(outjson);
    if ($('#contTj_Hd_All').hasClass('in active')) {
        downloadData = outjson.dataHd;
        dataStyle = "hd";
        json = adjustArray(downloadData,dataStyle);
    };
    if ($('#contTj_Hp_All').hasClass('in active')) {
        downloadData = outjson.dataHp;
        dataStyle = "hp";
        json = adjustArray(downloadData,dataStyle);
    }
    if ($('#contTj_Sk_All').hasClass('in active')) {
        downloadData = outjson.dataSk;
        dataStyle = "sk";
        json = adjustArray(downloadData,dataStyle);
    }
    if (downloadData.length == 0) {
        return;
    }
    

    var keyMap = []; //获取keys
    keyMap = downloadData[0];

    var tmpdata = [];//用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hfAll").href = href; //绑定a标签
    document.getElementById("hfAll").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    tmpDown = "";
};
/**
 * 字符串转字符流
 */
function s2ab(s) { 
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
/**
 * 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]
 */
function getCharCol(n) {
    let temCol = '',
    s = '',
    m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}
/**
 * key值转换
 */
function toChsKeys (data, keyMap) {
    return Object.keys(data).reduce((newData, key) => {
        var newKey = keyMap[key] || key
      newData[newKey] = data[key]
      return newData
    }, {})
}
/**
 * 总表数据处理
 */
function adjustArray(data,dataStyle){

    var newData = new Array();
    var _newData = new Array();

    for (var i = 0; i < data.length; i++) {
        //规定顺序
        if (dataStyle == "hd") {
            newData[i] = {
                "0": "",
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": ""
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = toChsKeys(data[i], newData[0])
        }
        if (dataStyle == "sk") {
            newData[i] = {
                "0": "",
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": "",
                "10": "",
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = toChsKeys(data[i], newData[0])
        }
        if (dataStyle == "hp") {
            newData[i] = {
                "0": "",
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": "",
                "10": "",
                "11":""
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = toChsKeys(data[i], newData[0])
        };
    };
    return _newData;
}
/**
 * 单站表导出
 */
function downloadExlStcd (){
    var type = "xlsx";
    var json = "";
    var downloadDataStcd = "";

    console.log(outjsonStcd.data);
    
    downloadDataStcd = outjsonStcd.data;
    //$.each(outjsonStcd.data,function (index, item){
    //    item.TM = item.TM == "" ? "" : moment(item.TM).format("MM-DD HH:mm");
    //});

    json = adjustArrayStcd(downloadDataStcd,outshow_sttp);

    if (json.length == 0) {
        return;
    }
    
    var tmpdata = json[0];
    json.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
    };
    
    var tmpdata = [];//用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hfStcd").href = href; //绑定a标签
    document.getElementById("hfStcd").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    tmpDown = "";
};
/**
 * 单站表数据处理
 */
function adjustArrayStcd(data,type){
    var newData = new Array();
    var _newData = new Array();
    for (var i = 0; i < data.length; i++) {
        //规定顺序
        if (type == "ZZ") {
            newData[i] = {
                "TM": "",
                "Z": "",
                "Q": "",
                "Zs": "",
                "Qs": "",
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = JSON.parse(JSON.stringify(newData[i]).replace(/TM/,"时间").replace(/Z/,"水位").replace(/Q/,"流量").replace(/Zs/,"预报水位")
                .replace(/Qs/,"预报流量"));
        };
        if (type == "RR") {
            newData[i] = {
                "TM": "",
                "Z": "",
                "Q": "",
                "Qs": "",
                "Zs": "",
                "Qin": ""
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = JSON.parse(JSON.stringify(newData[i]).replace(/TM/,"时间").replace(/Z/,"水位").replace(/Q/,"入库流量").replace(/Qs/,"出库流量").replace(/Zs/,"预报水位")
                .replace(/Qin/,"预报流量"));
        };
    };
    return _newData;
}

function importExl(){
    $("#importExcel").click();
};
/**
 * 单站表数据导入
 */
function importf(obj){
    //console.log(obj);
    //alert("!!!");
    let jsono;
    if (!obj.files) {
        $("#importExcel").val('');
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e){
        var data = e.target.result;
        if(rABS){
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        }else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        jsono = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        data1 ={
            data: adjustArrayStcdRev(jsono,outshow_sttp)
        };
        //$.each(data1.data,function (index, item){
        //    item.TM = item.TM == "" ? "" : moment(item.TM).format("YYYY-MM-DD HH:mm");
        //});
        tools_panel.create_table_sqxx(data1);
        tools_panel.update_ybsw_option();
        tools_panel.update_ybll_option();
        tools_panel.reflashDragPoint(1);
        //data1 = jsono;
        //fillTable();
        $("#importExcel").val('');
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }


}
/**
 * 单站表导入数据处理
 */
function adjustArrayStcdRev(data,type){
    var newData = new Array();
    var _newData = new Array();
    for (var i = 0; i < data.length; i++) {
        //规定顺序
        if (type == "ZZ") {
            newData[i] = {
                "时间": "",
                "水位": "",
                "流量": "",
                "预报水位": "",
                "预报流量": "",
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = JSON.parse(JSON.stringify(newData[i]).replace(/时间/,"TM").replace(/水位/,"Z").replace(/流量/,"Q").replace(/预报水位/,"Zs")
                .replace(/预报流量/,"Qs"));
        };
        if (type == "RR") {
            newData[i] = {
                "时间": "",
                "水位": "",
                "入库流量": "",
                "出库流量": "",
                "预报水位": "",
                "预报流量": ""
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = JSON.parse(JSON.stringify(newData[i]).replace(/时间/,"TM").replace(/水位/,"Z").replace(/入库流量/,"Q").replace(/出库流量/,"Qs").replace(/预报水位/,"Zs")
                .replace(/预报流量/,"Qin"));
        };
    }
    return _newData;
}

/**
 * 报表统计数据导出
 */
function downloadExl_bbtj(json_data){
    var type = "xlsx";
    var downloadData = "";
    var dataStyle = "";
    var json = "";
    var searchStime = $("#beginTime").val() + ":00";
    var searchEtime = $("#endTime").val() + ":00";

    //downloadData = json_data.statis;
    downloadData = JSON.parse(JSON.stringify(json_data.statis));
    downloadData.unshift(json_data.statisName);
    json = adjustArray_bbtj(downloadData);
    var json_tiem = {
        "控制断面": "预报起止时间:" +  searchStime + " — " + searchEtime,
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null
    }
    json.unshift(json_tiem);
    var json_title = {
        "控制断面": "流域各片产汇流总表",
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null
    }
    json.unshift(json_title);
    
    var keyMap = []; //获取keys
    keyMap = downloadData[0];

    var tmpdata = [];//用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['流域各片产汇流总表'], //保存的表标题
        Sheets: {
            '流域各片产汇流总表': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], //设置填充区域
                    '!merges':[{s: {r: 0, c: 0}, e: {r: 0, c: 7}},
                               {s: {r: 1, c: 0}, e: {r: 1, c: 7}}           
                    ], //合并单元格
                    '!cols':[
                        {wpx: 65},
                        {wpx: 110},
                        {wpx: 90},
                        {wpx: 80},
                        {wpx: 60},
                        {wpx: 80},
                        {wpx: 120},
                        {wpx: 80},
                    ]
                })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hf_bbtj").href = href; //绑定a标签
    document.getElementById("hf_bbtj").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    tmpDown = "";
};
/**
 * 报表统计数据导出数据处理
 */
function adjustArray_bbtj(data){
    var newData = new Array();
    var _newData = new Array();

    for (var i = 0; i < data.length; i++) {
        //规定顺序
        newData[i] = {
            "0": "",
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": ""
        };
        for (var key in newData[i]) {
            newData[i][key] = data[i][key];
        };
        //转换key
        _newData[i] = toChsKeys(data[i], newData[0]);
    };
    return _newData;
};

/**
 * 产流系数数据导出
 */
function downloadExl_clxs(json_data,show_name){
    var type = "xlsx";
    var downloadData = "";
    var json = "";
    var tjdownloadData = new Array();
    var tjJson = "";
    //var sheet_name = show_name + "产流系数数据表";

    //downloadData = json_data.statis;
    downloadData = JSON.parse(JSON.stringify(json_data.ValueForTable));
    downloadData.unshift(json_data.TableName);
    json = adjustArray_clxs(downloadData,"detail");

    tjdownloadData.unshift(json_data.tjValue);;
    tjdownloadData.unshift(json_data.tjName);
    tjJson = adjustArray_clxs(tjdownloadData,"tj");
    
    var keyMap = []; //获取keys
    keyMap = downloadData[0];

    var tjkeyMap = []; //获取keys
    tjkeyMap = tjdownloadData[0];

    var tmpdata = [];//用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });

    var tjtmpdata = [];//用来保存转换好的json 
    tjJson.map((v, i) => tjkeyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tjtmpdata[v.position] = {
        v: v.v
    });

    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10

    var tjoutputPos = Object.keys(tjtmpdata); //设置区域,比如表格从A1到D10

    var tmpWB = {
        SheetNames: ["产流系数数据表",'特征统计'], //保存的表标题
        Sheets: {
            "产流系数数据表": Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], //设置填充区域
                }),
            '特征统计': Object.assign({},
                tjtmpdata, //内容
                {
                    '!ref': tjoutputPos[0] + ':' + tjoutputPos[tjoutputPos.length - 1], //设置填充区域
                })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("hf_clxs").href = href; //绑定a标签
    document.getElementById("hf_clxs").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    tmpDown = "";
};
/**
 * 产流系数数据导出数据处理
 */
function adjustArray_clxs(data,type){
    var newData = new Array();
    var _newData = new Array();
    if (type == "detail") {
        for (var i = 0; i < data.length; i++) {
            //规定顺序
            newData[i] = {
                "0": "",
                "1": "",
                "2": "",
                "3": "",
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = toChsKeys(data[i], newData[0]);
        };
    }else if(type == "tj"){
        for (var i = 0; i < data.length; i++) {
            //规定顺序
            newData[i] = {
                "0": "",
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": "",
                "10": ""
            };
            for (var key in newData[i]) {
                newData[i][key] = data[i][key];
            };
            //转换key
            _newData[i] = toChsKeys(data[i], newData[0]);
        };
    }
    
    return _newData;
}