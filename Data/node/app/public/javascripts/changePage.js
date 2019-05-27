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
    for(let i in data1){
        let num=''+data1[i].slice(-1);
        document.getElementById("text"+i).innerHTML = num.slice(0,6);
    }
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
    for(let i in data1){
        let num=''+data1[i].slice(-1);
        document.getElementById("text"+i).innerHTML = num.slice(0,6);
    }
}