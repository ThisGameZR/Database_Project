const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const con = mysql2.createConnection({
    user: "root",
    password: "root",
    port:"3306",
    database:"plasticShop"
});

router.get('/product',(req,res) => {
    con.query("select * from Product",(err,result) => {
        res.end(JSON.stringify(result));
    });
});

router.post('/',(req,res) => {
    res.status(200).send({
        message:"LOGIN SUCCESSFUL"
    })
});



module.exports = router;