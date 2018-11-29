// Basic model without data
create(:Customer)-[:USES]->(:CreditCard)-[:MAKES]->(:Transaction)
create(:Transaction)-[:MADE_BY]->(CreditCard)-[:BELONGS_TO]->(:Customer)
