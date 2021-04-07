const express = require('express')
const pool = require('../pool')
const router = express.Router()
const regex = require('../regex')

router.get('/', (req, res) => {

    let sql = `select EID,concat(Firstname,' ',Middlename,' ',Lastname) Name, Position, Salary
            from employee where dno = ${req.query.dno} and \`condition\` = 1`

    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

router.post('/fireEmployee', (req, res) => {

    let sql = `update employee set \`condition\` = 0 where eid = ${req.body.eid}`
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: `Successfully fire employee with eid: ${req.body.eid}` })
    })

})

router.post('/editEmployeeInfo', (req, res) => {

    if (regex.test(req.body.value)) {
        return res.send({ status: 'error', message: `${req.body.type} cannot contain special character` })
    }

    let sql
    if (req.body.type == "Salary") {
        if (isNaN(req.body.value)) {
            return res.send({ status: 'error', message: 'Salary cannot contain character' })
        }
        sql = `update employee set ${req.body.type} = ${req.body.value} where eid = ${req.body.eid}`
    }

    if (req.body.type == "Position") {
        if (req.body.value.toLowerCase().includes("manager")) {
            return res.send({ status: 'error', message: `Cannot set position to ${req.body.value}` })
        }
        sql = `update employee set ${req.body.type} = '${req.body.value}' where eid = ${req.body.eid}`
    }

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.send({ status: 'error', message: err.message })
        }
        return res.send({ status: 'success', message: `Successfully update ${req.body.type} to ${req.body.value}` })
    })
})

router.get('/getPosition', (req, res) => {
    let sql = `select * from department_position where dno = ${req.query.dno} and position not like '%Manager%'`
    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})

module.exports = router