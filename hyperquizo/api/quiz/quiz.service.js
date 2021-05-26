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
        mysql.query("select topicId, title, icon from topics order by views desc limit 8", [], (error, results, fields) =>{
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
   


};