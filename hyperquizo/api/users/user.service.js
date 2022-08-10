const mysql = require("../../config/database");

module.exports = {

  // Get USerData by uid
  loginProcess: (id, callBack) => {

    mysql.query(
        'select * from users where uid = ?',
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        });
  },


  getWalletProcess: (id, callBack) => {
    mysql.query(
        'select uid, totalBalance, depositBalance, winningBalance, bonusBalance from users where uid = ?',
        [id],
        function(error, results) {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        });
  },

  //Insert Transactions
  insertTransactions: (body, callBack) => {
    const status = 'Success';
    mysql.query(
      'Insert into transactions (uid, title, message, status, amount, datetime, type) '
      + 'values(?,?,?,?,?,now(), ?)',
      [
        body.uid,
        body.title,
        body.message,
        status,
        body.amount,
        body.type
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results);
      }
    );
  },

  // Get UserData by referCode
  getUserCode: (friendCode, callBack) => {
    mysql.query(
      'select * from users where referCode = ?',
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
      'select * from users where number = ?',
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
    function(error, results) {
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
      'select * from users where email = ?',
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
      'select * from users where username = ?',
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