const fs = require('fs');
const util = require('util');
const pool = require('./modules/database.js');

const readFile = util.promisify(fs.readFile);


/**
 * trims the leading A and converts the string into an integer
 * @param {String} str
 * @returns {Number}
 */
const trimA = str => parseInt(str.substr(1), 10);

/**
 * reads from a file
 * @param {String} filename
 */
async function read(filename) {
    const data = (await readFile(filename)).toString();
    const lines = data.split('\n');

    for (const line of lines) {
        const [
            status, duration, history, purpose, amount,
            savings, employment, installment, personal,
            otherDebtors, residence, property, age,
            otherInstallMentPlans, housing, numberCreditCards,
            job, liableMaintenance, telephone, foreignWorker
        ] = line.split(' ');
    }
}


read('../german-credit.data');