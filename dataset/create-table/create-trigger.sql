create trigger AfterInsUpdCustomer
    after insert on Customer 
    for each row
begin
    insert into Customer_Polling values (new.CustomerUUID);
end;
