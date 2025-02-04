/* replication version v0.2 */

const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const wait = require('./modules/wait.js');
const driver = require('./modules/neo4j.js');
const session = driver.session();


async function readRows() {
    return (await Promise.all([
        await pool.query(queries.customerPollingSelect),
        await pool.query(queries.creditCardPollingSelect),
        await pool.query(queries.customerCreditCardPollingSelect),
        await pool.query(queries.transactionPollingSelect)
    ])).map(el => el[0]);
}


async function deleteRows(customers, creditcards, customerCreditCard, transactions) {
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
    const transactionPromises = Promise.all(
        transactions.map(
            el => pool.query(queries.transactionPollingDelete, [el.TransactionID])
        )
    );

    await Promise.all([customerPromises, creditCardPromises, customerCreditCardPromises, transactionPromises]);
}


async function updateCustomers(customers) {
    for (const customer of customers) {
        if (customer.Action === 'upd' || customer.Action === 'ins') {
            await session.run(`MERGE (customer:Customer {
                id: {CustomerUUID},
                name: {Name},
                accountStatus: {AccountStatus}
                })`, customer);
            await session.run(`MERGE (phone: Phone {
                telephone: {Telephone}
                })`, customer);
            await session.run(`MERGE (address: Address {
                country: {Country},
                address: {Address}
                })`, customer);
            await session.run(`MERGE (ssn: SSN {
                SSN: {SSN}
                })`, customer);
            await session.run(`
                MATCH (a:Customer { id: {CustomerUUID} })-[r:USES_PHONENUMBER]->()
                DELETE r`, customer);
            await session.run(`
                MATCH (a:Customer { id: {CustomerUUID} })-[r:HAS_ADDRESS]->()
                DELETE r`, customer);
            await session.run(`
                MATCH (a:Customer { id: {CustomerUUID} })-[r:HAS_SSN]->()
                DELETE r`, customer);
            await session.run(`
                MATCH (a:Customer),(b:Phone)
                WHERE a.id = {CustomerUUID}
                AND b.telephone = {Telephone}
                MERGE (a)-[r:USES_PHONENUMBER]->(b)
                RETURN type(r)`, customer);
            await session.run(`
                MATCH (a:Customer),(b:SSN)
                WHERE a.id = {CustomerUUID}
                AND b.SSN = {SSN}
                MERGE (a)-[r:HAS_SSN]->(b)
                RETURN type(r)`, customer);
            await session.run(`
                MATCH (a:Customer),(b:Address)
                WHERE a.id = {CustomerUUID}
                AND b.address = {Address}
                AND b.country = {Country}
                MERGE (a)-[r:HAS_ADDRESS]->(b)
                RETURN type(r)`, customer);
        } else {
            await session.run(`
                MATCH (a:Customer), (b:Phone), (c:Address), (d:SSN)
                WHERE a.id = {CustomerUUID}
                AND b.telephone = {Telephone}
                AND c.country = {Country}
                AND c.address = {Address}
                AND d.SSN = {SSN}
                DETACH DELETE a, b, c, d`, customer);
        }
    }
}

async function updateCreditCards(creditcards) {
    for (const creditcard of creditcards) {
        if (creditcard.Action === 'upd' || creditcard.Action === 'ins') {
            await session.run(`MERGE (creditcard: CreditCard {
                cardNumber: {CardNumber},
                issuingNetwork: {IssuingNetwork},
                CVV: {CVV},
                expirationMonth: {ExpirationMonth},
                expirationYear: {ExpirationYear}
                })`, creditcard);
        } else {
            await session.run(`
                MATCH (a:CreditCard)
                WHERE a.id = {CardNumber}
                DETACH DELETE a`, creditcard);
        }
    }
}

async function updateCustomerCreditCards(customerCreditCards) {
    for (const customerCreditCard of customerCreditCards) {
        if (customerCreditCard.Action === 'ins') {
            await session.run(`
                MATCH (a:Customer),(b:CreditCard)
                WHERE a.id = {CustomerUUID}
                AND b.cardNumber = {CardNumber}
                MERGE (a)-[r:USES_CREDITCARD]->(b)
                RETURN type(r)`, customerCreditCard);
        } else if (customerCreditCard.Action === 'del') {
            await session.run(`
            MATCH (a:Customer)-[r:USES_CREDITCARD]->(b:CreditCard)
            WHERE a.id = {CustomerUUID}
            AND b.cardNumber = {CardNumber}
            DELETE r`, customerCreditCard);
        }
    }
}


async function updateTransactions(transactions) {
    for (transaction of transactions) {
        if (transaction.Action === 'ins') {
            await session.run(`
                MATCH (c1:Customer {id: $cuuidSender}),(c2:Customer {id: $cuuidReciever})
                MERGE (c1)-[r:TRANSACTION]->(c2)
                RETURN type(r)`, {
                    cuuidSender: transaction.CustomerUUIDSender,
                    cuuidReciever: transaction.CustomerUUIDReciever
                });
        } else if (transaction.Action === 'del') {
            await session.run(`
                MATCH (c1:Customer {id: $cuuidSender})
                -[r:TRANSACTION]->
                (c2:Customer {id: $cuuidReciever})
                DELETE r`, {
                    cuuidSender: transaction.CustomerUUIDSender,
                    cuuidReciever: transaction.CustomerUUIDReciever
                });
        }
    }
}


async function replicationLoop() {
    while (true) {
        console.log('\nPolling tables...');

        try {
            const [customers, creditcards, customerCreditCard, transactions] = await readRows();

            console.log('Changes:');
            console.log('Customer rows: ' + customers.length);
            console.log('Creditcard rows: ' + creditcards.length);
            console.log('relation table rows: ' + customerCreditCard.length);
            console.log('Transaction rows: ' + transactions.length);

            await Promise.all([
                updateCustomers(customers),
                updateCreditCards(creditcards),
                updateCustomerCreditCards(customerCreditCard),
                updateTransactions(transactions),
                deleteRows(customers, creditcards, customerCreditCard, transactions)]);
        } catch (e) {
            console.warn(e);
        }

        await wait(10000);
    }
}

replicationLoop();
