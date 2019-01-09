module.exports = [
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 51) c)
      where CustomerUUID = 52;
    `,
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 51) c)
      where CustomerUUID = 53;
    `,
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 100) c)
      where CustomerUUID = 101;
    `,
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 200) c)
      where CustomerUUID = 201;
    `,
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 200) c)
      where CustomerUUID = 202;
    `,
        `update Customer
        set SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 200) c)
      where CustomerUUID = 203;
    `,
        `update Customer
        set Telephone = (select Telephone
                           from (select Telephone
                                   from Customer
                                  where CustomerUUID = 300) c)
      where CustomerUUID = 301;
    `,
        `update Customer
        set Address = (select Address
                         from (select Address
                                 from Customer
                                where CustomerUUID = 301) c),
            Country = (select Country
                        from (select Country
                                from Customer
                               where CustomerUUID = 301) c)
      where CustomerUUID = 302;
    `,
        `update Customer
        set Address = (select Address
                         from (select Address
                                 from Customer
                                where CustomerUUID = 400) c),
            Country = (select Country
                        from (select Country
                                from Customer
                               where CustomerUUID = 400) c),
             SSN = (select SSN
                      from (select SSN
                              from Customer
                             where CustomerUUID = 400) c)
      where CustomerUUID = 401;
    `,
        `update Customer
        set Telephone = (select Telephone
                           from (select Telephone
                                 from Customer
                                where CustomerUUID = 401) c),
            SSN = (select SSN
                     from (select SSN
                             from Customer
                            where CustomerUUID = 401) c)
      where CustomerUUID = 402;
    `,
        `update Customer
        set Telephone = (select Telephone
                           from (select Telephone
                                   from Customer
                                  where CustomerUUID = 500) c)
      where CustomerUUID = 501;
    `,
        `update Customer
        set Telephone = (select Telephone
                           from (select Telephone
                                   from Customer
                                  where CustomerUUID = 500) c)
      where CustomerUUID = 502;
    `,
        `update Customer
        set Telephone = (select Telephone
                           from (select Telephone
                                   from Customer
                                  where CustomerUUID = 500) c)
      where CustomerUUID = 503;
    `,
        `update CustomerCreditCard
        set CustomerUUID = (select CustomerUUID
                              from (select CustomerUUID
                                      from CustomerCreditCard
                                     where CardNumber = 4106622438613982) c)
      where CardNumber = 4647101464197604;
    `
];
