
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

router.get('/coupon', (req, res) => {
    pool.query(`select * from promocode natural join product order by PID`, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.post('/editCoupon', (req, res) => {
    if (regex.test(req.body.value)) {
        return res.send({ status: 'error', message: 'Value cannot contain special characters' })
    }

    if (req.body.type == "Discount" || req.body.type == "Available_number" || req.body.type == "PID") {
        if (isNaN(req.body.value)) {
            return res.send({ status: 'error', message: 'Value cannot contain character' })
        }

        req.body.value = parseInt(req.body.value)
        if (req.body.value < 0) {
            return res.send({ status: 'error', message: 'Value cannot be negative' })
        }
    }

    if (req.body.type == "ExpiredDate") {

        let date = new Date(req.body.value)
        date.setHours(date.getHours() + 7)

        req.body.value = new Date(date).toISOString().slice(0, 19).replace('T', ' ')

    }

    let sql
    if (req.body.type == "Code") {
        sql = `select Code from promocode`
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                return res.send({ status: 'error', message: err.message })
            }
            return result.map(el => {
                if (el.Code == req.body.value) {
                    return res.send({ status: 'error', message: 'Code already exists' })
                }
            })
        })
    }

    if (req.body.type == "Code" || req.body.type == "ExpiredDate") {
        sql = `update promocode set ${req.body.type} = '${req.body.value}' where Code = '${req.body.code}'`
    } else {
        sql = `update promocode set ${req.body.type} = ${req.body.value} where Code = '${req.body.code}'`
    }
    pool.query(sql, (err, result) => {
        if (err) {
            if (req.body.type == "PID") {
                console.log(err)
                return res.send({ status: 'error', message: `There is no such product with id ${req.body.value}` })
            }
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: 'Successfully change the value' })
    })
})

router.post('/addCoupon', (req, res) => {
    if (regex.test(req.body.value)) {
        return res.send({ status: 'error', message: 'The code cannot contain special character' })
    }

    let sql = `select Code from promocode`
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return result.map(el => {
            if (el.Code == req.body.value) {
                return res.send({ status: 'error', message: 'Code already exists' })
            }
        })
    })

    sql = `insert into promocode (Code,PID) values ('${req.body.value}',1)`

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: 'Successfully add new coupon' })
    })
})

module.exports = router;