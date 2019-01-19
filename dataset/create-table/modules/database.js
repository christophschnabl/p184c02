const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'frauddetection',
        password: process.env.MYSQL_PASSWORD || 'frauddetection',
        database: process.env.MYSQL_DB || 'frauddetection',
        multipleStatements: true
    }
);

module.exports = pool.promise();
