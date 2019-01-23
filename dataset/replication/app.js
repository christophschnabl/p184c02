const pool = require('./modules/database.js');
const wait = require('./modules/wait.js');


async function replicationLoop() {
    while (true) {
        await wait(10000);
    }
}

replicationLoop();
