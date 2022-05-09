const mysql = require("../../config/database");

module.exports = {

    poolPayProcess : (data, callback) => {
        mysql.query(
            'update users set depositBalance = if(depositBalance>=?, depositBalance-?, depositBalance), winningBalance = if(winningBalance>=?, winningBalance-?, winningBalance), bonusBalance = if(bonusBalance>=?, bonusBalance-?, bonusBalance), totalBalance = totalBalance-? where uid = ?',
            [ data.depositEntry,
              data.winningEntry,
              data.bonusEntry,
              data.totalEntry,
              data.uid

            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            });
    },
};