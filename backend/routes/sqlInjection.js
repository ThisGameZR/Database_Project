const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../pool');

router.post('/', async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
       
        let sql = `insert into employee (EID,FirstName,MiddleName,LastName,Position,Salary,Dno) values (
            ${parseInt(req.body.eid)},'${req.body.firstname}','${req.body.middlename}'
            ,'${req.body.lastname}','${req.body.position}',${parseInt(req.body.salary)}
            ,${parseInt(req.body.dno)}
        )`
     
        pool.query(sql, (err,result) => {
            if(err)
                console.log(err);
            let sql = `insert into employee_account(EID,Password) values (${req.body.eid},'${hashedPassword}')`
            pool.query(sql, (err,result) => {
                if(err)
                    console.log(err);
                return res.send("Successfully insert into database");
            }) 
        });
    }catch{
        return res.send("Error");
    }
});

module.exports = router;