match (c:Customer)--(r)--(c2:Customer)
return distinct c
