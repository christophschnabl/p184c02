const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');
const driver = require('./modules/neo4j.js');


async function replicationLoop() {
    while (true) {
        console.log('Polling tables...');

        try {
            // read rows...

            const [customers, creditcards, customerCreditCard] = (await Promise.all([
                await pool.query(queries.customerPollingSelect),
                await pool.query(queries.creditCardPollingSelect),
                await pool.query(queries.customerCreditCardPollingSelect)
            ])).map(el => el[0]);

            console.log("Veränderungen:");
            console.log(customers, creditcards, customerCreditCard);





            // delete rows..

            const customerPromises = Promise.all(
                customers.map(
                    customer => pool.query(queries.customerPollingDelete, customer.CustomerUUID)
                )
            );
            const creditCardPromises = Promise.all(
                creditcards.map(
                    creditcard => pool.query(queries.creditCardPollingDelete, creditcard.CardNumber)
                )
            );
            const customerCreditCardPromises = Promise.all(
                customerCreditCard.map(
                    el => pool.query(queries.customerCreditCardPollingDelete, [el.CustomerUUID, el.CardNumber])
                )
            );

            await Promise.all([customerPromises, creditCardPromises, customerCreditCardPromises]);

        } catch (e) {
            console.warn(e);
        }

        await wait(10000);
    }
}

replicationLoop();
