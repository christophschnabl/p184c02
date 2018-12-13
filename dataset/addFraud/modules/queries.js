module.exports = [
    // fix bug here
    `update Customer
        set SSN = (select CustomerUUID
                     from (select CustomerUUID
                             from Customer) c
                    where CustomerUUID = 1)
      where CustomerUUID = 2;
    `,
    `update Customer
        set SSN = (select CustomerUUID
                     from (select CustomerUUID
                             from Customer) c
                    where CustomerUUID = 1)
      where CustomerUUID = 3;
    `
];
