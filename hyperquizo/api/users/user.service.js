const mysql = require("../../config/database");

module.exports = {

 

  getUserbyID: (id, callBack) => {
    mysql.query(
      'select * from Users where uid = ?',
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);       
      });
  },

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








  // Other Services
 
  getUID: (body, callBack) => {
    mysql.query(
      'select * from Users where uid = ?',
      [body.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      }
    );
  },
  getUserEmail: (body, callBack) => {
    mysql.query(
      'select * from Users where email = ?',
      [body.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      }
    );
  },
  
  getUserNewCode: (referCode, callBack) => {
    mysql.query(
      'select * from Users where referCode = ?',
      [referCode],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } 
        return callBack(null, results[0]);
      }
    );
  },
  getUsername: (body, callBack) => {
    mysql.query(
      'select * from Users where userName = ?',
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