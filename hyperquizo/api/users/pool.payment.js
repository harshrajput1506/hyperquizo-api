const mysql = require("../../config/database");
const { insertTransactions } = require("./user.service");

module.exports = {

    poolPayProcess : (data, callback) => {
        mysql.query(
            'update users set depositBalance = if(depositBalance>=?, depositBalance-?, depositBalance), winningBalance = if(winningBalance>=?, winningBalance-?, winningBalance), bonusBalance = if(bonusBalance>=?, bonusBalance-?, bonusBalance), totalBalance = totalBalance-? where uid = ?',
            [ data.depositEntry,
              data.depositEntry,
              data.winningEntry,
              data.winningEntry,
              data.bonusEntry,
              data.bonusEntry,
              data.totalEntry,
              data.uid

            ],
            (error, results, fields) => {
              if (error) {
                callback(error);
              }
              if(results.changedRows==1){
                 
                const transactionsData = {
                    "type": "Debit",
                    "amount":data.totalEntry,
                    "uid":data.uid,
                    "title":"Joined A Game",
                    "message":"Joined a game"
                };
                insertTransactions(transactionsData, (err, result) => {
                    if(err){
                        callback(err)
                    }

                    if(result){
                        const data = {"update":results,"insert":result}
                        callback(null, data)
                    }
                });

              } else {
                return callback(null, "Invalid Update");
              }
              
            });
    },
};