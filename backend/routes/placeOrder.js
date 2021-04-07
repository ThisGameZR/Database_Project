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
            sql = `select productname from product where pid = ${result[0].PID}`
            pool.query(sql,(err,ret) => {
                if(err) console.log(err)
                return res.send({message: `Discount ${result[0].Discount}% on ${ret[0].productname}`, coupon: result[0] })
            })
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

    pool.getConnection((err, connection) => {

        connection.beginTransaction()
        try {


            sql = `insert into payment(payment_statusid, paymentdate) values (1,null)`

            connection.execute(sql, (err, result) => {
                if (err) {
                    throw err
                }
                sql = `select paymentid from payment order by paymentid desc limit 1`
                connection.execute(sql, (err, result) => {
                    if (err)
                        throw err
                    let paymentid = result[0].paymentid
                    if (date == '1970-01-01 07:00:00') {
                        if (coupon == null) {
                            sql = `insert into \`order\` (eid,cid,caddrid,paymentid,totalprice,totalpoints,promocode,orderdate,requireddate,statusid) values (
            ${data.eid},${data.cid},${data.address},${paymentid},${total},${data.points},null,'${newdate}',null,1
            )`
                        } else {
                            sql = `insert into \`order\` (eid,cid,caddrid,paymentid,totalprice,totalpoints,promocode,orderdate,requireddate,statusid) values (
                ${data.eid},${data.cid},${data.address},${paymentid},${total},${data.points},'${coupon}','${newdate}',null,1
            )`
                        }
                    } else {
                        if (coupon == null) {
                            sql = `insert into \`order\` (eid,cid,caddrid,paymentid,totalprice,totalpoints,promocode,orderdate,requireddate,statusid) values (
            ${data.eid},${data.cid},${data.address},${paymentid},${total},${data.points},null,'${newdate}','${date}',1
            )`
                        } else {
                            sql = `insert into \`order\` (eid,cid,caddrid,paymentid,totalprice,totalpoints,promocode,orderdate,requireddate,statusid) values (
            ${data.eid},${data.cid},${data.address},${paymentid},${total},${data.points},'${coupon}','${newdate}','${date}',1
        )`
                        }
                    }

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
                    and paymentid = ${paymentid} and totalprice = ${total} and totalpoints = ${data.points}`

                    connection.execute(sql, (err, result) => {
                        if (err) throw err
                        return res.send({ message: `Order complete with orderid: ${result[0].orderid}`, status: 'success' })
                    })

                    connection.commit((err) => {
                        if (err) throw err
                    })
                })
            })

        } catch (err) {
            console.log(err)
            connection.rollback()
            return res.send({ message: err.message, status: 'error' })
        }

    })

})

router.get('/getOrder', (req, res) => {
    if (!req.session.user.position.includes("Manager")) {
        let sql = `select * from (((\`order\` natural join customer) natural join customer_addr) natural join order_status) natural join payment where eid = ${req.query.eid} order by orderid`
        pool.query(sql, (err, result) => {
            return res.send(JSON.stringify(result))
        })
    } else {
        let sql = `select * from (((\`order\` natural join customer) natural join customer_addr) natural join order_status) natural join payment order by orderid`
        pool.query(sql, (err, result) => {
            return res.send(JSON.stringify(result))
        })
    }
})

router.get('/getOrderStatus', (req, res) => {
    let sql = `select row_number()	over(order by statusid asc) as id , StatusID, Description from order_status`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.post('/updateOrderStatus', (req, res) => {
    let sql = `update \`order\` set statusid = ${req.body.StatusID} where orderid = ${req.body.OrderID}`
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        sql = `select Description from order_status where statusid = ${req.body.StatusID}`
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                return res.send({ status: 'error', message: err.message })
            }
            return res.send({ status: 'success', message: `Update order no. ${req.body.OrderID} status to ${result[0].Description}` })
        })
    })
})

router.get('/getPaymentInfo', (req, res) => {
    if (req.session.user.position != "Manager") {
        let sql = `select * from (payment natural join \`order\`) natural join payment_status where eid = ${req.query.eid}`
        pool.query(sql, (err, result) => {

            return res.send(JSON.stringify(result))
        })
    } else {
        let sql = `select * from (payment natural join \`order\`) natural join payment_status`
        pool.query(sql, (err, result) => {

            return res.send(JSON.stringify(result))
        })
    }
})

router.post('/cancelPayment', (req, res) => {

    let PaymentID = req.body.PaymentID || "nothing"
    let OrderID = req.body.OrderID || "nothing"

    pool.getConnection((err, connection) => {
        connection.beginTransaction()

        try {

            let sql
            if (PaymentID == "nothing") {

                sql = `update \`order\` set statusid = 2 where orderid = ${OrderID}`
                connection.execute(sql, (err, result) => {
                    if (err)
                        throw err
                    sql = `select PaymentID from \`order\` where orderid = ${OrderID}`
                    connection.execute(sql, (err, result) => {
                        if (err)
                            throw err
                        PaymentID = result[0].PaymentID
                        sql = `update payment set payment_statusid = 2 where paymentid = ${PaymentID}`
                        connection.execute(sql, (err, result) => {
                            if (err)
                                throw err
                            sql = `select * from order_detail where orderid = ${OrderID}`
                            connection.execute(sql, (err, result) => {
                                if (err)
                                    throw err
                                result.map(el => {
                                    sql = `update product set stocks = stocks + ${el.Quantity} where pid = ${el.PID}`
                                    connection.execute(sql, (err, result) => {
                                        if (err)
                                            throw err
                                    })
                                })
                            })
                        })
                    })
                })

            } else {

                sql = `update payment set payment_statusid = 2 where paymentid = ${PaymentID}`
                connection.execute(sql, (err, result) => {
                    if (err)
                        throw err
                    sql = `select OrderID from \`order\` where paymentid = ${PaymentID}`
                    connection.execute(sql, (err, result) => {
                        if (err)
                            throw err
                        OrderID = result[0].OrderID
                        sql = `update \`order\` set statusid = 2 where orderid = ${OrderID}`
                        connection.execute(sql, (err, result) => {
                            if (err)
                                throw err
                            sql = `select * from order_detail where orderid = ${OrderID}`
                            connection.execute(sql, (err, result) => {
                                if (err)
                                    throw err
                                result.map(el => {
                                    sql = `update product set stocks = stocks + ${el.Quantity} where pid = ${el.PID}`
                                    connection.execute(sql, (err, result) => {
                                        if (err)
                                            throw err
                                    })
                                })
                            })
                        })
                    })
                })

            }
            connection.commit()
            if (PaymentID == "nothing")
                return res.send({ status: 'success', message: `Successfully cancel order with id: ${OrderID}` })
            return res.send({ status: 'success', message: `Successfully cancel order with PaymentID: ${PaymentID}` })
        } catch (err) {

            connection.rollback()
            console.log(err)
            return res.send({ status: 'error', message: err.message })

        }
    })
})

router.post('/confirmPayment', (req, res) => {

    pool.getConnection((err, connection) => {
        connection.beginTransaction()
        try {
            let sql = `update payment set payment_statusid = 3 where paymentid = ${req.body.PaymentID}`
            connection.execute(sql, (err, result) => {
                if (err) {
                    throw err
                }
                let date = new Date(req.body.PaymentTime)
                date.setHours(date.getHours() + 7)
                date = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
                sql = `update payment set paymentdate = '${date}' where paymentid = ${req.body.PaymentID}`
                connection.execute(sql, (err, result) => {
                    if (err)
                        throw err

                    sql = `select cid,totalpoints from \`order\` where paymentid = ${req.body.PaymentID}`

                    pool.query(sql, (err, result) => {
                        if (err) {
                            throw err
                        }

                        sql = `update customer set points = points + ${result[0].totalpoints} where cid = ${result[0].cid} `

                        pool.query(sql, (err, result) => {
                            if (err)
                                throw err

                        })

                        return res.send({ status: 'success', message: `Successfully confirm payment status with id ${req.body.PaymentID}` })
                    })

                })
            })
            connection.commit()
        } catch (err) {
            connection.rollback()
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
    })
})

router.get('/getPaymentStatus', (req, res) => {
    let sql = `select * from payment_status`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.post('/addComment',(req,res) => {
    let sql = `update \`order\` set comment = concat(comment,'<div>${req.body.comment}</div>') where orderid = ${req.body.orderid}`
    pool.query(sql,(err,result) => {
        if(err){
            console.log(err)
            return res.send({status: 'error', message: err.message})
        }
        return res.send({status: 'success', message: 'Successfully comments'})
    })
})

module.exports = router