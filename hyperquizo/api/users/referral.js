const mysql = require("../../config/database");
const { getUserCode, getUserbyID, loginProcess } = require("./user.service");

module.exports = {
  referralProcess: (data, callBack) => {
    if(data.friendCode != ""){

      getUserCode(data.friendCode, (err, results) => {
        if (err) {
          callBack(err)
        }
        if (results) {
          const frienduid = results.uid;
          loginProcess(data.uid, (err, results) => {
            if (err) {
              callBack(err);
            }
            if (results) {
              if (results.friendCode == "") {
  
                // Referral Process
                const referralAmount = 00;     // Rs. 200 Cash Bonus
  
                // Update Amount in User Data
                mysql.query('Update users set bonusBalance = bonusBalance+?, friendCode = ? where uid = ?',
                  [referralAmount,
                    data.friendCode,
                    data.uid],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
                // Update Amount in Friend's Data
                mysql.query(
                  'Update users set bonusBalance = bonusBalance+?, joinings = joinings+1 where uid = ?',
                  [referralAmount, frienduid],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error)
                    }
                  });
  
                // Insert User Transaction
                mysql.query(
                  'Insert into transactions (uid, title, message, status, amount, datetime, type) '
                  + 'values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 200","Success",?,now(), "Rewards")',
                  [data.uid, referralAmount],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
                // Insert Friend's Transaction
                mysql.query(
                  'Insert into transactions (uid, title, message, status, amount, datetime, type) '
                  + 'values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 200","Success",?,now(), "Rewards")',
                  [frienduid, referralAmount],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
                
                // Insert Friend's New Joining 
                mysql.query(
                  'Insert into Joinings (uid, friendid, amount, bonusAmount) values(?,?,?,?)',
                  [frienduid, data.uid, 0, referralAmount],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
  
  
              } else {
                // if friendCode is already inserted 
                return callBack(null, null)
  
              }
  
            } else {
              // if user data is not in the table 
              return callBack(null, null)
            }
  
          });
  
  
  
        } else {
          // if friend's code not exist
          const msg = "Invalid Referral Code"
          return callBack(null, msg)
        }
  
      });

    } 

    mysql.query('update users set name = ?, profilePicture = ? where uid = ?',
     [data.name, data.profiePicture, data.uid],
     (error, results, fields) => {
       if(error){
         callBack(error)
       }
       return callBack(null, "Completed");
     });
    
  },

};