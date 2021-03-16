const express = require('express')
const pool = require('../pool')
const router = express.Router()
const regex = require('../regex')

router.post('/submitCustomer', async (req,res) => {
    let firstname = req.body.firstname
    let middlename = req.body.middlename
    let lastname = req.body.lastname
    let contact = req.body.contact
    if(regex.test(firstname) || regex.test(middlename) || regex.test(lastname) || regex.test(contact)){
        return res.send("Error special characters are not allowed")
    }
    let sql = `insert into customer (firstname,middlename,lastname,contact,points) values 
        ('${firstname}','${middlename}','${lastname}','${contact}',0)
    `
    try{
        pool.query(sql, (err,result) => {
            if(err)
                console.log(err)
            let sql = `select cid from customer where firstname = '${firstname}' and middlename = '${middlename}' and lastname = '${lastname}'`
            pool.query(sql,(err,result) => {
                if(err)
                    console.log(err)
                
                return res.send({cid: result[0].cid})
            })
        })
    }catch{
        console.log("err")
    }
   
})

router.post('/submitAddress', async (req,res) => {
    
    let data = []
    Object.entries(req.body).forEach(entry => {
        const [key,value] = entry;
        if(regex.test(value)){
            return res.send("Error special characters are not allowed")
        }
        data[key] = value
    })

    let sql = `insert into customer_addr (CID,Address,City,Province,PostalCode,Country)
        values(
            ${data.cid},
            '${data.address}',
            '${data.city}',
            '${data.province}',
            '${data.postalcode}',
            '${data.country}'
        )
    `
    try{
        pool.query(sql,(err,result) => {
        
            err ? console.log(err) : null
            
            res.send("Success");

        })
    }catch{
        res.send("Error");
    }

})

router.post('/submitCard',(req,res) => {
    let data = []
    Object.entries(req.body).forEach(entry => {
        const [key,value] = entry;
        if(regex.test(value)){
            return res.send("Error special characters are not allowed")
        }
        data[key] = value
    })

    let sql = `insert into customer_card (CID,cardnumber) values (${data.cid},${data.cardnumber})`

    try{
        pool.query(sql,(err,result) => {
            if(err)
                console.log(err)
            return res.send("Success");
        })
    }catch{
        return res.status(400).send("error")
    }
})

module.exports = router

