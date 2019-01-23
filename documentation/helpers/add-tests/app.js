const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/script.projects'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if(err) return console.log('Error loading client secret file: ', err);
    authorize(JSON.parse(content), callAppsScript);
});

