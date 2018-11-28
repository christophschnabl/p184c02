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

flush privileges;
