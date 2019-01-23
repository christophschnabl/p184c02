module.exports = {
    customerPollingSelect: `select CustomerUUID, Name, Country, Address, SSN, AccountStatus, Duration, CreditHistory, Purpose, CreditAmount,
        Savings, Employment, InstallmentRate, PersonalStatus, sex, Debtors, Residence, Property, Age,
        OtherInstallmentPlans, Housing, NumberOfCredits, Job, LiableMaintenance, Telephone, ForeignWorker, Cost from Customer_Polling`,
    creditCardPollingSelect: `select CardNumber, IssuingNetwork, CVV, ExpirationYear, ExpirationMonth from CreditCard_Polling`,
    customerCreditCardPollingSelect: `select CustomerUUID, CardNumber from CustomerCreditCard_Polling`,
    customerPollingDelete: `delete from CustomerCreditCard_Polling`,
    creditCardPollingDelete: `delete from CustomerCreditCard_Polling`,
    customerCreditCardPollingDelete: `delete from CustomerCreditCard_Polling`,
};
