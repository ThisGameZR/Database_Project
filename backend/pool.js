const util = require('util');
const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'plasticShop',
    port: '3306'
});

pool.getConnection((err,con) => {
    if(err)
        console.error("Something went wrong connecting to the database");
    if(con)
        pool.releaseConnection(con);
    return;
})

pool.query = util.promisify(pool.query);

module.exports = pool;