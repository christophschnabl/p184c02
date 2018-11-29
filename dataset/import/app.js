const readGermanCreditData = require('./modules/customers.js');
const readCreditCards = require('./modules/creditCards.js');
const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');


/** This function performs inserts for german-credit.data and credit-cards[1-5:5].json */
async function importFromFile() {
    const customerData = await readGermanCreditData('../german-credit.data');
    const creditCardData = await readCreditCards([
        '../credit-cards/credit-cards-1:5.json',
        '../credit-cards/credit-cards-2:5.json',
        '../credit-cards/credit-cards-3:5.json',
        '../credit-cards/credit-cards-4:5.json',
        '../credit-cards/credit-cards-5:5.json'
    ]);

    try {
        await pool.query(queries.customerInsert, [customerData]);
    } catch (e) {
        console.log('An error occured', e);
    }

    await pool.end();
}


importFromFile();
