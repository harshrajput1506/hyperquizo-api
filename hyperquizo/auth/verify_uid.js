const mysql = require("../../config/database");

module.exports = {

    verifyUid: (req, res, next) => {
        let uid = req.query.id;
        mysql.query("select * from users where uid = ?" , [uid], (error, results, fields) => {

            if(error){
                return res.status(400).json({
                    success: 0,
                    message: "Invalid User...",
                  });
            }

            if(results[0]){
                next();
            } else {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid User...",
                  });
            }

        }
        );
    }

};