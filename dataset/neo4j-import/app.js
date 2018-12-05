const pool = require('./modules/database.js');
const driver = require('./modules/neo4j.js');
const queries = require('./modules/queries.js');

async function importFromMysql() {
    const session = driver.session();

    try {

    } catch (e) {
        console.warn('An error occured', e);
    }


    session.close();
    driver.close();

    await pool.end();
}


importFromMysql();
