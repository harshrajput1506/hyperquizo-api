const mysql = require("../../config/database");

module.exports = {
    loginProcess: (id, callBack) => {

        mysql.query(
            'select * from Users where uid = ?',
            [id],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
          );

    },

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