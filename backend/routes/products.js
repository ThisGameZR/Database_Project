
const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/', (req,res) => {
    pool.query("select * from product natural join supplier", (err, result) => {
        res.end(JSON.stringify(result));
    });
});

router.get('/getsupplier', (req, res) => {
    pool.query("select SID, SName from supplier", (err, result) => {
        res.end(JSON.stringify(result));
    });
})

router.get('/getsize', (req, res) => {
    pool.query("select distinct Size from product", (err, result) => {
        res.end(JSON.stringify(result));
    });
})

router.get('/getstock', (req, res) => {
    pool.query(`select stocks from product where pid = ${req.query.pid}`, (err, result) => {
        if (err) console.log(err)
        return res.send(result)
    })
})

module.exports = router;