const redis = require('redis').createClient(6379, 'redis');
let fs = require("fs");
const file = 'data.txt';

function Connection() {
    this.file = file;
    this.redis = redis;
    this.record = function (key, value) {
        fs.appendFile(
            file,
            '"' + key + '":"' + value + '",',
            (error) => {
                if (error) return console.log("数据写入失败" + error.message);
                console.log("数据写入成功");
            });
    };
    this.runtime = {};
    this.runtime.put = (time, data) => redis.rpush('runtime', JSON.stringify([time, data]));
    this.runtime.get = (during, callback) => {
        let delta = 0.1;
        let n = during / delta;
        let loop = () => {
            redis.lpop('runtime', function (e, v) {
                if (n > 0) {
                    n -= 1;
                    if (!v) setTimeout(loop, delta);
                    else callback(e, v);
                } else redis.lpop('runtime', callback);
            });
        };
        loop();
    }
}

module.exports = new Connection();
