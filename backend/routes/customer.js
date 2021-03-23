const express = require('express')
const pool = require('../pool')
const router = express.Router()

router.get('/', (req,res) => {
    let sql = "select cid ,concat( firstname,' ', middlename, ' ', lastname) as name from customer"
    pool.query(sql, (err,result) => {
        return res.send({customer: result})
    })
})

router.get('/editProfile',(req,res) => {
    let cid = req.query.cid
    let sql = `select * from customer where cid = ${cid}`
    pool.query(sql,(err,result) => {
        return res.send({customerInfo:result})
    })
})

router.post('/editProfile', (req,res) => {
    let sql = `update customer
                set ${req.body.name} = '${req.body.value}'
                where cid = ${req.body.cid}
    `
    pool.query(sql,(err,result) => {
        if(err) console.log(err)
        return res.send("success")
    })
})

module.exports = router