const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');


async function replicationLoop() {
    while (true) {
        console.log('Polling tables...');

        const [customers, _cfields] =
            await pool.query(queries.customerPollingSelect);
        const [creditcards, _crfields] =
            await pool.query(queries.creditCardPollingSelect);
        const [customerCreditCard, _ccrfields] =
            await pool.query(queries.customerCreditCardPollingSelect);

        console.log("Veränderungen:");
        console.log(customers, creditcards, customerCreditCard);

        //delete polling tables after polling
        await pool.query(queries.customerPollingDelete);

        await pool.query(queries.creditCardPollingDelete);

        await pool.query(queries.customerCreditCardDelete);

        await wait(10000);
    }
}

replicationLoop();
