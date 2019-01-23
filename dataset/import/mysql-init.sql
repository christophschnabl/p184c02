create database frauddetection;
use frauddetection;

create     user 'frauddetection'@'localhost'
identified by 'frauddetection';

select Host, User
  from mysql.user
;

grant all privileges
   on frauddetection
   to 'frauddetection'@'localhost'
;

-- run after create-table

grant select, insert, update, delete
   on Customer
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on CreditCard
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on CustomerCreditCard
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on Transaction
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on Customer_Polling
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on CreditCard_Polling
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on CustomerCreditCard_Polling
   to 'frauddetection'@'localhost'
;

grant select, insert, update, delete
   on Transaction_Polling
   to 'frauddetection'@'localhost'
;

flush privileges;
