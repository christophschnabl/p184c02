module.exports = {
    customerSelect: `select CustomerUUID, Name, Country, Address, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost from Customer`,
    creditCardSelect: `select CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth, CustomerUUID from CreditCard`
};
