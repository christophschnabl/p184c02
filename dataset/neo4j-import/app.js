const pool = require('./modules/database.js');
const driver = require('./modules/neo4j.js');
const queries = require('./modules/queries.js');

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

        if (customers.length != creditcards.length)
            throw 'Number of rows not matching!';

        console.log('\nInserting ' + customers.length + ' rows...\n');

        for (let i = 0; i < customers.length; i++) {
            console.log(`Inserting row number ${i}..`);

            const customer = customers[i];
            const creditcard = creditcards[i];

            await session.run(`CREATE (customer:Customer {
                id: {CustomerUUID},
                name: {Name},
                accountStatus: {AccountStatus}
            })`, customer);
            await session.run(`CREATE (phone: Phone {
                telephone: {Telephone}
            })`, customer);
            await session.run(`CREATE (address: Address {
                country: {Country},
                address: {Address}
            })`, customer);
            await session.run(`CREATE (ssn: SSN {
                SSN: {SSN}
            })`, customer);
            await session.run(`CREATE (creditcard: CreditCard {
                cardNumber: {CardNumber},
                issuingNetwork: {IssuingNetwork},
                CVV: {CVV},
                expirationMonth: {ExpirationMonth},
                expirationYear: {ExpirationYear}
            })`, creditcard);

            await session.run(`
            MATCH (a:Customer),(b:Phone)
            WHERE a.id = {CustomerUUID}
              AND b.telephone = {Telephone}
            CREATE (a)-[r:USES_PHONENUMBER]->(b)
            RETURN type(r)`, customer);

            await session.run(`
            MATCH (a:Customer),(b:SSN)
            WHERE a.id = {CustomerUUID}
              AND b.SSN = {SSN}
            CREATE (a)-[r:HAS_SSN]->(b)
            RETURN type(r)`, customer);

            await session.run(`
            MATCH (a:Customer),(b:Address)
            WHERE a.id = {CustomerUUID}
              AND b.address = {Address}
              AND b.country = {Country}
            CREATE (a)-[r:HAS_ADDRESS]->(b)
            RETURN type(r)`, customer);

            await session.run(`
            MATCH (a:Customer),(b:CreditCard)
            WHERE a.id = {CustomerUUID}
              AND b.cardNumber = {CardNumber}
            CREATE (a)-[r:USES_CREDITCARD]->(b)
            RETURN type(r)`, {
                    CustomerUUID: customer.CustomerUUID,
                    CardNumber: creditcard.CardNumber
                }
            );
        }

        console.log('\nInserted ' + customers.length + ' rows.');

    } catch (e) {
        console.warn('An error occured', e);
    }


    session.close();
    driver.close();

    await pool.end();
}


importFromMysql();
