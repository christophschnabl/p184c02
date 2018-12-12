/** Creates a telephone number with 12 random digits */
function createTelephoneNumber() {
    let telNum = '';
    for (let i = 0; i < 12; i += 1) {
        telNum += Math.floor(Math.random() * 9);
    }
    return telNum;
}

module.exports = createTelephoneNumber;
