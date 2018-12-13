const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');


async function addFraud() {
    try {
        console.log('Adding fraud rings...');

        for (const query of queries) {
            await pool.query(query);
        }

        console.log(`Did ${queries.length} SQL updates.`);
    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addFraud();
