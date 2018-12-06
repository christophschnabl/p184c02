// Basic model without data
create(customer:Customer {id:0})
create(address:Address)
create(country:Country)
create(phone:PhoneNumber)
create(cc:CreditCard)
create(bank:BankAccount)

create(customer)-[:HAS_ADDRESS]->(address)-[:IN_COUNTRY]->(country)
create(customer)-[:USES_PHONENUMBER]->(phone)
create(customer)-[:USES_CREDITCARD]->(cc)
create(customer)-[:USES_ACCOUNT]->(bank)
