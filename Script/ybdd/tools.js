/**
 * Tools类构造函数
 * 日志:2019-03-18 HZX新增
 */
var Tools = function () {
    this.pageInit()
};
"use strict";
Tools.prototype = {
    version: "1.0.0",
    userAgent: "",
    scroll_default_width: "17",
    pageInfo: {
        url: "",
        url_top: "",
        title: ""
    },
    //地图实例

    svg_timer: null,
    searchRange: "",
    //地图配置文件
    map_config: {
        //84投影 4326
        EPSG_84: "EPSG:4326",
        //墨卡托投影3857
        EPSG_WM: "EPSG:3857",
        defaultzoom: 17,

        //淮河水系数据
        hhwater: {

            data: [//站码,站名,经度,纬度,站类,旋转角度,是否查询(实况、预报、调度)
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202300", stnm: "石山口", lon: "136.75", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202600", stnm: "五岳", lon: "188", lat: "-442.2", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50203500", stnm: "泼河", lon: "240.5", lat: "-442.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50502400", stnm: "鲇鱼山", lon: "363", lat: "-443.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50500301", stnm: "梅山", lon: "440", lat: "-442.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701301", stnm: "响洪甸", lon: "692.7", lat: "-440.7", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701001", stnm: "佛子岭", lon: "759.65", lat: "-441.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701202", stnm: "白莲崖", lon: "727", lat: "-515.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50700901", stnm: "磨子潭", lon: "792.6", lat: "-516.55", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50302010", stnm: "板桥", lon: "182.2", lat: "-104", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50304900", stnm: "薄山", lon: "247.2", lat: "-103.8", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50300100", stnm: "石漫滩", lon: "307", lat: "-103.5", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50606100", stnm: "燕山", lon: "509.3", lat: "-97.5", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50605800", stnm: "孤石滩", lon: "563.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603200", stnm: "白龟山", lon: "617.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50302400", stnm: "宿鸭湖", lon: "209", lat: "-161.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603000", stnm: "昭平台", lon: "618.5", lat: "-53.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50600300", stnm: "白沙", lon: "725", lat: "-53.7", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50100500", stnm: "息县", lon: "176", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50101100", stnm: "王家坝", lon: "277.5", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50102350", stnm: "润河集", lon: "458.8", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50103000", stnm: "正阳关", lon: "751", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50104200", stnm: "吴家渡", lon: "1232.4", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50301400", stnm: "班台", lon: "247", lat: "-206", sttp: "ZZ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "50604000", stnm: "漯河", lon: "658.8", lat: "-175.7", sttp: "ZZ", show_sttp: "ZZ", ratio: "", search: [true, true, true] },
                { stcd: "50203100", stnm: "潢川", lon: "254.5", lat: "-371.9", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50500900", stnm: "蒋家集", lon: "416.4", lat: "-372.3", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50700300", stnm: "横排头", lon: "741.1", lat: "-394.7", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601930", stnm: "阜阳闸", lon: "741.5", lat: "-251.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601300", stnm: "周口", lon: "741.5", lat: "-171.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50801100", stnm: "亳县闸", lon: "1197.4", lat: "-72", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50801800", stnm: "蒙城闸", lon: "1197.3", lat: "-184", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50301450", stnm: "班台闸", lon: "282", lat: "-216.5", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50401100", stnm: "临淮岗", lon: "613.9", lat: "-312.8", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50403400", stnm: "茨河铺闸", lon: "750.9", lat: "-221.85", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50903420", stnm: "何巷闸", lon: "1198.8", lat: "-223.9", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50103800", stnm: "蚌埠闸", lon: "1196.8", lat: "-313", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "99990001", stnm: "蒙洼", lon: "328.7", lat: "-269.82", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990003", stnm: "城西湖", lon: "510.8", lat: "-357.6", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990005", stnm: "城东湖", lon: "671.85", lat: "-357.5", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990006", stnm: "瓦埠湖", lon: "881.2", lat: "-355.8", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990002", stnm: "南润段", lon: "412.7", lat: "-283", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990004", stnm: "邱家湖", lon: "563", lat: "-284.6", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990007", stnm: "姜唐湖", lon: "669.7", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },

                { stcd: "99990007", stnm: "姜唐湖(进)", lon: "669.7", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990021", stnm: "姜唐湖(退)", lon: "669.7", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },

                { stcd: "99990008", stnm: "寿西湖", lon: "806", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990009", stnm: "董峰湖", lon: "886.6", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990010", stnm: "六坊堤", lon: "970.3", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990012", stnm: "汤渔湖", lon: "1050.5", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990013", stnm: "荆山湖", lon: "1134.4", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990014", stnm: "方邱湖", lon: "1289", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990015", stnm: "临北段", lon: "1330.9", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990016", stnm: "花园湖", lon: "1374", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990017", stnm: "香浮段", lon: "1453", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990018", stnm: "潘村洼", lon: "1529", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990019", stnm: "鲍集圩", lon: "1549.9", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "50916500", stnm: "洪泽湖", lon: "1636.9", lat: "-312.9", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },
                { stcd: "50100100", stnm: "大坡岭", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50100300", stnm: "长台关", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50202200", stnm: "竹竿铺", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50203900", stnm: "北庙集", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50203900", stnm: "杨庄", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50300500", stnm: "桂李", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50300700", stnm: "五沟营", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50101500", stnm: "南照集", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50600030", stnm: "杨桥闸", sttp: "DD", show_sttp: "ZZ" },
                { stcd: "50600700", stnm: "化行闸", sttp: "DD", show_sttp: "ZZ" },
                { stcd: "50601140", stnm: "黄桥闸", sttp: "DD", show_sttp: "ZZ" },
                { stcd: "50603600", stnm: "马湾", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50604000", stnm: "紫罗山", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50604900", stnm: "汝州", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50605200", stnm: "大陈闸", sttp: "DD", show_sttp: "ZZ" },
                { stcd: "50606000", stnm: "何口", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50607000", stnm: "扶沟", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50103300", stnm: "凤台", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50103500", stnm: "淮南", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50401575", stnm: "焦岗湖闸下", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50403600", stnm: "插花闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50403800", stnm: "阚町闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50404000", stnm: "上桥闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50800600", stnm: "玄武闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50802100", stnm: "大王庙", sttp: "ZZ" },
                { stcd: "50802700", stnm: "砖桥闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50104300", stnm: "临淮关", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50104500", stnm: "五河", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50104600", stnm: "浮山", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50104700", stnm: "小柳巷", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50407000", stnm: "明光", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50900600", stnm: "临涣集", sttp: "DD", show_sttp: "DD" },
                { stcd: "50901400", stnm: "固镇闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50902350", stnm: "双沟", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50903540", stnm: "西坝口闸", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50907400", stnm: "永城闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50908000", stnm: "宿县闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50912200", stnm: "浍塘沟闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "50912900", stnm: "泗洪新", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50914700", stnm: "泗洪老", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50914900", stnm: "金锁镇", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "50100250", stnm: "出山店", sttp: "RR", show_sttp: "RR", search: [true, true, true] },
                { stcd: "51002650", stnm: "三河闸", sttp: "DD", show_sttp: "DD", search: [true, false, true] },
                { stcd: "51110300", stnm: "二河闸", sttp: "DD", show_sttp: "DD", search: [true, false, true] },
                { stcd: "50301409", stnm: "班台大洪河", sttp: "DD", show_sttp: "DD" },
                { stcd: "50403400", stnm: "茨淮新河", sttp: "DD", show_sttp: "DD" },
            ]
        },

        //王家坝以上数据
        wjb_up: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202300", stnm: "石山口", lon: "136.75", lat: "-441.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202600", stnm: "五岳", lon: "188", lat: "-442.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50203500", stnm: "泼河", lon: "240.5", lat: "-442.4", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50302010", stnm: "板桥", lon: "182.2", lat: "-104", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50304900", stnm: "薄山", lon: "247.2", lat: "-103.8", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50300100", stnm: "石漫滩", lon: "307", lat: "-103", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50302400", stnm: "宿鸭湖", lon: "209", lat: "-161.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50100500", stnm: "息县", lon: "171.8", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50101100", stnm: "王家坝", lon: "277.45", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50301400", stnm: "班台", lon: "246.9", lat: "-197.4", sttp: "ZZ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "50203100", stnm: "潢川", lon: "254.5", lat: "-372", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50301450", stnm: "班台闸", lon: "281.55", lat: "-202.8", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "99990001", stnm: "蒙洼", lon: "328.7", lat: "-269.72", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "50100100 ", stnm: "大坡岭", sttp: "ZZ" },
                { stcd: "50100300 ", stnm: "长台关", sttp: "ZZ" },
                { stcd: "50202200 ", stnm: "竹竿铺", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "北庙集", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "杨庄", sttp: "ZZ" },
                { stcd: "50300500 ", stnm: "桂李", sttp: "ZZ" },
                { stcd: "50300700 ", stnm: "五沟营", sttp: "ZZ" },
                { stcd: "50103000", stnm: "出山店", sttp: "RR", show_sttp: "RR", search: [true, true, true] },
            ]
        },

        //润河集以上数据
        rhj_up: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202300", stnm: "石山口", lon: "136.75", lat: "-441.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202600", stnm: "五岳", lon: "188", lat: "-442.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50203500", stnm: "泼河", lon: "240.5", lat: "-442.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50502400", stnm: "鲇鱼山", lon: "363", lat: "-443.35", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50500301", stnm: "梅山", lon: "440", lat: "-442.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50302010", stnm: "板桥", lon: "182.2", lat: "-104", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50304900", stnm: "薄山", lon: "247.2", lat: "-103.8", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50300100", stnm: "石漫滩", lon: "307", lat: "-103", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50302400", stnm: "宿鸭湖", lon: "209", lat: "-161.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50100500", stnm: "息县", lon: "167.2", lat: "-298.5", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50101100", stnm: "王家坝", lon: "277.5", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50102350", stnm: "润河集", lon: "458.8", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50301400", stnm: "班台", lon: "246.9", lat: "-197.5", sttp: "ZZ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "50203100", stnm: "潢川", lon: "254.5", lat: "-372", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50500900", stnm: "蒋家集", lon: "416.4", lat: "-372.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50301450", stnm: "班台闸", lon: "281.55", lat: "-202.8", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "99990001", stnm: "蒙洼", lon: "327.6", lat: "-269.72", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990002", stnm: "南润段", lon: "411.6", lat: "-283", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "50100100 ", stnm: "大坡岭", sttp: "ZZ" },
                { stcd: "50100300 ", stnm: "长台关", sttp: "ZZ" },
                { stcd: "50202200 ", stnm: "竹竿铺", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "北庙集", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "杨庄", sttp: "ZZ" },
                { stcd: "50300500 ", stnm: "桂李", sttp: "ZZ" },
                { stcd: "50300700 ", stnm: "五沟营", sttp: "ZZ" },
                { stcd: "50101500 ", stnm: "南照集", sttp: "ZZ" },
                { stcd: "50103000", stnm: "出山店", sttp: "RR", show_sttp: "RR", search: [true, true, true] },
            ]
        },

        //正阳关以上数据
        zyg_up: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202300", stnm: "石山口", lon: "136.75", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202600", stnm: "五岳", lon: "188", lat: "-442.1", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50203500", stnm: "泼河", lon: "240.5", lat: "-442.4", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50502400", stnm: "鲇鱼山", lon: "363", lat: "-443.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50500301", stnm: "梅山", lon: "440", lat: "-442.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701301", stnm: "响洪甸", lon: "692.7", lat: "-440.7", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701001", stnm: "佛子岭", lon: "759.7", lat: "-441.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701202", stnm: "白莲崖", lon: "727", lat: "-515.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50700901", stnm: "磨子潭", lon: "792.6", lat: "-516.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50302010", stnm: "板桥", lon: "182.2", lat: "-104", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50304900", stnm: "薄山", lon: "247.2", lat: "-103.8", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50300100", stnm: "石漫滩", lon: "307", lat: "-103", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50606100", stnm: "燕山", lon: "509.3", lat: "-97.5", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50605800", stnm: "孤石滩", lon: "563.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603200", stnm: "白龟山", lon: "617.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50302400", stnm: "宿鸭湖", lon: "209", lat: "-161.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603000", stnm: "昭平台", lon: "618.5", lat: "-53.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50600300", stnm: "白沙", lon: "725", lat: "-53.7", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50100500", stnm: "息县", lon: "168.1", lat: "-298.3", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50101100", stnm: "王家坝", lon: "277.5", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50102350", stnm: "润河集", lon: "458.8", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50103000", stnm: "正阳关", lon: "751", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50301400", stnm: "班台", lon: "246.9", lat: "-197.4", sttp: "ZZ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "50604000", stnm: "漯河", lon: "659", lat: "-175.5", sttp: "ZZ", show_sttp: "ZZ", ratio: "", search: [true, true, true] },
                { stcd: "50203100", stnm: "潢川", lon: "254.5", lat: "-372", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50500900", stnm: "蒋家集", lon: "416.4", lat: "-372.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50700300", stnm: "横排头", lon: "740.8", lat: "-394.7", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601930", stnm: "阜阳闸", lon: "741.5", lat: "-251.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601300", stnm: "周口", lon: "741.5", lat: "-171.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50301450", stnm: "班台闸", lon: "281.55", lat: "-203.4", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50401100", stnm: "临淮岗", lon: "614.8", lat: "-313.2", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50403400", stnm: "茨河铺闸", lon: "750.92", lat: "-222", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "99990001", stnm: "蒙洼", lon: "328.7", lat: "-269.72", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990003", stnm: "城西湖", lon: "510.8", lat: "-357.5", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990005", stnm: "城东湖", lon: "671.6", lat: "-357.4", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990008", stnm: "寿西湖", lon: "825.6", lat: "-330.4", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990009", stnm: "瓦埠湖", lon: "929.6", lat: "-359.4", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990002", stnm: "南润段", lon: "412.7", lat: "-283.3", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990004", stnm: "邱家湖", lon: "563", lat: "-285", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990007", stnm: "姜唐湖", lon: "669.72", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "50100100 ", stnm: "大坡岭", sttp: "ZZ" },
                { stcd: "50100300 ", stnm: "长台关", sttp: "ZZ" },
                { stcd: "50202200 ", stnm: "竹竿铺", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "北庙集", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "杨庄", sttp: "ZZ" },
                { stcd: "50300500 ", stnm: "桂李", sttp: "ZZ" },
                { stcd: "50300700 ", stnm: "五沟营", sttp: "ZZ" },
                { stcd: "50101500 ", stnm: "南照集", sttp: "ZZ" },
                { stcd: "50600030 ", stnm: "杨桥闸", sttp: "DD" },
                { stcd: "50600700 ", stnm: "化行闸", sttp: "DD" },
                { stcd: "50601140 ", stnm: "黄桥闸", sttp: "DD" },
                { stcd: "50603600 ", stnm: "马湾", sttp: "ZZ" },
                { stcd: "50604000 ", stnm: "紫罗山", sttp: "ZZ" },
                { stcd: "50604900 ", stnm: "汝州", sttp: "ZZ" },
                { stcd: "50605200", stnm: "大陈闸", sttp: "DD" },
                { stcd: "50606000", stnm: "何口", sttp: "ZZ" },
                { stcd: "50607000", stnm: "扶沟", sttp: "ZZ" },
                { stcd: "50103000", stnm: "出山店", sttp: "RR", show_sttp: "RR", search: [true, true, true] },
            ]
        },

        //吴家渡以上数据
        wjd_up: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202300", stnm: "石山口", lon: "136.75", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50202600", stnm: "五岳", lon: "188", lat: "-442.1", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50203500", stnm: "泼河", lon: "240.5", lat: "-442.2", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50502400", stnm: "鲇鱼山", lon: "363", lat: "-443.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50500301", stnm: "梅山", lon: "440", lat: "-442.6", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701301", stnm: "响洪甸", lon: "692.7", lat: "-440.7", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701001", stnm: "佛子岭", lon: "759.7", lat: "-441.3", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50701202", stnm: "白莲崖", lon: "727", lat: "-515.5", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50700901", stnm: "磨子潭", lon: "792.6", lat: "-517", sttp: "RR", show_sttp: "RR", ratio: "66", search: [true, true, true] },
                { stcd: "50302010", stnm: "板桥", lon: "182.2", lat: "-104", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50304900", stnm: "薄山", lon: "247.2", lat: "-103.8", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50300100", stnm: "石漫滩", lon: "307", lat: "-103", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50606100", stnm: "燕山", lon: "509.3", lat: "-97.5", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50605800", stnm: "孤石滩", lon: "563.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603200", stnm: "白龟山", lon: "617.7", lat: "-97", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50302400", stnm: "宿鸭湖", lon: "209", lat: "-161.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50603000", stnm: "昭平台", lon: "618.5", lat: "-53.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50600300", stnm: "白沙", lon: "725", lat: "-53.7", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "50100500", stnm: "息县", lon: "172", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50101100", stnm: "王家坝", lon: "277.5", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50102350", stnm: "润河集", lon: "458.8", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50103000", stnm: "正阳关", lon: "751", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50104200", stnm: "吴家渡", lon: "1262.5", lat: "-298", sttp: "ZZ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "50301400", stnm: "班台", lon: "247", lat: "-203.8", sttp: "ZZ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "50604000", stnm: "漯河", lon: "659", lat: "-175.7", sttp: "ZZ", show_sttp: "ZZ", ratio: "", search: [true, true, true] },
                { stcd: "50203100", stnm: "潢川", lon: "254.5", lat: "-372", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50500900", stnm: "蒋家集", lon: "416.4", lat: "-372.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50700300", stnm: "横排头", lon: "741.1", lat: "-394.7", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601930", stnm: "阜阳闸", lon: "741.5", lat: "-251.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50601300", stnm: "周口", lon: "741.5", lat: "-171.2", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50801100", stnm: "亳县闸", lon: "1197.4", lat: "-72", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50801800", stnm: "蒙城闸", lon: "1197.3", lat: "-184", sttp: "ZZ", show_sttp: "ZZ", ratio: "99", search: [true, true, true] },
                { stcd: "50301450", stnm: "班台闸", lon: "282", lat: "-214.5", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50401100", stnm: "临淮岗", lon: "613.8", lat: "-313.1", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50403400", stnm: "茨河铺闸", lon: "750.9", lat: "-222", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50903420", stnm: "何巷闸", lon: "1198.8", lat: "-223.9", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "50103800", stnm: "蚌埠闸", lon: "1196.8", lat: "-313", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "99990001", stnm: "蒙洼", lon: "328.5", lat: "-269.72", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990003", stnm: "城西湖", lon: "511", lat: "-357.5", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990005", stnm: "城东湖", lon: "671.2", lat: "-357.5", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990006", stnm: "瓦埠湖", lon: "881.3", lat: "-356", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "99990002", stnm: "南润段", lon: "412.5", lat: "-283.3", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990004", stnm: "邱家湖", lon: "563", lat: "-285", sttp: "XX", show_sttp: "XX", ratio: "", type: "small", search: [false, false, true] },
                { stcd: "99990007", stnm: "姜唐湖", lon: "669.7", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990008", stnm: "寿西湖", lon: "806", lat: "-332", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "66", search: [false, false, true] },
                { stcd: "99990009", stnm: "董峰湖", lon: "886.7", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990010", stnm: "六坊堤", lon: "970.3", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990012", stnm: "汤渔湖", lon: "1050.6", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "99990013", stnm: "荆山湖", lon: "1134.4", lat: "-294.2", sttp: "XX", show_sttp: "XX_CIRCLE", ratio: "", search: [false, false, true] },
                { stcd: "50100100 ", stnm: "大坡岭", sttp: "ZZ" },
                { stcd: "50100300 ", stnm: "长台关", sttp: "ZZ" },
                { stcd: "50202200 ", stnm: "竹竿铺", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "北庙集", sttp: "ZZ" },
                { stcd: "50203900 ", stnm: "杨庄", sttp: "ZZ" },
                { stcd: "50300500 ", stnm: "桂李", sttp: "ZZ" },
                { stcd: "50300700 ", stnm: "五沟营", sttp: "ZZ" },
                { stcd: "50101500 ", stnm: "南照集", sttp: "ZZ" },
                { stcd: "50600030 ", stnm: "杨桥闸", sttp: "DD" },
                { stcd: "50600700 ", stnm: "化行闸", sttp: "DD" },
                { stcd: "50601140 ", stnm: "黄桥闸", sttp: "DD" },
                { stcd: "50603600 ", stnm: "马湾", sttp: "ZZ" },
                { stcd: "50604000 ", stnm: "紫罗山", sttp: "ZZ" },
                { stcd: "50604900 ", stnm: "汝州", sttp: "ZZ" },
                { stcd: "50605200", stnm: "大陈闸", sttp: "DD" },
                { stcd: "50606000", stnm: "何口", sttp: "ZZ" },
                { stcd: "50607000", stnm: "扶沟", sttp: "ZZ" },
                { stcd: "50103300 ", stnm: "凤台", sttp: "ZZ" },
                { stcd: "50103500", stnm: "淮南", sttp: "ZZ" },
                { stcd: "50401575", stnm: "焦岗湖闸下", sttp: "ZZ" },
                { stcd: "50403600", stnm: "插花闸", sttp: "DD" },
                { stcd: "50403800", stnm: "阚町闸", sttp: "DD" },
                { stcd: "50404000", stnm: "上桥闸", sttp: "DD" },
                { stcd: "50800600", stnm: "玄武闸", sttp: "DD" },
                { stcd: "50802100", stnm: "大王庙", sttp: "ZZ" },
                { stcd: "50802700", stnm: "砖桥闸", sttp: "DD" },
                { stcd: "50103000", stnm: "出山店", sttp: "RR", show_sttp: "RR", search: [true, true, true] },
            ]
        },

        //沂沭泗水系数据
        yss: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "51110700", stnm: "沙沟", lon: "549.7", lat: "-45.1", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51111000", stnm: "青峰岭", lon: "549.7", lat: "-92.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51114600", stnm: "小仕阳", lon: "611.1", lat: "-92.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51114800", stnm: "陡山", lon: "687.9", lat: "-93.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51111750", stnm: "重沟", lon: "617.2", lat: "-264.2", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51112710", stnm: "大官庄", lon: "617.2", lat: "-302.4", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51112101", stnm: "石梁河", lon: "769.1", lat: "-309.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51102701", stnm: "沭阳", lon: "655.5", lat: "-495.9", sttp: "ZQ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "51113400", stnm: "新安", lon: "617.2", lat: "-404.9", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },

                { stcd: "51111911", stnm: "新沭河闸", lon: "676.9", lat: "-311.0", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51105811", stnm: "彭家道口闸", lon: "409.4", lat: "-287.9", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51112711", stnm: "人民胜利堰闸", lon: "635.1", lat: "-344.0", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },

                { stcd: "51105200", stnm: "许家崖", lon: "275.5", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51104700", stnm: "唐村", lon: "328.2", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51100100", stnm: "田庄", lon: "474.2", lat: "-45.9", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51100300", stnm: "跋山", lon: "474.2", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51103400", stnm: "岸堤", lon: "415.5", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51101101", stnm: "临沂", lon: "363.6", lat: "-262", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51101800", stnm: "塂上", lon: "365", lat: "-421.8", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51101201", stnm: "刘家道口闸", lon: "380.8", lat: "-304.8", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },
                { stcd: "51106001", stnm: "江风口闸", lon: "348.7", lat: "-361.5", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },

                { stcd: "51207800", stnm: "尼山", lon: "46.3", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208300", stnm: "西苇", lon: "96.7", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208400", stnm: "马河", lon: "149.1", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208600", stnm: "岩马", lon: "200.9", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51203801", stnm: "韩庄闸", lon: "122.9", lat: "-311.8", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },
                { stcd: "51201601", stnm: "上级湖", lon: "121.6", lat: "-161.7", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },
                { stcd: "51203401", stnm: "下级湖", lon: "121.9", lat: "-256.9", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },

                { stcd: "51107809", stnm: "黄墩湖", lon: "279.4", lat: "-480.7", sttp: "XX", show_sttp: "XX", ratio: "", search: [false, false, true] },
                { stcd: "51202701 ", stnm: "二级坝闸", lon: "122.9", lat: "-211.0", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },

                { stcd: "51300100", stnm: "日照", lon: "769.1", lat: "-191.1", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51300601", stnm: "小塔山", lon: "769.1", lat: "-248.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51114500", stnm: "安峰山", lon: "769.1", lat: "-375.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },


                { stcd: "51209900", stnm: "会宝岭", lon: "196.1", lat: "-320.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51205100", stnm: "运河镇", lon: "107", lat: "-426", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51107801", stnm: "骆马湖", lon: "380", lat: "-512.7", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },
                { stcd: "51102600", stnm: "嶂山闸", lon: "441.9", lat: "-511.7", sttp: "DD", show_sttp: "DD", ratio: "66", search: [true, true, true] },

                { stcd: "51100801", stnm: "葛沟", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51103400", stnm: "姜庄湖", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51111501", stnm: "石拉渊", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51113400", stnm: "新安", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51200301", stnm: "后营", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51206801", stnm: "黄庄", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51207201", stnm: "书院", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51208001", stnm: "马楼", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51208701", stnm: "滕州", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51209011", stnm: "柴胡店", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51211501", stnm: "梁山闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51213201", stnm: "孙庄", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51213801", stnm: "鱼台", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51214301", stnm: "丰县闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51215101", stnm: "沛城闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51107801", stnm: "洋河滩闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51205501", stnm: "皂河闸", sttp: "DD", show_sttp: "DD" },

            ]
        },

        //沂河数据
        yss_yh: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "51105200", stnm: "许家崖", lon: "275.5", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51104700", stnm: "唐村", lon: "328.2", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51100100", stnm: "田庄", lon: "474.2", lat: "-45.9", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51100300", stnm: "跋山", lon: "474.2", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51103400", stnm: "岸堤", lon: "415.5", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51101101", stnm: "临沂", lon: "363.6", lat: "-262", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51101800", stnm: "塂上", lon: "365", lat: "-395.8", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51101201", stnm: "刘家道口闸", lon: "380.8", lat: "-304.8", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },
                { stcd: "51105811", stnm: "彭家道口闸", lon: "409.4", lat: "-287.9", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51106001", stnm: "江风口闸", lon: "349.5", lat: "-336", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51100801", stnm: "葛沟", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51103400", stnm: "姜庄湖", sttp: "ZZ", show_sttp: "ZZ" },
            ]
        },

        //沭河数据
        yss_sh: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "51110700", stnm: "沙沟", lon: "549.7", lat: "-45.1", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51111000", stnm: "青峰岭", lon: "549.7", lat: "-92.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51114600", stnm: "小仕阳", lon: "611.1", lat: "-92.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51114800", stnm: "陡山", lon: "687.9", lat: "-93.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51111750", stnm: "重沟", lon: "617.2", lat: "-264.2", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51112710", stnm: "大官庄", lon: "617.2", lat: "-302.4", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51112101", stnm: "石梁河", lon: "769.1", lat: "-309.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51102701", stnm: "沭阳", lon: "655.5", lat: "-495.9", sttp: "ZQ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },

                { stcd: "51111911", stnm: "新沭河闸", lon: "676.9", lat: "-311.0", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51105811", stnm: "彭家道口闸", lon: "409.4", lat: "-287.9", sttp: "DD", show_sttp: "DD", ratio: "", search: [true, false, true] },
                { stcd: "51112711", stnm: "人民胜利堰闸", lon: "635.1", lat: "-344.0", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },
                { stcd: "51111501", stnm: "石拉渊", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51113400", stnm: "新安", lon: "617.2", lat: "-404.9", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
            ]
        },

        //南四湖数据
        yss_nsh: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "51207800", stnm: "尼山", lon: "46.3", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208300", stnm: "西苇", lon: "96.7", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208400", stnm: "马河", lon: "149.1", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51208600", stnm: "岩马", lon: "200.9", lat: "-91.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51203801", stnm: "韩庄闸", lon: "122.9", lat: "-311.8", sttp: "DD", show_sttp: "DD", ratio: "99", search: [true, false, true] },
                { stcd: "51201601", stnm: "上级湖", lon: "121.6", lat: "-161.7", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },
                { stcd: "51203401", stnm: "下级湖", lon: "121.9", lat: "-256.9", sttp: "HP", show_sttp: "HP", ratio: "", search: [true, true, true] },
                { stcd: "51200301", stnm: "后营", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51206801", stnm: "黄庄", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51207201", stnm: "书院", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51208001", stnm: "马楼", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51208701", stnm: "滕州", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51209011", stnm: "柴胡店", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51211501", stnm: "梁山闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51213201", stnm: "孙庄", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51213801", stnm: "鱼台", sttp: "ZZ", show_sttp: "ZZ" },
                { stcd: "51214301", stnm: "丰县闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51215101", stnm: "沛城闸", sttp: "DD", show_sttp: "DD" }

            ]
        },

        //骆马湖数据
        yss_lmh: {

            data: [             //站码,站名,经度,纬度,站类,旋转角度
                { stcd: "50201800", stnm: "南湾", lon: "84.7973", lat: "-441.5", sttp: "RR", show_sttp: "RR", ratio: "66" },
                { stcd: "51102701", stnm: "沭阳", lon: "655.5", lat: "-495.9", sttp: "ZQ", show_sttp: "ZZ", ratio: "66", search: [true, true, true] },
                { stcd: "51102600", stnm: "嶂山闸", lon: "441.9", lat: "-511.7", sttp: "DD", show_sttp: "DD", ratio: "66", search: [true, true, true] },
                { stcd: "51107801", stnm: "洋河滩闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51205501", stnm: "皂河闸", sttp: "DD", show_sttp: "DD" },
                { stcd: "51112101", stnm: "石梁河", lon: "769.1", lat: "-309.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51114500", stnm: "安峰山", lon: "769.1", lat: "-375.6", sttp: "RR", show_sttp: "RR", ratio: "99", search: [true, true, true] },
                { stcd: "51205100", stnm: "运河镇", lon: "107", lat: "-426", sttp: "ZQ", show_sttp: "ZZ", ratio: "33", search: [true, true, true] },
                { stcd: "51209900", stnm: "会宝岭", lon: "196.1", lat: "-320.6", sttp: "RR", show_sttp: "RR", ratio: "", search: [true, true, true] },
                { stcd: "51300100", stnm: "日照", sttp: "RR", show_sttp: "RR" },
                { stcd: "51300601", stnm: "小塔山", sttp: "RR", show_sttp: "RR" },
            ]
        }
    },



    /**
     * 类初始化
     */
    pageInit: function () {
        var that = this;
        this.userAgent = navigator.userAgent
        that.scroll_default_width = (navigator.userAgent.indexOf("MSIE") > -1 || !!window.ActiveXObject || "ActiveXObject" in window) ? 17 : 8;
        this.pageInfo.url = window.location.href.toLowerCase();
        this.pageInfo.url_top = document.referrer;
        this.pageInfo.title = document.title;

    },

    /**
     * 加载Html文档
     */
    ModuleLoad: function (element, url, callback, condition) {
        if (!element || !url) return;
        if (condition != undefined && !condition)
            return;
        var $element = $(element);
        if ($element.length == 0) {
            var contentHtml = "<div ";
            if (element.length == 0) return;
            var flag = element.substr(0, 1);
            var name = element.substr(1);
            if (flag == "#") contentHtml += " id='" + name + "'></div>";
            else if (flag == ".") contentHtml += " class='" + name + "'></div>";
            else contentHtml += " name='" + element + "'></div>";
            $("body").append(contentHtml);
            $element = $(element)
        }
        url += "?ver=" + Math.random();
        var that = this;
        $element.load(url, function () {
            if (!!callback) callback()
        })
    },


    /**
   * 绘制热区
   */
    draw_layer: function (range, show_type, json, mode_name, svgid, process_type) {

        var that = this;
        var svgDocument = document.getElementById(svgid).getSVGDocument();
        var wait = false;
        var svgWnd = null;
        if ((svgDocument == null) || (svgDocument == undefined)) {
            wait = true;

        }
        else {
            svgWnd = svgDocument.svgWnd;
            if ((svgWnd == null) || (svgWnd == undefined)) {
                wait = true;

            }
        }

        if (!wait) {
            svgWnd.initClass(json, mode_name, process_type);
        }
        else {
            clearInterval(that.svg_timer);
            that.svg_timer = setInterval(function () {
                var svgDocument_new = document.getElementById(svgid).getSVGDocument();
                if ((svgDocument_new != null) || (svgDocument_new != undefined)) {
                    var svgWnd_new = svgDocument_new.svgWnd;
                    if ((svgWnd_new != null) || (svgWnd_new != undefined)) {
                        svgWnd_new.initClass(json, mode_name, process_type);
                        clearInterval(that.svg_timer);
                    }

                }

            }, 1000);
        }




        //  alert($('svg').html());
        //   $('svg').html($('svg').html());
        //      svgWnd.refreshHtml();

    },
    /**
* 绘制vip
*/
    draw_vip: function (range, show_type, json) {
        var that = this;
        draw_vip_info(range, show_type, json);
        /*if (that.get_vip_state() == "hide") {

            that.hide_vip();
        }
        else if (that.get_vip_state() == "show") {

            that.show_vip();
        }*/
    },
    draw_ybinfo: function (json, ispos) {
        var that = this;
        draw_yb_vip_info(json, ispos);
        /*if (that.get_vip_state() == "hide") {

            that.hide_vip();
        }
        else if (that.get_vip_state() == "show") {

            that.show_vip();
        }*/
    },
    draw_ddinfo: function (json) {
        var that = this;
        draw_dd_vip_info(json);
        /*if (that.get_vip_state() == "hide") {

            that.hide_vip();
        }
        else if (that.get_vip_state() == "show") {

            that.show_vip();
        }*/
    },
    clear_vip: function () {
        return;

        $("[id^='parent-popup-gz-']").remove();
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.clear_vip_line();
    },

    hide_vip: function () {

        $("[id^='parent-popup-gz-']").hide();
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.hide_vip();
    },
    show_vip: function () {

        $("[id^='parent-popup-gz-']").show();
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.show_vip();
    },
    get_vip_state: function () {
        var state = $("input[name='show_hide']:checked").val();
        return state;
    },

    /**
     * Tab切换事件 手动处理
     */
    add_tab_click: function (bodyId) {
        $(bodyId + " .nav a").click(function (e) {
            if ($(this).parent('li').hasClass('active'))
                return;

            //改变标题栏
            $(this).parent('li').siblings('.active:last').removeClass("active");
            $(this).parent('li').addClass("active");

            //获取当前元素ID
            var id = $(this).attr("_data");
            $(id).siblings('.active:last').removeClass("in active");
            $(id).addClass("in active");
        });
    },
    /**
     * 从JSON数组中查找
     */
    get_json_yb: function (json, stcd) {
        if (json == null || json.length == 0)
            return null;

        var obj = null;
        $.each(json.data, function (i, item) {
            if (item.Stcd == stcd) {
                obj = item;
                return false;
            }
        });
        return obj;
    },

    //****************************************************************面板相关通用函数************************************************************//
    //最大zindex
    panelZindexMax: 999,
    panelZindexMin: -999,
    //存储面板数组 面板ID，展示时间
    arrPanelZindex: new Array(),
    /**
     * 当前面板展示在最高层
     */
    showPanelIndex: function (panelId) {
        if (this.arrPanelZindex == null || this.arrPanelZindex.length == 0) {
            this.arrPanelZindex.push(panelId);
            $("#" + panelId).css("z-index", this.panelZindexMax);
            return;
        }

        if (this.arrPanelZindex[this.arrPanelZindex.length - 1] === 'panel_jyzzt' &&
            this.arrPanelZindex[this.arrPanelZindex.length - 2] === 'paneljsyb') {
            return;
        }

        //当前面板已经是最高层 直接返回
        if ($("#" + panelId).css("z-index") == this.panelZindexMax)
            return;

        //生成新的数组
        var len = this.arrPanelZindex.length;
        for (var i = 0; i < len; i++) {
            if (this.arrPanelZindex[i] == panelId) {
                this.arrPanelZindex.splice(i, 1);
                break;
            }
        }
        this.arrPanelZindex.push(panelId);

        //改变原面板中的z-index
        len = this.arrPanelZindex.length;
        for (var i = (len - 1); i >= 0; i--) {
            $("#" + this.arrPanelZindex[i]).css("z-index", this.panelZindexMax - len + i + 1);
        }
    },
    /**
     * 从展示数组中移除
     */
    hidePanelIndex: function (panelId) {
        $("#" + panelId).css("z-index", this.panelZindexMin);
        var len = this.arrPanelZindex.length;
        for (var i = 0; i < len; i++) {
            if (this.arrPanelZindex[i] == panelId) {
                this.arrPanelZindex.splice(i, 1);

                break;
            }
        }
    },
    showChartLoading: function (chart) {
        if (!chart) return null;
        chart.showLoading({
            text: "加载中..."
        });
    },
    hideChartLoading: function (chart) {
        if (!chart) return null;
        chart.hideLoading();
    },
    /**
     * 格式化水位-保留两位小数
     **/
    format_sw: function (val) {

        if (val == "" || val == null || val == undefined)
            return "";

        return (Math.round(Number(val) * 100) / 100).toFixed(2);
    },
    format_sw_new: function (val) {
        if (val < 0) {
            return "";
        }
        if (val == "" || val == null || val == undefined)
            return "";

        return (Math.round(Number(val) * 100) / 100).toFixed(2);
    },
    /**
     * 格式化流量-保留三位有效数字
     **/
    format_ll: function (val) {
        if (val == "" || val == null || val == undefined)
            return "";

        var num = Number(val);
        if (num == 0) {
            return "0";
        }

        if (Math.abs(num) >= 1000) {
            return Math.round((Number((num / 1000).toPrecision(3)) * 1000));
        }
        else {
            return Math.floor(num);
        }
    },
    /**
     * 格式化蓄量（去除0）
     **/
    format_xl: function (val) {
        if (val == "" || val == null || val == undefined)
            return "";

        return Number(val).toString();
    },
    /**
     * 格式化过程线上的ToolTip
     * type 空默认值，“1”为对比分析
     **/
    format_tooltip_chart: function (arr, type) {
        var res = "";
        if (arr == null || arr.length == 0)
            return res;

        var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#000000"></span>';
        var unit;
        var arr_names = new Array();
        //拼接是先加时间
        res = type == "1" ? moment(arr[0].axisValue).format("MM月DD日HH时") : moment(arr[0].axisValue).format("YYYY年MM月DD日HH时");
        for (var i = 0; i < arr.length; i++) {
            var index_exit = arr_names.indexOf(arr[i].seriesName);
            if (index_exit < 0) {
                arr_names.push(arr[i].seriesName);
                if (res != "")
                    res += "</br>";

                unit = "";
                if (arr[i].seriesName.indexOf("雨量") > -1) {
                    unit = " mm";
                } else if (arr[i].seriesName.indexOf("水位") > -1) {
                    unit = " m";
                } else if (arr[i].seriesName.indexOf("流量") > -1) {
                    unit = " m³/s";
                } else if (arr[i].seriesName.indexOf("蓄量") > -1) {
                    unit = " 百万方";
                } else {
                    unit = " m³/s";
                }

                if (arr[i].seriesName.indexOf("水量") <= -1) {
                    res += dotHtml.replace("#000000", arr[i].color) + arr[i].seriesName + ":" + arr[i].value[1] + unit;
                }
            }


        }

        return res;
    },
    format_tooltip_chart_hgx: function (arr, tm) {
        var res = "";
        if (arr == null || arr.length == 0)
            return res;

        var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#000000"></span>';
        var unit;

        res = arr[0].name + "-" + tm;

        //拼接是先加时间
        for (var i = 0; i < arr.length; i++) {
            res += "</br>";
            unit = "m";
            res += dotHtml.replace("#000000", arr[i].color) + arr[i].seriesName + ":" + arr[i].value + unit;
        }
        return res;
    },
    /**
     * 格式化过程线上的ToolTip
     * type 空默认值，“1”为对比分析
     **/
    format_tooltip_qx: function (arr) {
        var res = "";
        if (arr == null || arr.length == 0)
            return res;

        var that = this;
        var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#000000"></span>';
        res = "当前流量:" + arr[0].axisValue + " m³/s";

        for (var i = 0; i < arr.length; i++) {
            if (res != "")
                res += "</br>";
            unit = "m";
            res += dotHtml.replace("#000000", arr[i].color) + arr[i].seriesName + ":" + that.format_sw(arr[i].value[1]) + unit;
        }
        return res;
    },
    /**
 * 格式化过程线上的ToolTip
 * type 空默认值，“1”为对比分析
 **/
    format_tooltip_zvq: function (arr) {
        var res = "";
        if (arr == null || arr.length == 0)
            return res;

        var that = this;
        var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#000000"></span>';
        res = "当前水位:" + arr[0].axisValue.toFixed(2) + " m³/s";

        for (var i = 0; i < arr.length; i++) {
            if (res != "")
                res += "</br>";

            unit = "";
            if (arr[i].seriesName.indexOf("流量") > -1) {
                unit = " m³/s";
            } else if (arr[i].seriesName.indexOf("蓄水量") > -1) {
                unit = " 百万m³";
            } else {
                unit = " m³/s";
            }


            res += dotHtml.replace("#000000", arr[i].color) + arr[i].seriesName + ":" + that.format_ll(arr[i].value[1]) + unit;

        }

        return res;
    },
    /**
     * 格式化ToolTip位置
     **/
    format_tooltip_position: function (pos, size, offset) {
        var ob = {};
        //鼠标位置+弹出框不超过总宽 显示在右侧
        if ((pos[0] + size.contentSize[0] + offset) < size.viewSize[0]) {
            ob["left"] = pos[0] + offset;
        } else {
            ob["left"] = pos[0] - size.contentSize[0] - offset;
        }

        //高度控制
        if ((pos[1] + size.contentSize[1] + offset) < size.viewSize[1]) {
            ob["top"] = pos[1] + offset;
        } else {
            ob["top"] = pos[1] - size.contentSize[1] - offset;
        }
        return ob;
    },
    /**
     * 二分查找数组中索引
     **/
    binary_arr_gcx: function (arr, time, low, high) {
        var that = this;

        if (low <= high) {
            if (arr[low].value[0] == time)
                return low;
            if (arr[high].value[0] == time)
                return high;
            var mid = Math.ceil((high + low) / 2);
            if (arr[mid].value[0] == time) {
                return mid;
            } else if (moment(arr[mid].value[0]).isAfter(time)) {
                return that.binary_arr_gcx(arr, time, low, mid - 1);
            } else {
                return that.binary_arr_gcx(arr, time, mid + 1, high);
            }
        }
        return -1;
    },
    /**
     * 获取Y轴间隔
     * 思路:以5个刻度区间为主 计算出间隔
     **/
    get_interval: function (min, max) {
        var interval = 0.2;
        if (max == panelConfig.MIN_NUM || min == panelConfig.MAX_NUM)
            return interval;

        //最大值与最小值差值(显示区间取80% 再微调)
        var diff = (max - min) / 4;


        // var difference = max - min;
        // if (difference < .1) {
        //     interval = difference;
        // } else {
        //     var difference1 = (difference + "").split(".")[0];
        //     var effect = difference1.length - 1;
        //     var difference2 = difference / Math.pow(10, effect);
        //     interval = .5;
        //     if (difference2 < .5 && effect > 1) interval = .1;
        //     else if (difference2 < 1) interval = .2;
        //     else if (difference2 < 2) interval = .2;
        //     else if (difference2 < 3) interval = .5;
        //     else if (difference2 < 5) interval = 1;
        //     else if (difference2 < 10) interval = 2;
        //     interval *= Math.pow(10, effect);
        // }

        return interval;
    },

    /**
     * 根据站类缩写 获取站类中文名称
     **/
    getSttpName: function (sttp) {
        var res = "";
        switch (sttp.toUpperCase()) {
            case "MM":
                res = "气象站";
                break;
            case "PP":
                res = "雨量站";
                break;
            case "BB":
                res = "蒸发站";
                break;
            case "ZQ":
                res = "河道水文站";
                break;
            case "DD":
                res = "堰闸水文站";
                break;
            case "ZZ":
                res = "河道水位站";
                break;
            case "TT":
                res = "潮位站";
                break;
            case "RR":
                res = "水库水文站";
                break;
            case "DP":
                res = "泵站";
                break;
            case "ZG":
                res = "地下水站";
                break;
            case "SS":
                res = "墒情站";
                break;
            case "ZB":
                res = "分洪水位站";
                break;
            default:
                res = "未知";
                break;
        }

        return res;
    },
    //****************************************************************面板相关通用函数************************************************************//
    /**
     * ajax调用后台 无参数
     */
    post_webservice: function (url) {
        var returnStr = "";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: false,
            url: url,
            success: function (data) {
                returnStr = data.d;
            }
        })
        return returnStr;
    },
    /**
     * ajax调用后台 传参json
     */
    post_webservice_json: function (paramObj, url) {
        var returnStr = "";
        $.ajax({
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async: false,
            url: url,
            traditional: true,
            data: paramObj,
            success: function (data) {
                returnStr = data.d;
            }
        })
        return returnStr;
    },
    /**
* 取出小括号内的内容
* @param text
* @returns {string}
*/
    getParenthesesStr: function (text) {
        let result = ''
        if ($.isEmptyObject(text))
            return result
        let regex = /\((.+?)\)/g;
        let options = text.match(regex)
        if (!$.isEmptyObject(options)) {
            let option = options[0]
            if (!$.isEmptyObject(option)) {
                result = option.substring(1, option.length - 1)
            }
        }
        return result
    },
    /**
     * 初始化日期控件(daterangepicker)
     */
    get_daterangepicker_option: function (className, format, single) {
        //返回obj
        return {
            bootcssVer: 3,
            showDropdowns: true,
            minYear: 1900,
            maxYear: (Number(moment().year()) + 1),
            timePicker: format.length > 10 ? true : false,
            timePicker12Hour: false,
            timePickerIncrement: 5,
            timePickerSeconds: false,
            singleDatePicker: single,
            format: format,
            locale: {
                separator: ' - '
            },
            ranges: {
                '最近一周': [moment().subtract(7, 'days').format("YYYY-MM-DD 08:00"), moment().format(format)],
                '最近一个月': [moment().subtract(1, 'months').format("YYYY-MM-DD 08:00"), moment().format(format)],
                '最近三个月': [moment().subtract(3, 'months').format("YYYY-MM-DD 08:00"), moment().format(format)],
                '最近六个月': [moment().subtract(6, 'months').format("YYYY-MM-DD 08:00"), moment().format(format)]
            }
        };
    },
    /**
     * 初始化日期控件
     */
    init_datapicker: function (className, format, minView) {
        $(className).datetimepicker({
            language: 'zh-CN',
            format: format,
            weekStart: 1,
            autoclose: true,
            startView: 2,
            todayBtn: true,
            todayHighlight: true,
            minView: minView,
            forceParse: false,
            pickerPosition: 'bottom-right'
        });
    },
    /**
     * 初始化日期控件(弹出向上)
     */
    init_datapicker_top: function (className, format, minView) {
        $(className).datetimepicker({
            language: 'zh-CN',
            format: format,
            weekStart: 1,
            autoclose: true,
            startView: 2,
            todayBtn: true,
            todayHighlight: true,
            minView: minView,
            forceParse: false,
            pickerPosition: 'top-right'
        });
    },
    /**
     * 初始化日期控件（可编辑版本）
     */
    init_datarangepicker: function (className, format) {
        $(className).daterangepicker({
            opens: "right",
            singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 60,
            minDate: "1950-01-01",
            maxDate: moment().format("YYYY-MM-DD HH:mm"),
            applyButtonClasses: "btn-color",
            locale: {
                format: format
            }
        }, function (start, end, label) {
            // $(className).trigger("change");
        });
        $(className).on('apply.daterangepicker', function (ev, picker) {
            // alert("Asdasd");
            // alert(picker.startDate.format('YYYY-MM-DD HH:mm'));
            $("#" + ev.target.id).trigger("change", [picker.startDate.format('YYYY-MM-DD HH:mm')])
            //  $("#" + ev.target.id).change({ msg: picker.startDate.format('YYYY-MM-DD HH:mm'), id: ev.target.id },change);

        });
    },
    /**
     * 初始化日期控件（可编辑版本，无最大时间限制）
     */
    init_datarangepicker_max: function (className, format) {
        $(className).daterangepicker({
            opens: "right",
            singleDatePicker: true,
            showDropdowns: true,
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 60,
            minDate: "1950-01-01",
            applyButtonClasses: "btn-color",
            locale: {
                format: format
            }
        }, function (start, end, label) {
            // $(className).trigger("change");
        });
        $(className).on('apply.daterangepicker', function (ev, picker) {
            //    alert("Asdasd");
            $("#" + ev.target.id).change();
        });
    },
    /**
     * 添加天数
     */
    addDate: function (date, days) {
        if (days == undefined || days == '') {
            days = 1;
        }
        //系统当前日期
        var sysDate = new Date();

        var date = new Date(date);
        date.setDate(date.getDate() + days);

        if (date > sysDate) {//结束时间不能大于系统当前时间
            //date = sysDate;
            var month = sysDate.getMonth() + 1;
            var day = sysDate.getDate();
        } else {
            var month = date.getMonth() + 1;
            var day = date.getDate();
        }


        var hours = date.getHours();
        var minutes = date.getMinutes();

        var mm = "'" + month + "'";
        var dd = "'" + day + "'";
        var hh = "'" + hours + "'";
        var min = "'" + minutes + "'";

        //单位数前面加0
        if (mm.length == 3) {
            month = "0" + month;
        }

        if (dd.length == 3) {
            day = "0" + day;
        }
        if (hh.length == 3) {
            hours = "0" + hours;
        }
        if (min.length == 3) {
            minutes = "0" + minutes;
        }

        var time = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes;

        return time;
    },
    /**
     * 添加天数
     */
    addDateForSwys: function (date, days) {
        if (days == undefined || days == '') {
            days = 1;
        }
        //系统当前日期
        var sysDate = new Date();

        var date = new Date(date);
        date.setDate(date.getDate() + days);

        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hours = date.getHours();
        var minutes = date.getMinutes();

        var mm = "'" + month + "'";
        var dd = "'" + day + "'";
        var hh = "'" + hours + "'";
        var min = "'" + minutes + "'";

        //单位数前面加0
        if (mm.length == 3) {
            month = "0" + month;
        }

        if (dd.length == 3) {
            day = "0" + day;
        }
        if (hh.length == 3) {
            hours = "0" + hours;
        }
        if (min.length == 3) {
            minutes = "0" + minutes;
        }

        var time = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes;

        return time;
    },
    /**
     * 初始化小时下拉框
     */
    init_select_hour: function (className) {
        var arr = new Array("00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23");
        $(className).empty();
        var _html = "";
        for (var i = 0; i < arr.length; i++) {
            _html += "<option value='" + arr[i] + "'>" + arr[i] + "</option>";
        }
        $(className).append(_html);
    },
    /**
     * 展示消息提示框-成功
     */
    show_message_success: function (msg) {
        toastr.clear();
        toastr.success(msg, null, { positionClass: 'toast-center-center', timeOut: "3000" });
    },
    /**
     * 展示消息提示框-失败
     */
    show_message_error: function (msg) {
        toastr.clear();
        // var func_name = arguments.callee.caller.name == "" ? "" : "函数名：" + arguments.callee.caller.name + " 错误信息:";
        var func_name = "";
        toastr.error(func_name + msg, null, { positionClass: 'toast-center-center', timeOut: "3000" });
    },
    show_message_error_const: function (msg) {
        toastr.clear();
        // var func_name = arguments.callee.caller.name == "" ? "" : "函数名：" + arguments.callee.caller.name + " 错误信息:";
        var func_name = "";
        toastr.warning(func_name + msg, null, { positionClass: 'toast-center-center', timeOut: "3000" });
    },
    getInfoBystnm_old: function (_stnm, _rang) {
        var that = this;
        var res = "";
        if (_rang == "5") {
            $.each(that.map_config.hhwater.data, function (index, item) {
                if (item.stnm == _stnm) {
                    res = item.stnm + "," + item.stcd + "," + item.sttp;
                    return res;
                }
            });
        }
        if (_rang == "9") {
            $.each(that.map_config.yss.data, function (index, item) {
                if (item.stnm == _stnm) {
                    res = item.stnm + "," + item.stcd + "," + item.sttp;
                    return res;
                }
            });
        }
        return res;

    },
    getInfoBystnm: function (_stnm, _rang) {
        var res = "";
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.findStInfo = "";
        svgWnd.getStcdByname(_stnm, svgWnd.document.rootElement);
        if (svgWnd.findStInfo != "") {
            var arr_data = svgWnd.findStInfo.split("_");
            var _stnm = arr_data[0];
            var _stcd = arr_data[1];
            var _sttp = arr_data[2];
            res = _stnm + "," + _stcd + "," + _sttp;
        }


        return res;

    },
    getFlagBystnm: function (_stnm, _rang) {
        var res = "";
        var svgDocument = document.getElementById("SVGDoc").getSVGDocument();
        var svgWnd = svgDocument.svgWnd;
        svgWnd.findStInfo = "";
        svgWnd.getStcdByname(_stnm, svgWnd.document.rootElement);
        res = svgWnd.findStInfo;
        return res;

    },
    islaststr: function (str, substr) {
        var res = false;
        var index = str.indexOf(substr);
        if (index < 0)
            return res;
        if (str.length - substr.length == index)
            res = true;
        return res;
    },

    loadingshow: function (obj, frameTime) {
        if ($(".loading-layer-jdt").is(':visible')) {
            $("#span_loading_jdt").html(obj);

        } else {
            var radObj = $('#indicatorContainer').data('radialIndicator');
            radObj.option("frameTime", frameTime);
            radObj.value(0);
            $("#span_loading_jdt").html(obj);
            $(".loading-layer-jdt").show();
            radObj.animate(99);
        }

    },
    loadinghide: function (issuccess) {
        if (issuccess) {
            var radObj = $('#indicatorContainer').data('radialIndicator');
            radObj.value(99);
            radObj.clearanimate();
            radObj.animate(100);
            $("#span_loading_jdt").html($("#span_loading_jdt").html().replace("中...", "成功"));
            var interval = setInterval(function () {
                var value = radObj.value();
                if (value == 100) {
                    clearInterval(interval);
                    $(".loading-layer-jdt").hide();
                }
            }, 1000)
        }
        else {
            $(".loading-layer-jdt").hide();
        }
        $(".loading-layer").hide();

    },
    initChartlegendIcon: function (option) {
        return option;
        var legend = option.legend;
        if (legend != undefined) {
            legend.inactiveColor = "#696969";
            for (var i = 0; i < legend.data.length; i++) {
                var isshow = true;
                for (var p in legend.selected) {
                    if (legend.data[i] == p) {
                        if (legend.selected[p] == false) {
                            isshow = false;
                            break;
                        }
                    }
                }
                if (!isshow) {
                    legend.data[i] = {
                        name: legend.data[i].name == undefined ? legend.data[i] : legend.data[i].name,
                        icon: "none",
                    };
                }

            }
        }

        return option;
    },
    initChartlegendIcon_new: function (option) {
        var legend = option.legend;
        if (legend != undefined) {
            // legend.inactiveColor = "#000000";
            for (var i = 0; i < legend.data.length; i++) {
                var isshow = true;
                for (var p in legend.selected) {
                    if (legend.data[i] == p) {
                        if (legend.selected[p] == false) {
                            isshow = false;
                            break;
                        }
                    }
                }
                if (!isshow) {
                    legend.data[i] = {
                        name: legend.data[i].name == undefined ? legend.data[i] : legend.data[i].name,
                        icon: "none",
                    };
                }

            }
        }

        return option;
    },
    copyArr: function (arr) {

        return JSON.parse(JSON.stringify(arr))

    }
    ,
    selectchangeChartlegendIcon: function (option, state, name) {
        var legend = option.legend[0];
        var index = -1;
        for (var i = 0; i < legend.data.length; i++) {
            if (legend.data[i].name == undefined) {
                if (legend.data[i] == name) {
                    index = i;
                    break;
                }

            }
            else {
                if (legend.data[i].name == name) {
                    index = i;
                    break;
                }
            }
        }
        if (index >= 0) {

            if (state) {

                legend.data[index] = {
                    name: legend.data[index].name == undefined ? legend.data[index] : legend.data[index].name,


                };
            }
            else {
                legend.data[index] = {
                    name: legend.data[index].name == undefined ? legend.data[index] : legend.data[index].name,
                    icon: "none",
                };
            }

        }
        return option;
    },

    getRootPath_web: function () {
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return (localhostPaht + projectName);
    },
    inputnum: function (obj, val) {
        obj.target.value = obj.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        obj.target.value = obj.target.value.replace(/^\./g, ""); //验证第一个字符是数字
        obj.target.value = obj.target.value.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
        obj.target.value = obj.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.target.value = obj.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    },
    randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    },
    /**
     * 格式化过程线上的ToolTip
     **/
    format_tooltip_chart_xyjz: function (arr, type) {
        var res = "";
        if (arr == null || arr.length == 0)
            return res;

        var unit = type == "sw" ? " m" : " m³/s";
        //拼接是先加时间
        res = "时间:" + arr[0].axisValue[1] + arr[0].axisValue[0];
        for (var i = 0; i < arr.length; i++) {
            if (res != "")
                res += "</br>";

            if (arr[i].seriesName.indexOf("距平") > -1) {
                res += arr[i].seriesName + ":" + arr[i].value + " %";
            } else {
                res += arr[i].seriesName + ":" + (arr[i].seriesName.indexOf("当前") > -1 ? -arr[i].value : arr[i].value) + unit;
            }
        }

        return res;
    },
    /**
     * 文本垂直显示
     **/
    format_label_vertical: function (value) {
        if (value.length < 1)
            return "";

        var res = value.substr(0, value.indexOf("月", 0));
        value = value.replace(res, "");
        value = value.substr(0, value.indexOf(",", 0));
        for (var i = 0; i < value.length; i++) {
            if (res == "") {
                res += value.substr(i, 1);
            } else {
                res += "\n" + value.substr(i, 1);
            }
        }

        return res;
    },
    /**
     * 时间控件可选最大日期动态更新
     */
    auto_update_maxdate: function (id) {
        //datetimepicker 跨日更新
        var now = moment().format("YYYY-MM-DD HH:mm:ss");
        var diff = tools.get_timer_diff(now, "day");
        setTimeout(function () {
            $(id).datetimepicker('setEndDate', new Date());
        }, diff * 1000);
    },
    /**
     * 获取定时器下一次执行的时间间隔(单位秒)
     * 08:00 30s 08:10 30s定时刷新
     */
    get_timer_diff: function (now, type) {
        var minSecond = moment(now).format("mmss");
        var nextMin = "";
        if (type == "10") {
            if (minSecond < 32) {
                nextMin = moment(now).format("YYYY-MM-DD HH:00:30");
            } else if (minSecond < 1032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:10:30");
            } else if (minSecond < 2032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:20:30");
            } else if (minSecond < 3032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:30:30");
            } else if (minSecond < 4032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:40:30");
            } else if (minSecond < 5032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:50:30");
            } else {
                nextMin = moment(now).add(1, "hours").format("YYYY-MM-DD HH:00:30");
            }
        } else if (type == "30") {
            if (minSecond < 32) {
                nextMin = moment(now).format("YYYY-MM-DD HH:00:30");
            } else if (minSecond < 3032) {
                nextMin = moment(now).format("YYYY-MM-DD HH:30:30");
            } else {
                nextMin = moment(now).add(1, "hours").format("YYYY-MM-DD HH:00:30");
            }
        } else if (type == "60") {
            nextMin = moment(now).add(1, "hours").format("YYYY-MM-DD HH:00:30");
        } else if (type == "day") {
            nextMin = moment(now).add(1, "days").format("YYYY-MM-DD 00:00:30");
        }

        return moment(nextMin).diff(moment(now), "seconds", true);
    },
    /**
     * 格式化ToolTip位置-左侧
     **/
    format_tooltip_position_left: function (pos, size, offset) {
        var ob = {};
        //弹出框尽量放置在左侧
        if (pos[0] < size.contentSize[0]) {
            ob["left"] = pos[0] + offset;
        } else {
            ob["left"] = pos[0] - size.contentSize[0] - offset;
        }

        //高度控制
        if ((pos[1] + size.contentSize[1] / 2 + offset) < size.viewSize[1]) {
            ob["top"] = pos[1] + offset - size.contentSize[1] / 2;
        } else {
            ob["top"] = pos[1] - size.contentSize[1] - offset;
        }
        return ob;
    },
    /**
     * 时间+小时控件精确到小时可先控制更新
     */
    auto_update_maxhour: function (arr) {
            var that = this;
            var timer_maxhour = null;
            var now = moment().format("YYYY-MM-DD HH:mm:ss");
            var diff = tools.get_timer_diff(now, "60");
            var update_maxhour_detail = function () {
                //循环数组
                for (var i = 0; i < arr.length; i++) {
                    //判断是否更新
                    if ($("#" + arr[i].date).val() == moment().add(1, "hours").format("YYYY-MM-DD")) {
                        that.disable_select_hour(arr[i].hour, parseInt(moment().add(1, "hours").format("HH")));
                    }
                }
            };
            setTimeout(function () {
                timer_maxhour = setInterval(function () {
                    update_maxhour_detail();
                }, 60 * 60 * 1000);
                update_maxhour_detail();
            }, diff * 1000);

            //日期选择改变事件
            for (var i = 0; i < arr.length; i++) {
                $("#" + arr[i].date).datetimepicker().on('changeDate', function (e) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].date == $(this).attr("id")) {
                            that.maual_update_maxhour(arr[j].date, arr[j].hour);
                            break;
                        }
                    }
                });
            }
        },
        /**
         * 日期改变动态判断小时下拉框禁用状态
         */
        maual_update_maxhour: function (dateId, hourId) {
            var that = this;
            //是否为最大可选日期
            if ($("#" + dateId).val() == moment().add(1, "hours").format("YYYY-MM-DD")) {
                that.disable_select_hour(hourId, parseInt(moment().add(1, "hours").format("HH")));
            } else {
                //是否原先被禁用
                if ($("#" + hourId).attr("hasDisable") == "true") {
                    that.enable_select_hour(hourId);
                }
            }
    },
        /**
         * 小时下拉框更新可选
         */
        disable_select_hour: function (id, maxHour) {
            $("#" + id).attr("hasDisable", "true");
            //循环option
            $("#" + id + " option").each(function () {
                if (parseInt($(this).val()) <= maxHour) {
                    $(this).removeAttr("disabled");
                } else {
                    $(this).attr("disabled", "disabled");
                }
            });
        },
};

//使用Array的方式优化拼接字符串
function StringBuffer() {
    this._strings_ = new Array();
}
StringBuffer.prototype = {
    append: function (str) {
        this._strings_.push(str);
    },
    toString: function () {
        return this._strings_.join("");
    }
};
function isExitSvgFile(url) {
    var isExists;

    $.ajax({
        url: getRootPath_web() + url,
        async: false,
        type: 'HEAD',
        error: function () {

            isExists = 0;
        },
        success: function () {
            isExists = 1;
        }
    });
    if (isExists == 1) {
        return true;
    } else {
        return false;
    }
}
function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos + 1);

    return localhostPaht;
}
//获取系统前一天日期
function getYesterday() {
    //系统当前日期
    var dd = new Date();
    dd.setDate(dd.getDate() - 1);
    var year = dd.getFullYear();
    var month = dd.getMonth() + 1;
    var day = dd.getDate();
    var time = year + "-" + month + "-" + day + " " + "08:00";
    return time;
}
