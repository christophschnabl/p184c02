create trigger AfterInsCustomer
    after insert on Customer 
    for each row
    insert into Customer_Polling values (new.CustomerUUID);


create trigger AfterUpdCustomer
    after update on Customer 
    for each row
    insert into Customer_Polling (CustomerUUID) values (new.CustomerUUID);
