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

    customerData.forEach((element, index) => {
        customerData[index] = `(${customerData[index].split(' ').join(', ')})`;
    });

    // console.log(customerData);
    // console.log(creditCardData);

    // console.log(`${queries.customerInsert} ${customerData[0]}`);
    await pool.query(queries.customerInsert, customerData[0], (error, result) => {
        if (err) throw err;
        console.log(`Number of rows inserted: ${result.affectedRows}`);
    });
    /* await pool.query(queries.creditCardInsert, [creditCardData], function(error, result) {
        if (err) throw err;
        console.log("Number of rows inserted: " + result.affectedRows);
    }); */

    await pool.end();
}


importFromFile();
