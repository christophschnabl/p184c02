const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');


async function replicationLoop() {
    while (true) {
        console.log('Polling tables...');

        await wait(10000);
    }
}

replicationLoop();
