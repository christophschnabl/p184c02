const readGermanCreditData = require('./modules/customers.js');
const readCreditCards = require('./modules/creditCards.js');
const pool = require('./modules/database.js');


async function importFromFile() {
    const customerData = await readGermanCreditData('../german-credit.data');
    const creditCardData = await readCreditCards(['../credit-cards/credit-cards-1:5.json']);
    console.log(customerData, creditCardData);

    const res = await pool.query('select 1+1');

    console.log(res);

    await pool.end();
}


importFromFile();