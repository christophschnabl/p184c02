match(c1:Customer)-[:USES_CREDITCARD]->(c2:CreditCard)-[:TRANSACTION]->(c3:CreditCard)<-[:USES_CREDITCARD]-(c4:Customer) return c1, c2, c3, c4;
