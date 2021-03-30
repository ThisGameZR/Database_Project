
const express = require('express');
const router = express.Router();
const pool = require('../pool');
const regex = require('../regex');

router.get('/', (req, res) => {
    pool.query(`select * from product natural join supplier`, (err, result) => {
        res.end(JSON.stringify(result));
    });
});

router.get('/orderbypid', (req, res) => {
    pool.query('select * from product natural join supplier order by pid', (err, result) => {
        res.end(JSON.stringify(result))
    })
})

router.get('/getsupplier', (req, res) => {
    pool.query("select SID, SName from supplier", (err, result) => {
        res.end(JSON.stringify(result));
    });
})

router.get('/getsize', (req, res) => {
    pool.query("select distinct Size from product", (err, result) => {
        res.end(JSON.stringify(result));
    });
})

router.get('/getstock', (req, res) => {
    pool.query(`select stocks from product where pid = ${req.query.pid}`, (err, result) => {
        if (err) console.log(err)
        return res.send(result)
    })
})

router.post('/editStock', (req, res) => {

    if (regex.test(req.body.value)) {
        return res.send({ status: 'error', message: 'Value cannot contain special characters' })
    }

    if (req.body.type == "size") {
        let validSize = [
            'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'
        ]
        if (!validSize.includes(req.body.value)) {
            return res.send({ status: 'error', message: 'Size is not valid' })
        }
    }

    if (req.body.type == "stocks" || req.body.type == "unitprice") {
        if (isNaN(req.body.value)) {
            return res.send({ status: 'error', message: 'Value cannot contain character' })
        }
        if (req.body.type == "stocks") {
            req.body.value = parseInt(req.body.value)
            if (req.body.value < 0) {
                return res.send({ status: 'error', message: 'Stock cannot be negative' })
            }
        }
        if (req.body.type == "unitprice") {
            req.body.value = parseFloat(parseFloat(req.body.value).toFixed(2))
            if (req.body.value < 0) {
                return res.send({ status: 'error', message: 'Unitprice cannot be negative' })
            }
        }
    }
    let sql
    if (req.body.type == "productname" || req.body.type == "size") {
        sql = `update product set ${req.body.type} = '${req.body.value}' where pid = ${req.body.pid}`
    } else {
        sql = `update product set ${req.body.type} = ${req.body.value} where pid = ${req.body.pid}`
    }
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: 'Successfully change the value' })
    })
})

module.exports = router;