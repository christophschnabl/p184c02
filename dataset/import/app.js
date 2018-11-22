const fs = require('fs');
const util = require('util');
const pool = require('./modules/database.js');

const readFile = util.promisify(fs.readFile);

/**
 * converts a string into an integer
 * @param {String} str
 * @returns {Number}
 */
const toNum = str => parseInt(str, 10);

/**
 * trims the leading A and converts the string into an integer
 * @param {String} str
 * @returns {Number}
 */
const trimA = str => toNum(str.substr(1));


/**
 * reads from german credit data file
 * @param {String} filename
 */
async function readGermanCreditData(filename) {
    const data = (await readFile(filename)).toString();
    const lines = data.split('\n');

    for (const line of lines) {
        const [
            status, duration, history, purpose, amount,
            savings, employment, installment, personal,
            otherDebtors, residence, property, age,
            otherInstallmentPlans, housing, numberCreditCards,
            job, liableMaintenance, telephone, foreignWorker
        ] = line.split(' ');
    }
}

/**
 * reads a JSON file
 * @param {String} filename
 */
async function readJSON(filename) {
    const dataString = (await readFile(filename)).toString();
    const a = JSON.parse(dataString);
}


readGermanCreditData('../german-credit.data');

readJSON('../credit-cards/credit-cards-1:5.json');
readJSON('../credit-cards/credit-cards-2:5.json');
readJSON('../credit-cards/credit-cards-3:5.json');
readJSON('../credit-cards/credit-cards-4:5.json');
readJSON('../credit-cards/credit-cards-5:5.json');