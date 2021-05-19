const mysql = require("../../config/database");

module.exports = {

  // Get USerData by mid
  loginProcess: (id, callBack) => {

    mysql.query(
        'select * from Users where mid = ?',
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        });
  },

  // Get UserData by referCode
  getUserCode: (friendCode, callBack) => {
    mysql.query(
      'select * from Users where referCode = ?',
      [friendCode],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      });
  },

  // get user data by phone number
  getUserNumber: (number, callBack) => {
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

  checkUserTokens: (token, callBack) =>{
    mysql.query('select * from usedTokens where token = ?', [token],
    (error, results, fields) => {
      if(error){
        callBack(error);
      }
      if(results[0]){
        return callBack(null, "Already Used")
      }else{
        return callBack(null, "Not Used")
      }
    });
  },

  setUserTokens: (data, callBack) =>{
    mysql.query('insert into usedTokens (token, issuedTime) values(?,?)', [data.token, data.time],
    (error, results, fields) => {
      if(error){
        callBack(error);
      }
      return callBack(null, "Token Stored")
    });
  },

  // get user data by email
  getUserEmail: (email, callBack) => {
    mysql.query(
      'select * from Users where email = ?',
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      }
    );
  },
  
  // get user data by username
  getUsername: (body, callBack) => {
    mysql.query(
      'select * from Users where username = ?',
      [body.userName],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      }
    );
  },
};