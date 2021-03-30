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

    let date = new Date(req.body.shiptime).toISOString().slice(0, 19).replace('T', ' ')
    let newdate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    let total = parseFloat(data.total.toFixed(2))
    let sql
    if (date == '1970-01-01 00:00:00') {
        if (coupon == null) {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},null,'${newdate}',null,null
            )`
        } else {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate) values (
                ${data.eid},${data.cid},${data.address},${total},${data.points},'${coupon}','${newdate}',null,null
            )`
        }
    } else {
        if (coupon == null) {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},null,'${newdate}','${date}',null
            )`
        } else {
            sql = `insert into \`order\` (eid,cid,caddrid,totalprice,totalpoints,promocode,orderdate,requireddate,paymentdate) values (
            ${data.eid},${data.cid},${data.address},${total},${data.points},'${coupon}','${newdate}','${date}',null
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

                    sql = `insert into invoice (cid,orderid,statusid) values(${data.cid},${orderid},1)`

                    connection.execute(sql, (err, result) => {
                        if (err) {
                            throw err
                        }
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

module.exports = router