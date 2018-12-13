module.exports = [
    `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 1) c)
      where CustomerUUID = 2;
    `,
    `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 1) c)
      where CustomerUUID = 3;
    `
];
