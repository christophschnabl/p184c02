nodes = [":SSN", ":Address", ":Phone", ":Creditcard"]
relations = [":HAS_SSN", ":HAS_ADDRESS", ":USES_PHONENUMBER", ":USES_CREDITCARD"]
filename = str(input("Filename: "))

print("0 = SSN, 1 = Address, 2 = Phonenumber, 3 = Creditcard")
node = int(input("Node: "));

file = open(filename, "w");

file.write("match(c1:Customer)--(" + nodes[node] + ")--(c2:Customer)\n\
return(c1)-[" + relations[node] + "]->(" + nodes[node] + ")")

file.close();
