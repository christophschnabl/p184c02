module.exports = {
    customerSelect: `select CustomerUUID, Name, Country, Address, SSN, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost from Customer`,
    creditCardSelect: `select CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth from CreditCard`,
    customerCreditCardSelect: `select CustomerUUID, CardNumber from CustomerCreditCard`,
    transactionSelect: `select TransactionID, Date, Amount, CustomerUUIDSender, CustomerUUIDReciever from Transaction`,
    myCreditCardSelect: `select CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth from CreditCard where CustomerUUID = ?`
};
