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

    getPool: (title, category, callback) => {
        mysql.query("select * from quizPool where title = ? order  by entryFees", [title], (error, results, fields) =>{
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
   


};