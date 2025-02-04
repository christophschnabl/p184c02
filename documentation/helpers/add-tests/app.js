const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const readline = require('readline');
const { google } = require('googleapis');

const spreadsheetId = '1J7ClKxJSv6QZJRkzzfH7q8Bqs4VvUu8KU0ZXpdPk4bA';
const testFilename = '../../../dataset/neo4j-import/tests.txt';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    var credentials = JSON.parse(content);
    //authorize(credentials, listTests);
    authorize(credentials, addTests);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
            if (err) return console.error('Error while trying to retrieve access token', err);
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


/**
 * lists tests
 * @param {String} auth
 */
async function listTests(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1J7ClKxJSv6QZJRkzzfH7q8Bqs4VvUu8KU0ZXpdPk4bA',
        range: 'Protocol!A2:D',
    });

    const rows = res.data.values;
    if (rows.length === 0) return;

    console.log('Testfallnummer, Beschreibung, Status, Ticket:');
    rows.map((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`);
    });
}

/**
 * formats a number with preceding zeroes
 * @param {Number} num
 * @param {Number} len
 */
function zfill(num, len) {
    return (Array(len).join('0') + num).slice(-len);
}

async function addTestsCB(err, res, sheets) {
    if(err) console.log(err);
    const rows = res.data.values;

    if (rows.length === 0) {
        console.log('No data found');
        return;
    }

    const lastTNR = parseInt(rows[rows.length - 1][0].substring(1)); // Testnummer parsen

    const data = await readFile(testFilename, 'utf-8');
    let lines = data.split('\n');
    lines.forEach((value, i) => {
        lines[i] = value.trimLeft();
    });

    const topic = lines.reduce(
        (accumulator, currentValue, currentIndex) =>
            accumulator !== '' ? accumulator :
                (currentValue.startsWith('✓') ? lines[currentIndex - 1] : ''));

    let values = lines
        .filter(el => el.startsWith('✓'))
        .map((el, idx, array) => [
            'T' + zfill(lastTNR + idx + 1, 3),
            topic + ' ' + el.substring(2), 'OK', '-'
        ]);
    
    sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Protocol!A1:D1',
        valueInputOption: 'RAW',
        resource: {values}
    });

    let testpath = testFilename.split('/').filter(el => !el.startsWith('.')).toString().replace(/,/g, '/');
    testpath = "mocha in " + testpath.slice(0, testpath.lastIndexOf('/'));
    testpath += " ausführen";

    values = lines
        .filter(el => el.startsWith('✓'))
        .map((el, idx, array) => [
            'T' + zfill(lastTNR + idx + 1, 3),
            topic + ' ' + el.substring(2), 
            testpath, el.substring(2)
        ]);

    sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Cases!A1:D1',
        valueInputOption: 'RAW',
        resource: {values}
    });
}

function addTests(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Protocol!A2:D'
    }, (err, res) => {
        addTestsCB(err, res, sheets);
    });
}