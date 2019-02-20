const pool = require('./modules/database.js');
const shuffle = require('./modules/shuffle.js');

const MAX_TRANSACTIONS = 5;
const MIN_TRANSACTIONS = 1;
const NUM_TRANSACTIONS = Math.floor(Math.random() * (MAX_TRANSACTIONS - MIN_TRANSACTIONS + 1) + MIN_TRANSACTIONS);

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
    const date = `2015-02-02`;
    const amount = Math.floor(Math.random() * (1000000 - 10 + 1) + 10);

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
