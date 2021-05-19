const mysql = require("../../config/database");
const { getUserCode, getUserbyID, loginProcess } = require("./user.service");

module.exports = {
  referralProcess: (data, callBack) => {
    getUserCode(data.friendCode, (err, results) => {
      if (err) {
        callBack(err)
      }
      if (results) {
        const profilePicture = results.profilePicture;
        const username = results.username;
        const friendmid = results.mid;
        loginProcess(data.mid, (err, results) => {
          if (err) {
            callBack(err);
          }
          if (results) {
            const currentFriendCode = results.friendCode;
            if (currentFriendCode == "") {

              // Referral Process
              const referralAmount = 200;     // Rs. 200 Cash Bonus

              // Update Amount in User Data
              mysql.query('Update Users set balance = balance+?, cashBonus = cashBonus+?, friendCode = ? where mid = ?',
                [referralAmount,
                  referralAmount,
                  data.friendCode,
                  data.mid],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                });

              // Update Amount in Friend's Data
              mysql.query(
                'Update Users set balance = balance+?, cashBonus = cashBonus+?, joinings = joinings+1 where mid = ?',
                [referralAmount, referralAmount, friendmid],
                (error, results, fields) => {
                  if (error) {
                    callBack(error)
                  }
                });

              // Insert User Transaction
              mysql.query(
                'Insert into Transactions (mid, title, message, status, amount, datetime, type) '
                + 'values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 200","Success","+ ₹200",?, "Rewards")',
                [data.mid, data.datetime],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                });

              // Insert Friend's Transaction
              mysql.query(
                'Insert into Transactions (mid, title, message, status, amount, datetime, type) '
                + 'values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 200","Success","+ ₹200",?, "Rewards")',
                [friendmid, data.datetime],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                });
              
              // Insert Friend's New Joining 
              mysql.query(
                'Insert into Joinings (mid, friendId, amount, username, profilePhoto) values(?,?,?,?,?)',
                [friendmid, data.mid, referralAmount, username, profilePicture],
                (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  }
                  return callBack(null, "Completed");
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
  },

};