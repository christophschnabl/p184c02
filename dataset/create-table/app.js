const pool = require('./modules/database.js');
const fs = require('fs');

async function createTable() {
    let sql =  fs.readFile('./create-table.sql');
    
    try {
        await pool.query(sql);
    } catch (e) {
        console.warn('An error occured', e);
    }
}


createTable();