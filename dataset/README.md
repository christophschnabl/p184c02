# FRAUDDETECTION MIT NEO4J
------------------------

### Wie man das Projekt ausführt

1. Mysql & Neo4j installieren und einrichten
2. Mysql-User und frauddetection-DB erstellen und enstprechende Rechte zuweisen (siehe import/mysql-init.sql)
3. create-table script ausführen (Danach ggf. Rechte zuweisen, siehe import/mysql-init.sql)
4. import script ausführen (Achtung, alle Tabelleninhalte werden gelöscht!)
5. addFraud script ausführen (um Betrungsringe in die Mysql-DB einzubauen)
6. addTransactions script ausführen (um Transaktionen zu generieren)
7. neo4j-import script ausführen (Achtung, alle Tabelleninhalte werden gelöscht!) (Dauert mehrere Minuten)
8. Graph im neo4j-Browser betrachten
9. Mit dem replication script die Änderungen synchronisieren


####Die Scripts beachten folgende Umgebungsvariablen:

* MYSQL_HOST
* MYSQL_USER
* MYSQL_PASSWORD
* MYSQL_DB
* NEO4J_USER
* NEO4J_PASSWORD
* NEO4J_URI

Wenn diese Variablen nicht definiert werden, verwenden die scripts default-Parameter.



####Ordnerstruktur

* Im /dataset Ordner befinden sich Import- und Migrationsskripts und die Daten, die importiert werden.
* Außerdem diverse Abfragen auf die neo4j-Datenbank.
* Die Datei FraudPercentage.txt gibt einen Überblick über die Einteilung der verschiedenen Betrugsarten und wieviel % ihnen zugeordnet werden
* telephoneNumbers.html und -.js sind Generatoren für Telefonnummern
* SSN.data, telephone.data, german-credit.data und credit-cards/*.* sind die Grundlage für den Import.
* Die npm-Packages addFraud, addTransactions, create-table, import, neo4j-import, replication sind in den jeweiligen Ordnern gespeichert.
* In fraudQueries befinden sich diverse Abfragen für die neo4j-Datenbank
* german-credit.doc ist die Dokumentation für german-credit.data


###Nicht-Dokumentierte Ordner

 * Der /fakerGeneration Ordner enthält einen python Data-Generator, der aber nicht benötigt wird
 * Der neo4j-apoc enthält anscheinend ein Docker-File ????



###Betrugsfälle

Im addTransactions script werden normale und fraudulent transactions eingefügt.
Fraudulent Transactions können mit neo4j-algorithms erkannt werden, am besten mit Betweenness Centrality (Direction:BOTH)