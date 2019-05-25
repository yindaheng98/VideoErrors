let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');

router.get('/', function (req, res, next) {
    try {
        con.runtime.get(parseInt(req.query.during), (err, v) => {
            if (err) {
                res.send('err');
                console.log(err);
            } else if(v) {
                console.log(v);
                let data = JSON.parse(v);
                let time = moment(data[0]);
                res.send(JSON.stringify([time, data[1]]));
            }
            else {
                res.send('timout');
            }
        })
    } catch (e) {
        console.log(e);
        res.send('err');
    }
});

module.exports = router;
