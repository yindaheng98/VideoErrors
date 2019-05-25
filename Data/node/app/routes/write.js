let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');

router.post('/', function (req, res, next) {
    try {
        let data_str = req.query.data;
        let time = moment().valueOf();
        con.runtime.put(time, data_str);
        con.redis.set(time, data_str, function (err) {//就写入一个时间值
            if (err == null) {//写入成功，返回ok
                res.send('ok');
                con.record(time, data_str);
                return;
            }//写入失败，返回error
            res.send('err');
        });
    } catch (e) {
        console.log(e);
        res.send('err');
    }
});

module.exports = router;
