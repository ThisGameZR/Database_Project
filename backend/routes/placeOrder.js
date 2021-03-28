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
        cart,cid,eid
    }

    return res.send("SUCCESS")

})

router.post('/checkCoupon', (req, res) => {
    const code = req.body.code
    let sql = `select * from promocode where code = '${code}'`
    try {
        
        pool.query(sql, (err, result) => {
            if (err) console.log(err)
            return res.send({coupon: result[0]})
        })
    } catch {
        return res.status(400).send("EREROEOREOREOREO")
    }
})

module.exports = router