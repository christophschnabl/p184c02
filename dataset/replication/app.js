const pool = require('./modules/database.js');

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function replicationLoop() {
    while (true) {

        await wait(10000);
    }
}

replicationLoop();