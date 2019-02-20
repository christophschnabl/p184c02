const pool = require('./modules/database.js');

const MAX_TRANSACTIONS = 15000;
const MIN_TRANSACTIONS = 10000;
const NUM_TRANSACTIONS = Math.floor(Math.random() * (MAX_TRANSACTIONS - MIN_TRANSACTIONS + 1) + MIN_TRANSACTIONS)


function createQuery() {

}

async function addFraud() {
    try {
        console.log('Adding transactions...');

        await Promise.all(new Array(NUM_TRANSACTIONS).map(i => pool.query(createQuery(i))));

        console.log(`Did ${NUM_TRANSACTIONS} SQL updates.`);
    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addFraud();
