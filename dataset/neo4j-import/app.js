const pool = require('./modules/database.js');
const driver = require('./modules/neo4j.js');
const queries = require('./modules/queries.js');

async function importFromMysql() {
    const session = driver.session();

    try {
        const [customers, _cufields] =
            await pool.query(queries.customerSelect);
        const [creditcards, _crfields] =
            await pool.query(queries.creditCardSelect);

        for (const customer of customers) {
            await session.run(`CREATE (customer:Customer {
                id: {CustomerUUID},
                name: {Name},
                country: {Country},
                address: {Address},
                accountStatus: {AccountStatus}
            })`, customer);
        }

    } catch (e) {
        console.warn('An error occured', e);
    }


    session.close();
    driver.close();

    await pool.end();
}


importFromMysql();
