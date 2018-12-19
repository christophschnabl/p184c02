FRAUDDETECTION MIT NEO4J
------------------------

1. Mysql & Neo4j installieren und einrichten
2. Mysql-User und frauddetection-DB erstellen und enstprechende Rechte zuweisen (siehe import/mysql-init.sql)
3. create-table script ausführen
4. import script ausführen (Achtung, alle Tabelleninhalte werden gelöscht!)
5. addFraud script ausführen (um Betrungsringe in die Mysql-DB einzubauen)
6. neo4j-import script ausführen (Achtung, alle Tabelleninhalte werden gelöscht!) (Dauert mehrere Minuten)
7. Graph im neo4j-Browser betrachten