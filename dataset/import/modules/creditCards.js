const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * reads a JSON file
 * @param {String} filename
 * @returns {Object}
 */
async function readJSON(filename) {
    const dataString = (await readFile(filename)).toString();
    const data = JSON.parse(dataString);
    return data;
}

/**
 * reads credit card files and merges contents
 * @param {Array.<String>} filenames
 * @returns {Array.<Object>}
 */
async function readCreditCards(filenames) {
    const arrays = await Promise.all(
        filenames
            .map(filename => readJSON(filename))
    );

    // merge arrays
    const arr = arrays.pop();
    const mergedArray = arr.concat(...arrays);

    return mergedArray.map(el => Object.values(el.CreditCard));
}

module.exports = readCreditCards;