const fs = require('fs');

let fileStream = fs.createReadStream("../german-credit.data");

fileStream.on("data", function(data) {
    let chunk = data.toString();

    console.log(chunk);
});
