nodes = [":SSN", ":Address", ":Phone", ":CreditCard"]
relations = [":HAS_SSN", ":HAS_ADDRESS", ":USES_PHONENUMBER", ":USES_CREDITCARD"]
filename = str(input("Filename: "))

print("0 = SSN, 1 = Address, 2 = Phonenumber, 3 = CreditCard")
node = int(input("Node: "));

file = open(filename, "w");

file.write("match(c1:Customer)--(" + nodes[node] + ")--(c2:Customer)\n\
return(c1)-[" + relations[node] + "]->(" + nodes[node] + ")")

file.close();
