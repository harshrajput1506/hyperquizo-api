const mysql = require("../../config/database")
const { getQuizContests } = require("./contest");
const { getTrendingTopics, getTopTopics } = require("./quiz.service");
module.exports = {
    getQuizCategory: (callback) => {
        mysql.query('select id, title, icon from topics', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            const allTopics = results;  //Array
            const topicsData = {
                topics: allTopics
            };
            return callback(null, topicsData);
            /*getTrendingTopics((err, results) => {
                if(err){
                    callback(err)
                }
                const trendingTopics = results;  // Trending Array
                getTopTopics((err, results) => {
                    if(err){
                        callback(err)
                    }

                    const topTopics = results;   // Top Topics Array 

                    
                });

            });*/
            
        });
    },

};