module.exports = {
    customerPollingSelect: `select CustomerUUID, Name, Country, Address, SSN, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost, Action from Customer_Polling`,
    creditCardPollingSelect: `select CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth, Action from CreditCard_Polling`,
    customerCreditCardPollingSelect: `select CustomerUUID, CardNumber, Action from CustomerCreditCard_Polling`,
    transactionPollingSelect: `select TransactionID, Date, Amount, CardNumberSender, CardNumberReciever from Transaction_Polling`,
    customerPollingDelete: `delete from Customer_Polling where CustomerUUID = ?`,
    creditCardPollingDelete: `delete from CreditCard_Polling where CardNumber = ?`,
    customerCreditCardPollingDelete: `delete from CustomerCreditCard_Polling where CustomerUUID = ? and CardNumber = ?`,
    transactionPollingDelete: `delete from Transaction_Polling where TransactionID = ?`
};
