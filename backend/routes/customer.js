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
        return res.send({customerInfo:result[0]})
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


router.get('/editAddress',(req,res) => {
    let cid = req.query.cid;
    let sql = `select * from customer_addr where cid = ${cid}`;
    pool.query(sql,(err,result) => {
        return res.send({
            addressInfo: result,
        })
    })
})

router.post('/editAddress', (req,res) => {

})

router.post('/editAddress/addAddress', (req,res) => {
    let cid = req.body.cid;
    let sql = `SELECT AUTO_INCREMENT
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = "plasticshop"
    AND TABLE_NAME = "customer_addr"`
    pool.query(sql, (err,result) => {
        let AUTO_INCREMENT = result[0].AUTO_INCREMENT
        let sql = `
        start transaction;
        insert into customer_addr(cid, address, city, province, postalcode, country) values (${cid}, '', '', '', '', '');
        select caddrid from customer_addr where cid = ${cid} and address = '' and city = '' and province = '' and postalcode = '' and country = ''
        `
        pool.query(sql,(err,result) => {
            if(err){
                let sql = `
                rollback;
                alter table customer_addr auto_increment = ${AUTO_INCREMENT};
                commit;
                `
                pool.query(sql,(err,result) => {
                    if(err){
                        console.log(err)
                    }
                })
                return res.send(err.message)
            }
            let response = {
                message: "SUCCESS",
                CAddrID: result[0].caddrid
            }
            let sql = `commit`
            pool.query(sql, (err,result) => {
                if(err) return console.log(err)
                return res.send(response)
            })
        })
        
    })
    
})

module.exports = router