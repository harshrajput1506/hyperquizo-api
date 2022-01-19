const createmysql = require("mysql");
const fs = require('fs');
const mysql = createmysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    dialect: 'mysql',
    logging: true,
    force: true,
    ssl: true,
    dialectOptions: {
        ssl: {
            ssl: true,
            cert: fs.readFileSync("./hyperquizo/config/ca-certificate.crt")
        }
    }
    
});

module.exports = mysql;
