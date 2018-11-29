const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * maps an attribute
 * @param {Array.<String>} newAttrs
 * @param {Array.<String>} oldAttrs
 * @param {String} value
 * @returns {String}
 */
const mapAttribute = (newAttrs, oldAttrs, value) =>
    newAttrs[oldAttrs.indexOf(value)];


const formatStatus = status =>
    mapAttribute(
        ['<0', '0-200', '>200', 'no checking account'],
        ['A11', 'A12', 'A13', 'A14'],
        status
    );

const formatHistory = history =>
    mapAttribute(
        ['no credits/all paid back',
            'credits paid back at this bank ',
            'credits paid back till now',
            'delay in paying',
            'critical account'],
        ['A30', 'A31', 'A32', 'A33', 'A34'],
        history
    );

const formatPurpose = purpose =>
    mapAttribute(
        ['car (new)', 'car (used)', 'furniture/equipment',
            'radio/television', 'domestic appliances', 'repairs',
            'education', 'vacation', 'retraining', 'business', 'others'],
        ['A40', 'A41', 'A42', 'A43', 'A44', 'A45', 'A46', 'A47', 'A48', 'A49', 'A410'],
        purpose
    );

const formatSavings = savings =>
    mapAttribute(
        ['<100', '<500', '<1000', '>1000', 'unknown'],
        ['A61', 'A62', 'A63', 'A64', 'A65'],
        savings
    );

const formatEmployment = employment =>
    mapAttribute(
        ['unemployed', '<1', '1-4', '4-7', '>7'],
        ['A71', 'A72', 'A73', 'A74', 'A75'],
        employment
    );

const formatPersonalStatus = status =>
    mapAttribute(
        ['divorced/separated', 'divorced/separated/married', 'single', 'married/widowed', 'single'],
        ['A91', 'A92', 'A93', 'A94', 'A95'],
        status
    );

const formatSex = status =>
    mapAttribute(
        ['male', 'female', 'male', 'male', 'female'],
        ['A91', 'A92', 'A93', 'A94', 'A95'],
        status
    );

const formatDebtors = otherDebtors =>
    mapAttribute(
        ['none', 'co-applicant', 'guarantor'],
        ['A101', 'A102', 'A103'],
        otherDebtors
    );

const formatProperty = property =>
    mapAttribute(
        ['real estate',
            'building society savings agreement/life insurance',
            'car or other',
            'unknown / no property'],
        ['A121', 'A122', 'A123', 'A124'],
        property
    );

const formatOtherInstallmentPlans = plans =>
    mapAttribute(
        ['bank', 'stores', 'none'],
        ['A141', 'A142', 'A143'],
        plans
    );

const formatHousing = housing =>
    mapAttribute(
        ['rent', 'own', 'for free'],
        ['A151', 'A152', 'A153'],
        housing
    );

const formatJob = job =>
    mapAttribute(
        ['unskilled - none-resident',
            'unskilled - resident',
            'skilled employee',
            'highly qualified employee'],
        ['A171', 'A172', 'A173', 'A174'],
        job
    );

const formatTelephone = tel => tel === 'A192';

const formatForeignWorker = foreignWorker => foreignWorker === 'A201';

const formatCost = cost => cost === '1' ? 'good' : 'bad';


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
            otherInstallmentPlans, housing, numberOfCredits,
            job, liableMaintenance, telephone, foreignWorker, cost
        ] = line.split(' ');

        return [
            formatStatus(status),
            duration,
            formatHistory(history),
            formatPurpose(purpose),
            amount,
            formatSavings(savings),
            formatEmployment(employment),
            installment,
            formatPersonalStatus(personal),
            formatSex(personal),
            formatDebtors(otherDebtors),
            residence,
            formatProperty(property),
            age,
            formatOtherInstallmentPlans(otherInstallmentPlans),
            formatHousing(housing),
            numberOfCredits,
            formatJob(job),
            liableMaintenance,
            formatTelephone(telephone),
            formatForeignWorker(foreignWorker),
            formatCost(cost),
        ]
    });

    return values;
}

module.exports = readGermanCreditData;