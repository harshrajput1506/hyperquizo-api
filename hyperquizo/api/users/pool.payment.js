const mysql = require("../../config/database");
const { getRoomByPoolID, getQuestionsByCategory, createNewRoom, updateExistingRoom, updatePoolPlayers } = require("../quiz/quiz.service");
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
                 
                const transactionsData = {
                    "type": "Debit",
                    "amount":data.totalEntry,
                    "uid":data.uid,
                    "title":"Joined A Game",
                    "message":"Joined a game"
                };
                insertTransactions(transactionsData, (err, result) => {
                    if(err){
                        callback(err)
                    }

                    getRoomByPoolID(data.poolID, (err, results) => {

                      if(err){
                        callback(err)
                      } 
                      if(results){
                        //Room Already Existed
                        const roomID = results.id;
                        const questionSet = results.questionSet;
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
                          const snapshot = {roomID, message, questionSet}
                          return callback(null, snapshot);
                        });
                        
                      } else {
                        //Room Not Existed - Create New Room
                        getQuestionsByCategory(data, (err, result) => {
                          if(err) {
                            callback(err);
                          }

                          if(result[0]){
                            const questionsSet = JSON.stringify(result); 
                            createNewRoom(data, questionsSet, (err, result) => {
                              if(err){
                                callback(err);
                              }
                              const playersJoined = 1;
                              updatePoolPlayers(data, playersJoined, (err, result) => {
                                if(err){
                                  callback(err);
                                }
                              });
                              const roomID = result.insertId;
                              const message = "Created New Room";
                              const snapshot = {roomID, message, questionsSet};

                              return callback(null, snapshot);

                            });        
                          } else {
                            return callback(null, "Invalid Update");
                          }

                        });
                      }
                  
                    });
                });

              } else {
                return callback(null, "Invalid Update");
              }
              
            });
    },
};