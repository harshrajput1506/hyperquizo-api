const mysql = require("../../config/database")
module.exports = {
    getQuizCategory: (callback) => {
        const topTopics;
        const trendingTopics;
        const allTopics;
        mysql.query('select topicId, title, icon from topics order by title', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            allTopics = results;  //Array List All Topics
            
        });

        mysql.query('select topicId, title, icon from topics order by views desc limit 8', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            topTopics = results;  //Array List Top Topics
            
        });

        mysql.query('select topicId, title, icon from topics where isTrending = 1 order by views desc limit 4', [], (error, results, fields) => {
            if (error) {
                callback(error);
            }
            trendingTopics = results;  //Array List Trending Topics
            
        });

        const data = {
            allTopics: allTopics,
            topTopics: topTopics,
            trendingTopics: trendingTopics
        }

        return callback(null, data);
    },

};