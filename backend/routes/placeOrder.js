const express = require('express')
const pool = require('../pool')
const router = express.Router()
const session = require('express-session')
const { route } = require('./login')

router.post('/', (req, res) => {
    const cart = req.body.cart
    const cid = req.body.cid
    const eid = req.body.eid

    req.session.order = {
        cart, cid, eid
    }

    return res.send("SUCCESS")

})

router.post('/checkCoupon', (req, res) => {
    const code = req.body.code
    let sql = `select * from promocode where code = '${code}'`
    try {

        pool.query(sql, (err, result) => {
            if (err) console.log(err)
            return res.send({ coupon: result[0] })
        })
    } catch {
        return res.status(200).send("Coupon not found")
    }
})

router.post('/submitOrder', async (req, res) => {


    let data = req.body
    let coupon
    if (data.coupon != null) {
        coupon = data.coupon.Code
    } else {
        coupon = null
    }

    let date = new Date(req.body.shiptime)
    date.setHours(date.getHours() + 7)
    date = new Date(date).toISOString().slice(0, 19).replace('T', ' ')

    let newdate = new Date()
    newdate.setHours(newdate.getHours() + 7)
    newdate = new Date(newdate).toISOString().slice(0, 19).replace('T', ' ')

    let total = parseFloat(data.total.toFixed(2))
    let sql
    if (date == '1970-01-01 07:00:00') {
        if (coupon == null) {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate,statusid) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},null,'${newdate}',null,null,1
            )`
        } else {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate,statusid) values (
                ${data.eid},${data.cid},${data.address},${total},${data.points},'${coupon}','${newdate}',null,null,1
            )`
        }
    } else {
        if (coupon == null) {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate,statusid) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},null,'${newdate}','${date}',null,1
            )`
        } else {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate,statusid) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},'${coupon}','${newdate}','${date}',null,1
        )`
        }
    }

    pool.getConnection((err, connection) => {

        connection.beginTransaction()
        try {

            connection.execute(sql, (err, result) => {
                if (err) {
                    throw err
                }

                sql = `select orderid from \`order\` where cid = ${data.cid} and eid = ${data.eid} and caddrid = ${data.address}
                    and totalprice = ${total} and totalpoints = ${data.points}`

                connection.execute(sql, (err, result) => {
                    if (err) {
                        throw err
                    }
                    let orderid = result[0].orderid
                    data.cart.map(el => {
                        sql = `insert into \`order_detail\` (orderid,pid,quantity,totalprice)
                        values(
                            ${orderid},
                            ${el.pid},
                            ${el.amount},
                            ${el.price}
                        )
                    `
                        connection.execute(sql, (err, result) => {
                            if (err) {
                                throw err
                            }

                            sql = `update product set stocks = stocks - ${el.amount} where pid = ${el.pid}`

                            connection.execute(sql, (err, result) => {
                                if (err) {
                                    throw err
                                }
                            })
                        })
                    })

                    if (coupon != null) {
                        sql = `update promocode set Available_number = Available_number - 1 where Code = '${coupon}'`
                        connection.execute(sql, (err, result) => {
                            if (err) {
                                throw err
                            }
                            sql = `select available_number from promocode where Code = '${coupon}'`
                            connection.execute(sql, (err, result) => {
                                if (err) {
                                    throw err
                                }
                                if (result[0].available_number <= 0) {
                                    sql = `delete from promocode where Code = '${coupon}'`
                                    connection.execute(sql, (err, result) => {
                                        if (err) {
                                            throw err
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })

            sql = `select orderid from \`order\` where cid = ${data.cid} and eid = ${data.eid} and caddrid = ${data.address}
                    and totalprice = ${total} and totalpoints = ${data.points}`

            connection.execute(sql, (err, result) => {
                if (err) throw err
                return res.send({ message: `Order complete with orderid: ${result[0].orderid}`, status: 'success' })
            })

            connection.commit((err) => {
                if (err) throw err
            })
        } catch (err) {
            console.log(err)
            connection.rollback()
            return res.send({ message: err.message, status: 'error' })
        }

    })

})

router.get('/getOrder', (req, res) => {
    let sql = `select * from ((\`order\` natural join customer) natural join customer_addr) natural join order_status where eid = ${req.query.eid} order by orderid`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.get('/getOrderStatus', (req, res) => {
    let sql = `select * from order_status`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

module.exports = router