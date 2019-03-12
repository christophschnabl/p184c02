const pool = require('./modules/database.js');
const shuffle = require('./modules/shuffle.js');


const rBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


const MAX_TRANSACTIONS = 15000;
const MIN_TRANSACTIONS = 10000;
const NUM_TRANSACTIONS = rBetween(MIN_TRANSACTIONS, MAX_TRANSACTIONS);

const customerSelect = `select CustomerUUID from Customer`;


/**
 * picks n customers
 * @param {Array} customers
 * @param {Number} n
 * @returns {Array.<String>}
 */
function pickNCustomers(customers, n) {
    const shuffled = shuffle(customers.slice());
    return shuffled.slice(0, n);
}

/**
 * picks n customers, excluding one
 * @param {Array} customers
 * @param {Number} n
 * @param {Number} customerUUIDNot
 * @returns {Array.<String>}
 */
function pickNCustomersNot(customers, n, customerUUIDNot) {
    const idxOf = customers.indexOf(customerUUIDNot);
    const customerCopy = customers.slice();
    customerCopy.splice(idxOf, 1);
    const shuffled = shuffle(customerCopy.slice());
    return shuffled.slice(0, n);
}


/**
 * creates an insert query for a customer transaction
 * @param {Array.<Number>} customerUUIDs
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
            await pool.query(customerSelect);
        let customers = [];
        for (let i = 0; i < res.length; i++) {
            customers.push(res[i].CustomerUUID);
        }

        await Promise.all(
            new Array(NUM_TRANSACTIONS)
                .fill(0)
                .map(i =>
                    createCustomerTransactionQuery(pickNCustomers(customers, 2))
                )
        );

        console.log(`Did ${NUM_TRANSACTIONS} SQL updates.`);

        console.log('Now add fraudulent transactions...');

        const fraudulentCustomers = pickNCustomers(customers, 17);
        await Promise.all(
            fraudulentCustomers
                .map(customerUUID =>
                    Promise.all(
                        new Array(rBetween(100, 5000))
                            .fill(0)
                            .map(i =>
                                createCustomerTransactionQuery(
                                    customerUUID, pickNCustomersNot(customers, 1, customerUUID)
                                )
                            )
                    )
                )
        );

        console.log('Done.');

    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addTransactions();
