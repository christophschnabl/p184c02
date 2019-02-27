const driver = require('./modules/neo4j.js');
const session = driver.session();

// CreditCards, for which transactions should be generated
const NUM_CREDIT_CARDS = 10;

/**
 * Generates random number between minimum and maximum
 * @param {number} min - minimum
 * @param {number} max - maximum
 */
function randomBetween(min, max) {
    return Math.floor((Math.random() * max) + min);
}

/**
 * Adds transactions to ${NUM_CREDIT_CARDS} random creditcard numbers
 */
function addTransactions() {
    const creditCardNumbers = session.run('match(cc:CreditCard) return cc.cardNumber');  // Gets all creditcard numbers
    creditCardNumbers.then(result => {
        session.close();
        let numbers = [];

        // Selects ${NUM_CREDIT_CARDS} random creditcard numbers
        for(let i = 0; i < NUM_CREDIT_CARDS; i++) {
            let idx = randomBetween(0, result.records.length);
            numbers.push(result.records[idx].get(0));
        }

        numbers.forEach((cardNumberRoot) => {
            // Creates between 20 and 50 transactions for each creditcard
            for(let i = 0; i < randomBetween(20, 50); i++) {
                // Select one creditcard number which is not one of the one to create transactions for
                let idx = randomBetween(0, result.records.length);
                while(result.records[idx].get(0) == cardNumberRoot) {
                    idx = randomBetween(0, result.records.length);
                }
                let cardNumberTransaction = result.records[idx].get(0);

                //console.log(cardNumberRoot + " ||| " + cardNumberTransaction);

                // Create transaction between the two creditcard numbers
                const creditCard = driver.session().run('match (c1:CreditCard {cardNumber: $root}), (c2:CreditCard {cardNumber: $transaction})\
create (c1)-[:TRANSACTION]->(c2) return c1',
                {root: cardNumberRoot, transaction: cardNumberTransaction});

                creditCard.then(result => {
                    //console.log(result.records[0].get(0).properties.cardNumber);
                }).catch(err => {
                    console.log('Error: ' + err);
                });
            }
        });
    }).catch(err => {
        console.log('Error: ' + err);
        driver.close();
    });
}

addTransactions();