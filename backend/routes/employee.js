const express = require('express')
const pool = require('../pool')
const router = express.Router()
const regex = require('../regex')
const bcrypt = require('bcrypt')

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

router.post('/addEmployee', async (req, res) => {
    let data = req.body.data

    if (regex.test(data.eid + data.firstname + data.lastname + data.middlename + data.salary + data.position + data.password)) {
        return res.send({ status: 'error', message: 'The input cannot contain special characters' })
    }

    if (isNaN(data.eid))
        return res.send({ status: 'error', message: 'Employee ID cannot contain character' })
    if (isNaN(data.salary))
        return res.send({ status: 'error', message: 'Salary cannot contain character' })

    pool.getConnection((err, connection) => {
        connection.beginTransaction()
        try {
            let sql = `insert into employee values (${data.eid}, '${data.firstname}', '${data.middlename}', '${data.lastname}', '${data.position}', ${data.salary}, ${data.dno}, 1)`
            connection.execute(sql, async (err, result) => {
                if (err)
                    throw err

                const hashedPassword = await bcrypt.hash(data.password, 10)

                sql = `insert into employee_account values (${data.eid},'${hashedPassword}')`

                connection.execute(sql, (err, result) => {
                    if (err)
                        throw err
                    return res.send({ status: 'success', message: 'Successfully added new employee' })
                })
            })

            connection.commit()

        } catch (err) {
            console.log(err)
            connection.rollback()
            if (err.errno == 1062)
                return res.send({ status: 'error', message: 'Employee ID already existed' })
            return res.send({ status: 'error', message: err.message })
        }
    })
})

router.post('/updatepassword', async (req, res) => {
    let data = req.body;
    console.log(data)

    if (regex.test(data.value)) {
        return res.send({ status: 'error', message: 'password must not contain special characters' })
    }

    let hashedPassword = await bcrypt.hash(data.value, 10);

    let sql = `update employee_account set password = '${hashedPassword}' where eid = ${data.eid}`

    pool.query(sql, (err, result) => {
        if (err) return res.send({ status: 'error', message: err.message })
        return res.send({ status: 'success', message: `Successfully update password on EID: ${data.eid}` })
    })
})

router.get('/getEmployee', (req, res) => {
    let sql = `select EID,concat(Firstname,' ',Middlename,' ',Lastname) Name, Position, Salary
            from employee where eid = ${req.query.eid}`
    pool.query(sql, (err, result) => {

        return res.send(JSON.stringify(result))
    })
})

router.get('/getOrderDetail', (req, res) => {
    let sql = `select * from order_detail where orderid = ${req.query.oid}`

    pool.query(sql, (err, result) => {
        return res.send(JSON.stringify(result))
    })
})
module.exports = router