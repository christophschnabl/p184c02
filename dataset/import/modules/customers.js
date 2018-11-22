const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * converts a string into an integer
 * @param { String } str
 * @returns { Number }
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
 * @returns {Object} values
 */
async function readGermanCreditData(filename) {
    const data = (await readFile(filename)).toString();
    const lines = data.split('\n');

    const values = lines.map((line) => {
        const [
            status, duration, history, purpose, amount,
            savings, employment, installment, personal,
            otherDebtors, residence, property, age,
            otherInstallmentPlans, housing, numberCreditCards,
            job, liableMaintenance, telephone, foreignWorker
        ] = line.split(' ');

        return line;
    });

    return values;
}

module.exports = readGermanCreditData;