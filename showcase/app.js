'use strict';
const express = require('express');
const app = express();
const pool = require('./modules/database.js');
const queries = require('./modules/queries.js');

async function insertIntoDB(name, add, ssn, phone) {
    try {
        let customerInsertData = [];
        customerInsertData.push([1001, name, "AT", add,
            ssn, phone, '<0', 10, 'critical account',
            'car (new)', 1, '<100', '<1', 10, 'single', 'male', 'none', 100,
            'real estate', 10, 'bank', 'own', 3, 'highly qualified employee',
            10,0, 'good']);

        await pool.query(queries.customerInsert, [customerInsertData]);

        console.log(`Successfulyy inserted a new row.`);
    } catch (e) {
        console.warn(`An error occured...`, e);
    }

    await pool.end();
}

app.get('/', (req, res) => {
    insertIntoDB(req.query.name, req.query.address, req.query.ssn, req.query.phone);
    res.status(200).send('Inserted...');
});


if (module === require.main) {

  // [START server]
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]

}
module.exports = app;
