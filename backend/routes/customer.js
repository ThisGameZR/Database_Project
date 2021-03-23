const express = require('express')
const pool = require('../pool')
const router = express.Router()

router.get('/', (req,res) => {
    let sql = "select cid ,concat( firstname,' ', middlename, ' ', lastname) as name from customer"
    pool.query(sql, (err,result) => {
        return res.send({customer: result})
    })
})

module.exports = router