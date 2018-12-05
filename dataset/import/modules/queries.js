module.exports = {
    customerInsert: `insert into Customer (CustomerUUID, Name, Country, Address, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost)
        values ?`,
    creditCardInsert: `insert into CreditCard (CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth, CustomerUUID) values ?`
};
