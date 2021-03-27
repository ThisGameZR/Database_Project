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
    let sql = `
    update customer_addr
    set ${req.body.name} = '${req.body.value}'
    where caddrid = ${req.body.caddrid}
    `
    
    pool.query(sql,(err,result) => {
        // if(err) console.log(err)
        return res.send("SUCCESS")
    })

})

router.post('/editAddress/addAddress', (req,res) => {
    let cid = req.body.cid;
    
    pool.getConnection((err, connection) => {

        connection.beginTransaction()

        try {
            
            let sql = `insert into customer_addr(cid,address,city,province,postalcode,country) values (${cid},'','','','','')`

            connection.execute(sql,(err,result) => {
                if(err){
                    return connection.rollback()
                }
            })

            sql = `select * from customer_addr where cid = ${cid} and address = '' and city = '' and province = ''`

            let data
            
            connection.execute(sql, (err, result) => {
                if (err)
                    return connection.rollback()
                data = result[0]
            })

            connection.commit()

            return res.send(data)

        } catch {
            
            return connection.rollback()
            
        }  
    })
    
})

router.post('/editAddress/deleteAddress', (req, res) => {
    
    let CAddrID = req.body.CAddrID

    let sql = `delete from customer_addr where CAddrID = ${CAddrID}`

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err.message)
        }
        return res.send("success")
    })

})

module.exports = router