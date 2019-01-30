const pool = require('./modules/database.js');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function createTable() {
    const sqlTable = (await readFile('./create-table.sql')).toString();
    const sqlTrigger = (await readFile('./create-trigger.sql')).toString();

    try {
        await pool.query(sqlTable);
        await pool.query(sqlTrigger);
    } catch (e) {
        console.warn('An error occured', e);
    } finally {
        await pool.end();
    }
}


createTable();
