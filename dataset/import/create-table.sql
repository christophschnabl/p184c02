create table Customer (
    CustomerUUID			integer not null AUTO_INCREMENT
,	Address         		text    not null
,   AccountStatus   		enum('<0', '0-200', '>200', 'no checking account')	not null
,   Duration        		integer not null
,   CreditHistory   		enum('no credits/all paid back',
                                 'credits paid back at this bank ',
                                 'credits paid back till now',
                                 'delay in paying',
                                 'critical account') not null
,   Purpose        	 		enum('car (new)', 'car (used)', 'furniture/equipment',
                                 'radio/television', 'domestic appliances', 'repairs',
                                 'education', 'vacation', 'retraining', 'business', 'others')	not null
,	CreditAmount			integer not null
,	Savings                 enum('<100', '<500', '<1000', '>1000', 'unknown')
,	Employment              enum('unemployed', '<1', '1-4', '4-7', '>7')	not null
,	InstallmentRate			integer		not null
,	PersonalStatus			enum('single', 'divorced/separated', 'married/widowed', 'divorced/separated/married')	not null
,	sex						enum('male', 'female')	not null
,	Debtors					enum('none', 'co-applicant', 'guarantor')	not null
,	Residence				integer
,	Property				enum('real estate', 'building society savings agreement/life insurance','car or other', 'unknown / no property')	not null
,	Age						integer		not null
, 	OtherInstallmentPlans	enum('bank', 'stores', 'none')	not null
,	Housing					enum('rent', 'own', 'for free')	not null
,	NumberOfCredits			integer		not null
,	Job						enum('unskilled - none-resident',
                                'unskilled - resident',
                                'skilled employee',
                                'highly qualified employee')	not null
,	LiableMaintenance		integer		not null
,	Telephone				boolean	not null
,	ForeignWorker			boolean	not null
, 	Cost					enum('good','bad')		not null
,   primary key (CustomerUUID)
);

create table CreditCard (
    CardNumber      integer     not null
,   IssuingNetwork  text    not null
,   CVV             integer     not null
,   Expiration      date    not null
,   CustomerUUID    integer     not null    references Customer
,   primary key (CardNumber)
);

create table Transaction (
    TransactionID   integer             not null    AUTO_INCREMENT primary key
,   Date            date            not null
,   Amount          decimal(12,2)   not null
,   CardNumber      integer             not null    references CreditCard
);