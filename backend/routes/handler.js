const express = require('express');
const router = express.Router();

router.get('/product',(req,res) => {
    const data = [{
        "name": "Bicycle",
        "price": 200,
    }];
    res.end(JSON.stringify(data));
});



module.exports = router;