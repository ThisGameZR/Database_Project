const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../pool');
const regex = require('../regex');
const session = require('express-session')

router.post('/',async (req,res) => {
    const eid = req.body.username;
    const password = req.body.password;
    let success = false;

    if(regex.test(eid) || regex.test(password)){
        return res.send({message:"Error special characters are not allowed" , success: success})
    }

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
                        req.session.user = {eid: result[0].EID, firstname: row[0].firstname, middlename: row[0].middlename, lastname:row[0].lastname}
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
        return res.status(400).send("eRRORRR ");
    }
});

router.get('/', (req,res) => {
    return res.send({session: req.session})
})

router.get('/logout',(req,res) => {
    req.session.destroy()
    return res.send("Logout success")
})

module.exports = router;