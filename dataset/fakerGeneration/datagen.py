#!/bin/env python
from faker import Faker
NUMROWS = 1000000
fake = Faker("en_US")

block = ""
with open('dataset.csv', 'wb') as f:
    numrows = 0
    while numrows < NUMROWS:
        block += fake.name() + "\n" + str(fake.address()).translate(None, "\n") + "\n"
        numrows += 1
        if len(block) > 64000: #Write Blocks of 64KB
            f.write(block)
            block = ""
    f.write(block)
f.close()
        
