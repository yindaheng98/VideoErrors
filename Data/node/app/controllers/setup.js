var fs = require('fs');
const con = require('../controllers/connections');

function InitData() {
    con.redis.flushall(() => {
        let data_str = fs.readFileSync(con.file);
        let data=JSON.parse('{'+data_str.slice(0,-1)+'}');
        let runtime;
        for(let k in data){
            con.redis.set(parseInt(k),data[k]);
            runtime=[k,data[k]];
        }
        con.runtime.put(parseInt(runtime[0]),runtime[1]);
        console.log('数据初始化');
        console.log(data);
    });
}

module.exports = InitData;