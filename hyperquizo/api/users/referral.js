const mysql = require("../../config/database");
const { referral } = require("./user.controller");
const { getUserCode, getUserbyID } = require("./user.service");

module.exports = {
    referralProcess: (data, callBack) => {
        getUserCode(data.friendCode, (err, results) =>{
            if(err){
                callBack(err)
            }
            if(results){

                getUserbyID(data.uid, (err, results) =>{
                    if(err){
                        callBack(err);
                    }
                    if(results){
                        const currentFriendCode = results.friendCode;
                        if(currentFriendCode == ""){
                            // Referral Process
                            const referralAmount = 20;     // Rs. 20 
                            mysql.query(
                               'select uid from Users where referCode = ?',
                                [ data.friendCode ],
                                (error, results, fields) => {
                                 if (error) {
                                    callBack(error);
                                    }
                           const frienduserID = results[0].uid;
                      mysql.query(
                        'Update Users set amount = amount+?, cashBonus = cashBonus+?, friendCode = ? where uid = ?',
                        [ referralAmount, referralAmount, data.friendCode, data.uid ],
                        (error, results, fields) => {
                          if (error) {
                            callBack(error);
                          }  
                        }); 

                        mysql.query(
                            'Update Users set amount = amount+?, cashBonus = cashBonus+?, joinings = joinings+1 where uid = ?',
                            [ referralAmount, referralAmount, frienduserID ],
                            (error, results, fields) => {
                              if (error) {
                                callBack(error);
                              }  
                            }); 
                            mysql.query(
                              'Insert into Transactions (uid, title, message, status, amount, date, time, type) values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 20","Success","+ ₹20",?,?, "Rewards")',
                              [ data.uid, data.date, data.time ],
                              (error, results, fields) => {
                                if (error) {
                                  callBack(error);
                                } 
                                mysql.query(
                                  'Insert into Transactions (uid, title, message, status, amount, date, time, type) values(?,"CASH BONUS ADDED","Referral user bonus of Rs. 20","Success","+ ₹20",?,?, "Rewards")',
                                  [ frienduserID, data.date, data.time ],
                                  (error, results, fields) => {
                                    if (error) {
                                      callBack(error);
                                    } mysql.query(
                                      'Insert into Joinings (uid, frienduid, amount) values(?,?,?)',
                                      [ frienduserID, data.uid, referralAmount ],
                                      (error, results, fields) => {
                                        if (error) {
                                          callBack(error);
                                        } 
                                        return callBack(null, "Completed");
                                        
                                        }); 
                                      });
                                    
                                    }); 
                      
                                });

                        }else{
                            return callBack(null, null)

                        }

                    }else{
                        return callBack(null, null)
                    }

                });
                


            }else{
                const msg = "Invalid Referral Code"
                return callBack(null, msg)
            }

        });
    },

};