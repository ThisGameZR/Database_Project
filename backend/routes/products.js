
const express = require('express');
const router = express.Router();
const pool = require('../pool');

router.get('/', (req,res) => {
    pool.query("select * from product natural join supplier", (err, result) => {
        res.end(JSON.stringify(result));
    });
});

module.exports = router;