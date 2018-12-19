"""
This script generates a query for a general graph database
"""

filename = str(input("Filename: "))
nodename = str(input("Name of Node to query: "))
relname = str(input("Name of relationship to Node: "))

file = open(filename, "w");

file.write("match(c1:Customer)--(" + nodename + ")--(c2:Customer)\n\
return(c1)-[" + relname + "]->(" + nodename + ")")

file.close();
