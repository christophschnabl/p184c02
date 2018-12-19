match(c1:Customer)--(:Address)--(c2:Customer)
return(c1)-[:HAS_ADDRESS]->(:Address)