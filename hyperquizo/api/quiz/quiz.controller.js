const {
    getQuizCategory
  } = require("./quizcategory");

const {
  getPool
} = require("./quiz.service");
 

  module.exports = {

    getHomeQuizCategory: (req, res) => {
        getQuizCategory((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if(results){
            return res.status(200).json({
              success: 1,
              data: results
            });
          }else {
            return res.status(404).json({
              success: 0,
              message: "Not Found"
            });

          }
          
        });
      },

      getQuizPool: (req, res) => {

      const title = req.query.title;
      const category = req.query.category;
        getPool(title, category,(err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if(results){
            return res.status(200).json({
              success: 1,
              data: results
            });
          }else {
            return res.status(404).json({
              success: 0,
              message: "Not Found"
            });

          }
          
        });
      },
    


  };