const pool = require('./modules/database.js');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function createTable() {
    const sql = (await readFile('./create-table.sql')).toString();

    try {
        await pool.query(sql);
        await pool.end();
    } catch (e) {
        console.warn('An error occured', e);
    }
}


createTable();