const mysql = require("../../config/database");
module.exports = {
    getTrendingTopics: (callback) => {
        mysql.query("select * from topics order by views desc limit 4", [], (error, results, fields) =>{
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