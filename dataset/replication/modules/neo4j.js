const neo4j = require('neo4j-driver').v1;

const user = process.env.NEO4J_USER || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'neo4j';
const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

module.exports = driver;
