module.exports = {
    customerInsert: `insert into customer (CustomerUUID, Address, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount, Savings, 
                                           Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
                                           OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost) 
                     values ?`,
    creditCardInsert: `insert into creditcard () values ?`
};
