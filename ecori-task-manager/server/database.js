// Import modules and configure PostgreSQL connection pool
const Pool = require('pg').Pool
require('dotenv').config()

// Create a new Pool instance for connecting to PostgreSQL database
const pool = new Pool({
    user: process.env.USRNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'ecori_taskmanager'
})

module.exports = pool