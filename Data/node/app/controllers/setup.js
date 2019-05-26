var fs = require('fs');
const con = require('../controllers/connections');

function InitData() {
    con.redis.flushall(() => {
        let data = {};
        try {
            let data_str = fs.readFileSync(con.file);
            if (data_str.length <= 0) return;
            data = JSON.parse('{' + data_str.slice(0, -1) + '}');
        } catch (e) {
            console.log('数据库有错误');
            console.log(e);
            fs.writeFile(con.file, '', 'utf8', function (error) {
                if (error) return console.log(error);
                console.log('数据库已重置');
            });
            return;
        }
        let runtime;
        for (let k in data) {
            con.redis.set(parseInt(k), data[k]);
            runtime = [k, data[k]];
        }
        con.runtime.put(parseInt(runtime[0]), runtime[1]);
        console.log('数据初始化');
        console.log(data);
    });
}

module.exports = InitData;