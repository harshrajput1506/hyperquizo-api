const mysql = require("../../config/database");
const { getRoomByPoolID, updateExistingRoom, createNewRoom } = require("../quiz/gameroom");
const {  getQuestionsByCategory, updatePoolPlayers } = require("../quiz/quiz.service");
const { insertTransactions } = require("./user.service");

module.exports = {

    poolPayProcess : (data, callback) => {
        mysql.query(
            'update users set depositBalance = if(depositBalance>=?, depositBalance-?, depositBalance), winningBalance = if(winningBalance>=?, winningBalance-?, winningBalance), bonusBalance = if(bonusBalance>=?, bonusBalance-?, bonusBalance), totalBalance = if(totalBalance>=?, totalBalance-?, totalBalance) where uid = ?',
            [ data.depositEntry,
              data.depositEntry,
              data.winningEntry,
              data.winningEntry,
              data.bonusEntry,
              data.bonusEntry,
              data.totalEntry,
              data.totalEntry,
              data.uid

            ],
            (error, results, fields) => {
              if (error) {
                callback(error);
              }
              if(results.changedRows==1){

                const message = "Joined a game of ₹"+data.totalEntry;
                 
                const transactionsData = {
                    "type": "Debit",
                    "totalBalance":data.totalEntry,
                    "uid":data.uid,
                    "title":"Joined A Game",
                    "message":message
                };
                console.log("Pool Payment : ",data.totalEntry);
                insertTransactions(transactionsData, (err, result) => {
                    if(err){
                        callback(err)
                    }

                    getRoomByPoolID(data.roomID, (err, results) => {

                      if(err){
                        callback(err)
                      } 
                      if(results){
                        //Room Already Existed
                        const roomID = results.roomID;
                        updateExistingRoom(data, roomID, (err, result) => {
                          if(err){
                            callback(err);
                          }
                          const playersJoined = 0;
                          updatePoolPlayers(data, playersJoined, (err, result) => {
                            if(err){
                              callback(err);
                            }
                          });
                          const message = "Room Already Created";
                          const snapshot = {roomID, message}
                          return callback(null, snapshot);
                        });
                        
                      } else {
                        //Room Not Existed - Create New Room
                        getQuestionsByCategory(data, (err, result) => {
                          if(err) {
                            callback(err);
                          }

                          if(result[0]){
                            const questionSet = JSON.stringify(result); 
                            createNewRoom(data, questionSet, (err, result) => {
                              if(err){
                                callback(err);
                              }
                              const playersJoined = 1;
                              updatePoolPlayers(data, playersJoined, (err, result) => {
                                if(err){
                                  callback(err);
                                }
                              });
                              const roomID = result;
                              const message = "Created New Room";
                              const snapshot = {roomID, message};

                              return callback(null, snapshot);

                            });        
                          } else {
                            const message = {"message":"Invalid Update"};
                            return callback(null, message);
                          }

                        });
                      }
                  
                    });
                });

              } else {
                const message = {"message":"Invalid Update"};
                return callback(null, message);
              }
              
            });
    },
};