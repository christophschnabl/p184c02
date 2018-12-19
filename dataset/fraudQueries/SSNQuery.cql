match(c1:Customer)--(:SSN)--(c2:Customer)
return(c1)-[:HAS_SSN]->(:SSN)