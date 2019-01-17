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


    it('should have a phonenumber node per customer', () => {
        const result = session.run(
            'match (c:Customer)-[:USES_PHONENUMBER]->(p:Phone) return p'
        );

        result.then((res) => {
            chai.assert.equal(res.records.length, 1000);
        });
    });

    it('should have an address node per customer', () => {
        const result = session.run(
            'match (c:Customer)-[:HAS_ADDRESS]->(a:Address) return a'
        );

        result.then((res) => {
            chai.assert.equal(res.records.length, 1000);
        });
    });

    it('should have a creditcard node per customer', () => {
        const result = session.run(
            'match (c:Customer)-[:USES_CREDITCARD]->(cc:CreditCard) return cc'
        );

        result.then((res) => {
            chai.assert.equal(res.records.length, 1000);
        });
    });

    it('should have relations between customer (built in fraud should work)', () => {
        const result = session.run(
            'match (c:Customer)--(r)--(c2:Customer) return c'
        );

        result.then((res) => {
            chai.assert.notEqual(res.records.length, 0);
        });
    });
});