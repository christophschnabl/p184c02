-- Customer Triggers

create trigger AfterInsCustomer
    after insert on Customer 
    for each row
    insert into Customer_Polling values (new.CustomerUUID, new.Name, new.Country, new.Address, new.SSN,
                                         new.Telephone, new.AccountStatus, new.Duration, new.CreditHistory,
                                         new.Purpose, new.CreditAmount, new.Savings, new.Employment, 
                                         new.InstallmentRate, new.PersonalStatus, new.sex, new.Debtors,
                                         new.Residence, new.Property, new.Age, new.OtherInstallmentPlans,
                                         new.Housing, new.NumberOfCredits, new.Job, new.LiableMaintenance,
                                         new.ForeignWorker, new.Cost, false)
;

create trigger AfterUpdCustomer
    after update on Customer 
    for each row
    insert into Customer_Polling values (new.CustomerUUID, new.Name, new.Country, new.Address, new.SSN,
                                         new.Telephone, new.AccountStatus, new.Duration, new.CreditHistory,
                                         new.Purpose, new.CreditAmount, new.Savings, new.Employment, 
                                         new.InstallmentRate, new.PersonalStatus, new.sex, new.Debtors,
                                         new.Residence, new.Property, new.Age, new.OtherInstallmentPlans,
                                         new.Housing, new.NumberOfCredits, new.Job, new.LiableMaintenance,
                                         new.ForeignWorker, new.Cost, false)
;

create trigger AfterDelCustomer
    after delete on Customer 
    for each row
    insert into Customer_Polling values (new.CustomerUUID, new.Name, new.Country, new.Address, new.SSN,
                                         new.Telephone, new.AccountStatus, new.Duration, new.CreditHistory,
                                         new.Purpose, new.CreditAmount, new.Savings, new.Employment, 
                                         new.InstallmentRate, new.PersonalStatus, new.sex, new.Debtors,
                                         new.Residence, new.Property, new.Age, new.OtherInstallmentPlans,
                                         new.Housing, new.NumberOfCredits, new.Job, new.LiableMaintenance,
                                         new.ForeignWorker, new.Cost, true)
;


--CreditCard Triggers

create trigger AfterInsCreditCard
after insert on CreditCard 
    for each row
    insert into CreditCard_Polling (CardNumber) values (new.CardNumber, new.IssuingNetwork, new.CVV,
                                                        new.ExpirationMonth, new.ExpirationYear, false)
;

create trigger AfterUpdCreditCard
after update on CreditCard 
    for each row
    insert into CreditCard_Polling (CardNumber) values (new.CardNumber, new.IssuingNetwork, new.CVV,
                                                        new.ExpirationMonth, new.ExpirationYear, false)
;

create trigger AfterDelCreditCard
after delete on CreditCard 
    for each row
    insert into CreditCard_Polling (CardNumber) values (new.CardNumber, new.IssuingNetwork, new.CVV,
                                                        new.ExpirationMonth, new.ExpirationYear, true)
;