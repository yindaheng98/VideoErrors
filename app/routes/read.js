let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');

function getValue(key) {
    return new Promise(function (resolve, reject) {
        con.redis.get(key, (e, v) => {
            if (e) return reject(e);
            return resolve(v);
        });
    });
}

router.get('/', function (req, res, next) {
    try {
        let n = req.query.n;
        con.redis.keys('*', (err, keys) => {
            if (err) return res.send('err');
            keys.forEach((item, i) => keys[i] = parseInt(item));
            keys.sort();
            keys = keys.slice(-n, -1);
            let data = [];
            let getValue = (i) => {
                if (i < 0)
                    return res.send(JSON.stringify(data));
                let key = keys[i];
                con.redis.get(keys[i], (e, v) => {
                    if (e) return data.push([key, null]);
                    data.push([moment(key), JSON.parse(v)]);
                    getValue(i - 1);
                })
            };
            getValue(keys.length - 1);
        });
    } catch (e) {
        console.log(e);
        res.send('err');
    }
});

module.exports = router;
