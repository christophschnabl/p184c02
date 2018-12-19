match(c1:Customer)--(:Phone)--(c2:Customer)
return(c1)-[:USES_PHONENUMBER]->(:Phone)