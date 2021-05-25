const mysql = require("../../config/database")
const { getQuizContests } = require("./contest");
const { getTrendingTopics } = require("./quiz.service");
module.exports = {
    getQuizCategory: (callback) => {
        mysql.query('select * from topics', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            const data = results;  //Array
            getTrendingTopics((err, results) => {
                if(err){
                    callback(err)
                }
                const trendingTopics = results;  // Trending Array
                const topicsData = {
                    topics: data,
                    trendingTopics: trendingTopics
                };

                return callback(null, topicsData);
            });
            
        });
    },

};