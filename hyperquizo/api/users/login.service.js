const mysql = require("../../config/database");

module.exports = {
    

    loginNumberProcess: (number, callBack) => {

      mysql.query(
          'select * from Users where number = ?',
          [number],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );

  },


};