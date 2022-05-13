const mysql = require("../../config/database");
module.exports = {
    getTrendingTopics: (callback) => {
        mysql.query("select topicId, title, icon from topics where isTrending = 1 order by views desc limit 4", [], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback("Fetching Error", null);
            }

        });
    },

    getTopTopics: (callback) => {
        mysql.query("select id, title, icon from topics limit 5", [], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback("Fetching Error", null);
            }

        });
    },

    getPool: (category, callback) => {
        const query ="select * from quizPool where category = ? order  by entryFees";
        mysql.query(query, [category], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback("Fetching Error");
            }

        });
    },

    updatePoolPlayers: (data,players,callback) => {
        const query ="update quizPool set playersJoined=? where id=?" ;
        mysql.query(query,
            [
                players,
                data.poolID

            ], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback(null, "Fetching Error");
            }

        });
    },

    getQuestionsByCategory: (data, callback) => {
        const query ="select * from questions, questionscategory where questionscategory.categories=? AND questions.id=questionscategory.questionID order by rand() limit ?;";
        mysql.query(query, [data.category, data.questions], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback(null, "Fetching Error");
            }

        });
    },


    // Mysql gameRooms - Right now - Not using.... Using Firestore DB gamerooms

    getRoomByPoolID: (poolID, callback) => {
        const query ="select * from gamerooms where poolId=? AND status='Open'";
        mysql.query(query, [poolID], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            return callback(null, results[0]);

        });
    },


    createNewRoom: (data, questionSet,callback) => {
        const query ="insert into gamerooms (roomToken, player1id, player1name, player1picture, entryFee, prizePool, questionSet, poolID) values(?,?,?,?,?,?,?,?)";
        mysql.query(query,
            [
                data.roomToken,
                data.uid,
                data.name,
                data.profilePicture,
                data.entryFee,
                data.prizePool,
                questionSet,
                data.poolID

            ], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback(null, "Fetching Error");
            }

        });
    },

    updateExistingRoom: (data,roomID,callback) => {
        const query ="update gamerooms set player2name = ?, player2id=?, player2picture=?, status='Live',playersJoined=2 where id=?";
        mysql.query(query,
            [
                data.name,
                data.uid,
                data.profilePicture,
                roomID

            ], (error, results, fields) =>{
            if (error) {
                callback(error);
            }
            if(results){
                return callback(null, results);
            } else {
                return callback(null, "Fetching Error");
            }

        });
    },


};