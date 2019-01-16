const neo4j = require('neo4j-driver').v1;
const chai = require('../node_modules/chai');

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'root'));
const session = driver.session();


describe('Dataset', () => {
    it('should have 1000 customers', () => {
        const result = session.run(
            'match (c:Customer) return c'
        );

        result.then((res) => {
            chai.assert.equal(res.records.length, 1000);
        });
    });

    it('should have a ssn node per customer', () => {
        const result = session.run(
            'match (c:Customer)-[:HAS_SSN]->(s:SSN) return s;'
        );

        result.then((res) => {
            chai.assert.equal(res.records.length, 1000);
        });
    });
});