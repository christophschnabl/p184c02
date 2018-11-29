module.exports = {
    customerInsert: `insert into customer (status, duration, history, purpose, amount,
        savings, employment, installment, personal, otherDebtors, residence, property, age,
        otherInstallmentPlans, housing, numberCreditCards, job, liableMaintenance, telephone, foreignWorker)
        values ?`,
    creditCardInsert: `insert into creditcard () values ?`
};
