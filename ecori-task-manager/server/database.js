const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USRNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'ecori_taskmanager'
})

module.exports = pool