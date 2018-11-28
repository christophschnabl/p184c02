const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'frauddetection',
        password: 'frauddetection',
        database: 'frauddetection'
    }
);

module.exports = pool.promise();
