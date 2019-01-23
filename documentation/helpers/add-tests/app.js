const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/script.projects'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if(err) return console.log('Error loading client secret file: ', err);
    authorize(JSON.parse(content), callAppsScript);
});

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
  
  
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function callAppsScript(auth) {
    const script = google.script({version: 'v1', auth});
    script.projects.create({
        resource: {
            title: 'My Script',
        },
    }, (err, res) => {
        if (err) return console.log(`The API create method returned an error: ${err}`);
        script.projects.updateContent({
            scriptId: res.data.scriptId,
            auth,
            resource: {
                files: [{
                    name: 'hello',
                    type: 'SERVER_JS',
                    source: 'function helloWorld() {\n  console.log("Hello, world!");\n}',
                }, {
                    name: 'appsscript',
                    type: 'JSON',
                    source: '{\"timeZone\":\"America/New_York\",\"exceptionLogging\":' +
                            '\"CLOUD\"}',
                }],
            },
        }, {}, (err, res) => {
            if (err) return console.log(`The API updateContent method returned an error: ${err}`);
            console.log(`https://script.google.com/d/${res.data.scriptId}/edit`);
        });
    });
}