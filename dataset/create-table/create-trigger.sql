/*Customer Triggers*/

drop trigger if exists AfterInsCustomer;
drop trigger if exists AfterUpdCustomer;
drop trigger if exists AfterDelCustomer;


create trigger AfterInsCustomer
    after insert on Customer
    for each row
begin
    insert into Customer_Polling (CustomerUUID, Name, Country, Address, SSN,
                                  Telephone, AccountStatus, Duration, CreditHistory,
                                  Purpose, CreditAmount, Savings, Employment,
                                  InstallmentRate, PersonalStatus, sex, Debtors,
                                  Residence, Property, Age, OtherInstallmentPlans,
                                  Housing, NumberOfCredits, Job, LiableMaintenance,
                                  ForeignWorker, Cost, Action)
                          values (new.CustomerUUID, new.Name, new.Country, new.Address, new.SSN,
                                  new.Telephone, new.AccountStatus, new.Duration, new.CreditHistory,
                                  new.Purpose, new.CreditAmount, new.Savings, new.Employment,
                                  new.InstallmentRate, new.PersonalStatus, new.sex, new.Debtors,
                                  new.Residence, new.Property, new.Age, new.OtherInstallmentPlans,
                                  new.Housing, new.NumberOfCredits, new.Job, new.LiableMaintenance,
                                  new.ForeignWorker, new.Cost, 'ins');
end;

create trigger AfterUpdCustomer
    after update on Customer
    for each row
begin
    insert into Customer_Polling (CustomerUUID, Name, Country, Address, SSN,
                                  Telephone, AccountStatus, Duration, CreditHistory,
                                  Purpose, CreditAmount, Savings, Employment,
                                  InstallmentRate, PersonalStatus, sex, Debtors,
                                  Residence, Property, Age, OtherInstallmentPlans,
                                  Housing, NumberOfCredits, Job, LiableMaintenance,
                                  ForeignWorker, Cost, Action)
                          values (new.CustomerUUID, new.Name, new.Country, new.Address, new.SSN,
                                  new.Telephone, new.AccountStatus, new.Duration, new.CreditHistory,
                                  new.Purpose, new.CreditAmount, new.Savings, new.Employment,
                                  new.InstallmentRate, new.PersonalStatus, new.sex, new.Debtors,
                                  new.Residence, new.Property, new.Age, new.OtherInstallmentPlans,
                                  new.Housing, new.NumberOfCredits, new.Job, new.LiableMaintenance,
                                  new.ForeignWorker, new.Cost, 'upd');
end;

create trigger AfterDelCustomer
    after delete on Customer
    for each row
begin
    insert into Customer_Polling (CustomerUUID, Name, Country, Address, SSN,
                                  Telephone, AccountStatus, Duration, CreditHistory,
                                  Purpose, CreditAmount, Savings, Employment,
                                  InstallmentRate, PersonalStatus, sex, Debtors,
                                  Residence, Property, Age, OtherInstallmentPlans,
                                  Housing, NumberOfCredits, Job, LiableMaintenance,
                                  ForeignWorker, Cost, Action)
                          values (old.CustomerUUID, old.Name, old.Country, old.Address, old.SSN,
                                  old.Telephone, old.AccountStatus, old.Duration, old.CreditHistory,
                                  old.Purpose, old.CreditAmount, old.Savings, old.Employment,
                                  old.InstallmentRate, old.PersonalStatus, old.sex, old.Debtors,
                                  old.Residence, old.Property, old.Age, old.OtherInstallmentPlans,
                                  old.Housing, old.NumberOfCredits, old.Job, old.LiableMaintenance,
                                  old.ForeignWorker, old.Cost, 'del');
end;



/*CreditCard Triggers*/

drop trigger if exists AfterInsCreditCard;
drop trigger if exists AfterUpdCreditCard;
drop trigger if exists AfterDelCreditCard;


create trigger AfterInsCreditCard
after insert on CreditCard
for each row
begin
    insert into CreditCard_Polling (CardNumber, IssuingNetwork, CVV,
                                    ExpirationMonth, ExpirationYear, Action)
                            values (new.CardNumber, new.IssuingNetwork, new.CVV,
                                    new.ExpirationMonth, new.ExpirationYear, 'ins');
end;

create trigger AfterUpdCreditCard
after update on CreditCard
    for each row
begin
    insert into CreditCard_Polling (CardNumber, IssuingNetwork, CVV,
                                    ExpirationMonth, ExpirationYear, Action)
                            values (new.CardNumber, new.IssuingNetwork, new.CVV,
                                    new.ExpirationMonth, new.ExpirationYear, 'upd');
end;

create trigger AfterDelCreditCard
after delete on CreditCard
    for each row
begin
    insert into CreditCard_Polling (CardNumber, IssuingNetwork, CVV,
                                    ExpirationMonth, ExpirationYear, Action)
                            values (old.CardNumber, old.IssuingNetwork, old.CVV,
                                    old.ExpirationMonth, old.ExpirationYear, 'del');
end;



/*CustomerCreditCard Triggers*/

drop trigger if exists AfterInsCustomerCreditCard;
drop trigger if exists AfterUpdCustomerCreditCard;
drop trigger if exists AfterDelCustomerCreditCard;


create trigger AfterInsCustomerCreditCard
after insert on CustomerCreditCard
for each row
begin
    insert into CustomerCreditCard_Polling (CustomerUUID, CardNumber, Action)
                                    values (new.CustomerUUID, new.CardNumber, 'ins');
end;

create trigger AfterDelCustomerCreditCard
after delete on CustomerCreditCard
for each row
begin
    insert into CustomerCreditCard_Polling (CustomerUUID, CardNumber, Action)
                                    values (old.CustomerUUID, old.CardNumber, 'del');
end;



/*Transaction Triggers*/

drop trigger if exists AfterInsTransaction;
drop trigger if exists AfterUpdTransaction;
drop trigger if exists AfterDelTransaction;


create trigger AfterInsTransaction
after insert on Transaction
for each row
begin
    insert into Transaction_Polling (TransactionID, Date, Amount, CardNumberSender, CardNumberReciever, CustomerUUIDSender, CustomerUUIDReciever, Action)
                             values (new.TransactionID, new.Date, new.Amount, new.CardNumberSender, new.CardNumberReciever, new.CustomerUUIDSender, new.CustomerUUIDReciever, 'ins');
end;

create trigger AfterUpdTransaction
after update on Transaction
for each row
begin
    insert into Transaction_Polling (TransactionID, Date, Amount, CardNumberSender, CardNumberReciever, CustomerUUIDSender, CustomerUUIDReciever, Action)
                             values (new.TransactionID, new.Date, new.Amount, new.CardNumberSender, new.CardNumberReciever, new.CustomerUUIDSender, new.CustomerUUIDReciever, 'upd');
end;

create trigger AfterDelTransaction
after delete on Transaction
for each row
begin
    insert into Transaction_Polling (TransactionID, Date, Amount, CardNumberSender, CardNumberReciever, CustomerUUIDSender, CustomerUUIDReciever, Action)
                             values (old.TransactionID, old.Date, old.Amount, old.CardNumberSender, old.CardNumberReciever, old.CustomerUUIDSender, old.CustomerUUIDReciever, 'del');
end;