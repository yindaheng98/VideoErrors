function roll_updatePage() {
    var ajaxTimeoutTest = $.ajax({
        url: "runtime",
        timeout: 40000, //超时时间设置，单位毫秒
        type: 'get',
        data: {during: 2600}, //请求所传参数，json格式
        dataType: 'json', //返回的数据格式
        success: function (data) {
            updatePage(data);
            roll_updatePage();
        },
        complete: function (XMLHttpRequest, status) { //求完成后最终执行参数
            // 设置timeout的时间，通过检测complete时status的值判断请求是否超时，如果超时执行响应的操作
            console.log(status);//超时,status还有success,error等值的情况
            ajaxTimeoutTest.abort();
            roll_updatePage();
        }
    });
}

function init() {
    $.get("read", {n: 10}, function (data, status) {
        if (status === 'success')
            initPage(data);
        roll_updatePage();
    }, 'json');
}



