const pool = require('./modules/database.js');
const shuffle = require('./modules/shuffle.js');


const rBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


const MAX_TRANSACTIONS = 15000;
const MIN_TRANSACTIONS = 10000;
const NUM_TRANSACTIONS = rBetween(MIN_TRANSACTIONS, MAX_TRANSACTIONS);


const creditCardSelect = `select CardNumber from CreditCard`;
const customerSelect = `select CustomerUUID from Customer`;


/**
 * picks random creditcards
 * @param {Array} creditcards
 * @returns {Array.<String>}
 */
function pickTwoCreditCards(creditcards) {
    const shuffled = shuffle(creditcards.slice());
    return shuffled.slice(0, 2);
}



/**
 * picks random customers
 * @param {Array} customers
 * @returns {Array.<String>}
 */
function pickTwoCustomers(customers) {
    const shuffled = shuffle(customers.slice());
    return shuffled.slice(0, 2);
}


/**
 * creates an insert query for a creditcard transaction
 * @param {Array.<String>} cards
 */
function createCreditCardTransactionQuery(cards) {
    const year = rBetween(2000, 2018);
    const month = rBetween(1, 12);
    const day = rBetween(1, 28);
    const date = `${year}-${month}-${day}`;

    const amount = rBetween(10, 100000);

    const data = [
        date,
        amount,
        cards[0],
        cards[1]
    ];

    return pool.query(`insert into Transaction (Date, Amount, CardNumberSender, CardNumberReciever)
            values (?, ?, ?, ?)`, data);
}


/**
 * creates an insert query for a customer transaction
 * @param {Array.<Number>} cards
 */
function createCustomerTransactionQuery(customerUUIDs) {
    const year = rBetween(2000, 2018);
    const month = rBetween(1, 12);
    const day = rBetween(1, 28);
    const date = `${year}-${month}-${day}`;

    const amount = rBetween(10, 100000);

    const data = [
        date,
        amount,
        customerUUIDs[0],
        customerUUIDs[1]
    ];

    return pool.query(`insert into Transaction (Date, Amount, CustomerUUIDSender, CustomerUUIDReciever)
            values (?, ?, ?, ?)`, data);
}


/*
 * adds transactions to DB
 */
async function addTransactions() {
    try {
        console.log('Adding transactions...');

        const [res, _] =
            await pool.query(creditCardSelect);
        let creditcards = [];
        for (let i = 0; i < res.length; i++) {
            creditcards.push(res[i].CardNumber);
        }

        const [res2, _2] =
            await pool.query(customerSelect);
        let customers = [];
        for (let i = 0; i < res.length; i++) {
            customers.push(res2[i].CustomerUUID);
        }

        await Promise.all(
            new Array(NUM_TRANSACTIONS)
                .fill(0)
                .map(i =>
                    rBetween(0, 1) === 0 ?
                        createCreditCardTransactionQuery(pickTwoCreditCards(creditcards)) :
                        createCustomerTransactionQuery(pickTwoCustomers(customers))
                )
        );

        console.log(`Did ${NUM_TRANSACTIONS} SQL updates.`);
    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addTransactions();
