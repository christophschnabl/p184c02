const readGermanCreditData = require('./modules/customers.js');
const readCreditCards = require('./modules/creditCards.js');
const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);


/**
 * This function performs inserts for german-credit.data and credit-cards[1-5:5].json
 */
async function importFromFile() {
    console.log('Reading files...');

    const customerData = await readGermanCreditData('../german-credit.data');
    const creditCardData = await readCreditCards([
        '../credit-cards/credit-cards-1:5.json',
        '../credit-cards/credit-cards-2:5.json',
        '../credit-cards/credit-cards-3:5.json',
        '../credit-cards/credit-cards-4:5.json',
        '../credit-cards/credit-cards-5:5.json'
    ]);
    const telephoneData = ((await readFile('../telephone.data')).toString()).split('\n');
    const SSNData = ((await readFile('../SSN.data')).toString()).split('\n');

    const customerNameAddressData = creditCardData.map(e => [e.Name, e.Country, e.Address]);
    let customerInsertData = [];
    for (let i = 0; i < customerData.length; i += 1) {
        customerInsertData[i] = [
            i + 1,
            telephoneData[i],
            SSNData[i],
            ...customerNameAddressData[i].concat(...customerData[i])
        ];
    }

    const creditCardInsertData = creditCardData.map((entry, i) => {
        const expYear = parseInt(entry.Exp.split('/')[1], 10);
        const expMonth = parseInt(entry.Exp.split('/')[0], 10);
        return [entry.CardNumber, entry.IssuingNetwork, entry.CVV, expYear, expMonth, i + 1];
    });

    console.log(`Inserting ${creditCardInsertData.length} rows...`);

    try {
        await pool.query(queries.customerDelete);
        await pool.query(queries.creditCardDelete);
        await pool.query(queries.customerInsert, [customerInsertData]);
        await pool.query(queries.creditCardInsert, [creditCardInsertData]);
    } catch (e) {
        console.warn('An error occured', e);
    }

    console.log(`Inserted ${creditCardInsertData.length} rows.`);

    await pool.end();
}


importFromFile();
