const express = require('express')
const pool = require('../pool')
const router = express.Router()

router.get('/', (req, res) => {

    let sql = `select EID,concat(Firstname,' ',Middlename,' ',Lastname) Name, Position, Salary
            from employee where dno = ${req.query.dno}`

    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.post('/fireEmployee', (req, res) => {

    let sql = `update employee set condition = 0 where eid = ${req.body.eid}`
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: `Successfully fire employee with eid: ${req.body.eid}` })
    })

})

module.exports = router