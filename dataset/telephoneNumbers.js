/** Creates a 12-digit Telephone number */
function createTelephoneNumber() {
    return Math.floor(Math.random() * 899999999999) + 100000000000;
}

/** Creates n telephone numbers and returns them in a string separated by a new line */
function createTelephoneNumbers(num) {
    let numbers = '';
    for(let i = 0; i < num; i += 1) {
        numbers += createTelephoneNumber.toString() + '\n';
    }
    return numbers;
}

module.exports = createTelephoneNumbers;