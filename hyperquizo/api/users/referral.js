const mysql = require("../../config/database");
const { getUserCode, getUserbyID, loginProcess } = require("./user.service");

module.exports = {
  referralProcess: (data, callBack) => {
    let message = "Completed"
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
                const referralAmount = 200;     // Rs. 200 Cash Bonus
  
                // Update Amount in User Data
                mysql.query('Update users set bonusBalance = bonusBalance+?, totalBalance=totalBalance+?, friendCode = ? where uid = ?',
                  [referralAmount,
                    referralAmount,
                    data.friendCode,
                    data.uid],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
                // Update Amount in Friend's Data
                mysql.query(
                  'Update users set bonusBalance = bonusBalance+?, totalBalance = totalBalance+?, joinings = joinings+1 where uid = ?',
                  [referralAmount,referralAmount, frienduid],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error)
                    }
                  });
  
                // Insert User Transaction
                const title = "CASH BONUS ADDED";
                const message = "Referral user bonus of Rs. 200";
                const status = "Success";
                const type = "Reward";
                mysql.query(
                  "Insert into transactions (uid, title, message, status, amount, datetime, type) "
                  + "values(?,?,?,?,?,now(),?)",
                  [
                    data.uid,
                    title,
                    message,
                    status,
                    referralAmount,
                    type
                  ],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
                // Insert Friend's Transaction
                
                mysql.query(
                  "Insert into transactions (uid, title, message, status, amount, datetime, type) "
                  + "values(?,?,?,?,?,now(),?)",
                  [
                    frienduid,
                    title,
                    message,
                    status,
                    referralAmount,
                    type
                  ],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
                
                // Insert Friend's New Joining 
                mysql.query(
                  'Insert into joinings (uid, friendid, amount, bonusAmount) values(?,?,?,?)',
                  [frienduid, data.uid, 0, referralAmount],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    }
                  });
  
  
  
              } else {
                // if friendCode is already inserted 
                message = "Multi Request for Referral"
                console.log("Data", message);
  
              }
  
            } else {
              // if user data is not in the table 
              message = "User not exist"
              console.log("Data", message);
            }
  
          });
  
        } else {
          // if friend's code not exist
          message = "Invalid Referral Code"
        }
  
      });

    } 

    mysql.query('update users set name = ?, profilePicture = ? where uid = ?',
     [data.name, data.profilePicture, data.uid],
     (error, results, fields) => {
       if(error){
         callBack(error)
       }
       console.log("Data1", message);
       return callBack(null, message);
     });
    
  },

};