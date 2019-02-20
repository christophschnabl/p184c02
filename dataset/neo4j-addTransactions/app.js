const driver = require('./modules/neo4j.js');
const session = driver.session();

const NUM_CREDIT_CARDS = 10;

function randomBetween(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function getAllCreditCards() {
    const creditCardNumbers = session.run('match(cc:CreditCard) return cc.cardNumber');
    creditCardNumbers.then(result => {
        session.close();
        let numbers = [];

        for(let i = 0; i < NUM_CREDIT_CARDS; i++) {
            let idx = randomBetween(0, result.records.length);
            numbers.push(result.records[idx].get(0));
        }

        numbers.forEach((cardNumberRoot) => {
            for(let i = 0; i < randomBetween(20, 50); i++) {
                let idx = randomBetween(0, result.records.length);
                while(result.records[idx].get(0) == cardNumberRoot) {
                    idx = randomBetween(0, result.records.length);
                }
                let cardNumberTransaction = result.records[idx].get(0);

                //console.log(cardNumberRoot + " ||| " + cardNumberTransaction);

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

getAllCreditCards();