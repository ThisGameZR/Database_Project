const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../pool');

router.get('/product',(req,res) => {
    pool.query("select * from Product",(err,result) => {
        res.end(JSON.stringify(result));
    });
});

router.post('/login',async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === "")
        res.status(200).send({message: "Username cannot be blank"});
    if(password === "")
        res.status(200).send({message: "Password cannot be blank"});
    try{
        let sql = `select * from employeeAccount where username = '${username}'`;
        pool.query(sql,(err,result) => {
            if(err)
                res.send({message: err});
            if(result.length != 0){
                try{
                    if(bcrypt.compare(password,result[0].Password)){
                        let sql = `select firstname,middlename,lastname from employee where eid = ${result[0].EID}`;
                        pool.query(sql,(err,row) => {
                            if(row[0].middlename == "")
                                res.send({message: `LOGIN AS: ${row[0].firstname} ${row[0].lastname}`});
                            else
                                res.send({message: `LOGIN AS: ${row[0].firstname} ${row[0].middlename} ${row[0].lastname}`});
                        });
                    }else{
                        res.send({message: "Incorrect username or password"});
                    }
                }catch{
                    res.status(400).send();
                }
            }else
            res.send({message: "There is more than one user"});
        });
    }catch{
        res.status(400).send();
    }
});

router.post('/sqlInjection',async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {EID: req.body.eid, username: req.body.username, password:hashedPassword};
        const sql = `insert into employeeAccount(EID,username,password) values (${user.EID},'${user.username}','${user.password}')`
        pool.query(sql, (err,result) => {
            if(err)
                console.log(err);
            res.send("Successfully insert into database");
        });
    }catch{
        res.send("Error");
    }
});

module.exports = router;