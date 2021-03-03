const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../pool');
const jwt = require('jsonwebtoken');

router.get('/products', (req,res) => {
    pool.query("select * from product", (err, result) => {
        res.end(JSON.stringify(result));
    });
});

router.post('/login',async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    let success = false;

    if(username === "")
        return res.status(200).send({message: "Username cannot be blank", success: success});
    if(password === "")
        return res.status(200).send({message: "Password cannot be blank", success: success});
    try{
        let sql = `select * from employeeAccount where username = '${username}'`;
        pool.query(sql,async (err,result) => {
            if(err)
                return res.send({message: err, success: success});
            if(result.length != 0){
                if(await bcrypt.compare(password,result[0].Password)){
                    success = true;
                    let sql = `select firstname,middlename,lastname from employee where eid = ${result[0].EID}`;
                    pool.query(sql,(err,row) => {
                        const token = jwt.sign({
                            id: result[0].EID,
                            name: row[0].firstname + " " + row[0].lastname
                        }, "somesecrettokenforjsonwebtoken");

                        if(row[0].middlename == "")
                            return res.send({message: `${row[0].firstname} ${row[0].lastname}`, success: success, token: token});
                        else
                            return res.send({message: `${row[0].firstname} ${row[0].middlename} ${row[0].lastname}`, success: success, token: token});
                    });
                }else{
                    return res.send({message: "Incorrect username or password", success: success});
                }
            }else
            return res.send({message: "Incorrect username or password", success: success});
        });
    }catch{
        return res.status(400).send("2");
    }
});

router.post('/sqlInjection', (req,res) => {
    try{
        const hashedPassword = bcrypt.hash(req.body.password, 10);
        const user = {EID: req.body.eid, username: req.body.username, password:hashedPassword};
        const sql = `insert into employeeAccount(EID,username,password) values (${user.EID},'${user.username}','${user.password}')`
        pool.query(sql, (err,result) => {
            if(err)
                console.log(err);
            return res.send("Successfully insert into database");
        });
    }catch{
        return res.send("Error");
    }
});

module.exports = router;