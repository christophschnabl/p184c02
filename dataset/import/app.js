const readGermanCreditData = require('./modules/customers.js');
const readCreditCards = require('./modules/creditCards.js');

async function importFromFile() {
    const customerData = await readGermanCreditData('../german-credit.data');
    const creditCardData = await readCreditCards(['../credit-cards/credit-cards-1:5.json']);
    console.log(customerData, creditCardData);
}


importFromFile();