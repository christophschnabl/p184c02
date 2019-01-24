const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');


async function replicationLoop() {
    while (true) {
        console.log('Polling tables...');

        const [customers, creditcards, customerCreditCard] = (await Promise.all([
            await pool.query(queries.customerPollingSelect),
            await pool.query(queries.creditCardPollingSelect),
            await pool.query(queries.customerCreditCardPollingSelect)
        ])).map(el => el[0]);

        console.log("Veränderungen:");
        console.log(customers, creditcards, customerCreditCard);

        // nur die löschen, die gelesaen wurden
        //delete polling tables after polling

        console.log(customers);
        //await pool.query(queries.customerPollingDelete);

        //await pool.query(queries.creditCardPollingDelete);

        //await pool.query(queries.customerCreditCardDelete);

        await wait(10000);
    }
}

replicationLoop();
