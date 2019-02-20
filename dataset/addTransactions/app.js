const pool = require('./modules/database.js');
const shuffle = require('./modules/shuffle.js');

const MAX_TRANSACTIONS = 15000;
const MIN_TRANSACTIONS = 10000;
const NUM_TRANSACTIONS = Math.floor(Math.random() * (MAX_TRANSACTIONS - MIN_TRANSACTIONS + 1) + MIN_TRANSACTIONS)

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
    return `insert into Transaction (Date, Amount, CardNumberSender, CardNumberReciever)
            values (${date}, ${amount}, ${cards[0]}, ${cards[1]})`;
}


/*
 * adds transactions to DB
 */
async function addTransactions() {
    try {
        console.log('Adding transactions...');

        const [res, _] =
            await pool.query(creditCardSelect);
        const creditcards = res.map(el => el.CreditCard);

        /*await Promise.all(
            new Array(NUM_TRANSACTIONS)
                .map(i =>
                    pool.query(
                        createQuery(creditcards)
                    )
                )
        );*/

        const queries = new Array(NUM_TRANSACTIONS).map(i => reateQuery(creditcards));
        console.log(queries);

        console.log(`Did ${NUM_TRANSACTIONS} SQL updates.`);
    } catch (e) {
        console.warn('An error occured', e);
    }

    await pool.end();
}


addTransactions();
