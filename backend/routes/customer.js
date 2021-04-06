const express = require('express')
const pool = require('../pool')
const router = express.Router()
const regex = require('../regex');

router.get('/', (req, res) => {
    let sql = "select cid ,concat( firstname,' ', middlename, ' ', lastname) as name from customer"
    pool.query(sql, (err, result) => {
        return res.send({ customer: result })
    })
})

router.get('/editProfile', (req, res) => {
    let cid = req.query.cid
    let sql = `select * from customer where cid = ${cid}`
    pool.query(sql, (err, result) => {
        if (err) console.log(err)
        return res.send({ customerInfo: result[0] })
    })
})

router.post('/editProfile', (req, res) => {
    if (regex.test(req.body.value)) {
        return res.status(400).send("Err")
    }
    let sql = `update customer
                set ${req.body.name} = '${req.body.value}'
                where cid = ${req.body.cid}
    `
    try {
        pool.query(sql, (err, result) => {
            if (err) console.log(err)
            return res.send("success")
        })
    } catch {
        return res.status(400).send("err")
    }
})


router.get('/editAddress', (req, res) => {
    let cid = req.query.cid;
    let sql = `select * from customer_addr where cid = ${cid} and \`condition\` = 1`;
    pool.query(sql, (err, result) => {
        return res.send({
            addressInfo: result,
        })
    })
})

router.post('/editAddress', (req, res) => {

    if (req.body.value == "" || regex.test(req.body.value)) {
        return res.status(400).send("Please fill in the blanks")
    }

    let sql = `
    update customer_addr
    set ${req.body.name} = '${req.body.value}'
    where caddrid = ${req.body.caddrid}
    `

    pool.query(sql, (err, result) => {
        // if(err) console.log(err)
        return res.send("SUCCESS")
    })

})

router.post('/editAddress/addAddress', (req, res) => {
    let cid = req.body.cid;

    pool.getConnection((err, connection) => {

        connection.beginTransaction()

        try {

            let sql = `insert into customer_addr(cid,address,city,province,postalcode,country) values (${cid},'','','','','')`

            connection.execute(sql, (err, result) => {
                if (err) {
                    throw err
                }
            })

            sql = `select * from customer_addr where cid = ${cid} and address = '' and city = '' and province = ''`

            let data

            connection.execute(sql, (err, result) => {
                if (err)
                    throw err
                data = result[0]
            })

            connection.commit()

            return res.send(data)

        } catch (err) {

            console.log(err)
            connection.rollback()
            return res.status(400).send("ERROR OCCURS IN DATABASE")
        }
    })

})

router.post('/editAddress/deleteAddress', (req, res) => {

    let CAddrID = req.body.CAddrID

    let sql = `select CAddrID from \`order\` where cid = ${req.body.cid}`

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err.message)
        }
        let retu = false
        result.map(el => {
            if (el.CAddrID == CAddrID) {
                sql = `update customer_addr set \`condition\` = 0 where CAddrID = ${CAddrID}`

                retu = true
                pool.query(sql, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.send(err.message)
                    }
                    return res.send("success")
                })
            }
        })
        if (retu == false) {
            sql = `delete from customer_addr where CAddrID = ${req.body.CAddrID}`
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.send(err.message)
                }
                return res.send('success')
            })
        }
    })

})

router.get('/getAddress', (req, res) => {
    let sql = `select * from customer_addr where caddrid = ${req.query.caddrid}`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

module.exports = router