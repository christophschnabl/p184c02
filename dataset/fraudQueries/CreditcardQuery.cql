match(c1:Customer)--(:Creditcard)--(c2:Customer)
return(c1)-[:USES_CREDITCARD]->(:Creditcard)