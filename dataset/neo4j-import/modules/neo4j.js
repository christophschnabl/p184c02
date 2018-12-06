const neo4j = require('neo4j-driver').v1;

const user = 'frauddetection';
const password = 'frauddetection';
const uri = 'bolt://localhost:7687';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports = driver;