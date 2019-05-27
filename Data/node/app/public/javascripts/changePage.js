let data1 = [['product'],
    ['A'],
    ['B'],
    ['C'],
    ['D'],
    ['E'],
    ['F']];

function updatePage(d) {
    console.log('新增数据');
    console.log(d);
    if(d[0] in data1[0])return;
    data1[0].splice(1, 1);
    data1[0].push(d[0]);
    for (let j = 1; j < data1.length; j++) {
        data1[j].splice(1, 1);
        data1[j].push(d[1][j - 1] ? d[1][j - 1] : 0);
    }
    myChart1.setOption({
        dataset: {
            source: data1
        },
    });
}

function initPage(data) {
    console.log('初始化数据');
    console.log(data);
    for (let i = data.length - 1; i >= 0; i--) {
        let time = data[i][0];
        let d = data[i][1];
        data1[0].push(time);
        for (let j = 1; j < data1.length; j++)
            data1[j].push(d[j - 1] ? d[j - 1] : 0);
    }

    myChart1.setOption({
        dataset: {
            source: data1
        },
    });
    document.getElementById("text1").innerHTML = data1[1][6];
    document.getElementById("text2").innerHTML = data1[2][6];
    document.getElementById("text3").innerHTML = data1[3][6];
    document.getElementById("text4").innerHTML = data1[4][6];
    document.getElementById("text5").innerHTML = data1[5][6];
    document.getElementById("text6").innerHTML = data1[6][6];
}