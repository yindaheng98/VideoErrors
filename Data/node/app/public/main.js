let myChart1;
$(document).ready(function () {
    // 基于准备好的dom，初始化echarts实例
    myChart1 = echarts.init(document.getElementById('mainq'));
    option = {
        legend: {},
        tooltip: {
            //trigger: 'axis',
            showContent: false,
        },
        dataset: {
            source: data1
        },
        xAxis: {
            type: 'category',
            triggerEvent: true,
            //axisPointer: {show:true}
        },
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        color: ['#0099FF', '#22DDDD', '#FF9900'],
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 5},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                label: {
                    formatter: '{b}: {@[2012]} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                }
            }

        ]
    };

    setTimeout(function () {
        myChart1.on('mouseover', function (params) {

            if (params.componentType == "xAxis") {
                var xAxisInfo = params.value;
                myChart1.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + xAxisInfo + ']} ({d}%)'
                        },
                        encode: {
                            value: xAxisInfo,
                            tooltip: xAxisInfo
                        }
                    }
                });
            }
            if (params.componentType == "series" && params.seriesType == 'line') {
                var xAxisInfo = params.value[0];
                myChart1.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + xAxisInfo + ']} ({d}%)'
                        },
                        encode: {
                            value: xAxisInfo,
                            tooltip: xAxisInfo
                        }
                    }
                });
            }
            setTimeout(function () {
                myChart1.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 4,
                    dataIndex: params.seriesIndex
                });
            }, 300);
        });

        myChart1.on('mouseout', function (params) {
            myChart1.dispatchAction({
                type: 'downplay',
                seriesIndex: 4,
                dataIndex: params.seriesIndex
            });
        });
    }, 0);

// 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option);
    init();
});