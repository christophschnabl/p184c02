const pool = require('./modules/database.js');
const shuffle = require('./modules/shuffle.js');


const rBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


const MAX_TRANSACTIONS = 150000;
const MIN_TRANSACTIONS = 100000;
const NUM_TRANSACTIONS = rBetween(MIN_TRANSACTIONS, MAX_TRANSACTIONS);


const creditCardSelect = `select CardNumber from CreditCard`;


/**
 * picks random creditcards
 * @param {Array} creditcards
 * @returns {Array.<String>}
 */
function pickTwoCreditCards(creditcards) {
    const shuffles = shuffle(creditcards.slice());
    return shuffle.slice(0, 2);
}


/**
 * creates an insert query
 * @param {Array.<String>} cards
 */
function createQuery(cards) {
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

        await Promise.all(
            new Array(NUM_TRANSACTIONS)
                .fill(0)
                .map(i =>
                    createQuery(creditcards)
                )
        );

        console.log(`Did ${NUM_TRANSACTIONS} SQL updates.`);
    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addTransactions();
