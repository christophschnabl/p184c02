const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');


async function addFraud() {
    try {

    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addFraud();
