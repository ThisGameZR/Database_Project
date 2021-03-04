const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../pool');

router.post('/',async (req,res) => {
    const eid = req.body.username;
    const password = req.body.password;
    let success = false;

    if(eid === "")
        return res.status(200).send({message: "Username cannot be blank", success: success});
    if(password === "")
        return res.status(200).send({message: "Password cannot be blank", success: success});
    try{
        let sql = `select * from employee_account where eid = ${parseInt(eid)}`;
        pool.query(sql,async (err,result) => {
            if(err)
                return res.send({message: err, success: success});
            if(result.length != 0){
                if(await bcrypt.compare(password,result[0].Password)){
                    success = true;
                    let sql = `select firstname,middlename,lastname from employee where eid = ${parseInt(result[0].EID)}`;
                    pool.query(sql,(err,row) => {
                        if(row[0].middleName == "")
                            return res.send({message: `${row[0].firstname} ${row[0].lastname}`, success: success});
                        return res.send({message: `${row[0].firstname} ${row[0].middlename} ${row[0].lastname}`, success: success});
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

module.exports = router;