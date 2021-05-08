const createmysql = require("mysql");
const mysql = createmysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
    
    
});

module.exports = mysql;
