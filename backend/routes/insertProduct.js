const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.post('/supplier',(req,res) => {
    let sql = `insert into supplier(sname,contact,address) values (
        '${req.body.sname}','${req.body.contact}','${req.body.address}'
    )`
    pool.query(sql,(err,result) => {
        if(err != null)
            return console.log(err);
        let sql = `select sid from supplier where sname = '${req.body.sname}' and 
        contact = '${req.body.contact}' and address = '${req.body.address}'`

        pool.query(sql,(err,result) => {
            if(err != null)
                return console.log(err);
            return res.send({message: `Successfully insert with SID: ${result[0].sid}`, sid: result[0].sid });
        });
        
    });
});
router.post('/product',(req,res) => {
    let sql = `insert into product(sid,productname,unitprice,size,stocks) values (
        ${parseInt(req.body.sid)},'${req.body.productname}',${parseInt(req.body.unitprice)}
        ,'${req.body.size}',${parseInt(req.body.stock)}
    )`
    pool.query(sql,(err,result) => {
        if(err != null)
            return console.log(err);
        let sql = `select pid from product where sid = '${parseInt(req.body.sid)}' 
        and productname = '${req.body.productname}' and unitprice = ${parseInt(req.body.unitprice)}
        and size = '${req.body.size}' and stocks = ${parseInt(req.body.stock)} `
        pool.query(sql, (err,result) => {
            if(err != null)
                return console.log(err)
            return res.send({message:`Successfully insert with PID: ${result[0].pid}`, pid: result[0].pid})
        })
    })
});

module.exports = router;