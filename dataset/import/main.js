const fs = require('fs');

let assign = function(element) {
    return element + "hansi";
}

let fileStream = fs.createReadStream("../german-credit.data");

fileStream.on("data", function(data) {
    let chunk = data.toString();

    let lines = chunk.split('\n'); //split the chunks into lines

    lines.forEach(function(line) {
        line.split(" ").map(assign)); //split the lines into columns due to their seperation by a space
    });
});
