module.exports = {
    customerInsert: `insert into Customer (CustomerUUID, Telephone, SSN, Name, Country, Address, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, ForeignWorker, Cost)
        values ?`,
    creditCardInsert: `insert into CreditCard (CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth, CustomerUUID) values ?`
};
