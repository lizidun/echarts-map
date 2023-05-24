$(function () {//dom加载后执行
    mapChart('mapChart')
})



/**
 * 根据Json里的数据构造Echarts地图所需要的数据
 * @param {} mapJson 
 */
function initMapData(mapJson) {
    var mapData = [];
    for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
            name: mapJson.features[i].properties.name,
            //id:mapJson.features[i].id
        })
    }
    return mapData;
}

/**
 * 返回上一级地图
 */
function back() {
    if (mapStack.length != 0) {//如果有上级目录则执行
        var map = mapStack.pop();
        $.get('./asset/json/map/' + map.mapId + '.json', function (mapJson) {

            registerAndsetOption(myChart, map.mapId, map.mapName, mapJson, false)

            //返回上一级后，父级的ID、Name随之改变
            parentId = map.mapId;
            parentName = map.mapName;

        })

    }

}
/**
 * Echarts地图
 */

//中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 370000;
var chinaName = 'shandong'
var chinaJson = null;

//记录父级ID、Name
var mapStack = [];
var parentId = null;
var parentName = null;

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null;
function mapChart(divid) {

    $.get('./asset/json/map/' + chinaId + '.json', function (mapJson) {
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById(divid));
        registerAndsetOption(myChart, chinaId, chinaName, mapJson, false)
        parentId = chinaId;
        parentName = 'china'
        myChart.on('click', function (param) {

            var cityId = cityMap[param.name]
            if (cityId) {//代表有下级地图
                $.get('./asset/json/map/' + cityId + '.json', function (mapJson) {
                    registerAndsetOption(myChart, cityId, param.name, mapJson, true)
                })
            } else {
                //没有下级地图，回到一级中国地图，并将mapStack清空
                registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false)
                mapStack = []
                parentId = chinaId;
                parentName = chinaName;


            }
            // $.get('./asset/json/map/'+param.data.id+'.json', function (mapJson,status) {

            //     registerAndsetOption(myChart,param.data.id,param.name,mapJson,true)

            // }).fail(function () {
            //     registerAndsetOption(myChart,chinaId,'china',chinaJson,false)
            // });

        });


    })
}

/**
 * 
 * @param {*} myChart 
 * @param {*} id        省市县Id
 * @param {*} name      省市县名称
 * @param {*} mapJson   地图Json数据
 * @param {*} flag      是否往mapStack里添加parentId，parentName
 */
function registerAndsetOption(myChart, id, name, mapJson, flag) {

    echarts.registerMap(name, mapJson);

    option = {
        title: {
            text: name + '数据分析',
            subtext: '数据来自山东优高'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var obj = JSON.parse(JSON.stringify(params));
                var str = "<ul style='text-align:left'><li style='color: #da70d6;font:bold;'>" + obj.name + "</li>";

                switch (obj.name) {
                    case '济南市':
                        {
                            str = str + "<li> 道贤咨询</li>";
                            str = str + "<li> 安航教育</li>";
                            str = str + "<li> 开途教育</li>";
                            str = str + "<li> 仕途教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                    case '德州市':
                        {
                            str = str + "<li> 德仁人力</li>";
                            str = str + "<li> 四达人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                    case '聊城市':
                        {
                            str = str + "<li> 三实人力</li>";
                            str = str + "<li> 天时利人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                    case '滨州市':
                        {
                            str = str + "<li> 九维人力</li>";
                            str = str + "<li> 敬诚咨询</li>";
                            str = str + "</ul>";

                            break;
                        }
                    case '泰安市':
                        {
                            str = str + "<li> 大智教育</li>";
                            str = str + "<li> 泰岳教育</li>";
                            str = str + "<li> 金诺人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                    case '济宁市':
                        {
                            str = str + "<li> 海树教育</li>";
                            str = str + "<li> 圣邦人力</li>";
                            str = str + "<li> 同盛人力</li>";
                            str = str + "<li> 乐智教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '枣庄市':
                        {
                            str = str + "<li> 东嘉教育</li>";
                            str = str + "<li> 优路教育</li>";
                            str = str + "<li> 龙腾人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '东营市':
                        {
                            str = str + "<li> 晨园人力</li>";
                            str = str + "<li> 智奥人力</li>";
                            str = str + "<li> 学新教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '淄博市':
                        {
                            str = str + "<li> 仁诚教育</li>";
                            str = str + "<li> 新同方教育</li>";
                            str = str + "<li> 鲁宏人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '临沂市':
                        {
                            str = str + "<li> 智联人力</li>";
                            str = str + "<li> 恒通人力</li>";
                            str = str + "<li> 大智北辰教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '潍坊市':
                        {
                            str = str + "<li> 燕卉</li>";
                            str = str + "<li> 原和人力</li>";
                            str = str + "<li> 博华教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '日照市':
                        {
                            str = str + "<li> 杰出</li>";
                            str = str + "<li> 奔程教育</li>";
                            str = str + "<li> 曲榕教育</li>";
                            str = str + "<li> 汉哲咨询</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '青岛市':
                        {
                            str = str + "<li> 蓝海人力</li>";
                            str = str + "<li> 联达人力</li>";
                            str = str + "<li> 国开教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '烟台市':
                        {
                            str = str + "<li> 学信教育</li>";
                            str = str + "<li> 鸿胜人力</li>";
                            str = str + "</ul>";

                            break;
                        }
                        case '威海市':
                        {
                            str = str + "<li> 海乔人力</li>";
                            str = str + "<li> 万鼎人力</li>";
                            str = str + "<li> 学梯教育</li>";
                            str = str + "</ul>";

                            break;
                        }
                    default:
                        {
                            str = str + "</ul>";

                            break;
                        }

                }

                return str;
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'top',
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        // visualMap: {
        //     min: 0,
        //     max: 60000,
        //     text: ['高', '低'],
        //     left: 'right',
        //     top: 'bottom',
        //     realtime: false,
        //     calculable: true,
        //     inRange: {
        //         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        //     }
        // },
        geo: {
            show: true,
            map: name,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: false, //鼠标平移或者缩放
            itemStyle: { //每个点的样式
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3fdaff',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [{
            name: name + '数据分析',
            type: 'map',
            coordinateSystem: 'geo',
            mapType: name,
            mapLocation: {
                x: 'center'
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                },
                normal: {
                    areaColor: 'rgba(23, 27, 57,0)',
                    borderColor: '#1dc199',
                    borderWidth: 1,
                    label: {
                        show: true,
                        color: 'white'
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: (function () {
                var datas = [];
                var params = {
                    "name": name
                };
                $.ajax({
                    type: "POST",
                    url: "/xx/xx",
                    dataType: "json",
                    data: params,
                    async: false,
                    success: function (result) {
                        for (var i = 0; i < result.length; i++) {
                            datas.push({
                                "value": result[i].totalnum, "name": result[i].city,
                                "scnum": result[i].scnum, "ltnum": result[i].ltnum
                            })
                        }
                    }
                })
                return datas;
            })(),
            data: initMapData(mapJson)
        }]
    };
    myChart.setOption(option);

    // myChart.setOption({
    //     series: [{
    //         type: 'map',
    //         map: name,
    //         itemStyle: {
    //             normal: {
    //                 areaColor: 'rgba(23, 27, 57,0)',
    //                 borderColor: '#1dc199',
    //                 borderWidth: 1,
    //             },
    //         },
    //         data: initMapData(mapJson)
    //     }]
    // });

    if (flag) {//往mapStack里添加parentId，parentName,返回上一级使用
        mapStack.push({
            mapId: parentId,
            mapName: parentName
        });
        parentId = id;
        parentName = name;
    }
}