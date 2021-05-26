const mysql = require("../../config/database")
const { getQuizContests } = require("./contest");
const { getTrendingTopics, getTopTopics } = require("./quiz.service");
module.exports = {
    getQuizCategory: (callback) => {
        mysql.query('select topicId, title, icon from topics order by title', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            const allTopics = results;  //Array
            getTrendingTopics((err, results) => {
                if(err){
                    callback(err)
                }
                const trendingTopics = results;  // Trending Array
                getTopTopics((err, results) => {
                    if(err){
                        callback(err)
                    }

                    const topTopics = results;   // Top Topics Array

                    const topicsData = {
                        topics: allTopics,
                        trendingTopics: trendingTopics,
                        topTopics: topTopics
                    };
                    return callback(null, topicsData);
                });

            });
            
        });
    },

};