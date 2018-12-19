match(c1:Customer)--(:CreditCard)--(c2:Customer)
return(c1)-[:USES_CREDITCARD]->(:CreditCard)