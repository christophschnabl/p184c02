const pool = require('./modules/database.js');
const driver = require('./modules/neo4j.js');
const queries = require('./modules/queries.js');

/**
 * Migrates data from MySQL to Neo4j
 */
async function importFromMysql() {
    const session = driver.session();

    try {
        console.log('Deleting DB contents...');
        await session.run(`MATCH (n)
                           DETACH DELETE n`);

        const [customers, _cufields] =
            await pool.query(queries.customerSelect);
        const [creditcards, _crfields] =
            await pool.query(queries.creditCardSelect);
        const [customerCreditCard, _ccrfields] =
            await pool.query(queries.customerCreditCardSelect);
        const [transactions, _trfields] =
            await pool.query(queries.transactionSelect);

        const customerToCreditCard = customerCreditCard.reduce((obj, v) => {
            obj[v.CustomerUUID] = v.CardNumber;
            return obj;
        }, {});

        const creditCardToCustomer = customerCreditCard.reduce((obj, v) => {
            obj[v.CardNumber] = v.CustomerUUID;
            return obj;
        }, {});

        const getCustomerUUIDForCreditCardNumber = (cardNumber) => creditCardToCustomer[cardNumber];

        if (customers.length != creditcards.length)
            throw 'Number of rows not matching!';

        console.log('\nInserting ' + customers.length + ' customer rows...\n');

        for (let i = 0; i < customers.length; i++) {
            //console.log(`Inserting row number ${i}..`);

            const customer = customers[i];

            await Promise.all([
                session.run(`MERGE (customer:Customer {
                    id: {CustomerUUID},
                    name: {Name},
                    accountStatus: {AccountStatus}
                })`, customer),
                session.run(`MERGE (phone: Phone {
                    telephone: {Telephone}
                })`, customer),
                session.run(`MERGE (address: Address {
                    country: {Country},
                    address: {Address}
                })`, customer),
                session.run(`MERGE (ssn: SSN {
                    SSN: {SSN}
                })`, customer),
                session.run(`MATCH (c:Customer)
                    set c.id = toInteger(c.id)
                `)
            ]);

            await Promise.all([
                session.run(`
                MATCH (a:Customer),(b:Phone)
                WHERE a.id = {CustomerUUID}
                  AND b.telephone = {Telephone}
                MERGE (a)-[r:USES_PHONENUMBER]->(b)
                RETURN type(r)`, customer),
                session.run(`
                MATCH (a:Customer),(b:SSN)
                WHERE a.id = {CustomerUUID}
                  AND b.SSN = {SSN}
                MERGE (a)-[r:HAS_SSN]->(b)
                RETURN type(r)`, customer),
                session.run(`
                MATCH (a:Customer),(b:Address)
                WHERE a.id = {CustomerUUID}
                  AND b.address = {Address}
                  AND b.country = {Country}
                MERGE (a)-[r:HAS_ADDRESS]->(b)
                RETURN type(r)`, customer)
            ]);
        }

        console.log('Inserting Credit Card data...');

        for (const creditcard of creditcards) {
            await session.run(`MERGE (creditcard: CreditCard {
                cardNumber: {CardNumber},
                issuingNetwork: {IssuingNetwork},
                CVV: {CVV},
                expirationMonth: {ExpirationMonth},
                expirationYear: {ExpirationYear}
            })`, creditcard);
            await session.run(`
                MATCH (a:Customer),(b:CreditCard)
                WHERE a.id = {CustomerUUID}
                AND b.cardNumber = {CardNumber}
                MERGE (a)-[r:USES_CREDITCARD]->(b)
                RETURN type(r)`, {
                    CustomerUUID: getCustomerUUIDForCreditCardNumber(creditcard.CardNumber),
                    CardNumber: creditcard.CardNumber
                }
            );
        }

        console.log('\nInserted ' + customers.length + ' rows.');
        console.log('Inserting Transaction data...');

        for (const transaction of transactions) {
            await session.run(`
                MATCH (a:Customer {id: $cuuidSender}),(b:Customer {id: $cuuidReciever})
                CREATE (a)-[r:TRANSACTION {transactionID: $tid, amount: $amount, date: $datestr}]->(b)
                RETURN type(r)`, {
                    cuuidSender: transaction.CustomerUUIDSender,
                    cuuidReciever: transaction.CustomerUUIDReciever,
                    tid: transaction.TransactionID,
                    amount: transaction.Amount,
                    datestr: transaction.Date.toString()
                });
        }

        console.log('\nInserted ' + transactions.length + ' rows.');

    } catch (e) {
        console.warn('An error occured', e);
    }


    session.close();
    driver.close();

    await pool.end();
}


importFromMysql();
