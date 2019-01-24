const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');
const driver = require('./modules/neo4j.js');


async function readRows() {
    return (await Promise.all([
        await pool.query(queries.customerPollingSelect),
        await pool.query(queries.creditCardPollingSelect),
        await pool.query(queries.customerCreditCardPollingSelect)
    ])).map(el => el[0]);
}


async function deleteRows() {
    const customerPromises = Promise.all(
        customers.map(
            el => pool.query(queries.customerPollingDelete, el.CustomerUUID)
        )
    );
    const creditCardPromises = Promise.all(
        creditcards.map(
            el => pool.query(queries.creditCardPollingDelete, el.CardNumber)
        )
    );
    const customerCreditCardPromises = Promise.all(
        customerCreditCard.map(
            el => pool.query(queries.customerCreditCardPollingDelete, [el.CustomerUUID, el.CardNumber])
        )
    );

    await Promise.all([customerPromises, creditCardPromises, customerCreditCardPromises]);
}


async function updateCustomers() {

}

async function updateCreditCards() {

}

async function updateCustomerCreditCards() {

}


async function replicationLoop() {
    while (true) {
        console.log('Polling tables...');

        try {
            const [customers, creditcards, customerCreditCard] = await readRows();

            console.log("Veränderungen:");
            console.log(customers, creditcards, customerCreditCard);

            await Promise.all([updateCustomers(), updateCreditCards(), updateCustomerCreditCards()]);

            await deleteRows();
        } catch (e) {
            console.warn(e);
        }

        await wait(10000);
    }
}

replicationLoop();
