#!/bin/env python
from faker import Faker

NUMROWS = 100000       # Max Datasets
fake = Faker("en_US")  # Generate data based on the US dataset

block = ""             # Buffer
with open('dataset.csv', 'wb') as f:    # = (f = open('dataset.csv', 'wb))
    numrows = 0                         # counter for NUMROWS
    while numrows < NUMROWS:
        block += fake.name() + ";" + str(fake.address()).translate(None, "\n") + "\n"   # Append Name/Address to buffer
        numrows += 1
        if len(block) > 64000: # If buffer size exceeds 64kB - write to file
            f.write(block)
            block = ""         # Clear buffer
    f.write(block)             # Write rest of buffer
f.close()
        
