create table Customer (
    CustomerUUID			int		not null AUTO_INCREMENT
,	Address         		text    not null
,   AccountStatus   		enum('<0', '0-200', '>200', 'no checking account')	not null
,   Duration        		int     not null
,   CreditHistory   		enum('no credits/all paid back',
								 'credits paid back at this bank ',
								 'credits paid back till now',
								 'delay in paying',
								 'critical account') not null
,   Purpose        	 		enum('car (new)', 'car (used)', 'furniture/equipment',
								 'radio/television', 'domestic appliances', 'repairs',
								 'education', 'vacation', 'retraining', 'business', 'others')	not null
,	CreditAmount			int		not null
,	Savings					enum('<100', '<500', '<1000', '>1000')
,	Employment				enum('<1', '1-4', '4-7', '>7')	not null
,	InstallmentRate			int		not null
,	PersonalStatus			enum('single', 'divorced/separated', 'married/widowed')	not null
,	sex						enum('male', 'female')	not null
,	Debtors					enum('none', 'co-applicant', 'guarantor')	not null
,	Residence				int
,	Property				enum('real estate', '','', 'unknown / no property')	not null
,	Age						int		not null
, 	OtherInstallmentPlans	enum('bank', 'stores', 'none')	not null
,	Housing					enum('rent', 'own', 'for free')	not null
,	NumberOfCredits			int		not null
,	Job						enum('unskilled - none-resident',	
								'unskilled - resident',
								'skilled employee',
								'highly qualified employee')	not null
,	LiableMaintenance		int		not null
,	Telephone				enum('none', 'yes')	not null
,	ForeignWorker			enum('yes', 'no')	not null
, 	Cost					int		not null
,	primary key (CustomerUUID)
);

create table CreditCard (
    CardNumber      int     not null
,   IssuingNetwork  text    not null
,   CVV             int     not null
,   Expiration      date    not null
,   CustomerUUID    int     not null    references Customer
,   primary key (CardNumber)
);